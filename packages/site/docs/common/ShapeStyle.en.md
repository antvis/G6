```ts
type ShapeStyle = Partial<
  GShapeStyle & {
    animates?: IAnimates;
    lod?: number | 'auto';
    visible?: boolean;
  } & {
    clipCfg?: ClipCfg;
  }
>;
```