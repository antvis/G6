import EventEmitter from '@antv/event-emitter';
import { isArray } from '@antv/util';
import { ComboUserModel, EdgeUserModel, GraphData, IGraph, NodeUserModel, Specification } from '../types';
import { AnimateCfg } from '../types/animate';
import { BehaviorOptionsOf, BehaviorRegistry } from '../types/behavior';
import { ICombo } from '../types/combo';
import { Padding, Point } from '../types/common';
import { GraphCore } from '../types/data';
import { Hooks } from '../types/hook';
import { IItem, ITEM_TYPE } from '../types/item';
import { LayoutCommonConfig } from '../types/layout';
import { FitViewRules, GraphAlignment } from '../types/view';
import { DataController, InteractionController, ItemController, LayoutController, ThemeController, ExtensionController } from './controller';
import Hook from './hooks';

export default class Graph<B extends BehaviorRegistry> extends EventEmitter implements IGraph<B> {
  public hooks: Hooks;
  private dataController: DataController;
  private interactionController: InteractionController;
  private layoutController: LayoutController;
  private themeController: ThemeController;
  private itemController: ItemController;
  private extensionController: ExtensionController;

  constructor(spec: Specification<B>) {
    super();
    // TODO: analyse cfg

    this.initHooks();
    this.initControllers();
  }

  /**
   * Initialize the controllers for different plugins.
   */
  private initControllers() {
    this.dataController = new DataController(this);
    this.interactionController = new InteractionController(this);
    this.layoutController = new LayoutController(this);
    this.themeController = new ThemeController(this);
    this.itemController = new ItemController(this);
    this.extensionController = new ExtensionController(this);
  }

  /**
   * Initialize the hooks for graph's lifecycles.
   */
  private initHooks() {
    this.hooks.init = new Hook<void>({ name: 'init' });
    this.hooks.datachange = new Hook<{ data: GraphData }>({ name: 'datachange' });
    this.hooks.render = new Hook<{ graphCore: GraphCore }>({ name: 'render' });
    this.hooks.modechange = new Hook<{ mode: string }>({ name: 'modechange' });
    this.hooks.behaviorchange = new Hook<{
      action: 'update' | 'add' | 'remove',
      modes: string[],
      behaviors: BehaviorOptionsOf<{}>[]
    }>({ name: 'behaviorchange' });
  }

  /**
   * Update the specs(configurations).
   */
  public updateSpec(spec: Specification<B>) {
    // TODO
  }
  /**
   * Get the specs(configurations).
   * @returns graph specs
   */
  public getSpec(): Specification<B> {
    // TODO
  }

  /**
   * Input data and render the graph.
   * If there is old data, diffs and changes it.
   * @param data 
   * @returns 
   * @group Data
   */
  public read(data: GraphData) {
    this.hooks.datachange.emit({ data });
    this.hooks.render.emit({
      graphCore: this.dataController.graphCore
    });
  }

  /**
   * Clear the graph, means remove all the items on the graph.
   * @returns 
   */
  public clear() {
    // TODO
  }

  /**
   * Move the graph with a relative vector.
   * @param dx x of the relative vector
   * @param dy y of the relative vector
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  public move(dx: number, dy: number, animateCfg?: AnimateCfg) {
    // TODO
  }

  /**
   * Move the graph and align to a point.
   * @param x position on the canvas to align
   * @param y position on the canvas to align
   * @param alignment alignment of the graph content
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  public moveTo(x: number, y: number, alignment: GraphAlignment, animateCfg?: AnimateCfg) {
    // TODO
  }

  /**
   * Zoom the graph with a relative ratio.
   * @param ratio relative ratio to zoom
   * @param center zoom center
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  public zoom(ratio: number, center?: Point, animateCfg?: AnimateCfg) {
    // TODO
  }

  /**
   * Zoom the graph to a specified ratio.
   * @param toRatio specified ratio
   * @param center zoom center
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  public zoomTo(toRatio: number, center?: Point, animateCfg?: AnimateCfg) {
    // TODO
  }

  /**
   * Fit the graph content to the view.
   * @param padding padding while fitting
   * @param rules rules for fitting
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  public fitView(padding?: Padding, rules?: FitViewRules, animateCfg?: AnimateCfg) {
    // TODO
  }
  /**
   * Fit the graph center to the view center.
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  public fitCenter(animateCfg?: AnimateCfg) {
    // TODO
  }
  /**
   * Move the graph to make the item align the view center.
   * @param item node/edge/combo item or its id
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  public focusItem(item: IItem | string, animateCfg?: AnimateCfg) {
    // TODO
  }
  /**
   * Move (and zoom) the graph to make the items align (and fit) the view center.
   * @param items node/edge/combo item array or their id array
   * @param animateCfg animation configurations
   * @returns 
   * @group View
   */
  public focusItems(items: IItem[] | string[], zoomToFit?: boolean, animateCfg?: AnimateCfg) {
    // TODO
  }


  // ===== item operations =====
  /**
   * Find an element item according to id.
   * @param id 
   * @returns 
   * @group Item
   */
  public findById<T extends IItem>(id: string): T | undefined {
    // TODO
  }
  /**
   * Find items which has the state.
   * @param itemType item type
   * @param state state name
   * @param additionalFilter additional filter function
   * @returns items that is the type and has the state
   * @group Item
   */
  public findByState<T extends IItem>(itemType: ITEM_TYPE, state: string, additionalFilter?: (item: Item) => boolean): T[] {
    // TODO
  }
  /**
   * Add an item to the graph.
   * @param itemType item type
   * @param model user data
   * @param stack whether push this operation to stack
   * @returns the added item
   * @group Item
   */
  public addItem(itemType: ITEM_TYPE, model: NodeUserModel | EdgeUserModel | ComboUserModel, stack?: boolean): IItem {
    // TODO
  };
  /**
   * Add items to the graph.
   * @param itemType item type
   * @param models user datas
   * @param stack whether push this operation to stack
   * @returns the added items
   * @group Item
   */
  public addItems(itemType: ITEM_TYPE, models: NodeUserModel[] | EdgeUserModel[] | ComboUserModel[], stack?: boolean): IItem[] {
    // TODO
  }
  /**
   * Remove an item from the graph.
   * @param item the item to be removed
   * @param stack whether push this operation to stack
   * @returns 
   * @group Item
   */
  public removeItem(item: IItem | string, stack?: boolean) {
    // TODO
  }
  /**
   * Remove multiple items from the graph.
   * @param items the items to be removed
   * @param stack whether push this operation to stack
   * @returns 
   * @group Item
   */
  public removeItems(items: (IItem | string)[], stack?: boolean) {
    // TODO
  }
  /**
   * Update an item on the graph.
   * @param {Item} item item or id
   * @param {EdgeConfig | NodeConfig} cfg incremental updated configs
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @group Item
   */
  public updateItem(item: IItem | string, cfg: Partial<NodeUserModel> | Partial<EdgeUserModel> | Partial<ComboUserModel>, stack?: boolean): IItem {
    // TODO
  }
  /**
   * Show the item.
   * @param item the item to be shown
   * @returns 
   * @group Item
   */
  public showItem(item: IItem | string) {
    // TODO
  }
  /**
   * Hide the item.
   * @param item the item to be hidden
   * @returns 
   * @group Item
   */
  public hideItem(item: IItem | string) {
    // TODO
  }
  /**
   * Set state for the item.
   * @param item the item to be set
   * @param state the state name
   * @param value state value
   * @returns 
   * @group Item
   */
  public setItemState(item: IItem | string, state: string, value: boolean) {
    // TODO
  }


  // ===== combo operations =====
  /**
  * Create a new combo with existing child nodes and combos.
  * @param combo combo ID or Combo model
  * @param childrenIds id array of children of the new combo
  * @group Combo
  */
  public createCombo(combo: string | ComboUserModel, childrenIds: string[], stack?: boolean) {
    // TODO
  }
  /**
   * dissolve combo
   * @param {String | ICombo} item combo item or id to be dissolve
   * @group Combo
   */
  public uncombo(item: string | ICombo, stack?: boolean) {
    // TODO
  }
  /**
  * Collapse a combo.
  * @param comboId combo id or item
  * @group Combo
  */
  public collapseCombo(combo: string | ICombo, stack?: boolean) {
    // TODO
  }
  /**
 * Expand a combo.
 * @param combo combo ID 或 combo 实例
 * @group Combo
 */
  public expandCombo(combo: string | ICombo, stack?: boolean) {
    // TODO
  }


  // ===== layout =====
  /**
   * Layout the graph (with current configurations if cfg is not assigned).
   * @param {LayoutCommonConfig} cfg layout configurations. if assigned, the layout spec of the graph will be updated in the same time
   * @param {GraphAlignment} align align the result
   * @param {Point} canvasPoint align the result
   * @param {boolean} stack push it into stack
   * @group Layout
   */
  public layout(cfg?: LayoutCommonConfig, align?: GraphAlignment, canvasPoint?: Point, stack?: boolean) {
    // TODO: LayoutConfig combination instead of LayoutCommonConfig
    // TODO
  }


  /**
   * Switch mode.
   * @param mode mode name
   * @returns 
   * @group Interaction
   */
  public setMode(mode: string) {
    this.hooks.modechange.emit({ mode });
  }

  /**
   * Add behavior(s) to mode(s).
   * @param behaviors behavior names or configs
   * @param modes mode names
   * @returns 
   * @group Interaction
   */
  public addBehaviors(behaviors: BehaviorOptionsOf<B>[], modes: string | string[]) {
    this.hooks.behaviorchange.emit({
      action: 'add',
      modes: isArray(modes) ? modes : [modes],
      behaviors: isArray(behaviors) ? behaviors : [behaviors]
    });
  }
  /**
   * Remove behavior(s) from mode(s).
   * @param behaviors behavior names or configs
   * @param modes mode names
   * @returns 
   * @group Interaction
   */
  public removeBehaviors(behaviors: BehaviorOptionsOf<B>[], modes: string | string[]) {
    this.hooks.behaviorchange.emit({
      action: 'remove',
      modes: isArray(modes) ? modes : [modes],
      behaviors: isArray(behaviors) ? behaviors : [behaviors]
    });
  }
  /**
   * Update a behavior on a mode.
   * @param behavior behavior configs, whose name indicates the behavior to be updated
   * @param mode mode name
   * @returns 
   * @group Interaction
   */
  public updateBehavior(behavior: BehaviorOptionsOf<B>, mode?: string) {
    this.hooks.behaviorchange.emit({
      action: 'update',
      modes: [mode],
      behaviors: [behavior],
    });
  }
}