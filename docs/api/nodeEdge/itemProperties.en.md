---
title: Item Model Properties
order: 5
---

In a graph of G6, there are Node, Edge, and Combo items. Each [item](/en/docs/api/nodeEdge/Item) is an instance with a data `model` which defines the styles and configurations of the item. The [Tutorial-Configure the Items](/en/docs/manual/tutorial/elements#configure-the-properties) introduces two ways to configure the items: Configure the items globally when instantiating the Graph; Configure the items in the source data. No matter which way to configure the items, it is configuring the data `model` for each item. This document introduces the configurations of the models of Node, Edge, and Combo.

## Common Property

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| id | String | true | The ID of the item, **MUST** be unique and string |
| style | Object | false | The style of the item's [keyShape](/en/docs/manual/middle/elements/shape-keyshape). Its properites are related to the type of the keyShape. Refer to [Shape Style Properties](/en/docs/api/nodeEdge/shapeProperties) |
| type | String | false | The type name of the item. 'line' is the default value for Edge, 'circle' for Node, and 'circle' for Combo |
| label | String | false | The text of the item's label. The text will be rendered if the `label` property exist |
| labelCfg | Object | false | The configurations for the label. It is different for Node, Combo, and Edge. Check out the following content for more detail |

## Node

Except for the common properties, there are special configurations for each type of built-in Nodes. The `style`s of them depend on their keyShape. The common properties for built-in Nodes can be refered to:

- [Common Configurations for Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode#common-property);
- [Common Styles for Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode#style);
- [Common Label Configurations for Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode#label-and-labelcfg).

The special properties for each built-in Nodes can be found in the subdocuments of [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode).

## Edge

Except for the common properties, there are special configurations for each type of built-in Edges. The `style`s of them depend on their keyShape. The common properties for built-in Edges can be refered to:

- [Common Configurations for Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge#the-common-property);
- [Common Styles for Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge#style);
- [Common Label Configurations for Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge#label-and-labelcfg).

The special properties for each built-in Edges can be found in the subdocuments of [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge).

## Combo

Except for the common properties, there are special configurations for each type of built-in Combos. The `style`s of them depend on their keyShape. The common properties for built-in Combos can be refered to:

- [Common Configurations for Built-in Combos](/en/docs/manual/middle/elements/combos/defaultCombo#common-property);
- [Common Styles for Built-in Combos](/en/docs/manual/middle/elements/combos/defaultCombo#style);
- [Common Label Configurations for Built-in Combos](/en/docs/manual/middle/elements/combos/defaultCombo#label-and-labelcfg).

The special properties for each built-in Combos can be found in the subdocuments of [Built-in Combos](/en/docs/manual/middle/elements/combos/defaultCombo).
