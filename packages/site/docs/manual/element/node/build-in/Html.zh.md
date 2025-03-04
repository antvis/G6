---
title: Html HTML
---

> 阅读本节前，请先阅读 [API - 节点配置项](/api/elements/nodes/base-node) 章节。

<embed src="@/common/api/elements/nodes/html.md"></embed>

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseNode](./BaseNode.zh.md)

## style.dx

> _number_ **Default:** `0`

横行偏移量。HTML 容器默认以左上角为原点，通过 dx 来进行横向偏移

## style.dy

> _number_ **Default:** `0`

纵向偏移量。HTML 容器默认以左上角为原点，通过 dy 来进行纵向偏移

## <Badge type="success">Required</Badge> style.innerHTML

> _string \|_ _HTMLElement_

HTML 内容，可以为字符串或者 `HTMLElement`
