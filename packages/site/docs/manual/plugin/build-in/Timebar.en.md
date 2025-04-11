---
title: Timebar
---

## Overview

The Timebar plugin is an essential tool for exploring time-series data. It displays data distribution over time in the form of a timeline or trend chart, supporting time range filtering and dynamic playback interactions to help users better understand how data changes over time.

## Use Cases

- Need to display and analyze time distribution of time-series data
- Need to filter and explore graph data through time dimension
- Need to dynamically display the process of data changes over time

## Basic Usage

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

## Online Demo

<embed src="@/common/api/plugins/timebar.md"></embed>

## Options

| Property       | Description                                | Type                                               | Default      | Required |
| -------------- | ------------------------------------------ | -------------------------------------------------- | ------------ | -------- |
| type           | Plugin type                                | string                                             | `timebar`    | ✓        |
| className      | Additional class name for the toolbar DOM  | string                                             | `g6-timebar` |          |
| x              | X position (invalidates position when set) | number                                             | -            |          |
| y              | Y position (invalidates position when set) | number                                             | -            |          |
| width          | Timebar width                              | number                                             | 450          |          |
| height         | Timebar height                             | number                                             | 60           |          |
| position       | Timebar position                           | `bottom` \| `top`                                  | `bottom`     |          |
| padding        | Padding                                    | number \| number[]                                 | 10           |          |
| data           | Time data                                  | number[] \| { time: number; value: number }[]      | -            | ✓        |
| timebarType    | Timebar display type                       | `time` \| `chart`                                  | `time`       |          |
| elementTypes   | Filter element types                       | (`node` \| `edge` \| `combo`)[]                    | [`node`]     |          |
| mode           | Filter mode                                | `modify` \| `visibility`                           | `modify`     |          |
| values         | Current time value                         | number \| [number, number] \| Date \| [Date, Date] | -            |          |
| loop           | Whether to loop playback                   | boolean                                            | false        |          |
| getTime        | Method to get element time                 | (datum: ElementDatum) => number                    | -            |          |
| labelFormatter | Custom time formatting in chart mode       | (time: number \| Date) => string                   | -            |          |
| onChange       | Callback when time range changes           | (values: number \| [number, number]) => void       | -            |          |
| onReset        | Callback when reset                        | () => void                                         | -            |          |
| onSpeedChange  | Callback when playback speed changes       | (speed: number) => void                            | -            |          |
| onPlay         | Callback when playback starts              | () => void                                         | -            |          |
| onPause        | Callback when paused                       | () => void                                         | -            |          |
| onBackward     | Callback when backward                     | () => void                                         | -            |          |
| onForward      | Callback when forward                      | () => void                                         | -            |          |

### timebarType

The `timebarType` property controls the display type of the timebar, supporting two configurations:

- `time`: Display as a timeline, see [Time Mode Example](/en/examples/plugin/timebar/#timer)
- `chart`: Display as a trend chart, in this case the `data` configuration under `timebar` requires an additional `value` field as chart data, see [Chart Mode Example](/en/examples/plugin/timebar/#chart)

### mode

The `mode` property controls the element filtering method, supporting two configurations:

- `modify`: Filter by modifying graph data
- `visibility`: Filter by modifying element visibility

## Code Examples

### Basic Usage

Simplest configuration:

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
        // By default elementTypes=['node'], so nodes need to set data.timestamp to be displayed according to the timeline
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
        // Scenario 1: By default elementTypes = ['node']
        // - Edges don't need to set data.timestamp, their visibility depends on their connected nodes

        // Scenario 2: If elementTypes includes 'edge', e.g. elementTypes = ['node', 'edge']
        // - Edges must set data.timestamp to control their visibility
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

Effect as follows:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 600, height: 400 },
);
```

### Custom Styling

`width`, `height`, `padding`, and `className` can customize the display effect of the timebar. Note that `className` only affects the outer DOM container and cannot affect the Canvas-rendered content inside the timebar (timeline, chart, playback buttons, etc.).

```js
const graph = new Graph({
  plugins: [
    {
      type: 'timebar',
      className: 'custom-timebar', // Note: Since content is Canvas-rendered, CSS styles cannot affect the internal content
      width: 400, // Set timebar width
      height: 80, // Set timebar height
      padding: [20, 20, 10, 20], // Set padding [top, right, bottom, left]
      position: 'bottom', // Keep position at bottom
      data: timeData,
      // labelFormatter: (time) => {
      //   return new Date(time).toLocaleDateString();
      // }
    },
  ],
});
```

CSS can only style the timebar container:

```css
.custom-timebar {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

Effect as follows:

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

## Practical Examples

- [Time Mode](/en/examples/plugin/timebar/#timer)
- [Chart Mode](/en/examples/plugin/timebar/#chart)
