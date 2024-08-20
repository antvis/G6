import type { RectStyleProps } from '@antv/g';
import { Rect } from '@antv/g';
import { deepMix, isFunction } from '@antv/util';
import { CanvasEvent, CommonEvent } from '../constants';
import type { Graph } from '../runtime/graph';
import type { RuntimeContext } from '../runtime/types';
import type { ElementDatum, ElementType, ID, IPointerEvent, Point, State } from '../types';
import { idOf } from '../utils/id';
import { getBoundingPoints, isPointInPolygon } from '../utils/point';
import type { ShortcutKey } from '../utils/shortcut';
import { Shortcut } from '../utils/shortcut';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 框选配置项
 *
 * <en/> Brush select options
 */
export interface BrushSelectOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用动画
   *
   * <en/> Whether to enable animation.
   * @defaultValue false
   */
  animation?: boolean;
  /**
   * <zh/> 是否启用框选功能
   *
   * <en/> Whether to enable Brush select element function.
   * @defaultValue true
   */
  enable?: boolean | ((event: IPointerEvent) => boolean);
  /**
   * <zh/> 可框选的元素类型
   *
   * <en/> Enable Elements type.
   * @defaultValue ['node', 'combo', 'edge']
   */
  enableElements?: ElementType[];
  /**
   * <zh/> 按下该快捷键配合鼠标点击进行框选
   *
   * <en/> Press this shortcut key to apply brush select with mouse click.
   * @remarks
   * <zh/> 注意，`trigger` 设置为 `['drag']` 时会导致 `drag-canvas` 行为失效。两者不可同时配置。
   *
   * <en/> Note that setting `trigger` to `['drag']` will cause the `drag-canvas` behavior to fail. The two cannot be configured at the same time.
   * @defaultValue ['shift']
   */
  trigger?: ShortcutKey;
  /**
   * <zh/> 被选中时切换到该状态
   *
   * <en/> The state to switch to when selected.
   * @defaultValue 'selected'
   */
  state?: State;
  /**
   * <zh/> 框选的选择模式
   * - `'union'`：保持已选元素的当前状态，并添加指定的 state 状态。
   * - `'intersect'`：如果已选元素已有指定的 state 状态，则保留；否则清除该状态。
   * - `'diff'`：对已选元素的指定 state 状态进行取反操作。
   * - `'default'`：清除已选元素的当前状态，并添加指定的 state 状态。
   *
   * <en/> Brush select mode
   * - `'union'`: Keep the current state of the selected elements and add the specified state.
   * - `'intersect'`: If the selected elements already have the specified state, keep it; otherwise, clearBrush it.
   * - `'diff'`: Perform a negation operation on the specified state of the selected elements.
   * - `'default'`: Clear the current state of the selected elements and add the specified state.
   * @defaultValue 'default'
   */
  mode?: 'union' | 'intersect' | 'diff' | 'default';
  /**
   * <zh/> 是否及时框选, 仅在框选模式为 `default` 时生效
   *
   * <en/> Whether to brush select immediately, only valid when the brush select mode is `default`
   * @defaultValue false
   */
  immediately?: boolean;
  /**
   * <zh/> 框选 框样式
   *
   * <en/> Timely screening.
   */
  style?: RectStyleProps;
  /**
   * <zh/> 框选元素状态回调。
   *
   * <en/> Callback when brush select elements.
   * @param states - 选中的元素状态
   * @returns 选中的元素状态
   */
  onSelect?: (states: Record<ID, State | State[]>) => Record<ID, State | State[]>;
}
/**
 * <zh/> 框选一组元素
 *
 * <en/> Brush select elements
 */
export class BrushSelect extends BaseBehavior<BrushSelectOptions> {
  static defaultOptions: Partial<BrushSelectOptions> = {
    animation: false,
    enable: true,
    enableElements: ['node', 'combo', 'edge'],
    immediately: false,
    mode: 'default',
    state: 'selected',
    trigger: ['shift'],
    style: {
      width: 0,
      height: 0,
      lineWidth: 1,
      fill: '#1677FF',
      stroke: '#1677FF',
      fillOpacity: 0.1,
      zIndex: 2,
      pointerEvents: 'none',
    },
  };

  private startPoint?: Point;
  private endPoint?: Point;
  private rectShape?: Rect;
  private shortcut?: Shortcut;

  constructor(context: RuntimeContext, options: BrushSelectOptions) {
    super(context, deepMix({}, BrushSelect.defaultOptions, options));
    this.shortcut = new Shortcut(context.graph);

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.clearStates = this.clearStates.bind(this);

    this.bindEvents();
  }

  /**
   * Triggered when the pointer is pressed
   * @param event - Pointer event
   * @internal
   */
  protected onPointerDown(event: IPointerEvent) {
    if (!this.validate(event) || !this.isKeydown() || this.startPoint) return;
    const { canvas, graph } = this.context;
    const style = { ...this.options.style };

    // 根据缩放比例调整 lineWidth
    // Adjust lineWidth according to the zoom ratio
    if (this.options.style.lineWidth) {
      style.lineWidth = +this.options.style.lineWidth / graph.getZoom();
    }

    this.rectShape = new Rect({ id: 'g6-brush-select', style });
    canvas.appendChild(this.rectShape);

    this.startPoint = [event.canvas.x, event.canvas.y];
  }

  /**
   * Triggered when the pointer is moved
   * @param event - Pointer event
   * @internal
   */
  protected onPointerMove(event: IPointerEvent) {
    if (!this.startPoint) return;
    const { immediately, mode } = this.options;

    this.endPoint = getCursorPoint(event);

    this.rectShape?.attr({
      x: Math.min(this.endPoint[0], this.startPoint[0]),
      y: Math.min(this.endPoint[1], this.startPoint[1]),
      width: Math.abs(this.endPoint[0] - this.startPoint[0]),
      height: Math.abs(this.endPoint[1] - this.startPoint[1]),
    });

    if (immediately && mode === 'default') this.updateElementsStates(getBoundingPoints(this.startPoint, this.endPoint));
  }

  /**
   * Triggered when the pointer is released
   * @param event - Pointer event
   * @internal
   */
  protected onPointerUp(event: IPointerEvent) {
    if (!this.startPoint) return;
    if (!this.endPoint) {
      this.clearBrush();
      return;
    }

    this.endPoint = getCursorPoint(event);
    this.updateElementsStates(getBoundingPoints(this.startPoint, this.endPoint));

    this.clearBrush();
  }

  /**
   * <zh/> 清除状态
   *
   * <en/> Clear state
   * @internal
   */
  protected clearStates() {
    if (this.endPoint) return;

    this.clearElementsStates();
  }

  /**
   * <zh/> 清除画布上所有元素的状态
   *
   * <en/> Clear the state of all elements on the canvas
   * @internal
   */
  protected clearElementsStates() {
    const { graph } = this.context;
    const states = Object.values(graph.getData()).reduce((acc, data) => {
      return Object.assign(
        {},
        acc,
        data.reduce((acc: Record<ID, []>, datum: ElementDatum) => {
          acc[idOf(datum)] = [];
          return acc;
        }, {}),
      );
    }, {});

    graph.setElementState(states, this.options.animation);
  }

  /**
   * <zh/> 更新选中的元素状态
   *
   * <en/> Update the state of the selected elements
   * @param points - <zh/> 框选区域的顶点 | <en/> The vertex of the selection area
   * @internal
   */
  protected updateElementsStates(points: Point[]) {
    const { graph } = this.context;
    const { enableElements, state, mode, onSelect } = this.options;

    const selectedIds = this.selector(graph, points, enableElements);

    let states: Record<ID, State | State[]> = {};

    switch (mode) {
      case 'union':
        selectedIds.forEach((id) => {
          states[id] = [...graph.getElementState(id), state];
        });
        break;
      case 'diff':
        selectedIds.forEach((id) => {
          const prevStates = graph.getElementState(id);
          states[id] = prevStates.includes(state) ? prevStates.filter((s) => s !== state) : [...prevStates, state];
        });
        break;
      case 'intersect':
        selectedIds.forEach((id) => {
          const prevStates = graph.getElementState(id);
          states[id] = prevStates.includes(state) ? [state] : [];
        });
        break;
      case 'default':
      default:
        selectedIds.forEach((id) => {
          states[id] = [state];
        });
        break;
    }

    if (isFunction(onSelect)) states = onSelect(states);

    graph.setElementState(states, this.options.animation);
  }

  /**
   * <zh/> 查找画布上在指定区域内显示的元素。当节点的包围盒中心在矩形内时，节点被选中；当边的两端节点在矩形内时，边被选中；当 combo 的包围盒中心在矩形内时，combo 被选中。
   *
   * <en/> Find the elements displayed in the specified area on the canvas. A node is selected if the center of its bbox is inside the rect; An edge is selected if both end nodes are inside the rect ;A combo is selected if the center of its bbox is inside the rect.
   * @param graph - <zh/> 图实例 | <en/> Graph instance
   * @param points - <zh/> 框选区域的顶点 | <en/> The vertex of the selection area
   * @param itemTypes - <zh/> 元素类型 | <en/> Element type
   * @returns <zh/> 选中的元素 ID 数组 | <en/> Selected element ID array
   * @internal
   */
  protected selector(graph: Graph, points: Point[], itemTypes: ElementType[]): ID[] {
    if (!itemTypes || itemTypes.length === 0) return [];

    const elements: ID[] = [];

    const graphData = graph.getData();
    itemTypes.forEach((itemType) => {
      graphData[`${itemType}s`].forEach((datum) => {
        const id = idOf(datum);
        if (graph.getElementVisibility(id) !== 'hidden' && isPointInPolygon(graph.getElementPosition(id), points)) {
          elements.push(id);
        }
      });
    });

    // 如果边的两端节点都在框选范围内，则边也被选中 | If source node and target node are within the selection range, that edge is also selected
    if (itemTypes.includes('edge')) {
      const edges = graphData.edges;
      edges?.forEach((edge) => {
        const { source, target } = edge;
        if (elements.includes(source) && elements.includes(target)) {
          elements.push(idOf(edge));
        }
      });
    }

    return elements;
  }

  private clearBrush() {
    this.rectShape?.remove();
    this.rectShape = undefined;
    this.startPoint = undefined;
    this.endPoint = undefined;
  }

  /**
   * <zh/> 当前按键是否和 trigger 配置一致
   *
   * <en/> Is the current key consistent with the trigger configuration
   * @returns <zh/> 是否一致 | <en/> Is consistent
   * @internal
   */
  protected isKeydown(): boolean {
    const { trigger } = this.options;
    const keys = (Array.isArray(trigger) ? trigger : [trigger]) as string[];
    return this.shortcut!.match(keys.filter((key) => key !== 'drag'));
  }

  /**
   * <zh/> 验证是否启用框选
   *
   * <en/> Verify whether brush select is enabled
   * @param event - <zh/> 事件 | <en/> Event
   * @returns <zh/> 是否启用 | <en/> Whether to enable
   * @internal
   */
  protected validate(event: IPointerEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private bindEvents() {
    const { graph } = this.context;

    graph.on(CommonEvent.POINTER_DOWN, this.onPointerDown);
    graph.on(CommonEvent.POINTER_MOVE, this.onPointerMove);
    graph.on(CommonEvent.POINTER_UP, this.onPointerUp);
    graph.on(CanvasEvent.CLICK, this.clearStates);
  }

  private unbindEvents() {
    const { graph } = this.context;

    graph.off(CommonEvent.POINTER_DOWN, this.onPointerDown);
    graph.off(CommonEvent.POINTER_MOVE, this.onPointerMove);
    graph.off(CommonEvent.POINTER_UP, this.onPointerUp);
    graph.off(CanvasEvent.CLICK, this.clearStates);
  }

  /**
   * <zh/> 更新配置项
   *
   * <en/> Update configuration
   * @param options - <zh/> 配置项 | <en/> Options
   * @internal
   */
  public update(options: Partial<BrushSelectOptions>) {
    this.unbindEvents();
    this.options = deepMix(this.options, options);
    this.bindEvents();
  }

  /**
   * <zh/> 销毁
   *
   * <en/> Destroy
   * @internal
   */
  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}

export const getCursorPoint = (event: IPointerEvent): Point => {
  return [event.canvas.x, event.canvas.y];
};
