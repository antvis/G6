---
title: 缩进树
order: 3
redirect_from:
  - /zh/examples
---

缩进树布局。每个元素会占一行/一列。
<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/174835/1551172247854-99aa0e77-61f0-4b7e-8ab6-6d854fcd2396.png#align=left&display=inline&height=222&name=indented.png&originHeight=876&originWidth=497&search=&size=36070&status=done&width=126' alt='intended' width='100'/>

## 使用指南
缩进树适用于展示树结构数据，配合 TreeGraph 使用。如下面代码所示，可在实例化 TreeGraph 时使用该布局。除此之外，还可以如[子图布局](https://www.yuque.com/antv/g6/qopkkg#eYZc6)所示单独使用布局。

该布局有以下配置项，Function 类型的配置项可以为不同的元素配置不同的值。具体描述请查看相关教程。

- **direction**:
String 类型，树的布局方向。可选值有：'LR'：根节点在左，往右布局，如代码演示 1 | 'RL'：根节点在右，往左布局 | 'H'：根节点在中间，水平对称布局，如代码演示 2。

- **indent**:
Number 类型，列间间距。

- **getWidth**:
Number | Function 类型，每个节点的宽度。

- **getHeight**:
Number | Function 类型，每个节点的高度。

- **getHGap**:
Number | Function 类型，每个节点的水平间隙。

- **getVGap**:
Number | Function 类型，每个节点的垂直间隙。

- **getSide**:
Function 类型，节点放置在根节点左侧或右侧的回调函数，仅对与根节点直接相连的节点有效，设置后将会影响被设置节点的所有子孙节点。
