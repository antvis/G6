---
title: renderer
order: 1
---

G6 uses Canvas as the default renderer, but also supports rendering with SVG and WebGL. To switch to the SVG or WebGL renderer, simply pass the `renderer` parameter during initialization.

## Using the SVG Renderer

1. Install the renderer dependency:

```bash
npm install @antv/g-svg
```

2. Configure the renderer:

```javascript
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Graph } from '@antv/g6';

const graph = new Graph({
  // ... other options
  // All canvases will use the SVG renderer here
  renderer: () => new SVGRenderer(),
});
```

## Using the WebGL Renderer

1. Install the renderer dependency:

```bash
npm install @antv/g-webgl
```

2. Configure the renderer:

```javascript
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Graph } from '@antv/g6';

const graph = new Graph({
  // ... other options
  // All canvases will use the WebGL renderer here
  renderer: () => new WebGLRenderer(),
});
```

## Using Different Renderers for Different Layers

G6 uses layered canvases for rendering, so `renderer` is a callback function that takes the canvas type as a parameter and returns the renderer instance. If you want to use different renderers on different canvases, you can configure it like this:

```javascript
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

const graph = new Graph({
  // ... other options
  renderer: (layer) => {
    // The main canvas uses the WebGL renderer, and the other canvases use the SVG renderer
    if (layer === 'main') return new WebGLRenderer();
    return new SVGRenderer();
  },
});
```

## Switch Renderers Dynamically

G6 does not provide a API to switch the renderer, but you can still update the `renderer` option through the `setOptions` method.

```javascript
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

// Use the WebGL renderer by default
const graph = new Graph({
  // ... other options
  renderer: () => new WebGLRenderer(),
});

await graph.render();

// Switch to the SVG renderer
graph.setOptions({
  renderer: () => new SVGRenderer(),
});
```
