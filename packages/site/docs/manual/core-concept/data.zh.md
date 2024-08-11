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
