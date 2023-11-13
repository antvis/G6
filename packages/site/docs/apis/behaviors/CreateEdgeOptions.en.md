---
title: CreateEdge
order: 13
---

- [Create Edge by Dragging](/en/examples/interaction/createEdge/#createEdgeByDragging)
- [Create Edge by Clicking](/en/examples/interaction/createEdge/#createEdgeByClicking)

<img alt="create edge" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*W0EqR6-dp_oAAAAAAAAAAAAADmJ7AQ/original" height='300'/>

## cancelCreateEventName

**Type**: `string`

**Default**: `undefined`

**Required**: false

**Description**: The event name triggered when canceling the creation of the edge

## createActualEventName

**Type**: `string`

**Default**: `undefined`

**Required**: false

**Description**: The event name triggered when creating the actual edge

## createVirtualEventName

**Type**: `string`

**Default**: `undefined`

**Required**: false

**Description**: The event name triggered when creating the virtual edge

## edgeConfig

**Type**: `EdgeDisplayModelData`

**Default**: `{}`

**Required**: false

**Description**: Edge configuration

<embed src="../../common/BehaviorSecondaryKey.en.md"></embed>

## trigger

**Type**: `'click'` | `'drag'`

<!-- TODO 这里没和Type定义保持一致，需要确认 -->

**Default**: `'click'`

**Required**: false

**Description**: The event type that triggers the interaction

<embed src="../../common/BehaviorShould.en.md"></embed>
