### mergedStyles

**类型**：`MergedStyles`

<details>

<summary style="color: #873bf4; cursor: pointer">MergedStyles</summary>

```ts
type MergedStyles = {
  /** 主图形的样式 */
  keyShape: ShapeStyle;
  /** 主图形的 halo 样式 */
  halo: ShapeStyle;
  /** 文本样式 */
  label: ShapeStyle;
  /** 文本背景样式 */
  labelBackground: ShapeStyle;
  /** 文本图标样式 */
  labelIcon: ShapeStyle;
  /** 徽标样式 */
  badge: ShapeStyle;
  /** 连接桩样式 */
  anchor: ShapeStyle;
};
```

</details>

由用户配置和默认样式合并得到的样式
