### mergedStyles

**类型**：`MergedStyles`

<details>

<summary style="color: #873bf4; cursor: pointer">MergedStyles</summary>

```ts
type MergedStyles = {
  /** Style of the main shape */
  keyShape: ShapeStyle;
  /** Style of the halo of the main shape */
  halo: ShapeStyle;
  /** Text style */
  label: ShapeStyle;
  /** Text background style */
  labelBackground: ShapeStyle;
  /** Text icon style */
  labelIcon: ShapeStyle;
  /** Badge style */
  badge: ShapeStyle;
  /** Port style */
  anchor: ShapeStyle;
};
```

</details>

Style which is merged from user configuration and default style.
