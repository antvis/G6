---
title: 元素状态
order: 2
---

## 概述

<image width="500px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yVbORYybrDQAAAAAAAAAAAAADmJ7AQ/original" />

状态(State)是指元素存在的状态，例如**选中、悬停、激活**等。状态可以使得元素在不同的状态下展示不同的样式，帮助用户更直观的理解图中的信息。

具有以下几个关键特点：

- **多状态并存**：一个元素可以同时拥有多个状态，比如同时处于"选中"和"高亮"状态
- **样式层叠**：多个状态的样式会按照优先级叠加，后应用的状态样式会覆盖先前的样式
- **灵活自定义**：除了预设状态外，用户可以根据业务需求定义任意自定义状态

## 预设状态类型

G6 提供了几种常用的状态类型：

- `selected`：选中状态，通常用于表示用户已选择的元素
- `active`：激活状态，通常用于表示当前交互的活跃元素
- `highlight`：高亮状态，通常用于强调显示特定元素
- `inactive`：非活跃状态，通常用于淡化非关注元素
- `disable`：禁用状态，通常用于表示不可交互的元素

> **注意**：当一个元素没有设置任何状态时，它处于"默认状态"。预设状态并非强制使用，用户可以根据需求定义自己的状态类型。

## 配置与使用

### 配置状态样式

目前 G6 支持在样式映射中配置状态样式，例如：

```javascript
const graph = new Graph({
  // 其他配置...
  node: {
    // 默认状态的样式
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
      lineWidth: 1,
    },
    // 各状态下的样式
    state: {
      selected: {
        fill: '#95D6FB',
        stroke: '#1890FF',
        lineWidth: 2,
        shadowColor: '#1890FF',
        shadowBlur: 10,
      },
      highlight: {
        stroke: '#FF6A00',
        lineWidth: 2,
      },
      disable: {
        fill: '#ECECEC',
        stroke: '#BFBFBF',
        opacity: 0.5,
      },
    },
  },

  // 边的默认样式和状态样式
  edge: {
    style: {
      /* 默认样式 */
    },
    state: {
      selected: {
        /* 选中状态样式 */
      },
      highlight: {
        /* 高亮状态样式 */
      },
      // 其他状态...
    },
  },

  // 组合的默认样式和状态样式
  combo: {
    style: {
      /* 默认样式 */
    },
    state: {
      selected: {
        /* 选中状态样式 */
      },
      // 其他状态...
    },
  },
});
```

### 设置元素状态

在绘制之前，可以在数据中配置元素的初始状态：

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      states: ['selected'], // 该节点初始为选中状态
      // 其他节点属性...
    },
    {
      id: 'node2',
      states: ['disabled'], // 该节点初始为禁用状态
      // 其他节点属性...
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      states: ['highlight'], // 该边初始为高亮状态
      // 其他边属性...
    },
  ],
};
```

更常见的场景是通过用户交互动态改变元素的状态：

```javascript
// 示例1：将单个节点设为选中状态
graph.setElementState('node1', 'selected');

// 示例2：同时设置多个状态
graph.setElementState('node2', ['highlight', 'active']);

// 示例3：批量设置多个元素的状态
graph.setElementState({
  node1: ['selected'],
  node2: ['highlight'],
  edge1: ['active'],
});

// 示例4：移除状态（恢复到默认状态）
graph.setElementState('node1', []);
```

### 查询元素状态

G6 提供了多个 API 用于获取状态，或者判断元素是否处于某个状态：

```javascript
// 获取指定元素的所有状态（返回状态数组）
const states = graph.getElementState('node1');
console.log(states); // 例如：['selected', 'highlight']
```

> 当元素仅存在 **默认状态** 时，`getElementState` 返回值为 `[]`。

```javascript
// 获取所有处于指定状态的节点数据
const selectedNodes = graph.getElementDataByState('node', 'selected');
```

## 状态优先级和样式叠加

当一个元素处于多个状态时，会根据状态值中的顺序来确定状态的优先级。例如，如果一个节点同时处于 `['selected', 'highlight']` 状态，则最终的状态样式为：

> 最终样式 = 默认状态样式 + 选中状态样式 + 高亮状态样式

如果不同状态的样式有冲突（如都设置了 `fill` 属性），后面的状态样式会覆盖前面的样式。

### 自定义状态

您可以根据业务需求创建自定义状态：

```javascript
const graph = new Graph({
  // 其他配置...
  node: {
    style: {
      /* 默认样式 */
    },
    state: {
      // 自定义状态：警告
      warning: {
        fill: '#FFF7E6',
        stroke: '#FA8C16',
        lineWidth: 2,
        lineDash: [4, 4],
      },
      // 自定义状态：加密
      encrypted: {
        fill: '#E6F7FF',
        stroke: '#1890FF',
        icon: {
          show: true,
          img: 'https://path/to/lock-icon.png',
          width: 16,
          height: 16,
        },
      },
    },
  },
});
```

应用自定义状态：

```javascript
graph.setElementState('node1', 'warning');
graph.setElementState('node2', 'encrypted');
```
