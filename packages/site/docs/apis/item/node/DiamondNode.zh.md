---
title: Diamond 菱形
order: 5
---

本文展示所有 Diamond 菱形节点 `keyShape` 配置项。[Diamond 菱形节点 DEMO](/zh/examples/item/defaultNodes/#diamond)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oUSlSZt6rCoAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

**类型**：`KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * 菱形的宽高。`size` 为一个数值时，宽高相同
   */
  size?: number | [number, number];
};
```

其中，相关的图形样式参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

</details>

**默认值**：`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "size": [32, 32]
}
```

</details>

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
