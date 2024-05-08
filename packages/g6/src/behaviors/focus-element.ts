import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import { ELEMENT_TYPES } from '../constants/element';
import type { RuntimeContext } from '../runtime/types';
import type { IElementEvent, ViewportAnimationEffectTiming } from '../types';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 聚焦元素交互配置项
 *
 * <en/> Focus element behavior options
 */
export interface FocusElementOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用动画以及动画配置
   *
   * <en/> Whether to enable animation
   */
  animation?: ViewportAnimationEffectTiming;
  /**
   * <zh/> 是否启用聚焦功能
   *
   * <en/> Whether to enable the function of focusing on the element
   * @defaultValue true
   */
  enable?: boolean | ((event: IElementEvent) => boolean);
}

/**
 * <zh/> 聚焦元素交互行为
 *
 * <en/> Focus element behavior
 * @remarks
 * <zh/> 点击元素时，将元素聚焦到视图中心。
 *
 * <en/> When an element is clicked, the element is focused to the center of the view.
 */
export class FocusElement extends BaseBehavior<FocusElementOptions> {
  static defaultOptions: Partial<FocusElementOptions> = {
    animation: {
      easing: 'ease-in',
      duration: 500,
    },
    enable: true,
  };

  constructor(context: RuntimeContext, options: FocusElementOptions) {
    super(context, Object.assign({}, FocusElement.defaultOptions, options));
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();

    ELEMENT_TYPES.forEach((type) => {
      graph.on(`${type}:${CommonEvent.CLICK}`, this.focus);
    });
  }

  private focus = async (event: IElementEvent) => {
    if (!this.validate(event)) return;
    const { graph } = this.context;

    await graph.focusElement(event.target.id, this.options.animation);
  };

  private validate(event: IElementEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    const { graph } = this.context;

    ELEMENT_TYPES.forEach((type) => {
      graph.off(`${type}:${CommonEvent.CLICK}`, this.focus);
    });
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
