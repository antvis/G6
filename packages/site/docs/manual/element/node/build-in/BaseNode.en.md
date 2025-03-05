---
title: Node Options
order: 0
---

This document introduces node properties.

| Property  | Description                                                               | Type                                             | Default Value |
| --------- | ------------------------------------------------------------------------- | ------------------------------------------------ | ------------- |
| type      | Node type, either a built-in node type name or a custom node name         | string                                           | `circle`      |
| style     | Node style, including color, size, etc.                                   | [Style](#style-property-style)                   | -             |
| state     | Defines styles for nodes in different states                              | Record<string, [Style](#style-properties-style)> | -             |
| palette   | Defines the color palette for nodes, used to map colors to different data | [Palette](#palette-properties-palette)           | -             |
| animation | Defines animation effects for nodes                                       | [Animation](#animation-properties)               | -             |

## style.Type Property `type`

Specifies the node type, either a built-in node type name or a custom node name. Defaults to `circle`. For more built-in supported node types, refer to the [Node Registry](/en/manual/getting-started/extensions#nodes).

## style.Style Property `style`

Defines the node's style, including color, size, etc.

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ot4bSbBx97EAAAAAAAAAAAAADmJ7AQ/original" />

> For an in-depth understanding of node composition, read [Core Concepts - Element - Node](/en/manual/core-concept/element#node).

The following style will be explained sequentially based on atomic shapes:

### style.Main Shape Style `key`

| Property       | Description                                                                                                                                                                                                                                       | Type                                                                               | Default Value |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------- |
| x              | x-coordinate                                                                                                                                                                                                                                      | number                                                                             | 0             |
| y              | y-coordinate                                                                                                                                                                                                                                      | number                                                                             | 0             |
| z              | z-coordinate                                                                                                                                                                                                                                      | number                                                                             | 0             |
| size           | Node size, a shortcut to set the width, height, and depth of the node <br> - If the value is a number, it sets the same width, height, and depth for the node <br> - If the value is an array, it specifies width, height, and depth sequentially | number &#124; [number, number] &#124; Float32Array &#124; [number, number, number] | 32            |
| fill           | Fill color                                                                                                                                                                                                                                        | string                                                                             | `#1783FF`     |
| stroke         | Stroke color                                                                                                                                                                                                                                      | string                                                                             | `#000`        |
| lineWidth      | Stroke width                                                                                                                                                                                                                                      | number &#124; string                                                               | 1             |
| collapsed      | Whether the current node/group is expanded                                                                                                                                                                                                        | boolean                                                                            | false         |
| `{StyleProps}` | Additional shape options, refer to [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) options. For instance, `fillOpacity` indicates the transparency of the main shape's fill color                                           | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object)              | -             |

### style.Label Style `label`

| Property                      | Description                                                                                                                                                                                                                                                                                                                                            | Type                                                                                                                                                                                                                               | Default Value |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| label                         | Whether to display the node label                                                                                                                                                                                                                                                                                                                      | boolean                                                                                                                                                                                                                            | true          |
| labelText                     | Label text content                                                                                                                                                                                                                                                                                                                                     | string                                                                                                                                                                                                                             | -             |
| labelFill                     | Label text color                                                                                                                                                                                                                                                                                                                                       | string                                                                                                                                                                                                                             | -             |
| labelFontSize                 | Label font size                                                                                                                                                                                                                                                                                                                                        | number                                                                                                                                                                                                                             | 12            |
| labelFontWeight               | Label font weight                                                                                                                                                                                                                                                                                                                                      | number &#124; string                                                                                                                                                                                                               | `normal`      |
| labelPlacement                | Label position relative to the main shape of the node                                                                                                                                                                                                                                                                                                  | `left` &#124; `right` &#124; `top` &#124; `bottom` &#124; `left-top` &#124; `left-bottom` &#124; `right-top` &#124; `right-bottom` &#124; `top-left` &#124; `top-right` &#124; `bottom-left` &#124; `bottom-right` &#124; `center` | `bottom`      |
| labelOffsetX                  | Label offset in the x-axis direction                                                                                                                                                                                                                                                                                                                   | number                                                                                                                                                                                                                             | 0             |
| labelOffsetY                  | Label offset in the y-axis direction                                                                                                                                                                                                                                                                                                                   | number                                                                                                                                                                                                                             | 0             |
| labelWordWrap                 | Whether to enable word wrapping. When `labelWordWrap` is enabled, content exceeding `labelMaxWidth` automatically wraps                                                                                                                                                                                                                                | boolean                                                                                                                                                                                                                            | false         |
| labelMaxWidth                 | Maximum label width. When word wrapping is enabled, the label wraps at this width <br> - `string`: Defines the maximum width as a percentage of the node width, e.g., `50%` means the label width does not exceed half of the node width <br> - `number`: Defines the maximum width in pixels, e.g., `100` means the maximum label width is 100 pixels | number &#124; string                                                                                                                                                                                                               | `200%`        |
| labelMaxLines                 | Maximum number of lines                                                                                                                                                                                                                                                                                                                                | number                                                                                                                                                                                                                             | 1             |
| labelPadding                  | Padding inside the label                                                                                                                                                                                                                                                                                                                               | number &#124; number[]                                                                                                                                                                                                             | 0             |
| `label{StyleProps}`           | Additional label style options, refer to [TextStyleProps](https://g.antv.antgroup.com/api/basic/text). For instance, `labelFontSize` specifies the label font size                                                                                                                                                                                     | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)                                                                                                                                                                       | -             |
| labelBackground               | Whether to display a background                                                                                                                                                                                                                                                                                                                        | boolean                                                                                                                                                                                                                            | false         |
| labelBackgroundFill           | Label background fill color                                                                                                                                                                                                                                                                                                                            | string                                                                                                                                                                                                                             | -             |
| labelBackgroundRadius         | Label background corner radius <br> - `number`: Sets the same radius for all four corners <br> - `number[]`: Sets the radius for each corner                                                                                                                                                                                                           | number &#124; number[]                                                                                                                                                                                                             | 0             |
| `labelBackground{StyleProps}` | Additional label background style options, refer to [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect). For instance, `labelBackgroundFillOpacity` specifies the transparency of the label background                                                                                                                                        | [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect)                                                                                                                                                                       | -             |

### style.Halo Style `halo`

| Property           | Description                                                                                                                                                                                        | Type                                                                  | Default Value                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------ |
| halo               | Whether to display a halo effect around the node                                                                                                                                                   | boolean                                                               | false                                      |
| haloFill           | Halo fill color                                                                                                                                                                                    | string                                                                | Same as the fill color of the main shape   |
| haloStroke         | Halo stroke color                                                                                                                                                                                  | string                                                                | Same as the stroke color of the main shape |
| haloLineWidth      | Halo stroke width                                                                                                                                                                                  | number                                                                | 3                                          |
| `halo{StyleProps}` | Additional halo style options, refer to [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object). For instance, `haloFillOpacity` specifies the transparency of the halo's fill color | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -                                          |

### style.Icon Style `icon`

| Property           | Description                                                                                                                                                                                                                                 | Type                                                                                                                               | Default Value                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| icon               | Whether to display an icon on the node                                                                                                                                                                                                      | boolean                                                                                                                            | true                            |
| iconSrc            | Image source. Overrides `iconText`                                                                                                                                                                                                          | string                                                                                                                             | -                               |
| iconWidth          | Image width                                                                                                                                                                                                                                 | number                                                                                                                             | Half of the main shape's width  |
| iconHeight         | Icon height                                                                                                                                                                                                                                 | number                                                                                                                             | Half of the main shape's height |
| iconRadius         | Icon corner radius                                                                                                                                                                                                                          | number                                                                                                                             | 0                               |
| iconText           | Icon text                                                                                                                                                                                                                                   | string                                                                                                                             | -                               |
| iconFill           | Icon text color                                                                                                                                                                                                                             | string                                                                                                                             | -                               |
| iconFontSize       | Icon font size                                                                                                                                                                                                                              | number                                                                                                                             | 16                              |
| iconFontWeight     | Icon font weight                                                                                                                                                                                                                            | number &#124; string                                                                                                               | `normal`                        |
| `icon{StyleProps}` | Additional icon style options, refer to [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) and [ImageStyleProps](https://g.antv.antgroup.com/api/basic/image). For instance, `iconFontSize` specifies the font size for icon text | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text) &#124; [ImageStyleProps](https://g.antv.antgroup.com/api/basic/image) | -                               |

### style.Badge Style `badges`

| Property             | Description                                                                                                                         | Type                                  | Default Value                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------------------------- |
| badge                | Whether to display node badges                                                                                                      | boolean                               | true                              |
| badges               | Sets the badges                                                                                                                     | [BadgeStyleProps](#badgestyleprops)[] | -                                 |
| badgePalette         | Background color palette for badges                                                                                                 | string[]                              | [`#7E92B5`, `#F4664A`, `#FFBE3A`] |
| `badge{StyleProps} ` | General badge style options applied to each badge individually. Badge-specific styles in `badges` take precedence over this setting | [BadgeStyleProps](#badgestyleprops)   | -                                 |

#### style.BadgeStyleProps

| Property                 | Description                                                                                                                                                                                                                                           | Type                                                                                                                                                                                                               | Default Value |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| placement                | Badge position relative to the main shape of the node. If unspecified, badges are placed clockwise starting from the top-right corner by default                                                                                                      | `left` &#124; `right` &#124; `top` &#124; `bottom` &#124; `left-top` &#124; `left-bottom` &#124; `right-top` &#124; `right-bottom` &#124; `top-left` &#124; `top-right` &#124; `bottom-left` &#124; `bottom-right` | -             |
| offsetX                  | Horizontal offset for the badge                                                                                                                                                                                                                       | number                                                                                                                                                                                                             | 0             |
| offsetY                  | Vertical offset for the badge                                                                                                                                                                                                                         | number                                                                                                                                                                                                             | 0             |
| text                     | Text content for the badge                                                                                                                                                                                                                            | string                                                                                                                                                                                                             | -             |
| fill                     | Text color                                                                                                                                                                                                                                            | string                                                                                                                                                                                                             | -             |
| fontSize                 | Font size                                                                                                                                                                                                                                             | number                                                                                                                                                                                                             | 8             |
| fontWeight               | Font weight                                                                                                                                                                                                                                           | number &#124; string                                                                                                                                                                                               | `normal`      |
| padding                  | Padding inside the badge                                                                                                                                                                                                                              | number &#124; number[]                                                                                                                                                                                             | 0             |
| `{StyleProps}`           | Additional text style options. Refer to [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)                                                                                                                                                  | [TextStyleProps](https://g.antv.antgroup.com/api/basic/text)                                                                                                                                                       | -             |
| background               | Whether to display a background                                                                                                                                                                                                                       | boolean                                                                                                                                                                                                            | true          |
| backgroundFill           | Background fill color. If unspecified, the colors are assigned sequentially from `badgePalette`                                                                                                                                                       | string                                                                                                                                                                                                             | -             |
| backgroundRadius         | Background corner radius <br> - `number`: Sets the same radius for all four corners <br> - `number[]`: Sets individual corner radii, completing any missing values <br> - `string`: Similar to the CSS `padding` property with space-separated values | number &#124; number[] &#124; string                                                                                                                                                                               | 0             |
| `background{StyleProps}` | Additional background style options. Refer to [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect). For instance, `backgroundFillOpacity` adjusts the transparency of the background color                                                    | [RectStyleProps](https://g.antv.antgroup.com/api/basic/rect)                                                                                                                                                       | -             |

Example: Adding three badges with different meanings to a node:

```json
{
  "node": {
    "style": {
      "badge": true,
      "badges": [
        { "text": "A", "placement": "right-top" },
        { "text": "Important", "placement": "right" },
        { "text": "Notice", "placement": "right-bottom" }
      ],
      "badgePalette": ["#7E92B5", "#F4664A", "#FFBE3A"],
      "badgeFontSize": 7
    }
  }
}
```

The resulting effect is as follows:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 200, height: 100 },
);
```

### style.Port Style `ports`

| Property           | Description                                                                                                                                | Type                                | Default Value |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ------------- |
| port               | Whether to display connection ports                                                                                                        | boolean                             | true          |
| ports              | Connection port options, supporting multiple ports                                                                                         | [PortStyleProps](#portstyleprops)[] | -             |
| `port{StyleProps}` | Additional connection port styles. Refer to [PortStyleProps](#portstyleprops). For example, `portR` specifies the radius of circular ports | [PortStyleProps](#portstyleprops)   | -             |

#### style.PortStyleProps

| Property       | Description                                                                                                                                                                                                          | Type                                                             | Default Value |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------- |
| r              | Port radius <br> - If undefined, the port is treated as a point, not visible on the canvas, but edges will connect to the nearest port <br> - If a number, the port is treated as a circle with the specified radius | number                                                           | -             |
| linkToCenter   | Whether edges connect to the center of the port. <br> - If `true`, edges connect to the center <br> - If `false`, edges connect to the port's boundary                                                               | boolean                                                          | false         |
| `{StyleProps}` | Additional port styles. Refer to [CircleStyleProps](https://g.antv.antgroup.com/api/basic/circle)                                                                                                                    | [CircleStyleProps](https://g.antv.antgroup.com/api/basic/circle) | -             |

Example: Adding four connection ports to a node:

```json
{
  "node": {
    "style": {
      "port": true,
      "ports": [
        { "key": "top", "placement": "top", "fill": "#7E92B5" },
        { "key": "right", "placement": "right", "fill": "#F4664A" },
        { "key": "bottom", "placement": "bottom", "fill": "#FFBE3A" },
        { "key": "left", "placement": [0, 0.5], "fill": "#D580FF" }
      ],
      "portR": 3,
      "portLineWidth": 1,
      "portStroke": "#fff"
    }
  }
}
```

The resulting effect is as follows:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 200, height: 100 },
);
```

## style.State Style Properties `state`

In certain interactive behaviors, such as selecting a node by clicking or activating an edge by hovering, the element merely undergoes a state change to indicate its status. To visually reflect these state changes for end users, different graphical styles must be defined for each state, which respond to state transitions of the element.

G6 provides several built-in states, including **selected**, **highlight**, **active**, **inactive**, and **disabled**. Additionally, it supports custom states to meet specific needs. Developers can define a set of style rules for each state, which override the default styles of the element.

<img width="520" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*t2qvRp92itkAAAAAAAAAAAAADmJ7AQ/original" />

For example, when a node is in the `focus` state, a stroke with a width of 3 and the color orange can be added.

```json
{
  "node": {
    "state": {
      "focus": {
        "lineWidth": 3,
        "stroke": "orange"
      }
    }
  }
}
```

The resulting effect is as follows:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 200, height: 100 },
);
```

## style.Animation `animation`

Defines the animation effect of the node, and supports the following two configuration methods:

1. disable all animation of the node

```json
{
  "node": {
    "animation": false
  }
}
```

2. Configuring stage animation

Stage animation is the animation effect of a node when it enters the graph, updates, and leaves the graph. Currently supported stages include:

- `enter`: animation when a node enters the graph
- `update`: animation when the node is updated.
- `exit`: animation when the node leaves the graph
- `show`: animation when the node is shown from hidden state
- `hide`: animation when the node is hidden.
- `collapse`: animation when the node is collapsed.
- `expand`: animation when the node is expanded.

You can refer to [animation paradigm](/en/manual/core-concept/animation#animation-paradigm) to configure the node using the animation syntax, e.g.:

```json
{
  "node": {
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
  "node": {
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
  "node": {
    "animation": {
      "enter": false // Turn off the node entry animation.
    }
  }
}
```

## style.Palette Properties `palette`

This defines the node's palette, a predefined set of node colors that are allocated according to specific rules, with the colors mapped to the `fill` property.

> For the definition of a palette, please refer to [Core Concepts - Palette](/en/manual/core-concept/palette).

| Property | Description                                                                                                                                         | Type                              | Default Value |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------- |
| type     | Specifies the type of the current palette. <br> - `group`: Discrete palette <br> - `value`: Continuous palette                                      | `group` &#124; `value`            | `group`       |
| field    | Specifies the grouping attribute in the node's data. If not specified, the default grouping attribute is `id`.                                      | string &#124; ((datum) => string) | `id`          |
| color    | The palette colors. If the palette has been previously registered, its name can be specified directly, or an array of color values can be provided. | string &#124; string[]            | -             |
| invert   | Whether to invert the color palette.                                                                                                                | boolean                           | false         |

For example, when assigning node colors based on the `category` attribute, ensuring nodes in the same category share the same color:

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

The result is displayed in the following figure:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 600, height: 100 },
);
```

Alternatively, the default configuration can also be used:

```json
{
  "node": {
    "palette": "tableau" // 'tableau' is the name of the palette, and colors are allocated based on the ID by default.
  }
}
```

The result is displayed in the following figure:

```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: new Array(10)
        .fill(0)
        .map((_, i) => ({ id: `node-${i}`, data: { category: ['A', 'B', 'C', 'D', 'E'][i % 5] } })),
    },
    layout: { type: 'grid', cols: 10 },
    node: {
      palette: 'tableau',
    },
  },
  { width: 600, height: 100 },
);
```
