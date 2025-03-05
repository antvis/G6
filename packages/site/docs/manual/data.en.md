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

## Data Structure

In G6, graph data consists of three parts: `nodes` (node data), `edges` (edge data), and `combos` (combo data). Each part corresponds to different elements in the graph, and their types and data determine how the graph is displayed.

```ts
interface GraphData {
  nodes: NodeData[]; // Node data
  edges?: EdgeData[]; // Edge data (optional)
  combos?: ComboData[]; // Combo data (optional)
}
```

### Node Data

A node is the basic building block of a graph and represents an entity within the graph. Each node has a unique `id` used to identify it, and nodes can also have data, styles, and states.

| Attribute                                 | Type               | Description                                                                                                        |
| ----------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| <Badge type="success">Required</Badge> id | _string_           | Unique identifier for the node, used to distinguish different nodes                                                |
| type                                      | _string_           | Node type. It can be the type of built-in Node, or the custom Node                                                 |
| data                                      | _Object_           | Custom data for the node, such as name, description, etc. Can be accessed in style mappings via callback functions |
| style                                     | _Object_           | Node style, including position, size, color, and other visual properties                                           |
| states                                    | _string[]_         | Initial states for the node, such as selected, active, hover, etc.                                                 |
| combo                                     | _string_ \| _null_ | ID of the combo the node belongs to. Used to organize hierarchical relationships. If none, it is null              |
| children                                  | _string[]_         | Collection of child node IDs, used only in tree diagrams                                                           |

**Example:**

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

### Edge Data

An edge connects nodes and represents the relationship between them. Each edge is associated with two nodes (source and target), and edges themselves can have data, styles, and states. Edge data is often used to represent logical relationships, such as user connections in social networks or step flows in flowcharts.

| Attribute                                     | Type       | Description                                                                                                             |
| --------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| <Badge type="success">Required</Badge> source | _string_   | Source node ID                                                                                                          |
| <Badge type="success">Required</Badge> target | _string_   | Target node ID                                                                                                          |
| id                                            | _string_   | Unique identifier for the edge. If not specified, `id` is automatically generated with the format `${source}-${target}` |
| type                                          | _string_   | Edge type.It can be the type of built-in Edge, or the custom Edge                                                       |
| data                                          | _Object_   | Custom data for the edge, accessible in style mappings via callback functions                                           |
| style                                         | _Object_   | Edge style, including stroke color, line width, arrowhead, etc.                                                         |
| states                                        | _string[]_ | Initial states for the edge                                                                                             |

**Example:**

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

### Combo Data

Combos allow you to create a logical unit for multiple nodes, used for layering, grouping, or other structural purposes. A combo can contain child nodes or other combos, forming a nested structure.

| Attribute                                 | Type               | Description                                                                    |
| ----------------------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| <Badge type="success">Required</Badge> id | _string_           | Unique identifier for the combo                                                |
| type                                      | _string_           | Combo type.It can be the type of built-in Combo, or the custom Combo           |
| data                                      | _Object_           | Custom data for the combo, accessible in style mappings via callback functions |
| style                                     | _Object_           | Combo style                                                                    |
| states                                    | _string[]_         | Initial states for the combo                                                   |
| combo                                     | _string_ \| _null_ | Parent combo ID. If there is no parent combo, it is null                       |

**Example:**

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

## Data Organization and Best Practices

To ensure correct rendering and interaction of the graph, it is recommended to organize the data according to G6's standard data structure. Each element (node, edge, combo) should contain a `data` field to store business data and custom properties.

- **Avoid using identifiers that conflict with internal G6 field names**, such as `id`, `type`, `style`, etc., to prevent naming conflicts.
- Store business data (such as user information, social network relationships, etc.) in the `data` field. This ensures flexibility and scalability of the data.

**Example:**

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
