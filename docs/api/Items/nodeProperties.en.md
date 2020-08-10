---
title: Node Model Properties
order: 5
---

Except for the common properties, apart from the [Item Model Properities](/en/docs/api/items/itemProperties.zh.md), there are special configurations for Nodes. The `style`s of them depend on their keyShape.

## Common Property

### id

<description> _String_ **required** </description>

The ID of the node, **MUST** be a unique string.

### x

<description> _Number_ **optional** </description>

x coordinate.

### y

<description> _Number_ **optional** </description>

y coordinate.

### type

<description> _String_ **optional** _default:_: `'circle'`</description>

The shape type of the node. It can be the type of built-in Node, or the custom Node. `'circle'` by default.

### size

<description> _Number | Array_ **optional** _default:_: `20`</description>

The size of the node.

### anchorPoints

<description> _Array_ **optional** </description>

The interactions of the node and related edges. It can be null. [0, 0] represents the anchor on the left top; [1, 1]represents the anchor ont he right bottom.

### style

<description> _Object_ **optional** </description>

The node style. `style` is an object to configure the filling color, stroke color, shadow, and so on. Please refer to: [Shape Properties](/en/docs/api/shapeProperties.zh.md)。

### label

<description> _String_ **optional** </description>

The label text of the node.

### labelCfg

| Name | Required | Type | Remark |
| --- | --- | --- | --- |
| position | false | String | The relative positions to the node. Options: `'center'`, `'top'`, `'left'`, `'right'`, `'bottom'`. `'center'` by default. |
| offset | false | Number | The offset value of the label. When the `position` is `'bottom'`, the value is the top offset of the node; When the `position` is `'left'`, the value is the right offset of the node; it is similar with other `position`. |
| style | false | Object | The style property of the label. The complete configurations for the label style is listed in [Shape Style Properties - Text](/en/docs/api/shapeProperties/#text) |

## Properties for Specific Built-in Nodes

The special properties for each built-in Nodes can be found in the subdocuments of [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode).
