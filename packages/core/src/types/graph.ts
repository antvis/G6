import EventEmitter from '@antv/event-emitter';
import { AnimateCfg, Padding, Point, FitViewRules, GraphAlignment } from '.';
import { EdgeUserData } from './edge';
import { ITEM_TYPE } from './item';
import { LayoutCommonConfig } from './layout';
import { NodeUserData } from './node';
import { Specification } from './spec';

export interface IGraph extends EventEmitter {

  /**
   * Update the specs(configurations)
   */
  updateSpec: (spec: Specification) => void;


  // ===== view operations =====

  /**
   * move the graph with a relative vector
   * @param dx x of the relative vector
   * @param dy y of the relative vector
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  move: (dx: number, dy: number, animateCfg?: AnimateCfg) => void;
  /**
   * move the graph and align to a point
   * @param x position on the canvas to align
   * @param y position on the canvas to align
   * @param alignment alignment of the graph content
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  moveTo: (x: number, y: number, alignment: GraphAlignment, animateCfg?: AnimateCfg) => void;
  /**
   * zoom the graph with a relative ratio
   * @param ratio relative ratio to zoom
   * @param center zoom center
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  zoom: (ratio: number, center?: Point, animateCfg?: AnimateCfg) => void;
  /**
   * zoom the graph to a specified ratio
   * @param toRatio specified ratio
   * @param center zoom center
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  zoomTo: (toRatio: number, center?: Point, animateCfg?: AnimateCfg) => void;
  /**
   * fit the graph content to the view
   * @param padding padding while fitting
   * @param rules rules for fitting
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  fitView: (padding?: Padding, rules?: FitViewRules, animateCfg?: AnimateCfg) => void;
  /**
   * fit the graph center to the view center
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  fitCenter: (animateCfg?: AnimateCfg) => void;
  /**
   * move the graph to make the item align the view center
   * @param item node/edge/combo item or its id
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  focusItem: (item: Item | string, animateCfg?: AnimateCfg) => void;
  /**
   * move (and zoom) the graph to make the items align (and fit) the view center
   * @param items node/edge/combo item array or their id array
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  focusItems: (items: Item[] | string[], zoomToFit?: boolean, animateCfg?: AnimateCfg) => void;


  // ===== item operations =====
  /**
   * find an element item according to id
   * @param id 
   * @returns 
   */
  findById: <T extends Item>(id: string) => T | undefined;
  /**
   * find items which has the state
   * @param itemType item type
   * @param state state name
   * @param additionalFilter additional filter function
   * @returns items that is the type and has the state
   */
  findByState: <T extends Item>(itemType: ITEM_TYPE, state: string, additionalFilter?: (item: Item) => boolean) => T[];
  /**
   * add an item to the graph
   * @param itemType item type
   * @param model user data
   * @param stack whether push this operation to stack
   * @returns the added item
   */
  addItem: (itemType: ITEM_TYPE, model: NodeUserData | EdgeUserData, stack?: boolean) => Item;
  /**
   * add items to the graph
   * @param itemType item type
   * @param models user datas
   * @param stack whether push this operation to stack
   * @returns the added items
   */
  addItems: (itemType: ITEM_TYPE, models: (NodeUserData | EdgeUserData)[], stack?: boolean) => Item[];
  /**
   * remove an item from the graph
   * @param item the item to be removed
   * @param stack whether push this operation to stack
   * @returns 
   */
  removeItem: (item: Item | string, stack?: boolean) => void;
  /**
   * remove multiple items from the graph
   * @param items the items to be removed
   * @param stack whether push this operation to stack
   * @returns 
   */
  removeItems: (items: (Item | string)[], stack?: boolean) => void;
  /**
   * show the item
   * @param item the item to be shown
   * @returns 
   */
  showItem: (item: Item | string) => void;
  /**
   * hide the item
   * @param item the item to be hidden
   * @returns 
   */
  hideItem: (item: Item | string) => void;
  /**
   * set state for the item
   * @param item the item to be set
   * @param state the state name
   * @param value state value
   * @returns 
   */
  setItemState: (item: Item | string, state: string, value: boolean) => void;


  // ===== combo operations =====
  /**
  * create a new combo with existing child nodes and combos
  * @param combo combo ID or Combo model
  * @param childrenIds id array of children of the new combo
  */
  createCombo: (combo: string | ComboConfig, childrenIds: string[], stack?: boolean) => void;
  /**
   * dissolve combo
   * @param {String | ICombo} item combo item or id to be dissolve
   */
  uncombo: (item: string | ICombo, stack?: boolean) => void;
  /**
  * collapse a combo
  * @param comboId combo ID 或 combo 实例
  */
  collapseCombo: (combo: string | ICombo, stack?: boolean) => void;
  /**
   * expand a combo
   * @param combo combo ID 或 combo 实例
   */
  expandCombo: (combo: string | ICombo, stack?: boolean) => void;


  // ===== layout =====
  /**
   * layout the graph (with current configurations if cfg is not assigned)
   * @param {LayoutCommonConfig} cfg layout configurations. if assigned, the layout spec of the graph will be updated in the same time
   * @param {GraphAlignment} align align the result
   * @param {Point} canvasPoint align the result
   * @param {boolean} stack push it into stack
   */
  layout: (cfg?: LayoutCommonConfig, align?: GraphAlignment, canvasPoint?: Point, stack?: boolean) => void;
}