---
title: "Timebar"
description: "Timebar"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/plugin/Timebar/"
version: "5.1.1"
---

## Overview

The Timebar plugin is an important tool for exploring time-series data. It can display the time distribution of data in the form of a timeline or trend chart, and supports interactions such as time interval filtering and dynamic playback, helping users better understand the changes in data over time.

## Use Cases

- Need to display and analyze the time distribution of time-series data
- Need to filter and explore graph data through the time dimension
- Need to dynamically display the process of data changing over time

## Basic Usage

Below is a simple example of initializing the Timebar plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'timebar',
      data: timeData, // Time data
      width: 450, // Timebar width
      height: 60, // Timebar height
      position: 'bottom', // Position
      loop: false, // Whether to loop playback
    },
  ],
});
```

## Online Experience



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: new Array(25).fill(0).map((_, index) => ({
        id: `node-${index}`,
        data: {
          timestamp: new Date('2023-08-01').getTime() + (index % 5) * 3600 * 24 * 1000,
          value: index % 10,
          label: new Date(new Date('2023-08-01').getTime() + (index % 5) * 3600 * 24 * 1000).toLocaleString(),
        },
      })),
      edges: new Array(25).fill(0).map((_, i) => ({
        id: `edge-${i}`,
        source: `node-${i % 12}`,
        target: `node-${(i % 10) + 15}`,
        data: {
          edgeType: 'e1',
        },
      })),
    },
    layout: { type: 'grid', cols: 5 },
    node: {
      style: { size: 24, fill: '#7e3feb' },
      palette: { field: 'cluster' },
    },
    edge: { style: { stroke: '#8b9baf' } },
    behaviors: ['drag-canvas'],
    plugins: [
      'grid-line',
      {
        type: 'timebar',
        key: 'timebar',
        data: [10, 2, 3, 4, 15].map((value, index) => ({
          time: new Date(new Date('2023-08-01').getTime() + index * 3600 * 24 * 1000),
          value,
          label: new Date(new Date('2023-08-01').getTime() + index * 3600 * 24 * 1000).toLocaleString(),
        })),
        timebarType: 'time',
        height: 100,
      },
    ],
    autoFit: 'view',
    padding: [10, 0, 100, 0],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      type: 'timebar',
      position: 'bottom',
      enable: true,
      timebarType: 'time',
      className: 'g6-timebar',
      width: 450,
      height: 100,
      zIndex: 3,
      elementTypes: ['node'],
      mode: 'modify',
      loop: false,
    };
    const optionFolder = gui.addFolder('Timebar Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'height', 40, 100, 1);
    optionFolder.add(options, 'width', 200, 800, 1);
    optionFolder.add(options, 'position', ['bottom', 'top']);
    optionFolder.add(options, 'timebarType', ['time', 'chart']);
    optionFolder.add(options, 'loop');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'timebar',
        [property]: value,
      });
      graph.render();
    });

    const apiFolder = gui.addFolder('Timebar API');
    const instance = graph.getPluginInstance('timebar');
    apiFolder.add(instance, 'play');
    apiFolder.add(instance, 'pause');
    apiFolder.add(instance, 'forward');
    apiFolder.add(instance, 'backward');
    apiFolder.add(instance, 'reset');
  },
);
```



## Configuration Options

| Property       | Description                                                                                                                                                                              | Type                                               | Default Value | Required |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------- | -------- |
| type           | Plugin type                                                                                                                                                                              | string                                             | `timebar`     | ✓        |
| key            | Unique identifier for the plugin, can be used to get the plugin instance or update plugin options                                                                                        | string                                             | -             |          |
| className      | Additional class name for the toolbar DOM                                                                                                                                                | string                                             | `g6-timebar`  |          |
| x              | X position (position will be invalid if set)                                                                                                                                             | number                                             | -             |          |
| y              | Y position (position will be invalid if set)                                                                                                                                             | number                                             | -             |          |
| width          | Timebar width                                                                                                                                                                            | number                                             | 450           |          |
| height         | Timebar height                                                                                                                                                                           | number                                             | 60            |          |
| position       | Timebar position                                                                                                                                                                         | `bottom` \| `top`                                  | `bottom`      |          |
| padding        | Padding                                                                                                                                                                                  | number \| number[]                                 | 10            |          |
| data           | Time data                                                                                                                                                                                | number[] \| \{ time: number; value: number \}[]      | -             | ✓        |
| timebarType    | Timebar display type                                                                                                                                                                     | `time` \| `chart`                                  | `time`        |          |
| elementTypes   | Filter element types                                                                                                                                                                     | (`node` \| `edge` \| `combo`)[]                    | [`node`]      |          |
| mode           | Control element filtering method, supports the following two configurations: <br/>- `modify`: filter by modifying graph data <br/>- `visibility`: filter by modifying element visibility | `modify` \| `visibility`                           | `modify`      |          |
| values         | Current time value                                                                                                                                                                       | number \| [number, number] \| Date \| [Date, Date] | -             |          |
| loop           | Whether to loop playback                                                                                                                                                                 | boolean                                            | false         |          |
| getTime        | Method to get element time                                                                                                                                                               | (datum: ElementDatum) => number                    | -             |          |
| labelFormatter | Custom time formatting in chart mode                                                                                                                                                     | (time: number \| Date) => string                   | -             |          |
| onChange       | Callback when the time interval changes                                                                                                                                                  | (values: number \| [number, number]) => void       | -             |          |
| onReset        | Callback when reset                                                                                                                                                                      | () => void                                         | -             |          |
| onSpeedChange  | Callback when playback speed changes                                                                                                                                                     | (speed: number) => void                            | -             |          |
| onPlay         | Callback when playback starts                                                                                                                                                            | () => void                                         | -             |          |
| onPause        | Callback when paused                                                                                                                                                                     | () => void                                         | -             |          |
| onBackward     | Callback when moving backward                                                                                                                                                            | () => void                                         | -             |          |
| onForward      | Callback when moving forward                                                                                                                                                             | () => void                                         | -             |          |

### timebarType

The `timebarType` property is used to control the display type of the timebar, supporting the following two configurations:

- `time`: Displayed as a timeline, refer to [Time Mode Example](/en/examples/plugin/timebar/time/)
- `chart`: Displayed as a trend chart, at this time the `data` configuration item under `timebar` needs to pass an additional `value` field as chart data, refer to [Chart Mode Example](/en/examples/plugin/timebar/chart/)

## Code Examples

### Basic Usage

The simplest configuration method:

```js
const graph = new Graph({
  layout: { type: 'grid', cols: 5 },
  plugins: [
    {
      type: 'timebar',
      data: [
        {
          time: new Date('2023-08-01').getTime(),
          value: 5,
        },
        {
          time: new Date('2023-08-02').getTime(),
          value: 10,
        },
        {
          time: new Date('2023-08-03').getTime(),
          value: 15,
        },
      ],
    },
  ],
  data: {
    nodes: [
      {
        id: 'node1',
        label: 'Node 1',
        // By default, elementTypes=['node'], so nodes need to set data.timestamp to display sequentially according to the timeline
        data: {
          timestamp: new Date('2023-08-01').getTime(),
        },
      },
      {
        id: 'node2',
        label: 'Node 2',
        data: {
          timestamp: new Date('2023-08-02').getTime(),
        },
      },
      {
        id: 'node3',
        label: 'Node 3',
        data: {
          timestamp: new Date('2023-08-03').getTime(),
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        // Scenario 1: By default, elementTypes = ['node']
        // - Edges do not need to set data.timestamp, the display/hide of edges depends entirely on whether the two connected nodes are visible

        // Scenario 2: If elementTypes includes 'edge', for example, elementTypes = ['node', 'edge']
        // - At this time, edges must set data.timestamp, and the display of edges is controlled by it
        // data: {
        //   timestamp: new Date('2023-08-01').getTime()
        // }
      },
      {
        id: 'edge2',
        source: 'node2',
        target: 'node3',
      },
      {
        id: 'edge3',
        source: 'node3',
        target: 'node1',
      },
    ],
  },
});
```

The effect is as follows:



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 400,
  width: 600,
  height: 400,
  layout: { type: 'grid', cols: 5 },
  plugins: [
    {
      type: 'timebar',
      data: [
        {
          time: new Date('2023-08-01').getTime(),
          value: 5,
        },
        {
          time: new Date('2023-08-02').getTime(),
          value: 10,
        },
        {
          time: new Date('2023-08-03').getTime(),
          value: 15,
        },
      ],
    },
  ],
  data: {
    nodes: [
      {
        id: 'node1',
        label: 'Node 1',
        data: {
          timestamp: new Date('2023-08-01').getTime(),
        },
      },
      {
        id: 'node2',
        label: 'Node 2',
        data: {
          timestamp: new Date('2023-08-02').getTime(),
        },
      },
      {
        id: 'node3',
        label: 'Node 3',
        data: {
          timestamp: new Date('2023-08-03').getTime(),
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
      },
      {
        id: 'edge2',
        source: 'node2',
        target: 'node3',
      },
      {
        id: 'edge3',
        source: 'node3',
        target: 'node1',
      },
    ],
  },
});

graph.render();
```


### Custom Styles

`width`, `height`, `padding`, `className` can customize the display effect of the timebar, but note that `className` only acts on the outer DOM container and cannot affect the internal Canvas rendering content of the timebar (timeline, chart, play button, etc.).

```js
const graph = new Graph({
  plugins: [
    {
      type: 'timebar',
      className: 'custom-timebar', // Note: Since the content is Canvas rendered, CSS styles cannot affect the internal content of the timebar
      width: 400, // Set timebar width
      height: 80, // Set timebar height
      padding: [20, 20, 10, 20], // Set padding [top, right, bottom, left]
      position: 'bottom', // Keep position at the bottom
      data: timeData,
      // labelFormatter: (time) => {
      //   return new Date(time).toLocaleDateString();
      // }
    },
  ],
});
```

CSS can only set the style of the timebar container:

```css
.custom-timebar {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

The effect is as follows:



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: () => {
      return {
        nodes: [
          {
            id: 'node1',
            style: { x: 100, y: 100, label: 'Node 1' },
            data: {
              timestamp: new Date('2023-08-01').getTime(),
            },
          },
          {
            id: 'node2',
            style: { x: 200, y: 100, label: 'Node 2' },
            data: {
              timestamp: new Date('2023-08-01').getTime() + 3600 * 24 * 1000,
            },
          },
          {
            id: 'node3',
            style: { x: 150, y: 200, label: 'Node 3' },
            data: {
              timestamp: new Date('2023-08-01').getTime() + 3600 * 24 * 1000 * 2,
            },
          },
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2' },
          { id: 'edge2', source: 'node2', target: 'node3' },
          { id: 'edge3', source: 'node3', target: 'node1' },
        ],
      };
    },
    node: {
      style: {
        size: 20,
        label: true,
      },
    },
    edge: {
      style: {
        stroke: '#91d5ff',
        lineWidth: 1,
      },
    },
    plugins: [
      {
        type: 'timebar',
        className: 'custom-timebar',
        width: 400,
        height: 80,
        padding: [20, 20, 10, 20],
        position: 'bottom',
        data: [
          {
            time: new Date('2023-08-01').getTime(),
            value: 5,
          },
          {
            time: new Date('2023-08-01').getTime() + 3600 * 24 * 1000,
            value: 10,
          },
          {
            time: new Date('2023-08-01').getTime() + 3600 * 24 * 1000 * 2,
            value: 15,
          },
        ],
        labelFormatter: (time) => {
          return new Date(time).toLocaleDateString();
        },
      },
    ],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    gui?.hide();
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-timebar {
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);
  },
);
```


## Real Cases

- [Time Mode](/en/examples/plugin/timebar/time/)
- [Chart Mode](/en/examples/plugin/timebar/chart/)
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
