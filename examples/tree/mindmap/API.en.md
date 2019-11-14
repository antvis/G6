---
title: API
---

## direction
**Type**: String<br />**Options**: 'H' | 'V'<br />**Default**: 'H'<br />**Required**: false<br />**Explanation**: The direction of layout. 

- H —— Root is on the middle, layout in horizontal symmetry.

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571830487985-0c3dfc8c-fadd-4911-8ea4-1b4091a86538.png#align=left&display=inline&height=122&name=image.png&originHeight=906&originWidth=1266&search=&size=267710&status=done&width=170)

- V —— Root is on the middle, layout in vertical symmetry.

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571830515639-e66a5347-09fe-4583-81d6-178aa6920f7b.png#align=left&display=inline&height=136&name=image.png&originHeight=920&originWidth=982&search=&size=252410&status=done&width=145)

<a name="MUDRY"></a>
## getWidth
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**Required**: false<br />**Explanation**: 每个节点的宽度

<a name="Bvvg1"></a>
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

<a name="c4eUs"></a>
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

<a name="G1Yxp"></a>
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

<a name="NJnDM"></a>
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