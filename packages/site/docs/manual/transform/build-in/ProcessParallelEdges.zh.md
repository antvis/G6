---
title: ProcessParallelEdges 平行边
---

平行边（Parallel Edges）是指在图结构中，两个节点之间存在多条边。这些边共享相同的源节点和目标节点，但可能代表不同的关系或属性。为了避免边的重叠和混淆，提供了两种处理平行边的方式：(1) 捆绑模式（bundle）：将平行边捆绑在一起，通过改变曲率与其他边分开；(2) 合并模式（merge）：将平行边合并为一条聚合。

**参考示例**：

- [平行边](/examples/element/custom-edge/#parallel-edges)

## 配置项

### type

> _`process-parallel-edges` \| string_

此数据处理已内置，你可以通过 `type: 'process-parallel-edges'` 来使用它。

### distance

> _number_

边之间的距离，仅在捆绑模式下有效

### edges

> _string[]_

考虑要处理的边，默认为全部边

### <Badge type="success">Required</Badge> mode

> _'bundle' \| 'merge'_ **Default:** `'bundle'`

处理模式

- `'merge'`: 将平行边合并为一条边，适用于不需要区分平行边的情况
- '`bundle`': 每条边都会与其他所有平行边捆绑在一起，并通过改变曲率与其他边分开。如果一组平行边的数量是奇数，那么中心的边将被绘制为直线，其他的边将被绘制为曲线

### style

> _PathStyleProps \| ((prev: [EdgeData](/manual/data#边数据edgedata)[]) => PathStyleProps)_

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
