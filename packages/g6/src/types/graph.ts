import EventEmitter from '@antv/event-emitter';
import { Hooks } from '../types/hook';
import { AnimateCfg } from './animate';
import { BehaviorObjectOptionsOf, BehaviorOptionsOf, BehaviorRegistry } from './behavior';
import { ComboModel, ComboUserModel } from './combo';
import { Padding, Point } from './common';
import { GraphData } from './data';
import { EdgeModel, EdgeUserModel } from './edge';
import { ITEM_TYPE } from './item';
import { LayoutCommonConfig } from './layout';
import { NodeModel, NodeUserModel } from './node';
import { Specification } from './spec';
import { FitViewRules, GraphAlignment } from './view';

export interface IGraph<B extends BehaviorRegistry = BehaviorRegistry> extends EventEmitter {

  hooks: Hooks;

  /**
   * Update the specs(configurations).
   */
  updateSpecification: (spec: Specification<B>) => void;
  /**
   * Get the copy of specs(configurations).
   * @returns graph specs
   */
  getSpecification: () => Specification<B>;

  // ====== data operations ====
  /**
   * Find a node's inner data according to id or function.
   * @param { string | Function} condition id or condition function
   * @returns result node
   * @group Item
   */
  getNodeData: (condition: string | Function) => NodeModel | undefined;
  /**
   * Find an edge's inner data according to id or function.
   * @param { string | Function} condition id or condition function
   * @returns result edge
   * @group Item
   */
  getEdgeData: (condition: string | Function) => EdgeModel | undefined;
  /**
   * Find a combo's inner data according to id or function.
   * @param { string | Function} condition id or condition function
   * @returns result combo
   * @group Item
   */
  getComboData: (condition: string | Function) => ComboModel | undefined;
  /**
   * Input data and render the graph.
   * If there is old data, diffs and changes it.
   * @param data 
   * @returns 
   * @group Data
   */
  read: (data: GraphData) => void;
  /**
   * Clear the graph, means remove all the items on the graph.
   * @returns 
   */
  clear: () => void;


  // ===== view operations =====

  /**
   * Move the graph with a relative vector.
   * @param dx x of the relative vector
   * @param dy y of the relative vector
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  move: (dx: number, dy: number, animateCfg?: AnimateCfg) => void;
  /**
   * Move the graph and align to a point.
   * @param x position on the canvas to align
   * @param y position on the canvas to align
   * @param alignment alignment of the graph content
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  moveTo: (x: number, y: number, alignment: GraphAlignment, animateCfg?: AnimateCfg) => void;
  /**
   * Zoom the graph with a relative ratio.
   * @param ratio relative ratio to zoom
   * @param center zoom center
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  zoom: (ratio: number, center?: Point, animateCfg?: AnimateCfg) => void;
  /**
   * Zoom the graph to a specified ratio.
   * @param toRatio specified ratio
   * @param center zoom center
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  zoomTo: (toRatio: number, center?: Point, animateCfg?: AnimateCfg) => void;
  /**
   * Fit the graph content to the view.
   * @param padding padding while fitting
   * @param rules rules for fitting
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  fitView: (padding?: Padding, rules?: FitViewRules, animateCfg?: AnimateCfg) => void;
  /**
   * Fit the graph center to the view center.
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  fitCenter: (animateCfg?: AnimateCfg) => void;
  /**
   * Move the graph to make the item align the view center.
   * @param item node/edge/combo item or its id
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  focusItem: (ids: string | number | (string | number)[], animateCfg?: AnimateCfg) => void;


  // ===== item operations =====
  /**
   * Find items which has the state.
   * @param itemType item type
   * @param state state name
   * @param additionalFilter additional filter function
   * @returns items that is the type and has the state
   * @group Item
   */
  findIdByState: (itemType: ITEM_TYPE, state: string, additionalFilter?: (model: NodeModel | EdgeModel | ComboModel) => boolean) => (string | number)[];
  /**
   * Add an item or items to the graph.
   * @param itemType item type
   * @param model user data
   * @param stack whether push this operation to stack
   * @returns whehter success
   * @group Item
   */
  addItem: (itemType: ITEM_TYPE, model: NodeUserModel | EdgeUserModel | ComboUserModel | NodeUserModel[] | EdgeUserModel[] | ComboUserModel[], stack?: boolean) => boolean;

  /**
   * Remove an item or items from the graph.
   * @param item the item to be removed
   * @param stack whether push this operation to stack
   * @returns whehter success
   * @group Item
   */
  removeItem: (itemType: ITEM_TYPE, id: string | number | (string | number)[], stack?: boolean) => boolean;
  /**
   * Update an item or items on the graph.
   * @param item the item to be updated
   * @param model update configs
   * @param {boolean} stack whether push this operation to stack
   * @group Item
   */
  updateItem: (itemType: ITEM_TYPE, model: Partial<NodeUserModel> | Partial<EdgeUserModel> | Partial<ComboUserModel | Partial<NodeUserModel>[] | Partial<EdgeUserModel>[] | Partial<ComboUserModel>[]>, stack?: boolean) => boolean;
  /**
   * Show the item(s).
   * @param ids the item id(s) to be shown
   * @returns 
   * @group Item
   */
  showItem: (ids: string | number | (string | number)[]) => void;
  /**
   * Hide the item(s).
   * @param ids the item id(s) to be hidden
   * @returns 
   * @group Item
   */
  hideItem: (ids: string | number | (string | number)[]) => void;
  /**
   * Set state for the item(s).
   * @param ids the id(s) for the item(s) to be set
   * @param state the state name
   * @param value state value
   * @returns 
   * @group Item
   */
  setItemState: (ids: string | number | (string | number)[], state: string, value: boolean) => void;


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
  uncombo: (comboId: string | number, stack?: boolean) => void;
  /**
  * Collapse a combo.
  * @param comboId combo id or item
  * @group Combo
  */
  collapseCombo: (comboId: string | number, stack?: boolean) => void;
  /**
 * Expand a combo.
 * @group Combo
 * @param combo combo ID 或 combo 实例
 * @group Combo
 */
  expandCombo: (comboId: string | number, stack?: boolean) => void;


  // ===== layout =====
  /**
   * Layout the graph (with current configurations if cfg is not assigned).
   * @param {LayoutCommonConfig} cfg layout configurations. if assigned, the layout spec of the graph will be updated in the same time
   * @param {GraphAlignment} align align the result
   * @param {Point} canvasPoint align the result
   * @param {boolean} stack push it into stack
   * @group Layout
   */
  layout: (cfg?: LayoutCommonConfig, align?: GraphAlignment, canvasPoint?: Point, stack?: boolean) => void;


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
}