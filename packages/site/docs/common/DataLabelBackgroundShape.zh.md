### labelBackgroundShape

**类型**：`LabelBackgroundShape`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    LabelBackgroundShape
  </summary>

```ts
type LabelBackgroundShape = RectStyleProps & {
  /** 背景内边距 */
  padding?: number | number[];
};
```

</details>

- [RectStyleProps](/apis/shape/rect-style-props)

文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。
