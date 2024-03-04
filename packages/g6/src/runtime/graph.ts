import EventEmitter from '@antv/event-emitter';
import type { AABB, BaseStyleProps, DataURLOptions } from '@antv/g';
import type { ID } from '@antv/graphlib';
import { debounce, isFunction, isNumber, isString, omit } from '@antv/util';
import { GraphEvent } from '../constants';
import type {
  BehaviorOptions,
  ComboData,
  ComboOptions,
  EdgeData,
  EdgeOptions,
  G6Spec,
  GraphData,
  LayoutOptions,
  NodeData,
  NodeOptions,
  ThemeOptions,
  WidgetOptions,
} from '../spec';
import type {
  CallableValue,
  DataID,
  EdgeDirection,
  ElementDatum,
  ElementType,
  FitViewOptions,
  NodeLikeData,
  PartialEdgeData,
  PartialGraphData,
  PartialNodeLikeData,
  Point,
  Positions,
  State,
  ViewportAnimationEffectTiming,
  ZIndex,
} from '../types';
import { sizeOf } from '../utils/dom';
import { RenderEvent, emit } from '../utils/event';
import { parsePoint, toPointObject } from '../utils/point';
import { add, subtract } from '../utils/vector';
import { BehaviorController } from './behavior';
import { Canvas } from './canvas';
import { DataController } from './data';
import { ElementController } from './element';
import { LayoutController } from './layout';
import { RuntimeContext } from './types';
import { ViewportController } from './viewport';
import { WidgetController } from './widget';

export class Graph extends EventEmitter {
  private options: G6Spec;

  static defaultOptions: G6Spec = {
    autoResize: false,
    width: 800,
    height: 600,
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

  constructor(options: G6Spec) {
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
  public getOptions(): G6Spec {
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
  public setOptions(options: G6Spec): void {
    const {
      behaviors,
      combo,
      container,
      data,
      edge,
      height,
      layout,
      node,
      padding,
      theme,
      widgets,
      width,
      zoomRange,
      zoom,
    } = options;

    if (behaviors) this.setBehaviors(behaviors);
    if (combo) this.setCombo(combo);
    if (data) this.setData(data);
    if (edge) this.setEdge(edge);
    if (layout) this.setLayout(layout);
    if (node) this.setNode(node);
    if (theme) this.setTheme(theme);
    if (widgets) this.setWidgets(widgets);
    if (isNumber(width) || isNumber(height))
      this.setSize(width ?? this.options.width ?? 0, height ?? this.options.height ?? 0);

    if (zoomRange) this.options.zoomRange = zoomRange;
    if (isNumber(zoom)) this.options.zoom = zoom;
    if (isNumber(padding)) this.options.padding = padding;
  }

  public getSize(): [number, number] {
    if (this.context.canvas) return this.context.canvas.getSize();
    return [this.options.width || 0, this.options.height || 0];
  }

  public setSize(width: number, height: number): void {
    this.options.width = width;
    this.options.height = height;
  }

  public setZoomRange(zoomRange: G6Spec['zoomRange']): void {
    this.options.zoomRange = zoomRange;
  }

  public getZoomRange(): G6Spec['zoomRange'] {
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
  }

  public setLayout(layout: CallableValue<LayoutOptions>): void {
    this.options.layout = isFunction(layout) ? layout(this.getLayout()) : layout;
  }

  public getLayout(): LayoutOptions {
    return this.options.layout!;
  }

  public setBehaviors(behaviors: CallableValue<BehaviorOptions>): void {
    this.options.behaviors = isFunction(behaviors) ? behaviors(this.getBehaviors()) : behaviors;
    this.context.behavior?.setBehaviors(this.options.behaviors);
  }

  public getBehaviors(): BehaviorOptions {
    return this.options.behaviors || [];
  }

  public setWidgets(widgets: CallableValue<WidgetOptions>): void {
    this.options.widgets = isFunction(widgets) ? widgets(this.getWidgets()) : widgets;
    this.context.widget?.setWidgets(this.options.widgets);
  }

  public getWidgets(): WidgetOptions {
    return this.options.widgets || [];
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

  public getComboChildrenData(id: ID): NodeLikeData[] {
    return this.context.model.getComboChildrenData(id);
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

  public getParentData(id: ID): NodeData | undefined {
    return this.context.model.getParentData(id);
  }

  public getElementDataByState(elementType: 'node', state: State): NodeData[];
  public getElementDataByState(elementType: 'edge', state: State): EdgeData[];
  public getElementDataByState(elementType: 'combo', state: State): ComboData[];
  public getElementDataByState(elementType: ElementType, state: State): ElementDatum[] {
    const ids = Object.entries(this.context.element!.elementState)
      .filter(([id, states]) => this.context.model.getElementType(id) === elementType && states.includes(state))
      .map(([id]) => id);
    return this.context.model.getElementsData(ids);
  }

  // ---------- end core API ----------

  private createCanvas() {
    if (this.context.canvas) return this.context.canvas;

    const { container = 'container', width, height, renderer } = this.options;

    if (container instanceof Canvas) {
      this.context.canvas = container;
    } else {
      const $container = isString(container) ? document.getElementById(container!) : container;

      this.context.canvas = new Canvas({
        container: $container!,
        width,
        height,
        renderer,
      });
    }

    return this.context.canvas;
  }

  private createRuntime() {
    this.context.options = this.options;
    if (!this.context.widget) this.context.widget = new WidgetController(this.context);
    if (!this.context.viewport) this.context.viewport = new ViewportController(this.context);
    if (!this.context.element) this.context.element = new ElementController(this.context);
    if (!this.context.layout) this.context.layout = new LayoutController(this.context);
    if (!this.context.behavior) this.context.behavior = new BehaviorController(this.context);
  }

  private async prepare(): Promise<void> {
    if (this.destroyed) throw new Error('Graph has been destroyed');

    await this.createCanvas().init();
    this.createRuntime();
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
    emit(this, new RenderEvent(GraphEvent.BEFORE_RENDER));
    await this.prepare();
    await Promise.all([this.context.element?.draw(), this.context.layout?.layout()]);
    await this.autoFit();
    emit(this, new RenderEvent(GraphEvent.AFTER_RENDER));
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
    const { layout, element, model, canvas, behavior, widget } = this.context;
    layout?.destroy();
    element?.destroy();
    model.destroy();
    canvas?.destroy();
    behavior?.destroy();
    widget?.destroy();
    this.options = {};
    // @ts-expect-error force delete
    delete this.context;

    window.removeEventListener('resize', this.onResize);

    this.destroyed = true;
  }

  // ---------- Runtime API ----------
  public getCanvas(): Canvas {
    return this.context.canvas;
  }

  public resize(): void;
  public resize(width: number, height: number): void;
  public resize(width?: number, height?: number): void {
    if (!width || !height) {
      const [w, h] = sizeOf(this.context.canvas!.getContainer()!);
      if (width !== w || height !== h) {
        this.context.canvas.resize(w, h);
      }
    } else this.context.canvas?.resize(width, height);
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

  public translateElementBy(offsets: Positions, animation?: boolean): void {
    const positions = Object.entries(offsets).reduce((acc, [id, offset]) => {
      const curr = this.getElementPosition(id);
      const next = add(curr, [...offset, 0].slice(0, 3) as Point);
      acc[id] = next;
      return acc;
    }, {} as Positions);

    this.translateElementTo(positions, animation);
  }

  public translateElementTo(positions: Positions, animation?: boolean): void {
    this.context.element!.updateNodeLikePosition(positions, animation);
  }

  public getElementPosition(id: ID): Point {
    const element = this.context.element!.getElement(id)!;
    const { x = 0, y = 0, z = 0 } = element.style;
    return [x, y, z];
  }

  public getElementRenderStyle(id: ID) {
    return omit(this.context.element!.getElement(id)!.attributes, ['context']);
  }

  public async setElementVisibility(id: ID | ID[], visibility: BaseStyleProps['visibility']): Promise<void> {
    await this.context.element!.setElementsVisibility(Array.isArray(id) ? id : [id], visibility);
  }

  public getElementVisibility(id: ID): BaseStyleProps['visibility'] {
    const element = this.context.element!.getElement(id)!;
    return element.style.visibility ?? 'visible';
  }

  public setElementZIndex(id: ID | ID[], zIndex: ZIndex): void {
    const ids = Array.isArray(id) ? id : [id];
    ids.forEach((id) => {
      this.context.element!.setElementZIndex(id, zIndex);
    });
  }

  public getElementZIndex(id: ID): BaseStyleProps['zIndex'] {
    const element = this.context.element!.getElement(id)!;
    return element.style.zIndex ?? 0;
  }

  public setElementState(id: ID | ID[], state: CallableValue<State | State[]>): void {
    const states = (Array.isArray(id) ? id : [id]).reduce(
      (acc, i) => {
        const staticState = isFunction(state) ? state(this.getElementState(i)) : state;
        acc[i] = Array.isArray(staticState) ? staticState : [staticState];
        return acc;
      },
      {} as Record<ID, State[]>,
    );
    this.context.element!.setElementsState(states);
  }

  public getElementState(id: ID): State[] {
    return this.context.element!.getElementStates(id);
  }

  public getElementRenderBounds(id: ID): AABB {
    return this.context.element!.getElement(id)!.getRenderBounds();
  }

  // TODO
  public async collapse(id: ID | ID[], options?: unknown): Promise<void> {}

  // TODO
  public async expand(id: ID | ID[], options?: unknown): Promise<void> {}

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
}
