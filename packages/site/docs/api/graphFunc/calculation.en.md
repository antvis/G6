---
title: Calculation
order: 12
---

### graph.getNodeDegree(node, degreeType, refresh)

Get the in-degree, out-degree, degree, or all of the three kinds of degree.

**Parameter**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| node | string / INode | true | Node's ID or item |
| degreeType | `'in'` \ `'out'` \ `'total'` \ `'all'` | false | The degree type. If it is assigned to `'in'`, returns the in-degree; `'out'` returns out-degree; `'total'` returns total degree; `'all'` returns an object contains three kinds of the degree: `{ inDegree, outDegree, degree}`; If it is not assigned, returns total degree as default |
| refresh | boolean | false | Whether to force refresh the degree for the whole graph. The default value is `false`. You should assign it to be true after adding edges by `addItem` |

**Usage**

```javascript
graph.getNodeDegree('node1', 'in');
```

### graph.getShortestPathMatrix(cache, directed)

Get all-pairs shortest-path matrix of the graph.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| cache | boolean | false | Whether to use the cached matrix, 'true' by default. |
| directed | boolean | false | Whether the graph is directed, use the value of `graph.get('directed')` by default. |

**Usage**

```javascript
const matrix = graph.getShortestPathMatrix();
```

### graph.getAdjMatrix(cache, directed)

Get the adjacency matrix of the graph.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| cache | boolean | false | Whether to use the cached matrix, 'true' by default. |
| directed | boolean | false | Whether the graph is directed, use the value of `graph.get('directed')` by default. |

**Usage**

```javascript
const matrix = graph.getAdjMatrix();
```
