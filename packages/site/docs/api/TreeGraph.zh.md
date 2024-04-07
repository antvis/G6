---
title: 树图配置 G6.TreeGraph(cfg)
order: 3
---

创建 TreeGraph 实例。

```ts
// highlight-start
new G6.TreeGraph(cfg: GraphOptions) => TreeGraph
// highlight-end

const treeGraph = new G6.TreeGraph({
  container: 'mountNode',
  width: 800,
  height: 600,
  modes: {
    default: [
      {
        type: 'collapse-expand',
        onChange(item, collapsed) {
          const icon = item.get('group').findByClassName('collapse-icon');
          if (collapsed) {
            icon.attr('symbol', EXPAND_ICON);
          } else {
            icon.attr('symbol', COLLAPSE_ICON);
          }
        },
      },
      'drag-canvas',
      'zoom-canvas',
    ],
  },
  layout: {
    type: 'dendrogram',
    direction: 'LR', // H / V / LR / RL / TB / BT
    nodeSep: 50,
    rankSep: 100,
    radial: true,
  },
});
```

TreeGraph 是 G6 专门为树图场景打造的图。`G6.TreeGraph` 与 `G6.Graph` 最大的区别就是数据结构和内置布局计算。主要考虑：

- 数据结构：树图的数据一般是嵌套结构，边的数据隐含在嵌套结构中，并不会特意指定 edge 。此布局要求数据中一个节点需要有 `id` 和 `children` 两个数据项，最精简的数据结构如下所示：

```javascript
const data = {
  id: 'root',
  children: [
    {
      id: 'subTree1',
      children: [...]
    },
    {
      id: 'subTree2',
      children: [...]
    }
  ]
};
```

- 布局特殊性：
  - 树图的布局算法一般是不改变源数据的，而是重新生成一份数据，将源数据作为新数据的一个属性。如果每次都需要做次遍历转换数据到节点和边的数据增加了用户的实现复杂度。
  - 树图的每次新增/删除/展开/收缩节点，都需要重新计算布局。遍历一份结构化数据对应到图上每个节点去做更新操作，也很麻烦。

TreeGraph 继承自 Graph，配置项参考 [G6.Graph(GraphOptions)](/zh/docs/api/Graph)。其中， layout 配置项支持的布局类型 (`type` 属性) 和 Graph 中所支持的类型不同，TreeGraph 中 layout 目前支持 dendrogram、compactBox、mindmap 和 indented 四种布局方式，具体配置方式见 [TreeGraph Layout](/zh/docs/api/tree-graph-layout/guide)。
