import type { BaseStyleProps } from '@antv/g';
import { CommonEvent } from '../../constants';
import { Circle } from '../../elements';
import type { RuntimeContext } from '../../runtime/types';
import type { EdgeData, GraphData, NodeData } from '../../spec';
import type { EdgeStyle } from '../../spec/element/edge';
import type { NodeStyle } from '../../spec/element/node';
import type {
  Element,
  ElementDatum,
  ElementType,
  ID,
  IDragEvent,
  IPointerEvent,
  Point,
  PointObject,
} from '../../types';
import { idOf } from '../../utils/id';
import { parsePoint, toPointObject } from '../../utils/point';
import { positionOf } from '../../utils/position';
import { distance } from '../../utils/vector';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';

/**
 * <zh/> 边过滤镜插件配置项
 *
 * <en/> Edge filter lens plugin options
 */
export interface EdgeFilterLensOptions extends BasePluginOptions {
  /**
   * <zh/> 移动透镜的方式
   * - `'pointermove'`：始终跟随鼠标移动
   * - `'click'`：鼠标点击时透镜移动
   * - `'drag'`：拖拽透镜
   *
   * <en/> The way to move the lens
   * - `'pointermove'`: always follow the mouse movement
   * - `'click'`: move the lens when the mouse clicks
   * - `'drag'`: drag the lens
   * @defaultValue 'pointermove'
   */
  trigger?: 'pointermove' | 'click' | 'drag';
  /**
   * <zh/> 透镜的半径
   *
   * <en/> The radius of the lens
   * @defaultValue 60
   */
  r?: number;
  /**
   * <zh/> 透镜的最大半径。只有在 `scaleRBy` 为 `wheel` 时生效
   *
   * <en/> The maximum radius of the lens. Only valid when `scaleRBy` is `wheel`
   * @defaultValue canvas 宽高最小值的一半
   */
  maxR?: number;
  /**
   * <zh/> 透镜的最小半径。只有在 `scaleRBy` 为 `wheel` 时生效
   *
   * <en/> The minimum radius of the lens. Only valid when `scaleRBy` is `wheel`
   * @defaultValue 0
   */
  minR?: number;
  /**
   * <zh/> 缩放透镜半径的方式
   * - `'wheel'`：通过滚轮缩放透镜的半径
   *
   * <en/> The way to scale the radius of the lens
   * - `'wheel'`: scale the radius of the lens by the wheel
   * @defaultValue `'wheel'`
   */
  scaleRBy?: 'wheel';
  /**
   * <zh/> 边显示的条件
   * - `'both'`：只有起始节点和目标节点都在透镜中时，边才会显示
   * - `'source'`：只有起始节点在透镜中时，边才会显示
   * - `'target'`：只有目标节点在透镜中时，边才会显示
   * - `'either'`：只要起始节点或目标节点有一个在透镜中时，边就会显示
   *
   * <en/> The condition for displaying the edge
   * - `'both'`: The edge is displayed only when both the source node and the target node are in the lens
   * - `'source'`: The edge is displayed only when the source node is in the lens
   * - `'target'`: The edge is displayed only when the target node is in the lens
   * - `'either'`: The edge is displayed when either the source node or the target node is in the lens
   * @defaultValue 'both'
   */
  nodeType?: 'both' | 'source' | 'target' | 'either';
  /**
   * <zh/> 过滤出始终不在透镜中显示的元素
   *
   * <en/> Filter elements that are never displayed in the lens
   * @param id - <zh/> 元素的 id | <en/> The id of the element
   * @param elementType - <zh/> 元素的类型 | <en/> The type of the element
   * @returns <zh/> 是否显示 | <en/> Whether to display
   */
  filter?: (id: ID, elementType: ElementType) => boolean;
  /**
   * <zh/> 透镜的样式
   *
   * <en/> The style of the lens
   */
  style?: BaseStyleProps;
  /**
   * <zh/> 在透镜中节点的样式
   *
   * <en/> The style of the nodes displayed in the lens
   */
  nodeStyle?: NodeStyle | ((datum: NodeData) => NodeStyle);
  /**
   * <zh/> 在透镜中边的样式
   *
   * <en/> The style of the edges displayed in the lens
   */
  edgeStyle?: EdgeStyle | ((datum: EdgeData) => EdgeStyle);
  /**
   * <zh/> 是否阻止默认事件
   *
   * <en/> Whether to prevent the default event
   * @defaultValue true
   */
  preventDefault?: boolean;
}

const defaultLensStyle: BaseStyleProps = {
  fill: '#fff',
  fillOpacity: 1,
  lineWidth: 1,
  stroke: '#000',
  strokeOpacity: 0.8,
  zIndex: -Infinity,
};

const DELTA = 0.05;

/**
 * <zh/> 边过滤镜插件
 *
 * <en/> Edge filter lens plugin
 * @remarks
 * <zh/> 边过滤镜可以将关注的边保留在过滤镜范围内，其他边将在该范围内不显示。
 *
 * <en/> EdgeFilterLens can keep the focused edges within the lens range, while other edges will not be displayed within that range.
 */
export class EdgeFilterLens extends BasePlugin<EdgeFilterLensOptions> {
  static defaultOptions: Partial<EdgeFilterLensOptions> = {
    trigger: 'pointermove',
    r: 60,
    nodeType: 'both',
    filter: () => true,
    style: { lineWidth: 2 },
    nodeStyle: { label: false },
    edgeStyle: { label: true },
    scaleRBy: 'wheel',
    preventDefault: true,
  };

  constructor(context: RuntimeContext, options: EdgeFilterLensOptions) {
    super(context, Object.assign({}, EdgeFilterLens.defaultOptions, options));
    this.bindEvents();
  }

  private lens!: Circle;

  private shapes = new Map<ID, Element>();

  private r = this.options.r;

  private get canvas() {
    return this.context.canvas.getLayer('transient');
  }

  private get isLensOn() {
    return this.lens && !this.lens.destroyed;
  }

  protected onEdgeFilter = (event: IPointerEvent) => {
    if (this.options.trigger === 'drag' && this.isLensOn) return;

    const origin = parsePoint(event.canvas as PointObject);
    this.renderLens(origin);
    this.renderFocusElements();
  };

  private renderLens = (origin: Point) => {
    const style = Object.assign({}, defaultLensStyle, this.options.style);

    if (!this.isLensOn) {
      this.lens = new Circle({ style });
      this.canvas.appendChild(this.lens);
    }

    Object.assign(style, toPointObject(origin), { size: this.r * 2 });

    this.lens.update(style);
  };

  private getFilterData = (): Required<GraphData> => {
    const { filter } = this.options;
    const { model } = this.context;
    const data = model.getData();

    if (!filter) return data;

    const { nodes, edges, combos } = data;

    return {
      nodes: nodes.filter((node) => filter(idOf(node), 'node')),
      edges: edges.filter((edge) => filter(idOf(edge), 'edge')),
      combos: combos.filter((combo) => filter(idOf(combo), 'combo')),
    };
  };

  private getFocusElements = (origin: Point) => {
    const { nodes, edges } = this.getFilterData();

    const focusNodes = nodes.filter((datum) => distance(positionOf(datum), origin) < this.r);
    const focusNodeIds = focusNodes.map((node) => idOf(node));

    const focusEdges = edges.filter((datum) => {
      const { source, target } = datum;
      const isSourceFocus = focusNodeIds.includes(source);
      const isTargetFocus = focusNodeIds.includes(target);

      switch (this.options.nodeType) {
        case 'both':
          return isSourceFocus && isTargetFocus;
        case 'either':
          return isSourceFocus !== isTargetFocus;
        case 'source':
          return isSourceFocus && !isTargetFocus;
        case 'target':
          return !isSourceFocus && isTargetFocus;
        default:
          return false;
      }
    });

    return { nodes: focusNodes, edges: focusEdges };
  };

  private renderFocusElements = () => {
    const { element, graph } = this.context;
    if (!this.isLensOn) return;

    const origin = this.lens.getCenter();
    const { nodes, edges } = this.getFocusElements(origin);

    const ids = new Set<ID>();

    const iterate = (datum: ElementDatum) => {
      const id = idOf(datum);
      ids.add(id);

      const shape = element!.getElement(id);
      if (!shape) return;

      const cloneShape = this.shapes.get(id) || shape.cloneNode();

      cloneShape.setPosition(shape.getPosition());
      cloneShape.id = shape.id;

      if (!this.shapes.has(id)) {
        this.canvas.appendChild(cloneShape);
        this.shapes.set(id, cloneShape);
      } else {
        Object.entries(shape.attributes).forEach(([key, value]) => {
          if (cloneShape.style[key] !== value) cloneShape.style[key] = value;
        });
      }

      const elementType = graph.getElementType(id) as Exclude<ElementType, 'combo'>;
      const style = this.getElementStyle(elementType, datum);

      // @ts-ignore
      cloneShape.update(style);
    };

    nodes.forEach(iterate);
    edges.forEach(iterate);

    this.shapes.forEach((shape, id) => {
      if (!ids.has(id)) {
        shape.destroy();
        this.shapes.delete(id);
      }
    });
  };

  private getElementStyle(elementType: ElementType, datum: ElementDatum) {
    const styler = elementType === 'node' ? this.options.nodeStyle : this.options.edgeStyle;
    if (typeof styler === 'function') return styler(datum as any);
    return styler;
  }

  private scaleRByWheel = (event: WheelEvent) => {
    if (this.options.preventDefault) event.preventDefault();
    const { clientX, clientY, deltaX, deltaY } = event;
    const { graph, canvas } = this.context;
    const scaleOrigin = graph.getCanvasByClient([clientX, clientY]);
    const origin = this.lens?.getCenter();

    if (!this.isLensOn || distance(scaleOrigin, origin) > this.r) {
      return;
    }

    const { maxR, minR } = this.options;
    const ratio = deltaX + deltaY > 0 ? 1 / (1 - DELTA) : 1 - DELTA;
    const canvasR = Math.min(...canvas.getSize()) / 2;
    this.r = Math.max(minR || 0, Math.min(maxR || canvasR, this.r * ratio));

    this.renderLens(origin);
    this.renderFocusElements();
  };

  get graphDom() {
    return this.context.graph.getCanvas().getContextService().getDomElement();
  }

  private isLensDragging = false;

  private onDragStart = (event: IDragEvent) => {
    const dragOrigin = parsePoint(event.canvas as PointObject);
    const origin = this.lens?.getCenter();

    if (!this.isLensOn || distance(dragOrigin, origin) > this.r) return;

    this.isLensDragging = true;
  };

  private onDrag = (event: IDragEvent) => {
    if (!this.isLensDragging) return;

    const dragOrigin = parsePoint(event.canvas as PointObject);
    this.renderLens(dragOrigin);
    this.renderFocusElements();
  };

  private onDragEnd = () => {
    this.isLensDragging = false;
  };

  private bindEvents() {
    const { graph } = this.context;
    const { trigger, scaleRBy } = this.options;

    const canvas = graph.getCanvas().getLayer();

    if (['click', 'drag'].includes(trigger)) {
      canvas.addEventListener(CommonEvent.CLICK, this.onEdgeFilter);
    }

    if (trigger === 'pointermove') {
      canvas.addEventListener(CommonEvent.POINTER_MOVE, this.onEdgeFilter);
    } else if (trigger === 'drag') {
      canvas.addEventListener(CommonEvent.DRAG_START, this.onDragStart);
      canvas.addEventListener(CommonEvent.DRAG, this.onDrag);
      canvas.addEventListener(CommonEvent.DRAG_END, this.onDragEnd);
    }

    if (scaleRBy === 'wheel') {
      this.graphDom?.addEventListener(CommonEvent.WHEEL, this.scaleRByWheel, { passive: false });
    }
  }

  private unbindEvents() {
    const { graph } = this.context;
    const { trigger, scaleRBy } = this.options;
    const canvas = graph.getCanvas().getLayer();

    if (['click', 'drag'].includes(trigger)) {
      canvas.removeEventListener(CommonEvent.CLICK, this.onEdgeFilter);
    }

    if (trigger === 'pointermove') {
      canvas.removeEventListener(CommonEvent.POINTER_MOVE, this.onEdgeFilter);
    } else if (trigger === 'drag') {
      canvas.removeEventListener(CommonEvent.DRAG_START, this.onDragStart);
      canvas.removeEventListener(CommonEvent.DRAG, this.onDrag);
      canvas.removeEventListener(CommonEvent.DRAG_END, this.onDragEnd);
    }

    if (scaleRBy === 'wheel') {
      this.graphDom?.removeEventListener(CommonEvent.WHEEL, this.scaleRByWheel);
    }
  }

  public update(options: Partial<EdgeFilterLensOptions>) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  public destroy() {
    this.unbindEvents();
    if (this.isLensOn) {
      this.lens.destroy();
    }
    this.shapes.forEach((shape, id) => {
      shape.destroy();
      this.shapes.delete(id);
    });
    super.destroy();
  }
}
