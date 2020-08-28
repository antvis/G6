---
title: Item Overview
order: 0
---

There are three types of items in a graph in G6:  Nodes, Edges and Combos. Each item consists of one or more [Shapes](/en/docs/manual/middle/elements/shape/shape-keyshape) with its own unique keyShape. Several built-in items are provided by G6, for example, nodes can be circles, rectangles, images, etc. All built-in items in are listed in [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode), [Built-in Edges](/en/docs/manual/middle/elements/edges/defaultEdge), [Built-in Combos](/en/docs/manual/middle/elements/combos/defaultCombo). In addition to using built-in nodes/edges/combos, G6 also allows user to customize these items by creating and combining shapes, see [Custom Nodes](/en/docs/manual/middle/elements/nodes/custom-node), [Custom Edge](/en/docs/manual/middle/elements/edges/custom-edge), [Custom Combo](/en/docs/manual/middle/elements/combos/custom-combo) for more details.



The properties of an item can be be divided into two categories:
- Style Property: Corresponds to the style of the keyshape, e.g. `fill`, `stroke`.When the [State](/en/docs/manual/middle/states/state) of an item is changed, the style can be updated. 
- Other Property: Such as `type`, `id`, they are a kind of properties that will not be changed when the State of the item is changed. They need to be updated manually with [graph.updateItem](en/docs/api/Graph/#updateitemitem-model).
A complete list of item properties can be found in [Item Properties](/en/docs/api/nodeEdge/itemProperties).
In addition to these common properties shared by all items, each kind of item (node/edge/combo) has its unique properties. 

There are [common methods](/en/docs/api/nodeEdge/Item) on item instances for updating, destroying, getting attributes, modifying state, etc. And changes to instances can also be made by calling methods on [graph](/en/docs/api/Graph).

This chapter provides an overview of the common properties and methods of graph items in G6, different types of items, i.e. nodes, edges and combos, will be described in detail in later chapters.