---
title: Combo Configuration Options
---

This document introduces combo attribute configuration, with configuration locations as follows:

```js {6-10}
import { Graph } from '@antv/g6';

const graph = new Graph({
  // Other configurations...
  combo: {
    type: 'circle', // Combo type
    style: {}, // Combo style
    state: {}, // State style
    palette: {}, // Palette configuration
    animation: {}, // Animation configuration
  },
});
```

## ComboOptions

| Attribute | Description                                                                  | Type                    | Default  | Required |
| --------- | ---------------------------------------------------------------------------- | ----------------------- | -------- | -------- |
| type      | Combo type, name of built-in combo type or custom combo name                 | [Type](#type)           | `circle` |          |
| style     | Combo style, including color, size, etc.                                     | [Style](#style)         | -        |          |
| state     | Defines the style of the combo in different states                           | [State](#state)         | -        |          |
| palette   | Defines the palette of the combo, used to map colors based on different data | [Palette](#palette)     | -        |          |
| animation | Defines the animation effects of the combo                                   | [Animation](#animation) | -        |          |

## Type

Specifies the combo type, name of built-in combo type or custom combo name. The default is `circle` (circular combo).

```typescript
const graph = new Graph({
  // Other configurations...
  combo: {
    type: 'circle',
  },
});
```

Optional values are:

- `circle`: [Circular Combo](/en/manual/element/combo/build-in/circle)
- `rect`: [Rectangular Combo](/en/manual/element/combo/build-in/rect)

## Style

Define the style of the combo here, including color, size, etc.

```typescript
const graph = new Graph({
  // Other configurations...
  combo: {
    style: {},
  },
});
```

<img width="240" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z-OxR4MAdUwAAAAAAAAAAAAADmJ7AQ/original" />

- `key`: The main graphic of the combo, representing the main shape of the combo, such as a circle, rectangle, etc.
- `halo`: A graphic that displays a halo effect around the main graphic.
- `label`: Text label, usually used to display the name or description of the combo.

The following style configurations will be explained in sequence according to atomic graphics:

### Style When Expanded

Main graphic style when the combo is expanded

| Attribute                       | Description                                                                                                                                       | Type                                                                            | Default   | Required |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------- | -------- |
| collapsed                       | Whether the combo is currently collapsed                                                                                                          | boolean                                                                         | false     |          |
| cursor                          | Combo mouse hover style, [configuration item](#cursor)                                                                                            | string                                                                          | default   |          |
| fill                            | Combo fill color                                                                                                                                  | string                                                                          | `#99ADD1` |          |
| fillOpacity                     | Combo fill color opacity                                                                                                                          | number  string                                                                 | 0.04      |          |
| increasedLineWidthForHitTesting | When lineWidth is small, the interactive area also becomes smaller. Sometimes we want to enlarge this area to make "thin lines" easier to pick up | number                                                                          | 0         |          |
| lineCap                         | Combo stroke end style                                                                                                                            | `round`  `square`  `butt`                                                     | `butt`    |          |
| lineDash                        | Combo stroke dash style                                                                                                                           | number[]                                                                        | -         |          |
| lineDashOffset                  | Combo stroke dash offset                                                                                                                          | number                                                                          | -         |          |
| lineJoin                        | Combo stroke join style                                                                                                                           | `round`  `bevel`  `miter`                                                     | `miter`   |          |
| lineWidth                       | Combo stroke width                                                                                                                                | number                                                                          | 1         |          |
| opacity                         | Combo opacity                                                                                                                                     | number  string                                                                 | 1         |          |
| shadowBlur                      | Combo shadow blur                                                                                                                                 | number                                                                          | -         |          |
| shadowColor                     | Combo shadow color                                                                                                                                | string                                                                          | -         |          |
| shadowOffsetX                   | Combo shadow offset in the x-axis direction                                                                                                       | number  string                                                                 | -         |          |
| shadowOffsetY                   | Combo shadow offset in the y-axis direction                                                                                                       | number  string                                                                 | -         |          |
| shadowType                      | Combo shadow type                                                                                                                                 | `inner`  `outer`                                                               | `outer`   |          |
| stroke                          | Combo stroke color                                                                                                                                | string                                                                          | `#99add1` |          |
| strokeOpacity                   | Combo stroke color opacity                                                                                                                        | number  string                                                                 | 1         |          |
| visibility                      | Whether the combo is visible                                                                                                                      | `visible`  `hidden`                                                            | `visible` |          |
| x                               | Combo x coordinate                                                                                                                                | number                                                                          | 0         |          |
| y                               | Combo y coordinate                                                                                                                                | number                                                                          | 0         |          |
| z                               | Combo z coordinate                                                                                                                                | number                                                                          | 0         |          |
| zIndex                          | Combo rendering level                                                                                                                             | number                                                                          | 0         |          |
| `{styleProps}`                  | More graphic configurations, refer to [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) configuration items         | [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) | -         |          |

#### Cursor

Optional values are: `auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

**Example:**

```js {5-7}
const graph = new Graph({
  // Other configurations...
  combo: {
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
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: { fill: '#1783FF', stroke: '#000', lineWidth: 2 },
  },
});

graph.render();
```

### Style When Collapsed

Effective when `collapsed` is `true`

| Attribute                                | Description                                                                                                                                                                  | Type                                                                            | Default                                  | Required |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------- | -------- |
| collapsedCursor                          | Mouse hover style when the combo is collapsed, [configuration item](#cursor)                                                                                                 | string                                                                          | Same as the cursor when expanded         |          |
| collapsedFill                            | Fill color when the combo is collapsed                                                                                                                                       | string                                                                          | Same as the fill when expanded           |          |
| collapsedFillOpacity                     | Fill color opacity when the combo is collapsed                                                                                                                               | number  string                                                                 | 1                                        |          |
| collapsedIncreasedLineWidthForHitTesting | When the combo is collapsed, if lineWidth is small, the interactive area also becomes smaller. Sometimes we want to enlarge this area to make "thin lines" easier to pick up | number                                                                          | 0                                        |          |
| collapsedLineCap                         | Stroke end style when the combo is collapsed                                                                                                                                 | `round`  `square`  `butt`                                                     | Same as the lineCap when expanded        |          |
| collapsedLineDash                        | Stroke dash style when the combo is collapsed                                                                                                                                | number[]                                                                        | Same as the lineDash when expanded       |          |
| collapsedLineDashOffset                  | Stroke dash offset when the combo is collapsed                                                                                                                               | number                                                                          | Same as the lineDashOffset when expanded |          |
| collapsedLineJoin                        | Stroke join style when the combo is collapsed                                                                                                                                | `round`  `bevel`  `miter`                                                     | Same as the lineJoin when expanded       |          |
| collapsedLineWidth                       | Stroke width when the combo is collapsed                                                                                                                                     | number                                                                          | Same as the lineWidth when expanded      |          |
| collapsedMarker                          | Whether to display the marker when the combo is collapsed, [configuration item](#collapsedMarkerStyle)                                                                       | boolean                                                                         | true                                     |          |
| collapsedOpacity                         | Opacity when the combo is collapsed                                                                                                                                          | number  string                                                                 | Same as the opacity when expanded        |          |
| collapsedShadowBlur                      | Shadow blur when the combo is collapsed                                                                                                                                      | number                                                                          | Same as the shadowBlur when expanded     |          |
| collapsedShadowColor                     | Shadow color when the combo is collapsed                                                                                                                                     | string                                                                          | Same as the shadowColor when expanded    |          |
| collapsedShadowOffsetX                   | Shadow offset in the x-axis direction when the combo is collapsed                                                                                                            | number  string                                                                 | Same as the shadowOffsetX when expanded  |          |
| collapsedShadowOffsetY                   | Shadow offset in the y-axis direction when the combo is collapsed                                                                                                            | number  string                                                                 | Same as the shadowOffsetY when expanded  |          |
| collapsedShadowType                      | Shadow type when the combo is collapsed                                                                                                                                      | `inner`  `outer`                                                               | Same as the shadowType when expanded     |          |
| collapsedSize                            | Size when the combo is collapsed                                                                                                                                             | number &#124; [number, number] &#124; [number, number, number]                  | 32                                       |          |
| collapsedStroke                          | Stroke color when the combo is collapsed                                                                                                                                     | string                                                                          | Same as the stroke when expanded         |          |
| collapsedStrokeOpacity                   | Stroke color opacity when the combo is collapsed                                                                                                                             | number  string                                                                 | Same as the strokeOpacity when expanded  |          |
| collapsedVisibility                      | Whether the combo is visible when collapsed                                                                                                                                  | `visible`  `hidden`                                                            | Same as the visibility when expanded     |          |
| `collapsed{styleProps}`                  | More graphic configurations, refer to [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) configuration items                                    | [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性) | -                                        |          |

**Example:**

```js {5-7}
const graph = new Graph({
  // Other configurations...
  combo: {
    style: {
      collapsedFill: '#1783FF', // Fill color
      collapsedStroke: '#000', // Stroke color
      collapsedLineWidth: 2, // Stroke width
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
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1', style: { collapsed: true } }],
  },
  combo: {
    style: { collapsedFill: '#1783FF', collapsedStroke: '#000', collapsedLineWidth: 2 },
  },
});

graph.render();
```

### Collapsed Marker Style

Effective when `collapsedMarker` is `true`

| Attribute                     | Description                                                                                                                                                                                                                                                                                                                                                         | Type                                                                                                                               | Default       | Required |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| collapsedMarkerType           | Marker type displayed when the combo is collapsed <br> - `'child-count'`: Number of child elements (including Node and Combo) <br>- `'descendant-count'`: Number of descendant elements (including Node and Combo) <br>- `'node-count'`: Number of descendant elements (only including Node) <br> - `(children: NodeLikeData[]) => string`: Custom processing logic | `child-count` &#124; `descendant-count` &#124; `node-count` &#124; ((children: NodeData &#124; ComboData[]) => string)             | `child-count` |          |
| collapsedMarkerFill           | Icon text color                                                                                                                                                                                                                                                                                                                                                     | string                                                                                                                             | #fff          |          |
| collapsedMarkerFillOpacity    | Icon text color opacity                                                                                                                                                                                                                                                                                                                                             | number                                                                                                                             | 1             |          |
| collapsedMarkerFontSize       | Icon font size                                                                                                                                                                                                                                                                                                                                                      | number                                                                                                                             | 12            |          |
| collapsedMarkerFontWeight     | Icon font weight                                                                                                                                                                                                                                                                                                                                                    | number &#124; string                                                                                                               | `normal`      |          |
| collapsedMarkerRadius         | Icon corner radius                                                                                                                                                                                                                                                                                                                                                  | number                                                                                                                             | 0             |          |
| collapsedMarkerSrc            | Image source. Its priority is higher than `collapsedMarkerText`                                                                                                                                                                                                                                                                                                     | string                                                                                                                             | -             |          |
| collapsedMarkerText           | Icon text                                                                                                                                                                                                                                                                                                                                                           | string                                                                                                                             | -             |          |
| collapsedMarkerTextAlign      | Icon text horizontal alignment                                                                                                                                                                                                                                                                                                                                      | `center`  `end`  `left`  `right`  `start`                                                                                      | `center`      |          |
| collapsedMarkerTextBaseline   | Icon text alignment baseline                                                                                                                                                                                                                                                                                                                                        | `alphabetic`  `bottom`  `hanging`  `ideographic`  `middle`  `top`                                                             | `middle`      |          |
| collapsedMarkerWidth          | Icon width                                                                                                                                                                                                                                                                                                                                                          | number                                                                                                                             | -             |          |
| collapsedMarkerHeight         | Icon height                                                                                                                                                                                                                                                                                                                                                         | number                                                                                                                             | -             |          |
| collapsedMarkerZIndex         | Icon rendering level                                                                                                                                                                                                                                                                                                                                                | number                                                                                                                             | 1             |          |
| `collapsedMarker{StyleProps}` | More icon style configurations, refer to [TextStyleProps](https://g.antv.antgroup.com/api/basic/text), [ImageStyleProps](https://g.antv.antgroup.com/api/basic/image) configuration items. For example, collapsedMarkerFontSize represents the font size of the text icon                                                                                           | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) &#124; [ImageStyleProps](https://g.antv.antgroup.com/api/basic/image) | -             |          |

**Example:**

```js {5-6}
const graph = new Graph({
  // Other configurations...
  combo: {
    style: {
      collapsedMarkerFill: '#1783FF', // Fill color
      collapsedMarkerFontSize: 30, // Icon font size
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
  autoFit: 'center',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1' },
      { id: 'node2', combo: 'combo1' },
    ],
    combos: [{ id: 'combo1', style: { collapsed: true } }],
  },
  combo: {
    style: {
      collapsedMarkerFill: '#1783FF',
      collapsedMarkerFontSize: 30,
    },
  },
});

graph.render();
```

### Label Style

Labels are used to display the text information of the combo:

| Attribute                | Description                                                                                                                                                                 | Type                                                                            | Default   | Required |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------- | -------- |
| label                    | Whether to display the combo label                                                                                                                                          | boolean                                                                         | true      |          |
| labelCursor              | Mouse hover style when hovering over the combo label, [configuration item](#cursor)                                                                                         | string                                                                          | `default` |          |
| labelFill                | Combo label text color                                                                                                                                                      | string                                                                          | #000      |          |
| labelFillOpacity         | Combo label text color opacity                                                                                                                                              | number                                                                          | 1         |          |
| labelFontFamily          | Combo label font family                                                                                                                                                     | string                                                                          | -         |          |
| labelFontSize            | Combo label font size                                                                                                                                                       | number                                                                          | 12        |          |
| labelFontStyle           | Combo label font style                                                                                                                                                      | `normal`  `italic`  `oblique`                                                 | -         |          |
| labelFontVariant         | Combo label font variant                                                                                                                                                    | `normal`  `small-caps`  string                                                | -         |          |
| labelFontWeight          | Combo label font weight                                                                                                                                                     | `normal`  `bold`  `bolder`  `lighter`  number                               | 400       |          |
| labelLeading             | Line spacing                                                                                                                                                                | number                                                                          | 0         |          |
| labelLetterSpacing       | Combo label letter spacing                                                                                                                                                  | number  string                                                                 | -         |          |
| labelLineHeight          | Combo label line height                                                                                                                                                     | number  string                                                                 | -         |          |
| labelMaxLines            | Maximum number of lines for the combo label                                                                                                                                 | number                                                                          | 1         |          |
| labelMaxWidth            | Maximum width of the combo label, [configuration item](#labelmaxwidth)                                                                                                      | number  string                                                                 | `200%`    |          |
| labelOffsetX             | Offset of the combo label in the x-axis direction                                                                                                                           | number                                                                          | 0         |          |
| labelOffsetY             | Offset of the combo label in the y-axis direction                                                                                                                           | number                                                                          | 0         |          |
| labelPadding             | Combo label padding                                                                                                                                                         | number  number[]                                                               | 0         |          |
| labelPlacement           | Position of the combo label relative to the main graphic of the combo, [configuration item](#labelplacement)                                                                | string                                                                          | `bottom`  |          |
| labelText                | Combo label text content                                                                                                                                                    | string                                                                          | -         |          |
| labelTextAlign           | Combo label text horizontal alignment                                                                                                                                       | `start`  `center`  `middle`  `end`  `left`  `right'                `left` |           |          |
| labelTextBaseline        | Combo label text baseline                                                                                                                                                   | `top`  `hanging`  `middle`  `alphabetic`  `ideographic`  `bottom`          | -         |          |
| labelTextDecorationColor | Combo label text decoration line color                                                                                                                                      | string                                                                          | -         |          |
| labelTextDecorationLine  | Combo label text decoration line                                                                                                                                            | string                                                                          | -         |          |
| labelTextDecorationStyle | Combo label text decoration line style                                                                                                                                      | `solid`  `double`  `dotted`  `dashed`  `wavy`                               | -         |          |
| labelTextOverflow        | Combo label text overflow handling                                                                                                                                          | `clip`  `ellipsis`  string                                                    | -         |          |
| labelTextPath            | Combo label text path                                                                                                                                                       | Path                                                                            | -         |          |
| labelWordWrap            | Whether the combo label enables automatic line wrapping. After enabling labelWordWrap, the part that exceeds labelMaxWidth will automatically wrap                          | boolean                                                                         | false     |          |
| labelZIndex              | Combo label rendering level                                                                                                                                                 | number                                                                          | 0         |          |
| `label{StyleProps}`      | More label style configurations, refer to [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) attribute values. For example, labelOpacity represents label opacity | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)                    | -         |          |

#### LabelPlacement

Optional values are: `left` | `right` | `top` | `bottom` | `left-top` | `left-bottom` | `right-top` | `right-bottom` | `top-left` | `top-right` | `bottom-left` | `bottom-right` | `center` | `bottom`

#### LabelMaxWidth

After enabling automatic line wrapping `labelWordWrap`, it will wrap if it exceeds this width:

- string: Indicates the maximum width defined as a percentage of the combo element width. For example, `50%` means the label width does not exceed half of the combo width
- number: Indicates the maximum width defined in pixels. For example, 100 means the maximum width of the label is 100 pixels

For example, set multi-line label text:

```json
{
  "labelWordWrap": true,
  "labelMaxWidth": 200,
  "labelMaxLines": 3
}
```

**Example:**

```js {5-10}
const graph = new Graph({
  // Other configurations
  combo: {
    style: {
      label: true, // Whether to display the combo label
      labelText: 'Combo Name', // Label text content
      labelFill: '#000', // Label text color
      labelFontSize: 12, // Label font size
      labelFontWeight: 'normal', // Label font weight
      labelPlacement: 'bottom', // Position of the label relative to the main graphic of the combo
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
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [
      {
        id: 'combo1',
        style: {
          label: true,
          labelText: 'Combo Name',
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

Label background is used to display the background of the combo label:

| Attribute                     | Description                                                                                                                                                                                                 | Type                                                         | Default      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------ |
| labelBackground               | Whether to display the combo label background                                                                                                                                                               | boolean                                                      | false        |
| labelBackgroundCursor         | Mouse hover style for the combo label background, [configuration item](#cursor)                                                                                                                             | string                                                       | `default`    |
| labelBackgroundFill           | Combo label background fill color                                                                                                                                                                           | string                                                       | #000         |
| labelBackgroundFillOpacity    | Combo label background opacity                                                                                                                                                                              | number                                                       | 0.75         |
| labelBackgroundHeight         | Combo label background height                                                                                                                                                                               | string  number                                              | -            |
| labelBackgroundLineDash       | Combo label background dash configuration                                                                                                                                                                   | number  string (number  string )[]                        | -            |
| labelBackgroundLineDashOffset | Combo label background dash offset                                                                                                                                                                          | number                                                       | -            |
| labelBackgroundLineWidth      | Combo label background stroke width                                                                                                                                                                         | number                                                       | -            |
| labelBackgroundPadding        | Combo label background padding                                                                                                                                                                              | number  number[]                                            | [2, 4, 2, 4] |
| labelBackgroundRadius         | Combo label background corner radius <br> - number: Uniformly set the four corner radii <br> - number[]: Set the four corner radii separately, automatically fill in if insufficient                        | number  number[]                                            | 0            |
| labelBackgroundShadowBlur     | Combo label background shadow blur                                                                                                                                                                          | number                                                       | -            |
| labelBackgroundShadowColor    | Combo label background shadow color                                                                                                                                                                         | string                                                       | -            |
| labelBackgroundShadowOffsetX  | Combo label background shadow X direction offset                                                                                                                                                            | number                                                       | -            |
| labelBackgroundShadowOffsetY  | Combo label background shadow Y direction offset                                                                                                                                                            | number                                                       | -            |
| labelBackgroundStroke         | Combo label background stroke color                                                                                                                                                                         | string                                                       | -            |
| labelBackgroundStrokeOpacity  | Combo label background stroke opacity                                                                                                                                                                       | number  string                                              | 1            |
| labelBackgroundVisibility     | Whether the combo label background is visible                                                                                                                                                               | `visible`  `hidden`                                         | -            |
| labelBackgroundZIndex         | Combo label background rendering level                                                                                                                                                                      | number                                                       | 1            |
| `labelBackground{StyleProps}` | More label background style configurations, refer to [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) attribute values. For example, labelBackgroundOpacity represents label background opacity | [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) | -            |

**Example:**

```js {5-8}
const graph = new Graph({
  // Other configurations...
  combo: {
    style: {
      labelBackground: true, // Whether to display the combo label background
      labelBackgroundFill: '#000', // Label background fill
      labelBackgroundRadius: 10, // Label background corner radius
      labelBackgroundFillOpacity: 0.5, // Label background fill color opacity
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
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [
      {
        id: 'combo1',
        style: {
          label: true,
          labelText: 'Combo Name',
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

| Attribute          | Description                                                                                                                                                                                         | Type                                                                  | Default                                           | Required |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| halo               | Whether to display the combo halo                                                                                                                                                                   | boolean                                                               | false                                             |          |
| haloCursor         | Mouse hover style for the combo halo, [configuration item](#cursor)                                                                                                                                 | string                                                                | `default`                                         |          |
| haloDraggable      | Whether the combo halo is draggable                                                                                                                                                                 | boolean                                                               | true                                              |          |
| haloDroppable      | Whether the combo halo can receive dragged elements                                                                                                                                                 | boolean                                                               | false                                             |          |
| haloFill           | Halo fill color                                                                                                                                                                                     | string                                                                | Same as the fill color of the main graphic `fill` |          |
| haloFillRule       | Combo halo fill rule                                                                                                                                                                                | `nonzero`  `evenodd`                                                 | -                                                 |          |
| haloFilter         | Combo halo filter                                                                                                                                                                                   | string                                                                | -                                                 |          |
| haloLineWidth      | Combo halo stroke width                                                                                                                                                                             | number                                                                | 12                                                |          |
| haloPointerEvents  | Whether the combo halo effect responds to pointer events, [configuration item](#pointerevents)                                                                                                      | string                                                                | `none`                                            |          |
| haloStroke         | Combo halo stroke color, **this attribute is used to set the color of the halo around the combo to help highlight the combo**                                                                       | string                                                                | `#99add1`                                         |          |
| haloStrokeOpacity  | Combo halo stroke color opacity                                                                                                                                                                     | number                                                                | 0.25                                              |          |
| haloVisibility     | Combo halo visibility                                                                                                                                                                               | `visible`  `hidden`                                                  | `visible`                                         |          |
| haloZIndex         | Combo halo rendering level                                                                                                                                                                          | number                                                                | -1                                                |          |
| `halo{StyleProps}` | More halo style configurations, refer to [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) configuration items. For example, haloFillOpacity represents halo fill color opacity | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -                                                 |          |

#### PointerEvents

Optional values are:
`visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

**Example:**

```js {5-7}
const graph = new Graph({
  // Other configurations...
  combo: {
    style: {
      halo: true, // Whether to display the combo halo
      haloStroke: '#FF0000', // Combo halo stroke color
      haloLineWidth: 10, // Combo halo stroke width
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
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
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

| Attribute               | Description                                              | Type                                                                   | Default                             |
| ----------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------- |
| icon                    | Whether to display the combo icon                        | boolean                                                                | true                                |
| iconFill                | Combo icon text color                                    | string                                                                 | -                                   |
| iconFontFamily          | Combo icon font family                                   | string                                                                 | -                                   |
| iconFontSize            | Combo icon font size                                     | number                                                                 | 16                                  |
| iconFontStyle           | Combo icon font style                                    | `normal`  `italic`  `oblique`                                        | `normal`                            |
| iconFontVariant         | Combo icon font variant                                  | `normal`  `small-caps`  string                                       | `normal`                            |
| iconFontWeight          | Combo icon font weight                                   | number  string                                                        | `normal`                            |
| iconHeight              | Combo icon height                                        | number                                                                 | Half the height of the main graphic |
| iconLetterSpacing       | Combo icon text letter spacing                           | number  string                                                        | -                                   |
| iconLineHeight          | Combo icon text line height                              | number  string                                                        | -                                   |
| iconMaxLines            | Maximum number of lines for the combo icon text          | number                                                                 | 1                                   |
| iconRadius              | Combo icon corner radius                                 | number                                                                 | 0                                   |
| iconSrc                 | Combo image source. Its priority is higher than iconText | string                                                                 | -                                   |
| iconText                | Combo icon text                                          | string                                                                 | -                                   |
| iconTextAlign           | Combo icon text horizontal alignment                     | `start`  `center`  `middle`  `end`  `left`  `right`               | `left`                              |
| iconTextBaseline        | Combo icon text baseline                                 | `top`  `hanging`  `middle`  `alphabetic`  `ideographic`  `bottom` | `alphabetic`                        |
| iconTextDecorationColor | Combo icon text decoration line color                    | string                                                                 | -                                   |
| iconTextDecorationLine  | Combo icon text decoration line                          | string                                                                 | -                                   |
| iconTextDecorationStyle | Combo icon text decoration line style                    | `solid`  `double`  `dotted`  `dashed`  `wavy`                      | `solid`                             |
| iconTextOverflow        | Combo icon text overflow handling                        | `clip`  `ellipsis`  string                                           | `clip`                              |
| iconWidth               | Combo icon width                                         | number                                                                 | Half the width of the main graphic  |
| iconWordWrap            | Whether the combo icon text automatically wraps          | boolean                                                                | -                                   |

**Example:**

```js {5-9}
const graph = new Graph({
  // Other configurations...
  combo: {
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
  autoFit: 'center',
  data: {
    combos: [{ id: 'combo1' }],
  },
  combo: {
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

## State

In some interactive behaviors, such as clicking to select a combo or hovering to activate an edge, it is merely marking certain states on the element. To reflect these states in the visual space seen by the end user, we need to set different graphic element styles for different states to respond to changes in the element's state.

G6 provides several built-in states, including selected, highlight, active, inactive, and disabled. In addition, it also supports custom states to meet more specific needs. For each state, developers can define a set of style rules that will override the default styles of the element.

<img width="520" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Iv_dS5XR2TcAAAAAAAAAAAAADmJ7AQ/original" />

The data structure is as follows:

```typescript
type ComboState = {
  [state: string]: ComboStyle;
};
```

For example, when the combo is in the `focus` state, you can add a stroke with a width of 3 and a color of orange.

```js {4-7}
const graph = new Graph({
  combo: {
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
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1', states: ['focus'] }],
  },
  combo: {
    state: {
      focus: {
        lineWidth: 3,
        stroke: 'orange',
        fill: 'orange',
        fillOpacity: 0.2,
      },
    },
  },
});

graph.render();
```

## Animation

Defines the animation effects of the combo, supporting the following two configuration methods:

1. Turn off all animations for the combo

```json
{
  "combo": {
    "animation": false
  }
}
```

2. Configure stage animations

Stage animations refer to the animation effects of the combo when entering the canvas, updating, and leaving the canvas. The currently supported stages include:

- `enter`: Animation when the combo enters the canvas
- `update`: Animation when the combo is updated
- `exit`: Animation when the combo leaves the canvas
- `show`: Animation when the combo is displayed from a hidden state
- `hide`: Animation when the combo is hidden
- `collapse`: Animation when the combo is collapsed
- `expand`: Animation when the combo is expanded

You can refer to [Animation Paradigm](/en/manual/animation/animation#动画范式) to use animation syntax to configure the combo, such as:

```json
{
  "combo": {
    "animation": {
      "update": [
        {
          "fields": ["x", "y"], // Only animate the x and y attributes during update
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
  "combo": {
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
  "combo": {
    "animation": {
      "enter": false // Turn off combo entrance animation
    }
  }
}
```

## Palette

Defines the palette of the combo, which is a predefined pool of combo colors, and assigns colors based on rules, mapping colors to the `fill` attribute.

> For the definition of the palette, please refer to [Palette](/en/manual/theme/palette).

| Attribute | Description                                                                                                                  | Type                              | Default |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------- |
| type      | Specifies the current palette type. <br> - `group`: Discrete palette <br> - `value`: Continuous palette                      | `group` &#124; `value`            | `group` |
| field     | Specifies the grouping field in the element data. If not specified, the id is used as the grouping field by default          | string &#124; ((datum) => string) | `id`    |
| color     | Palette color. If the palette is registered, you can directly specify its registered name, and it also accepts a color array | string &#124; string[]            | -       |
| invert    | Whether to invert the palette                                                                                                | boolean                           | false   |

For example, assign combo colors to a set of data based on the `category` field, so that combos of the same category have the same color:

```json
{
  "combo": {
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
    combos: new Array(8)
      .fill(0)
      .map((_, i) => ({ id: `combo-${i}`, data: { category: ['A', 'B', 'C', 'D', 'E'][i % 5] } })),
  },
  layout: { type: 'grid', cols: 8 },
  combo: {
    style: { fillOpacity: 0.4 },
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
  "combo": {
    "palette": "tableau" // tableau is the palette name, and colors are assigned based on ID by default
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
    combos: new Array(8)
      .fill(0)
      .map((_, i) => ({ id: `combo-${i}`, data: { category: ['A', 'B', 'C', 'D', 'E'][i % 5] } })),
  },
  layout: { type: 'grid', cols: 8 },
  combo: {
    style: { fillOpacity: 0.4 },
    palette: 'tableau',
  },
});

graph.render();
```
