---
title: Tooltip
order: 4
---

- [Tooltip Plugin](/en/examples/tool/tooltip/#tooltipPlugin)
- [Tooltip Plugin with Click Trigger](/en/examples/tool/tooltip/#tooltipClick)

<img alt="tooltip" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-3OpQKiCgHwAAAAAAAAAAAAADmJ7AQ/original" height='250'/>

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

### fixToNode

**Type**: `[number, number] | Placement | undefined`

**Default**: `undefined`

Fix the position to the node

<embed src="../../common/PluginGetContent.en.md"></embed>

### itemTypes

**Type**: `('node' | 'edge' | 'combo' | 'canvas')[]`

**Default**: `['node', 'edge', 'combo']`

The types of the items to add the tooltip

<embed src="../../common/PluginLoadingContent.en.md"></embed>

### offsetX

**Type**: `number`

**Default**: `0`

x offset

### offsetY

**Type**: `number`

**Default**: `0`

y offset

<embed src="../../common/PluginShouldBegin.en.md"></embed>

### trigger

**Type**: `'pointerenter' | 'click'`

**Default**: `'pointerenter'`

The trigger event type

## API

### hideTooltip

**Type**: `() => void`

**Description**: Hide the Tooltip

### showTooltip

**Type**: `(item: Item, x: number, y: number) => void`

**Description**: Show the Tooltip

> This API is not available yet

### updatePosition

**Type**: `(item: Item, x: number, y: number) => void`

**Description**: Update the position of the Tooltip

> This API is not available yet

<embed src="../../common/PluginAPIDestroy.en.md"></embed>
