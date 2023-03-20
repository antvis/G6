import { IAnimationEffectTiming } from '@antv/g';

export interface AnimateCfg {
  /**
   * Whether enable animation.
   * @type {boolean}
   */
  enable: boolean;
  /**
   * Duration of one animation.
   * @type {number}
   */
  duration?: number;
  /**
   * Easing function.
   * @type {string}
   */
  easing?: string;
  /**
   * Delay of the animation.
   * @type {function}
   */
  delay?: number;
  /**
   * Whether repeat.
   * @type {boolean}
   */
  repeat?: boolean;
  /**
   * Called after the animation is finished.
   * @type {function}
   */
  callback?: () => void;
  /**
   * Called after the animation is paused.
   * @type {function}}
   */
  pauseCallback?: () => void;
  /**
   * Called after the animation is resumed.
   * @type {function}
   */
  resumeCallback?: () => void;
}

export type AnimateWhen = 'show' | 'exit' | 'update' | 'last';

export interface AnimateAttr {
  when: AnimateWhen;
  type: string;
  [param: string]: unknown;
}

export interface CameraAnimationOptions
  extends Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'> {}
