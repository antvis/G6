---
title: 查找元素
order: 5
---

### graph.getNodes()

获取图中所有节点的实例。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 这里返回的是节点的实例，而不是节点的数据项。

**返回值**

- 返回值类型：Array；
- 返回值表示图中所有节点的实例。

**用法**

```javascript
const nodes = graph.getNodes();
```

### graph.getEdges()

获取图中所有边的实例。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 这里返回的是边的实例，而不是边的数据项。

**返回值**

- 返回值类型：Array；
- 返回值表示图中所有边的实例。

**用法**

```javascript
const edges = graph.getEdges();
```

### graph.getCombos()

获取当前图中所有 combo 的实例。

**返回值**

- 返回值类型：Array；
- 返回值表示图中所有 combo 的实例。

**用法**

```javascript
const combos = graph.getCombos();
```

### graph.getComboChildren(combo)

获取指定 combo 中所有的子节点及子 combo。

**参数**

| 名称  | 类型            | 是否必选 | 描述                   |
| ----- | --------------- | -------- | ---------------------- |
| combo | string / ICombo | true     | Combo ID 或 combo 实例 |

**返回值**

- 返回值类型：Object，格式如下

```javascript
{
    nodes: INode[],
    edges: ICombo[]
}
```

- 返回指定 combo 中的子元素（子节点及子 combo）。

**用法**

```
const elements: {
  nodes: INode[],
  combos: ICombo[]
} = graph.getComboChildren('combo1')
```

### graph.getNeighbors(node, type)

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| node | string / INode | true | 节点 ID 或节点实例 |
| type | 'source' / 'target' / undefined | false | 邻居类型， 'source' 只获取当前节点的源节点，'target' 只获取当前节点指向的目标节点， 若不指定则返回所有类型的邻居 |

**返回值**

- 返回值类型：Array；
- 返回值符合要求的节点数组。

**用法**

```javascript
const neighbors = graph.getNeighbors('node1', 'source');
```

### graph.find(type, fn)

根据具体规则查找单个元素。

**参数**

| 名称 | 类型     | 是否必选 | 描述                                  |
| ---- | -------- | -------- | ------------------------------------- |
| type | string   | true     | 元素类型，可选值为 `'node'`、`'edge'` |
| fn   | Function | true     | 查找的规则                            |

**返回值**

- 返回值类型：Object；
- 如果有符合规则的元素实例，则返回第一个匹配的元素实例，否则返回 `undefined` 。

**用法**

```javascript
const findNode = graph.find('node', (node) => {
  return node.get('model').x === 100;
});
```

### graph.findById(id)

根据 ID，查询对应的元素实例。

**参数**

| 名称 | 类型   | 是否必选 | 描述    |
| ---- | ------ | -------- | ------- |
| id   | string | true     | 元素 ID |

**返回值**

- 返回值类型：Object；
- 如果有符合规则的元素实例，则返回该元素实例，否则返回 `undefined`。

**用法**

```javascript
const node = graph.findById('node');
```

### graph.findAll(type, fn)

查询所有满足规则的元素。

**参数**

| 名称 | 类型     | 是否必选 | 描述                                  |
| ---- | -------- | -------- | ------------------------------------- |
| type | string   | true     | 元素类型，可选值为 `'node'`、`'edge'` |
| fn   | Function | true     | 查找的规则                            |

**返回值**

- 返回值类型：Array；
- 如果有符合规则的元素实例，则返回所有元素实例，否则返回 `undefined`。

**用法**

```javascript
const nodes = graph.findAll('node', (node) => {
  return node.get('model').x;
});
```

### graph.findAllByState(type, state)

查找所有处于指定状态的元素。

**参数**

| 名称  | 类型   | 是否必选 | 描述                                  |
| ----- | ------ | -------- | ------------------------------------- |
| type  | string | true     | 元素类型，可选值为 `'node'`、`'edge'` |
| state | string | true     | 状态名称                              |

**返回值**

- 返回值类型：Array；
- 返回所有指定状态的元素实例。

**用法**

```javascript
// 查询所有选中的元素
const nodes = graph.findAllByState('node', 'selected');
```
