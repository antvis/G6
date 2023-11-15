---
title: Diamond
order: 5
---

This section details the configuration options for the keyShape of Diamond (菱形) nodes, as showcased in the [Diamond Node DEMO](/en/examples/item/defaultNodes/#diamond).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oUSlSZt6rCoAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

- **Type**: `KeyShapeStyle`

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * The width and height of the diamond. If `size` is a single number, the width and height are the same.
   */
  size?: number | [number, number];
};
```

For more detailed style configuration, refer to [Path](../shape/PathStyleProps.en.md)。

- **Default**:

```json
{
  "size": [32, 32]
}
```

- **Required**: No

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
