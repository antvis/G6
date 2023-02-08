---
title: 选中
order: 14
---

G6 提供内置的单选、多选、框选、拉索选择四种选中元素的方式。其中，内置交互 `'lasso-select'`自 V3.6.2 起支持，允许终端用户在画布上绘制一个不规则多边形作为拉索选中几点/边/ combo。

## 如何使用

- 单选与多选：内置交互 `'click-select'` 的默认配置允许终端用户单击选中节点；配置 `multiple: true` 即可允许组合键盘按键进行多选，默认的键盘按键为 `Shift`，可配置 `trigger` 为 `'shift'`、`'ctrl'`、`'alt'`、`'control'` 中的一个来更换键盘按。文档参见 [click-select](/zh/docs/manual/middle/states/default-behavior#click-select)；
- 框选：内置交互 `'brush-select'` 为框选交互，在默认配置下，终端用户可以按住 `shift` 并从画布空白处开始拖拽进行框选。`shift` 也可以通过配置 `trigger` 替换为 `'drag'`、`'shift'`、`'ctrl'`、`'alt'`、`'control'`。需要注意的时，当使用 `'drag'`，即无键盘组合按键直接进行拖拽框选，可能会与 `'drag-canavs'` 的交互产生冲突。因此，我们推荐使用一个键盘组合按键进行区分。文档参见 [brush-select](/zh/docs/manual/middle/states/default-behavior#brush-select)；
- 拉索选择：与 `'brush-select'` 类似，内置交互 `'lasso-select'` 允许配置不同的 `trigger` 来区分拖拽画布。更多内容请参考 [lasso-select](/zh/docs/manual/middle/states/default-behavior#lasso-select)。
