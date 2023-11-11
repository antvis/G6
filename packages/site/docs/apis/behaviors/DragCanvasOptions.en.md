---
title: DragCanvas
---

<img alt="drag canvas" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zG5VTJ6tPakAAAAAAAAAAAAADmJ7AQ/original" height='300'/>

## enableOptimize

**Type**: `boolean`

**Default**: `true`

**Required**: false

**Description**: Whether to enable optimization when dragging the canvas

<embed src="../../common/BehaviorEventName.en.md"></embed>

## dragOnItems

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to drag the canvas when dragging the node, edge or combo

## direction

**Type**: `'both'` | `'x'` | `'y'`

**Default**: `both`

**Required**: false

**Description**: The direction of the canvas drag

<embed src="../../common/BehaviorSecondaryKey.en.md"></embed>

## scalableRange

**Type**: `number` | `string`

**Default**: `0`

**Required**: false

**Description**: The range of the canvas that can be dragged

- `0`: The canvas can be dragged infinitely
- `0~1`: The space occupied by the graph can exceed the viewport, but not the percentage of the value
- `{number}px`: The pixel value that can exceed the viewport

<!-- TODO 这里需要确定下取值含义 -->

## secondaryKeyToDisable

**Type**: `string`

**Default**: `shift`

**Required**: false

**Description**: The key to disable dragging

<embed src="../../common/BehaviorShouldBegin.en.md"></embed>

<embed src="../../common/BehaviorSpeedUpKey.en.md"></embed>

## trigger

**Type**: `'drag'` | `'directionKeys'`

**Default**: `drag`

**Required**: false

**Description**: The event type that triggers the interaction
