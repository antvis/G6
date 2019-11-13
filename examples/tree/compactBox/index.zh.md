---
title: 紧凑树
order: 0
redirect_from:
  - /zh/examples
---

从根节点开始，同一深度的节点在同一层，并且布局时会将节点大小考虑进去。
<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/174835/1551166323476-178c0e50-0999-4b07-ab72-a61f779cce28.png#align=left&display=inline&height=166&name=compact-box.png&originHeight=687&originWidth=1916&search=&size=53500&status=done&width=464' alt='compactbox' width='300'/>

## 使用指南
紧凑树适用于展示树结构数据，配合 TreeGraph 使用。如下面代码所示，可在实例化 TreeGraph 时使用该布局。除此之外，还可以如[子图布局](https://www.yuque.com/antv/g6/qopkkg#eYZc6)所示单独使用布局。

该布局有以下配置项，Function 类型的配置项可以为不同的元素配置不同的值。具体描述请查看相关教程。

- **direction**:
String 类型，树的布局方向。可选值有：
'LR'：从左至右布局，如代码演示 1 | 'RL'：从右至左布局 | 'TB'：从上至下布局，如代码演示 2 | 'BT'：从下至上布局 | 'H'：根节点在中间，水平对称布局 | 'V'：根节点在中间，垂直对称布局。

- **getWidth**:
Number | Function 类型，每个节点的宽度。


- **getHeight**:
Number | Function 类型，每个节点的高度。


- **getHGap**:
Number | Function 类型，每个节点的水平间隙。


- **getVGap**:
Number | Function 类型，每个节点的垂直间隙。


- **radial**:
Boolean 类型，是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`。

