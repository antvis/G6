---
title: 图计算相关
order: 12
---

### graph.getNodeDegree(node, degreeType, refresh)

获取节点的出度、入度、总度数，或同时获得以上三种。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| node | string / INode | true | 节点 ID 或实例 |
| degreeType | `'in'` \ `'out'` \ `'total'` \ `'all'` | false | 获取度数的类型。设置为 `'in'` 将返回入度；`'out'` 将返回出度；`'total'` 将返回总度数；`'all'` 将返回一个含有三种度数的对象：`{ inDegree, outDegree, degree}`；若不指定，将返回总度数 |
| refresh | boolean | false | 是否强制更新整个图的度数缓存。默认为 `false`。当通过 `addItem` 添加边后，再使用 getNodeDegree 时应当将 `refresh` 设置为 `true` |

**用法**

```javascript
graph.getNodeDegree('node1', 'in');
```

### graph.getShortestPathMatrix(cache, directed)

获取图中两两节点之间的最短路径矩阵。

**参数**

| 名称     | 类型    | 是否必选 | 描述                                       |
| -------- | ------- | -------- | ------------------------------------------ |
| cache    | boolean | false    | 是否使用缓存，默认为 true                  |
| directed | boolean | false    | 是否是有向图，默认取 graph.get('directed') |

**返回值**

返回图的最短路径矩阵。

**用法**

```javascript
const matrix = graph.getShortestPathMatrix();
```

### graph.getAdjMatrix(cache, directed)

获取邻接矩阵。

**参数**

| 名称     | 类型    | 是否必选 | 描述                                       |
| -------- | ------- | -------- | ------------------------------------------ |
| cache    | boolean | false    | 是否使用缓存，默认为 true                  |
| directed | boolean | false    | 是否是有向图，默认取 graph.get('directed') |

**返回值**

返回图的邻接矩阵。

**用法**

```javascript
const matrix = graph.getAdjMatrix();
```
