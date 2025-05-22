---
title: Common Node Configurations
order: 0
---

This document introduces the common attribute configurations for built-in nodes.

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

| Attribute | Description                                     | Type                    | Default  | Required |
| --------- | ----------------------------------------------- | ----------------------- | -------- | -------- |
| type      | Node type, name of built-in or custom node      | [Type](#type)           | `circle` |          |
| style     | Node style configuration, including color, size | [Style](#style)         | -        |          |
| state     | Style configuration for different states        | [State](#state)         | -        |          |
| palette   | Defines the node's palette for color mapping    | [Palette](#palette)     | -        |          |
| animation | Defines the node's animation effects            | [Animation](#animation) | -        |          |

## Type

Specifies the node type, either a built-in node type name or a custom node name. The default is `circle` (circle). **⚠️ Note**: This determines the shape of the main graphic.

```js {3}
const graph = new Graph({
  node: {
    type: 'circle',
  },
});
```

Available values include:

- `circle`: [Circle Node](/en/manual/element/node/build-in/circle)
- `diamond`: [Diamond Node](/en/manual/element/node/build-in/diamond)
- `donut`: [Donut Node](/en/manual/element/node/build-in/donut)
- `ellipse`: [Ellipse Node](/en/manual/element/node/build-in/ellipse)
- `hexagon`: [Hexagon Node](/en/manual/element/node/build-in/hexagon)
- `html`: [HTML Node](/en/manual/element/node/build-in/html)
- `image`: [Image Node](/en/manual/element/node/build-in/image)
- `rect`: [Rectangle Node](/en/manual/element/node/build-in/rect)
- `star`: [Star Node](/en/manual/element/node/build-in/star)
- `triangle`: [Triangle Node](/en/manual/element/node/build-in/triangle)

## Style

Defines the node's style, including color, size, etc.

```js {3}
const graph = new Graph({
  node: {
    style: {},
  },
});
```

A complete node consists of the following parts:

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ot4bSbBx97EAAAAAAAAAAAAADmJ7AQ/original" />

- `key`: The main graphic of the node, representing the primary shape, such as a rectangle or circle;
- `label`: Text label, usually used to display the node's name or description;
- `icon`: Icon graphic, usually used to display the node's icon, which can be an image or text icon;
- `badge`: A badge located at the top right corner of the node by default;
- `halo`: A halo effect graphic displayed around the main graphic;
- `port`: Connection points on the node for connecting edges.

The following style configurations will be explained in sequence by atomic graphics:

### Main Graphic Style

The main graphic is the core part of the node, defining the basic shape and appearance of the node:

| Attribute                       | Description                                                                                                                                       | Type                          | Default   | Required |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------- | -------- |
| collapsed                       | Whether the current node/group is collapsed                                                                                                       | boolean                       | false     |          |
| cursor                          | Node mouse hover style, [configuration item](#cursor)                                                                                             | string                        | default   |          |
| fill                            | Node fill color                                                                                                                                   | string                        | `#1783FF` |          |
| fillOpacity                     | Node fill color opacity                                                                                                                           | number \| string              | 1         |          |
| increasedLineWidthForHitTesting | When lineWidth is small, the interactive area also becomes smaller, sometimes we want to enlarge this area to make "thin lines" easier to pick up | number                        | 0         |          |
| lineCap                         | Node stroke end style                                                                                                                             | `round` \| `square` \| `butt` | `butt`    |          |
| lineDash                        | Node stroke dash style                                                                                                                            | number[]                      | -         |          |
| lineDashOffset                  | Node stroke dash offset                                                                                                                           | number                        | -         |          |
| lineJoin                        | Node stroke join style                                                                                                                            | `round` \| `bevel` \| `miter` | `miter`   |          |
| lineWidth                       | Node stroke width                                                                                                                                 | number                        | 1         |          |
| opacity                         | Node opacity                                                                                                                                      | number \| string              | 1         |          |
| shadowBlur                      | Node shadow blur                                                                                                                                  | number                        | -         |          |
| shadowColor                     | Node shadow color                                                                                                                                 | string                        | -         |          |
| shadowOffsetX                   | Node shadow offset in the x-axis direction                                                                                                        | number \| string              | -         |          |
| shadowOffsetY                   | Node shadow offset in the y-axis direction                                                                                                        | number \| string              | -         |          |
| shadowType                      | Node shadow type                                                                                                                                  | `inner` \| `outer`            | `outer`   |          |
| size                            | Node size, quick setting of node width and height, [configuration item](#size)                                                                    | number \| number[]            | 32        |          |
| stroke                          | Node stroke color                                                                                                                                 | string                        | `#000`    |          |
| strokeOpacity                   | Node stroke color opacity                                                                                                                         | number \| string              | 1         |          |
| transform                       | The transform attribute allows you to rotate, scale, skew, or translate the given node                                                            | string                        | -         |          |
| transformOrigin                 | Rotation and scaling center, also known as the transformation center                                                                              | string                        | -         |          |
| visibility                      | Whether the node is visible                                                                                                                       | `visible` \| `hidden`         | `visible` |          |
| x                               | Node x coordinate                                                                                                                                 | number                        | 0         |          |
| y                               | Node y coordinate                                                                                                                                 | number                        | 0         |          |
| z                               | Node z coordinate                                                                                                                                 | number                        | 0         |          |
| zIndex                          | Node rendering level                                                                                                                              | number                        | 0         |          |

#### Size

Node size, quick setting of node width and height, supports three configuration methods:

- number: Indicates that the node width and height are the same as the specified value
- [number, number]: Indicates that the node width and height are represented by the array elements in order, representing the width and height of the node
- [number, number, number]: Indicates that the node width and height are represented by the array elements in order, representing the width, height, and depth of the node

#### Cursor

Available values: `auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

**Example:**

```js {4-6}
const graph = new Graph({
  node: {
    style: {
      fill: '#1783FF', // Fill color
      stroke: '#000', // Stroke color
      lineWidth: 2, // Stroke width
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
    nodes: [{ id: 'node1', style: { x: 120, y: 40 } }],
  },
  node: {
    style: { fill: '#1783FF', stroke: '#000', lineWidth: 2 },
  },
});

graph.render();
```

### Label Style

Labels are used to display the text information of the node:

| Attribute                | Description                                                                                                                     | Type                                                                        | Default   | Required |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------- | -------- |
| label                    | Whether to display the node label                                                                                               | boolean                                                                     | true      |          |
| labelCursor              | Mouse hover style when hovering over the node label, [configuration item](#cursor)                                              | string                                                                      | `default` |          |
| labelFill                | Node label text color                                                                                                           | string                                                                      | -         |          |
| labelFontFamily          | Node label font family                                                                                                          | string                                                                      | -         |          |
| labelFontSize            | Node label font size                                                                                                            | number                                                                      | 12        |          |
| labelFontStyle           | Node label font style                                                                                                           | `normal` \| `italic` \| `oblique`                                           | -         |          |
| labelFontVariant         | Node label font variant                                                                                                         | `normal` \| `small-caps` \| string                                          | -         |          |
| labelFontWeight          | Node label font weight                                                                                                          | `normal` \| `bold` \| `bolder` \| `lighter` \| number                       | -         |          |
| labelLeading             | Line spacing                                                                                                                    | number                                                                      | 0         |          |
| labelLetterSpacing       | Node label letter spacing                                                                                                       | number \| string                                                            | -         |          |
| labelLineHeight          | Node label line height                                                                                                          | number \| string                                                            | -         |          |
| labelMaxLines            | Maximum number of lines for the node label                                                                                      | number                                                                      | 1         |          |
| labelMaxWidth            | Maximum width of the node label, [configuration item](#labelmaxwidth)                                                           | number \| string                                                            | `200%`    |          |
| labelOffsetX             | Node label offset in the x-axis direction                                                                                       | number                                                                      | 0         |          |
| labelOffsetY             | Node label offset in the y-axis direction                                                                                       | number                                                                      | 0         |          |
| labelPadding             | Node label padding                                                                                                              | number \| number[]                                                          | 0         |          |
| labelPlacement           | Node label position relative to the main graphic of the node, [configuration item](#labelplacement)                             | string                                                                      | `bottom`  |          |
| labelText                | Node label text content                                                                                                         | string                                                                      | -         |          |
| labelTextAlign           | Node label text horizontal alignment                                                                                            | `start` \| `center` \| `middle` \| `end` \| `left` \| `right'               | `left`    |          |
| labelTextBaseline        | Node label text baseline                                                                                                        | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | -         |          |
| labelTextDecorationColor | Node label text decoration line color                                                                                           | string                                                                      | -         |          |
| labelTextDecorationLine  | Node label text decoration line                                                                                                 | string                                                                      | -         |          |
| labelTextDecorationStyle | Node label text decoration line style                                                                                           | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | -         |          |
| labelTextOverflow        | Node label text overflow handling                                                                                               | `clip` \| `ellipsis` \| string                                              | -         |          |
| labelTextPath            | Node label text path                                                                                                            | Path                                                                        | -         |          |
| labelWordWrap            | Whether the node label automatically wraps. When labelWordWrap is enabled, the part exceeding labelMaxWidth automatically wraps | boolean                                                                     | false     |          |
| labelZIndex              | Node label rendering level                                                                                                      | number                                                                      | 0         |          |

#### LabelPlacement

Available values: `left` | `right` | `top` | `bottom` | `left-top` | `left-bottom` | `right-top` | `right-bottom` | `top-left` | `top-right` | `bottom-left` | `bottom-right` | `center` | `bottom`

#### LabelMaxWidth

When automatic wrapping `labelWordWrap` is enabled, it wraps when exceeding this width:

- string: Defines the maximum width as a percentage of the node width. For example, `50%` means the label width does not exceed half of the node width
- number: Defines the maximum width in pixels. For example, 100 means the maximum width of the label is 100 pixels

For example, set multi-line label text:

```json
{
  "labelWordWrap": true,
  "labelMaxWidth": 200,
  "labelMaxLines": 3
}
```

**Example:**

```js {4-10}
const graph = new Graph({
  node: {
    style: {
      label: true, // Whether to display the node label
      labelText: 'Node Name', // Label text content
      labelFill: '#000', // Label text color
      labelFontSize: 12, // Label font size
      labelFontWeight: 'normal', // Label font weight
      labelPlacement: 'bottom', // Label position relative to the main graphic of the node
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
      {
        id: 'node1',
        style: {
          x: 120,
          y: 40,
          label: true,
          labelText: 'Node Name',
          labelFill: '#000',
          labelFontSize: 12,
          labelFontWeight: 'normal',
          labelPlacement: 'bottom',
        },
      },
    ],
  },
});

graph.render();
```

### Label Background Style

The label background is used to display the background of the node label:

| Attribute                     | Description                                                                                                                                                                    | Type                                     | Default   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | --------- |
| labelBackground               | Whether the node label background is displayed                                                                                                                                 | boolean                                  | false     |
| labelBackgroundCursor         | Node label background mouse hover style, [configuration item](#cursor)                                                                                                         | string                                   | `default` |
| labelBackgroundFill           | Node label background fill color                                                                                                                                               | string                                   | -         |
| labelBackgroundFillOpacity    | Node label background opacity                                                                                                                                                  | number                                   | 1         |
| labelBackgroundHeight         | Node label background height                                                                                                                                                   | string \| number                         | -         |
| labelBackgroundLineDash       | Node label background dash configuration                                                                                                                                       | number \| string \|(number \| string )[] | -         |
| labelBackgroundLineDashOffset | Node label background dash offset                                                                                                                                              | number                                   | -         |
| labelBackgroundLineWidth      | Node label background stroke width                                                                                                                                             | number                                   | -         |
| labelBackgroundRadius         | Node label background corner radius <br> - number: Uniformly set four corner radii <br> - number[]: Set four corner radii separately, automatically supplement if insufficient | number \| number[]                       | 0         |
| labelBackgroundShadowBlur     | Node label background shadow blur                                                                                                                                              | number                                   | -         |
| labelBackgroundShadowColor    | Node label background shadow color                                                                                                                                             | string                                   | -         |
| labelBackgroundShadowOffsetX  | Node label background shadow X direction offset                                                                                                                                | number                                   | -         |
| labelBackgroundShadowOffsetY  | Node label background shadow Y direction offset                                                                                                                                | number                                   | -         |
| labelBackgroundStroke         | Node label background stroke color                                                                                                                                             | string                                   | -         |
| labelBackgroundStrokeOpacity  | Node label background stroke opacity                                                                                                                                           | number \| string                         | 1         |
| labelBackgroundVisibility     | Whether the node label background is visible                                                                                                                                   | `visible` \| `hidden`                    | -         |
| labelBackgroundZIndex         | Node label background rendering level                                                                                                                                          | number                                   | 1         |

**Example:**

```js {4-7}
const graph = new Graph({
  node: {
    style: {
      labelBackground: true, // Whether to display the node label background
      labelBackgroundFill: '#000', // Label background fill
      labelBackgroundRadius: 10, // Label background corner radius
      labelBackgroundFillOpacity: 0.5, // Label background opacity
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
      {
        id: 'node1',
        style: {
          x: 120,
          y: 40,
          label: true,
          labelText: 'Node Name',
          labelFill: '#000',
          labelFontSize: 12,
          labelFontWeight: 'normal',
          labelPlacement: 'bottom',
          labelBackground: true,
          labelBackgroundFill: '#000',
          labelBackgroundRadius: 10,
          labelBackgroundFillOpacity: 0.5,
        },
      },
    ],
  },
});

graph.render();
```

### Halo Style

| Attribute         | Description                                                                                                                    | Type                   | Default                                | Required |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | -------------------------------------- | -------- |
| halo              | Whether the node halo is displayed                                                                                             | boolean                | false                                  |          |
| haloCursor        | Node halo mouse hover style, [configuration item](#cursor)                                                                     | strig                  | `default`                              |          |
| haloDraggable     | Whether the node halo is draggable                                                                                             | boolean                | true                                   |          |
| haloDroppable     | Whether the node halo can receive dragged elements                                                                             | boolean                | true                                   |          |
| haloFillRule      | Node halo fill rule                                                                                                            | `nonzero` \| `evenodd` | -                                      |          |
| haloFilter        | Node halo filter                                                                                                               | string                 | -                                      |          |
| haloLineWidth     | Node halo stroke width                                                                                                         | number                 | 3                                      |          |
| haloPointerEvents | Whether the node halo effect responds to pointer events, [configuration item](#pointerevents)                                  | string                 | `none`                                 |          |
| haloStroke        | Node halo stroke color, **this attribute is used to set the color of the halo around the node, helping to highlight the node** | string                 | Same as the main graphic's fill `fill` |          |
| haloStrokeOpacity | Node halo stroke color opacity                                                                                                 | number                 | 0.25                                   |          |
| haloVisibility    | Node halo visibility                                                                                                           | `visible` \| `hidden`  | `visible`                              |          |
| haloZIndex        | Node halo rendering level                                                                                                      | number                 | -1                                     |          |

#### PointerEvents

Available values:
`visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

**Example:**

```js {4-6}
const graph = new Graph({
  node: {
    style: {
      halo: true, // Whether to display the node halo
      haloStroke: '#FF0000', // Node halo stroke color
      haloLineWidth: 10, // Node halo stroke width
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
      {
        id: 'node1',
        style: {
          x: 120,
          y: 40,
        },
      },
    ],
  },
  node: {
    style: {
      halo: true,
      haloStroke: '#FF0000',
      haloLineWidth: 10,
    },
  },
});

graph.render();
```

### Icon Style

| Attribute               | Description                                          | Type                                                                        | Default                         |
| ----------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------- |
| icon                    | Whether to display the node icon                     | boolean                                                                     | true                            |
| iconFill                | Node icon text color                                 | string                                                                      | -                               |
| iconFontFamily          | Node icon font family                                | string                                                                      | -                               |
| iconFontSize            | Node icon font size                                  | number                                                                      | 16                              |
| iconFontStyle           | Node icon font style                                 | `normal` \| `italic` \| `oblique`                                           | `normal`                        |
| iconFontVariant         | Node icon font variant                               | `normal` \| `small-caps` \| string                                          | `normal`                        |
| iconFontWeight          | Node icon font weight                                | number \| string                                                            | `normal`                        |
| iconHeight              | Node icon height                                     | number                                                                      | Half of the main graphic height |
| iconLetterSpacing       | Node icon text letter spacing                        | number \| string                                                            | -                               |
| iconLineHeight          | Node icon text line height                           | number \| string                                                            | -                               |
| iconMaxLines            | Maximum number of lines for the node icon text       | number                                                                      | 1                               |
| iconRadius              | Node icon corner radius                              | number                                                                      | 0                               |
| iconSrc                 | Node image source. It takes precedence over iconText | string                                                                      | -                               |
| iconText                | Node icon text                                       | string                                                                      | -                               |
| iconTextAlign           | Node icon text horizontal alignment                  | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `left`                          |
| iconTextBaseline        | Node icon text baseline                              | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | `alphabetic`                    |
| iconTextDecorationColor | Node icon text decoration line color                 | string                                                                      | -                               |
| iconTextDecorationLine  | Node icon text decoration line                       | string                                                                      | -                               |
| iconTextDecorationStyle | Node icon text decoration line style                 | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | `solid`                         |
| iconTextOverflow        | Node icon text overflow handling                     | `clip` \| `ellipsis` \| string                                              | `clip`                          |
| iconWidth               | Node icon width                                      | number                                                                      | Half of the main graphic width  |
| iconWordWrap            | Whether the node icon text automatically wraps       | boolean                                                                     | -                               |

**Example:**

```js {4-8}
const graph = new Graph({
  node: {
    style: {
      iconText: 'Text', // Icon text
      iconFill: '#FF0000', // Icon text color
      iconFontSize: 14, // Icon text size
      iconFontWeight: 'bold', // Icon text weight
      iconFontStyle: 'italic', // Icon text style
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
      {
        id: 'node1',
        style: {
          x: 120,
          y: 40,
        },
      },
    ],
  },
  node: {
    style: {
      iconText: 'Text',
      iconFill: '#FF0000',
      iconFontSize: 14,
      iconFontWeight: 'bold',
      iconFontStyle: 'italic',
    },
  },
});

graph.render();
```

### Badge Style

| Attribute    | Description                                 | Type                                  | Default                           |
| ------------ | ------------------------------------------- | ------------------------------------- | --------------------------------- |
| badge        | Whether the node displays a badge           | boolean                               | true                              |
| badgePalette | Background color palette for the node badge | string[]                              | [`#7E92B5`, `#F4664A`, `#FFBE3A`] |
| badges       | Node badge settings                         | [BadgeStyleProps](#badgestyleprops)[] | -                                 |

#### BadgeStyleProps

| Attribute                | Description                                                                                                                                                                                                                                                                                                        | Type                                                                                                                                                                   | Default      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| background               | Whether the node badge displays a background                                                                                                                                                                                                                                                                       | boolean                                                                                                                                                                | true         |
| backgroundCursor         | Node badge background mouse hover style, [configuration item](#cursor)                                                                                                                                                                                                                                             | string                                                                                                                                                                 | `default`    |
| backgroundFill           | Node badge background fill color. If not specified, the badgePalette is assigned in order                                                                                                                                                                                                                          | string                                                                                                                                                                 | -            |
| backgroundFillOpacity    | Node badge background fill opacity                                                                                                                                                                                                                                                                                 | number                                                                                                                                                                 | 1            |
| backgroundFilter         | Node badge background filter                                                                                                                                                                                                                                                                                       | string                                                                                                                                                                 | -            |
| backgroundHeight         | Node badge background height                                                                                                                                                                                                                                                                                       | number \| string                                                                                                                                                       | -            |
| backgroundLineDash       | Node badge background dash configuration                                                                                                                                                                                                                                                                           | number \| string \|(number \| string )[]                                                                                                                               | -            |
| backgroundLineDashOffset | Node badge background dash offset                                                                                                                                                                                                                                                                                  | number                                                                                                                                                                 | -            |
| backgroundLineWidth      | Node badge background stroke width                                                                                                                                                                                                                                                                                 | number                                                                                                                                                                 | -            |
| backgroundRadius         | Node badge background corner radius <br> - number: Uniformly set four corner radii <br> - number[]: Set four corner radii separately, will supplement missing components <br> - string: Similar to the [CSS padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) attribute, using spaces to separate | number \| number[] \| string                                                                                                                                           | 0            |
| backgroundShadowBlur     | Node badge background shadow blur                                                                                                                                                                                                                                                                                  | number                                                                                                                                                                 | -            |
| backgroundShadowColor    | Node badge background shadow color                                                                                                                                                                                                                                                                                 | string                                                                                                                                                                 | -            |
| backgroundShadowOffsetX  | Node badge background shadow X direction offset                                                                                                                                                                                                                                                                    | number                                                                                                                                                                 | -            |
| backgroundShadowOffsetY  | Node badge background shadow Y direction offset                                                                                                                                                                                                                                                                    | number                                                                                                                                                                 | -            |
| backgroundStroke         | Node badge background stroke color                                                                                                                                                                                                                                                                                 | string                                                                                                                                                                 | -            |
| backgroundStrokeOpacity  | Node badge background stroke opacity                                                                                                                                                                                                                                                                               | number \| string                                                                                                                                                       | 1            |
| backgroundVisibility     | Whether the node badge background is visible                                                                                                                                                                                                                                                                       | `visible` \| `hidden`                                                                                                                                                  | -            |
| backgroundZIndex         | Node badge background rendering level                                                                                                                                                                                                                                                                              | number                                                                                                                                                                 | -            |
| fill                     | Node badge text color                                                                                                                                                                                                                                                                                              | string                                                                                                                                                                 | -            |
| fontFamily               | Node badge font family                                                                                                                                                                                                                                                                                             | string                                                                                                                                                                 | -            |
| fontSize                 | Node badge font size                                                                                                                                                                                                                                                                                               | number                                                                                                                                                                 | 8            |
| fontStyle                | Node badge font style                                                                                                                                                                                                                                                                                              | `normal` \| `italic` \| `oblique`                                                                                                                                      | `normal`     |
| fontVariant              | Node badge font variant                                                                                                                                                                                                                                                                                            | `normal` \| `small-caps` \| string                                                                                                                                     | `normal`     |
| fontWeight               | Node badge font weight                                                                                                                                                                                                                                                                                             | number \| string                                                                                                                                                       | `normal`     |
| lineHeight               | Node badge line height                                                                                                                                                                                                                                                                                             | string \| number                                                                                                                                                       | -            |
| lineWidth                | Node badge line width                                                                                                                                                                                                                                                                                              | string \| number                                                                                                                                                       | -            |
| maxLines                 | Maximum number of lines for the node badge text                                                                                                                                                                                                                                                                    | number                                                                                                                                                                 | 1            |
| offsetX                  | Node badge offset in the x-axis direction                                                                                                                                                                                                                                                                          | number                                                                                                                                                                 | 0            |
| offsetY                  | Node badge offset in the y-axis direction                                                                                                                                                                                                                                                                          | number                                                                                                                                                                 | 0            |
| padding                  | Node badge padding                                                                                                                                                                                                                                                                                                 | number \| number[]                                                                                                                                                     | 0            |
| placement                | Node badge position relative to the main graphic of the node. If not specified, it defaults to clockwise from the top right corner                                                                                                                                                                                 | `left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` | -            |
| text                     | Node badge text content                                                                                                                                                                                                                                                                                            | string                                                                                                                                                                 | -            |
| textAlign                | Node badge text horizontal alignment                                                                                                                                                                                                                                                                               | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`                                                                                                          | `left`       |
| textBaseline             | Node badge text baseline                                                                                                                                                                                                                                                                                           | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom`                                                                                            | `alphabetic` |
| textDecorationColor      | Node badge text decoration line color                                                                                                                                                                                                                                                                              | string                                                                                                                                                                 | -            |
| textDecorationLine       | Node badge text decoration line                                                                                                                                                                                                                                                                                    | string                                                                                                                                                                 | -            |
| textDecorationStyle      | Node badge text decoration line style                                                                                                                                                                                                                                                                              | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                                                                                                                  | `solid`      |
| textOverflow             | Node badge text overflow handling                                                                                                                                                                                                                                                                                  | `clip` \| `ellipsis` \| string                                                                                                                                         | `clip`       |
| visibility               | Whether the node badge is visible                                                                                                                                                                                                                                                                                  | `visible` \| `hidden`                                                                                                                                                  | -            |
| wordWrap                 | Whether the node badge text automatically wraps                                                                                                                                                                                                                                                                    | boolean                                                                                                                                                                | -            |
| zIndex                   | Node badge rendering level                                                                                                                                                                                                                                                                                         | number                                                                                                                                                                 | 3            |

For example, add three badges with different meanings to a node:

```js {6-8}
const graph = new Graph({
  node: {
    style: {
      badge: true, // Whether to display the badge
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
```

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
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
    style: {
      badge: true,
      badges: [
        { text: 'A', placement: 'right-top' },
        { text: 'Important', placement: 'right' },
        { text: 'Notice', placement: 'right-bottom' },
      ],
      badgePalette: ['#7E92B5', '#F4664A', '#FFBE3A'],
      badgeFontSize: 7,
    },
  },
});

graph.render();
```

### Port Style

| Attribute | Description                                                                  | Type                                | Default | Required |
| --------- | ---------------------------------------------------------------------------- | ----------------------------------- | ------- | -------- |
| port      | Whether the node displays connection ports                                   | boolean                             | true    |          |
| ports     | Node connection port configuration items, supports multiple connection ports | [PortStyleProps](#portstyleprops)[] |         |          |

#### PortStyleProps

| Attribute         | Description                                                                                                                                                                                                                                                                                                                              | Type                                                                                                                                                                                                   | Default   | Required |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | -------- |
| key               | The key value of the node connection port, default is the index of the node connection port                                                                                                                                                                                                                                              | string                                                                                                                                                                                                 | -         |          |
| placement         | Node connection port position relative to the main graphic of the node                                                                                                                                                                                                                                                                   | `left` \| `right` \| `top` \| `bottom` \| `center` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` \| [number, number] | -         | ✓        |
| r                 | Node connection port radius <br> - If set to undefined, the connection port is considered a point, not displayed on the canvas but exists, and the edge will preferentially connect to the nearest connection port <br> - If set to a number, the connection port is considered a circle, and the radius of the circle is specified here | number                                                                                                                                                                                                 | -         |          |
| linkToCenter      | Whether the edge connects to the center of the node connection port <br> - If true, the edge connects to the center of the node connection port <br> - If false, the edge connects to the edge of the node connection port                                                                                                               | boolean                                                                                                                                                                                                | false     |          |
| cursor            | Node connection port mouse hover style, [configuration item](#cursor)                                                                                                                                                                                                                                                                    | string                                                                                                                                                                                                 | `default` |          |
| fill              | Node connection port fill color                                                                                                                                                                                                                                                                                                          | string                                                                                                                                                                                                 | -         |          |
| fillOpacity       | Node connection port fill opacity                                                                                                                                                                                                                                                                                                        | number                                                                                                                                                                                                 | 1         |          |
| isBillboard       | Whether the node connection port is a Billboard effect                                                                                                                                                                                                                                                                                   | boolean                                                                                                                                                                                                | -         |          |
| isSizeAttenuation | Whether the node connection port enables size attenuation                                                                                                                                                                                                                                                                                | boolean                                                                                                                                                                                                | -         |          |
| lineDash          | Node connection port stroke dash configuration                                                                                                                                                                                                                                                                                           | number \| string \|(number \| string )[]                                                                                                                                                               | -         |          |
| lineDashOffset    | Node connection port stroke dash offset                                                                                                                                                                                                                                                                                                  | number                                                                                                                                                                                                 | -         |          |
| lineWidth         | Node connection port stroke width                                                                                                                                                                                                                                                                                                        | number                                                                                                                                                                                                 | -         |          |
| shadowBlur        | Node connection port shadow blur                                                                                                                                                                                                                                                                                                         | number                                                                                                                                                                                                 | -         |          |
| shadowColor       | Node connection port shadow color                                                                                                                                                                                                                                                                                                        | string                                                                                                                                                                                                 | -         |          |
| shadowOffsetX     | Node connection port shadow X direction offset                                                                                                                                                                                                                                                                                           | number                                                                                                                                                                                                 | -         |          |
| shadowOffsetY     | Node connection port shadow Y direction offset                                                                                                                                                                                                                                                                                           | number                                                                                                                                                                                                 | -         |          |
| stroke            | Node connection port stroke color                                                                                                                                                                                                                                                                                                        | string                                                                                                                                                                                                 | -         |          |
| strokeOpacity     | Node connection port stroke opacity                                                                                                                                                                                                                                                                                                      | number \| string                                                                                                                                                                                       | 1         |          |
| visibility        | Whether the node connection port is visible                                                                                                                                                                                                                                                                                              | `visible` \| `hidden`                                                                                                                                                                                  | `visible` |          |
| zIndex            | Node connection port rendering level                                                                                                                                                                                                                                                                                                     | number                                                                                                                                                                                                 | 2         |          |

For example, add four connection ports to a node:

```js {6-9}
const graph = new Graph({
  node: {
    style: {
      port: true,
      ports: [
        { key: 'top', placement: 'top', fill: '#7E92B5' },
        { key: 'right', placement: 'right', fill: '#F4664A' },
        { key: 'bottom', placement: 'bottom', fill: '#FFBE3A' },
        { key: 'left', placement: [0, 0.5], fill: '#D580FF' },
      ],
      portR: 3,
      portLineWidth: 1,
      portStroke: '#fff',
    },
  },
});
```

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
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
    style: {
      port: true,
      ports: [
        { key: 'top', placement: 'top', fill: '#7E92B5' },
        { key: 'right', placement: 'right', fill: '#F4664A' },
        { key: 'bottom', placement: 'bottom', fill: '#FFBE3A' },
        { key: 'left', placement: [0, 0.5], fill: '#D580FF' },
      ],
      portR: 3,
      portLineWidth: 1,
      portStroke: '#fff',
    },
  },
});

graph.render();
```

## State

In some interactive behaviors, such as clicking to select a node or hovering to activate an edge, it is merely marking certain states on the element. To reflect these states in the visual space seen by the end user, we need to set different graphic element styles for different states to respond to the changes in the element's state.

G6 provides several built-in states, including selected, highlight, active, inactive, and disabled. Additionally, it supports custom states to meet more specific needs. For each state, developers can define a set of style rules that will override the default styles of the element.

<img width="520" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*t2qvRp92itkAAAAAAAAAAAAADmJ7AQ/original" />

The data structure is as follows:

```typescript
type NodeState = {
  [state: string]: NodeStyle;
};
```

For example, when a node is in the `focus` state, you can add a stroke with a width of 3 and a color of orange.

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

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
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

Defines the node's animation effects, supporting the following two configuration methods:

1. Turn off all node animations

```json
{
  "node": {
    "animation": false
  }
}
```

2. Configure stage animations

Stage animations refer to the animation effects of nodes when entering the canvas, updating, and leaving the canvas. The currently supported stages include:

- `enter`: Animation when the node enters the canvas
- `update`: Animation when the node updates
- `exit`: Animation when the node leaves the canvas
- `show`: Animation when the node is displayed from a hidden state
- `hide`: Animation when the node is hidden
- `collapse`: Animation when the node is collapsed
- `expand`: Animation when the node is expanded

You can refer to [Animation Paradigm](/en/manual/animation/animation#animation-paradigm) to use animation syntax to configure nodes, such as:

```json
{
  "node": {
    "animation": {
      "update": [
        {
          "fields": ["x", "y"], // Only animate the x and y attributes during updates
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

You can pass in false to turn off animations for specific stages:

```json
{
  "node": {
    "animation": {
      "enter": false // Turn off node entrance animation
    }
  }
}
```

## Palette

Defines the node's palette, which is a predefined pool of node colors, and assigns colors to the `fill` attribute based on rules.

> For the definition of palettes, please refer to [Palette](/en/manual/theme/palette).

| Attribute | Description                                                                                                             | Type                          | Default |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| color     | Palette color. If the palette is registered, you can directly specify its registered name, or accept a color array      | string \| string[]            | -       |
| field     | Specifies the grouping field in the element data. If not specified, the default is to take the id as the grouping field | string \| ((datum) => string) | `id`    |
| invert    | Whether to invert the palette                                                                                           | boolean                       | false   |
| type      | Specifies the current palette type. <br> - `group`: Discrete palette <br> - `value`: Continuous palette                 | `group` \| `value`            | `group` |

For example, assign node colors based on the `category` field of a set of data, so that nodes of the same category have the same color:

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

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
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

You can also use the default configuration:

```json
{
  "node": {
    "palette": "tableau" // tableau is the palette name, default assigns colors based on ID
  }
}
```

The effect is as follows:

```js | ob {  pin: false , autoMount: true }
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
