---
title: 元素操作
order: 4
---

## 增删

### graph.addItem(type, model, stack)

新增元素（节点和边）。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意: </strong></span>将会直接使用 `model` 对象作为新增元素的数据模型，G6 内部可能会对其增加或修改一些必要的字段。若不希望原始参数被修改，建议在使用深拷贝后的 `model`。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| type | string | true | 元素类型，可选值为 `'node'`、`'edge'` |
| model | Object | true | 元素的数据模型，具体内容参见[元素配置项](/zh/docs/api/items/itemProperties)。 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
const model = {
  id: 'node',
  label: 'node',
  address: 'cq',
  x: 200,
  y: 150,
  style: {
    fill: 'blue',
  },
};

graph.addItem('node', model);
```

### graph.removeItem(item, stack)

删除元素，当 item 为 group ID 时候，则删除分组。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | string / Object | true | 元素 ID 或元素实例 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('node');
graph.removeItem(item);

// 该操作不会进入到 undo & redo 栈，即 redo & undo 操作会忽略该操作
graph.removeItem(item, false);
```

## 更新

### graph.updateItem(item, model, stack)

更新元素，包括更新数据、样式等。若图上有 combo，使用该函数更新一个节点位置后，需要调用 [updateCombo(combo)](/zh/docs/api/Graph#updatecombocombo) 以更新相关 combo 的位置。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | string / Object | true | 元素 ID 或元素实例 |
| model | Object | true | 需要更新的数据模型，具体内容参见[元素配置项](/zh/docs/api/items/itemProperties) |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
const model = {
  id: 'node',
  label: 'node',
  address: 'cq',
  x: 200,
  y: 150,
  style: {
    fill: 'blue',
  },
};

// 通过 ID 查询节点实例
const item = graph.findById('node');
graph.updateItem(item, model);
```

### graph.refreshItem(item)

刷新指定元素。

**参数**

| 名称 | 类型            | 是否必选 | 描述               |
| ---- | --------------- | -------- | ------------------ |
| item | string / Object | true     | 元素 ID 或元素实例 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('node');
graph.refreshItem(item);
```

### graph.refreshPositions()

当节点位置发生变化时，刷新所有节点位置，并重计算边的位置。

该方法无参数。

**用法**

```javascript
graph.refreshPositions();
```

### graph.updateCombos()

根据子元素（子节点与子 combo）的 bbox 更新所有 combos 的绘制，包括 combos 的位置和范围。

**用法**

```javascript
// 更新所有 combos
graph.updateCombos();
```

### graph.updateCombo(combo)

仅更新 combo 及其所有祖先 combo。建议在使用 graph.updateItem 来更新节点位置时，调用该方法以更新节点的祖先 combos。

**参数**

| 名称  | 类型            | 是否必选 | 描述                   |
| ----- | --------------- | -------- | ---------------------- |
| combo | string / ICombo | true     | Combo ID 或 Combo 实例 |

**用法**

```javascript
// 更新了某个节点的位置
const node1 = graph.findById('node1');
graph.updateItem(node1, {
  x: 100,
  y: 100,
});
const comboId = node1.getModel().comboId;

// 更新 node1 所属的 combo 及其所有祖先 combo 的大小和位置
graph.updateCombo(comboId);
```

### graph.updateComboTree(item, parentId)

更新 Combo 结构，例如移动子树等。

**参数**

| 名称     | 类型                    | 是否必选 | 描述                                        |
| -------- | ----------------------- | -------- | ------------------------------------------- |
| item     | string / INode / ICombo | true     | 需要被更新的 Combo 或 节点 ID               |
| parentId | string / undefined      | false    | 新的父 combo ID，undefined 代表没有父 combo |

**用法**

```
// 将 combo1 从父 combo 中移出，完成后同原父 combo 平级
graph.updateComboTree('combo1')

// 将 combo1 移动到 Combo2 下面，作为 Combo2 的子元素
graph.updateComboTree('combo1', 'combo2')
```

## 配置

### graph.node(nodeFn)

设置各个节点样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>提示:</strong></span> 该方法必须**在 render 之前调用**，否则不起作用。

**参数**

| 名称   | 类型     | 是否必选 | 描述               |
| ------ | -------- | -------- | ------------------ |
| nodeFn | Function | true     | 返回每个节点的配置 |

**用法**

```javascript
graph.node((node) => {
  return {
    id: node.id,
    type: 'rect',
    style: {
      fill: 'blue',
    },
  };
});

graph.data(data);
graph.render();
```

### graph.edge(edgeFn)

设置各个边样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>提示:</strong></span> 该方法必须**在 render 之前调用**，否则不起作用。

**参数**

| 名称   | 类型     | 是否必选 | 描述             |
| ------ | -------- | -------- | ---------------- |
| edgeFn | Function | true     | 返回每条边的配置 |

**用法**

```javascript
graph.edge((edge) => {
  return {
    id: edge.id,
    type: 'cubic-horizontal',
    style: {
      stroke: 'green',
    },
  };
});

graph.data(data);
graph.render();
```

### graph.combo(comboFn)

设置各个 combo 样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>提示:</strong></span> 该方法必须**在 render 之前调用**，否则不起作用。

**参数**

| 名称    | 类型     | 是否必选 | 描述                  |
| ------- | -------- | -------- | --------------------- |
| comboFn | Function | true     | 返回每个 combo 的配置 |

**用法**

```javascript
graph.combo((combo) => {
  return {
    id: combo.id,
    type: 'rect',
    style: {
      stroke: 'green',
    },
  };
});

graph.data(data);
graph.render();
```

## 显示/隐藏

### graph.showItem(item, stack)

显示指定的元素。若 item 为节点，则相关边也会随之显示。而 [item.show()](/zh/docs/api/items/itemMethods#itemshow) 则将只显示自身。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | string / Object | true | 元素 ID 或元素实例 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('nodeId');
graph.showItem(item);

// 等价于
graph.showItem('nodeId');
```

### graph.hideItem(item, stack)

隐藏指定元素。若 item 为节点，则相关边也会随之隐藏。而 [item.hide()](/zh/docs/api/items/itemMethods#itemhide) 则将只隐藏自身。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | string / Object | true | 元素 ID 或元素实例 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('nodeId');
graph.hideItem(item);

// 等价于
graph.hideItem('nodeId');
```
