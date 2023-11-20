---
title: CreateEdge 创建边
order: 13
---

- [从节点拖拽创建边](/examples/interaction/createEdge/#createEdgeByDragging)
- [点击节点创建边](/examples/interaction/createEdge/#createEdgeByClicking)

<img alt="create edge" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*W0EqR6-dp_oAAAAAAAAAAAAADmJ7AQ/original" height='300'/>

## cancelCreateEventName

**类型**：`string`

**默认值**：`undefined`

取消创建边时，触发的事件名称

## createActualEventName

**类型**：`string`

**默认值**：`undefined`

创建真实边时，触发的事件名称

## createVirtualEventName

**类型**：`string`

**默认值**：`undefined`

创建虚拟边时，触发的事件名称

## edgeConfig

**类型**：`EdgeDisplayModelData`

**默认值**：`{}`

边的配置项

<embed src="../../common/BehaviorSecondaryKey.zh.md"></embed>

## trigger

**类型**：`'click' | 'drag'`

<!-- TODO 这里没和类型定义保持一致，需要确认 -->

**默认值**：`'click'`

**是否必须**：false

**说明**：触发交互的事件类型

<embed src="../../common/BehaviorShould.zh.md"></embed>
