import EventEmitter from '@antv/event-emitter';
import { clone, isArray, isObject } from '@antv/util';
import { ComboUserModel, EdgeUserModel, GraphData, IGraph, NodeUserModel, Specification } from '../types';
import { AnimateCfg } from '../types/animate';
import { BehaviorObjectOptionsOf, BehaviorOptionsOf, BehaviorRegistry } from '../types/behavior';
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
  private specification: Specification<B>;
  private dataController: DataController;
  private interactionController: InteractionController;
  private layoutController: LayoutController;
  private itemController: ItemController;
  private extensionController: ExtensionController;
  private themeController: ThemeController;

  constructor(spec: Specification<B>) {
    super();
    // TODO: analyse cfg

    this.specification = spec;
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
    this.hooks = {
      init: new Hook<void>({ name: 'init' }),
      datachange: new Hook<{ data: GraphData }>({ name: 'datachange' }),
      render: new Hook<{ graphCore: GraphCore }>({ name: 'render' }),
      modechange: new Hook<{ mode: string }>({ name: 'modechange' }),
      behaviorchange: new Hook<{
        action: 'update' | 'add' | 'remove',
        modes: string[],
        behaviors: BehaviorOptionsOf<{}>[]
      }>({ name: 'behaviorchange' }),
    };
  }

  /**
   * Update the specs(configurations).
   */
  public updateSpecification(spec: Specification<B>) {
    // TODO
  }

  /**
   * Get the copy of specs(configurations).
   * @returns graph specs
   */
  public getSpecification(): Specification<B> {
    return clone(this.specification);
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
    return;
  }
  /**
   * Find items which has the state.
   * @param itemType item type
   * @param state state name
   * @param additionalFilter additional filter function
   * @returns items that is the type and has the state
   * @group Item
   */
  public findByState<T extends IItem>(itemType: ITEM_TYPE, state: string, additionalFilter?: (item: IItem) => boolean): T[] {
    // TODO
    return;
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
    return;
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
    return;
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
    return;
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
    const modesArr = isArray(modes) ? modes : [modes];
    const behaviorsArr = isArray(behaviors) ? behaviors : [behaviors];
    this.hooks.behaviorchange.emit({
      action: 'add',
      modes: modesArr,
      behaviors: behaviorsArr
    });
    // update the graph specification
    modesArr.forEach(mode => {
      this.specification.modes[mode] = this.specification.modes[mode].concat(behaviorsArr);
    });
  }
  /**
   * Remove behavior(s) from mode(s).
   * @param behaviors behavior configs with unique key
   * @param modes mode names
   * @returns 
   * @group Interaction
   */
  public removeBehaviors(behaviorKeys: string[], modes: string | string[]) {
    const modesArr = isArray(modes) ? modes : [modes];
    this.hooks.behaviorchange.emit({
      action: 'remove',
      modes: modesArr,
      behaviors: behaviorKeys
    });
    // update the graph specification
    modesArr.forEach(mode => {
      behaviorKeys.forEach(key => {
        const oldBehavior = this.specification.modes[mode].find(behavior => isObject(behavior) && behavior.key === key);
        const indexOfOldBehavior = this.specification.modes[mode].indexOf(oldBehavior);
        this.specification.modes[mode].splice(indexOfOldBehavior, 1);
      })
    });
  }
  /**
   * Update a behavior on a mode.
   * @param behavior behavior configs, whose name indicates the behavior to be updated
   * @param mode mode name
   * @returns 
   * @group Interaction
   */
  public updateBehavior(behavior: BehaviorObjectOptionsOf<B>, mode?: string) {
    this.hooks.behaviorchange.emit({
      action: 'update',
      modes: [mode],
      behaviors: [behavior],
    });
    // no need to update specification since the corresponding part is the same object as the behavior's option 
    // this.specification.modes[mode].forEach((b, i) => {
    //   if (isObject(b) && b.key === behavior.key) {
    //     this.specification.modes[mode][i] = behavior;
    //   }
    // });
  }
}