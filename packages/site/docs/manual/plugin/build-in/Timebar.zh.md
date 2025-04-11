---
title: Timebar 时间条
---

## 概述

时间条插件是一个用于时序数据探索的重要工具，它能够通过时间轴或趋势图的形式展示数据的时间分布，并支持时间区间筛选、动态播放等交互方式，帮助用户更好地理解数据随时间的变化。

## 使用场景

- 需要展示和分析时序数据的时间分布
- 需要通过时间维度筛选和探索图数据
- 需要动态展示数据随时间变化的过程

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      type: 'timebar',
      data: timeData, // 时间数据
      width: 450, // 时间条宽度
      height: 60, // 时间条高度
      position: 'bottom', // 位置
      loop: false, // 是否循环播放
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/timebar.md"></embed>

## 配置项

| 属性           | 描述                             | 类型                                               | 默认值       | 必选 |
| -------------- | -------------------------------- | -------------------------------------------------- | ------------ | ---- |
| type           | 插件类型                         | string                                             | `timebar`    | ✓    |
| className      | 给工具栏的 DOM 追加的类名        | string                                             | `g6-timebar` |      |
| x              | X 位置（设置后 position 会失效） | number                                             | -            |      |
| y              | Y 位置（设置后 position 会失效） | number                                             | -            |      |
| width          | 时间条宽度                       | number                                             | 450          |      |
| height         | 时间条高度                       | number                                             | 60           |      |
| position       | 时间条位置                       | `bottom` \| `top`                                  | `bottom`     |      |
| padding        | 边距                             | number \| number[]                                 | 10           |      |
| data           | 时间数据                         | number[] \| { time: number; value: number }[]      | -            | ✓    |
| timebarType    | 时间条展示类型                   | `time` \| `chart`                                  | `time`       |      |
| elementTypes   | 筛选元素类型                     | (`node` \| `edge` \| `combo`)[]                    | [`node`]     |      |
| mode           | 筛选模式                         | `modify` \| `visibility`                           | `modify`     |      |
| values         | 当前时间值                       | number \| [number, number] \| Date \| [Date, Date] | -            |      |
| loop           | 是否循环播放                     | boolean                                            | false        |      |
| getTime        | 获取元素时间的方法               | (datum: ElementDatum) => number                    | -            |      |
| labelFormatter | 图表模式下自定义时间格式化       | (time: number \| Date) => string                   | -            |      |
| onChange       | 时间区间变化时的回调             | (values: number \| [number, number]) => void       | -            |      |
| onReset        | 重置时的回调                     | () => void                                         | -            |      |
| onSpeedChange  | 播放速度变化时的回调             | (speed: number) => void                            | -            |      |
| onPlay         | 开始播放时的回调                 | () => void                                         | -            |      |
| onPause        | 暂停时的回调                     | () => void                                         | -            |      |
| onBackward     | 后退时的回调                     | () => void                                         | -            |      |
| onForward      | 前进时的回调                     | () => void                                         | -            |      |

### timebarType

`timebarType` 属性用于控制时间条的展示类型，支持以下两种配置：

- `time`：显示为时间轴形式，参考[时间模式示例](/examples/plugin/timebar/#timer)
- `chart`：显示为趋势图形式，此时`timebar`下的`data`配置项，每个数组项需要额外传入 `value` 字段作为图表数据，参考[图表模式示例](/examples/plugin/timebar/#chart)

### mode

`mode` 属性用于控制元素的筛选方式，支持以下两种配置：

- `modify`：通过修改图数据进行筛选
- `visibility`：通过修改元素可见性进行筛选

## 代码示例

### 基础用法

最简单的配置方式：

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
        label: '节点1',
        // 默认情况下 elementTypes=['node']，所以节点需要设置 data.timestamp，才能按照时间轴内的时间依次展示
        data: {
          timestamp: new Date('2023-08-01').getTime(),
        },
      },
      {
        id: 'node2',
        label: '节点2',
        data: {
          timestamp: new Date('2023-08-02').getTime(),
        },
      },
      {
        id: 'node3',
        label: '节点3',
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
        // 场景一：默认情况 elementTypes = ['node']
        // - 边不需要设置 data.timestamp，边的显示/隐藏完全取决于其连接的两个节点是否可见

        // 场景二：如果elementTypes包含了'edge'，比如 elementTypes = ['node', 'edge']
        // - 此时必须为边设置 data.timestamp，边的显示受其控制
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

效果如下：

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
          label: '节点1',
          data: {
            timestamp: new Date('2023-08-01').getTime(),
          },
        },
        {
          id: 'node2',
          label: '节点2',
          data: {
            timestamp: new Date('2023-08-02').getTime(),
          },
        },
        {
          id: 'node3',
          label: '节点3',
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

### 自定义样式

`width`、`height`、`padding`、`className` 可自定义时间条的展示效果，但需要注意 `className` 仅作用于外层 DOM 容器，无法影响时间条内部的 Canvas 渲染内容（时间轴、图表、播放按钮等）。

```js
const graph = new Graph({
  plugins: [
    {
      type: 'timebar',
      className: 'custom-timebar', // 注意：由于内容是 Canvas 渲染，CSS 样式无法影响到时间条的内部内容
      width: 400, // 设置时间条宽度
      height: 80, // 设置时间条高度
      padding: [20, 20, 10, 20], // 设置内边距 [上, 右, 下, 左]
      position: 'bottom', // 位置保持在底部
      data: timeData,
      // labelFormatter: (time) => {
      //   return new Date(time).toLocaleDateString();
      // }
    },
  ],
});
```

通过 CSS 只能设置时间条容器的样式：

```css
.custom-timebar {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

效果如下：

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

## 实际案例

- [时间模式](/examples/plugin/timebar/#timer)
- [图表模式](/examples/plugin/timebar/#chart)
