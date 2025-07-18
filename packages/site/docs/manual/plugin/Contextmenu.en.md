---
title: Contextmenu
order: 3
---

## Overview

The context menu, also known as the right-click menu, is a menu that appears when a user clicks on a specific area. It supports triggering custom events before and after clicking. Through the context menu, specific element operations can be integrated, making it convenient to control a particular item when needed.

## Use Cases

This plugin is mainly used for:

- Various interactions with elements: viewing nodes, viewing edges, deleting nodes, etc.

## Basic Usage

Below is a simple example of initializing the Contextmenu plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'contextmenu',
      // Enable right-click menu only on nodes, by default all elements are enabled
      enable: (e) => e.targetType === 'node',
      getItems: () => {
        return [{ name: 'View Details', value: 'detail' }];
      },
      onClick: (value) => {
        if (value === 'detail') console.log('Display node details');
      },
    },
  ],
});
```

## Configuration Options

| Property       | Description                                                                                                               | Type                                                                              | Default Value    | Required |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------- | -------- |
| className      | Additional class name for the menu DOM                                                                                    | string                                                                            | `g6-contextmenu` |          |
| trigger        | How to trigger the right-click menu: `contextmenu` for right-click, `click` for click                                     | `click` \| `contextmenu`                                                          | `contextmenu`    |          |
| offset         | Offset of the menu display in X and Y directions                                                                          | [number, number]                                                                  | [4, 4]           |          |
| onClick        | Callback method triggered after the menu is clicked, [example](#onclick)                                                  | (value: string, target: HTMLElement, current: Element) => void                    | -                |          |
| getItems       | Returns the list of menu items, supports `Promise` type return value. It is a shortcut configuration for `getContent`     | (event: IElementEvent) => [Item](#item)[] \| Promise<[Item](#item)[]>             | -                |          |
| getContent     | Returns the content of the menu, supports `Promise` type return value, can also use `getItems` for shortcut configuration | (event: IElementEvent) => HTMLElement \| string \| Promise<HTMLElement \| string> | -                |          |
| loadingContent | Menu content used when `getContent` returns a `Promise`                                                                   | HTMLElement \| string                                                             | -                |          |
| enable         | Whether it is available, determines whether the right-click menu is supported by parameters, by default all are available | boolean \| (event: IElementEvent) => boolean                                      | true             |          |

### Item

Each menu item (Item) contains the following properties:

| Property | Description                          | Type     | Required |
| -------- | ------------------------------------ | -------- | -------- |
| name     | Name displayed for the menu item     | `string` | ✓        |
| value    | Value corresponding to the menu item | `string` | ✓        |

### onClick

This function is triggered after clicking a menu item, and the function has three parameters:

- value: Corresponds to the value of the menu item
- target: The DOM node of the menu item container
- current: The element that triggered the menu item, for example, if it is a node, you can use `current` to get the node information (id), or to modify the element

## Code Examples

### Basic Right-click Menu

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
        alert('You have clicked the「' + value + '」item');
      },
      getItems: () => {
        return [
          { name: 'View Details', value: 'detail' },
          { name: 'Delete', value: 'delete' },
        ];
      },
    },
  ],
});
```

### Edge Right-click Menu

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
        return [{ name: 'Change Start Point', value: 'change' }];
      },
      onClick: (value) => {
        if (value === 'change') console.log('Execute change start point operation here');
      },
      // Enable right-click menu only on edges
      enable: (e) => e.targetType === 'edge',
    },
  ],
});
```

### Asynchronous Loading of Menu Items

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
        // Toolbar configuration can be obtained from the server or other asynchronous sources
        const response = await fetch('/api/contextmenu-config');
        const items = await response.json();
        return items;
      },
      // Enable right-click menu only on nodes
      enable: (e) => e.targetType === 'node',
    },
  ],
});
```

### Dynamic Control of Menu Items

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
              name: 'Delete Node',
              value: 'delete',
            },
          ];
        }
        if (e.target.type === 'edge') {
          return [
            {
              name: 'Move Edge',
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

## Practical Examples

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'grid',
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'contextmenu',
      trigger: 'contextmenu', // 'click' or 'contextmenu'
      onClick: (v) => {
        alert('You have clicked the「' + v + '」item');
      },
      getItems: () => {
        return [
          { name: '展开一度关系', value: 'spread' },
          { name: '查看详情', value: 'detail' },
        ];
      },
      enable: (e) => e.targetType === 'node',
    },
  ],
});

graph.render();
```
