---
title: Hexagon 六边形
order: 6
---

本文展示所有 Hexagon 六边形配置项。[Hexagon 六边形 DEMO](/zh/examples/item/defaultNodes/#hexagon)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*muosSr4ft8QAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## keyShape

- **类型**：

```typescript
StyleProps & {
  /**
   * 六边形的外接圆半径大小
   */
  r?: number;
  /**
   * 六边形的方向。可以是垂直（`vertical`）或水平（`horizontal`）方向决定了六边形在画布上的朝向
   */
  direction?: 'vertical' | 'horizontal';
};
```

其中，相关的图形样式参考 [Polygon 图形样式](../shape/PolygonStyleProps.zh.md)。

- **默认值**：

```json
{
  "r": 16,
  "direction": "vertical"
}
```

- **是否必须**：否

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
