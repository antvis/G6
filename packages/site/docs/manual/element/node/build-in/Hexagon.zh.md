---
title: Hexagon 六边形
---

## 概述

六边形是一个六边相等的几何形状，具有蜂窝状结构。

适用场景：

- 用于表示蜂窝网络、分子结构或紧密排列的节点。

- 适合表示网络拓扑、分子图或游戏地图。

- 常用于网络图、拓扑图、游戏设计等。

## 在线体验

<embed src="@/common/api/elements/nodes/hexagon.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseNode](./BaseNode.zh.md)

| 属性   | 描述                                     | 类型   | 默认值                   | 必选 |
| ------ | ---------------------------------------- | ------ | ------------------------ | ---- |
| outerR | 外半径，是指从六边形中心到任意顶点的距离 | number | 默认为宽高的最小值的一半 |      |

## 示例

### 内置六边形节点效果

<Playground path="element/node/demo/hexagon.js" rid="default-hexagon-node"></Playground>
