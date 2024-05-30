import { IAnimation } from '@antv/g';
import { Keyframe } from '../types';
import type { BaseShapeStyleProps } from './shapes';
import { BaseShape } from './shapes';

export abstract class BaseElement<T extends BaseShapeStyleProps> extends BaseShape<T> {
  public get parsedAttributes() {
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

  /**
   * <zh/> 在元素完成创建并执行完入场动画后调用
   *
   * <en/> Called after the element is created and the entrance animation is completed
   * @override
   */
  public onCreate() {}

  /**
   * <zh/> 在元素更新并执行完过渡动画后调用
   *
   * <en/> Called after the element is updated and the transition animation is completed
   * @override
   */
  public onUpdate() {}

  /**
   * <zh/> 在元素完成退场动画并销毁后调用
   *
   * <en/> Called after the element completes the exit animation and is destroyed
   * @override
   */
  public onDestroy() {}
}
