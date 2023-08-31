import { ID } from '@antv/graphlib';
import { debounce, throttle, uniq } from '@antv/util';
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

type Position = {
  id: ID;
  x: number;
  y: number;
  // The following fields only have values when delegate is enabled.
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
};

export class DragNode extends Behavior {
  // Private states
  private hiddenEdges: EdgeModel[] = [];
  private selectedNodeIds: ID[] = [];
  private hiddenNearEdges: EdgeModel[] = [];
  private hiddenComboTreeItems: (ComboModel | NodeModel)[] = [];
  private originX: number;
  private originY: number;
  private originPositions: Array<Position> = [];
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
      click: this.onClick,
      // FIXME: IG6Event -> keyboard event
      keydown: this.onKeydown as any,
    };
    if (this.options.updateComboStructure) {
      return {
        'node:drop': this.onDropNode,
        'combo:drop': this.onDropCombo,
        'canvas:drop': this.onDropCanvas,
        ...events,
      };
    } else {
      return {
        pointerup: this.onClick,
        ...events,
      };
    }
  };

  /** Given selected node ids, get their related visible edges. */
  private getRelatedEdges(
    selectedNodeIds: ID[],
    relatedCombo: (ComboModel | NodeModel)[],
    onlyVisible = true,
  ) {
    const relatedNodeComboIds = [];
    graphComboTreeDfs(this.graph, relatedCombo, (item) =>
      relatedNodeComboIds.push(item.id),
    );

    let edges = uniq(
      selectedNodeIds
        .concat(relatedNodeComboIds)
        .flatMap((nodeId) => this.graph.getRelatedEdgesData(nodeId)),
    );

    if (onlyVisible) {
      edges = edges.filter((edgeData) =>
        this.graph.getItemVisible(edgeData.id),
      );
    }
    return edges;
  }

  /** Retrieve the nearby edges for a given node using quadtree collision detection. */
  private getNearEdgesForNodes(nodeIds: ID[]) {
    return uniq(
      nodeIds.flatMap((nodeId) => this.graph.getNearEdgesForNode(nodeId)),
    );
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

    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';

    // pointerDown + first move = dragging
    if (!this.dragging) {
      this.dragging = true;
      const currentNodeId = event.itemId;
      this.selectedNodeIds = this.graph.findIdByState(
        'node',
        this.options.selectedState,
        true,
      );

      // If current node is selected, drag all the selected nodes together.
      // Otherwise drag current node.
      if (currentNodeId && !this.selectedNodeIds.includes(currentNodeId)) {
        this.selectedNodeIds = [currentNodeId];
      }

      this.originPositions = this.selectedNodeIds
        .map((id) => {
          if (!this.graph.getNodeData(id)) {
            console.warn('node does not exist', id);
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

      // Hide related edge.
      if (this.options.hideRelatedEdges && !enableTransient) {
        this.hiddenComboTreeItems = this.getComboTreeItems(
          this.selectedNodeIds,
        );
        this.hiddenEdges = this.getRelatedEdges(
          this.selectedNodeIds,
          this.hiddenComboTreeItems,
        );
        this.graph.executeWithoutStacking(() => {
          this.graph.hideItem(
            this.hiddenEdges.map((edge) => edge.id),
            true,
          );
          this.graph.hideItem(
            this.hiddenComboTreeItems.map((child) => child.id),
            true,
          );
        });
      }

      // Draw transient nodes and edges.
      if (enableTransient) {
        // Draw transient edges and nodes.
        this.hiddenComboTreeItems = this.getComboTreeItems(
          this.selectedNodeIds,
        );

        this.hiddenEdges = this.getRelatedEdges(
          this.selectedNodeIds,
          this.hiddenComboTreeItems,
        );
        this.selectedNodeIds.forEach((nodeId) => {
          // draw the nodes' transients and their ancestor combos' transisents
          this.graph.drawTransient('node', nodeId, {
            upsertAncestors: !this.options.updateComboStructure,
          });
        });
        this.hiddenEdges.forEach((edge) => {
          this.graph.drawTransient('edge', edge.id, {});
        });

        // Hide original edges and nodes. They will be restored when pointerup.
        this.graph.executeWithoutStacking(() => {
          this.graph.hideItem(this.selectedNodeIds, true);
          this.graph.hideItem(
            this.hiddenEdges.map((edge) => edge.id),
            true,
          );
          this.graph.hideItem(
            this.hiddenComboTreeItems.map((combo) => combo.id),
            true,
          );
        });
      } else {
        this.graph.frontItem(this.selectedNodeIds);
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

    /**
     * When dragging nodes, if nodes are set to `preventPolylineEdgeOverlap`,
     * use quadtree collision detection to identity nearby edges and dynamically update them
     */
    if (this.dragging && enableTransient) {
      const autoRoutedNodesIds = this.selectedNodeIds.filter((nodeId) => {
        return (
          this.graph.getNodeData(nodeId)?.data.preventPolylineEdgeOverlap ||
          false
        );
      });

      if (autoRoutedNodesIds) {
        const hiddenEdgesIds = this.hiddenEdges.map((edge) => edge.id);
        this.hiddenNearEdges = this.getNearEdgesForNodes(
          autoRoutedNodesIds,
        ).filter((edge) => !hiddenEdgesIds.includes(edge.id));

        if (this.hiddenNearEdges.length) {
          this.hiddenNearEdges.forEach((edge) => {
            this.graph.drawTransient('edge', edge.id, {});
          });

          this.graph.hideItem(
            this.hiddenNearEdges.map((edge) => edge.id),
            true,
          );
        }
      }
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
    upsertAncestors = true,
    callback?: (positions: Position[]) => void,
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
      const positions = [...this.originPositions];
      this.graph.updateNodePosition(
        positionChanges,
        upsertAncestors,
        true,
        () => callback?.(positions),
      );
    }
  }

  public throttledMoveNodes: Function = (
    deltaX: number,
    deltaY: number,
    transient: boolean,
    upsertAncestors = true,
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
    this.hiddenNearEdges.forEach((edge) => {
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

  public restoreHiddenItems(positions?: Position[]) {
    this.graph.pauseStacking();
    if (this.hiddenEdges.length) {
      this.graph.showItem(
        this.hiddenEdges.map((edge) => edge.id),
        true,
      );
      this.hiddenEdges = [];
    }
    if (this.hiddenNearEdges.length) {
      this.graph.showItem(
        this.hiddenNearEdges.map((edge) => edge.id),
        true,
      );
      this.hiddenNearEdges = [];
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
        this.originPositions.concat(positions).map((position) => position.id),
        true,
      );
    }
    this.graph.resumeStacking();
  }

  public clearState() {
    // Reset state.
    this.originPositions = [];
  }

  public onClick(event: IG6GraphEvent) {
    this.onPointerUp(event);
    this.clearState();
  }

  public onPointerUp(event: IG6GraphEvent) {
    this.pointerDown = undefined;
    this.dragging = false;
    this.selectedNodeIds = [];
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
    this.moveNodes(
      deltaX,
      deltaY,
      false,
      true,
      debounce((positions) => {
        // restore the hidden items after move real nodes done
        if (enableTransient) {
          this.clearTransientItems();
        }

        if (this.options.enableDelegate) {
          this.clearDelegate();
        }

        // Restore all hidden items.
        // For all hideRelatedEdges, enableTransient and enableDelegate cases.
        this.restoreHiddenItems(positions);

        // Emit event.
        if (this.options.eventName) {
          this.graph.emit(this.options.eventName, {
            itemIds: positions.map((position) => position.id),
          });
        }

        // Reset state.
        this.clearState();
      }),
    );
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

    this.clearState();
  }

  public onDropNode(event: IG6GraphEvent) {
    const elements = this.graph.canvas.document.elementsFromPointSync(
      event.canvas.x,
      event.canvas.y,
    );
    const draggingIds = this.originPositions.map(({ id }) => id);
    const currentIds = elements
      // @ts-ignore TODO: G type
      .map((ele) => ele.parentNode.getAttribute?.('data-item-id'))
      .filter((id) => id !== undefined && !draggingIds.includes(id));
    // the top item which is not in draggingIds
    const dropId = currentIds.find(
      (id) => this.graph.getComboData(id) || this.graph.getNodeData(id),
    );
    // drop on a node A, move the dragged node to the same parent of A
    const newParentId = this.graph.getNodeData(dropId)
      ? this.graph.getNodeData(dropId).data.parentId
      : dropId;

    this.graph.startBatch();
    this.originPositions.forEach(({ id }) => {
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
    this.graph.stopBatch();
  }

  public onDropCombo(event: IG6GraphEvent) {
    event.stopPropagation();
    const newParentId = event.itemId;
    this.graph.startBatch();
    this.onPointerUp(event);
    this.originPositions.forEach(({ id }) => {
      const model = this.graph.getNodeData(id);
      if (!model) return;
      const { parentId } = model.data;
      if (parentId === newParentId) return;
      this.graph.updateData('node', { id, data: { parentId: newParentId } });
    });
    this.clearState();
    this.graph.stopBatch();
  }

  public onDropCanvas(event: IG6GraphEvent) {
    const elements = this.graph.canvas.document.elementsFromPointSync(
      event.canvas.x,
      event.canvas.y,
    );
    const draggingIds = this.originPositions.map(({ id }) => id);
    const currentIds = elements
      // @ts-ignore TODO: G type
      .map((ele) => ele.parentNode.getAttribute?.('data-item-id'))
      .filter((id) => id !== undefined && !draggingIds.includes(id));
    // the top item which is not in draggingIds
    const dropId = currentIds.find(
      (id) => this.graph.getComboData(id) || this.graph.getNodeData(id),
    );
    const parentId = this.graph.getNodeData(dropId)
      ? this.graph.getNodeData(dropId).data.parentId
      : dropId;
    this.graph.startBatch();
    this.onPointerUp(event);
    const nodeToUpdate = [];
    this.originPositions.forEach(({ id }) => {
      const { parentId: originParentId } = this.graph.getNodeData(id).data;
      if (parentId && originParentId !== parentId) {
        nodeToUpdate.push({ id, data: { parentId } });
        return;
      }
      if (!originParentId) return;
      nodeToUpdate.push({ id, data: { parentId: undefined } });
    });
    if (nodeToUpdate.length) this.graph.updateData('node', nodeToUpdate);
    this.clearState();
    this.graph.stopBatch();
  }
}
