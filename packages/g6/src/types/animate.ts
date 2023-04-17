import { IAnimationEffectTiming } from '@antv/g';

export interface AnimateCfg {
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
   * Iteration number for the animation, Inifinity means repeat.
   * @type {number | typeof Infinity}
   */
  iterations?: number | typeof Infinity;
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

export type AnimateTiming = 'show' | 'exit' | 'update';

export interface IAnimate {
  // style fields to animate
  fields?: string[];
  // shapeId for the animate, 'group' by default, means animation on whole graphics group
  shapeId?: string;
  // the order of the animate, 0 by dfault
  order?: number;
  // animate options
  duration?: number;
  interations?: number;
  easing?: string;
  delay?: number;
}

export interface IStateAnimate extends IAnimate {
  states: string[];
}

export interface IAnimates {
  show?: IAnimate[];
  exit?: IAnimate[];
  update?: (IAnimate | IStateAnimate)[];
}

export type CameraAnimationOptions = Pick<
  IAnimationEffectTiming,
  'duration' | 'easing' | 'easingFunction'
>;
