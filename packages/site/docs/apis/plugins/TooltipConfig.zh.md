---
title: Tooltip 提示项
order: 4
---

- [提示框插件](/examples/tool/tooltip/#tooltipPlugin)
- [点击出现提示框](/examples/tool/tooltip/#tooltipClick)

<img alt="tooltip" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-3OpQKiCgHwAAAAAAAAAAAAADmJ7AQ/original" height='250'/>

## 配置项

<embed src="../../common/IPluginBaseConfig.zh.md"></embed>

### fixToNode

**类型**：`[number, number]` | `Placement` | `undefined`

**默认值**：`undefined`

**是否必须**：false

**说明**：固定到节点的位置

<embed src="../../common/PluginGetContent.zh.md"></embed>

### itemTypes

**类型**：`('node' | 'edge' | 'combo' | 'canvas')[]`

**默认值**：`['node', 'edge', 'combo']`

**是否必须**：false

**说明**：添加菜单项的对象类型

<embed src="../../common/PluginLoadingContent.zh.md"></embed>

### offsetX

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：x 轴偏移量

### offsetY

**类型**：`number`

**默认值**：`0`

**是否必须**：false

**说明**：y 轴偏移量

<embed src="../../common/PluginShouldBegin.zh.md"></embed>

### trigger

**类型**：`'pointerenter'` | `'click'`

**默认值**：`'pointerenter'`

**是否必须**：false

**说明**：触发交互的事件类型

## API

### hideTooltip

**类型**：`() => void`

**说明**：隐藏 Tooltip

### showTooltip

**类型**：`(item: Item, x: number, y: number) => void`

**说明**：显示 Tooltip

> 该 API 暂不可用

### updatePosition

**类型**：`(x: number, y: number) => void`

**说明**：更新 Tooltip 的位置

> 该 API 暂不可用

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>
