---
title: Data
order: 0
---

## Overview of Data Operations

G6 provides a comprehensive [data](/en/manual/data) operation API, covering the complete lifecycle of graph data from query, modification to update.

## API Reference

### Graph.getData()

Get the complete data of the graph.

```typescript
getData(): Required<GraphData>;
```

**Return Value**:

- **Type**: [GraphData](#graphdata)

- **Description**: Returns the complete graph data containing all nodes, edges, and combo data

**Example**:

```typescript
const graphData = graph.getData();
console.log('Node data:', graphData.nodes);
console.log('Edge data:', graphData.edges);
console.log('Combo data:', graphData.combos);
```

### Graph.getNodeData()

Get node data, supporting three calling methods.

```typescript
// Get all node data
getNodeData(): NodeData[];

// Get single node data
getNodeData(id: ID): NodeData;

// Get multiple node data
getNodeData(ids: ID[]): NodeData[];
```

**Parameters**:

| Parameter | Description   | Type     | Default | Required |
| --------- | ------------- | -------- | ------- | -------- |
| id        | Node ID       | string   | -       |          |
| ids       | Node ID array | string[] | -       |          |

**Return Value**:

- **Type**: [NodeData](#nodedata) | [NodeData](#nodedata)[]
- **Description**: Returns the specified node data or node data array

**Example**:

```typescript
// Get all nodes
const nodes = graph.getNodeData();

// Get single node
const node = graph.getNodeData('node1');
console.log('Node position:', node.style.x, node.style.y);

// Get multiple nodes
const [node1, node2] = graph.getNodeData(['node1', 'node2']);
```

### Graph.getEdgeData()

Get edge data, supporting three calling methods.

```typescript
// Get all edge data
getEdgeData(): EdgeData[];

// Get single edge data
getEdgeData(id: ID): EdgeData;

// Get multiple edge data
getEdgeData(ids: ID[]): EdgeData[];
```

**Parameters**:

| Parameter | Description   | Type     | Default | Required |
| --------- | ------------- | -------- | ------- | -------- |
| id        | Edge ID       | string   | -       |          |
| ids       | Edge ID array | string[] | -       |          |

**Return Value**:

- **Type**: [EdgeData](#edgedata) | [EdgeData](#edgedata)[]
- **Description**: Returns the specified edge data or edge data array

**Example**:

```typescript
// Get all edges
const edges = graph.getEdgeData();

// Get single edge
const edge = graph.getEdgeData('edge1');
console.log('Edge source and target:', edge.source, edge.target);

// Get multiple edges
const [edge1, edge2] = graph.getEdgeData(['edge1', 'edge2']);
```

### Graph.getComboData()

Get combo data, supporting three calling methods.

```typescript
// Get all combo data
getComboData(): ComboData[];

// Get single combo data
getComboData(id: ID): ComboData;

// Get multiple combo data
getComboData(ids: ID[]): ComboData[];
```

**Parameters**:

| Parameter | Description    | Type     | Default | Required |
| --------- | -------------- | -------- | ------- | -------- |
| id        | Combo ID       | string   | -       |          |
| ids       | Combo ID array | string[] | -       |          |

**Return Value**:

- **Type**: [ComboData](#combodata) | [ComboData](#combodata)[]
- **Description**: Returns the specified combo data or combo data array

**Example**:

```typescript
// Get all combos
const combos = graph.getComboData();

// Get single combo
const combo = graph.getComboData('combo1');
console.log('Nodes in combo:', combo.children);

// Get multiple combos
const [combo1, combo2] = graph.getComboData(['combo1', 'combo2']);
```

### Graph.getElementData()

Get single element data, supporting two calling methods.

⚠️ **Note**: This API directly gets the data of the element without considering the element type.

```typescript
// Get single element data
getElementData(id: ID): ElementDatum;

// Get multiple element data
getElementData(ids: ID[]): ElementDatum[];
```

**Parameters**:

| Parameter | Description      | Type     | Default | Required |
| --------- | ---------------- | -------- | ------- | -------- |
| id        | Element ID       | string   | -       |          |
| ids       | Element ID array | string[] | -       |          |

**Return Value**:

- **Type**: ElementDatum \| ElementDatum[]
- **Description**: Directly gets the data of the element without considering the element type

**Example**:

```typescript
const element = graph.getElementData('node-1');
console.log('Element data:', element);

const elements = graph.getElementData(['node-1', 'edge-1']);
console.log('Multiple element data:', elements);
```

### Graph.getElementDataByState()

Get element data in a specified state, supporting three calling methods.

```typescript
// Get node data in a specified state
getElementDataByState(elementType: 'node', state: string): NodeData[];

// Get edge data in a specified state
getElementDataByState(elementType: 'edge', state: string): EdgeData[];

// Get combo data in a specified state
getElementDataByState(elementType: 'combo', state: string): ComboData[];
```

**Parameters**:

| Parameter   | Description  | Type                              | Default | Required |
| ----------- | ------------ | --------------------------------- | ------- | -------- |
| elementType | Element type | `'node'` \| `'edge'` \| `'combo'` | -       | ✓        |
| state       | State        | string                            | -       | ✓        |

**Return Value**:

- **Type**: NodeData[] \| EdgeData[] \| ComboData[]
- **Description**: Returns node data, edge data, or combo data in the specified state

**Example**:

```typescript
const selectedNodes = graph.getElementDataByState('node', 'selected');
console.log('Selected nodes:', selectedNodes);

const selectedEdges = graph.getElementDataByState('edge', 'selected');
console.log('Selected edges:', selectedEdges);

const selectedCombos = graph.getElementDataByState('combo', 'selected');
console.log('Selected combos:', selectedCombos);
```

**Built-in States**:

- `'selected'`
- `'highlight'`
- `'active'`
- `'inactive'`
- `'disabled'`

### Graph.getNeighborNodesData()

Get the data of neighbor nodes of a node or combo.

```typescript
getNeighborNodesData(id: ID): NodeData[];
```

**Parameters**:

| Parameter | Description      | Type   | Default | Required |
| --------- | ---------------- | ------ | ------- | -------- |
| id        | Node or combo ID | string | -       | ✓        |

**Return Value**:

- **Type**: NodeData[]
- **Description**: Returns neighbor node data

**Example**:

```typescript
const neighbors = graph.getNeighborNodesData('node-1');
console.log('Neighbor nodes:', neighbors);
```

### Graph.getRelatedEdgesData()

Get the data of edges related to a node or combo.

```typescript
getRelatedEdgesData(id: ID, direction?: EdgeDirection): EdgeData[];
```

**Parameters**:

| Parameter | Description      | Type                          | Default | Required |
| --------- | ---------------- | ----------------------------- | ------- | -------- |
| id        | Node or combo ID | string                        | -       | ✓        |
| direction | Edge direction   | `'in'` \| `'out'` \| `'both'` | -       |          |

**Return Value**:

- **Type**: EdgeData[]
- **Description**: Returns the data of edges related to the specified node or combo

**Example**:

```typescript
const relatedEdges = graph.getRelatedEdgesData('node-1');
console.log('Related edges:', relatedEdges);
```

### Graph.getParentData()

Get the data of the parent element of a node or combo.

```typescript
getParentData(id: ID, hierarchy: HierarchyKey): NodeLikeData | undefined;
```

**Parameters**:

| Parameter | Description            | Type                  | Default | Required |
| --------- | ---------------------- | --------------------- | ------- | -------- |
| id        | Node or combo ID       | string                | -       | ✓        |
| hierarchy | Specify hierarchy type | `'tree'` \| `'combo'` | -       |          |

**Return Value**:

- **Type**: NodeData \| ComboData \| undefined
- **Description**: Returns the parent element data, or undefined if it does not exist

**Example**:

```typescript
// Get the parent node in a tree graph
const treeParent = graph.getParentData('node1', 'tree');

// Get the parent combo in a combo
const comboParent = graph.getParentData('node1', 'combo');
```

### Graph.getChildrenData()

Get the data of child elements of a node or combo.

```typescript
getChildrenData(id: ID): NodeLikeData[];
```

**Parameters**:

| Parameter | Description      | Type   | Default | Required |
| --------- | ---------------- | ------ | ------- | -------- |
| id        | Node or combo ID | string | -       | ✓        |

**Return Value**:

- **Type**: NodeData \| ComboData[]
- **Description**: Returns an array of child element data

**Example**:

```typescript
// Get the child elements of a combo
const children = graph.getChildrenData('combo1');
console.log('Number of child nodes:', children.length);

// Process each child element
children.forEach((child) => {
  console.log('Child element ID:', child.id);
});
```

### Graph.getAncestorsData()

Get the data of all ancestor elements of a node or combo.

```typescript
getAncestorsData(id: ID, hierarchy: HierarchyKey): NodeLikeData[];
```

**Parameters**:

| Parameter | Description            | Type                  | Default | Required |
| --------- | ---------------------- | --------------------- | ------- | -------- |
| id        | Node or combo ID       | string                | -       | ✓        |
| hierarchy | Specify hierarchy type | `'tree'` \| `'combo'` | -       | ✓        |

**Return Value**:

- **Type**: [NodeData](#nodedata)[] \| [ComboData](#combodata)[]
- **Description**: Returns an array of ancestor element data, ordered from parent to root

**Example**:

```typescript
// Get all ancestor nodes in a tree graph
const treeAncestors = graph.getAncestorsData('node1', 'tree');
console.log(
  'Ancestor node path:',
  treeAncestors.map((node) => node.id),
);

// Get all parent combos in a combo
const comboAncestors = graph.getAncestorsData('node1', 'combo');
```

### Graph.getDescendantsData()

Get the data of all descendant elements of a node or combo.

```typescript
getDescendantsData(id: ID): NodeLikeData[];
```

**Parameters**:

| Parameter | Description      | Type   | Default | Required |
| --------- | ---------------- | ------ | ------- | -------- |
| id        | Node or combo ID | string | -       | ✓        |

**Return Value**:

- **Type**: [NodeData](#nodedata)[] \| [ComboData](#combodata)[]
- **Description**: Returns an array of descendant element data

**Example**:

```typescript
// Get all descendants of a node
const descendants = graph.getDescendantsData('node1');
console.log('Number of descendants:', descendants.length);

// Process all descendant elements
descendants.forEach((descendant) => {
  console.log('Descendant element ID:', descendant.id);
});
```

### Graph.setData()

Set the complete data of the graph.

```typescript
setData(data: GraphData | ((prev: GraphData) => GraphData)): void;
```

**Parameters**:

| Parameter | Description                                           | Type                                                        | Default | Required |
| --------- | ----------------------------------------------------- | ----------------------------------------------------------- | ------- | -------- |
| data      | New graph data or a function returning new graph data | [GraphData](#graphdata) \| ((prev: GraphData) => GraphData) | -       | ✓        |

**Example**:

```typescript
// Directly set data
graph.setData({
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 } },
    { id: 'node2', style: { x: 200, y: 200 } },
  ],
  edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
});

// Use functional incremental update: get current graph data and return new graph data
graph.setData((prev) => ({
  ...prev,
  nodes: [...prev.nodes, { id: 'node3', style: { x: 300, y: 300 } }],
}));
```

### Graph.addData()

Add new element data.

```typescript
addData(data: GraphData | ((prev: GraphData) => GraphData)): void;
```

**Parameters**:

| Parameter | Description                                              | Type                                                        | Default | Required |
| --------- | -------------------------------------------------------- | ----------------------------------------------------------- | ------- | -------- |
| data      | Graph data to add or a function returning new graph data | [GraphData](#graphdata) \| ((prev: GraphData) => GraphData) | -       | ✓        |

**Example**:

```typescript
graph.addData({
  nodes: [{ id: 'node-1' }, { id: 'node-2' }],
  edges: [{ source: 'node-1', target: 'node-2' }],
});
```

### Graph.addNodeData()

Add new node data.

```typescript
addNodeData(data: NodeData[] | ((prev: NodeData[]) => NodeData[])): void;
```

**Parameters**:

| Parameter | Description                                        | Type                                                        | Default | Required |
| --------- | -------------------------------------------------- | ----------------------------------------------------------- | ------- | -------- |
| data      | Node data to add or a function returning node data | [NodeData](#nodedata)[] \| (prev: NodeData[]) => NodeData[] | -       | ✓        |

**Example**:

```typescript
// Add single node
graph.addNodeData([
  {
    id: 'node1',
    style: { x: 100, y: 100 },
    data: { label: 'Node 1' },
  },
]);

// Add multiple nodes
graph.addNodeData([
  { id: 'node2', style: { x: 200, y: 200 } },
  { id: 'node3', style: { x: 300, y: 300 } },
]);

// Functional addition
graph.addNodeData((prev) => [...prev, { id: 'node4', style: { x: 400, y: 400 } }]);
```

### Graph.addEdgeData()

Add new edge data.

```typescript
addEdgeData(data: EdgeData[] | ((prev: EdgeData[]) => EdgeData[])): void;
```

**Parameters**:

| Parameter | Description                                        | Type                                                          | Default | Required |
| --------- | -------------------------------------------------- | ------------------------------------------------------------- | ------- | -------- |
| data      | Edge data to add or a function returning edge data | [EdgeData](#edgedata)[] \| ((prev: EdgeData[]) => EdgeData[]) | -       | ✓        |

**Example**:

```typescript
// Add single edge
graph.addEdgeData([
  {
    id: 'edge1',
    source: 'node1',
    target: 'node2',
    data: {
      weight: 1,
      label: 'Relation',
    },
  },
]);

// Add multiple edges
graph.addEdgeData([
  { id: 'edge2', source: 'node2', target: 'node3' },
  { id: 'edge3', source: 'node3', target: 'node1' },
]);

// Functional addition
graph.addEdgeData((prev) => [...prev, { id: 'edge4', source: 'node1', target: 'node4' }]);
```

### Graph.addComboData()

Add new combo data.

```typescript
addComboData(data: ComboData[] | ((prev: ComboData[]) => ComboData[])): void;
```

**Parameters**:

| Parameter | Description                                          | Type                                                            | Default | Required |
| --------- | ---------------------------------------------------- | --------------------------------------------------------------- | ------- | -------- |
| data      | Combo data to add or a function returning combo data | [ComboData](#combodata)[] \| (prev: ComboData[]) => ComboData[] | -       | ✓        |

**Example**:

```typescript
graph.addComboData([{ id: 'combo1', children: ['node1', 'node2'] }]);
```

### Graph.addChildrenData()

Add child node data to a tree graph node.

⚠️ **Note**: Use addNodeData / addComboData methods to add child nodes to a combo.

```typescript
addChildrenData(parentId: ID, childrenData: NodeData[]): void;
```

**Parameters**:

| Parameter    | Description     | Type                    | Default | Required |
| ------------ | --------------- | ----------------------- | ------- | -------- |
| parentId     | Parent node ID  | string                  | -       | ✓        |
| childrenData | Child node data | [NodeData](#nodedata)[] | -       | ✓        |

**Example**:

```typescript
graph.addChildrenData('node1', [{ id: 'node2' }]);
```

### Graph.removeData()

Remove element data.

```typescript
removeData(ids: DataID | ((data: GraphData) => DataID)): void;
```

**Parameters**:

| Parameter | Description                                               | Type                                               | Default | Required |
| --------- | --------------------------------------------------------- | -------------------------------------------------- | ------- | -------- |
| ids       | Element IDs to remove or a function returning element IDs | [DataID](#dataid) \| ((data: GraphData) => DataID) | -       | ✓        |

**Return Value**:

- **Type**: void

**Example**:

```typescript
graph.removeData({
  nodes: ['node-1', 'node-2'],
  edges: ['edge-1'],
});
```

### Graph.removeNodeData()

Remove node data.

```typescript
removeNodeData(ids: ID[] | ((data: NodeData[]) => ID[])): void;
```

**Parameters**:

| Parameter | Description                                         | Type                                                            | Default | Required |
| --------- | --------------------------------------------------- | --------------------------------------------------------------- | ------- | -------- |
| ids       | Node IDs to remove or a function returning node IDs | [ID](#id)[] \| ((data: [NodeData](#nodedata)[]) => [ID](#id)[]) | -       | ✓        |

**Return Value**:

- **Type**: void

**Example**:

```typescript
graph.removeNodeData(['node-1', 'node-2']);
```

### Graph.removeEdgeData()

Remove edge data.

```typescript
removeEdgeData(ids: ID[] | ((data: EdgeData[]) => ID[])): void;
```

**Parameters**:

| Parameter | Description                                         | Type                                                            | Default | Required |
| --------- | --------------------------------------------------- | --------------------------------------------------------------- | ------- | -------- |
| ids       | Edge IDs to remove or a function returning edge IDs | [ID](#id)[] \| ((data: [EdgeData](#edgedata)[]) => [ID](#id)[]) | -       | ✓        |

**Return Value**:

- **Type**: void

**Example**:

```typescript
graph.removeEdgeData(['edge-1']);
```

### Graph.removeComboData()

Remove combo data.

```typescript
removeComboData(ids: ID[] | ((data: ComboData[]) => ID[])): void;
```

**Parameters**:

| Parameter | Description                                           | Type                                                            | Default | Required |
| --------- | ----------------------------------------------------- | --------------------------------------------------------------- | ------- | -------- |
| ids       | Combo IDs to remove or a function returning combo IDs | [ID](#id)[] \| (data: [ComboData](#combodata)[]) => [ID](#id)[] | -       | ✓        |

**Return Value**:

- **Type**: void

**Example**:

```typescript
graph.removeComboData(['combo-1']);
```

### Graph.updateData()

Update element data.

⚠️ **Note**: Only the data that needs to be updated needs to be passed in, not the complete data.

```typescript
updateData(data: PartialGraphData | ((prev: GraphData) => PartialGraphData)): void;
```

**Parameters**:

| Parameter | Description                                                 | Type                                                                             | Default | Required |
| --------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------- | ------- | -------- |
| data      | Element data to update or a function returning element data | [PartialGraphData](#partialgraphdata) \| ((prev: GraphData) => PartialGraphData) | -       | ✓        |

**Return Value**:

- **Type**: void

**Example**:

```typescript
graph.updateData({
  nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
  edges: [{ id: 'edge-1', style: { lineWidth: 2 } }],
});
```

### Graph.updateNodeData()

Update node data.

⚠️ **Note**: Only the data that needs to be updated needs to be passed in, not the complete data.

```typescript
updateNodeData(data: NodeData[] | ((prev: NodeData[]) => NodeData[])): void;
```

**Parameters**:

| Parameter | Description                                           | Type                                           | Default | Required |
| --------- | ----------------------------------------------------- | ---------------------------------------------- | ------- | -------- |
| data      | Node data to update or a function returning node data | NodeData[] \| (prev: NodeData[]) => NodeData[] | -       | ✓        |

**Return Value**:

- **Type**: void

**Example**:

```typescript
graph.updateNodeData([{ id: 'node-1', style: { x: 100, y: 100 } }]);
```

### Graph.updateEdgeData()

Update edge data.

⚠️ **Note**: Only the data that needs to be updated needs to be passed in, not the complete data.

```typescript
updateEdgeData(data: (PartialEdgeData<EdgeData>[] | ((prev: EdgeData[]) => PartialEdgeData<EdgeData>[]))): void;
```

**Parameters**:

| Parameter | Description | Type                                                  | Default                                                                                                                  | Required |
| --------- | ----------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | --- | --- |
| <!--      | data        | Edge data to update or a function returning edge data | [PartialEdgeData<EdgeData>](#partialedgedata)[] \| (prev: EdgeData[]) => [PartialEdgeData<EdgeData>](#partialedgedata)[] | -        | ✓   | --> |

**Return Value**:

- **Type**: void

**Example**:

```typescript
graph.updateEdgeData([{ id: 'edge-1', style: { lineWidth: 2 } }]);
```

### Graph.updateComboData()

Update combo data.

⚠️ **Note**: Only the data that needs to be updated needs to be passed in, not the complete data.

```typescript
updateComboData(data: (ComboData[] | ((prev: ComboData[]) => ComboData[]))): void;
```

**Parameters**:

| Parameter | Description                                             | Type                                                            | Default | Required |
| --------- | ------------------------------------------------------- | --------------------------------------------------------------- | ------- | -------- |
| data      | Combo data to update or a function returning combo data | [ComboData](#combodata)[] \| (prev: ComboData[]) => ComboData[] | -       | ✓        |

**Return Value**:

- **Type**: void

**Example**:

```typescript
graph.updateComboData([{ id: 'combo-1', style: { x: 100, y: 100 } }]);
```

## Type Definitions

### ID

Element ID type.

```typescript
type ID = string;
```

### DataID

Multiple element ID type.

```typescript
interface DataID {
  nodes?: ID[];
  edges?: ID[];
  combos?: ID[];
}
```

### GraphData

G6 graph data type.

```typescript
interface GraphData {
  nodes?: NodeData[];
  edges?: EdgeData[];
  combos?: ComboData[];
}
```

### NodeData

Node data type.

```typescript
interface NodeData {
  id: string; // Node ID
  type?: string; // Node type
  data?: Record<string, any>; // Node data
  style?: Record<string, any>; // Node style
  states?: string[]; // Initial node states
  combo?: string; // Belonging combo
  children?: string[]; // Array of child node IDs
}
```

For detailed type definitions, please refer to [Node Data](/en/manual/data#nodedata).

### EdgeData

Edge data type.

```typescript
interface EdgeData {
  source: string; // Source ID
  target: string; // Target ID
  id?: string; // Edge ID
  type?: string; // Edge type
  data?: Record<string, any>; // Edge data
  style?: Record<string, any>; // Edge style
  states?: string[]; // Initial edge states
}
```

For detailed type definitions, please refer to [Edge Data](/en/manual/data#edgedata).

### ComboData

Combo data type.

```typescript
interface ComboData {
  id: string; // Combo ID
  type?: string; // Combo type
  data?: Record<string, any>; // Combo data
  style?: Record<string, any>; // Combo style
  states?: string[]; // Initial combo states
  combo?: string; // Parent combo ID
}
```

For detailed type definitions, please refer to [Combo Data](/en/manual/data#combodata).
