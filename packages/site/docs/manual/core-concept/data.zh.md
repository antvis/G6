---
title: Data - 数据
order: 1
---

## 概述

G6 是一款数据驱动的图表库，数据是 G6 中最重要的概念之一。在 G6 中，数据是图表的核心，图表的展示和交互都是基于数据的。

常见的图数据格式包括：CSV, [DOT](https://graphviz.org/doc/info/lang.html), GDF, GML, [GraphML](http://graphml.graphdrawing.org/), [GEXF](https://gexf.net/) 等。

G6 采用 JSON 格式来描述图结构，其中包括节点和边的信息。下面是一个简单的 JSON 数据示例：

```json
{
  "nodes": [{ "id": "node1" }, { "id": "node2" }],
  "edges": [{ "source": "node1", "target": "node2" }]
}
```

与上述其他格式相比，JSON 格式的数据结构更加直观和易于理解，同时也更加灵活，可以方便地扩展节点和边的属性。

它是一种计算机广泛支持的数据交换格式，你不必担心数据格式的兼容性问题。

## 数据结构

在 G6 中，图数据包含三部分：`nodes`（节点数据）、`edges`（边数据）、`combos`（组合数据）。每一部分对应图中的不同元素，它们的类型和数据决定了图如何展示。

```ts
interface GraphData {
  nodes: NodeData[]; // 节点数据
  edges?: EdgeData[]; // 边数据（可选）
  combos?: ComboData[]; // 组合数据（可选）
}
```

### 节点数据（NodeData）

节点是图中的基本构成单元，它代表图中的实体。每个节点都有一个唯一的 `id`，用于标识节点，同时节点也可以有数据、样式和状态。

| 属性                                  | 类型               | 描述                                                                                         |
| ------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| <Badge type="success">必填</Badge> id | _string_           | 节点的唯一标识符，用于区分不同的节点                                                         |
| type                                  | _string_           | 节点类型，内置节点类型名称或者自定义节点的名称                                               |
| data                                  | _Object_           | 节点数据，用于存储节点的自定义数据，例如节点的名称、描述等。可以在样式映射中通过回调函数获取 |
| style                                 | _Object_           | 节点样式，包括位置、大小、颜色等视觉属性                                                     |
| states                                | _string[]_         | 节点初始状态，如选中、激活、悬停等                                                           |
| combo                                 | _string_ \| _null_ | 所属的组合 ID，用于组织节点的层级关系，如果没有则为 null                                     |
| children                              | _string[]_         | 子节点 ID 集合，仅在树图场景下使用                                                           |

**示例：**

```json
{
  "id": "node-1",
  "type": "circle",
  "data": { "name": "alice", "role": "Admin" },
  "style": { "x": 100, "y": 200, "size": 32, "fill": "violet" },
  "states": ["selected"],
  "combo": null
}
```

### 边数据（EdgeData）

边是连接节点的元素，表示节点之间的关系。每条边都与两个节点（起始节点和目标节点）关联，并且边本身可以有数据、样式和状态。边的数据常用于表示节点之间的逻辑或关系，如社交网络中的用户关系、流程图中的步骤流转等。

| 属性                                      | 类型       | 描述                                                                     |
| ----------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| <Badge type="success">必填</Badge> source | _string_   | 边起始节点 ID                                                            |
| <Badge type="success">必填</Badge> target | _string_   | 边目标节点 ID                                                            |
| id                                        | _string_   | 边的唯一标识符。若不指定，`id` 将根据规则 `${source}-${target}` 自动生成 |
| type                                      | _string_   | 边类型，内置边类型名称或者自定义边的名称                                 |
| data                                      | _Object_   | 边数据，用于存储边的自定义数据，可以在样式映射中通过回调函数获取         |
| style                                     | _Object_   | 边样式，包括线条颜色、宽度、箭头等视觉属性                               |
| states                                    | _string[]_ | 边初始状态                                                               |

**示例：**

```json
{
  "source": "alice",
  "target": "bob",
  "type": "line",
  "data": { "relationship": "friend", "strength": 5 },
  "style": { "stroke": "green", "lineWidth": 2 },
  "states": ["hover"]
}
```

### 组合数据（ComboData）

通过组合，可以为多个节点创建一个逻辑单元，用于图形的分层、分组或其他结构化需求。组合可以包含子节点或其他组合，从而形成嵌套层次。

| 属性                                  | 类型               | 描述                                                                 |
| ------------------------------------- | ------------------ | -------------------------------------------------------------------- |
| <Badge type="success">必填</Badge> id | _string_           | 组合的唯一标识符                                                     |
| type                                  | _string_           | 组合类型，内置组合类型名称或者自定义组合名称                         |
| data                                  | _Object_           | 组合数据，用于存储组合的自定义数据，可以在样式映射中通过回调函数获取 |
| style                                 | _Object_           | 组合样式                                                             |
| states                                | _string[]_         | 组合初始状态                                                         |
| combo                                 | _string_ \| _null_ | 组合的父组合 ID。如果没有父组合，则为 null                           |

**示例：**

```json
{
  "id": "combo1",
  "type": "circle",
  "data": { "groupName": "Group A" },
  "style": { "fill": "lightblue", "stroke": "blue", "collapsed": true },
  "states": [],
  "combo": null
}
```

## 数据组织与最佳实践

为了确保图的正确渲染和交互，建议按照 G6 标准数据结构组织数据。每个元素（节点、边、组合）应包含一个 `data` 字段，用于存放业务数据和自定义属性。

- **避免使用与 G6 内部字段名称相同的标识符**，如 `id`、`type`、`style` 等，防止发生命名冲突。
- 将业务数据（如用户信息、社交网络关系等）存储在 `data` 字段中，这样可以确保数据的灵活性和可扩展性。

**示例：**

```json
{
  "nodes": [
    {
      "id": "node1",
      "data": { "name": "Alice", "role": "Admin" }
    },
    {
      "id": "node2",
      "data": { "name": "Bob", "role": "User" }
    }
  ],
  "edges": [
    {
      "source": "node1",
      "target": "node2",
      "data": { "relationship": "friend" }
    }
  ]
}
```

## API

G6 提供了一系列的 API 来访问和操作数据，包括：

- [getData](/api/graph/method#graphgetdata)
- [setData](/api/graph/method#graphsetdatadata)
- [getNodeData](/api/graph/method#graphgetnodedata)
- [getEdgeData](/api/graph/method#graphgetedgedata)
- [getComboData](/api/graph/method#graphgetcombodata)
- [addData](/api/graph/method#graphadddatadata)
- [addNodeData](/api/graph/method#graphaddnodedatadata)
- [addEdgeData](/api/graph/method#graphaddedgedatadata)
- [addComboData](/api/graph/method#graphaddcombodatadata)
- [updateData](/api/graph/method#graphupdatedatadata)
- [updateNodeData](/api/graph/method#graphupdatenodedatadata)
- [updateEdgeData](/api/graph/method#graphupdateedgedatadata)
- [updateComboData](/api/graph/method#graphupdatecombodatadata)
- [removeData](/api/graph/method#graphremovedataids)
- [removeNodeData](/api/graph/method#graphremovenodedataids)
- [removeEdgeData](/api/graph/method#graphremoveedgedataids)
- [removeComboData](/api/graph/method#graphremovecombodataids)

通过不同的 API，你可以方便地访问和操作图数据，实现图的增删改查等操作。

## 使用远程数据

G6 并不提供数据的获取和解析功能，对于本地 JSON 数据，你可以直接引入使用：

```typescript
import data from './path/to/data.json' assert { type: 'json' };
```

对于远程数据，你可以使用 `fetch` 或者其他网络请求库来获取数据：

```typescript
fetch('https://path/to/data.json')
  .then((res) => res.json())
  .then((data) => {
    // 使用 data
  });
```
