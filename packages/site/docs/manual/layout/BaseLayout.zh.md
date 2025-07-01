---
title: 布局通用配置项
order: 1
---

本文介绍内置布局通用属性配置。

## 通用配置

| 属性                   | 描述                                                  | 类型                        | 默认值     | 必选 |
| ---------------------- | ----------------------------------------------------- | --------------------------- | ---------- | ---- |
| type                   | 布局类型，内置布局或自定义布局的名称                  | [Type](#Type)               | -          | ✓    |
| isLayoutInvisibleNodes | 不可见节点是否参与布局（当 preLayout 为 true 时生效） | boolean                     | false      |      |
| nodeFilter             | 参与该布局的节点                                      | (node: NodeData) => boolean | () => true |      |
| preLayout              | 使用前布局，在初始化元素前计算布局                    | boolean                     | false      |      |
| enableWorker           | 是否在 WebWorker 中运行布局                           | boolean                     | -          |      |
| iterations             | 迭代布局的迭代次数                                    | number                      | -          |      |

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

- `antv-dagre`：[基于 dagre 定制的布局](/manual/layout/antv-dagre-layout)
- `circular`：[环形布局](/manual/layout/circular-layout)
- `combo-combined`：[适用于存在组合的布局](/manual/layout/combo-combined-layout)
- `concentric`：[同心圆布局](/manual/layout/concentric-layout)
- `d3-force`[基于 D3 的力导向布局](/manual/layout/d3-force-layout)
- `d3-force-3d`：[3D力导向布局](/manual/layout/d3-force3-d-layout)
- `dagre`：[dagre 布局](/manual/layout/dagre-layout)
- `fishbone`：[鱼骨布局](/manual/layout/fishbone)
- `force`：[力导向布局](/manual/layout/force-layout)
- `force-atlas2`：[ForceAtlas2 布局](/manual/layout/force-atlas2-layout)
- `fruchterman`：[Fruchterman 布局](/manual/layout/fruchterman-layout)
- `grid`：[网格布局](/manual/layout/grid-layout)
- `mds`：[高维数据降维算法布局](/manual/layout/mds-layout)
- `radial`：[径向布局](/manual/layout/radial-layout)
- `random`：[随机布局](/manual/layout/random-layout)
- `snake`：[蛇形布局](/manual/layout/snake)
- `compact-box`：[紧凑树布局](/manual/layout/compact-box-layout)
- `dendrogram`：[树状布局](/manual/layout/dendrogram-layout)
- `mindmap`：[思维导图布局](/manual/layout/mindmap-layout)
- `indented`：[缩进树布局](/manual/layout/indented-layout)
