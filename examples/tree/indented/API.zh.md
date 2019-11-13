---
title: API
---
#### direction
**类型**：String<br />**可选值**：'LR' | 'RL' | 'H'<br />**默认值**：'LR'<br />**是否必须**：false<br />**说明**：树布局的方向，默认为，其他选项说明

- LR —— 根节点在左，往右布局（下图左）<br />
- RL —— 根节点在右，往左布局（下图中）<br />
- H —— 根节点在中间，水平对称布局（下图右）

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832031826-33f11b5c-3d7a-4767-89b0-1d7cb6f64510.png#align=left&display=inline&height=282&name=image.png&originHeight=908&originWidth=354&search=&size=141929&status=done&width=110)          ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832083137-c38a3f7a-885e-4acf-954a-73fbeb822bde.png#align=left&display=inline&height=279&name=image.png&originHeight=890&originWidth=278&search=&size=133215&status=done&width=87)           ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832100885-51d8526e-d530-4090-9f37-4fdd4f9e865a.png#align=left&display=inline&height=272&name=image.png&originHeight=910&originWidth=526&search=&size=205642&status=done&width=157)
> （左）LR。（中）RL。（右）H。


#### indent
**类型**：Number<br />**默认值**：20<br />**是否必须**：false<br />**说明**：列间间距


#### getWidth
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的宽度

#### getHeight
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的高度

#### getSide
**类型**：Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 'left'
  return 'right';
}
```
**是否必须**：false<br />**说明**：节点放置在根节点左侧或右侧的回调函数，仅对与根节点直接相连的节点有效，设置后将会影响被设置节点的所有子孙节点