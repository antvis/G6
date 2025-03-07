---
title: Html HTML
---

## 概述

<!-- 介绍什么是 HTML 节点 -->

## 在线体验

<embed src="@/common/api/elements/nodes/html.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseNode](./BaseNode.zh.md)

| 属性 | 描述                                                            | 类型   | 默认值 | 必选 |
| ---- | --------------------------------------------------------------- | ------ | ------ | ---- |
| dx   | 横行偏移量。HTML 容器默认以左上角为原点，通过 dx 来进行横向偏移 | number | 0      |      |

## style.dx

> _number_ **Default:** `0`

横行偏移量。HTML 容器默认以左上角为原点，通过 dx 来进行横向偏移

## style.dy

> _number_ **Default:** `0`

纵向偏移量。HTML 容器默认以左上角为原点，通过 dy 来进行纵向偏移

## <Badge type="success">Required</Badge> style.innerHTML

> _string \|_ _HTMLElement_

HTML 内容，可以为字符串或者 `HTMLElement`

## 示例

### 内置HTML节点效果

<Playground path="element/node/demo/html.js" rid="default-html-node"></Playground>
