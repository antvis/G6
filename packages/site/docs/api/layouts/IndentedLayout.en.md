---
title: Indented
---

Indented tree layout. The hierarchy of tree nodes is represented by the amount of horizontal indentation. Each element occupies one row/column. Commonly used in scenarios such as file directory structures.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NBUzRonaOYMAAAAAAAAAAABkARQnAQ' width=175 alt='img'/>

## Options

### direction

> _'LR' \| 'LR' \| 'H'_ **Default:** `'LR'`

The direction of the tree layout

- `'LR'`：The root node is on the left, with the layout oriented to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mq6YSIKrAt0AAAAAAAAAAABkARQnAQ' width=110 alt='img'/>

- `'RL'`：The root node is on the right, with the layout oriented to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VGEnRbpvxlUAAAAAAAAAAABkARQnAQ' width=90 alt='img'/>

- `'H'`：The root node is in the center, with a horizontally symmetrical layout

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vek6RqtUXNcAAAAAAAAAAABkARQnAQ' width=160 alt='img'/>

### indent

> _Number \|_ _(d?:\_ \_Node\_\_) => string_ **Default:** `20`

Inter-column spacing. When the type is Number, the inter-column spacing is a fixed value; when the type is Function, the spacing between the node and the root node is determined by the return value of the function.

Example:

```javascript
(d) => {
  // d is a node
  if (d.parent?.id === 'testId') return d.parent.x + 50;
  return 100;
};
```

### getWidth

_(d?:\_ \_Node\_\_) => number_

The width of each node, effective when `direction` is set to `'H'`

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

### getHeight

_(d?:\_ \_Node\_\_) => number_

The height of each node

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
  if (d.id === 'testId') return 'left';
  return 'right';
};
```

### dropCap

> _boolean_ **Default:** `true`

Whether the first child node of each node is located on the next line
