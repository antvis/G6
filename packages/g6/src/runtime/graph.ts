import EventEmitter from '@antv/event-emitter';
import { AABB, Canvas, DisplayObject, PointLike, runtime } from '@antv/g';
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
import { CameraAnimationOptions } from '../types/animate';
import { BehaviorOptionsOf, BehaviorRegistry } from '../types/behavior';
import { ComboModel } from '../types/combo';
import { Padding, Point } from '../types/common';
import { DataChangeType, GraphCore } from '../types/data';
import { EdgeModel, EdgeModelData } from '../types/edge';
import { Hooks, ViewportChangeHookParams } from '../types/hook';
import { ITEM_TYPE, ShapeStyle, SHAPE_TYPE } from '../types/item';
import {
  ImmediatelyInvokedLayoutOptions,
  LayoutOptions,
  StandardLayoutOptions,
} from '../types/layout';
import { NodeModel, NodeModelData } from '../types/node';
import { RendererName } from '../types/render';
import {
  ThemeOptionsOf,
  ThemeRegistry,
  ThemeSpecification,
} from '../types/theme';
import { FitViewRules, GraphTransformOptions } from '../types/view';
import { changeRenderer, createCanvas } from '../util/canvas';
import { formatPadding } from '../util/shape';
import {
  DataController,
  ExtensionController,
  InteractionController,
  ItemController,
  LayoutController,
  ThemeController,
  ViewportController,
} from './controller';
import { PluginController } from './controller/plugin';
import Hook from './hooks';
import { graphComboTreeDfs } from '../util/data';

/**
 * Disable CSS parsing for better performance.
 */
runtime.enableCSSParsing = false;

export default class Graph<B extends BehaviorRegistry, T extends ThemeRegistry>
  extends EventEmitter
  implements IGraph<B, T>
{
  public hooks: Hooks;
  // for nodes and edges, which will be separate into groups
  public canvas: Canvas;
  // the container dom for the graph canvas
  public container: HTMLElement;
  // the tag to indicate whether the graph instance is destroyed
  public destroyed: boolean;
  // the renderer type of current graph
  public rendererType: RendererName;
  // for transient shapes for interactions, e.g. transient node and related edges while draging, delegates
  public transientCanvas: Canvas;
  // for background shapes, e.g. grid, pipe indices
  public backgroundCanvas: Canvas;
  // the tag indicates all the three canvases are all ready
  private canvasReady: boolean;
  private specification: Specification<B, T>;
  private dataController: DataController;
  private interactionController: InteractionController;
  private layoutController: LayoutController;
  private viewportController: ViewportController;
  private itemController: ItemController;
  private extensionController: ExtensionController;
  private themeController: ThemeController;
  private pluginController: PluginController;

  private defaultSpecification = {
    theme: {
      type: 'spec',
      base: 'light',
    },
  };

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
        transient: this.transientCanvas,
      },
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
    this.viewportController = new ViewportController(this);
    this.extensionController = new ExtensionController(this);
    this.pluginController = new PluginController(this);
  }

  private initCanvas() {
    const { renderer, container, width, height } = this.specification;
    let pixelRatio;
    if (renderer && !isString(renderer)) {
      // @ts-ignore
      this.rendererType = renderer.type || 'canvas';
      // @ts-ignore
      pixelRatio = renderer.pixelRatio;
    } else {
      // @ts-ignore
      this.rendererType = renderer || 'canvas';
    }
    const containerDOM = isString(container)
      ? document.getElementById(container as string)
      : container;
    if (!containerDOM) {
      console.error(
        `Create graph failed. The container for graph ${containerDOM} is not exist.`,
      );
      this.destroy();
      return;
    }
    this.container = containerDOM;
    const size = [width, height];
    if (size[0] === undefined) {
      size[0] = containerDOM.scrollWidth;
    }
    if (size[1] === undefined) {
      size[1] = containerDOM.scrollHeight;
    }

    this.backgroundCanvas = createCanvas(
      this.rendererType,
      containerDOM,
      size[0],
      size[1],
      pixelRatio,
    );
    this.canvas = createCanvas(
      this.rendererType,
      containerDOM,
      size[0],
      size[1],
      pixelRatio,
    );
    this.transientCanvas = createCanvas(
      this.rendererType,
      containerDOM,
      size[0],
      size[1],
      pixelRatio,
      true,
      {
        pointerEvents: 'none',
      },
    );
    Promise.all(
      [this.backgroundCanvas, this.canvas, this.transientCanvas].map(
        (canvas) => canvas.ready,
      ),
    ).then(() => (this.canvasReady = true));
  }

  /**
   * Change the renderer at runtime.
   * @param type renderer name
   * @returns
   */
  public changeRenderer(type) {
    this.rendererType = type || 'canvas';
    changeRenderer(this.rendererType, this.canvas);
  }

  /**
   * Initialize the hooks for graph's lifecycles.
   */
  private initHooks() {
    this.hooks = {
      init: new Hook<{
        canvases: {
          background: Canvas;
          main: Canvas;
          transient: Canvas;
        };
      }>({ name: 'init' }),
      datachange: new Hook<{ data: GraphData; type: DataChangeType }>({
        name: 'datachange',
      }),
      itemchange: new Hook<{
        type: ITEM_TYPE;
        changes: GraphChange<NodeModelData, EdgeModelData>[];
        graphCore: GraphCore;
        theme: ThemeSpecification;
        upsertAncestors?: boolean;
      }>({ name: 'itemchange' }),
      render: new Hook<{
        graphCore: GraphCore;
        theme: ThemeSpecification;
        transientCanvas: Canvas;
      }>({
        name: 'render',
      }),
      layout: new Hook<{ graphCore: GraphCore }>({ name: 'layout' }),
      viewportchange: new Hook<ViewportChangeHookParams>({ name: 'viewport' }),
      modechange: new Hook<{ mode: string }>({ name: 'modechange' }),
      behaviorchange: new Hook<{
        action: 'update' | 'add' | 'remove';
        modes: string[];
        behaviors: (string | BehaviorOptionsOf<{}>)[];
      }>({ name: 'behaviorchange' }),
      itemstatechange: new Hook<{
        ids: ID[];
        states?: string[];
        value?: boolean;
      }>({
        name: 'itemstatechange',
      }),
      itemvisibilitychange: new Hook<{ ids: ID[]; value: boolean }>({
        name: 'itemvisibilitychange',
      }),
      transientupdate: new Hook<{
        type: ITEM_TYPE | SHAPE_TYPE;
        id: ID;
        config: {
          style: ShapeStyle;
          action: 'remove' | 'add' | 'update' | undefined;
        };
        canvas: Canvas;
        graphCore: GraphCore;
      }>({ name: 'transientupdate' }),
      pluginchange: new Hook<{
        action: 'update' | 'add' | 'remove';
        plugins: (
          | string
          | { key: string; type: string; [cfgName: string]: unknown }
        )[];
      }>({ name: 'pluginchange' }),
      themechange: new Hook<{
        theme: ThemeSpecification;
        canvases: {
          background: Canvas;
          main: Canvas;
          transient: Canvas;
        };
      }>({ name: 'init' }),
      destroy: new Hook<{}>({ name: 'destroy' }),
    };
  }

  /**
   * Update the specs(configurations).
   */
  public updateSpecification(spec: Specification<B, T>): Specification<B, T> {
    return Object.assign(this.specification, spec);
  }

  /**
   * Update the theme specs (configurations).
   */
  public updateTheme(theme: ThemeOptionsOf<T>) {
    this.specification.theme = theme;
    // const { specification } = this.themeController;
    // notifiying the themeController
    this.hooks.themechange.emit({
      canvases: {
        background: this.backgroundCanvas,
        main: this.canvas,
        transient: this.transientCanvas,
      },
    });
    // theme is formatted by themeController, notify the item controller to update the items
    this.hooks.themechange.emit({
      theme: this.themeController.specification,
    });
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
        theme: this.themeController.specification,
        transientCanvas: this.transientCanvas,
      });
      this.emit('afterrender');

      await this.layout();
    };
    if (this.canvasReady) {
      await emitRender();
    } else {
      await Promise.all(
        [this.backgroundCanvas, this.canvas, this.transientCanvas].map(
          (canvas) => canvas.ready,
        ),
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
  public async changeData(
    data: GraphData,
    type: 'replace' | 'mergeReplace' = 'mergeReplace',
  ) {
    this.hooks.datachange.emit({ data, type });
    this.hooks.render.emit({
      graphCore: this.dataController.graphCore,
      theme: this.themeController.specification,
      transientCanvas: this.transientCanvas,
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

  public getViewportCenter(): PointLike {
    const { width, height } = this.canvas.getConfig();
    return { x: width! / 2, y: height! / 2 };
  }
  public async transform(
    options: GraphTransformOptions,
    effectTiming?: CameraAnimationOptions,
  ): Promise<void> {
    await this.hooks.viewportchange.emitLinearAsync({
      transform: options,
      effectTiming,
    });
    this.emit('viewportchange', options);
  }

  /**
   * Stop the current transition of transform immediately.
   */
  public stopTransformTransition() {
    this.canvas.getCamera().cancelLandmarkAnimation();
  }

  /**
   * Move the graph with a relative distance under viewport coordinates.
   * @param dx x of the relative distance
   * @param dy y of the relative distance
   * @param effectTiming animation configurations
   */
  public async translate(
    distance: Partial<{
      dx: number;
      dy: number;
      dz: number;
    }>,
    effectTiming?: CameraAnimationOptions,
  ) {
    await this.transform(
      {
        translate: distance,
      },
      effectTiming,
    );
  }

  /**
   * Move the graph to destination under viewport coordinates.
   * @param destination destination under viewport coordinates.
   * @param effectTiming animation configurations
   */
  public async translateTo(
    { x, y }: PointLike,
    effectTiming?: CameraAnimationOptions,
  ) {
    const { x: cx, y: cy } = this.getViewportCenter();
    await this.translate({ dx: cx - x, dy: cy - y }, effectTiming);
  }

  /**
   * Zoom the graph with a relative ratio.
   * @param ratio relative ratio to zoom
   * @param origin origin under viewport coordinates.
   * @param effectTiming animation configurations
   */
  public async zoom(
    ratio: number,
    origin?: PointLike,
    effectTiming?: CameraAnimationOptions,
  ) {
    await this.transform(
      {
        zoom: {
          ratio,
        },
        origin,
      },
      effectTiming,
    );
  }

  /**
   * Zoom the graph to a specified ratio.
   * @param zoom specified ratio
   * @param origin zoom center
   * @param effectTiming animation configurations
   */
  public async zoomTo(
    zoom: number,
    origin?: PointLike,
    effectTiming?: CameraAnimationOptions,
  ) {
    await this.zoom(
      zoom / this.canvas.getCamera().getZoom(),
      origin,
      effectTiming,
    );
  }

  /**
   * Return the current zoom level of camera.
   * @returns current zoom
   */
  public getZoom() {
    return this.canvas.getCamera().getZoom();
  }

  /**
   * Rotate the graph with a relative angle.
   * @param angle
   * @param origin
   * @param effectTiming
   */
  public async rotate(
    angle: number,
    origin?: PointLike,
    effectTiming?: CameraAnimationOptions,
  ) {
    await this.transform(
      {
        rotate: {
          angle,
        },
        origin,
      },
      effectTiming,
    );
  }

  /**
   * Rotate the graph to an absolute angle.
   * @param angle
   * @param origin
   * @param effectTiming
   */
  public async rotateTo(
    angle: number,
    origin?: PointLike,
    effectTiming?: CameraAnimationOptions,
  ) {
    await this.rotate(
      angle - this.canvas.getCamera().getRoll(),
      origin,
      effectTiming,
    );
  }

  /**
   * Fit the graph content to the view.
   * @param options.padding padding while fitting
   * @param options.rules rules for fitting
   * @param effectTiming animation configurations
   */
  public async fitView(
    options?: {
      padding: Padding;
      rules: FitViewRules;
    },
    effectTiming?: CameraAnimationOptions,
  ) {
    const { padding, rules } = options || {};
    const [top, right, bottom, left] = padding
      ? formatPadding(padding)
      : [0, 0, 0, 0];
    const { direction = 'both', ratioRule = 'min' } = rules || {};

    // Get the bounds of the whole graph.
    const {
      center: [graphCenterX, graphCenterY],
      halfExtents,
    } = this.canvas.document.documentElement.getBounds();
    const origin = this.canvas.canvas2Viewport({
      x: graphCenterX,
      y: graphCenterY,
    });
    const { width: viewportWidth, height: viewportHeight } =
      this.canvas.getConfig();

    const graphWidth = halfExtents[0] * 2;
    const graphHeight = halfExtents[1] * 2;
    const tlInCanvas = this.canvas.viewport2Canvas({ x: left, y: top });
    const brInCanvas = this.canvas.viewport2Canvas({
      x: viewportWidth! - right,
      y: viewportHeight! - bottom,
    });

    const targetViewWidth = brInCanvas.x - tlInCanvas.x;
    const targetViewHeight = brInCanvas.y - tlInCanvas.y;

    const wRatio = targetViewWidth / graphWidth;
    const hRatio = targetViewHeight / graphHeight;

    let ratio: number;
    if (direction === 'x') {
      ratio = wRatio;
    } else if (direction === 'y') {
      ratio = hRatio;
    } else {
      ratio =
        ratioRule === 'max'
          ? Math.max(wRatio, hRatio)
          : Math.min(wRatio, hRatio);
    }

    await this.transform(
      {
        translate: {
          dx: viewportWidth! / 2 - origin.x,
          dy: viewportHeight! / 2 - origin.y,
        },
        zoom: {
          ratio,
        },
      },
      effectTiming,
    );
  }
  /**
   * Fit the graph center to the view center.
   * @param effectTiming animation configurations
   */
  public async fitCenter(effectTiming?: CameraAnimationOptions) {
    // Get the bounds of the whole graph.
    const {
      center: [graphCenterX, graphCenterY],
    } = this.canvas.document.documentElement.getBounds();
    await this.translateTo(
      this.canvas.canvas2Viewport({ x: graphCenterX, y: graphCenterY }),
      effectTiming,
    );
  }
  /**
   * Move the graph to make the item align the view center.
   * @param item node/edge/combo item or its id
   * @param effectTiming animation configurations
   */
  public async focusItem(id: ID | ID[], effectTiming?: CameraAnimationOptions) {
    let bounds: AABB | null = null;
    for (const itemId of !isArray(id) ? [id] : id) {
      const item = this.itemController.getItemById(itemId);
      if (item) {
        const itemBounds = item.group.getBounds();
        if (!bounds) {
          bounds = itemBounds;
        } else {
          bounds.add(itemBounds);
        }
      }
    }

    if (bounds) {
      const {
        center: [itemCenterX, itemCenterY],
      } = bounds;
      await this.translateTo(
        this.canvas.canvas2Viewport({ x: itemCenterX, y: itemCenterY }),
        effectTiming,
      );
    }
  }

  /**
   * Get the size of the graph canvas.
   * @returns [width, height]
   * @group View
   */
  public getSize(): number[] {
    const { width = 500, height = 500 } = this.specification;
    return [width, height];
  }

  /**
   * Set the size for the graph canvas.
   * @param number[] [width, height]
   * @group View
   */
  public setSize(size: number[]) {
    if (!isArray(size) || size.length < 2) {
      console.warn(
        `Failed to setSize. The parameter size: ${size} is invalid. It must be an array with 2 number elements.`,
      );
      return;
    }
    this.specification.width = size[0];
    this.specification.height = size[1];
    this.canvas.resize(size[0], size[1]);
  }

  /**
   * Get the rendering coordinate according to the canvas dom (viewport) coordinate.
   * @param Point rendering coordinate
   * @returns canvas dom (viewport) coordinate
   * @group View
   */
  public getCanvasByViewport(viewportPoint: Point): Point {
    return this.canvas.viewport2Canvas(viewportPoint);
  }

  /**
   * Get the canvas dom (viewport) coordinate according to the rendering coordinate.
   * @param Point canvas dom (viewport) coordinate
   * @returns rendering coordinate
   * @group View
   */
  public getViewportByCanvas(canvasPoint: Point): Point {
    return this.canvas.canvas2Viewport(canvasPoint);
  }

  /**
   * Get the browser coordinate according to the rendering coordinate.
   * @param Point rendering coordinate
   * @returns browser coordinate
   * @group View
   */
  public getClientByCanvas(canvasPoint: Point): Point {
    const viewportPoint = this.canvas.canvas2Viewport(canvasPoint);
    return this.canvas.viewport2Client(viewportPoint as any);
  }

  /**
   * Get the rendering coordinate according to the browser coordinate.
   * @param Point browser coordinate
   * @returns rendering coordinate
   * @group View
   */
  public getCanvasByClient(clientPoint: Point): Point {
    const viewportPoint = this.canvas.client2Viewport(clientPoint);
    return this.canvas.viewport2Canvas(viewportPoint as any);
  }

  // ===== item operations =====
  /**
   * Find a node's inner data according to id or function.
   * @param { ID | Function } condition id or condition function
   * @returns result node's inner data
   * @group Data
   */
  public getNodeData(condition: ID | Function): NodeModel | undefined {
    const conds =
      isString(condition) || isNumber(condition) ? [condition] : condition;
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
      isString(condition) || isNumber(condition) || isNumber(condition)
        ? [condition]
        : condition;
    return this.dataController.findData('edge', conds)?.[0] as EdgeModel;
  }
  /**
   * Find an combo's inner data according to id or function.
   * @param { ID | Function } condition id or condition function
   * @returns result combo's inner data
   * @group Data
   */
  public getComboData(condition: ID | Function): ComboModel | undefined {
    const conds =
      isString(condition) || isNumber(condition) ? [condition] : condition;
    return this.dataController.findData('combo', conds)?.[0] as ComboModel;
  }
  /**
   * Get all the nodes' inner data
   * @returns all nodes' inner data on the graph
   * @group Data
   */
  public getAllNodesData(): NodeModel[] {
    return this.dataController.findAllData('node') as NodeModel[];
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
   * Get one-hop edge ids from a start node.
   * @param nodeId id of the start node
   * @returns one-hop edges' data array
   * @group Data
   */
  public getRelatedEdgesData(
    nodeId: ID,
    direction: 'in' | 'out' | 'both' = 'both',
  ): EdgeModel[] {
    return this.dataController.findRelatedEdges(nodeId, direction);
  }
  /**
   * Get one-hop node ids from a start node.
   * @param nodeId id of the start node
   * @returns one-hop nodes' data array
   * @group Data
   */
  public getNeighborNodesData(
    nodeId: ID,
    direction: 'in' | 'out' | 'both' = 'both',
  ): NodeModel[] {
    return this.dataController.findNeighborNodes(nodeId, direction);
  }
  /**
   * Get the children's data of a combo.
   * @param comboId combo id
   * @returns children's data array
   * @group Data
   */
  public getComboChildrenData(comboId: ID): (ComboModel | NodeModel)[] {
    return this.dataController.findChildren(comboId, 'combo');
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
      const getDataFunc =
        itemType === 'node' ? this.getNodeData : this.getEdgeData; // TODO: combo
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
  ):
    | NodeModel
    | EdgeModel
    | ComboModel
    | NodeModel[]
    | EdgeModel[]
    | ComboModel[] {
    // data controller and item controller subscribe additem in order

    const { graphCore } = this.dataController;
    const { specification } = this.themeController;
    graphCore.once('changed', (event) => {
      if (!event.changes.length) return;
      this.hooks.itemchange.emit({
        type: itemType,
        changes: graphCore.reduceChanges(event.changes),
        graphCore,
        theme: specification,
      });
      this.emit('afteritemchange', { type: itemType, action: 'add', models });
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
    const getItem =
      itemType === 'edge' ? userGraphCore.getEdge : userGraphCore.getNode; // TODO: combo
    data[`${itemType}s`] = idArr.map((id) => getItem.bind(userGraphCore)(id));
    graphCore.once('changed', (event) => {
      if (!event.changes.length) return;
      this.hooks.itemchange.emit({
        type: itemType,
        changes: event.changes,
        graphCore,
        theme: specification,
      });
      this.emit('afteritemchange', { type: itemType, action: 'remove', ids });
    });
    this.hooks.datachange.emit({
      data,
      type: 'remove',
    });
  }
  /**
   * Update one or more node/edge/combo data on the graph.
   * @param {ITEM_TYPE} itemType 'node' | 'edge' | 'combo'
   * @param models new configurations for every node/edge/combo, which has id field to indicate the specific item
   * @param {boolean} stack whether push this operation into graph's stack, true by default
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
  ):
    | NodeModel
    | EdgeModel
    | ComboModel
    | NodeModel[]
    | EdgeModel[]
    | ComboModel[] {
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
        theme: specification,
      });
      this.emit('afteritemchange', {
        type: itemType,
        action: 'update',
        models,
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
   * Update one or more nodes' positions,
   * do not update other styles which leads to better performance than updating positions by updateData.
   * @param models new configurations with x and y for every node, which has id field to indicate the specific item
   * @param {boolean} stack whether push this operation into graph's stack, true by default
   * @group Data
   */
  public updateNodePosition(
    models:
      | Partial<NodeUserModel>
      | Partial<
          ComboUserModel | Partial<NodeUserModel>[] | Partial<ComboUserModel>[]
        >,
    upsertAncestors?: boolean,
    stack?: boolean,
  ) {
    return this.updatePosition('node', models, upsertAncestors, stack);
  }

  /**
   * Update one or more combos' positions,
   * do not update other styles which leads to better performance than updating positions by updateData.
   * In fact, it changes the succeed nodes positions to affect the combo's position, but not modify the combo's position directly.
   * @param models new configurations with x and y for every combo, which has id field to indicate the specific item
   * @param {boolean} stack whether push this operation into graph's stack, true by default
   * @group Data
   */
  public updateComboPosition(
    models:
      | Partial<NodeUserModel>
      | Partial<
          ComboUserModel | Partial<NodeUserModel>[] | Partial<ComboUserModel>[]
        >,
    upsertAncestors?: boolean,
    stack?: boolean,
  ) {
    return this.updatePosition('combo', models, upsertAncestors, stack);
  }

  private updatePosition(
    type: 'node' | 'combo',
    models:
      | Partial<NodeUserModel>
      | Partial<
          ComboUserModel | Partial<NodeUserModel>[] | Partial<ComboUserModel>[]
        >,
    upsertAncestors?: boolean,
    stack?: boolean,
  ) {
    const modelArr = isArray(models) ? models : [models];
    const { graphCore } = this.dataController;
    const { specification } = this.themeController;
    graphCore.once('changed', (event) => {
      if (!event.changes.length) return;
      this.hooks.itemchange.emit({
        type,
        changes: event.changes,
        graphCore,
        theme: specification,
        upsertAncestors,
        action: 'updatePosition',
      });
      this.emit('afteritemchange', {
        type,
        action: 'updatePosition',
        upsertAncestors,
        models,
      });
    });

    this.hooks.datachange.emit({
      data: {
        nodes: type === 'node' ? (modelArr as NodeUserModel[]) : [],
        edges: [],
        combos: type === 'combo' ? (modelArr as ComboUserModel[]) : [],
      },
      type: 'update',
    });
    const dataList = this.dataController.findData(
      type,
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
  public showItem(ids: ID | ID[], disableAniamte?: boolean) {
    const idArr = isArray(ids) ? ids : [ids];
    this.hooks.itemvisibilitychange.emit({
      ids: idArr as ID[],
      value: true,
      graphCore: this.dataController.graphCore,
      animate: !disableAniamte,
    });
  }
  /**
   * Hide the item(s).
   * @param item the item to be hidden
   * @returns
   * @group Item
   */
  public hideItem(ids: ID | ID[], disableAniamte?: boolean) {
    const idArr = isArray(ids) ? ids : [ids];
    this.hooks.itemvisibilitychange.emit({
      ids: idArr as ID[],
      value: false,
      graphCore: this.dataController.graphCore,
      animate: !disableAniamte,
    });
  }
  /**
   * Set state for the item.
   * @param item the item to be set
   * @param state the state name
   * @param value state value
   * @returns
   * @group Item
   */
  public setItemState(
    ids: ID | ID[],
    states: string | string[],
    value: boolean,
  ) {
    const idArr = isArray(ids) ? ids : [ids];
    const stateArr = isArray(states) ? states : [states];
    this.hooks.itemstatechange.emit({
      ids: idArr as ID[],
      states: stateArr as string[],
      value,
    });
    this.emit('afteritemstatechange', { ids, states, value });
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
    this.emit('afteritemstatechange', { ids, states, value: false });
  }

  /**
   * Get the rendering bbox for a node / edge / combo, or the graph (when the id is not assigned).
   * @param id the id for the node / edge / combo, undefined for the whole graph
   * @returns rendering bounding box. returns false if the item is not exist
   * @group Item
   */
  public getRenderBBox(
    id: ID | undefined,
    onlyKeyShape: boolean = false,
    isTransient: boolean = false,
  ): AABB | false {
    if (!id) return this.canvas.getRoot().getRenderBounds();
    return this.itemController.getItemBBox(id, onlyKeyShape, isTransient);
  }

  /**
   * Get the visibility for a node / edge / combo.
   * @param id the id for the node / edge / combo
   * @returns visibility for the item, false for invisible or unexistence for the item
   * @group Item
   */
  public getItemVisible(id: ID) {
    return this.itemController.getItemVisible(id);
  }

  // ===== combo operations =====

  /**
   * Add a new combo to the graph, and update the structure of the existed child in childrenIds to be the children of the new combo.
   * Different from addData with combo type, this API update the succeeds' combo tree strucutres in the same time.
   * @param model combo user data
   * @param stack whether push this operation to stack
   * @returns whether success
   * @group Combo
   */
  public addCombo(
    model: ComboUserModel,
    childrenIds: ID[],
    stack?: boolean,
  ): ComboModel {
    const { graphCore } = this.dataController;
    const { specification } = this.themeController;
    graphCore.once('changed', (event) => {
      if (!event.changes.length) return;
      this.hooks.itemchange.emit({
        type: 'combo',
        changes: graphCore.reduceChanges(event.changes),
        graphCore,
        theme: specification,
      });
      this.emit('afteritemchange', {
        type: 'combo',
        action: 'add',
        models: [model],
      });
    });

    const data = {
      nodes: [],
      edges: [],
      combos: [
        {
          ...model,
          data: {
            ...model.data,
            _children: childrenIds,
          },
        },
      ],
    };
    this.hooks.datachange.emit({
      data,
      type: 'addCombo',
    });
    return this.dataController.findData('combo', [model.id])[0] as ComboModel;
  }
  /**
   * Collapse a combo.
   * @param comboId combo ids
   * @group Combo
   */
  public collapseCombo(comboIds: ID | ID[], stack?: boolean) {
    const ids = isArray(comboIds) ? comboIds : [comboIds];
    this.updateData(
      'combo',
      ids.map((id) => ({ id, data: { collapsed: true } })),
    );
    // emit collapse event?
  }
  /**
   * Expand a combo.
   * @param combo combo ids
   * @group Combo
   */
  public expandCombo(comboIds: ID | ID[], stack?: boolean) {
    const ids = isArray(comboIds) ? comboIds : [comboIds];
    this.updateData(
      'combo',
      ids.map((id) => ({ id, data: { collapsed: false } })),
    );
    // emit expand event?
  }

  /**
   * Move one or more combos a distance (dx, dy) relatively,
   * do not update other styles which leads to better performance than updating positions by updateData.
   * In fact, it changes the succeed nodes positions to affect the combo's position, but not modify the combo's position directly.
   * @param models new configurations with x and y for every combo, which has id field to indicate the specific item
   * @param {boolean} stack whether push this operation into graph's stack, true by default
   * @group Combo
   */
  public moveCombo(
    ids: ID | ID[],
    dx: number,
    dy: number,
    upsertAncestors?: boolean,
    stack?: boolean,
  ): ComboModel[] {
    const idArr = isArray(ids) ? ids : [ids];
    const { graphCore } = this.dataController;
    const { specification } = this.themeController;
    graphCore.once('changed', (event) => {
      if (!event.changes.length) return;
      this.hooks.itemchange.emit({
        type: 'combo',
        changes: event.changes,
        graphCore,
        theme: specification,
        upsertAncestors,
        action: 'updatePosition',
      });
      this.emit('afteritemchange', {
        type: 'combo',
        ids: idArr,
        dx,
        dy,
        action: 'updatePosition',
        upsertAncestors,
      });
    });

    this.hooks.datachange.emit({
      data: {
        nodes: [],
        edges: [],
        combos: idArr.map((id) => ({ id, data: { dx, dy } })),
      },
      type: 'moveCombo',
    });
    return this.dataController.findData('combo', idArr) as ComboModel[];
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
        (formattedOptions as ImmediatelyInvokedLayoutOptions).execute = async (
          graph,
        ) => {
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
  public addBehaviors(
    behaviors: BehaviorOptionsOf<B>[],
    modes: string | string[],
  ) {
    const modesArr = isArray(modes) ? modes : [modes];
    const behaviorsArr = isArray(behaviors) ? behaviors : [behaviors];
    this.hooks.behaviorchange.emit({
      action: 'add',
      modes: modesArr,
      // TODO: update type define.
      // @ts-ignore
      behaviors: behaviorsArr,
    });
    // update the graph specification
    modesArr.forEach((mode) => {
      this.specification.modes[mode] =
        this.specification.modes[mode].concat(behaviorsArr);
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
        const indexOfOldBehavior =
          this.specification.modes[mode].indexOf(oldBehavior);
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
  public updateBehavior(behavior: BehaviorOptionsOf<B>, mode?: string) {
    this.hooks.behaviorchange.emit({
      action: 'update',
      modes: [mode],
      // TODO: update type define.
      // @ts-ignore
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
   * Add plugin(s) to graph.
   * @param pluginCfgs
   * @returns
   * @group Plugin
   */
  public addPlugins(
    pluginCfgs: (
      | {
          key: string;
          type: string;
          [cfgName: string]: unknown; // TODO: configs from plugins
        }
      | string
    )[],
  ) {
    const pluginsArr = isArray(pluginCfgs) ? pluginCfgs : [pluginCfgs];

    // update the graph specification
    if (!this.specification.plugins) this.specification.plugins = [];
    const oldPlugins = this.specification.plugins;
    const validPlugins: (
      | {
          key: string;
          type: string;
          [cfgName: string]: unknown; // TODO: configs from plugins
        }
      | string
    )[] = [];
    pluginsArr.forEach((config) => {
      const oldPlugin = oldPlugins.find((oldPlugin) => {
        if (typeof oldPlugin === 'string' || typeof config === 'string')
          return false;
        return oldPlugin.key === config.key;
      });
      if (oldPlugin) {
        console.warn(
          `Add plugin with key ${
            (config as any).key
          } failed, the key is duplicated to the existing plugins on the graph.`,
        );
        return;
      }
      validPlugins.push(config);
    });
    this.specification.plugins = oldPlugins.concat(validPlugins);

    this.hooks.pluginchange.emit({
      action: 'add',
      plugins: validPlugins,
    });
  }

  /**
   * Remove plugin(s) from graph.
   * @param pluginKeys
   * @returns
   * @group Plugin
   */
  public removePlugins(pluginKeys: string[]) {
    this.hooks.pluginchange.emit({
      action: 'remove',
      plugins: pluginKeys,
    });
    // update the graph specification
    const { plugins } = this.specification;
    this.specification.plugins = plugins?.filter((plugin) => {
      if (isObject(plugin)) return !pluginKeys.includes(plugin.key);
      return !pluginKeys.includes(plugin);
    });
  }

  /**
   * Update a plugin of the graph.
   * @param plugin plugin configs, whose key indicates the behavior to be updated
   * @returns
   * @group Interaction
   */
  public updatePlugin(plugin: {
    key: string;
    type: string;
    [cfg: string]: unknown;
  }) {
    const { key } = plugin;
    if (!key) {
      console.warn(
        'Update plugin failed, the key for the plugin to be updated should be assign.',
      );
      return;
    }
    const { plugins } = this.specification;
    if (!plugins) {
      console.warn(
        'Update plugin failed, the plugin to be updated does not exist.',
      );
      return;
    }
    const oldPlugin = plugins?.find((p) => {
      if (typeof p === 'string') return p === key;
      return p.key === key;
    });
    if (!oldPlugin) {
      console.warn(
        'Update plugin failed, the key for the plugin to be updated should be assign.',
      );
      return;
    }
    const idx = plugins.indexOf(oldPlugin);
    plugins[idx] = {
      // TODO: update type define.
      // @ts-ignore
      ...oldPlugin,
      ...plugin,
    };

    this.hooks.pluginchange.emit({
      action: 'update',
      plugins: [plugin],
    });
  }

  /**
   * Draw or update a G shape or group to the transient canvas.
   * @param type shape type or item type
   * @param id new shape id or updated shape id for a interation shape, node/edge/combo id for item interaction group drawing
   * @returns upserted shape or group
   * @group Interaction
   */
  public drawTransient(
    type: ITEM_TYPE | SHAPE_TYPE,
    id: ID,
    config: {
      action: 'remove' | 'add' | 'update' | undefined;
      style: ShapeStyle;
      onlyDrawKeyShape?: boolean;
      upsertAncestors?: boolean;
    },
  ): DisplayObject {
    this.hooks.transientupdate.emit({
      type,
      id,
      config,
      canvas: this.transientCanvas,
      graphCore: this.dataController.graphCore,
    });
    return this.itemController.getTransient(String(id));
  }

  /**
   * Destroy the graph instance and remove the related canvases.
   * @returns
   * @group Graph Instance
   */
  public destroy(callback?: Function) {
    // TODO: call the destroy functions after items' buildOut animations finished
    setTimeout(() => {
      this.canvas.destroy();
      this.backgroundCanvas.destroy();
      this.transientCanvas.destroy();
      callback?.();
    }, 500);

    this.hooks.destroy.emit({});

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
