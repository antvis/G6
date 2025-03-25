---
title: 数据
order: 0
---

## 数据操作概述

G6 提供了一套全面的 [数据](/manual/data) 操作 API，覆盖了图数据从查询、修改到更新的完整生命周期。

## API 参考

### Graph.getData()

获取图的完整数据。

```typescript
getData(): Required<GraphData>;
```

**返回值**:

- **类型**: [GraphData](#graphdata)

- **描述**: 返回包含所有节点、边和组合数据的完整图数据

**示例**:

```typescript
const graphData = graph.getData();
console.log('节点数据:', graphData.nodes);
console.log('边数据:', graphData.edges);
console.log('组合数据:', graphData.combos);
```

### Graph.getNodeData()

获取节点数据，支持三种调用方式。

```typescript
// 获取所有节点数据
getNodeData(): NodeData[];

// 获取单个节点数据
getNodeData(id: ID): NodeData;

// 批量获取多个节点数据
getNodeData(ids: ID[]): NodeData[];
```

**参数**:

| 参数 | 描述         | 类型     | 默认值 | 必选 |
| ---- | ------------ | -------- | ------ | ---- |
| id   | 节点 ID      | string   | -      |      |
| ids  | 节点 ID 数组 | string[] | -      |      |

**返回值**:

- **类型**: [NodeData](#nodedata) | [NodeData](#nodedata)[]
- **描述**: 返回指定的节点数据或节点数据数组

**示例**:

```typescript
// 获取所有节点
const nodes = graph.getNodeData();

// 获取单个节点
const node = graph.getNodeData('node1');
console.log('节点位置:', node.style.x, node.style.y);

// 获取多个节点
const [node1, node2] = graph.getNodeData(['node1', 'node2']);
```

### Graph.getEdgeData()

获取边数据，支持三种调用方式。

```typescript
// 获取所有边数据
getEdgeData(): EdgeData[];

// 获取单条边数据
getEdgeData(id: ID): EdgeData;

// 批量获取多条边数据
getEdgeData(ids: ID[]): EdgeData[];
```

**参数**:

| 参数 | 描述       | 类型     | 默认值 | 必选 |
| ---- | ---------- | -------- | ------ | ---- |
| id   | 边 ID      | string   | -      |      |
| ids  | 边 ID 数组 | string[] | -      |      |

**返回值**:

- **类型**: [EdgeData](#edgedata) | [EdgeData](#edgedata)[]
- **描述**: 返回指定的边数据或边数据数组

**示例**:

```typescript
// 获取所有边
const edges = graph.getEdgeData();

// 获取单条边
const edge = graph.getEdgeData('edge1');
console.log('边的起点和终点:', edge.source, edge.target);

// 获取多条边
const [edge1, edge2] = graph.getEdgeData(['edge1', 'edge2']);
```

### Graph.getComboData()

获取组合数据,支持三种调用方式。

```typescript
// 获取所有组合数据
getComboData(): ComboData[];

// 获取单个组合数据
getComboData(id: ID): ComboData;

// 批量获取多个组合数据
getComboData(ids: ID[]): ComboData[];
```

**参数**:

| 参数 | 描述         | 类型     | 默认值 | 必选 |
| ---- | ------------ | -------- | ------ | ---- |
| id   | 组合 ID      | string   | -      |      |
| ids  | 组合 ID 数组 | string[] | -      |      |

**返回值**:

- **类型**: [ComboData](#combodata) | [ComboData](#combodata)[]
- **描述**: 返回指定的组合数据或组合数据数组

**示例**:

```typescript
// 获取所有组合
const combos = graph.getComboData();

// 获取单个组合
const combo = graph.getComboData('combo1');
console.log('组合包含的节点:', combo.children);

// 获取多个组合
const [combo1, combo2] = graph.getComboData(['combo1', 'combo2']);
```

### Graph.getElementData()

获取单个元素数据，支持两种调用方式。

⚠️ **注意**: 此 API 直接获取元素的数据而不必考虑元素类型。

```typescript
// 获取单个元素数据
getElementData(id: ID): ElementDatum;

// 批量获取多个元素数据
getElementData(ids: ID[]): ElementDatum[];
```

**参数**:

| 参数 | 描述         | 类型     | 默认值 | 必选 |
| ---- | ------------ | -------- | ------ | ---- |
| id   | 元素 ID      | string   | -      |      |
| ids  | 元素 ID 数组 | string[] | -      |      |

**返回值**:

- **类型**: ElementDatum \| ElementDatum[]
- **描述**: 直接获取元素的数据而不必考虑元素类型

**示例**:

```typescript
const element = graph.getElementData('node-1');
console.log('元素数据:', element);

const elements = graph.getElementData(['node-1', 'edge-1']);
console.log('多个元素数据:', elements);
```

### Graph.getElementDataByState()

获取指定状态下的元素数据，支持三种调用方式。

```typescript
// 获取指定状态下的节点数据
getElementDataByState(elementType: 'node', state: string): NodeData[];

// 获取指定状态下的边数据
getElementDataByState(elementType: 'edge', state: string): EdgeData[];

// 获取指定状态下的组合数据
getElementDataByState(elementType: 'combo', state: string): ComboData[];
```

**参数**:

| 参数        | 描述     | 类型                              | 默认值 | 必选 |
| ----------- | -------- | --------------------------------- | ------ | ---- |
| elementType | 元素类型 | `'node'` \| `'edge'` \| `'combo'` | -      | ✓    |
| state       | 状态     | string                            | -      | ✓    |

**返回值**:

- **类型**: NodeData[] \| EdgeData[] \| ComboData[]
- **描述**: 返回指定状态下的节点数据、边数据或组合数据

**示例**:

```typescript
const selectedNodes = graph.getElementDataByState('node', 'selected');
console.log('选中的节点:', selectedNodes);

const selectedEdges = graph.getElementDataByState('edge', 'selected');
console.log('选中的边:', selectedEdges);

const selectedCombos = graph.getElementDataByState('combo', 'selected');
console.log('选中的组合:', selectedCombos);
```

**内置状态**:

- `'selected'`
- `'highlight'`
- `'active'`
- `'inactive'`
- `'disabled'`

### Graph.getNeighborNodesData()

获取节点或组合的一跳邻居节点数据。

```typescript
getNeighborNodesData(id: ID): NodeData[];
```

**参数**:

| 参数 | 描述            | 类型   | 默认值 | 必选 |
| ---- | --------------- | ------ | ------ | ---- |
| id   | 节点或组合的 ID | string | -      | ✓    |

**返回值**:

- **类型**: NodeData[]
- **描述**: 返回邻居节点数据

**示例**:

```typescript
const neighbors = graph.getNeighborNodesData('node-1');
console.log('邻居节点:', neighbors);
```

### Graph.getRelatedEdgesData()

获取节点或组合关联边的数据。

```typescript
getRelatedEdgesData(id: ID, direction?: EdgeDirection): EdgeData[];
```

**参数**:

| 参数      | 描述            | 类型                          | 默认值 | 必选 |
| --------- | --------------- | ----------------------------- | ------ | ---- |
| id        | 节点或组合的 ID | string                        | -      | ✓    |
| direction | 边的方向        | `'in'` \| `'out'` \| `'both'` | -      |      |

**返回值**:

- **类型**: EdgeData[]
- **描述**: 返回与指定节点或组合关联的边数据

**示例**:

```typescript
const relatedEdges = graph.getRelatedEdgesData('node-1');
console.log('关联边:', relatedEdges);
```

### Graph.getParentData()

获取节点或组合的父元素数据。

```typescript
getParentData(id: ID, hierarchy: HierarchyKey): NodeLikeData | undefined;
```

**参数**:

| 参数      | 描述             | 类型                  | 默认值 | 必选 |
| --------- | ---------------- | --------------------- | ------ | ---- |
| id        | 节点或组合的 ID  | string                | -      | ✓    |
| hierarchy | 指定层级关系类型 | `'tree'` \| `'combo'` | -      |      |

**返回值**:

- **类型**: NodeData \| ComboData \| undefined
- **描述**: 返回父元素数据,如果不存在则返回 undefined

**示例**:

```typescript
// 获取树图中节点的父节点
const treeParent = graph.getParentData('node1', 'tree');

// 获取组合中节点的父组合
const comboParent = graph.getParentData('node1', 'combo');
```

### Graph.getChildrenData()

获取节点或组合的子元素数据。

```typescript
getChildrenData(id: ID): NodeLikeData[];
```

**参数**:

| 参数 | 描述            | 类型   | 默认值 | 必选 |
| ---- | --------------- | ------ | ------ | ---- |
| id   | 节点或组合的 ID | string | -      | ✓    |

**返回值**:

- **类型**: NodeData \| ComboData[]
- **描述**: 返回子元素数据数组

**示例**:

```typescript
// 获取组合的子元素
const children = graph.getChildrenData('combo1');
console.log('子节点数量:', children.length);

// 处理每个子元素
children.forEach((child) => {
  console.log('子元素ID:', child.id);
});
```

### Graph.getAncestorsData()

获取节点或组合的所有祖先元素数据。

```typescript
getAncestorsData(id: ID, hierarchy: HierarchyKey): NodeLikeData[];
```

**参数**:

| 参数      | 描述             | 类型                  | 默认值 | 必选 |
| --------- | ---------------- | --------------------- | ------ | ---- |
| id        | 节点或组合的 ID  | string                | -      | ✓    |
| hierarchy | 指定层级关系类型 | `'tree'` \| `'combo'` | -      | ✓    |

**返回值**:

- **类型**: [NodeData](#nodedata)[] \| [ComboData](#combodata)[]
- **描述**: 返回祖先元素数据数组，从父节点到根节点的顺序排列

**示例**:

```typescript
// 获取树图中节点的所有祖先节点
const treeAncestors = graph.getAncestorsData('node1', 'tree');
console.log(
  '祖先节点路径:',
  treeAncestors.map((node) => node.id),
);

// 获取组合中节点的所有父组合
const comboAncestors = graph.getAncestorsData('node1', 'combo');
```

### Graph.getDescendantsData()

获取节点或组合的所有后代元素数据。

```typescript
getDescendantsData(id: ID): NodeLikeData[];
```

**参数**:

| 参数 | 描述            | 类型   | 默认值 | 必选 |
| ---- | --------------- | ------ | ------ | ---- |
| id   | 节点或组合的 ID | string | -      | ✓    |

**返回值**:

- **类型**: [NodeData](#nodedata)[] \| [ComboData](#combodata)[]
- **描述**: 返回后代元素数据数组

**示例**:

```typescript
// 获取节点的所有后代
const descendants = graph.getDescendantsData('node1');
console.log('后代数量:', descendants.length);

// 处理所有后代元素
descendants.forEach((descendant) => {
  console.log('后代元素ID:', descendant.id);
});
```

### Graph.setData()

设置图的完整数据。

```typescript
setData(data: GraphData | ((prev: GraphData) => GraphData)): void;
```

**参数**:

| 参数 | 描述                           | 类型                                                        | 默认值 | 必选 |
| ---- | ------------------------------ | ----------------------------------------------------------- | ------ | ---- |
| data | 新的图数据或返回新图数据的函数 | [GraphData](#graphdata) \| ((prev: GraphData) => GraphData) | -      | ✓    |

**示例**:

```typescript
// 直接设置数据
graph.setData({
  nodes: [
    { id: 'node1', style: { x: 100, y: 100 } },
    { id: 'node2', style: { x: 200, y: 200 } },
  ],
  edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
});

// 使用函数式增量更新：获取当前图数据，并返回新的图数据
graph.setData((prev) => ({
  ...prev,
  nodes: [...prev.nodes, { id: 'node3', style: { x: 300, y: 300 } }],
}));
```

### Graph.addData()

新增元素数据。

```typescript
addData(data: GraphData | ((prev: GraphData) => GraphData)): void;
```

**参数**:

| 参数 | 描述                                 | 类型                                                        | 默认值 | 必选 |
| ---- | ------------------------------------ | ----------------------------------------------------------- | ------ | ---- |
| data | 需要添加的图数据或返回新图数据的函数 | [GraphData](#graphdata) \| ((prev: GraphData) => GraphData) | -      | ✓    |

**示例**:

```typescript
graph.addData({
  nodes: [{ id: 'node-1' }, { id: 'node-2' }],
  edges: [{ source: 'node-1', target: 'node-2' }],
});
```

### Graph.addNodeData()

新增节点数据。

```typescript
addNodeData(data: NodeData[] | ((prev: NodeData[]) => NodeData[])): void;
```

**参数**:

| 参数 | 描述                                 | 类型                                                        | 默认值 | 必选 |
| ---- | ------------------------------------ | ----------------------------------------------------------- | ------ | ---- |
| data | 要添加的节点数据或返回节点数据的函数 | [NodeData](#nodedata)[] \| (prev: NodeData[]) => NodeData[] | -      | ✓    |

**示例**:

```typescript
// 添加单个节点
graph.addNodeData([
  {
    id: 'node1',
    style: { x: 100, y: 100 },
    data: { label: '节点 1' },
  },
]);

// 批量添加节点
graph.addNodeData([
  { id: 'node2', style: { x: 200, y: 200 } },
  { id: 'node3', style: { x: 300, y: 300 } },
]);

// 函数式添加
graph.addNodeData((prev) => [...prev, { id: 'node4', style: { x: 400, y: 400 } }]);
```

### Graph.addEdgeData()

新增边数据。

```typescript
addEdgeData(data: EdgeData[] | ((prev: EdgeData[]) => EdgeData[])): void;
```

**参数**:

| 参数 | 描述                             | 类型                                                          | 默认值 | 必选 |
| ---- | -------------------------------- | ------------------------------------------------------------- | ------ | ---- |
| data | 要添加的边数据或返回边数据的函数 | [EdgeData](#edgedata)[] \| ((prev: EdgeData[]) => EdgeData[]) | -      | ✓    |

**示例**:

```typescript
// 添加单条边
graph.addEdgeData([
  {
    id: 'edge1',
    source: 'node1',
    target: 'node2',
    data: {
      weight: 1,
      label: '关系',
    },
  },
]);

// 批量添加边
graph.addEdgeData([
  { id: 'edge2', source: 'node2', target: 'node3' },
  { id: 'edge3', source: 'node3', target: 'node1' },
]);

// 函数式添加
graph.addEdgeData((prev) => [...prev, { id: 'edge4', source: 'node1', target: 'node4' }]);
```

### Graph.addComboData()

新增组合数据。

```typescript
addComboData(data: ComboData[] | ((prev: ComboData[]) => ComboData[])): void;
```

**参数**:

| 参数 | 描述                                 | 类型                                                            | 默认值 | 必选 |
| ---- | ------------------------------------ | --------------------------------------------------------------- | ------ | ---- |
| data | 要添加的组合数据或返回组合数据的函数 | [ComboData](#combodata)[] \| (prev: ComboData[]) => ComboData[] | -      | ✓    |

**示例**:

```typescript
graph.addComboData([{ id: 'combo1', children: ['node1', 'node2'] }]);
```

### Graph.addChildrenData()

为树图节点添加子节点数据。

⚠️ **注意**: 为组合添加子节点使用 addNodeData / addComboData 方法。

```typescript
addChildrenData(parentId: ID, childrenData: NodeData[]): void;
```

**参数**:

| 参数         | 描述       | 类型                    | 默认值 | 必选 |
| ------------ | ---------- | ----------------------- | ------ | ---- |
| parentId     | 父节点 ID  | string                  | -      | ✓    |
| childrenData | 子节点数据 | [NodeData](#nodedata)[] | -      | ✓    |

**示例**:

```typescript
graph.addChildrenData('node1', [{ id: 'node2' }]);
```

### Graph.removeData()

删除元素数据。

```typescript
removeData(ids: DataID | ((data: GraphData) => DataID)): void;
```

**参数**:

| 参数 | 描述                                 | 类型                                               | 默认值 | 必选 |
| ---- | ------------------------------------ | -------------------------------------------------- | ------ | ---- |
| ids  | 要删除的元素 ID 或返回元素 ID 的函数 | [DataID](#dataid) \| ((data: GraphData) => DataID) | -      | ✓    |

**返回值**:

- **类型**: void

**示例**:

```typescript
graph.removeData({
  nodes: ['node-1', 'node-2'],
  edges: ['edge-1'],
});
```

### Graph.removeNodeData()

删除节点数据。

```typescript
removeNodeData(ids: ID[] | ((data: NodeData[]) => ID[])): void;
```

**参数**:

| 参数 | 描述                                 | 类型                                                            | 默认值 | 必选 |
| ---- | ------------------------------------ | --------------------------------------------------------------- | ------ | ---- |
| ids  | 要删除的节点 ID 或返回节点 ID 的函数 | [ID](#id)[] \| ((data: [NodeData](#nodedata)[]) => [ID](#id)[]) | -      | ✓    |

**返回值**:

- **类型**: void

**示例**:

```typescript
graph.removeNodeData(['node-1', 'node-2']);
```

### Graph.removeEdgeData()

删除边数据。

```typescript
removeEdgeData(ids: ID[] | ((data: EdgeData[]) => ID[])): void;
```

**参数**:

| 参数 | 描述                             | 类型                                                            | 默认值 | 必选 |
| ---- | -------------------------------- | --------------------------------------------------------------- | ------ | ---- |
| ids  | 要删除的边 ID 或返回边 ID 的函数 | [ID](#id)[] \| ((data: [EdgeData](#edgedata)[]) => [ID](#id)[]) | -      | ✓    |

**返回值**:

- **类型**: void

**示例**:

```typescript
graph.removeEdgeData(['edge-1']);
```

### Graph.removeComboData()

删除组合数据。

```typescript
removeComboData(ids: ID[] | ((data: ComboData[]) => ID[])): void;
```

**参数**:

| 参数 | 描述                                 | 类型                                                            | 默认值 | 必选 |
| ---- | ------------------------------------ | --------------------------------------------------------------- | ------ | ---- |
| ids  | 要删除的组合 ID 或返回组合 ID 的函数 | [ID](#id)[] \| (data: [ComboData](#combodata)[]) => [ID](#id)[] | -      | ✓    |

**返回值**:

- **类型**: void

**示例**:

```typescript
graph.removeComboData(['combo-1']);
```

### Graph.updateData()

更新元素数据。

⚠️ **注意**: 只需要传入需要更新的数据即可，不必传入完整的数据。

```typescript
updateData(data: PartialGraphData | ((prev: GraphData) => PartialGraphData)): void;
```

**参数**:

| 参数 | 描述                                 | 类型                                                                             | 默认值 | 必选 |
| ---- | ------------------------------------ | -------------------------------------------------------------------------------- | ------ | ---- |
| data | 要更新的元素数据或返回元素数据的函数 | [PartialGraphData](#partialgraphdata) \| ((prev: GraphData) => PartialGraphData) | -      | ✓    |

**返回值**:

- **类型**: void

**示例**:

```typescript
graph.updateData({
  nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
  edges: [{ id: 'edge-1', style: { lineWidth: 2 } }],
});
```

### Graph.updateNodeData()

更新节点数据。

⚠️ **注意**: 只需要传入需要更新的数据即可，不必传入完整的数据。

```typescript
updateNodeData(data: NodeData[] | ((prev: NodeData[]) => NodeData[])): void;
```

**参数**:

| 参数 | 描述                                 | 类型                                           | 默认值 | 必选 |
| ---- | ------------------------------------ | ---------------------------------------------- | ------ | ---- |
| data | 要更新的节点数据或返回节点数据的函数 | NodeData[] \| (prev: NodeData[]) => NodeData[] | -      | ✓    |

**返回值**:

- **类型**: void

**示例**:

```typescript
graph.updateNodeData([{ id: 'node-1', style: { x: 100, y: 100 } }]);
```

### Graph.updateEdgeData()

更新边数据。

⚠️ **注意**: 只需要传入需要更新的数据即可，不必传入完整的数据。

```typescript
updateEdgeData(data: (PartialEdgeData<EdgeData>[] | ((prev: EdgeData[]) => PartialEdgeData<EdgeData>[]))): void;
```

**参数**:

| 参数 | 描述 | 类型                             | 默认值                                                                                                                   | 必选 |
| ---- | ---- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---- | --- | --- |
| <!-- | data | 要更新的边数据或返回边数据的函数 | [PartialEdgeData<EdgeData>](#partialedgedata)[] \| (prev: EdgeData[]) => [PartialEdgeData<EdgeData>](#partialedgedata)[] | -    | ✓   | --> |

**返回值**:

- **类型**: void

**示例**:

```typescript
graph.updateEdgeData([{ id: 'edge-1', style: { lineWidth: 2 } }]);
```

### Graph.updateComboData()

更新组合数据。

⚠️ **注意**: 只需要传入需要更新的数据即可，不必传入完整的数据。

```typescript
updateComboData(data: (ComboData[] | ((prev: ComboData[]) => ComboData[]))): void;
```

**参数**:

| 参数 | 描述                                 | 类型                                                            | 默认值 | 必选 |
| ---- | ------------------------------------ | --------------------------------------------------------------- | ------ | ---- |
| data | 要更新的组合数据或返回组合数据的函数 | [ComboData](#combodata)[] \| (prev: ComboData[]) => ComboData[] | -      | ✓    |

**返回值**:

- **类型**: void

**示例**:

```typescript
graph.updateComboData([{ id: 'combo-1', style: { x: 100, y: 100 } }]);
```

## 类型定义

### ID

元素 ID 类型。

```typescript
type ID = string;
```

### DataID

多个元素 ID 类型。

```typescript
interface DataID {
  nodes?: ID[];
  edges?: ID[];
  combos?: ID[];
}
```

### GraphData

G6 图数据类型。

```typescript
interface GraphData {
  nodes?: NodeData[];
  edges?: EdgeData[];
  combos?: ComboData[];
}
```

### NodeData

节点数据类型。

```typescript
interface NodeData {
  id: string; // 节点 ID
  type?: string; // 节点类型
  data?: Record<string, any>; // 节点数据
  style?: Record<string, any>; // 节点样式
  states?: string[]; // 节点初始状态
  combo?: string; // 所属组合
  children?: string[]; // 子节点 ID 数组
}
```

详细类型定义请参考 [节点数据](/manual/data#节点数据nodedata)。

### EdgeData

边数据类型。

```typescript
interface EdgeData {
  source: string; // 起点 ID
  target: string; // 终点 ID
  id?: string; // 边 ID
  type?: string; // 边类型
  data?: Record<string, any>; // 边数据
  style?: Record<string, any>; // 边样式
  states?: string[]; // 边初始状态
}
```

详细类型定义请参考 [边数据](/manual/data#边数据edgedata)。

### ComboData

组合数据类型。

```typescript
interface ComboData {
  id: string; // 组合 ID
  type?: string; // 组合类型
  data?: Record<string, any>; // 组合数据
  style?: Record<string, any>; // 组合样式
  states?: string[]; // 组合初始状态
  combo?: string; // 父组合 ID
}
```

详细类型定义请参考 [组合数据](/manual/data#组合数据combodata)。
