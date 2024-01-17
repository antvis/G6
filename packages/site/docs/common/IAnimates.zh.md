<details>
  <summary style="color: #873bf4; cursor: pointer;">
    IAnimates
  </summary>

```ts
interface IAnimates {
  /** Combo 中某些图形创建时的动画 */
  buildIn?: IAnimate[];
  /** Combo 中某些图形销毁时的动画 */
  buildOut?: IAnimate[];
  /** Combo 中某些图形从隐藏变为显示时的动画 */
  show?: IAnimate[];
  /** Combo 中某些图形从显示变为隐藏时的动画 */
  hide?: IAnimate[];
  /** Combo 中某些图形在相关数据或状态更新时的动画 */
  update?: (IAnimate | IStateAnimate)[];
}

interface IAnimate {
  /** 该动画相关的图形样式属性名称，例如 ['fill', 'lineWidth'] */
  fields?: string[];
  /** 	该动画需要在哪个图形上执行，此处指定该图形的 ID。不指定则代表整个图形分组上的动画 */
  shapeId?: string;
  /** 该动画在 IAnimate[] 中执行的顺序，借此可实现一次更新多个动画的顺序播放，默认值：0 */
  order?: number;
  /** 该动画的执行时间(ms)，默认值：500 */
  duration?: number;
  /** 该动画执行的次数，-1 代表循环执行，默认值：1 */
  iterations?: number;
  /** 该动画的缓动效果，默认值：cubic-bezier(0.250, 0.460, 0.450, 0.940) */
  /** 可参考 https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#easing */
  easing?: string;
}

interface IStateAnimate extends IAnimate {
  /** 该动画在这些状态变更的时候执行 */
  states: string[];
}
```

</details>
