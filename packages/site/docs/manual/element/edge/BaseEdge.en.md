---
title: Edge Common Configuration
order: 1
---

This document introduces the built-in edge common property configurations.

## EdgeOptions

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  edge: {
    type: 'line', // Edge type
    style: {}, // Edge style
    state: {}, // State styles
    palette: {}, // Palette configuration
    animation: {}, // Animation configuration
  },
});
```

| Property  | Description                                                    | Type                    | Default | Required |
| --------- | -------------------------------------------------------------- | ----------------------- | ------- | -------- |
| type      | Edge type, built-in edge type name or custom edge name         | [Type](#type)           | `line`  |          |
| style     | Edge style configuration, including color, thickness, etc.     | [Style](#style)         | -       |          |
| state     | Style configuration for different states                       | [State](#state)         | -       |          |
| palette   | Define edge palette for mapping colors based on different data | [Palette](#palette)     | -       |          |
| animation | Define edge animation effects                                  | [Animation](#animation) | -       |          |

## Type

Specify the edge type, built-in edge type name or custom edge name. Default is `line` (straight line edge). **⚠️ Note**: This determines the shape of the main graphic.

```js {3}
const graph = new Graph({
  edge: {
    type: 'polyline',
  },
});
```

**⚠️ Dynamic Configuration Note**: The `type` property also supports dynamic configuration, allowing you to dynamically select edge types based on edge data:

```js
const graph = new Graph({
  edge: {
    // Static configuration
    type: 'line',

    // Dynamic configuration - arrow function form
    type: (datum) => datum.data.edgeType || 'line',

    // Dynamic configuration - regular function form (can access graph instance)
    type: function (datum) {
      console.log(this); // graph instance
      return datum.data.importance > 5 ? 'polyline' : 'line';
    },
  },
});
```

Available values:

- `line`: [Straight line edge](/en/manual/element/edge/line)
- `polyline`: [Polyline edge](/en/manual/element/edge/polyline)
- `cubic`: [Cubic Bezier curve edge](/en/manual/element/edge/cubic)
- `cubic-horizontal`: [Horizontal cubic Bezier curve edge](/en/manual/element/edge/cubic-horizontal)
- `cubic-vertical`: [Vertical cubic Bezier curve edge](/en/manual/element/edge/cubic-vertical)
- `quadratic`: [Quadratic Bezier curve edge](/en/manual/element/edge/quadratic)

## Style

Define edge styles, including color, thickness, etc.

```js {3}
const graph = new Graph({
  edge: {
    style: {},
  },
});
```

**⚠️ Dynamic Configuration Note**: All the following style properties support dynamic configuration, meaning you can pass functions to dynamically calculate property values based on edge data:

```js
const graph = new Graph({
  edge: {
    style: {
      // Static configuration
      stroke: '#1783FF',

      // Dynamic configuration - arrow function form
      lineWidth: (datum) => (datum.data.isImportant ? 3 : 1),

      // Dynamic configuration - regular function form (can access graph instance)
      lineDash: function (datum) {
        console.log(this); // graph instance
        return datum.data.type === 'dashed' ? [5, 5] : [];
      },

      // Nested properties also support dynamic configuration
      labelText: (datum) => `Edge: ${datum.id}`,
      endArrow: (datum) => datum.data.hasArrow,
    },
  },
});
```

Where the `datum` parameter is the edge data object (`EdgeData`), containing all data information of the edge.

A complete edge consists of the following parts:

<img width="320" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cVHVQJKLOlgAAAAAAAAAAAAADmJ7AQ/original" />

- `key`: The main graphic of the edge, representing the main path of the edge, such as straight lines, curves, etc.
- `label`: Text label, usually used to display the name or description of the edge
- `badge`: Badge on the edge
- `halo`: The halo effect graphic displayed around the main graphic
- `startArrow`: Arrow at the starting end of the edge
- `endArrow`: Arrow at the ending end of the edge

The following style configurations will be explained by atomic graphics in order:

### Main Graphic Styles

The main graphic is the core part of the edge, defining the basic path and appearance of the edge. Here are common configuration scenarios:

#### Basic Style Configuration

Set the basic appearance of the edge:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#5B8FF9', // Blue edge
      lineWidth: 2, // Edge width
    },
  },
});

graph.render();
```

#### Dashed Line Style

Create edges with dashed line style:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#F5222D',
      lineWidth: 2,
      lineDash: [6, 4], // Dashed line style
      lineDashOffset: 0,
    },
  },
});

graph.render();
```

#### Shadow Effect

Add shadow effect to edges:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#722ED1',
      lineWidth: 3,
      shadowColor: 'rgba(114, 46, 209, 0.3)',
      shadowBlur: 8,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
    },
  },
});

graph.render();
```

The following is the complete main graphic style configuration:

| Property                        | Description                                                                                                                        | Type                  | Default   | Required |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------- | --------- | -------- |
| cursor                          | Mouse cursor style when hovering over edge, [options](#cursor)                                                                     | string                | `default` |          |
| increasedLineWidthForHitTesting | When lineWidth is small, the interactive area also becomes small. We can increase this area to make "thin lines" easier to pick up | number                | 0         |          |
| lineDash                        | Edge dash line style                                                                                                               | number[]              | -         |          |
| lineDashOffset                  | Edge dash line offset                                                                                                              | number                | 0         |          |
| lineWidth                       | Edge width                                                                                                                         | number                | 1         |          |
| opacity                         | Edge opacity                                                                                                                       | number \| string      | 1         |          |
| pointerEvents                   | How edge responds to pointer events, [options](#pointerevents)                                                                     | string                | `auto`    |          |
| shadowBlur                      | Edge shadow blur                                                                                                                   | number                | -         |          |
| shadowColor                     | Edge shadow color                                                                                                                  | string                | -         |          |
| shadowOffsetX                   | Edge shadow offset in x direction                                                                                                  | number \| string      | -         |          |
| shadowOffsetY                   | Edge shadow offset in y direction                                                                                                  | number \| string      | -         |          |
| shadowType                      | Edge shadow type                                                                                                                   | `inner` \| `outer`    | `outer`   |          |
| sourcePort                      | Connection port at the source end of the edge                                                                                      | string                | -         |          |
| stroke                          | Edge color                                                                                                                         | string                | `#000`    |          |
| strokeOpacity                   | Edge color opacity                                                                                                                 | number \| string      | 1         |          |
| targetPort                      | Connection port at the target end of the edge                                                                                      | string                | -         |          |
| transform                       | Transform property allows you to rotate, scale, skew, or translate the given edge                                                  | string                | -         |          |
| transformOrigin                 | The center of rotation and scaling, also known as the transform center                                                             | string                | -         |          |
| visibility                      | Whether the edge is visible                                                                                                        | `visible` \| `hidden` | `visible` |          |
| zIndex                          | Edge rendering layer                                                                                                               | number                | 1         |          |

#### PointerEvents

The `pointerEvents` property controls how graphics respond to interaction events. Refer to [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events).

Available values: `visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

In short, both `stroke` and `visibility` can independently or in combination affect hit testing behavior. Currently supports the following keywords:

- **`auto`**: Default value, equivalent to `visiblepainted`
- **`none`**: Never becomes a target for responding to events
- **`visiblepainted`**: Responds to events only when the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic stroke area while `stroke` takes a non-`none` value
- **`visiblestroke`**: Responds to events only when the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic stroke area, not affected by `stroke` value
- **`visible`**: Responds to events only when the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic stroke area, not affected by `stroke` value
- **`painted`**: Responds to events only when the following conditions are met:
  - Triggered in the graphic stroke area while `stroke` takes a non-`none` value
  - Not affected by `visibility` value
- **`stroke`**: Responds to events only when the following conditions are met:
  - Triggered in the graphic stroke area, not affected by `stroke` value
  - Not affected by `visibility` value
- **`all`**: Responds to events as long as entering the graphic stroke area, not affected by `stroke` or `visibility` values

**Usage Examples:**

```js
// Example 1: Only stroke area responds to events
const graph = new Graph({
  edge: {
    style: {
      stroke: '#000',
      lineWidth: 2,
      pointerEvents: 'stroke', // Only stroke responds to events
    },
  },
});

// Example 2: Completely non-responsive to events
const graph = new Graph({
  edge: {
    style: {
      pointerEvents: 'none', // Edge does not respond to any events
    },
  },
});
```

#### Cursor

Available values: `auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

### Label Styles

Labels are used to display text information for edges, supporting various style configurations and layout options. Here are common usage scenarios:

#### Basic Text Label

The simplest text label configuration:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 120,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 60 } },
      { id: 'node2', style: { x: 180, y: 60 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      labelText: 'Edge Label',
      labelFill: '#262626',
      labelFontSize: 12,
      labelPlacement: 'center',
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
  width: 240,
  height: 120,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 60 } },
      { id: 'node2', style: { x: 180, y: 60 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      labelText: 'This is a very long edge label that needs line wrapping',
      labelWordWrap: true,
      labelMaxWidth: '200%',
      labelMaxLines: 2,
      labelTextOverflow: 'ellipsis',
      labelFill: '#434343',
      labelPlacement: 'center',
      labelTextAlign: 'center',
    },
  },
});

graph.render();
```

#### Label with Background

Add background to labels for better readability:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 120,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 60 } },
      { id: 'node2', style: { x: 180, y: 60 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      labelText: 'Important Connection',
      labelBackground: true,
      labelBackgroundFill: 'rgba(250, 140, 22, 0.1)',
      labelBackgroundRadius: 6,
      labelPadding: [4, 8],
      labelFill: '#D4380D',
      labelFontWeight: 'bold',
      labelPlacement: 'center',
    },
  },
});

graph.render();
```

#### Auto-rotating Label

Labels can automatically rotate to align with edge direction:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 120,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 30 } },
      { id: 'node2', style: { x: 180, y: 90 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      labelText: 'Auto Rotate',
      labelAutoRotate: true, // Auto rotate
      labelFill: '#1890FF',
      labelFontWeight: 'bold',
      labelPlacement: 'center',
    },
  },
});

graph.render();
```

The following is the complete label style configuration:

| Property                 | Description                                                                                                     | Type                                                                        | Default   | Required |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------- | -------- |
| label                    | Whether to show edge label                                                                                      | boolean                                                                     | true      |          |
| labelAutoRotate          | Whether edge label automatically rotates to align with edge direction                                           | boolean                                                                     | true      |          |
| labelCursor              | Mouse cursor style when hovering over edge label, [options](#cursor)                                            | string                                                                      | `default` |          |
| labelFill                | Edge label text color                                                                                           | string                                                                      | -         |          |
| labelFontFamily          | Edge label font family                                                                                          | string                                                                      | -         |          |
| labelFontSize            | Edge label font size                                                                                            | number                                                                      | 12        |          |
| labelFontStyle           | Edge label font style                                                                                           | `normal` \| `italic` \| `oblique`                                           | -         |          |
| labelFontVariant         | Edge label font variant                                                                                         | `normal` \| `small-caps` \| string                                          | -         |          |
| labelFontWeight          | Edge label font weight                                                                                          | `normal` \| `bold` \| `bolder` \| `lighter` \| number                       | -         |          |
| labelLeading             | Line spacing                                                                                                    | number                                                                      | 0         |          |
| labelLetterSpacing       | Edge label letter spacing                                                                                       | number \| string                                                            | -         |          |
| labelLineHeight          | Edge label line height                                                                                          | number \| string                                                            | -         |          |
| labelMaxLines            | Edge label maximum lines                                                                                        | number                                                                      | 1         |          |
| labelMaxWidth            | Edge label maximum width, [options](#labelmaxwidth)                                                             | number \| string                                                            | `200%`    |          |
| labelOffsetX             | Edge label offset in x direction                                                                                | number                                                                      | 0         |          |
| labelOffsetY             | Edge label offset in y direction                                                                                | number                                                                      | 0         |          |
| labelPadding             | Edge label padding                                                                                              | number \| number[]                                                          | 0         |          |
| labelPlacement           | Edge label position relative to edge, [options](#labelplacement)                                                | string \| number                                                            | `center`  |          |
| labelText                | Edge label text content                                                                                         | `string` \| `(datum) => string`                                             | -         |          |
| labelTextAlign           | Edge label text horizontal alignment                                                                            | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `left`    |          |
| labelTextBaseline        | Edge label text baseline                                                                                        | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | -         |          |
| labelTextDecorationColor | Edge label text decoration line color                                                                           | string                                                                      | -         |          |
| labelTextDecorationLine  | Edge label text decoration line                                                                                 | string                                                                      | -         |          |
| labelTextDecorationStyle | Edge label text decoration line style                                                                           | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | -         |          |
| labelTextOverflow        | Edge label text overflow handling                                                                               | `clip` \| `ellipsis` \| string                                              | -         |          |
| labelTextPath            | Edge label text path                                                                                            | Path                                                                        | -         |          |
| labelWordWrap            | Whether to enable automatic line wrapping for edge labels. When enabled, text exceeding labelMaxWidth will wrap | boolean                                                                     | false     |          |
| labelZIndex              | Edge label rendering layer                                                                                      | number                                                                      | 0         |          |

#### LabelPlacement

Edge label position relative to the edge, can be set to:

- `start`: Label positioned at the starting point of the edge
- `center`: Label positioned at the center of the edge (default)
- `end`: Label positioned at the ending point of the edge
- `number`: Value range 0-1, representing the specific position ratio of the label on the edge, 0 for start position, 1 for end position

#### LabelMaxWidth

After enabling automatic line wrapping `labelWordWrap`, text exceeding this width will wrap:

- string: Represents the maximum width defined as a percentage relative to the edge length. For example, `50%` means the label width does not exceed half the edge length
- number: Represents the maximum width defined in pixels. For example, 100 means the label's maximum width is 100 pixels

For example, setting multi-line label text:

```json
{
  "labelWordWrap": true,
  "labelMaxWidth": 200,
  "labelMaxLines": 3
}
```

### Label Background Styles

Label background is used to display the background of edge labels:

| Property                      | Description                                                                                                                                                       | Type                                     | Default   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------- |
| labelBackground               | Whether to show edge label background                                                                                                                             | boolean                                  | false     |
| labelBackgroundCursor         | Edge label background mouse cursor style, [options](#cursor)                                                                                                      | string                                   | `default` |
| labelBackgroundFill           | Edge label background fill color                                                                                                                                  | string                                   | -         |
| labelBackgroundFillOpacity    | Edge label background opacity                                                                                                                                     | number                                   | 1         |
| labelBackgroundHeight         | Edge label background height                                                                                                                                      | string \| number                         | -         |
| labelBackgroundLineDash       | Edge label background dash line configuration                                                                                                                     | number \| string \|(number \| string )[] | -         |
| labelBackgroundLineDashOffset | Edge label background dash line offset                                                                                                                            | number                                   | -         |
| labelBackgroundLineWidth      | Edge label background stroke line width                                                                                                                           | number                                   | -         |
| labelBackgroundRadius         | Edge label background border radius <br> - number: Uniform radius for all corners <br> - number[]: Individual radius for each corner, auto-filled if insufficient | number \| number[]                       | 0         |
| labelBackgroundShadowBlur     | Edge label background shadow blur                                                                                                                                 | number                                   | -         |
| labelBackgroundShadowColor    | Edge label background shadow color                                                                                                                                | string                                   | -         |
| labelBackgroundShadowOffsetX  | Edge label background shadow X offset                                                                                                                             | number                                   | -         |
| labelBackgroundShadowOffsetY  | Edge label background shadow Y offset                                                                                                                             | number                                   | -         |
| labelBackgroundStroke         | Edge label background stroke color                                                                                                                                | string                                   | -         |
| labelBackgroundStrokeOpacity  | Edge label background stroke opacity                                                                                                                              | number \| string                         | 1         |
| labelBackgroundVisibility     | Edge label background visibility                                                                                                                                  | `visible` \| `hidden`                    | -         |
| labelBackgroundZIndex         | Edge label background rendering layer                                                                                                                             | number                                   | 1         |

### Halo Styles

Halo is an effect displayed around the edge main graphic, usually used for highlighting or indicating special states of the edge.

#### Basic Halo Effect

Add basic halo effect to edges:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 50 } },
      { id: 'node2', style: { x: 180, y: 50 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      lineWidth: 2,
      halo: true,
      haloStroke: '#1890FF',
      haloLineWidth: 6,
      haloStrokeOpacity: 0.3,
    },
  },
});

graph.render();
```

The following is the complete halo style configuration:

| Property          | Description                                                                          | Type                   | Default                                   | Required |
| ----------------- | ------------------------------------------------------------------------------------ | ---------------------- | ----------------------------------------- | -------- |
| halo              | Whether to show edge halo                                                            | boolean                | false                                     |          |
| haloCursor        | Edge halo mouse cursor style, [options](#cursor)                                     | string                 | `default`                                 |          |
| haloDraggable     | Whether edge halo allows dragging                                                    | boolean                | true                                      |          |
| haloDroppable     | Whether edge halo allows receiving dragged elements                                  | boolean                | true                                      |          |
| haloFillRule      | Edge halo fill rule                                                                  | `nonzero` \| `evenodd` | -                                         |          |
| haloFilter        | Edge halo filter                                                                     | string                 | -                                         |          |
| haloLineWidth     | Edge halo stroke width                                                               | number                 | 3                                         |          |
| haloPointerEvents | Whether edge halo responds to pointer events, [options](#pointerevents)              | string                 | `none`                                    |          |
| haloStroke        | Edge halo stroke color, **this property sets the color of the halo around the edge** | string                 | Consistent with main graphic stroke color |          |
| haloStrokeOpacity | Edge halo stroke opacity                                                             | number                 | 0.25                                      |          |
| haloVisibility    | Edge halo visibility                                                                 | `visible` \| `hidden`  | `visible`                                 |          |
| haloZIndex        | Edge halo rendering layer                                                            | number                 | -1                                        |          |

### Arrow Styles

Edges support adding arrows at the start and end points to indicate the directionality of the edge.

#### Basic Arrow

Add basic arrow to the end of the edge:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 50 } },
      { id: 'node2', style: { x: 180, y: 50 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#1890FF',
      lineWidth: 2,
      endArrow: true, // End arrow
      endArrowType: 'vee', // Arrow type
      endArrowSize: 10, // Arrow size
    },
  },
});

graph.render();
```

#### Bidirectional Arrows

Add arrows to both ends of the edge:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 50 } },
      { id: 'node2', style: { x: 180, y: 50 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#52C41A',
      lineWidth: 2,
      startArrow: true, // Start arrow
      startArrowType: 'circle',
      startArrowSize: 8,
      endArrow: true, // End arrow
      endArrowType: 'triangle',
      endArrowSize: 10,
    },
  },
});

graph.render();
```

#### Custom Arrow Style

Customize arrow color and type:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 50 } },
      { id: 'node2', style: { x: 180, y: 50 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  edge: {
    style: {
      stroke: '#722ED1',
      lineWidth: 3,
      endArrow: true,
      endArrowType: 'diamond', // Diamond arrow
      endArrowSize: 12,
      endArrowFill: '#FF4D4F', // Red arrow fill
      endArrowStroke: '#722ED1', // Arrow stroke color
      endArrowStrokeOpacity: 0.8,
    },
  },
});

graph.render();
```

#### Start Arrow Style Configuration

| Property                | Description                                             | Type                                                                                 | Default                            | Required |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------- | -------- |
| startArrow              | Whether to show edge start arrow                        | boolean                                                                              | false                              |          |
| startArrowCursor        | Edge start arrow mouse cursor style, [options](#cursor) | string                                                                               | `default`                          |          |
| startArrowFill          | Edge start arrow fill color                             | string                                                                               | Default consistent with edge color |          |
| startArrowFillOpacity   | Edge start arrow fill opacity                           | number                                                                               | 1                                  |          |
| startArrowOffset        | Edge start arrow offset                                 | number                                                                               | 0                                  |          |
| startArrowSize          | Edge start arrow size                                   | number \| [number, number]                                                           | 10                                 |          |
| startArrowStroke        | Edge start arrow stroke color                           | string                                                                               | Default consistent with edge color |          |
| startArrowStrokeOpacity | Edge start arrow stroke opacity                         | number                                                                               | 1                                  |          |
| startArrowType          | Edge start arrow type                                   | `triangle` \| `circle` \| `diamond` \| `vee` \| `rect` \| `triangleRect` \| `simple` | `vee`                              |          |

#### End Arrow Style Configuration

| Property              | Description                                           | Type                                                                                 | Default                            | Required |
| --------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------- | -------- |
| endArrow              | Whether to show edge end arrow                        | boolean                                                                              | false                              |          |
| endArrowCursor        | Edge end arrow mouse cursor style, [options](#cursor) | string                                                                               | `default`                          |          |
| endArrowFill          | Edge end arrow fill color                             | string                                                                               | Default consistent with edge color |          |
| endArrowFillOpacity   | Edge end arrow fill opacity                           | number                                                                               | 1                                  |          |
| endArrowOffset        | Edge end arrow offset                                 | number                                                                               | 0                                  |          |
| endArrowSize          | Edge end arrow size                                   | number \| [number, number]                                                           | 10                                 |          |
| endArrowStroke        | Edge end arrow stroke color                           | string                                                                               | Default consistent with edge color |          |
| endArrowStrokeOpacity | Edge end arrow stroke opacity                         | number                                                                               | 1                                  |          |
| endArrowType          | Edge end arrow type                                   | `triangle` \| `circle` \| `diamond` \| `vee` \| `rect` \| `triangleRect` \| `simple` | `vee`                              |          |

### Loop Edge Styles

Loop edges are special edges where the start and end nodes are the same node.

#### Basic Loop Edge

Create a basic loop edge:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', style: { x: 100, y: 50 } }],
    edges: [{ source: 'node1', target: 'node1' }],
  },
  edge: {
    style: {
      stroke: '#1890FF',
      lineWidth: 2,
      endArrow: true,
      loopPlacement: 'top', // Loop position
      loopDist: 30, // Loop size
    },
  },
});

graph.render();
```

#### Multiple Loop Edges

Create multiple loop edges at different positions for the same node:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 120,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', style: { x: 100, y: 60 } }],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node1' },
      { id: 'edge2', source: 'node1', target: 'node1' },
      { id: 'edge3', source: 'node1', target: 'node1' },
    ],
  },
  edge: {
    style: {
      lineWidth: 2,
      endArrow: true,
      loopPlacement: (datum) => {
        const placements = ['top', 'right', 'bottom'];
        return placements[parseInt(datum.id.slice(-1)) - 1];
      },
      loopDist: 25,
      stroke: (datum) => {
        const colors = ['#1890FF', '#52C41A', '#722ED1'];
        return colors[parseInt(datum.id.slice(-1)) - 1];
      },
    },
  },
});

graph.render();
```

The following is the complete loop edge style configuration:

| Property      | Description                                                         | Type                                                                                                                                                                   | Default                  | Required |
| ------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | -------- |
| loop          | Whether to enable loop edges                                        | boolean                                                                                                                                                                | true                     |          |
| loopClockwise | Whether to draw the loop clockwise                                  | boolean                                                                                                                                                                | true                     |          |
| loopDist      | Distance from node edge to loop top, used to specify loop curvature | number                                                                                                                                                                 | Default to max node size |          |
| loopPlacement | Loop edge position                                                  | `left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` | `top`                    |          |

## State

In some interactive behaviors, such as clicking to select an edge or hovering to activate an edge, it's simply marking certain states on that element. To reflect these states in the visual space seen by end users, we need to set different graphic element styles for different states to respond to changes in the state of that graphic element.

G6 provides several built-in states, including selected, highlight, active, inactive, and disabled. Additionally, it supports custom states to meet more specific needs. For each state, developers can define a set of style rules that will override the element's default styles.

<img width="520" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ebBlTpKu2WUAAAAAAAAAAAAADmJ7AQ/original" />

The data structure is as follows:

```typescript
type EdgeState = {
  [state: string]: EdgeStyle;
};
```

For example, when an edge is in the `focus` state, you can add a halo with a width of 6 and orange color.

```js {4-9}
const graph = new Graph({
  edge: {
    state: {
      focus: {
        halo: true,
        haloLineWidth: 6,
        haloStroke: 'orange',
        haloStrokeOpacity: 0.6,
      },
    },
  },
});
```

The effect is shown in the following image:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }],
    edges: [{ source: 'node1', target: 'node2', states: ['focus'] }],
  },
  edge: {
    state: {
      focus: {
        halo: true,
        haloLineWidth: 6,
        haloStroke: 'orange',
      },
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
});

graph.render();
```

## Animation

Define edge animation effects. Supports the following two configuration methods:

1. Disable all edge animations

```json
{
  "edge": {
    "animation": false
  }
}
```

2. Configure stage animations

Stage animations refer to the animation effects when edges enter the canvas, update, or leave the canvas. Currently supported stages include:

- `enter`: Animation when edge enters the canvas
- `update`: Animation when edge updates
- `exit`: Animation when edge leaves the canvas
- `show`: Animation when edge shows from hidden state
- `hide`: Animation when edge hides
- `collapse`: Animation when edge collapses
- `expand`: Animation when edge expands

You can refer to [Animation Paradigm](/en/manual/animation/animation#动画范式) to use animation syntax to configure edges, such as:

```json
{
  "edge": {
    "animation": {
      "update": [
        {
          "fields": ["stroke"], // Only animate stroke property during update
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
  "edge": {
    "animation": {
      "enter": "fade", // Use fade animation
      "update": "path-in", // Use path animation
      "exit": "fade" // Use fade animation
    }
  }
}
```

You can pass false to disable specific stage animations:

```json
{
  "edge": {
    "animation": {
      "enter": false // Disable edge entrance animation
    }
  }
}
```

## Palette

Define the edge palette, which is a predefined edge color pool that is allocated according to rules and maps colors to the `stroke` property.

> For palette definitions, please refer to [Palette](/en/manual/theme/palette).

| Property | Description                                                                                                           | Type                          | Default |
| -------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| color    | Palette colors. If the palette is registered, you can directly specify its registration name, or accept a color array | string \| string[]            | -       |
| field    | Specify the grouping field in element data. If not specified, defaults to using id as grouping field                  | string \| ((datum) => string) | `id`    |
| invert   | Whether to invert the palette                                                                                         | boolean                       | false   |
| type     | Specify current palette type. <br> - `group`: Discrete palette <br> - `value`: Continuous palette                     | `group` \| `value`            | `group` |

For example, to assign edge colors to a group of data by the `direction` field, making edges of the same category have the same color:

```json
{
  "edge": {
    "palette": {
      "type": "group",
      "field": "direction",
      "color": ["#F08F56", "#00C9C9", "#D580FF"]
    }
  }
}
```

The effect is shown in the following image:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
  data: {
    nodes: new Array(6).fill(0).map((_, i) => ({ id: `node-${i + 1}` })),
    edges: [
      { source: 'node-1', target: 'node-2', data: { direction: 'out' } },
      { source: 'node-1', target: 'node-3', data: { direction: 'out' } },
      { source: 'node-1', target: 'node-4', data: { direction: 'out' } },
      { source: 'node-5', target: 'node-1', data: { direction: 'in' } },
      { source: 'node-6', target: 'node-1', data: { direction: 'in' } },
    ],
  },
  layout: {
    type: 'radial',
    unitRadius: 120,
    linkDistance: 120,
  },
  edge: {
    style: {
      endArrow: true,
    },
    palette: {
      type: 'group',
      field: 'direction',
      color: ['#F08F56', '#00C9C9'],
    },
  },
});

graph.render();
```

You can also use default configuration:

```json
{
  "edge": {
    "palette": "tableau" // tableau is the palette name, colors assigned by ID by default
  }
}
```

The effect is shown in the following image:

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 300,
  data: {
    nodes: new Array(6).fill(0).map((_, i) => ({ id: `node-${i + 1}` })),
    edges: [
      { source: 'node-1', target: 'node-2', data: { direction: 'out' } },
      { source: 'node-1', target: 'node-3', data: { direction: 'out' } },
      { source: 'node-1', target: 'node-4', data: { direction: 'out' } },
      { source: 'node-5', target: 'node-1', data: { direction: 'in' } },
      { source: 'node-6', target: 'node-1', data: { direction: 'in' } },
    ],
  },
  layout: {
    type: 'radial',
    unitRadius: 120,
    linkDistance: 120,
  },
  edge: {
    style: {
      endArrow: true,
    },
    palette: 'tableau',
  },
});

graph.render();
```
