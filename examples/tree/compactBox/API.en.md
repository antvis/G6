---
title: API
---
## direction
**Type**: String<br />**Options**: 'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**Default**: 'LR'<br />**Required**: false<br />**Explanation**: The direction of layout. 

- TB —— Root is on the top, layout from the top to the bottom

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gBrxRL_fzlMAAAAAAAAAAABkARQnAQ' width=141/>

- BT —— Root is on the bottom, layout from the bottom to the top

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WkJeRI-EUBkAAAAAAAAAAABkARQnAQ' width=140/>

- LR —— Root is on the left, layout from the left to the right

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*BGNcSaWupSUAAAAAAAAAAABkARQnAQ' width=68/>

- RL —— Root is on the right, layout from the right to the left

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J6JTSa-IID8AAAAAAAAAAABkARQnAQ' width=56/>

- H —— Root is on the middle, layout in horizontal symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5FVzSqlW2H4AAAAAAAAAAABkARQnAQ' width=100/>

- V —— Root is on the middle, layout in vertical symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZFCiTLwCoAYAAAAAAAAAAABkARQnAQ' width=102/>

## getWidth
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Explanation**: The width of each node

## getHeight
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Explanation**: The height of each node

## getHGap
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Default**: 18<br />**Required**: false<br />**Explanation**: The horizontal separation of nodes

## getVGap
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Default**: 18<br />**Required**: false<br />**Explanation**: The vertical separation of nodes

## radial
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Explanation**: If layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`:<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*MqFcTLAhXIsAAAAAAAAAAABkARQnAQ' width=195/>
