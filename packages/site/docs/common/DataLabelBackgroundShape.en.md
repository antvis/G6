### labelBackgroundShape

**Type**: `LabelBackgroundShape`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    LabelBackgroundShape
  </summary>

```ts
type LabelBackgroundShape = RectStyleProps & {
  /** Inner padding of the background */
  padding?: number | number[];
};
```

</details>

- [RectStyleProps](/apis/shape/rect-style-props)

The background shape of the text in the Combo, which is a rectangle. If not set, it will not be displayed. Setting it as `{}` will use the default style in the theme to display the text background shape.
