---
title: Hexagon 六边形
order: 6
---

本文展示 Hexagon 六边形 `keyShape` 配置项的详细说明。对于其它配置项，可以参考[通用配置](/apis/item/node/node-intro#通用属性)。[Hexagon 六边形 DEMO](/zh/examples/item/defaultNodes/#hexagon)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*muosSr4ft8QAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## KeyShapeStyle

相关的图形样式参考 [`PolygonStyleProps`](../../shape/PolygonStyleProps.zh.md), 扩展属性如下：

### KeyShapeStyle.r

六边形的外接圆半径大小。

- **是否必须**：否
- **类型**：`number`
- **默认值**：`16`

### KeyShapeStyle.direction

六边形的方向。可以是垂直（`vertical`）或水平（`horizontal`）方向决定了六边形在画布上的朝向。

- **是否必须**：否
- **类型**：`'vertical' | 'horizontal'`
- **默认值**：`'vertical'`
