---
title: Item Model Properties
order: 5
---

In a graph of G6, there are Node, Edge, and Combo items. Each [item](/en/docs/api/Items/item-methods) is an instance with a data `model` which defines the styles and configurations of the item. The [Tutorial-Configure the Items](/en/docs/manual/tutorial/elements#configure-the-properties) introduces two ways to configure the items: Configure the items globally when instantiating the Graph; Configure the items in the source data. No matter which way to configure the items, it is configuring the data `model` for each item. This document introduces the configurations of the models of Node, Edge, and Combo.

### id

<description> _String_ **required** </description>

The ID of the item, **MUST** be unique and string

### style

<description> _Object_ **optional** </description>

The style of the item's [keyShape](/en/docs/manual/middle/elements/shape/shape-keyshape). Its properites are related to the type of the keyShape. Refer to [Shape Style Properties](/en/docs/api/shape-properties)

### type

<description> _String_ **optional** </description>

The type name of the item. 'line' is the default value for Edge, 'circle' for Node, and 'circle' for Combo

### label

<description> _String_ **optional** </description>

The text of the item's label. The text will be rendered if the `label` property exist

### labelCfg

<description> _Object_ **optional** </description>

The configurations for the label. It is different for Node, Combo, and Edge. Check out the following content for more detail
