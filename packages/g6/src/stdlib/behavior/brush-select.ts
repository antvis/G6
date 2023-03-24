import { DisplayObject } from '@antv/g';
import { ID } from '@antv/graphlib';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';
import { Point } from '../../types/common';
import { utils } from '../../stdlib'
import { ITEM_TYPE } from '../../types/item';
import { diffSet, intersectSet, unionSet } from '../../util/array';
import { getEdgesBetween } from '../../util/item';

const ALLOWED_TRIGGERS = ['drag', 'shift', 'ctrl', 'alt', 'meta'] as const;
const BRUSH_SHAPE_ID = 'g6-brush-select-brush-shape';
type Trigger = (typeof ALLOWED_TRIGGERS)[number];
type IDSet = {
  nodes: ID[],
  edges: ID[],
  combos: ID[]
}

interface BrushSelectOptions {
  /**
   * The key to pressed with mouse click to apply multiple selection.
   * Defaults to `"shift"`.
   * Could be "drag", "shift", "ctrl", "alt", or "meta".
   */
  trigger: Trigger;
  /**
   * Item types to be able to select.
   * Defaults to `["nodes"]`.
   * Should be an array of "node", "edge", or "combo".
   */
  itemTypes: Array<'node' | 'edge' | 'combo'>;
  /**
   * The state to be applied when select.
   * Defaults to `"selected"`.
   * Can be set to "active", "highlighted", etc.
   */
  selectedState: 'selected'; // TODO: Enum
  /**
   * The event name to trigger when select/unselect an item.
   */
  eventName: string;
  /**
   * The shape style of the brush while selecting.
   */
  brushStyle: {
    fill?: string;
    stroke?: string;
    fillOpacity?: number;
    lineWidth?: number;
    [key: string]: unknown;
  };
  /** The mode to compose the selections from times of brush */
  selectSetMode: 'union' | 'intersect' | 'diff' | 'latest'
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin: (event: IG6GraphEvent) => boolean;
  /**
   * Whether to update item state.
   * If it returns false, you may probably listen to `eventName` and
   * manage states or data manually
   */
  shouldUpdate: (itemType: ITEM_TYPE, id: ID, action: 'select' | 'deselect', self: BrushSelect) => boolean;
  /**
   * A callback be called after selecting.
   */
  onSelect: (selectedIds: { nodes: ID[]; edges: ID[]; combos: ID[]; }) => void;
  /**
   * A callback be called after deselecting.
   */
  onDeselect: (
    selectedIds: { nodes: ID[]; edges: ID[]; combos: ID[]; },
    deselectedIds: { nodes: ID[]; edges: ID[]; combos: ID[]; }
  ) => void;
}

const DEFAULT_OPTIONS: BrushSelectOptions ={
  trigger: 'shift',
  selectedState: 'selected',
  itemTypes: ['node', 'edge'],
  eventName: '',
  selectSetMode: 'latest',
  brushStyle: {
    fill: '#EEF6FF',
    fillOpacity: 0.4,
    stroke: '#DDEEFE',
    lineWidth: 1,
  },
  shouldBegin: () => true,
  shouldUpdate: () => true,
  onSelect: () => {},
  onDeselect: () => {},
};

export default class BrushSelect extends Behavior {
  options: BrushSelectOptions;
  brush: DisplayObject | undefined;
  selectedIds: IDSet | undefined = {
    nodes: [],
    edges: [],
    combos: []
  }
  beginPoint: Point;
  dragging: boolean;
  mousedown: boolean; // TODO: no need if the drag events are supported on graph

  constructor(options: Partial<BrushSelectOptions>) {
    super(Object.assign({}, DEFAULT_OPTIONS, options));
    // Validate options
    if (options.trigger && !ALLOWED_TRIGGERS.includes(options.trigger)) {
      console.warn(`G6: Invalid trigger option "${options.trigger}" for brush-select behavior!`);
      this.options.trigger = DEFAULT_OPTIONS.trigger;
    }
  }

  getEvents = () => {
    return {
      // 'dragstart': this.onMouseDown,
      // 'drag': this.onMouseMove,
      // 'dragend': this.onMouseUp,

      'canvas:pointerdown': this.onMouseDown,
      'canvas:pointermove': this.onMouseMove,
      'canvas:pointerup': this.onMouseUp,
    }
  }

  private isKeydown(event: MouseEvent) {
    const trigger = this.options.trigger;
    const keyMap: Record<Trigger, boolean> = {
      drag: true,
      shift: event.shiftKey,
      ctrl: event.ctrlKey,
      alt: event.altKey,
      meta: event.metaKey,
    };
    return keyMap[trigger];
  };

  public onMouseDown (event: IG6GraphEvent) {
    if (!this.options.shouldBegin(event)) return;
    const { itemId, canvas } = event;
    // should not begin at an item
    if (itemId && itemId !== 'CANVAS') return;

    this.beginPoint = {
      x: canvas.x,
      y: canvas.y
    }
    
    if (!this.isKeydown(event as any)) return;

    const { brush } = this;
    if (!brush) {
      this.brush = this.createBrush();
    }
    if (this.brush) {
    this.brush.setAttribute('width', 0);
    this.brush.setAttribute('height', 0);
    this.brush.setAttribute('visibility', 'visible');
    }
    this.mousedown = true; // TODO: no need if the drag events are supported on graph, use dragging instead
    // this.dragging = true;
  };

  public onMouseMove (event: IG6GraphEvent) {
    if (!this.mousedown) return;  // TODO: no need if the drag events are supported on graph, use dragging instead
    // if (!this.dragging) return;
    if (!this.isKeydown(event as any)) return;

    this.dragging = true;
    this.brush = this.updateBrush(event);
  };

  public onMouseUp (event: IG6GraphEvent) {
    if (!this.isKeydown(event as any)) {
      this.clearStates();
    }

    this.removeBrush();
    this.brush = undefined;
    this.selectedIds = this.selectItems(event);
    this.dragging = false;
    this.mousedown = false;
  };

  clearStates = (
    clearIds: IDSet| undefined = undefined,
    restIds = undefined
  ) => {
    const { graph } = this;
    const { selectedState, eventName, onDeselect } = this.options;

    let nodes: ID[] = [];
    let edges: ID[] = [];
    let combos: ID[] = []
    if (clearIds) {
      nodes = clearIds.nodes;
      edges = clearIds.edges;
      combos = clearIds.combos;
      this.selectedIds = restIds || {
        nodes: [],
        edges: [],
        combos: []
      };
    } else {
      nodes = graph.findIdByState('node', selectedState);
      edges = graph.findIdByState('edge', selectedState);
      combos = graph.findIdByState('combo', selectedState);
      this.selectedIds = {
        nodes: [],
        edges: [],
        combos: []
      }
    }
    nodes.concat(edges).concat(combos).forEach(id => graph.setItemState(id, selectedState, false));


    if (nodes.length || edges.length || combos.length) {
      const deselectIds = { nodes, edges, combos };
      onDeselect?.(this.selectedIds, deselectIds);
  
      if (eventName) {
        graph.emit(eventName, {
          action: 'deselect',
          selectedIds: this.selectedIds,
          deselectedIds: deselectIds
        });
      }
    }
  };

  selectItems = (event: IG6GraphEvent) => {
    const { graph, options } = this;
    const { selectedState, itemTypes, eventName, selectSetMode, shouldUpdate, onSelect } = options;
    const selector = this.getSelector();
    const points = this.getPoints(event).filter(Boolean);
    if (points.length < 2) return;
    let selectedIds = selector(graph, points, itemTypes.concat('node'));
    let operateSetFunc = (a, b) => b;
    const currentNotEmpty = this.selectedIds?.nodes.length || this.selectedIds?.edges.length || this.selectedIds?.combos.length

    switch (selectSetMode) {
      case 'diff':
        if (currentNotEmpty) {
          operateSetFunc = diffSet;
        }
        break;
      case 'union':
        operateSetFunc = unionSet;
        break;
      case 'intersect':
        if (currentNotEmpty) {
          operateSetFunc = intersectSet;
        }
        break;
      case 'latest':
      default:
        break;
    }
    selectedIds = {
      nodes: operateSetFunc(this.selectedIds?.nodes, selectedIds.nodes).filter(id => shouldUpdate('node', id, 'select', this)),
      edges: [],
      combos: operateSetFunc(this.selectedIds?.combos, selectedIds.combos).filter(id => shouldUpdate('combo', id, 'select', this))
    };
    const edgeSelectable = itemTypes.includes('edge');
    if (edgeSelectable) {
      selectedIds.edges = getEdgesBetween(graph, selectedIds.nodes.concat(selectedIds.combos)).filter(id => shouldUpdate('edge', id, 'select', this));
    }
    const nodeSelectable = itemTypes.includes('node');
    if (!nodeSelectable) selectedIds.nodes = [];
    const comboSelectable = itemTypes.includes('combo');
    if (!comboSelectable) selectedIds.combos = [];

    if (selectedState) {
      const diffToClear = {
        nodes: nodeSelectable ? diffSet(this.selectedIds?.nodes, selectedIds.nodes) : [],
        edges: edgeSelectable ? diffSet(this.selectedIds?.edges, selectedIds.edges) : [],
        combos: comboSelectable ? diffSet(this.selectedIds?.combos, selectedIds.combos) : []
      }
      const clearNotEmpty = diffToClear.nodes.length || diffToClear.edges.length || diffToClear.combos.length;
      if (clearNotEmpty) {
        this.clearStates(diffToClear, selectedIds as any);
      }
      const { nodes, edges, combos } = selectedIds;
      nodes.concat(edges).concat(combos).forEach(id => graph.setItemState(id, selectedState, true));
    }
    this.selectedIds = selectedIds;
    onSelect?.(this.selectedIds);

    // Emit an event.
    if (eventName) {
      graph.emit(eventName, {
        action: 'select',
        selectedIds: this.selectedIds
      });
    }
    return this.selectedIds;
  };

  createBrush = () => {
    const { graph, options } = this;
    const { brushStyle } = options;
    const brush = graph.drawTransient(
      'rect',
      BRUSH_SHAPE_ID,
      {
        style: brushStyle,
        capture: false,
      }
    )
    return brush;
  };

  updateBrush = (event: IG6GraphEvent) => {
    const { beginPoint, graph } = this;
    const endPoint = event.canvas;
    const brush = graph.drawTransient(
      'rect',
      BRUSH_SHAPE_ID,
      {
        style: {
          width: Math.abs(endPoint.x - beginPoint.x),
          height: Math.abs(endPoint.y - beginPoint.y),
          x: Math.min(endPoint.x, beginPoint.x),
          y: Math.min(endPoint.y, beginPoint.y),
        }
      }
    )
    return brush;
  }

  removeBrush = () => {
    const { graph } = this;
    graph.drawTransient(
      'rect', 
      BRUSH_SHAPE_ID,
      { action: 'remove' }
    );
  }

  getSelector = () => {
    return utils.rectSelector;
  }

  getPoints = (event: IG6GraphEvent) => {
    const { canvas: point } = event;
    return [this.beginPoint, point];
  }

  destroy() {
    this.removeBrush();
  }
};
