---
title: 流水线子图布局
order: 4
---

## 流水线子图布局

**v4.3.0 新增**，支持在 Graph.layout 中同时配置多个子图布局。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*TaymQYKOJkgAAAAAAAAAAAAAARQnAQ' alt="img" width='400px'>


### 使用方法

在实例化图时配置 layout.pipes 数组，指定多个子图布局的布局类型（`type`）、布局参数、节点过滤函数（`nodesFilter`）。值得注意的是，若某些节点同时属于不同的子图（即这些节点在不同的子图的 `nodesFilter` 配置都返回为 true），则这些节点位置的计算将按照 pipes 数组顺序后者覆盖前者。

`layout.pipes` 的数据类型如下：

```javascript
type Pipes =
  {
    // 该子图所使用的布局类型
    type: 'random' | 'radial' | 'mds' | 'circular' | 'fruchterman' | 'force' | 'gForce' | 'dagre' | 'concentric' | 'grid' | 'forceAtlas2',
    // 节点的筛选器，参数为节点数据，返回布尔值代表该节点是否在该子图中
    nodesFilter: (node: NodeData) => boolean;
    ... // 布局对应的参数，详见各个布局的参数
  }[];
```

使用示例：

```javascript
// 在实例化图时配置 layout.pipes
const graph = new G6.Graph({
  // ...                      // 其他配置项
  layout: {
    pipes: [
      {
        // 该子图所使用的布局类型
        type: 'circular',
        // 根据节点的某个字段判断是否属于该子图
        nodesFilter: (node) => node.subGraphId === '1',
        // ... 可配置该 circular 布局的参数，详见各布局文档
      },
      {
        type: 'grid',
        nodesFilter: (node) => node.subGraphId === '2',
        // 该 grid 布局的其他参数
        begin: [100, 0],
      }
    ]
  },
});
```
