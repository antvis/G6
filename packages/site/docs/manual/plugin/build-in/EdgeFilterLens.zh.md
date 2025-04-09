---
title: EdgeFilterLens 边过滤镜
---

## 概述

边过滤镜插件可以将关注的边保留在过滤镜范围内，其他边将在该范围内不显示。这是一个重要的可视化探索工具，可以帮助用户聚焦于特定区域的边关系。

## 使用场景

- 需要聚焦查看局部区域的边关系
- 在复杂网络中突出显示特定节点之间的连接

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      trigger: 'pointermove', // 跟随鼠标移动
      r: 60, // 设置透镜半径
      nodeType: 'both', // 边的显示条件
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/edge-filter-lens.md"></embed>

## 配置项

| 属性           | 描述                           | 类型                                                                                                                                                                             | 默认值                                                                                                 | 必选 |
| -------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---- |
| type           | 插件类型                       | string                                                                                                                                                                           | `edge-filter-lens`                                                                                     | ✓    |
| trigger        | 移动透镜的方式                 | `pointermove` \| `click` \| `drag`                                                                                                                                               | `pointermove`                                                                                          |      |
| r              | 透镜的半径                     | number                                                                                                                                                                           | 60                                                                                                     |      |
| maxR           | 透镜的最大半径                 | number                                                                                                                                                                           | 画布宽高最小值的一半                                                                                   |      |
| minR           | 透镜的最小半径                 | number                                                                                                                                                                           | 0                                                                                                      |      |
| scaleRBy       | 缩放透镜半径的方式             | `wheel`                                                                                                                                                                          | -                                                                                                      |      |
| nodeType       | 边显示的条件                   | `both` \| `source` \| `target` \| `either`                                                                                                                                       | `both`                                                                                                 |      |
| filter         | 过滤出始终不在透镜中显示的元素 | (id: string, elementType: 'node' \| 'edge' \| 'combo') => boolean                                                                                                                | () => true                                                                                             |      |
| style          | 透镜的样式                     | [CircleStyleProps](#circlestyleprops)                                                                                                                                            | `{fill: '#fff', fillOpacity: 1, lineWidth: 1, stroke: '#000', strokeOpacity: 0.8, zIndex: -Infinity }` |      |
| nodeStyle      | 在透镜中节点的样式             | [NodeStyle](/manual/element/node/build-in/base-node#style) \| ((datum: [NodeData](/manual/data#节点数据nodedata)) => [NodeStyle](/manual/element/node/build-in/base-node#style)) | `{ label: false }`                                                                                     |      |
| edgeStyle      | 在透镜中边的样式               | [EdgeStyle](/manual/element/edge/build-in/base-edge#style) \| ((datum: [EdgeData](/manual/data#边数据edgedata)) => [EdgeStyle](/manual/element/edge/build-in/base-edge#style))   | `{ label: true }`                                                                                      |      |
| preventDefault | 是否阻止默认事件               | boolean                                                                                                                                                                          | true                                                                                                   |      |

### CircleStyleProps

圆形透镜的样式属性。

| 属性          | 描述            | 类型                          | 默认值 |
| ------------- | --------------- | ----------------------------- | ------ |
| fill          | 填充颜色        | string \| Pattern \| null     | -      |
| stroke        | 描边颜色        | string \| Pattern \| null     | -      |
| opacity       | 整体透明度      | number \| string              | -      |
| fillOpacity   | 填充透明度      | number \| string              | -      |
| strokeOpacity | 描边透明度      | number \| string              | -      |
| lineWidth     | 线宽度          | number \| string              | -      |
| lineCap       | 线段端点样式    | `butt` \| `round` \| `square` | -      |
| lineJoin      | 线段连接处样式  | `miter` \| `round` \| `bevel` | -      |
| shadowColor   | 阴影颜色        | string                        | -      |
| shadowBlur    | 阴影模糊程度    | number                        | -      |
| shadowOffsetX | 阴影 X 方向偏移 | number                        | -      |
| shadowOffsetY | 阴影 Y 方向偏移 | number                        | -      |

完整样式属性参考 [元素 -节点 - 内置节点 - 通用样式属性 - style](/manual/element/node/build-in/base-node#style)

### trigger

`trigger` 属性用于控制透镜的移动方式，支持以下三种配置：

- `pointermove`：透镜始终跟随鼠标移动
- `click`：点击画布时移动透镜到点击位置
- `drag`：通过拖拽方式移动透镜

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      trigger: 'pointermove', // 跟随鼠标移动
      //   trigger: 'click', // 点击移动
      //   trigger: 'drag', // 拖拽移动
    },
  ],
});
```

### nodeType

`nodeType` 属性用于控制边的显示条件：

- `both`：只有起始节点和目标节点都在透镜中时，边才会显示
- `source`：只有起始节点在透镜中时，边才会显示
- `target`：只有目标节点在透镜中时，边才会显示
- `either`：只要起始节点或目标节点有一个在透镜中时，边就会显示

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      nodeType: 'both', // 起始和目标节点都在透镜中时显示边
      // nodeType: 'source', // 起始节点在透镜中时显示边
      // nodeType: 'target', // 目标节点在透镜中时显示边
      // nodeType: 'either', // 起始或目标节点在透镜中时显示边
    },
  ],
});
```

### 缩放控制

通过 `scaleRBy` 可以控制透镜半径的调整方式：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      // 通过滚轮调整半径
      scaleRBy: 'wheel',
      // 设置半径范围
      minR: 50,
      maxR: 200,
    },
  ],
});
```

## 代码示例

### 基础用法

最简单的配置方式：

```js
const graph = new Graph({
  plugins: ['edge-filter-lens'],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        // 上部疏散区域
        { id: 'node1', style: { x: 150, y: 60, label: 'Node 1' } },
        { id: 'node2', style: { x: 100, y: 40, label: 'Node 2' } },
        { id: 'node3', style: { x: 200, y: 35, label: 'Node 3' } },
        { id: 'node4', style: { x: 150, y: 30, label: 'Node 4' } },

        // 中部区域
        { id: 'node5', style: { x: 220, y: 140, label: 'Node 5' } },
        { id: 'node6', style: { x: 280, y: 160, label: 'Node 6' } },
        { id: 'node7', style: { x: 220, y: 120, label: 'Node 7' } },
        { id: 'node8', style: { x: 260, y: 100, label: 'Node 8' } },
        { id: 'node9', style: { x: 240, y: 130, label: 'Node 9' } },
        { id: 'node10', style: { x: 300, y: 110, label: 'Node 10' } },

        // 下部区域
        { id: 'node11', style: { x: 240, y: 200, label: 'Node 11' } },
        { id: 'node12', style: { x: 280, y: 220, label: 'Node 12' } },
        { id: 'node13', style: { x: 300, y: 190, label: 'Node 13' } },
        { id: 'node14', style: { x: 320, y: 210, label: 'Node 14' } },
      ],
      edges: [
        // 上部连接
        { id: 'edge1', source: 'node1', target: 'node2' },
        { id: 'edge2', source: 'node2', target: 'node3' },
        { id: 'edge3', source: 'node3', target: 'node4' },

        // 中部连接
        { id: 'edge4', source: 'node5', target: 'node6' },
        { id: 'edge5', source: 'node6', target: 'node7' },
        { id: 'edge6', source: 'node7', target: 'node8' },
        { id: 'edge7', source: 'node8', target: 'node9' },
        { id: 'edge8', source: 'node9', target: 'node10' },

        // 下部连接
        { id: 'edge9', source: 'node11', target: 'node12' },
        { id: 'edge10', source: 'node12', target: 'node13' },
        { id: 'edge11', source: 'node13', target: 'node14' },

        // 跨区域连接
        { id: 'edge12', source: 'node4', target: 'node8' },
        { id: 'edge13', source: 'node7', target: 'node11' },
        { id: 'edge14', source: 'node10', target: 'node13' },
      ],
    },
    node: {
      style: {
        size: 20,
      },
    },
    plugins: ['edge-filter-lens'],
  },
  { width: 400, height: 300 },
);
```

### 自定义样式

可以自定义透镜的外观和行为：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      r: 80,
      style: {
        fill: '#f0f5ff', // 透镜区域的填充颜色
        fillOpacity: 0.6, // 填充区域的透明度
        stroke: '#7e3feb', // 透镜边框改为紫色
        strokeOpacity: 0.8, // 边框的透明度
        lineWidth: 1.5, // 边框的线宽
      },
      nodeStyle: {
        size: 24, // 放大节点
        fill: '#7e3feb', // 紫色填充
        stroke: '#5719c9', // 深紫色描边
        lineWidth: 1, // 细边框
        label: true, // 显示标签
        labelFill: '#ffffff', // 白色文字
        labelFontSize: 14, // 放大文字
        labelFontWeight: 'bold', // 文字加粗
      },
      edgeStyle: {
        stroke: '#8b9baf', // 灰色边
        lineWidth: 2, // 加粗边线
        label: true, // 显示标签
        labelFill: '#5719c9', // 深紫色文字
        opacity: 0.8, // 适当的透明度
      },
    },
  ],
});
```

效果如下：

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        // 上部疏散区域
        { id: 'node1', style: { x: 150, y: 60, label: 'Node 1' } },
        { id: 'node2', style: { x: 100, y: 40, label: 'Node 2' } },
        { id: 'node3', style: { x: 200, y: 35, label: 'Node 3' } },
        { id: 'node4', style: { x: 150, y: 30, label: 'Node 4' } },

        // 中部区域
        { id: 'node5', style: { x: 220, y: 140, label: 'Node 5' } },
        { id: 'node6', style: { x: 280, y: 160, label: 'Node 6' } },
        { id: 'node7', style: { x: 220, y: 120, label: 'Node 7' } },
        { id: 'node8', style: { x: 260, y: 100, label: 'Node 8' } },
        { id: 'node9', style: { x: 240, y: 130, label: 'Node 9' } },
        { id: 'node10', style: { x: 300, y: 110, label: 'Node 10' } },

        // 下部区域
        { id: 'node11', style: { x: 240, y: 200, label: 'Node 11' } },
        { id: 'node12', style: { x: 280, y: 220, label: 'Node 12' } },
        { id: 'node13', style: { x: 300, y: 190, label: 'Node 13' } },
        { id: 'node14', style: { x: 320, y: 210, label: 'Node 14' } },
      ],
      edges: [
        // 上部连接
        { id: 'edge1', source: 'node1', target: 'node2' },
        { id: 'edge2', source: 'node2', target: 'node3' },
        { id: 'edge3', source: 'node3', target: 'node4' },

        // 中部连接
        { id: 'edge4', source: 'node5', target: 'node6' },
        { id: 'edge5', source: 'node6', target: 'node7' },
        { id: 'edge6', source: 'node7', target: 'node8' },
        { id: 'edge7', source: 'node8', target: 'node9' },
        { id: 'edge8', source: 'node9', target: 'node10' },

        // 下部连接
        { id: 'edge9', source: 'node11', target: 'node12' },
        { id: 'edge10', source: 'node12', target: 'node13' },
        { id: 'edge11', source: 'node13', target: 'node14' },

        // 跨区域连接
        { id: 'edge12', source: 'node4', target: 'node8' },
        { id: 'edge13', source: 'node7', target: 'node11' },
        { id: 'edge14', source: 'node10', target: 'node13' },
      ],
    },
    node: {
      style: {
        size: 20,
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
        type: 'edge-filter-lens',
        r: 80,
        style: {
          fill: '#f0f5ff', // 透镜区域的填充颜色
          fillOpacity: 0.6, // 填充区域的透明度
          stroke: '#7e3feb', // 透镜边框改为紫色
          strokeOpacity: 0.8, // 边框的透明度
          lineWidth: 1.5, // 边框的线宽
        },
        nodeStyle: {
          size: 24, // 放大节点
          fill: '#7e3feb', // 紫色填充
          stroke: '#5719c9', // 深紫色描边
          lineWidth: 1, // 细边框
          label: true, // 显示标签
          labelFill: '#ffffff', // 白色文字
          labelFontSize: 14, // 放大文字
          labelFontWeight: 'bold', // 文字加粗
        },
        edgeStyle: {
          stroke: '#8b9baf', // 灰色边
          lineWidth: 2, // 加粗边线
          label: true, // 显示标签
          labelFill: '#5719c9', // 深紫色文字
          opacity: 0.8, // 适当的透明度
        },
      },
    ],
  },
  { width: 400, height: 300 },
);
```

## 实际案例

- [边过滤镜](/examples/plugin/edge-filter-lens/#basic)
