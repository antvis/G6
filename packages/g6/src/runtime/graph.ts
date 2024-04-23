import EventEmitter from '@antv/event-emitter';
import type { AABB, BaseStyleProps } from '@antv/g';
import { debounce, isArray, isEqual, isFunction, isNumber, isObject, isString, omit } from '@antv/util';
import { COMBO_KEY, GraphEvent } from '../constants';
import type { Plugin } from '../plugins/types';
import { getExtension } from '../registry';
import type {
  BehaviorOptions,
  ComboData,
  ComboOptions,
  EdgeData,
  EdgeOptions,
  GraphData,
  GraphOptions,
  LayoutOptions,
  NodeData,
  NodeOptions,
  PluginOptions,
  ThemeOptions,
  TransformOptions,
} from '../spec';
import type { UpdateBehaviorOption } from '../spec/behavior';
import type { UpdatePluginOption } from '../spec/plugin';
import type { UpdateTransformOption } from '../spec/transform';
import type {
  CallableValue,
  DataID,
  EdgeDirection,
  ElementDatum,
  ElementType,
  FitViewOptions,
  ID,
  IEvent,
  NodeLikeData,
  PartialEdgeData,
  PartialGraphData,
  PartialNodeLikeData,
  Point,
  Position,
  State,
  Vector2,
  ViewportAnimationEffectTiming,
} from '../types';
import { sizeOf } from '../utils/dom';
import { GraphLifeCycleEvent, emit } from '../utils/event';
import { idOf } from '../utils/id';
import { parsePoint, toPointObject } from '../utils/point';
import { zIndexOf } from '../utils/style';
import { subtract } from '../utils/vector';
import { BatchController } from './batch';
import { BehaviorController } from './behavior';
import type { DataURLOptions } from './canvas';
import { Canvas } from './canvas';
import type { HierarchyKey } from './data';
import { DataController } from './data';
import { ElementController } from './element';
import { LayoutController } from './layout';
import { PluginController } from './plugin';
import { TransformController } from './transform';
import { RuntimeContext } from './types';
import { ViewportController } from './viewport';

export class Graph extends EventEmitter {
  private options: GraphOptions;

  static defaultOptions: GraphOptions = {
    autoResize: false,
    theme: 'light',
    rotation: 0,
    zoom: 1,
    zoomRange: [0.01, 10],
  };

  public destroyed = false;

  // @ts-expect-error will be initialized in createRuntime
  private context: RuntimeContext = {
    model: new DataController(),
  };

  constructor(options: GraphOptions) {
    super();
    this.options = Object.assign({}, Graph.defaultOptions, options);
    this.setOptions(this.options);
    this.context.graph = this;

    // Listening window.resize to autoResize.
    this.options.autoResize && window.addEventListener('resize', this.onResize);
  }

  /**
   * <zh/> 获取配置项
   *
   * <en/> Get options
   * @returns <zh/> 配置项 | <en/> options
   */
  public getOptions(): GraphOptions {
    return this.options;
  }

  /**
   * <zh/> 设置配置项
   *
   * <en/> Set options
   * @param options - <zh/> 配置项 | <en/> options
   * @description
   * <zh/> 要更新 devicePixelRatio、container 属性请销毁后重新创建实例
   *
   * <en/> To update devicePixelRatio and container properties, please destroy and recreate the instance
   */
  public setOptions(options: GraphOptions): void {
    const {
      animation,
      background,
      behaviors,
      combo,
      container,
      data,
      edge,
      height,
      layout,
      node,
      padding,
      plugins,
      theme,
      transforms,
      width,
      zoom,
      zoomRange,
    } = options;

    if (background) this.setBackground(background);
    if (behaviors) this.setBehaviors(behaviors);
    if (combo) this.setCombo(combo);
    if (data) this.setData(data);
    if (edge) this.setEdge(edge);
    if (layout) this.setLayout(layout);
    if (node) this.setNode(node);
    if (theme) this.setTheme(theme);
    if (plugins) this.setPlugins(plugins);
    if (transforms) this.setTransforms(transforms);
    if (isNumber(width) || isNumber(height))
      this.setSize(width ?? this.options.width ?? 0, height ?? this.options.height ?? 0);

    if (zoomRange) this.options.zoomRange = zoomRange;
    if (isNumber(zoom)) this.options.zoom = zoom;
    if (isNumber(padding) || isArray(padding)) this.options.padding = padding;
  }

  public setBackground(background: GraphOptions['background']): void {
    this.options.background = background;
    this.context.canvas?.setBackground(background);
  }

  public getBackground(): GraphOptions['background'] {
    return this.options.background;
  }

  public getSize(): [number, number] {
    if (this.context.canvas) return this.context.canvas.getSize();
    return [this.options.width || 0, this.options.height || 0];
  }

  public setSize(width: number, height: number): void {
    this.options.width = width;
    this.options.height = height;
  }

  public setZoomRange(zoomRange: GraphOptions['zoomRange']): void {
    this.options.zoomRange = zoomRange;
  }

  public getZoomRange(): GraphOptions['zoomRange'] {
    return this.options.zoomRange;
  }

  public setNode(node: NodeOptions): void {
    this.options.node = node;
  }

  public setEdge(edge: EdgeOptions): void {
    this.options.edge = edge;
  }

  public setCombo(combo: ComboOptions): void {
    this.options.combo = combo;
  }

  public getTheme(): ThemeOptions {
    return this.options.theme!;
  }

  public setTheme(theme: CallableValue<ThemeOptions>): void {
    this.options.theme = isFunction(theme) ? theme(this.getTheme()) : theme;

    const { background } = getExtension('theme', this.options.theme) || {};
    if (background && !this.options.background) {
      this.setBackground(background);
    }
  }

  public setLayout(layout: CallableValue<LayoutOptions>): void {
    this.options.layout = isFunction(layout) ? layout(this.getLayout()) : layout;
  }

  public getLayout(): LayoutOptions {
    return this.options.layout!;
  }

  /**
   * <zh/> 设置交互
   *
   * <en/> Set behaviors
   * @param behaviors - <zh/> 交互配置 | <en/> behavior configuration
   */
  public setBehaviors(behaviors: CallableValue<BehaviorOptions>): void {
    this.options.behaviors = isFunction(behaviors) ? behaviors(this.getBehaviors()) : behaviors;
    this.context.behavior?.setBehaviors(this.options.behaviors);
  }

  /**
   * <zh/> 更新交互
   *
   * <en/> Update behavior
   * @param behavior - <zh/> 交互配置 | <en/> behavior configuration
   */
  public updateBehavior(behavior: UpdateBehaviorOption): void {
    this.setBehaviors((behaviors) =>
      behaviors.map((_behavior) => {
        if (isObject(_behavior) && _behavior.key === behavior.key) {
          return { ..._behavior, ...behavior };
        }
        return _behavior;
      }),
    );
  }

  /**
   * <zh/> 获取交互
   *
   * <en/> Get behaviors
   * @returns <zh/> 交互配置 | <en/> behavior configuration
   */
  public getBehaviors(): BehaviorOptions {
    return this.options.behaviors || [];
  }

  /**
   * <zh/> 设置插件
   *
   * <en/> Set plugins
   * @param plugins - <zh/> 插件配置 | <en/> plugin configuration
   */
  public setPlugins(plugins: CallableValue<PluginOptions>): void {
    this.options.plugins = isFunction(plugins) ? plugins(this.getPlugins()) : plugins;
    this.context.plugin?.setPlugins(this.options.plugins);
  }

  /**
   * <zh/> 更新插件
   *
   * <en/> Update plugin
   * @param plugin - <zh/> 插件配置 | <en/> plugin configuration
   */
  public updatePlugin(plugin: UpdatePluginOption): void {
    this.setPlugins((plugins) =>
      plugins.map((_plugin) => {
        if (isObject(_plugin) && _plugin.key === plugin.key) {
          return { ..._plugin, ...plugin };
        }
        return _plugin;
      }),
    );
  }

  /**
   * <zh/> 获取插件
   *
   * <en/> Get plugins
   * @returns <zh/> 插件配置 | <en/> plugin configuration
   */
  public getPlugins(): PluginOptions {
    return this.options.plugins || [];
  }

  /**
   * <zh/> 获取插件实例
   *
   * <en/> Get plugin instance
   * @param key - <zh/> 插件 key | <en/> plugin key
   * @returns <zh/> 插件实例 | <en/> plugin instance
   */
  public getPluginInstance<T extends Plugin>(key: string) {
    return this.context.plugin!.getPluginInstance(key) as unknown as T;
  }

  /**
   * <zh/> 设置数据转换器
   *
   * <en/> Set data transforms
   * @param transforms - <zh/> 数据转换配置 | <en/> data transform configuration
   */
  public setTransforms(transforms: CallableValue<TransformOptions>): void {
    this.options.transforms = isFunction(transforms) ? transforms(this.getTransforms()) : transforms;
    this.context.transform?.setTransforms(this.options.transforms);
  }

  /**
   * <zh/> 更新数据转换器
   *
   * <en/> Update data transform
   * @param transform - <zh/> 数据转换配置 | <en/> data transform configuration
   */
  public updateTransform(transform: UpdateTransformOption): void {
    this.setTransforms((transforms) =>
      transforms.map((_transform) => {
        if (isObject(_transform) && _transform.key === transform.key) {
          return { ..._transform, ...transform };
        }
        return _transform;
      }),
    );
  }

  /**
   * <zh/> 获取数据转换器
   *
   * <en/> Get data transforms
   * @returns <zh/> 数据转换器实例 | <en/> data transform instance
   */
  public getTransforms(): TransformOptions {
    return this.options.transforms || [];
  }

  public getData(): GraphData {
    return this.context.model.getData();
  }

  public getNodeData(): NodeData[];
  public getNodeData(id: ID): NodeData;
  public getNodeData(ids: ID[]): NodeData[];
  public getNodeData(id?: ID | ID[]): NodeData | NodeData[] {
    if (id === undefined) return this.context.model.getNodeData();
    if (Array.isArray(id)) return this.context.model.getNodeData(id);
    return this.context.model.getNodeData([id])?.[0];
  }

  public getEdgeData(): EdgeData[];
  public getEdgeData(id: ID): EdgeData;
  public getEdgeData(ids: ID[]): EdgeData[];
  public getEdgeData(id?: ID | ID[]): EdgeData | EdgeData[] {
    if (id === undefined) return this.context.model.getEdgeData();
    if (Array.isArray(id)) return this.context.model.getEdgeData(id);
    return this.context.model.getEdgeData([id])?.[0];
  }

  public getComboData(): ComboData[];
  public getComboData(id: ID): ComboData;
  public getComboData(ids: ID[]): ComboData[];
  public getComboData(id?: ID | ID[]): ComboData | ComboData[] {
    if (id === undefined) return this.context.model.getComboData();
    if (Array.isArray(id)) return this.context.model.getComboData(id);
    return this.context.model.getComboData([id])?.[0];
  }

  public setData(data: CallableValue<GraphData>): void {
    this.context.model.setData(isFunction(data) ? data(this.getData()) : data);
  }

  public addData(data: CallableValue<GraphData>): void {
    this.context.model.addData(isFunction(data) ? data(this.getData()) : data);
  }

  public addNodeData(data: CallableValue<NodeData[]>): void {
    this.context.model.addNodeData(isFunction(data) ? data(this.getNodeData()) : data);
  }

  public addEdgeData(data: CallableValue<EdgeData[]>): void {
    this.context.model.addEdgeData(isFunction(data) ? data(this.getEdgeData()) : data);
  }

  public addComboData(data: CallableValue<ComboData[]>): void {
    this.context.model.addComboData(isFunction(data) ? data(this.getComboData()) : data);
  }

  public updateData(data: CallableValue<PartialGraphData>): void {
    this.context.model.updateData(isFunction(data) ? data(this.getData()) : data);
  }

  public updateNodeData(data: CallableValue<PartialNodeLikeData<NodeData>[]>): void {
    this.context.model.updateNodeData(isFunction(data) ? data(this.getNodeData()) : data);
  }

  public updateEdgeData(data: CallableValue<PartialEdgeData<EdgeData>[]>): void {
    this.context.model.updateEdgeData(isFunction(data) ? data(this.getEdgeData()) : data);
  }

  public updateComboData(data: CallableValue<PartialNodeLikeData<ComboData>[]>): void {
    this.context.model.updateComboData(isFunction(data) ? data(this.getComboData()) : data);
  }

  public removeData(id: DataID | ((data: GraphData) => DataID)): void {
    this.context.model.removeData(isFunction(id) ? id(this.getData()) : id);
  }

  public removeNodeData(ids: ID[] | ((data: NodeData[]) => ID[])): void {
    this.context.model.removeNodeData(isFunction(ids) ? ids(this.getNodeData()) : ids);
  }

  public removeEdgeData(ids: ID[] | ((data: EdgeData[]) => ID[])): void {
    this.context.model.removeEdgeData(isFunction(ids) ? ids(this.getEdgeData()) : ids);
  }

  public removeComboData(ids: ID[] | ((data: ComboData[]) => ID[])): void {
    this.context.model.removeComboData(isFunction(ids) ? ids(this.getComboData()) : ids);
  }

  public getElementType(id: ID): ElementType {
    return this.context.model.getElementType(id);
  }

  public getRelatedEdgesData(id: ID, direction: EdgeDirection = 'both'): EdgeData[] {
    return this.context.model.getRelatedEdgesData(id, direction);
  }

  public getNeighborNodesData(id: ID): NodeData[] {
    return this.context.model.getNeighborNodesData(id);
  }

  /**
   * <zh/> 获取节点或 combo 的祖先元素数据
   *
   * <en/> Get the ancestor element data of the node or combo
   * @param id - <zh/> 节点或 combo ID | <en/> node or combo ID
   * @param hierarchy - <zh/> 指定树图层级关系还是 combo 层级关系 | <en/> specify tree or combo hierarchy relationship
   * @returns <zh/> 祖先元素数据 | <en/> ancestor element data
   * @description
   * <zh/> 数组中的顺序是从父节点到祖先节点
   *
   * <en/> The order in the array is from the parent node to the ancestor node
   */
  public getAncestorsData(id: ID, hierarchy: HierarchyKey): NodeLikeData[] {
    return this.context.model.getAncestorsData(id, hierarchy);
  }

  /**
   * <zh/> 获取节点或 combo 的父元素数据
   *
   * <en/> Get the parent element data of the node or combo
   * @param id - <zh/> 节点或 combo ID | <en/> node or combo ID
   * @param hierarchy - <zh/> 指定树图层级关系还是 combo 层级关系 | <en/> specify tree or combo hierarchy relationship
   * @returns <zh/> 父元素数据 | <en/> parent element data
   */
  public getParentData(id: ID, hierarchy: HierarchyKey): NodeLikeData | undefined {
    return this.context.model.getParentData(id, hierarchy);
  }

  /**
   * <zh/> 获取节点或 combo 的子元素数据
   *
   * <en/> Get the child element data of the node or combo
   * @param id - <zh/> 节点或 combo ID | <en/> node or combo ID
   * @returns <zh/> 子元素数据 | <en/> child element data
   */
  public getChildrenData(id: ID): NodeLikeData[] {
    return this.context.model.getChildrenData(id);
  }

  public getElementDataByState(elementType: 'node', state: State): NodeData[];
  public getElementDataByState(elementType: 'edge', state: State): EdgeData[];
  public getElementDataByState(elementType: 'combo', state: State): ComboData[];
  public getElementDataByState(elementType: ElementType, state: State): ElementDatum[] {
    return this.context.model.getElementDataByState(elementType, state);
  }

  private async initCanvas() {
    if (this.context.canvas) return await this.context.canvas.init();

    const { container = 'container', width, height, renderer, background } = this.options;

    if (container instanceof Canvas) {
      this.context.canvas = container;
      container.setBackground(background);
      await container.init();
    } else {
      const $container = isString(container) ? document.getElementById(container!) : container;
      const containerSize = sizeOf($container!);

      this.emit(GraphEvent.BEFORE_CANVAS_INIT, { container: $container, width, height });

      const canvas = new Canvas({
        container: $container!,
        width: width ?? containerSize[0],
        height: height ?? containerSize[1],
        renderer,
      });

      this.context.canvas = canvas;
      await canvas.init();
      this.emit(GraphEvent.AFTER_CANVAS_INIT, { canvas });
    }
  }

  private initRuntime() {
    this.context.options = this.options;
    if (!this.context.batch) this.context.batch = new BatchController(this.context);
    if (!this.context.plugin) this.context.plugin = new PluginController(this.context);
    if (!this.context.viewport) this.context.viewport = new ViewportController(this.context);
    if (!this.context.transform) this.context.transform = new TransformController(this.context);
    if (!this.context.element) this.context.element = new ElementController(this.context);
    if (!this.context.layout) this.context.layout = new LayoutController(this.context);
    if (!this.context.behavior) this.context.behavior = new BehaviorController(this.context);
  }

  private async prepare(): Promise<void> {
    // 等待同步任务执行完成，避免 render 后立即调用 destroy 导致的问题
    // Wait for synchronous tasks to complete, to avoid problems caused by calling destroy immediately after render
    await Promise.resolve();

    if (this.destroyed) throw new Error('Graph has been destroyed');

    await this.initCanvas();
    this.initRuntime();
  }

  /**
   * <zh/> 执行渲染
   *
   * <en/> Render
   * @description
   * <zh/> 此过程会执行数据更新、绘制元素、执行布局
   *
   * <en/> This process will execute data update, element rendering, and layout execution
   */
  public async render(): Promise<void> {
    await this.prepare();
    emit(this, new GraphLifeCycleEvent(GraphEvent.BEFORE_RENDER));
    await Promise.all([this.context.element?.draw(), this.context.layout?.layout()]);
    await this.autoFit();
    emit(this, new GraphLifeCycleEvent(GraphEvent.AFTER_RENDER));
  }

  /**
   * <zh/> 绘制元素
   *
   * <en/> Draw elements
   * @returns <zh/> 渲染结果 | <en/> draw result
   */
  public async draw(): Promise<void> {
    await this.prepare();
    return this.context.element!.draw();
  }

  public layout(): Promise<void> {
    return this.context.layout!.layout();
  }

  public stopLayout() {
    return this.context.layout!.stopLayout();
  }

  /**
   * <zh/> 清空画布元素
   *
   * <en/> Clear canvas elements
   */
  public async clear(): Promise<void> {
    this.context.model.setData({});
    await this.draw();
  }

  public destroy(): void {
    const { layout, element, model, canvas, behavior, plugin } = this.context;
    plugin?.destroy();
    behavior?.destroy();
    layout?.destroy();
    element?.destroy();
    model.destroy();
    canvas?.destroy();
    this.options = {};
    // @ts-expect-error force delete
    this.context = {};

    this.off();
    window.removeEventListener('resize', this.onResize);

    this.destroyed = true;
  }

  public getCanvas(): Canvas {
    return this.context.canvas;
  }

  public resize(): void;
  public resize(width: number, height: number): void;
  public resize(width?: number, height?: number): void {
    const size: Vector2 = !width || !height ? sizeOf(this.context.canvas!.getContainer()!) : [width, height];
    if (isEqual(size, this.getSize())) return;
    emit(this, new GraphLifeCycleEvent(GraphEvent.BEFORE_SIZE_CHANGE, { size }));
    this.context.canvas.resize(...size);
    emit(this, new GraphLifeCycleEvent(GraphEvent.AFTER_SIZE_CHANGE, { size }));
  }

  /**
   * <zh/> 将图缩放至合适大小并平移至视口中心
   *
   * <en/> Zoom the graph to fit the viewport and move it to the center of the viewport
   * @param options - <zh/> 适配配置 | <en/> fit options
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async fitView(options?: FitViewOptions, animation?: ViewportAnimationEffectTiming): Promise<void> {
    await this.context.viewport?.fitView(options, animation);
  }

  /**
   * <zh/> 将图平移至视口中心
   *
   * <en/> Move the graph to the center of the viewport
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async fitCenter(animation?: ViewportAnimationEffectTiming): Promise<void> {
    await this.context.viewport?.fitCenter(animation);
  }

  private async autoFit(): Promise<void> {
    const { autoFit } = this.context.options;
    if (!autoFit) return;

    if (isString(autoFit)) {
      if (autoFit === 'view') await this.fitView();
      else if (autoFit === 'center') await this.fitCenter();
    } else {
      const { type, animation } = autoFit;
      if (type === 'view') await this.fitView(autoFit.options, animation);
      else if (type === 'center') await this.fitCenter(animation);
    }
  }

  public async focusElement(id: ID | ID[], animation?: ViewportAnimationEffectTiming): Promise<void> {
    await this.context.viewport?.focusElements(Array.isArray(id) ? id : [id], animation);
  }

  /**
   * <zh/> 基于当前缩放比例进行缩放
   *
   * <en/> Zoom based on the current zoom ratio
   * @param ratio - <zh/> 缩放比例 | <en/> zoom ratio
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   * @param origin - <zh/> 缩放中心(视口坐标) | <en/> zoom center(viewport coordinates)
   * @description
   * <zh/>
   * - ratio > 1 放大
   * - ratio < 1 缩小
   * <en/>
   * - ratio > 1 zoom in
   * - ratio < 1 zoom out
   */
  public async zoomBy(ratio: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> {
    await this.context.viewport!.transform({ mode: 'relative', scale: ratio, origin }, animation);
  }

  /**
   * <zh/> 缩放画布至指定比例
   *
   * <en/> Zoom the canvas to the specified ratio
   * @param zoom - <zh/> 指定缩放比例 | <en/> specified zoom ratio
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   * @param origin - <zh/> 缩放中心(视口坐标) | <en/> zoom center(viewport coordinates)
   * @description
   * <zh/>
   * - zoom = 1 默认大小
   * - zoom > 1 放大
   * - zoom < 1 缩小
   * <en/>
   * - zoom = 1 default size
   * - zoom > 1 zoom in
   * - zoom < 1 zoom out
   */
  public async zoomTo(zoom: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> {
    this.context.viewport!.transform({ mode: 'absolute', scale: zoom, origin }, animation);
  }

  /**
   * <zh/> 获取当前缩放比例
   *
   * <en/> Get the current zoom ratio
   * @returns <zh/> 缩放比例 | <en/> zoom ratio
   */
  public getZoom(): number {
    return this.context.viewport!.getZoom();
  }

  /**
   * <zh/> 基于当前旋转角度进行旋转
   *
   * <en/> Rotate based on the current rotation angle
   * @param angle - <zh/> 旋转角度 | <en/> rotation angle
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   * @param origin - <zh/> 旋转中心(视口坐标) | <en/> rotation center(viewport coordinates)
   */
  public async rotateBy(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> {
    await this.context.viewport!.transform({ mode: 'relative', rotate: angle, origin }, animation);
  }

  /**
   * <zh/> 旋转画布至指定角度
   *
   * <en/> Rotate the canvas to the specified angle
   * @param angle - <zh/> 目标角度 | <en/> target angle
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   * @param origin - <zh/> 旋转中心(视口坐标) | <en/> rotation center(viewport coordinates)
   */
  public async rotateTo(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> {
    await this.context.viewport!.transform({ mode: 'absolute', rotate: angle, origin }, animation);
  }

  /**
   * <zh/> 获取当前旋转角度
   *
   * <en/> Get the current rotation angle
   * @returns <zh/> 旋转角度 | <en/> rotation angle
   */
  public getRotation(): number {
    return this.context.viewport!.getRotation();
  }

  /**
   * <zh/> 将图平移指定距离
   *
   * <en/> Translate the graph by the specified distance
   * @param offset - <zh/> 偏移量 | <en/> offset
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async translateBy(offset: Point, animation?: ViewportAnimationEffectTiming): Promise<void> {
    await this.context.viewport!.transform({ mode: 'relative', translate: offset }, animation);
  }

  /**
   * <zh/> 将图平移至指定位置
   *
   * <en/> Translate the graph to the specified position
   * @param position - <zh/> 指定位置 | <en/> specified position
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   * @description
   */
  public async translateTo(position: Point, animation?: ViewportAnimationEffectTiming): Promise<void> {
    await this.context.viewport!.transform({ mode: 'absolute', translate: position }, animation);
  }

  /**
   * <zh/> 获取图的位置
   *
   * <en/> Get the position of the graph
   * @returns <zh/> 图的位置 | <en/> position of the graph
   * @description
   * <zh/> 默认状态下，图的位置为 [0, 0]
   *
   * <en/> By default, the position of the graph is [0, 0]
   */
  public getPosition(): Point {
    return subtract([0, 0], this.getCanvasByViewport([0, 0]));
  }

  /**
   * <zh/> 将元素平移指定距离
   *
   * <en/> Translate the element by the specified distance
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param offset - <zh/> 偏移量 | <en/> offset
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async translateElementBy(id: ID, offset: Position, animation?: boolean): Promise<void>;
  /**
   * <zh/> 批量将元素平移指定距离
   *
   * <en/> Batch translate elements by the specified distance
   * @param offsets - <zh/> 偏移量配置 | <en/> offset configuration
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async translateElementBy(offsets: Record<ID, Position>, animation?: boolean): Promise<void>;
  public async translateElementBy(
    args1: ID | Record<ID, Position>,
    args2?: Position | boolean,
    args3: boolean = true,
  ): Promise<void> {
    const [config, animation] = isObject(args1)
      ? [args1, (args2 as boolean) ?? true]
      : [{ [args1 as ID]: args2 as Position }, args3];

    Object.entries(config).forEach(([id, offset]) => this.context.model.translateNodeBy(id, offset));
    await this.context.element!.draw({ animation });
  }

  /**
   * <zh/> 将元素平移至指定位置
   *
   * <en/> Translate the element to the specified position
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param position - <zh/> 指定位置 | <en/> specified position
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async translateElementTo(id: ID, position: Position, animation?: boolean): Promise<void>;
  /**
   * <zh/> 批量将元素平移至指定位置
   *
   * <en/> Batch translate elements to the specified position
   * @param positions - <zh/> 位置配置 | <en/> position configuration
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async translateElementTo(positions: Record<ID, Position>, animation?: boolean): Promise<void>;
  public async translateElementTo(
    args1: ID | Record<ID, Position>,
    args2?: boolean | Position,
    args3: boolean = true,
  ): Promise<void> {
    const [config, animation] = isObject(args1)
      ? [args1, (args2 as boolean) ?? true]
      : [{ [args1 as ID]: args2 as Position }, args3];

    Object.entries(config).forEach(([id, position]) => this.context.model.translateNodeTo(id, position));
    await this.context.element!.draw({ animation });
  }

  public getElementPosition(id: ID): Position {
    return this.context.model.getElementPosition(id);
  }

  public getElementRenderStyle(id: ID) {
    return omit(this.context.element!.getElement(id)!.attributes, ['context']);
  }

  /**
   * <zh/> 设置元素可见性
   *
   * <en/> Set element visibility
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param visibility - <zh/> 可见性 | <en/> visibility
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async setElementVisibility(
    id: ID,
    visibility: BaseStyleProps['visibility'],
    animation?: boolean,
  ): Promise<void>;
  /**
   * <zh/> 批量设置元素可见性
   *
   * <en/> Batch set element visibility
   * @param visibility - <zh/> 可见性配置 | <en/> visibility configuration
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async setElementVisibility(
    visibility: Record<ID, BaseStyleProps['visibility']>,
    animation?: boolean,
  ): Promise<void>;
  public async setElementVisibility(
    args1: ID | Record<ID, BaseStyleProps['visibility']>,
    args2?: boolean | BaseStyleProps['visibility'],
    args3: boolean = true,
  ): Promise<void> {
    const [config, animation] = isObject(args1)
      ? [args1, (args2 as boolean) ?? true]
      : [{ [args1]: args2 as BaseStyleProps['visibility'] }, args3];

    const dataToUpdate: Required<PartialGraphData> = { nodes: [], edges: [], combos: [] };
    Object.entries(config).forEach(([id, value]) => {
      const elementType = this.getElementType(id);
      dataToUpdate[`${elementType}s`].push({ id, style: { visibility: value } });
    });
    this.updateData(dataToUpdate);

    await this.context.element!.draw({ animation, stage: 'visibility' });
  }

  /**
   * <zh/> 显示元素
   *
   * <en/> Show element
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async showElement(id: ID | ID[], animation?: boolean): Promise<void> {
    const ids = Array.isArray(id) ? id : [id];
    await this.setElementVisibility(
      Object.fromEntries(ids.map((_id) => [_id, 'visible'] as [ID, BaseStyleProps['visibility']])),
      animation,
    );
  }

  /**
   * <zh/> 隐藏元素
   *
   * <en/> Hide element
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async hideElement(id: ID | ID[], animation?: boolean): Promise<void> {
    const ids = Array.isArray(id) ? id : [id];
    await this.setElementVisibility(
      Object.fromEntries(ids.map((_id) => [_id, 'hidden'] as [ID, BaseStyleProps['visibility']])),
      animation,
    );
  }

  /**
   * <zh/> 获取元素可见性
   *
   * <en/> Get element visibility
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 元素可见性 | <en/> element visibility
   */
  public getElementVisibility(id: ID): BaseStyleProps['visibility'] {
    const element = this.context.element!.getElement(id)!;
    return element?.style?.visibility ?? 'visible';
  }

  /**
   * <zh/> 设置元素层级
   *
   * <en/> Set element z-index
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param zIndex - <zh/> 层级 | <en/> z-index
   */
  public async setElementZIndex(id: ID, zIndex: number): Promise<void>;
  /**
   * <zh/> 批量设置元素层级
   *
   * <en/> Batch set element z-index
   * @param zIndex - <zh/> 层级配置 | <en/> z-index configuration
   */
  public async setElementZIndex(zIndex: Record<ID, number>): Promise<void>;
  public async setElementZIndex(args1: ID | Record<ID, number>, args2?: number): Promise<void> {
    const dataToUpdate: Required<PartialGraphData> = { nodes: [], edges: [], combos: [] };
    const config = isObject(args1) ? args1 : { [args1 as ID]: args2 as number };

    Object.entries(config).forEach(([id, value]) => {
      const elementType = this.getElementType(id);
      dataToUpdate[`${elementType}s`].push({ id, style: { zIndex: value } });
    });

    const { model, element } = this.context;
    model.preventUpdateNodeLikeHierarchy(() => model.updateData(dataToUpdate));
    await element!.draw({ animation: false });
  }

  /**
   * <zh/> 将元素置于最顶层
   *
   * <en/> Bring the element to the front
   * @param id - <zh/> 元素 ID | <en/> element ID
   */
  public async frontElement(id: ID | ID[]): Promise<void> {
    const ids = Array.isArray(id) ? id : [id];
    const { model } = this.context;
    const config: Record<ID, number> = {};

    ids.map((_id) => {
      const zIndex = model.getFrontZIndex(_id);
      const elementType = model.getElementType(_id);
      if (elementType === 'combo') {
        const ancestor = model.getAncestorsData(_id, COMBO_KEY).at(-1) || this.getComboData(_id);
        const combos = [ancestor, ...model.getDescendantsData(idOf(ancestor))].filter((datum) =>
          model.isCombo(idOf(datum)),
        );
        const delta = zIndex - zIndexOf(ancestor);
        combos.forEach((combo) => {
          config[idOf(combo)] = zIndexOf(combo) + delta;
        });
      } else config[_id] = zIndex;
    });

    await this.setElementZIndex(config);
  }

  /**
   * <zh/> 获取元素层级
   *
   * <en/> Get element z-index
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 元素层级 | <en/> element z-index
   */
  public getElementZIndex(id: ID): number {
    return zIndexOf(this.context.model.getElementsData([id])[0]);
  }

  /**
   * <zh/> 设置元素状态
   *
   * <en/> Set element state
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param state - <zh/> 状态 | <en/> state
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async setElementState(id: ID, state: State | State[], animation?: boolean): Promise<void>;
  /**
   * <zh/> 批量设置元素状态
   *
   * <en/> Batch set element state
   * @param state - <zh/> 状态配置 | <en/> state configuration
   * @param animation - <zh/> 动画配置 | <en/> animation configuration
   */
  public async setElementState(state: Record<ID, State | State[]>, animation?: boolean): Promise<void>;
  public async setElementState(
    args1: ID | Record<ID, State | State[]>,
    args2?: boolean | State | State[],
    args3: boolean = true,
  ): Promise<void> {
    const [config, animation] = isObject(args1)
      ? [args1, (args2 as boolean) ?? true]
      : [{ [args1]: args2 as State | State[] }, args3];

    const parseState = (state: State | State[]) => {
      if (!state) return [];
      return Array.isArray(state) ? state : [state];
    };

    const dataToUpdate: Required<PartialGraphData> = { nodes: [], edges: [], combos: [] };
    Object.entries(config).forEach(([id, value]) => {
      const elementType = this.getElementType(id);
      dataToUpdate[`${elementType}s`].push({ id, style: { states: parseState(value) } });
    });
    this.updateData(dataToUpdate);

    await this.context.element!.draw({ animation });
  }

  /**
   * <zh/> 获取元素状态
   *
   * <en/> Get element state
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @returns <zh/> 元素状态 | <en/> element state
   */
  public getElementState(id: ID): State[] {
    return this.context.model.getElementState(id);
  }

  public getElementRenderBounds(id: ID): AABB {
    return this.context.element!.getElement(id)!.getRenderBounds();
  }

  public async collapseElement(id: ID, animation: boolean = true): Promise<void> {
    this.setElementCollapsibility(id, true);
    await this.context.element!.draw({ animation, stage: 'collapse' });
  }

  public async expandElement(id: ID, animation: boolean = true): Promise<void> {
    this.setElementCollapsibility(id, false);
    await this.context.element!.draw({ animation, stage: 'expand' });
  }

  private setElementCollapsibility(id: ID, collapsed: boolean) {
    const elementType = this.getElementType(id);
    if (elementType === 'node') this.updateNodeData([{ id, style: { collapsed } }]);
    else if (elementType === 'combo') this.updateComboData([{ id, style: { collapsed } }]);
  }

  /**
   * <zh/> 导出画布内容为 DataURL
   *
   * <en/> Export canvas content as DataURL
   * @param options - <zh/> 导出配置 | <en/> export configuration
   * @param mode
   * <zh/> 导出模式
   *  - viewport: 导出视口内容
   *  - overall: 导出整个画布
   *
   * <en/> export mode
   *  - viewport: export the content of the viewport
   *  - overall: export the entire canvas
   * @returns <zh/> DataURL | <en/> DataURL
   */
  public async toDataURL(options: Partial<DataURLOptions> = {}): Promise<string> {
    return this.context.canvas!.toDataURL(options);
  }

  public getCanvasByViewport(point: Point): Point {
    return parsePoint(this.context.canvas!.viewport2Canvas(toPointObject(point)));
  }

  public getViewportByCanvas(point: Point): Point {
    return parsePoint(this.context.canvas.canvas2Viewport(toPointObject(point)));
  }

  public getClientByCanvas(point: Point): Point {
    const viewportPoint = this.context.canvas.canvas2Viewport(toPointObject(point));
    return parsePoint(this.context.canvas.viewport2Canvas(viewportPoint));
  }

  public getCanvasByClient(point: Point): Point {
    const viewportPoint = this.context.canvas.client2Viewport(toPointObject(point));
    return parsePoint(this.context.canvas.viewport2Canvas(viewportPoint));
  }

  /**
   * <zh/> 获取视口中心的画布坐标
   *
   * <en/> Get the canvas coordinates of the viewport center
   * @returns <zh/> 视口中心的画布坐标 | <en/> Canvas coordinates of the viewport center
   */
  public getViewportCenter(): Point {
    return this.context.viewport!.getViewportCenter();
  }

  public getCanvasCenter(): Point {
    return this.context.viewport!.getCanvasCenter();
  }

  private onResize = debounce(() => {
    this.resize();
  }, 300);

  /**
   * <zh/> 监听事件
   *
   * <en/> Listen to events
   * @param eventName - <zh/> 事件名称 | <en/> event name
   * @param callback - <zh/> 回调函数 | <en/> callback function
   * @returns <zh/> Graph 实例 | <en/> Graph instance
   */
  public on<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void) {
    return super.on(eventName, callback);
  }

  /**
   * <zh/> 一次性监听事件
   *
   * <en/> Listen to events once
   * @param eventName - <zh/> 事件名称 | <en/> event name
   * @param callback - <zh/> 回调函数 | <en/> callback function
   * @returns <zh/> Graph 实例 | <en/> Graph instance
   */
  public once<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void) {
    return super.once(eventName, callback);
  }
}
