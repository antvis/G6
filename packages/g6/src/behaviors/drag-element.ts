import type { BaseStyleProps } from '@antv/g';
import { Rect } from '@antv/g';
import { isFunction } from '@antv/util';
import { COMBO_KEY, CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { EdgeDirection, Element, ID, IDragEvent, Point, PrefixObject } from '../types';
import { getBBoxSize, getCombinedBBox } from '../utils/bbox';
import { idOf } from '../utils/id';
import { subStyleProps } from '../utils/prefix';
import { divide, subtract } from '../utils/vector';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

export interface DragElementOptions extends BaseBehaviorOptions, PrefixObject<BaseStyleProps, 'shadow'> {
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
  enable?: boolean | ((event: IElementDragEvent) => boolean);
  /**
   * <zh/> 拖拽操作效果
   * - link: 将拖拽元素置入为目标元素的子元素
   * - move: 移动元素并更新父元素尺寸
   * - none: 仅更新拖拽目标位置，不做任何额外操作
   *
   * <en/> Drag operation effect
   * - link: Place the drag element as a child element of the target element
   * - move: Move the element and update the parent element size
   * - none: Only update the drag target position, no additional operations
   * @remarks
   * <zh/> combo 元素可作为元素容器置入 node 或 combo 元素
   *
   * <en/> The combo element can be placed as an element container into the node or combo element
   */
  dropEffect: 'link' | 'move' | 'none';
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
   * @remarks
   * <zh/> 使用幽灵节点时不会隐藏边
   *
   * <en/> Edges will not be hidden when using the drag shadow
   */
  hideEdge?: 'none' | 'all' | EdgeDirection;
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
  onFinish?: (ids: ID[]) => void;
}

export class DragElement extends BaseBehavior<DragElementOptions> {
  static defaultOptions: Partial<DragElementOptions> = {
    animation: true,
    enable: (event) => ['node', 'combo'].includes(event.targetType),
    dropEffect: 'move',
    state: 'selected',
    hideEdge: 'none',
    shadowZIndex: 100,
    shadowFill: '#F3F9FF',
    shadowFillOpacity: 0.5,
    shadowStroke: '#1890FF',
    shadowStrokeOpacity: 0.9,
    shadowLineDash: [5, 5],
  };

  protected enable: boolean = false;

  private enableElements = ['node', 'combo'];

  protected target: ID[] = [];

  private shadow?: Rect;

  private shadowOrigin: Point = [0, 0];

  private hiddenEdges: ID[] = [];

  private get animation() {
    if (!this.options.shadow) return false;
    return this.options.animation;
  }

  constructor(context: RuntimeContext, options: DragElementOptions) {
    super(context, Object.assign({}, DragElement.defaultOptions, options));
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.bindEvents();
  }

  public update(options: Partial<DragElementOptions>): void {
    super.update(options);
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();

    this.enableElements.forEach((type) => {
      graph.on(`${type}:${CommonEvent.DRAG_START}`, this.onDragStart);
      graph.on(`${type}:${CommonEvent.DRAG}`, this.onDrag);
      graph.on(`${type}:${CommonEvent.DRAG_END}`, this.onDragEnd);
    });

    if (['link'].includes(this.options.dropEffect)) {
      graph.on(`combo:${CommonEvent.DROP}`, this.onDrop);
      graph.on(`canvas:${CommonEvent.DROP}`, this.onDrop);
    }
  }

  protected getSelectedNodeIDs(currTarget: ID[]) {
    return Array.from(
      new Set(
        this.context.graph
          .getElementDataByState('node', this.options.state)
          .map((node) => node.id)
          .concat(currTarget),
      ),
    );
  }

  protected getDelta(event: IElementDragEvent) {
    const zoom = this.context.graph.getZoom();
    return divide([event.dx, event.dy], zoom);
  }

  protected onDragStart(event: IElementDragEvent) {
    this.enable = this.validate(event);
    if (!this.enable) return;

    this.context.batch?.startBatch();
    this.target = this.getSelectedNodeIDs([event.target.id]);
    this.hideEdge();
    this.context.graph.frontElement(this.target);
    if (this.options.shadow) this.createShadow(this.target);
  }

  protected onDrag(event: IElementDragEvent) {
    if (!this.enable) return;
    const delta = this.getDelta(event);

    if (this.options.shadow) this.moveShadow(delta);
    else this.moveElement(this.target, delta);
  }

  protected onDragEnd() {
    this.enable = false;
    if (this.options.shadow) {
      if (!this.shadow) return;
      this.shadow.style.visibility = 'hidden';
      const { x = 0, y = 0 } = this.shadow.attributes;
      const [dx, dy] = subtract([+x, +y], this.shadowOrigin);
      this.moveElement(this.target, [dx, dy]);
    }
    this.showEdges();
    this.options.onFinish?.(this.target);
    this.context.batch?.endBatch();
    this.target = [];
  }

  private onDrop = async (event: IElementDragEvent) => {
    if (this.options.dropEffect !== 'link') return;
    const { model, element } = this.context;
    const modifiedParentId = event.target.id;
    this.target.forEach((id) => {
      const originalParent = model.getParentData(id, COMBO_KEY);
      // 如果是在原父 combo 内部拖拽，需要刷新 combo 数据
      // If it is a drag and drop within the original parent combo, you need to refresh the combo data
      if (originalParent && idOf(originalParent) === modifiedParentId) {
        model.refreshComboData(modifiedParentId);
      }
      model.setParent(id, modifiedParentId, COMBO_KEY);
    });
    await element?.draw({ animation: true });
  };

  protected validate(event: IElementDragEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  protected async moveElement(ids: ID[], offset: Point) {
    const { model, element } = this.context;
    const { dropEffect } = this.options;
    ids.forEach((id) => {
      const elementType = model.getElementType(id);
      if (elementType === 'node') model.translateNodeBy(id, offset);
      else if (elementType === 'combo') model.translateComboBy(id, offset);
    });

    if (dropEffect === 'move') ids.forEach((id) => model.refreshComboData(id));
    await element!.draw({ animation: this.animation });
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
    this.context.graph.showElement(this.hiddenEdges);
    this.hiddenEdges = [];
  }

  protected hideEdge() {
    const { hideEdge, shadow } = this.options;
    if (hideEdge === 'none' || shadow) return;
    const { graph } = this.context;
    if (hideEdge === 'all') this.hiddenEdges = graph.getEdgeData().map(idOf);
    else {
      this.hiddenEdges = Array.from(
        new Set(this.target.map((id) => graph.getRelatedEdgesData(id, hideEdge).map(idOf)).flat()),
      );
    }
    graph.hideElement(this.hiddenEdges);
  }

  private unbindEvents() {
    const { graph } = this.context;

    this.enableElements.forEach((type) => {
      graph.off(`${type}:${CommonEvent.DRAG_START}`, this.onDragStart);
      graph.off(`${type}:${CommonEvent.DRAG}`, this.onDrag);
      graph.off(`${type}:${CommonEvent.DRAG_END}`, this.onDragEnd);
    });

    graph.off(`combo:${CommonEvent.DROP}`, this.onDrop);
    graph.off(`canvas:${CommonEvent.DROP}`, this.onDrop);
  }

  public destroy() {
    this.unbindEvents();
    this.shadow?.destroy();
    super.destroy();
  }
}

type IElementDragEvent = IDragEvent<Element>;
