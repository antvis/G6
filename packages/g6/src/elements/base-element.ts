import type { IAnimation } from '@antv/g';
import type { RuntimeContext } from '../runtime/types';
import type { Keyframe } from '../types';
import type { BaseShapeStyleProps } from './shapes';
import { BaseShape } from './shapes';

export abstract class BaseElement<T extends BaseShapeStyleProps> extends BaseShape<T> {
  protected get context(): RuntimeContext {
    // @ts-expect-error skip type-check
    return this.config.context;
  }

  protected get parsedAttributes() {
    return this.attributes as Required<T>;
  }

  /**
   * <zh/> 动画帧执行函数
   *
   * <en/> Animation frame execution function
   */
  protected onframe() {}

  public animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions | undefined): IAnimation | null {
    const animation = super.animate(keyframes, options);

    if (animation) {
      animation.onframe = () => this.onframe();
      animation.finished.then(() => this.onframe());
    }

    return animation;
  }
}
