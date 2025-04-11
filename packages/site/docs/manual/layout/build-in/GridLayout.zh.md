---
title: Grid 网格布局
---

## 概述

网格布局将节点按照网格形式排列，适用于需要整齐排列节点的场景。该布局支持自动计算行列数，也可以手动指定行列数，并支持防止节点重叠。

## 使用场景

- 在数据可视化中需要展示矩阵或表格形式的数据关系

## 在线体验

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: Array.from({ length: 25 }, (_, i) => ({
        id: `node-${i}`,
        data: {
          value: Math.random() * 100,
        },
      })),
      edges: Array.from({ length: 20 }, (_, i) => ({
        id: `edge-${i}`,
        source: `node-${Math.floor(Math.random() * 25)}`,
        target: `node-${Math.floor(Math.random() * 25)}`,
      })),
    },
    autoFit: 'view',
    node: {
      style: {
        size: 20,
        label: true,
        labelText: (datum) => datum.id,
        labelBackground: true,
        icon: false,
      },
      palette: {
        type: 'group',
        field: (datum) => datum.data.value,
        color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
      },
    },
    edge: {
      style: {
        stroke: '#bfbfbf',
      },
    },
    behaviors: ['drag-canvas'],
    layout: {
      type: 'grid',
      cols: 5,
      rows: 5,
      width: 400,
      height: 400,
      preventOverlap: true,
      nodeSize: 30,
      condense: false,
    },
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      type: 'grid',
      cols: 5,
      rows: 5,
      width: 400,
      height: 400,
      preventOverlap: true,
      nodeSize: 30,
      condense: false,
    };

    const optionFolder = gui.addFolder('Grid Layout Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'cols', 2, 10, 1);
    optionFolder.add(options, 'rows', 2, 10, 1);
    optionFolder.add(options, 'width', 200, 600, 50);
    optionFolder.add(options, 'height', 200, 600, 50);
    optionFolder.add(options, 'preventOverlap');
    optionFolder.add(options, 'nodeSize', 10, 50, 5);
    optionFolder.add(options, 'condense');

    optionFolder.onChange(({ property, value }) => {
      graph.setLayout({
        type: 'grid',
        [property]: value,
      });
      graph.layout();
    });
  },
);
```

## 配置方式

```js
const graph = new Graph({
  layout: {
    type: 'grid',
    begin: [0, 0],
    cols: 5,
    rows: 5,
    width: 300,
    height: 300,
    preventOverlap: true,
    nodeSize: 30,
    condense: false,
  },
});
```

## 配置项

| 属性                  | 描述                                                                                                                             | 类型                                             | 默认值    | 必选 |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------- | ---- |
| type                  | 布局类型                                                                                                                         | `grid`                                           | -         | ✓    |
| begin                 | 网格开始位置（左上角），默认为 `[0, 0]`                                                                                          | [number, number]                                 | [0, 0]    |      |
| cols                  | 网格的列数，为 undefined 时算法根据节点数量、布局空间、rows（若指定）自动计算                                                    | number                                           | undefined |      |
| rows                  | 网格的行数，为 undefined 时算法根据节点数量、布局空间、cols（若指定）自动计算                                                    | number                                           | 10        |      |
| width                 | 布局区域宽度，在 G6 中使用当前容器的宽度作为默认值                                                                               | number                                           | 300       |      |
| height                | 布局区域高度，在 G6 中使用当前容器的高度作为默认值                                                                               | number                                           | 300       |      |
| condense              | 为 false 时表示利用所有可用画布空间，为 true 时表示利用最小的画布空间                                                            | boolean                                          | false     |      |
| nodeSize              | 节点大小（直径），用于防止节点重叠时的碰撞检测                                                                                   | Size \| ((nodeData: Node) => Size)               | -         |      |
| nodeSpacing           | 节点间距，用于调整节点之间的间隔                                                                                                 | ((node?: Node) => number) \| number              | -         |      |
| position              | 指定每个节点所在的行和列                                                                                                         | (node?: Node) => { row?: number; col?: number; } | undefined |      |
| preventOverlap        | 是否防止节点重叠，需要配合 nodeSize 或节点数据中的 size 属性使用                                                                 | boolean                                          | false     |      |
| preventOverlapPadding | 避免重叠时节点的间距 padding，preventOverlap 为 true 时生效                                                                      | number                                           | 10        |      |
| sortBy                | 指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心 | string                                           | undefined |      |

### preventOverlap

> _boolean_ **Default:** `false`

是否防止重叠

必须配合下面属性 nodeSize 或节点数据中的 data.size 属性，只有在数据中设置了 data.size 或在该布局中配置了与当前图节点大小相同的 nodeSize 值，才能够进行节点重叠的碰撞检测

### preventOverlapPadding

> _number_ **Default:** `10`

避免重叠时节点的间距 padding，preventOverlap 为 true 时生效

### sortBy

> _string_ **Default:** `undefined`

指定排序的依据（节点属性名），数值越高则该节点被放置得越中心。若为 undefined，则会计算节点的度数，度数越高，节点将被放置得越中心

在 G6 中使用当前容器的宽度作为 grid 布局 width 的默认值。单独使用此布局时默认值为 300

## 代码示例

### 基础用法

最简单的配置方式：

```js
const graph = new Graph({
  layout: {
    type: 'grid',
    cols: 5,
    rows: 5,
  },
  data: {
    nodes: Array.from({ length: 25 }, (_, i) => ({
      id: `node-${i}`,
      data: {
        value: Math.random() * 100,
      },
    })),
    edges: Array.from({ length: 20 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 25)}`,
      target: `node-${Math.floor(Math.random() * 25)}`,
    })),
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    layout: {
      type: 'grid',
      cols: 5,
      rows: 5,
    },
    data: {
      nodes: Array.from({ length: 25 }, (_, i) => ({
        id: `node-${i}`,
        data: {
          value: Math.random() * 100,
        },
      })),
      edges: Array.from({ length: 20 }, (_, i) => ({
        id: `edge-${i}`,
        source: `node-${Math.floor(Math.random() * 25)}`,
        target: `node-${Math.floor(Math.random() * 25)}`,
      })),
    },
    node: {
      style: {
        size: 20,
        label: true,
        labelText: (datum) => datum.id,
        labelBackground: true,
      },
    },
    edge: {
      style: {
        stroke: '#bfbfbf',
      },
    },
  },
  { width: 600, height: 400 },
);
```

### 自定义配置

可以通过多种方式自定义网格布局：

```js
const graph = new Graph({
  layout: {
    type: 'grid',
    begin: [50, 50], // 从坐标 [50, 50] 开始布局
    cols: 4, // 指定 4 列
    rows: 6, // 指定 6 行
    width: 400, // 布局区域宽度
    height: 600, // 布局区域高度
    preventOverlap: true, // 防止节点重叠
    nodeSize: 30, // 节点大小
    condense: true, // 使用最小空间
    sortBy: 'value', // 按 value 属性排序
  },
  data: {
    nodes: Array.from({ length: 24 }, (_, i) => ({
      id: `node-${i}`,
      data: {
        value: Math.random() * 100, // 用于排序的属性
      },
    })),
    edges: Array.from({ length: 20 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 24)}`,
      target: `node-${Math.floor(Math.random() * 24)}`,
    })),
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    layout: {
      type: 'grid',
      begin: [50, 50],
      cols: 4,
      rows: 6,
      width: 400,
      height: 600,
      preventOverlap: true,
      nodeSize: 30,
      condense: true,
      sortBy: 'value',
    },
    data: {
      nodes: Array.from({ length: 24 }, (_, i) => ({
        id: `node-${i}`,
        data: {
          value: Math.random() * 100,
        },
      })),
      edges: Array.from({ length: 20 }, (_, i) => ({
        id: `edge-${i}`,
        source: `node-${Math.floor(Math.random() * 24)}`,
        target: `node-${Math.floor(Math.random() * 24)}`,
      })),
    },
    node: {
      style: {
        size: 20,
        label: true,
        labelText: (datum) => datum.id,
        labelBackground: true,
      },
      palette: {
        type: 'group',
        field: (datum) => datum.data.value,
        color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
      },
    },
    edge: {
      style: {
        stroke: '#bfbfbf',
      },
    },
  },
  { width: 600, height: 400 },
);
```

### 指定节点位置

可以通过 `position` 属性为特定节点指定位置：

```js
const graph = new Graph({
  layout: {
    type: 'grid',
    cols: 5,
    rows: 5,
    position: (node) => {
      // 为特定节点指定位置
      if (node.id === 'node-0') return { row: 0, col: 0 }; // 左上角
      if (node.id === 'node-1') return { row: 0, col: 4 }; // 右上角
      if (node.id === 'node-2') return { row: 4, col: 0 }; // 左下角
      if (node.id === 'node-3') return { row: 4, col: 4 }; // 右下角
      return undefined; // 其他节点自动布局
    },
  },
  data: {
    nodes: Array.from({ length: 25 }, (_, i) => ({
      id: `node-${i}`,
    })),
    edges: Array.from({ length: 20 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * 25)}`,
      target: `node-${Math.floor(Math.random() * 25)}`,
    })),
  },
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    layout: {
      type: 'grid',
      cols: 5,
      rows: 5,
      position: (node) => {
        if (node.id === 'node-0') return { row: 0, col: 0 };
        if (node.id === 'node-1') return { row: 0, col: 4 };
        if (node.id === 'node-2') return { row: 4, col: 0 };
        if (node.id === 'node-3') return { row: 4, col: 4 };
        return undefined;
      },
    },
    data: {
      nodes: Array.from({ length: 25 }, (_, i) => ({
        id: `node-${i}`,
      })),
      edges: Array.from({ length: 20 }, (_, i) => ({
        id: `edge-${i}`,
        source: `node-${Math.floor(Math.random() * 25)}`,
        target: `node-${Math.floor(Math.random() * 25)}`,
      })),
    },
    node: {
      style: {
        size: 20,
        label: true,
        labelText: (datum) => datum.id,
        labelBackground: true,
      },
    },
    edge: {
      style: {
        stroke: '#bfbfbf',
      },
    },
  },
  { width: 600, height: 400 },
);
```

## 实际案例

- [Grid布局](/examples/layout/grid/#basic)
