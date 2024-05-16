---
title: Data
order: 1
---

## Overview

G6 is a data-driven charting library, where data is one of the most important concepts. In G6, data is the core of the chart, and both display and interaction are based on data.

Common graph data formats include:CSV, [DOT](https://graphviz.org/doc/info/lang.html), GDF, GML, [GraphML](http://graphml.graphdrawing.org/), [GEXF](https://gexf.net/) etc。

G6 uses JSON format to describe the graph structure, which includes information about nodes and edges. Here is a simple JSON data example:

```json
{
  "nodes": [{ "id": "node1" }, { "id": "node2" }],
  "edges": [{ "source": "node1", "target": "node2" }]
}
```

Compared to the other formats mentioned above, the JSON format has a more intuitive and understandable data structure. It is also more flexible, allowing for easy expansion of node and edge attributes.

It is a data exchange format widely supported by computers, so you do not have to worry about data format compatibility issues.

## API

G6 provides a series of APIs to access and manipulate data, including:

- [getData](/en/api/graph/method#graphgetdata)
- [setData](/en/api/graph/method#graphsetdatadata)
- [updateData](/en/api/graph/method#graphupdatedatadata)
- [getNodeData](/en/api/graph/method#graphgetnodedata)
- [getEdgeData](/en/api/graph/method#graphgetedgedata)
- [getComboData](/en/api/graph/method#graphgetcombodata)
- [addData](/en/api/graph/method#graphadddatadata)
- [addNodeData](/en/api/graph/method#graphaddnodedatadata)
- [addEdgeData](/en/api/graph/method#graphaddedgedatadata)
- [addComboData](/en/api/graph/method#graphaddcombodatadata)
- [updateData](/en/api/graph/method#graphupdatedatadata)
- [updateNodeData](/en/api/graph/method#graphupdatenodedatadata)
- [updateEdgeData](/en/api/graph/method#graphupdateedgedatadata)
- [updateComboData](/en/api/graph/method#graphupdatecombodatadata)
- [removeData](/en/api/graph/method#graphremovedataids)
- [removeNodeData](/en/api/graph/method#graphremovenodedataids)
- [removeEdgeData](/en/api/graph/method#graphremoveedgedataids)
- [removeComboData](/en/api/graph/method#graphremovecombodataids)

Through different APIs, you can conveniently access and manipulate graph data, performing operations such as adding, deleting, modifying, and querying the graph.

## Use Remote Data

G6 does not provide functionality for data retrieval and parsing. For local JSON data, you can directly import and use it as follows:

```typescript
import data from './path/to/data.json' assert { type: 'json' };
```

For remote data, you can use `fetch` or other networking libraries to retrieve the data:

```typescript
fetch('https://path/to/data.json')
  .then((res) => res.json())
  .then((data) => {
    // Use data
  });
```
