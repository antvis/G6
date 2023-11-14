---
title: Triangle 三角形
order: 7
---

本文展示所有 Triangle 三角形节点配置项。[Triangle 三角形 DEMO](/zh/examples/item/defaultNodes/#triangle)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*BW_sSbWVQowAAAAAAAAAAAAADmJ7AQ/original" width=600>

## keyShape

- **类型**：

```typescript
StyleProps & {
  /**
   * 三角形的大小。此处指的是三角形的外接圆半径
   */
  r?: number;
  /**
   * 三角形的方向。可以是 `'up'`（向上）、`'left'`（向左）、`'right'`（向右）或 `'down'`（向下）。
   */
  direction?: 'up' | 'left' | 'right' | 'down';
};
```

其中，相关的图形样式参考 [Path 图形样式](../shape/PathStyleProps.zh.md)。

- **默认值**：

```json
{
  "r": 12,
  "direction": "up"
}
```

- **是否必须**：否

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
