---
title: Custom Transform Extension
order: 4
---

> Before customizing the data processor, make sure you are familiar with G6 data flows and data structures. For relevant content, please refer to [Data Introduction Document](../../apis/data/DataIntro.zh.md).

A custom data processor is essentially a function that is responsible for converting user data into a format that G6 can understand and process internally (inner data).

**Type**: `CustomDataTransformFn`

```typescript
type CustomDataTransformFn = (
  data: GraphDataChanges,
  options: Record<string, any>,
  graphCore?: GraphCore,
) => GraphDataChanges;
```

`GraphDataChanges` is defined as follows:

G6 will automatically divide data changes into three parts based on the type of operation: data to be added (`dataAdded`), updated (`dataUpdated`) and deleted (`dataRemoved`).

```typescript
typeGraphData = {
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

Among them, the input data types refer to [NodeUserModel input data](./NodeUserModel.zh.md), [EdgeUserModel input data](./EdgeUserModel.zh.md) and [ComboUserModel input data](./ComboUserModel.zh.md) .

Please ensure that the data returned by your processor strictly adheres to the `GraphDataChanges` type definition to ensure that the processor can be smoothly embedded in G6's data processing flow.

## Example

Here we take the implementation of a simple data processing as an example. The purpose of the data processor is to cluster the given node data.

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
  // ...other configuration
  transforms: [
    'map-node-size',
    {
      type: 'clustering-node',
      activeLifecycle: ['read', 'changeData'],
    },
  ],
});
```
