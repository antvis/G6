---
title: TreeData
order: 2
---

The TreeData type is the type of tree graph data, which is one of the data types accepted by the Graph class. In version 5, the Graph and TreeGraph are connected, meaning that the same Graph class can read both the [GraphData](./GraphData.en.md) format and the tree graph data format described in this document. `TreeGraph` is a nested data structure that represents the parent-child hierarchy of a tree. Unlike `GraphData`, `TreeData` does not explicitly define `edges` and does not have an `edges` array. Instead, the nested `children` implicitly represent the edges, meaning that there is an edge between parent and child nodes.

In version 5, the Graph class can read `GraphData`, `TreeData`, and `TreeData[]`, which means it can display graph data, tree graph data, and forests of multiple trees.

## Properties

### id

- Required: Yes;
- Type: `string | number`;

The unique ID of the node. Once the node is created, the ID cannot be modified.

### data

- Required: Yes;
- Type: [`NodeUserModelData`](./NodeUserModelData.en.md);

The data of the node, excluding the ID. It is recommended to store business data in this property. If data transformation is needed, it can be done through the transform configuration of the Graph instance, see [Specification.transforms](../graph/Specification.en.md#transforms). The transformed data becomes the internal circulating data (Inner Data), and all subsequent accesses will obtain this internal data. Mapping related to rendering can be done through the node mapper of the Graph instance, see [Specification.node](../graph/Specification.en.md#node). The input of this mapper is the Inner Data, and the generated Display Data is only consumed by the renderer. Users will not get it anywhere.

### children

- Required: False;
- Type: `TreeData`;

The array of child nodes of this node. It is a nested `TreeData` format node.
