---
title: Edge Configuration
order: 0
---

This article introduces the configuration of edge attributes. The configuration is located as follows:

```js {5-9}
import { Graph } from '@antv/g6';

const graph = new Graph({
  edge: {
    type: 'line',
    style: {},
    state: {},
    palette: {},
    animation: {},
  },
});
```

| Attribute | Description                                                           | Type                                         | Default Value |
| --------- | --------------------------------------------------------------------- | -------------------------------------------- | ------------- |
| type      | The edge type, either a built-in edge type name or a custom edge name | string                                       | `line`        |
| style     | The edge style, including attributes like color and size              | [Style](#edge-style-style)                   | -             |
| state     | Defines the edge's style in various states                            | Record<string, [Style](#edge-style-style)>   | -             |
| palette   | Defines a color palette for mapping edge colors based on data         | [Palette](#palette-attributes-palette)       | -             |
| animation | Defines animation effects for the edge                                | [Animation](#animation-attributes-animation) | -             |

## Edge Type (type)

The `type` attribute specifies the edge type, which can be either a built-in type or a custom name. By default, it is set to `line` (a straight edge).

For more built-in edge types, refer to the [Edge Registry](/en/manual/getting-started/extensions#edges).

## Edge Style (style)

This attribute defines the edge's visual style, including elements such as color and size.

<img width="320" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cVHVQJKLOlgAAAAAAAAAAAAADmJ7AQ/original" />

> For a deeper understanding of the structure of edges, please see [Core Concepts - Elements - Edge](/en/manual/core-concept/element#edges).

Below is a breakdown of style configurations:

### Main Shape Style

| Attribute      | Description                                                                                                      | Type                                                            | Default Value |
| -------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------- |
| stroke         | The stroke color of the edge                                                                                     | string                                                          | `#000`        |
| lineWidth      | The width of the edge stroke                                                                                     | number                                                          | 1             |
| lineDash       | The dash offset for the edge line                                                                                | number                                                          | 0             |
| sourcePort     | The port where the edge starts (source)                                                                          | string                                                          | -             |
| targetPort     | The port where the edge ends (target)                                                                            | string                                                          | -             |
| isBillboard    | In 3D scenes, this ensures the edge always faces the screen, so line width is unaffected by perspective          | boolean                                                         | true          |
| `{StyleProps}` | Additional style configurations, refer to [PathStyleProps](https://g.antv.antgroup.com/en/api/basic/path) values | [PathStyleProps](https://g.antv.antgroup.com/en/api/basic/path) | -             |

### Label Style

| Attribute             | Description                                                                                                                                  | Type                                                            | Default Value |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------- |
| label                 | Whether the label should be displayed on the edge                                                                                            | boolean                                                         | true          |
| labelAutoRotate       | Whether to automatically rotate the label to match the edge's direction                                                                      | boolean                                                         | true          |
| labelText             | The content of the label text                                                                                                                | string                                                          | -             |
| labelFill             | The color of the label text                                                                                                                  | string                                                          | -             |
| labelFontSize         | The font size of the label text                                                                                                              | number                                                          | 12            |
| labelFontWeight       | The weight of the font for the label text                                                                                                    | number &#124; string                                            | `normal`      |
| labelPlacement        | The position of the label relative to the edge, e.g., `start`, `center`, `end`, or a specific ratio (0-1)                                    | `start` &#124; `center` &#124; `end` &#124; number              | `center`      |
| labelOffsetX          | The offset of the label on the x-axis                                                                                                        | number                                                          | 0             |
| labelOffsetY          | The offset of the label on the y-axis                                                                                                        | number                                                          | 0             |
| labelWordWrap         | Whether the label text should automatically wrap when it exceeds the maximum width                                                           | boolean                                                         | false         |
| labelMaxWidth         | The maximum width of the label, either as a percentage of the edge width or in pixels                                                        | number &#124; string                                            | `200%`        |
| labelMaxLines         | The maximum number of lines for the label text                                                                                               | number                                                          | 1             |
| labelPadding          | The padding inside the label                                                                                                                 | number &#124; number[]                                          | 0             |
| `label{StyleProps}`   | More style configurations for the label, e.g., font size and color, refer to [TextStyleProps](https://g.antv.antgroup.com/en/api/basic/text) | [TextStyleProps](https://g.antv.antgroup.com/en/api/basic/text) | -             |
| labelBackground       | Whether to display a background for the label                                                                                                | boolean                                                         | false         |
| labelBackgroundFill   | The fill color for the label's background                                                                                                    | string                                                          | -             |
| labelBackgroundRadius | The corner radius of the label background. Can be a single value or an array for each corner                                                 | number &#124; number[]                                          | 0             |

### Halo Style

| Attribute          | Description                                                                                                                                    | Type                                                            | Default Value           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------- |
| halo               | Whether to display a halo around the edge                                                                                                      | boolean                                                         | false                   |
| haloStroke         | The stroke color of the halo                                                                                                                   | string                                                          | Matches main shape fill |
| haloLineWidth      | The stroke width of the halo                                                                                                                   | number                                                          | 3                       |
| `halo{StyleProps}` | Additional style configurations for the halo, such as stroke opacity, refer to [PathStyleProps](https://g.antv.antgroup.com/en/api/basic/path) | [PathStyleProps](https://g.antv.antgroup.com/en/api/basic/path) | -                       |

### Badge Style

| Attribute             | Description                                                                                                                           | Type                                                            | Default Value |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------- |
| badge                 | Whether to display a badge on the edge                                                                                                | boolean                                                         | true          |
| badgePlacement        | The placement of the badge relative to the edge. If not specified, it defaults to a clockwise arrangement from the top-right corner   | `prefix` &#124; `suffix`                                        | `prefix`      |
| badgeOffsetX          | The offset of the badge on the x-axis                                                                                                 | number                                                          | 0             |
| badgeOffsetY          | The offset of the badge on the y-axis                                                                                                 | number                                                          | 0             |
| badgeText             | The text content of the badge                                                                                                         | string                                                          | -             |
| badgeFill             | The color of the badge text                                                                                                           | string                                                          | -             |
| badgeFontSize         | The font size of the badge text                                                                                                       | number                                                          | 8             |
| badgeFontWeight       | The font weight of the badge text                                                                                                     | number &#124; string                                            | `normal`      |
| badgePadding          | The padding inside the badge                                                                                                          | number &#124; number[]                                          | 0             |
| `badge{StyleProps}`   | Additional style configurations for the badge, refer to [TextStyleProps](https://g.antv.antgroup.com/en/api/basic/text)               | [TextStyleProps](https://g.antv.antgroup.com/en/api/basic/text) | -             |
| badgeBackground       | Whether to display a background behind the badge                                                                                      | boolean                                                         | true          |
| badgeBackgroundFill   | The fill color for the badge background                                                                                               | string                                                          | -             |
| badgeBackgroundRadius | The corner radius for the badge background, defined as a single value, an array for each corner, or a string (similar to CSS padding) | number &#124; number[] &#124; string                            | 0             |

### Start Arrow Style

| Attribute        | Description                                    | Type                                                                                                                                                               | Default Value |
| ---------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| startArrow       | Whether to display the start arrow on the edge | boolean                                                                                                                                                            | false         |
| startArrowOffset | The offset of the start arrow                  | number                                                                                                                                                             | 0             |
| startArrowSize   | The size of the start arrow                    | number &#124; [number, number]                                                                                                                                     | 8             |
| startArrowType   | The type of the start arrow                    | `triangle` &#124; `circle` &#124; `diamond` &#124; `vee` &#124; `rect` &#124; `triangleRect` &#124; `simple` &#124; ((width: number, height: number) => PathArray) | `triangle`    |

### End Arrow Style

| Attribute      | Description                                  | Type                                                                                                                                                               | Default Value |
| -------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| endArrow       | Whether to display the end arrow of the edge | boolean                                                                                                                                                            | false         |
| endArrowOffset | The offset for the end arrow                 | number                                                                                                                                                             | 0             |
| endArrowSize   | The size of the end arrow                    | number &#124; [number, number]                                                                                                                                     | 8             |
| endArrowType   | The type of the end arrow                    | `triangle` &#124; `circle` &#124; `diamond` &#124; `vee` &#124; `rect` &#124; `triangleRect` &#124; `simple` &#124; ((width: number, height: number) => PathArray) | `triangle`    |

### Loop Edge Style

| Attribute          | Description                                                                                                              | Type                                                                                                                                                                                                               | Default Value |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| loop               | Whether to enable loop edges                                                                                             | boolean                                                                                                                                                                                                            | true          |
| loopClockwise      | Whether to draw the loop clockwise                                                                                       | boolean                                                                                                                                                                                                            | true          |
| loopDist           | The distance from the node's keyShape edge to the top of the loop, which defines the curvature                           | number                                                                                                                                                                                                             | -             |
| loopPlacement      | The position of the loop edge relative to the node                                                                       | 'left' &#124; 'right' &#124; 'top' &#124; 'bottom' &#124; 'left-top' &#124; 'left-bottom' &#124; 'right-top' &#124; 'right-bottom' &#124; 'top-left' &#124; 'top-right' &#124; 'bottom-left' &#124; 'bottom-right' | 'top'         |
| `loop{StyleProps}` | Additional style configurations for loop edges, refer to [PathStyleProps](https://g.antv.antgroup.com/en/api/basic/path) | [PathStyleProps](https://g.antv.antgroup.com/en/api/basic/path)                                                                                                                                                    | -             |

## State Style Attributes (state)

In interactive behaviors such as selecting an edge by clicking or activating an edge by hovering over it, the element merely marks its state. To visually reflect these states to the user, we assign different styles for each state of the graphical element in response to state changes.

G6 provides several built-in states, including `selected`, `highlight`, `active`, `inactive`, and `disabled`, and also supports custom states for more specific requirements. For each state, developers can define a set of style rules that override the element's default styles.

For instance, when an edge is in the `focus` state, a halo with a width of 6 and a yellow color can be added.

```json
{
  "edge": {
    "state": {
      "focus": {
        "halo": true,
        "haloLineWidth": 6,
        "haloStroke": "yellow"
      }
    }
  }
}
```

### Animation Attributes (animation)

Defines animation effects for edges. The following configurations are

supported:

1. Disable all edge animations:

```json
{
  "edge": {
    "animation": false
  }
}
```

2. Stage-based animation configuration:

Stage animations refer to effects applied when an edge enters, updates, or exits the canvas. Supported stages include:

- `enter`, `update`, `exit`, `show`, `hide`, `collapse`, and `expand`.

To configure animations using a paradigm:

```json
{
  "node": {
    "animation": {
      "update": [
        {
          "fields": ["stroke"], // Animate only the stroke property
          "duration": 1000, // Duration of the animation
          "easing": "linear" // Easing function
        }
      ],
  }
}
```

### Palette Attributes (palette)

Defines a predefined color pool for edges and maps colors to the `stroke` property according to rules.

> For palette definitions, refer to [Core Concepts - Palette](/en/manual/core-concept/palette).

| Attribute | Description                                                                                                             | Type                              | Default Value |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------- |
| type      | Specifies the palette type.<br> - `group`: Discrete palette <br> - `value`: Continuous palette                          | `group` &#124; `value`            | `group`       |
| field     | Specifies the grouping field in the element's data. If not specified, the default is `id`.                              | string &#124; ((datum) => string) | `id`          |
| color     | Palette colors. If the palette is registered, you can directly specify its registered name, or pass an array of colors. | string &#124; string[]            | -             |
| invert    | Whether to invert the palette                                                                                           | boolean                           | false         |

For example, to assign node colors based on the `direction` field so that nodes with the same category have the same color:

```json
{
  "edge": {
    "palette": {
      "type": "group",
      "field": "direction",
      "color": ["#F08F56", "#00C9C9"]
    }
  }
}
```

The effect is shown below:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 600, height: 300 },
);
```

You can also use the default configuration:

```json
{
  "edge": {
    "palette": "tableau" // tableau is the palette name, it assigns colors based on ID by default.
  }
}
```

The effect is shown below:

```js | ob { pin: false }
createGraph(
  {
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
  },
  { width: 600, height: 300 },
);
```
