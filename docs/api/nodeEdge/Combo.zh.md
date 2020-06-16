---
title: Combo
order: 3
---

Combo 继承自 Node，具有 Node 的所有特性。本文仅介绍 Combo 类的通用方法，内置节点见 [内置 Combo 文档](/zh/docs/manual/middle/elements/combos/defaultCombo) 和 [demo](/zh/examples/item/defaultCombos)，自定义节点见 [自定义 Combo 文档](/zh/docs/manual/advanced/custom-combo) 和 [demo](/zh/examples/item/customCombo)。

### getChildren()
获取 Combo 中所有的子元素，包括 Combo 和 Node。

**返回值**

- 返回值为子 node 和 combo 的集合：`{ nodes: INode[], combos: ICombo[] }`


**用法**

```javascript
const elements = combo.getChildren()
```


### getNodes()
获取 Combo 中所有子节点。

**返回值**

- 返回值类型为 `INode[]`。


### getCombos()
获取 Combo 中所有子 combo。

**返回值**

- 返回值类型为 `ICombo[]`。


### addChild(item: INode | ICombo)
向 Combo 中添加子 Node 或子 Combo。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | INode / ICombo | 是 | 节点或Combo 的实例 |


**返回值**

- 类型： `boolean`；
- 含义：返回 `true` 表示添加成功。


**用法**

```javascript
const node = graph.findById('node1')

// 如果返回结果为 true，则说明添加成功
const result = combo.addChild(node)
```


### addNode(node: string | INode)
向 combo 中添加节点。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| node | string / INode | 是 | 节点 ID 或节点实例 |


**返回值**

- 类型： `boolean`；
- 含义：返回 `true` 表示添加成功。


### addCombo(combo: ICombo)
向 combo 中添加 combo。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| combo | ICombo | 是 | combo 实例 |


**返回值**

- 类型： `boolean`；
- 含义：返回 `true` 表示添加成功。


### removeChild(item: ICombo | INode)
移除子元素（子节点或子 combo）。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | INode / ICombo | 是 | 节点或Combo 的实例 |


**返回值**

- 类型： `boolean`；
- 含义：返回 `true` 表示移除成功。


### removeCombo(combo: ICombo)
移除指定的子 combo。注意：移除后 `combo` 不再属于该父 Combo，但没有被删除。需要删除 `combo` 请调用 [graph.removeItem](/zh/docs/api/Graph#removeitemitem)

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| combo | ICombo | 是 | Combo 的实例 |


**返回值**

- 类型： `boolean`；
- 含义：返回 `true` 表示移除成功。


### removeNode(node: INode)
移除指定的子 Node。注意：移除后该节点不再属于该 Combo，但没有被删除。需要删除节点请调用 [graph.removeItem](/zh/docs/api/Graph#removeitemitem)

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| node | INode | 是 | 节点 ID 或节点实例 |


**返回值**

- 类型： `boolean`；
- 含义：返回 `true` 表示移除成功。
