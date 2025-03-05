---
title: Options
order: 0
---

The initialization of Graph is instantiated through `new`, and the parameter object needs to be passed in when instantiated. The currently supported parameters are as follows:

```typescript
new G6.Graph(options: GraphOptions) => Graph
```

### autoResize

> _boolean_ **Default:** `false`

whether to auto resize canvas

Automatically adjust the canvas size based on the window.onresize event

### background

> _string_

canvas background color

This color is used as the background color when exporting images

### canvas

> CanvasConfig

canvas config

The related configuration items under GraphOptions are shortcut configuration items, which will be converted to canvas configuration items

### container

> _string \|_ _HTMLElement_ _\| Canvas_

canvas container

### cursor

> _Cursor_

cursor style

### devicePixelRatio

> _number_

device pixel ratio

Device pixel ratio for high-definition screens, default is [window.devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)

### height

> _number_

canvas height

If not set, the container height will be automatically obtained

### renderer

> _(layer: 'background' \| 'main' \| 'label' \| 'transient') =>_ _IRenderer_

manually set renderer

G6 adopts a layered rendering method, divided into four layers: background, main, label, transient. Users can set the renderer of each layer canvas separately through this configuration item

### width

> _number_

canvas width

If not set, the container width will be automatically obtained

### autoFit

whether to auto fit

Every time `render` is executed, it will be adapted according to `autoFit`

### padding

> _number \| number[]_

canvas padding

Usually, it will be adapted according to the padding when auto-fitting

### rotation

> _number_ **Default:** `0`

rotation angle

### x

> _number_

viewport x coordinate

### y

> _number_

viewport y coordinate

### zoom

> _number_ **Default:** `1`

zoom ratio

### zoomRange

> _[number, number]_ **Default:** `[0.01, 10]`

zoom range

### animation

Enable or disable global animation

When it is an animation options, the animation will be enabled, and the animation configuration will be used as the basic configuration of the global animation

### behaviors

> _(string \| CustomBehaviorOption \| ((this:Graph) =>CustomBehaviorOption))[]_

Enable interactions

- Concept: [Concepts - Behavior](/en/manual/core-concept/behavior)

### combo

Combo options

See [Combo](/en/api/elements/combos/base-combo)

### data

> [GraphData](/manual/core-concept/data#图数据graphdata)

Data

See [Data](/en/api/data/graph-data)

### edge

Edge options

See [Edge](/en/api/elements/edges/base-edge)

### layout

> _BuiltInLayoutOptions \| BaseLayoutOptions \| BaseLayoutOptions[]_

Layout options

See [Layout](/en/api/layouts/antv-dagre-layout)

### node

Node options

See [Node](/en/api/elements/nodes/base-node)

### plugins

> _(string \| CustomPluginOption \| ((this:Graph) =>CustomPluginOption))[]_

Enable plugins

- Concept: [Concepts - Plugin](/en/manual/core-concept/plugin)

### theme

> _false \| 'light' \| 'dark' \| string_

Theme

### transforms

> _TransformOptions_

Data transforms
