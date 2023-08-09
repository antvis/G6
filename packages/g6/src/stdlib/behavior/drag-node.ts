import { ID } from '@antv/graphlib';
import { throttle, uniq } from '@antv/util';
import { EdgeModel } from '../../types';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';
import { Point } from '../../types/common';

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
  shouldBegin: () => true,
};

export default class DragNode extends Behavior {
  options: DragNodeOptions;

  // Private states
  private hiddenEdges: EdgeModel[] = [];
  private selectedNodeIds: ID[] = [];
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
    return {
      'node:pointerdown': this.onPointerDown,
      pointermove: this.onPointerMove,
      pointerup: this.onPointerUp,
      // FIXME: IG6Event -> keyboard event
      keydown: this.onKeydown as any,
    };
  };

  /** Given selected node ids, get their related visible edges. */
  private getRelatedEdges(selectedNodeIds: ID[], visible = true) {
    let edges = uniq(
      selectedNodeIds.flatMap((nodeId) => {
        const preventEdgeOverlap =
          this.graph.getNodeData(nodeId).data.preventEdgeOverlap || false;
        if (preventEdgeOverlap) {
          return this.graph.getAffectedEdgesByNodeMovement(nodeId);
        } else {
          return this.graph.getRelatedEdgesData(nodeId);
        }
      }),
    );
    if (visible) {
      edges = edges.filter((edgeData) => {
        return visible && this.graph.getItemVisible(edgeData.id);
      });
    }
    return edges;
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

      this.originPositions = this.selectedNodeIds.map((id) => {
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
      });

      // Hide related edge.
      if (this.options.hideRelatedEdges && !enableTransient) {
        this.hiddenEdges = this.getRelatedEdges(this.selectedNodeIds);
        this.graph.hideItem(
          this.hiddenEdges.map((edge) => edge.id),
          true,
        );
      }

      // Draw transient nodes and edges.
      if (enableTransient) {
        // Draw transient edges and nodes.
        this.hiddenEdges = this.getRelatedEdges(this.selectedNodeIds);
        this.selectedNodeIds.forEach((nodeId) => {
          this.graph.drawTransient('node', nodeId, {});
        });
        this.hiddenEdges.forEach((edge) => {
          this.graph.drawTransient('edge', edge.id, {});
        });

        // Hide original edges and nodes. They will be restored when pointerup.
        this.graph.hideItem(this.selectedNodeIds, true);
        this.graph.hideItem(
          this.hiddenEdges.map((edge) => edge.id),
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

      // @ts-ignore FIXME: Type
      this.originX = event.canvas.x;
      // @ts-ignore FIXME: Type
      this.originY = event.canvas.y;
    }

    if (this.dragging && enableTransient) {
      this.hiddenEdges = this.getRelatedEdges(this.selectedNodeIds, false);
      this.selectedNodeIds.forEach((nodeId) => {
        this.graph.drawTransient('node', nodeId, {});
      });
      this.hiddenEdges.forEach((edge) => {
        this.graph.drawTransient('edge', edge.id, {});
      });

      // Hide original edges and nodes. They will be restored when pointerup.
      this.graph.hideItem(this.selectedNodeIds, true);
      this.graph.hideItem(
        this.hiddenEdges.map((edge) => edge.id),
        true,
      );
    }

    if (!this.originPositions.length) {
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
      this.throttledMoveNodes(deltaX, deltaY, enableTransient);
    }
  }

  public moveNodes(deltaX: number, deltaY: number, transient: boolean) {
    const positionChanges = this.originPositions.map(({ id, x, y }) => {
      return {
        id,
        data: {
          x: x + deltaX,
          y: y + deltaY,
        },
      };
    });
    if (transient) {
      // Move transient nodes
      this.originPositions.forEach(({ id, x, y }) => {
        this.graph.drawTransient('node', id, {
          data: {
            x: x + deltaX,
            y: y + deltaY,
          },
        });
      });
      // Update transient edges.
      this.hiddenEdges.forEach((edge) => {
        this.graph.drawTransient('edge', edge.id, {});
      });
    } else {
      this.graph.updateNodePosition(positionChanges);
    }
  }

  public throttledMoveNodes: Function = (
    deltaX: number,
    deltaY: number,
    transient: boolean,
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
    this.selectedNodeIds = [];
    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
    // If transient or delegate was enabled, move the real nodes.
    if (enableTransient || this.options.enableDelegate) {
      // @ts-ignore FIXME: type
      const pointerEvent = event as PointerEvent;
      // @ts-ignore FIXME: Type
      const deltaX = pointerEvent.canvas.x - this.originX;
      // @ts-ignore FIXME: Type
      const deltaY = pointerEvent.canvas.y - this.originY;
      this.moveNodes(deltaX, deltaY, false);
    }

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
}
