---
title: API
---


## direction
**Type**: String<br />**Options**:'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**Default**:'LR'<br />**Required**: false<br />**Explanation**: The direction of layout. 

- TB —— Root is on the top, layout from the top to the bottom

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*B2hvT4yzh7YAAAAAAAAAAABkARQnAQ' width=112/>

- BT —— Root is on the bottom, layout from the bottom to the top

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WkJeRI-EUBkAAAAAAAAAAABkARQnAQ' width=115/>

- LR —— Root is on the left, layout from the left to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2lJ5SYrUqhQAAAAAAAAAAABkARQnAQ' width=52/>

- RL —— Root is on the right, layout from the right to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UQlBR6dz8ZoAAAAAAAAAAABkARQnAQ' width=52/>

- H —— Root is on the middle, layout in horizontal symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5FVzSqlW2H4AAAAAAAAAAABkARQnAQ' width=83/>

- V —— Root is on the middle, layout in vertical symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZFCiTLwCoAYAAAAAAAAAAABkARQnAQ' width=116/>

## nodeSep
**Type**: Number<br />**Default**: 0<br />**Required**: false<br />**Explanation**: Node separation

## rankSep
**Type**: Number<br />**Default**: 0<br />**Required**: false<br />**Explanation**: Level separation

## radial
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Explanation**: Wheter layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`:<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*MqFcTLAhXIsAAAAAAAAAAABkARQnAQ' width=171/>