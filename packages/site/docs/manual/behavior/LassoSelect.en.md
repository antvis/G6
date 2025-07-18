---
title: LassoSelect
order: 12
---

## Overview

Click and drag the mouse to draw an **irregular** box to enclose elements, and the elements within the selected range will be selected.

## Use Cases

This behavior is mainly used for:

- Quickly selecting a batch of elements, making it easier to avoid elements you don't want to select
- Quickly deselecting a batch of elements, making it easier to avoid elements you want to keep

## Online Experience

<embed src="@/common/api/behaviors/lasso-select.md"></embed>

## Basic Usage

Add this behavior in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['lasso-select'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'lasso-select',
      key: 'lasso-select',
      immediately: true, // Elements are immediately selected when the box encloses them
      trigger: ['shift', 'alt', 'control'], // Use multiple keys for selection
    },
  ],
});
```

## Configuration Options

| Option                      | Description                                                                                                                                                                                                                               | Type                                                                                                                           | Default                   | Required |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | -------- |
| type                        | Behavior type name. This plugin is built-in, you can use it by `type: 'lasso-select'`.                                                                                                                                                    | `lasso-select` \| string                                                                                                       | `lasso-select`            | ✓        |
| animation                   | Whether to enable animation                                                                                                                                                                                                               | boolean                                                                                                                        | false                     |          |
| enable                      | Whether to enable lasso selection                                                                                                                                                                                                         | boolean \| ((event: [Event](/api/event#event-object-properties)) => boolean)                                                   | true                      |          |
| enableElements              | Types of elements that can be selected                                                                                                                                                                                                    | ( `node` \| `edge` \| `combo` )[]                                                                                              | [`node`, `combo`, `edge`] |          |
| [immediately](#immediately) | Whether to select immediately, only effective when [selection mode](#mode) is `default`                                                                                                                                                   | boolean                                                                                                                        | false                     |          |
| [mode](#mode)               | Selection mode                                                                                                                                                                                                                            | `union` \| `intersect` \| `diff` \| `default`                                                                                  | `default`                 |          |
| onSelect                    | Callback for selected element state                                                                                                                                                                                                       | (states:Record&lt;string,string\|string[]>) =>Record&lt;string,string\|string[]>                                               |                           |          |
| state                       | State to switch to when selected                                                                                                                                                                                                          | string \| `selected` \| `active` \| `inactive` \| `disabled` \| `highlight`                                                    | `selected`                |          |
| [style](#style)             | Style of the box during selection                                                                                                                                                                                                         | <a href="/manual/element/shape/properties" target="_blank" rel="noopener noreferrer">RectStyleProps extends BaseStyleProps</a> | [Default](#style)         |          |
| trigger                     | Press this shortcut key along with mouse click to select **Key reference:** _<a href="https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values" target="_blank" rel="noopener noreferrer">MDN Key Values</a>_ | string[] \| (`Control` \| `Shift`\| `Alt` \| `......`)[]                                                                       | [`shift`]                 |          |

### immediately

Whether to select immediately, only effective when selection mode is `default`

```js
const graph = new Graph({
  behaviors: [
    {
      type: 'lasso-select',
      key: 'lasso-select',
      immediately: true, // Elements are immediately selected when the box encloses them
      trigger: [], // No need for other keys, just click and drag the mouse to select
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
  data: {
    nodes: [
      { id: 'node-1', style: { x: 100, y: 50 } },
      { id: 'node-2', style: { x: 260, y: 50 } },
      { id: 'node-3', style: { x: 280, y: 100 } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2' },
      { source: 'node-1', target: 'node-3' },
      { source: 'node-2', target: 'node-3' },
    ],
  },
  node: {
    style: { fill: '#7e3feb' },
  },
  edge: {
    stroke: '#8b9baf',
  },
  behaviors: [
    {
      type: 'lasso-select',
      key: 'lasso-select',
      immediately: true, // Immediate selection
      trigger: [],
    },
  ],
  plugins: [{ type: 'grid-line', size: 30 }],
});

graph.render();
```

### mode

Selection mode

- `union`: Keep the current state of selected elements and add the specified state.
- `intersect`: Retain the specified state if the selected elements already have it; otherwise, clear the state.
- `diff`: Toggle the specified state of the selected elements.
- `default`: Clear the current state of selected elements and add the specified state.

```js
const graph = new Graph({
  behaviors: [
    {
      type: 'lasso-select',
      key: 'lasso-select',
      mode: 'default', // Selection mode, default selection mode
    },
  ],
});
```

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 200, y: 100 } },
        { id: 'node-2', style: { x: 360, y: 100 } },
        { id: 'node-3', style: { x: 280, y: 220 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-2', target: 'node-3' },
      ],
    },
    node: {
      style: { fill: '#7e3feb' },
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
        type: 'lasso-select',
        key: 'lasso-select',
        trigger: [],
        immediately: true,
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'lasso-select',
      type: 'lasso-select',
      animation: false,
      enable: true,
      enableElements: ['node', 'edge', 'combo'],
      mode: 'default',
      state: 'selected',
    };
    const optionFolder = gui.addFolder('lassoSelect Options');
    optionFolder.add(options, 'type').disable(true);

    optionFolder.add(options, 'state', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'mode', ['union', 'intersect', 'diff', 'default']);
    // .onChange((e) => {
    //   immediately.show(e === 'default');
    // });

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'lasso-select',
        [property]: value,
      });
      graph.render();
    });
  },
);
```

### style

| Property          | Description             | Type                                     | Default   |
| ----------------- | ----------------------- | ---------------------------------------- | --------- |
| cursor            | Mouse style             | string                                   |           |
| fill              | Fill color              | string \| Pattern \| null                | `#1677FF` |
| fillOpacity       | Fill opacity            | number \| string                         | 0.1       |
| isBillboard       | Billboard mode          | boolean                                  |           |
| isSizeAttenuation | Size attenuation        | boolean                                  |           |
| lineCap           | Line cap style          | `butt` \| `round` \| `square`            |           |
| lineDash          | Dash line config        | number \| string \| (string \| number)[] |           |
| lineDashOffset    | Dash line offset        | number                                   |           |
| lineJoin          | Line join style         | `miter` \| `round` \| `bevel`            |           |
| lineWidth         | Line width              | number \| string                         | 1         |
| opacity           | Overall opacity         | number \| string                         |           |
| radius            | Rectangle corner radius | number \| string \| number[]             |           |
| shadowBlur        | Shadow blur level       | number                                   |           |
| shadowColor       | Shadow color            | string                                   |           |
| shadowOffsetX     | Shadow X offset         | number                                   |           |
| shadowOffsetY     | Shadow Y offset         | number                                   |           |
| stroke            | Stroke color            | string \| Pattern \| null                | `#1677FF` |
| strokeOpacity     | Stroke opacity          | number \| string                         |           |
| visibility        | Visibility              | `visible` \| `hidden`                    |           |
| zIndex            | Rendering level         | number                                   | 2         |

**Example**:

```js
const graph = new Graph({
  behaviors: [
    {
      type: 'lasso-select',
      key: 'lasso-select',
      style: {
        width: 0,
        height: 0,
        lineWidth: 4,
        lineDash: [2, 2], // Dashed outline
        // RGB super colorful box
        fill: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
        stroke: 'pink',
        fillOpacity: 0.2,
        zIndex: 2,
        pointerEvents: 'none',
      },
    },
  ],
});
```

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
  data: {
    nodes: [
      { id: 'node-1', style: { x: 200, y: 100 } },
      { id: 'node-2', style: { x: 360, y: 100 } },
      { id: 'node-3', style: { x: 280, y: 220 } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2' },
      { source: 'node-1', target: 'node-3' },
      { source: 'node-2', target: 'node-3' },
    ],
  },
  node: {
    style: { fill: '#7e3feb' },
  },
  edge: {
    stroke: '#8b9baf',
  },
  behaviors: [
    {
      type: 'lasso-select',
      key: 'lasso-select',
      trigger: [],
      immediately: true,
      style: {
        width: 0,
        height: 0,
        lineWidth: 4,
        lineDash: [2, 2], // Dashed outline
        // RGB super colorful box
        fill: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
        stroke: 'pink',
        fillOpacity: 0.2,
        zIndex: 2,
        pointerEvents: 'none',
      },
    },
  ],
  plugins: [{ type: 'grid-line', size: 30 }],
  animation: true,
});

graph.render();
```

### trigger

Press this shortcut key along with mouse click to select, if set to an **empty array**, it means mouse click to select without needing to press other keys.

Note that setting `trigger` to `['drag']` will cause the `drag-canvas` behavior to be disabled. They cannot be configured simultaneously.

### Practical Example

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 200, y: 250 } },
      { id: 'node-2', style: { x: 250, y: 200 } },
      { id: 'node-3', style: { x: 300, y: 250 } },
      { id: 'node-4', style: { x: 250, y: 300 } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2' },
      { source: 'node-2', target: 'node-3' },
      { source: 'node-3', target: 'node-4' },
      { source: 'node-4', target: 'node-1' },
    ],
  },
  behaviors: [
    {
      key: 'lasso-select',
      type: 'lasso-select',
      enable: true,
      animation: false,
      mode: 'default', // union intersect diff default
      state: 'selected', // 'active', 'selected', 'inactive', ...
      trigger: [], // ['Shift', 'Alt', 'Control', 'Drag', 'Meta', ...]
      style: {
        width: 0,
        height: 0,
        lineWidth: 4,
        lineDash: [2, 2],
        fill: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
        stroke: 'pink',
        fillOpacity: 0.2,
        zIndex: 2,
        pointerEvents: 'none',
      },
    },
  ],
});

graph.render();
```
