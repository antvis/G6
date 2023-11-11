---
title: DragCanvas 拖拽画布
---

<img alt="drag canvas" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zG5VTJ6tPakAAAAAAAAAAAAADmJ7AQ/original" height='300'/>

## enableOptimize

**类型**：`boolean`

**默认值**：`true`

**是否必须**：false

**说明**：是否开启优化，开启后，拖拽时仅显示节点关键图形(KeyShape)，提升性能

<embed src="../../common/BehaviorEventName.zh.md"></embed>

## dragOnItems

**类型**：`boolean`

**默认值**：`false`

**是否必须**：false

**说明**：是否在节点/边/Combo 上触发画布拖拽

## direction

**类型**：`'both'` | `'x'` | `'y'`

**默认值**：`both`

**是否必须**：false

**说明**：拖拽方向

<embed src="../../common/BehaviorSecondaryKey.zh.md"></embed>

## scalableRange

**类型**：`number` | `string`

**默认值**：`0`

**是否必须**：false

**说明**：拖拽画布时，画布缩放的最大值

- `0`：画布可以无限拖拽
- `0~1的数值`：图所占空间可以超出视口，但不能该值的百分比
- `{number}px`：可以超出视口的像素值

<!-- TODO 这里需要确定下取值含义 -->

## secondaryKeyToDisable

**类型**：`string`

**默认值**：`shift`

**是否必须**：false

**说明**：禁用拖拽的按键

<embed src="../../common/BehaviorShouldBegin.zh.md"></embed>

<embed src="../../common/BehaviorSpeedUpKey.zh.md"></embed>

## trigger

**类型**：`'drag'` | `'directionKeys'`

**默认值**：`drag`

**是否必须**：false

**说明**：触发交互的事件类型

<embed src="../../common/IG6GraphEvent.zh.md"></embed>
