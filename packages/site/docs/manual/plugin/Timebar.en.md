---
title: Timebar
order: 14
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

<embed src="@/common/api/plugins/timebar.md"></embed>

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
| data           | Time data                                                                                                                                                                                | number[] \| { time: number; value: number }[]      | -             | ✓        |
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

- `time`: Displayed as a timeline, refer to [Time Mode Example](/examples/plugin/timebar/#timer)
- `chart`: Displayed as a trend chart, at this time the `data` configuration item under `timebar` needs to pass an additional `value` field as chart data, refer to [Chart Mode Example](/examples/plugin/timebar/#chart)

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

```js | ob { pin: false, inject: true }
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

```js | ob { pin: false }
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

- [Time Mode](/examples/plugin/timebar/#timer)
- [Chart Mode](/examples/plugin/timebar/#chart)
