---
title: ClickSelect 点击选中
---

## 概述

当鼠标点击元素时，会使元素 `点` `边` `Combo` 高亮。

## 使用场景

这一交互主要用于：

- 聚焦元素
- 查看元素详情
- 查看元素关系

## 在线体验

<embed src="@/common/api/behaviors/click-element.md"></embed>

## 基本用法

在图配置中添加这一交互：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['click-select'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'click-select',
      key: 'click-select-1',
      degree: 2, // 选中扩散范围
      state: 'active', // 选中的状态
      neighborState: 'neighborActive', // 相邻节点附着状态
      unselectedState: 'inactive', // 未选中节点状态
    },
  ],
});
```

## 配置项

| 配置项                              | 说明                                                                                                                                                                                                         | 类型                                                                     | 默认值         | 必选 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | -------------- | ---- |
| type                                | 交互类型名称。此交互已内置，你可以通过 `type: 'click-select'` 来使用它。                                                                                                                                     | `click-select` \| string                                                 | `click-select` | ✓    |
| animation                           | 是否在元素状态切换时启用动画效果                                                                                                                                                                             | boolean                                                                  | true           |      |
| [degree](#degree)                   | 控制了高亮扩散范围                                                                                                                                                                                           | number \| (event:[Event](/api/event#事件对象属性)) => number             | 0              |      |
| [enable](#enable)                   | 是否启用点击元素的功能（可以通过函数的方式动态控制是否启用，例如只有节点被选中时才启用。）                                                                                                                   | boolean \| ((event: [Event](/api/event#事件对象属性)) => boolean)        | true           |      |
| multiple                            | 是否允许多选                                                                                                                                                                                                 | boolean                                                                  | false          |      |
| state                               | 当元素被选中时应用的状态                                                                                                                                                                                     | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight` | `selected`     |      |
| [neighborState](#neighborstate)     | 当有元素选中时，其相邻 n 度关系的元素应用的状态。n 的值由属性 degree 控制，例如 degree 为 1 时表示直接相邻的元素                                                                                             | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight` | `selected`     |      |
| [unselectedState](#unselectedstate) | 当有元素被选中时，除了选中元素及其受影响的邻居元素外，其他所有元素应用的状态。                                                                                                                               | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight` |                |      |
| onClick                             | 点击元素时的回调                                                                                                                                                                                             | (event: [Event](/api/event#事件对象属性)) => void                        |                |      |
| trigger                             | 按下该快捷键配合鼠标点击进行多选，**按键参考：** <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/UI_Events/Keyboard_event_key_values" target="_blank" rel="noopener noreferrer">MDN Key Values</a> | string[] \| (`Control` \| `Shift`\| `Alt` \| `......`)[]                 | `['shift']`    |      |

### degree

> _number \| ((event:_ [Event](/api/event#事件对象属性)_) => number)_ **Default:** `0`

控制了高亮扩散范围

- 对于节点来说，`0` 表示只选中当前节点，`1` 表示选中当前节点及其直接相邻的节点和边，以此类推。
- 对于边来说，`0` 表示只选中当前边，`1` 表示选中当前边及其直接相邻的节点，以此类推。

> 如下示例，当 `degree: 0` 仅高亮<span style='color:#E4504D'>红色</span>点;
> 当 `degree: 1` 高亮<span style='color:#E4504D'>红色</span>和<span style='color:#FFC40C'>橙色</span>点。

<embed src="@/common/api/behaviors/click-element.md"></embed>

### enable

> _boolean \| ((event:_ [Event](/api/event#事件对象属性)_) => boolean)_ **Default:** `true`

是否启用点击元素的功能

可以通过函数的方式动态控制是否启用，例如只有节点被选中时才启用。

```typescript
{
  // ！！注意，如果不加上 canvas, 则点击画布时无法取消选中！！
  enable: (event) => ['node', 'canvas'].includes(event.targetType);
}
```

```js | ob { pin: false}
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', style: { x: 100, y: 60 } },
        { id: 'node2', style: { x: 200, y: 60 } },
        { id: 'node3', style: { x: 300, y: 60 } },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
      ],
    },
    node: {
      style: {
        fill: '#E4504D',
      },
      state: {
        active: {
          fill: '#0f0',
        },
        neighborActive: {
          fill: '#FFC40C',
        },
      },
    },
    behaviors: [
      {
        type: 'click-select',
        degree: 1,
        state: 'active',
        neighborState: 'neighborActive',
        enable: (event) => ['node', 'canvas'].includes(event.targetType),
      },
    ],
  },
  { width: 400, height: 200 },
);
```

### neighborState

> _string_ **Default:** `'selected'`

当有元素选中时，其相邻 n 度关系的元素应用的状态。n 的值由属性 degree 控制，例如 degree 为 1 时表示直接相邻的元素

```ts
const graph = new Graph({
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      // 被直接点击的节点附着的状态
      state: 'active',
      // 相邻的节点附着的状态
      neighborState: 'neighborActive',
    },
  ],
});
```

```js | ob { pin: false}
createGraph(
  {
    layout: {
      type: 'grid',
    },
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
        { source: 'node3', target: 'node4' },
        { source: 'node4', target: 'node5' },
      ],
    },
    node: {
      style: {
        fill: '#E4504D',
      },
      state: {
        active: {
          fill: '#0f0',
        },
        neighborActive: {
          fill: '#FFC40C',
          halo: true,
        },
      },
    },
    behaviors: [
      {
        type: 'click-select',
        degree: 1,
        state: 'active',
        neighborState: 'neighborActive',
      },
    ],
  },
  { width: 400, height: 200 },
);
```

### unselectedState

> _string_

当有元素被选中时，除了被选中元素和扩散的邻居元素外，其他所有元素应用的状态。

内置状态： `selected` `active` `inactive` `disabled` `highlight`

```ts
const graph = new Graph({
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      unselectedState: 'inactive',
    },
  ],
});
```

```js | ob { pin: false}
createGraph(
  {
    layout: {
      type: 'grid',
    },
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
        { source: 'node3', target: 'node4' },
        { source: 'node4', target: 'node5' },
      ],
    },
    node: {
      style: {
        fill: '#E4504D',
      },
      state: {
        active: {
          fill: '#0f0',
        },
        neighborActive: {
          fill: '#FFC40C',
        },
      },
    },
    behaviors: [
      {
        type: 'click-select',
        degree: 1,
        state: 'active',
        neighborState: 'neighborActive',
        unselectedState: 'inactive',
      },
    ],
  },
  { width: 400, height: 200 },
);
```

## 示例

### 点击选中节点及其直接相连的节点

**点击节点** 会从 <span style='color:#E4504D'>默认状态</span> 切换为 <span style='color:#0f0'>active</span>
<br>
**相邻节点** 会从 <span style='color:#E4504D'>默认状态</span> 切换为 <span style='color:#FFC40C'>neighborActive</span>

```ts
const graph = new Graph({
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      // 选中节点状态
      active: {
        fill: '#0f0',
      },
      // 相邻节点状态
      neighborActive: {
        fill: '#FFC40C',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
      // 相邻节点附着状态
      neighborState: 'neighborActive',
      // 未选中节点状态
      unselectedState: 'inactive',
    },
  ],
});
```

```js | ob { pin: false}
createGraph(
  {
    layout: {
      type: 'grid',
    },
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
        { source: 'node3', target: 'node4' },
        { source: 'node4', target: 'node5' },
      ],
    },
    node: {
      style: {
        fill: '#E4504D',
      },
      state: {
        active: {
          fill: '#0f0',
        },
        neighborActive: {
          fill: '#FFC40C',
        },
      },
    },
    behaviors: [
      {
        type: 'click-select',
        degree: 1,
        state: 'active',
        neighborState: 'neighborActive',
        unselectedState: 'inactive',
      },
    ],
  },
  { width: 400, height: 200 },
);
```

### 动态配置enable只选中节点，不选中边

```typescript
{
  // ！！注意，如果不加上 canvas, 则点击画布时无法取消选中！！
  enable: (event) => ['node', 'canvas'].includes(event.targetType);
}
```

```js | ob { pin: false}
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', style: { x: 100, y: 60 } },
        { id: 'node2', style: { x: 200, y: 60 } },
        { id: 'node3', style: { x: 300, y: 60 } },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
      ],
    },
    node: {
      style: {
        fill: '#E4504D',
      },
      state: {
        active: {
          fill: '#0f0',
        },
        neighborActive: {
          fill: '#FFC40C',
        },
      },
    },
    behaviors: [
      {
        type: 'click-select',
        degree: 1,
        state: 'active',
        neighborState: 'neighborActive',
        enable: (event) => ['node', 'canvas'].includes(event.targetType),
      },
    ],
  },
  { width: 400, height: 200 },
);
```

### 自己定制尝试看看

<Playground path="behavior/select/demo/click.js" rid="click-select"></Playground>
