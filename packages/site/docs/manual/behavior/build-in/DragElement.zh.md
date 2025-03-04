---
title: DragElement 拖拽元素
---

> 如需深入了解交互的使用，请参阅 [API 文档 - 图配置项 - behaviors](/api/graph/option#behaviors) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

<embed src="@/common/api/behaviors/drag-element.md"></embed>

## 配置项

### <Badge type="success">Required</Badge> type

> _`drag-element` \| string_

此插件已内置，你可以通过 `type: 'drag-element'` 来使用它。

### animation

> _boolean_ **Default:** `true`

是否启用拖拽动画

### cursor

> _{ default?:_ _Cursor\_\_; grab:_ _Cursor\_\_; grabbing:_ _Cursor\_\_; }_

指针样式

### dropEffect

> _'link' \| 'move' \| 'none'_ **Default:** `'move'`

拖拽操作效果

- `'link'`: 将拖拽元素置入为目标元素的子元素

- `'move'`: 移动元素并更新父元素尺寸

- `'none'`: 仅更新拖拽目标位置，不做任何额外操作

combo 元素可作为元素容器置入 node 或 combo 元素

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `['node', 'combo'].includes(event.targetType)`

是否启用拖拽节点的功能，默认可以拖拽 node 和 combo

### hideEdge

> _'none' \| 'all' \|_ _'in' \| 'out' \| 'both'_ **Default:** `'none'`

拖拽时隐藏的边

- `'none'`: 不隐藏

- `'out'`: 隐藏以节点为源节点的边

- `'in'`: 隐藏以节点为目标节点的边

- `'both'`: 隐藏与节点相关的所有边

- `'all'`: 隐藏图中所有边

使用幽灵节点时不会隐藏边

### onFinish

> _(ids:_ _string\_\_[]) => void_

完成拖拽时的回调

### shadow

> _boolean_

是否启用幽灵节点，即用一个图形代替节点跟随鼠标移动

### state

> _string_ **Default:** `'selected'`

节点选中的状态，启用多选时会基于该状态查找选中的节点

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

## API

### DragElement.destroy()

```typescript
destroy(): void;
```
