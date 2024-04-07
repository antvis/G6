import type { ID } from '@antv/graphlib';
import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { Element, IPointerEvent, ViewportAnimationEffectTiming } from '../types';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

const FOCUS_ELEMENT_TYPES = ['node', 'combo'];

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
   * <en/> Whether to enable the function of dragging the node
   */
  enable?: boolean | ((event: IElementEvent) => boolean);
}

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

    FOCUS_ELEMENT_TYPES.forEach((type) => {
      graph.on(`${type}:${CommonEvent.CLICK}`, this.clickFocusElement);
    });
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

  private clickFocusElement = async (event: IElementEvent) => {
    if (!this.validate(event)) return;
    const { animation } = this.options;
    const { graph } = this.context;
    const id = this.getSelectedNodeIDs([(event.target as Element).id]);

    await graph.focusElement(id, animation);
  };

  private validate(event: IElementEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    const { graph } = this.context;

    FOCUS_ELEMENT_TYPES.forEach((type) => {
      graph.off(`${type}:${CommonEvent.CLICK}`, this.clickFocusElement);
    });
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}

type IElementEvent = IPointerEvent<Element>;
