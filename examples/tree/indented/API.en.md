---
title: API
---

## direction
**Type**: String<br />**可选值**: 'LR' | 'RL' | 'H'<br />**Default**: 'LR'<br />**Required**: false<br />**Explanation**: The direction of layout. 

- LR —— Root is on the left, layout from the left to the right(left image below)<br />
- RL —— Root is on the right, layout from the right to the left(center image below)<br />
- H —— Root is on the middle, layout in horizontal symmetry(right image below)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832031826-33f11b5c-3d7a-4767-89b0-1d7cb6f64510.png#align=left&display=inline&height=282&name=image.png&originHeight=908&originWidth=354&search=&size=141929&status=done&width=110)          ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832083137-c38a3f7a-885e-4acf-954a-73fbeb822bde.png#align=left&display=inline&height=279&name=image.png&originHeight=890&originWidth=278&search=&size=133215&status=done&width=87)           ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832100885-51d8526e-d530-4090-9f37-4fdd4f9e865a.png#align=left&display=inline&height=272&name=image.png&originHeight=910&originWidth=526&search=&size=205642&status=done&width=157)
> （Left）LR。（Center）RL。（Right）H。


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