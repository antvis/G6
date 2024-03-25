import { FederatedMouseEvent } from '@antv/g';
import { ID } from '@antv/graphlib';
import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import { ELEMENT_TYPES } from '../constants/element';
import type { RuntimeContext } from '../runtime/types';
import type { BehaviorEvent, ElementType, State } from '../types';
import { getIds } from '../utils/id';
import { getElementNthDegreeIDs } from '../utils/relation';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

export interface HoverElementOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用动画
   *
   * <en/> Whether to enable animation
   */
  animation?: boolean;
  /**
   * <zh/> 是否启用悬浮元素的功能
   *
   * <en/> Whether to enable hover element function
   */
  enable?: boolean | ((event: BehaviorEvent<FederatedMouseEvent>) => boolean);
  /**
   * <zh/> 激活悬停元素的n度关系，默认为0，表示只激活当前节点，1表示激活当前节点及其直接相邻的节点和边，以此类推
   *
   * <en/> N-degree relationship of the hovered element, default to 0, which means only the current node is activated, 1 means the current node and its directly adjacent nodes and edges are activated, etc
   */
  degree?: number;
  /**
   * <zh/> 激活元素的状态，默认为 active
   *
   * <en/> Active element state, default to active
   */
  activeState?: false | State;
  /**
   * <zh/> 非激活元素的状态，默认为 default
   *
   * <en/> Inactive element state, default to default
   */
  inactiveState?: false | State;
  /**
   * <zh/> 当元素被悬停时的回调
   *
   * <en/> Callback when the element is hovered
   */
  onhover?: (event: BehaviorEvent<FederatedMouseEvent>) => void;
  /**
   * <zh/> 当悬停结束时的回调
   *
   * <en/> Callback when the hover ends
   */
  onhoverend?: (event: BehaviorEvent<FederatedMouseEvent>) => void;
}

export class HoverElement extends BaseBehavior<HoverElementOptions> {
  static defaultOptions: Partial<HoverElementOptions> = {
    animation: true,
    enable: true,
    degree: 0,
    activeState: 'active',
    inactiveState: false,
  };

  constructor(context: RuntimeContext, options: HoverElementOptions) {
    super(context, Object.assign({}, HoverElement.defaultOptions, options));
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();

    ELEMENT_TYPES.forEach((type) => {
      graph.on(`${type}:${CommonEvent.POINTER_OVER}`, this.hoverElement);
      graph.on(`${type}:${CommonEvent.POINTER_OUT}`, this.hoverEndElement);
    });
  }

  private hoverElement = (event: BehaviorEvent<FederatedMouseEvent>) => {
    if (!this.validate(event)) return;
    this.updateElementsState(event, true);
    this.options.onhover?.(event);
  };

  private hoverEndElement = (event: BehaviorEvent<FederatedMouseEvent>) => {
    if (!this.validate(event)) return;
    this.updateElementsState(event, false);
    this.options.onhoverend?.(event);
  };

  private updateElementsState = (event: BehaviorEvent<FederatedMouseEvent>, add: boolean) => {
    if (!this.options.activeState && !this.options.inactiveState) return;

    const { graph } = this.context;
    const { targetType, target } = event;

    const activeIds = getElementNthDegreeIDs(graph, targetType as ElementType, target.id, this.options.degree);

    const states: Record<ID, State[]> = {};

    if (this.options.activeState) {
      Object.assign(states, this.getElementsState(activeIds, this.options.activeState, add));
    }

    if (this.options.inactiveState) {
      const inactiveIds = getIds(graph.getData()).filter((id) => !activeIds.includes(id));
      Object.assign(states, this.getElementsState(inactiveIds, this.options.inactiveState, add));
    }

    graph.setElementState(states);
  };

  private getElementsState = (ids: ID[], state: State, add: boolean) => {
    const { graph } = this.context;
    const states: Record<ID, State[]> = {};
    ids.forEach((id) => {
      const currentState = graph.getElementState(id);
      const updatedState = add ? [...currentState, state] : currentState.filter((s) => s !== state);
      states[id] = updatedState;
    });
    return states;
  };

  private validate(event: BehaviorEvent<FederatedMouseEvent>) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    const { graph } = this.context;

    ELEMENT_TYPES.forEach((type) => {
      graph.off(`${type}:${CommonEvent.POINTER_OVER}`, this.hoverElement);
      graph.off(`${type}:${CommonEvent.POINTER_OUT}`, this.hoverEndElement);
    });
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
