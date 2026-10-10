---
title: "边过滤镜 EdgeFilterLens"
description: "边过滤镜 EdgeFilterLens"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/plugin/EdgeFilterLens/"
version: "5.1.1"
---

## 概述

边过滤镜插件可以将关注的边保留在过滤镜范围内，其他边将在该范围内不显示。这是一个重要的可视化探索工具，可以帮助用户聚焦于特定区域的边关系。

## 使用场景

- 需要聚焦查看局部区域的边关系
- 在复杂网络中突出显示特定节点之间的连接

## 基本用法

以下是一个简单的 EdgeFilterLens 插件初始化示例：

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



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        // 上部疏散区域
        { id: 'Myriel', style: { x: 207, y: 78, label: 'Myriel' } },
        { id: 'Napoleon', style: { x: 127, y: 62, label: 'Napoleon' } },
        { id: 'CountessdeLo', style: { x: 171, y: 47, label: 'CountessdeLo' } },
        { id: 'Geborand', style: { x: 106, y: 81, label: 'Geborand' } },
        { id: 'Champtercier', style: { x: 247, y: 58, label: 'Champtercier' } },
        { id: 'Cravatte', style: { x: 152, y: 50, label: 'Cravatte' } },

        // 中上部区域
        { id: 'Mlle.Baptistine', style: { x: 205, y: 141, label: 'Mlle.Baptistine' } },
        { id: 'Mme.Magloire', style: { x: 275, y: 120, label: 'Mme.Magloire' } },
        { id: 'Labarre', style: { x: 246, y: 183, label: 'Labarre' } },
        { id: 'Valjean', style: { x: 342, y: 221, label: 'Valjean' } },
        { id: 'Marguerite', style: { x: 285, y: 171, label: 'Marguerite' } },

        // 中部密集区域
        { id: 'Tholomyes', style: { x: 379, y: 158, label: 'Tholomyes' } },
        { id: 'Listolier', style: { x: 288, y: 80, label: 'Listolier' } },
        { id: 'Fameuil', style: { x: 349, y: 89, label: 'Fameuil' } },
        { id: 'Blacheville', style: { x: 381, y: 95, label: 'Blacheville' } },
        { id: 'Favourite', style: { x: 264, y: 153, label: 'Favourite' } },
        { id: 'Dahlia', style: { x: 323, y: 170, label: 'Dahlia' } },
        { id: 'Zephine', style: { x: 306, y: 114, label: 'Zephine' } },
        { id: 'Fantine', style: { x: 357, y: 187, label: 'Fantine' } },

        // 右侧区域
        { id: 'Bamatabois', style: { x: 411, y: 156, label: 'Bamatabois' } },
        { id: 'Perpetue', style: { x: 454, y: 195, label: 'Perpetue' } },
        { id: 'Simplice', style: { x: 406, y: 227, label: 'Simplice' } },

        // 下部区域
        { id: 'Cosette', style: { x: 343, y: 248, label: 'Cosette' } },
        { id: 'Javert', style: { x: 388, y: 263, label: 'Javert' } },
        { id: 'Fauchelevent', style: { x: 397, y: 276, label: 'Fauchelevent' } },
        { id: 'Thenardier', style: { x: 317, y: 300, label: 'Thenardier' } },
        { id: 'Eponine', style: { x: 268, y: 365, label: 'Eponine' } },
        { id: 'Anzelma', style: { x: 234, y: 303, label: 'Anzelma' } },
        { id: 'Woman2', style: { x: 304, y: 254, label: 'Woman2' } },

        // 最右侧独立节点
        { id: 'Gribier', style: { x: 457, y: 160, label: 'Gribier' } },
        { id: 'Jondrette', style: { x: 510, y: 327, label: 'Jondrette' } },
      ],
      edges: [
        // 上部连接
        { id: 'e1', source: 'Myriel', target: 'CountessdeLo' },
        { id: 'e2', source: 'Napoleon', target: 'Myriel' },
        { id: 'e3', source: 'Geborand', target: 'Napoleon' },
        { id: 'e4', source: 'Champtercier', target: 'Myriel' },
        { id: 'e5', source: 'Cravatte', target: 'CountessdeLo' },

        // 中上部连接
        { id: 'e6', source: 'Mlle.Baptistine', target: 'Mme.Magloire' },
        { id: 'e7', source: 'Labarre', target: 'Valjean' },
        { id: 'e8', source: 'Valjean', target: 'Marguerite' },
        { id: 'e9', source: 'Marguerite', target: 'Mme.Magloire' },

        // 中部密集连接
        { id: 'e10', source: 'Tholomyes', target: 'Listolier' },
        { id: 'e11', source: 'Listolier', target: 'Fameuil' },
        { id: 'e12', source: 'Fameuil', target: 'Blacheville' },
        { id: 'e13', source: 'Blacheville', target: 'Favourite' },
        { id: 'e14', source: 'Favourite', target: 'Dahlia' },
        { id: 'e15', source: 'Dahlia', target: 'Zephine' },
        { id: 'e16', source: 'Zephine', target: 'Fantine' },
        { id: 'e17', source: 'Tholomyes', target: 'Fantine' },
        { id: 'e18', source: 'Valjean', target: 'Fantine' },

        // 右侧连接
        { id: 'e19', source: 'Bamatabois', target: 'Perpetue' },
        { id: 'e20', source: 'Perpetue', target: 'Simplice' },
        { id: 'e21', source: 'Bamatabois', target: 'Gribier' },

        // 下部连接
        { id: 'e22', source: 'Valjean', target: 'Cosette' },
        { id: 'e23', source: 'Cosette', target: 'Javert' },
        { id: 'e24', source: 'Javert', target: 'Fauchelevent' },
        { id: 'e25', source: 'Fauchelevent', target: 'Thenardier' },
        { id: 'e26', source: 'Thenardier', target: 'Eponine' },
        { id: 'e27', source: 'Eponine', target: 'Anzelma' },
        { id: 'e28', source: 'Woman2', target: 'Cosette' },

        // 跨区域连接
        { id: 'e29', source: 'Fantine', target: 'Bamatabois' },
        { id: 'e30', source: 'Javert', target: 'Bamatabois' },
        { id: 'e31', source: 'Simplice', target: 'Jondrette' },
        { id: 'e32', source: 'Thenardier', target: 'Jondrette' },
        { id: 'e33', source: 'Favourite', target: 'Valjean' },
        { id: 'e34', source: 'Tholomyes', target: 'Cosette' },
      ],
    },
    node: {
      style: {
        label: true,
        size: 16,
      },
      palette: {
        field: (datum) => Math.floor(datum.style?.y / 60),
      },
    },
    edge: {
      style: {
        label: true,
        labelText: (d) => d.data.value?.toString(),
        stroke: '#ccc',
        endArrow: true,
        endArrowType: 'triangle',
      },
    },
    plugins: [
      {
        type: 'edge-filter-lens',
        key: 'edge-filter-lens',
        r: 80,
        trigger: 'pointermove',
      },
    ],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const TRIGGER_TYPES = ['pointermove', 'click', 'drag'];
    const NODE_TYPES = ['both', 'source', 'target', 'either'];

    const options = {
      type: 'edge-filter-lens',
      r: 80, // 透镜半径
      trigger: 'pointermove', // 触发方式
      nodeType: 'both', // 边显示条件
      minR: 50, // 最小半径
      maxR: 150, // 最大半径
      scaleRBy: 'wheel', // 缩放方式
      style: {
        fill: '#f0f5ff',
        fillOpacity: 0.4,
        stroke: '#1d39c4',
        strokeOpacity: 0.8,
        lineWidth: 1.5,
      },
      nodeStyle: {
        size: 35,
        fill: '#d6e4ff',
        stroke: '#2f54eb',
        lineWidth: 2,
        labelFontSize: 14,
        labelFontWeight: 'bold',
        labelFill: '#1d39c4',
      },
      edgeStyle: {
        stroke: '#1d39c4',
        lineWidth: 2,
        strokeOpacity: 0.8,
      },
    };

    const optionFolder = gui.addFolder('Edge Filter Lens Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'r', 50, 150, 5);
    optionFolder.add(options, 'trigger', TRIGGER_TYPES);
    optionFolder.add(options, 'nodeType', NODE_TYPES);
    optionFolder.add(options, 'minR', 20, 100, 5);
    optionFolder.add(options, 'maxR', 100, 200, 5);

    optionFolder.onChange(({ property, value }) => {
      if (property.includes('.')) {
        const [group, prop] = property.split('.');
        graph.updatePlugin({
          key: 'edge-filter-lens',
          [group]: {
            ...options[group],
            [prop]: value,
          },
        });
      } else {
        graph.updatePlugin({
          key: 'edge-filter-lens',
          [property]: value,
        });
      }
      graph.render();
    });
  },
);
```



## 配置项

| 属性           | 描述                                                                                                                                                                                                                                                       | 类型                                                                                                                                                           | 默认值               | 必选 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---- |
| type           | 插件类型                                                                                                                                                                                                                                                   | string                                                                                                                                                         | `edge-filter-lens`   | ✓    |
| key            | 插件的唯一标识，可用于获取插件实例或更新插件选项                                                                                                                                                                                                           | string                                                                                                                                                         | -                    |      |
| trigger        | 移动透镜的方式：<br/>- `pointermove`：透镜始终跟随鼠标移动 <br/>- `click`：点击画布时移动透镜到点击位置 <br/>- `drag`：通过拖拽方式移动透镜                                                                                                                | `pointermove` \| `click` \| `drag`                                                                                                                             | `pointermove`        |      |
| r              | 透镜的半径                                                                                                                                                                                                                                                 | number                                                                                                                                                         | 60                   |      |
| maxR           | 透镜的最大半径                                                                                                                                                                                                                                             | number                                                                                                                                                         | 画布宽高最小值的一半 |      |
| minR           | 透镜的最小半径                                                                                                                                                                                                                                             | number                                                                                                                                                         | 0                    |      |
| scaleRBy       | 缩放透镜半径的方式：`wheel`：通过滚轮缩放透镜的半径                                                                                                                                                                                                        | `wheel`                                                                                                                                                        | -                    |      |
| nodeType       | 边显示的条件：<br/> - `both`：只有起始节点和目标节点都在透镜中时，边才会显示 <br/> - `source`：只有起始节点在透镜中时，边才会显示<br/> - `target`：只有目标节点在透镜中时，边才会显示 <br/> - `either`：只要起始节点或目标节点有一个在透镜中时，边就会显示 | `both` \| `source` \| `target` \| `either`                                                                                                                     | `both`               |      |
| filter         | 过滤出始终不在透镜中显示的元素                                                                                                                                                                                                                             | (id: string, elementType: `node` \| `edge` \| `combo`) => boolean                                                                                              | () => true           |      |
| style          | 透镜的样式，[配置项](#style)                                                                                                                                                                                                                               | object                                                                                                                                                         |                      |      |
| nodeStyle      | 在透镜中节点的样式                                                                                                                                                                                                                                         | [NodeStyle](/zh/manual/element/node/BaseNode/#style) \| ((datum: [NodeData](/zh/manual/data/#节点数据nodedata)) => [NodeStyle](/zh/manual/element/node/BaseNode/#style)) | `{ label: false }`   |      |
| edgeStyle      | 在透镜中边的样式                                                                                                                                                                                                                                           | [EdgeStyle](/zh/manual/element/edge/BaseEdge/#style) \| ((datum: [EdgeData](/zh/manual/data/#边数据edgedata)) => [EdgeStyle](/zh/manual/element/edge/BaseEdge/#style))   | `{ label: true }`    |      |
| preventDefault | 是否阻止默认事件                                                                                                                                                                                                                                           | boolean                                                                                                                                                        | true                 |      |

### style

圆形透镜的样式属性。

| 属性          | 描述            | 类型                          | 默认值 |
| ------------- | --------------- | ----------------------------- | ------ |
| fill          | 填充颜色        | string \| Pattern \| null     | `#fff` |
| stroke        | 描边颜色        | string \| Pattern \| null     | `#000` |
| opacity       | 整体透明度      | number \| string              | 1      |
| fillOpacity   | 填充透明度      | number \| string              | 0.8    |
| strokeOpacity | 描边透明度      | number \| string              | -      |
| lineWidth     | 线宽度          | number \| string              | 2      |
| lineCap       | 线段端点样式    | `butt` \| `round` \| `square` | -      |
| lineJoin      | 线段连接处样式  | `miter` \| `round` \| `bevel` | -      |
| shadowColor   | 阴影颜色        | string                        | -      |
| shadowBlur    | 阴影模糊程度    | number                        | -      |
| shadowOffsetX | 阴影 X 方向偏移 | number                        | -      |
| shadowOffsetY | 阴影 Y 方向偏移 | number                        | -      |

完整样式属性参考 [元素 -节点 - 内置节点 - 通用样式属性 - style](/zh/manual/element/node/BaseNode/#style)

## 代码示例

### 基础用法

最简单的配置方式：

```js
const graph = new Graph({
  plugins: ['edge-filter-lens'],
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
});

graph.render();
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



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 300,
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
});

graph.render();
```


## 实际案例

- [边过滤镜](/zh/examples/plugin/edge-filter-lens/basic/)
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
