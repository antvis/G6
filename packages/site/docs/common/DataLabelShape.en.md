### labelShape

**类型**：`LabelShape`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    LabelShape
  </summary>

```ts
type LabelShape = TextStyleProps & {
  /**
   * The position of the text relative to the key shape (keyShape) of the Combo. It can specify the position and whether it is inside or outside the combo.
   */
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'left-top'
    | 'outside-top'
    | 'outside-left'
    | 'outside-right'
    | 'outside-bottom';
  /**
   * The offset of the text shape from the key shape (keyShape) in the x-direction.
   */
  offsetX?: number;
  /**
   * The offset of the text shape from the key shape (keyShape) in the y-direction.
   */
  offsetY?: number;
  /**
   * The offset of the text shape from the key shape (keyShape) in the z-direction.
   */
  offsetZ?: number;
  /**
   * The maximum width allowed for the text. If specified as a number, it represents the pixel value. If specified as text with '%', it represents the percentage relative to the size of the key shape (keyShape). The default value is '200%', which means that the maximum width of the text shape cannot exceed twice the width of the key shape. If it exceeds, it will be automatically truncated and ellipsis '...' will be added at the end.
   */
  maxWidth?: string | number;
  /**
   * The rotation angle of the text (in radians).
   */
  angle?: number;
};
```

</details>

- [TextStyleProps](en/apis/shape/text-style-props)

The text shape of the Combo, supported by built-in Combo or custom Combo that inherits the built-in Combo (without overriding related content)
