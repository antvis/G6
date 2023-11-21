---
title: Cube
order: 11
---

The following section details the configuration options for Cube (立方体) nodes, as demonstrated in the [Cube DEMO](/en/examples/item/defaultNodes/#3d-node).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MkyMTpesEEYAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

**Type**: `KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = {
  /**
   * The width of the cube
   */
  width?: number;
  /**
   * The height of the cube
   */
  height?: number;
  /**
   * The depth of the cube
   */
  depth?: number;
  /**
   * The number of segments along the width of the cube. This value affects the details and procedural generation effects of the cube.
   */
  widthSegments?: number;
  /**
   * The number of segments along the height of the cube. Similarly, this affects the cube's details and procedural generation effects.
   */
  heightSegments?: number;
  /**
   * The number of segments along the depth of the cube. It influences the details and procedural generation effects of the cube.
   */
  depthSegments?: number;
};
```

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "width": 10,
  "height": 10,
  "depth": 10,
  "widthSegments": 1,
  "heightSegments": 1,
  "depthSegments": 1
}
```

</details>

<embed src="../../../common/NodeShapeStyles.en.md"></embed>
