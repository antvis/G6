import { ID } from '@antv/graphlib';
import { debounce, uniq } from '@antv/util';
import { EdgeModel } from '../../types';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';

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
   * The time in milliseconds to debounce moving. Useful to avoid the frequent calculation.
   * Defaults to 0.
   */
  debounce?: number;
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
  debounce: 0,
  hideRelatedEdges: false,
  selectedState: 'selected',
  eventName: '',
  shouldBegin: () => true,
};

export class DragNode extends Behavior {
  options: DragNodeOptions;

  // Private states
  private hiddenEdges: EdgeModel[] = [];
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
  private getRelatedEdges(selectedNodeIds: ID[]) {
    return uniq(
      selectedNodeIds.flatMap((nodeId) =>
        this.graph.getRelatedEdgesData(nodeId),
      ),
    ).filter((edgeData) => {
      return this.graph.getItemVisible(edgeData.id);
    });
  }

  public onPointerDown(event: IG6GraphEvent) {
    if (!this.options.shouldBegin(event)) return;
    const currentNodeId = event.itemId;
    let selectedNodeIds = this.graph.findIdByState(
      'node',
      this.options.selectedState,
      true,
    );

    // If current node is selected, drag all the selected nodes together.
    // Otherwise drag current node.
    if (!selectedNodeIds.includes(currentNodeId)) {
      selectedNodeIds = [currentNodeId];
    }

    this.originPositions = selectedNodeIds.map((id) => {
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

    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';

    // Hide related edge.
    if (this.options.hideRelatedEdges && !enableTransient) {
      this.hiddenEdges = this.getRelatedEdges(selectedNodeIds);
      this.graph.hideItem(this.hiddenEdges.map((edge) => edge.id));
    }

    // Draw transient nodes and edges.
    if (enableTransient) {
      // Draw transient edges and nodes.
      this.hiddenEdges = this.getRelatedEdges(selectedNodeIds);
      this.hiddenEdges.forEach((edge) => {
        this.graph.drawTransient('edge', edge.id, {});
      });
      selectedNodeIds.forEach((nodeId) => {
        this.graph.drawTransient('node', nodeId, {});
      });

      // Hide original edges and nodes. They will be restored when pointerup.
      this.graph.hideItem(selectedNodeIds);
      this.graph.hideItem(this.hiddenEdges.map((edge) => edge.id));
    }

    // Debounce moving.
    if (this.options.debounce > 0) {
      this.debouncedMoveNodes = debounce(this.moveNodes, this.options.debounce);
    } else {
      this.debouncedMoveNodes = this.moveNodes;
    }

    // @ts-ignore FIXME: Type
    this.originX = event.client.x;
    // @ts-ignore FIXME: Type
    this.originY = event.client.y;
  }

  public onPointerMove(event: IG6GraphEvent) {
    if (!this.originPositions.length) {
      return;
    }

    // @ts-ignore FIXME: type
    const pointerEvent = event as PointerEvent;
    // @ts-ignore FIXME: Type
    const deltaX = pointerEvent.client.x - this.originX;
    // @ts-ignore FIXME: Type
    const deltaY = pointerEvent.client.y - this.originY;

    if (this.options.enableDelegate) {
      this.moveDelegate(deltaX, deltaY);
    } else {
      const enableTransient =
        this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
      this.debouncedMoveNodes(deltaX, deltaY, enableTransient);
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
      this.graph.updateData('node', positionChanges);
    }
  }

  public debouncedMoveNodes(
    deltaX: number,
    deltaY: number,
    transient: boolean,
  ) {
    // Should be overrided when drag start.
  }

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
      this.graph.showItem(this.hiddenEdges.map((edge) => edge.id));
      this.hiddenEdges = [];
    }
    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
    if (enableTransient) {
      this.graph.showItem(this.originPositions.map((position) => position.id));
    }
  }

  public onPointerUp(event: IG6GraphEvent) {
    const enableTransient =
      this.options.enableTransient && this.graph.rendererType !== 'webgl-3d';
    // If transient or delegate was enabled, move the real nodes.
    if (enableTransient || this.options.enableDelegate) {
      // @ts-ignore FIXME: type
      const pointerEvent = event as PointerEvent;
      // @ts-ignore FIXME: Type
      const deltaX = pointerEvent.client.x - this.originX;
      // @ts-ignore FIXME: Type
      const deltaY = pointerEvent.client.y - this.originY;
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
      this.graph.updateData('node', positionChanges);
    }

    this.originPositions = [];
  }
}
