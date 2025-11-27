---
title: 元素状态
order: 2
---

## 什么是元素状态

<image width="500px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yVbORYybrDQAAAAAAAAAAAAADmJ7AQ/original" />

元素状态(State)是指图中元素（节点、边、组合）在不同交互场景下的视觉表现形式。比如当用户点击一个节点时，节点可能会变成"选中"状态并改变颜色；当鼠标悬停在边上时，边可能会进入"高亮"状态并加粗显示。

**简单来说，状态让元素能够根据用户的操作或业务逻辑动态改变外观。**

### 状态的特点

- **多状态共存**：一个元素可以同时拥有多个状态，比如既是"选中"又是"高亮"
- **样式叠加**：多个状态的样式会叠加在一起，后设置的状态样式优先级更高
- **完全自定义**：除了内置状态，您可以创建任何符合业务需求的自定义状态

## 内置状态类型

G6 提供了一些常用的内置状态，您可以直接使用：

| 状态名      | 说明       | 典型使用场景       |
| ----------- | ---------- | ------------------ |
| `selected`  | 选中状态   | 用户点击选择元素时 |
| `active`    | 激活状态   | 当前正在交互的元素 |
| `highlight` | 高亮状态   | 需要强调显示的元素 |
| `inactive`  | 非活跃状态 | 淡化显示非关注元素 |
| `disabled`   | 禁用状态   | 不可交互的元素     |

> 💡 **提示**：这些内置状态并非必须使用，您完全可以根据业务需求定义自己的状态名称。

## 配置状态样式

### 基础配置

在创建图实例时，为不同状态配置相应的样式：

```javascript
const graph = new Graph({
  // 节点的状态样式配置
  node: {
    // 默认样式（无状态时的样式）
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
      lineWidth: 1,
    },
    // 各种状态下的样式
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
      disabled: {
        fill: '#ECECEC',
        stroke: '#BFBFBF',
        opacity: 0.5,
      },
    },
  },

  // 边的状态样式配置
  edge: {
    style: {
      stroke: '#E2E2E2',
      lineWidth: 1,
    },
    state: {
      selected: {
        stroke: '#1890FF',
        lineWidth: 2,
      },
      highlight: {
        stroke: '#FF6A00',
        lineWidth: 3,
      },
    },
  },

  // 组合的状态样式配置
  combo: {
    style: {
      fill: '#F0F0F0',
      stroke: '#D9D9D9',
    },
    state: {
      selected: {
        stroke: '#1890FF',
        lineWidth: 2,
      },
    },
  },
});
```

### 自定义状态

您可以创建任何符合业务需求的自定义状态：

```javascript
const graph = new Graph({
  node: {
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
    },
    state: {
      // 自定义状态：错误
      error: {
        fill: '#FFEBE6',
        stroke: '#FF4D4F',
        lineWidth: 2,
        lineDash: [4, 4], // 虚线边框
      },
      // 自定义状态：成功
      success: {
        fill: '#F6FFED',
        stroke: '#52C41A',
        lineWidth: 2,
      },
      // 自定义状态：警告
      warning: {
        fill: '#FFFBE6',
        stroke: '#FAAD14',
        lineWidth: 2,
        // 添加图标
        icon: {
          show: true,
          text: '⚠️',
          fontSize: 16,
        },
      },
    },
  },
});
```

## 设置元素状态

### 数据中设置初始状态

在数据中为元素设置初始状态：

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      states: ['selected'], // 初始为选中状态
    },
    {
      id: 'node2',
      states: ['disabled'], // 初始为禁用状态
    },
    {
      id: 'node3',
      states: ['highlight', 'active'], // 初始有多个状态
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      states: ['highlight'], // 边的初始状态
    },
  ],
};

graph.setData(data);
```

### 动态设置状态

通过 API 动态改变元素状态：

```javascript
// 设置单个元素的单个状态
graph.setElementState('node1', 'selected');

// 设置单个元素的多个状态
graph.setElementState('node2', ['highlight', 'active']);

// 批量设置多个元素的状态
graph.setElementState({
  node1: ['selected'],
  node2: ['highlight'],
  edge1: ['active'],
});
```

### 状态的叠加效果

当元素有多个状态时，样式会按顺序叠加：

```javascript
// 假设节点同时有 selected 和 highlight 状态
graph.setElementState('node1', ['selected', 'highlight']);

// 最终样式 = 默认样式 + selected状态样式 + highlight状态样式
// 如果有样式冲突，后面的状态样式会覆盖前面的
```

## 清除元素状态

### 清除所有状态

将元素恢复到默认状态（无任何状态）：

```javascript
// 清除单个元素的所有状态
graph.setElementState('node1', []);

// 批量清除多个元素的状态
graph.setElementState({
  node1: [],
  node2: [],
  edge1: [],
});
```

### 清除特定状态

如果元素有多个状态，您可以只清除其中的某些状态：

```javascript
// 假设 node1 当前有 ['selected', 'highlight', 'active'] 三个状态
// 现在只想保留 'selected' 状态，清除其他状态
graph.setElementState('node1', ['selected']);

// 或者获取当前状态，然后过滤掉不需要的状态
const currentStates = graph.getElementState('node1');
const newStates = currentStates.filter((state) => state !== 'highlight');
graph.setElementState('node1', newStates);
```

### 清除所有元素的特定状态

```javascript
// 清除所有节点的 'highlight' 状态
const allNodes = graph.getNodeData();
const stateUpdates = {};

allNodes.forEach((node) => {
  const currentStates = graph.getElementState(node.id);
  const newStates = currentStates.filter((state) => state !== 'highlight');
  stateUpdates[node.id] = newStates;
});

graph.setElementState(stateUpdates);
```

## 查询元素状态

### 获取元素状态

```javascript
// 获取指定元素的所有状态
const states = graph.getElementState('node1');
console.log(states); // 例如：['selected', 'highlight']

// 如果元素没有任何状态，返回空数组
console.log(states); // []
```

### 查找特定状态的元素

```javascript
// 获取所有处于 'selected' 状态的节点数据
const selectedNodes = graph.getElementDataByState('node', 'selected');

// 获取所有处于 'highlight' 状态的边数据
const highlightEdges = graph.getElementDataByState('edge', 'highlight');
```

### 判断元素是否处于某状态

```javascript
// 检查元素是否处于特定状态
const states = graph.getElementState('node1');
const isSelected = states.includes('selected');
const isHighlight = states.includes('highlight');

console.log('节点是否选中:', isSelected);
console.log('节点是否高亮:', isHighlight);
```
