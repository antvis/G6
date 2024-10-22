## 3D extension for G6

<img width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lEL3TrCLnPsAAAAAAAAAAAAADmJ7AQ/original" />
<img width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yFa5RKilu6kAAAAAAAAAAAAADmJ7AQ/original" />

This extension package provides 3D elements, behaviors and plugins for G6.

## Usage

1. Install

```bash
npm install @antv/g6-extension-3d
```

2. Import and Register

> Where renderer, elements and lighting are necessary

```js
import { ExtensionCategory, register } from '@antv/g6';
import { DragCanvas3D, Light, Line3D, Sphere, renderer } from '@antv/g6-extension-3d';

// 3d light plugin
register(ExtensionCategory.PLUGIN, '3d-light', Light);
// sphere node element
register(ExtensionCategory.NODE, 'sphere', Sphere);
// line edge element
register(ExtensionCategory.EDGE, 'line3d', Line3D);
// drag canvas in 3d scene
register(ExtensionCategory.BEHAVIOR, 'drag-canvas-3d', DragCanvas3D);
// camera setting plugin
register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting);
```

3. Use

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  renderer, // use 3d renderer
  data: {
    // your data
  },
  node: {
    type: 'sphere', // use sphere node
  },
  edge: {
    type: 'line3d', // use 3d line edge
  },
  behaviors: ['drag-canvas-3d'],
  plugins: [
    // set camera configs, see: https://g.antv.antgroup.com/en/api/camera/intro
    {
      type: 'camera-setting',
      projectionMode: 'perspective',
      near: 0.1,
      far: 1000,
      fov: 45,
      aspect: 1,
    },
    // add directional light
    {
      type: '3d-light',
      directional: {
        direction: [0, 0, 1],
      },
    },
  ],
});
```

## Resources

- [Lite Solar System](https://g6.antv.antgroup.com/en/examples/feature/default/#lite-solar-system)
- [3D Node](https://g6.antv.antgroup.com/en/examples/element/node/#3d-node)
