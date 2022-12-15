---
title: Combo 操作
order: 6
---

### graph.collapseCombo(combo)

收起指定的 Combo。

**参数**

| 名称  | 类型            | 是否必选 | 描述                   |
| ----- | --------------- | -------- | ---------------------- |
| combo | string / ICombo | true     | combo ID 或 combo 实例 |

**用法**

```javascript
graph.collapseCombo('combo1')
```

### graph.expandCombo(combo)

展开指定的 Combo。

**参数**

| 名称  | 类型            | 是否必选 | 描述                   |
| ----- | --------------- | -------- | ---------------------- |
| combo | string / ICombo | true     | combo ID 或 combo 实例 |

**用法**

```javascript
graph.expandCombo('combo1')
```

### graph.collapseExpandCombo(combo)

展开或收缩指定的 Combo。

**参数**

| 名称  | 类型            | 是否必选 | 描述                   |
| ----- | --------------- | -------- | ---------------------- |
| combo | string / ICombo | true     | combo ID 或 combo 实例 |

**用法**

```javascript
graph.collapseExpandCombo('combo1')
```

### graph.createCombo(combo, elements, stack)

根据已经存在的节点或 combo 创建新的 combo。

**参数**

| 名称     | 类型                 | 是否必选 | 描述                                       |
| -------- | -------------------- | -------- | ------------------------------------------ |
| combo    | string / ComboConfig | true     | combo ID 或 Combo 配置                     |
| elements | string[]             | true     | 添加到 Combo 中的元素 ID，包括节点和 combo |
| stack | boolean | false | **v4.7.17 及后续版本支持** 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
// 第一个参数为 combo ID
graph.createCombo('combo1', ['node1', 'node2', 'combo2'])

// 第一个参数为 combo 配置
graph.createCombo({
  id: 'combo1',
  style: {
    fill: '#f00'
  }
}, ['node1', 'node2', 'combo2'])
```

### graph.uncombo(combo, stack)

拆解 Combo，即拆分组/解组。调用后，combo 本身将被删除，而该分组内部的子元素将会成为该分组父分组（若存在）的子元素。

**参数**

| 名称  | 类型            | 是否必选 | 描述                          |
| ----- | --------------- | -------- | ----------------------------- |
| combo | string / ICombo | true     | 需要被拆解的 Combo item 或 id |
| stack | boolean | false | **v4.7.17 及后续版本支持** 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
graph.uncombo('combo1')
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

```javascript
// 将 combo1 从父 combo 中移出，完成后同原父 combo 平级
graph.updateComboTree('combo1')

// 将 combo1 移动到 Combo2 下面，作为 Combo2 的子元素
graph.updateComboTree('combo1', 'combo2')
```

### 比较 Combo 与 Hull

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*08b2SZIUX1oAAAAAAAAAAAAAARQnAQ' alt='combo-hull' width='750'/>
