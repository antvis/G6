import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import { ELEMENT_TYPES } from '../constants/element';
import type { RuntimeContext } from '../runtime/types';
import type { EdgeDirection, Element, ElementType, ID, IDragEvent, IPointerEvent, State } from '../types';
import { isToBeDestroyed } from '../utils/element';
import { idsOf } from '../utils/id';
import { getElementNthDegreeIds } from '../utils/relation';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 悬浮元素交互配置项
 *
 * <en/> Hover element behavior options
 */
export interface HoverActivateOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用动画
   *
   * <en/> Whether to enable animation
   * @defaultValue true
   */
  animation?: boolean;
  /**
   * <zh/> 是否启用悬浮元素的功能
   *
   * <en/> Whether to enable hover element function
   * @defaultValue true
   */
  enable?: boolean | ((event: IPointerEvent) => boolean);
  /**
   * <zh/> 激活元素的n度关系
   * - 默认为 `0`，表示只激活当前节点
   * - `1` 表示激活当前节点及其直接相邻的节点和边，以此类推
   *
   * <en/> N-degree relationship of the hovered element
   * - default to `0`, which means only the current node is activated
   * - `1` means the current node and its directly adjacent nodes and edges are activated, etc
   * @defaultValue 0
   */
  degree?: number | ((event: IPointerEvent) => number);
  /**
   * <zh/> 指定边的方向
   * - `'both'`: 表示激活当前节点的所有关系
   * - `'in'`: 表示激活当前节点的入边和入节点
   * - `'out'`: 表示激活当前节点的出边和出节点
   *
   * <en/> Specify the direction of the edge
   * - `'both'`: Activate all relationships of the current node
   * - `'in'`: Activate the incoming edges and nodes of the current node
   * - `'out'`: Activate the outgoing edges and nodes of the current node
   * @defaultValue 'both'
   */
  direction?: EdgeDirection;
  /**
   * <zh/> 激活元素的状态，默认为 `active`
   *
   * <en/> Active element state, default to`active`
   * @defaultValue 'active'
   */
  state?: State;
  /**
   * <zh/> 非激活元素的状态，默认为不改变
   *
   * <en/> Inactive element state, default to no change
   */
  inactiveState?: State;
  /**
   * <zh/> 当元素被悬停时的回调
   *
   * <en/> Callback when the element is hovered
   */
  onHover?: (event: IPointerEvent) => void;
  /**
   * <zh/> 当悬停结束时的回调
   *
   * <en/> Callback when the hover ends
   */
  onHoverEnd?: (event: IPointerEvent) => void;
}

/**
 * <zh/> 悬浮元素交互
 *
 * <en/> Hover element behavior
 * @remarks
 * <zh/> 当鼠标悬停在元素上时，可以激活元素的状态，例如高亮节点或边。
 *
 * <en/> When the mouse hovers over an element, you can activate the state of the element, such as highlighting nodes or edges.
 */
export class HoverActivate extends BaseBehavior<HoverActivateOptions> {
  static defaultOptions: Partial<HoverActivateOptions> = {
    animation: false,
    enable: true,
    degree: 0,
    direction: 'both',
    state: 'active',
    inactiveState: undefined,
  };

  private isFrozen = false;

  constructor(context: RuntimeContext, options: HoverActivateOptions) {
    super(context, Object.assign({}, HoverActivate.defaultOptions, options));
    this.bindEvents();
  }

  private toggleFrozen = (e: IDragEvent) => {
    this.isFrozen = e.type === 'dragstart';
  };

  private bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();

    ELEMENT_TYPES.forEach((type) => {
      graph.on(`${type}:${CommonEvent.POINTER_ENTER}`, this.hoverElement);
      graph.on(`${type}:${CommonEvent.POINTER_LEAVE}`, this.hoverElement);
    });

    const canvas = this.context.canvas.document;
    canvas.addEventListener(`${CommonEvent.DRAG_START}`, this.toggleFrozen);
    canvas.addEventListener(`${CommonEvent.DRAG_END}`, this.toggleFrozen);
  }

  private hoverElement = (event: IPointerEvent<Element>) => {
    if (!this.validate(event)) return;
    const isEnter = event.type === CommonEvent.POINTER_ENTER;
    this.updateElementsState(event, isEnter);

    const { onHover, onHoverEnd } = this.options;
    if (isEnter) onHover?.(event);
    else onHoverEnd?.(event);
  };

  protected getActiveIds(event: IPointerEvent<Element>) {
    const { graph } = this.context;
    const { degree, direction } = this.options;
    const elementId = event.target.id;

    return degree
      ? getElementNthDegreeIds(
          graph,
          event.targetType as ElementType,
          elementId,
          typeof degree === 'function' ? degree(event) : degree,
          direction,
        )
      : [elementId];
  }

  private updateElementsState = (event: IPointerEvent<Element>, add: boolean) => {
    if (!this.options.state && !this.options.inactiveState) return;

    const { graph } = this.context;
    const { state, animation, inactiveState } = this.options;

    const activeIds = this.getActiveIds(event);
    const states: Record<ID, State[]> = {};

    if (state) {
      Object.assign(states, this.getElementsState(activeIds, state, add));
    }

    if (inactiveState) {
      const inactiveIds = idsOf(graph.getData(), true).filter((id) => !activeIds.includes(id));
      Object.assign(states, this.getElementsState(inactiveIds, inactiveState, add));
    }
    graph.setElementState(states, animation);
  };

  private getElementsState = (ids: ID[], state: State, add: boolean) => {
    const { graph } = this.context;
    const states: Record<ID, State[]> = {};
    ids.forEach((id) => {
      const currentState = graph.getElementState(id);
      if (add) {
        states[id] = currentState.includes(state) ? currentState : [...currentState, state];
      } else {
        states[id] = currentState.filter((s) => s !== state);
      }
    });
    return states;
  };

  private validate(event: IPointerEvent<Element>) {
    if (
      this.destroyed ||
      this.isFrozen ||
      isToBeDestroyed(event.target) ||
      // @ts-expect-error private property
      // 避免动画冲突，在combo折叠展开过程中不触发悬停事件 | To prevent animation conflicts, hover events are disabled during combo expand/collapse actions
      this.context.graph.isCollapsingExpanding
    )
      return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    const { graph } = this.context;

    ELEMENT_TYPES.forEach((type) => {
      graph.off(`${type}:${CommonEvent.POINTER_ENTER}`, this.hoverElement);
      graph.off(`${type}:${CommonEvent.POINTER_LEAVE}`, this.hoverElement);
    });

    const canvas = this.context.canvas.document;
    canvas.removeEventListener(`${CommonEvent.DRAG_START}`, this.toggleFrozen);
    canvas.removeEventListener(`${CommonEvent.DRAG_END}`, this.toggleFrozen);
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
