---
title: Polyline 折线
---

## 概述

折线是由多条直线段组成的边，适合在复杂布局中绕过障碍物连接节点。

使用场景：

- 适用于复杂布局的图，如电路图、管道图。

- 当需要绕过其他节点或障碍物时使用。

## 在线体验

<embed src="@/common/api/elements/edges/polyline.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseEdge](./BaseEdge.zh.md)

| 属性          | 描述                             | 类型                                                                                    | 默认值 | 必选 |
| ------------- | -------------------------------- | --------------------------------------------------------------------------------------- | ------ | ---- |
| controlPoints | 控制点数组，用于定义折线的转折点 | [Point](#point)[]                                                                       | []     |      |
| radius        | 转折点圆角半径                   | number                                                                                  | 0      |      |
| router        | 是否启用路由                     | false &#124; [OrthRouter](#orthrouter) &#124; [ShortestPathRouter](#shortestpathrouter) | false  |      |

### OrthRouter

| 属性    | 描述                                                                   | 类型                | 默认值 |
| ------- | ---------------------------------------------------------------------- | ------------------- | ------ |
| type    | 正交路由，通过在路径上添加额外的控制点，使得边的每一段都保持水平或垂直 | `'orth'`            | -      |
| padding | 节点连接点与转角的最小距离                                             | [Padding](#padding) | `0`    |

### ShortestPathRouter

| 属性                      | 描述                                                                                                                                              | 类型                                                                   | 默认值 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------ |
| type                      | 最短路径路由，是正交路由 `'orth'` 的智能版本。该路由由水平或垂直的正交线段组成。采用 A\* 算法计算最短路径，并支持自动避开路径上的其他节点（障碍） | `'shortest-path'`                                                      | -      |
| offset                    | 节点锚点与转角的最小距离                                                                                                                          | [Padding](#padding)                                                    | 0      |
| gridSize                  | grid 格子大小                                                                                                                                     | number                                                                 | 0      |
| maxAllowedDirectionChange | 支持的最大旋转角度（弧度）                                                                                                                        | number                                                                 | 0      |
| startDirections           | 节点的可能起始方向                                                                                                                                | [Direction](#direction)[]                                              | 0      |
| endDirections             | 节点的可能结束方向                                                                                                                                | [Direction](#direction)[]                                              | 0      |
| directionMap              | 指定可移动的方向                                                                                                                                  | { [key in [Direction](#direction)]: { stepX: number; stepY: number } } | 0      |
| penalties                 | 表示在路径搜索过程中某些路径的额外代价。key 为弧度值，value 为代价                                                                                | { [key: string]: number }                                              | 0      |
| distFunc                  | 指定计算两点之间距离的函数                                                                                                                        | (p1: [Point](#point), p2: [Point](#point)) => number                   | 0      |
| maximumLoops              | 最大迭代次数                                                                                                                                      | number                                                                 | 0      |
| enableObstacleAvoidance   | 是否开启避障                                                                                                                                      | boolean                                                                | false  |

#### Direction

```typescript
type Direction = 'left' | 'right' | 'top' | 'bottom';
```

#### Point

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

#### Padding

```typescript
type Padding = number | [number, number] | [number, number, number, number];
```

## 示例

### 内置折线边效果

<Playground path="element/edge/demo/polyline.js" rid="default-polyline-edge" height='520px'></Playground>
