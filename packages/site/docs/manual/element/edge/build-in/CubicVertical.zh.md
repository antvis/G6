---
title: CubicVertical 垂直三次贝塞尔曲线
---

## 概述

垂直三次贝塞尔曲线是一种平滑的曲线，其控制点主要沿垂直方向分布，适合在垂直方向上连接节点。

使用场景：

- 适用于垂直布局的图，如组织结构图、树状图。

- 当需要强调垂直方向的连接关系时使用。

**特别注意，计算控制点时主要考虑 y 轴上的距离，忽略 x 轴的变化**

## 在线体验

<embed src="@/common/api/elements/edges/cubic-vertical.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseEdge](./BaseEdge.zh.md)

| 属性          | 描述                                                 | 类型                   | 默认值    | 必选 |
| ------------- | ---------------------------------------------------- | ---------------------- | --------- | ---- |
| curvePosition | 控制点在两端点连线上的相对位置，范围为`0-1`          | number &#124; number[] | [0.5,0.5] |      |
| curveOffset   | 控制点距离两端点连线的距离，可理解为控制边的弯曲程度 | number &#124; number[] | [0,0]     |      |

## 示例

### 内置垂直三次贝塞尔曲线边效果

<Playground path="element/edge/demo/vertical-cubic.js" rid="default-vertical-cubic-edge" height='520px'></Playground>
