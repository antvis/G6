---
title: State - 状态
order: 3
---

## 概述

<image width="500px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yVbORYybrDQAAAAAAAAAAAAADmJ7AQ/original" />

状态(State)是指<u>元素</u>存在的状态，例如**选中**、**悬停**、**激活**等。状态可以使得元素在不同的状态下展示不同的样式，帮助用户更直观的理解图中的信息。

## 状态类型

G6 中的状态类型是一个字符串数组(`string[]`)，即一个元素可以同时存在多个状态，例如一个节点可以同时处于**选中**和**悬停**状态。

G6 预设的状态包括：

- `selected`：选中状态
- `active`：激活状态
- `highlight`：高亮状态
- `inactive`：非激活状态
- `disable`：禁用状态

:::warning{title=注意}

- **默认状态**是元素的初始状态，当元素没有任何状态时，它就处于默认状态。
- 预设的状态并不是强制性的，仅仅是一些常见的状态类型，用户可以根据自己的需求定义更多的状态类型。

:::

## 设置元素状态

### 状态样式

目前 G6 支持在样式映射中配置状态样式，例如：

```typescript
{
  node: {
    style: {/** 默认状态样式 */},
    state: {
      selected: {/** 选中状态样式 */},
      [状态名]: {/** 状态样式 */}
    }
  },
  edge: {
   style: {/** 默认状态样式 */},
   state: {
      selected: {/** 选中状态样式 */},
      [状态名]: {/** 状态样式 */}
    }
  },
  combo: {
    style: {/** 默认状态样式 */},
    state: {
      selected: {/** 选中状态样式 */},
      [状态名]: {/** 状态样式 */}
    }
  }
}
```

### 切换状态

在绘制之前，可以在数据中配置元素的状态：

```typescript
const data = {
  nodes: [
    {
      id: 'node-1',
      states: ['selected'],
    },
    {
      id: 'node-2',
      states: ['disabled'],
    },
  ],
  edges: [
    {
      source: 'node-1',
      target: 'node-2',
      states: ['highlight'],
    },
  ],
};
```

或者在完成绘制后通过 API 来切换元素的状态：

```typescript
// 将节点 'node-1' 设置为选中状态
graph.setElementState('node-1', 'selected');

// 将节点 'node-2' 设置为选中且禁用状态
graph.setElementState('node-2', ['selected', 'disabled']);

// 同时设置 'node-1' 和 'node-2' 为高亮状态
graph.setElementState({
  'node-1': ['highlight'],
  'node-2': ['highlight'],
});
```

### 获取状态

G6 提供了多个 API 用于获取状态，或者判断元素是否处于某个状态：

```typescript
// 获取 'node-1' 的所有状态
graph.getElementState('node-1');
```

> 当元素仅存在 **默认状态** 时，`getElementState` 返回值为 `[]`。

```typescript
// 获取所有选中的节点
graph.getElementDataByState('node', 'selected');
```

### 移除状态

要移除元素的状态，同样使用 `setElementState` 方法即可实现：

```typescript
// 移除 `node-1` 的所有状态（恢复至默认状态）
graph.setElementState('node-1', []);
```

## 状态优先级

当一个元素处于多个状态时，会根据状态值中的顺序来确定状态的优先级，例如一个节点的状态值为：`['selected', 'highlight']`，则最终的状态样式为：

> <i>最终样式 = 默认状态样式 + 选中状态样式 + 高亮状态样式</i>

后者的状态样式会覆盖前者的状态样式。

## 自定义状态

要自定义状态，直接在样式映射中添加即可，例如：

```typescript
{
  node: {
    // 自定义状态名为：'custom-state'
    state: {
      'custom-state': {/** 自定义状态样式 */}
    }
  },
}
```

切换状态：

```typescript
graph.setElementState('node-1', 'custom-state');
```
