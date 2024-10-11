import type { DisplayObject } from '@antv/g';
import { isFunction, isNumber } from '@antv/util';
import { GraphEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { Element, ID, IViewportEvent, State } from '../types';
import { cacheStyle, getCachedStyle, hasCachedStyle } from '../utils/cache';
import { idOf } from '../utils/id';
import { getDescendantShapes } from '../utils/shape';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

export type FixShapeConfig = {
  /**
   * <zh/> 指定要固定大小的元素属性对应的图形。如果不指定，则固定整个元素
   *
   * <en/> Specify the shape corresponding to properties to be fixed in size. If not specified, fix the entire element
   */
  shape: (shapes: DisplayObject[]) => DisplayObject;
  /**
   * <zh/> 指定要固定大小的属性
   *
   * <en/> Specify properties to be fixed
   */
  fields: string[];
};

/**
 * <zh/> 固定元素大小交互配置项
 *
 * <en/> Fix element size behavior options
 */
export interface FixElementSizeOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用固定元素大小交互。默认在缩小画布时启用
   *
   * <en/> Whether to enable the fix element size behavior. Enabled by default when zooming out
   * @defaultValue `(event) => Boolean(event.data.scale < 1)`
   */
  enable?: boolean | ((event: IViewportEvent) => boolean);
  /**
   * <zh/> 指定要固定大小的元素状态
   *
   * <en/> Specify the state of elements to be fixed in size
   * @defaultValue `'selected'`
   */
  state?: State;
  /**
   * <zh/> 节点配置项，用于定义哪些属性在视觉上保持固定大小。若未指定（即为 undefined），则整个节点将被固定
   *
   * <en/> Node configuration for defining which node attributes should remain fixed in size visually. If not specified (i.e., undefined), the entire node will be fixed in size.
   * @example
   * <zh/> 如果在缩放过程中希望固定节点主图形的 lineWidth 属性，可以这样配置：
   *
   * <en/> If you want to fix the lineWidth attribute of the key shape of the node during zooming, you can configure it like this:
   * ```ts
   * {
   *  node: [
   *    {
   *      shape: (shapes: DisplayObject[]) => shapes.find((shape) => shape.className === 'key'),
   *      fields: ['lineWidth'],
   *    },
   *  ],
   * }
   *
   * <zh/> 如果希望固定节点标签的文字大小和行高，可以这样配置：
   *
   * <en/> If you want to fix the font size and line height of the node label, you can configure it like this:
   * ```ts
   *  {
   *    shape: (shapes: DisplayObject[]) => shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text')!,
   *   fields: ['fontSize', 'lineHeight'],
   *  },
   * ```
   */
  node?: FixShapeConfig | FixShapeConfig[];
  /**
   * <zh/> 边配置项，用于定义哪些属性在视觉上保持固定大小。默认固定 lineWidth、labelFontSize 属性
   *
   * <en/> Edge configuration for defining which edge attributes should remain fixed in size visually. By default, the lineWidth and labelFontSize attributes are fixed
   */
  edge?: FixShapeConfig | FixShapeConfig[];
  /**
   * <zh/> Combo 配置项，用于定义哪些属性在视觉上保持固定大小。默认整个 Combo 将被固定
   *
   * <en/> Combo configuration for defining which combo attributes should remain fixed in size visually. By default, the entire combo will be fixed
   */
  combo?: FixShapeConfig | FixShapeConfig[];
}

/**
 * <zh/> 缩放画布过程中固定元素大小
 *
 * <en/> Fix element size while zooming
 */
export class FixElementSize extends BaseBehavior {
  static defaultOptions: Partial<FixElementSizeOptions> = {
    enable: (event) => event.data.scale! < 1,
    state: 'selected',
    edge: [
      {
        shape: (shapes: DisplayObject[]) => shapes.find((shape) => shape.className === 'key')!,
        fields: ['lineWidth'],
      },
      {
        shape: (shapes: DisplayObject[]) =>
          shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text')!,
        fields: ['fontSize', 'lineHeight'],
      },
    ],
  };

  private elementCache: Map<ID, Element> = new Map();

  constructor(context: RuntimeContext, options: FixElementSizeOptions) {
    super(context, Object.assign({}, FixElementSize.defaultOptions, options));
    this.bindEvents();
  }

  private isZoomEvent = (event: IViewportEvent) => 'scale' in event.data;

  private fixElementSize = async (event: IViewportEvent) => {
    if (!this.isZoomEvent(event) || !this.validate(event)) return;

    const { graph, element } = this.context;
    const { state } = this.options;
    const elementData = state
      ? [
          ...graph.getElementDataByState('node', state),
          ...graph.getElementDataByState('edge', state),
          ...graph.getElementDataByState('combo', state),
        ]
      : Object.values(graph.getData()).flat();

    if (!elementData.length) return;

    const currentScale = event.data.scale || graph.getZoom();
    elementData.forEach((elementData) => {
      const id = idOf(elementData);
      const el = element?.getElement(id) as Element;
      const type = graph.getElementType(id);

      const config = this.options[type];

      if (!config) {
        this.elementCache.set(id, el);
        if (type === 'edge') {
          el.style.transformOrigin = 'center';
        }
        // FIXME: 修改 Path 的 localScale 属性时遇到问题，导致边会偏移错位
        el.setLocalScale(1 / currentScale);
        return;
      }

      const descendantShapes = getDescendantShapes(el);
      const configs = Array.isArray(config) ? config : [config];
      configs.forEach((config: FixShapeConfig) => {
        const { shape: shapeFilter, fields } = config;
        const shape = shapeFilter(descendantShapes);
        if (!shape) return;
        fields.forEach((field) => {
          if (!hasCachedStyle(shape, field)) cacheStyle(shape, field);
          const oriFieldValue = getCachedStyle(shape, field);
          if (!isNumber(oriFieldValue)) return;
          shape.style[field] = oriFieldValue / currentScale;
        });
      });
    });
  };

  private resetTransform = async () => {
    if (this.elementCache) {
      this.elementCache.forEach((el) => el.setLocalScale(1));
      this.elementCache.clear();
    }
  };

  private bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_TRANSFORM, this.fixElementSize);
    graph.on(GraphEvent.BEFORE_DRAW, this.resetTransform);
  }

  private unbindEvents() {
    const { graph } = this.context;
    graph.off(GraphEvent.AFTER_TRANSFORM, this.fixElementSize);
    graph.off(GraphEvent.BEFORE_DRAW, this.resetTransform);
  }

  private validate(event: IViewportEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  public destroy(): void {
    this.unbindEvents();
    super.destroy();
  }
}
