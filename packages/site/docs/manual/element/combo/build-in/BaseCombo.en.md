---
title: Combo Options
order: 0
---

This article introduces the configuration of combo attributes, with the configuration located as follows:

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  combo: {
    type: 'circle',
    style: {},
    state: {},
    palette: {},
    animation: {},
  },
});
```

| Attribute | Description                                                                        | Type                                             | Default Value |
| --------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ | ------------- |
| type      | The type of the combo, either a built-in combo type or a custom combo name         | string                                           | `circle`      |
| style     | The combo's style, including color, size, etc.                                     | [Style](#style-attributes-style)                 | -             |
| state     | Defines the style of the combo in different states                                 | Record<string, [Style](#style-attributes-style)> | -             |
| palette   | Defines the color palette of the combo, used to map colors based on different data | [Palette](#palette-attributes-palette)           | -             |
| animation | Defines the animation effect of the combo                                          | [Animation](#animation-attributes-animation)     | -             |

## Type Attribute (type)

Specifies the type of the combo, which can be either the name of a built-in combo type or a custom combo name. The default is `circle` (circular combo).

For more built-in combo types, see the [Combo Registry](/en/manual/getting-started/extensions#combos).

## Style Attributes (style)

Defines the style of the combo, including color, size, etc.

<img width="240" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z-OxR4MAdUwAAAAAAAAAAAAADmJ7AQ/original" />

> To understand the composition of a combo, please read [Core Concepts - Elements - Combo](/en/manual/core-concept/element#combo).

The following style configurations will be explained in terms of atomic styles:

### Expand Style (key)

| Attribute      | Description                                                                                                                                                                          | Type                                                                      | Default Value |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ------------- |
| x              | x coordinate                                                                                                                                                                         | number                                                                    | 0             |
| y              | y coordinate                                                                                                                                                                         | number                                                                    | 0             |
| z              | z coordinate                                                                                                                                                                         | number                                                                    | 0             |
| padding        | Padding inside the combo, effective only when expanded. When expanded, the size of the combo is determined by the bounding box of its child elements and the padding.                | number &#124; number[]                                                    | 0             |
| fill           | Fill color                                                                                                                                                                           | string                                                                    | `#fff`        |
| stroke         | Border color                                                                                                                                                                         | string                                                                    | `#000`        |
| lineWidth      | Border width                                                                                                                                                                         | number                                                                    | 1             |
| `{StyleProps}` | More options, refer to [BaseStyleProps](https://g.antv.antgroup.com/en/api/basic/display-object) for details. For example, fillOpacity refers to the fill opacity of the main shape. | [BaseStyleProps](https://g.antv.antgroup.com/en/api/basic/display-object) | -             |

### Collapsed Style (collapsed)

| Attribute               | Description                                                                                                                                                                                 | Type                                                                                         | Default Value |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------- |
| collapsed               | Whether the combo is expanded or not                                                                                                                                                        | boolean                                                                                      | false         |
| collapsedSize           | The default size of the combo when collapsed                                                                                                                                                | number &#124; [number, number] &#124; [number, number, number]                               | 32            |
| collapseFill            | Fill color                                                                                                                                                                                  | string                                                                                       | `#fff`        |
| collapsedStroke         | Border color                                                                                                                                                                                | string                                                                                       | `#000`        |
| collapsedLineWidth      | Border width                                                                                                                                                                                | number                                                                                       | 1             |
| `collapsed{StyleProps}` | More options, refer to [BaseStyleProps](https://g.antv.antgroup.com/en/api/basic/display-object#drawing-properties). For example, fillOpacity refers to the fill opacity of the main shape. | [BaseStyleProps](https://g.antv.antgroup.com/en/api/basic/display-object#drawing-properties) | -             |

### Collapsed Marker Style (collapsedMarker)

| Attribute                     | Description                                                                                                                                                                                                                                                                                                                                                             | Type                                                                                                                                     | Default Value |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| collapsedMarker               | Whether to display the marker when the combo is collapsed                                                                                                                                                                                                                                                                                                               | boolean                                                                                                                                  | false         |
| collapsedMarkerType           | The type of marker displayed when the combo is collapsed <br> - `'child-count'`: Number of child elements (including Nodes and Combos) <br> - `'descendant-count'`: Number of descendant elements (including Nodes and Combos) <br> - `'node-count'`: Number of descendant elements (only Nodes) <br> - `(children: NodeLikeData[]) => string`: Custom processing logic | `child-count` &#124; `descendant-count` &#124; `node-count` &#124; ((children: NodeData &#124; ComboData[]) => string)                   | -             |
| collapsedMarkerSrc            | Image source. This takes priority over collapsedMarkerText                                                                                                                                                                                                                                                                                                              | string                                                                                                                                   | -             |
| collapsedMarkerWidth          | Image width                                                                                                                                                                                                                                                                                                                                                             | number                                                                                                                                   | -             |
| collapsedMarkerHeight         | Image height                                                                                                                                                                                                                                                                                                                                                            | number                                                                                                                                   | -             |
| collapsedMarkerRadius         | Image border radius                                                                                                                                                                                                                                                                                                                                                     | number                                                                                                                                   | 0             |
| collapsedMarkerText           | Text to display on the marker                                                                                                                                                                                                                                                                                                                                           | string                                                                                                                                   | -             |
| collapsedMarkerFill           | Marker text color                                                                                                                                                                                                                                                                                                                                                       | string                                                                                                                                   | -             |
| collapsedMarkerFontSize       | Marker font size                                                                                                                                                                                                                                                                                                                                                        | number                                                                                                                                   | 16            |
| collapsedMarkerFontWeight     | Marker font weight                                                                                                                                                                                                                                                                                                                                                      | number &#124; string                                                                                                                     | `normal`      |
| `collapsedMarker{StyleProps}` | More marker style configurations, refer to [TextStyleProps](https://g.antv.antgroup.com/en/api/basic/text) and [ImageStyleProps](https://g.antv.antgroup.com/en/api/basic/image). For example, collapsedMarkerFontSize refers to the font size of the text in the marker.                                                                                               | [TextStyleProps](https://g.antv.antgroup.com/en/api/basic/text) &#124; [ImageStyleProps](https://g.antv.antgroup.com/en/api/basic/image) | -             |

### Label Style (label)

| Attribute             | Description                                                                                                                                                                                                                                                                                                                                           | Type                                                                                                                                                                                                                               | Default Value |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| label                 | Whether to display the combo label                                                                                                                                                                                                                                                                                                                    | boolean                                                                                                                                                                                                                            | true          |
| labelText             | Label text content                                                                                                                                                                                                                                                                                                                                    | string                                                                                                                                                                                                                             | -             |
| labelFill             | Label text color                                                                                                                                                                                                                                                                                                                                      | string                                                                                                                                                                                                                             | -             |
| labelFontSize         | Label font size                                                                                                                                                                                                                                                                                                                                       | number                                                                                                                                                                                                                             | 12            |
| labelFontWeight       | Label font weight                                                                                                                                                                                                                                                                                                                                     | number &#124; string                                                                                                                                                                                                               | `normal`      |
| labelPlacement        | The position of the label relative to the main combo shape                                                                                                                                                                                                                                                                                            | `left` &#124; `right` &#124; `top` &#124; `bottom` &#124; `left-top` &#124; `left-bottom` &#124; `right-top` &#124; `right-bottom` &#124; `top-left` &#124; `top-right` &#124; `bottom-left` &#124; `bottom-right` &#124; `center` | `bottom`      |
| labelOffsetX          | Horizontal offset of the label                                                                                                                                                                                                                                                                                                                        | number                                                                                                                                                                                                                             | 0             |
| labelOffsetY          | Vertical offset of the label                                                                                                                                                                                                                                                                                                                          | number                                                                                                                                                                                                                             | 0             |
| labelWordWrap         | Whether to enable text wrapping. When labelWordWrap is enabled, text exceeding labelMaxWidth will automatically wrap                                                                                                                                                                                                                                  | boolean                                                                                                                                                                                                                            | false         |
| labelMaxWidth         | Maximum width of the label. When text wrapping is enabled, text will wrap if it exceeds this width <br> - string: Defined as a percentage of the combo width. For example, `50%` means the label width is no more than half of the combo width. <br> - number: Defined in pixels. For example, 100 means the maximum width of the label is 100 pixels | number &#124; string                                                                                                                                                                                                               | `200%`        |
| labelMaxLines         | Maximum number of lines for the label                                                                                                                                                                                                                                                                                                                 | number                                                                                                                                                                                                                             | 1             |
| labelPadding          | Padding inside the label                                                                                                                                                                                                                                                                                                                              | number &#124; number[]                                                                                                                                                                                                             | 0             |
| `label{StyleProps}`   | More label style configurations, refer to [TextStyleProps](https://g.antv.antgroup.com/en/api/basic/text). For example, labelFontSize refers to the font size of the label text.                                                                                                                                                                      | [TextStyleProps](https://g.antv.antgroup.com/en/api/basic/text)                                                                                                                                                                    | -             |
| labelBackground       | Whether to display the background                                                                                                                                                                                                                                                                                                                     | boolean                                                                                                                                                                                                                            | false         |
| labelBackgroundFill   | Background fill color                                                                                                                                                                                                                                                                                                                                 | string                                                                                                                                                                                                                             | -             |
| labelBackgroundRadius | Background border radius <br> - number: Sets all four corners with the same radius <br> - number[]: Sets each corner radius individually. If there are fewer than four values, the remaining ones are automatically filled                                                                                                                            | number &#124; number[]                                                                                                                                                                                                             |

## State Attributes (state)

In some interactive behaviors, such as clicking to select a node or hovering to activate an edge, a certain state is merely flagged for that element. To reflect these states in the visual space seen by the end user, we need to set different graphical element styles for different states to respond to changes in the state of the graphical element.

G6 provides several built-in states, including selected, highlighted, active, inactive, and disabled. Additionally, it supports custom states to meet more specific needs. For each state, developers can define a set of style rules that will override the default styles of the elements.

For example, when a combo is in the `focus` state, you can add a stroke with a width of 3 and an orange color.

```json
{
  "combo": {
    "state": {
      "focus": {
        "lineWidth": 3,
        "stroke": "orange",
        "fill": "orange",
        "fillOpacity": 0.2
      }
    }
  }
}
```

The effect is shown in the figure below:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 200, height: 100 },
);
```

## Animation Attributes (animation)

Defines the animation effect of the combo, and supports the following two configuration methods:

1. disable all animation of the combo

```json
{
  "combo": {
    "animation": false
  }
}
```

2. Configuring stage animation

Stage animation is the animation effect of a combo when it enters the graph, updates, and leaves the graph. Currently supported stages include:

- `enter`: animation when a combo enters the graph
- `update`: animation when the combo is updated.
- `exit`: animation when the combo leaves the graph
- `show`: animation when the combo is shown from hidden state
- `hide`: animation when the combo is hidden.
- `collapse`: animation when the combo is collapsed.
- `expand`: animation when the combo is expanded.

You can refer to [animation paradigm](/en/manual/core-concept/animation#animation-paradigm) to configure the combo using the animation syntax, e.g.:

```json
{
  "combo": {
    "animation": {
      "update": [
        {
          "fields": ["x", "y"], // update animates only the x and y attributes
          "duration": 1000, // duration of the animation
          "easing": "linear" // the easing function
        }
      ]
    }
  }
}
```

Built-in animation effects can also be used:

```json
{
  "combo": {
    "animation": {
      "enter": "fade", // use a fade animation
      "update": "translate", // Use a panning animation.
      "exit": "fade" // Use the fade animation.
    }
  }
}
```

You can pass in false to turn off animation for a particular stage:

```json
{
  "combo": {
    "animation": {
      "enter": false // Turn off the combo entry animation.
    }
  }
}
```

## Palette Attributes (palette)

Define the palette for combos, i.e., a predefined combo color pool, and allocate colors according to rules, mapping the colors to the `fill` property.

> For the definition of the palette, please refer to [Core Concepts - Palette](/en/manual/core-concept/palette).

| Attribute | Description                                                                                                            | Type                              | Default Value |
| --------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------- |
| type      | Specifies the current palette type. <br> - `group`: Discrete palette <br> - `value`: Continuous palette                | `group` &#124; `value`            | `group`       |
| field     | Specifies the grouping field in the element data. If not specified, the default is to take `id` as the grouping field  | string &#124; ((datum) => string) | `id`          |
| color     | Palette colors. If a palette is registered, you can directly specify its registered name, or accept an array of colors | string &#124; string[]            | -             |
| invert    | Whether to reverse the palette                                                                                         | boolean                           | false         |

For example, allocate combo colors for a set of data according to the `category` field, so that combos of the same category have the same color:

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

The effect is shown in the figure below:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 600, height: 100 },
);
```

You can also use the default configuration:

```json
{
  "combo": {
    "palette": "tableau" // 'tableau' is the name of the palette, by default colors are assigned based on ID
  }
}
```

The effect is shown in the figure below:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 600, height: 100 },
);
```
