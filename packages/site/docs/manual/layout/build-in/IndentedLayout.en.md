---
title: Indented Tree
---

Indented tree layout. The hierarchy of tree nodes is represented by the indentation in the horizontal direction. Each element occupies a row/column. Common use case: file directory structure.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NBUzRonaOYMAAAAAAAAAAABkARQnAQ' width=175 alt='img'/>

## Options

### direction

> _'LR' | 'RL' | 'H'_ **Default:** `'LR'`

Tree layout direction

- `'LR'`: Root node on the left, layout to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mq6YSIKrAt0AAAAAAAAAAABkARQnAQ' width=110 alt='img'/>

- `'RL'`: Root node on the right, layout to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VGEnRbpvxlUAAAAAAAAAAABkARQnAQ' width=90 alt='img'/>

- `'H'`: Root node in the middle, horizontal symmetric layout

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vek6RqtUXNcAAAAAAAAAAABkARQnAQ' width=160 alt='img'/>

### indent

> _Number | ((d?: Node) => string)_ **Default:** `20`

Column spacing. If type is Number, the column spacing is fixed; if type is Function, the spacing between the node and the root node is the return value of the function.

Example:

```javascript
(d) => {
  // d is a node
  if (d.parent?.id === 'testId') return d.parent.x + 50;
  return 100;
};
```

### getWidth

> _(d?: Node) => number_

Width of each node, effective when `direction` is `'H'`

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getHeight

> _(d?: Node) => number_

Height of each node

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getSide

> _(d?: Node) => string_

Whether the node is placed on the left or right side of the root node. If set, all nodes will be on the same side of the root node, i.e., direction = 'H' will not take effect. If this parameter is a callback function, you can specify the side for each node.

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 'left';
  return 'right';
};
```

### dropCap

> _boolean_ **Default:** `true`

Whether the first child of each node is placed on the next row
