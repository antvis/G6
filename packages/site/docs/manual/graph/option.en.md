---
title: Options
order: 0
---

## autoFit

> _{ type: 'view'; options?: [FitViewOptions](#fitviewoptions); animation?: [ViewportAnimationEffectTiming](#viewportanimationeffecttiming); } \| { type: 'center'; animation?: [ViewportAnimationEffectTiming](#viewportanimationeffecttiming); } \| 'view' \| 'center'_

Whether to automatically fit the canvas. ⚠️ **Note**: Each time `render` is executed, it will adapt according to `autoFit`.

Two basic adaptation modes:

- `'view'` - Automatically scale to ensure all content is visible within the view
- `'center'` - Center the content without changing the zoom level

More precise adaptation control can be achieved through object form:

```javascript
const graph = new Graph({
  autoFit: {
    type: 'view', // Adaptation type: 'view' or 'center'
    options: {
      // Only applicable to 'view' type
      when: 'overflow', // When to adapt: 'overflow' (only when content overflows) or 'always' (always adapt)
      direction: 'x', // Adaptation direction: 'x', 'y', or 'both'
    },
    animation: {
      // Adaptation animation effect
      duration: 1000, // Animation duration (milliseconds)
      easing: 'ease-in-out', // Animation easing function
    },
  },
});
```

#### FitViewOptions

| Property  | Description                                                                                                                                                             | Type                       | Default    | Required |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- | -------- |
| when      | Adaptation occurs under the following conditions <br/> - `'overflow'` adapt only when content overflows <br/> - `'always'` always adapt                                 | `'overflow'` \| `'always'` | `'always'` |          |
| direction | Adapt only in the specified direction <br/> - `'x'` adapt only in x direction <br/> - `'y'` adapt only in y direction <br/> - `'both'` adapt in both x and y directions | `'x'` \| `'y'` \| `'both'` | `'both'`   |          |

#### ViewportAnimationEffectTiming

```typescript
type ViewportAnimationEffectTiming =
  | boolean // true to enable default animation, false to disable animation
  | {
      easing?: string; // Animation easing function: 'ease-in-out', 'ease-in', 'ease-out', 'linear'
      duration?: number; // Animation duration (milliseconds)
    };
```

## autoResize

> _boolean_ **Default:** `false`

Whether to automatically resize the canvas.

Implemented based on the `window.onresize` event. When the browser window size changes, the canvas will automatically resize to fit the container.

## background

> _string_

Canvas background color.

This color is used as the background color when exporting images. Any valid CSS color value can be used, such as hexadecimal, RGB, RGBA, etc.

## canvas

> [CanvasConfig](#canvasconfig)

Canvas configuration. Related configuration items under GraphOptions (such as `container`, `width`, `height`, `devicePixelRatio`, `background`, `cursor`) are shortcut configuration items and will be converted to canvas configuration items.

#### CanvasConfig

| Property         | Description                                                                                | Type                                                                           | Default | Required |
| ---------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------- | -------- |
| container        | Canvas container                                                                           | string \| HTMLElement                                                          | -       |          |
| devicePixelRatio | Device pixel ratio                                                                         | number                                                                         | -       |          |
| width            | Canvas width                                                                               | number                                                                         | -       |          |
| height           | Canvas height                                                                              | number                                                                         | -       |          |
| cursor           | Cursor style, same as [GraphOptions.cursor](#cursor)                                       | string                                                                         | -       |          |
| background       | Canvas background color                                                                    | string                                                                         | -       |          |
| renderer         | Renderer, same as [GraphOptions.renderer](#renderer)                                       | (layer: `'background'` \| `'main'` \| `'label'` \| `'transient'`) => IRenderer | -       |          |
| enableMultiLayer | Whether to enable multi-layer. Non-dynamic parameter, effective only during initialization | boolean                                                                        | -       |          |

## container

> _string \|_ _HTMLElement_ _\|_ Canvas

Canvas container, can be one of the following three assignments:

- ID string of the DOM element, such as `'container'`
- HTML element object, such as `document.getElementById('container')`
- Canvas instance, such as `new Canvas(options)`, where `options` is of type [CanvasConfig](#canvasconfig).

## cursor

> string

Cursor style, controls the cursor shape when hovering over the canvas. Any valid CSS cursor value can be used.

Supported values include: `'auto'`, `'default'`, `'none'`, `'context-menu'`, `'help'`, `'pointer'`, `'progress'`, `'wait'`, `'cell'`, `'crosshair'`, `'text'`, `'vertical-text'`, `'alias'`, `'copy'`, `'move'`, `'no-drop'`, `'not-allowed'`, `'grab'`, `'grabbing'`, `'all-scroll'`, `'col-resize'`, `'row-resize'`, `'n-resize'`, `'e-resize'`, `'s-resize'`, `'w-resize'`, `'ne-resize'`, `'nw-resize'`, `'se-resize'`, `'sw-resize'`, `'ew-resize'`, `'ns-resize'`, `'nesw-resize'`, `'nwse-resize'`, `'zoom-in'`, `'zoom-out'.

Cursor values are referenced from [MDN - cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor).

## devicePixelRatio

> _number_

Device pixel ratio.

Used for high-definition screens, the default is [window.devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio).

## width

> _number_

Canvas width. If not set, the container width will be automatically obtained.

## height

> _number_

Canvas height. If not set, the container height will be automatically obtained.

## renderer

> _(layer: 'background' \| 'main' \| 'label' \| 'transient') =>_ _IRenderer_

Manually specify the renderer

G6 uses a layered rendering approach, divided into four layers: `background`, `main`, `label`, `transient`. Users can set the renderer for each layer of the canvas through this configuration item.

**Example**: Use SVG renderer for rendering

```javascript
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Graph } from '@antv/g6';

const graph = new Graph({
  renderer: () => new SVGRenderer(),
});
```

## padding

> _number \| number[]_

Canvas padding

Usually, during adaptation, it will be adapted according to the padding. It can be a single value (same padding on all sides) or an array form (specify the padding for top, right, bottom, left in order).

**Example:**

```javascript
// Single value
const graph1 = new Graph({
  padding: 20, // 20 pixels of padding on all sides
});

// Array form
const graph2 = new Graph({
  padding: [20, 40, 20, 40], // Padding for top, right, bottom, left
});
```

## rotation

> _number_ **Default:** `0`

Rotation angle (in radians)

## x

> _number_

Viewport x coordinate, sets the initial horizontal position of the viewport.

## y

> _number_

Viewport y coordinate, sets the initial vertical position of the viewport.

## zoom

> _number_ **Default:** `1`

Sets the initial zoom level of the viewport, 1 means 100% (original size).

## zoomRange

> _[number, number]_ **Default:** `[0.01, 10]`

Zoom range, limits the minimum and maximum scale that users can zoom.

## animation

> _boolean \| [AnimationEffectTiming](#animationeffecttiming)_

Enable or disable global animation

When configured as an animation option, animation will be enabled, and this animation configuration will be used as the base configuration for global animation.

#### AnimationEffectTiming

| Property   | Description                    | Type                                                                | Default     | Required |
| ---------- | ------------------------------ | ------------------------------------------------------------------- | ----------- | -------- |
| delay      | Animation delay time           | number                                                              | -           |          |
| direction  | Animation direction            | `'alternate'` \| `'alternate-reverse'` \| `'normal'` \| `'reverse'` | `'forward'` |          |
| duration   | Animation duration             | number                                                              | -           |          |
| easing     | Animation easing function      | string                                                              | -           |          |
| fill       | Fill mode after animation ends | `'auto'` \| `'backwards'` \| `'both'` \| `'forwards'` \| `'none'`   | `'none'`    |          |
| iterations | Animation iteration count      | number                                                              | -           |          |

**Example:**

```javascript
// Simple enable
const graph1 = new Graph({
  animation: true,
});

// Detailed configuration
const graph2 = new Graph({
  animation: {
    duration: 500, // Animation duration (milliseconds)
    easing: 'ease-in-out', // Easing function
  },
});
```

## data

> [GraphData](#graphdata)

Data.

#### GraphData

| Property | Description | Type                      | Default | Required |
| -------- | ----------- | ------------------------- | ------- | -------- |
| nodes    | Node data   | [NodeData](#nodedata)[]   | -       | ✓        |
| edges    | Edge data   | [EdgeData](#edgedata)[]   | -       | ✓        |
| combos   | Combo data  | [ComboData](#combodata)[] | -       | ✓        |

#### NodeData

| Property | Description                                                                                                                                         | Type           | Default | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------- | -------- |
| id       | Unique identifier for the node, used to distinguish different nodes                                                                                 | string         | -       | ✓        |
| type     | Node type, built-in node type name or custom node name                                                                                              | string         | -       |          |
| data     | Node data, used to store custom data for the node, such as node name, description, etc. Can be accessed in style mapping through callback functions | object         | -       |          |
| style    | Node style, including visual attributes such as position, size, color, etc.                                                                         | object         | -       |          |
| states   | Initial state of the node, such as selected, activated, hovered, etc.                                                                               | string[]       | -       |          |
| combo    | ID of the combo to which it belongs, used to organize the hierarchical relationship of nodes, if none, it is null                                   | string \| null | -       |          |
| children | Collection of child node IDs, used only in tree graph scenarios                                                                                     | string[]       | -       |          |

#### EdgeData

| Property | Description                                                                                                    | Type     | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------- | -------- | ------- | -------- |
| source   | Starting node ID of the edge                                                                                   | string   | -       | ✓        |
| target   | Target node ID of the edge                                                                                     | string   | -       | ✓        |
| id       | Unique identifier for the edge                                                                                 | string   | -       |          |
| type     | Edge type, built-in edge type name or custom edge name                                                         | string   | -       |          |
| data     | Edge data, used to store custom data for the edge, can be accessed in style mapping through callback functions | object   | -       |          |
| style    | Edge style, including visual attributes such as line color, width, arrow, etc.                                 | object   | -       |          |
| states   | Initial state of the edge                                                                                      | string[] | -       |          |

#### ComboData

| Property | Description                                                                                                      | Type           | Default | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------- | -------------- | ------- | -------- |
| id       | Unique identifier for the combo                                                                                  | string         | -       | ✓        |
| type     | Combo type, built-in combo type name or custom combo name                                                        | string         | -       |          |
| data     | Combo data, used to store custom data for the combo, can be accessed in style mapping through callback functions | object         | -       |          |
| style    | Combo style                                                                                                      | object         | -       |          |
| states   | Initial state of the combo                                                                                       | string[]       | -       |          |
| combo    | Parent combo ID. If there is no parent combo, it is null                                                         | string \| null | -       |          |

**Example:**

```javascript
const graph = new Graph({
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 100 } },
      { id: 'node2', style: { x: 200, y: 200 } },
    ],
    edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
    combos: [{ id: 'combo1', style: { x: 150, y: 150 } }],
  },
});
```

- Read [Data](/en/manual/data) to learn more about graph data, including but not limited to data formats, how to manipulate data, etc.

## node

> [NodeOptions](#nodeoptions)

Node configuration options.

#### NodeOptions

| Property  | Description                                                                      | Type                                                     | Default  | Required |
| --------- | -------------------------------------------------------------------------------- | -------------------------------------------------------- | -------- | -------- |
| type      | Node type, built-in node type name or custom node name                           | [Type](/en/manual/element/node/base-node#type)           | `circle` |          |
| style     | Node style, including color, size, etc.                                          | [Style](/en/manual/element/node/base-node#style)         | -        |          |
| state     | Define the style of the node in different states                                 | [State](/en/manual/element/node/base-node#state)         | -        |          |
| palette   | Define the color palette of the node, used to map colors based on different data | [Palette](/en/manual/element/node/base-node#palette)     | -        |          |
| animation | Define the animation effect of the node                                          | [Animation](/en/manual/element/node/base-node#animation) | -        |          |

See [Node](/en/manual/element/node/base-node) for details

**Example:**

```javascript
const graph = new Graph({
  node: {
    type: 'circle', // Node type
    style: {
      fill: '#e6f7ff', // Fill color
      stroke: '#91d5ff', // Border color
      lineWidth: 1, // Border width
      r: 20, // Radius
      labelText: (d) => d.id, // Label text
    },
    // Node state style
    state: {
      hover: {
        lineWidth: 2,
        stroke: '#69c0ff',
      },
      selected: {
        fill: '#bae7ff',
        stroke: '#1890ff',
        lineWidth: 2,
      },
    },
  },
});
```

## edge

> [EdgeOptions](#edgeoptions)

Edge configuration options

#### EdgeOptions

| Property  | Description                                                                      | Type                                                     | Default | Required |
| --------- | -------------------------------------------------------------------------------- | -------------------------------------------------------- | ------- | -------- |
| type      | Edge type, built-in edge type name or custom edge name                           | [Type](/en/manual/element/edge/base-edge#type)           | `line`  |          |
| style     | Edge style, including color, size, etc.                                          | [Style](/en/manual/element/edge/base-edge#style)         | -       |          |
| state     | Define the style of the edge in different states                                 | [State](/en/manual/element/edge/base-edge#state)         | -       |          |
| palette   | Define the color palette of the edge, used to map colors based on different data | [Palette](/en/manual/element/edge/base-edge#palette)     | -       |          |
| animation | Define the animation effect of the edge                                          | [Animation](/en/manual/element/edge/base-edge#animation) | -       |          |

See [Edge](/en/manual/element/edge/base-edge) for details

**Example:**

```javascript
const graph = new Graph({
  edge: {
    type: 'polyline', // Edge type
    style: {
      stroke: '#91d5ff', // Edge color
      lineWidth: 2, // Edge width
      endArrow: true, // Whether there is an arrow
    },
    // Edge state style
    state: {
      selected: {
        stroke: '#1890ff',
        lineWidth: 3,
      },
    },
  },
});
```

## combo

> [ComboOptions](#combooptions)

Combo configuration options

| Property  | Description                                                                       | Type                                                       | Default  | Required |
| --------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------- | -------- |
| type      | Combo type, built-in combo type name or custom combo name                         | [Type](/en/manual/element/combo/base-combo#type)           | `circle` |          |
| style     | Combo style, including color, size, etc.                                          | [Style](/en/manual/element/combo/base-combo#style)         | -        |          |
| state     | Define the style of the combo in different states                                 | [State](/en/manual/element/combo/base-combo#state)         | -        |          |
| palette   | Define the color palette of the combo, used to map colors based on different data | [Palette](/en/manual/element/combo/base-combo#palette)     | -        |          |
| animation | Define the animation effect of the combo                                          | [Animation](/en/manual/element/combo/base-combo#animation) | -        |          |

See [Combo](/en/manual/element/combo/base-combo) for details

**Example:**

```javascript
const graph = new Graph({
  combo: {
    type: 'circle', // Combo type
    style: {
      fill: '#f0f0f0', // Background color
      stroke: '#d9d9d9', // Border color
      lineWidth: 1, // Border width
    },
    // Combo state style
    state: {
      selected: {
        stroke: '#1890ff',
        lineWidth: 2,
      },
    },
  },
});
```

## layout

> _CustomLayoutOptions \| CustomLayoutOptions[]_

Layout configuration options, can be an object (normal layout) or an array (pipeline layout).

**Example**:

```javascript
const graph = new Graph({
  container: 'container',
  layout: {
    type: 'force', // Force-directed layout
    preventOverlap: true, // Prevent node overlap
    nodeStrength: -50, // Repulsion between nodes
    edgeStrength: 0.5, // Elastic coefficient of edges
    iterations: 200, // Number of iterations
    animation: true, // Enable layout animation
  },
});
```

## theme

> _false \| 'light' \| 'dark' \| string_

Set the theme of the chart, can be the built-in `'light'`, `'dark'` theme, or the name of a custom theme. Set to `false` to use no theme.

## behaviors

> _(string \| [CustomExtensionOptions](#customextensionoptions) \| ((this:Graph) =>CustomExtensionOptions))[]_

Configure the interaction behaviors of the chart, can be a string (using default configuration), an object (custom configuration), or a function (dynamic configuration, the graph instance can be accessed within the function).

**Example:**

```javascript
const graph = new Graph({
  behaviors: [
    'drag-canvas', // Enable canvas dragging with default configuration
    'zoom-canvas', // Enable canvas zooming with default configuration
    {
      type: 'drag-element', // Custom configuration for dragging elements
      key: 'drag-node-only',
      enable: (event) => event.targetType === 'node', // Only allow dragging nodes
    },
    function () {
      console.log(this); // Output graph instance
      return {
        type: 'hover-activate',
      };
    },
  ],
});
```

- View [Interaction Overview](/en/manual/behavior/overview) to learn more about interaction principles
- Browse [Built-in Interactions](/en/manual/behavior/auto-adapt-label) to get a list of all built-in interactions and their configuration options

## plugins

> _(string \| [CustomExtensionOptions](#customextensionoptions) \| ((this:Graph) =>CustomExtensionOptions))[]_

Set the plugins of the chart, can be a string (using default configuration), an object (custom configuration), or a function (dynamic configuration, the graph instance can be accessed within the function).

**Example:**

```javascript
const graph = new Graph({
  container: 'container',
  plugins: [
    'minimap', // Enable minimap with default configuration
    {
      type: 'grid', // Enable grid background
      key: 'grid-plugin',
      line: {
        stroke: '#d9d9d9',
        lineWidth: 1,
      },
    },
    {
      type: 'toolbar', // Enable toolbar
      key: 'graph-toolbar',
      position: 'top-right', // Position
    },
  ],
});
```

- View [Plugin Overview](/en/manual/plugin/overview) to learn more about plugin principles
- Browse [Built-in Plugins](/en/manual/plugin/background) to get a list of all built-in plugins and their configuration options

## transforms

> _(string \| [CustomExtensionOptions](#customextensionoptions) \| ((this:Graph) =>CustomExtensionOptions))[]_

Configure data processing, used to process data before rendering, does not affect the original data. Can be a string (using default configuration), an object (custom configuration), or a function (dynamic configuration, the graph instance can be accessed within the function).

**Example:**

```javascript
const graph = new Graph({
  transforms: [
    'process-parallel-edges', // Process parallel edges with default configuration
    {
      type: 'map-node-size', // Map node size based on node data
      field: 'value', // Use the value of the field
      max: 50, // Maximum radius
      min: 20, // Minimum radius
    },
  ],
});
```

- View [Data Processing Overview](/en/manual/transform/overview) to learn more about data processing principles
- Browse [Built-in Data Processing](/en/manual/transform/map-node-size) to get a list of all built-in data processing and their configuration options

#### CustomExtensionOptions

```typescript
interface CustomExtensionOption extends Record<string, any> {
  /** Extension type */
  type: string;
  /** Extension key, i.e., unique identifier */
  key?: string;
}
```
