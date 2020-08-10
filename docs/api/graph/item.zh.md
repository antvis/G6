---
title: 配置节点/边/ Combo
order: 10
---

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

### graph.collapseGroup(groupId)

收起分组，收起分组后，隐藏分组中的所有节点和边，分组外部与分组内节点有连线的则临时连接到分组上面。

**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| groupId | string | true     | 分组 ID |

**用法**

```javascript
graph.collapseGroup('groupId');
```

### graph.expandGroup(groupId)

展开分组，显示分组中的所有节点和边，恢复收起前的连接情况。

**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| groupId | string | true     | 分组 ID |

**用法**

```javascript
graph.expandGroup('groupId');
```
