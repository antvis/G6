---
title: Sphere
order: 12
---

This section details the configuration options for Sphere (球体) nodes, as showcased in the [Sphere Node DEMO](/en/examples/item/defaultNodes/#3d-node).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MkyMTpesEEYAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

- **Type**: `KeyShapeStyle`

```typescript
type KeyShapeStyle = {
  /**
   * The radius of the sphere. Determines the size of the sphere.
   */
  r?: number;
  /**
   * The number of latitude bands of the sphere. This value affects the level of detail and rendering quality of the sphere.
   */
  latitudeBands?: number;
  /**
   * The number of longitude bands of the sphere. Similarly, this affects the level of detail and rendering quality of the sphere.
   */
  longitudeBands?: number;
};
```

- **Default**:

```json
{
  "r": 5,
  "latitudeBands": 32,
  "longitudeBands": 32
}
```

- **Required**: No

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
