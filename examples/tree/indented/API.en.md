---
title: API
---

## direction
**Type**: String<br />**可选值**: 'LR' | 'RL' | 'H'<br />**Default**: 'LR'<br />**Required**: false<br />**Explanation**: The direction of layout. 

- LR —— Root is on the left, layout from the left to the right(left image below)<br />
- RL —— Root is on the right, layout from the right to the left(center image below)<br />
- H —— Root is on the middle, layout in horizontal symmetry(right image below)

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wZ5zTLzeVxgAAAAAAAAAAABkARQnAQ' width=110/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q-fCSryViNMAAAAAAAAAAABkARQnAQ' width=87/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*O3fxTqaoipUAAAAAAAAAAABkARQnAQ' width=157/>
> (Left)LR. (Center)RL. (Right)H.


## indent
**Type**: Number<br />**Default**: 20<br />**Required**: false<br />**Explanation**: Colunm separation


## getWidth
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Explanation**: The width of node

## getHeight
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Explanation**: The height of node

## getSide
**Type**: Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 'left'
  return 'right';
}
```
**Required**: false<br />**Explanation**: The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it.