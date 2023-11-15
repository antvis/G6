---
title: Circle 圆形
order: 1
---

本文展示所有 Circle 圆形节点配置项。[Circle 圆形节点 DEMO](/zh/examples/item/defaultNodes/#circle)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*SuPdRLp1PQgAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

- **类型**：`KeyShapeStyle`

```typescript
type KeyShapeStyle = StyleProps & {
  /** 圆的半径 */
  r: number;
};
```

其中，相关的图形样式参考 [Circle 图形样式](../shape/CircleStyleProps.zh.md)。

- **默认值**：

```json
{
  "r": 16
}
```

- **是否必须**：否

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
