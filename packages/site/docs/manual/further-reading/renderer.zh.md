---
title: 渲染器
order: 1
---

G6 默认使用 Canvas 作为渲染器，但也支持通过 SVG 和 WebGL 进行渲染，要切换到 SVG 或 WebGL 渲染器，只需在初始化时传入 `renderer` 参数即可。

## 使用 SVG 渲染器

1. 安装渲染器依赖：

```bash
npm install @antv/g-svg
```

2. 配置渲染器：

```javascript
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Graph } from '@antv/g6';

const graph = new Graph({
  // ... other options
  // 这里所有的画布都会使用 SVG 渲染器
  renderer: () => new SVGRenderer(),
});
```

## 使用 WebGL 渲染器

1. 安装渲染器依赖：

```bash
npm install @antv/g-webgl
```

2. 配置渲染器：

```javascript
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Graph } from '@antv/g6';

const graph = new Graph({
  // ... other options
  // 这里所有的画布都会使用 WebGL 渲染器
  renderer: () => new WebGLRenderer(),
});
```

## 分层使用不同的渲染器

G6 采用了分层画布进行渲染，因此 `renderer` 是一个回调函数，参数是画布类型，返回渲染器实例，如果你想在不同的画布上使用不同的渲染器，可以这样配置：

```javascript
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

const graph = new Graph({
  // ... other options
  renderer: (layer) => {
    // 主画布使用 WebGL 渲染器，其他画布使用 SVG 渲染器
    if (layer === 'main') return new WebGLRenderer();
    return new SVGRenderer();
  },
});
```

## 动态切换渲染器

G6 没有提供单独的 API 来切换渲染器，但你仍可以通过 `setOptions` 方法来更新 `renderer` 参数：

```javascript
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

// 初始化时使用 WebGL 渲染器
const graph = new Graph({
  // ... other options
  renderer: () => new WebGLRenderer(),
});

await graph.render();

// 切换到 SVG 渲染器
graph.setOptions({
  renderer: () => new SVGRenderer(),
});
```
