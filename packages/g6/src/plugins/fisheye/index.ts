import { pick } from '@antv/util';
import { CommonEvent } from '../../constants';
import type { CircleStyleProps } from '../../elements';
import { Circle } from '../../elements';
import type { RuntimeContext } from '../../runtime/types';
import type { NodeData } from '../../spec';
import type { NodeStyle } from '../../spec/element/node';
import type { ID, IDragEvent, IPointerEvent, Node, Point, PointObject } from '../../types';
import { arrayDiff } from '../../utils/diff';
import { idOf } from '../../utils/id';
import { parsePoint, toPointObject } from '../../utils/point';
import { positionOf } from '../../utils/position';
import { distance } from '../../utils/vector';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';

/**
 * <zh/> 鱼眼放大镜插件配置项
 *
 * <en/> Fisheye Plugin Options
 */
export interface FisheyeOptions extends BasePluginOptions {
  /**
   * <zh/> 移动鱼眼放大镜的方式
   * - `'pointermove'`：始终跟随鼠标移动
   * - `'click'`：鼠标点击时移动
   * - `'drag'`：拖拽移动
   *
   * <en/> The way to move the fisheye lens
   * - `'pointermove'`: always follow the mouse movement
   * - `'click'`: move when the mouse is clicked
   * - `'drag'`: move by dragging
   * @defaultValue `'pointermove'`
   */
  trigger?: 'pointermove' | 'drag' | 'click';
  /**
   * <zh/> 鱼眼放大镜半径
   *
   * <en/> The radius of the fisheye lens
   * @remarks
   * <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*unAvQqAb_NMAAAAAAAAAAAAADmJ7AQ/original" width="200" />
   * @defaultValue 120
   */
  r?: number;
  /**
   * <zh/> 鱼眼放大镜可调整的最大半径，配合 `scaleRBy` 使用
   *
   * <en/> The maximum radius that the fisheye lens can be adjusted, used with `scaleRBy`
   * @defaultValue 画布宽高的最小值的一半
   */
  maxR?: number;
  /**
   * <zh/> 鱼眼放大镜可调整的最小半径，配合 `scaleRBy` 使用
   *
   * <en/> The minimum radius that the fisheye lens can be adjusted, used with `scaleRBy`
   * @defaultValue 0
   */
  minR?: number;
  /**
   * <zh/> 调整鱼眼放大镜范围半径的方式
   * - `'wheel'`：滚轮调整
   * - `'drag'`：拖拽调整
   *
   * <en/> The way to adjust the range radius of the fisheye lens
   * - `'wheel'`: adjust by wheel
   * - `'drag'`: adjust by drag
   * @remarks
   * <zh/> 如果 `trigger`、`scaleRBy` 和 `scaleDBy` 同时设置为 `'drag'`，优先级顺序为 `trigger` > `scaleRBy` > `scaleDBy`，只会为优先级最高的配置项绑定拖拽事件。同理，如果 `scaleRBy` 和 `scaleDBy` 同时设置为 `'wheel'`，只会为 `scaleRBy` 绑定滚轮事件
   *
   * <en/> If `trigger`, `scaleRBy`, and `scaleDBy` are set to `'drag'` at the same time, the priority order is `trigger` > `scaleRBy` > `scaleDBy`, and only the configuration item with the highest priority will be bound to the drag event. Similarly, if `scaleRBy` and `scaleDBy` are set to `'wheel'` at the same time, only `scaleRBy` will be bound to the wheel event
   */
  scaleRBy?: 'wheel' | 'drag';
  /**
   * <zh/> 畸变因子
   *
   * <en/> Distortion factor
   * @remarks
   * <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4ITFR7GOl8UAAAAAAAAAAAAADmJ7AQ/original" width="200" />
   * @defaultValue 1.5
   */
  d?: number;
  /**
   * <zh/> 鱼眼放大镜可调整的最大畸变因子，配合 `scaleDBy` 使用
   *
   * <en/> The maximum distortion factor that the fisheye lens can be adjusted, used with `scaleDBy`
   * @defaultValue 5
   */
  maxD?: number;
  /**
   * <zh/> 鱼眼放大镜可调整的最小畸变因子，配合 `scaleDBy` 使用
   *
   * <en/> The minimum distortion factor that the fisheye lens can be adjusted, used with `scaleDBy`
   * @defaultValue 0
   */
  minD?: number;
  /**
   * <zh/> 调整鱼眼放大镜畸变因子的方式
   * - `'wheel'`：滚轮调整
   * - `'drag'`：拖拽调整
   *
   * <en/> The way to adjust the distortion factor of the fisheye lens
   * - `'wheel'`: adjust by wheel
   * - `'drag'`: adjust by drag
   */
  scaleDBy?: 'wheel' | 'drag';
  /**
   * <zh/> 是否在鱼眼放大镜中显示畸变因子数值
   *
   * <en/> Whether to display the value of the distortion factor in the fisheye lens
   * @defaultValue true
   */
  showDPercent?: boolean;
  /**
   * <zh/> 鱼眼放大镜样式
   *
   * <en/> Fisheye Lens Style
   */
  style?: Partial<CircleStyleProps>;
  /**
   * <zh/> 在鱼眼放大镜中的节点样式
   *
   * <en/> Node style in the fisheye lens
   */
  nodeStyle?: NodeStyle | ((datum: NodeData) => NodeStyle);
  /**
   * <zh/> 是否阻止默认事件
   *
   * <en/> Whether to prevent the default event
   * @defaultValue true
   */
  preventDefault?: boolean;
}

const defaultLensStyle: Exclude<CircleStyleProps, 'r'> = {
  fill: '#ccc',
  fillOpacity: 0.1,
  lineWidth: 2,
  stroke: '#000',
  strokeOpacity: 0.8,
  labelFontSize: 12,
};

const R_DELTA = 0.05;
const D_DELTA = 0.1;

/**
 * <zh/> 鱼眼放大镜
 *
 * <en/> Fisheye Distortion
 * @remarks
 * <zh/> Fisheye 鱼眼放大镜是为 focus+context 的探索场景设计的，它能够保证在放大关注区域的同时，保证上下文以及上下文与关注中心的关系不丢失。
 *
 * <en/> Fisheye is designed for focus+context exploration, it keeps the context and the relationships between context and the focus while magnifying the focus area.
 */
export class Fisheye extends BasePlugin<FisheyeOptions> {
  static defaultOptions: Partial<FisheyeOptions> = {
    trigger: 'pointermove',
    r: 120,
    d: 1.5,
    maxD: 5,
    minD: 0,
    showDPercent: true,
    style: {},
    nodeStyle: { label: true },
    preventDefault: true,
  };

  constructor(context: RuntimeContext, options: FisheyeOptions) {
    super(context, Object.assign({}, Fisheye.defaultOptions, options));
    this.bindEvents();
  }

  private lens!: Circle;

  private r = this.options.r;
  private d = this.options.d;

  private get canvas() {
    return this.context.canvas.getLayer('transient');
  }

  private get isLensOn() {
    return this.lens && !this.lens.destroyed;
  }

  protected onCreateFisheye = (event: IPointerEvent) => {
    if (this.options.trigger === 'drag' && this.isLensOn) return;

    const origin = parsePoint(event.canvas as PointObject);
    this.onMagnify(origin);
  };

  protected onMagnify = (origin: Point) => {
    if (origin.some(isNaN)) return;

    this.renderLens(origin);
    this.renderFocusElements();
  };

  private renderLens = (origin: Point) => {
    const style = Object.assign({}, defaultLensStyle, this.options.style);

    if (!this.isLensOn) {
      this.lens = new Circle({ style });
      this.canvas.appendChild(this.lens);
    }

    Object.assign(style, toPointObject(origin), {
      size: this.r * 2,
      label: this.options.showDPercent,
      labelText: this.getDPercent(),
    });

    this.lens.update(style);
  };

  private getDPercent = () => {
    const { minD, maxD } = this.options as Required<FisheyeOptions>;
    const percent = Math.round(((this.d - minD) / (maxD - minD)) * 100);
    return `${percent}%`;
  };

  private prevMagnifiedStyleMap = new Map<ID, NodeStyle>();
  private prevOriginStyleMap = new Map<ID, NodeStyle>();

  private renderFocusElements = () => {
    if (!this.isLensOn) return;

    const { graph } = this.context;
    const origin = this.lens.getCenter();

    const molecularParam = (this.d + 1) * this.r;

    const magnifiedStyleMap = new Map<ID, NodeStyle>();
    const originStyleMap = new Map<ID, NodeStyle>();

    const nodeData = graph.getNodeData();
    nodeData.forEach((datum) => {
      const position = positionOf(datum);
      const distanceToOrigin = distance(position, origin);
      if (distanceToOrigin > this.r) return;

      const magnifiedDistance = (molecularParam * distanceToOrigin) / (this.d * distanceToOrigin + this.r);
      const [nodeX, nodeY] = position;
      const [originX, originY] = origin;
      const cos = (nodeX - originX) / distanceToOrigin;
      const sin = (nodeY - originY) / distanceToOrigin;

      const newPoint: Point = [originX + magnifiedDistance * cos, originY + magnifiedDistance * sin];
      const nodeId = idOf(datum);

      const style = this.getNodeStyle(datum);
      const originStyle = pick(graph.getElementRenderStyle(nodeId), Object.keys(style));

      magnifiedStyleMap.set(nodeId, { ...toPointObject(newPoint), ...style });
      originStyleMap.set(nodeId, { ...toPointObject(position), ...originStyle });
    });

    this.updateStyle(magnifiedStyleMap, originStyleMap);
  };

  private getNodeStyle = (datum: NodeData) => {
    const { nodeStyle } = this.options;
    return typeof nodeStyle === 'function' ? nodeStyle(datum) : nodeStyle;
  };

  private updateStyle = (magnifiedStyleMap: Map<ID, NodeStyle>, originStyleMap: Map<ID, NodeStyle>) => {
    const { graph, element } = this.context;

    const { enter, exit, keep } = arrayDiff<ID>(
      Array.from(this.prevMagnifiedStyleMap.keys()),
      Array.from(magnifiedStyleMap.keys()),
      (d) => d,
    );

    const relatedEdges = new Set<ID>();

    const update = (nodeId: ID, style: NodeStyle) => {
      const node = element!.getElement(nodeId) as Node;
      node?.update(style);

      graph.getRelatedEdgesData(nodeId).forEach((datum) => {
        relatedEdges.add(idOf(datum));
      });
    };

    [...enter, ...keep].forEach((nodeId) => {
      update(nodeId, magnifiedStyleMap.get(nodeId)!);
    });

    exit.forEach((nodeId) => {
      update(nodeId, this.prevOriginStyleMap.get(nodeId)!);
      this.prevOriginStyleMap.delete(nodeId);
    });

    relatedEdges.forEach((edgeId) => {
      const edge = element!.getElement(edgeId);
      edge?.update({});
    });

    this.prevMagnifiedStyleMap = magnifiedStyleMap;
    originStyleMap.forEach((style, nodeId) => {
      if (!this.prevOriginStyleMap.has(nodeId)) {
        this.prevOriginStyleMap.set(nodeId, style);
      }
    });
  };

  private isWheelValid = (event: WheelEvent) => {
    if (this.options.preventDefault) event.preventDefault();

    if (!this.isLensOn) return false;

    const { clientX, clientY } = event;
    const scaleOrigin = this.context.graph.getCanvasByClient([clientX, clientY]);
    const origin = this.lens.getCenter();
    if (distance(scaleOrigin, origin) > this.r) return false;

    return true;
  };

  private scaleR = (positive: boolean) => {
    const { maxR, minR } = this.options;
    const ratio = positive ? 1 / (1 - R_DELTA) : 1 - R_DELTA;
    const canvasR = Math.min(...this.context.canvas.getSize()) / 2;
    this.r = Math.max(minR || 0, Math.min(maxR || canvasR, this.r * ratio));
  };

  private scaleD = (positive: boolean) => {
    const { maxD, minD } = this.options as Required<FisheyeOptions>;
    const newD = positive ? this.d + D_DELTA : this.d - D_DELTA;
    this.d = Math.max(minD, Math.min(maxD, newD));
  };

  private scaleRByWheel = (event: WheelEvent) => {
    if (!this.isWheelValid(event)) return;

    const { deltaX, deltaY } = event;
    this.scaleR(deltaX + deltaY > 0);

    const origin = this.lens.getCenter();
    this.onMagnify(origin);
  };

  private scaleDByWheel = (event: WheelEvent) => {
    if (!this.isWheelValid(event)) return;

    const { deltaX, deltaY } = event;
    this.scaleD(deltaX + deltaY > 0);

    const origin = this.lens.getCenter();
    this.onMagnify(origin);
  };

  private isDragValid = (event: IDragEvent) => {
    if (this.options.preventDefault) event.preventDefault();

    if (!this.isLensOn) return false;

    const dragOrigin = parsePoint(event.canvas as PointObject);
    const origin = this.lens.getCenter();
    if (distance(dragOrigin, origin) > this.r) return false;

    return true;
  };

  private isLensDragging = false;

  private onDragStart = (event: IDragEvent) => {
    if (!this.isDragValid(event)) return;

    this.isLensDragging = true;
  };

  private onDrag = (event: IDragEvent) => {
    if (!this.isLensDragging) return;

    const dragOrigin = parsePoint(event.canvas as PointObject);
    this.onMagnify(dragOrigin);
  };

  private onDragEnd = () => {
    this.isLensDragging = false;
  };

  private scaleRByDrag = (event: IDragEvent) => {
    if (!this.isLensDragging) return;

    const { dx, dy } = event;
    this.scaleR(dx - dy > 0);

    const origin = this.lens.getCenter();
    this.onMagnify(origin);
  };

  private scaleDByDrag = (event: IDragEvent) => {
    if (!this.isLensDragging) return;

    const { dx, dy } = event;
    this.scaleD(dx - dy > 0);

    const origin = this.lens.getCenter();
    this.onMagnify(origin);
  };

  get graphDom() {
    return this.context.graph.getCanvas().getContextService().getDomElement();
  }

  private bindEvents() {
    const { graph } = this.context;
    const { trigger, scaleRBy, scaleDBy } = this.options;

    const canvas = graph.getCanvas().getLayer();

    if (['click', 'drag'].includes(trigger)) {
      canvas.addEventListener(CommonEvent.CLICK, this.onCreateFisheye);
    }

    if (trigger === 'pointermove') {
      canvas.addEventListener(CommonEvent.POINTER_MOVE, this.onCreateFisheye);
    }

    if (trigger === 'drag' || scaleRBy === 'drag' || scaleDBy === 'drag') {
      canvas.addEventListener(CommonEvent.DRAG_START, this.onDragStart);
      canvas.addEventListener(CommonEvent.DRAG_END, this.onDragEnd);

      const dragFunc = trigger === 'drag' ? this.onDrag : scaleRBy === 'drag' ? this.scaleRByDrag : this.scaleDByDrag;
      canvas.addEventListener(CommonEvent.DRAG, dragFunc);
    }

    if (scaleRBy === 'wheel' || scaleDBy === 'wheel') {
      const wheelFunc = scaleRBy === 'wheel' ? this.scaleRByWheel : this.scaleDByWheel;
      this.graphDom?.addEventListener(CommonEvent.WHEEL, wheelFunc, { passive: false });
    }
  }

  private unbindEvents() {
    const { graph } = this.context;
    const { trigger, scaleRBy, scaleDBy } = this.options;

    const canvas = graph.getCanvas().getLayer();

    if (['click', 'drag'].includes(trigger)) {
      canvas.removeEventListener(CommonEvent.CLICK, this.onCreateFisheye);
    }

    if (trigger === 'pointermove') {
      canvas.removeEventListener(CommonEvent.POINTER_MOVE, this.onCreateFisheye);
    }

    if (trigger === 'drag' || scaleRBy === 'drag' || scaleDBy === 'drag') {
      canvas.removeEventListener(CommonEvent.DRAG_START, this.onDragStart);
      canvas.removeEventListener(CommonEvent.DRAG_END, this.onDragEnd);

      const dragFunc = trigger === 'drag' ? this.onDrag : scaleRBy === 'drag' ? this.scaleRByDrag : this.scaleDByDrag;
      canvas.removeEventListener(CommonEvent.DRAG, dragFunc);
    }

    if (scaleRBy === 'wheel' || scaleDBy === 'wheel') {
      const wheelFunc = scaleRBy === 'wheel' ? this.scaleRByWheel : this.scaleDByWheel;
      this.graphDom?.removeEventListener(CommonEvent.WHEEL, wheelFunc);
    }
  }

  public update(options: Partial<FisheyeOptions>) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  public destroy() {
    this.unbindEvents();
    if (this.isLensOn) {
      this.lens?.destroy();
    }
    this.prevMagnifiedStyleMap.clear();
    this.prevOriginStyleMap.clear();
    super.destroy();
  }
}
