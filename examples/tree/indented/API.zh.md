---
title: API
---

## direction
**类型**：String<br />**可选值**：'LR' | 'RL' | 'H'<br />**默认值**：'LR'<br />**是否必须**：false<br />**说明**：树布局的方向，默认为，其他选项说明

- LR —— 根节点在左，往右布局（下图左）<br />
- RL —— 根节点在右，往左布局（下图中）<br />
- H —— 根节点在中间，水平对称布局（下图右）

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wZ5zTLzeVxgAAAAAAAAAAABkARQnAQ' width=110/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q-fCSryViNMAAAAAAAAAAABkARQnAQ' width=87/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*O3fxTqaoipUAAAAAAAAAAABkARQnAQ' width=157/>
> （左）LR。（中）RL。（右）H。


## indent
**类型**：Number<br />**默认值**：20<br />**是否必须**：false<br />**说明**：列间间距


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

## getHeight
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的高度

## getSide
**类型**：Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 'left'
  return 'right';
}
```
**是否必须**：false<br />**说明**：节点放置在根节点左侧或右侧的回调函数，仅对与根节点直接相连的节点有效，设置后将会影响被设置节点的所有子孙节点