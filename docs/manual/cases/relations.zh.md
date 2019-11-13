---
title: 基于 G6 的图分析应用
order: 0
---

## 背景
社交网络分析是图可视化中一个重要的应用场景。<br />随着社交网络越来越流行，人与人、人与组织之间的关系变得越来越复杂，使用传统的分析手段，已经很难满足我们的分析需求。在这种情况下，图分析及图可视化显得愈发重要。


## 功能概述
基于 G6 实现一个图分析应用，模拟了一个关系分析场景，使用模拟数据，来展示在图分析应用中我们可以做的一些事情：

- 关系扩散：
- 关系预判：
- 关系聚合：
- 圈检测：
- 圈查询：
- 高效分析：
  - 数据过滤：
  - 实时标记：
  - 隐藏 / 显示 Label；
  - 隐藏 / 显示节点。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/178530/1572335767251-d85d0b33-0798-45cf-9a0c-7e3816b36549.gif#align=left&display=inline&height=652&name=3.gif&originHeight=652&originWidth=1311&search=&size=4596794&status=done&width=1311' width=750 />

## 关系扩散
通过指定输入查询到具体的个人后，可以针对查询到的个人，做 1-6 度的关系扩散，可以进一步分析与他相关的人或组织的关系。

适用场景：在社交网络中，通过 A 的一度关系可以查询到他的所有朋友，通过二度关系，可以查询到他的朋友的朋友，通过分析相关动态，可以了解到关于 A 的更多的信息。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/178530/1572331707819-bd82d8fb-63ee-4d11-b7d9-d37bf2ea8dc8.gif#align=left&display=inline&height=666&name=3.gif&originHeight=666&originWidth=1329&search=&size=460178&status=done&width=1329' width=750 />

## 关系预判
在海量的社交网络数据中，人与人、人与组织之间会存在很多种不同类型的关系，我们已知的都是已经真实发生的事情，如 A 是 B 的朋友，B 属于 C 组织，但我们不知道如果 D 也属于 E 组织的话，整个网络会发生什么样的变化。这个时候，关系预判就能够帮助我们，我们通过输入两个节点 D 和 E 来判断，如果我们在 D 和 E节点之间新增一条F 类型的关系，与之相关的关系就会很清晰地呈现在我们眼前。

适用场景：在社交网络中，A 和 B 之间没有直接关系，但想知道如何 A 和 B 之间有某种关系的话，整个关系网络会发生什么样的变化。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/178530/1572332885695-de07b10e-5398-410b-9943-e8d3bc627f85.gif#align=left&display=inline&height=666&name=3.gif&originHeight=666&originWidth=1329&search=&size=152289&status=done&width=1329' width=750 />


## 关系聚合
A 和 B 之间可能会存在多个同事关系，如 A 和 B 在 C 公司是同事，在 D 公司也是同事，只是两条同事关系的时间戳不同。对于这种情况，我们没必要将全有的关系都绘制到页面上，可以将同类型的关系合并成一条关系，点击时再展开。

适用场景：为了降低视觉干扰，将多条同类型的关系合并成一条。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/178530/1572333424764-06be008d-70d1-43d3-8953-4e48fee6aab1.gif#align=left&display=inline&height=666&name=3.gif&originHeight=666&originWidth=1329&search=&size=145488&status=done&width=1329' width=750 />

## 圈检测
在社交网络数据中，假设我们已经有了一批类似 A 是 B 的朋友，B 是 C 的朋友，C 又是 A 的朋友 这样的朋友圈，这个时候，有一个或两个用户 D / E ，我们想知道 D 和 E 是否在我们已知的朋友圈中，可以通过圈检测的功能，输入 D 或 E，如果在已知的朋友圈中，则会展示所在的所有圈。

适用场景：检测给定用户 A 和 B 是否存在于已知的朋友圈中。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/178530/1572332175689-ab525290-c4ec-46f4-890c-cc1e921d63b3.gif#align=left&display=inline&height=666&name=3.gif&originHeight=666&originWidth=1329&search=&size=223387&status=done&width=1329' width=750 />

## 圈查询
对于已知的圈，我们可以查询每个圈中包含的节点，以及它们之间的关系。

适用场景：查询指定朋友圈中所有的用户以及用户之间的关系。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/178530/1572334388045-3e83fd8d-1943-4e91-87be-ba2cf039fe0c.gif#align=left&display=inline&height=677&name=3.gif&originHeight=677&originWidth=1329&search=&size=150465&status=done&width=1329' width=750 />


## 高效分析
图分析应用中，为了提升分析的效率，我们提供了数据过滤、标记重点节点和边、隐藏 / 显示 Label等辅助功能，可帮助用户更快更好地进行分析。


### 数据过滤
当画布上存在大量的节点及边时，想要进行高效分析是件很困难的事情，我们可以通过过滤的功能，将暂时不需要关注的类型的节点和边先隐藏起来，以便我们将精力放在重点的节点和边上面。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/178530/1572334974967-cc3ba7c8-3c20-4c9d-b3e6-98d1a96717ac.gif#align=left&display=inline&height=681&name=3.gif&originHeight=681&originWidth=1329&search=&size=514133&status=done&width=1329' width=750 />


### 标记节点及边
在分析过程中，将重点需要关注的节点和边进行标记，可以在复杂的网络关系中很清晰地呈现出我们需要重点关注的内容。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/178530/1572334499465-00d790ce-f38d-4e80-acc8-80887146346b.gif#align=left&display=inline&height=681&name=3.gif&originHeight=681&originWidth=1329&search=&size=2510946&status=done&width=1329' width=750 />

尤其在特别复杂的网络中，该功能特别有用。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/png/178530/1564655458300-8d080ad1-96aa-4055-9853-5d5a198ce220.png#align=left&display=inline&height=539&name=image.png&originHeight=1078&originWidth=2124&search=&size=1794769&status=done&width=1062' width=750 />


### 隐藏 / 显示节点
在分析过程中，对于一些不是很重要的节点，我们可以选择隐藏掉它和与它相关的边，这样就方便我们将注意力集中在重点的节点上面。当分析完以后，我们还可以选择将隐藏的节点全部显示出来。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/178530/1572335206228-3e180755-d6d5-4adc-b49d-dd91044b2bf0.gif#align=left&display=inline&height=681&name=3.gif&originHeight=681&originWidth=1329&search=&size=1331597&status=done&width=1329' width=750 />


### 隐藏 / 显示 Label
当边特别多时，边上的 label 不仅会重叠在一起，也会影响我们进一步的分析，我们选择将边上的 label 隐藏。

<img src='https://intranetproxy.alipay.com/skylark/lark/0/2019/gif/178530/1572335576003-9456ebff-8ab6-487f-99c7-be27ba4277b6.gif#align=left&display=inline&height=664&name=3.gif&originHeight=664&originWidth=1321&search=&size=434093&status=done&width=1321' width=750 />

## 总结

本应用以模拟的社交网络数据为例，演示了通过使用 [G6](https://github.com/antvis/g6) 构建的一个图分析的应用。在实际的场景中，不仅仅局限于社交网络数据，任何重关系类的数据，都适合使用图分析的技术来进行分析，如风控、反洗钱、信用卡诈骗等金融领域，商品、商家及卖家等电商领域。通过使用图分析技术，我们可以很轻易地具备传统分析方法所欠缺的能力，如分析朋友的朋友这种多度关系的能力。[G6](https://github.com/antvis/g6) 是一款图可视化引擎，专注于图分析领域，非常适合用来构建重型的图分析应用。

## 应用地址

基于 G6 的图分析应用源码：[https://github.com/baizn/g6-analyzer-example](https://github.com/baizn/g6-analyzer-example)<br />G6 官网：[https://antv.alipay.com/zh-cn/g6/3.x/index.html](https://antv.alipay.com/zh-cn/g6/3.x/index.html)<br />G6 GitHub：[https://github.com/antvis/g6](https://github.com/antvis/g6)
