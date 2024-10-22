---
title: 常见问题
order: 6
---

### Extension 和 Plugin 有什么区别？

`Extension` 是 G6 中的一个概念，是所有可注册内容的统称，包含元素、交互、布局、插件等。

`Plugin` 是 G6 提供的灵活扩展机制，是一种特殊的 `Extension`。

### 设置文本超出省略

以 label 为例，设置 `labelWordWrap` 和 `labelWordWrapWidth` 即可实现文本超出省略。

```typescript {3-4}
{
  labelText: 'This is a long text',
  labelWordWrap: true,
  labelWordWrapWidth: 50,
}
```

### 按键不生效

一些插件或交互支持配置触发按键，请使用标准按键名：如 `Control`, `Shift`, `Alt`, `Meta`，以及字母、数字、符号等。

### 更新数据后画布不更新

请确保数据更新后调用 `graph.draw()` 或者 `graph.render()` 更新画布。

> G6 对于多次数据更新，会在 `draw` 或 `render` 后合并差异并统一更新画布，以提高性能。

### 交互有冲突如何解决

当多个交互之间存在冲突时，你可以设置交互的启用时机来避免多个交互被同时触发。

以 `drag-canvas` 和 `brush-select` 为例，如果直接配置这两个交互，当指针在画布上进行拖拽时，会导致交互异常。可以设置为在按下 `shift` 键时禁用 `drag-canvas` 交互。

```typescript {4}
behaviors: [
  {
    type: 'drag-canvas',
    enable: (event) => event.shiftKey === false,
  },
  {
    type: 'brush-select',
  },
];
```

此时，当按下 `shift` 键时，`drag-canvas` 交互会被禁用，`brush-select` 交互会不会受到影响。

### draw 和 render 的区别

`draw` 和 `render` 都会执行绘制操作，但 `render` 会在 `draw` 的基础上额外进行**布局**、**视图自适应**操作。

可以简单理解为：`render` = `draw` + `layout` + `fitView`/`fitCenter`。

### 数据中的样式不生效

原因一：被样式映射中的样式覆盖

```typescript {5}
{
  data: [{ id: 'node-1', style: { fill: 'orange' } }],
  node: {
    style: {
      fill: 'pink', // 无论数据中的样式如何，都会被这里的样式覆盖
    }
  }
}
```

解决方式：使用回调方法，优先从数据中获取样式以提高数据优先级

```typescript {5}
{
  node: {
    style: (data) => {
      return {
        fill: data.style?.fill || 'pink',
      };
    };
  }
}
```

### 画布中出现残影

在使用 Canvas 渲染器进行绘制时，可能会出现残影现象，这些图形被称为“脏矩形”。该现象出现的原因是底层渲染引擎为了提高性能，每次绘制时只会绘制发生变化的部分，而不会清空整个画布。

但是，当画布中的图形发生变化时，可能会出现部分图形未被正确清除的情况，从而导致残影现象。

可以通过以下方式解决：

1. 使用 SVG 或 WebGL 渲染器；
2. 检查节点中的图形样式中是否存在非法值，例如 null、NaN 等；
3. 尽量使用整数作为数值型的样式值，例如 r、width、height、fontSize 等；

### 使用原生 JavaScript 对象数据

请避免使用 Vue 响应式数据、Immer.js 等包装过的对象作为 G6 的数据源，因为这些对象会在内部进行深度监听，甚至冻结数据对象，导致 G6 无法正常操作数据。

### G6 项目启动在编译时警告类型映射指向不存在路径

```shell
WARNING in ./node_modules/@antv/util/esm/path/util/segment-cubic-factory.js
Module Warning (from ./node_modules/source-map-loader/dist/cjs.js):
Failed to parse source map from '/Users/xxx/workspace/antv-g6-learn/node_modules/@antv/util/esm/path/util/src/path/util/segment-cubic-factory.ts' file: Error: ENOENT: no such file or directory, open '/Users/xxx/workspace/antv-g6-learn/node_modules/@antv/util/esm/path/util/src/path/util/segment-cubic-factory.ts'

WARNING in ./node_modules/@antv/util/esm/path/util/segment-line-factory.js
Module Warning (from ./node_modules/source-map-loader/dist/cjs.js):
Failed to parse source map from '/Users/xxx/workspace/antv-g6-learn/node_modules/@antv/util/esm/path/util/src/path/util/segment-line-factory.ts' file: Error: ENOENT: no such file or directory, open '/Users/xxx/workspace/antv-g6-learn/node_modules/@antv/util/esm/path/util/src/path/util/segment-line-factory.ts'

WARNING in ./node_modules/@antv/util/esm/path/util/segment-quad-factory.js
Module Warning (from ./node_modules/source-map-loader/dist/cjs.js):
Failed to parse source map from '/Users/xxx/workspace/antv-g6-learn/node_modules/@antv/util/esm/path/util/src/path/util/segment-quad-factory.ts' file: Error: ENOENT: no such file or directory, open '/Users/xxx/workspace/antv-g6-learn/node_modules/@antv/util/esm/path/util/src/path/util/segment-quad-factory.ts'
```

> 解释: [@antv/util](https://github.com/antvis/util) 是 AntV 底层依赖的工具库。

从上面部分警告信息中我们可以得知是 G6 依赖的 `@antv/util` 工具库的类型声明文件存在问题，**该警告不影响项目正常运行**。

该信息只会在 TypeScript 项目中出现，关闭办法如下:

1. 关闭TypeScript 的sourcemap源码映射

在项目根目录下创建`.env`文件，并添加以下内容:

```text
GENERATE_SOURCEMAP=false
```

2. 单独禁用指定模块的源码映射

直接禁用sourcemap映射的方式过于简单粗暴，对于部分可能有调试需求的开发者不太友好，所以也可以通过在构建工具单独配置，单独禁用这些特定模块的源码映射。

a. webpack配置

```javascript
module.exports = {
  // ...其他配置
  module: {
    rules: [
      {
        test: /node_modules\/@antv\/util\/esm\/path\/util\/.+\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
};
```

b. vite配置

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // 忽略特定模块的警告
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('@antv/util')) {
          return;
        }
        // 对于其他警告,使用默认的警告处理
        warn(warning);
      },
    },
  },
});
```

### 手动配置色板颜色不生效

> 在 v5 中内置颜色有：export type BuiltInPalette = 'spectral' | 'oranges' | 'greens' | 'blues';

解决办法如下:

```typescript {10}
const graph = new Graph({
  container: '#ID',
  width: number,
  height: number,
  data,
  node: {
    palette: {
      field: 'color',
      // right
      color: ['red', 'green', 'blue'],

      // error
      // color: 'red'
    },
  },
});
```

### grid-line 插件不生效

> 在 v5 中内置插件有`bubble-sets` `edge-filter-lens` `grid-line` `background` `contextmenu` `fisheye` `fullscreen` `history` `hull` `legend` `minimap` `snapline` `timebar` `toolbar` `tooltip` >`watermark`. [具体参考](https://github.com/antvis/G6/blob/6e2355020c20b3a1e2e5ca0e0ee97aeb81f932b3/packages/g6/src/registry/build-in.ts#L189)

实际原因: `graph`实例的父容器`<div ref={containerRef} />`本身没有设置高度，G6 Graph图 可能无法正确计算出合适的大小。**如果要启用`grid-line`画布插件，需要给父元素 div 设置宽高，在 graph 配置中是无效的**。

### v5无法使用树图布局

统一使用`new Graph({xxx})`。

> 在 v5 中内置布局有`antv-dagre` `combo-combined` `compact-box` `force-atlas2` `circular` `concentric` `d3-force` `dagre` `dendrogram` `force` `fruchterman` `grid` `indented` `mds` `mindmap` `radial` `random`. [具体参考](https://github.com/antvis/G6/blob/6e2355020c20b3a1e2e5ca0e0ee97aeb81f932b3/packages/g6/src/registry/build-in.ts#L147)

v5合并了图和树图，不再通过实例化`G6.TreeGraph`创建树图布局，并且移除该方式。具体参考[特性-合并图与树图](https://g6.antv.antgroup.com/manual/feature#-%E5%90%88%E5%B9%B6%E5%9B%BE%E4%B8%8E%E6%A0%91%E5%9B%BE)

### edge 没有连接在 node 的边缘中心

配置[portLinkToCenter](https://g6.antv.antgroup.com/api/elements/nodes/base-node#portlinktocenter)为 `true`。

```typescript {6}
const graph = new Graph({
  container: xxx,
  node: {
    type: 'rect',
    style: {
      portLinkToCenter: true,
    },
  },
  edge: {
    type: 'xxx',
  },
});
```

### 如何根据label内容长度动态设置node宽度

参考方案：[#6347](https://github.com/antvis/G6/pull/6347#issuecomment-2357515570)

```typescript
const measureTextWidth = memoize(
  (text: string, font: any = {}): TextMetrics => {
    const { fontSize, fontFamily = 'sans-serif', fontWeight, fontStyle, fontVariant } = font;
    const ctx = getCanvasContext();
    // @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/font
    ctx.font = [fontStyle, fontWeight, fontVariant, `${fontSize}px`, fontFamily].join(' ');
    return ctx.measureText(isString(text) ? text : '').width;
  },
  (text: string, font = {}) => [text, ...values(font)].join(''),
);

const graph = new G6.Graph({
    node: {
          style: { size: d => [measureTextWidth(d.label, {...}) , xxx] },
    }
})
```

### NodeEvent节点事件对象类型不齐全问题

可以手动指定`IPointerEvent`类型。具体参考[#6346](<[2357515570](https://github.com/antvis/G6/issues/6346)>)

```typescript {4}
import { NodeEvent } from '@antv/g6';
import type { IPointerEvent } from '@antv/g6';

graph.on(NodeEvent.CLICK, (event: IPointerEvent) => {
  // handler
});
```
