### anchorShapes

**类型**：`AnchorShapes`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    AnchorShapes
  </summary>

```ts
type AnchorShapes = CircleStyleProps & {
  // 单独的连接桩图形配置，优先级高于外层的 CircleStyleProps
  [key: number]: CircleStyleProps & {
    // 该连接桩的位置，可配置字符串或数字数组表示相对于主图形 (keyShape) 包围盒的百分比位置，例如 [0.5, 1] 表示位于主图形的右侧中间
    position?: 'top' | 'left' | 'bottom' | 'right' | [number, number];
  };
};
```

</details>

- [CircleStyleProps](/apis/shape/circle-style-props)

连接桩形状
