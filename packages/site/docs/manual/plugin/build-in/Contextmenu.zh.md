---
title: Contextmenu 上下文菜单
---

## 概述

上下文菜单（Contextmenu），也被称为右键菜单，是当用户在某个特定区域上点击后出现的一个菜单。支持在点击前后，触发自定义事件。通过上下文菜单，可以将一些具体元素的操作集成在其中，方便对某一项来进行需要时的单独控制。

## 使用场景

这一插件主要用于：

- 元素的各种交互：查看节点、查看边、删除节点等等交互操作

## 基本用法

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  // 其他配置...
  plugins: [
    {
      type: 'contextmenu',
      trigger: 'contextmenu', // 'click' or 'contextmenu'
      getItems: () => {
        return [{ name: '查看详情', value: 'detail' }];
      },
      // 只在点上开启右键菜单，默认全部元素都开启
      enable: (e) => e.targetType === 'node',
    },
  ],
});
```

## 配置项

| 属性           | 描述                                                                            | 类型                                                                              | 默认值           | 必选 |
| -------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------- | ---- |
| className      | 给菜单的 DOM 追加的类名                                                         | string                                                                            | 'g6-contextmenu' |      |
| trigger        | 如何触发右键菜单，[可选值](#trigger-属性)                                       | 'click' \| 'contextmenu'                                                          | 'contextmenu'    |      |
| offset         | 菜单显式 X、Y 方向的偏移量                                                      | [number, number]                                                                  | [4, 4]           |      |
| onClick        | 当菜单被点击后，触发的回调方法，[可见](#onclick)                                | (value: string, target: HTMLElement, current: Element) => void                    | -                |      |
| getItems       | 返回菜单的项目列表，支持 `Promise` 类型的返回值。是 `getContent` 的快捷配置     | (event: IElementEvent) => [Item](#item)[] \| Promise<[Item](#item)[]>             | -                |      |
| getContent     | 返回菜单的内容，支持 `Promise` 类型的返回值，也可以使用 `getItems` 进行快捷配置 | (event: IElementEvent) => HTMLElement \| string \| Promise<HTMLElement \| string> | -                |      |
| loadingContent | 当 `getContent` 返回一个 `Promise` 时，使用的菜单内容                           | HTMLElement \| string                                                             | -                |      |
| enable         | 是否可用，通过参数判断是否支持右键菜单，默认是全部可用                          | boolean \| (event: IElementEvent) => boolean                                      | true             |      |

### trigger 属性

`trigger` 属性支持以下值：

- 'contextmenu'：右键触发
- 'click'：点击触发

### Item

每个菜单项目 (Item) 包含以下属性：

| 属性  | 描述             | 类型     | 必选 |
| ----- | ---------------- | -------- | ---- |
| name  | 菜单项显示的名字 | `string` | ✓    |
| value | 菜单项对应的值   | `string` | ✓    |

### onClick

点击菜单项后会触发该函数，函数有三个参数：

- value: 对应菜单项的 value
- target: 对应菜单项容器的dom节点
- current: 对应触发菜单项的元素，例如是节点则可以通过 `current` 来获取到节点的信息(id)等，或者来对元素进行修改

## 代码示例

### 基础右键菜单

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  layout: { type: 'grid' },
  plugins: [
    {
      type: 'contextmenu',
      trigger: 'contextmenu', // 'click' or 'contextmenu'
      onClick: (value, target, current) => {
        alert('You have clicked the「' + v + '」item');
      },
      getItems: () => {
        return [
          { name: '查看详情', value: 'detail' },
          { name: '删除', value: 'delete' },
        ];
      },
    },
  ],
});
```

### 边的右键菜单

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  layout: { type: 'grid' },
  plugins: [
    {
      type: 'contextmenu',
      trigger: 'contextmenu',
      getItems: () => {
        return [{ name: '变更起点', value: 'change' }];
      },
      // 仅在边上开启右键菜单
      enable: (e) => e.targetType === 'edge',
    },
  ],
});
```

### 异步加载菜单项

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  layout: { type: 'grid' },
  plugins: [
    {
      type: 'contextmenu',
      trigger: 'contextmenu',
      getItems: async () => {
        // 可以从服务器或其他异步源获取工具栏配置
        const response = await fetch('/api/contextmenu-config');
        const items = await response.json();
        return items;
      },
      // 仅在边上开启右键菜单
      enable: (e) => e.targetType === 'node',
    },
  ],
});
```

### 动态控制菜单项

```js
const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
  ],
  edges: [{ source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } }],
};

const graph = new Graph({
  data,
  layout: { type: 'grid' },
  plugins: [
    {
      type: 'contextmenu',
      trigger: 'contextmenu',
      getItems: (e) => {
        if (e.target.id === 'node-1') {
          return [
            {
              name: '删除节点',
              value: 'delete',
            },
          ];
        }
        if (e.target.type === 'edge') {
          return [
            {
              name: '移动边',
              value: 'move',
            },
          ];
        }
        return [];
      },
    },
  ],
});
```

## 实际案例

<Playground path="plugin/contextMenu/demo/basic.js" rid="legend-basic"></Playground>
