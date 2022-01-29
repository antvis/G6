---
title: Edge Model Properties
order: 7
---

## Common Property

Except for the common properties, there are special configurations for each type of built-in Edges. The `style`s of them depend on their keyShape. The common properties for built-in Edges can be refered to:

### id

<description> _String_ **required** </description>

The id of the edge, **MUST** be a unique string

### source

<description> _String | Number_ **optional** </description>

The id of the source node.

### target

<description> _String | Number_ **optional** </description>

The id of the target node.

### type

<description> _String_ **optional** _default:_ `'line'`</description>

The type of the edge. It can be the type of a Built-in Edge, or a custom Edge. 'line' by default

### sourceAnchor

<description> _Number_ **optional** </description>

The index of link points on the source node. The link point is the intersection of the edge and related node.

### targetAnchor

<description> _Number_ **optional** </description>

The index of link points on the target node. The link point is the intersection of the edge and related node.

### style

<description> _Object_ **optional** </description>

The edge style. `style` is an object to configure the stroke color, shadow, and so on. The complete configurations is listed in: [Shape Properties](/en/docs/api/shapeProperties).

### label

<description> _String_ **optional** </description>

label is a string which indicates the content of the label.

### labelCfg

labelCfg is an object to configure the label. The commonly used configurations of labelCfg:

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| refX | false | Number | x offset of the label |
| refY | false | Number | y offset of the label |
| position | false | String | The relative position to the edge. Options: `start`, `middle`, and `end`. `middle` by default. |
| autoRotate | false | Boolean | Whether to activate ratating according to the edge automatically. `false` by default |
| style | false | Object | The style property of the label. The complete configurations for the label style is listed in [Shape Style Properties - Text](/en/docs/api/shapeProperties/#text) |

## Properties for Specific Built-in Edges

The special properties for each built-in Edges can be found in the subdocuments of [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge).
