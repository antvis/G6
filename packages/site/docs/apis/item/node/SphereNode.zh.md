---
title: Sphere 球
order: 12
---

本文展示所有 Sphere 立方体节点配置项。[Sphere 球节点 DEMO](/zh/examples/item/defaultNodes/#3d-node)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MkyMTpesEEYAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

**类型**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = {
  /**
   * 球半径。决定了球体的大小
   */
  r?: number;
  /**
   * 球体的纬度带数量。这个数值影响球体的详细程度和渲染质量
   */
  latitudeBands?: number;
  /**
   * 球体的经度带数量。同样影响球体的详细程度和渲染质量
   */
  longitudeBands?: number;
};
```

</details>

**默认值**：`object`

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

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
