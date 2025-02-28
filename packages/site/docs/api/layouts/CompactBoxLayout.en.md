---
title: CompactBox
---

Compact Box Tree Layout. This is the default layout for tree diagrams,its characteristic is that during the layout process, it takes into account the bounding box of each tree node, derived from the classic <a href='http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf' target='_blank'>Reingold–Tilford tidy layout algorithm</a>suitable for applications such as mind maps.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z-ESRoHTpvIAAAAAAAAAAABkARQnAQ' width=650 alt='img'/>

## Options

### direction

> _'LR' \| 'RL' \| 'TB' \| 'BT' \| 'H' \| 'V'_ **Default:** `'LR'`

Tree Layout Direction

- `'TB'`: The root node is at the top, with the layout oriented downwards

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KrAqTrFbNjMAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

- `'BT'`: The root node is at the bottom, with the layout oriented upwards

 <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vNmOTJ4q0uwAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

- `'LR'`: The root node is on the left, with the layout oriented to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ffD6S74MXw4AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

- `'RL'`: The root node is on the right, with the layout oriented to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vTg2SJbtj_sAAAAAAAAAAABkARQnAQ' width=60 alt='img'/>

- `'H'`: The root node is in the center, with a horizontally symmetrical layout

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0GsIQISvieYAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

- `'V'`: The root node is in the center, with a vertically symmetrical layout

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=100 alt='img'/>

### getSide

> (d?:\_ _Node\_\_) => string_

Nodes are arranged to the left/right side of the root node. If this value is set, all nodes will be on the same side of the root node, which means the 'direction' = 'H' will no longer be effective. If this parameter is a callback function, it can specify the left/right side of the root node for each individual node.

Example:

```javascript
(d) => {
  // d is a node
  if (d.id === 'test-child-id') return 'right';
  return 'left';
};
```

### getId

> (d?:\_ _Node\_\_) => string_

Callback function for node id

Example:

```javascript
(d) => {
  // d is a node
  return d.id + '_node';
};
```

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

### radial

> _boolean_

Whether to use a radial layout. If `radial` is set to `true`, it is recommended to set `direction` to `'LR'` or `'RL'`.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E0c8TIYRPYoAAAAAAAAAAABkARQnAQ' width=200 alt='img'/>
