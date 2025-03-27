---
title: DragElementForce 力导向拖拽元素
---

## 概述

DragElementForce 是 G6 中用于实现 `d3-force` 和 `d3-force-3d` 布局下节点拖拽的内置交互。在拖拽过程中会 **实时重新计算布局**，使得图的布局能够动态调整以适应节点的新位置。

<img alt="力导向拖拽元素效果图" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*I5uDQZWTzMsAAAAAAAAAAAAADmJ7AQ/original" />

## 基本用法

在图配置中添加这一交互：

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['drag-element-force'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'drag-element-force',
      key: 'drag-element-force-1',
      fixed: true, // 拖拽后固定节点位置
    },
  ],
});
```

## 配置项

| 配置项    | 说明                                                           | 类型                                                 | 默认值                                         | 必选 |
| --------- | -------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------- | ---- |
| type      | 交互类型名称，这里设置 `type: 'drag-element-force'` 启用此交互 | string                                               | `drag-element-force`                           | ✓    |
| key       | 交互唯一标识符，用于后续操作交互                               | string                                               | -                                              |      |
| ⭐️ fixed | 在拖拽结束后，节点是否保持固定位置，[说明](#fixed-说明)        | boolean                                              | false                                          |      |
| enable    | 是否启用拖拽功能，默认可以拖拽节点和 Combo                     | boolean \| ((event: IElementDragEvent) => boolean)   | `['node', 'combo'].includes(event.targetType)` |      |
| state     | 节点选中状态的标识，启用多选时会基于该状态查找选中的节点       | string                                               | `selected`                                     |      |
| hideEdge  | 控制拖拽过程中边的显示状态，[说明](#hideedge-说明)             | `none` \| `all` \| `in` \| `out` \| `both`           | `none`                                         |      |
| cursor    | 自定义鼠标样式，[说明](#cursor-说明)                           | { default?: Cursor; grab: Cursor; grabbing: Cursor } | -                                              |      |

### fixed 说明

`fixed` 用于控制节点在拖拽结束后的行为：

- true: 在拖拽结束后，节点的位置将保持固定，不受布局算法的影响
- false: 在拖拽结束后，节点的位置将继续受到布局算法的影响

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

## 常见问题

### 1. DragElementForce 和 DragElement 有什么区别？

- `DragElementForce` 专门用于 `d3-force` 或 `d3-force-3d` 布局，拖拽时会实时重新计算布局
- `DragElement` 是通用的拖拽交互，不会触发布局重新计算

## 实际案例

### 网格效果

<Playground path="layout/force-directed/demo/mesh.js" rid="drag-element-force-mesh"></Playground>

### 固定被拖拽的节点

<Playground path="layout/force-directed/demo/drag-fixed.js" rid="drag-element-force-fixed"></Playground>
