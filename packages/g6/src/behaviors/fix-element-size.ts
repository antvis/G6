import type { DisplayObject } from '@antv/g';
import { isEmpty, isFunction, isNumber } from '@antv/util';
import { GraphEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { ComboData, EdgeData, NodeData } from '../spec';
import type {
  Combo,
  Edge,
  Element,
  ID,
  IGraphLifeCycleEvent,
  IViewportEvent,
  Node,
  NodeLikeData,
  State,
} from '../types';
import { idOf } from '../utils/id';
import { getDescendantShapes } from '../utils/shape';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

export type FixShapeConfig = {
  /**
   * <zh/> 指定要固定大小的图形，可以是图形的类名字，或者是一个函数，该函数接收构成元素的所有图形并返回目标图形
   *
   * <en/> Specify the shape to be fixed in size. This can be a class name string of the shape, or a function that takes all shapes composing the element and returns the target shape
   */
  shape: string | ((shapes: DisplayObject[]) => DisplayObject);
  /**
   * <zh/> 指定要固定大小的图形属性字段。如果未指定，则默认固定整个图形的大小
   *
   * <en/> Specify the fields of the shape to be fixed in size. If not specified, the entire shape's size will be fixed by default
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
   * <zh/> 默认在缩小画布时启用，设置 `enable: (event) => event.data.scale < 1`；如果希望在放大画布时启用，设置 `enable: (event) => event.data.scale > 1`；如果希望在放大缩小画布时都启用，设置 `enable: true`
   *
   * <en/> Enabled by default when zooming out, set `enable: (event) => event.data.scale < 1`; If you want to enable it when zooming in, set `enable: (event) => event.data.scale > 1`; If you want to enable it when zooming in and out, set `enable: true`
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
  comboFilter?: (datum: ComboData) => boolean;
  /**
   * <zh/> 节点配置项，用于定义哪些属性在视觉上保持固定大小。若未指定（即为 undefined），则整个节点将被固定
   *
   * <en/> Node configuration for defining which node attributes should remain fixed in size visually. If not specified (i.e., undefined), the entire node will be fixed in size.
   * @example
   * <zh/> 如果在缩放过程中希望固定节点主图形的 lineWidth，可以这样配置：
   *
   * <en/> If you want to fix the lineWidth of the key shape of the node during zooming, you can configure it like this:
   * ```ts
   * { node: [{ shape: 'key', fields: ['lineWidth'] }] }
   *```
   * <zh/> 如果在缩放过程中想保持元素标签大小不变，可以这样配置：
   *
   * <en/> If you want to keep the label size of the element unchanged during zooming, you can configure it like this:
   * ```ts
   *  { shape: 'label' }
   * ```
   */
  node?: FixShapeConfig | FixShapeConfig[];
  /**
   * <zh/> 边配置项，用于定义哪些属性在视觉上保持固定大小。默认固定 lineWidth、labelFontSize 属性
   *
   * <en/> Edge configuration for defining which edge attributes should remain fixed in size visually. By default, the lineWidth and labelFontSize attributes are fixed
   * @defaultValue [{ shape: 'key', fields: ['lineWidth'] }, { shape: 'halo', fields: ['lineWidth'] }, { shape: 'label' }]
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
    enable: (event: IViewportEvent) => event.data.scale! < 1,
    nodeFilter: () => true,
    edgeFilter: () => true,
    comboFilter: () => true,
    edge: [{ shape: 'key', fields: ['lineWidth'] }, { shape: 'halo', fields: ['lineWidth'] }, { shape: 'label' }],
    reset: false,
  };

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

  private cachedStyles: Map<ID, { shape: DisplayObject; [field: string]: any }[]> = new Map();

  private getOriginalFieldValue = (id: ID, shape: DisplayObject, field: string) => {
    const shapesStyle = this.cachedStyles.get(id) || [];
    const shapeStyle = shapesStyle.find((style) => style.shape === shape)?.style || {};
    if (!(field in shapeStyle)) {
      shapeStyle[field] = shape.attributes[field];
      this.cachedStyles.set(id, [
        ...shapesStyle.filter((style) => style.shape !== shape),
        { shape, style: shapeStyle },
      ]);
    }
    return shapeStyle[field];
  };

  private scaleEntireElement = (id: ID, el: DisplayObject, currentScale: number) => {
    el.setLocalScale(1 / currentScale);
    const shapesStyle = this.cachedStyles.get(id) || [];
    shapesStyle.push({ shape: el });
    this.cachedStyles.set(id, shapesStyle);
  };

  private scaleSpecificShapes = (el: Element, currentScale: number, config: FixShapeConfig | FixShapeConfig[]) => {
    const descendantShapes = getDescendantShapes(el);
    const configs = Array.isArray(config) ? config : [config];

    configs.forEach((config: FixShapeConfig) => {
      const { shape: shapeFilter, fields } = config;
      const shape = typeof shapeFilter === 'function' ? shapeFilter(descendantShapes) : el.getShape(shapeFilter);

      if (!shape) return;
      if (!fields) {
        this.scaleEntireElement(el.id, shape, currentScale);
        return;
      }

      fields.forEach((field) => {
        const oriFieldValue = this.getOriginalFieldValue(el.id, shape, field);
        if (!isNumber(oriFieldValue)) return;
        shape.style[field] = oriFieldValue / currentScale;
      });
    });
  };

  private skipIfExceedViewport = (el: Element) => {
    const { viewport } = this.context;
    return !viewport?.isInViewport(el.getRenderBounds(), false, 30);
  };

  private fixNodeLike = (datum: NodeLikeData, currentScale: number) => {
    const id = idOf(datum);
    const { element, model } = this.context;
    const el = element!.getElement(id) as Node | Combo;

    if (!el || this.skipIfExceedViewport(el)) return;

    const edges = model.getRelatedEdgesData(id);
    edges.forEach((edge) => this.relatedEdgeToUpdate.add(idOf(edge)));

    const config = this.options[(el as any).type];
    if (!config) {
      this.scaleEntireElement(id, el, currentScale);
      return;
    }
    this.scaleSpecificShapes(el, currentScale, config);
  };

  private fixEdge = (datum: EdgeData, currentScale: number) => {
    const id = idOf(datum);
    const el = this.context.element!.getElement(id) as Edge;

    if (!el || this.skipIfExceedViewport(el)) return;

    const config = this.options.edge;
    if (!config) {
      el.style.transformOrigin = 'center';
      this.scaleEntireElement(id, el, currentScale);
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

  private restoreCachedStyles() {
    if (this.cachedStyles.size > 0) {
      this.cachedStyles.forEach((shapesStyle) => {
        shapesStyle.forEach(({ shape, style }) => {
          if (isEmpty(style)) {
            shape.setLocalScale(1);
          } else {
            if (this.options.state) return;
            Object.entries(style).forEach(([field, value]) => (shape.style[field] = value));
          }
        });
      });
      const { graph, element } = this.context;
      const nodeIds = Object.keys(Object.fromEntries(this.cachedStyles)).filter(
        (id) => id && graph.getElementType(id) === 'node',
      );
      if (nodeIds.length > 0) {
        const edgeIds = new Set<ID>();
        nodeIds.forEach((id) => {
          graph.getRelatedEdgesData(id).forEach((edge) => edgeIds.add(idOf(edge)));
        });
        edgeIds.forEach((id) => {
          const edge = element?.getElement(id) as Edge;
          edge?.update({});
        });
      }
    }
    // this.cachedStyles.clear();
  }

  private resetTransform = async (event: IGraphLifeCycleEvent) => {
    // 首屏渲染时跳过 | Skip when rendering the first screen
    if (event.data?.firstRender) return;

    if (this.options.reset) {
      this.restoreCachedStyles();
    } else {
      this.fixElementSize({ data: { scale: this.zoom } } as IViewportEvent);
    }
  };

  private bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_DRAW, this.resetTransform);
    graph.on(GraphEvent.AFTER_TRANSFORM, this.fixElementSize);
  }

  private unbindEvents() {
    const { graph } = this.context;
    graph.off(GraphEvent.AFTER_DRAW, this.resetTransform);
    graph.off(GraphEvent.AFTER_TRANSFORM, this.fixElementSize);
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
