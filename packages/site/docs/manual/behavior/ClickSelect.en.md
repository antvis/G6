---
title: ClickSelect
order: 3
---

## Overview

When an element is clicked, it will be highlighted.

## Usage Scenarios

This behavior is mainly used for:

- Focusing on elements
- Viewing element details
- Viewing element relationships

## Online Experience

<embed src="@/common/api/behaviors/click-element.md"></embed>

## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['click-select'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'click-select',
      key: 'click-select-1',
      degree: 2, // Selection spread range
      state: 'active', // Selected state
      neighborState: 'neighborActive', // Neighbor node attached state
      unselectedState: 'inactive', // Unselected node state
    },
  ],
});
```

## Configuration Options

| Option          | Description                                                                                                                                                                                                                                                        | Type                                                                            | Default        | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | -------------- | -------- |
| type            | Behavior type name. This behavior is built-in, and you can use it with `type: 'click-select'`.                                                                                                                                                                     | `click-select` \| string                                                        | `click-select` | ✓        |
| animation       | Whether to enable animation effects when switching element states                                                                                                                                                                                                  | boolean                                                                         | true           |          |
| degree          | Controls the highlight spread range, [example](#degree)                                                                                                                                                                                                            | number \| (event:[Event](/en/api/event#event-object-properties)) => number      | 0              |          |
| enable          | Whether to enable the click element function, supports dynamic control through functions, [example](#enable)                                                                                                                                                       | boolean \| ((event: [Event](/en/api/event#event-object-properties)) => boolean) | true           |          |
| multiple        | Whether to allow multiple selections                                                                                                                                                                                                                               | boolean                                                                         | false          |          |
| state           | The state applied when an element is selected                                                                                                                                                                                                                      | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight`        | `selected`     |          |
| neighborState   | The state applied to elements with n-degree relationships when an element is selected. The value of n is controlled by the degree attribute, for example, degree 1 means directly adjacent elements, [example](#neighborstate)                                     | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight`        | `selected`     |          |
| unselectedState | The state applied to all other elements except the selected element and its affected neighbor elements when an element is selected, [example](#unselectedState)                                                                                                    | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight`        |                |          |
| onClick         | Callback when an element is clicked                                                                                                                                                                                                                                | (event: [Event](/en/api/event#event-object-properties)) => void                 |                |          |
| trigger         | Press this shortcut key in combination with a mouse click to perform multi-selection, key reference: _<a href="https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values" target="_blank" rel="noopener noreferrer">MDN Key Values</a>_ | string[] \| (`Control` \| `Shift`\| `Alt` \| `......`)[]                        | `['shift']`    |          |

### degree

Controls the highlight spread range

- For nodes, `0` means only the current node is selected, `1` means the current node and its directly adjacent nodes and edges are selected, and so on.
- For edges, `0` means only the current edge is selected, `1` means the current edge and its directly adjacent nodes are selected, and so on.

> In the following example, when `degree: 0` only the <span style='color:#E4504D'>red</span> point is highlighted;
> When `degree: 1` the <span style='color:#E4504D'>red</span> and <span style='color:#FFC40C'>orange</span> points are highlighted.

<embed src="@/common/api/behaviors/click-element.md"></embed>

### enable

Whether to enable the click element function

It can be dynamically controlled through functions, for example, only enabled when a node is selected.

```js
{
  //⚠️ Note, you need to set both the node and the canvas, otherwise the user will not listen to the event when clicking the canvas
  enable: (event) => ['node', 'canvas'].includes(event.targetType);
}
```

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
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
});

graph.render();
```

Similarly, if you only want edges to be selected:

```js
{
  enable: (event) => ['edge', 'canvas'].includes(event.targetType);
}
```

### neighborState

The state applied to elements with n-degree relationships when an element is selected. The value of n is controlled by the degree attribute, for example, degree 1 means directly adjacent elements

```js
const graph = new Graph({
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      // State attached to the directly clicked node
      state: 'active',
      // State attached to adjacent nodes
      neighborState: 'neighborActive',
    },
  ],
});
```

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
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
});

graph.render();
```

### unselectedState

When an element is selected, the state applied to all other elements except the selected element and the spread neighbor elements.

Built-in states: `selected` `active` `inactive` `disabled` `highlight`

```js
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

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
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
});

graph.render();
```

## Example

### Click to select nodes and their directly connected nodes

**Clicking a node** will switch from <span style='color:#E4504D'>default state</span> to <span style='color:#0f0'>active</span>
<br>
**Adjacent nodes** will switch from <span style='color:#E4504D'>default state</span> to <span style='color:#FFC40C'>neighborActive</span>

```js
const graph = new Graph({
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      // Selected node state
      active: {
        fill: '#0f0',
      },
      // Adjacent node state
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
      // State attached to adjacent nodes
      neighborState: 'neighborActive',
      // Unselected node state
      unselectedState: 'inactive',
    },
  ],
});
```

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 200,
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
});

graph.render();
```

### Practical Example

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
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
        fill: '#0b0',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
      unselectedState: 'inactive',
      multiple: true,
      trigger: ['shift'],
    },
    'drag-element',
  ],
});

graph.render();
```
