---
title: 基于 G6 的图分析应用
order: 1
---

## 背景

社交网络分析是图可视化中一个重要的应用场景。<br />随着社交网络越来越流行，人与人、人与组织之间的关系变得越来越复杂，使用传统的分析手段，已经很难满足我们的分析需求。在这种情况下，图分析及图可视化显得愈发重要。

## 功能概述

基于 G6 实现一个图分析应用，模拟了一个关系分析场景，使用模拟数据，来展示在图分析应用中我们可以做的一些事情：

- 关系扩散；
- 关系预判；
- 关系聚合；
- 圈检测；
- 圈查询；
- 高效分析；
  - 数据过滤；
  - 实时标记；
  - 隐藏 / 显示 Label；
  - 隐藏 / 显示节点。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rPWURa-ft2QAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## 关系扩散

通过输入的方式查询到具体的个人后，可以针对个人做 1-6 度的关系扩散，也可以进一步分析与他相关的人或组织的关系。

适用场景：在社交网络中，通过 A 的一度关系可以查询到他的所有朋友，通过二度关系，可以查询到他的朋友的朋友，通过分析相关动态，可以了解到关于 A 的更多的信息。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HxQMR5kqVJcAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## 关系预判

在海量数据的社交网络中，人与人、人与组织之间会存在多种类型的关系。假设已知，如 A 是 B 的朋友，B 属于 og 组织。未知：C 与 D 是否也属于 og 组织；如果加入 C 和 D 点到当前图上，网络会如何变化；为 C 和 D 增加“预测”类型的关系，网络会如何变化。为了解这些未知的信息，我们使用关系预判功能。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*nWzDSKyUjUQAAAAAAAAAAABkARQnAQ' width=450 alt='img'/>

适用场景：在社交网络中，为两个原本不相关的节点增加预测边，查看网络发生的变化，以确定该操作对图产生的效果。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*O22IRIJs4FMAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## 关系聚合

A 和 B 之间可能会存在多个同事关系，如 A 和 B 在 company1 公司是同事，在 company2 公司也是同事，只是两条同事关系的时间戳不同。对于这种情况，我们没必要将全有的关系都绘制到页面上，可以将同类型的关系合并成一条关系，点击时再展开。

适用场景：为了降低视觉干扰，将多条同类型的关系合并成一条。

## 圈检测

在社交网络数据中，假设我们已知朋友圈：A 是 B 的朋友，B 是 C 的朋友，C 又是 A 的朋友。此时，我们想知道 D 和 E 是否与我们已知的朋友圈相关。使用圈检测的功能，输入 D 或 E，若他们存在于已知的朋友圈中，则会被展示出来。

适用场景：检测用户是否存在于已知的朋友圈中。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z895QL8sBWQAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## 圈查询

对于已知的圈，我们可以查询每个圈中包含的节点，以及它们之间的关系。

适用场景：查询指定朋友圈中所有的用户以及用户之间的关系。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZFytR6C3uYIAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## 高效分析

图分析应用中，为了提升分析的效率，我们提供了数据过滤、标记重点节点和边、隐藏 / 显示 Label 等辅助功能，可帮助用户更快更好地进行分析。

### 数据过滤

当画布上存在大量的节点及边时，想要进行高效分析是件很困难的事情，我们可以通过过滤的功能，将暂时不需要关注的类型的节点和边先隐藏起来，以便我们将精力放在重点的节点和边上面。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*MydBT7sgPHIAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

### 标记节点及边

在分析过程中，将重点需要关注的节点和边进行标记，可以在复杂的网络关系中很清晰地呈现出我们需要重点关注的内容。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7V_-TJv9ZgQAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

该功能尤其适用于探索特别复杂的网络中。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cYv4RocCh34AAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

### 隐藏 / 显示节点

在分析过程中，我们可以选择性地隐藏不重要的节点及其相关边，方便我们将注意力集中在重点的节点上面。当分析完成以后，可以选择将隐藏的节点全部显示出来。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2L89QI_u16AAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

### 隐藏 / 显示 Label

当边的数量特别大时，边上的 label 相互重叠，影响我们进一步的分析。此时，可以选择将边上的 label 隐藏。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YXxGQIrYgxMAAAAAAAAAAABkARQnAQ' width=850 alt='img'/>

## 总结

本应用以模拟的社交网络数据为例，演示了使用 <a href='https://github.com/antvis/g6' target='_blank'>G6</a> 构建的一个图分析的应用。在实际的场景中，不局限于社交网络数据，任何重关系类的数据，都可使用图分析的技术进行分析，如风控、反洗钱、信用卡诈骗等金融领域；商品、商家及卖家等电商领域。<a href='https://github.com/antvis/g6' target='_blank'>G6</a> 是一款开源的图可视化引擎，专注于关系数据的展示与分析，非常适合用于构建重型的图分析应用。

## 应用地址

<br />G6 官网：<a href='https://g6-v4.antv.vision/' target='_blank'>https://g6-v4.antv.vision/</a> <br />G6 GitHub：<a href='https://github.com/antvis/g6' target='_blank'>https://github.com/antvis/g6</a>
