### lodLevels

**类型**：`LodLevel[]`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    LodLevel
  </summary>

```ts
type LodLevel = {
  /** 本层级所定义的图缩放等级范围，当图缩放等级满足 zoomRange[0] <= zoom < zoomRange[1] 时，表示在该层级下 */
  zoomRange: [number, number];
  /** 是否为主层级 */
  primary: boolean;
};
```

</details>

设定图缩放等级的划分方式

- 主层级序数为 0
- `zoomRange` 小于当前层级的，序号递减
- `zoomRange` 大于当前层级的，序号递增

> 序数为在下面的图形配置中 `lod` 所对应的值
