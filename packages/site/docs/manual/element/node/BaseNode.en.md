---
title: Common Node Configuration
order: 1
---

This document introduces the common configuration properties for built-in nodes.

## NodeOptions

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  node: {
    type: 'circle', // Node type
    style: {}, // Node style
    state: {}, // State style
    palette: {}, // Palette configuration
    animation: {}, // Animation configuration
  },
});
```

| Property  | Description                                                    | Type                    | Default  | Required |
| --------- | -------------------------------------------------------------- | ----------------------- | -------- | -------- |
| type      | Node type, built-in node type name or custom node name         | [Type](#type)           | `circle` |          |
| style     | Node style configuration, including color, size, etc.          | [Style](#style)         | -        |          |
| state     | Style configuration for different states                       | [State](#state)         | -        |          |
| palette   | Define node palette for mapping colors based on different data | [Palette](#palette)     | -        |          |
| animation | Define animation effects for nodes                             | [Animation](#animation) | -        |          |

## Type

Specifies the node type, built-in node type name or custom node name. Default is `circle`. **⚠️ Note**: This determines the shape of the main graphic.

```js {3}
const graph = new Graph({
  node: {
    type: 'circle',
  },
});
```

**⚠️ Dynamic Configuration**: The `type` property also supports dynamic configuration, allowing you to dynamically select node types based on node data:

```js
const graph = new Graph({
  node: {
    // Static configuration
    type: 'circle',

    // Dynamic configuration - arrow function form
    type: (datum) => datum.data.nodeType || 'circle',

    // Dynamic configuration - regular function form (can access graph instance)
    type: function (datum) {
      console.log(this); // graph instance
      return datum.data.category === 'important' ? 'diamond' : 'circle';
    },
  },
});
```

Available values:

- `circle`: [Circle Node](/en/manual/element/node/circle)
- `diamond`: [Diamond Node](/en/manual/element/node/diamond)
- `donut`: [Donut Node](/en/manual/element/node/donut)
- `ellipse`: [Ellipse Node](/en/manual/element/node/ellipse)
- `hexagon`: [Hexagon Node](/en/manual/element/node/hexagon)
- `html`: [HTML Node](/en/manual/element/node/html)
- `image`: [Image Node](/en/manual/element/node/image)
- `rect`: [Rectangle Node](/en/manual/element/node/rect)
- `star`: [Star Node](/en/manual/element/node/star)
- `triangle`: [Triangle Node](/en/manual/element/node/triangle)

## Style

Defines the style of nodes, including color, size, etc.

```js {3}
const graph = new Graph({
  node: {
    style: {},
  },
});
```

**⚠️ Dynamic Configuration**: All the following style properties support dynamic configuration, meaning you can pass functions to dynamically calculate property values based on node data:

```js
const graph = new Graph({
  node: {
    style: {
      // Static configuration
      fill: '#1783FF',

      // Dynamic configuration - arrow function form
      stroke: (datum) => (datum.data.isActive ? '#FF0000' : '#000000'),

      // Dynamic configuration - regular function form (can access graph instance)
      lineWidth: function (datum) {
        console.log(this); // graph instance
        return datum.data.importance > 5 ? 3 : 1;
      },

      // Nested properties also support dynamic configuration
      labelText: (datum) => `Node: ${datum.id}`,
      badges: (datum) => datum.data.tags.map((tag) => ({ text: tag })),
    },
  },
});
```

Where the `datum` parameter is the node data object (`NodeData`), containing all data information of the node.

A complete node consists of the following parts:

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ot4bSbBx97EAAAAAAAAAAAAADmJ7AQ/original" />

- `key`: The main graphic of the node, representing the primary shape of the node, such as rectangle, circle, etc.
- `label`: Text label, usually used to display the name or description of the node
- `icon`: Icon graphic, usually used to display node icons, can be images or text icons
- `badge`: Badge, by default located at the top-right corner of the node
- `halo`: Graphic showing halo effect around the main graphic
- `port`: Connection points on the node, used to connect edges

The following style configurations are explained in order by atomic graphics:

### Main Graphic Style

The main graphic is the core part of the node, defining the basic shape and appearance of the node. Here are common configuration scenarios:

#### Basic Style Configuration

Setting the basic appearance of nodes:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      fill: '#5B8FF9', // Blue fill
      stroke: '#1A1A1A', // Dark stroke
      lineWidth: 2,
      size: 40,
    },
  },
});

graph.render();
```

#### Transparency and Shadow Effects

Adding transparency and shadow effects to nodes:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      fill: '#61DDAA',
      fillOpacity: 0.85,
      shadowColor: 'rgba(97, 221, 170, 0.4)',
      shadowBlur: 12,
      shadowOffsetX: 2,
      shadowOffsetY: 4,
      stroke: '#F0F0F0',
      lineWidth: 1,
    },
  },
});

graph.render();
```

#### Dashed Border Style

Creating nodes with dashed borders:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      fill: '#FFF1F0',
      stroke: '#F5222D',
      lineWidth: 2,
      lineDash: [6, 4],
      lineCap: 'round',
    },
  },
});

graph.render();
```

The complete main graphic style configuration is as follows:

| Property                        | Description                                                                                                                                      | Type                          | Default   | Required |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | --------- | -------- |
| collapsed                       | Whether the current node/combo is collapsed                                                                                                      | boolean                       | false     |          |
| cursor                          | Node mouse hover style, [options](#cursor)                                                                                                       | string                        | default   |          |
| fill                            | Node fill color                                                                                                                                  | string                        | `#1783FF` |          |
| fillOpacity                     | Node fill color transparency                                                                                                                     | number \| string              | 1         |          |
| increasedLineWidthForHitTesting | When lineWidth is small, the interactive area also becomes small. Sometimes we want to increase this area to make "thin lines" easier to pick up | number                        | 0         |          |
| lineCap                         | Node stroke end style                                                                                                                            | `round` \| `square` \| `butt` | `butt`    |          |
| lineDash                        | Node stroke dash style                                                                                                                           | number[]                      | -         |          |
| lineDashOffset                  | Node stroke dash offset                                                                                                                          | number                        | -         |          |
| lineJoin                        | Node stroke join style                                                                                                                           | `round` \| `bevel` \| `miter` | `miter`   |          |
| lineWidth                       | Node stroke width                                                                                                                                | number                        | 1         |          |
| opacity                         | Node transparency                                                                                                                                | number \| string              | 1         |          |
| pointerEvents                   | How the node responds to pointer events, [options](#pointerevents)                                                                               | string                        | `auto`    |          |
| shadowBlur                      | Node shadow blur                                                                                                                                 | number                        | -         |          |
| shadowColor                     | Node shadow color                                                                                                                                | string                        | -         |          |
| shadowOffsetX                   | Node shadow offset in x-axis direction                                                                                                           | number \| string              | -         |          |
| shadowOffsetY                   | Node shadow offset in y-axis direction                                                                                                           | number \| string              | -         |          |
| shadowType                      | Node shadow type                                                                                                                                 | `inner` \| `outer`            | `outer`   |          |
| size                            | Node size, quick setting for node width and height, [options](#size)                                                                             | number \| number[]            | 32        |          |
| stroke                          | Node stroke color                                                                                                                                | string                        | `#000`    |          |
| strokeOpacity                   | Node stroke color transparency                                                                                                                   | number \| string              | 1         |          |
| transform                       | Transform property allows you to rotate, scale, skew or translate the given node                                                                 | string                        | -         |          |
| transformOrigin                 | Rotation and scaling center, also called transformation center                                                                                   | string                        | -         |          |
| visibility                      | Whether the node is visible                                                                                                                      | `visible` \| `hidden`         | `visible` |          |
| x                               | Node x coordinate                                                                                                                                | number                        | 0         |          |
| y                               | Node y coordinate                                                                                                                                | number                        | 0         |          |
| z                               | Node z coordinate                                                                                                                                | number                        | 0         |          |
| zIndex                          | Node rendering level                                                                                                                             | number                        | 0         |          |

#### Size

Node size, quick setting for node width and height, supports three configuration methods:

- number: Indicates that the node width and height are the same as the specified value
- [number, number]: Indicates that the node width and height are represented by array elements indicating the node's width and height respectively
- [number, number, number]: Indicates that the node width, height, and depth are represented by array elements

#### PointerEvents

The `pointerEvents` property controls how graphics respond to interaction events. You can refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events).

Available values: `visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

In short, `fill`, `stroke`, and `visibility` can independently or in combination affect pick behavior. Currently supports the following keywords:

- **`auto`**: Default value, equivalent to `visiblepainted`
- **`none`**: Will never be a target for responding to events
- **`visiblepainted`**: Will respond to events only if the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic fill area and `fill` takes a non-`none` value; or triggered in the graphic stroke area and `stroke` takes a non-`none` value
- **`visiblefill`**: Will respond to events only if the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic fill area, not affected by the value of `fill`
- **`visiblestroke`**: Will respond to events only if the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic stroke area, not affected by the value of `stroke`
- **`visible`**: Will respond to events only if the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic fill or stroke area, not affected by the values of `fill` and `stroke`
- **`painted`**: Will respond to events only if the following conditions are met:
  - Triggered in the graphic fill area and `fill` takes a non-`none` value; or triggered in the graphic stroke area and `stroke` takes a non-`none` value
  - Not affected by the value of `visibility`
- **`fill`**: Will respond to events only if the following conditions are met:
  - Triggered in the graphic fill area, not affected by the value of `fill`
  - Not affected by the value of `visibility`
- **`stroke`**: Will respond to events only if the following conditions are met:
  - Triggered in the graphic stroke area, not affected by the value of `stroke`
  - Not affected by the value of `visibility`
- **`all`**: Will respond to events as long as entering the fill and stroke areas of the graphic, not affected by the values of `fill`, `stroke`, and `visibility`

**Usage Examples:**

```js
// Example 1: Only stroke area responds to events
const graph = new Graph({
  node: {
    style: {
      fill: 'none',
      stroke: '#000',
      lineWidth: 2,
      pointerEvents: 'stroke', // Only stroke responds to events
    },
  },
});

// Example 2: Completely unresponsive to events
const graph = new Graph({
  node: {
    style: {
      pointerEvents: 'none', // Node does not respond to any events
    },
  },
});
```

#### Cursor

Available values: `auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

### Label Style

Labels are used to display text information of nodes, supporting various style configurations and layout methods. Here are common usage scenarios:

#### Basic Text Label

The simplest text label configuration:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 120,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      labelText: 'Node Name',
      labelFill: '#262626',
      labelFontSize: 12,
      labelPlacement: 'bottom',
    },
  },
});

graph.render();
```

#### Multi-line Text Label

When text is long, you can set automatic line wrapping:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 120,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      labelText: 'This is a very long node name that needs line wrapping',
      labelWordWrap: true,
      labelMaxWidth: '150%',
      labelMaxLines: 3,
      labelTextOverflow: 'ellipsis',
      labelFill: '#434343',
      labelPlacement: 'bottom',
      labelTextAlign: 'center',
    },
  },
});

graph.render();
```

#### Label with Background

Adding background to labels to improve readability:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 120,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      labelText: 'Important Node',
      labelBackground: true,
      labelBackgroundFill: 'rgba(250, 140, 22, 0.1)',
      labelBackgroundRadius: 6,
      labelPadding: [6, 12],
      labelFill: '#D4380D',
      labelFontWeight: 'bold',
      labelPlacement: 'bottom',
    },
  },
});

graph.render();
```

The complete label style configuration is as follows:

| Property                 | Description                                                                                                                        | Type                                                                        | Default   | Required |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------- | -------- |
| label                    | Whether to display node label                                                                                                      | boolean                                                                     | true      |          |
| labelCursor              | Style displayed when mouse hovers over node label, [options](#cursor)                                                              | string                                                                      | `default` |          |
| labelFill                | Node label text color                                                                                                              | string                                                                      | -         |          |
| labelFontFamily          | Node label font family                                                                                                             | string                                                                      | -         |          |
| labelFontSize            | Node label font size                                                                                                               | number                                                                      | 12        |          |
| labelFontStyle           | Node label font style                                                                                                              | `normal` \| `italic` \| `oblique`                                           | -         |          |
| labelFontVariant         | Node label font variant                                                                                                            | `normal` \| `small-caps` \| string                                          | -         |          |
| labelFontWeight          | Node label font weight                                                                                                             | `normal` \| `bold` \| `bolder` \| `lighter` \| number                       | -         |          |
| labelLeading             | Line spacing                                                                                                                       | number                                                                      | 0         |          |
| labelLetterSpacing       | Node label letter spacing                                                                                                          | number \| string                                                            | -         |          |
| labelLineHeight          | Node label line height                                                                                                             | number \| string                                                            | -         |          |
| labelMaxLines            | Maximum number of lines for node label                                                                                             | number                                                                      | 1         |          |
| labelMaxWidth            | Maximum width of node label, [options](#labelmaxwidth)                                                                             | number \| string                                                            | `200%`    |          |
| labelOffsetX             | Node label offset in x-axis direction                                                                                              | number                                                                      | 0         |          |
| labelOffsetY             | Node label offset in y-axis direction                                                                                              | number                                                                      | 0         |          |
| labelPadding             | Node label padding                                                                                                                 | number \| number[]                                                          | 0         |          |
| labelPlacement           | Position of node label relative to node main graphic, [options](#labelplacement)                                                   | string                                                                      | `bottom`  |          |
| labelText                | Node label text content                                                                                                            | `string` \| `(datum) => string`                                             | -         |          |
| labelTextAlign           | Node label text horizontal alignment                                                                                               | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `left`    |          |
| labelTextBaseline        | Node label text baseline                                                                                                           | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | -         |          |
| labelTextDecorationColor | Node label text decoration line color                                                                                              | string                                                                      | -         |          |
| labelTextDecorationLine  | Node label text decoration line                                                                                                    | string                                                                      | -         |          |
| labelTextDecorationStyle | Node label text decoration line style                                                                                              | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | -         |          |
| labelTextOverflow        | Node label text overflow handling                                                                                                  | `clip` \| `ellipsis` \| string                                              | -         |          |
| labelTextPath            | Node label text path                                                                                                               | Path                                                                        | -         |          |
| labelWordWrap            | Whether node label enables automatic line wrapping. After enabling labelWordWrap, parts exceeding labelMaxWidth wrap automatically | boolean                                                                     | false     |          |
| labelZIndex              | Node label rendering level                                                                                                         | number                                                                      | 0         |          |

#### LabelPlacement

Available values: `left` | `right` | `top` | `bottom` | `left-top` | `left-bottom` | `right-top` | `right-bottom` | `top-left` | `top-right` | `bottom-left` | `bottom-right` | `center` | `bottom`

#### LabelMaxWidth

After enabling automatic line wrapping `labelWordWrap`, text wraps when exceeding this width:

- string: Defines maximum width as a percentage relative to node width. For example, `50%` means label width does not exceed half of the node width
- number: Defines maximum width in pixels. For example, 100 means the maximum width of the label is 100 pixels

For example, setting multi-line label text:

```json
{
  "labelWordWrap": true,
  "labelMaxWidth": 200,
  "labelMaxLines": 3
}
```

### Label Background Style

Label background is used to display the background of node labels:

| Property                      | Description                                                                                                                                                                         | Type                                     | Default   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------- |
| labelBackground               | Whether to display node label background                                                                                                                                            | boolean                                  | false     |
| labelBackgroundCursor         | Node label background mouse hover style, [options](#cursor)                                                                                                                         | string                                   | `default` |
| labelBackgroundFill           | Node label background fill color                                                                                                                                                    | string                                   | -         |
| labelBackgroundFillOpacity    | Node label background transparency                                                                                                                                                  | number                                   | 1         |
| labelBackgroundHeight         | Node label background height                                                                                                                                                        | string \| number                         | -         |
| labelBackgroundLineDash       | Node label background dash configuration                                                                                                                                            | number \| string \|(number \| string )[] | -         |
| labelBackgroundLineDashOffset | Node label background dash offset                                                                                                                                                   | number                                   | -         |
| labelBackgroundLineWidth      | Node label background stroke line width                                                                                                                                             | number                                   | -         |
| labelBackgroundRadius         | Node label background border radius <br> - number: Uniform setting for four border radii <br> - number[]: Set four border radii separately, automatically supplement missing values | number \| number[]                       | 0         |
| labelBackgroundShadowBlur     | Node label background shadow blur degree                                                                                                                                            | number                                   | -         |
| labelBackgroundShadowColor    | Node label background shadow color                                                                                                                                                  | string                                   | -         |
| labelBackgroundShadowOffsetX  | Node label background shadow X direction offset                                                                                                                                     | number                                   | -         |
| labelBackgroundShadowOffsetY  | Node label background shadow Y direction offset                                                                                                                                     | number                                   | -         |
| labelBackgroundStroke         | Node label background stroke color                                                                                                                                                  | string                                   | -         |
| labelBackgroundStrokeOpacity  | Node label background stroke transparency                                                                                                                                           | number \| string                         | 1         |
| labelBackgroundVisibility     | Whether node label background is visible                                                                                                                                            | `visible` \| `hidden`                    | -         |
| labelBackgroundZIndex         | Node label background rendering level                                                                                                                                               | number                                   | 1         |

### Halo Style

Halo is an effect displayed around the node's main graphic, usually used for highlighting or indicating special states of nodes.

#### Basic Halo Effect

Adding basic halo effect to nodes:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      lineWidth: 1.5,
      halo: true,
      haloStroke: '#1890FF',
      haloLineWidth: 6,
      haloStrokeOpacity: 0.3,
    },
  },
});

graph.render();
```

The complete halo style configuration is as follows:

| Property          | Description                                                                                                                   | Type                   | Default                                 | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------- | -------- |
| halo              | Whether to display node halo                                                                                                  | boolean                | false                                   |          |
| haloCursor        | Node halo mouse hover style, [options](#cursor)                                                                               | string                 | `default`                               |          |
| haloDraggable     | Whether node halo allows dragging                                                                                             | boolean                | true                                    |          |
| haloDroppable     | Whether node halo allows receiving dragged elements                                                                           | boolean                | true                                    |          |
| haloFillRule      | Node halo fill rule                                                                                                           | `nonzero` \| `evenodd` | -                                       |          |
| haloFilter        | Node halo filter                                                                                                              | string                 | -                                       |          |
| haloLineWidth     | Node halo stroke width                                                                                                        | number                 | 3                                       |          |
| haloPointerEvents | Whether node halo effect responds to pointer events, [options](#pointerevents)                                                | string                 | `none`                                  |          |
| haloStroke        | Node halo stroke color, **this property is used to set the color of the halo around the node, helping to highlight the node** | string                 | Consistent with main graphic fill color |          |
| haloStrokeOpacity | Node halo stroke color transparency                                                                                           | number                 | 0.25                                    |          |
| haloVisibility    | Node halo visibility                                                                                                          | `visible` \| `hidden`  | `visible`                               |          |
| haloZIndex        | Node halo rendering level                                                                                                     | number                 | -1                                      |          |

### Icon Style

Node icons support three common usage methods: text icons, image icons, and IconFont icons. The configurations for these three methods are shown below:

#### 1. Text Icons

Using text directly as icons, suitable for simple identifiers:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      fill: '#FFF0F6',
      stroke: '#EB2F96',
      lineWidth: 1.5,
      iconText: 'A', // Icon text content
      iconFill: '#C41D7F', // Deep pink icon
      iconFontSize: 16,
      iconFontWeight: 'bold',
    },
  },
});

graph.render();
```

#### 2. Image Icons

Using images as icons, supporting various image formats:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      fill: '#F6FFED',
      stroke: '#52C41A',
      lineWidth: 1.5,
      iconSrc:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMSA5TDEzLjA5IDE1Ljc4TDEyIDIyTDEwLjkxIDE1Ljc4TDMgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjNTJDNDFBIi8+Cjwvc3ZnPgo=',
      iconWidth: 20,
      iconHeight: 20,
    },
  },
});

graph.render();
```

#### 3. IconFont Icons

Using IconFont font icons, you need to import the corresponding font files first:

```js | ob { inject: true }
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      fill: '#E6F7FF', // Light blue background
      stroke: '#1890FF', // Blue border
      lineWidth: 1.5,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      iconFill: '#1890FF',
    },
  },
});

graph.render();
```

The complete icon style configuration is as follows:

| Property                | Description                                          | Type                                                                        | Default                     |
| ----------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------- |
| icon                    | Whether to display node icon                         | boolean                                                                     | true                        |
| iconFill                | Node icon text color                                 | string                                                                      | -                           |
| iconFontFamily          | Node icon font family                                | string                                                                      | -                           |
| iconFontSize            | Node icon font size                                  | number                                                                      | 16                          |
| iconFontStyle           | Node icon font style                                 | `normal` \| `italic` \| `oblique`                                           | `normal`                    |
| iconFontVariant         | Node icon font variant                               | `normal` \| `small-caps` \| string                                          | `normal`                    |
| iconFontWeight          | Node icon font weight                                | number \| string                                                            | `normal`                    |
| iconHeight              | Node icon height                                     | number                                                                      | Half of main graphic height |
| iconLetterSpacing       | Node icon text letter spacing                        | number \| string                                                            | -                           |
| iconLineHeight          | Node icon text line height                           | number \| string                                                            | -                           |
| iconMaxLines            | Maximum lines for node icon text                     | number                                                                      | 1                           |
| iconRadius              | Node icon border radius                              | number                                                                      | 0                           |
| iconSrc                 | Node image source. Has higher priority than iconText | string                                                                      | -                           |
| iconText                | Node icon text                                       | string                                                                      | -                           |
| iconTextAlign           | Node icon text horizontal alignment                  | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `left`                      |
| iconTextBaseline        | Node icon text baseline                              | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | `alphabetic`                |
| iconTextDecorationColor | Node icon text decoration line color                 | string                                                                      | -                           |
| iconTextDecorationLine  | Node icon text decoration line                       | string                                                                      | -                           |
| iconTextDecorationStyle | Node icon text decoration line style                 | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | `solid`                     |
| iconTextOverflow        | Node icon text overflow handling                     | `clip` \| `ellipsis` \| string                                              | `clip`                      |
| iconWidth               | Node icon width                                      | number                                                                      | Half of main graphic width  |
| iconWordWrap            | Whether node icon text automatically wraps           | boolean                                                                     | -                           |

### Badge Style

Badges are small markers displayed on nodes, usually used to show status, quantity, or other auxiliary information. Supports displaying multiple badges simultaneously with customizable positions.

#### Single Badge

Adding a simple badge to a node:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      badges: [
        { text: 'NEW' }, // Default display at the top
      ],
    },
  },
});

graph.render();
```

#### Multiple Badges

Adding multiple badges at different positions to a node:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      badge: true, // Whether to display badges
      badges: [
        { text: 'A', placement: 'right-top' },
        { text: 'Important', placement: 'right' },
        { text: 'Notice', placement: 'right-bottom' },
      ],
      badgePalette: ['#7E92B5', '#F4664A', '#FFBE3A'], // Badge background color palette
      badgeFontSize: 7, // Badge font size
    },
  },
});

graph.render();
```

#### Custom Badge Style

Completely customizing badge appearance:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      badges: [
        {
          text: '99+',
          placement: 'right-top',
          backgroundFill: '#FF4D4F', // Red background
          fill: '#fff', // White text
          fontSize: 10,
          padding: [2, 6],
          backgroundRadius: 8,
        },
      ],
    },
  },
});

graph.render();
```

The complete badge style configuration is as follows:

| Property     | Description                      | Type                                  | Default                           |
| ------------ | -------------------------------- | ------------------------------------- | --------------------------------- |
| badge        | Whether the node displays badges | boolean                               | true                              |
| badgePalette | Badge background color palette   | string[]                              | [`#7E92B5`, `#F4664A`, `#FFBE3A`] |
| badges       | Node badge settings              | [BadgeStyleProps](#badgestyleprops)[] | -                                 |

#### BadgeStyleProps

| Property                 | Description                                                                                                                                                                                                                                                                                                         | Type                                                                                                                                                                   | Default      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| background               | Whether node badge displays background                                                                                                                                                                                                                                                                              | boolean                                                                                                                                                                | true         |
| backgroundCursor         | Node badge background mouse hover style, [options](#cursor)                                                                                                                                                                                                                                                         | string                                                                                                                                                                 | `default`    |
| backgroundFill           | Node badge background fill color. If not specified, badgePalette is considered for allocation in order                                                                                                                                                                                                              | string                                                                                                                                                                 | -            |
| backgroundFillOpacity    | Node badge background fill transparency                                                                                                                                                                                                                                                                             | number                                                                                                                                                                 | 1            |
| backgroundFilter         | Node badge background filter                                                                                                                                                                                                                                                                                        | string                                                                                                                                                                 | -            |
| backgroundHeight         | Node badge background height                                                                                                                                                                                                                                                                                        | number \| string                                                                                                                                                       | -            |
| backgroundLineDash       | Node badge background dash configuration                                                                                                                                                                                                                                                                            | number \| string \|(number \| string )[]                                                                                                                               | -            |
| backgroundLineDashOffset | Node badge background dash offset                                                                                                                                                                                                                                                                                   | number                                                                                                                                                                 | -            |
| backgroundLineWidth      | Node badge background stroke line width                                                                                                                                                                                                                                                                             | number                                                                                                                                                                 | -            |
| backgroundRadius         | Node badge background border radius <br> - number: Uniform setting for four border radii <br> - number[]: Set four border radii separately, automatically supplement missing values <br> - string: Similar to [CSS padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) property, separated by spaces | number \| number[] \| string                                                                                                                                           | 0            |
| backgroundShadowBlur     | Node badge background shadow blur degree                                                                                                                                                                                                                                                                            | number                                                                                                                                                                 | -            |
| backgroundShadowColor    | Node badge background shadow color                                                                                                                                                                                                                                                                                  | string                                                                                                                                                                 | -            |
| backgroundShadowOffsetX  | Node badge background shadow X direction offset                                                                                                                                                                                                                                                                     | number                                                                                                                                                                 | -            |
| backgroundShadowOffsetY  | Node badge background shadow Y direction offset                                                                                                                                                                                                                                                                     | number                                                                                                                                                                 | -            |
| backgroundStroke         | Node badge background stroke color                                                                                                                                                                                                                                                                                  | string                                                                                                                                                                 | -            |
| backgroundStrokeOpacity  | Node badge background stroke transparency                                                                                                                                                                                                                                                                           | number \| string                                                                                                                                                       | 1            |
| backgroundVisibility     | Whether node badge background is visible                                                                                                                                                                                                                                                                            | `visible` \| `hidden`                                                                                                                                                  | -            |
| backgroundZIndex         | Node badge background rendering level                                                                                                                                                                                                                                                                               | number                                                                                                                                                                 | -            |
| fill                     | Node badge text color                                                                                                                                                                                                                                                                                               | string                                                                                                                                                                 | -            |
| fontFamily               | Node badge font family                                                                                                                                                                                                                                                                                              | string                                                                                                                                                                 | -            |
| fontSize                 | Node badge font size                                                                                                                                                                                                                                                                                                | number                                                                                                                                                                 | 8            |
| fontStyle                | Node badge font style                                                                                                                                                                                                                                                                                               | `normal` \| `italic` \| `oblique`                                                                                                                                      | `normal`     |
| fontVariant              | Node badge font variant                                                                                                                                                                                                                                                                                             | `normal` \| `small-caps` \| string                                                                                                                                     | `normal`     |
| fontWeight               | Node badge font weight                                                                                                                                                                                                                                                                                              | number \| string                                                                                                                                                       | `normal`     |
| lineHeight               | Node badge line height                                                                                                                                                                                                                                                                                              | string \| number                                                                                                                                                       | -            |
| lineWidth                | Node badge line width                                                                                                                                                                                                                                                                                               | string \| number                                                                                                                                                       | -            |
| maxLines                 | Maximum lines for node badge text                                                                                                                                                                                                                                                                                   | number                                                                                                                                                                 | 1            |
| offsetX                  | Node badge offset in x-axis direction                                                                                                                                                                                                                                                                               | number                                                                                                                                                                 | 0            |
| offsetY                  | Node badge offset in y-axis direction                                                                                                                                                                                                                                                                               | number                                                                                                                                                                 | 0            |
| padding                  | Node badge padding                                                                                                                                                                                                                                                                                                  | number \| number[]                                                                                                                                                     | 0            |
| placement                | Position of node badge relative to node main graphic. If not specified, defaults to clockwise arrangement starting from top-right corner                                                                                                                                                                            | `left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` | -            |
| text                     | Node badge text content                                                                                                                                                                                                                                                                                             | string                                                                                                                                                                 | -            |
| textAlign                | Node badge text horizontal alignment                                                                                                                                                                                                                                                                                | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`                                                                                                          | `left`       |
| textBaseline             | Node badge text baseline                                                                                                                                                                                                                                                                                            | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom`                                                                                            | `alphabetic` |
| textDecorationColor      | Node badge text decoration line color                                                                                                                                                                                                                                                                               | string                                                                                                                                                                 | -            |
| textDecorationLine       | Node badge text decoration line                                                                                                                                                                                                                                                                                     | string                                                                                                                                                                 | -            |
| textDecorationStyle      | Node badge text decoration line style                                                                                                                                                                                                                                                                               | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                                                                                                                  | `solid`      |
| textOverflow             | Node badge text overflow handling                                                                                                                                                                                                                                                                                   | `clip` \| `ellipsis` \| string                                                                                                                                         | `clip`       |
| visibility               | Whether node badge is visible                                                                                                                                                                                                                                                                                       | `visible` \| `hidden`                                                                                                                                                  | -            |
| wordWrap                 | Whether node badge text automatically wraps                                                                                                                                                                                                                                                                         | boolean                                                                                                                                                                | -            |
| zIndex                   | Node badge rendering level                                                                                                                                                                                                                                                                                          | number                                                                                                                                                                 | 3            |

### Port Style

Ports are connection points on nodes, used to connect edges. Supports adding multiple ports at different positions on nodes with customizable styles.

#### Basic Ports

Adding four basic directional ports to a node:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      port: true,
      ports: [
        { key: 'top', placement: 'top', fill: '#7E92B5' },
        { key: 'right', placement: 'right', fill: '#F4664A' },
        { key: 'bottom', placement: 'bottom', fill: '#FFBE3A' },
        { key: 'left', placement: 'left', fill: '#D580FF' },
      ],
      portR: 3,
      portLineWidth: 1,
      portStroke: '#fff',
    },
  },
});

graph.render();
```

#### Custom Position Ports

Using percentages or absolute coordinates to precisely position ports:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      ports: [
        { key: 'custom1', placement: [0.2, 0] }, // Relative position: 20% from top-left
        { key: 'custom2', placement: [0.8, 0] }, // Relative position: 80% from top-right
        { key: 'custom3', placement: [1, 0.5] }, // Relative position: right center
      ],
      portR: 4,
      portLineWidth: 1,
      portStroke: '#fff',
    },
  },
});

graph.render();
```

#### Differentiated Port Styles

Setting different styles for different ports:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: { nodes: [{ id: 'node1' }] },
  node: {
    style: {
      ports: [
        {
          key: 'input',
          placement: 'left',
          fill: '#52C41A', // Green input port
          r: 4,
        },
        {
          key: 'output',
          placement: 'right',
          fill: '#FF4D4F', // Red output port
          r: 4,
        },
      ],
      portStroke: '#fff', // Unified stroke color
      portLineWidth: 2,
    },
  },
});

graph.render();
```

The complete port style configuration is as follows:

| Property | Description                                                  | Type                                | Default | Required |
| -------- | ------------------------------------------------------------ | ----------------------------------- | ------- | -------- |
| port     | Whether the node displays ports                              | boolean                             | true    |          |
| ports    | Node port configuration, supports configuring multiple ports | [PortStyleProps](#portstyleprops)[] | -       |          |

#### PortStyleProps

| Property          | Description                                                                                                                                                                                                                                                  | Type                                                                                                                                                                                                   | Default   | Required |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | -------- |
| key               | Key value of node port, defaults to the index of the node port                                                                                                                                                                                               | string                                                                                                                                                                                                 | -         |          |
| placement         | Position of node port relative to node main graphic                                                                                                                                                                                                          | `left` \| `right` \| `top` \| `bottom` \| `center` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` \| [number, number] | -         | ✓        |
| r                 | Node port radius <br> - If set to undefined, the port is treated as a point, not displayed on canvas but exists, edges will preferentially connect to the nearest port <br> - If set to a number, the port is treated as a circle with radius specified here | number                                                                                                                                                                                                 | -         |          |
| linkToCenter      | Whether edges connect to the center of the node port <br> - If true, edges connect to the center of the node port <br> - If false, edges connect to the edge of the node port                                                                                | boolean                                                                                                                                                                                                | false     |          |
| cursor            | Node port mouse hover style, [options](#cursor)                                                                                                                                                                                                              | string                                                                                                                                                                                                 | `default` |          |
| fill              | Node port fill color                                                                                                                                                                                                                                         | string                                                                                                                                                                                                 | -         |          |
| fillOpacity       | Node port fill transparency                                                                                                                                                                                                                                  | number                                                                                                                                                                                                 | 1         |          |
| isBillboard       | Whether node port has Billboard effect                                                                                                                                                                                                                       | boolean                                                                                                                                                                                                | -         |          |
| isSizeAttenuation | Whether node port enables size attenuation                                                                                                                                                                                                                   | boolean                                                                                                                                                                                                | -         |          |
| lineDash          | Node port stroke dash configuration                                                                                                                                                                                                                          | number \| string \|(number \| string )[]                                                                                                                                                               | -         |          |
| lineDashOffset    | Node port stroke dash offset                                                                                                                                                                                                                                 | number                                                                                                                                                                                                 | -         |          |
| lineWidth         | Node port stroke line width                                                                                                                                                                                                                                  | number                                                                                                                                                                                                 | -         |          |
| shadowBlur        | Node port shadow blur degree                                                                                                                                                                                                                                 | number                                                                                                                                                                                                 | -         |          |
| shadowColor       | Node port shadow color                                                                                                                                                                                                                                       | string                                                                                                                                                                                                 | -         |          |
| shadowOffsetX     | Node port shadow X direction offset                                                                                                                                                                                                                          | number                                                                                                                                                                                                 | -         |          |
| shadowOffsetY     | Node port shadow Y direction offset                                                                                                                                                                                                                          | number                                                                                                                                                                                                 | -         |          |
| stroke            | Node port stroke color                                                                                                                                                                                                                                       | string                                                                                                                                                                                                 | -         |          |
| strokeOpacity     | Node port stroke transparency                                                                                                                                                                                                                                | number \| string                                                                                                                                                                                       | 1         |          |
| visibility        | Whether node port is visible                                                                                                                                                                                                                                 | `visible` \| `hidden`                                                                                                                                                                                  | `visible` |          |
| zIndex            | Node port rendering level                                                                                                                                                                                                                                    | number                                                                                                                                                                                                 | 2         |          |

## State

In some interactive behaviors, such as clicking to select a node or hovering to activate an edge, only certain state identifications are made on the element. To reflect these states in the visual space seen by end users, we need to set different graphic element styles for different states to respond to changes in the state of the graphic element.

G6 provides several built-in states, including selected, highlight, active, inactive, and disabled. In addition, it also supports custom states to meet more specific needs. For each state, developers can define a set of style rules that will override the element's default styles.

<img width="520" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*t2qvRp92itkAAAAAAAAAAAAADmJ7AQ/original" />

The data structure is as follows:

```typescript
type NodeState = {
  [state: string]: NodeStyle;
};
```

For example, when a node is in the `focus` state, you can add a stroke with width 3 and orange color.

```js {4-7}
const graph = new Graph({
  node: {
    state: {
      focus: {
        lineWidth: 3, // Stroke width
        stroke: 'orange', // Stroke color
      },
    },
  },
});
```

The effect is shown in the figure below:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', states: ['focus'] }],
  },
  node: {
    state: {
      focus: {
        lineWidth: 3,
        stroke: 'orange',
      },
    },
  },
});

graph.render();
```

## Animation

Defines animation effects for nodes, supporting the following two configuration methods:

1. Disable all node animations

```json
{
  "node": {
    "animation": false
  }
}
```

2. Configure stage animations

Stage animations refer to animation effects when nodes enter the canvas, update, or leave the canvas. Currently supported stages include:

- `enter`: Animation when nodes enter the canvas
- `update`: Animation when nodes are updated
- `exit`: Animation when nodes leave the canvas
- `show`: Animation when nodes are shown from hidden state
- `hide`: Animation when nodes are hidden
- `collapse`: Animation when nodes are collapsed
- `expand`: Animation when nodes are expanded

You can refer to [Animation Paradigm](/en/manual/animation/animation#animation-paradigm) to use animation syntax to configure nodes, such as:

```json
{
  "node": {
    "animation": {
      "update": [
        {
          "fields": ["x", "y"], // Only animate x and y properties during updates
          "duration": 1000, // Animation duration
          "easing": "linear" // Easing function
        }
      ]
    }
  }
}
```

You can also use built-in animation effects:

```json
{
  "node": {
    "animation": {
      "enter": "fade", // Use fade animation
      "update": "translate", // Use translate animation
      "exit": "fade" // Use fade animation
    }
  }
}
```

You can pass false to disable animations for specific stages:

```json
{
  "node": {
    "animation": {
      "enter": false // Disable node entrance animation
    }
  }
}
```

## Palette

Defines the color palette for nodes, i.e., predefined node color pool, and allocates according to rules, mapping colors to the `fill` property.

> For the definition of palettes, please refer to [Palette](/en/manual/theme/palette).

| Property | Description                                                                                                           | Type                          | Default |
| -------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| color    | Palette colors. If the palette is registered, you can directly specify its registration name, or accept a color array | string \| string[]            | -       |
| field    | Specify the grouping field in element data. If not specified, defaults to id as the grouping field                    | string \| ((datum) => string) | `id`    |
| invert   | Whether to invert the palette                                                                                         | boolean                       | false   |
| type     | Specify the current palette type. <br> - `group`: Discrete palette <br> - `value`: Continuous palette                 | `group` \| `value`            | `group` |

For example, assigning node colors to a group of data by `category` field, so that nodes of the same category have the same color:

```json
{
  "node": {
    "palette": {
      "type": "group",
      "field": "category",
      "color": ["#1783FF", "#F08F56", "#D580FF", "#00C9C9", "#7863FF"]
    }
  }
}
```

The effect is shown in the figure below:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 100,
  data: {
    nodes: new Array(10)
      .fill(0)
      .map((_, i) => ({ id: `node-${i}`, data: { category: ['A', 'B', 'C', 'D', 'E'][i % 5] } })),
  },
  layout: { type: 'grid', cols: 10 },
  node: {
    palette: {
      type: 'group',
      field: 'category',
      color: ['#1783FF', '#F08F56', '#D580FF', '#00C9C9', '#7863FF'],
    },
  },
});

graph.render();
```

You can also use default configuration:

```json
{
  "node": {
    "palette": "tableau" // tableau is the palette name, defaults to assigning colors based on ID
  }
}
```

The effect is shown in the figure below:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 100,
  data: {
    nodes: new Array(10)
      .fill(0)
      .map((_, i) => ({ id: `node-${i}`, data: { category: ['A', 'B', 'C', 'D', 'E'][i % 5] } })),
  },
  layout: { type: 'grid', cols: 10 },
  node: {
    palette: 'tableau',
  },
});

graph.render();
```
