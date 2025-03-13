---
title: Quadratic 二次贝塞尔曲线
---

## 概述

二次贝塞尔曲线是一种平滑的曲线，其形状由起点、终点和一个控制点决定。

使用场景：

- 适用于中等复杂度的图，如关系图、网络图。

- 当需要平滑连接节点且计算资源有限时使用。

## 在线体验

<embed src="@/common/api/elements/edges/quadratic.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseEdge](./BaseEdge.zh.md)

| 属性          | 描述                                                                                               | 类型            | 默认值 | 必选 |
| ------------- | -------------------------------------------------------------------------------------------------- | --------------- | ------ | ---- |
| controlPoints | 控制点数组，用于定义曲线的形状。如果不指定，将会通过 `curveOffset` 和 `curvePosition` 来计算控制点 | [Point](#point) | -      |      |
| curvePosition | 控制点在两端点连线上的相对位置，范围为`0-1`                                                        | number          | 0.5    |      |
| curveOffset   | 控制点距离两端点连线的距离，可理解为控制边的弯曲程度                                               | number          | 30     |      |

#### Point

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

## 示例

### 内置二次贝塞尔曲线边效果

<Playground path="element/edge/demo/quadratic.js" rid="default-quadratic-edge" height='520px'></Playground>
