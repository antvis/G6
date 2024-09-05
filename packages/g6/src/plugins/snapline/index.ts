import { AABB, BaseStyleProps, DisplayObject, Line, LineStyleProps } from '@antv/g';
import { isEqual } from '@antv/util';
import { NodeEvent } from '../../constants';
import type { RuntimeContext } from '../../runtime/types';
import type { ID, IDragEvent, Node } from '../../types';
import { isVisible } from '../../utils/element';
import { divide } from '../../utils/vector';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';

/**
 * <zh/> 对齐线插件配置项
 *
 * <en/> Snapline plugin options
 */
export interface SnaplineOptions extends BasePluginOptions {
  /**
   * <zh/> 对齐精度，即移动节点时与目标位置的距离小于 tolerance 时触发显示对齐线
   *
   * <en/> The alignment accuracy, that is, when the distance between the moved node and the target position is less than tolerance, the alignment line is displayed
   * @defaultValue 5
   */
  tolerance?: number;
  /**
   * <zh/> 对齐线头尾的延伸距离。取值范围：[0, Infinity]
   *
   * <en/> The extension distance of the snapline. The value range is [0, Infinity]
   * @defaultValue 20
   */
  offset?: number;
  /**
   * <zh/> 是否启用自动吸附
   *
   * <en/> Whether to enable automatic adsorption
   * @defaultValue true
   */
  autoSnap?: boolean;
  /**
   * <zh/> 指定元素上的哪个图形作为参照图形
   *
   * <en/> Specifies which shape on the element to use as the reference shape
   * @defaultValue `'key'`
   * @remarks
   * <zh/>
   * - 'key' 使用元素的主图形作为参照图形
   * - 也可以传入一个函数，接收元素对象，返回一个图形
   *
   * <en/>
   * - `'key'` uses the key shape of the element as the reference shape
   * - You can also pass in a function that receives the element and returns a shape
   */
  shape?: string | ((node: Node) => DisplayObject);
  /**
   * <zh/> 垂直对齐线样式
   *
   * <en/> Vertical snapline style
   * @defaultValue `{ stroke: '#1783FF' }`
   */
  verticalLineStyle?: BaseStyleProps;
  /**
   * <zh/> 水平对齐线样式
   *
   * <en/> Horizontal snapline style
   * @defaultValue `{ stroke: '#1783FF' }`
   */
  horizontalLineStyle?: BaseStyleProps;
  /**
   * <zh/> 过滤器，用于过滤不需要作为参考的节点
   *
   * <en/> Filter, used to filter nodes that do not need to be used as references
   * @defaultValue `() => true`
   */
  filter?: (node: Node) => boolean;
}

const defaultLineStyle: LineStyleProps = { x1: 0, y1: 0, x2: 0, y2: 0, visibility: 'hidden' };

type Metadata = {
  verticalX: number | null;
  verticalMinY: number | null;
  verticalMaxY: number | null;
  horizontalY: number | null;
  horizontalMinX: number | null;
  horizontalMaxX: number | null;
};

/**
 * <zh/> 对齐线插件
 *
 * <en/> Snapline plugin
 */
export class Snapline extends BasePlugin<SnaplineOptions> {
  static defaultOptions: Partial<SnaplineOptions> = {
    tolerance: 5,
    offset: 20,
    autoSnap: true,
    shape: 'key',
    verticalLineStyle: { stroke: '#1783FF' },
    horizontalLineStyle: { stroke: '#1783FF' },
    filter: () => true,
  };

  private horizontalLine!: Line;
  private verticalLine!: Line;

  constructor(context: RuntimeContext, options: SnaplineOptions) {
    super(context, Object.assign({}, Snapline.defaultOptions, options));
    this.bindEvents();
  }

  private initSnapline = () => {
    const canvas = this.context.canvas.getLayer('transient');

    if (!this.horizontalLine) {
      this.horizontalLine = canvas.appendChild(
        new Line({ style: { ...defaultLineStyle, ...this.options.horizontalLineStyle } }),
      );
    }

    if (!this.verticalLine) {
      this.verticalLine = canvas.appendChild(
        new Line({ style: { ...defaultLineStyle, ...this.options.verticalLineStyle } }),
      );
    }
  };

  private getNodes(): Node[] {
    const { filter } = this.options;
    const allNodes = this.context.element?.getNodes() || [];

    // 不考虑超出画布视口范围、不可见的节点
    // Nodes that are out of the canvas viewport range, invisible are not considered
    const nodes = allNodes.filter((node) => {
      return isVisible(node) && this.context.viewport?.isInViewport(node.getRenderBounds());
    });

    if (!filter) return nodes;

    return nodes.filter((node) => filter(node));
  }

  private hideSnapline() {
    this.horizontalLine.style.visibility = 'hidden';
    this.verticalLine.style.visibility = 'hidden';
  }

  private getLineWidth(direction: 'horizontal' | 'vertical') {
    const { lineWidth } = this.options[`${direction}LineStyle`] as LineStyleProps;
    return +(lineWidth || defaultLineStyle.lineWidth || 1) / this.context.graph.getZoom();
  }

  private updateSnapline(metadata: Metadata) {
    const { verticalX, verticalMinY, verticalMaxY, horizontalY, horizontalMinX, horizontalMaxX } = metadata;
    const [canvasWidth, canvasHeight] = this.context.canvas.getSize();
    const { offset } = this.options;

    if (horizontalY !== null) {
      Object.assign(this.horizontalLine.style, {
        x1: offset === Infinity ? 0 : horizontalMinX! - offset,
        y1: horizontalY,
        x2: offset === Infinity ? canvasWidth : horizontalMaxX! + offset,
        y2: horizontalY,
        visibility: 'visible',
        lineWidth: this.getLineWidth('horizontal'),
      });
    } else {
      this.horizontalLine.style.visibility = 'hidden';
    }

    if (verticalX !== null) {
      Object.assign(this.verticalLine.style, {
        x1: verticalX,
        y1: offset === Infinity ? 0 : verticalMinY! - offset,
        x2: verticalX,
        y2: offset === Infinity ? canvasHeight : verticalMaxY! + offset,
        visibility: 'visible',
        lineWidth: this.getLineWidth('vertical'),
      });
    } else {
      this.verticalLine.style.visibility = 'hidden';
    }
  }

  private isHorizontalSticking = false;
  private isVerticalSticking = false;
  private enableStick = true;

  private autoSnapToLine = async (nodeId: ID, bbox: AABB, metadata: Metadata) => {
    const { verticalX, horizontalY } = metadata;
    const { tolerance } = this.options;
    const {
      min: [nodeMinX, nodeMinY],
      max: [nodeMaxX, nodeMaxY],
      center: [nodeCenterX, nodeCenterY],
    } = bbox;

    let dx = 0;
    let dy = 0;
    if (verticalX !== null) {
      if (distance(nodeMaxX, verticalX) < tolerance) dx = verticalX - nodeMaxX;
      if (distance(nodeMinX, verticalX) < tolerance) dx = verticalX - nodeMinX;
      if (distance(nodeCenterX, verticalX) < tolerance) dx = verticalX - nodeCenterX;

      if (dx !== 0) this.isVerticalSticking = true;
    }
    if (horizontalY !== null) {
      if (distance(nodeMaxY, horizontalY) < tolerance) dy = horizontalY - nodeMaxY;
      if (distance(nodeMinY, horizontalY) < tolerance) dy = horizontalY - nodeMinY;
      if (distance(nodeCenterY, horizontalY) < tolerance) dy = horizontalY - nodeCenterY;

      if (dy !== 0) this.isHorizontalSticking = true;
    }
    if (dx !== 0 || dy !== 0) {
      // Stick to the line
      await this.context.graph.translateElementBy({ [nodeId]: [dx, dy] }, false);
    }
  };

  /**
   * Get the delta of the drag
   * @param event - drag event object
   * @returns delta
   * @internal
   */
  protected getDelta(event: IDragEvent<Node>) {
    const zoom = this.context.graph.getZoom();
    return divide([event.dx, event.dy], zoom);
  }

  private enableSnap = (event: IDragEvent<Node>) => {
    const { target } = event;

    const threshold = 0.5;

    if (this.isHorizontalSticking || this.isVerticalSticking) {
      const [dx, dy] = this.getDelta(event);
      if (
        this.isHorizontalSticking &&
        this.isVerticalSticking &&
        Math.abs(dx) <= threshold &&
        Math.abs(dy) <= threshold
      ) {
        this.context.graph.translateElementBy({ [target.id]: [-dx, -dy] }, false);
        return false;
      } else if (this.isHorizontalSticking && Math.abs(dy) <= threshold) {
        this.context.graph.translateElementBy({ [target.id]: [0, -dy] }, false);
        return false;
      } else if (this.isVerticalSticking && Math.abs(dx) <= threshold) {
        this.context.graph.translateElementBy({ [target.id]: [-dx, 0] }, false);
        return false;
      } else {
        this.isHorizontalSticking = false;
        this.isVerticalSticking = false;
        this.enableStick = false;
        setTimeout(() => {
          this.enableStick = true;
        }, 200);
      }
    }

    return this.enableStick;
  };

  private calcSnaplineMetadata = (target: Node, nodeBBox: AABB): Metadata => {
    const { tolerance, shape } = this.options;

    const {
      min: [nodeMinX, nodeMinY],
      max: [nodeMaxX, nodeMaxY],
      center: [nodeCenterX, nodeCenterY],
    } = nodeBBox;

    let verticalX: number | null = null;
    let verticalMinY: number | null = null;
    let verticalMaxY: number | null = null;
    let horizontalY: number | null = null;
    let horizontalMinX: number | null = null;
    let horizontalMaxX: number | null = null;

    this.getNodes().some((snapNode: Node) => {
      if (isEqual(target.id, snapNode.id)) return false;

      const snapBBox = getShape(snapNode, shape).getRenderBounds();
      const {
        min: [snapMinX, snapMinY],
        max: [snapMaxX, snapMaxY],
        center: [snapCenterX, snapCenterY],
      } = snapBBox;

      if (verticalX === null) {
        if (distance(snapCenterX, nodeCenterX) < tolerance) {
          verticalX = snapCenterX;
        } else if (distance(snapMinX, nodeMinX) < tolerance) {
          verticalX = snapMinX;
        } else if (distance(snapMinX, nodeMaxX) < tolerance) {
          verticalX = snapMinX;
        } else if (distance(snapMaxX, nodeMaxX) < tolerance) {
          verticalX = snapMaxX;
        } else if (distance(snapMaxX, nodeMinX) < tolerance) {
          verticalX = snapMaxX;
        }

        if (verticalX !== null) {
          verticalMinY = Math.min(snapMinY, nodeMinY);
          verticalMaxY = Math.max(snapMaxY, nodeMaxY);
        }
      }

      if (horizontalY === null) {
        if (distance(snapCenterY, nodeCenterY) < tolerance) {
          horizontalY = snapCenterY;
        } else if (distance(snapMinY, nodeMinY) < tolerance) {
          horizontalY = snapMinY;
        } else if (distance(snapMinY, nodeMaxY) < tolerance) {
          horizontalY = snapMinY;
        } else if (distance(snapMaxY, nodeMaxY) < tolerance) {
          horizontalY = snapMaxY;
        } else if (distance(snapMaxY, nodeMinY) < tolerance) {
          horizontalY = snapMaxY;
        }

        if (horizontalY !== null) {
          horizontalMinX = Math.min(snapMinX, nodeMinX);
          horizontalMaxX = Math.max(snapMaxX, nodeMaxX);
        }
      }

      return verticalX !== null && horizontalY !== null;
    });
    return { verticalX, verticalMinY, verticalMaxY, horizontalY, horizontalMinX, horizontalMaxX };
  };

  protected onDragStart = () => {
    this.initSnapline();
  };

  protected onDrag = async (event: IDragEvent<Node>) => {
    const { target } = event;

    if (this.options.autoSnap) {
      const enable = this.enableSnap(event);
      if (!enable) return;
    }

    const nodeBBox = getShape(target, this.options.shape).getRenderBounds();
    const metadata = this.calcSnaplineMetadata(target, nodeBBox);

    this.hideSnapline();

    if (metadata.verticalX !== null || metadata.horizontalY !== null) {
      this.updateSnapline(metadata);
    }

    if (this.options.autoSnap) {
      await this.autoSnapToLine(target.id, nodeBBox, metadata);
    }
  };

  protected onDragEnd = () => {
    this.hideSnapline();
  };

  private async bindEvents() {
    const { graph } = this.context;
    graph.on(NodeEvent.DRAG_START, this.onDragStart);
    graph.on(NodeEvent.DRAG, this.onDrag);
    graph.on(NodeEvent.DRAG_END, this.onDragEnd);
  }

  private unbindEvents() {
    const { graph } = this.context;
    graph.off(NodeEvent.DRAG_START, this.onDragStart);
    graph.off(NodeEvent.DRAG, this.onDrag);
    graph.off(NodeEvent.DRAG_END, this.onDragEnd);
  }

  private destroyElements() {
    this.horizontalLine?.destroy();
    this.verticalLine?.destroy();
  }

  public destroy() {
    this.destroyElements();
    this.unbindEvents();
    super.destroy();
  }
}

const distance = (a: number, b: number) => Math.abs(a - b);

const getShape = (node: Node, shapeFilter: string | ((node: Node) => DisplayObject)) => {
  return typeof shapeFilter === 'function' ? shapeFilter(node) : node.getShape(shapeFilter);
};
