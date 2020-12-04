---
title: 元素状态
order: 7
---

### graph.setItemState(item, state, value)

设置元素状态。支持单个状态多值的情况，详情参考 [G6 状态管理最佳实践](/zh/docs/manual/middle/states/state-new)。

该方法在执行过程中会触发 `beforitemstatechange`，`afteritemstatechange` 事件。

**参数**

| 名称  | 类型             | 是否必选 | 描述                                                 |
| ----- | ---------------- | -------- | ---------------------------------------------------- |
| item  | string / Item    | true     | 元素 ID 或元素实例                                   |
| state | string           | true     | 状态值，支持自定义，如 selected、hover、actived 等。 |
| value | Boolean / string | true     | 是否启用状态                                         |

**用法**

```javascript
// 布尔状态 'selected'
graph.setItemState('node1', 'selected', true);

// 多值状态 'body'
graph.setItemState('node1', 'body', 'health');
graph.setItemState('node2', 'body', 'ill');
```

### graph.clearItemStates(item, states)

清除元素状态，可以一次性清除多个状态。

**参数**

| 名称   | 类型                  | 是否必选 | 描述                                     |
| ------ | --------------------- | -------- | ---------------------------------------- |
| item   | string / Object       | true     | 元素 ID 或元素实例                       |
| states | string / Array / null | false    | 取值可以是单个状态值，也可以是状态值数组 |

**用法**

```javascript
// 清除单个状态
graph.clearItemStates(node, 'a');

// 清除多个状态
graph.clearItemStates(node, ['a', 'b']);

// 清除所有
graph.clearItemStates(node);
```

### graph.priorityState(item, state)

将指定状态的优先级提升为最高优先级。

**参数**

| 名称   | 类型                  | 是否必选 | 描述                                     |
| ------ | --------------------- | -------- | ---------------------------------------- |
| item   | string / Object       | true     | 元素 ID 或元素实例                       |
| states | string | true    | 状态名称 |

**用法**

```javascript
// 将 node 的 a 状态调整为优先级最高
graph.priorityState(node, 'a');
```
