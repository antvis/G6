---
title: 生态树
order: 1
redirect_from:
  - /zh/examples
---

不管数据的深度多少，总是叶节点对齐。不考虑节点大小，布局时将节点视为1个像素点。
<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/174835/1551166332942-ecdc3c6f-bcc3-48f4-aa64-c9b1a3a2ab67.png#align=left&display=inline&height=145&name=dendrogram-lr.png&originHeight=652&originWidth=888&search=&size=75483&status=done&width=198' alt='dendrogram' width='300'/>


## 使用指南
生态树适用于展示树结构数据，配合 TreeGraph 使用。如下面代码所示，可在实例化 TreeGraph 时使用该布局。除此之外，还可以如[子图布局](https://www.yuque.com/antv/g6/qopkkg#eYZc6)所示单独使用布局。
