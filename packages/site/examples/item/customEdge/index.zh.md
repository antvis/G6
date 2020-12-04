---
title: 自定义边
order: 5
---

当 G6 的内置边不能满足需求时，G6 的自定义边机制允许用户设计和定制新的边类型。

## 使用指南

下面的前两个代码演示了自定义折线 polyline 边。自定义边可以通过两种方式实现：

1. 继承 line，复写 `getPath` 和 `getShapeStyle` 方法；
2. 复写 `draw` 方法。

拖动边的两个端点时，常常需要动态更新折线的控制点位置。建议使用 G6 内置的 `polyline` 满足这一需求。

第三个代码演示了自定义带有多个文本标签的边。

更多信息参见[自定义边](/zh/docs/manual/middle/elements/edges/custom-edge)。
