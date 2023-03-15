import { ID } from '@antv/graphlib';
import { debounce } from '@antv/util';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';

const DELEGATE_SHAPE_ID = 'g6-drag-node-delegate-shape';

// TODO: Combo related features:
// onlyChangeComboSize
// comboActiveState
// comboStateStyles

interface DragNodeOptions {
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
   * Defaults to false.
   */
  hideRelatedEdge?: boolean;
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
  enableDelegate: false,
  delegateStyle: {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [5, 5],
  },
  debounce: 0,
  hideRelatedEdge: false,
  selectedState: 'selected',
  eventName: '',
  shouldBegin: () => true,
};

export class DragNode extends Behavior {
  options: DragNodeOptions;

  // Private states
  private originX: number;
  private originY: number;
  private hiddenEdgeIds: ID[] = [];
  private originPositions: Array<{
    id: ID;
    x: number;
    y: number;
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
  }> = [];

  constructor(options: Partial<DragNodeOptions>) {
    super(Object.assign({}, DEFAULT_OPTIONS, options));
  }

  getEvents = () => {
    return {
      'node:pointerdown': this.onPointerDown,
      'pointermove': this.onPointerMove,
      'pointerup': this.onPointerUp,
      // FIXME: IG6Event -> keyboard event
      'keydown': this.onKeydown as any,
    };
  };

  onPointerDown = (event: IG6GraphEvent) => {
    if (!this.options.shouldBegin(event)) return;
    const currentNodeId = event.itemId;
    let selectedNodeIds = this.graph.findIdByState('node', this.options.selectedState, true);

    // If current node is selected, drag all the selected nodes together.
    // Otherwise drag current node.
    if (!selectedNodeIds.includes(currentNodeId)) {
      selectedNodeIds = [currentNodeId];
    }

    this.originPositions = selectedNodeIds.map(id => {
      const { x, y } = this.graph.getNodeData(id).data as { x: number, y: number };
      // If delegate is enabled, record bbox together.
      if (this.options.enableDelegate) {
        const bbox = this.graph.getRenderBBox(id);
        if (bbox) {
          const [minX, minY] = bbox.min;
          const [maxX, maxY] = bbox.max;
          return { id, x, y, minX, minY, maxX, maxY };
        }
      }
      return { id, x, y};
    });

    // Hide related edge.
    if (this.options.hideRelatedEdge) {
      // FIXME: Should use getRelatedEdges for better performance.
      this.hiddenEdgeIds = this.graph.getAllEdgesData().filter(edge => {
        return (selectedNodeIds.includes(edge.source) || selectedNodeIds.includes(edge.target));
      }).map(edge => edge.id);
      this.graph.hideItem(this.hiddenEdgeIds);
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
  };

  onPointerMove = (event: IG6GraphEvent) => {
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
      this.debouncedMoveNodes(deltaX, deltaY);
    }
  }

  moveNodes = (deltaX: number, deltaY: number) => {
    const positionChanges = this.originPositions.map(({ id, x, y}) => {
      return {
        id,
        data: {
          x: x + deltaX,
          y: y + deltaY,
        }
      };
    });
    this.graph.updateData('node', positionChanges);
  };

  debouncedMoveNodes = (deltaX: number, deltaY: number) => {
    // Should be overrided when drag start.
  };

  moveDelegate = (deltaX: number, deltaY: number) => {
    const x1 = Math.min(...this.originPositions.map(position => position.minX));
    const y1 = Math.min(...this.originPositions.map(position => position.minY));
    const x2 = Math.max(...this.originPositions.map(position => position.maxX));
    const y2 = Math.max(...this.originPositions.map(position => position.maxY));
    this.graph.drawTransient(
      'rect',
      DELEGATE_SHAPE_ID,
      {
        style: {
          x: x1 + deltaX,
          y: y1 + deltaY,
          width: x2 - x1,
          height: y2 - y1,
          ...this.options.delegateStyle,
        }
      }
    )
  };

  clearDelegate = () => {
    this.graph.drawTransient(
      'rect',
      DELEGATE_SHAPE_ID,
      { action: 'remove' }
    );
  };

  restoreHiddenEdge = () => {
    if (this.hiddenEdgeIds.length) {
      this.graph.showItem(this.hiddenEdgeIds);
      this.hiddenEdgeIds = [];
    }
  }

  onPointerUp = (event: IG6GraphEvent) => {
    this.restoreHiddenEdge();

    // Remove delegate and move nodes.
    if (this.options.enableDelegate) {
      this.clearDelegate();
      // @ts-ignore FIXME: type
      const pointerEvent = event as PointerEvent;
      // @ts-ignore FIXME: Type
      const deltaX = pointerEvent.client.x - this.originX;
      // @ts-ignore FIXME: Type
      const deltaY = pointerEvent.client.y - this.originY;
      this.moveNodes(deltaX, deltaY);
    }

    // Emit event.
    if (this.options.eventName) {
      this.graph.emit(this.options.eventName, {
        itemIds: this.originPositions.map(position => position.id),
      });
    }

    // Reset state.
    this.originPositions = [];
  };

  onKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' && event.key !== 'Esc') {
      return;
    }
    this.restoreHiddenEdge();
    this.clearDelegate();
    this.originPositions = [];
  };
};
