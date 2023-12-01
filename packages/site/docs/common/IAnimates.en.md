<details>
  <summary style="color: #873bf4; cursor: pointer;">
    IAnimates
  </summary>

```ts
interface IAnimates {
  /** Animations when certain graphics are created in the combo */
  buildIn?: IAnimate[];
  /** Animations when certain graphics are destroyed in the combo */
  buildOut?: IAnimate[];
  /** Animations when certain graphics transition from hidden to visible in the combo */
  show?: IAnimate[];
  /** Animations when certain graphics transition from visible to hidden in the combo */
  hide?: IAnimate[];
  /** Animations when certain graphics undergo data or state updates in the combo */
  update?: (IAnimate | IStateAnimate)[];
}

interface IAnimate {
  /** The names of the graphic style properties related to this animation, for example ['fill', 'lineWidth'] */
  fields?: string[];
  /** The ID of the graphic on which the animation needs to be performed. If not specified, it represents the animation on the entire graphic group */
  shapeId?: string;
  /** The order in which this animation is executed among IAnimate[], allowing for sequential playback of multiple animations during one update. Default: 0 */
  order?: number;
  /** The execution time (ms) of this animation, default: 500 */
  duration?: number;
  /** The number of times this animation is executed, -1 means loop execution, default: 1 */
  iterations?: number;
  /** The easing effect of this animation, default: cubic-bezier(0.250, 0.460, 0.450, 0.940) */
  /** See https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#easing */
  easing?: string;
}

interface IStateAnimate extends IAnimate {
  /** The animation is executed when these states change */
  states: string[];
}
```

</details>
