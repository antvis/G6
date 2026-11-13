---
title: "3D 力导向布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/force-directed/3d-force/"
version: "5.1.1"
---

# 3D 力导向布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/force-directed/3d-force/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { CameraSetting, ExtensionCategory, Graph, register } from '@antv/g6';
import { D3Force3DLayout, Light, Line3D, ObserveCanvas3D, Sphere, ZoomCanvas3D, renderer } from '@antv/g6-extension-3d';

register(ExtensionCategory.PLUGIN, '3d-light', Light);
register(ExtensionCategory.NODE, 'sphere', Sphere);
register(ExtensionCategory.EDGE, 'line3d', Line3D);
register(ExtensionCategory.LAYOUT, 'd3-force-3d', D3Force3DLayout);
register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting);
register(ExtensionCategory.BEHAVIOR, 'zoom-canvas-3d', ZoomCanvas3D);
register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);

fetch('https://assets.antv.antgroup.com/g6/d3-force-3d.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      renderer,
      data,
      layout: {
        type: 'd3-force-3d',
      },
      node: {
        type: 'sphere',
        style: {
          materialType: 'phong',
        },
        palette: {
          color: 'tableau',
          type: 'group',
          field: 'group',
        },
      },
      edge: {
        type: 'line3d',
      },
      behaviors: ['observe-canvas-3d', 'zoom-canvas-3d'],
      plugins: [
        {
          type: '3d-light',
          directional: {
            direction: [0, 0, 1],
          },
        },
      ],
    });

    graph.render();
  });
```
