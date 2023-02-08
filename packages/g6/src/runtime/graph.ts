import EventEmitter from '@antv/event-emitter';
import { Canvas, CanvasEvent } from '@antv/g';
import { clone, isArray, isObject, isString } from '@antv/util';
import { ComboUserModel, EdgeUserModel, GraphData, IGraph, NodeUserModel, Specification } from '../types';
import { AnimateCfg } from '../types/animate';
import { BehaviorObjectOptionsOf, BehaviorOptionsOf, BehaviorRegistry } from '../types/behavior';
import { ComboModel } from '../types/combo';
import { Padding, Point } from '../types/common';
import { GraphCore } from '../types/data';
import { EdgeModel } from '../types/edge';
import { Hooks } from '../types/hook';
import { ITEM_TYPE } from '../types/item';
import { LayoutCommonConfig } from '../types/layout';
import { NodeModel } from '../types/node';
import { FitViewRules, GraphAlignment } from '../types/view';
import { createCanvas } from '../util/canvas';
import { DataController, InteractionController, ItemController, LayoutController, ThemeController, ExtensionController } from './controller';
import Hook from './hooks';

export default class Graph<B extends BehaviorRegistry> extends EventEmitter implements IGraph<B> {
  public hooks: Hooks;
  // for nodes and edges, which will be separate into groups
  public canvas: Canvas;
  // for background shapes, e.g. grid, pipe indices
  private backgroundCanvas: Canvas;
  // for transient shapes for interactions, e.g. transient node and related edges while draging, delegates
  private transientCanvas: Canvas;
  // the tag indicates all the three canvases are all ready
  private canvasReady: boolean;
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
    this.initCanvas();
    this.initControllers();

    const { data } = spec;
    if (data) {
      // TODO: handle multiple type data configs
      this.read(data as GraphData);
    }
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

  private initCanvas() {
    const { renderer, container, width, height } = this.specification;
    let rendererType;
    let pixelRatio;
    if (renderer && !isString(renderer)) {
      rendererType = renderer.type || 'canvas';
      pixelRatio = renderer.pixelRatio;
    } else {
      rendererType = renderer || 'canvas';
    }
    this.backgroundCanvas = createCanvas(rendererType, container, width, height, pixelRatio);
    this.canvas = createCanvas(rendererType, container, width, height, pixelRatio);
    this.transientCanvas = createCanvas(rendererType, container, width, height, pixelRatio);
    Promise.all(
      [this.backgroundCanvas, this.canvas, this.transientCanvas].map(canvas => canvas.ready)
    ).then(() => this.canvasReady = true);
  }

  /**
   * Initialize the hooks for graph's lifecycles.
   */
  private initHooks() {
    this.hooks = {
      init: new Hook<void>({ name: 'init' }),
      datachange: new Hook<{ data: GraphData, type: 'replace' }>({ name: 'datachange' }),
      additems: new Hook<{ type: ITEM_TYPE, models: NodeUserModel[] | EdgeUserModel[] | ComboUserModel[] }>({ name: 'additems' }),
      removeitems: new Hook<{ type: ITEM_TYPE, ids: (string | number)[] }>({ name: 'removeitems' }),
      updateitems: new Hook<{ type: ITEM_TYPE, models: NodeUserModel[] | EdgeUserModel[] | ComboUserModel[] }>({ name: 'updateitems' }),
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
    return this.specification;
  }

  /**
   * Input data and render the graph.
   * If there is old data, diffs and changes it.
   * @param data 
   * @returns 
   * @group Data
   */
  public read(data: GraphData) {
    this.hooks.datachange.emit({ data, type: 'replace' });
    const emitRender = () => {
      this.hooks.render.emit({
        graphCore: this.dataController.graphCore
      });
    }
    if (this.canvasReady) {
      emitRender();
    } else {
      Promise.all(
        [this.backgroundCanvas, this.canvas, this.transientCanvas].map(canvas => canvas.ready)
      ).then(emitRender);
    }
  }

  /**
   * Change graph data.
   * @param data new data
   * @param type the way to change data, 'replace' means discard the old data and use the new one; 'mergeReplace' means merge the common part, remove (old - new), add (new - old)
   * @returns 
   * @group Data
  */
  public changeData(data: GraphData, type: 'replace' | 'mergeReplace' = 'mergeReplace') {
    this.hooks.datachange.emit({ data, type });
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
  public focusItem(ids: string | number | (string | number)[], animateCfg?: AnimateCfg) {
    // TODO
  }


  // ===== item operations =====
  /**
   * Find a node's inner data according to id or function.
   * @param { string | Function} condition id or condition function
   * @returns result node
   * @group Item
   */
  public getNodeData(condition: string | Function): NodeModel | undefined {
    return this.dataController.findData('node', condition);
  }
  /**
   * Find an edge's inner data according to id or function.
   * @param { string | Function} condition id or condition function
   * @returns result edge
   * @group Item
   */
  public getEdgeData(condition: string | Function): EdgeModel | undefined {
    return this.dataController.findData('edge', condition);
  }
  /**
   * Find an combo's inner data according to id or function.
   * @param { string | Function} condition id or condition function
   * @returns result combo
   * @group Item
   */
  public getComboData(condition: string | Function): ComboModel | undefined {
    return this.dataController.findData('combo', condition);
  }
  /**
   * Find items which has the state.
   * @param itemType item type
   * @param state state name
   * @param additionalFilter additional filter function
   * @returns items that is the type and has the state
   * @group Item
   */
  public findIdByState(itemType: ITEM_TYPE, state: string, additionalFilter?: (item: NodeModel | EdgeModel | ComboModel) => boolean): (string | number)[] {
    // TODO
    return;
  }
  /**
   * Add one or more node/edge/combo data to the graph.
   * @param itemType item type
   * @param model user data
   * @param stack whether push this operation to stack
   * @returns whether success
   * @group Data
   */
  public addData(itemType: ITEM_TYPE, models: NodeUserModel | EdgeUserModel | ComboUserModel | NodeUserModel[] | EdgeUserModel[] | ComboUserModel[], stack?: boolean): boolean {
    // data controller and item controller subscribe additem in order
    const modelArr = isArray(models) ? models : [models];
    const data = { nodes: [], edges: [], combos: [] };
    data[`${itemType}s`] = modelArr;
    this.hooks.datachange.emit({
      data,
      type: 'union'
    })
    this.hooks.additems.emit({
      type: itemType,
      models: modelArr
    });
    return this.dataController.findData(itemType, modelArr.map(model => model.id)).every(Boolean);
  };
  /**
   * Remove one or more node/edge/combo data from the graph.
   * @param item the item to be removed
   * @param stack whether push this operation to stack
   * @returns whether success
   * @group Data
   */
  public removeData(itemType: ITEM_TYPE, ids: string | number | (string | number)[], stack?: boolean): boolean {
    const idArr = isArray(ids) ? ids : [ids];
    const data = { nodes: [], edges: [], combos: [] };
    const { userGraphCore } = this.dataController;
    const getItem = itemType === 'edge' ? userGraphCore.getEdge : userGraphCore.getNode; // TODO: combo
    data[`${itemType}s`] = idArr.map(id => getItem.bind(userGraphCore)(id));
    this.hooks.datachange.emit({
      data,
      type: 'remove'
    });
    this.hooks.removeitems.emit({
      type: itemType,
      ids: idArr
    });
    return this.dataController.findData(itemType, idArr).every(Boolean);
  }
  /**
   * Update one or more node/edge/combo data on the graph.
   * @param {Item} item item or id
   * @param {EdgeConfig | NodeConfig} cfg incremental updated configs
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @group Data
   */
  public updateData(itemType: ITEM_TYPE, models: Partial<NodeUserModel> | Partial<EdgeUserModel> | Partial<ComboUserModel | Partial<NodeUserModel>[] | Partial<EdgeUserModel>[] | Partial<ComboUserModel>[]>, stack?: boolean): boolean {
    const modelArr = isArray(models) ? models : [models];
    const data = { nodes: [], edges: [], combos: [] };
    data[`${itemType}s`] = modelArr;
    this.hooks.datachange.emit({
      data,
      type: 'update'
    })
    this.hooks.updateitems.emit({
      type: itemType,
      models: modelArr
    });
    // TODO
    return true;
  }
  /**
   * Show the item(s).
   * @param item the item to be shown
   * @returns 
   * @group Item
   */
  public showItem(ids: string | number | (string | number)[]) {
    // TODO
  }
  /**
   * Hide the item(s).
   * @param item the item to be hidden
   * @returns 
   * @group Item
   */
  public hideItem(ids: string | number | (string | number)[]) {
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
  public setItemState(ids: string | number | (string | number)[], state: string, value: boolean) {
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
  public uncombo(comboId: string | number, stack?: boolean) {
    // TODO
  }
  /**
  * Collapse a combo.
  * @param comboId combo id or item
  * @group Combo
  */
  public collapseCombo(comboId: string | number, stack?: boolean) {
    // TODO
  }
  /**
 * Expand a combo.
 * @param combo combo ID 或 combo 实例
 * @group Combo
 */
  public expandCombo(comboId: string | number, stack?: boolean) {
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