---
title: Event
order: 6
---

通用事件、Node事件、Edge事件及Canvas事件回调的参数请参考[Behavior文档](./Behavior)。

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
| contextmenu | 用户右击鼠标时触发并打开上下文菜单 |
| dragstart | 当拖拽元素开始被拖拽的时候触发的事件，此事件作用在被拖曳元素上 |
| drag | 当拖拽元素在拖动过程中时触发的事件，此事件作用于被拖拽元素上 |
| dragend | 当拖拽完成后触发的事件，此事件作用在被拖曳元素上 |
| dragenter | 当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素上 |
| dragleave | 当拖曳元素离开目标元素的时候触发的事件，此事件作用在目标元素上 |
| drop | 被拖拽的元素在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上 |
| keydown | 按下键盘键触发该事件 |
| keyup | 释放键盘键触发该事件 |
| touchstart | 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发 |
| touchmove | 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。 |
| touchend | 当手指从屏幕上离开的时候触发 |


## Node事件

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
| node:contextmenu | 用户在节点上右击鼠标时触发并打开右键菜单 |
| node:dragstart | 当节点开始被拖拽的时候触发的事件，此事件作用在被拖曳节点上 |
| node:drag | 当节点在拖动过程中时触发的事件，此事件作用于被拖拽节点上 |
| node:dragend | 当拖拽完成后触发的事件，此事件作用在被拖曳节点上 |
| node:dragenter | 当拖曳节点进入目标元素的时候触发的事件，此事件作用在目标元素上 |
| node:dragleave | 当拖曳节点离开目标元素的时候触发的事件，此事件作用在目标元素上 |
| node:drop | 被拖拽的节点在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上 |


## Edge事件

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
| edge:contextmenu | 用户在边上右击鼠标时触发并打开右键菜单 |


## Canvas事件

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
| canvas:contextmenu | 用户在画布上右击鼠标时触发并打开右键菜单 |
| canvas:dragstart | 当画布开始被拖拽的时候触发的事件，此事件作用在被拖曳画布上 |
| canvas:drag | 当画布在拖动过程中时触发的事件，此事件作用于被拖拽画布上 |
| canvas:dragend | 当拖拽完成后触发的事件，此事件作用在被拖曳画布上 |
| canvas:dragenter | 当拖曳画布进入目标元素的时候触发的事件，此事件作用在目标元素上 |
| canvas:dragleave | 当拖曳画布离开目标元素的时候触发的事件，此事件作用在目标元素上 |


## 时机监听
用于监听图的某方法调用前后的时机。

| 事件名称 | 描述 |
| --- | --- |
| beforeadditem | 调用add / addItem方法之前触发 |
| afteradditem | 调用add / addItem方法之后触发 |
| beforeremoveitem | 调用remove / removeItem方法之前触发 |
| afterremoveitem | 调用remove / removeItem方法之后触发 |
| beforeupdateitem | 调用update / updateItem方法之前触发 |
| afterupdateitem | 调用update / updateItem方法之后触发 |
| beforeitemvisibilitychange | 调用showItem / hideItem方法之前触发 |
| afteritemvisibilitychange | 调用showItem / hideItem方法之后触发 |
| beforeitemstatechange | 调用setItemState方法之前触发 |
| afteritemstatechange | 调用setItemState方法之后触发 |
| beforeitemrefresh | 调用refreshItem方法之前触发 |
| afteritemrefresh | 调用refreshItem方法之后触发 |
| beforeitemstatesclear | 调用clearItemStates方法之前触发 |
| afteritemstatesclear | 调用clearItemStates方法之后触发 |
| beforelayout | 布局前触发。调用 render 时会进行布局，因此 render 时会触发。或用户主动调用图的 layout 时触发。 |
| afterlayout | 布局完成后触发。调用 render 时会进行布局，因此 render 时布局完成后会触发。或用户主动调用图的 layout 时布局完成后触发。 |


不同自定义事件的回调参数不同，下面针对各个自定义事件的回调参数进行说明。

### beforeadditem

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| type | string | 当前添加的类型 |
| model | object | item数据模型 |


### afteradditem

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| item | Item | 已经添加的Item实例 |
| model | object | item数据模型 |


### beforeremoveitem / afterremoveitem

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| item | Item | 要删除的item实例 |


### beforeupdateitem / afterupdateitem

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| item | Item | 要更新的Item实例 |
| model | object | item数据模型 |


### beforeitemvisibilitychange / afteritemvisibilitychange

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| item | Item | 当前操作的Item实例 |
| visible | boolean | 是否可见，true为可见，false为不可见 |


### beforeitemstatechange / afteritemstatechange

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| item | Item | 当前操作的Item实例 |
| state | string | 状态 |
| enalbed | boolean | 状态是否可用，true可用，false不可用 |


### beforeitemstatesclear / afteritemstatesclear

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| item | Item | 当前操作的Item实例 |
| states | array | string | 需要批量清除的状态 |


### beforeitemrefresh / afteritemrefresh

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| item | Item | 当前操作的Item实例 |
