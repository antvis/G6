---
title: Combo Common Options
order: 1
---

This document introduces the built-in combo common property configurations.

## ComboOptions

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  combo: {
    type: 'circle', // Combo type
    style: {}, // Combo style
    state: {}, // State style
    palette: {}, // Palette configuration
    animation: {}, // Animation configuration
  },
});
```

| Property  | Description                                               | Type                    | Default  | Required |
| --------- | --------------------------------------------------------- | ----------------------- | -------- | -------- |
| type      | Combo type, built-in combo type name or custom combo name | [Type](#type)           | `circle` |          |
| style     | Combo style configuration, including color, size, etc.    | [Style](#style)         | -        |          |
| state     | Style configuration for different states                  | [State](#state)         | -        |          |
| palette   | Define combo palette for mapping colors based on data     | [Palette](#palette)     | -        |          |
| animation | Define combo animation effects                            | [Animation](#animation) | -        |          |

## Type

Specifies the combo type, built-in combo type name or custom combo name. Default is `circle`. **⚠️ Note**: This determines the shape of the main graphic.

```js {3}
const graph = new Graph({
  combo: {
    type: 'circle',
  },
});
```

**⚠️ Dynamic Configuration Note**: The `type` property also supports dynamic configuration, allowing you to dynamically select combo types based on combo data:

```js
const graph = new Graph({
  combo: {
    // Static configuration
    type: 'circle',

    // Dynamic configuration - arrow function form
    type: (datum) => datum.data.comboType || 'circle',

    // Dynamic configuration - regular function form (can access graph instance)
    type: function (datum) {
      console.log(this); // graph instance
      return datum.data.category === 'important' ? 'rect' : 'circle';
    },
  },
});
```

Available values:

- `circle`: [Circle Combo](/en/manual/element/combo/circle)
- `rect`: [Rect Combo](/en/manual/element/combo/rect)

## Style

Defines combo style, including color, size, etc.

```js {3}
const graph = new Graph({
  combo: {
    style: {},
  },
});
```

**⚠️ Dynamic Configuration Note**: All style properties below support dynamic configuration, meaning you can pass functions to dynamically calculate property values based on combo data:

```js
const graph = new Graph({
  combo: {
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
      labelText: (datum) => `Combo: ${datum.id}`,
      badges: (datum) => datum.data.tags.map((tag) => ({ text: tag })),
    },
  },
});
```

Where the `datum` parameter is the combo data object (`ComboData`), containing all combo data information.

A complete combo consists of the following parts:

<img width="240" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z-OxR4MAdUwAAAAAAAAAAAAADmJ7AQ/original" />

- `key`: The main graphic of the combo, representing the primary shape of the combo, such as circle, rectangle, etc.
- `label`: Text label, usually used to display the combo's name or description
- `halo`: Graphic displaying halo effect around the main graphic
- `badge`: Badge displayed at the top-right corner of the combo by default

The following style configurations will be explained by atomic graphics:

### Main Graphic Style

The main graphic is the core part of the combo, defining the basic shape and appearance of the combo. Here are common configuration scenarios:

#### Basic Style Configuration

Set the basic appearance of the combo:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      fill: '#5B8FF9', // Blue fill
      stroke: '#1A1A1A', // Dark stroke
      lineWidth: 2,
      fillOpacity: 0.2,
    },
  },
});

graph.render();
```

#### Transparency and Shadow Effects

Add transparency and shadow effects to combos:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      fill: '#61DDAA',
      fillOpacity: 0.15,
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

Create combos with dashed borders:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      fill: '#FFF1F0',
      fillOpacity: 0.1,
      stroke: '#F5222D',
      lineWidth: 2,
      lineDash: [6, 4],
      lineCap: 'round',
    },
  },
});

graph.render();
```

Here is the complete main graphic style configuration:

| Property                        | Description                                                                                                                              | Type                          | Default   | Required |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------- | -------- |
| collapsed                       | Whether the current combo is collapsed                                                                                                   | boolean                       | false     |          |
| cursor                          | Combo mouse hover style, [options](#cursor)                                                                                              | string                        | default   |          |
| fill                            | Combo fill color                                                                                                                         | string                        | `#99ADD1` |          |
| fillOpacity                     | Combo fill opacity                                                                                                                       | number \| string              | 0.04      |          |
| increasedLineWidthForHitTesting | When lineWidth is small, the interactive area becomes small. Sometimes we want to increase this area to make "thin lines" easier to pick | number                        | 0         |          |
| lineCap                         | Combo stroke end cap style                                                                                                               | `round` \| `square` \| `butt` | `butt`    |          |
| lineDash                        | Combo stroke dash style                                                                                                                  | number[]                      | -         |          |
| lineDashOffset                  | Combo stroke dash offset                                                                                                                 | number                        | -         |          |
| lineJoin                        | Combo stroke join style                                                                                                                  | `round` \| `bevel` \| `miter` | `miter`   |          |
| lineWidth                       | Combo stroke width                                                                                                                       | number                        | 1         |          |
| opacity                         | Combo opacity                                                                                                                            | number \| string              | 1         |          |
| pointerEvents                   | How combo responds to pointer events, [options](#pointerevents)                                                                          | string                        | `auto`    |          |
| shadowBlur                      | Combo shadow blur                                                                                                                        | number                        | -         |          |
| shadowColor                     | Combo shadow color                                                                                                                       | string                        | -         |          |
| shadowOffsetX                   | Combo shadow offset in x direction                                                                                                       | number \| string              | -         |          |
| shadowOffsetY                   | Combo shadow offset in y direction                                                                                                       | number \| string              | -         |          |
| shadowType                      | Combo shadow type                                                                                                                        | `inner` \| `outer`            | `outer`   |          |
| size                            | Combo size, quick setting for combo width and height, [options](#size)                                                                   | number \| number[]            | -         |          |
| stroke                          | Combo stroke color                                                                                                                       | string                        | `#99ADD1` |          |
| strokeOpacity                   | Combo stroke opacity                                                                                                                     | number \| string              | 1         |          |
| transform                       | Transform property allows you to rotate, scale, skew or translate the given combo                                                        | string                        | -         |          |
| transformOrigin                 | Rotation and scaling center, also called transformation center                                                                           | string                        | -         |          |
| visibility                      | Whether combo is visible                                                                                                                 | `visible` \| `hidden`         | `visible` |          |
| x                               | Combo x coordinate                                                                                                                       | number                        | 0         |          |
| y                               | Combo y coordinate                                                                                                                       | number                        | 0         |          |
| z                               | Combo z coordinate                                                                                                                       | number                        | 0         |          |
| zIndex                          | Combo rendering layer                                                                                                                    | number                        | 0         |          |

#### Size

Combo size, quick setting for combo width and height, supports three configuration methods:

- number: Indicates that combo width and height are the same as the specified value
- [number, number]: Indicates that combo width and height are represented by array elements in order for combo width and height
- [number, number, number]: Indicates that combo width, height, and depth are represented by array elements in order

#### PointerEvents

The `pointerEvents` property controls how graphics respond to interaction events. Refer to [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events).

Available values: `visible` | `visiblepainted` | `visiblestroke` | `non-transparent-pixel` | `visiblefill` | `visible` | `painted` | `fill` | `stroke` | `all` | `none` | `auto` | `inherit` | `initial` | `unset`

In short, `fill`, `stroke`, and `visibility` can independently or in combination affect pick testing behavior. Currently supports the following keywords:

- **`auto`**: Default value, equivalent to `visiblepainted`
- **`none`**: Will never be the target of responding events
- **`visiblepainted`**: Will respond to events only when the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic fill area and `fill` takes a non-`none` value; or triggered in the graphic stroke area and `stroke` takes a non-`none` value
- **`visiblefill`**: Will respond to events only when the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic fill area, not affected by the `fill` value
- **`visiblestroke`**: Will respond to events only when the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic stroke area, not affected by the `stroke` value
- **`visible`**: Will respond to events only when the following conditions are met:
  - `visibility` is set to `visible`, i.e., the graphic is visible
  - Triggered in the graphic fill or stroke area, not affected by `fill` and `stroke` values
- **`painted`**: Will respond to events only when the following conditions are met:
  - Triggered in the graphic fill area and `fill` takes a non-`none` value; or triggered in the graphic stroke area and `stroke` takes a non-`none` value
  - Not affected by `visibility` value
- **`fill`**: Will respond to events only when the following conditions are met:
  - Triggered in the graphic fill area, not affected by the `fill` value
  - Not affected by `visibility` value
- **`stroke`**: Will respond to events only when the following conditions are met:
  - Triggered in the graphic stroke area, not affected by the `stroke` value
  - Not affected by `visibility` value
- **`all`**: Will respond to events as long as entering the graphic fill and stroke areas, not affected by `fill`, `stroke`, `visibility` values

**Usage Examples:**

```js
// Example 1: Only stroke area responds to events
const graph = new Graph({
  combo: {
    style: {
      fill: 'none',
      stroke: '#000',
      lineWidth: 2,
      pointerEvents: 'stroke', // Only stroke responds to events
    },
  },
});

// Example 2: Does not respond to events at all
const graph = new Graph({
  combo: {
    style: {
      pointerEvents: 'none', // Combo does not respond to any events
    },
  },
});
```

#### Cursor

Available values: `auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

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
| zIndex                          | Combo rendering layer                                                                                                                             | number                                                                          | 0         |          |
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

```js | ob { pin: false, inject: true }
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

```js | ob { pin: false, inject: true }
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
| collapsedMarkerType           | Marker type displayed when the combo is collapsed <br> - `'child-count'`: Number of child elements (including Node and Combo) <br>- `'descendant-count'`: Number of descendant elements (including Node and Combo) <br>- `'node-count'`: Number of descendant elements (only including Node) <br> - `(children: NodeLikeData[]) => string`: Custom processing logic | `child-count` \| `descendant-count` \| `node-count` \| ((children: NodeData \| ComboData[]) => string)                             | `child-count` |          |
| collapsedMarkerFill           | Icon text color                                                                                                                                                                                                                                                                                                                                                     | string                                                                                                                             | #fff          |          |
| collapsedMarkerFillOpacity    | Icon text color opacity                                                                                                                                                                                                                                                                                                                                             | number                                                                                                                             | 1             |          |
| collapsedMarkerFontSize       | Icon font size                                                                                                                                                                                                                                                                                                                                                      | number                                                                                                                             | 12            |          |
| collapsedMarkerFontWeight     | Icon font weight                                                                                                                                                                                                                                                                                                                                                    | number \| string                                                                                                                   | `normal`      |          |
| collapsedMarkerRadius         | Icon corner radius                                                                                                                                                                                                                                                                                                                                                  | number                                                                                                                             | 0             |          |
| collapsedMarkerSrc            | Image source. Its priority is higher than `collapsedMarkerText`                                                                                                                                                                                                                                                                                                     | string                                                                                                                             | -             |          |
| collapsedMarkerText           | Icon text                                                                                                                                                                                                                                                                                                                                                           | string                                                                                                                             | -             |          |
| collapsedMarkerTextAlign      | Icon text horizontal alignment                                                                                                                                                                                                                                                                                                                                      | `center`  `end`  `left`  `right`  `start`                                                                                      | `center`      |          |
| collapsedMarkerTextBaseline   | Icon text alignment baseline                                                                                                                                                                                                                                                                                                                                        | `alphabetic`  `bottom`  `hanging`  `ideographic`  `middle`  `top`                                                             | `middle`      |          |
| collapsedMarkerWidth          | Icon width                                                                                                                                                                                                                                                                                                                                                          | number                                                                                                                             | -             |          |
| collapsedMarkerHeight         | Icon height                                                                                                                                                                                                                                                                                                                                                         | number                                                                                                                             | -             |          |
| collapsedMarkerZIndex         | Icon rendering layer                                                                                                                                                                                                                                                                                                                                                | number                                                                                                                             | 1             |          |
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

```js | ob { pin: false, inject: true }
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

Labels are used to display text information for combos, supporting rich text style configuration and flexible position layout.

#### Basic Label Configuration

Add basic text label to combo:

```js | ob { inject: true }
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
      labelText: 'Sales Department', // Label text content
      labelFill: '#1A1A1A', // Label text color
      labelFontSize: 14, // Label font size
      labelPlacement: 'bottom', // Label position: bottom
    },
  },
});

graph.render();
```

#### Multi-line Text Label

Configure labels that support multi-line display:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 240,
  height: 120,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      labelText: 'This is a combo label text content that supports multi-line display',
      labelWordWrap: true, // Enable text wrapping
      labelMaxWidth: 100, // Maximum width 100px
      labelMaxLines: 3, // Maximum 3 lines
      labelTextAlign: 'center', // Center text alignment
      labelFontSize: 12,
    },
  },
});

graph.render();
```

#### Custom Style Label

Create labels with special styles:

```js | ob { inject: true }
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
      labelText: 'IMPORTANT',
      labelFill: '#FF4D4F', // Red text
      labelFontSize: 16,
      labelFontWeight: 'bold', // Bold
      labelFontStyle: 'italic', // Italic
      labelTextDecorationLine: 'underline', // Underline
      labelLetterSpacing: 2, // Letter spacing
      labelPlacement: 'top',
    },
  },
});

graph.render();
```

Here are the complete label style configurations:

| Property                 | Description                                                                                                                                                                | Type                                                                        | Default   | Required |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------- | -------- |
| label                    | Whether to show combo label                                                                                                                                                | boolean                                                                     | true      |          |
| labelCursor              | Cursor style when hovering over combo label, [options](#cursor)                                                                                                            | string                                                                      | `default` |          |
| labelFill                | Combo label text color                                                                                                                                                     | string                                                                      | #000      |          |
| labelFillOpacity         | Combo label text color opacity                                                                                                                                             | number                                                                      | 1         |          |
| labelFontFamily          | Combo label font family                                                                                                                                                    | string                                                                      | -         |          |
| labelFontSize            | Combo label font size                                                                                                                                                      | number                                                                      | 12        |          |
| labelFontStyle           | Combo label font style                                                                                                                                                     | `normal` \| `italic` \| `oblique`                                           | -         |          |
| labelFontVariant         | Combo label font variant                                                                                                                                                   | `normal` \| `small-caps` \| string                                          | -         |          |
| labelFontWeight          | Combo label font weight                                                                                                                                                    | `normal` \| `bold` \| `bolder` \| `lighter` \| number                       | 400       |          |
| labelLeading             | Line spacing                                                                                                                                                               | number                                                                      | 0         |          |
| labelLetterSpacing       | Combo label letter spacing                                                                                                                                                 | number \| string                                                            | -         |          |
| labelLineHeight          | Combo label line height                                                                                                                                                    | number \| string                                                            | -         |          |
| labelMaxLines            | Combo label maximum lines                                                                                                                                                  | number                                                                      | 1         |          |
| labelMaxWidth            | Combo label maximum width, [options](#labelmaxwidth)                                                                                                                       | number \| string                                                            | `200%`    |          |
| labelOffsetX             | Combo label X offset                                                                                                                                                       | number                                                                      | 0         |          |
| labelOffsetY             | Combo label Y offset                                                                                                                                                       | number                                                                      | 0         |          |
| labelPadding             | Combo label padding                                                                                                                                                        | number \| number[]                                                          | 0         |          |
| labelPlacement           | Combo label position relative to combo main graphic, [options](#labelplacement)                                                                                            | string                                                                      | `bottom`  |          |
| labelText                | Combo label text content                                                                                                                                                   | string                                                                      | -         |          |
| labelTextAlign           | Combo label text horizontal alignment                                                                                                                                      | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `left`    |          |
| labelTextBaseline        | Combo label text baseline                                                                                                                                                  | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | -         |          |
| labelTextDecorationColor | Combo label text decoration color                                                                                                                                          | string                                                                      | -         |          |
| labelTextDecorationLine  | Combo label text decoration line                                                                                                                                           | string                                                                      | -         |          |
| labelTextDecorationStyle | Combo label text decoration style                                                                                                                                          | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | -         |          |
| labelTextOverflow        | Combo label text overflow handling                                                                                                                                         | `clip` \| `ellipsis` \| string                                              | -         |          |
| labelTextPath            | Combo label text path                                                                                                                                                      | Path                                                                        | -         |          |
| labelWordWrap            | Whether combo label enables auto line wrapping. When labelWordWrap is enabled, parts exceeding labelMaxWidth automatically wrap                                            | boolean                                                                     | false     |          |
| labelZIndex              | Combo label rendering layer                                                                                                                                                | number                                                                      | 0         |          |
| `label{StyleProps}`      | More label style configurations, refer to [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) property values. For example, labelOpacity represents label opacity | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)                | -         |          |

#### LabelPlacement

Label position relative to combo main graphic, available values:

- `center`: Label at combo center
- `top`, `bottom`, `left`, `right`: Label at top, bottom, left, right of combo
- `top-left`, `top-right`, `bottom-left`, `bottom-right`: Label at four corners of combo
- `left-top`, `left-bottom`, `right-top`, `right-bottom`: Label at edge endpoints of combo

#### LabelMaxWidth

When auto line wrapping `labelWordWrap` is enabled, text wraps when exceeding this width:

- string: Defines maximum width as percentage relative to combo element width. For example, `50%` means label width doesn't exceed half of combo width
- number: Defines maximum width in pixels. For example, 100 means label maximum width is 100 pixels

For example, setting multi-line label text:

```json
{
  "labelWordWrap": true,
  "labelMaxWidth": 200,
  "labelMaxLines": 3
}
```

### Label Background Style

Label background provides background decoration for label text, improving label readability and visual effects.

#### Basic Background Style

Add simple background to label:

```js | ob { inject: true }
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
      labelText: 'Important Combo',
      labelFill: '#fff', // White text
      labelBackground: true, // Enable background
      labelBackgroundFill: '#1783FF', // Blue background
      labelBackgroundPadding: [4, 8], // Padding: vertical 4px, horizontal 8px
      labelBackgroundRadius: 4, // Border radius
    },
  },
});

graph.render();
```

#### Gradient Background Effect

Create label background with gradient effect:

```js | ob { inject: true }
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
      labelText: 'VIP Combo',
      labelFill: '#fff',
      labelFontWeight: 'bold',
      labelBackground: true,
      labelBackgroundFill: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)', // Gradient background
      labelBackgroundPadding: [6, 12],
      labelBackgroundRadius: 20, // Large border radius
      labelBackgroundShadowColor: 'rgba(0,0,0,0.2)',
      labelBackgroundShadowBlur: 4,
      labelBackgroundShadowOffsetY: 2,
    },
  },
});

graph.render();
```

#### Stroke-only Background Style

Create label background with stroke only:

```js | ob { inject: true }
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
      labelText: 'Border Label',
      labelFill: '#1783FF',
      labelBackground: true,
      labelBackgroundFill: 'transparent', // Transparent background
      labelBackgroundStroke: '#1783FF', // Blue stroke
      labelBackgroundLineWidth: 2, // Stroke width
      labelBackgroundPadding: [4, 8],
      labelBackgroundRadius: 8,
    },
  },
});

graph.render();
```

Here are the complete label background style configurations:

| Property                      | Description                                                                                                                                                                                                | Type                                                         | Default      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------ |
| labelBackground               | Whether to show combo label background                                                                                                                                                                     | boolean                                                      | false        |
| labelBackgroundCursor         | Combo label background cursor style, [options](#cursor)                                                                                                                                                    | string                                                       | `default`    |
| labelBackgroundFill           | Combo label background fill color                                                                                                                                                                          | string                                                       | #000         |
| labelBackgroundFillOpacity    | Combo label background opacity                                                                                                                                                                             | number                                                       | 0.75         |
| labelBackgroundHeight         | Combo label background height                                                                                                                                                                              | string \| number                                             | -            |
| labelBackgroundLineDash       | Combo label background dash configuration                                                                                                                                                                  | number \| string \|(number \| string )[]                     | -            |
| labelBackgroundLineDashOffset | Combo label background dash offset                                                                                                                                                                         | number                                                       | -            |
| labelBackgroundLineWidth      | Combo label background stroke line width                                                                                                                                                                   | number                                                       | -            |
| labelBackgroundPadding        | Combo label background padding                                                                                                                                                                             | number \| number[]                                           | [2, 4, 2, 4] |
| labelBackgroundRadius         | Combo label background border radius <br> - number: Set all four corner radius uniformly <br> - number[]: Set four corner radius separately, missing values auto-filled                                    | number \| number[]                                           | 0            |
| labelBackgroundShadowBlur     | Combo label background shadow blur                                                                                                                                                                         | number                                                       | -            |
| labelBackgroundShadowColor    | Combo label background shadow color                                                                                                                                                                        | string                                                       | -            |
| labelBackgroundShadowOffsetX  | Combo label background shadow X offset                                                                                                                                                                     | number                                                       | -            |
| labelBackgroundShadowOffsetY  | Combo label background shadow Y offset                                                                                                                                                                     | number                                                       | -            |
| labelBackgroundStroke         | Combo label background stroke color                                                                                                                                                                        | string                                                       | -            |
| labelBackgroundStrokeOpacity  | Combo label background stroke opacity                                                                                                                                                                      | number \| string                                             | 1            |
| labelBackgroundVisibility     | Whether combo label background is visible                                                                                                                                                                  | `visible` \| `hidden`                                        | -            |
| labelBackgroundZIndex         | Combo label background rendering layer                                                                                                                                                                     | number                                                       | 1            |
| `labelBackground{StyleProps}` | More label background style configurations, refer to [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) property values. For example, labelBackgroundOpacity represents label background opacity | [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect) | -            |

### Badge Style

Badges are small markers displayed on combos, usually used to show status, quantity, or other auxiliary information. Multiple badges can be displayed simultaneously with customizable positions.

#### Single Badge

Add a simple badge to the combo:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      badges: [
        { text: 'NEW' }, // Display at top by default
      ],
    },
  },
});

graph.render();
```

#### Multiple Badges

Add multiple badges at different positions to the combo:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    style: {
      badge: true, // Whether to show badges
      badges: [
        { text: 'A', placement: 'right-top' },
        { text: 'Important', placement: 'right' },
        { text: 'Notice', placement: 'right-bottom' },
      ],
      badgePalette: ['#7E92B5', '#F4664A', '#FFBE3A'], // Badge background palette
      badgeFontSize: 7, // Badge font size
    },
  },
});

graph.render();
```

#### Custom Badge Style

Fully customize badge appearance:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
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

Here are the complete badge style configurations:

| Property     | Description                    | Type                                  | Default                           |
| ------------ | ------------------------------ | ------------------------------------- | --------------------------------- |
| badge        | Whether to show combo badge    | boolean                               | true                              |
| badgePalette | Combo badge background palette | string[]                              | [`#7E92B5`, `#F4664A`, `#FFBE3A`] |
| badges       | Combo badge settings           | [BadgeStyleProps](#badgestyleprops)[] | -                                 |

#### BadgeStyleProps

| Property                 | Description                                                                                                                                                                                                                                                                                            | Type                                                                                                                                                                   | Default      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| background               | Whether to show combo badge background                                                                                                                                                                                                                                                                 | boolean                                                                                                                                                                | true         |
| backgroundCursor         | Combo badge background cursor style, [options](#cursor)                                                                                                                                                                                                                                                | string                                                                                                                                                                 | `default`    |
| backgroundFill           | Combo badge background fill color. If not specified, consider badgePalette for sequential allocation                                                                                                                                                                                                   | string                                                                                                                                                                 | -            |
| backgroundFillOpacity    | Combo badge background fill opacity                                                                                                                                                                                                                                                                    | number                                                                                                                                                                 | 1            |
| backgroundFilter         | Combo badge background filter                                                                                                                                                                                                                                                                          | string                                                                                                                                                                 | -            |
| backgroundHeight         | Combo badge background height                                                                                                                                                                                                                                                                          | number \| string                                                                                                                                                       | -            |
| backgroundLineDash       | Combo badge background dash configuration                                                                                                                                                                                                                                                              | number \| string \|(number \| string )[]                                                                                                                               | -            |
| backgroundLineDashOffset | Combo badge background dash offset                                                                                                                                                                                                                                                                     | number                                                                                                                                                                 | -            |
| backgroundLineWidth      | Combo badge background stroke line width                                                                                                                                                                                                                                                               | number                                                                                                                                                                 | -            |
| backgroundRadius         | Combo badge background border radius <br> - number: Set all four corner radius uniformly <br> - number[]: Set four corner radius separately, missing values will be filled <br> - string: Similar to [CSS padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) property, space-separated | number \| number[] \| string                                                                                                                                           | 0            |
| backgroundShadowBlur     | Combo badge background shadow blur                                                                                                                                                                                                                                                                     | number                                                                                                                                                                 | -            |
| backgroundShadowColor    | Combo badge background shadow color                                                                                                                                                                                                                                                                    | string                                                                                                                                                                 | -            |
| backgroundShadowOffsetX  | Combo badge background shadow X offset                                                                                                                                                                                                                                                                 | number                                                                                                                                                                 | -            |
| backgroundShadowOffsetY  | Combo badge background shadow Y offset                                                                                                                                                                                                                                                                 | number                                                                                                                                                                 | -            |
| backgroundStroke         | Combo badge background stroke color                                                                                                                                                                                                                                                                    | string                                                                                                                                                                 | -            |
| backgroundStrokeOpacity  | Combo badge background stroke opacity                                                                                                                                                                                                                                                                  | number \| string                                                                                                                                                       | 1            |
| backgroundVisibility     | Whether combo badge background is visible                                                                                                                                                                                                                                                              | `visible` \| `hidden`                                                                                                                                                  | -            |
| fill                     | Combo badge text color                                                                                                                                                                                                                                                                                 | string                                                                                                                                                                 | -            |
| fontFamily               | Combo badge font family                                                                                                                                                                                                                                                                                | string                                                                                                                                                                 | -            |
| fontSize                 | Combo badge font size                                                                                                                                                                                                                                                                                  | number                                                                                                                                                                 | 8            |
| fontStyle                | Combo badge font style                                                                                                                                                                                                                                                                                 | `normal` \| `italic` \| `oblique`                                                                                                                                      | `normal`     |
| fontVariant              | Combo badge font variant                                                                                                                                                                                                                                                                               | `normal` \| `small-caps` \| string                                                                                                                                     | `normal`     |
| fontWeight               | Combo badge font weight                                                                                                                                                                                                                                                                                | number \| string                                                                                                                                                       | `normal`     |
| lineHeight               | Combo badge line height                                                                                                                                                                                                                                                                                | string \| number                                                                                                                                                       | -            |
| lineWidth                | Combo badge line width                                                                                                                                                                                                                                                                                 | string \| number                                                                                                                                                       | -            |
| maxLines                 | Combo badge text maximum lines                                                                                                                                                                                                                                                                         | number                                                                                                                                                                 | 1            |
| offsetX                  | Combo badge X offset                                                                                                                                                                                                                                                                                   | number                                                                                                                                                                 | 0            |
| offsetY                  | Combo badge Y offset                                                                                                                                                                                                                                                                                   | number                                                                                                                                                                 | 0            |
| padding                  | Combo badge padding                                                                                                                                                                                                                                                                                    | number \| number[]                                                                                                                                                     | 0            |
| placement                | Combo badge position relative to combo main graphic. If not specified, defaults to clockwise placement starting from top-right                                                                                                                                                                         | `left` \| `right` \| `top` \| `bottom` \| `left-top` \| `left-bottom` \| `right-top` \| `right-bottom` \| `top-left` \| `top-right` \| `bottom-left` \| `bottom-right` | -            |
| text                     | Combo badge text content                                                                                                                                                                                                                                                                               | string                                                                                                                                                                 | -            |
| textAlign                | Combo badge text horizontal alignment                                                                                                                                                                                                                                                                  | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`                                                                                                          | `left`       |
| textBaseline             | Combo badge text baseline                                                                                                                                                                                                                                                                              | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom`                                                                                            | `alphabetic` |
| textDecorationColor      | Combo badge text decoration color                                                                                                                                                                                                                                                                      | string                                                                                                                                                                 | -            |
| textDecorationLine       | Combo badge text decoration line                                                                                                                                                                                                                                                                       | string                                                                                                                                                                 | -            |
| textDecorationStyle      | Combo badge text decoration style                                                                                                                                                                                                                                                                      | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                                                                                                                  | `solid`      |
| textOverflow             | Combo badge text overflow handling                                                                                                                                                                                                                                                                     | `clip` \| `ellipsis` \| string                                                                                                                                         | `clip`       |
| visibility               | Whether combo badge is visible                                                                                                                                                                                                                                                                         | `visible` \| `hidden`                                                                                                                                                  | -            |
| wordWrap                 | Whether combo badge text auto-wraps                                                                                                                                                                                                                                                                    | boolean                                                                                                                                                                | -            |
| zIndex                   | Combo badge rendering layer                                                                                                                                                                                                                                                                            | number                                                                                                                                                                 | 3            |

### Halo Style

Halo effect is used to highlight combos, usually used in mouse hover, selected, or active states, adding glow effect around combos.

#### Basic Halo Effect

Add simple halo effect to combo:

```js | ob { inject: true }
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
      halo: true, // Enable halo
      haloStroke: '#1783FF', // Blue halo
      haloLineWidth: 8, // Halo width
      haloStrokeOpacity: 0.3, // Halo opacity
    },
  },
});

graph.render();
```

#### Colorful Halo Effect

Create colorful gradient halo effect:

```js | ob { inject: true }
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
      haloStroke: '#FF4D4F', // Red halo
      haloLineWidth: 12, // Thicker halo
      haloStrokeOpacity: 0.5,
      haloFilter: 'blur(2px)', // Blur filter effect
    },
  },
});

graph.render();
```

#### Dynamic Halo Effect

Use halo effect in state transitions:

```js | ob { inject: true }
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
      // No halo in default state
      halo: false,
    },
    state: {
      // Show orange halo in hover state
      hover: {
        halo: true,
        haloStroke: '#FF7A00',
        haloLineWidth: 10,
        haloStrokeOpacity: 0.4,
      },
      // Show green halo in selected state
      selected: {
        halo: true,
        haloStroke: '#52C41A',
        haloLineWidth: 6,
        haloStrokeOpacity: 0.6,
      },
    },
  },
});

graph.render();
```

Here are the complete halo style configurations:

| Property           | Description                                                                                                                                                                       | Type                                                                  | Default                         | Required |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------- | -------- |
| halo               | Whether to show combo halo                                                                                                                                                        | boolean                                                               | false                           |          |
| haloCursor         | Combo halo cursor style, [options](#cursor)                                                                                                                                       | string                                                                | `default`                       |          |
| haloDraggable      | Whether combo halo allows dragging                                                                                                                                                | boolean                                                               | true                            |          |
| haloDroppable      | Whether combo halo allows receiving dragged elements                                                                                                                              | boolean                                                               | false                           |          |
| haloFill           | Halo fill color                                                                                                                                                                   | string                                                                | Same as main graphic fill color |          |
| haloFillRule       | Combo halo fill rule                                                                                                                                                              | `nonzero` \| `evenodd`                                                | -                               |          |
| haloFilter         | Combo halo filter effect, such as 'blur(2px)' for blur effect                                                                                                                     | string                                                                | -                               |          |
| haloLineWidth      | Combo halo stroke width, controls halo thickness                                                                                                                                  | number                                                                | 12                              |          |
| haloPointerEvents  | Whether combo halo effect responds to pointer events, [options](#pointerevents)                                                                                                   | string                                                                | `none`                          |          |
| haloStroke         | Combo halo stroke color, **this property is used to set the color of halo around combo, helping to highlight the combo**                                                          | string                                                                | `#99add1`                       |          |
| haloStrokeOpacity  | Combo halo stroke opacity, recommended to use 0.2-0.6 values for natural halo effect                                                                                              | number                                                                | 0.25                            |          |
| haloVisibility     | Combo halo visibility                                                                                                                                                             | `visible` \| `hidden`                                                 | `visible`                       |          |
| haloZIndex         | Combo halo rendering layer, usually set to negative value to ensure halo is below combo main graphic                                                                              | number                                                                | -1                              |          |
| `halo{StyleProps}` | More halo style configurations, refer to [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) options. For example, haloFillOpacity represents halo fill opacity | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -                               |          |

**Halo Usage Recommendations:**

1. **Performance Consideration**: Halo effects increase rendering burden, recommend enabling only when necessary
2. **Color Matching**: Halo color should coordinate with combo main color tone, avoid being too abrupt
3. **Opacity Setting**: Reasonable opacity (0.2-0.6) can create natural halo effect
4. **State Application**: Halo is usually used for hover, selected, active and other interactive states

### Icon Style

Icons are used to display text or image content in combos, usually located at the center of the combo, can be used to represent combo type or function.

#### Text Icon

Use text as combo icon:

```js | ob { inject: true }
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
      iconText: 'A', // Display letter A
      iconFill: '#1783FF', // Blue text
      iconFontSize: 24, // Large font
      iconFontWeight: 'bold', // Bold
    },
  },
});

graph.render();
```

#### Image Icon

Use image as combo icon:

```js | ob { inject: true }
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
      fill: '#1890FF',
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      iconWidth: 32,
      iconHeight: 32,
    },
  },
});

graph.render();
```

#### Colorful Text Icon

Create text icon with special styles:

```js | ob { inject: true }
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
      iconText: 'Dept',
      iconFill: '#FF4D4F', // Red text
      iconFontSize: 16,
      iconFontWeight: 'bold',
      iconFontStyle: 'italic', // Italic
      iconTextDecorationLine: 'underline', // Underline
      iconLetterSpacing: 1, // Letter spacing
    },
  },
});

graph.render();
```

Here are the complete icon style configurations:

| Property                | Description                                                                                                               | Type                                                                        | Default                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------- |
| icon                    | Whether to show combo icon                                                                                                | boolean                                                                     | true                        |
| iconCursor              | Combo icon cursor style, [options](#cursor)                                                                               | string                                                                      | `default`                   |
| iconFill                | Combo icon text color                                                                                                     | string                                                                      | -                           |
| iconFillOpacity         | Combo icon text color opacity                                                                                             | number                                                                      | 1                           |
| iconFontFamily          | Combo icon font family                                                                                                    | string                                                                      | -                           |
| iconFontSize            | Combo icon font size                                                                                                      | number                                                                      | 16                          |
| iconFontStyle           | Combo icon font style                                                                                                     | `normal` \| `italic` \| `oblique`                                           | `normal`                    |
| iconFontVariant         | Combo icon font variant                                                                                                   | `normal` \| `small-caps` \| string                                          | `normal`                    |
| iconFontWeight          | Combo icon font weight                                                                                                    | number \| string                                                            | `normal`                    |
| iconHeight              | Combo icon height, used to control image size when using image icon                                                       | number                                                                      | Half of main graphic height |
| iconLetterSpacing       | Combo icon text letter spacing                                                                                            | number \| string                                                            | -                           |
| iconLineHeight          | Combo icon text line height                                                                                               | number \| string                                                            | -                           |
| iconMaxLines            | Combo icon text maximum lines                                                                                             | number                                                                      | 1                           |
| iconOffsetX             | Combo icon X offset                                                                                                       | number                                                                      | 0                           |
| iconOffsetY             | Combo icon Y offset                                                                                                       | number                                                                      | 0                           |
| iconOpacity             | Combo icon opacity                                                                                                        | number                                                                      | 1                           |
| iconRadius              | Combo icon border radius (only effective for rectangular icons)                                                           | number                                                                      | 0                           |
| iconSrc                 | Combo image source. Has higher priority than iconText, supports local and network images                                  | string                                                                      | -                           |
| iconText                | Combo icon text content, supports text, Unicode characters, etc.                                                          | string                                                                      | -                           |
| iconTextAlign           | Combo icon text horizontal alignment                                                                                      | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               | `center`                    |
| iconTextBaseline        | Combo icon text baseline                                                                                                  | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom` | `middle`                    |
| iconTextDecorationColor | Combo icon text decoration color                                                                                          | string                                                                      | -                           |
| iconTextDecorationLine  | Combo icon text decoration line, such as underline, strikethrough, etc.                                                   | string                                                                      | -                           |
| iconTextDecorationStyle | Combo icon text decoration style                                                                                          | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       | `solid`                     |
| iconTextOverflow        | Combo icon text overflow handling                                                                                         | `clip` \| `ellipsis` \| string                                              | `clip`                      |
| iconVisibility          | Whether combo icon is visible                                                                                             | `visible` \| `hidden`                                                       | `visible`                   |
| iconWidth               | Combo icon width, used to control image size when using image icon                                                        | number                                                                      | Half of main graphic width  |
| iconWordWrap            | Whether combo icon text auto-wraps                                                                                        | boolean                                                                     | false                       |
| iconZIndex              | Combo icon rendering layer                                                                                                | number                                                                      | 1                           |
| `icon{StyleProps}`      | More icon style configurations, refer to specific icon type options. For example, iconStroke represents icon stroke color | -                                                                           | -                           |

**Icon Usage Recommendations:**

1. **Priority**: `iconSrc` (image) has higher priority than `iconText` (text), if both are set, image will be displayed first
2. **Size Control**: Recommend setting icon size reasonably according to combo size, avoid icons being too large or small affecting visual effect
3. **Performance Optimization**: Text icons have better performance, image icons require additional network requests and rendering overhead
4. **Style Consistency**: Icon styles in the same graph should be consistent to improve overall visual effect
5. **Accessibility**: Ensure icon color has sufficient contrast with background for easy user identification

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

```js | ob { pin: false, inject: true }
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

**⚠️ Dynamic Configuration**: State configuration also supports dynamic configuration, which can be used to set styles dynamically based on combo data:

```js
const graph = new Graph({
  combo: {
    state: {
      // Static configuration
      selected: {
        stroke: '#1783FF',
        lineWidth: 2,
      },

      // Dynamic configuration - arrow function form
      hover: (datum) => ({
        fill: datum.data.isVIP ? '#FFD700' : '#1783FF',
        fillOpacity: 0.3,
      }),

      // Dynamic configuration - regular function form (access to graph instance)
      active: function (datum) {
        console.log(this); // graph instance
        return {
          stroke: datum.data.level > 3 ? '#FF4D4F' : '#52C41A',
          lineWidth: 3,
        };
      },
    },
  },
});
```

**⚠️ State Priority**: When a combo has multiple states simultaneously, the style merge follows the following priority (high to low):

1. Later defined states override earlier defined states
2. More specific selectors have higher priority
3. Dynamic configuration has higher priority than static configuration

For example, if a combo has both `selected` and `hover` states, and `hover` is defined after `selected`, then `hover` state styles will override `selected` state styles.

## Animation

Defines the animation effects for combos, supporting the following two configuration methods:

1. Disable all combo animations

```json
{
  "combo": {
    "animation": false
  }
}
```

2. Configure stage animations

Stage animations refer to animation effects when combos enter the canvas, update, or leave the canvas. Currently supported stages include:

- `enter`: Animation when combo enters the canvas
- `update`: Animation when combo updates
- `exit`: Animation when combo leaves the canvas
- `show`: Animation when combo shows from hidden state
- `hide`: Animation when combo hides
- `collapse`: Animation when combo collapses
- `expand`: Animation when combo expands

You can refer to [Animation Paradigm](/en/manual/animation/animation#animation-paradigm) to use animation syntax to configure combos, such as:

#### Enter Animation

Configure animation when combo enters the canvas:

```js | ob { inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 200,
  height: 100,
  autoFit: 'center',
  data: {
    nodes: [{ id: 'node1', combo: 'combo1' }],
    combos: [{ id: 'combo1' }],
  },
  combo: {
    animation: {
      enter: [
        {
          fields: ['opacity'], // Animate opacity property
          from: 0, // Start from 0
          to: 1, // End at 1
          duration: 1000, // Animation duration
          easing: 'ease-out', // Easing function
        },
      ],
    },
  },
});

graph.render();
```

#### Update Animation

Configure animation when combo updates:

```js
const graph = new Graph({
  combo: {
    animation: {
      update: [
        {
          fields: ['x', 'y'], // Only animate x and y properties during update
          duration: 1000, // Animation duration
          easing: 'linear', // Easing function
        },
      ],
    },
  },
});
```

#### Exit Animation

Configure animation when combo leaves the canvas:

```js
const graph = new Graph({
  combo: {
    animation: {
      exit: [
        {
          fields: ['opacity'], // Animate opacity property
          to: 0, // End at 0
          duration: 500, // Animation duration
          easing: 'ease-in', // Easing function
        },
      ],
    },
  },
});
```

#### Show/Hide Animation

Configure animation when combo shows/hides:

```js
const graph = new Graph({
  combo: {
    animation: {
      show: [
        {
          fields: ['opacity'],
          from: 0,
          to: 1,
          duration: 300,
        },
      ],
      hide: [
        {
          fields: ['opacity'],
          to: 0,
          duration: 300,
        },
      ],
    },
  },
});
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

You can pass `false` to disable specific stage animations:

```json
{
  "combo": {
    "animation": {
      "enter": false // Disable combo enter animation
    }
  }
}
```

**Animation Configuration Options:**

| Property  | Description                             | Type                                                        | Default  |
| --------- | --------------------------------------- | ----------------------------------------------------------- | -------- |
| fields    | Properties to animate                   | string[]                                                    | -        |
| from      | Starting value                          | number \| string                                            | -        |
| to        | Ending value                            | number \| string                                            | -        |
| duration  | Animation duration (milliseconds)       | number                                                      | 1000     |
| easing    | Easing function                         | string                                                      | 'ease'   |
| delay     | Animation delay (milliseconds)          | number                                                      | 0        |
| repeat    | Number of repetitions (-1 for infinite) | number                                                      | 0        |
| direction | Animation direction                     | 'normal' \| 'reverse' \| 'alternate' \| 'alternate-reverse' | 'normal' |

## Palette

Defines combo color palette, i.e., predefined combo color pool, and allocates according to rules, mapping colors to the `fill` property.

> For palette definition, please refer to [Palette](/en/manual/theme/palette).

| Property | Description                                                                                                          | Type                              | Default |
| -------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------- |
| type     | Specifies current palette type. <br> - `group`: Discrete palette <br> - `value`: Continuous palette                  | `group` &#124; `value`            | `group` |
| field    | Specifies grouping field in element data. If not specified, defaults to id as grouping field                         | string &#124; ((datum) => string) | `id`    |
| color    | Palette colors. If palette is registered, you can directly specify its registration name, also accepts a color array | string &#124; string[]            | -       |
| invert   | Whether to invert the palette                                                                                        | boolean                           | false   |

For example, assign combo colors to a group of data by `category` field, so that combos of the same category have the same color:

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

```js | ob { pin: false, inject: true }
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

You can also use default configuration:

```json
{
  "combo": {
    "palette": "tableau" // tableau is palette name, defaults to assign colors by ID
  }
}
```

The effect is as follows:

```js | ob { pin: false, inject: true }
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
