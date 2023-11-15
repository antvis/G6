---
title: Cube 立方体
order: 11
---

本文展示所有 Cube 立方体节点配置项。[Cube 立方体节点 DEMO](/zh/examples/item/defaultNodes/#3d-node)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MkyMTpesEEYAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

- **类型**：`KeyShapeStyle`

```typescript
type KeyShapeStyle = {
  /**
   * 立方体的宽度
   */
  width?: number;
  /**
   * 立方体的高度
   */
  height?: number;
  /**
   * 立方体的深度
   */
  depth?: number;
  /**
   * 立方体宽度方向上的分段数量。这个数值影响立方体的细节和程序化生成的效果
   */
  widthSegments?: number;
  /**
   * 立方体高度方向上的分段数量。同样影响立方体的细节和程序化生成的效果
   */
  heightSegments?: number;
  /**
   * 立方体深度方向上的分段数量。影响立方体的细节和程序化生成的效果
   */
  depthSegments?: number;
};
```

- **默认值**：

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

- **是否必须**：否

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
