---
title: "布局通用配置项"
description: "布局通用配置项"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/layout/BaseLayout/"
version: "5.1.1"
---

本文介绍内置布局通用属性配置。

## 通用配置

| 属性                   | 描述                                                  | 类型                                                  | 默认值     | 必选 |
| ---------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ---------- | ---- |
| type                   | 布局类型，内置布局或自定义布局的名称                  | [Type](#Type)                                         | -          | ✓    |
| isLayoutInvisibleNodes | 不可见节点是否参与布局（当 preLayout 为 true 时生效） | boolean                                               | false      |      |
| nodeFilter             | 参与该布局的节点                                      | (node: NodeData) => boolean                           | () => true |      |
| comboFilter            | 参与该布局的combo元素                                 | (combo: ComboData) => boolean                         | () => true |      |
| preLayout              | 使用前布局，在初始化元素前计算布局                    | boolean                                               | false      |      |
| enableWorker           | 是否在 WebWorker 中运行布局                           | boolean                                               | -          |      |
| iterations             | 迭代布局的迭代次数                                    | number                                                | -          |      |
| animation              | 是否启用布局动画                                      | boolean                                               | false      |      |
| width                  | 布局区域宽度，默认使用当前容器宽度                    | number                                                | -          |      |
| height                 | 布局区域高度，默认使用当前容器高度                    | number                                                | -          |      |
| center                 | 布局中心点                                            | [number, number] \| [number, number, number]          | -          |      |
| node                   | 节点字段映射，用于把业务字段映射为布局字段            | (datum) => ({ id?, x?, y?, z?, parentId?, isCombo? }) | -          |      |
| edge                   | 边字段映射，用于把业务字段映射为布局字段              | (datum) => ({ id?, source?, target? })                | -          |      |

补充说明：

- `width` / `height` / `center` 是 `@antvis/layout` 统一支持的通用布局字段。
- `node` / `edge` 用于适配非标准 `id/source/target` 业务数据。
- `iterations` 是 G6 运行时用于驱动迭代布局的步数，不等同于某些布局内部自己的算法参数。

### Type

指定布局类型，内置布局类型名称或自定义布局的名称。

```js {4}
const graph = new Graph({
  // 其他配置...
  layout: {
    type: 'antv-dagre',
  },
});
```

可选值有：

- `antv-dagre`：[基于 dagre 定制的布局](/zh/manual/layout/AntvDagreLayout/)
- `circular`：[环形布局](/zh/manual/layout/CircularLayout/)
- `combo-combined`：[适用于存在组合的布局](/zh/manual/layout/ComboCombinedLayout/)
- `concentric`：[同心圆布局](/zh/manual/layout/ConcentricLayout/)
- `d3-force`[基于 D3 的力导向布局](/zh/manual/layout/D3ForceLayout/)
- `d3-force-3d`：[3D力导向布局](/zh/manual/layout/D3Force3DLayout/)
- `dagre`：[dagre 布局](/zh/manual/layout/DagreLayout/)
- `fishbone`：[鱼骨布局](/zh/manual/layout/Fishbone/)
- `force`：[力导向布局](/zh/manual/layout/ForceLayout/)
- `force-atlas2`：[ForceAtlas2 布局](/zh/manual/layout/ForceAtlas2Layout/)
- `fruchterman`：[Fruchterman 布局](/zh/manual/layout/FruchtermanLayout/)
- `grid`：[网格布局](/zh/manual/layout/GridLayout/)
- `mds`：[高维数据降维算法布局](/zh/manual/layout/MdsLayout/)
- `radial`：[径向布局](/zh/manual/layout/RadialLayout/)
- `random`：[随机布局](/zh/manual/layout/RandomLayout/)
- `snake`：[蛇形布局](/zh/manual/layout/Snake/)
- `compact-box`：[紧凑树布局](/zh/manual/layout/CompactBoxLayout/)
- `dendrogram`：[树状布局](/zh/manual/layout/DendrogramLayout/)
- `mindmap`：[思维导图布局](/zh/manual/layout/MindmapLayout/)
- `indented`：[缩进树布局](/zh/manual/layout/IndentedLayout/)
