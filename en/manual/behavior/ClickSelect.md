---
title: "ClickSelect"
description: "ClickSelect"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/behavior/ClickSelect/"
version: "5.1.1"
---

## Overview

When an element is clicked, it will be highlighted.

## Usage Scenarios

This behavior is mainly used for:

- Focusing on elements
- Viewing element details
- Viewing element relationships

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 280, y: 60, fill: '#E4504D', labelText: 'degree: 0' } },
        { id: 'node-2-1', style: { x: 330, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
        { id: 'node-2-2', style: { x: 230, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
        { id: 'node-3-1', style: { x: 380, y: 220, fill: '#0f0', labelText: 'degree: 2' } },
        { id: 'node-3-2', style: { x: 180, y: 220, fill: '#0f0', labelText: 'degree: 2' } },

        {
          id: 'degree引导',
          style: {
            x: 525,
            y: 110,
            fill: null,
            labelText: '这里可以修改degree ->',
            labelFontWeight: 700,
            labelFontSize: 10,
          },
        },
      ],
      edges: [
        { source: 'node-1', target: 'node-2-1' },
        { source: 'node-1', target: 'node-2-2' },
        { source: 'node-2-1', target: 'node-3-1' },
        { source: 'node-2-2', target: 'node-3-2' },
      ],
    },
    node: {
      style: { label: true, labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
      state: {
        custom: { fill: '#ffa940' },
      },
    },
    edge: {
      stroke: '#8b9baf',
      state: {
        custom: { stroke: '#ffa940' },
      },
    },
    behaviors: [
      {
        type: 'click-select',
        key: 'click-select',
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'click-select',
      type: 'click-select',
      animation: true,
      enable: true,
      multiple: false,
      trigger: 'shift+click',
      state: 'selected',
      unselectedState: undefined,
      degree: 0,
    };
    const optionFolder = gui.addFolder('Click Select Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'degree', 0, 2, 1);
    optionFolder.add(options, 'state', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'unselectedState', [undefined, 'inactive']);
    const trigger = optionFolder
      .add(options, 'trigger', {
        'shift+click': ['shift'],
        'meta+click': ['Meta'],
      })
      .hide();
    optionFolder.add(options, 'multiple').onChange((v) => trigger.show(v));

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'click-select',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



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
| degree          | Controls the highlight spread range, [example](#degree)                                                                                                                                                                                                            | number \| (event:[Event](/en/api/event/#event-object-properties)) => number      | 0              |          |
| enable          | Whether to enable the click element function, supports dynamic control through functions, [example](#enable)                                                                                                                                                       | boolean \| ((event: [Event](/en/api/event/#event-object-properties)) => boolean) | true           |          |
| multiple        | Whether to allow multiple selections                                                                                                                                                                                                                               | boolean                                                                         | false          |          |
| state           | The state applied when an element is selected                                                                                                                                                                                                                      | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight`        | `selected`     |          |
| neighborState   | The state applied to elements with n-degree relationships when an element is selected. The value of n is controlled by the degree attribute, for example, degree 1 means directly adjacent elements, [example](#neighborstate)                                     | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight`        | `selected`     |          |
| unselectedState | The state applied to all other elements except the selected element and its affected neighbor elements when an element is selected, [example](#unselectedState)                                                                                                    | string \| `selected` \| `active`\| `inactive`\| `disabled`\| `highlight`        |                |          |
| onClick         | Callback when an element is clicked                                                                                                                                                                                                                                | (event: [Event](/en/api/event/#event-object-properties)) => void                 |                |          |
| trigger         | Press this shortcut key in combination with a mouse click to perform multi-selection, key reference: _<a href="https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values" target="_blank" rel="noopener noreferrer">MDN Key Values</a>_ | string[] \| (`Control` \| `Shift`\| `Alt` \| `......`)[]                        | `['shift']`    |          |

### degree

Controls the highlight spread range

- For nodes, `0` means only the current node is selected, `1` means the current node and its directly adjacent nodes and edges are selected, and so on.
- For edges, `0` means only the current edge is selected, `1` means the current edge and its directly adjacent nodes are selected, and so on.

> In the following example, when `degree: 0` only the red point is highlighted;
> When `degree: 1` the red and orange points are highlighted.



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 280, y: 60, fill: '#E4504D', labelText: 'degree: 0' } },
        { id: 'node-2-1', style: { x: 330, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
        { id: 'node-2-2', style: { x: 230, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
        { id: 'node-3-1', style: { x: 380, y: 220, fill: '#0f0', labelText: 'degree: 2' } },
        { id: 'node-3-2', style: { x: 180, y: 220, fill: '#0f0', labelText: 'degree: 2' } },

        {
          id: 'degree引导',
          style: {
            x: 525,
            y: 110,
            fill: null,
            labelText: '这里可以修改degree ->',
            labelFontWeight: 700,
            labelFontSize: 10,
          },
        },
      ],
      edges: [
        { source: 'node-1', target: 'node-2-1' },
        { source: 'node-1', target: 'node-2-2' },
        { source: 'node-2-1', target: 'node-3-1' },
        { source: 'node-2-2', target: 'node-3-2' },
      ],
    },
    node: {
      style: { label: true, labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
      state: {
        custom: { fill: '#ffa940' },
      },
    },
    edge: {
      stroke: '#8b9baf',
      state: {
        custom: { stroke: '#ffa940' },
      },
    },
    behaviors: [
      {
        type: 'click-select',
        key: 'click-select',
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'click-select',
      type: 'click-select',
      animation: true,
      enable: true,
      multiple: false,
      trigger: 'shift+click',
      state: 'selected',
      unselectedState: undefined,
      degree: 0,
    };
    const optionFolder = gui.addFolder('Click Select Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'degree', 0, 2, 1);
    optionFolder.add(options, 'state', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'unselectedState', [undefined, 'inactive']);
    const trigger = optionFolder
      .add(options, 'trigger', {
        'shift+click': ['shift'],
        'meta+click': ['Meta'],
      })
      .hide();
    optionFolder.add(options, 'multiple').onChange((v) => trigger.show(v));

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'click-select',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



### enable

Whether to enable the click element function

It can be dynamically controlled through functions, for example, only enabled when a node is selected.

```js
{
  //⚠️ Note, you need to set both the node and the canvas, otherwise the user will not listen to the event when clicking the canvas
  enable: (event) => ['node', 'canvas'].includes(event.targetType);
}
```



```ts

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



```ts

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



```ts

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

**Clicking a node** will switch from default state to active
<br />
**Adjacent nodes** will switch from default state to neighborActive

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



```ts

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



```ts

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
### demo-runtime.ts

```ts
import { Graph } from '@antv/g6';
import GUI from 'lil-gui';

export function addPanel(renderPanel: (gui: GUI) => void) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

export async function createGraph(
  options: ConstructorParameters<typeof Graph>[0],
  size: { width?: number; height?: number } = {},
  renderPanel?: (gui: GUI, graph: Graph) => void,
) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '100%',
    maxWidth: `${size.width || 600}px`,
    height: `${size.height || 400}px`,
  });
  document.getElementById('container')!.append(container);
  const graph = new Graph({ ...size, ...options, width: container.clientWidth, container, autoResize: true });
  addEventListener('pagehide', () => graph.destroy(), { once: true });
  await graph.render();
  if (renderPanel) addPanel((gui) => renderPanel(gui, graph));
  return container;
}
```
