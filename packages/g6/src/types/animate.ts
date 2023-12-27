import { IAnimationEffectTiming } from '@antv/g';

export interface AnimateCfg {
  /**
   * Duration of one animation.
   */
  duration?: number;
  /**
   * Easing function.
   * @type {string}
   */
  easing?: string;
  /**
   * Delay of the animation.
   */
  delay?: number;
  /**
   * Iteration number for the animation, Infinity means repeat.
   */
  iterations?: number | typeof Infinity;
  /**
   * Called after the animation is finished.
   */
  callback?: () => void;
  /**
   * Called after the animation is paused.
   */
  pauseCallback?: () => void;
  /**
   * Called after the animation is resumed.
   */
  resumeCallback?: () => void;
}

export type AnimateTiming = 'buildIn' | 'buildOut' | 'show' | 'hide' | 'update';

export interface IAnimate {
  // style fields to animate
  fields?: string[];
  // shapeId for the animate, 'group' by default, means animation on whole graphics group
  shapeId?: string;
  // the order of the animate, 0 by default
  order?: number;
  // animate options
  duration?: number;
  iterations?: number;
  easing?: string;
  delay?: number;
}

export interface IStateAnimate extends IAnimate {
  states: string[];
}

export interface IAnimates {
  buildIn?: IAnimate[];
  buildOut?: IAnimate[];
  show?: IAnimate[];
  hide?: IAnimate[];
  update?: (IAnimate | IStateAnimate)[];
}

export type CameraAnimationOptions = Partial<Pick<IAnimationEffectTiming, 'duration' | 'easing' | 'easingFunction'>>;
