import { ID } from '@antv/graphlib';
import { throttle, uniq } from '@antv/util';
import { ComboModel, EdgeModel, NodeModel } from '../../types';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';
import { Point } from '../../types/common';
import { graphComboTreeDfs } from '../../util/data';

const DELEGATE_SHAPE_ID = 'g6-drag-node-delegate-shape';

// TODO: Combo related features:
// onlyChangeComboSize
// comboActiveState
// comboStateStyles

export interface DragNodeOptions {
  /**
   * Whether to draw dragging nodes in transient layer.
   * Ignored when enableDelegate is true.
   * Defaults to true.
   */
  enableTransient?: boolean;
  /**
   * Whether to use a virtual rect moved with the dragging mouse instead of the node.
   * Defaults to false.
   */
  enableDelegate?: boolean;
  /**
   * The drawing properties when the nodes are dragged.
   * Only used when enableDelegate is true.
   */
  delegateStyle?: {
    fill?: string;
    stroke?: string;
    fillOpacity?: number;
    strokeOpacity?: number;
    lineWidth?: number;
    lineDash?: [number, number];
    [key: string]: unknown;
  };
  /**
   * The time in milliseconds to throttle moving. Useful to avoid the frequent calculation.
   * Defaults to 0.
   */
  throttle?: number;
  /**
   * Whether to hide the related edges to avoid calculation while dragging nodes.
   * Ignored when enableTransient or enableDelegate is true.
   * Defaults to false.
   */
  hideRelatedEdges?: boolean;
  /**
   * The state name to be considered as "selected".
   * Defaults to "selected".
   */
  selectedState?: string;
  /**
   * The event name to trigger when drag end.
   */
  eventName?: string;
  /**
   * Whether change the combo hierarchy structure or only change size.
   */
  updateComboStructure?: boolean;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: Required<DragNodeOptions> = {
  enableTransient: true,
  enableDelegate: false,
  delegateStyle: {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [5, 5],
  },
  throttle: 16,
  hideRelatedEdges: false,
  selectedState: 'selected',
  eventName: '',
  updateComboStructure: true,
  shouldBegin: () => true,
};

export default class DragNode extends Behavior {
  options: DragNodeOptions;

  // Private states
  private hiddenEdges: EdgeModel[] = [];
  private hiddenComboTreeItems: (ComboModel | NodeModel)[] = [];
  private originX: number;
  private originY: number;
  private originPositions: Array<{
    id: ID;
    x: number;
    y: number;
    // The following fields only have values when delegate is enabled.
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
  }> = [];
  private pointerDown: Point | undefined = undefined;
  private dragging = false;

  constructor(options: Partial<DragNodeOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    if (finalOptions.enableDelegate) {
      finalOptions.enableTransient = false;
    }
    if (finalOptions.enableDelegate || finalOptions.enableTransient) {
      finalOptions.hideRelatedEdges = false;
    }
    super(finalOptions);
  }

  getEvents = () => {
    const events: any = {
      'node:pointerdown': this.onPointerDown,
      pointermove: this.onPointerMove,
      // click: this.onPointerUp,
      // FIXME: IG6Event -> keyboard event
      keydown: this.onKeydown as any,
    };
    if (this.options.updateComboStructure) {
      return {
        // 'node:drop': this.onDropNode,
        'combo:drop': this.onDropCombo,
        // 'canvas:drop': this.onDropCanvas,
        ...events,
      };
    } else {
      return {
        pointerup: this.onPointerUp,
        ...events,
      };
    }
  };

  /** Given selected node ids, get their related visible edges. */
  private getRelatedEdges(selectedNodeIds: ID[], relatedCombo: ComboModel[]) {
    const relatedNodeComboIds = [];
    graphComboTreeDfs(this.graph, relatedCombo, (item) =>
      relatedNodeComboIds.push(item.id),
    );
    return uniq(
      selectedNodeIds
        .concat(relatedNodeComboIds)
        .flatMap((nodeId) => this.graph.getRelatedEdgesData(nodeId)),
    ).filter((edgeData) => this.graph.getItemVisible(edgeData.id));
  }

  private getComboTreeItems(selectedNodeIds: ID[]) {
    const ancestors = [];
    if (this.options.updateComboStructure) return ancestors;
    selectedNodeIds.forEach((id) => {
      const nodeData = this.graph.getNodeData(id);
      if (!nodeData.data.parentId) return;
      let parentId = nodeData.data.parentId;
      let ancestor;
      while (parentId) {
        const parentData = this.graph.getComboData(parentId);
        if (!parentData) break;
        ancestor = parentData;
        parentId = parentData.data.parentId;
        ancestors.push(ancestor);
      }
    });
    return uniq(ancestors).filter((item) => this.graph.getItemVisible(item.id));
  }

  public onPointerDown(event: IG6GraphEvent) {
    if (!this.options.shouldBegin(event)) return;
    this.pointerDown = { x: event.canvas.x, y: event.canvas.y };
    this.dragging = false;
  }

  public onPointerMove(event: IG6GraphEvent) {
    if (!this.pointerDown) return;

    const beginDeltaX = Math.abs(this.pointerDown.x - event.canvas.x);
    const beginDeltaY = Math.abs(this.pointerDown.y - event.canvas.y);
    if (beginDeltaX < 1 && beginDeltaY < 1) return;

    // pointerDown + first move = dragging
    if (!this.dragging) {
      this.dragging = true;
      const currentNodeId = event.itemId;
      let selectedNodeIds = this.graph.findIdByState(
        'node',
        this.options.selectedState,
        true,
      );

      // If current node is selected, drag all the selected nodes together.
      // Otherwise drag current node.
      if (currentNodeId && !selectedNodeIds.includes(currentNodeId)) {
        selectedNodeIds = [currentNodeId];
      }

      this.originPositions = selectedNodeIds
        .map((id) => {
          if (!this.graph.getNodeData(id)) {
            console.log('node does not exist', id);
            return;
          }
          const { x, y } = this.graph.getNodeData(id).data as {
            x: number;
            y: number;
          };
          // If delegate is enabled, record bbox together.
          if (this.options.enableDelegate) {
            const bbox = this.graph.getRenderBBox(id);
            if (bbox) {
              const [minX, minY] = bbox.min;
              const [maxX, maxY] = bbox.max;
              return { id, x, y, minX, minY, maxX, maxY };
            }
          }
          return { id, x, y };
        })
        .filter(Boolean);

      const enableTransient =
        this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';

      // Hide related edge.
      if (this.options.hideRelatedEdges && !enableTransient) {
        this.hiddenComboTreeItems = this.getComboTreeItems(selectedNodeIds);
        this.hiddenEdges = this.getRelatedEdges(
          selectedNodeIds,
          this.hiddenComboTreeItems,
        );
        this.graph.hideItem(
          this.hiddenEdges.map((edge) => edge.id),
          true,
        );
        this.graph.hideItem(
          this.hiddenComboTreeItems.map((child) => child.id),
          true,
        );
      }

      // Draw transient nodes and edges.
      if (enableTransient) {
        // Draw transient edges and nodes.
        this.hiddenComboTreeItems = this.getComboTreeItems(selectedNodeIds);

        this.hiddenEdges = this.getRelatedEdges(
          selectedNodeIds,
          this.hiddenComboTreeItems,
        );
        selectedNodeIds.forEach((nodeId) => {
          // draw the nodes' transients and their ancestor combos' transisents
          this.graph.drawTransient('node', nodeId, {
            upsertAncestors: !this.options.updateComboStructure,
          });
        });
        this.hiddenEdges.forEach((edge) => {
          this.graph.drawTransient('edge', edge.id, {});
        });

        // Hide original edges and nodes. They will be restored when pointerup.
        this.graph.hideItem(selectedNodeIds, true);
        this.graph.hideItem(
          this.hiddenEdges.map((edge) => edge.id),
          true,
        );
        this.graph.hideItem(
          this.hiddenComboTreeItems.map((combo) => combo.id),
          true,
        );
      }

      // Throttle moving.
      if (this.options.throttle > 0) {
        this.throttledMoveNodes = throttle(
          this.moveNodes,
          this.options.throttle,
          { leading: true, trailing: true },
        );
      } else {
        this.throttledMoveNodes = this.moveNodes;
      }

      this.originX = event.canvas.x;
      this.originY = event.canvas.y;
    }

    if (!this.originPositions.length || !this.dragging) {
      return;
    }

    // @ts-ignore FIXME: type
    const pointerEvent = event as PointerEvent;
    // @ts-ignore FIXME: Type
    const deltaX = pointerEvent.canvas.x - this.originX;
    // @ts-ignore FIXME: Type
    const deltaY = pointerEvent.canvas.y - this.originY;

    if (this.options.enableDelegate) {
      this.moveDelegate(deltaX, deltaY);
    } else {
      const enableTransient =
        this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
      this.throttledMoveNodes(
        deltaX,
        deltaY,
        enableTransient,
        !this.options.updateComboStructure,
      );
    }
  }

  public moveNodes(
    deltaX: number,
    deltaY: number,
    transient: boolean,
    upsertAncestors: boolean = true,
  ) {
    if (transient) {
      // Move transient nodes
      this.originPositions.forEach(({ id, x, y }) => {
        this.graph.drawTransient('node', id, {
          data: {
            x: x + deltaX,
            y: y + deltaY,
          },
          upsertAncestors,
        });
      });
      // Update transient edges.
      this.hiddenEdges.forEach((edge) => {
        this.graph.drawTransient('edge', edge.id, {});
      });
    } else {
      const positionChanges = this.originPositions.map(({ id, x, y }) => {
        return {
          id,
          data: {
            x: x + deltaX,
            y: y + deltaY,
          },
        };
      });
      this.graph.updateNodePosition(positionChanges, upsertAncestors);
    }
  }

  public throttledMoveNodes: Function = (
    deltaX: number,
    deltaY: number,
    transient: boolean,
    upsertAncestors: boolean = true,
  ) => {
    // Should be overrided when drag start.
  };

  public moveDelegate(deltaX: number, deltaY: number) {
    const x1 = Math.min(
      ...this.originPositions.map((position) => position.minX),
    );
    const y1 = Math.min(
      ...this.originPositions.map((position) => position.minY),
    );
    const x2 = Math.max(
      ...this.originPositions.map((position) => position.maxX),
    );
    const y2 = Math.max(
      ...this.originPositions.map((position) => position.maxY),
    );
    this.graph.drawTransient('rect', DELEGATE_SHAPE_ID, {
      style: {
        x: x1 + deltaX,
        y: y1 + deltaY,
        width: x2 - x1,
        height: y2 - y1,
        ...this.options.delegateStyle,
      },
    });
  }

  public clearDelegate() {
    this.graph.drawTransient('rect', DELEGATE_SHAPE_ID, { action: 'remove' });
  }

  public clearTransientItems() {
    this.hiddenEdges.forEach((edge) => {
      this.graph.drawTransient('node', edge.source, { action: 'remove' });
      this.graph.drawTransient('node', edge.target, { action: 'remove' });
      this.graph.drawTransient('edge', edge.id, { action: 'remove' });
    });
    this.hiddenComboTreeItems.forEach((item) => {
      const isCombo = item.data._isCombo;
      this.graph.drawTransient(isCombo ? 'combo' : 'node', item.id, {
        action: 'remove',
      });
    });
    this.originPositions.forEach(({ id }) => {
      this.graph.drawTransient('node', id, { action: 'remove' });
    });
  }

  public restoreHiddenItems() {
    if (this.hiddenEdges.length) {
      this.graph.showItem(
        this.hiddenEdges.map((edge) => edge.id),
        true,
      );
      this.hiddenEdges = [];
    }
    if (this.hiddenComboTreeItems.length) {
      this.graph.showItem(
        this.hiddenComboTreeItems.map((edge) => edge.id),
        true,
      );
      this.hiddenComboTreeItems = [];
    }
    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
    if (enableTransient) {
      this.graph.showItem(
        this.originPositions.map((position) => position.id),
        true,
      );
    }
  }

  public onPointerUp(event: IG6GraphEvent) {
    this.pointerDown = undefined;
    this.dragging = false;
    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
    // If transient or delegate was enabled, move the real nodes.
    // if (enableTransient || this.options.enableDelegate) {
    // @ts-ignore FIXME: type
    const pointerEvent = event as PointerEvent;
    // @ts-ignore FIXME: Type
    const deltaX = pointerEvent.canvas.x - this.originX + 0.01;
    // @ts-ignore FIXME: Type
    const deltaY = pointerEvent.canvas.y - this.originY + 0.01;
    this.moveNodes(deltaX, deltaY, false, true);
    // }

    if (enableTransient) {
      this.clearTransientItems();
    }

    if (this.options.enableDelegate) {
      this.clearDelegate();
    }

    // Restore all hidden items.
    // For all hideRelatedEdges, enableTransient and enableDelegate cases.
    this.restoreHiddenItems();

    // Emit event.
    if (this.options.eventName) {
      this.graph.emit(this.options.eventName, {
        itemIds: this.originPositions.map((position) => position.id),
      });
    }

    // Reset state.
    this.originPositions = [];
  }

  // TODO: deal with combos
  public onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape' && event.key !== 'Esc') {
      return;
    }
    this.clearDelegate();
    this.clearTransientItems();
    this.restoreHiddenItems();

    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
    // Restore node positions.
    if (!enableTransient && !this.options.enableDelegate) {
      const positionChanges = this.originPositions.map(({ id, x, y }) => {
        return { id, data: { x, y } };
      });
      this.graph.updateNodePosition(positionChanges);
    }

    this.originPositions = [];
  }

  public onDropNode(event: IG6GraphEvent) {
    // drop on a node A, move the dragged node to the same parent of A
    const targetNodeData = this.graph.getNodeData(event.itemId);
    const { parentId: newParentId } = targetNodeData.data;
    this.originPositions.forEach(({ id }) => {
      if (id === targetNodeData.id) return;
      const model = this.graph.getNodeData(id);
      if (!model) return;
      const { parentId } = model.data;
      // if the parents are same, do nothing
      if (parentId === newParentId) return;

      // update data to change the structure
      // if newParentId is undefined, new parent is the canvas
      this.graph.updateData('node', { id, data: { parentId: newParentId } });
    });
    this.onPointerUp(event);
  }

  public onDropCombo(event: IG6GraphEvent) {
    event.stopPropagation();
    const newParentId = event.itemId;
    this.originPositions.forEach(({ id }) => {
      const model = this.graph.getNodeData(id);
      if (!model) return;
      const { parentId } = model.data;
      if (parentId === newParentId) return;
      this.graph.updateData('node', { id, data: { parentId: newParentId } });
    });
    this.onPointerUp(event);
  }

  public onDropCanvas(event: IG6GraphEvent) {
    this.originPositions.forEach(({ id }) => {
      const { parentId } = this.graph.getNodeData(id).data;
      if (!parentId) return;
      this.graph.updateData('node', { id, data: { parentId: undefined } });
    });
    this.onPointerUp(event);
  }
}
