---
title: Diamond 菱形
order: 5
---

本文展示所有 Diamond 菱形节点 `keyShape` 配置项。[Diamond 菱形节点 DEMO](/zh/examples/item/defaultNodes/#diamond)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oUSlSZt6rCoAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

- **类型**：`KeyShapeStyle`

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * 菱形的宽高。`size` 为一个数值时，宽高相同
   */
  size?: number | [number, number];
};
```

其中，相关的图形样式参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

- **默认值**：

```json
{
  "size": [32, 32]
}
```

- **是否必须**：否

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
