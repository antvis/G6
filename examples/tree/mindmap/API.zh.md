---
title: API
---

## direction
**类型**：String<br />**可选值**：'H' | 'V'<br />**默认值**：'H'<br />**是否必须**：false<br />**说明**：树布局的方向，默认为，其他选项说明

- H：horizontal（水平）—— 根节点的子节点分成两部分横向放置在根节点左右两侧

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1v35TYcFO0cAAAAAAAAAAABkARQnAQ' width=170/>

- V：vertical （竖直）—— 将根节点的所有孩子纵向排列

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*x-bVTLOD-BcAAAAAAAAAAABkARQnAQ' width=145/>

<a name="MUDRY"></a>
## getWidth
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的宽度

<a name="Bvvg1"></a>
## getHeight
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的高度

<a name="c4eUs"></a>
## getHGap
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**默认值**：18<br />**是否必须**：false<br />**说明**：每个节点的水平间隙

<a name="G1Yxp"></a>
## getVGap
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**默认值**：18<br />**是否必须**：false<br />**说明**：每个节点的垂直间隙

<a name="NJnDM"></a>
## getSide
**类型**：Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'test-child-id') return 'right'
  return 'left';
}
```
**默认值**：'right'<br />**是否必须**：false<br />**说明**：节点排布在根节点的左侧/右侧。若设置了该值，则所有节点会在根节点同一侧，即 direction = 'H' 不再起效。若该参数为回调函数，则可以指定每一个节点在根节点的左/右侧