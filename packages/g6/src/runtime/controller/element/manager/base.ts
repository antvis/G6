import { DisplayObject } from '@antv/g';
import { deepMix, isFunction } from '@antv/util';
import type { BaseElement } from '../../../../plugin/element/base';
import { ThemeOptions } from '../../../../spec/theme';
import { Graph } from '../../../../types';
import { ElementRegistry } from '../../../../types/element';
import type { ItemType, State } from '../../../../types/item';
import { PositionPoint } from '../../../../types/position';
import type { Visibility } from '../../../../types/visibility';
import type { ElementData, ElementOptions, StaticElementOptions } from './types';

export interface BaseManagerOptions {
  type?: ItemType;
  /** <zh/> 图实例 | <en/> Graph instance */
  graph: Graph;
  /** <zh/> 当前元素所在容器 | <en/> The container of the current element */
  container: DisplayObject;
  /** <zh/> 元素数据 | <en/> Element data */
  data: ElementData;
  /** <zh/> 元素图形注册表 | <en/> Element shapes registry */
  shapes: ElementRegistry;
  /** <zh/> 元素视觉编码 | <en/> Element visual encoding */
  encoder?: ElementOptions;
  /** <zh/> 元素状态 | <en/> Element states */
  states?: string[];
  /** <zh/> 主题 | <en/> Theme */
  theme?: ThemeOptions;
  /** <zh/> 色板颜色 | Palette color */
  palette?: Record<string, string>;
}

export abstract class BaseManager<T extends BaseManagerOptions = BaseManagerOptions> {
  static defaultOptions = {};

  protected options: T;

  protected shape: BaseElement<any>;

  protected get type() {
    return this.options.type;
  }

  protected get container() {
    return this.options.container;
  }

  #destroyed = false;
  public get destroyed() {
    return this.#destroyed;
  }

  /**
   * <zh/> 计算动态样式
   *
   * <en/> compute dynamic style
   * @param callableStyle - <zh/> 动态样式 | <en/> dynamic style
   * @returns <zh/> 静态样式 | <en/> static style
   */
  protected getComputedStyle(callableStyle: T['encoder']['style']): StaticElementOptions {
    const { data } = this.options;

    return Object.fromEntries(
      Object.entries(callableStyle).map(([key, style]) => {
        if (isFunction(style)) return [key, style(data)];
        return [key, style];
      }),
    );
  }

  /**
   * <zh/> 从数据中提取样式
   *
   * <en/> pick style from data
   * @returns <zh/> shape 可用的样式 | <en/> style for shape
   * @description
   * <zh/> `data.style` 中一些样式例如 parentId, collapsed, type 并非直接给 shape 使用，因此给 shape 传递参数时需要过滤掉这些字段
   *
   * <en/> Some styles in `data.style` such as parentId, collapsed, type are not directly used by shape, so when passing parameters to shape, these fields need to be filtered out
   */
  protected getDataStyle(): Record<string, unknown> {
    const style = this.options?.data?.style || {};
    const { parentId, collapsed, type, ...restStyle } = style;
    return restStyle;
  }

  protected getDefaultStyle() {
    const style = this.options?.encoder?.style || {};
    return this.getComputedStyle(style);
  }

  protected getStateStyle(state: string) {
    const stateStyle = this.options?.encoder?.state?.[state] || {};
    return this.getComputedStyle(stateStyle);
  }

  protected getStatesStyle() {
    return Object.assign({}, ...this.getStates().map((state) => this.getStateStyle(state)));
  }

  protected getPaletteStyle() {
    // TODO 应该在 controller 解析，然后传递
    const { palette } = this.options;
    return palette || {};
  }

  protected get computedStyle() {
    const dataStyle = this.getDataStyle();
    const defaultStyle = this.getDefaultStyle();
    const statesStyle = this.getStatesStyle();
    const paletteStyle = this.getPaletteStyle();
    // 优先级(从低到高) Priority (from low to high):
    // theme style
    // palette style
    // data style
    // encoder.style
    // encoder.state.style

    return Object.assign(paletteStyle, dataStyle, defaultStyle, statesStyle);
  }

  public get data() {
    // 这个是 raw data
    return this.options.data;
  }

  #states: string[] = [];
  public get states() {
    return this.#states;
  }

  constructor(options: T) {
    this.options = deepMix({}, BaseManager.defaultOptions, options);
    this.init();
  }

  protected getShapeType(options = this.options) {
    const { data } = options;
    const type = data?.style?.type;
    if (type) return type;
    return this.type === 'edge' ? 'line-edge' : `circle-${this.type}`;
  }

  protected createShape() {
    // 如果 shape 已存在，销毁后重新创建
    // If the shape already exists, destroy it and recreate it
    this.destroyShape();

    const { shapes } = this.options;
    const type = this.getShapeType();

    const Ctor = shapes[type];
    if (!Ctor) throw new Error(`Unknown element type: ${type}.`);

    this.shape = this.container.appendChild(
      new Ctor({
        style: {
          graph: this.options.graph,
          ...this.computedStyle,
        },
      }),
    );
  }

  protected init() {
    this.render();
  }

  public render() {
    this.createShape();
  }

  public update(options: T) {
    this.handleTypeChange(options);
    this.handleUpdate(options);
  }

  protected handleTypeChange(options: T) {
    const originalShapeType = this.getShapeType();
    const modifiedShapeType = this.getShapeType(options);

    if (originalShapeType !== modifiedShapeType) {
      this.createShape();
    }
  }

  protected handleUpdate(options: T) {
    this.options = deepMix(this.options, options);
    this.updateShape();
  }

  protected updateShape() {
    const style = {
      graph: this.options.graph,
      ...this.computedStyle,
    };
    if ('update' in this.shape) {
      this.shape.update(style);
    } else {
      (this.shape as DisplayObject).attr(style);
    }
  }

  public getPosition() {
    return this.shape.getPosition();
  }

  public setPosition(point: PositionPoint, animate = true) {
    const { encoder } = this.options;
    const animateOptions = encoder?.animate?.translate;
    const animationType = animateOptions?.type;
    const useAnimate = animate && animateOptions?.type;
    const [x = 0, y = 0, z = 0] = point;
    this.shape.setPosition(point);
  }

  public getVisibility(): Visibility {
    return this.shape.style.visibility;
  }

  public setVisibility(visibility: Visibility) {
    this.shape.style.visibility = visibility;
  }

  public getZIndex() {
    return this.shape.style.zIndex;
  }

  public setZIndex(zIndex: number) {
    this.shape.style.zIndex = zIndex;
  }

  public toFront() {}

  public toBack() {}

  public getStates() {
    return this.options?.states || [];
  }

  public setStates(states: State[]) {}

  protected destroyShape() {
    if (!this.shape) return;
    this.container.removeChild(this.shape);
    this.shape.destroy();
  }

  public destroy() {
    this.destroyShape();
  }
}
