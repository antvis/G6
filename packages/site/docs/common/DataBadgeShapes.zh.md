### badgeShapes

**类型**：`BadgeShapes`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    BadgeShapes
  </summary>

```ts
type BadgeShapes = {
  /** 徽标的背景颜色 */
  color?: string;
  /** 徽标背景颜色的色板，未设置 color 时生效 */
  palette?: string[];
  /** 徽标上文本的颜色 */
  textColor?: string;
  /** 单个徽标的样式配置，优先级高于上面的配置 */
  [key: number]: ShapeStyle & {
    /** 该徽标的位置，支持的取值见下文 */
    position?: IBadgePosition;
    /** 该徽标的背景色 */
    color?: string;
    /** 该徽标的文本色 */
    textColor?: string;
  };
};
```

<embed src="./DataBadgePosition.zh.md"></embed>

</details>

四周的徽标，badgeShapes 配置的是多个徽标。
