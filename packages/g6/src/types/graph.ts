import EventEmitter from '@antv/event-emitter';
import { AABB, Canvas, DisplayObject, PointLike } from '@antv/g';
import { ID } from '@antv/graphlib';
import { Hooks } from '../types/hook';
import { CameraAnimationOptions } from './animate';
import { BehaviorObjectOptionsOf, BehaviorOptionsOf, BehaviorRegistry } from './behavior';
import { ComboModel, ComboUserModel } from './combo';
import { Padding, Point } from './common';
import { GraphData } from './data';
import { EdgeModel, EdgeUserModel } from './edge';
import { ITEM_TYPE, SHAPE_TYPE } from './item';
import { LayoutOptions } from './layout';
import { NodeModel, NodeUserModel } from './node';
import { Specification } from './spec';
import { ThemeRegistry } from './theme';
import { FitViewRules, GraphTransformOptions } from './view';

export interface IGraph<
  B extends BehaviorRegistry = BehaviorRegistry,
  T extends ThemeRegistry = ThemeRegistry,
> extends EventEmitter {
  hooks: Hooks;
  canvas: Canvas;
  transientCanvas: Canvas;
  destroyed: boolean;
  container: HTMLElement;

  // ===== graph instance ===
  /**
   * Destroy the graph instance and remove the related canvases.
   * @returns
   * @group Graph Instance
   */
  destroy: () => void;
  /**
   * Update the specs(configurations).
   */
  updateSpecification: (spec: Specification<B, T>) => void;
  /**
   * Get the copy of specs(configurations).
   * @returns graph specs
   */
  getSpecification: () => Specification<B, T>;

  // ====== data operations ====
  /**
   * Find a node's inner data according to id or function.
   * @param { ID | Function} condition id or condition function
   * @returns result node's inner data
   * @group Data
   */
  getNodeData: (condition: ID | Function) => NodeModel | undefined;
  /**
   * Find an edge's inner data according to id or function.
   * @param { ID | Function} condition id or condition function
   * @returns result edge's inner data
   * @group Data
   */
  getEdgeData: (condition: ID | Function) => EdgeModel | undefined;
  /**
   * Find a combo's inner data according to id or function.
   * @param { ID | Function} condition id or condition function
   * @returns result combo's inner data
   * @group Data
   */
  getComboData: (condition: ID | Function) => ComboModel | undefined;
  /**
   * Get all the nodes' inner data
   * @returns all nodes' inner data on the graph
   * @group Data
   */
  getAllNodesData: () => NodeModel[];
  /**
   * Get all the edges' inner data
   * @returns all edges' inner data on the graph
   * @group Data
   */
  getAllEdgesData: () => EdgeModel[];
  /**
   * Get all the combos' inner data
   * @returns all combos' inner data on the graph
   * @group Data
   */
  getAllCombosData: () => ComboModel[];
  /**
   * Get one-hop edge ids from a start node.
   * @param nodeId id of the start node
   * @returns one-hop edge ids
   * @group Data
   */
  getRelatedEdgesData: (nodeId: ID, direction?: 'in' | 'out' | 'both') => EdgeModel[];
  /**
   * Get one-hop node ids from a start node.
   * @param nodeId id of the start node
   * @returns one-hop node ids
   * @group Data
   */
  getNeighborNodesData: (nodeId: ID, direction?: 'in' | 'out' | 'both') => NodeModel[];

  /**
   * Input data and render the graph.
   * If there is old data, diffs and changes it.
   * @param data
   * @returns
   * @group Data
   */
  read: (data: GraphData) => void;
  /**
   * Change graph data.
   * @param data new data
   * @param type the way to change data, 'replace' means discard the old data and use the new one; 'mergeReplace' means merge the common part, remove (old - new), add (new - old)
   * @returns
   * @group Data
   */
  changeData: (data: GraphData, type: 'replace' | 'mergeReplace') => void;
  /**
   * Clear the graph, means remove all the items on the graph.
   * @returns
   */
  clear: () => void;
  /**
   * Find items which has the state.
   * @param itemType item type
   * @param state state name
   * @param value state value, true by default
   * @param additionalFilter additional filter function
   * @returns items that is the type and has the state
   * @group Item
   */
  findIdByState: (
    itemType: ITEM_TYPE,
    state: string,
    value?: string | boolean,
    additionalFilter?: (model: NodeModel | EdgeModel | ComboModel) => boolean,
  ) => ID[];
  /**
   * Add one or more node/edge/combo data to the graph.
   * @param itemType item type
   * @param model user data
   * @param stack whether push this operation to stack
   * @returns whehter success
   * @group Data
   */
  addData: (
    itemType: ITEM_TYPE,
    model:
      | NodeUserModel
      | EdgeUserModel
      | ComboUserModel
      | NodeUserModel[]
      | EdgeUserModel[]
      | ComboUserModel[],
    stack?: boolean,
  ) => NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[];
  /**
   * Remove one or more node/edge/combo data from the graph.
   * @param item the item to be removed
   * @param stack whether push this operation to stack
   * @returns whehter success
   * @group Data
   */
  removeData: (itemType: ITEM_TYPE, id: ID | ID[], stack?: boolean) => void;
  /**
   * Update one or more node/edge/combo data on the graph.
   * @param item the item to be updated
   * @param model update configs
   * @param {boolean} stack whether push this operation to stack
   * @group Data
   */
  updateData: (
    itemType: ITEM_TYPE,
    model:
      | Partial<NodeUserModel>
      | Partial<EdgeUserModel>
      | Partial<
          | ComboUserModel
          | Partial<NodeUserModel>[]
          | Partial<EdgeUserModel>[]
          | Partial<ComboUserModel>[]
        >,
    stack?: boolean,
  ) => NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[];

  // ===== view operations =====

  /**
   * Move the graph with a relative vector.
   * @param dx x of the relative vector
   * @param dy y of the relative vector
   * @param effectTiming animation configurations
   */
  translate: (dx: number, dy: number, effectTiming?: CameraAnimationOptions) => Promise<void>;
  /**
   * Move the graph and align to a point.
   * @param point position on the canvas to align
   * @param effectTiming animation configurations
   */
  translateTo: (point: PointLike, effectTiming?: CameraAnimationOptions) => Promise<void>;
  /**
   * Return the current zoom level of camera.
   * @returns current zoom
   */
  getZoom: () => number;
  /**
   * Zoom the graph with a relative ratio.
   * @param ratio relative ratio to zoom
   * @param center zoom center
   * @param effectTiming animation configurations
   */
  zoom: (ratio: number, center?: Point, effectTiming?: CameraAnimationOptions) => Promise<void>;
  /**
   * Zoom the graph to a specified ratio.
   * @param toRatio specified ratio
   * @param center zoom center
   * @param effectTiming animation configurations
   */
  zoomTo: (toRatio: number, center?: Point, effectTiming?: CameraAnimationOptions) => Promise<void>;
  /**
   * Rotate the graph with a relative angle in clockwise.
   * @param angle
   * @param center
   * @param effectTiming
   */
  rotate: (angle: number, center?: Point, effectTiming?: CameraAnimationOptions) => Promise<void>;
  /**
   * Rotate the graph to an absolute angle in clockwise.
   * @param toAngle
   * @param center
   * @param effectTiming
   */
  rotateTo: (
    toAngle: number,
    center?: Point,
    effectTiming?: CameraAnimationOptions,
  ) => Promise<void>;

  /**
   * Transform the graph with a CSS-Transform-like syntax.
   * @param options
   * @param effectTiming
   */
  transform: (
    options: GraphTransformOptions,
    effectTiming?: CameraAnimationOptions,
  ) => Promise<void>;
  /**
   * Stop the current transition of transform immediately.
   */
  stopTransformTransition: () => void;
  /**
   * Return the center of viewport, e.g. for a 500 * 500 canvas, its center is [250, 250].
   */
  getViewportCenter: () => PointLike;
  /**
   * Fit the graph content to the view.
   * @param options.padding padding while fitting
   * @param options.rules rules for fitting
   * @param effectTiming animation configurations
   * @returns
   * @group View
   */
  fitView: (
    options?: {
      padding: Padding;
      rules: FitViewRules;
    },
    effectTiming?: CameraAnimationOptions,
  ) => Promise<void>;
  /**
   * Fit the graph center to the view center.
   * @param effectTiming animation configurations
   * @returns
   * @group View
   */
  fitCenter: (effectTiming?: CameraAnimationOptions) => Promise<void>;
  /**
   * Move the graph to make the item align the view center.
   * @param item node/edge/combo item or its id
   * @param effectTiming animation configurations
   * @group View
   */
  focusItem: (id: ID | ID[], effectTiming?: CameraAnimationOptions) => Promise<void>;
  /**
   * Get the size of the graph canvas.
   * @returns [width, height]
   * @group View
   */
  getSize: () => number[];
  /**
   * Set the size for the graph canvas.
   * @param number[] [width, height]
   * @group View
   */
  setSize: (size: number[]) => void;

  /**
   * Get the rendering coordinate according to the canvas dom (viewport) coordinate.
   * @param Point rendering coordinate
   * @returns canvas dom (viewport) coordinate
   * @group View
   */
  getCanvasByViewport: (viewportPoint: Point) => Point;

  /**
   * Get the canvas dom (viewport) coordinate according to the rendering coordinate.
   * @param Point canvas dom (viewport) coordinate
   * @returns rendering coordinate
   * @group View
   */
  getViewportByCanvas: (canvasPoint: Point) => Point;

  /**
   * Get the browser coordinate according to the rendering coordinate.
   * @param Point rendering coordinate
   * @returns browser coordinate
   * @group View
   */
  getClientByCanvas: (canvasPoint: Point) => Point;

  /**
   * Get the rendering coordinate according to the browser coordinate.
   * @param Point browser coordinate
   * @returns rendering coordinate
   * @group View
   */
  getCanvasByClient: (ClientPoint: Point) => Point;

  // ===== item operations =====
  /**
   * Show the item(s).
   * @param ids the item id(s) to be shown
   * @returns
   * @group Data
   */
  showItem: (ids: ID | ID[]) => void;
  /**
   * Hide the item(s).
   * @param ids the item id(s) to be hidden
   * @returns
   * @group Item
   */
  hideItem: (ids: ID | ID[]) => void;
  /**
   * Set state for the item(s).
   * @param ids the id(s) for the item(s) to be set
   * @param state the state name
   * @param value state value
   * @returns
   * @group Item
   */
  setItemState: (ids: ID | ID[], state: string, value: boolean) => void;
  /**
   * Get the state value for an item.
   * @param id the id for the item
   * @param states the state name
   * @returns {boolean | string} the state value
   * @group Item
   */
  getItemState: (id: ID, state: string) => boolean | string;
  /**
   * Clear all the states for item(s).
   * @param ids the id(s) for the item(s) to be clear
   * @param states the states' names, all the states wil be cleared if states is not assigned
   * @returns
   * @group Item
   */
  clearItemState: (ids: ID | ID[], states?: string[]) => void;

  /**
   * Get the rendering bbox for a node / edge / combo, or the graph (when the id is not assigned).
   * @param id the id for the node / edge / combo, undefined for the whole graph
   * @returns rendering bounding box. returns false if the item is not exist
   */
  getRenderBBox: (id: ID | undefined) => AABB | false;

  /**
   * Get the visibility for a node / edge / combo.
   * @param id the id for the node / edge / combo
   * @returns visibility for the item, false for invisible or unexistence for the item
   */
  getItemVisible: (id: ID) => boolean;

  // ===== combo operations =====
  /**
   * Create a new combo with existing child nodes and combos.
   * @param combo combo ID or Combo model
   * @param childrenIds id array of children of the new combo
   * @group Combo
   */
  createCombo: (combo: string | ComboUserModel, childrenIds: string[], stack?: boolean) => void;
  /**
   * dissolve combo
   * @param {String | ICombo} item combo item or id to be dissolve
   */
  uncombo: (comboId: ID, stack?: boolean) => void;
  /**
   * Collapse a combo.
   * @param comboId combo id or item
   * @group Combo
   */
  collapseCombo: (comboId: ID, stack?: boolean) => void;
  /**
   * Expand a combo.
   * @group Combo
   * @param combo combo ID 或 combo 实例
   * @group Combo
   */
  expandCombo: (comboId: ID, stack?: boolean) => void;

  // ===== layout =====
  /**
   * Layout the graph (with current configurations if cfg is not assigned).
   */
  layout: (options?: LayoutOptions) => Promise<void>;
  stopLayout: () => void;

  // ===== interaction =====
  /**
   * Switch mode.
   * @param mode mode name
   * @returns
   * @group Interaction
   */
  setMode: (mode: string) => void;
  /**
   * Add behavior(s) to mode(s).
   * @param behaviors behavior names or configs
   * @param modes mode names
   * @returns
   */
  addBehaviors: (behaviors: BehaviorOptionsOf<B>[], modes: string | string[]) => void;
  /**
   * Remove behavior(s) from mode(s).
   * @param behaviors behavior names or configs
   * @param modes mode names
   * @returns
   * @group Interaction
   */
  removeBehaviors: (behaviorKeys: string[], modes: string | string[]) => void;
  /**
   * Update a behavior on a mode.
   * @param behavior behavior configs, whose name indicates the behavior to be updated
   * @param mode mode name
   * @returns
   * @group Interaction
   */
  updateBehavior: (behavior: BehaviorObjectOptionsOf<B>, mode?: string) => void;

  /**
   * Draw or update a G shape or group to the transient canvas.
   * @param type shape type or item type
   * @param id new shape id or updated shape id for a interation shape, node/edge/combo id for item interaction group drawing
   * @returns upserted shape or group
   * @group Interaction
   */
  drawTransient: (type: ITEM_TYPE | SHAPE_TYPE, id: ID, config: any) => DisplayObject;

}
