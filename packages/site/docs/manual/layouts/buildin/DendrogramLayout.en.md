---
title: Dendrogram
---

<a href='https://en.wikipedia.org/wiki/Dendrogram' target='_blank'>Dendrogram</a> layout is characterized by placing all child nodes on the same level, regardless of node size, with each node treated as 1px in size. It is suitable for representing hierarchical clustering.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zX7tSLqBvwcAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

## Opeions

### direction

> _'LR' \| 'RL' \| 'TB' \| 'BT' \| 'H' \| 'V'_ **Default:** `'LR'`

Tree Layout Direction

- `'TB'`: The root node is at the top, with the layout oriented downwards

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*krAnRrLTEnEAAAAAAAAAAABkARQnAQ' width=115 alt='img'/>

- `'BT'`: The root node is at the bottom, with the layout oriented upwards

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0HRyS64i7QoAAAAAAAAAAABkARQnAQ' width=115 alt='img'/>

- `'LR'`: The root node is on the left, with the layout oriented to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*T5KZTJdA2OUAAAAAAAAAAABkARQnAQ' width=55 alt='img'/>

- `'RL'`: The root node is on the right, with the layout oriented to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q7QJQ5RbQ5kAAAAAAAAAAABkARQnAQ' width=55 alt='img'/>

- `'H'`: The root node is in the center, with a horizontally symmetrical layout

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*tzIfRJ5CuR8AAAAAAAAAAABkARQnAQ' width=85 alt='img'/>

- `'V'`: The root node is in the center, with a vertically symmetrical layout

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*B9sjToOzCiAAAAAAAAAAAABkARQnAQ' width=115 alt='img'/>

### nodeSep

> _Number_ **Default:** `20`

Node spacing

### rankSep

> _Number_ **Default:** `200`

The spacing between layers

### radial

> _Boolean_

Whether to use a radial layout. If `radial` is set to `true`, it is recommended to set `direction` to `'LR'` or `'RL'`.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AhopQI5j-bcAAAAAAAAAAABkARQnAQ' width=175 alt='img'/>
