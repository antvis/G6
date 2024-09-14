import type { BaseStyleProps, Cursor } from '@antv/g';
import { Rect } from '@antv/g';
import { isFunction } from '@antv/util';
import { COMBO_KEY, CanvasEvent, ComboEvent, CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { EdgeDirection, ID, IElementDragEvent, IPointerEvent, Point, Prefix, State } from '../types';
import { getBBoxSize, getCombinedBBox } from '../utils/bbox';
import { idOf } from '../utils/id';
import { subStyleProps } from '../utils/prefix';
import { divide, subtract } from '../utils/vector';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 拖拽元素交互配置项
 *
 * <en/> Drag element behavior options
 */
export interface DragElementOptions extends BaseBehaviorOptions, Prefix<'shadow', BaseStyleProps> {
  /**
   * <zh/> 是否启用拖拽动画
   *
   * <en/> Whether to enable drag animation
   * @defaultValue true
   */
  animation?: boolean;
  /**
   * <zh/> 是否启用拖拽节点的功能，默认可以拖拽 node 和 combo
   *
   * <en/> Whether to enable the function of dragging the node，default can drag node and combo
   * @defaultValue ['node', 'combo'].includes(event.targetType)
   */
  enable?: boolean | ((event: IElementDragEvent) => boolean);
  /**
   * <zh/> 拖拽操作效果
   * - `'link'`: 将拖拽元素置入为目标元素的子元素
   * - `'move'`: 移动元素并更新父元素尺寸
   * - `'none'`: 仅更新拖拽目标位置，不做任何额外操作
   *
   * <en/> Drag operation effect
   * - `'link'`: Place the drag element as a child element of the target element
   * - `'move'`: Move the element and update the parent element size
   * - `'none'`: Only update the drag target position, no additional operations
   * @remarks
   * <zh/> combo 元素可作为元素容器置入 node 或 combo 元素
   *
   * <en/> The combo element can be placed as an element container into the node or combo element
   * @defaultValue 'move'
   */
  dropEffect?: 'link' | 'move' | 'none';
  /**
   * <zh/> 节点选中的状态，启用多选时会基于该状态查找选中的节点
   *
   * <en/> The state name of the selected node, when multi-selection is enabled, the selected nodes will be found based on this state
   * @defaultValue 'selected'
   */
  state?: State;
  /**
   * <zh/> 拖拽时隐藏的边
   * - `'none'`: 不隐藏
   * - `'out'`: 隐藏以节点为源节点的边
   * - `'in'`: 隐藏以节点为目标节点的边
   * - `'both'`: 隐藏与节点相关的所有边
   * - `'all'`: 隐藏图中所有边
   *
   * <en/> Edges hidden during dragging
   * - `'none'`: do not hide
   * - `'out'`: hide the edges with the node as the source node
   * - `'in'`: hide the edges with the node as the target node
   * - `'both'`: hide all edges related to the node
   * - `'all'`: hide all edges in the graph
   * @remarks
   * <zh/> 使用幽灵节点时不会隐藏边
   *
   * <en/> Edges will not be hidden when using the drag shadow
   * @defaultValue 'none'
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
  /**
   * <zh/> 指针样式
   *
   * <en/> Cursor style
   */
  cursor?: {
    /**
     * <zh/> 默认指针样式
     *
     * <en/> Default cursor style
     */
    default?: Cursor;
    /**
     * <zh/> 可抓取指针样式
     *
     * <en/> Cursor style that can be grabbed
     */
    grab: Cursor;
    /**
     * <zh/> 抓取中指针样式
     *
     * <en/> Cursor style when grabbing
     */
    grabbing: Cursor;
  };
}

/**
 * <zh/> 拖拽元素交互
 *
 * <en/> Drag element behavior
 */
export class DragElement extends BaseBehavior<DragElementOptions> {
  static defaultOptions: Partial<DragElementOptions> = {
    animation: true,
    enable: (event) => ['node', 'combo'].includes(event.targetType),
    dropEffect: 'move',
    state: 'selected',
    hideEdge: 'none',
    shadow: false,
    shadowZIndex: 100,
    shadowFill: '#F3F9FF',
    shadowFillOpacity: 0.5,
    shadowStroke: '#1890FF',
    shadowStrokeOpacity: 0.9,
    shadowLineDash: [5, 5],
    cursor: {
      default: 'default',
      grab: 'grab',
      grabbing: 'grabbing',
    },
  };

  protected enable: boolean = false;

  private enableElements = ['node', 'combo'];

  protected target: ID[] = [];

  private shadow?: Rect;

  private shadowOrigin: Point = [0, 0];

  private hiddenEdges: ID[] = [];

  private isDragging: boolean = false;

  constructor(context: RuntimeContext, options: DragElementOptions) {
    super(context, Object.assign({}, DragElement.defaultOptions, options));
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.bindEvents();
  }
  /**
   * <zh/> 更新元素拖拽配置
   *
   * <en/> Update the element dragging configuration
   * @param options - <zh/> 配置项 | <en/> options
   * @internal
   */
  public update(options: Partial<DragElementOptions>): void {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  private bindEvents() {
    const { graph, canvas } = this.context;

    // @ts-expect-error internal property
    const $canvas: HTMLCanvasElement = canvas.getLayer().getContextService().$canvas;
    if ($canvas) {
      $canvas.addEventListener('blur', this.onDragEnd);
      $canvas.addEventListener('contextmenu', this.onDragEnd);
    }

    this.enableElements.forEach((type) => {
      graph.on(`${type}:${CommonEvent.DRAG_START}`, this.onDragStart);
      graph.on(`${type}:${CommonEvent.DRAG}`, this.onDrag);
      graph.on(`${type}:${CommonEvent.DRAG_END}`, this.onDragEnd);
      graph.on(`${type}:${CommonEvent.POINTER_ENTER}`, this.setCursor);
      graph.on(`${type}:${CommonEvent.POINTER_LEAVE}`, this.setCursor);
    });

    if (['link'].includes(this.options.dropEffect)) {
      graph.on(ComboEvent.DROP, this.onDrop);
      graph.on(CanvasEvent.DROP, this.onDrop);
    }
  }

  /**
   * <zh/> 获取当前选中的节点 id 集合
   *
   * <en/> Get the id collection of the currently selected node
   * @param currTarget - <zh/> 当前拖拽目标元素 id 集合 | <en/> The id collection of the current drag target element
   * @returns <zh/> 当前选中的节点 id 集合 | <en/> The id collection of the currently selected node
   * @internal
   */
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

  /**
   * Get the delta of the drag
   * @param event - drag event object
   * @returns delta
   * @internal
   */
  protected getDelta(event: IElementDragEvent) {
    const zoom = this.context.graph.getZoom();
    return divide([event.dx, event.dy], zoom);
  }

  /**
   * <zh/> 拖拽开始时的回调
   *
   * <en/> Callback when dragging starts
   * @param event - <zh/> 拖拽事件对象 | <en/> drag event object
   * @internal
   */
  protected onDragStart(event: IElementDragEvent) {
    this.enable = this.validate(event);
    if (!this.enable) return;

    const { batch, canvas } = this.context;
    canvas.setCursor(this.options!.cursor?.grabbing || 'grabbing');
    this.isDragging = true;
    batch!.startBatch();
    this.target = this.getSelectedNodeIDs([event.target.id]);
    this.hideEdge();
    this.context.graph.frontElement(this.target);
    if (this.options.shadow) this.createShadow(this.target);
  }

  /**
   * <zh/> 拖拽过程中的回调
   *
   * <en/> Callback when dragging
   * @param event - <zh/> 拖拽事件对象 | <en/> drag event object
   * @internal
   */
  protected onDrag(event: IElementDragEvent) {
    if (!this.enable) return;
    const delta = this.getDelta(event);

    if (this.options.shadow) this.moveShadow(delta);
    else this.moveElement(this.target, delta);
  }

  /**
   * <zh/> 元素拖拽结束的回调
   *
   * <en/> Callback when dragging ends
   * @internal
   */
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
    const { batch, canvas } = this.context;
    batch!.endBatch();
    canvas.setCursor(this.options!.cursor?.grab || 'grab');
    this.isDragging = false;
    this.target = [];
  }

  /**
   * <zh/> 拖拽放下的回调
   *
   * <en/> Callback when dragging is released
   * @param event - <zh/> 拖拽事件对象 | <en/> drag event object
   */
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
    await element?.draw({ animation: true })?.finished;
  };

  private setCursor = (event: IPointerEvent) => {
    if (this.isDragging) return;
    const { type } = event;
    const { canvas } = this.context;
    const { cursor } = this.options;

    if (type === CommonEvent.POINTER_ENTER) canvas.setCursor(cursor?.grab || 'grab');
    else canvas.setCursor(cursor?.default || 'default');
  };

  /**
   * <zh/> 验证元素是否允许拖拽
   *
   * <en/> Verify if the element is allowed to be dragged
   * @param event - <zh/> 拖拽事件对象 | <en/> drag event object
   * @returns <zh/> 是否允许拖拽 | <en/> Whether to allow dragging
   * @internal
   */
  protected validate(event: IElementDragEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  /**
   * <zh/> 移动元素
   *
   * <en/> Move the element
   * @param ids - <zh/> 元素 id 集合 | <en/> element id collection
   * @param offset <zh/> 偏移量 | <en/> offset
   * @internal
   */
  protected async moveElement(ids: ID[], offset: Point) {
    const { graph, model } = this.context;
    const { dropEffect } = this.options;

    if (dropEffect === 'move') ids.forEach((id) => model.refreshComboData(id));
    graph.translateElementBy(Object.fromEntries(ids.map((id) => [id, offset])), false);
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
          // @ts-ignore $layer is not in the type definition
          $layer: 'transient',
          ...shadowStyle,
          ...positionStyle,
          pointerEvents: 'none',
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

  /**
   * Hide the edge
   * @internal
   */
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
    const { graph, canvas } = this.context;

    // @ts-expect-error internal property
    const $canvas: HTMLCanvasElement = canvas.getLayer().getContextService().$canvas;
    if ($canvas) {
      $canvas.removeEventListener('blur', this.onDragEnd);
      $canvas.removeEventListener('contextmenu', this.onDragEnd);
    }

    this.enableElements.forEach((type) => {
      graph.off(`${type}:${CommonEvent.DRAG_START}`, this.onDragStart);
      graph.off(`${type}:${CommonEvent.DRAG}`, this.onDrag);
      graph.off(`${type}:${CommonEvent.DRAG_END}`, this.onDragEnd);
      graph.off(`${type}:${CommonEvent.POINTER_ENTER}`, this.setCursor);
      graph.off(`${type}:${CommonEvent.POINTER_LEAVE}`, this.setCursor);
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
