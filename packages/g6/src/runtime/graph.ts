import EventEmitter from '@antv/event-emitter';
import { Canvas, runtime } from '@antv/g';
import { GraphChange, ID } from '@antv/graphlib';
import { isArray, isNil, isNumber, isObject, isString } from '@antv/util';
import {
  ComboUserModel,
  EdgeUserModel,
  GraphData,
  IGraph,
  NodeUserModel,
  Specification,
} from '../types';
import { AnimateCfg } from '../types/animate';
import { BehaviorObjectOptionsOf, BehaviorOptionsOf, BehaviorRegistry } from '../types/behavior';
import { ComboModel } from '../types/combo';
import { Padding, Point } from '../types/common';
import { GraphCore } from '../types/data';
import { EdgeModel, EdgeModelData } from '../types/edge';
import { Hooks } from '../types/hook';
import { ITEM_TYPE } from '../types/item';
import {
  ImmediatelyInvokedLayoutOptions,
  LayoutOptions,
  StandardLayoutOptions,
} from '../types/layout';
import { NodeModel, NodeModelData } from '../types/node';
import { ThemeRegistry, ThemeSpecification } from '../types/theme';
import { FitViewRules, GraphAlignment } from '../types/view';
import { createCanvas } from '../util/canvas';
import {
  DataController,
  ExtensionController,
  InteractionController,
  ItemController,
  LayoutController,
  ThemeController,
} from './controller';
import Hook from './hooks';

/**
 * Disable CSS parsing for better performance.
 */
runtime.enableCSSParsing = false;

export default class Graph<B extends BehaviorRegistry, T extends ThemeRegistry> extends EventEmitter implements IGraph<B, T> {
  public hooks: Hooks;
  // for nodes and edges, which will be separate into groups
  public canvas: Canvas;
  // the tag to indicate whether the graph instance is destroyed
  public destroyed: boolean;
  // for background shapes, e.g. grid, pipe indices
  private backgroundCanvas: Canvas;
  // for transient shapes for interactions, e.g. transient node and related edges while draging, delegates
  private transientCanvas: Canvas;
  // the tag indicates all the three canvases are all ready
  private canvasReady: boolean;
  private specification: Specification<B, T>;
  private dataController: DataController;
  private interactionController: InteractionController;
  private layoutController: LayoutController;
  private itemController: ItemController;
  private extensionController: ExtensionController;
  private themeController: ThemeController;

  private defaultSpecification = {
    theme: {
      type: 'spec',
      base: 'light'
    }
  }

  constructor(spec: Specification<B, T>) {
    super();
    // TODO: analyse cfg

    this.specification = Object.assign({}, this.defaultSpecification, spec);
    this.initHooks();
    this.initCanvas();
    this.initControllers();

    this.hooks.init.emit({
      canvases: {
        background: this.backgroundCanvas,
        main: this.canvas,
        transient: this.transientCanvas
      }
    });

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
    this.transientCanvas = createCanvas(rendererType, container, width, height, pixelRatio, true, {
      pointerEvents: 'none',
    });
    Promise.all(
      [this.backgroundCanvas, this.canvas, this.transientCanvas].map((canvas) => canvas.ready),
    ).then(() => (this.canvasReady = true));
  }

  /**
   * Initialize the hooks for graph's lifecycles.
   */
  private initHooks() {
    this.hooks = {
      init: new Hook<{
        canvases: {
          background: Canvas,
          main: Canvas,
          transient: Canvas
        }
      }>({ name: 'init' }),
      datachange: new Hook<{ data: GraphData; type: 'replace' }>({ name: 'datachange' }),
      itemchange: new Hook<{
        type: ITEM_TYPE;
        changes: GraphChange<NodeModelData, EdgeModelData>[];
        graphCore: GraphCore;
        theme: ThemeSpecification;
      }>({ name: 'itemchange' }),
      render: new Hook<{ graphCore: GraphCore, theme: ThemeSpecification; }>({ name: 'render' }),
      layout: new Hook<{ graphCore: GraphCore }>({ name: 'layout' }),
      modechange: new Hook<{ mode: string }>({ name: 'modechange' }),
      behaviorchange: new Hook<{
        action: 'update' | 'add' | 'remove';
        modes: string[];
        behaviors: BehaviorOptionsOf<{}>[];
      }>({ name: 'behaviorchange' }),
      itemstatechange: new Hook<{ ids: ID[]; state: string; value: boolean }>({
        name: 'itemstatechange',
      }),
    };
  }

  /**
   * Update the specs(configurations).
   */
  public updateSpecification(spec: Specification<B, T>) {
    // TODO
  }

  /**
   * Get the copy of specs(configurations).
   * @returns graph specs
   */
  public getSpecification(): Specification<B, T> {
    return this.specification;
  }

  /**
   * Input data and render the graph.
   * If there is old data, diffs and changes it.
   * @param data
   * @returns
   * @group Data
   */
  public async read(data: GraphData) {
    this.hooks.datachange.emit({ data, type: 'replace' });
    const emitRender = async () => {
      this.hooks.render.emit({
        graphCore: this.dataController.graphCore,
        theme: this.themeController.specification
      });
      this.emit('afterrender');

      await this.layout();
    };
    if (this.canvasReady) {
      await emitRender();
    } else {
      await Promise.all(
        [this.backgroundCanvas, this.canvas, this.transientCanvas].map((canvas) => canvas.ready),
      );
      await emitRender();
    }
  }

  /**
   * Change graph data.
   * @param data new data
   * @param type the way to change data, 'replace' means discard the old data and use the new one; 'mergeReplace' means merge the common part, remove (old - new), add (new - old)
   * @returns
   * @group Data
   */
  public async changeData(data: GraphData, type: 'replace' | 'mergeReplace' = 'mergeReplace') {
    this.hooks.datachange.emit({ data, type });
    this.hooks.render.emit({
      graphCore: this.dataController.graphCore,
      theme: this.themeController.specification
    });
    this.emit('afterrender');

    await this.layout();
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
  public focusItem(ids: ID | ID[], animateCfg?: AnimateCfg) {
    // TODO
  }

  // ===== item operations =====
  /**
   * Find a node's inner data according to id or function.
   * @param { ID | Function } condition id or condition function
   * @returns result node's inner data
   * @group Data
   */
  public getNodeData(condition: ID | Function): NodeModel | undefined {
    const conds = isString(condition) || isNumber(condition) ? [condition] : condition;
    return this.dataController.findData('node', conds)?.[0] as NodeModel;
  }
  /**
   * Find an edge's inner data according to id or function.
   * @param { ID | Function } condition id or condition function
   * @returns result edge's inner data
   * @group Data
   */
  public getEdgeData(condition: ID | Function): EdgeModel | undefined {
    const conds =
      isString(condition) || isNumber(condition) || isNumber(condition) ? [condition] : condition;
    return this.dataController.findData('edge', conds)?.[0] as EdgeModel;
  }
  /**
   * Find an combo's inner data according to id or function.
   * @param { ID | Function } condition id or condition function
   * @returns result combo's inner data
   * @group Data
   */
  public getComboData(condition: ID | Function): ComboModel | undefined {
    const conds = isString(condition) || isNumber(condition) ? [condition] : condition;
    return this.dataController.findData('combo', conds)?.[0] as ComboModel;
  }
  /**
   * Get all the nodes' inner data
   * @returns all nodes' inner data on the graph
   * @group Data
   */
  public getAllNodesData(): NodeModel[] {
    return this.dataController.findAllData('node');
  }
  /**
   * Get all the edges' inner data
   * @returns all edges' inner data on the graph
   * @group Data
   */
  public getAllEdgesData(): EdgeModel[] {
    return this.dataController.findAllData('edge') as EdgeModel[];
  }
  /**
   * Get all the combos' inner data
   * @returns all combos' inner data on the graph
   * @group Data
   */
  public getAllCombosData(): ComboModel[] {
    return this.dataController.findAllData('combo') as ComboModel[];
  }
  /**
   * Find items which has the state.
   * @param itemType item type
   * @param state state name
   * @param additionalFilter additional filter function
   * @returns items that is the type and has the state
   * @group Item
   */
  public findIdByState(
    itemType: ITEM_TYPE,
    state: string,
    value: string | boolean = true,
    additionalFilter?: (item: NodeModel | EdgeModel | ComboModel) => boolean,
  ): ID[] {
    let ids = this.itemController.findIdByState(itemType, state, value);
    if (additionalFilter) {
      const getDataFunc = itemType === 'node' ? this.getNodeData : this.getEdgeData; // TODO: combo
      ids = ids.filter((id) => additionalFilter(getDataFunc(id)));
    }
    return ids;
  }
  /**
   * Add one or more node/edge/combo data to the graph.
   * @param itemType item type
   * @param model user data
   * @param stack whether push this operation to stack
   * @returns whether success
   * @group Data
   */
  public addData(
    itemType: ITEM_TYPE,
    models:
      | NodeUserModel
      | EdgeUserModel
      | ComboUserModel
      | NodeUserModel[]
      | EdgeUserModel[]
      | ComboUserModel[],
    stack?: boolean,
  ): NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[] {
    // data controller and item controller subscribe additem in order

    const { graphCore } = this.dataController;
    const { specification } = this.themeController;
    graphCore.once('changed', (event) => {
      this.hooks.itemchange.emit({
        type: itemType,
        changes: graphCore.reduceChanges(event.changes),
        graphCore,
        theme: specification
      });
    });

    const modelArr = isArray(models) ? models : [models];
    const data = { nodes: [], edges: [], combos: [] };
    data[`${itemType}s`] = modelArr;
    this.hooks.datachange.emit({
      data,
      type: 'union',
    });
    const dataList = this.dataController.findData(
      itemType,
      modelArr.map((model) => model.id),
    );
    return isArray(models) ? dataList : dataList[0];
  }
  /**
   * Remove one or more node/edge/combo data from the graph.
   * @param item the item to be removed
   * @param stack whether push this operation to stack
   * @returns whether success
   * @group Data
   */
  public removeData(itemType: ITEM_TYPE, ids: ID | ID[], stack?: boolean) {
    const idArr = isArray(ids) ? ids : [ids];
    const data = { nodes: [], edges: [], combos: [] };
    const { userGraphCore, graphCore } = this.dataController;
    const { specification } = this.themeController;
    const getItem = itemType === 'edge' ? userGraphCore.getEdge : userGraphCore.getNode; // TODO: combo
    data[`${itemType}s`] = idArr.map((id) => getItem.bind(userGraphCore)(id));
    graphCore.once('changed', (event) => {
      this.hooks.itemchange.emit({
        type: itemType,
        changes: event.changes,
        graphCore,
        theme: specification
      });
    });
    this.hooks.datachange.emit({
      data,
      type: 'remove',
    });
  }
  /**
   * Update one or more node/edge/combo data on the graph.
   * @param {Item} item item or id
   * @param {EdgeConfig | NodeConfig} cfg incremental updated configs
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @group Data
   */
  public updateData(
    itemType: ITEM_TYPE,
    models:
      | Partial<NodeUserModel>
      | Partial<EdgeUserModel>
      | Partial<
          | ComboUserModel
          | Partial<NodeUserModel>[]
          | Partial<EdgeUserModel>[]
          | Partial<ComboUserModel>[]
        >,
    stack?: boolean,
  ): NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[] {
    const modelArr = isArray(models) ? models : [models];
    const data = { nodes: [], edges: [], combos: [] };
    data[`${itemType}s`] = modelArr;

    const { graphCore } = this.dataController;
    const { specification } = this.themeController;
    graphCore.once('changed', (event) => {
      this.hooks.itemchange.emit({
        type: itemType,
        changes: event.changes,
        graphCore,
        theme: specification
      });
    });

    this.hooks.datachange.emit({
      data,
      type: 'update',
    });
    const dataList = this.dataController.findData(
      itemType,
      modelArr.map((model) => model.id),
    );
    return isArray(models) ? dataList : dataList[0];
  }
  /**
   * Show the item(s).
   * @param item the item to be shown
   * @returns
   * @group Item
   */
  public showItem(ids: ID | ID[]) {
    // TODO
  }
  /**
   * Hide the item(s).
   * @param item the item to be hidden
   * @returns
   * @group Item
   */
  public hideItem(ids: ID | ID[]) {
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
  public setItemState(ids: ID | ID[], states: string | string[], value: boolean) {
    const idArr = isArray(ids) ? ids : [ids];
    const stateArr = isArray(states) ? states : [states];
    this.hooks.itemstatechange.emit({
      ids: idArr as ID[],
      states: stateArr as string[],
      value,
    });
  }
  /**
   * Get the state value for an item.
   * @param id the id for the item
   * @param states the state name
   * @returns {boolean} the state value
   * @group Item
   */
  public getItemState(id: ID, state: string) {
    return this.itemController.getItemState(id, state);
  }

  /**
   * Clear all the states for item(s).
   * @param ids the id(s) for the item(s) to be clear
   * @param states the states' names, all the states wil be cleared if states is not assigned
   * @returns
   * @group Item
   */
  public clearItemState(ids: ID | ID[], states?: string[]) {
    const idArr = isArray(ids) ? ids : [ids];
    this.hooks.itemstatechange.emit({
      ids: idArr as ID[],
      states,
      value: false,
    });
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
  public uncombo(comboId: ID, stack?: boolean) {
    // TODO
  }
  /**
   * Collapse a combo.
   * @param comboId combo id or item
   * @group Combo
   */
  public collapseCombo(comboId: ID, stack?: boolean) {
    // TODO
  }
  /**
   * Expand a combo.
   * @param combo combo ID 或 combo 实例
   * @group Combo
   */
  public expandCombo(comboId: ID, stack?: boolean) {
    // TODO
  }

  // ===== layout =====
  /**
   * Layout the graph (with current configurations if cfg is not assigned).
   */
  public async layout(options?: LayoutOptions) {
    const { graphCore } = this.dataController;
    const formattedOptions = {
      ...this.getSpecification().layout,
      ...options,
    } as LayoutOptions;

    const layoutUnset = !options && !this.getSpecification().layout;
    if (layoutUnset) {
      const nodes = graphCore.getAllNodes();
      if (nodes.every((node) => isNil(node.data.x) && isNil(node.data.y))) {
        // Use `grid` layout as default when x/y of each node is unset.
        (formattedOptions as StandardLayoutOptions).type = 'grid';
      } else {
        // Use user-defined position(x/y default to 0).
        (formattedOptions as ImmediatelyInvokedLayoutOptions).execute = async (graph) => {
          const nodes = graph.getAllNodes();
          return {
            nodes: nodes.map((node) => ({
              id: node.id,
              data: {
                x: Number(node.data.x) || 0,
                y: Number(node.data.y) || 0,
              },
            })),
            edges: [],
          };
        };
      }
    }

    await this.hooks.layout.emitLinearAsync({
      graphCore,
      options: formattedOptions,
    });
    this.emit('afterlayout');
  }

  /**
   * Some layout algorithms has many iterations which can be stopped at any time.
   */
  public stopLayout() {
    this.layoutController.stopLayout();
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
      behaviors: behaviorsArr,
    });
    // update the graph specification
    modesArr.forEach((mode) => {
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
      behaviors: behaviorKeys,
    });
    // update the graph specification
    modesArr.forEach((mode) => {
      behaviorKeys.forEach((key) => {
        const oldBehavior = this.specification.modes[mode].find(
          (behavior) => isObject(behavior) && behavior.key === key,
        );
        const indexOfOldBehavior = this.specification.modes[mode].indexOf(oldBehavior);
        this.specification.modes[mode].splice(indexOfOldBehavior, 1);
      });
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

  /**
   * Destroy the graph instance and remove the related canvases.
   * @returns
   * @group Graph Instance
   */
  public destroy() {
    this.canvas.destroy();
    this.backgroundCanvas.destroy();
    this.transientCanvas.destroy();

    // TODO: destroy controllers and off the listeners
    // this.dataController.destroy();
    // this.interactionController.destroy();
    // this.layoutController.destroy();
    // this.themeController.destroy();
    // this.itemController.destroy();
    // this.extensionController.destroy();

    this.destroyed = true;
  }
}
