import EventEmitter from '@antv/event-emitter';
import type { AABB, BaseStyleProps, DataURLOptions, DisplayObject } from '@antv/g';
import type { ID } from '@antv/graphlib';
import { debounce, deepMix, isFunction, isString, omit } from '@antv/util';
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
import { add } from '../utils/vector';
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
    zoom: 1,
    zoomRange: [-Infinity, Infinity],
  };

  public destroyed = false;

  // @ts-expect-error will be initialized in createRuntime
  private context: RuntimeContext = {
    model: new DataController(),
  };

  constructor(options: G6Spec) {
    super();
    this.options = deepMix({}, Graph.defaultOptions, options);
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
    const { behaviors, combo, container, data, edge, height, layout, node, padding, theme, widgets, width } = options;

    if (behaviors) this.setBehaviors(behaviors);
    if (combo) this.setCombo(combo);
    if (data) this.setData(data);
    if (edge) this.setEdge(edge);
    if (layout) this.setLayout(layout);
    if (node) this.setNode(node);
    if (theme) this.setTheme(theme);
    if (widgets) this.setWidgets(widgets);
    if (width || height) this.setSize(width || this.options.width || 0, height || this.options.height || 0);
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

  // TODO
  public async fitView(config: {}, options?: unknown): Promise<void> {}

  // TODO
  public async fitCenter(config: {}, options?: unknown): Promise<void> {}

  // TODO
  public async focusElement(id: ID | ID[]): Promise<void> {
    const elements = (Array.isArray(id) ? id : [id])
      .map((i) => this.context.element!.getElement(i))
      .filter(Boolean) as DisplayObject[];

    // TODO invoke getCenter
  }

  public zoomBy(ratio: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> | undefined {
    return this.context.viewport!.zoom({ mode: 'relative', value: ratio, origin }, animation);
  }

  public zoomTo(zoom: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> | undefined {
    return this.context.viewport!.zoom({ mode: 'absolute', value: zoom, origin }, animation);
  }

  public getZoom(): number {
    return this.context.viewport!.getZoom();
  }

  public rotateBy(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> | undefined {
    return this.context.viewport!.rotate({ mode: 'relative', value: angle, origin }, animation);
  }

  public rotateTo(angle: number, animation?: ViewportAnimationEffectTiming, origin?: Point): Promise<void> | undefined {
    return this.context.viewport!.rotate({ mode: 'absolute', value: angle, origin }, animation);
  }

  public getRotation(): number {
    return this.context.viewport!.getRotation();
  }

  public translateBy(
    offset: Point,
    animation?: ViewportAnimationEffectTiming,
    origin?: Point,
  ): Promise<void> | undefined {
    return this.context.viewport!.translate({ mode: 'relative', value: offset, origin }, animation);
  }

  public translateTo(
    position: Point,
    animation?: ViewportAnimationEffectTiming,
    origin?: Point,
  ): Promise<void> | undefined {
    return this.context.viewport!.translate({ mode: 'absolute', value: position, origin }, animation);
  }

  public getPosition(): Point {
    return this.context.viewport!.getViewportCenter();
  }

  public translateElementBy(offsets: Positions, animation?: boolean): void {
    const positions = Object.entries(offsets).reduce((acc, [id, offset]) => {
      const curr = this.getElementPosition(id);
      const next = add(curr, offset);
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

  public getViewportCenter(): Point {
    return this.context.viewport!.getViewportCenter();
  }

  private onResize = debounce(() => {
    this.resize();
  }, 300);
}
