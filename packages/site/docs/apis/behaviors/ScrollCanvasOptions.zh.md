---
title: ScrollCanvas 画布滚动
order: 12
---

- [双向滚动画布](/examples/interaction/moveCanvas/#scrollBoth)
- [Y 轴滚动画布](/examples/interaction/moveCanvas/#scrollY)

## allowDragOnItem

**类型**：`boolean` | `{node?: boolean; edge?: boolean; combo?: boolean}`

**默认值**：`false`

**是否必须**：false

**说明**：是否在节点/边/Combo 上触发画布滚动

<embed src="../../common/BehaviorDirection.zh.md"></embed>

<embed src="../../common/BehaviorEnableOptimize.zh.md"></embed>

<embed src="../../common/BehaviorScalableRange.zh.md"></embed>

## zoomKey

**类型**：`string` | `string[]`

**默认值**：`ctrl`

**是否必须**：false

**说明**：触发缩放的按键

## zoomRatio

**类型**：`number`

**默认值**：`0.05`

**是否必须**：false

**说明**：缩放比例
