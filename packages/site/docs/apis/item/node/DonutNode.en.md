---
title: Donut
order: 3
---

This section provides details on the configuration options for Donut (甜甜圈) nodes, as illustrated in the [Donut Node DEMO](/en/examples/item/defaultNodes/#donut).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*c5f5Q7XuOWoAAAAAAAAAAAAADmJ7AQ/original" width=150 />

## keyShape

- **Type**：`KeyShapeStyle`

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * The radius of the donut
   */
  r?: number;
};
```

For more detailed style configuration, refer to [Circle](../shape/CircleStyleProps.en.md)。

- **Default**:

```json
{
  "r": 16
}
```

- **Required**: No

## donutShapes

- **Type**: `DonutShapesStyle`

```typescript
type DonutShapesStyle = PathStyleProps & {
  /**
   * The size of the donut's inner diameter relative to the overall radius. This value determines the size of the central empty area of the donut. A larger ratio means a larger central empty area and a relatively narrower ring. The value ranges from `0` to `1`.
   */
  innerSize?: number;
  /**
   * Defines the data for the donut node. Each field corresponds to a segment of the donut, with the field value indicating the size of that segment. These values are used to calculate the proportion of each segment in the donut.
   */
  attrs?: PropObject;
  /**
   * Defines the colors for each segment of the donut. Color mapping, where the field names correspond to the field names in `attrs`. If not specified, the default color palette is used.
   */
  colorMap?: PropObject;
  /**
   * Defines the stacking order (z-index) of the donut shape. This property can be used to control the overlap between different shapes.
   */
  zIndex?: number;
};
```

`PropObject` as follows:

```typescript
type PropObject = {
  [propKey: string]: number;
};
```

- **Default**:

```json
{
  "innerSize": 0.6,
  "zIndex": 1
}
```

- **Required**: Yes

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
