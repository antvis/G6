---
title: Diamond
order: 5
---

This section details the configuration options for the keyShape of Diamond (菱形) nodes, as showcased in the [Diamond Node DEMO](/en/examples/item/defaultNodes/#diamond).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oUSlSZt6rCoAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

**Type**: `KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * The width and height of the diamond. If `size` is a single number, the width and height are the same.
   */
  size?: number | [number, number];
};
```

For more detailed style configuration, refer to [Path](../shape/PathStyleProps.en.md)。

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "size": [32, 32]
}
```

</details>

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
