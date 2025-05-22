---
title: Common Edge Configurations
order: 0
---

This article introduces edge property configuration, with configuration locations as follows:

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  edge: {
    type: 'line', // Edge type configuration
    style: {}, // Edge style configuration
    state: {}, // Edge state style
    palette: {}, // Edge palette configuration
    animation: {}, // Edge animation configuration
  },
});
```

## EdgeOptions

| Attribute | Description                                                             | Type                    | Default | Required |
| --------- | ----------------------------------------------------------------------- | ----------------------- | ------- | -------- |
| type      | Edge type, name of built-in edge type or custom edge                    | [Type](#type)           | `line`  |          |
| style     | Edge style, including color, size, etc.                                 | [Style](#style)         | -       |          |
| state     | Define styles of edges in different states                              | [State](#state)         | -       |          |
| palette   | Define the palette of edges, used to map colors based on different data | [Palette](#palette)     | -       |          |
| animation | Define the animation effects of edges                                   | [Animation](#animation) | -       |          |

## Type

Specify the edge type, name of built-in edge type or custom edge. The default is `line` (straight edge).

```js {3}
const graph = new Graph({
  edge: {
    type: 'polyline', // Edge type configuration
  },
});
```

Optional values are:

- `cubic-horizontal`: [Horizontal Cubic Bezier Curve](/en/manual/element/edge/build-in/cubic-horizontal)
- `cubic-vertical`: [Vertical Cubic Bezier Curve](/en/manual/element/edge/build-in/cubic-vertical)
- `cubic`: [Cubic Bezier Curve](/en/manual/element/edge/build-in/cubic)
- `line`: [Straight Line](/en/manual/element/edge/build-in/line)
- `polyline`: [Polyline](/en/manual/element/edge/build-in/polyline)
- `quadratic`: [Quadratic Bezier Curve](/en/manual/element/edge/build-in/quadratic)

## Style

Define the style of the edge, including color, size, etc.

```js {3}
const graph = new Graph({
  edge: {
    style: {},
  },
});
```

A complete edge consists of the following parts:

<img width="320" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cVHVQJKLOlgAAAAAAAAAAAAADmJ7AQ/original" />

> To understand the composition of edges, please read [Element - Edge](/en/manual/element/edge/overview#edge-composition).

The following style configurations will be explained in sequence according to atomic graphics:

### Main Graphic Style Key

| Attribute                       | Description                                                                                                   | Default                              | Type      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------- |
| class                           | Edge className                                                                                                | string                               | -         |
| cursor                          | Edge mouse hover style, [configuration item](#cursor)                                                         | string                               | `default` |
| fill                            | Edge area fill color                                                                                          | string                               | -         |
| fillRule                        | Edge internal fill rule                                                                                       | `nonzero` &#124; `evenodd`           | -         |
| filter                          | Edge shadow filter effect                                                                                     | string                               | -         |
| increasedLineWidthForHitTesting | When the edge width is too small, it can be used to enlarge the interaction area                              | string &#124; number                 | -         |
| isBillboard                     | Effective in 3D scenes, always facing the screen, so the line width is not affected by perspective projection | true                                 | boolean   |
| lineDash                        | Edge dashed line style                                                                                        | 0                                    | number    |
| lineDashOffset                  | Edge dashed line offset                                                                                       | number                               | 0         |
| lineWidth                       | Edge width                                                                                                    | 1                                    | number    |
| opacity                         | Overall opacity of the edge                                                                                   | number                               | 1         |
| pointerEvents                   | Whether the edge responds to pointer events, [configuration item](#pointerevents)                             | string                               | -         |
| shadowBlur                      | Edge shadow blur effect                                                                                       | number                               | -         |
| shadowColor                     | Edge shadow color                                                                                             | string                               | -         |
| shadowOffsetX                   | Edge shadow X-axis offset                                                                                     | number                               | -         |
| shadowOffsetY                   | Edge shadow Y-axis offset                                                                                     | number                               | -         |
| shadowType                      | Edge shadow type                                                                                              | `inner` &#124; `outer` &#124; `both` | -         |
| sourcePort                      | Source port of the edge connection                                                                            | -                                    | string    |
| stroke                          | Edge color                                                                                                    | `#000`                               | string    |
| strokeOpacity                   | Edge color opacity                                                                                            | number                               | 1         |
| targetPort                      | Target port of the edge connection                                                                            | -                                    | string    |
| transform                       | The transform attribute allows you to rotate, scale, skew, or translate the given edge                        | string                               | -         |
| transformOrigin                 | Rotation and scaling center, also known as the transformation center                                          | string                               | -         |
| visibility                      | Whether the edge is visible                                                                                   | `visible` &#124; `hidden`            | `visible` |
| zIndex                          | Edge rendering level                                                                                          | number                               | 1         |

#### PointerEvents

Optional values are:
`visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

#### Cursor

Optional values are: `auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

**Example:**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // Edge color
      lineWidth: 2, // Edge width
    },
  },
});
```

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: { fill: '#1783FF' },
  },
  edge: {
    style: {
      stroke: '#FF0000', // Edge color
      lineWidth: 2, // Edge width
    },
  },
});

graph.render();
```

### Label Style

| Attribute                     | Description                                                                                                                                                                                                                                                                                                                                                                      | Type                                                                              | Default    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------- |
| label                         | Whether the edge label is displayed                                                                                                                                                                                                                                                                                                                                              | boolean                                                                           | true       |
| labelAutoRotate               | Whether the edge label auto-rotates to keep consistent with the edge direction                                                                                                                                                                                                                                                                                                   | boolean                                                                           | true       |
| labelBackground               | Whether the edge label displays a background                                                                                                                                                                                                                                                                                                                                     | boolean                                                                           | false      |
| labelBackgroundClass          | Edge label background className                                                                                                                                                                                                                                                                                                                                                  | string                                                                            | -          |
| labelBackgroundCursor         | Edge label background mouse hover style, [configuration item](#cursor)                                                                                                                                                                                                                                                                                                           | string                                                                            | `default`  |
| labelBackgroundFill           | Edge label background fill color                                                                                                                                                                                                                                                                                                                                                 | string                                                                            | -          |
| labelBackgroundFillOpacity    | Edge label background opacity                                                                                                                                                                                                                                                                                                                                                    | number                                                                            | 1          |
| labelBackgroundHeight         | Edge label background height                                                                                                                                                                                                                                                                                                                                                     | string &#124; number                                                              | -          |
| labelBackgroundLineDash       | Edge label background dashed line configuration                                                                                                                                                                                                                                                                                                                                  | number &#124; string &#124;(number &#124; string )[]                              | -          |
| labelBackgroundLineDashOffset | Edge label background dashed line offset                                                                                                                                                                                                                                                                                                                                         | number                                                                            | -          |
| labelBackgroundLineWidth      | Edge label background stroke width                                                                                                                                                                                                                                                                                                                                               | number                                                                            | -          |
| labelBackgroundRadius         | Edge label background corner radius <br> - number: Set four corner radii uniformly <br> - number[]: Set four corner radii separately, automatically supplementing missing parts                                                                                                                                                                                                  | number &#124; number[]                                                            | 0          |
| labelBackgroundShadowBlur     | Edge label background shadow blur degree                                                                                                                                                                                                                                                                                                                                         | number                                                                            | -          |
| labelBackgroundShadowColor    | Edge label background shadow color                                                                                                                                                                                                                                                                                                                                               | string                                                                            | -          |
| labelBackgroundShadowOffsetX  | Edge label background shadow X direction offset                                                                                                                                                                                                                                                                                                                                  | number                                                                            | -          |
| labelBackgroundShadowOffsetY  | Edge label background shadow Y direction offset                                                                                                                                                                                                                                                                                                                                  | number                                                                            | -          |
| labelBackgroundStroke         | Edge label background stroke color                                                                                                                                                                                                                                                                                                                                               | string                                                                            | -          |
| labelBackgroundStrokeOpacity  | Edge label background stroke opacity                                                                                                                                                                                                                                                                                                                                             | number &#124; string                                                              | 1          |
| labelBackgroundVisibility     | Whether the edge label background is visible                                                                                                                                                                                                                                                                                                                                     | `visible` &#124; `hidden`                                                         | -          |
| labelBackgroundZIndex         | Edge label background rendering level                                                                                                                                                                                                                                                                                                                                            | number                                                                            | -          |
| labelClass                    | Edge label className                                                                                                                                                                                                                                                                                                                                                             | string                                                                            | -          |
| labelCursor                   | Edge label mouse hover style, [configuration item](#cursor)                                                                                                                                                                                                                                                                                                                      | string                                                                            | `default`  |
| labelFill                     | Edge label text color                                                                                                                                                                                                                                                                                                                                                            | string                                                                            | -          |
| labelFillOpacity              | Edge label text color opacity                                                                                                                                                                                                                                                                                                                                                    | string                                                                            | 1          |
| labelFillRule                 | Edge label text fill rule                                                                                                                                                                                                                                                                                                                                                        | `nonzero` &#124; `evenodd`                                                        | -          |
| labelFilter                   | Edge label text filter                                                                                                                                                                                                                                                                                                                                                           | string                                                                            | -          |
| labelFontFamily               | Edge label text font family                                                                                                                                                                                                                                                                                                                                                      | `system-ui, sans-serif`                                                           | -          |
| labelFontSize                 | Edge label font size                                                                                                                                                                                                                                                                                                                                                             | number                                                                            | 12         |
| labelFontStyle                | Edge label text font style                                                                                                                                                                                                                                                                                                                                                       | `normal` &#124; `italic` &#124; `oblique`                                         | -          |
| labelFontVariant              | Edge label text font variant                                                                                                                                                                                                                                                                                                                                                     | `normal` &#124; `small-caps`                                                      | -          |
| labelFontWeight               | Edge label font weight                                                                                                                                                                                                                                                                                                                                                           | number &#124; string                                                              | `normal`   |
| labelLeading                  | Edge label text line spacing                                                                                                                                                                                                                                                                                                                                                     | number                                                                            | -          |
| labelLetterSpacing            | Edge label text letter spacing                                                                                                                                                                                                                                                                                                                                                   | number                                                                            | -          |
| labelMaxLines                 | Edge label text maximum number of lines                                                                                                                                                                                                                                                                                                                                          | number                                                                            | 1          |
| labelMaxWidth                 | Edge label maximum width. When auto-wrapping is enabled, it will wrap if it exceeds this width <br> - string: Define the maximum width as a percentage of the edge width. For example, `50%` means the label width does not exceed half of the edge width <br> - number: Define the maximum width in pixels. For example, 100 means the maximum width of the label is 100 pixels | number &#124; string                                                              | `80%`      |
| labelOffsetX                  | Label offset in the x-axis direction                                                                                                                                                                                                                                                                                                                                             | number                                                                            | 4          |
| labelOffsetY                  | Edge label offset in the y-axis direction                                                                                                                                                                                                                                                                                                                                        | number                                                                            | 0          |
| labelOpacity                  | Overall opacity of the edge label                                                                                                                                                                                                                                                                                                                                                | number                                                                            | 1          |
| labelPadding                  | Edge label padding                                                                                                                                                                                                                                                                                                                                                               | number &#124; number[]                                                            | 0          |
| labelPlacement                | Position of the edge label relative to the edge. The value range is `start`, `center`, `end`, or a specific ratio (number 0-1)                                                                                                                                                                                                                                                   | `start` &#124; `center` &#124; `end` &#124; number                                | `center`   |
| labelText                     | Edge label text content                                                                                                                                                                                                                                                                                                                                                          | string                                                                            | -          |
| labelTextAlign                | Edge label text alignment                                                                                                                                                                                                                                                                                                                                                        | `start` &#124; `center` &#124; `middle` &#124; `end` &#124; `left` &#124; `right` | `left`     |
| labelTextBaseLine             | Edge label text baseline                                                                                                                                                                                                                                                                                                                                                         | `top` &#124; `hanging` &#124; `middle` &#124; `alphabetic` &#124; `ideographic`   | `middle`   |
| labelTextDecorationColor      | Edge label text decoration line color                                                                                                                                                                                                                                                                                                                                            | string                                                                            | -          |
| labelTextDecorationLine       | Edge label text decoration line                                                                                                                                                                                                                                                                                                                                                  | string                                                                            | -          |
| labelTextDecorationStyle      | Edge label text decoration line style                                                                                                                                                                                                                                                                                                                                            | `solid` &#124; `double` &#124; `dotted` &#124; `dashed` &#124; `wavy`             | -          |
| labelTextOverflow             | Edge label text overflow handling method                                                                                                                                                                                                                                                                                                                                         | `clip` &#124; `ellipsis` &#124; string                                            | `ellipsis` |
| labelVisibility               | Whether the edge label is visible                                                                                                                                                                                                                                                                                                                                                | `visible` &#124; `hidden`                                                         | `visible`  |
| labelWordWrap                 | Whether the edge label enables auto-wrapping. When labelWordWrap is enabled, it will wrap if it exceeds labelMaxWidth                                                                                                                                                                                                                                                            | boolean                                                                           | false      |
| labelZIndex                   | Edge label rendering level                                                                                                                                                                                                                                                                                                                                                       | number                                                                            | -          |

**Example:**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // Edge color
      lineWidth: 2, // Edge width
      label: true, // Enable edge label display
      labelText: 'labelText', // Edge label text
      labelPlacement: 'center', // Position of the edge label relative to the edge
      labelFill: '#FF0000', // Edge label text color
      labelOffsetY: 20, // Edge label offset in the y-axis direction
    },
  },
});
```

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: { fill: '#1783FF' },
  },
  edge: {
    style: {
      stroke: '#FF0000', // Edge color
      lineWidth: 2, // Edge width
      label: true, // Enable edge label display
      labelText: 'labelText', // Edge label text
      labelPlacement: 'center', // Position of the edge label relative to the edge
      labelFill: '#FF0000', // Edge label text color
      labelOffsetY: 20, // Edge label offset in the y-axis direction
    },
  },
});

graph.render();
```

### Halo Style

| Attribute         | Description                                                                                   | Type                                                 | Default                                            |
| ----------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| halo              | Whether the edge halo is displayed                                                            | boolean                                              | false                                              |
| haloClass         | Edge halo className                                                                           | string                                               | -                                                  |
| haloCursor        | Edge halo mouse hover style, [configuration item](#cursor)                                    | strig                                                | `default`                                          |
| haloDraggable     | Whether the edge halo is draggable                                                            | boolean                                              | -                                                  |
| haloDroppable     | Whether the edge halo can receive dragged elements                                            | boolean                                              | false                                              |
| haloFillRule      | Edge halo fill rule                                                                           | `nonzero` &#124; `evenodd`                           | -                                                  |
| haloFilter        | Edge halo filter                                                                              | string                                               | -                                                  |
| haloLineDash      | Edge halo stroke dashed line style                                                            | number &#124; string &#124; (number &#124; string)[] | 0                                                  |
| haloLineWidth     | Edge halo stroke width                                                                        | number                                               | 3                                                  |
| haloPointerEvents | Whether the edge halo effect responds to pointer events, [configuration item](#pointerevents) | string                                               | `none`                                             |
| haloStroke        | Edge halo stroke color                                                                        | string                                               | Consistent with the fill color of the main graphic |
| haloStrokeOpacity | Edge halo stroke color opacity                                                                | number                                               | 0.25                                               |
| haloVisibility    | Edge halo visibility                                                                          | `visible` &#124; `hidden`                            | `visible`                                          |
| haloZIndex        | Edge halo rendering level                                                                     | number                                               | -1                                                 |

**Example:**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // Edge color
      lineWidth: 2, // Edge width
      label: true, // Enable edge label display
      labelText: 'labelText', // Edge label text
      labelPlacement: 'center', // Position of the edge label relative to the edge
      labelFill: '#FF0000', // Edge label text color
      labelOffsetY: 20, // Edge label offset in the y-axis direction
      halo: true, // Enable edge halo
      haloStroke: '#000', // Edge halo color
      haloStrokeOpacity: 0.2, // Edge halo opacity
    },
  },
});
```

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: { fill: '#1783FF' },
  },
  edge: {
    style: {
      stroke: '#FF0000', // Edge color
      lineWidth: 2, // Edge width
      label: true, // Enable edge label display
      labelText: 'labelText', // Edge label text
      labelPlacement: 'center', // Position of the edge label relative to the edge
      labelFill: '#FF0000', // Edge label text color
      labelOffsetY: 20, // Edge label offset in the y-axis direction
      halo: true, // Enable edge halo
      haloStroke: '#000', // Edge halo color
      haloStrokeOpacity: 0.2, // Edge halo opacity
    },
  },
});

graph.render();
```

### Badge Style

| Attribute                     | Description                                                                                                                                                                                                                                                                                                | Type                                                                                            | Default      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------ |
| badge                         | Whether the edge badge is displayed                                                                                                                                                                                                                                                                        | boolean                                                                                         | true         |
| badgeBackground               | Whether the edge badge displays a background                                                                                                                                                                                                                                                               | boolean                                                                                         | true         |
| badgeBackgroundClass          | Edge badge background className                                                                                                                                                                                                                                                                            | string                                                                                          | -            |
| badgeBackgroundCursor         | Edge badge background mouse hover style, [configuration item](#cursor)                                                                                                                                                                                                                                     | string                                                                                          | `default`    |
| badgeBackgroundFill           | Edge badge background fill color. If not specified, badgePalette is preferred to be assigned in order                                                                                                                                                                                                      | string                                                                                          | -            |
| badgeBackgroundFillOpacity    | Edge badge background fill opacity                                                                                                                                                                                                                                                                         | number                                                                                          | 1            |
| badgeBackgroundFilter         | Edge badge background filter                                                                                                                                                                                                                                                                               | string                                                                                          | -            |
| badgeBackgroundHeight         | Edge badge background height                                                                                                                                                                                                                                                                               | number &#124; string                                                                            | -            |
| badgeBackgroundLineDash       | Edge badge background dashed line configuration                                                                                                                                                                                                                                                            | number &#124; string &#124;(number &#124; string )[]                                            | -            |
| badgeBackgroundLineDashOffset | Edge badge background dashed line offset                                                                                                                                                                                                                                                                   | number                                                                                          | -            |
| badgeBackgroundLineWidth      | Edge badge background stroke width                                                                                                                                                                                                                                                                         | number                                                                                          | -            |
| badgeBackgroundOpacity        | Edge badge background opacity                                                                                                                                                                                                                                                                              | number                                                                                          | 1            |
| badgeBackgroundRadius         | Edge badge background corner radius <br> - number: Set four corner radii uniformly <br> - number[]: Set four corner radii separately, supplementing missing parts <br> - string: Similar to the [CSS padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) property, using spaces to separate | number &#124; number[] &#124; string                                                            | `50%`        |
| badgeBackgroundShadowBlur     | Edge badge background shadow blur degree                                                                                                                                                                                                                                                                   | number                                                                                          | -            |
| badgeBackgroundShadowColor    | Edge badge background shadow color                                                                                                                                                                                                                                                                         | string                                                                                          | -            |
| badgeBackgroundShadowOffsetX  | Edge badge background shadow X direction offset                                                                                                                                                                                                                                                            | number                                                                                          | -            |
| badgeBackgroundShadowOffsetY  | Edge badge background shadow Y direction offset                                                                                                                                                                                                                                                            | number                                                                                          | -            |
| badgeBackgroundStroke         | Edge badge background stroke color                                                                                                                                                                                                                                                                         | string                                                                                          | -            |
| badgeBackgroundStrokeOpacity  | Edge badge background stroke opacity                                                                                                                                                                                                                                                                       | number &#124; string                                                                            | 1            |
| badgeBackgroundVisibility     | Whether the edge badge background is visible                                                                                                                                                                                                                                                               | `visible` &#124; `hidden`                                                                       | `visible`    |
| badgeBackgroundZIndex         | Edge badge background rendering level                                                                                                                                                                                                                                                                      | number                                                                                          | -            |
| badgeFill                     | Edge badge text color                                                                                                                                                                                                                                                                                      | string                                                                                          | -            |
| badgeFontSize                 | Edge badge font size                                                                                                                                                                                                                                                                                       | number                                                                                          | 10           |
| badgeFontVariant              | Edge badge font variant                                                                                                                                                                                                                                                                                    | `normal` &#124; `small-caps` &#124; string                                                      | `normal`     |
| badgeFontWeight               | Edge badge font weight                                                                                                                                                                                                                                                                                     | number &#124; string                                                                            | `normal`     |
| badgeLineHeight               | Edge badge line height                                                                                                                                                                                                                                                                                     | string &#124; number                                                                            | -            |
| badgeLineWidth                | Edge badge line width                                                                                                                                                                                                                                                                                      | string &#124; number                                                                            | -            |
| badgeMaxLines                 | Edge badge text maximum number of lines                                                                                                                                                                                                                                                                    | number                                                                                          | 1            |
| badgeOffsetX                  | Edge badge offset in the x-axis direction                                                                                                                                                                                                                                                                  | number                                                                                          | 0            |
| badgeOffsetY                  | Edge badge offset in the y-axis direction                                                                                                                                                                                                                                                                  | number                                                                                          | 0            |
| badgePadding                  | Edge badge padding                                                                                                                                                                                                                                                                                         | number &#124; number[]                                                                          | [2, 4, 2, 4] |
| badgePlacement                | Position of the edge badge relative to the main graphic of the edge                                                                                                                                                                                                                                        | `prefix` &#124; `suffix`                                                                        | `suffix`     |
| badgeText                     | Edge badge text content                                                                                                                                                                                                                                                                                    | string                                                                                          | -            |
| badgeTextAlign                | Edge badge text horizontal alignment                                                                                                                                                                                                                                                                       | `start` &#124; `center` &#124; `middle` &#124; `end` &#124; `left` &#124; `right`               | `left`       |
| badgeTextBaseline             | Edge badge text baseline                                                                                                                                                                                                                                                                                   | `top` &#124; `hanging` &#124; `middle` &#124; `alphabetic` &#124; `ideographic` &#124; `bottom` | `alphabetic` |
| badgeTextDecorationColor      | Edge badge text decoration line color                                                                                                                                                                                                                                                                      | string                                                                                          | -            |
| badgeTextDecorationLine       | Edge badge text decoration line                                                                                                                                                                                                                                                                            | string                                                                                          | -            |
| badgeTextDecorationStyle      | Edge badge text decoration line style                                                                                                                                                                                                                                                                      | `solid` &#124; `double` &#124; `dotted` &#124; `dashed` &#124; `wavy`                           | `solid`      |
| badgeTextOverflow             | Edge badge text overflow handling method                                                                                                                                                                                                                                                                   | `clip` &#124; `ellipsis` &#124; string                                                          | `clip`       |
| badgeVisibility               | Whether the edge badge is visible                                                                                                                                                                                                                                                                          | `visible` &#124; `hidden`                                                                       | -            |
| badgeWordWrap                 | Whether the edge badge text automatically wraps, it will wrap if it exceeds badgeWordWrapWidth                                                                                                                                                                                                             | boolean                                                                                         | -            |
| badgeWordWrapWidth            | Edge badge text wrap width                                                                                                                                                                                                                                                                                 | number                                                                                          | -            |
| badgeZIndex                   | Edge badge rendering level                                                                                                                                                                                                                                                                                 | number                                                                                          | 1            |

**Example:**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // Edge color
      lineWidth: 2, // Edge width
      label: true, // Enable edge label display
      labelText: 'labelText', // Edge label text
      labelPlacement: 'center', // Position of the edge label relative to the edge
      labelFill: '#FF0000', // Edge label text color
      labelOffsetY: 20, // Edge label offset in the y-axis direction
      halo: true, // Enable edge halo
      haloStroke: '#000', // Edge halo color
      haloStrokeOpacity: 0.2, // Edge halo opacity
      badgeText: 'badge', // Edge badge text
      badgeFill: 'green', // Edge badge text color
      badgeOffsetX: -20, // Edge badge offset in the x-axis direction
      badgeBackground: true, // Enable edge badge background
    },
  },
});
```

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: { fill: '#1783FF' },
  },
  edge: {
    style: {
      stroke: '#FF0000', // Edge color
      lineWidth: 2, // Edge width
      label: true, // Enable edge label display
      labelText: 'labelText', // Edge label text
      labelPlacement: 'center', // Position of the edge label relative to the edge
      labelFill: '#FF0000', // Edge label text color
      labelOffsetY: 20, // Edge label offset in the y-axis direction
      halo: true, // Enable edge halo
      haloStroke: '#000', // Edge halo color
      haloStrokeOpacity: 0.2, // Edge halo opacity
      badgeText: 'badge', // Edge badge text
      badgeFill: 'green', // Edge badge text color
      badgeOffsetX: -20, // Edge badge offset in the x-axis direction
      badgeBackground: true, // Enable edge badge background
    },
  },
});

graph.render();
```

### Start Arrow Style

| Attribute                                 | Description                                                                                                                                      | Type                                                                                                                                                               | Default                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| startArrow                                | Whether the edge start arrow is displayed                                                                                                        | boolean                                                                                                                                                            | false                                     |
| startArrowClass                           | Edge start arrow className                                                                                                                       | string                                                                                                                                                             | -                                         |
| startArrowCursor                          | Edge start arrow mouse hover style, [configuration item](#cursor)                                                                                | string                                                                                                                                                             | `default`                                 |
| startArrowFill                            | Edge start arrow fill color                                                                                                                      | string                                                                                                                                                             | Consistent with the edge color by default |
| startArrowFillOpacity                     | Overall opacity of the edge start arrow                                                                                                          | number                                                                                                                                                             | 1                                         |
| startArrowFillRule                        | Edge start arrow fill rule                                                                                                                       | `nonzero` &#124; `evenodd`                                                                                                                                         | -                                         |
| startArrowFilter                          | Edge start arrow filter                                                                                                                          | string                                                                                                                                                             | -                                         |
| startArrowIncreasedLineWidthForHitTesting | When the edge start arrow size is small, the interaction area also becomes smaller, we can enlarge this area to make the arrow easier to pick up | number                                                                                                                                                             | 0                                         |
| startArrowLineDash                        | Edge start arrow stroke dashed line configuration                                                                                                | number                                                                                                                                                             | 0                                         |
| startArrowLineDashOffset                  | Edge start arrow stroke dashed line offset                                                                                                       | number                                                                                                                                                             | 0                                         |
| startArrowLineJoin                        | Edge start arrow stroke join style                                                                                                               | `round` &#124; `bevel` &#124; `miter`                                                                                                                              | `round`                                   |
| startArrowOffset                          | Edge start arrow offset                                                                                                                          | number ｜0 ｜                                                                                                                                                      |
| startArrowOpacity                         | Edge start arrow opacity                                                                                                                         | number                                                                                                                                                             | 1                                         |
| startArrowShadowBlur                      | Edge start arrow shadow blur degree                                                                                                              | number                                                                                                                                                             | -                                         |
| startArrowShadowColor                     | Edge start arrow shadow color                                                                                                                    | string                                                                                                                                                             | -                                         |
| startArrowShadowOffsetX                   | Edge start arrow shadow X-axis offset                                                                                                            | number                                                                                                                                                             | 0                                         |
| startArrowShadowOffsetY                   | Edge start arrow shadow Y-axis offset                                                                                                            | number                                                                                                                                                             | 0                                         |
| startArrowSize                            | Edge start arrow size                                                                                                                            | number &#124; [number, number]                                                                                                                                     | -                                         |
| startArrowSrc                             | Edge start arrow image address (passing in the image address can replace the arrow with an image)                                                | string                                                                                                                                                             | -                                         |
| startArrowStroke                          | Edge start arrow stroke color                                                                                                                    | string                                                                                                                                                             | Consistent with the edge color by default |
| startArrowStrokeOpacity                   | Edge start arrow stroke opacity                                                                                                                  | number                                                                                                                                                             | 1                                         |
| startArrowTransform                       | Edge start arrow rotation, scaling, skewing, or translation configuration                                                                        | string                                                                                                                                                             | -                                         |
| startArrowTransformOrigin                 | Edge start arrow rotation and scaling center, also known as the transformation center                                                            | string                                                                                                                                                             | center                                    |
| startArrowType                            | Edge start arrow type                                                                                                                            | `triangle` &#124; `circle` &#124; `diamond` &#124; `vee` &#124; `rect` &#124; `triangleRect` &#124; `simple` &#124; ((width: number, height: number) => PathArray) | `vee`                                     |
| startArrowZIndex                          | Edge start arrow rendering level                                                                                                                 | number                                                                                                                                                             | -                                         |

**Example:**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // Edge color
      lineWidth: 2, // Edge width
      label: true, // Enable edge label display
      labelText: 'labelText', // Edge label text
      labelPlacement: 'center', // Position of the edge label relative to the edge
      labelFill: '#FF0000', // Edge label text color
      labelOffsetY: 20, // Edge label offset in the y-axis direction
      halo: true, // Enable edge halo
      haloStroke: '#000', // Edge halo color
      haloStrokeOpacity: 0.2, // Edge halo opacity
      badgeText: 'badge', // Edge badge text
      badgeFill: 'green', // Edge badge text color
      badgeOffsetX: -20, // Edge badge offset in the x-axis direction
      badgeBackground: true, // Enable edge badge background
      startArrow: true, // Enable edge start arrow
      startArrowFill: 'yellow', // Edge start arrow fill color
    },
  },
});
```

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: { fill: '#1783FF' },
  },
  edge: {
    style: {
      stroke: '#FF0000', // Edge color
      lineWidth: 2, // Edge width
      label: true, // Enable edge label display
      labelText: 'labelText', // Edge label text
      labelPlacement: 'center', // Position of the edge label relative to the edge
      labelFill: '#FF0000', // Edge label text color
      labelOffsetY: 20, // Edge label offset in the y-axis direction
      halo: true, // Enable edge halo
      haloStroke: '#000', // Edge halo color
      haloStrokeOpacity: 0.2, // Edge halo opacity
      badgeText: 'badge', // Edge badge text
      badgeFill: 'green', // Edge badge text color
      badgeOffsetX: -20, // Edge badge offset in the x-axis direction
      badgeBackground: true, // Enable edge badge background
      startArrow: true, // Enable edge start arrow
      startArrowFill: 'yellow', // Edge start arrow fill color
    },
  },
});

graph.render();
```

### End Arrow Style

| Attribute                               | Description                                                                                                                                    | Type                                                                                                                                                               | Default                                   |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| endArrow                                | Whether the edge end arrow is displayed                                                                                                        | boolean                                                                                                                                                            | false                                     |
| endArrowClass                           | Edge end arrow className                                                                                                                       | string                                                                                                                                                             | -                                         |
| endArrowCursor                          | Edge end arrow mouse hover style, [configuration item](#cursor)                                                                                | string                                                                                                                                                             | `default`                                 |
| endArrowFill                            | Edge end arrow fill color                                                                                                                      | string                                                                                                                                                             | Consistent with the edge color by default |
| endArrowFillOpacity                     | Overall opacity of the edge end arrow                                                                                                          | number                                                                                                                                                             | 1                                         |
| endArrowFillRule                        | Edge end arrow fill rule                                                                                                                       | `nonzero` &#124; `evenodd`                                                                                                                                         | -                                         |
| endArrowFilter                          | Edge end arrow filter                                                                                                                          | string                                                                                                                                                             | -                                         |
| endArrowIncreasedLineWidthForHitTesting | When the edge end arrow size is small, the interaction area also becomes smaller, we can enlarge this area to make the arrow easier to pick up | number                                                                                                                                                             | 0                                         |
| endArrowLineDash                        | Edge end arrow stroke dashed line configuration                                                                                                | number                                                                                                                                                             | 0                                         |
| endArrowLineDashOffset                  | Edge end arrow stroke dashed line offset                                                                                                       | number                                                                                                                                                             | 0                                         |
| endArrowLineJoin                        | Edge end arrow stroke join style                                                                                                               | `round` &#124; `bevel` &#124; `miter`                                                                                                                              | `round`                                   |
| endArrowOffset                          | Edge end arrow offset                                                                                                                          | number                                                                                                                                                             | 0                                         |
| endArrowOpacity                         | Edge end arrow opacity                                                                                                                         | number                                                                                                                                                             | 1                                         |
| endArrowShadowBlur                      | Edge end arrow shadow blur degree                                                                                                              | number                                                                                                                                                             | -                                         |
| endArrowShadowColor                     | Edge end arrow shadow color                                                                                                                    | string                                                                                                                                                             | -                                         |
| endArrowShadowOffsetX                   | Edge end arrow shadow X-axis offset                                                                                                            | number                                                                                                                                                             | 0                                         |
| endArrowShadowOffsetY                   | Edge end arrow shadow Y-axis offset                                                                                                            | number                                                                                                                                                             | 0                                         |
| endArrowSize                            | Edge end arrow size                                                                                                                            | number &#124; [number, number]                                                                                                                                     | -                                         |
| endArrowSrc                             | Edge end arrow image address (passing in the image address can replace the arrow with an image)                                                | string                                                                                                                                                             | -                                         |
| endArrowStroke                          | Edge end arrow stroke color                                                                                                                    | string                                                                                                                                                             | Consistent with the edge color by default |
| endArrowStrokeOpacity                   | Edge end arrow stroke opacity                                                                                                                  | number                                                                                                                                                             | 1                                         |
| endArrowTransform                       | Edge end arrow rotation, scaling, skewing, or translation configuration                                                                        | string                                                                                                                                                             | -                                         |
| endArrowTransformOrigin                 | Edge end arrow rotation and scaling center, also known as the transformation center                                                            | string                                                                                                                                                             | center                                    |
| endArrowType                            | Edge end arrow type                                                                                                                            | `triangle` &#124; `circle` &#124; `diamond` &#124; `vee` &#124; `rect` &#124; `triangleRect` &#124; `simple` &#124; ((width: number, height: number) => PathArray) | `vee`                                     |
| endArrowZIndex                          | Edge end arrow rendering level                                                                                                                 | number                                                                                                                                                             | -                                         |

**Example:**

```js {4-6}
const graph = new Graph({
  edge: {
    style: {
      stroke: '#1783F', // Edge color
      lineWidth: 2, // Edge width
      label: true, // Enable edge label display
      labelText: 'labelText', // Edge label text
      labelPlacement: 'center', // Position of the edge label relative to the edge
      labelFill: '#FF0000', // Edge label text color
      labelOffsetY: 20, // Edge label offset in the y-axis direction
      halo: true, // Enable edge halo
      haloStroke: '#000', // Edge halo color
      haloStrokeOpacity: 0.2, // Edge halo opacity
      badgeText: 'badge', // Edge badge text
      badgeFill: 'green', // Edge badge text color
      badgeOffsetX: 20, // Edge badge offset in the x-axis direction
      badgePlacement: 'prefix', // Position of the edge badge relative to the edge
      badgeBackground: true, // Enable edge badge background
      endArrow: true, // Enable edge end arrow
      endArrowFill: 'yellow', // Edge end arrow fill color
    },
  },
});
```

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: { fill: '#1783FF' },
  },
  edge: {
    style: {
      stroke: '#FF0000', // Edge color
      lineWidth: 2, // Edge width
      label: true, // Enable edge label display
      labelText: 'labelText', // Edge label text
      labelPlacement: 'center', // Position of the edge label relative to the edge
      labelFill: '#FF0000', // Edge label text color
      labelOffsetY: 20, // Edge label offset in the y-axis direction
      halo: true, // Enable edge halo
      haloStroke: '#000', // Edge halo color
      haloStrokeOpacity: 0.2, // Edge halo opacity
      badgeText: 'badge', // Edge badge text
      badgeFill: 'green', // Edge badge text color
      badgeOffsetX: 20, // Edge badge offset in the x-axis direction
      badgePlacement: 'prefix', // Position of the edge badge relative to the edge
      badgeBackground: true, // Enable edge badge background
      endArrow: true, // Enable edge end arrow
      endArrowFill: 'yellow', // Edge end arrow fill color
    },
  },
});

graph.render();
```

### Loop Edge Style

| Attribute     | Description                                                                                            | Type                                                                                                                                                                                                               | Default                                         |
| ------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| loop          | Whether to enable loop edges                                                                           | boolean                                                                                                                                                                                                            | true                                            |
| loopClockwise | Specify whether to draw the loop clockwise                                                             | boolean                                                                                                                                                                                                            | true                                            |
| loopDist      | Distance from the node keyShape edge to the top of the loop, used to specify the curvature of the loop | number                                                                                                                                                                                                             | The maximum value of width or height by default |
| loopPlacement | Position of the edge                                                                                   | 'left' &#124; 'right' &#124; 'top' &#124; 'bottom' &#124; 'left-top' &#124; 'left-bottom' &#124; 'right-top' &#124; 'right-bottom' &#124; 'top-left' &#124; 'top-right' &#124; 'bottom-left' &#124; 'bottom-right' | 'top'                                           |

**Example:**

```js {4-6}
const graph = new Graph({
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [
      { source: 'node1', target: 'node1', id: 'left' },
      { source: 'node2', target: 'node2', id: 'right' },
    ],
  },
  node: {
    style: { fill: '#1783FF' },
  },
  edge: {
    style: {
      loopPlacement: (d) => d.id, // Set the position of the loop based on the edge configuration
      endArrow: true, // Enable edge end arrow
    },
  },
});
```

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 100,
  data: {
    nodes: [
      { id: 'node1', style: { x: 60, y: 40 } },
      { id: 'node2', style: { x: 180, y: 40 } },
    ],
    edges: [
      { source: 'node1', target: 'node1', id: 'left' },
      { source: 'node2', target: 'node2', id: 'right' },
    ],
  },
  node: {
    style: { fill: '#1783FF' },
  },
  edge: {
    style: {
      loopPlacement: (d) => d.id, // Set the position of the loop based on the edge configuration
      endArrow: true, // Enable edge end arrow
    },
  },
});

graph.render();
```

## State

In some interactive behaviors, such as clicking to select an edge or hovering to activate an edge, it is merely marking certain states on the element. To reflect these states in the visual space seen by the end user, we need to set different graphic element styles for different states to respond to the changes in the element's state.

G6 provides several built-in states, including selected, highlight, active, inactive, and disabled. Additionally, it supports custom states to meet more specific needs. For each state, developers can define a set of style rules that will override the default styles of the element.

<img width="520" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ebBlTpKu2WUAAAAAAAAAAAAADmJ7AQ/original" />

The data structure is as follows:

```typescript
type EdgeState = {
  [state: string]: EdgeStyle;
};
```

For example, when an edge is in the `focus` state, you can add a halo with a width of 6 and a color of yellow.

```js {8-11}
const graph = new Graph({
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }],
    edges: [{ source: 'node1', target: 'node2', states: ['focus'] }],
  },
  edge: {
    state: {
      focus: {
        halo: true,
        haloLineWidth: 6,
        haloStroke: 'yellow',
      },
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
});
```

The effect is as shown below:

```js | ob {  pin: false , autoMount: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 300,
  height: 100,
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }],
    edges: [{ source: 'node1', target: 'node2', states: ['focus'] }],
  },
  edge: {
    state: {
      focus: {
        halo: true,
        haloLineWidth: 6,
        haloStroke: 'yellow',
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

Define the animation effects of edges, supporting the following two configuration methods:

1. Turn off all edge animations

```json
{
  "edge": {
    "animation": false
  }
}
```

2. Configure stage animations

Stage animations refer to the animation effects of edges when entering the canvas, updating, and leaving the canvas. The currently supported stages include:

- `enter`: Animation when the edge enters the canvas
- `update`: Animation when the edge is updated
- `exit`: Animation when the edge leaves the canvas
- `show`: Animation when the edge is displayed from a hidden state
- `hide`: Animation when the edge is hidden
- `collapse`: Animation when the edge is collapsed
- `expand`: Animation when the edge is expanded

You can refer to [Animation Paradigm](/en/manual/animation/animation#animation-paradigm) to use animation syntax to configure edges, such as:

```json
{
  "node": {
    "animation": {
      "update": [
        {
          "fields": ["stroke"], // Only animate the stroke attribute during update
          "duration": 1000, // Animation duration
          "easing": "linear" // Easing function
        }
      ],
  }
}
```

You can also use built-in animation effects:

```json
{
  "node": {
    "animation": {
      "enter": "fade", // Use fade animation
      "exit": "fade" // Use fade animation
    }
  }
}
```

You can pass in false to turn off animations for specific stages:

```json
{
  "node": {
    "animation": {
      "enter": false // Turn off edge entrance animation
    }
  }
}
```

## Palette

Define the palette of edges, which is a predefined color pool, and assign colors to the `stroke` attribute according to rules.

> For the definition of palettes, please refer to [Palette](/en/manual/theme/palette).

| Attribute | Description                                                                                                                    | Type                              | Default |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | ------- |
| type      | Specify the current palette type. <br> - `group`: Discrete palette <br> - `value`: Continuous palette                          | `group` &#124; `value`            | `group` |
| field     | Specify the grouping field in the element data. If not specified, the id is used as the grouping field by default              | string &#124; ((datum) => string) | `id`    |
| color     | Palette color. If the palette is registered, you can directly specify its registration name, and it also accepts a color array | string &#124; string[]            | -       |
| invert    | Whether to invert the palette                                                                                                  | boolean                           | false   |

For example, assign node colors according to the `direction` field of a set of data, so that nodes of the same category have the same color:

```js {23}
const graph = new Graph({
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
```

The effect is as shown below:

```js | ob {  pin: false , autoMount: true }
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

You can also use the default configuration:

```json
{
  "edge": {
    "palette": "tableau" // tableau is the palette name, colors are assigned based on ID by default
  }
}
```

The effect is as shown below:

```js | ob {  pin: false , autoMount: true }
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
