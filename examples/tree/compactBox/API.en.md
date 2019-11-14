---
title: API
---
## direction
**Type**: String<br />**Options**: 'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**Default**: 'LR'<br />**Required**: false<br />**Explanation**: The direction of layout. 

- TB —— Root is on the top, layout from the top to the bottom

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833657395-7b291d7b-5408-41fa-bfb6-533ef39250ad.png#align=left&display=inline&height=59&name=image.png&originHeight=744&originWidth=1786&search=&size=397159&status=done&width=141)

- BT —— Root is on the bottom, layout from the bottom to the top

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833676794-31f862f3-8cb5-412e-81d4-2ac246e37c0d.png#align=left&display=inline&height=60&name=image.png&originHeight=762&originWidth=1790&search=&size=390312&status=done&width=140)

- LR —— Root is on the left, layout from the left to the right

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833574730-5d76d7a2-0e82-4ef7-a7d9-a45efd5b6b30.png#align=left&display=inline&height=119&name=image.png&originHeight=906&originWidth=518&search=&size=164555&status=done&width=68)

- RL —— Root is on the right, layout from the right to the left

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833593889-e98c6f6d-0c38-4408-a4c0-ba83d0bbba74.png#align=left&display=inline&height=115&name=image.png&originHeight=932&originWidth=454&search=&size=154391&status=done&width=56)

- H —— Root is on the middle, layout in horizontal symmetry.

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833726277-822e5104-2189-4fe4-bcdc-7b43d183d541.png#align=left&display=inline&height=110&name=image.png&originHeight=906&originWidth=824&search=&size=226469&status=done&width=100)

- V —— Root is on the middle, layout in vertical symmetry.

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833702068-8f409559-1765-4154-bd4d-bb782de8cd23.png#align=left&display=inline&height=92&name=image.png&originHeight=924&originWidth=1028&search=&size=314177&status=done&width=102)

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
**默认值**: 18<br />**Required**: false<br />**Explanation**: The horizontal separation of nodes

## getVGap
**Type**: Number | Function<br />**Example**: 
```javascript
(d) => {
  // d is a node
  if (d.id === 'testId') return 50
  return 100;
}
```
**默认值**: 18<br />**Required**: false<br />**Explanation**: The vertical separation of nodes

## radial
**Type**: Boolean<br />**默认值**: false<br />**Required**: false<br />**Explanation**: If layout the graph in radial style. If `radial` is `true`, we recommend to set `direction` to `'LR'` or `'RL'`:<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833817425-f944eadd-fd68-4107-8425-81c1c9bd1ce4.png#align=left&display=inline&height=175&name=image.png&originHeight=886&originWidth=990&search=&size=213310&status=done&width=195)
