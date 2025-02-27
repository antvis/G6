---
title: Options
order: 0
---

<en/> The initialization of Graph is instantiated through `new`<!-- -->, and the parameter object needs to be passed in when instantiated. The currently supported parameters are as follows:

```typescript
new G6.Graph(options: GraphOptions) => Graph
```

### autoResize

> _boolean_ **Default:** `false`

whether to auto resize canvas

<en/> Automatically adjust the canvas size based on the window.onresize event

### background

> _string_

canvas background color

<en/> This color is used as the background color when exporting images

### canvas

> [CanvasConfig](../reference/g6.canvasconfig.en.md)

canvas config

<en/> The related configuration items under GraphOptions are shortcut configuration items, which will be converted to canvas configuration items

### container

> _string \|_ _HTMLElement_ _\|_ [Canvas](../reference/g6.canvas.en.md)

canvas container

### cursor

> _Cursor_

cursor style

### devicePixelRatio

> _number_

device pixel ratio

<en/> Device pixel ratio for high-definition screens, default is [window.devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)

### height

> _number_

canvas height

<en/> If not set, the container height will be automatically obtained

### renderer

> _(layer: 'background' \| 'main' \| 'label' \| 'transient') =&gt;_ _IRenderer_

manually set renderer

<en/> G6 adopts a layered rendering method, divided into four layers: background, main, label, transient. Users can set the renderer of each layer canvas separately through this configuration item

### width

> _number_

canvas width

<en/> If not set, the container width will be automatically obtained

### autoFit

> _{ type: 'view'; options?:_ [FitViewOptions](../reference/g6.fitviewoptions.en.md)<!-- -->_; animation?:_ [ViewportAnimationEffectTiming](../reference/g6.viewportanimationeffecttiming.en.md)<!-- -->_; } \| { type: 'center'; animation?:_ [ViewportAnimationEffectTiming](../reference/g6.viewportanimationeffecttiming.en.md)<!-- -->_; } \| 'view' \| 'center'_

whether to auto fit

<en/> Every time `render` is executed, it will be adapted according to `autoFit`

### padding

> _number \| number[]_

canvas padding

<en/> Usually, it will be adapted according to the padding when auto-fitting

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

> _boolean \|_ [AnimationEffectTiming](../reference/g6.animationeffecttiming.en.md)

Enable or disable global animation

<en/> When it is an animation options, the animation will be enabled, and the animation configuration will be used as the basic configuration of the global animation

### behaviors

> _(string \| CustomBehaviorOption \| ((this:Graph) =&gt;CustomBehaviorOption))[]_

Enable interactions

<en/> - Concept: [Concepts - Behavior](/en/manual/core-concept/behavior)

### combo

> [ComboOptions](../reference/g6.combooptions.en.md)

Combo options

<en/> See [Combo](/en/api/elements/combos/base-combo)

### data

> [GraphData](../reference/g6.graphdata.en.md)

Data

<en/> See [Data](/en/api/data/graph-data)

### edge

> [EdgeOptions](../reference/g6.edgeoptions.en.md)

Edge options

<en/> See [Edge](/en/api/elements/edges/base-edge)

### layout

> _BuiltInLayoutOptions \| BaseLayoutOptions \| BaseLayoutOptions[]_

Layout options

<en/> See [Layout](/en/api/layouts/antv-dagre-layout)

### node

> [NodeOptions](../reference/g6.nodeoptions.en.md)

Node options

<en/> See [Node](/en/api/elements/nodes/base-node)

### plugins

> _(string \| CustomPluginOption \| ((this:Graph) =&gt;CustomPluginOption))[]_

Enable plugins

<en/> - Concept: [Concepts - Plugin](/en/manual/core-concept/plugin)

### theme

> _false \| 'light' \| 'dark' \| string_

Theme

### transforms

> _TransformOptions_

Data transforms
