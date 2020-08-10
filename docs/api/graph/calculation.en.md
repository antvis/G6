---
title: Calculation
order: 10
---

### graph.getNodeDegree(node, degreeType)

Get the in-degree, out-degree, degree, or all of the three kinds of degree.

**Parameter**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| node | string / INode | true | Node's ID or item |
| degreeType | `'in'` \ `'out'` \ `'total'` \ `'all'` | false | The degree type. If it is assigned to `'in'`, returns the in-degree; `'out'` returns out-degree; `'total'` returns total degree; `'all'` returns an object contains three kinds of the degree: `{ inDegree, outDegree, degree}`; If it is not assigned, returns total degree as default |

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
