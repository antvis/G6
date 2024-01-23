import EventEmitter from '@antv/event-emitter';
import { AABB, Cursor, DataURLOptions, DisplayObject, PointLike } from '@antv/g';
import type { EdgeDataUpdated, GraphChangedEvent, ID, NodeDataUpdated } from '@antv/graphlib';
import { deepMix, groupBy, isEmpty, isEqual, isFunction, isNil, isString } from '@antv/util';
import { GraphEvent } from '../constant/event';
import { LodController } from '../plugin/widget';
import type { G6Spec } from '../spec';
import type { ComboData, DataOptions, EdgeData, NodeData } from '../spec/data';
import type { ComboOptions, EdgeOptions, NodeOptions } from '../spec/element';
import type { LayoutOptions } from '../spec/layout';
import { STDWidget } from '../spec/widget';
import type { CameraAnimationOptions } from '../types/animate';
import type { CallableValue } from '../types/callable';
import type { ComboDisplayModel } from '../types/combo';
import type { Point } from '../types/common';
import type { DataId } from '../types/data';
import type { EdgeDirection, EdgeDisplayModel } from '../types/edge';
import type { ITEM_TYPE, SHAPE_TYPE, ShapeStyle } from '../types/item';
import type { NodeDisplayModel } from '../types/node';
import { PositionPoint } from '../types/position';
import type { FitViewOptions, FitViewRules, GraphTransformOptions, TranslateOptions } from '../types/view';
import { parseArrayLike } from '../utils/array';
import { parseAutoFit } from '../utils/auto-fit';
import { getCombinedCanvasesBounds } from '../utils/bbox';
import { dataIdOf, isEmptyGraph } from '../utils/data';
import { warn } from '../utils/invariant';
import { getLayoutBounds } from '../utils/layout';
import { createPromise } from '../utils/promise';
import { formatPadding } from '../utils/shape';
import { Canvas } from './canvas';
import { Controller } from './controller';
import type { BaseParams, ItemVisibilityChangeParams, ItemZIndexChangeParams } from './hooks';
import { Hooks } from './hooks';

type PositionOptions = {
  updateAncestors?: boolean;
  animate?: boolean;
};

export class Graph extends EventEmitter {
  private _hooks = new Hooks();
  public get hooks() {
    return this._hooks;
  }

  private _canvas: Canvas;
  public get canvas() {
    return this._canvas;
  }

  private _container: HTMLElement;
  public get container() {
    return this._container;
  }

  private _destroyed: boolean = false;
  public get destroyed() {
    return this._destroyed;
  }

  private options: G6Spec;

  private controller: Controller;

  private defaultOption: G6Spec = {
    theme: 'light',
    widgets: [
      {
        key: 'lod-controller',
        type: 'lod-controller',
        pluginClass: LodController,
      },
    ],
    optimize: {
      tileBehavior: 2000,
      tileBehaviorSize: 1000,
      tileFirstRender: 10000,
      tileFirstRenderSize: 1000,
    },
  };

  private get baseEmitParam(): BaseParams {
    return {
      context: {
        options: this.options,
        graph: this,
        controller: this.controller,
      },
    };
  }

  constructor(options: G6Spec) {
    super();
    this.options = deepMix({}, this.defaultOption, options);
    this.initCanvas();
    this.controller = new Controller(this);

    this.hooks.init.emit({
      ...this.baseEmitParam,
    });

    this.setOptions(options);
  }

  private initContainer() {
    const { container } = this.options;

    if (container instanceof HTMLElement) {
      this._container = container;
      return;
    }

    if (isString(container)) {
      const dom = document.getElementById(container);
      if (dom) {
        this._container = dom;
        return;
      }
    }

    warn('Unable to find the container for the graph instance.');
  }

  private initCanvas() {
    const { renderer, width, height } = this.options;

    this.initContainer();

    this._canvas = new Canvas({
      container: this.container,
      width,
      height,
      renderer,
    });
  }

  /**
   * Get the copy of specs(configurations).
   * @returns graph specs
   */
  public getOptions(): G6Spec {
    return this.options;
  }

  /**
   * <zh/> 设置/更新配置项
   *
   * <en/> Set/Update the graph specs.
   * @param option - <zh/> 配置项 | <en/> graph specs
   */
  public setOptions(option: G6Spec) {
    const { data, node, edge, combo, theme, layout, ...restOption } = option;
    if (data) this.setData(data);

    if (node) this.setNode(node);
    if (edge) this.setEdge(edge);
    if (combo) this.setCombo(combo);

    if (theme) this.setTheme(theme);

    if (layout) this.setLayout(layout);

    Object.assign(this.options, restOption);
  }

  protected getTheme() {
    return this.options.theme;
  }

  /**
   * Update the theme specs (configurations).
   * @param theme - The theme specs to be updated.
   */
  protected setTheme(theme: G6Spec['theme']) {
    this.options.theme = theme;

    this.hooks.themechange.emit({
      ...this.baseEmitParam,
    });
  }

  protected setNode(node: NodeOptions) {
    this.setMapper('node', node);
  }

  protected setEdge(edge: EdgeOptions) {
    this.setMapper('edge', edge);
  }

  protected setCombo(combo: ComboOptions) {
    this.setMapper('combo', combo);
  }

  protected setMapper(type: ITEM_TYPE, mapper: NodeOptions | EdgeOptions | ComboOptions) {
    this.options[type] = mapper;
    this.hooks.mapperchange.emit({
      ...this.baseEmitParam,
      type,
      mapper,
    });
  }

  private getItemById(id: ID) {
    return this.controller.item.getItemById(id);
  }

  /**
   * <zh/> 获取画布尺寸
   *
   * <en/> Get the size of the canvas.
   * @returns <zh/> 画布尺寸 | <en/> the size of the canvas
   * @public
   */
  public getSize(): [number, number] {
    const { width, height } = this.options;
    return [width, height];
  }

  /**
   * <zh/> 设置画布尺寸
   *
   * <en/> Set the size of the canvas.
   * @param width - <zh/> 宽度 | <en/> width
   * @param height - <zh/> 高度 | <en/> height
   * @public
   */
  public setSize(width: number, height: number) {
    const oldValue = [this.options.width, this.options.height];
    const newValue = [width, height];

    const params = { oldValue, newValue };

    this.emit(GraphEvent.BEFORE_SET_SIZE, params);

    Object.assign(this.options, { width, height });
    this.canvas.resize(width, height);

    this.emit(GraphEvent.AFTER_SET_SIZE, params);
  }

  // ---------- Manipulate API ----------

  /**
   * <zh/> 对画布进行变换，支持平移、旋转、缩放
   *
   * <en/> Transform the graph, support translate, rotate and zoom.
   * @param options - <zh/> 变换参数 | <en/> transform options
   * @param effectTiming - <zh/> 动画参数 | <en/> animation options
   * @returns <zh/> Promise | <en/> Promise
   * @public
   * @example
   * ```ts
   * const target = graph.getViewportByCanvas({ x: 100, y: 100 });
   * graph.transform({
   *  translate: {
   *    dx: 100,
   *    dy: 100,
   *    targetX: target.x
   *    targetY: target.y
   *  }
   * });
   *
   * graph.transform({
   *  zoom: {
   *    ratio: 2
   *  }
   * });
   *
   * graph.transform({
   *  rotate: {
   *    angle: 30
   *  }
   * });
   * ```
   */
  public async transform(options: GraphTransformOptions, effectTiming?: CameraAnimationOptions): Promise<void> {
    if (isEmptyGraph(this, true)) return;
    await this.hooks.viewportchange.emitAsync({
      ...this.baseEmitParam,
      transform: options,
      effectTiming,
    });
    this.emit('viewportchange', options);
  }

  /**
   * <zh/> 停止当前的变换动画
   *
   * <en/> Stop the current transition of transform immediately.
   * @public
   */
  public stopTransformTransition() {
    this.canvas.getCamera().cancelLandmarkAnimation();
  }

  /**
   * <zh/> 使用相对距离平移画布
   *
   * <en/> Translate the graph with a relative distance.
   * @param distance - <zh/> 相对距离 | <en/> relative distance
   * @param effectTiming - <zh/> 动画参数 | <en/> animation options
   * @public
   */
  public async translateBy(
    distance: Partial<Pick<TranslateOptions, 'dx' | 'dy' | 'dz'>>,
    effectTiming?: CameraAnimationOptions,
  ) {
    const { x: cx, y: cy } = this.getViewportCenter();
    const { dx, dy, dz } = distance;
    await this.transform(
      {
        translate: {
          dx,
          dy,
          dz,
          targetX: cx - dx,
          targetY: cy - dy,
        },
      },
      effectTiming,
    );
  }

  /**
   * <zh/> 将画布平移到指定位置
   *
   * <en/> Translate the graph to a specified position.
   * @param point - <zh/> 位置 | <en/> position
   * @param effectTiming - <zh/> 动画参数 | <en/> animation options
   * @public
   */
  public async translateTo(point: Point, effectTiming?: CameraAnimationOptions) {
    const { x, y } = point;
    const { x: cx, y: cy } = this.getViewportCenter();
    const canvasPoint = this.canvas.viewport2Canvas({ x, y });

    await this.transform(
      {
        translate: {
          dx: cx - x,
          dy: cy - y,
          targetX: canvasPoint.x,
          targetY: canvasPoint.y,
        },
      },
      effectTiming,
    );
  }

  public getPosition() {}

  /**
   * <zh/> 缩放画布
   *
   * <en/> Zoom the graph.
   * @param ratio - <zh/> 缩放比例 | <en/> zoom ratio
   * @param origin - <zh/> 缩放中心 | <en/> zoom center
   * @param effectTiming - <zh/> 动画参数 | <en/> animation options
   * @public
   */
  public async zoomBy(ratio: number, origin?: Point, effectTiming?: CameraAnimationOptions) {
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
   * <zh/> 将画布缩放到指定比例
   *
   * <en/> Zoom the graph to a specified ratio.
   * @param zoom - <zh/> 缩放比例 | <en/> zoom ratio
   * @param origin - <zh/> 缩放中心 | <en/> zoom center
   * @param effectTiming - <zh/> 动画参数 | <en/> animation options
   * @public
   */
  public async zoomTo(zoom: number, origin?: PointLike, effectTiming?: CameraAnimationOptions) {
    await this.zoomBy(zoom / this.canvas.main.getCamera().getZoom(), origin, effectTiming);
  }

  /**
   * <zh/> 获取画布缩放比例
   * @returns <zh/> 缩放比例 | <en/> zoom ratio
   * @public
   */
  public getZoom() {
    return this.canvas.main.getCamera().getZoom();
  }

  /**
   * <zh/> 旋转画布
   *
   * <en/> Rotate the graph.
   * @param angle - <zh/> 旋转角度（角度） | <en/> rotate angle (degree)
   * @param origin - <zh/> 旋转中心 | <en/> rotate center
   * @param effectTiming - <zh/> 动画参数 | <en/> animation options
   * @public
   */
  public async rotateBy(angle: number, origin?: PointLike, effectTiming?: CameraAnimationOptions) {
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
   * <zh/> 将画布旋转到指定角度
   *
   * <en/> Rotate the graph to a specified angle.
   * @param angle - <zh/> 旋转角度（角度） | <en/> rotate angle (degree)
   * @param origin - <zh/> 旋转中心 | <en/> rotate center
   * @param effectTiming - <zh/> 动画参数 | <en/> animation options
   * @public
   */
  public async rotateTo(angle: number, origin?: PointLike, effectTiming?: CameraAnimationOptions) {
    await this.rotateBy(angle - this.canvas.main.getCamera().getRoll(), origin, effectTiming);
  }

  /**
   * <zh/> 获取画布旋转角度
   *
   * <en/> Get the rotation angle of the graph.
   * @public
   */
  public getRotation() {}

  /**
   * <zh/> 自适应
   *
   * <en/> Auto fit the viewport.
   * @internal
   */
  protected async autoFit() {
    const autoFit = parseAutoFit(this.options.autoFit);
    if (!autoFit) return;
    const { type, effectTiming } = autoFit;
    if (type === 'view') {
      const { padding, rules } = autoFit;
      await this.fitView({ padding, rules: { ...rules, boundsType: 'final' } }, effectTiming);
    } else if (type === 'center') {
      await this.fitCenter('final', effectTiming);
    } else if (type === 'position') {
      const { position } = autoFit;
      await this.translateTo(position, effectTiming);
    }
  }

  /**
   * <zh/> 自适应视口
   *
   * <en/> Auto fit the viewport.
   * @param options - <zh/> 自适应参数 | <en/> auto fit options
   * @param effectTiming - <zh/> 动画参数 | <en/> animation options
   */
  public async fitView(options?: FitViewOptions, effectTiming?: CameraAnimationOptions) {
    const { padding, rules } = options || {};
    const [top, right, bottom, left] = padding ? formatPadding(padding) : [0, 0, 0, 0];
    const {
      direction = 'both',
      ratioRule = 'min',
      boundsType = 'current',
      onlyOutOfViewport = false,
      onlyZoomAtLargerThanViewport = false,
    } = rules || {};

    const {
      min,
      max,
      center: [graphCenterX, graphCenterY],
      halfExtents,
    } = boundsType === 'current'
      ? // Get the bounds of the whole graph content.
        getCombinedCanvasesBounds([this.canvas.main, this.canvas.label])
      : // Get the bounds of the nodes positions while the graph content is not ready.
        getLayoutBounds(this);
    const origin = this.canvas.canvas2Viewport({
      x: graphCenterX,
      y: graphCenterY,
    });
    const { width: viewportWidth, height: viewportHeight } = this.canvas.getConfig();

    const graphWidth = halfExtents[0] * 2;
    const graphHeight = halfExtents[1] * 2;
    const tlInCanvas = this.canvas.viewport2Canvas({ x: left, y: top });
    const brInCanvas = this.canvas.viewport2Canvas({
      x: viewportWidth! - right,
      y: viewportHeight! - bottom,
    });

    const isOutOfView =
      min[0] < tlInCanvas.x || min[1] < tlInCanvas.y || max[0] > brInCanvas.x || max[1] > brInCanvas.y;
    if (onlyOutOfViewport && !isOutOfView) return;

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
      ratio = ratioRule === 'max' ? Math.max(wRatio, hRatio) : Math.min(wRatio, hRatio);
    }

    if (onlyZoomAtLargerThanViewport && ratio > 1) ratio = 1;

    await this.transform(
      {
        translate: {
          dx: viewportWidth! / 2 - origin.x,
          dy: viewportHeight! / 2 - origin.y,
          targetX: graphCenterX,
          targetY: graphCenterY,
        },
        zoom: {
          ratio,
        },
      },
      effectTiming,
    );
  }

  /**
   * <zh/> 调整视口，使视口中心位于画布中心
   *
   * <en/> Adjust the viewport, make the center of the viewport in the center of the canvas.
   * @param boundsType - <zh/> 获取的包围盒类型 | <en/> bounds type
   * @param effectTiming - <zh/> 动画参数 | <en/> animation options
   */
  public async fitCenter(boundsType: FitViewRules['boundsType'] = 'current', effectTiming?: CameraAnimationOptions) {
    const {
      center: [graphCenterX, graphCenterY],
    } =
      boundsType === 'current'
        ? // 获取当前包围盒
          // Get the current bounds.
          getCombinedCanvasesBounds([this.canvas.main, this.canvas.label])
        : // 获取布局后的包围盒
          // Get the bounds after layout.
          getLayoutBounds(this);
    await this.translateTo(this.canvas.canvas2Viewport({ x: graphCenterX, y: graphCenterY }), effectTiming);
  }

  /**
   * <zh/> 聚焦 item，使其居中显示
   *
   * <en/> Focus the item, make it in the center of the viewport.
   * @param id - <zh/> item id | <en/> item id
   * @param effectTiming - <zh/> 动画参数 | <en/> animation options
   */
  public async focusItem(id: ID | ID[], effectTiming?: CameraAnimationOptions) {
    let bounds: AABB | null = null;
    for (const itemId of parseArrayLike(id)) {
      const item = this.getItemById(itemId);
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
      await this.translateTo(this.canvas.canvas2Viewport({ x: itemCenterX, y: itemCenterY }), effectTiming);
    }
  }

  // ---------- Spec API ----------
  public getCanvasRange(): AABB {
    const [width, height] = this.getSize();
    const leftTop = this.getCanvasByViewport({ x: 0, y: 0 });
    const rightBottom = this.getCanvasByViewport({ x: width, y: height });

    const bbox = new AABB();
    bbox.setMinMax([leftTop.x, leftTop.y, 0], [rightBottom.x, rightBottom.y, 0]);
    return bbox;
  }

  /**
   * <zh/> 获取 item 的可见性
   *
   * <en/> Get the visibility of the item.
   * @param id - <zh/> item id | <en/> item id
   * @returns <zh/> 可见性 | <en/> visibility
   */
  public getItemVisibility(id: ID) {
    return this.controller.item.getItemVisibility(id);
  }

  /**
   * <zh/> 设置 item 的可见性
   *
   * <en/> Set the visibility of the item.
   * @param id - <zh/> item id | <en/> item id
   * @param visibility - <zh/> 可见性 | <en/> visibility
   * @param animate - <zh/> 是否使用动画 | <en/> whether to use animation
   * @description
   * <zh/> 动画配置位于 `options.[node/edge/combo].animate.[show/hide]` 中
   */
  public setItemVisibility(
    id: ID | ID[],
    visibility: ItemVisibilityChangeParams['value'][ID],
    animate: boolean = true,
  ) {
    const ids = parseArrayLike(id);
    if (ids.length === 0) return;

    const newValue: ItemVisibilityChangeParams['value'] = ids.reduce((acc, id) => {
      acc[id] = visibility;
      return acc;
    }, {});

    const oldValue: ItemVisibilityChangeParams['value'] = ids.reduce((acc, id) => {
      acc[id] = this.getItemVisibility(id);
      return acc;
    }, {});

    this.hooks.itemvisibilitychange.emit({
      ...this.baseEmitParam,
      value: newValue,
      animate,
    });

    this.emit('afteritemvisibilitychange', {
      ids: ids,
      value: visibility,
      changes: { newValue, oldValue },
      animate,
    });
  }

  /**
   * To be implemented.
   * <zh/> 获取 item 的层级
   * @param id - <zh/> item id | <en/> item id
   * @returns <zh/> 层级 | <en/> z-index
   */
  public getItemZIndex(id: ID) {
    return 0;
  }

  /**
   * <zh/> 设置 item 的层级
   *
   * <en/> Set the z-index of the item.
   * @param id - <zh/> item id | <en/> item id
   * @param zIndex - <zh/> 层级 | <en/> z-index
   */
  public setItemZIndex(id: ID | ID[], zIndex: ItemZIndexChangeParams['value'][ID]) {
    const ids = parseArrayLike(id);

    const newValue: ItemZIndexChangeParams['value'] = ids.reduce((acc, id) => {
      acc[id] = zIndex;
      return acc;
    }, {});

    const oldValue: ItemZIndexChangeParams['value'] = ids.reduce((acc, id) => {
      acc[id] = this.getItemZIndex(id);
      return acc;
    }, {});

    this.hooks.itemzindexchange.emit({
      ...this.baseEmitParam,
      value: newValue,
    });
    this.emit('afteritemzindexchange', {
      value: newValue,
      changes: {
        newValue,
        oldValue,
      },
    });
  }

  // ---------- Data API ----------

  /**
   * <zh/> 获取数据
   *
   * <en/> Get data
   * @returns - <zh/> 数据 | <en/> data
   * @public
   */
  public data(): DataOptions;
  /**
   * <zh/> 设置数据
   *
   * <en/> Set data
   * @param data - <zh/> 数据 | <en/> data
   * @public
   */
  public data(data: CallableValue<DataOptions>): void;
  /**
   * <zh/> 获取/设置数据
   *
   * <en/> Get/Set data
   * @param data - <zh/> 数据 | <en/> data
   * @returns - <zh/> 数据 | <en/> data
   * @internal
   */
  public data(data?: CallableValue<DataOptions>): DataOptions | void {
    if (!data) {
      return this.getData();
    }
    this.setData(data);
  }

  /**
   * <zh/> 获取数据
   *
   * <en/> Get data
   * @returns - <zh/> 数据 | <en/> data
   * @public
   */
  public getData() {
    return this.controller.data.getData();
  }

  /**
   * <zh/> 设置数据
   *
   * <en/> Set data
   * @param data - <zh/> 数据 | <en/> data
   * @public
   */
  protected setData(data: CallableValue<DataOptions>) {
    this.controller.data.model.once('changed', this.handleDataChange.bind(this));

    this.controller.data.setData(isFunction(data) ? data(this.controller.data.getData()) : data);
  }

  /**
   * <zh/> 新增数据
   *
   * <en/> Add data
   * @param data - <zh/> 数据 | <en/> data
   * @public
   */
  public addData(data: CallableValue<DataOptions>) {
    this.controller.data.model.once('changed', this.handleDataChange.bind(this));

    this.controller.data.addData(isFunction(data) ? data(this.controller.data.getData()) : data);
  }

  /**
   * <zh/> 新增节点数据
   *
   * <en/> Add node data
   * @param nodes - <zh/> 节点数据 | <en/> node data
   * @public
   */
  public addNodeData(nodes: CallableValue<NodeData[]>) {
    this.addData({
      nodes: isFunction(nodes) ? nodes(this.controller.data.getNodeData()) : nodes,
    });
  }

  /**
   * <zh/> 新增边数据
   *
   * <en/> Add edge data
   * @param edges - <zh/> 边数据 | <en/> edge data
   * @public
   */
  public addEdgeData(edges: CallableValue<EdgeData[]>) {
    this.addData({
      edges: isFunction(edges) ? edges(this.controller.data.getEdgeData()) : edges,
    });
  }

  /**
   * <zh/> 新增 combo 数据，combo 子节点 id 需要放置到 style.children 中
   *
   * <en/> Add combo data, combo child id should be placed in style.children
   * @example
   * graph.addComboData([{
   *  id: 'combo1',
   *  style: {
   *    children: ['node1', 'node2']
   *  }
   * }])
   * @param combos - <zh/> combo 数据 | <en/> combo data
   * @public
   */
  public addComboData(combos: CallableValue<ComboData[]>) {
    this.addData({
      combos: isFunction(combos) ? combos(this.controller.data.getComboData()) : combos,
    });
  }

  /**
   * <zh/> 更新数据
   *
   * <en/> Update data
   * @param data - <zh/> 数据 | <en/> data
   * @public
   */
  public updateData(data: CallableValue<DataOptions>) {
    this.controller.data.model.once('changed', this.handleDataChange.bind(this));

    this.controller.data.updateData(isFunction(data) ? data(this.controller.data.getData()) : data);
  }

  /**
   * <zh/> 更新节点数据
   *
   * <en/> Update node data
   * @param nodes - <zh/> 节点数据 | <en/> node data
   * @public
   */
  public updateNodeData(nodes: CallableValue<NodeData[]>) {
    this.updateData({
      nodes: isFunction(nodes) ? nodes(this.controller.data.getNodeData()) : nodes,
    });
  }

  /**
   * <zh/> 更新边数据
   *
   * <en/> Update edge data
   * @param edges - <zh/> 边数据 | <en/> edge data
   */
  public updateEdgeData(edges: EdgeData[]) {
    this.updateData({
      edges: isFunction(edges) ? edges(this.controller.data.getEdgeData()) : edges,
    });
  }

  /**
   * <zh/> 更新 combo 数据，如果要更新 combo 的子元素，需要放置到 style.children 中
   *
   * <en/> Update combo data, if you want to update the child elements of the combo, you need to place them in style.children
   * @example
   * graph.updateComboData([{
   *  id: 'combo1',
   *  style: {
   *    children: ['node3', 'node4']
   *  }
   * }])
   * @param combos - <zh/> combo 数据 | <en/> combo data
   */
  public updateComboData(combos: CallableValue<ComboData[]>) {
    this.updateData({
      combos: isFunction(combos) ? combos(this.controller.data.getComboData()) : combos,
    });
  }

  /**
   * <zh/> 移除数据
   *
   * <en/> Remove data
   * @param id - <zh/> 数据 ID | <en/> data ID
   */
  public removeData(id: DataId | ((data: DataOptions) => DataId)) {
    this.controller.data.model.once('changed', this.handleDataChange.bind(this));

    const { nodes, edges, combos } = isFunction(id) ? id(this.controller.data.getData()) : id;

    const dataController = this.controller.data;
    const data = {
      nodes: nodes.filter((node) => dataController.hasNode(node)),
      edges: edges.filter((edge) => dataController.hasEdge(edge)),
      combos: combos.filter((combo) => dataController.hasCombo(combo)),
    };

    this.controller.data.removeData(data);
  }

  /**
   * <zh/> 移除节点数据
   *
   * <en/> Remove node data
   * @param ids - <zh/> 节点 ID 或 ID 列表 | <en/> node ID or ID list
   */
  public removeNodeData(ids: ID[] | ((data: NodeData[]) => ID[])) {
    this.removeData({
      nodes: isFunction(ids) ? ids(this.controller.data.getNodeData()) : ids,
    });
  }

  /**
   * <zh/> 移除边数据
   *
   * <en/> Remove edge data
   * @param ids - <zh/> 边 ID 或 ID 列表 | <en/> edge ID or ID list
   */
  public removeEdgeData(ids: ID[] | ((data: EdgeData[]) => ID[])) {
    this.removeData({
      edges: isFunction(ids) ? ids(this.controller.data.getEdgeData()) : ids,
    });
  }

  /**
   * <zh/> 移除 combo 数据
   *
   * <en/> Remove combo data
   * @param ids - <zh/> combo ID 或 ID 列表 | <en/> combo ID or ID list
   */
  public removeComboData(ids: ID[] | ((data: ComboData[]) => ID[])) {
    this.removeData({
      combos: isFunction(ids) ? ids(this.controller.data.getComboData()) : ids,
    });
  }

  protected handleDataChange(event: GraphChangedEvent<NodeData, EdgeData>, extra?: Record<string, unknown>) {
    const { changes } = event;
    if (!changes.length) return;

    const actualChanges = changes.filter((change) => {
      const { type } = change;
      if (['NodeDataUpdated', 'EdgeUpdated', 'EdgeDataUpdated'].includes(type)) {
        const { newValue, oldValue } = change as NodeDataUpdated<any> | EdgeDataUpdated<any>;
        return !isEqual(newValue, oldValue);
      }
      return true;
    });

    const params = { changes: actualChanges };
    this.emit(GraphEvent.BEFORE_ITEM_CHANGE, params);
    this.hooks.itemchange.emit({
      ...this.baseEmitParam,
      changes: actualChanges,
      ...extra,
    });
    this.emit(GraphEvent.AFTER_ITEM_CHANGE, params);
  }

  /**
   * <zh/> 根据 ID 获取节点数据。若未传入 ID，则返回所有节点数据
   *
   * <en/> Get node data by ID. if no ID passed in, return all node data
   * @param id - <zh/> 节点 ID 或 ID 列表 | <en/> node ID or ID list
   * @returns <zh/> 节点数据 | <en/> node data
   */
  public getNodeData(id?: ID | ID[]) {
    const ids = parseArrayLike(id);
    return this.controller.data.getNodeData(ids);
  }

  /**
   * <zh/> 根据 ID 获取边数据。若未传入 ID，则返回所有边数据
   *
   * <en/> Get edge data by ID. if no ID passed in, return all edge data
   * @param id - <zh/> 边 ID 或 ID 列表 | <en/> edge ID or ID list
   * @returns <zh/> 边数据 | <en/> edge data
   */
  public getEdgeData(id?: ID | ID[]) {
    const ids = parseArrayLike(id);
    return this.controller.data.getEdgeData(ids);
  }

  /**
   * <zh/> 根据 ID 获取 combo 数据。若未传入 ID，则返回所有 combo 数据
   *
   * <en/> Get combo data by ID. if no ID passed in, return all combo data
   * @param id - <zh/> combo ID 或 ID 列表 | <en/> combo ID or ID list
   * @returns <zh/> combo 数据 | <en/> combo data
   */
  public getComboData(id?: ID | ID[]) {
    const ids = parseArrayLike(id);
    return this.controller.data.getComboData(ids);
  }

  /**
   * <zh/> 获取节点的邻边
   *
   * <en/> Get the edges of the node
   * @param id - <zh/> 节点 ID | <en/> node ID
   * @param direction - <zh/> 邻边方向 | <en/> edge direction
   * @returns <zh/> 边数据 | <en/> edge data
   */
  public getRelatedEdgesData(id: ID, direction: EdgeDirection = 'both') {
    return this.controller.data.getRelatedEdgesData(id, direction);
  }

  /**
   * <zh/> 获取节点的邻节点
   *
   * <en/> Get the neighbor nodes of the node
   * @param id - <zh/> 节点 ID | <en/> node ID
   * @returns <zh/> 节点数据 | <en/> node data
   */
  public getNeighborNodesData(id: ID) {
    return this.controller.data.getNeighborNodesData(id);
  }

  /**
   * <zh/> 获取 Combo 的子元素数据
   *
   * <en/> Get the data of child elements of the Combo
   * @param id - <zh/> Combo ID | <en/> Combo ID
   * @returns <zh/> 节点/Combo 数据 | <en/> node/combo data
   */
  public getComboChildrenData(id: ID) {
    return this.controller.data.getComboChildrenData(id);
  }

  // ---------- Lifecycle API ----------

  public render() {
    this.canvas.ready.then(async () => {
      await this.hooks.render.emitAsync(this.baseEmitParam);

      this.emit(GraphEvent.AFTER_RENDER);

      this.once(GraphEvent.AFTER_LAYOUT, async () => {
        await this.autoFit();
      });

      await this.layout();
    });
  }

  /**
   * <zh/> 清空画布
   *
   * <en/> Clear the graph.
   * @public
   */
  public clear() {
    this.removeData((data) => dataIdOf(data));
  }

  /**
   * Destroy the graph instance and remove the related canvases.
   */
  public destroy() {
    this.canvas.destroy();
    this.controller.destroy();
    this.hooks.destroy.emit(null);
    this._destroyed = true;
  }

  // ---------- Element API ----------

  /**
   * <zh/> 添加 combo，并指定子节点。如果子节点存在于其他 combo 中，则会先移除。
   *
   * <en/> Add combo and specify child nodes. If the child node exists in another combo, it will be removed first.
   * @param combo - <zh/> combo 数据 | <en/> combo data
   * @param children - <zh/> 子节点 ID 列表 | <en/> child node ID list
   * @returns <zh/> combo 数据 | <en/> combo data
   */
  public addCombo(combo: ComboData, children: ID[]): ComboData {
    this.controller.data.model.once('changed', (event) => {
      const changes = event.changes;
      if (!changes.length) return;
      const params = { changes };
      this.emit(GraphEvent.BEFORE_ITEM_CHANGE, params);
      this.hooks.itemchange.emit({
        ...this.baseEmitParam,
        changes: event.changes,
      });
      this.emit(GraphEvent.AFTER_ITEM_CHANGE, params);
    });

    const data: ComboData = {
      ...combo,
      style: { ...combo?.style, children },
    };

    this.controller.data.addComboData([
      {
        ...combo,
        style: { ...combo?.style, children },
      },
    ]);

    return data;
  }

  protected translateComboBy(ids: ID[], offset: PositionPoint, options: PositionOptions) {
    const [dx, dy, dz] = offset;
    this.controller.data.model.once('changed', (event) => {
      const { changes } = event;
      if (!changes.length) return;
      const params = { changes };
      this.emit(GraphEvent.BEFORE_ITEM_CHANGE, params);
      this.hooks.itemchange.emit({
        ...this.baseEmitParam,
        changes: event.changes,
        action: 'updatePosition',
      });
      this.emit(GraphEvent.AFTER_ITEM_CHANGE, params);
    });

    this.controller.data.translateComboBy(ids, [dx, dy, dz]);
  }

  public async translateItemBy(ids: ID[], offset: PositionPoint, options: PositionOptions) {
    this.controller.data.model.once('changed', (event) => {
      this.handleDataChange(event, {
        ...options,
      });
    });

    const ITEM_TYPEs = groupBy(
      ids.map((id) => ({ type: this.controller.data.typeOf(id), id })),
      'type',
    );

    Object.entries(ITEM_TYPEs).forEach(([type, items]) => {
      if (type === 'combo') {
        this.translateComboBy(
          items.map(({ id }) => id),
          offset,
          options,
        );
      } else warn(`Unsupported item type: ${type} (${items.map(({ id }) => id).join(', ')})})`);
    });
  }

  public async translateItemTo(id: ID, position: PositionPoint, options: PositionOptions) {
    const [x, y, z] = position;
    const ITEM_TYPE = this.controller.data.typeOf(id);
    if (ITEM_TYPE === 'node') {
      return this.updateNodePosition([{ id, style: { x, y, z } }], options);
    }
    if (ITEM_TYPE === 'combo') {
      return this.updateComboPosition([{ id, style: { x, y, z } }], options);
    }
    warn(`Item: ${id} is unsupported to translate.`);
  }

  public getItemPosition() {}

  protected async updateNodePosition(data: NodeData[], options: PositionOptions) {
    const { promise, resolve } = createPromise<void>();
    this.controller.data.model.once('changed', (event) =>
      // TODO 优化
      this.handleDataChange(event, {
        ...options,
        callback: () => resolve(),
      }),
    );

    this.controller.data.updateNodeData(data);

    return promise;
  }

  protected async updateComboPosition(data: NodeData[], options: PositionOptions) {
    const { promise, resolve } = createPromise<void>();
    this.controller.data.model.once('changed', (event) =>
      // TODO 优化
      this.handleDataChange(event, {
        ...options,
        callback: () => resolve(),
      }),
    );

    this.controller.data.updateComboData(data);

    return promise;
  }

  // ---------- Coordinate Convert API ----------

  /**
   * <zh/> 根据视口坐标获取画布上的坐标
   *
   * <en/> Gets the coordinates on the canvas based on viewport coordinate
   * @param point - <zh/> 视口坐标 | <en/> viewport coordinate
   * @returns <zh/> 画布坐标 | <en/> canvas coordinate
   * @public
   */
  public getCanvasByViewport(point: Point): Point {
    return this.canvas.viewport2Canvas(point);
  }

  /**
   * <zh/> 根据画布坐标获取视口坐标
   *
   * <en/> Gets the viewport coordinates based on canvas coordinate
   * @param point - <zh/> 画布坐标 | <en/> canvas coordinate
   * @returns <zh/> 视口坐标 | <en/> viewport coordinate
   * @public
   */
  public getViewportByCanvas(point: Point): Point {
    return this.canvas.canvas2Viewport(point);
  }

  /**
   * <zh/> 根据画布坐标获取浏览器坐标
   *
   * <en/> Gets the browser coordinates based on canvas coordinate
   * @param point - <zh/> 画布坐标 | <en/> canvas coordinate
   * @returns <zh/> 浏览器坐标 | <en/> browser coordinate
   * @public
   */
  public getClientByCanvas(point: Point): Point {
    const viewportPoint = this.canvas.canvas2Viewport(point);
    return this.canvas.viewport2Client(viewportPoint);
  }

  /**
   * <zh/> 根据浏览器坐标获取画布坐标
   *
   * <en/> Gets the canvas coordinates based on browser coordinate
   * @param point - <zh/> 浏览器坐标 | <en/> browser coordinate
   * @returns <zh/> 画布坐标 | <en/> canvas coordinate
   * @public
   */
  public getCanvasByClient(point: Point): Point {
    const viewportPoint = this.canvas.client2Viewport(point);
    return this.canvas.viewport2Canvas(viewportPoint);
  }

  /**
   * <zh/> 获取画布中心点
   *
   * <en/> Get the center point of the canvas
   * @returns <zh/> 画布中心点 | <en/> center point of the canvas
   * @public
   */
  public getViewportCenter(): PointLike {
    const { width, height } = this.canvas.getConfig();
    return { x: width / 2, y: height / 2 };
  }

  /**
   * <zh/> 获取 item 的类型
   *
   * <en/> Get the type of the item
   * @param id - <zh/> item ID | <en/> item ID
   * @returns <zh/> item 类型 | <en/> item type
   * @public
   */
  public typeOf(id: ID) {
    return this.controller.data.typeOf(id);
  }

  /*
   * Get the display model of a node / edge / combo.
   * @param id item id
   * @returns display model
   */
  protected getDisplayModel(id: ID): NodeDisplayModel | EdgeDisplayModel | ComboDisplayModel {
    return this.controller.item.findDisplayModel(id);
  }

  /**
   * <zh/> 根据状态获取节点数据
   *
   * <en/> Get node data by state
   * @param ITEM_TYPE - <zh/> 节点/边/Combo | <en/> node/edge/combo
   * @param state - <zh/> 状态 | <en/> state
   * @returns <zh/> 数据 | <en/> data
   */
  public getItemDataByState(ITEM_TYPE: 'node', state: string): NodeData[];
  /**
   * <zh/> 根据状态获取边数据
   *
   * <en/> Get edge data by state
   * @param ITEM_TYPE - <zh/> 节点/边/Combo | <en/> node/edge/combo
   * @param state - <zh/> 状态 | <en/> state
   * @returns <zh/> 数据 | <en/> data
   */
  public getItemDataByState(ITEM_TYPE: 'edge', state: string): EdgeData[];
  /**
   * <zh/> 根据状态获取 combo 数据
   *
   * <en/> Get combo data by state
   * @param ITEM_TYPE - <zh/> 节点/边/Combo | <en/> node/edge/combo
   * @param state - <zh/> 状态 | <en/> state
   * @returns <zh/> 数据 | <en/> data
   */
  public getItemDataByState(ITEM_TYPE: 'combo', state: string): ComboData[];
  /**
   * <zh/> 根据状态获取数据
   *
   * <en/> Get node data by state
   * @param ITEM_TYPE - <zh/> 节点/边/Combo | <en/> node/edge/combo
   * @param state - <zh/> 状态 | <en/> state
   * @returns <zh/> 数据 | <en/> data
   */
  public getItemDataByState(ITEM_TYPE: ITEM_TYPE, state: string): NodeData[] | EdgeData[] | ComboData[] {
    const ids = this.controller.item.findIdByState(ITEM_TYPE, state);

    if (ITEM_TYPE === 'node') return this.getNodeData(ids);
    else if (ITEM_TYPE === 'edge') return this.getEdgeData(ids);
    else if (ITEM_TYPE === 'combo') return this.getComboData(ids);
  }

  /**
   * <zh/> 设置 item 的状态
   *
   * <en/> Set the state of the item
   * @param id - <zh/> item id | <en/> item id
   * @param state - <zh/> 状态 | <en/> state
   */
  public setItemState(id: ID | ID[], state: string | string[]) {
    const ids = parseArrayLike(id);
    if (id === undefined || !ids.length) return;
    const states = parseArrayLike(state);

    const newValue: Record<ID, string[]> = ids.reduce((acc, id) => {
      acc[id] = states;
      return acc;
    }, {});

    const oldValue: Record<ID, string[]> = ids.reduce((acc, id) => {
      acc[id] = this.getItemState(id);
      return acc;
    }, {});

    this.hooks.itemstatechange.emit({
      ...this.baseEmitParam,
      value: newValue,
    });
    this.emit(GraphEvent.AFTER_ITEM_STATES_CHANGE, {
      value: newValue,
      changes: { newValue: newValue, oldValue: oldValue },
    });
  }

  /**
   * <zh/> 获取 item 的所有状态
   *
   * <en/> Get all states of the item
   * @param id - <zh/> item id | <en/> item id
   * @returns <zh/> 状态数组 | <en/> state array
   */
  public getItemState(id: ID) {
    return this.controller.item.getItemState(id);
  }

  /**
   * <zh/> 获取 item 的渲染包围盒
   *
   * <en/> Get the rendering bounding box of the item
   * @param id - <zh/> item id | <en/> item id
   * @returns <zh/> 包围盒 | <en/> bounding box
   */
  public getRenderBBox(id: ID): AABB {
    return this.controller.item.getItemBBox(id);
  }

  // ---------- Layout API ----------

  /**
   * <zh/> 设置布局配置
   *
   * <en/> Set layout options
   * @param options - <zh/> 布局配置 | <en/> layout options
   * @public
   */
  public setLayout(options: CallableValue<LayoutOptions>) {
    this.options.layout = isFunction(options) ? options(this.getLayout()) : options;

    this.hooks.layout.emitAsync({
      ...this.baseEmitParam,
    });
  }

  /**
   * <zh/> 获取布局配置
   *
   * <en/> Get layout options
   * @returns <zh/> 布局配置 | <en/> layout options
   * @public
   */
  public getLayout() {
    return this.options.layout;
  }

  /**
   * <zh/> 执行布局
   *
   * <en/> Execute layout
   * @param animate - <zh/> 是否使用动画 | <en/> whether to use animation
   * @public
   */
  public async layout(animate = true) {
    this.emit(GraphEvent.BEFORE_LAYOUT);

    const emitAsync = (options: LayoutOptions) => {
      return this.hooks.layout.emitAsync({
        ...this.baseEmitParam,
        options,
        animate,
      });
    };

    const isLayoutUnset = isEmpty(this.options.layout);
    if (isLayoutUnset) {
      const nodes = this.controller.data.getNodeData();
      if (nodes.every((node) => isNil(node?.style?.x) && isNil(node?.style?.y))) {
        await emitAsync({ type: 'grid' });
      } else {
        // Use user-defined position(x/y default to 0).
        await emitAsync({
          execute: async (graph) => {
            const nodes = graph.getNodeData();
            return {
              nodes: nodes.map((node) => ({
                id: node.id,
                data: { x: node.style.x || 0, y: node.style.y || 0 },
              })),
              edges: [],
            };
          },
        });
      }
    } else {
      await emitAsync(this.options.layout);
    }

    this.emit(GraphEvent.AFTER_LAYOUT);
  }

  /**
   * <zh/> 立即停止布局迭代
   *
   * <en/> Stop the layout immediately.
   * @public
   */
  public stopLayout() {
    this.controller.layout.stopLayout();
  }

  public getLayoutCurrentAnimation() {
    return this.controller.layout.getCurrentAnimation();
  }

  /**
   * <zh/> 设置交互模式
   *
   * <en/> Set the interaction mode.
   * @param mode - <zh/> 交互模式 | <en/> interaction mode
   * @public
   * @example
   * ```ts
   * graph.setMode(['drag-canvas', 'drag-node'])
   * ```
   */
  public setMode(mode: string[]) {
    this.hooks.modechange.emit({
      ...this.baseEmitParam,
      mode,
    });
  }

  /**
   * <zh/> 获取交互模式
   *
   * <en/> Get the interaction mode.
   * @returns <zh/> 交互模式 | <en/> interaction mode
   * @public
   */
  public getMode() {
    return this.options.mode;
  }

  /**
   * <zh/> 设置画布光标
   *
   * <en/> Set the cursor of the canvas.
   * @param cursor - <zh/> 光标 | <en/> cursor
   * @public
   */
  public setCursor(cursor: Cursor) {
    this.canvas.setCursor(cursor);
  }

  // ---------- Widget API ----------

  /**
   * <zh/> 获取组件配置
   *
   * <en/> Get widget options
   * @returns - <zh/> 组件配置 | <en/> widget options
   * @public
   */
  public getWidgets(): STDWidget[] {
    return this.controller.widget.getWidgets().map(([, { type, plugin }]) => ({
      type,
      ...plugin.options,
    }));
  }

  /**
   * <zh/> 设置组件配置
   *
   * <en/> Set widget options
   * @param widgets - <zh/> 组件配置 | <en/> widget options
   * @public
   */
  public setWidgets(widgets: CallableValue<STDWidget[]>) {
    const oldValue = [...this.getWidgets()];
    const newValue = isFunction(widgets) ? widgets(oldValue) : widgets;

    this.hooks.widgetchange.emit({
      ...this.baseEmitParam,
      value: newValue,
    });
  }

  public drawTransient(
    type: ITEM_TYPE | SHAPE_TYPE,
    id: ID,
    config: {
      action?: 'remove' | 'add' | 'update' | undefined;
      /** Data to be merged into the transient item. */
      data?: Record<string, unknown>;
      /** Style to be merged into the transient shape. */
      style?: ShapeStyle;
      /** For type: 'edge' */
      drawSource?: boolean;
      /** For type: 'edge' */
      drawTarget?: boolean;
      /** Only shape with id in shapeIds will be cloned while type is ITEM_TYPE. If shapeIds is not assigned, the whole item will be cloned. */
      shapeIds?: string[];
      /** Whether show the shapes in shapeIds. True by default. */
      visible?: boolean;
      updateAncestors?: boolean;
    },
  ): DisplayObject {
    this.hooks.transientupdate.emit({
      ...this.baseEmitParam,
      type,
      id,
      config,
    });
    return this.controller.item.getTransient(String(id));
  }

  // ---------- Exports API ----------

  /**
   * <zh/> 导出画布数据为 Data URL
   *
   * <en/> Export the canvas data as Data URL
   * @param options - <zh/> 导出配置 | <en/> export options
   * @returns <zh/> Data URL | <en/> Data URL
   */
  public async toDataURL(options?: DataURLOptions) {
    return await this.canvas.toDataURL(options);
  }

  /**
   * <zh/> 收起 combo
   *
   * <en/> Collapse a combo.
   * @param id combo id or ids' array.
   */
  public collapseCombo(id: ID | ID[]) {
    const ids = parseArrayLike(id);

    this.updateComboData(ids.map((id) => ({ id, style: { collapsed: true } })));

    this.emit(GraphEvent.AFTER_ITEM_COLLAPSE, {
      type: 'combo',
      ids: id,
    });
  }

  /**
   * <zh/> 展开 combo
   *
   * <en/> Expand a combo.
   * @param id combo id or ids' array.
   */
  public expandCombo(id: ID | ID[]) {
    const ids = parseArrayLike(id);

    this.updateComboData(ids.map((id) => ({ id, style: { false: true } })));

    this.emit(GraphEvent.AFTER_ITEM_EXPAND, {
      type: 'combo',
      ids: id,
    });
  }

  public collapse(ids: ID | ID[], animate = true) {
    this.hooks.treecollapseexpand.emit({
      ...this.baseEmitParam,
      ids: parseArrayLike(ids),
      action: 'collapse',
      animate,
    });
  }

  public expand(ids: ID | ID[], animate = true) {
    this.hooks.treecollapseexpand.emit({
      ...this.baseEmitParam,
      ids: parseArrayLike(ids),
      action: 'expand',
      animate,
    });
  }

  private batchFlag = 0;

  /**
   * <zh/> 批量执行一系列操作，例如一次性更新多个元素，一次性删除多个元素等。
   *
   * batch 内支持嵌套 batch，内部的 batch 会被视为一个整体，不会触发多次 beforebatch 和 afterbatch 事件。
   *
   * <en/> Batch execute a series of operations, such as updating multiple elements at one time, deleting multiple elements at one time, etc.
   *
   * The batch inside supports nested batch, and the internal batch will be regarded as a whole, and will not trigger multiple beforebatch and afterbatch events.
   * @example
   * graph.batch(()=>{
   *  graph.removeNodeData([...]);
   *  graph.layout();
   *  graph.fitView();
   * })
   * @param fn - <zh/> 批处理执行函数 | <en/> batch function
   */
  public batch(fn: () => void) {
    if (this.batchFlag === 0) {
      this.emit(GraphEvent.BEFORE_BATCH);
    }
    this.batchFlag++;
    fn();
    this.batchFlag--;
    if (this.batchFlag === 0) {
      this.emit(GraphEvent.AFTER_BATCH);
    }
  }
}
