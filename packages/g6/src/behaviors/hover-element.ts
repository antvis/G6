import { FederatedMouseEvent } from '@antv/g';
import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { BehaviorEvent, ElementType, State } from '../types';
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
   * <zh/> 指定将响应悬浮事件的元素类型
   *
   * <en/> Specify element types that will respond to hover event
   */
  enableElements: ElementType[];
  /**
   * <zh/> 激活悬停元素的n度关系，默认为0，表示只激活当前节点，1表示激活当前节点及其直接相邻的节点和边，以此类推
   *
   * <en/> N-degree relationship of the hovered element, default to 0, which means only the current node is activated, 1 means the current node and its directly adjacent nodes and edges are activated, etc
   */
  degree?: number;
  /**
   * <zh/> 被悬停元素的状态，默认为 active
   *
   * <en/> The state of the hovered element，default to active
   */
  hoverState?: State;
  /**
   * <zh/> 未悬停元素的状态，默认为 default
   *
   * <en/> The state of the element that is not hovered, default to default
   */
  idleState?: State;
  /**
   * <zh/> 当元素被悬停时的回调
   *
   * <en/> Callback when the element is hovered
   */
  onhover?: (event: BehaviorEvent<FederatedMouseEvent>) => void;
  /**
   * <zh/> 当悬停结束时的回调
   *
   * <en/> Callback when the hover is finished
   */
  onfinish?: (event: BehaviorEvent<FederatedMouseEvent>) => void;
}

export class HoverElement extends BaseBehavior<HoverElementOptions> {
  static defaultOptions: Partial<HoverElementOptions> = {
    animation: true,
    enable: true,
    enableElements: ['node', 'edge', 'combo'],
    degree: 0,
    hoverState: 'active',
    idleState: 'default',
  };

  private get element() {
    return new Set<string>(this.options.enableElements);
  }

  constructor(context: RuntimeContext, options: HoverElementOptions) {
    super(context, Object.assign({}, HoverElement.defaultOptions, options));
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();

    this.element.forEach((type) => {
      graph.on(`${type}:${CommonEvent.POINTER_ENTER}`, this.setElementsState);
      graph.on(`${type}:${CommonEvent.POINTER_OUT}`, this.resetElementsState);
    });
  }

  private handleElementsState = (
    event: BehaviorEvent<FederatedMouseEvent>,
    callback: (state: string[]) => string[],
  ) => {
    if (!this.validate(event)) return;
    const { graph } = this.context;
    const elementIds = this.getTargetElementIds(event);
    elementIds.forEach((id) => {
      graph.setElementState(id, callback(graph.getElementState(id)), this.options.animation);
    });
  };

  private setElementsState = (event: BehaviorEvent<FederatedMouseEvent>) => {
    if (this.options.idleState !== 'default') {
      // TODO: 根据 idleState 设置非悬停元素的状态
    }
    this.handleElementsState(event, (state) => [...state, this.options.hoverState]);
    this.options.onhover?.(event);
  };

  private resetElementsState = (event: BehaviorEvent<FederatedMouseEvent>) => {
    if (this.options.idleState !== 'default') {
      // TODO: 根据 idleState 重置非悬停元素的状态
    }
    this.handleElementsState(event, (state) => state.filter((s) => s !== this.options.hoverState));
    this.options.onfinish?.(event);
  };

  private getTargetElementIds(event: BehaviorEvent<FederatedMouseEvent>) {
    const { target } = event;
    // TODO: 根据 degree 获取目标元素 Ids
    return [target.id];
  }

  private validate(event: BehaviorEvent<FederatedMouseEvent>) {
    if (this.destroyed) return false;
    if (!this.element.has(event.targetType)) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    const { graph } = this.context;

    this.element.forEach((type) => {
      graph.off(`${type}:${CommonEvent.POINTER_ENTER}`, this.setElementsState);
      graph.off(`${type}:${CommonEvent.POINTER_OUT}`, this.resetElementsState);
    });
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
