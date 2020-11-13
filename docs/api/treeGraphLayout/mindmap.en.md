---
title: Mindmap
order: 4
---

Mindmap arranged the nodes with same depth on the same level. Different from compactBox, it does not consider the size of nodes while doing layout.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J1l5RofvbP0AAAAAAAAAAABkARQnAQ' width=350 alt='img'/>

### layoutCfg.direction

**Type**: String<br />**Options**: 'H' | 'V'<br />**Default**: 'H'<br />**Required**: false<br />**Description**: The direction of layout.

- H —— Root is on the middle, layout in horizontal symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1v35TYcFO0cAAAAAAAAAAABkARQnAQ' width=170 alt='img'/>

- V —— Root is on the middle, layout in vertical symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*x-bVTLOD-BcAAAAAAAAAAABkARQnAQ' width=145 alt='img'/>

### layoutCfg.getWidth

**Type**: Number | Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

**Required**: false<br />**Description**: The width of each node

### layoutCfg.getHeight

**Type**: Number | Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

**Required**: false<br />**Description**: The height of each node

### layoutCfg.getHGap

**Type**: Number | Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

**Default**: 18<br />**Required**: false<br />**Description**: The horizontal separation of nodes

### layoutCfg.getVGap

**Type**: Number | Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50;
  return 100;
};
```

**Default**: 18<br />**Required**: false<br />**Description**: The vertical separation of nodes

### layoutCfg.getSide

**Type**: Function<br />**Example**:

```javascript
(d) => {
  // d is a node
  if (d.id === 'test-child-id') return 'right';
  return 'left';
};
```

**Default**: 'right'<br />**Required**: false<br />**Description**: The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it
