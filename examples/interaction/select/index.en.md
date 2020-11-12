---
title: Select
order: 14
---

G6 provides some built-in behaviors for selection, including selecting a single item, selecting multiple items, selecting items by brushing, and selecting items by a lasso. Where behavior `'lasso-select'` for selecting by a lasso is a new feature of V3.6.2, which allows the users select items by drawing a irregular polygon as lasso.

## Usage

- Selecting a single item or selecting multiple items: a built-in behavior `'click-select'` with default configurations allows the end-user to select a single item by clicking. You can configure `multiple: true` for it to allow multiple selection by combining mouse clicking and keydown on keyboard. By default, the combined key is `shift`, and you can switch the `trigger` to one of `'shift'`, `'ctrl'`, `'alt'`, `'control'` as you want. For more detail, please refer to click-select](/en/docs/manual/middle/states/defaultBehavior#click-select);

- Selecting multiple items by brush: a built-in behavior `'brush-select'` with default configurations allows the end-user to select multiple items by combining `shift` keydown and draging start from any empty space on the canvas. The key can be switched to one of `'drag'`, `'shift'`, `'ctrl'`, `'alt'`, `'control'` by configuring `trigger`. Notice that, when you are using `'drag'` for `trigger`, the brush selection will start when the end-user drag the canvas without combining key, which might be conflict with `'drag-canvas'` if you configured. So we suggest to use one key for `trigger` to solve the conflict, For more detail, please refer to [brush-select](/en/docs/manual/middle/states/defaultBehavior#brush-select);

- Selecting multiple items by a lasso: a built-in behavior `'lasso-select` allows end-user to draw a lasso to select items inside it. Similar to `'brush-select'`, there are multiple options for `trigger` for keyboard combination. For more detail, please refer to [lasso-select](/en/docs/manual/middle/states/defaultBehavior#lasso-select).
