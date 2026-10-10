---
title: "鱼眼放大镜 Fisheye"
description: "鱼眼放大镜 Fisheye"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/plugin/Fisheye/"
version: "5.1.1"
---

## 概述

鱼眼放大镜插件是为 focus+context 的探索场景设计的，它能够在放大关注区域的同时，保证上下文以及上下文与关注中心的关系不丢失，是一个重要的可视化探索工具。

## 使用场景

- 在演示过程中需要突出展示某些区域内容
- 需要局部放大查看细节时，同时又不想失去整体视图

## 基本用法

以下是一个简单的 Fisheye 插件初始化示例：

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



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        // 上部节点
        { id: 'Myriel', style: { x: 197, y: 58 } },
        { id: 'Napoleon', style: { x: 147, y: 22 } },
        { id: 'Mlle.Baptistine', style: { x: 225, y: 141 } },
        { id: 'Mme.Magloire', style: { x: 255, y: 120 } },
        { id: 'CountessdeLo', style: { x: 151, y: -3 } },
        { id: 'Geborand', style: { x: 136, y: 41 } },
        { id: 'Champtercier', style: { x: 227, y: 8 } },
        { id: 'Cravatte', style: { x: 172, y: -10 } },
        { id: 'Count', style: { x: 172, y: 12 } },
        { id: 'OldMan', style: { x: 198, y: -6 } },
        // 中上部节点
        { id: 'Labarre', style: { x: 266, y: 203 } },
        { id: 'Marguerite', style: { x: 265, y: 171 } },
        { id: 'Mme.deR', style: { x: 299, y: 133 } },
        { id: 'Isabeau', style: { x: 282, y: 191 } },
        { id: 'Gervais', style: { x: 334, y: 148 } },
        { id: 'Simplice', style: { x: 286, y: 227 } },
        { id: 'Scaufflaire', style: { x: 250, y: 231 } },
        { id: 'Woman1', style: { x: 375, y: 202 } },
        { id: 'Judge', style: { x: 370, y: 139 } },
        { id: 'Champmathieu', style: { x: 404, y: 216 } },
        // 中部主要节点
        { id: 'Valjean', style: { x: 322, y: 221 } },
        { id: 'Fantine', style: { x: 337, y: 187 } },
        { id: 'Cosette', style: { x: 343, y: 248 } },
        { id: 'Javert', style: { x: 368, y: 263 } },
        { id: 'Thenardier', style: { x: 317, y: 300 } },
        { id: 'Mme.Thenardier', style: { x: 283, y: 267 } },
        { id: 'Eponine', style: { x: 268, y: 365 } },
        { id: 'Gavroche', style: { x: 393, y: 380 } },
        { id: 'Marius', style: { x: 336, y: 350 } },
        { id: 'Enjolras', style: { x: 376, y: 371 } },
        // 右侧和右上节点
        { id: 'Gribier', style: { x: 437, y: 160 } },
        { id: 'Jondrette', style: { x: 510, y: 327 } },
        { id: 'Mme.Burgon', style: { x: 466, y: 368 } },
        { id: 'Brevet', style: { x: 399, y: 183 } },
        { id: 'Chenildieu', style: { x: 425, y: 194 } },
        { id: 'Cochepaille', style: { x: 419, y: 148 } },
        { id: 'Child1', style: { x: 361, y: 387 } },
        { id: 'Child2', style: { x: 415, y: 432 } },
        { id: 'Brujon', style: { x: 330, y: 394 } },
        { id: 'Mme.Hucheloup', style: { x: 394, y: 450 } },
        // 中部其他节点
        { id: 'Favourite', style: { x: 284, y: 153 } },
        { id: 'Dahlia', style: { x: 303, y: 170 } },
        { id: 'Zephine', style: { x: 286, y: 94 } },
        { id: 'Tholomyes', style: { x: 359, y: 158 } },
        { id: 'Listolier', style: { x: 308, y: 80 } },
        { id: 'Fameuil', style: { x: 329, y: 89 } },
        { id: 'Blacheville', style: { x: 351, y: 95 } },
        { id: 'Perpetue', style: { x: 234, y: 195 } },
        { id: 'Woman2', style: { x: 304, y: 254 } },
        { id: 'MotherInnocent', style: { x: 350, y: 214 } },
        // 下部节点
        { id: 'Pontmercy', style: { x: 375, y: 307 } },
        { id: 'Boulatruelle', style: { x: 260, y: 279 } },
        { id: 'Anzelma', style: { x: 234, y: 303 } },
        { id: 'Gillenormand', style: { x: 338, y: 286 } },
        { id: 'Magnon', style: { x: 277, y: 317 } },
        { id: 'Mlle.Gillenormand', style: { x: 257, y: 306 } },
        { id: 'Mme.Pontmercy', style: { x: 307, y: 318 } },
        { id: 'Mlle.Vaubois', style: { x: 197, y: 325 } },
        { id: 'Lt.Gillenormand', style: { x: 294, y: 296 } },
        { id: 'Toussaint', style: { x: 306, y: 277 } },
        { id: 'Gueulemer', style: { x: 344, y: 323 } },
        { id: 'Babet', style: { x: 367, y: 319 } },
        { id: 'Claquesous', style: { x: 303, y: 347 } },
        { id: 'Montparnasse', style: { x: 322, y: 330 } },
        // 最下部节点
        { id: 'Combeferre', style: { x: 397, y: 416 } },
        { id: 'Prouvaire', style: { x: 309, y: 426 } },
        { id: 'Feuilly', style: { x: 314, y: 456 } },
        { id: 'Courfeyrac', style: { x: 332, y: 435 } },
        { id: 'Bahorel', style: { x: 343, y: 466 } },
        { id: 'Bossuet', style: { x: 305, y: 382 } },
        { id: 'Joly', style: { x: 371, y: 415 } },
        { id: 'Grantaire', style: { x: 370, y: 466 } },
        { id: 'MotherPlutarch', style: { x: 424, y: 461 } },
      ],
      edges: [
        // 主要连接
        { id: 'e1', source: 'Valjean', target: 'Javert' },
        { id: 'e2', source: 'Valjean', target: 'Cosette' },
        { id: 'e3', source: 'Javert', target: 'Thenardier' },
        { id: 'e4', source: 'Cosette', target: 'Marius' },
        { id: 'e5', source: 'Eponine', target: 'Marius' },
        { id: 'e6', source: 'Enjolras', target: 'Marius' },
        { id: 'e7', source: 'Gavroche', target: 'Enjolras' },
        { id: 'e8', source: 'Valjean', target: 'Fantine' },
        { id: 'e9', source: 'Cosette', target: 'Thenardier' },
        { id: 'e10', source: 'Eponine', target: 'Thenardier' },
        // 上部连接
        { id: 'e11', source: 'Myriel', target: 'Napoleon' },
        { id: 'e12', source: 'Myriel', target: 'Mlle.Baptistine' },
        { id: 'e13', source: 'Mlle.Baptistine', target: 'Mme.Magloire' },
        { id: 'e14', source: 'CountessdeLo', target: 'Myriel' },
        { id: 'e15', source: 'Geborand', target: 'Myriel' },
        // 中部连接
        { id: 'e16', source: 'Favourite', target: 'Tholomyes' },
        { id: 'e17', source: 'Dahlia', target: 'Favourite' },
        { id: 'e18', source: 'Zephine', target: 'Favourite' },
        { id: 'e19', source: 'Tholomyes', target: 'Listolier' },
        { id: 'e20', source: 'Fameuil', target: 'Blacheville' },
        // 下部连接
        { id: 'e21', source: 'Combeferre', target: 'Enjolras' },
        { id: 'e22', source: 'Prouvaire', target: 'Combeferre' },
        { id: 'e23', source: 'Feuilly', target: 'Courfeyrac' },
        { id: 'e24', source: 'Bahorel', target: 'Bossuet' },
        { id: 'e25', source: 'Joly', target: 'Grantaire' },
        // 额外的中部连接
        { id: 'e26', source: 'Gueulemer', target: 'Thenardier' },
        { id: 'e27', source: 'Babet', target: 'Gueulemer' },
        { id: 'e28', source: 'Claquesous', target: 'Montparnasse' },
        { id: 'e29', source: 'Brujon', target: 'Babet' },
        { id: 'e30', source: 'Child1', target: 'Gavroche' },
        // 新增更多连接
        { id: 'e31', source: 'Valjean', target: 'Simplice' },
        { id: 'e32', source: 'Fantine', target: 'Simplice' },
        { id: 'e33', source: 'Javert', target: 'Simplice' },
        { id: 'e34', source: 'Marius', target: 'Gillenormand' },
        { id: 'e35', source: 'Cosette', target: 'Gillenormand' },
        { id: 'e36', source: 'Marius', target: 'Lt.Gillenormand' },
        { id: 'e37', source: 'Gillenormand', target: 'Lt.Gillenormand' },
        { id: 'e38', source: 'Cosette', target: 'Toussaint' },
        { id: 'e39', source: 'Javert', target: 'Toussaint' },
        { id: 'e40', source: 'Valjean', target: 'Toussaint' },
        // 随机添加更多连接
        ...Array.from({ length: 50 }, (_, i) => ({
          // 从40增加到50个随机连接
          id: `edge-${i + 41}`,
          source: [
            'Valjean',
            'Javert',
            'Cosette',
            'Marius',
            'Enjolras',
            'Fantine',
            'Thenardier',
            'Eponine',
            'Gavroche',
            'Gueulemer',
            'Babet',
            'Claquesous',
            'Favourite',
            'Tholomyes',
            'Simplice',
          ][Math.floor(Math.random() * 15)],
          target: [
            'Favourite',
            'Dahlia',
            'Tholomyes',
            'Combeferre',
            'Prouvaire',
            'Feuilly',
            'Courfeyrac',
            'Bahorel',
            'Bossuet',
            'Montparnasse',
            'Brujon',
            'Child1',
            'Simplice',
            'Toussaint',
            'Gillenormand',
          ][Math.floor(Math.random() * 15)],
        })),
      ],
    },
    autoFit: 'view',
    node: {
      style: {
        size: (datum) => datum.id.length * 2 + 10,
        label: false,
        labelText: (datum) => datum.id,
        labelBackground: true,
        icon: false,
        iconFontFamily: 'iconfont',
        iconText: '\ue6f6',
        iconFill: '#fff',
      },
      palette: {
        type: 'group',
        field: (datum) => datum.id,
        color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
      },
    },
    edge: {
      style: {
        stroke: '#bfbfbf',
      },
    },
    behaviors: ['drag-canvas'],
    plugins: [
      {
        type: 'fisheye',
        key: 'fisheye',
        r: 120,
        d: 1.5,
        nodeStyle: {
          label: true,
          icon: true,
        },
      },
    ],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const TRIGGER_OPTIONS = ['pointermove', 'drag', 'click'];
    const SCALE_OPTIONS = ['wheel', 'drag', '-'];

    const options = {
      type: 'fisheye',
      trigger: 'pointermove',
      r: 120,
      d: 1.5,
      maxR: 200,
      minR: 50,
      maxD: 5,
      minD: 0.5,
      scaleRBy: '-',
      scaleDBy: '-',
      showDPercent: true,
      preventDefault: true,
    };

    const optionFolder = gui.addFolder('Fisheye Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'trigger', TRIGGER_OPTIONS);
    optionFolder.add(options, 'r', 50, 200, 10);
    optionFolder.add(options, 'd', 0.5, 5, 0.1);
    optionFolder.add(options, 'scaleRBy', SCALE_OPTIONS);
    optionFolder.add(options, 'scaleDBy', SCALE_OPTIONS);
    optionFolder.add(options, 'showDPercent');
    optionFolder.add(options, 'preventDefault');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'fisheye',
        [property]: value === '-' ? undefined : value,
      });
      graph.render();
    });
  },
);
```



## 配置项

| 属性           | 描述                                                                                                                                                                                          | 类型                                                                                                                                                           | 默认值                 | 必选 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---- |
| type           | 插件类型                                                                                                                                                                                      | string                                                                                                                                                         | `fisheye`              | ✓    |
| key            | 插件的唯一标识，可用于获取插件实例或更新插件选项                                                                                                                                              | string                                                                                                                                                         | -                      |      |
| trigger        | 用于控制鱼眼放大镜的移动方式，支持以下三种配置：<br/>- `pointermove`：鱼眼放大镜始终跟随鼠标移动 <br/>- `click`：点击画布时移动鱼眼放大镜到点击位置 <br/>- `drag`：通过拖拽方式移动鱼眼放大镜 | `pointermove` \| `drag` \| `click`                                                                                                                             | `pointermove`          |      |
| r              | 鱼眼放大镜半径                                                                                                                                                                                | number                                                                                                                                                         | 120                    |      |
| maxR           | 鱼眼放大镜可调整的最大半径                                                                                                                                                                    | number                                                                                                                                                         | 画布宽高的最小值的一半 |      |
| minR           | 鱼眼放大镜可调整的最小半径                                                                                                                                                                    | number                                                                                                                                                         | 0                      |      |
| d              | 畸变因子                                                                                                                                                                                      | number                                                                                                                                                         | 1.5                    |      |
| maxD           | 鱼眼放大镜可调整的最大畸变因子                                                                                                                                                                | number                                                                                                                                                         | 5                      |      |
| minD           | 鱼眼放大镜可调整的最小畸变因子                                                                                                                                                                | number                                                                                                                                                         | 0                      |      |
| scaleRBy       | 调整鱼眼放大镜范围半径的方式：<br/>- `'wheel'`：滚轮调整 <br/>- `'drag'`：拖拽调整                                                                                                            | `wheel` \| `drag`                                                                                                                                              | -                      |      |
| scaleDBy       | 调整鱼眼放大镜畸变因子的方式：<br/>- `'wheel'`：滚轮调整 <br/>- `'drag'`：拖拽调整                                                                                                            | `wheel` \| `drag`                                                                                                                                              | -                      |      |
| showDPercent   | 是否在鱼眼放大镜中显示畸变因子数值                                                                                                                                                            | boolean                                                                                                                                                        | true                   |      |
| style          | 鱼眼放大镜样式，[配置项](#style)                                                                                                                                                              | object                                                                                                                                                         | -                      |      |
| nodeStyle      | 在鱼眼放大镜中的节点样式                                                                                                                                                                      | [NodeStyle](/zh/manual/element/node/BaseNode/#style) \| ((datum: [NodeData](/zh/manual/data/#节点数据nodedata)) => [NodeStyle](/zh/manual/element/node/BaseNode/#style)) | `{ label: true }`      |      |
| preventDefault | 是否阻止默认事件                                                                                                                                                                              | boolean                                                                                                                                                        | true                   |      |

### style

圆形样式属性，用于配置鱼眼放大镜的外观。

| 属性          | 描述            | 类型                          | 默认值 |
| ------------- | --------------- | ----------------------------- | ------ |
| fill          | 填充颜色        | string \| Pattern \| null     | `#ccc` |
| stroke        | 描边颜色        | string \| Pattern \| null     | `#000` |
| opacity       | 整体透明度      | number \| string              | -      |
| fillOpacity   | 填充透明度      | number \| string              | 0.1    |
| strokeOpacity | 描边透明度      | number \| string              | -      |
| lineWidth     | 线宽度          | number \| string              | 2      |
| lineCap       | 线段端点样式    | `butt` \| `round` \| `square` | -      |
| lineJoin      | 线段连接处样式  | `miter` \| `round` \| `bevel` | -      |
| shadowColor   | 阴影颜色        | string                        | -      |
| shadowBlur    | 阴影模糊程度    | number                        | -      |
| shadowOffsetX | 阴影 X 方向偏移 | number                        | -      |
| shadowOffsetY | 阴影 Y 方向偏移 | number                        | -      |

完整样式属性参考 [元素 -节点 - 内置节点 - 通用样式属性 - style](/zh/manual/element/node/BaseNode/#style)

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



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 300,
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
});

graph.render();
```


## 实际案例



```ts

import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

fetch('https://assets.antv.antgroup.com/g6/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          size: (datum) => datum.id.length * 2 + 10,
          label: false,
          labelText: (datum) => datum.id,
          labelBackground: true,
          icon: false,
          iconFontFamily: 'iconfont',
          iconText: '\ue6f6',
          iconFill: '#fff',
        },
        palette: {
          type: 'group',
          field: (datum) => datum.id,
          color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
        },
      },
      edge: {
        style: {
          stroke: '#e2e2e2',
        },
      },
      plugins: [{ key: 'fisheye', type: 'fisheye', nodeStyle: { label: true, icon: true } }],
    });
    graph.render();
  });
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
