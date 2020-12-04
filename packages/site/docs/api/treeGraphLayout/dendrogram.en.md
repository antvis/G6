---
title: Dendrogram
order: 2
---

<a href='https://en.wikipedia.org/wiki/Dendrogram' target='_blank'>Dendrogram</a> arranges all the leaves on the same level. It is appropriate for hierarchical clustering. It does not consider the node size, which will be regarded as 1px.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zX7tSLqBvwcAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

### layoutCfg.direction

**Type**: String<br />**Options**: 'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**Default**: 'LR'<br />**Required**: false<br />**Description**: The direction of layout.

- TB —— Root is on the top, layout from the top to the bottom

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*B2hvT4yzh7YAAAAAAAAAAABkARQnAQ' width=112 alt='img'/>

- BT —— Root is on the bottom, layout from the bottom to the top

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WkJeRI-EUBkAAAAAAAAAAABkARQnAQ' width=115 alt='img'/>

- LR —— Root is on the left, layout from the left to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2lJ5SYrUqhQAAAAAAAAAAABkARQnAQ' width=52 alt='img'/>

- RL —— Root is on the right, layout from the right to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UQlBR6dz8ZoAAAAAAAAAAABkARQnAQ' width=52 alt='img'/>

- H —— Root is on the middle, layout in horizontal symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5FVzSqlW2H4AAAAAAAAAAABkARQnAQ' width=83 alt='img'/>

- V —— Root is on the middle, layout in vertical symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZFCiTLwCoAYAAAAAAAAAAABkARQnAQ' width=116 alt='img'/>

### layoutCfg.nodeSep

**Type**: Number<br />**Default**: 0<br />**Required**: false<br />**Description**: Node separation

### layoutCfg.rankSep

**Type**: Number<br />**Default**: 0<br />**Required**: false<br />**Description**: Level separation

### layoutCfg.radial

**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Description**: Wheter layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`:<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*MqFcTLAhXIsAAAAAAAAAAABkARQnAQ' width=171 alt='img'/>
