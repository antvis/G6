---
title: Mindmap
---

Nodes of the same depth will be placed on the same layer. Unlike compactBox, the layout does not take into account the size of the nodes.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width=350 alt='img'/>

## Options

### direction

> _'H' \| 'V'_ **Default:** `'H'`

The direction of the tree layout

- `'H'`: Horizontal - The child nodes of the root node are divided into two parts and placed horizontally to the left and right sides of the root node

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width=170 alt='img'/>

- `'V'`: Vertical - Arrange all child nodes of the root node vertically

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AD0GTaNT5cQAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

### getWidth

> (d?:\_ _Node\_\_) => number_

The width of each node

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getHeight

> (d?:\_ _Node\_\_) => number_

The height of each node

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getHGap

> (d?:\_ _Node\_\_) => number_

The horizontal gap between each node

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getVGap

> (d?:\_ _Node\_\_) => number_

The vertical gap between each node

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getSide

> (d?:\_ _Node\_\_) => string_

Node placement is to the left or right of the root node. If this value is set, all nodes will be on the same side of the root node, which means that `direction = 'H'` will no longer be effective. If this parameter is a callback function, it can specify the left or right side of the root node for each individual node.

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'test-child-id') return 'right';
  return 'left';
};
```
