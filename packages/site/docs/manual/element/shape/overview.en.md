---
title: Shape and KeyShape
order: 1
---

## Shape

A Shape in G6 refers to a graphical element, such as a circle, rectangle, or path. Shapes are generally associated with nodes, edges, or combos in G6. **💡 Every node/edge/combo in G6 is composed of one or more shapes. The style configuration of nodes, edges, and combos is reflected on their corresponding shapes.**

For example, in the images below: the node on the left contains a single circular shape; the node in the middle contains a circle and a text shape; the node on the right contains five circles (the blue-green main circle and four anchor points at the top, bottom, left, and right) and a text shape. Each node/edge/combo has its unique key shape (keyShape). In the examples below, the keyShape for all three nodes is the blue-green circle. The keyShape is mainly used for interaction detection and automatic style updates with [element states](/en/manual/element/state), see [keyShape](#keyshape).

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OcaaTIIu_4cAAAAAAAAAAABkARQnAQ' width=50 alt='img'/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r5M0Sowd1R8AAAAAAAAAAABkARQnAQ' width=50 alt='img'/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pHoETad75CIAAAAAAAAAAABkARQnAQ' width=50 alt='img'/>

> (Left) A node with only one circular shape, whose keyShape is the circle. (Middle) A node with a circle and a text shape, whose keyShape is the circle. (Right) A node with a main circle, text, and four small circles at the top, bottom, left, and right, whose keyShape is the main circle.

G6 uses different combinations of shapes to design various built-in nodes/edges/combos. Built-in nodes include 'circle', 'rect', 'ellipse', ... (see [Built-in Nodes](/en/manual/element/node/base-node)); built-in edges include 'line', 'polyline', 'cubic', ... (see [Built-in Edges](/en/manual/element/edge/base-edge)); built-in combos include 'circle', 'rect', ... (see [Built-in Combos](/en/manual/element/combo/base-combo)).

In addition to using built-in nodes/edges/combos, G6 also allows users to customize nodes/edges/combos by combining shapes as needed. See [Custom Node](/en/manual/element/node/custom-node), [Custom Edge](/en/manual/element/edge/custom-edge), and [Custom Combo](/en/manual/element/combo/custom-combo) for details.

## KeyShape

In G6, each node, edge, or combo consists of one or more shapes, but one of them is called the keyShape, which is the "key graphical element" of the item:

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TZt2S7Z0d-8AAAAAAAAAAAAADmJ7AQ/original" />

> The key graphical element of the node is the colored area in the image above.

### Bounding Box Determination

**Determines the bounding box of a node/combo**, which is used to calculate the connection point of related edges (the intersection with the edge). If the keyShape is different, the intersection calculation between the node and the edge will also differ.

#### Example

In this example, a node consists of a rect shape and a circle shape with a gray stroke and transparent fill.

- When the node's keyShape is the circle:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CY7cSaMs4U0AAAAAAAAAAABkARQnAQ' width=220 alt='img'/>

- When the node's keyShape is the rect:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*upWTQLTvxGEAAAAAAAAAAABkARQnAQ' width=250 alt='img'/>

## Shape Lifecycle

> If you need to [customize nodes](/en/manual/element/node/custom-node), [customize edges](/en/manual/element/edge/custom-edge), or [customize combos](/en/manual/element/combo/custom-combo), you need to understand the lifecycle of shapes. If you use built-in nodes/edges/combos, you can skip this section.

The shape lifecycle includes:

- **Initial Rendering**: Draws the shape for the first time based on data and style configuration.
- **Update**: Automatically updates the appearance of the shape when data or style changes.
- **Operation**: Responds to interaction states (such as selected, active, hover, etc.) and dynamically adjusts the style.
- **Destruction**: Cleans up when the shape is removed (usually managed automatically by the Graph, so users don't need to worry).

When customizing shapes, the most common requirement is "how to efficiently manage the creation, update, and destruction of shapes." For this, G6 provides a very useful method in BaseShape:

### Principle and Advantages of upsert

upsert is a combination of "update" and "insert", meaning "update if exists, insert if not". Its function can be simply understood as:

- **Automatic Judgment**: You only need to describe the desired appearance of the shape. `upsert` will automatically determine whether the shape already exists. If not, it will create it; if it exists, it will update it; if it needs to be deleted, it will remove it automatically.
- **Simplified Logic**: Developers do not need to manually manage the CRUD of shapes, avoiding duplicate code and state confusion.
- **Improved Robustness**: Whether it's the initial rendering, data changes, or state switching, upsert ensures that the shape always stays in sync with the data and configuration.

**Type Definition:**

```js
/**
 * Create, update, or delete a shape
 * @param className Shape name
 * @param Ctor Shape type
 * @param style Shape style. Pass false to delete the shape
 * @param container Container
 * @param hooks Hooks
 * @returns Shape instance
 */
upsert<T extends DisplayObject>(
  className: string,
  Ctor: string | { new (...args: any[]): T },
  style: T['attributes'] | false,
  container: DisplayObject,
  hooks?: UpsertHooks,
): T | undefined {}
```

You only need to describe "what kind of shape you want now" without worrying about whether it is being created, updated, or deleted. upsert will handle it for you. This makes customizing and managing complex composite shapes very simple and safe.
