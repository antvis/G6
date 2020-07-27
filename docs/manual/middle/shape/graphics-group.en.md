---
title: Graphics Group
order: 2
---

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️Attention:</strong> </span> <br />Graphics Group and [Node Group](/en/docs/manual/middle/nodeGroup) are totally different concepts with the same name Group.

- Graphics Group is the group for [Graphics Shape](/en/docs/manual/middle/elements/shape-keyshape);
- [Node Group](/en/docs/manual/middle/nodeGroup) is the group for [Node](/en/docs/manual/middle/elements/nodes/defaultNode)s, which is related to the hierarchy and groups in the data.

<br />

## What

Graphics Group (hereinafter referred to as Group) in G6 is similar to <a href='https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g' target='_blank'> `<g>` tag in SVG </a>: Group a container of a group of graphics. The transformations on a Group such as clipping, rotating, zooming, and translating will be applied to all the children of the Group. The properties like color and position will also be inherited by its children. Besides, Group can be nested for complicated objects.

In G6, all the nodes instances in a Graph is grouped by a Group named `nodeGroup`, all the edges instances are grouped by `edgeGroup`. And the visual level (zIndex) of `nodeGroup` is higher than `edgeGroup`, which means all the nodes will be drawed on the top of all the edges.

<br />As shown in the figure below: The three nodes in (Left) are belong to the `nodeGroup`, the two edges are belong to the `edgeGroup`. The visual level (zIndex) of `nodeGroup` is higher than `edgeGroup`, so the three nodes are drawed on the top of the two edges. We reduce the opacity of the nodes in (Right) to clearly see the edges are drawed under the nodes.<br />

![image.png](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*oqKUSoRWMrcAAAAAAAAAAABkARQnAQ)![image.png](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cudnTqD-g_4AAAAAAAAAAABkARQnAQ)

> (Left) Demonstration of the graphics Group of nodes and edges. (Right) Nodes with opacity.

## When

Graphics Group is refered by [Custom Node](/en/docs/manual/advanced/custom-node) and [Custom Edge](/en/docs/manual/advanced/custom-edge). It is a mechanism to combine and manage the graphis shapes.

<br />For example, there is a node A which has a group contains all the graphics shapes (a circle and a text shape) of A. Node B is a custom node which also has a group contains all the graphics shapes (a circle, a rect, and a text shape) of B.<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GnVoSIGkXhsAAAAAAAAAAABkARQnAQ' alt='img' width='100'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iQXZTZCX9LEAAAAAAAAAAABkARQnAQ' alt='img' width='100'/>

<br />

## How

The functions below will be used in [Custom Node](/en/docs/manual/advanced/custom-node) and [Custom Edge](/en/docs/manual/advanced/custom-edge).

### Get group of item

```javascript
// Find the graphics group of the item
const group = item.getContainer();

// equal to
const group = item.get('group');
```

### Functions of Group

- addGroup(cfgs)

Add a new group to the group.

```javascript
const subGroup = group.addGroup({
  id: 'rect',
});
```

- addShape(type, cfgs)

Add a shape to the group.

```javascript
const keyShape = group.addShape('rect', {
  attrs: {
    stroke: 'red',
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'rect-shape',
});
```

**Tips:** The `clip`, `transform`, and other operations on a group will affect all the elements in the group.
