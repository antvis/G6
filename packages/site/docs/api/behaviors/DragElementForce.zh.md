---
title: DragElementForce 力导向拖拽元素
---

> 如需深入了解交互的使用，请参阅 [API 文档 - 图配置项 - behaviors](/api/graph/option#behaviors) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

只能在使用 d3-force 布局时使用该交互，在拖拽过程中会实时重新计算布局。

## 配置项

### <Badge type="success">Required</Badge> type

> _`drag-element-force` \| string_

此插件已内置，你可以通过 `type: 'drag-element-force'` 来使用它。

### fixed

> _boolean_

在拖拽结束后，节点是否保持固定位置

- `true`: 在拖拽结束后，节点的位置将保持固定，不受布局算法的影响

- `false`: 在拖拽结束后，节点的位置将继续受到布局算法的影响

## Shadow 样式

### shadow{[BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#%E7%BB%98%E5%9B%BE%E5%B1%9E%E6%80%A7)}

<details><summary>形如 icon{TextStyleProps} 的表达式表示在 TextStyleProps 属性名前以小驼峰形式加上 icon 前缀</summary>

TextStyleProps 包含以下属性：

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} 表示你需要使用以下属性名：

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>
