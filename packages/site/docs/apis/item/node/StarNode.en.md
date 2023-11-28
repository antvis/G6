---
title: Star
order: 8
---

This section outlines the configuration options for Star (星形) nodes, as demonstrated in the [Star Node DEMO](/en/examples/item/defaultNodes/#star).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YSVjSLyYNwIAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

**Type**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * The size of the pentagram.
   */
  outerR?: number;
  /**
   * The size of the inner circle of the pentagram. If `innerR` is not set, it is automatically calculated based on `outerR * 3 / 8`.
   */
  innerR?: number;
};
```

For more detailed style configuration, refer to [Path Graphic Style](../shape/PathStyleProps.en.md).

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "outerR": 20
}
```

</details>

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
