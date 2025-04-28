---
title: Circular 环形布局
---

## 概述

环形布局是一种把节点均匀或者按间隔放置在圆上的布局，也支持通过配置 startRadius 和 endRadius 为不一样的值实现螺旋状布局。参考更多环形布局[样例](https://g6.antv.antgroup.com/examples#layout-circular)或[源码](https://github.com/antvis/layout/blob/v5/packages/layout/src/circular.ts)。

## 使用场景

**环形布局**:

- 适用于平等关系网络、无层级结构的图

**螺旋状布局**:

- 适用于隐式层级或时间序列图（如组织架构、传播网络）

## 基本用法

其余均使用默认配置（布局宽高默认是整个画布容器）

```js
const graph = new Graph({
  // 其他配置
  layout: {
    type: 'circular',
  },
});
```

## 配置项

| 属性        | 描述                                                                                | 类型                                          | 默认值                           | 必选 |
| ----------- | ----------------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------- | ---- |
| type        | 布局类型                                                                            | circular                                      | -                                | ✓    |
| angleRatio  | 从第一个节点到最后节点之间相隔多少个 2\*PI                                          | number                                        | 1                                |      |
| center      | 布局的中心                                                                          | [number, number]\|[number, number, number]    | [`布局宽度` / 2, `布局高度` / 2] |      |
| clockwise   | 是否顺时针排列                                                                      | boolean                                       | true                             |      |
| divisions   | 节点在环上的分段数（几个段将均匀分布，在 endRadius - startRadius != 0 时生效）      | number                                        | 1                                |      |
| nodeSize    | 节点大小（直径）。用于防止节点重叠时的碰撞检测                                      | Size \| ((nodeData: Node) => Size)            | 10                               |      |
| nodeSpacing | 环与环之间最小间距，用于调整半径                                                    | number \| ((nodeData: Node) => number)        | 10                               |      |
| ordering    | 节点在环上排序的依据，[说明](#ordering)                                             | `topology` \| `topology-directed` \| `degree` | -                                |      |
| radius      | 圆的半径，设置了则螺旋状布局的配置`startRadius`、`endRadius`不生效，[说明](#radius) | number                                        | -                                |      |
| startAngle  | 布局的开始角度                                                                      | number                                        | 0                                |      |
| endAngle    | 布局的结束角度                                                                      | number                                        | 2 \* Math.PI                     |      |
| startRadius | 螺旋状布局的开始半径，[用法](#螺旋状布局)                                           | number                                        | -                                |      |
| endRadius   | 螺旋状布局的结束半径                                                                | number                                        | -                                |      |
| width       | 布局的宽度                                                                          | number                                        | 画布宽度                         |      |
| height      | 布局的高度                                                                          | number                                        | 画布高度                         |      |

### ordering

节点在环上排序的依据

- `topology`: 按照拓扑排序
- `topology-directed`: 按照拓扑排序（有向图）
- `degree`: 按照度数大小排序

不配置（`null`）则直接使用数组中的顺序

### radius

如果radius、startRadius、endRadius都没配置，则默认为最终计算出来的`Math.min(布局宽度, 布局高度) / 2`，即布满整个布局区域

## 代码示例

### 基础环形布局

```javascript
const graph = new Graph({
  // 其他配置
  layout: {
    type: 'circular',
  },
});
```

<Playground path="layout/circular/demo/basic.js" rid="circular-basic"></Playground>

### 螺旋状布局

```javascript
const graph = new Graph({
  // 其他配置
  layout: {
    type: 'circular',
    startRadius: 10,
    endRadius: 300,
  },
});
```

<Playground path="layout/circular/demo/spiral.js" rid="circular-spiral"></Playground>
