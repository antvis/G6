---
title: ProcessParallelEdges 平行边
---

## 概述

平行边（Parallel Edges）是指在图结构中，两个节点之间存在多条边。这些边共享相同的源节点和目标节点，但可能代表不同的关系或属性。为了避免边的重叠和混淆，提供了两种处理平行边的方式：

- 捆绑模式（bundle）：将平行边捆绑在一起，通过改变曲率与其他边分开
- 合并模式（merge）：将平行边合并为一条聚合

## 使用场景

下面为常见使用场景举例：

- 双向数据流，比如客户端发送请求，服务端返回响应

- 多依赖关系，即一个节点通过多种方式依赖另一个节点，比如微服务架构中，服务 A 调用服务 B的两个不同 API
- 多链路，比如高可用架构中，主链路（实线，状态正常）与备份链路（灰色虚线，状态待机）同时展示

## 基本用法

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  transforms: ['process-parallel-edges'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  transforms: [
    {
      type: 'process-parallel-edges',
      key: 'process-parallel-edges',
      mode: 'bundle', // 默认就是捆绑模式了
      distance: 30, // 配置捆绑模式下边之间的距离为30
    },
  ],
});
```

## 配置项

| 属性     | 描述                                               | 类型                                                                                    | 默认值                  | 必选 |
| -------- | -------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------- | ---- |
| type     | 数据处理类型                                       | process-parallel-edges                                                                  | -                       | ✓    |
| distance | 边之间的距离，仅在捆绑模式下有效                   | number                                                                                  | 15                      |      |
| edges    | 考虑要处理的边，默认为全部边                       | string[]                                                                                | -                       |      |
| mode     | 处理模式，[配置项](#mode)                          | `'bundle'`                                                                              | `'merge'` \| `'bundle'` |      |
| style    | 合并边的样式，仅在合并模式下有效，[配置项](#style) | PathStyleProps \| ((prev: [EdgeData](/manual/data#边数据edgedata)[]) => PathStyleProps) | -                       |      |

### mode

提供了两种处理模式：

- `'merge'`: 将平行边合并为一条边，适用于不需要区分平行边的情况，[示例](#合并模式)

`merge` 使用的是内置的直线（ [`line`](/manual/element/edge/build-in/Line) ）来展示合并边。

- `'bundle'`: 每条边都会与其他所有平行边捆绑在一起，并通过改变曲率与其他边分开。如果一组平行边的数量是奇数，那么中心的边将被绘制为直线，其他的边将被绘制为曲线，[示例](#捆绑模式)

`bundle` 使用的是内置的二次贝塞尔曲线（ [`quadratic`](/manual/element/edge/build-in/Quadratic) ）来实现，数据处理过程会强制把每个 `edgeDatum.type` 改为 `quadratic`，并计算每条线的曲率。

:::warning{title=注意}

禁止在创建 Graph 实例时配置 `edge.type` 即默认的边类型，因为它的优先级比 `edgeDatum.type` 要高，会导致 `bundle` 模式的处理无法生效。

:::

### style

合并边的样式，仅在合并模式下有效

#### PathStyleProps

下表列出了常用的属性，更多属性请参考 [PathStyleProps](https://g.antv.antgroup.com/api/basic/path#pathstyleprops)。

| 属性           | 描述                      | 类型                          | 默认值    | 必选 |
| -------------- | ------------------------- | ----------------------------- | --------- | ---- |
| fill           | 填充色                    | string                        | `#1783FF` |
| fillOpacity    | 填充色透明度              | number \| string              | 1         |
| lineCap        | 描边端点样式              | `round` \| `square` \| `butt` | `butt`    |
| lineDash       | 描边虚线样式              | number[]                      | -         |
| lineDashOffset | 描边虚线偏移量            | number                        | -         |
| lineJoin       | 描边连接处样式            | `round` \| `bevel` \| `miter` | `miter`   |
| lineWidth      | 描边宽度                  | number                        | 1         |
| opacity        | 透明度                    | number \| string              | 1         |
| shadowBlur     | 阴影模糊度                | number                        | -         |
| shadowColor    | 阴影颜色                  | string                        | -         |
| shadowOffsetX  | 阴影在 x 轴方向上的偏移量 | number \| string              | -         |
| shadowOffsetY  | 阴影在 y 轴方向上的偏移量 | number \| string              | -         |
| shadowType     | 阴影类型                  | `inner` \| `outer`            | `outer`   |
| stroke         | 描边色                    | string                        | `#000`    |
| strokeOpacity  | 描边色透明度              | number \| string              | 1         |
| visibility     | 图形是否可见              | `visible` \| `hidden`         | `visible` |

## 代码示例

### 捆绑模式

<Playground path="transform/process-parallel-edges/demo/bundle.js" rid="parallel-edge-bundle"></Playground>

### 合并模式

下面是一个简单的合并模式的例子，需要注意：

- 不需要合并（即两个节点间只有一条边）的边，合并样式不会在这条边上生效，比如例子中的 **A->C**
- 合并样式实际上是赋值给 `datum.style` ，也就是优先级会比实例化 Graph 时配置的默认样式低（ `edge.style` ），所以例子中合并样式的 `startArrow` 没有生效

<Playground path="transform/process-parallel-edges/demo/merge.js" rid="parallel-edge-merge"></Playground>
