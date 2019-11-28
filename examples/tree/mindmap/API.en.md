---
title: API
---

## direction
**Type**: String<br />**Options**: 'H' | 'V'<br />**Default**: 'H'<br />**Required**: false<br />**Explanation**: The direction of layout. 

- H —— Root is on the middle, layout in horizontal symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1v35TYcFO0cAAAAAAAAAAABkARQnAQ' width=170/>

- V —— Root is on the middle, layout in vertical symmetry.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*x-bVTLOD-BcAAAAAAAAAAABkARQnAQ' width=145/>

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
**Type**: Number | Function<br />**Example**: 

```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Explanation**: The height of node

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


## getSide
**Type**: Function<br />**Example**: 

```javascript
(d) => {
  // d is a node
  if (d.id === 'test-child-id') return 'right'
  return 'left';
}
```
**Default**: 'right'<br />**Required**: false<br />**Explanation**: The callback function of node position(left or right of root node). Only affects the nodes which are connected to the root node directly. And the descendant nodes will be placed according to it. 