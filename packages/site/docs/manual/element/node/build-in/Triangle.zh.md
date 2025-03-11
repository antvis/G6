---
title: Triangle 三角形
---

## 概述

三角形是一个三边几何形状，具有明确的方向性。

适用场景：

- 用于表示方向性节点、警告或提示。

- 适合表示流程图中的方向指示或层级关系。

- 常用于流程图、网络图、拓扑图等。

## 在线体验

<embed src="@/common/api/elements/nodes/triangle.md"></embed>

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见[BaseNode](./BaseNode.zh.md)

| 属性      | 描述         | 类型                                | 默认值 | 必选 |
| --------- | ------------ | ----------------------------------- | ------ | ---- |
| direction | 三角形的方向 | `up` \| `left` \| `right` \| `down` | `up`   |

## 示例

### 内置三角形节点效果

<Playground path="element/node/demo/triangle.js" rid="default-triangle-node"></Playground>
