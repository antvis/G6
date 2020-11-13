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

```
graph.collapseCombo('combo1')
```

### graph.expandCombo(combo)

展开指定的 Combo。

**参数**

| 名称  | 类型            | 是否必选 | 描述                   |
| ----- | --------------- | -------- | ---------------------- |
| combo | string / ICombo | true     | combo ID 或 combo 实例 |

**用法**

```
graph.expandCombo('combo1')
```

### graph.collapseExpandCombo(combo)

展开或收缩指定的 Combo。

**参数**

| 名称  | 类型            | 是否必选 | 描述                   |
| ----- | --------------- | -------- | ---------------------- |
| combo | string / ICombo | true     | combo ID 或 combo 实例 |

**用法**

```
graph.collapseExpandCombo('combo1')
```

### graph.createCombo(combo, elements)

根据已经存在的节点或 combo 创建新的 combo。

**参数**

| 名称     | 类型                 | 是否必选 | 描述                                       |
| -------- | -------------------- | -------- | ------------------------------------------ |
| combo    | string / ComboConfig | true     | combo ID 或 Combo 配置                     |
| elements | string[]             | true     | 添加到 Combo 中的元素 ID，包括节点和 combo |

**用法**

```
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

### graph.uncombo(combo)

拆解 Combo，即拆分组/解组。调用后，combo 本身将被删除，而该分组内部的子元素将会成为该分组父分组（若存在）的子元素。

**参数**

| 名称  | 类型            | 是否必选 | 描述                          |
| ----- | --------------- | -------- | ----------------------------- |
| combo | string / ICombo | true     | 需要被拆解的 Combo item 或 id |

**用法**

```
graph.uncombo('combo1')
```
