---
title: Html HTML
---

## 概述

HTML 节点是一个自定义的矩形区域，用于显示 HTML 内容。

适用场景：

- 用于表示复杂的自定义节点，如表格、图表或富文本。

- 适合表示自定义的可视化元素或交互组件。

- 常用于自定义图表、UI 设计等。

## 在线体验

<embed src="@/common/api/elements/nodes/html.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseNode](./BaseNode.zh.md)

| 属性      | 描述                                                            | 类型                        | 默认值 | 必选 |
| --------- | --------------------------------------------------------------- | --------------------------- | ------ | ---- |
| dx        | 横行偏移量。HTML 容器默认以左上角为原点，通过 dx 来进行横向偏移 | number                      | 0      |      |
| dy        | 纵向偏移量。HTML 容器默认以左上角为原点，通过 dy 来进行横向偏移 | number                      | 0      |      |
| innerHTML | HTML 内容，可以为字符串或者 `HTMLElement`                       | string &#124; `HTMLElement` | 0      | ✓    |

## 示例

### 内置HTML节点效果

<Playground path="element/node/demo/html.js" rid="default-html-node"></Playground>
