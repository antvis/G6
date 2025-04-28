---
title: Fisheye 鱼眼放大镜
---

## 概述

鱼眼放大镜插件是为 focus+context 的探索场景设计的，它能够在放大关注区域的同时，保证上下文以及上下文与关注中心的关系不丢失，是一个重要的可视化探索工具。

## 使用场景

- 在演示过程中需要突出展示某些区域内容
- 需要局部放大查看细节时，同时又不想失去整体视图

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      trigger: 'drag', // 通过拖拽移动鱼眼
      d: 1.5, // 设置畸变因子
      r: 120, // 设置鱼眼半径
      showDPercent: true, // 显示畸变程度
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/fisheye.md"></embed>

## 配置项

| 属性           | 描述                               | 类型                                                                                                                                                                             | 默认值                 | 必选 |
| -------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---- |
| type           | 插件类型                           | string                                                                                                                                                                           | `fisheye`              | ✓    |
| trigger        | 移动鱼眼放大镜的方式               | `pointermove` \| `drag` \| `click`                                                                                                                                               | `pointermove`          |      |
| r              | 鱼眼放大镜半径                     | number                                                                                                                                                                           | 120                    |      |
| maxR           | 鱼眼放大镜可调整的最大半径         | number                                                                                                                                                                           | 画布宽高的最小值的一半 |      |
| minR           | 鱼眼放大镜可调整的最小半径         | number                                                                                                                                                                           | 0                      |      |
| d              | 畸变因子                           | number                                                                                                                                                                           | 1.5                    |      |
| maxD           | 鱼眼放大镜可调整的最大畸变因子     | number                                                                                                                                                                           | 5                      |      |
| minD           | 鱼眼放大镜可调整的最小畸变因子     | number                                                                                                                                                                           | 0                      |      |
| scaleRBy       | 调整鱼眼放大镜范围半径的方式       | `wheel` \| `drag`                                                                                                                                                                | -                      |      |
| scaleDBy       | 调整鱼眼放大镜畸变因子的方式       | `wheel` \| `drag`                                                                                                                                                                | -                      |      |
| showDPercent   | 是否在鱼眼放大镜中显示畸变因子数值 | boolean                                                                                                                                                                          | true                   |      |
| style          | 鱼眼放大镜样式                     | [CircleStyleProps](#circlestyleprops)                                                                                                                                            | -                      |      |
| nodeStyle      | 在鱼眼放大镜中的节点样式           | [NodeStyle](/manual/element/node/build-in/base-node#style) \| ((datum: [NodeData](/manual/data#节点数据nodedata)) => [NodeStyle](/manual/element/node/build-in/base-node#style)) | `{ label: true }`      |      |
| preventDefault | 是否阻止默认事件                   | boolean                                                                                                                                                                          | true                   |      |

### CircleStyleProps

圆形样式属性，用于配置鱼眼放大镜的外观。

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

### trigger

`trigger` 属性用于控制鱼眼放大镜的移动方式，支持以下三种配置：

- `'pointermove'`：鱼眼放大镜始终跟随鼠标移动
- `'click'`：点击画布时移动鱼眼放大镜到点击位置
- `'drag'`：通过拖拽方式移动鱼眼放大镜

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      trigger: 'pointermove', // 跟随鼠标移动
      //   trigger: 'click', // 点击移动
      //   trigger: 'drag', // 拖拽移动
    },
  ],
});
```

### 缩放控制

通过 `scaleRBy` 和 `scaleDBy` 可以分别控制鱼眼放大镜的半径和畸变因子的调整方式：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      // 通过滚轮调整半径
      scaleRBy: 'wheel',
      // 通过拖拽调整畸变因子
      scaleDBy: 'drag',
      // 设置半径和畸变因子的范围
      minR: 50,
      maxR: 200,
      minD: 1,
      maxD: 3,
    },
  ],
});
```

注意：当 `trigger`、`scaleRBy` 和 `scaleDBy` 同时设置为 `'drag'` 时，优先级顺序为 `trigger` > `scaleRBy` > `scaleDBy`，只会为优先级最高的配置项绑定拖拽事件。同理，如果 `scaleRBy` 和 `scaleDBy` 同时设置为 `'wheel'`，只会为 `scaleRBy` 绑定滚轮事件。

## 代码示例

### 基础用法

最简单的配置方式：

```js
const graph = new Graph({
  plugins: ['fisheye'],
});
```

### 自定义样式

可以自定义鱼眼放大镜的外观和行为：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'fisheye',
      r: 150,
      d: 2,
      style: {
        fill: '#2f54eb', // 鱼眼区域的填充颜色
        fillOpacity: 0.2, // 填充区域的透明度
        stroke: '#1d39c4', // 鱼眼边框的颜色
        strokeOpacity: 0.8, // 边框的透明度
        lineWidth: 1.5, // 边框的线宽
        shadowColor: '#1d39c4', // 阴影颜色
        shadowBlur: 10, // 阴影的模糊半径
        shadowOffsetX: 0, // 阴影的水平偏移
        shadowOffsetY: 0, // 阴影的垂直偏移
        cursor: 'pointer', // 鼠标悬停时的指针样式
      },
      nodeStyle: {
        // 节点基础样式
        size: 40, // 节点大小
        fill: '#d6e4ff', // 节点填充颜色
        stroke: '#2f54eb', // 节点边框颜色
        lineWidth: 2, // 节点边框宽度
        shadowColor: '#2f54eb', // 节点阴影颜色
        shadowBlur: 5, // 节点阴影模糊半径
        cursor: 'pointer', // 鼠标悬停时的指针样式

        // 标签样式
        label: true, // 是否显示标签
        labelFontSize: 14, // 标签字体大小
        labelFontWeight: 'bold', // 标签字体粗细
        labelFill: '#1d39c4', // 标签文字颜色
        labelBackground: true, // 是否显示标签背景
        labelBackgroundFill: '#fff', // 标签背景填充颜色
        labelBackgroundStroke: '#1d39c4', // 标签背景边框颜色
        labelBackgroundOpacity: 0.8, // 标签背景透明度
        labelBackgroundPadding: [4, 8, 4, 8], // 标签背景内边距 [上,右,下,左]

        // 图标样式
        icon: true, // 是否显示图标
        iconFontFamily: 'iconfont', // 图标字体
        iconText: '\ue6f6', // 图标的 Unicode 编码
        iconFill: '#1d39c4', // 图标颜色
        iconSize: 16, // 图标大小
        iconFontWeight: 'normal', // 图标字体粗细
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
        { id: 'node-1', style: { x: 150, y: 100 } },
        { id: 'node-2', style: { x: 250, y: 100 } },
        { id: 'node-3', style: { x: 200, y: 180 } },
        { id: 'node-4', style: { x: 120, y: 180 } },
        { id: 'node-5', style: { x: 280, y: 180 } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2' },
        { id: 'edge-2', source: 'node-1', target: 'node-3' },
        { id: 'edge-3', source: 'node-2', target: 'node-3' },
        { id: 'edge-4', source: 'node-3', target: 'node-4' },
        { id: 'edge-5', source: 'node-3', target: 'node-5' },
      ],
    },
    node: {
      style: {
        size: 30,
        fill: '#e6f7ff',
        stroke: '#1890ff',
        lineWidth: 1,
        label: false,
        icon: false,
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
        type: 'fisheye',
        key: 'fisheye',
        r: 100,
        d: 2,
        style: {
          fill: '#2f54eb', // 鱼眼区域的填充颜色
          fillOpacity: 0.2, // 填充区域的透明度
          stroke: '#1d39c4', // 鱼眼边框的颜色
          strokeOpacity: 0.8, // 边框的透明度
          lineWidth: 1.5, // 边框的线宽
          shadowColor: '#1d39c4', // 阴影颜色
          shadowBlur: 10, // 阴影的模糊半径
          shadowOffsetX: 0, // 阴影的水平偏移
          shadowOffsetY: 0, // 阴影的垂直偏移
          cursor: 'pointer', // 鼠标悬停时的指针样式
        },
        nodeStyle: {
          // 节点基础样式
          size: 40, // 节点大小
          fill: '#d6e4ff', // 节点填充颜色
          stroke: '#2f54eb', // 节点边框颜色
          lineWidth: 2, // 节点边框宽度
          shadowColor: '#2f54eb', // 节点阴影颜色
          shadowBlur: 5, // 节点阴影模糊半径
          cursor: 'pointer', // 鼠标悬停时的指针样式

          // 标签样式
          label: true, // 是否显示标签
          labelFontSize: 14, // 标签字体大小
          labelFontWeight: 'bold', // 标签字体粗细
          labelFill: '#1d39c4', // 标签文字颜色
          labelBackground: true, // 是否显示标签背景
          labelBackgroundFill: '#fff', // 标签背景填充颜色
          labelBackgroundStroke: '#1d39c4', // 标签背景边框颜色
          labelBackgroundOpacity: 0.8, // 标签背景透明度
          labelBackgroundPadding: [4, 8, 4, 8], // 标签背景内边距 [上,右,下,左]

          // 图标样式
          icon: true, // 是否显示图标
          iconFontFamily: 'iconfont', // 图标字体
          iconText: '\ue6f6', // 图标的 Unicode 编码
          iconFill: '#1d39c4', // 图标颜色
          iconSize: 16, // 图标大小
          iconFontWeight: 'normal', // 图标字体粗细
        },
      },
    ],
  },
  { width: 400, height: 300 },
);
```

## 实际案例

<Playground path="plugin/fisheye/demo/basic.js" rid="fisheye-basic"></Playground>
