---
title: Sphere
order: 12
---

This section details the configuration options for Sphere (球体) nodes, as showcased in the [Sphere Node DEMO](/en/examples/item/defaultNodes/#3d-node).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MkyMTpesEEYAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

**Type**: `KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

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

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "r": 5,
  "latitudeBands": 32,
  "longitudeBands": 32
}
```

</details>

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
