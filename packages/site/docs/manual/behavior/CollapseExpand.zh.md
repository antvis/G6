---
title: 展开/收起元素 CollapseExpand
order: 4
---

## 概述

CollapseExpand 是 G6 中用于实现节点或组合（Combo）展开/收起功能的内置交互。通过双击（默认）或单击操作，用户可以灵活控制图元素的展开与收起状态，有效管理图结构的可视化层次，降低视觉复杂度。

## 使用场景

这一交互主要用于：

- 管理大型层次结构图，实现树状图或网络图的分层浏览
- 简化复杂图的展示，按需展开关注区域
- 隐藏暂时不需要查看的分支节点，聚焦于重要信息

## 在线体验

<embed src="@/common/api/behaviors/collapse-expand.md"></embed>

## 基本用法

在图配置中添加这一 behavior：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['collapse-expand'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'collapse-expand',
      key: 'collapse-expand-1',
      trigger: 'click', // 修改触发方式为单击
      animation: true, // 启用动画效果
    },
  ],
});
```

## 配置项

| 配置项     | 说明                           | 类型                                                                      | 默认值            | 必选 |
| ---------- | ------------------------------ | ------------------------------------------------------------------------- | ----------------- | ---- |
| type       | 交互类型名称                   | `collapse-expand` \| string                                               | `collapse-expand` | ✓    |
| animation  | 是否启用展开/收起动画效果      | boolean                                                                   | true              |      |
| enable     | 是否启用展开/收起功能          | boolean \| ((event: [IPointerEvent](/api/event#事件对象属性)) => boolean) | true              |      |
| trigger    | 触发方式，可选单击或双击       | `click` \| `dblclick`                                                     | `dblclick`        |      |
| onCollapse | 完成收起时的回调函数           | (id: string) => void                                                      | -                 |      |
| onExpand   | 完成展开时的回调函数           | (id: string) => void                                                      | -                 |      |
| align      | 是否对准目标元素，避免视图偏移 | boolean                                                                   | true              |      |

## 代码示例

### 基础展开/收起功能

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['collapse-expand'],
  // 其他配置...
});
```

### 使用单击触发展开/收起

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'collapse-expand',
      trigger: 'click', // 将默认的双击触发改为单击触发
    },
  ],
});
```

### 自定义展开/收起回调

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'collapse-expand',
      onCollapse: (id) => {
        console.log(`节点 ${id} 已收起`);
        // 执行自定义逻辑
      },
      onExpand: (id) => {
        console.log(`节点 ${id} 已展开`);
        // 执行自定义逻辑
      },
    },
  ],
});
```

### 条件性启用展开/收起功能

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'collapse-expand',
      // 只有当目标是节点类型时才启用展开/收起功能
      enable: (event) => event.targetType === 'node',
    },
  ],
});
```

### 关闭动画效果

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'collapse-expand',
      animation: false, // 关闭展开/收起动画效果
    },
  ],
});
```

## 常见问题

### 1. 如何判断一个节点是否处于收起状态？

可以通过检查节点数据中的 `collapsed` 属性：

```javascript
const isCollapsed = (nodeId) => {
  const nodeData = graph.getNodeData(nodeId);
  return nodeData?.style?.collapsed === true;
};
```

### 2. 如何以编程方式展开或收起节点？

除了通过用户交互触发，你还可以使用 [collapseElement](/api/element#graphcollapseelementid-options) 或 [expandElement](/api/element#graphexpandelementid-options) 直接控制：

```javascript
// 收起节点
graph.collapseElement('nodeId', { animation: true });

// 展开节点
graph.expandElement('nodeId', { animation: true });
```

## 实际案例

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 300, y: 100 } },
      { id: 'node2', combo: 'combo1', style: { x: 300, y: 150 } },
      { id: 'node3', combo: 'combo2', style: { x: 100, y: 100 } },
      { id: 'node4', combo: 'combo2', style: { x: 50, y: 150 } },
      { id: 'node5', combo: 'combo2', style: { x: 150, y: 150 } },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node3', target: 'node4' },
      { source: 'node3', target: 'node5' },
    ],
    combos: [
      { id: 'combo1', style: { labelText: '双击折叠', collapsed: true } },
      { id: 'combo2', style: { labelText: '单击折叠', collapsed: false } },
    ],
  },
  behaviors: [
    {
      type: 'collapse-expand',
      trigger: 'dblclick',
      enable: (event) => event.targetType === 'combo' && event.target.id === 'combo1',
    },
    {
      type: 'collapse-expand',
      trigger: 'click',
      enable: (event) => event.targetType === 'combo' && event.target.id === 'combo2',
    },
  ],
});

graph.render();
```
