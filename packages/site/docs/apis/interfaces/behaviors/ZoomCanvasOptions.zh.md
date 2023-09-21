---
title: ZoomCanvasOptions
---

[概述-v5.0.0-beta.10]（../../ readme.zh.md）/[模块]（../../ modules.zh.md）/[capingiors]（../。 ./modules/behaviors.zh.md）/zoomcanvasoptions

[行为]（../../模块/bepand.zh.md）.zoomcanvasoptions

＃＃ 特性

###启用 iptimize

•``可选的**启用iptimize **：`boolean`

是否启用优化策略，这将隐藏所有形状在缩放时不包括节点钥匙的形状。
todo：优化触发器是 updownkeys

####定义

[packages/g6/src/stdlib/行/zoom-canvas.ts：10]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/behavior/zoom-canvas。 TS＃L10）

---

### eventname

•`可选的** eventname **：`string`

缩放结束时要触发的事件名称。

####定义

[packages/g6/src/stdlib/crutive/zoom-canvas.ts：34]（https：//github.com/antvis/g6/blob/61e525e59b/packages/g6/src/src/stdlib/stdlib/sstdlib/behavior/zoom-canvas。 TS＃L34）

---

### Maxzoom

•`可选的** maxzoom **：`number`

缩放比率的最大值来限制 Zoom-Canvas-3D 行为

####定义

[packages/g6/src/stdlib/crutive/zoom-canvas.ts：42]（https：//github.com/antvis/g6/blob/61e525e59b/packages/g6/src/src/stdlib/stdlib/behavior/zoom-canvas。 TS＃L42）

---

### Minzoom

•`可选的** minzoom **：`number`

缩放比率的最小值以限制变焦 - 瓦斯-3D 行为

####定义

[packages/g6/src/stdlib/行/zoom-canvas.ts：38]（https：//github.com/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/behavior/zoom-canvas。 TS＃L38）

---

### Secondarykey

•`可选的** SecondaryKey **：`弦乐

键盘上的助手次要键。 如果未分配，则在触发时会触发该行为。

####定义

[packages/g6/src/stdlib/行/zoom-canvas.ts：22]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/behavior/zoom-com-canvas。 TS＃L22）

---

＃＃＃ 灵敏度

•`可选的**灵敏度**：`number`

缩小的灵敏度 /速度。

####定义

[packages/g6/src/stdlib/行/zoom-canvas.ts：30]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/behavior/zoom/zoom-canvas。 TS＃L30）

---

###应该 begin

•`` 可选的** shosebegin ** :（`event`：[ ``Ig6graphevent`]（ig6graphevent.zh.md））=>>'boolean`

####类型声明

▸（``event'）：`boolean'

是否允许行为发生在当前项目上。

＃＃＃＃＃ 参数

| 名称| 类型|
| ：------- | ：------- |
| `event` | [``ig6graphevent`]（ig6graphevent.zh.md）|

#####返回

布尔'

####定义

[packages/g6/src/stdlib/crutive/zoom-canvas.ts：46]（https：//github.com/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/behavior/zoom-canvas。 TS＃L46）

---

### speedupkey

•`可选的** speepupkey **：`弦乐

键盘上的键在按下键按键和缩放键盘时加快翻译。 触发器应为此选项的“方向”。

####定义

[packages/g6/src/stdlib/行/zoom-canvas.ts：26]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/stdlib/behavior/zoom-canvas。 TS＃L26）

---

＃＃＃ 扳机

•` 可选的**触发**：````'''' `\ | ``''updownkeys''

默认情况下，行为触发了“车轮”。 “ Updownkeys”是指通过键盘上的向上 /下键触发此行为。

####定义

[packages/g6/src/stdlib/行/zoom-canvas.ts：18]（https://github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/stdlib/stdlib/stdlib/behavior/zoom-canvas。 TS＃L18）

---

### triggeronItems

•`可选的** triggeronItems **：`boolean`

允许在节点 /边缘 /组合上旋转时触发这种行为。

####定义

[packages/g6/src/stdlib/行/zoom-canvas.ts：14]（https：//github.com/antvis/antvis/g6/blob/61e525e59b/packages/g6/src/src/src/stdlib/stdlib/sstdlib/behavior/zoom-canvas。 TS＃L14）
