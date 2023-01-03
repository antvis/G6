export interface AnimateCfg {
  /**
   * whether enable animation
   * @type {boolean}
   */
  enable: boolean;
  /**
   * duration of one animation
   * @type {number}
   */
  duration?: number;
  /**
   * easing function
   * @type {string}}
   */
  easing?: string;
  /**
   * delay of the animation
   * @type {function}}
   */
  delay?: number;
  /**
   * whether repeat
   * @type {boolean}}
   */
  repeat?: boolean;
  /**
   * called after the animation is finished
   * @type {function}}
   */
  callback?: () => void;
  /**
   * called after the animation is paused
   * @type {function}}
   */
  pauseCallback?: () => void;
  /**
   * called after the animation is resumed
   * @type {function}}
   */
  resumeCallback?: () => void;
};