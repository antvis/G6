---
title: Indented
order: 3
---

Indented layout represents the hierarchy by indent between them. Each node will take a row/column. It is appropriate for file directory.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NBUzRonaOYMAAAAAAAAAAABkARQnAQ' width=175 alt='img'/>

### layoutCfg.direction

**Type**: String<br />**Options**: 'LR' | 'RL' | 'H'<br />**Default**: 'LR'<br />**Required**: false<br />**Description**: The direction of layout:

- LR —— Root is on the left, layout from the left to the right(left image below)<br />
- RL —— Root is on the right, layout from the right to the left(center image below)<br />
- H —— Root is on the middle, layout in horizontal symmetry(right image below)

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mq6YSIKrAt0AAAAAAAAAAABkARQnAQ' width=110 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VGEnRbpvxlUAAAAAAAAAAABkARQnAQ' width=90 alt='img'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vek6RqtUXNcAAAAAAAAAAABkARQnAQ' width=160 alt='img'/>

> (Left)LR. (Center)RL. (Right)H.

### layoutCfg.indent

**Type**: Number | Function<br />**Default**: 20<br />**Example**：

```javascript
(d) => {
  // d is a node
  if (d.parent?.id === 'testId') return d.parent.x + 50;
  return 100;
};
```

**Required**: false<br />**Description**: When the type is Number, the colunm separation is a fixed value; When the type is Function, the distance between the node and the root node is the returned value of the function.

### layoutCfg.getWidth

**Type**: Number | Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

**Required**: false<br />**Description**: The width of each node. Takes effect only when `direction` is `'H'`

### layoutCfg.getHeight

**Type**: Number | Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

**Required**: false<br />**Description**: The height of each node

### layoutCfg.getSide

**Type**: Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 'left';
  return 'right';
};
```

**Required**: false<br />**Description**: The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it.

### layoutCfg.dropCap

**Type**: Boolean

<br />**Required**: false

<br />**Explanation**: Whether place the first child node at the next line. `true` by default
