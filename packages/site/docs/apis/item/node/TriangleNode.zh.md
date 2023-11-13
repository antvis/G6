---
title: Triangle 三角形
order: 7
---

本文展示 Triangle 三角形节点 `keyShape` 配置项的详细说明。对于其它配置项，可以参考[通用配置](/apis/item/node/node-intro#通用属性)。[Triangle 三角形 DEMO](/zh/examples/item/defaultNodes/#triangle)。

[TODO:](/)

## KeyShapeStyle

相关的图形样式参考 [`PathStyleProps`](../../shape/PathStyleProps.zh.md), 扩展属性如下：

### KeyShapeStyle.r

三角形的大小。此处指的是三角形的外接圆半径。

- **是否必须**：否
- **类型**：`number`
- **默认值**：`12`

### KeyShapeStyle.direction

三角形的方向。可以是 `'up'`（向上）、`'left'`（向左）、`'right'`（向右）或 `'down'`（向下）。

- **是否必须**：否
- **类型**：`'up' | 'left' | 'right' | 'down'`
- **默认值**：`'up'`
