---
title: Options
---

[概述-v5.0.0-beta.10]（../../ readme.zh.md）/[模块]（../../ modules.zh.md）/[capingiors]（../。 ./modules/behaviors.zh.md）/options

[行为]（../../模块/cravicy.zh.md）.options

＃＃ 特性

###残疾人

•**残疾**：`boolean`

是否禁用该行为触发的崩溃 /展开动画。

####定义

[packages/g6/src/stdlib/crutive/collapse-expand-tree.ts：21] Expand-tree.ts＃l21）

---

### eventname

•** eventname **：`弦乐

当选择/取消选择项目时，要触发的事件名称。

####定义

[packages/g6/src/stdlib/crutive/collapse-expand-tree.ts：17] 扩展-Tree.ts＃l17）

---

###应该 begin

•**应该 begin ** ：（`event`：[```ig6graphevent`]（ig6graphevent.zh.md））=>>'boolean`

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

[packages/g6/src/stdlib/crutive/collapse-expand-tree.ts：25] 扩展-Tree.ts＃l25）

---

###应该努力

•**应该 update **：（`event`：[```ig6graphevent`]（ig6graphevent.zh.md））=>>'boolean`

####类型声明

▸（``event'）：`boolean'

是否更新项目状态。
如果返回 false，您可能会收听`eventname''和
手动管理状态或数据

＃＃＃＃＃ 参数

| 名称| 类型|
| ：------- | ：------- |
| `event` | [``ig6graphevent`]（ig6graphevent.zh.md）|

#####返回

布尔'

####定义

[packages/g6/src/stdlib/crutive/collapse-expand-tree.ts：31] 扩展-Tree.ts＃l31）

---

＃＃＃ 扳机

•**触发**：``'click'`\ | ````dblclick''

单击鼠标按下以应用多个选择的键。
默认为```shift''`。
可以是“换档”，“ CTRL”，“ ALT”或“ META”。

####定义

[packages/g6/src/stdlib/crutive/collapse-expand-tree.ts：13] 扩展-Tree.ts＃l13）
