import { AABB, BaseStyleProps, DisplayObject, Line, LineStyleProps } from '@antv/g';
import { isEqual } from '@antv/util';
import { NodeEvent } from '../../constants';
import type { RuntimeContext } from '../../runtime/types';
import type { ID, Node } from '../../types';
import { IPointerEvent } from '../../types';
import { idOf } from '../../utils/id';
import { positionOf } from '../../utils/position';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';

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
  auto?: boolean;
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
  filter?: (nodeId: string) => boolean;
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

export class Snapline extends BasePlugin<SnaplineOptions> {
  static defaultOptions: Partial<SnaplineOptions> = {
    tolerance: 5,
    offset: 20,
    auto: true,
    shape: 'key',
    verticalLineStyle: { stroke: '#1783FF' },
    horizontalLineStyle: { stroke: '#1783FF' },
    filter: () => true,
  };

  private horizontalLine!: Line;
  private verticalLine!: Line;

  private isFrozen = false;

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

  private getNodes() {
    const { filter } = this.options;
    const { model } = this.context;
    const nodeData = model.getNodeData();

    if (!filter) return nodeData;

    return nodeData.filter((datum) => filter(datum.id));
  }

  private hideSnapline() {
    this.horizontalLine.style.visibility = 'hidden';
    this.verticalLine.style.visibility = 'hidden';
  }

  private updateSnapline(metadata: Metadata) {
    const { verticalX, verticalMinY, verticalMaxY, horizontalY, horizontalMinX, horizontalMaxX } = metadata;
    const [canvasWidth, canvasHeight] = this.context.canvas.getSize();
    const { offset } = this.options;

    if (horizontalY !== null) {
      this.horizontalLine.style.x1 = offset === Infinity ? 0 : horizontalMinX! - offset;
      this.horizontalLine.style.y1 = horizontalY;
      this.horizontalLine.style.x2 = offset === Infinity ? canvasWidth : horizontalMaxX! + offset;
      this.horizontalLine.style.y2 = horizontalY;
      this.horizontalLine.style.visibility = 'visible';
    } else {
      this.horizontalLine.style.visibility = 'hidden';
    }

    if (verticalX !== null) {
      this.verticalLine.style.x1 = verticalX;
      this.verticalLine.style.y1 = offset === Infinity ? 0 : verticalMinY! - offset;
      this.verticalLine.style.x2 = verticalX;
      this.verticalLine.style.y2 = offset === Infinity ? canvasHeight : verticalMaxY! + offset;
      this.verticalLine.style.visibility = 'visible';
    } else {
      this.verticalLine.style.visibility = 'hidden';
    }
  }

  private snapToLine = async (nodeId: ID, bbox: AABB, metadata: Metadata) => {
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
    }
    if (horizontalY !== null) {
      if (distance(nodeMaxY, horizontalY) < tolerance) dy = horizontalY - nodeMaxY;
      if (distance(nodeMinY, horizontalY) < tolerance) dy = horizontalY - nodeMinY;
      if (distance(nodeCenterY, horizontalY) < tolerance) dy = horizontalY - nodeCenterY;
    }
    if ((dx !== 0 || dy !== 0) && !this.isFrozen) {
      const nodeDatum = this.context.model.getNodeLikeDatum(nodeId);
      const [x, y] = positionOf(nodeDatum);
      this.context.model.updateNodeData([{ id: nodeId, style: { x: x + dx, y: y + dy } }]);
      await this.context.element?.draw({ silence: true, animation: false });
      this.isFrozen = true;

      setTimeout(() => {
        this.isFrozen = false;
      }, 200);
    }
  };

  protected onDragStart = () => {
    this.initSnapline();
  };

  protected onDrag = async (event: IPointerEvent<Node>) => {
    const { target } = event;
    const { tolerance, shape } = this.options;

    let verticalX: number | null = null;
    let verticalMinY: number | null = null;
    let verticalMaxY: number | null = null;
    let horizontalY: number | null = null;
    let horizontalMinX: number | null = null;
    let horizontalMaxX: number | null = null;

    const nodeBBox = getShape(target, shape).getRenderBounds();
    const {
      min: [nodeMinX, nodeMinY],
      max: [nodeMaxX, nodeMaxY],
      center: [nodeCenterX, nodeCenterY],
    } = nodeBBox;

    this.getNodes().some((targetNode) => {
      if (isEqual(target.id, idOf(targetNode))) return false;

      const snapElement = this.context.element?.getElement(idOf(targetNode)) as Node;
      const snapBBox = getShape(snapElement, shape).getRenderBounds();
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
          verticalMinY = Math.min(snapMinY, snapMinY);
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

      return verticalX !== null || horizontalY !== null;
    });

    this.hideSnapline();

    const metadata: Metadata = { verticalX, verticalMinY, verticalMaxY, horizontalY, horizontalMinX, horizontalMaxX };

    if (verticalX !== null || horizontalY !== null) {
      this.updateSnapline(metadata);
    }

    if (this.options.auto) {
      await this.snapToLine(target.id, nodeBBox, metadata);
    }
  };

  protected onDragEnd = () => {
    this.hideSnapline();
  };

  private bindEvents() {
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

  private remove() {
    const canvas = this.context.canvas.getLayer('transient');
    canvas.removeChild(this.horizontalLine);
    canvas.removeChild(this.verticalLine);
  }

  public destroy() {
    this.remove();
    this.unbindEvents();
    super.destroy();
  }
}

const distance = (a: number, b: number) => Math.abs(a - b);

const getShape = (node: Node, shapeFilter: string | ((node: Node) => DisplayObject)) => {
  return typeof shapeFilter === 'function' ? shapeFilter(node) : node.getShape(shapeFilter);
};
