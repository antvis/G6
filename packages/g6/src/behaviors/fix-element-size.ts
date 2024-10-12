import type { DisplayObject } from '@antv/g';
import { isFunction, isNumber } from '@antv/util';
import { GraphEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { EdgeData, NodeData } from '../spec';
import type { Combo, Edge, Element, ID, IViewportEvent, Node, NodeLikeData, State } from '../types';
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
   * <zh/> 指定要固定大小的属性。如果不指定，则整个图形将被固定
   *
   * <en/> Specify properties to be fixed
   */
  fields?: string[];
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
   * @remarks
   * <zh/> 默认在缩小画布时启用，设置 `enable: (event) => event.data.scale < 1`；如果希望在放大画布时启用，设置 `enable: (event) * => event.data.scale > 1`；如果希望在放大缩小画布时都启用，设置 `enable: true`
   *
   * <en/> Enabled by default when zooming out, set `enable: (event) => event.data.scale < 1`; If you want to enable it when zooming in, set `enable: (event) * => event.data.scale > 1`; If you want to enable it when zooming in and out, set `enable: true`
   * @defaultValue (event) => Boolean(event.data.scale < 1)
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
   * <zh/> 节点过滤器，用于过滤哪些节点在缩放过程中保持固定大小
   *
   * <en/> Node filter for filtering which nodes remain fixed in size during zooming
   * @defaultValue () => true
   */
  nodeFilter?: (datum: NodeData) => boolean;
  /**
   * <zh/> 边过滤器，用于过滤哪些边在缩放过程中保持固定大小
   *
   * <en/> Edge filter for filtering which edges remain fixed in size during zooming
   * @defaultValue () => true
   */
  edgeFilter?: (datum: EdgeData) => boolean;
  /**
   * <zh/> Combo 过滤器，用于过滤哪些 Combo 在缩放过程中保持固定大小
   *
   * <en/> Combo filter for filtering which combos remain fixed in size during zooming
   * @defaultValue () => true
   */
  comboFilter?: (datum: NodeData) => boolean;
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
  /**
   * <zh/> 元素重绘时是否还原样式
   *
   * <en/> Whether to reset styles when elements are redrawn
   * @defaultValue false
   */
  reset?: boolean;
}

/**
 * <zh/> 缩放画布过程中固定元素大小
 *
 * <en/> Fix element size while zooming
 */
export class FixElementSize extends BaseBehavior<FixElementSizeOptions> {
  static defaultOptions: Partial<FixElementSizeOptions> = {
    enable: (event) => event.data.scale! < 1,
    nodeFilter: () => true,
    edgeFilter: () => true,
    comboFilter: () => true,
    edge: [
      {
        shape: (shapes: DisplayObject[]) => shapes.find((shape) => shape.className === 'key')!,
        fields: ['lineWidth'],
      },
      {
        shape: (shapes: DisplayObject[]) => shapes.find((shape) => shape.className === 'halo')!,
        fields: ['lineWidth'],
      },
      {
        shape: (shapes: DisplayObject[]) =>
          shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text')!,
        fields: ['fontSize', 'lineHeight'],
      },
    ],
    reset: false,
  };

  private elementCache: Set<DisplayObject> = new Set();

  constructor(context: RuntimeContext, options: FixElementSizeOptions) {
    super(context, Object.assign({}, FixElementSize.defaultOptions, options));
    this.bindEvents();
  }

  private isZoomEvent = (event: IViewportEvent) => Boolean(event.data && 'scale' in event.data);

  private relatedEdgeToUpdate: Set<ID> = new Set();

  private zoom = this.context.graph.getZoom();

  private fixElementSize = async (event: IViewportEvent) => {
    if (!this.validate(event)) return;

    const { graph } = this.context;
    const { state, nodeFilter, edgeFilter, comboFilter } = this.options;

    const nodeData = (state ? graph.getElementDataByState('node', state) : graph.getNodeData()).filter(nodeFilter);
    const edgeData = (state ? graph.getElementDataByState('edge', state) : graph.getEdgeData()).filter(edgeFilter);
    const comboData = (state ? graph.getElementDataByState('combo', state) : graph.getComboData()).filter(comboFilter);

    // 设置阈值防止过大或过小时抖动 | Set the threshold to prevent jitter when too large or too small
    const currentScale = this.isZoomEvent(event)
      ? (this.zoom = Math.max(0.01, Math.min(event.data.scale!, 10)))
      : this.zoom;

    const nodeLikeData = [...nodeData, ...comboData];
    if (nodeLikeData.length > 0) {
      nodeLikeData.forEach((datum) => this.fixNodeLike(datum, currentScale));
    }

    this.updateRelatedEdges();

    if (edgeData.length > 0) {
      edgeData.forEach((datum) => this.fixEdge(datum, currentScale));
    }
  };

  private cachedStyles: Map<DisplayObject, Record<string, any>> = new Map();

  private getOriginalFieldValue = (shape: DisplayObject, field: string) => {
    const cachedStyle = this.cachedStyles.get(shape) || {};
    if (!(field in cachedStyle)) {
      cachedStyle[field] = shape.attributes[field];
      this.cachedStyles.set(shape, cachedStyle);
    }
    return cachedStyle[field];
  };

  private scaleEntireElement = (el: DisplayObject, currentScale: number) => {
    el.setLocalScale(1 / currentScale);
    this.elementCache.add(el);
  };

  private scaleSpecificShapes = (
    el: DisplayObject,
    currentScale: number,
    config: FixShapeConfig | FixShapeConfig[],
  ) => {
    const descendantShapes = getDescendantShapes(el);
    const configs = Array.isArray(config) ? config : [config];

    configs.forEach((config: FixShapeConfig) => {
      const { shape: shapeFilter, fields } = config;
      const shape = shapeFilter(descendantShapes);

      if (!shape) return;
      if (!fields) {
        this.scaleEntireElement(shape, currentScale);
        return;
      }

      fields.forEach((field) => {
        const oriFieldValue = this.getOriginalFieldValue(shape, field);
        if (!isNumber(oriFieldValue)) return;
        shape.style[field] = oriFieldValue / currentScale;
      });
    });
  };

  private skipIfExceedViewport = (el: Element) => {
    const { viewport } = this.context;
    return !viewport?.isInViewport(el.getRenderBounds(), 30);
  };

  private fixNodeLike = (datum: NodeLikeData, currentScale: number) => {
    const id = idOf(datum);
    const { element, model } = this.context;
    const el = element!.getElement(id) as Node | Combo;

    if (this.skipIfExceedViewport(el)) return;

    const edges = model.getRelatedEdgesData(id);
    edges.forEach((edge) => this.relatedEdgeToUpdate.add(idOf(edge)));

    const config = this.options[(el as any).type];
    if (!config) {
      this.scaleEntireElement(el, currentScale);
      return;
    }
    this.scaleSpecificShapes(el, currentScale, config);
  };

  private fixEdge = (datum: EdgeData, currentScale: number) => {
    const id = idOf(datum);
    const el = this.context.element!.getElement(id) as Edge;

    if (this.skipIfExceedViewport(el)) return;

    const config = this.options.edge;
    if (!config) {
      el.style.transformOrigin = 'center';
      this.scaleEntireElement(el, currentScale);
      return;
    }
    this.scaleSpecificShapes(el, currentScale, config);
  };

  private updateRelatedEdges = () => {
    const { element } = this.context;
    if (this.relatedEdgeToUpdate.size > 0) {
      this.relatedEdgeToUpdate.forEach((id) => {
        const edge = element!.getElement(id) as Edge;
        edge?.update({});
      });
    }
    this.relatedEdgeToUpdate.clear();
  };

  private resetTransform = async () => {
    if (this.options.reset) {
      if (this.elementCache.size > 0) {
        this.elementCache.forEach((el) => el.setLocalScale(1));
        this.elementCache.clear();
      }
      if (this.cachedStyles.size > 0) {
        this.cachedStyles.forEach((style, shape) => {
          Object.entries(style).forEach(([field, value]) => {
            shape.style[field] = value;
          });
        });
        this.cachedStyles.clear();
      }
    } else {
      this.fixElementSize({} as IViewportEvent);
    }
  };

  private bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_TRANSFORM, this.fixElementSize);
    graph.on(GraphEvent.AFTER_DRAW, this.resetTransform);
  }

  private unbindEvents() {
    const { graph } = this.context;
    graph.off(GraphEvent.AFTER_TRANSFORM, this.fixElementSize);
    graph.off(GraphEvent.AFTER_DRAW, this.resetTransform);
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
