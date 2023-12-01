### labelShape

**类型**：`LabelShape`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    LabelShape
  </summary>

```ts
type LabelShape = TextStyleProps & {
  /**
   * 文本相对于主图形 (keyShape) 的位置，可指定方位以及在内部或外部
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
   * 文本图形相对于主图形 (keyShape) 在 x 方向上的偏移量
   */
  offsetX?: number;
  /**
   * 文本图形相对于主图形 (keyShape) 在 y 方向上的偏移量
   */
  offsetY?: number;
  /**
   * 文本图形相对于主图形 (keyShape) 在 z 方向上的偏移量
   */
  offsetZ?: number;
  /**
   * 允许文本的最大宽度，若指定为数字，则表示像素值，若指定为带有 '%' 的文本，代表相对于主图形 (keyShape) 包围盒大小的百分比。默认值为 '200%'，表示文本图形的最大宽度不可以超过主图形宽度的两倍。若超过，则自动截断并在末尾增加省略号 '...'
   */
  maxWidth?: string | number;
  /**
   * 文本旋转角度（弧度制）
   */
  angle?: number;
};
```

</details>

- [TextStyleProps](/apis/shape/text-style-props)

Combo 的文本图形，内置 Combo 或继承内置 Combo（未复写相关内容）的自定义 Combo 均支持
