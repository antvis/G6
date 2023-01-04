import EventEmitter from '@antv/event-emitter';
import { AnimateCfg } from './animate';
import { ComboUserData } from './combo';
import { Padding, Point } from './common';
import { GraphData } from './data';
import { EdgeUserData } from './edge';
import { ITEM_TYPE } from './item';
import { LayoutCommonConfig } from './layout';
import { NodeUserData } from './node';
import { Specification } from './spec';
import { FitViewRules, GraphAlignment } from './view';

// TODO: 1. BehaviorCfg type; 2. Item type;

export interface IGraph extends EventEmitter {

  /**
   * Update the specs(configurations).
   */
  updateSpec: (spec: Specification) => void;
  /**
   * Input data and render the graph.
   * @param data 
   * @returns 
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
  focusItem: (item: Item | string, animateCfg?: AnimateCfg) => void;
  /**
   * Move (and zoom) the graph to make the items align (and fit) the view center.
   * @param items node/edge/combo item array or their id array
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  focusItems: (items: Item[] | string[], zoomToFit?: boolean, animateCfg?: AnimateCfg) => void;


  // ===== item operations =====
  /**
   * Find an element item according to id.
   * @param id 
   * @returns 
   * @group Item
   */
  findById: <T extends Item>(id: string) => T | undefined;
  /**
   * Find items which has the state.
   * @param itemType item type
   * @param state state name
   * @param additionalFilter additional filter function
   * @returns items that is the type and has the state
   * @group Item
   */
  findByState: <T extends Item>(itemType: ITEM_TYPE, state: string, additionalFilter?: (item: Item) => boolean) => T[];
  /**
   * Add an item to the graph.
   * @param itemType item type
   * @param model user data
   * @param stack whether push this operation to stack
   * @returns the added item
   * @group Item
   */
  addItem: (itemType: ITEM_TYPE, model: NodeUserData | EdgeUserData | ComboUserData, stack?: boolean) => Item;
  /**
   * Add items to the graph.
   * @param itemType item type
   * @param models user datas
   * @param stack whether push this operation to stack
   * @returns the added items
   * @group Item
   */
  addItems: (itemType: ITEM_TYPE, models: NodeUserData[] | EdgeUserData[] | ComboUserData[], stack?: boolean) => Item[];
  /**
   * Remove an item from the graph.
   * @param item the item to be removed
   * @param stack whether push this operation to stack
   * @returns 
   * @group Item
   */
  removeItem: (item: Item | string, stack?: boolean) => void;
  /**
   * Remove multiple items from the graph.
   * @param items the items to be removed
   * @param stack whether push this operation to stack
   * @returns 
   * @group Item
   */
  removeItems: (items: (Item | string)[], stack?: boolean) => void;
  /**
   * Update an item on the graph.
   * @param {Item} item item or id
   * @param {EdgeConfig | NodeConfig} cfg incremental updated configs
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @group Item
   */
  updateItem: (item: Item | string, cfg: Partial<NodeUserData> | Partial<EdgeUserData> | Partial<ComboUserData>, stack?: boolean) => Item;
  /**
   * Show the item.
   * @param item the item to be shown
   * @returns 
   * @group Item
   */
  showItem: (item: Item | string) => void;
  /**
   * Hide the item.
   * @param item the item to be hidden
   * @returns 
   * @group Item
   */
  hideItem: (item: Item | string) => void;
  /**
   * Set state for the item.
   * @param item the item to be set
   * @param state the state name
   * @param value state value
   * @returns 
   * @group Item
   */
  setItemState: (item: Item | string, state: string, value: boolean) => void;


  // ===== combo operations =====
  /**
  * Create a new combo with existing child nodes and combos.
  * @param combo combo ID or Combo model
  * @param childrenIds id array of children of the new combo
  * @group Combo
  */
  createCombo: (combo: string | ComboUserData, childrenIds: string[], stack?: boolean) => void;
  /**
   * dissolve combo
   * @param {String | ICombo} item combo item or id to be dissolve
   */
  uncombo: (item: string | ICombo, stack?: boolean) => void;
  /**
  * Collapse a combo.
  * @param comboId combo id or item
  * @group Combo
  */
  collapseCombo: (combo: string | ICombo, stack?: boolean) => void;
  /**
 * Expand a combo.
 * @group Combo
 * @param combo combo ID 或 combo 实例
 * @group Combo
 */
  expandCombo: (combo: string | ICombo, stack?: boolean) => void;


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
  addBehaviors: (behaviors: BehaviorName | BehaviorCfg | BehaviorName[] | BehaviorCfg[], modes: string | string[]) => void;
  /**
   * Remove behavior(s) from mode(s).
   * @param behaviors behavior names or configs
   * @param modes mode names
   * @returns 
   * @group Interaction
   */
  removeBehaviors: (behaviors: BehaviorName | BehaviorCfg | BehaviorName[] | BehaviorCfg[], modes: string | string[]) => void;
  /**
   * Update behavior(s) on a mode.
   * @param behavior behavior configs, whose name indicates the behavior to be updated
   * @param mode mode name
   * @returns 
   * @group Interaction
   */
  updateBehavior: (behavior: BehaviorCfg, mode?: string) => void;
}