---
title: 数据 Data
order: 4
---

## 概述

G6 是一款数据驱动的图可视化引擎，数据是 G6 中最重要的概念之一。

G6 使用标准的 JSON 格式描述图数据结构。以下是一个基础的图数据示例：

```javascript {4-7}
import { Graph } from '@antv/g6';

const graph = new Graph({
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }],
    edges: [{ source: 'node1', target: 'node2' }],
  },
});
```

## 数据结构

图数据包含三部分：`nodes`（节点数据）、`edges`（边数据）、`combos`（组合数据）。每一部分对应图中的不同元素，它们的类型和数据决定了图如何展示。

### 图数据（GraphData）

| 属性   | 描述     | 类型                              | 默认值 | 必选 |
| ------ | -------- | --------------------------------- | ------ | ---- |
| nodes  | 节点数据 | [NodeData](#节点数据nodedata)[]   | -      |      |
| edges  | 边数据   | [EdgeData](#边数据edgedata)[]     | -      |      |
| combos | 组合数据 | [ComboData](#组合数据combodata)[] | -      |      |

### 节点数据（NodeData）

节点是图中的基本构成单元，它代表图中的实体。每个节点都有一个唯一的 `id`，用于标识节点，同时节点也可以有数据、样式和状态。

| 属性     | 描述                                                                                         | 类型           | 默认值 | 必选 |
| -------- | -------------------------------------------------------------------------------------------- | -------------- | ------ | ---- |
| id       | 节点的唯一标识符，用于区分不同的节点                                                         | string         | -      | ✓    |
| type     | 节点类型，内置节点类型名称或者自定义节点的名称                                               | string         | -      |      |
| data     | 节点数据，用于存储节点的自定义数据，例如节点的名称、描述等。可以在样式映射中通过回调函数获取 | object         | -      |      |
| style    | 节点样式，包括位置、大小、颜色等视觉属性                                                     | object         | -      |      |
| states   | 节点初始状态，如选中、激活、悬停等                                                           | string[]       | -      |      |
| combo    | 所属的组合 ID，用于组织节点的层级关系，如果没有则为 null                                     | string \| null | -      |      |
| children | 子节点 ID 集合，仅在树图场景下使用                                                           | string[]       | -      |      |

**示例：**

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

### 边数据（EdgeData）

边是连接节点的元素，表示节点之间的关系。每条边都与两个节点（起始节点和目标节点）关联，并且边本身可以有数据、样式和状态。边的数据常用于表示节点之间的逻辑或关系，如社交网络中的用户关系、流程图中的步骤流转等。

| 属性   | 描述                                                             | 类型     | 默认值 | 必选 |
| ------ | ---------------------------------------------------------------- | -------- | ------ | ---- |
| source | 边起始节点 ID                                                    | string   | -      | ✓    |
| target | 边目标节点 ID                                                    | string   | -      | ✓    |
| id     | 边的唯一标识符                                                   | string   | -      |      |
| type   | 边类型，内置边类型名称或者自定义边的名称                         | string   | -      |      |
| data   | 边数据，用于存储边的自定义数据，可以在样式映射中通过回调函数获取 | object   | -      |      |
| style  | 边样式，包括线条颜色、宽度、箭头等视觉属性                       | object   | -      |      |
| states | 边初始状态                                                       | string[] | -      |      |

**示例：**

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

### 组合数据（ComboData）

通过组合，可以为多个节点创建一个逻辑单元，用于图形的分层、分组或其他结构化需求。组合可以包含子节点或其他组合，从而形成嵌套层次。

| 属性   | 描述                                                                 | 类型           | 默认值 | 必选 |
| ------ | -------------------------------------------------------------------- | -------------- | ------ | ---- |
| id     | 组合的唯一标识符                                                     | string         | -      | ✓    |
| type   | 组合类型，内置组合类型名称或者自定义组合名称                         | string         | -      |      |
| data   | 组合数据，用于存储组合的自定义数据，可以在样式映射中通过回调函数获取 | object         | -      |      |
| style  | 组合样式                                                             | object         | -      |      |
| states | 组合初始状态                                                         | string[]       | -      |      |
| combo  | 组合的父组合 ID。如果没有父组合，则为 null                           | string \| null | -      |      |

**示例：**

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

## 数据操作

G6 提供了丰富的 API 来操作图数据，下面展示一些常见的数据操作示例。

### 数据初始化

在创建图实例时，可以直接传入数据：

```javascript
const graph = new Graph({
  data: {
    nodes: [
      { id: 'node1', data: { label: '节点1' } },
      { id: 'node2', data: { label: '节点2' } },
    ],
    edges: [{ source: 'node1', target: 'node2', data: { label: '关系' } }],
  },
});
```

或者通过 `setData` 方法设置数据：

```javascript
graph.setData({
  nodes: [
    { id: 'node3', data: { label: '节点3' } },
    { id: 'node4', data: { label: '节点4' } },
  ],
  edges: [{ source: 'node3', target: 'node4', data: { label: '新关系' } }],
});
```

### 数据增删改查

#### 添加节点和边

```javascript
// 添加单个节点
graph.addNodeData([
  {
    id: 'node5',
    data: {
      label: '新节点',
      category: 'person',
    },
    style: {
      fill: '#6395F9',
      stroke: '#5B8FF9',
    },
  },
]);

// 批量添加多个节点
graph.addNodeData([
  { id: 'node6', data: { label: '批量节点1' } },
  { id: 'node7', data: { label: '批量节点2' } },
]);

// 添加连接新节点的边
graph.addEdgeData([
  {
    source: 'node1',
    target: 'node5',
    data: {
      label: '连接到新节点',
      weight: 2,
    },
    style: {
      stroke: '#F6BD16',
      lineWidth: 3,
    },
  },
]);
```

#### 更新数据

```javascript
// 更新单个节点
graph.updateNodeData([
  {
    id: 'node1',
    data: {
      label: '已更新的节点1',
      status: 'updated',
    },
    style: {
      fill: '#F6BD16',
      stroke: '#EBEBEB',
      lineWidth: 2,
    },
  },
]);

// 更新多个节点
graph.updateNodeData([
  {
    id: 'node2',
    style: { size: 40, fill: '#5AD8A6' },
  },
  {
    id: 'node3',
    data: { importance: 'high' },
  },
]);

// 更新边
graph.updateEdgeData([
  {
    source: 'node1',
    target: 'node2',
    style: {
      stroke: '#5B8FF9',
      lineWidth: 2,
      lineDash: [5, 5],
    },
  },
]);
```

#### 删除数据

```javascript
// 删除单个节点（以及与该节点相连的所有边）
graph.removeNodeData(['node7']);

// 删除多个节点
graph.removeNodeData(['node5', 'node6']);

// 删除边
graph.removeEdgeData(['node1-node2']);
```

#### 查询数据

```javascript
// 获取所有节点数据
const nodes = graph.getNodeData();

// 获取所有边数据
const edges = graph.getEdgeData();

// 获取特定节点数据
const node1 = graph.getNodeData('node1');

// 获取特定边数据
const edge1 = graph.getEdgeData('node1-node2');
```

### 复杂数据结构操作

#### 嵌套组合（Combo）

下面是创建和操作嵌套组合的示例：

```javascript
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', data: { label: '节点1' }, combo: 'combo1' },
    { id: 'node2', data: { label: '节点2' }, combo: 'combo1' },
    { id: 'node3', data: { label: '节点3' }, combo: 'combo2' },
    { id: 'node4', data: { label: '节点4' }, combo: 'combo2' },
    { id: 'node5', data: { label: '节点5' }, combo: 'combo3' },
  ],
  edges: [
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node4' },
    { source: 'node4', target: 'node5' },
  ],
  combos: [
    { id: 'combo1', data: { label: '组1' } },
    { id: 'combo2', data: { label: '组2' } },
    { id: 'combo3', data: { label: '组3' }, combo: 'combo1' }, // 嵌套组合
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'force',
  },
});

// 添加新的组合
graph.addComboData([
  {
    id: 'combo4',
    data: { label: '新组' },
    combo: 'combo2', // 添加到现有组合中
  },
]);

// 将节点移动到不同的组合
graph.updateNodeData([
  {
    id: 'node5',
    combo: 'combo4', // 将节点5移动到新组合
  },
]);

// 展开/折叠组合
graph.updateComboData([
  {
    id: 'combo1',
    style: { collapsed: true }, // 折叠组合1
  },
]);

graph.render();
```

#### 树形结构数据

对于树形结构，G6 支持使用 `children` 属性表示层次关系：

```javascript
// 树形结构数据
import { Graph, treeToGraphData } from '@antv/g6';

const treeData = {
  id: 'root',
  children: [
    {
      id: 'child1',
      children: [{ id: 'grandchild1' }],
    },
    {
      id: 'child2',
      children: [{ id: 'grandchild2' }],
    },
  ],
};

const data = treeToGraphData(treeData);

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'dendrogram', // 或 'compactBox', 'mindmap' 等树布局
    direction: 'TB', // 从上到下布局
    nodeSep: 50, // 节点间距
    rankSep: 100, // 层级间距
  },
});

graph.render();
```

通过 `treeToGraphData` 方法，可以将树形结构数据转换为 G6 的标准数据结构，实际传入到 `data` 中的数据结构如下：

```json
{
  "nodes": [
    { "id": "root", "depth": 0, "children": ["child1", "child2"] },
    { "id": "child1", "depth": 1, "children": ["grandchild1"] },
    { "id": "grandchild1", "depth": 2 },
    { "id": "child2", "depth": 1, "children": ["grandchild2"] },
    { "id": "grandchild2", "depth": 2 }
  ],
  "edges": [
    { "source": "root", "target": "child1" },
    { "source": "root", "target": "child2" },
    { "source": "child1", "target": "grandchild1" },
    { "source": "child2", "target": "grandchild2" }
  ]
}
```

## 数据组织与最佳实践

为了确保图的正确渲染和交互，建议按照 G6 标准数据结构组织数据。每个元素（节点、边、组合）应包含一个 `data` 字段，用于存放业务数据和自定义属性。

- **避免使用与 G6 内部字段名称相同的标识符**，如 `id`、`type`、`style` 等，防止发生命名冲突。
- 将业务数据（如用户信息、社交网络关系等）存储在 `data` 字段中，这样可以确保数据的灵活性和可扩展性。
- **使用样式映射**来根据业务数据动态设置视觉属性，而不是直接修改样式对象。

### 数据与样式分离

良好的做法是将数据和样式分离，通过映射函数将数据属性转换为视觉属性：

```javascript
import { Graph } from '@antv/g6';

// 使用数据驱动样式
const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', data: { value: 10, category: 'A' } },
      { id: 'node2', data: { value: 5, category: 'B' } },
    ],
  },
  node: {
    style: {
      // 根据数据中的 value 字段动态设置节点大小
      size: (node) => 20 + node.data.value * 2,
      // 根据数据中的 category 字段设置不同颜色
      fill: (node) => {
        const categoryColors = { A: '#F6BD16', B: '#5B8FF9' };
        return categoryColors[node.data.category] || '#CCC';
      },
    },
  },
});
```

## API

G6 提供了一系列的 API 来访问和操作数据，包括：

- [getData](/api/graph#graphgetdata)
- [setData](/api/graph#graphsetdatadata)
- [getNodeData](/api/graph#graphgetnodedata)
- [getEdgeData](/api/graph#graphgetedgedata)
- [getComboData](/api/graph#graphgetcombodata)
- [addData](/api/graph#graphadddatadata)
- [addNodeData](/api/graph#graphaddnodedatadata)
- [addEdgeData](/api/graph#graphaddedgedatadata)
- [addComboData](/api/graph#graphaddcombodatadata)
- [updateData](/api/graph#graphupdatedatadata)
- [updateNodeData](/api/graph#graphupdatenodedatadata)
- [updateEdgeData](/api/graph#graphupdateedgedatadata)
- [updateComboData](/api/graph#graphupdatecombodatadata)
- [removeData](/api/graph#graphremovedataids)
- [removeNodeData](/api/graph#graphremovenodedataids)
- [removeEdgeData](/api/graph#graphremoveedgedataids)
- [removeComboData](/api/graph#graphremovecombodataids)

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
    const graph = new Graph({
      container: 'container',
      data,
    });
    // 触发布局和渲染
    graph.render();
  })
  .catch((error) => {
    console.error('加载数据失败:', error);
  });
```
