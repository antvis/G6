---
title: Indented
order: 15
---

Indented layout represents the hierarchy by indent between them. Each node will take a row/column. It is appropriate for file directory.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NBUzRonaOYMAAAAAAAAAAABkARQnAQ' width=175 alt='img'/>

## direction

**Type**: `'LR' | 'RL' | 'H'`

**Default**: `'LR'`

The direction of layout:

- LR —— Root is on the left, layout from the left to the right(left image below)

- RL —— Root is on the right, layout from the right to the left(center image below)

- H —— Root is on the middle, layout in horizontal symmetry(right image below)

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mq6YSIKrAt0AAAAAAAAAAABkARQnAQ' width=110 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VGEnRbpvxlUAAAAAAAAAAABkARQnAQ' width=90 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vek6RqtUXNcAAAAAAAAAAABkARQnAQ' width=160 alt='img'/>

> (Left)LR. (Center)RL. (Right)H.

## indent

**Type**: `number | function`

**Default**: `20`

**Example**：

```javascript
(d) => {
  // d is a node
  if (d.parent?.id === 'testId') return d.parent.x + 50;
  return 100;
};
```

When the type is Number, the colunm separation is a fixed value; When the type is Function, the distance between the node and the root node is the returned value of the function.

## getWidth

**Type**: `number | function`

**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

The width of each node. Takes effect only when `direction` is `'H'`

## getHeight

**Type**: `number | function`

**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

The height of each node

## getSide

**Type**: `function`

**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 'left';
  return 'right';
};
```

The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it.

## dropCap

**Type**: `boolean`

Whether place the first child node at the next line. `true` by default
