```ts
interface IAnimates {
  buildIn?: IAnimate[];
  buildOut?: IAnimate[];
  show?: IAnimate[];
  hide?: IAnimate[];
  update?: (IAnimate | IStateAnimate)[];
}

interface IAnimate {
  fields?: string[];
  shapeId?: string;
  order?: number;
  duration?: number;
  iterations?: number;
  easing?: string;
  delay?: number;
}
```
