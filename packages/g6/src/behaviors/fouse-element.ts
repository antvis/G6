import type { FederatedMouseEvent } from '@antv/g';
import type { ID } from '@antv/graphlib';
import { isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { BehaviorEvent, ViewportAnimationEffectTiming } from '../types';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

const FOUSE_ELEMENT_TYPES = ['node', 'combo'];

export interface FouseElementOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用动画
   *
   * <en/> Whether to enable animation
   */
  animation?: ViewportAnimationEffectTiming;
  /**
   * <zh/> 是否启用聚焦功能
   *
   * <en/> Whether to enable the function of dragging the node
   */
  enable?: boolean | ((event: BehaviorEvent<FederatedMouseEvent> | BehaviorEvent<KeyboardEvent>) => boolean);
}

export class FouseElement extends BaseBehavior<FouseElementOptions> {
  static defaultOptions: Partial<FouseElementOptions> = {
    animation: {
      easing: 'ease-in',
      duration: 500,
    },
    enable: true,
  };

  constructor(context: RuntimeContext, options: FouseElementOptions) {
    super(context, Object.assign({}, FouseElement.defaultOptions, options));
    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;
    this.unbindEvents();

    FOUSE_ELEMENT_TYPES.forEach((type) => {
      graph.on(`${type}:${CommonEvent.CLICK}`, this.clickFouseElement);
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

  private clickFouseElement = (event: BehaviorEvent<FederatedMouseEvent>) => {
    if (!this.validate(event)) return;

    const { animation } = this.options;

    const { graph, canvas } = this.context;
    const id = this.getSelectedNodeIDs([event.target.id])[0];
    const [x, y] = graph.getElementRenderBounds(id).center;

    const [centerX, centerY] = graph.getViewportCenter();
    const camera = canvas.getCamera();

    const currentZoom = camera.getZoom();

    const dx = (centerX - x) * currentZoom;
    const dy = (centerY - y) * currentZoom;

    graph.translateBy([dx, dy], animation);
  };

  private validate(event: BehaviorEvent<FederatedMouseEvent>) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    const { graph } = this.context;

    FOUSE_ELEMENT_TYPES.forEach((type) => {
      graph.off(`${type}:${CommonEvent.CLICK}`, this.clickFouseElement);
    });
  }

  public destroy() {
    this.unbindEvents();
    super.destroy();
  }
}
