---
title: "FocusElement"
description: "FocusElement"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/behavior/FocusElement/"
version: "5.1.1"
---

## Overview

FocusElement is a built-in behavior in G6 used to implement the element focusing feature, allowing elements to be focused to the center of the view by clicking on them. This behavior helps users quickly locate and focus on specific graph elements.

## Use Cases

- Quickly center the focused nodes or edges in the display

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

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
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    behaviors: [
      {
        type: 'focus-element',
        key: 'focus-element',
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'focus-element',
      type: 'focus-element',
      animation: true,
      enable: true,
    };
    const optionFolder = gui.addFolder('FocusElement Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'focus-element',
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

Declare directly using a string form:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['focus-element'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'focus-element',
      animation: {
        duration: 500,
        easing: 'ease-in',
      },
    },
  ],
});
```

## Configuration Options

| Option    | Description                                                                                                                                                                                                                                                                                                                                                                 | Type                                                            | Default                                | Required |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------- | -------- |
| type      | Behavior type name                                                                                                                                                                                                                                                                                                                                                          | string                                                          | `focus-element`                        | ✓        |
| animation | Focus animation settings                                                                                                                                                                                                                                                                                                                                                    | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | `{ duration: 500, easing: 'ease-in' }` |          |
| enable    | Whether to enable the focus feature                                                                                                                                                                                                                                                                                                                                         | boolean \| ((event: IElementEvent) => boolean)                  | true                                   |          |
| trigger   | Press this shortcut key in combination with mouse perform foucs element **Key reference:** _<a href="https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values" target="_blank" rel="noopener noreferrer">MDN Key Values</a>_. If set to an **empty array**, it means drag element can be performed with mouse without pressing other keys <br/> | string[] \| (`Control` \| `Shift`\| `Alt` \| `......`)[]        | [`shift`]                              |          |

### ViewportAnimationEffectTiming

```typescript
type ViewportAnimationEffectTiming =
  | boolean // true to enable default animation, false to disable animation
  | {
      easing?: string; // Animation easing function: 'ease-in-out', 'ease-in', 'ease-out', 'linear'
      duration?: number; // Animation duration (milliseconds)
    };
```

## Code Examples

### Basic Focus Feature

```javascript
const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  behaviors: ['focus-element'],
});
```

### Custom Animation Effects

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'focus-element',
      animation: {
        duration: 800,
        easing: 'ease-in-out',
      },
    },
  ],
});
```

### Conditional Focus Enablement

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'focus-element',
      enable: (event) => {
        // Enable focus only for nodes, not edges
        return event.target.type === 'node';
      },
    },
  ],
});
```

## Practical Example



```ts

import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', combo: 'combo1', style: { x: 110, y: 150 } },
    { id: 'node2', combo: 'combo1', style: { x: 190, y: 150 } },
    { id: 'node3', combo: 'combo2', style: { x: 150, y: 260 } },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
  combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
};

const graph = new Graph({
  container: 'container',
  node: {
    style: { labelText: (d) => d.id },
  },
  data,
  behaviors: ['collapse-expand', 'focus-element'],
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
