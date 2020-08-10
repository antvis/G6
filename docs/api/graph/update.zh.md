---
title: 更新元素数据或配置
order: 10
---

### graph.updateItem(item, model, stack)

更新元素，包括更新数据、样式等。若图上有 combo，使用该函数更新一个节点位置后，需要调用 [updateCombo(combo)](/zh/docs/api/Graph#updatecombocombo) 以更新相关 combo 的位置。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| item | string / Object | true | 元素 ID 或元素实例 |
| cfg | Object | false | 需要更新的数据模型，具体内容参见[元素配置项](/zh/docs/api/nodeEdge/itemProperties) |
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

### graph.update(item, model, stack)

同 updateItem(item, model, stack)。

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
