---
title: BrushSelect
order: 2
---

## Overview

Brush select allows users to click and drag a box to enclose elements, selecting the elements within the box.

## Usage Scenarios

This interaction is mainly used for:

- Quickly selecting a batch of elements
- Quickly deselecting a batch of elements

## Online Experience

<embed src="@/common/api/behaviors/brush-select.md"></embed>

## Basic Usage

Add this interaction in the graph configuration:

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['brush-select'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'brush-select',
      key: 'brush-select-1',
      immediately: true, // Elements are immediately selected as the box encloses them
      trigger: ['shift', 'alt', 'control'], // Use multiple keys for selection
    },
  ],
});
```

## Configuration Options

| Option         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Type                                                                             | Default                   | Required |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------- | -------- |
| type           | Interaction type name. This plugin is built-in, and you can use it with `type: 'brush-select'`.                                                                                                                                                                                                                                                                                                                                                                                                                              | `brush-select` \| string                                                         | `brush-select`            | ✓        |
| animation      | Whether to enable animation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | boolean                                                                          | false                     |          |
| enable         | Whether to enable brush select functionality                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | boolean \| ((event: [Event](/en/api/event#event-object-properties)) => boolean)  | true                      |          |
| enableElements | Types of elements that can be selected                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ( `node` \| `edge` \| `combo` )[]                                                | [`node`, `combo`, `edge`] |          |
| immediately    | Whether to select immediately, only effective when [selection mode](#mode) is `default`, [example](#immediately)                                                                                                                                                                                                                                                                                                                                                                                                             | boolean                                                                          | false                     |          |
| mode           | Selection mode, [example](#mode)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `union` \| `intersect` \| `diff` \| `default`                                    | `default`                 |          |
| onSelect       | Callback for selected element state                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | (states:Record&lt;string,string\|string[]>) =>Record&lt;string,string\|string[]> |                           |          |
| state          | Switch to this state when selected                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | string \| `selected` \| `active` \| `inactive` \| `disabled` \| `highlight`      | `selected`                |          |
| style          | Specify the style of the selection box, [configuration options](#style)                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                                                  | See below                 |          |
| trigger        | Press this shortcut key in combination with a mouse click to perform selection **Key reference:** _<a href="https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values" target="_blank" rel="noopener noreferrer">MDN Key Values</a>_. If set to an **empty array**, it means selection can be performed with a mouse click without pressing other keys <br/> ⚠️ Note, setting `trigger` to `['drag']` will cause the `drag-canvas` behavior to fail. The two cannot be configured simultaneously. | string[] \| (`Control` \| `Shift`\| `Alt` \| `......`)[]                         | [`shift`]                 |          |

### immediately

Whether to select immediately, only effective when selection mode is `default`

```js
const graph = new Graph({
  behaviors: [
    {
      type: 'brush-select',
      key: 'brush-select',
      immediately: true, // Elements are immediately selected as the box encloses them
      trigger: [], // No need to press other keys, just click and drag the mouse to select
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
      type: 'brush-select',
      key: 'brush-select',
      immediately: true, // Immediate selection
      trigger: [],
    },
  ],
  plugins: [{ type: 'grid-line', size: 30 }],
});

graph.render();
```

### mode

Four selection modes are built-in:

- `union`: Retain the current state of selected elements and add the specified state.
- `intersect`: If the selected elements already have the specified state, retain it; otherwise, clear the state.
- `diff`: Invert the specified state of the selected elements.
- `default`: Clear the current state of selected elements and add the specified state.

```js
const graph = new Graph({
  behaviors: [
    {
      type: 'brush-select',
      key: 'brush-select',
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
        type: 'brush-select',
        key: 'brush-select',
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
      key: 'brush-select',
      type: 'brush-select',
      animation: false,
      enable: true,
      enableElements: ['node', 'edge', 'combo'],
      mode: 'default',
      state: 'selected',
    };
    const optionFolder = gui.addFolder('BrushSelect Options');
    optionFolder.add(options, 'type').disable(true);

    optionFolder.add(options, 'state', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'mode', ['union', 'intersect', 'diff', 'default']);
    // .onChange((e) => {
    //   immediately.show(e === 'default');
    // });

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'brush-select',
        [property]: value,
      });
      graph.render();
    });
  },
);
```

### style

| Attribute         | Description               | Type                                     | Default   |
| ----------------- | ------------------------- | ---------------------------------------- | --------- |
| cursor            | Mouse style               | string                                   |           |
| fill              | Fill color                | string \| Pattern \| null                | `#1677FF` |
| fillOpacity       | Fill opacity              | number \| string                         | 0.1       |
| isBillboard       | Enable billboard mode     | boolean                                  |           |
| isSizeAttenuation | Enable size attenuation   | boolean                                  |           |
| lineCap           | Line end style            | `butt` \| `round` \| `square`            |           |
| lineDash          | Dash configuration        | number \| string \| (string \| number)[] |           |
| lineDashOffset    | Dash offset               | number                                   |           |
| lineJoin          | Line join style           | `miter` \| `round` \| `bevel`            |           |
| lineWidth         | Line width                | number \| string                         | 1         |
| opacity           | Overall opacity           | number \| string                         |           |
| radius            | Rectangle corner radius   | number \| string \| number[]             |           |
| shadowBlur        | Shadow blur degree        | number                                   |           |
| shadowColor       | Shadow color              | string                                   |           |
| shadowOffsetX     | Shadow X direction offset | number                                   |           |
| shadowOffsetY     | Shadow Y direction offset | number                                   |           |
| stroke            | Stroke color              | string \| Pattern \| null                | `#1677FF` |
| strokeOpacity     | Stroke opacity            | number \| string                         |           |
| visibility        | Visibility                | `visible` \| `hidden`                    |           |
| zIndex            | Rendering level           | number                                   | 2         |

**Example**：

```js
const graph = new Graph({
  behaviors: [
    {
      type: 'brush-select',
      key: 'brush-select',
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
      type: 'brush-select',
      key: 'brush-select',
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
      key: 'brush-select',
      type: 'brush-select',
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
