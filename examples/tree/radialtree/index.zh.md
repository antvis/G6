---
title: 辐射树
order: 4
---

生态树、紧凑树两种布局方法可以通过配置项变换为辐射型树布局。跟节点位于辐射树中心，其他分支辐射式展开。
<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UTm2T67HcFkAAAAAAAAAAABkARQnAQ' alt='radialtree' width='250'/>

## 使用指南
辐射树是通过生态树、紧凑树布局的变形。适用于展示树结构数据，配合 TreeGraph 使用。如下面代码所示，可在实例化 TreeGraph 时使用该布局。

使用方式与对应的生态树、紧凑树相同，配置 `radial` 为  `true` 时，将会以辐射形式展示树。在使用辐射树时建议将布局的 `direction` 配置为 `LR` 或 `RL`。
