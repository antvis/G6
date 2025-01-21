---
title: 数据
order: 0
---

### Graph.addChildrenData(parentId, childrenData)

为树图节点添加子节点数据

```typescript
addChildrenData(parentId: ID, childrenData: NodeData[]): void;
```

为组合添加子节点使用 addNodeData / addComboData 方法

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

parentId

</td><td>

string

</td><td>

父节点 ID

</td></tr>
<tr><td>

childrenData

</td><td>

[NodeData](../api/reference/g6.nodedata.zh.md)[]

</td><td>

子节点数据

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.addComboData(data)

新增组合数据

```typescript
addComboData(data: ComboData[] | ((prev: ComboData[]) => ComboData[])): void;
```

**示例**

```ts
graph.addComboData([{ id: 'combo-1' }]);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[ComboData](../api/reference/g6.combodata.zh.md)[] \| ((prev: [ComboData](../api/reference/g6.combodata.zh.md)[]) =&gt; [ComboData](../api/reference/g6.combodata.zh.md)[])

</td><td>

组合数据

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.addData(data)

新增元素数据

```typescript
addData(data: GraphData | ((prev: GraphData) => GraphData)): void;
```

**示例**

```ts
graph.addData({
  nodes: [{ id: 'node-1' }, { id: 'node-2' }],
  edges: [{ source: 'node-1', target: 'node-2' }],
});
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[GraphData](../api/reference/g6.graphdata.zh.md) \| ((prev: [GraphData](../api/reference/g6.graphdata.zh.md)) =&gt; [GraphData](../api/reference/g6.graphdata.zh.md))

</td><td>

元素数据

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.addEdgeData(data)

新增边数据

```typescript
addEdgeData(data: EdgeData[] | ((prev: EdgeData[]) => EdgeData[])): void;
```

**示例**

```ts
graph.addEdgeData([{ source: 'node-1', target: 'node-2' }]);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[EdgeData](../api/reference/g6.edgedata.zh.md)[] \| ((prev: [EdgeData](../api/reference/g6.edgedata.zh.md)[]) =&gt; [EdgeData](../api/reference/g6.edgedata.zh.md)[])

</td><td>

边数据

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.addNodeData(data)

新增节点数据

```typescript
addNodeData(data: NodeData[] | ((prev: NodeData[]) => NodeData[])): void;
```

**示例**

```ts
graph.addNodeData([{ id: 'node-1' }, { id: 'node-2' }]);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[NodeData](../api/reference/g6.nodedata.zh.md)[] \| ((prev: [NodeData](../api/reference/g6.nodedata.zh.md)[]) =&gt; [NodeData](../api/reference/g6.nodedata.zh.md)[])

</td><td>

节点数据

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.getAncestorsData(id, hierarchy)

获取节点或组合的祖先元素数据

```typescript
getAncestorsData(id: ID, hierarchy: HierarchyKey): NodeLikeData[];
```

数组中的顺序是从父节点到祖先节点

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点或组合ID

</td></tr>
<tr><td>

hierarchy

</td><td>

'tree' \| 'combo'

</td><td>

指定树图层级关系还是组合层级关系

</td></tr>
</tbody></table>

**返回值**：

- **类型：** NodeData \| ComboData[]

- **描述：** 祖先元素数据

</details>

### Graph.getChildrenData(id)

获取节点或组合的子元素数据

```typescript
getChildrenData(id: ID): NodeLikeData[];
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点或组合ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** NodeData \| ComboData[]

- **描述：** 子元素数据

</details>

### Graph.getComboData()

获取所有组合数据

```typescript
getComboData(): ComboData[];
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** [ComboData](../api/reference/g6.combodata.zh.md)[]

- **描述：** 组合数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getComboData(id)

获取单个组合数据

```typescript
getComboData(id: ID): ComboData;
```

**示例**

```ts
const combo1 = graph.getComboData('combo-1');
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

组合ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [ComboData](../api/reference/g6.combodata.zh.md)

- **描述：** 组合数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getComboData(ids)

批量获取多个组合数据

```typescript
getComboData(ids: ID[]): ComboData[];
```

**示例**

```ts
const [combo1, combo2] = graph.getComboData(['combo-1', 'combo-2']);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[]

</td><td>

组合ID 数组

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [ComboData](../api/reference/g6.combodata.zh.md)[]

- **描述：** 组合数据

</details>

### Graph.getData()

获取图数据

```typescript
getData(): Required<GraphData>;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** Required&lt;[GraphData](../api/reference/g6.graphdata.zh.md)&gt;

- **描述：** 图数据

</details>

### Graph.getDescendantsData(id)

获取节点或组合的后代元素数据

```typescript
getDescendantsData(id: ID): NodeLikeData[];
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点或组合ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** NodeData \| ComboData[]

- **描述：** 后代元素数据

</details>

### Graph.getEdgeData()

获取所有边数据

```typescript
getEdgeData(): EdgeData[];
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** [EdgeData](../api/reference/g6.edgedata.zh.md)[]

- **描述：** 边数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getEdgeData(id)

获取单条边数据

```typescript
getEdgeData(id: ID): EdgeData;
```

**示例**

```ts
const edge1 = graph.getEdgeData('edge-1');
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

边 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [EdgeData](../api/reference/g6.edgedata.zh.md)

- **描述：** 边数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getEdgeData(ids)

批量获取多条边数据

```typescript
getEdgeData(ids: ID[]): EdgeData[];
```

**示例**

```ts
const [edge1, edge2] = graph.getEdgeData(['edge-1', 'edge-2']);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[]

</td><td>

边 ID 数组

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [EdgeData](../api/reference/g6.edgedata.zh.md)[]

- **描述：** 边数据

</details>

### Graph.getElementData(id)

获取单个元素数据

```typescript
getElementData(id: ID): ElementDatum;
```

直接获取元素的数据而不必考虑元素类型

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** NodeData \| EdgeData \| ComboData

- **描述：** 元素数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getElementData(ids)

批量获取多个元素数据

```typescript
getElementData(ids: ID[]): ElementDatum[];
```

直接获取元素的数据而不必考虑元素类型

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[]

</td><td>

元素 ID 数组

</td></tr>
</tbody></table>

**返回值**：

- **类型：** NodeData \| EdgeData \| ComboData[]

</details>

### Graph.getElementDataByState(elementType, state)

获取指定状态下的节点数据

```typescript
getElementDataByState(elementType: 'node', state: State): NodeData[];
```

**示例**

```ts
const nodes = graph.getElementDataByState('node', 'selected');
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

elementType

</td><td>

'node'

</td><td>

</td></tr>
<tr><td>

state

</td><td>

string

</td><td>

状态

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [NodeData](../api/reference/g6.nodedata.zh.md)[]

- **描述：** 节点数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getElementDataByState(elementType, state)

获取指定状态下的边数据

```typescript
getElementDataByState(elementType: 'edge', state: State): EdgeData[];
```

**示例**

```ts
const nodes = graph.getElementDataByState('edge', 'selected');
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

elementType

</td><td>

'edge'

</td><td>

</td></tr>
<tr><td>

state

</td><td>

string

</td><td>

状态

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [EdgeData](../api/reference/g6.edgedata.zh.md)[]

- **描述：** 边数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getElementDataByState(elementType, state)

获取指定状态下的组合数据

```typescript
getElementDataByState(elementType: 'combo', state: State): ComboData[];
```

**示例**

```ts
const nodes = graph.getElementDataByState('node', 'selected');
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

elementType

</td><td>

'combo'

</td><td>

</td></tr>
<tr><td>

state

</td><td>

string

</td><td>

状态

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [ComboData](../api/reference/g6.combodata.zh.md)[]

- **描述：** 组合数据

</details>

### Graph.getNeighborNodesData(id)

获取节点或组合的一跳邻居节点数据

```typescript
getNeighborNodesData(id: ID): NodeData[];
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点或组合ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [NodeData](../api/reference/g6.nodedata.zh.md)[]

- **描述：** 邻居节点数据

</details>

### Graph.getNodeData()

获取所有节点数据

```typescript
getNodeData(): NodeData[];
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** [NodeData](../api/reference/g6.nodedata.zh.md)[]

- **描述：** 节点数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getNodeData(id)

获取单个节点数据

```typescript
getNodeData(id: ID): NodeData;
```

**示例**

```ts
const node1 = graph.getNodeData('node-1');
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [NodeData](../api/reference/g6.nodedata.zh.md)

- **描述：** 节点数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getNodeData(ids)

批量获取多个节点数据

```typescript
getNodeData(ids: ID[]): NodeData[];
```

**示例**

```ts
const [node1, node2] = graph.getNodeData(['node-1', 'node-2']);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[]

</td><td>

节点 ID 数组

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [NodeData](../api/reference/g6.nodedata.zh.md)[]

- **描述：** 节点数据

</details>

### Graph.getParentData(id, hierarchy)

获取节点或组合的父元素数据

```typescript
getParentData(id: ID, hierarchy: HierarchyKey): NodeLikeData | undefined;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点或组合ID

</td></tr>
<tr><td>

hierarchy

</td><td>

'tree' \| 'combo'

</td><td>

指定树图层级关系还是组合层级关系

</td></tr>
</tbody></table>

**返回值**：

- **类型：** NodeData \| ComboData \| undefined

- **描述：** 父元素数据

</details>

### Graph.getRelatedEdgesData(id, direction)

获取节点或组合关联边的数据

```typescript
getRelatedEdgesData(id: ID, direction?: EdgeDirection): EdgeData[];
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点或组合ID

</td></tr>
<tr><td>

direction

</td><td>

'in' \| 'out' \| 'both'

</td><td>

边的方向

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [EdgeData](../api/reference/g6.edgedata.zh.md)[]

- **描述：** 边数据

</details>

### Graph.removeComboData(ids)

删除组合数据

```typescript
removeComboData(ids: ID[] | ((data: ComboData[]) => ID[])): void;
```

**示例**

```ts
graph.removeComboData(['combo-1']);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[] \| ((data: [ComboData](../api/reference/g6.combodata.zh.md)[]) =&gt; string[])

</td><td>

组合 ID 数组

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.removeData(ids)

删除元素数据

```typescript
removeData(ids: DataID | ((data: GraphData) => DataID)): void;
```

**示例**

```ts
graph.removeData({
  nodes: ['node-1', 'node-2'],
  edges: ['edge-1'],
});
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

DataID \| ((data: [GraphData](../api/reference/g6.graphdata.zh.md)) =&gt; DataID)

</td><td>

元素 ID 数组

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.removeEdgeData(ids)

删除边数据

```typescript
removeEdgeData(ids: ID[] | ((data: EdgeData[]) => ID[])): void;
```

如果传入边数据时仅提供了 source 和 target，那么需要通过 `idOf` 方法获取边的实际 ID

**示例**

```ts
graph.removeEdgeData(['edge-1']);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[] \| ((data: [EdgeData](../api/reference/g6.edgedata.zh.md)[]) =&gt; string[])

</td><td>

边 ID 数组

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.removeNodeData(ids)

删除节点数据

```typescript
removeNodeData(ids: ID[] | ((data: NodeData[]) => ID[])): void;
```

**示例**

```ts
graph.removeNodeData(['node-1', 'node-2']);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[] \| ((data: [NodeData](../api/reference/g6.nodedata.zh.md)[]) =&gt; string[])

</td><td>

节点 ID 数组

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.setData(data)

设置全量数据

```typescript
setData(data: GraphData | ((prev: GraphData) => GraphData)): void;
```

设置全量数据会替换当前图中的所有数据，G6 会自动进行数据差异计算

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[GraphData](../api/reference/g6.graphdata.zh.md) \| ((prev: [GraphData](../api/reference/g6.graphdata.zh.md)) =&gt; [GraphData](../api/reference/g6.graphdata.zh.md))

</td><td>

数据

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.updateComboData(data)

更新组合数据

```typescript
updateComboData(data: PartialNodeLikeData<ComboData>[] | ((prev: ComboData[]) => PartialNodeLikeData<ComboData>[])): void;
```

只需要传入需要更新的数据即可，不必传入完整的数据

**示例**

```ts
graph.updateComboData([{ id: 'combo-1', style: { x: 100, y: 100 } }]);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

PartialNodeLikeData&lt;[ComboData](../api/reference/g6.combodata.zh.md)&gt;[] \| ((prev: [ComboData](../api/reference/g6.combodata.zh.md)[]) =&gt; PartialNodeLikeData&lt;[ComboData](../api/reference/g6.combodata.zh.md)&gt;[])

</td><td>

组合数据

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.updateData(data)

更新元素数据

```typescript
updateData(data: PartialGraphData | ((prev: GraphData) => PartialGraphData)): void;
```

只需要传入需要更新的数据即可，不必传入完整的数据

**示例**

```ts
graph.updateData({
  nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
  edges: [{ id: 'edge-1', style: { lineWidth: 2 } }],
});
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

PartialGraphData \| ((prev: [GraphData](../api/reference/g6.graphdata.zh.md)) =&gt; PartialGraphData)

</td><td>

元素数据

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.updateEdgeData(data)

更新边数据

```typescript
updateEdgeData(data: PartialEdgeData<EdgeData>[] | ((prev: EdgeData[]) => PartialEdgeData<EdgeData>[])): void;
```

只需要传入需要更新的数据即可，不必传入完整的数据

**示例**

```ts
graph.updateEdgeData([{ id: 'edge-1', style: { lineWidth: 2 } }]);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

PartialEdgeData&lt;[EdgeData](../api/reference/g6.edgedata.zh.md)&gt;[] \| ((prev: [EdgeData](../api/reference/g6.edgedata.zh.md)[]) =&gt; PartialEdgeData&lt;[EdgeData](../api/reference/g6.edgedata.zh.md)&gt;[])

</td><td>

边数据

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.updateNodeData(data)

更新节点数据

```typescript
updateNodeData(data: PartialNodeLikeData<NodeData>[] | ((prev: NodeData[]) => PartialNodeLikeData<NodeData>[])): void;
```

只需要传入需要更新的数据即可，不必传入完整的数据

**示例**

```ts
graph.updateNodeData([{ id: 'node-1', style: { x: 100, y: 100 } }]);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

PartialNodeLikeData&lt;[NodeData](../api/reference/g6.nodedata.zh.md)&gt;[] \| ((prev: [NodeData](../api/reference/g6.nodedata.zh.md)[]) =&gt; PartialNodeLikeData&lt;[NodeData](../api/reference/g6.nodedata.zh.md)&gt;[])

</td><td>

节点数据

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>
