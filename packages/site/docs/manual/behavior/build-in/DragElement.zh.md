---
title: DragElement 拖拽元素
---

## 概述

DragElement 是 G6 中用于实现 **元素拖拽** 功能的内置交互。它具有以下核心特性：

1. **多元素类型支持**：可以同时支持节点（Node）和组合（Combo）的拖拽
2. **智能多选**：支持同时拖拽多个选中状态的元素
3. **视觉反馈**：提供幽灵节点、边的显隐、鼠标样式等多种视觉反馈机制
4. **灵活的拖拽效果**：支持移动、链接、自由拖拽等多种拖拽操作效果
5. **父子关系处理**：自动处理拖拽过程中的元素层级关系，特别是在处理 Combo 结构时

## 在线体验

<embed src="@/common/api/behaviors/drag-element.md"></embed>

## 基本用法

在图配置中添加这一交互：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['drag-element'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'drag-element',
      key: 'drag-element-1',
      enableAnimation: true,
      dropEffect: 'move',
      shadow: true, // 启用拖拽幽灵节点
    },
  ],
});
```

## 配置项

| 配置项     | 说明                                                                                       | 类型                                                 | 默认值                                         | 必选 |
| ---------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ---------------------------------------------- | ---- |
| type       | 交互类型名称                                                                               | string                                               | `drag-element`                                 | ✓    |
| key        | 交互唯一标识符，用于后续操作交互                                                           | string                                               | -                                              |      |
| enable     | 是否启用拖拽功能，默认可以拖拽节点和 Combo                                                 | boolean \| ((event: IElementDragEvent) => boolean)   | `['node', 'combo'].includes(event.targetType)` |      |
| animation  | 是否启用拖拽动画                                                                           | boolean                                              | true                                           |      |
| state      | 节点选中状态的标识，启用多选时会基于该状态查找选中的节点                                   | string                                               | `selected`                                     |      |
| dropEffect | 拖拽操作效果，[说明](#dropeffect-说明)                                                     | `link` \| `move` \| `none`                           | `move`                                         |
| hideEdge   | 控制拖拽过程中边的显示状态，[说明](#hideedge-说明)                                         | `none` \| `all` \| `in` \| `out` \| `both`           | `none`                                         |      |
| shadow     | 是否启用幽灵节点，即用一个图形代替节点跟随鼠标移动。[自定义幽灵节点样式](#shadow-样式配置) | boolean                                              | false                                          |      |
| cursor     | 自定义鼠标样式，[说明](#cursor-说明)                                                       | { default?: Cursor; grab: Cursor; grabbing: Cursor } | -                                              |      |

### dropEffect 说明

`dropEffect` 用于定义拖拽结束后的操作效果：

- `link`: 将拖拽元素设置为目标元素的子元素
- `move`: 移动元素并自动更新父元素（如 Combo）的尺寸
- `none`: 仅更新拖拽目标的位置，不执行其他操作

### hideEdge 说明

`hideEdge` 控制拖拽过程中边的显示状态：

- `none`: 不隐藏任何边
- `out`: 隐藏以当前节点为源节点的边
- `in`: 隐藏以当前节点为目标节点的边
- `both`: 隐藏与当前节点相关的所有边
- `all`: 隐藏图中所有边

注意：当启用 `shadow`（幽灵节点）时，`hideEdge` 配置将不生效。

### cursor 说明

`cursor` 用于自定义拖拽过程中的鼠标指针样式：

- `default`: 默认状态下的指针样式
- `grab`: 鼠标悬停在可拖拽元素上时的指针样式
- `grabbing`: 正在拖拽时的指针样式

可选值有：`auto` | `default` | `none` | `context-menu` | `help` | `pointer` | `progress` | `wait` | `cell` | `crosshair` | `text` | `vertical-text` | `alias` | `copy` | `move` | `no-drop` | `not-allowed` | `grab` | `grabbing` | `all-scroll` | `col-resize` | `row-resize` | `n-resize` | `e-resize` | `s-resize` | `w-resize` | `ne-resize` | `nw-resize` | `se-resize` | `sw-resize` | `ew-resize` | `ns-resize` | `nesw-resize` | `nwse-resize` | `zoom-in` | `zoom-out`

示例配置：

```js
cursor: {
  default: 'default',    // 默认使用普通指针
  grab: 'grab',         // 可拖拽时显示抓取指针
  grabbing: 'grabbing'  // 拖拽中显示抓取中指针
}
```

### shadow 样式配置

当启用 `shadow: true` 时，可以通过以下属性自定义幽灵节点的样式：

| 配置项               | 说明                   | 类型                                | 默认值               |
| -------------------- | ---------------------- | ----------------------------------- | -------------------- |
| shadowFill           | 幽灵节点填充色         | string                              | `#F3F9FF`            |
| shadowFillOpacity    | 幽灵节点填充色透明度   | number                              | 0.5                  |
| shadowStroke         | 幽灵节点描边颜色       | string                              | `#1890FF`            |
| shadowStrokeOpacity  | 幽灵节点描边透明度     | number                              | 0.9                  |
| shadowLineDash       | 幽灵节点虚线配置       | number[]                            | [5, 5]               |
| shadowZIndex         | 幽灵节点渲染层级       | number                              | 100                  |
| shadowWidth          | 幽灵节点宽度           | number                              | 目标元素的包围盒宽度 |
| shadowHeight         | 幽灵节点高度           | number                              | 目标元素的包围盒高度 |
| shadowOpacity        | 幽灵节点整体透明度     | number                              |                      |
| shadowLineWidth      | 幽灵节点线宽度         | number                              |                      |
| shadowLineCap        | 幽灵节点线段端点样式   | `'butt'` \| `'round'` \| `'square'` |                      |
| shadowLineJoin       | 幽灵节点线段连接处样式 | `'miter'` \| `'round'` \| `'bevel'` |                      |
| shadowLineDashOffset | 幽灵节点虚线偏移量     | number                              |                      |
| shadowCursor         | 幽灵节点鼠标样式       | string                              |                      |
| shadowVisibility     | 幽灵节点可见性         | `'visible'` \| `'hidden'`           |                      |

示例配置：

```javascript
{
  type: 'drag-element',
  shadow: true,
  // 自定义幽灵节点样式
  shadowFill: '#E8F3FF',
  shadowFillOpacity: 0.4,
  shadowStroke: '#1890FF',
  shadowStrokeOpacity: 0.8,
  shadowLineDash: [4, 4],
  shadowZIndex: 99
}
```

> 注意：幽灵节点样式继承自 [BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#绘图属性)，上述配置项是在属性名前添加 `shadow` 前缀得到的。

## 代码示例

### 多选推拽

需要配合 `click-select` 行为实现多选，然后通过 `state` 参数关联选中状态：

```javascript
const graph = new Graph({
  behaviors: [
    {
      type: 'click-select',
      multiple: true,
      state: 'selected',
    },
    {
      type: 'drag-element',
      state: 'selected', // 拖拽时会同时移动所有 selected 状态的节点
    },
  ],
});
```
