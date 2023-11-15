---
title: Star 星形
order: 8
---

本文展示所有 Star 星形节点配置项。[Star 星形节点 DEMO](/zh/examples/item/defaultNodes/#star)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YSVjSLyYNwIAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

- **类型**：`KeyShapeStyle`

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * 五角星的大小
   */
  outerR?: number;
  /**
   * 五角星的内环大小。若未设置 `innerR`, 则自动根据 `outerR * 3 / 8` 计算
   */
  innerR?: number;
};
```

其中，相关的图形样式参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

- **默认值**：

```json
{
  "outerR": 20
}
```

- **是否必须**：否

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
