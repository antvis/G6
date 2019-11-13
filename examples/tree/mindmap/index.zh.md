---
title: 脑图树
order: 2
redirect_from:
  - /zh/examples
---

深度相同的节点将会被放置在同一层，与 compactBox 不同的是，布局不会考虑节点的大小。
<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1571830487985-0c3dfc8c-fadd-4911-8ea4-1b4091a86538.png#align=left&display=inline&height=160&name=image.png&originHeight=906&originWidth=1266&search=&size=267710&status=done&width=223' alt='mindmap' width='250'/>


## 使用指南
脑图树适用于展示树结构数据，配合 TreeGraph 使用。如下面代码所示，可在实例化 TreeGraph 时使用该布局。除此之外，还可以如[子图布局](https://www.yuque.com/antv/g6/qopkkg#eYZc6)所示单独使用布局。

该布局有以下配置项，Function 类型的配置项可以为不同的元素配置不同的值。具体描述请查看相关教程。

- **direction**:
String 类型，树的布局方向。可选值有：'H'：根节点的子节点分成两部分横向放置在根节点左右两侧 ，如代码演示 1 | 'V'：将根节点的所有孩子纵向排列。

- **getWidth**:
Number | Function 类型，每个节点的宽度。

- **getHeight**:
Number | Function 类型，每个节点的高度。

- **getHGap**:
Number | Function 类型，每个节点的水平间隙。

- **getVGap**:
Number | Function 类型，每个节点的垂直间隙。

- **getSide**:
Function 类型，节点排布在根节点的左侧/右侧。若设置了该值，则所有节点会在根节点同一侧，即 direction = 'H' 不再起效。若该参数为回调函数，则可以指定每一个节点在根节点的左/右侧。如代码演示 2、3、4。