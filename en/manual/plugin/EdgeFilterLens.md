---
title: "EdgeFilterLens"
description: "EdgeFilterLens"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/plugin/EdgeFilterLens/"
version: "5.1.1"
---

## Overview

The Edge Filter Lens plugin allows you to keep the edges of interest within the lens range, while other edges will not be displayed in that range. This is an important visualization exploration tool that can help users focus on edge relationships in specific areas.

## Use Cases

- Need to focus on viewing edge relationships in local areas
- Highlight connections between specific nodes in complex networks

## Basic Usage

Below is a simple example of initializing the EdgeFilterLens plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      trigger: 'pointermove', // Follow mouse movement
      r: 60, // Set lens radius
      nodeType: 'both', // Edge display condition
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



## Configuration Options

| Property       | Description                                                                                                                                                                                                                                                                                                                                                                                 | Type                                                                                                                                                                    | Default Value                               | Required |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------- |
| type           | Plugin type                                                                                                                                                                                                                                                                                                                                                                                 | string                                                                                                                                                                  | `edge-filter-lens`                          | ✓        |
| key            | Unique identifier for the plugin, can be used to get the plugin instance or update plugin options                                                                                                                                                                                                                                                                                           | string                                                                                                                                                                  | -                                           |          |
| trigger        | Method to move the lens:<br/>- `pointermove`: The lens always follows the mouse movement <br/>- `click`: Move the lens to the click position when clicking on the canvas <br/>- `drag`: Move the lens by dragging                                                                                                                                                                           | `pointermove` \| `click` \| `drag`                                                                                                                                      | `pointermove`                               |          |
| r              | Radius of the lens                                                                                                                                                                                                                                                                                                                                                                          | number                                                                                                                                                                  | 60                                          |          |
| maxR           | Maximum radius of the lens                                                                                                                                                                                                                                                                                                                                                                  | number                                                                                                                                                                  | Half of the smaller dimension of the canvas |          |
| minR           | Minimum radius of the lens                                                                                                                                                                                                                                                                                                                                                                  | number                                                                                                                                                                  | 0                                           |          |
| scaleRBy       | Method to scale the lens radius: `wheel`: Scale the lens radius by the wheel                                                                                                                                                                                                                                                                                                                | `wheel`                                                                                                                                                                 | -                                           |          |
| nodeType       | Edge display condition:<br/> - `both`: The edge is displayed only when both the source and target nodes are in the lens <br/> - `source`: The edge is displayed only when the source node is in the lens<br/> - `target`: The edge is displayed only when the target node is in the lens <br/> - `either`: The edge is displayed as long as either the source or target node is in the lens | `both` \| `source` \| `target` \| `either`                                                                                                                              | `both`                                      |          |
| filter         | Filter out elements that are never displayed in the lens                                                                                                                                                                                                                                                                                                                                    | (id: string, elementType: `node` \| `edge` \| `combo`) => boolean                                                                                                       | () => true                                  |          |
| style          | Style of the lens, [configuration options](#style)                                                                                                                                                                                                                                                                                                                                          | object                                                                                                                                                                  |                                             |          |
| nodeStyle      | Style of nodes in the lens                                                                                                                                                                                                                                                                                                                                                                  | [NodeStyle](/en/manual/element/node/BaseNode/#style) \| ((datum: [NodeData](/en/manual/data/#节点数据nodedata)) => [NodeStyle](/en/manual/element/node/BaseNode/#style)) | `{ label: false }`                          |          |
| edgeStyle      | Style of edges in the lens                                                                                                                                                                                                                                                                                                                                                                  | [EdgeStyle](/en/manual/element/edge/BaseEdge/#style) \| ((datum: [EdgeData](/en/manual/data/#边数据edgedata)) => [EdgeStyle](/en/manual/element/edge/BaseEdge/#style))   | `{ label: true }`                           |          |
| preventDefault | Whether to prevent default events                                                                                                                                                                                                                                                                                                                                                           | boolean                                                                                                                                                                 | true                                        |          |

### style

Style properties of the circular lens.

| Property      | Description        | Type                          | Default Value |
| ------------- | ------------------ | ----------------------------- | ------------- |
| fill          | Fill color         | string \| Pattern \| null     | `#fff`        |
| stroke        | Stroke color       | string \| Pattern \| null     | `#000`        |
| opacity       | Overall opacity    | number \| string              | 1             |
| fillOpacity   | Fill opacity       | number \| string              | 0.8           |
| strokeOpacity | Stroke opacity     | number \| string              | -             |
| lineWidth     | Line width         | number \| string              | 2             |
| lineCap       | Line cap style     | `butt` \| `round` \| `square` | -             |
| lineJoin      | Line join style    | `miter` \| `round` \| `bevel` | -             |
| shadowColor   | Shadow color       | string                        | -             |
| shadowBlur    | Shadow blur degree | number                        | -             |
| shadowOffsetX | Shadow X offset    | number                        | -             |
| shadowOffsetY | Shadow Y offset    | number                        | -             |

For complete style properties, refer to [Element - Node - Built-in Node - General Style Properties - style](/en/manual/element/node/BaseNode/#style)

## Code Examples

### Basic Usage

The simplest configuration method:

```js
const graph = new Graph({
  plugins: ['edge-filter-lens'],
});
```

The effect is as follows:



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 300,
  data: {
    nodes: [
      // Upper evacuation area
      { id: 'node1', style: { x: 150, y: 60, label: 'Node 1' } },
      { id: 'node2', style: { x: 100, y: 40, label: 'Node 2' } },
      { id: 'node3', style: { x: 200, y: 35, label: 'Node 3' } },
      { id: 'node4', style: { x: 150, y: 30, label: 'Node 4' } },

      // Middle area
      { id: 'node5', style: { x: 220, y: 140, label: 'Node 5' } },
      { id: 'node6', style: { x: 280, y: 160, label: 'Node 6' } },
      { id: 'node7', style: { x: 220, y: 120, label: 'Node 7' } },
      { id: 'node8', style: { x: 260, y: 100, label: 'Node 8' } },
      { id: 'node9', style: { x: 240, y: 130, label: 'Node 9' } },
      { id: 'node10', style: { x: 300, y: 110, label: 'Node 10' } },

      // Lower area
      { id: 'node11', style: { x: 240, y: 200, label: 'Node 11' } },
      { id: 'node12', style: { x: 280, y: 220, label: 'Node 12' } },
      { id: 'node13', style: { x: 300, y: 190, label: 'Node 13' } },
      { id: 'node14', style: { x: 320, y: 210, label: 'Node 14' } },
    ],
    edges: [
      // Upper connections
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node2', target: 'node3' },
      { id: 'edge3', source: 'node3', target: 'node4' },

      // Middle connections
      { id: 'edge4', source: 'node5', target: 'node6' },
      { id: 'edge5', source: 'node6', target: 'node7' },
      { id: 'edge6', source: 'node7', target: 'node8' },
      { id: 'edge7', source: 'node8', target: 'node9' },
      { id: 'edge8', source: 'node9', target: 'node10' },

      // Lower connections
      { id: 'edge9', source: 'node11', target: 'node12' },
      { id: 'edge10', source: 'node12', target: 'node13' },
      { id: 'edge11', source: 'node13', target: 'node14' },

      // Cross-region connections
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


### Custom Styles

You can customize the appearance and behavior of the lens:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'edge-filter-lens',
      r: 80,
      style: {
        fill: '#f0f5ff', // Fill color of the lens area
        fillOpacity: 0.6, // Opacity of the fill area
        stroke: '#7e3feb', // Change lens border to purple
        strokeOpacity: 0.8, // Opacity of the border
        lineWidth: 1.5, // Line width of the border
      },
      nodeStyle: {
        size: 24, // Enlarge nodes
        fill: '#7e3feb', // Purple fill
        stroke: '#5719c9', // Dark purple stroke
        lineWidth: 1, // Thin border
        label: true, // Show label
        labelFill: '#ffffff', // White text
        labelFontSize: 14, // Enlarge text
        labelFontWeight: 'bold', // Bold text
      },
      edgeStyle: {
        stroke: '#8b9baf', // Gray edge
        lineWidth: 2, // Thicken edge line
        label: true, // Show label
        labelFill: '#5719c9', // Dark purple text
        opacity: 0.8, // Appropriate opacity
      },
    },
  ],
});
```

The effect is as follows:



```ts

import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 400,
  height: 300,
  data: {
    nodes: [
      // Upper evacuation area
      { id: 'node1', style: { x: 150, y: 60, label: 'Node 1' } },
      { id: 'node2', style: { x: 100, y: 40, label: 'Node 2' } },
      { id: 'node3', style: { x: 200, y: 35, label: 'Node 3' } },
      { id: 'node4', style: { x: 150, y: 30, label: 'Node 4' } },

      // Middle area
      { id: 'node5', style: { x: 220, y: 140, label: 'Node 5' } },
      { id: 'node6', style: { x: 280, y: 160, label: 'Node 6' } },
      { id: 'node7', style: { x: 220, y: 120, label: 'Node 7' } },
      { id: 'node8', style: { x: 260, y: 100, label: 'Node 8' } },
      { id: 'node9', style: { x: 240, y: 130, label: 'Node 9' } },
      { id: 'node10', style: { x: 300, y: 110, label: 'Node 10' } },

      // Lower area
      { id: 'node11', style: { x: 240, y: 200, label: 'Node 11' } },
      { id: 'node12', style: { x: 280, y: 220, label: 'Node 12' } },
      { id: 'node13', style: { x: 300, y: 190, label: 'Node 13' } },
      { id: 'node14', style: { x: 320, y: 210, label: 'Node 14' } },
    ],
    edges: [
      // Upper connections
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node2', target: 'node3' },
      { id: 'edge3', source: 'node3', target: 'node4' },

      // Middle connections
      { id: 'edge4', source: 'node5', target: 'node6' },
      { id: 'edge5', source: 'node6', target: 'node7' },
      { id: 'edge6', source: 'node7', target: 'node8' },
      { id: 'edge7', source: 'node8', target: 'node9' },
      { id: 'edge8', source: 'node9', target: 'node10' },

      // Lower connections
      { id: 'edge9', source: 'node11', target: 'node12' },
      { id: 'edge10', source: 'node12', target: 'node13' },
      { id: 'edge11', source: 'node13', target: 'node14' },

      // Cross-region connections
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
        fill: '#f0f5ff', // Fill color of the lens area
        fillOpacity: 0.6, // Opacity of the fill area
        stroke: '#7e3feb', // Change lens border to purple
        strokeOpacity: 0.8, // Opacity of the border
        lineWidth: 1.5, // Line width of the border
      },
      nodeStyle: {
        size: 24, // Enlarge nodes
        fill: '#7e3feb', // Purple fill
        stroke: '#5719c9', // Dark purple stroke
        lineWidth: 1, // Thin border
        label: true, // Show label
        labelFill: '#ffffff', // White text
        labelFontSize: 14, // Enlarge text
        labelFontWeight: 'bold', // Bold text
      },
      edgeStyle: {
        stroke: '#8b9baf', // Gray edge
        lineWidth: 2, // Thicken edge line
        label: true, // Show label
        labelFill: '#5719c9', // Dark purple text
        opacity: 0.8, // Appropriate opacity
      },
    },
  ],
});

graph.render();
```


## Practical Examples

- [Edge Filter Lens](/en/examples/plugin/edge-filter-lens/basic/)
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
