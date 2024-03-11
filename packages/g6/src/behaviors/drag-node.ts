import type { BaseStyleProps, FederatedMouseEvent } from '@antv/g';
import { Rect } from '@antv/g';
import { ID } from '@antv/graphlib';
import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import { RuntimeContext } from '../runtime/types';
import type { BehaviorEvent, EdgeDirection, Point, PrefixObject } from '../types';
import { getBBoxSize, getCombinedBBox } from '../utils/bbox';
import { idOf } from '../utils/id';
import { subStyleProps } from '../utils/prefix';
import { subtract } from '../utils/vector';
import { BaseBehavior, BaseBehaviorOptions } from './base-behavior';

export interface DragNodeOptions extends BaseBehaviorOptions, PrefixObject<BaseStyleProps, 'shadow'> {
  /**
   * <zh/> 是否启用拖拽动画
   *
   * <en/> Whether to enable drag animation
   */
  animation: boolean;
  /**
   * <zh/> 是否启用拖拽节点的功能
   *
   * <en/> Whether to enable the function of dragging the node
   */
  enable?: boolean | ((event: BehaviorEvent<FederatedMouseEvent> | BehaviorEvent<KeyboardEvent>) => boolean);
  /**
   * <zh/> 节点选中的状态，启用多选时会基于该状态查找选中的节点
   *
   * <en/> The state name of the selected node, when multi-selection is enabled, the selected nodes will be found based on this state
   */
  state?: string;
  /**
   * <zh/> 拖拽时隐藏的边
   * - none: 不隐藏
   * - out: 隐藏以节点为源节点的边
   * - in: 隐藏以节点为目标节点的边
   * - both: 隐藏与节点相关的所有边
   * - all: 隐藏图中所有边
   *
   * <en/> Edges hidden during dragging
   * - none: do not hide
   * - out: hide the edges with the node as the source node
   * - in: hide the edges with the node as the target node
   * - both: hide all edges related to the node
   * - all: hide all edges in the graph
   * @description
   * <zh/> 使用幽灵节点时不会隐藏边
   *
   * <en/> Edges will not be hidden when using the drag shadow
   */
  hideEdges?: 'none' | 'all' | EdgeDirection;
  /**
   * <zh/> 是否启用幽灵节点，即用一个图形代替节点跟随鼠标移动
   *
   * <en/> Whether to enable the drag shadow, that is, use a shape to replace the node to follow the mouse movement
   */
  shadow?: boolean;
  /**
   * <zh/> 完成拖拽时的回调
   *
   * <en/> Callback when dragging is completed
   */
  onfinish?: (ids: ID[]) => void;
}

export class DragNode extends BaseBehavior<DragNodeOptions> {
  static defaultOptions: Partial<DragNodeOptions> = {
    animation: true,
    enable: true,
    state: 'selected',
    hideEdges: 'none',
    shadowZIndex: 100,
    shadowFill: '#F3F9FF',
    shadowFillOpacity: 0.5,
    shadowStroke: '#1890FF',
    shadowStrokeOpacity: 0.9,
    shadowLineDash: [5, 5],
  };

  private enable: boolean = false;

  private target: ID[] = [];

  private shadow?: Rect;

  private shadowOrigin: Point = [0, 0];

  private hiddenEdges: ID[] = [];

  private get animation() {
    if (!this.options.shadow) return false;
    return this.options.animation;
  }

  constructor(context: RuntimeContext, options: DragNodeOptions) {
    super(context, Object.assign({}, DragNode.defaultOptions, options));
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    graph.on(`node:${CommonEvent.DRAG_START}`, this.onDragStart);
    graph.on(`node:${CommonEvent.DRAG}`, this.onDrag);
    graph.on(`node:${CommonEvent.DRAG_END}`, this.onDragEnd);
  }

  private getSelectedNodeIDs(currTarget: ID[]) {
    return Array.from(
      new Set(
        this.context.graph
          .getElementDataByState('node', this.options.state)
          .map((node) => node.id)
          .concat(currTarget),
      ),
    );
  }

  private onDragStart = (event: DragEvent) => {
    this.enable = this.validate(event);
    if (!this.enable) return;

    this.target = this.getSelectedNodeIDs([event.target.id]);
    this.hideEdges();
    if (this.options.shadow) this.createShadow(this.target);
  };

  private onDrag = (event: DragEvent) => {
    if (!this.enable) return;
    const { dx, dy } = event;

    if (this.options.shadow) this.moveShadow([dx, dy]);
    else this.moveNode(this.target, [dx, dy]);
  };

  private onDragEnd = () => {
    this.enable = false;
    if (this.options.shadow) {
      if (!this.shadow) return;
      this.shadow.style.visibility = 'hidden';
      const { x = 0, y = 0 } = this.shadow.attributes;
      const [dx, dy] = subtract([+x, +y], this.shadowOrigin);
      this.moveNode(this.target, [dx, dy]);
    }
    this.showEdges();
    this.options.onfinish?.(this.target);
    this.target = [];
  };

  private validate(event: DragEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private moveNode(ids: ID[], offset: Point) {
    this.context.graph.translateElementBy(Object.fromEntries(ids.map((id) => [id, offset])), this.animation);
  }

  private moveShadow(offset: Point) {
    if (!this.shadow) return;
    const { x = 0, y = 0 } = this.shadow.attributes;
    const [dx, dy] = offset;
    this.shadow.attr({ x: +x + dx, y: +y + dy });
  }

  private createShadow(target: ID[]) {
    const shadowStyle = subStyleProps(this.options, 'shadow');

    const bbox = getCombinedBBox(target.map((id) => this.context.element!.getElement(id)!.getBounds()));
    const [x, y] = bbox.min;
    this.shadowOrigin = [x, y];
    const [width, height] = getBBoxSize(bbox);
    const positionStyle = { width, height, x, y };

    if (this.shadow) {
      this.shadow.attr({
        ...shadowStyle,
        ...positionStyle,
        visibility: 'visible',
      });
    } else {
      this.shadow = new Rect({
        style: {
          ...shadowStyle,
          ...positionStyle,
          pointerEvents: 'none',
          // @ts-expect-error $layer is not in the type definition
          $layer: 'transient',
        },
      });
      this.context.canvas.appendChild(this.shadow);
    }
  }

  private showEdges() {
    if (this.options.shadow || this.hiddenEdges.length === 0) return;
    this.context.graph.setElementVisibility(Object.fromEntries(this.hiddenEdges.map((id) => [id, 'visible'])));
    this.hiddenEdges = [];
  }

  private hideEdges() {
    const { hideEdges, shadow } = this.options;
    if (hideEdges === 'none' || shadow) return;
    const { graph } = this.context;
    let hiddenEdges: ID[] = [];
    if (hideEdges === 'all') {
      hiddenEdges = graph.getEdgeData().map((edge) => idOf(edge));
    } else {
      const edgeSet = new Set<ID>();
      this.target.forEach((id) => {
        graph.getRelatedEdgesData(id, hideEdges).forEach((edge) => edgeSet.add(idOf(edge)));
      });
      hiddenEdges = Array.from(edgeSet);
    }
    this.hiddenEdges = hiddenEdges;
    graph.setElementVisibility(Object.fromEntries(this.hiddenEdges.map((id) => [id, 'hidden'])));
  }

  public destroy() {
    this.context.graph.off(`node:${CommonEvent.DRAG_START}`, this.onDragStart);
    this.context.graph.off(`node:${CommonEvent.DRAG}`, this.onDrag);
    this.context.graph.off(`node:${CommonEvent.DRAG_END}`, this.onDragEnd);
    this.shadow?.destroy();
    super.destroy();
  }
}

interface DragEvent extends BehaviorEvent<FederatedMouseEvent> {
  dx: number;
  dy: number;
}
