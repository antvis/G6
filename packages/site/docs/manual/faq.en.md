---
title: FAQ
order: 6
---

### What is the Difference Between Extension and Plugin?

`Extension` is a concept in G6 that collectively refers to all types of registrable content, including elements, behaviors, layouts, and plugins, among others.

`Plugin` represents a flexible extension mechanism provided by G6 and is a special type of `Extension`.

### Set Text Overflow Ellipsis

Taking `label` as an example, you can set `labelWordWrap` and `labelWordWrapWidth` to achieve text overflow ellipsis.

```typescript {3-4}
{
  labelText: 'This is a long text',
  labelWordWrap: true,
  labelWordWrapWidth: 50,
}
```

### Key Press Not Working

Some plugins or behaviors support configuring key press triggers. Please use standard key names, such as `Control`, `Shift`, `Alt`, `Meta`, as well as letters, numbers, symbols, and so on.

### Canvas Not Updating After Data Update

Ensure that you call `graph.draw()` or `graph.render()` to update the canvas after updating the data.

> G6 merges differences and updates the canvas uniformly after `draw` or `render` for multiple data updates to improve performance.

### How to Resolve Interaction Conflicts

When multiple interactions conflict with each other, you can set the enable timing of interactions to avoid multiple interactions being triggered simultaneously.

Taking `drag-canvas` and `brush-select` as an example, if you directly configure these two interactions, dragging on the canvas will cause interaction exceptions. You can disable the `drag-canvas` interaction when the `shift` key is pressed.

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

At this point, when the `shift` key is pressed, the `drag-canvas` interaction will be disabled, and the `brush-select` interaction will not be affected.

### Difference Between `draw` and `render`

Both `draw` and `render` execute drawing operations, but `render` additionally performs **layout** and **auto fit** operations based on `draw`.

You can simply understand it as: `render` = `draw` + `layout` + `fitView`/`fitCenter`.

### Style in Data Not Effective

Reason 1: The style in the data is overridden by the style in the style mapping.

```typescript {5}
{
  data: [{ id: 'node-1', style: { fill: 'orange' } }],
  node: {
    style: {
      fill: 'pink', // No matter what the style in the data is, it will be overridden by the style here
    }
  }
}
```

Solution: Use a callback method to prioritize obtaining styles from the data to improve data priority.

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

### Residual content in the canvas

When using the Canvas renderer for drawing, residual content may appear in the canvas, which is referred to as "dirty rectangles". This phenomenon occurs because the underlying rendering engine improves performance by only drawing the parts that have changed each time, rather than clearing the entire canvas.

However, when the graphics in the canvas change, there may be cases where some graphics are not correctly cleared, resulting in residual content.

You can solve this issue by:

1. Using the SVG or WebGL renderer;
2. Checking whether there are illegal values in the element of the nodes, such as null, NaN, and so on;
3. Using integers as much as possible for numeric style values, such as r, width, height, fontSize, and so on.

### Use Vanilla JavaScript Object Data

Please avoid using Vue reactive data, Immer.js, and other wrapped objects as the data source for G6, as these objects will be deeply monitored internally, and even freeze the data object, causing G6 to fail to operate normally.

### G6 project startup Warning during compilation Type mapping points to non-existent path

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

> Explanation: [@antv/util](https://github.com/antvis/util) is a tool library that AntV relies on at the bottom.

From the partial warning message above, we can see that there is a problem with the type declaration file of the `@antv/util` tool library that G6 depends on.**This warning does not affect the normal operation of the project**.

This message will only appear in TypeScript projects. The following are ways to turn it off:

1. Turn off TypeScript sourcemap

Create a `.env` file in the root directory of the project and add the following content:

text
GENERATE_SOURCEMAP=false
text

2. Disable sourcemapping for specific modules

Disabling sourcemapping directly is too simple and crude, and is not user-friendly for developers who may have debugging needs. Therefore, sourcemapping can be disabled for specific modules by configuring the build tool separately.

a. webpack configuration

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

b. vite configuration

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore warnings for specific modules
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('@antv/util')) {
          return;
        }
        // For other warnings, use the default warning handling
        warn(warning);
      },
    },
  },
});
```

### Manually configuring the color palette does not take effect

> In v5, the built-in colors are: export type BuiltInPalette = 'spectral' | 'oranges' | 'greens' | 'blues';

The solution is as follows:

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

### grid-line plugin does not take effect

> In v5, built-in plugins include `bubble-sets` `edge-filter-lens` `grid-line` `background` `contextmenu` `fisheye` `fullscreen` `history` `hull` `legend` `minimap` `snapline` `timebar` `toolbar` `tooltip` >`watermark`. [Detailed reference](https://github.com/antvis/G6/blob/6e2355020c20b3a1e2e5ca0e0ee97aeb81f932b3/packages/g6/src/registry/build-in.ts#L189)

Actual reason: The parent container of the `graph` instance, `<div ref={containerRef} />`, does not have a height set, so the G6 Graph may not be able to calculate the correct size.**If you want to enable the `grid-line` canvas plugin, you need to set the width and height of the parent element, which is not valid in the graph configuration**.

### v5 cannot use the tree layout

Use `new Graph({xxx})` uniformly.

> In v5, built-in layouts include `antv-dagre` `combo-combined` `compact-box` `force-atlas2` `circular` `concentric` `d3-force` `dagre` `dendrogram` `force` `fruchterman` `grid` `indented` `mds` `mindmap` `radial` `random`. [Specific reference](https://github.com/antvis/G6/blob/6e2355020c20b3a1e2e5ca0e0ee97aeb81f932b3/packages/g6/src/registry/build-in.ts#L147)

v5 merges the graph and tree graph, no longer creates the tree graph layout by instantiating `G6.TreeGraph`, and removes this method. For details, see [Features - Merge Graph and Tree Graph](https://g6.antv.antgroup.com/manual/feature#-%E5%90%88%E5%B9%B6%E5%9B%BE%E4%B8%8E%E6%A0%91%E5%9B%BE)

### edge does not have a connection at the center of the node

is configured [portLinkToCenter](https://g6.antv.antgroup.com/api/elements/nodes/base-node#portlinktocenter) to `true`.

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

### How to dynamically set the width of a node based on the length of the label content

Implementation solution: [#6347](https://github.com/antvis/G6/pull/6347#issuecomment-2357515570)

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

### NodeEvent node event object type is not complete

You can manually specify the `IPointerEvent` type. For details, see [#6346](<[2357515570](https://github.com/antvis/G6/issues/6346)>)

```typescript {4}
import { NodeEvent } from '@antv/g6';
import type { IPointerEvent } from '@antv/g6';

graph.on(NodeEvent.CLICK, (event: IPointerEvent) => {
  // handler
});
```
