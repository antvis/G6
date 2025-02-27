---
title: Data
order: 0
---

### Graph.addChildrenData(parentId, childrenData)

Add child node data to the tree node

```typescript
addChildrenData(parentId: ID, childrenData: NodeData[]): void;
```

Use addNodeData / addComboData method to add child nodes to the combo

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

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

[NodeData](../api/reference/g6.nodedata.en.md)[]

</td><td>

子节点数据

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.addComboData(data)

Add combo data

```typescript
addComboData(data: ComboData[] | ((prev: ComboData[]) => ComboData[])): void;
```

**Example**

```ts
graph.addComboData([{ id: 'combo-1' }]);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[ComboData](../api/reference/g6.combodata.en.md)[] \| ((prev: [ComboData](../api/reference/g6.combodata.en.md)[]) =&gt; [ComboData](../api/reference/g6.combodata.en.md)[])

</td><td>

组合数据

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.addData(data)

Add element data

```typescript
addData(data: GraphData | ((prev: GraphData) => GraphData)): void;
```

**Example**

```ts
graph.addData({
  nodes: [{ id: 'node-1' }, { id: 'node-2' }],
  edges: [{ source: 'node-1', target: 'node-2' }],
});
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[GraphData](../api/reference/g6.graphdata.en.md) \| ((prev: [GraphData](../api/reference/g6.graphdata.en.md)) =&gt; [GraphData](../api/reference/g6.graphdata.en.md))

</td><td>

元素数据

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.addEdgeData(data)

Add edge data

```typescript
addEdgeData(data: EdgeData[] | ((prev: EdgeData[]) => EdgeData[])): void;
```

**Example**

```ts
graph.addEdgeData([{ source: 'node-1', target: 'node-2' }]);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[EdgeData](../api/reference/g6.edgedata.en.md)[] \| ((prev: [EdgeData](../api/reference/g6.edgedata.en.md)[]) =&gt; [EdgeData](../api/reference/g6.edgedata.en.md)[])

</td><td>

边数据

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.addNodeData(data)

Add node data

```typescript
addNodeData(data: NodeData[] | ((prev: NodeData[]) => NodeData[])): void;
```

**Example**

```ts
graph.addNodeData([{ id: 'node-1' }, { id: 'node-2' }]);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[NodeData](../api/reference/g6.nodedata.en.md)[] \| ((prev: [NodeData](../api/reference/g6.nodedata.en.md)[]) =&gt; [NodeData](../api/reference/g6.nodedata.en.md)[])

</td><td>

节点数据

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.getAncestorsData(id, hierarchy)

Get the ancestor element data of the node or combo

```typescript
getAncestorsData(id: ID, hierarchy: HierarchyKey): NodeLikeData[];
```

The order in the array is from the parent node to the ancestor node

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

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

**Returns**:

- **Type:** NodeData \| ComboData[]

- **Description:** 祖先元素数据

</details>

### Graph.getChildrenData(id)

Get the child element data of the node or combo

```typescript
getChildrenData(id: ID): NodeLikeData[];
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点或组合ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** NodeData \| ComboData[]

- **Description:** 子元素数据

</details>

### Graph.getComboData()

Get all combo data

```typescript
getComboData(): ComboData[];
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** [ComboData](../api/reference/g6.combodata.en.md)[]

- **Description:** 组合数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getComboData(id)

Get single combo data

```typescript
getComboData(id: ID): ComboData;
```

**Example**

```ts
const combo1 = graph.getComboData('combo-1');
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

组合ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [ComboData](../api/reference/g6.combodata.en.md)

- **Description:** 组合数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getComboData(ids)

Get multiple combo data in batch

```typescript
getComboData(ids: ID[]): ComboData[];
```

**Example**

```ts
const [combo1, combo2] = graph.getComboData(['combo-1', 'combo-2']);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[]

</td><td>

组合ID 数组

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [ComboData](../api/reference/g6.combodata.en.md)[]

- **Description:** 组合数据

</details>

### Graph.getData()

Get graph data

```typescript
getData(): Required<GraphData>;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** Required&lt;[GraphData](../api/reference/g6.graphdata.en.md)&gt;

- **Description:** 图数据

</details>

### Graph.getDescendantsData(id)

Get the descendant element data of the node or combo

```typescript
getDescendantsData(id: ID): NodeLikeData[];
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点或组合ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** NodeData \| ComboData[]

- **Description:** 后代元素数据

</details>

### Graph.getEdgeData()

Get all edge data

```typescript
getEdgeData(): EdgeData[];
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** [EdgeData](../api/reference/g6.edgedata.en.md)[]

- **Description:** 边数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getEdgeData(id)

Get single edge data

```typescript
getEdgeData(id: ID): EdgeData;
```

**Example**

```ts
const edge1 = graph.getEdgeData('edge-1');
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

边 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [EdgeData](../api/reference/g6.edgedata.en.md)

- **Description:** 边数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getEdgeData(ids)

Get multiple edge data in batch

```typescript
getEdgeData(ids: ID[]): EdgeData[];
```

**Example**

```ts
const [edge1, edge2] = graph.getEdgeData(['edge-1', 'edge-2']);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[]

</td><td>

边 ID 数组

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [EdgeData](../api/reference/g6.edgedata.en.md)[]

- **Description:** 边数据

</details>

### Graph.getElementData(id)

Get element data by ID

```typescript
getElementData(id: ID): ElementDatum;
```

Get element data directly without considering the element type

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** NodeData \| EdgeData \| ComboData

- **Description:** 元素数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getElementData(ids)

Get multiple element data in batch

```typescript
getElementData(ids: ID[]): ElementDatum[];
```

Get element data directly without considering the element type

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[]

</td><td>

元素 ID 数组

</td></tr>
</tbody></table>

**Returns**:

- **Type:** NodeData \| EdgeData \| ComboData[]

</details>

### Graph.getElementDataByState(elementType, state)

Get node data in a specific state

```typescript
getElementDataByState(elementType: 'node', state: State): NodeData[];
```

**Example**

```ts
const nodes = graph.getElementDataByState('node', 'selected');
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

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

**Returns**:

- **Type:** [NodeData](../api/reference/g6.nodedata.en.md)[]

- **Description:** 节点数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getElementDataByState(elementType, state)

Get edge data in a specific state

```typescript
getElementDataByState(elementType: 'edge', state: State): EdgeData[];
```

**Example**

```ts
const nodes = graph.getElementDataByState('edge', 'selected');
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

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

**Returns**:

- **Type:** [EdgeData](../api/reference/g6.edgedata.en.md)[]

- **Description:** 边数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getElementDataByState(elementType, state)

Get combo data in a specific state

```typescript
getElementDataByState(elementType: 'combo', state: State): ComboData[];
```

**Example**

```ts
const nodes = graph.getElementDataByState('node', 'selected');
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

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

**Returns**:

- **Type:** [ComboData](../api/reference/g6.combodata.en.md)[]

- **Description:** 组合数据

</details>

### Graph.getNeighborNodesData(id)

Get the one-hop neighbor node data of the node or combo

```typescript
getNeighborNodesData(id: ID): NodeData[];
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点或组合ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [NodeData](../api/reference/g6.nodedata.en.md)[]

- **Description:** 邻居节点数据

</details>

### Graph.getNodeData()

Get all node data

```typescript
getNodeData(): NodeData[];
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** [NodeData](../api/reference/g6.nodedata.en.md)[]

- **Description:** 节点数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getNodeData(id)

Get single node data

```typescript
getNodeData(id: ID): NodeData;
```

**Example**

```ts
const node1 = graph.getNodeData('node-1');
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

节点 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [NodeData](../api/reference/g6.nodedata.en.md)

- **Description:** 节点数据

</details>

### <Badge type="warning">Overload</Badge> Graph.getNodeData(ids)

Get multiple node data in batch

```typescript
getNodeData(ids: ID[]): NodeData[];
```

**Example**

```ts
const [node1, node2] = graph.getNodeData(['node-1', 'node-2']);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[]

</td><td>

节点 ID 数组

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [NodeData](../api/reference/g6.nodedata.en.md)[]

- **Description:** 节点数据

</details>

### Graph.getParentData(id, hierarchy)

Get the parent element data of the node or combo

```typescript
getParentData(id: ID, hierarchy: HierarchyKey): NodeLikeData | undefined;
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

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

**Returns**:

- **Type:** NodeData \| ComboData \| undefined

- **Description:** 父元素数据

</details>

### Graph.getRelatedEdgesData(id, direction)

Get edge data related to the node or combo

```typescript
getRelatedEdgesData(id: ID, direction?: EdgeDirection): EdgeData[];
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

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

**Returns**:

- **Type:** [EdgeData](../api/reference/g6.edgedata.en.md)[]

- **Description:** 边数据

</details>

### Graph.removeComboData(ids)

Remove combo data

```typescript
removeComboData(ids: ID[] | ((data: ComboData[]) => ID[])): void;
```

**Example**

```ts
graph.removeComboData(['combo-1']);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[] \| ((data: [ComboData](../api/reference/g6.combodata.en.md)[]) =&gt; string[])

</td><td>

组合 ID 数组

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.removeData(ids)

Remove element data

```typescript
removeData(ids: DataID | ((data: GraphData) => DataID)): void;
```

**Example**

```ts
graph.removeData({
  nodes: ['node-1', 'node-2'],
  edges: ['edge-1'],
});
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

DataID \| ((data: [GraphData](../api/reference/g6.graphdata.en.md)) =&gt; DataID)

</td><td>

元素 ID 数组

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.removeEdgeData(ids)

Remove edge data

```typescript
removeEdgeData(ids: ID[] | ((data: EdgeData[]) => ID[])): void;
```

If only the source and target are provided when passing in the edge data, you need to get the actual ID of the edge through the `idOf` method

**Example**

```ts
graph.removeEdgeData(['edge-1']);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[] \| ((data: [EdgeData](../api/reference/g6.edgedata.en.md)[]) =&gt; string[])

</td><td>

边 ID 数组

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.removeNodeData(ids)

Remove node data

```typescript
removeNodeData(ids: ID[] | ((data: NodeData[]) => ID[])): void;
```

**Example**

```ts
graph.removeNodeData(['node-1', 'node-2']);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

ids

</td><td>

string[] \| ((data: [NodeData](../api/reference/g6.nodedata.en.md)[]) =&gt; string[])

</td><td>

节点 ID 数组

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.setData(data)

Set full data

```typescript
setData(data: GraphData | ((prev: GraphData) => GraphData)): void;
```

Setting full data will replace all data in the current graph, and G6 will automatically calculate the data difference

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

[GraphData](../api/reference/g6.graphdata.en.md) \| ((prev: [GraphData](../api/reference/g6.graphdata.en.md)) =&gt; [GraphData](../api/reference/g6.graphdata.en.md))

</td><td>

数据

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.updateComboData(data)

Update combo data

```typescript
updateComboData(data: PartialNodeLikeData<ComboData>[] | ((prev: ComboData[]) => PartialNodeLikeData<ComboData>[])): void;
```

Just pass in the data that needs to be updated, no need to pass in the complete data

**Example**

```ts
graph.updateComboData([{ id: 'combo-1', style: { x: 100, y: 100 } }]);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

PartialNodeLikeData&lt;[ComboData](../api/reference/g6.combodata.en.md)&gt;[] \| ((prev: [ComboData](../api/reference/g6.combodata.en.md)[]) =&gt; PartialNodeLikeData&lt;[ComboData](../api/reference/g6.combodata.en.md)&gt;[])

</td><td>

组合数据

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.updateData(data)

Update element data

```typescript
updateData(data: PartialGraphData | ((prev: GraphData) => PartialGraphData)): void;
```

Just pass in the data that needs to be updated, no need to pass in the complete data

**Example**

```ts
graph.updateData({
  nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
  edges: [{ id: 'edge-1', style: { lineWidth: 2 } }],
});
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

PartialGraphData \| ((prev: [GraphData](../api/reference/g6.graphdata.en.md)) =&gt; PartialGraphData)

</td><td>

元素数据

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.updateEdgeData(data)

Update edge data

```typescript
updateEdgeData(data: PartialEdgeData<EdgeData>[] | ((prev: EdgeData[]) => PartialEdgeData<EdgeData>[])): void;
```

Just pass in the data that needs to be updated, no need to pass in the complete data

**Example**

```ts
graph.updateEdgeData([{ id: 'edge-1', style: { lineWidth: 2 } }]);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

PartialEdgeData&lt;[EdgeData](../api/reference/g6.edgedata.en.md)&gt;[] \| ((prev: [EdgeData](../api/reference/g6.edgedata.en.md)[]) =&gt; PartialEdgeData&lt;[EdgeData](../api/reference/g6.edgedata.en.md)&gt;[])

</td><td>

边数据

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.updateNodeData(data)

Update node data

```typescript
updateNodeData(data: PartialNodeLikeData<NodeData>[] | ((prev: NodeData[]) => PartialNodeLikeData<NodeData>[])): void;
```

Just pass in the data that needs to be updated, no need to pass in the complete data

**Example**

```ts
graph.updateNodeData([{ id: 'node-1', style: { x: 100, y: 100 } }]);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

data

</td><td>

PartialNodeLikeData&lt;[NodeData](../api/reference/g6.nodedata.en.md)&gt;[] \| ((prev: [NodeData](../api/reference/g6.nodedata.en.md)[]) =&gt; PartialNodeLikeData&lt;[NodeData](../api/reference/g6.nodedata.en.md)&gt;[])

</td><td>

节点数据

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
