---
title: 自定义数据处理
order: 4
---

> 在进行自定义数据处理器之前，请确保您已经熟悉了 G6 数据流和数据结构。相关内容可以参考[数据介绍文档](../../apis/data/DataIntro.zh.md)。

自定义数据处理器本质上是一个函数，它负责将用户数据 (user data) 转换为 G6 内部可以理解和处理的格式 (inner data)。

**类型**：`CustomDataTransformFn`

```typescript
type CustomDataTransformFn = (
  data: GraphDataChanges,
  options: Record<string, any>,
  graphCore?: GraphCore,
) => GraphDataChanges;
```

`GraphDataChanges` 定义如下：

G6 会根据操作类型，将数据变更自动划分为三个部分：待添加（`dataAdded`）、更新（`dataUpdated`）和删除（`dataRemoved`）数据。

```typescript
type GraphData = {
  nodes?: NodeUserModel[];
  edges?: EdgeUserModel[];
  combos?: ComboUserModel[];
};

type GraphDataChanges = {
  dataAdded: GraphData;
  dataUpdated: GraphData;
  dataRemoved: GraphData;
};
```

其中，输入数据类型参考 [NodeUserModel 输入数据](./NodeUserModel.zh.md)，[EdgeUserModel 输入数据](./EdgeUserModel.zh.md) 和 [ComboUserModel 输入数据](./ComboUserModel.zh.md)。

请确保您的处理器返回的数据严格遵守 `GraphDataChanges` 类型定义，以保证处理器能顺利嵌入 G6 的数据处理流程中。

## 示例

这里以实现一个简单的数据处理为例，该数据处理器目的是对给定的节点数据进行聚类处理。

```typescript
const clusteringNodes = (dataAUR = {}, options = {}, graphCore) => {
  const { dataAdded = {}, dataUpdated = {}, dataRemoved = {} } = dataAUR;
  const handler = (data = {}, options = {}, core) => {
    if (!Algorithm?.labelPropagation || !data.nodes?.length) return data;
    const nodes = graphCore ? core.getAllNodes() : data.nodes;
    const edges = graphCore ? core.getAllEdges() : data.edges;
    const clusteredData = Algorithm.labelPropagation({ nodes, edges }, false);
    clusteredData.clusters.forEach((cluster, i) => {
      cluster.nodes.forEach((node) => {
        node.data.cluster = `c${i}`;
      });
    });
    return data;
  };
  return {
    dataAdded: handler(dataAdded, options, graphCore),
    dataUpdated: handler(dataUpdated, options, graphCore),
    dataRemoved: dataRemoved || {},
  };
};

const ExtGraph = extend(Graph, {
  transforms: {
    'clustering-node': clusteringNodes,
  },
});

const graph = new ExtGraph({
  // ...其他配置
  transforms: [
    'map-node-size',
    {
      type: 'clustering-node',
      activeLifecycle: ['read', 'changeData'],
    },
  ],
});
```
