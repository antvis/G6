---
title: Image 图片
---

## 概述

图片节点是一个矩形区域，用于显示图像。

适用场景：

- 用于表示用户头像、产品图片或图标。

- 适合表示社交网络、产品目录或图标集合。

- 常用于社交网络图、产品图、UI 设计等。

## 在线体验

<embed src="@/common/api/elements/nodes/image.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseNode](./BaseNode.zh.md)

| 属性 | 描述                       | 类型   | 默认值 | 必选 |
| ---- | -------------------------- | ------ | ------ | ---- |
| img  | 该属性为 img 的别名        | string | -      |      |
| src  | 图片来源，即图片地址字符串 | string | -      | ✓    |

## 示例

### 内置图片节点效果

<Playground path="element/node/demo/image.js" rid="default-image-node"></Playground>
