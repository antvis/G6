---
title: Ellipse
order: 10
---

This section outlines the configuration options for Ellipse (椭圆) nodes, as demonstrated in the [Ellipse Node DEMO](/en/examples/item/defaultNodes/#ellipse).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Vdq4Rb3ESOoAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

- **Type**：`KeyShapeStyle`

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * The horizontal radius of the ellipse. This attribute determines the width of the ellipse.
   */
  rx?: number;
  /**
   * The vertical radius of the ellipse. This attribute determines the height of the ellipse.
   */
  ry?: number;
};
```

For more detailed style configuration, refer to [Ellipse](../shape/EllipseStyleProps.en.md)。

- **Default**:

```json
{
  "rx": 16,
  "ry": 12
}
```

- **Required**: No

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
