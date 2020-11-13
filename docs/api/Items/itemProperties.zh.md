---
title: 元素配置项
order: 5
---

G6 图上的元素包括节点、边、节点分组 Combo。每一个元素是一个 [item](/zh/docs/api/nodeEdge/Item) 实例，而实例中的数据模型 `model` 定义了该元素的样式、配置等。在 [入门教程-元素及其配置](/zh/docs/manual/tutorial/elements#配置属性) 中，我们知道配置元素属性有两种方式：实例化图时全局配置；在数据中配置。无论何种方式，都是在配置每个元素的数据模型 `model`。本文介绍节点、边、节点分组 Combo 的 `model` 配置项。

## 通用属性

| 属性名 | 类型    | 是否必须 | 说明                           |
| ----- | ------ | ------- |------------------------------ |
| id    | String | true    | 元素的标识 ID，**必须**是唯一的 string                     |
| style | Object | false   | 元素 [keyShape](/zh/docs/manual/middle/elements/shape-keyshape) 的样式属性，可配置内容与该 keyShape 的图形类型相关，参见[各图形样式属性](/zh/docs/api/nodeEdge/shapeProperties) |
| type  | String | false   | 元素的类型，不传则使用默认值           |
| label | String | false   | 元素的文本标签，有该字段时默认会渲染 label |
| labelCfg | Object | false   | 元素文本标签的配置项，节点、Combo 与 边的配置不同，详见下文各模块内容 |
