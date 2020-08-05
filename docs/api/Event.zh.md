---
title: Event
order: 8
---

本章介绍的事件可以通过 [graph.on](/zh/docs/api/Graph/#oneventname-handler) 与 [graph.off](/zh/docs/api/Graph/#offeventname-handler) 进行绑定/解绑监听函数。

通用事件、Node 事件、Edge 事件及 Canvas 事件回调的参数请参考 [Behavior API](/zh/docs/api/Behavior)。

## 通用事件

| 事件名称 | 描述 |
| --- | --- |
| click | 单击鼠标**左键**或者按下回车键时触发 |
| dblclick | 双击鼠标**左键**时触发 |
| mouseenter | 鼠标移入元素范围内触发，**该事件不冒泡**，即鼠标移到其后代元素上时不会触发 |
| mousemove | 鼠标在元素内部移到时不断触发，不能通过键盘触发 |
| mouseout | 鼠标移出目标元素后触发 |
| mouseover | 鼠标移入目标元素上方，鼠标移到其后代元素上时会触发 |
| mouseleave | 鼠标移出元素范围时触发，**该事件不冒泡**，即鼠标移到其后代元素时不会触发 |
| mousedown | 鼠标按钮被按下（左键或者右键）时触发，不能通过键盘触发 |
| mouseup | 鼠标按钮被释放弹起时触发，不能通过键盘触发 |
| contextmenu | 用户右击鼠标时触发并打开上下文菜单，见 [Demo](/zh/examples/tool/contextMenu) |
| dragstart | 当拖拽元素开始被拖拽的时候触发的事件，此事件作用在被拖曳元素上 |
| drag | 当拖拽元素在拖动过程中时触发的事件，此事件作用于被拖拽元素上 |
| dragend | 当拖拽完成后触发的事件，此事件作用在被拖曳元素上 |
| dragenter | 当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素上 |
| dragleave | 当拖曳元素离开目标元素的时候触发的事件，此事件作用在目标元素上 |
| drop | 被拖拽的元素在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上 |
| keydown | 按下键盘键触发该事件 |
| keyup | 释放键盘键触发该事件 |
| touchstart | 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发 |
| touchmove | 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用 `preventDefault()` 事件可以阻止滚动。 |
| touchend | 当手指从屏幕上离开的时候触发 |

## Node 事件

| 事件名称 | 描述 |
| --- | --- |
| node:click | 鼠标**左键**单击节点时触发 |
| node:dblclick | 鼠标双击**左键**节点时触发 |
| node:mouseenter | 鼠标移入节点时触发 |
| node:mousemove | 鼠标在节点内部移到时不断触发，不能通过键盘触发 |
| node:mouseout | 鼠标移出节点后触发 |
| node:mouseover | 鼠标移入节点上方时触发 |
| node:mouseleave | 鼠标移出节点时触发 |
| node:mousedown | 鼠标按钮在节点上按下（左键或者右键）时触发，不能通过键盘触发 |
| node:mouseup | 节点上按下的鼠标按钮被释放弹起时触发，不能通过键盘触发 |
| node:contextmenu | 用户在节点上右击鼠标时触发并打开右键菜单，见 [Demo](/zh/examples/tool/contextMenu) |
| node:dragstart | 当节点开始被拖拽的时候触发的事件，此事件作用在被拖曳节点上 |
| node:drag | 当节点在拖动过程中时触发的事件，此事件作用于被拖拽节点上 |
| node:dragend | 当拖拽完成后触发的事件，此事件作用在被拖曳节点上 |
| node:dragenter | 当拖曳节点进入目标元素的时候触发的事件，此事件作用在目标元素上 |
| node:dragleave | 当拖曳节点离开目标元素的时候触发的事件，此事件作用在目标元素上 |
| node:drop | 被拖拽的节点在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上 |

## Edge 事件

| 事件名称 | 描述 |
| --- | --- |
| edge:click | 鼠标**左键**单击边时触发 |
| edge:dblclick | 鼠标双击**左键**边时触发 |
| edge:mouseenter | 鼠标移入边时触发 |
| edge:mousemove | 鼠标在边上移到时不断触发，不能通过键盘触发 |
| edge:mouseout | 鼠标移出边后触发 |
| edge:mouseover | 鼠标移入边上方时触发 |
| edge:mouseleave | 鼠标移出边时触发 |
| edge:mousedown | 鼠标按钮在边上按下（左键或者右键）时触发，不能通过键盘触发 |
| edge:mouseup | 边上按下的鼠标按钮被释放弹起时触发，不能通过键盘触发 |
| edge:contextmenu | 用户在边上右击鼠标时触发并打开右键菜单，见 [Demo](/zh/examples/tool/contextMenu) |

## Canvas 事件

| 事件名称 | 描述 |
| --- | --- |
| canvas:click | 鼠标**左键**单击画布时触发 |
| canvas:dblclick | 鼠标双击**左键**画布时触发 |
| canvas:mouseenter | 鼠标移入画布时触发 |
| canvas:mousemove | 鼠标在画布内部移到时不断触发，不能通过键盘触发 |
| canvas:mouseout | 鼠标移出画布后触发 |
| canvas:mouseover | 鼠标移入画布上方时触发 |
| canvas:mouseleave | 鼠标移出画布时触发 |
| canvas:mousedown | 鼠标按钮在画布上按下（左键或者右键）时触发，不能通过键盘触发 |
| canvas:mouseup | 画布上按下的鼠标按钮被释放弹起时触发，不能通过键盘触发 |
| canvas:contextmenu | 用户在画布上右击鼠标时触发并打开右键菜单，见 [Demo](/zh/examples/tool/contextMenu) |
| canvas:dragstart | 当画布开始被拖拽的时候触发的事件，此事件作用在被拖曳画布上 |
| canvas:drag | 当画布在拖动过程中时触发的事件，此事件作用于被拖拽画布上 |
| canvas:dragend | 当拖拽完成后触发的事件，此事件作用在被拖曳画布上 |
| canvas:dragenter | 当拖曳画布进入目标元素的时候触发的事件，此事件作用在目标元素上 |
| canvas:dragleave | 当拖曳画布离开目标元素的时候触发的事件，此事件作用在目标元素上 |

## 时机监听

用于监听图的某方法调用前后的时机。

| 事件名称 | 描述 |
| --- | --- |
| beforeadditem | 调用 `add` / `addItem` 方法之前触发 |
| afteradditem | 调用 `add` / `addItem` 方法之后触发 |
| beforeremoveitem | 调用 `remove` / `removeItem` 方法之前触发 |
| afterremoveitem | 调用 `remove` / `removeItem` 方法之后触发 |
| beforeupdateitem | 调用 `update` / `updateItem` 方法之前触发 |
| afterupdateitem | 调用 `update` / `updateItem` 方法之后触发 |
| beforeitemvisibilitychange | 调用 `showItem` / `hideItem` 方法之前触发 |
| afteritemvisibilitychange | 调用 `showItem` / `hideItem` 方法之后触发 |
| beforeitemstatechange | 调用 `setItemState` 方法之前触发 |
| afteritemstatechange | 调用 `setItemState` 方法之后触发 |
| beforeitemrefresh | 调用 `refreshItem` 方法之前触发 |
| afteritemrefresh | 调用 `refreshItem` 方法之后触发 |
| beforeitemstatesclear | 调用 `clearItemStates` 方法之前触发 |
| afteritemstatesclear | 调用 `clearItemStates` 方法之后触发 |
| beforemodechange | 调用 `setMode` / `addBehaviors` / `removeBehaviors` 方法之前触发 |
| aftermodechange | 调用 `setMode` / `addBehaviors` / `removeBehaviors` 方法之后触发 |
| beforelayout | 布局前触发。调用 `render` 时会进行布局，因此 `render` 时会触发。或用户主动调用图的 `layout` 时触发。 |
| afterrender | 布局完成后触发。调用 `render` 时会进行布局，因此 `render` 时布局完成后会触发。或用户主动调用图的 `layout` 时布局完成后触发。 |
| afteractivaterelations | 使用了 `'activate-relations'` Behavior 并触发了该行为后，该事件被触发 |
| nodeselectchange | 使用了 `'brush-select'` , `'click-select'` 或 `'lasso-select'` Behavior 且选中元素发生变化时，该事件被触发 |
| itemcollapsed | 在 TreeGraph 上使用了 `'collapse-expand'` Behavior 并触发了该行为后，该事件被触发 |
| tooltipchange | 使用了 `'tooltip'` 或 `'edge-tooltip'` Behavior 且 tooltip 的显示/隐藏被改变后，该事件被触发 |
| wheelzoom | 使用了 `'zoom-canvas'` Behavior 并用滚轮对图进行缩放后，该事件被触发 |

### 回调参数

不同时机监听事件的回调参数不同，下面针对各个自定义事件的回调参数进行说明。

#### beforeadditem

| 名称  | 类型   | 描述           |
| ----- | ------ | -------------- |
| type  | String | 当前添加的类型 |
| model | Object | item 数据模型  |

#### afteradditem

| 名称  | 类型   | 描述                 |
| ----- | ------ | -------------------- |
| item  | Item   | 已经添加的 item 实例 |
| model | Object | item 数据模型        |

#### beforeremoveitem / afterremoveitem

| 名称 | 类型 | 描述               |
| ---- | ---- | ------------------ |
| item | Item | 要删除的 item 实例 |

#### beforeupdateitem / afterupdateitem

| 名称  | 类型   | 描述               |
| ----- | ------ | ------------------ |
| item  | Item   | 要更新的 item 实例 |
| model | Object | item 数据模型      |

#### beforeitemvisibilitychange / afteritemvisibilitychange

| 名称    | 类型    | 描述                                      |
| ------- | ------- | ----------------------------------------- |
| item    | Item    | 当前操作的 item 实例                      |
| visible | Boolean | 是否可见，`true` 为可见，`false` 为不可见 |

#### beforeitemstatechange / afteritemstatechange

| 名称    | 类型    | 描述                                      |
| ------- | ------- | ----------------------------------------- |
| item    | Item    | 当前操作的 item 实例                      |
| state   | String  | 状态                                      |
| enalbed | Boolean | 状态是否可用，`true` 可用，`false` 不可用 |

#### beforeitemstatesclear / afteritemstatesclear

| 名称   | 类型           | 描述                 |
| ------ | -------------- | -------------------- |
| item   | Item           | 当前操作的 item 实例 |
| states | Array / String | 需要批量清除的状态   |

#### beforemodechange / aftermodechange

| 名称 | 类型   | 描述           |
| ---- | ------ | -------------- |
| mode | String | 当前的模式名称 |

#### beforeitemrefresh / afteritemrefresh

| 名称 | 类型 | 描述                 |
| ---- | ---- | -------------------- |
| item | Item | 当前操作的 item 实例 |

#### beforelayout / afterrender

无参数

#### afteractivaterelations

| 名称   | 类型   | 描述                 |
| ------ | ------ | -------------------- |
| item   | Item   | 当前操作的 item 实例 |
| action | String | 当前操作名           |

#### nodeselectchange

| 名称          | 类型   | 描述                                                             |
| ------------- | ------ | ---------------------------------------------------------------- |
| target        | Item   | 当前操作的 item 实例                                             |
| selectedItems | Object | 当前被选中的所有 item 实例，形如 `{ nodes: [...], edges: [...]}` |

#### itemcollapsed

| 名称      | 类型    | 描述                                  |
| --------- | ------- | ------------------------------------- |
| item      | Item    | 当前操作的 item 实例                  |
| collapsed | Boolean | 当前操作后，操作对象的 collapsed 状态 |

#### tooltipchange

| 名称   | 类型   | 描述                                          |
| ------ | ------ | --------------------------------------------- |
| item   | Item   | 当前操作的 item 实例                          |
| action | String | tooltip 当前是显示 `'show'` 还是隐藏 `'hide'` |

#### wheelzoom

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| deltaX | Number | 滚动的 x 方向，取值 `1`，`0`，`-1`，`0` 代表没有该方向的滚动 |
| deltaY | Number | 滚动的 y 方向，取值 `1`，`0`，`-1`，`0` 代表没有该方向的滚动 |
| ... 其他滚轮事件的回调参数 |  |  |
