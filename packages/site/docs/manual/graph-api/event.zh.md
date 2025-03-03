---
title: 事件监听
order: 11
---

## 事件系统概述

G6 提供了强大的事件机制，允许你响应图表中发生的各种交互行为。例如节点点击、边悬停、画布拖拽等。通过事件系统，你可以实现复杂的交互逻辑，提升用户体验。

### 事件分类

G6 中的事件大致可分为以下几类：

1. **元素事件**：与节点、边、Combo 相关的事件，如 `node:click`, `edge:mouseenter`
2. **画布事件**：与整个画布相关的事件，如 `canvas:drag`, `canvas:zoom`
3. **生命周期事件**：与图表生命周期相关的事件，如 `beforerender`, `afterrender`

### 事件命名规则

G6 的事件命名遵循 `[对象]:[事件]` 的格式，例如：

- `node:click` - 节点点击事件
- `edge:mouseenter` - 鼠标进入边的事件
- `canvas:drag` - 画布拖拽事件

## 最佳实践：使用常量枚举

G6 提供了完整的事件常量枚举，**强烈建议**使用这些常量而非直接使用字符串事件名：

```typescript
import { NodeEvent, EdgeEvent, CanvasEvent, GraphEvent } from '@antv/g6';

// 使用常量枚举监听事件
graph.on(NodeEvent.CLICK, handleNodeClick);
graph.on(EdgeEvent.POINTER_OVER, handleEdgeHover);
graph.on(CanvasEvent.DRAG, handleCanvasDrag);
graph.on(GraphEvent.AFTER_RENDER, handleAfterRender);
```

**优势**：

- 类型安全，避免字符串拼写错误
- 提供智能代码提示和自动完成

## API 参考

### Graph.on(eventName, callback, once)

监听指定的事件，当事件触发时执行回调函数。

```typescript
on<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void, once?: boolean): this;
```

#### 参数

| 参数      | 描述                     | 类型               | 默认值 | 必选 |
| --------- | ------------------------ | ------------------ | ------ | ---- |
| eventName | 要监听的事件名称         | string             | -      | ✓    |
| callback  | 事件触发时执行的回调函数 | (event: T) => void | -      | ✓    |
| once      | 是否只监听一次           | boolean            | -      |      |

#### 返回值

- **类型：** this（Graph 实例）
- **描述：** 返回图实例本身，支持链式调用

#### 示例

```typescript
import { NodeEvent, EdgeEvent, CanvasEvent } from '@antv/g6';

// 监听节点点击事件
graph.on(NodeEvent.CLICK, (evt) => {
  const { target } = evt; // 获取被点击节点的 ID
  console.log(`节点 ${target.id} 被点击了`);

  // 获取节点数据
  const nodeData = graph.getNodeData(target.id);
  console.log('节点数据:', nodeData);

  // 修改节点状态
  graph.setElementState(target.id, 'selected');
});

// 监听边的鼠标进入事件
graph.on(EdgeEvent.POINTER_OVER, (evt) => {
  const { target } = evt;
  graph.setElementState(target.id, 'highlight');
});

// 监听画布拖拽事件
graph.on(CanvasEvent.DRAG, (evt) => {
  console.log('画布正在被拖拽');
});
```

### Graph.once(eventName, callback)

一次性监听事件，事件触发一次后自动移除监听器。

```typescript
once<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void): this;
```

#### 参数

| 参数      | 描述                     | 类型               | 默认值 | 必选 |
| --------- | ------------------------ | ------------------ | ------ | ---- |
| eventName | 要监听的事件名称         | string             | -      | ✓    |
| callback  | 事件触发时执行的回调函数 | (event: T) => void | -      | ✓    |

#### 返回值

- **类型：** this（Graph 实例）
- **描述：** 返回图实例本身，支持链式调用

#### 示例

```typescript
import { GraphEvent, NodeEvent } from '@antv/g6';

// 监听图表首次加载完成事件，仅执行一次
graph.once(GraphEvent.AFTER_RENDER, () => {
  console.log('图表首次渲染完成');
  // 执行一次性的初始化操作
  highlightImportantNodes();
});

// 等待用户第一次点击某个节点后执行操作
graph.once(NodeEvent.CLICK, (evt) => {
  console.log('用户首次点击了节点:', evt.target.id);
  showTutorialTip('您可以拖拽节点改变位置');
});
```

### Graph.off()

移除全部事件监听器。

```typescript
off(): this;
```

#### 返回值

- **类型：** this（Graph 实例）
- **描述：** 返回图实例本身，支持链式调用

#### 示例

```typescript
// 移除所有事件监听器
graph.off();
console.log('已移除所有事件监听器');
```

### Graph.off(eventName)

移除指定事件类型的所有监听器。

```typescript
off(eventName: string): this;
```

#### 参数

| 参数      | 描述             | 类型   | 默认值 | 必选 |
| --------- | ---------------- | ------ | ------ | ---- |
| eventName | 要移除的事件名称 | string | -      | ✓    |

#### 返回值

- **类型：** this（Graph 实例）
- **描述：** 返回图实例本身，支持链式调用

#### 示例

```typescript
import { NodeEvent } from '@antv/g6';

// 移除所有节点点击事件的监听器
graph.off(NodeEvent.CLICK);
console.log('已移除所有节点点击事件监听器');

// 在某个操作模式结束后，移除相关的临时事件监听
function exitEditMode() {
  // 移除编辑模式下的所有监听器
  graph.off(NodeEvent.DRAG_END);
  graph.off(NodeEvent.DROP);
  console.log('已退出编辑模式');
}
```

### Graph.off(eventName, callback)

移除特定事件的特定回调函数。

```typescript
off(eventName: string, callback: (...args: any[]) => void): this;
```

#### 参数

| 参数      | 描述             | 类型                     | 默认值 | 必选 |
| --------- | ---------------- | ------------------------ | ------ | ---- |
| eventName | 要移除的事件名称 | string                   | -      | ✓    |
| callback  | 要移除的回调函数 | (...args: any[]) => void | -      | ✓    |

#### 返回值

- **类型：** this（Graph 实例）
- **描述：** 返回图实例本身，支持链式调用

#### 示例

```typescript
import { NodeEvent } from '@antv/g6';

// 定义回调函数
const handleNodeClick = (evt) => {
  console.log('节点被点击:', evt.target.id);
};

// 添加监听器
graph.on(NodeEvent.CLICK, handleNodeClick);

// 之后在某个时机移除这个特定的监听器
graph.off(NodeEvent.CLICK, handleNodeClick);
console.log('已移除特定的节点点击事件监听器');
```

## 事件常量枚举

G6 提供了多种事件常量枚举，便于开发者使用规范的事件名称。以下是所有事件常量的详细说明：

### 节点事件 (NodeEvent)

| 常量名        | 事件名              | 描述                                 |
| ------------- | ------------------- | ------------------------------------ |
| CLICK         | `node:click`        | 点击节点时触发                       |
| DBLCLICK      | `node:dblclick`     | 双击节点时触发                       |
| POINTER_OVER  | `node:pointerover`  | 指针移入节点时触发                   |
| POINTER_LEAVE | `node:pointerleave` | 指针离开节点时触发                   |
| POINTER_ENTER | `node:pointerenter` | 指针进入节点或其子元素时触发(不冒泡) |
| POINTER_MOVE  | `node:pointermove`  | 指针在节点上移动时触发               |
| POINTER_OUT   | `node:pointerout`   | 指针离开节点时触发                   |
| POINTER_DOWN  | `node:pointerdown`  | 指针在节点上按下时触发               |
| POINTER_UP    | `node:pointerup`    | 指针在节点上抬起时触发               |
| CONTEXT_MENU  | `node:contextmenu`  | 节点上打开上下文菜单时触发           |
| DRAG_START    | `node:dragstart`    | 开始拖拽节点时触发                   |
| DRAG          | `node:drag`         | 拖拽节点过程中触发                   |
| DRAG_END      | `node:dragend`      | 拖拽节点结束时触发                   |
| DRAG_ENTER    | `node:dragenter`    | 拖拽物进入节点时触发                 |
| DRAG_OVER     | `node:dragover`     | 拖拽物在节点上方时触发               |
| DRAG_LEAVE    | `node:dragleave`    | 拖拽物离开节点时触发                 |
| DROP          | `node:drop`         | 在节点上放置拖拽物时触发             |

### 边事件 (EdgeEvent)

| 常量名        | 事件名              | 描述                               |
| ------------- | ------------------- | ---------------------------------- |
| CLICK         | `edge:click`        | 点击边时触发                       |
| DBLCLICK      | `edge:dblclick`     | 双击边时触发                       |
| POINTER_OVER  | `edge:pointerover`  | 指针移入边时触发                   |
| POINTER_LEAVE | `edge:pointerleave` | 指针离开边时触发                   |
| POINTER_ENTER | `edge:pointerenter` | 指针进入边或其子元素时触发(不冒泡) |
| POINTER_MOVE  | `edge:pointermove`  | 指针在边上移动时触发               |
| POINTER_OUT   | `edge:pointerout`   | 指针离开边时触发                   |
| POINTER_DOWN  | `edge:pointerdown`  | 指针在边上按下时触发               |
| POINTER_UP    | `edge:pointerup`    | 指针在边上抬起时触发               |
| CONTEXT_MENU  | `edge:contextmenu`  | 边上打开上下文菜单时触发           |
| DRAG_ENTER    | `edge:dragenter`    | 拖拽物进入边时触发                 |
| DRAG_OVER     | `edge:dragover`     | 拖拽物在边上方时触发               |
| DRAG_LEAVE    | `edge:dragleave`    | 拖拽物离开边时触发                 |
| DROP          | `edge:drop`         | 在边上放置拖拽物时触发             |

### Combo事件 (ComboEvent)

| 常量名        | 事件名               | 描述                                  |
| ------------- | -------------------- | ------------------------------------- |
| CLICK         | `combo:click`        | 点击Combo时触发                       |
| DBLCLICK      | `combo:dblclick`     | 双击Combo时触发                       |
| POINTER_OVER  | `combo:pointerover`  | 指针移入Combo时触发                   |
| POINTER_LEAVE | `combo:pointerleave` | 指针离开Combo时触发                   |
| POINTER_ENTER | `combo:pointerenter` | 指针进入Combo或其子元素时触发(不冒泡) |
| POINTER_MOVE  | `combo:pointermove`  | 指针在Combo上移动时触发               |
| POINTER_OUT   | `combo:pointerout`   | 指针离开Combo时触发                   |
| POINTER_DOWN  | `combo:pointerdown`  | 指针在Combo上按下时触发               |
| POINTER_UP    | `combo:pointerup`    | 指针在Combo上抬起时触发               |
| CONTEXT_MENU  | `combo:contextmenu`  | Combo上打开上下文菜单时触发           |
| DRAG_START    | `combo:dragstart`    | 开始拖拽Combo时触发                   |
| DRAG          | `combo:drag`         | 拖拽Combo过程中触发                   |
| DRAG_END      | `combo:dragend`      | 拖拽Combo结束时触发                   |
| DRAG_ENTER    | `combo:dragenter`    | 拖拽物进入Combo时触发                 |
| DRAG_OVER     | `combo:dragover`     | 拖拽物在Combo上方时触发               |
| DRAG_LEAVE    | `combo:dragleave`    | 拖拽物离开Combo时触发                 |
| DROP          | `combo:drop`         | 在Combo上放置拖拽物时触发             |

### 画布事件 (CanvasEvent)

| 常量名        | 事件名                | 描述                                 |
| ------------- | --------------------- | ------------------------------------ |
| CLICK         | `canvas:click`        | 点击画布空白处时触发                 |
| DBLCLICK      | `canvas:dblclick`     | 双击画布空白处时触发                 |
| POINTER_OVER  | `canvas:pointerover`  | 指针移入画布时触发                   |
| POINTER_LEAVE | `canvas:pointerleave` | 指针离开画布时触发                   |
| POINTER_ENTER | `canvas:pointerenter` | 指针进入画布或其子元素时触发(不冒泡) |
| POINTER_MOVE  | `canvas:pointermove`  | 指针在画布上移动时触发               |
| POINTER_OUT   | `canvas:pointerout`   | 指针离开画布时触发                   |
| POINTER_DOWN  | `canvas:pointerdown`  | 指针在画布上按下时触发               |
| POINTER_UP    | `canvas:pointerup`    | 指针在画布上抬起时触发               |
| CONTEXT_MENU  | `canvas:contextmenu`  | 画布上打开上下文菜单时触发           |
| DRAG_START    | `canvas:dragstart`    | 开始拖拽画布时触发                   |
| DRAG          | `canvas:drag`         | 拖拽画布过程中触发                   |
| DRAG_END      | `canvas:dragend`      | 拖拽画布结束时触发                   |
| DRAG_ENTER    | `canvas:dragenter`    | 拖拽物进入画布时触发                 |
| DRAG_OVER     | `canvas:dragover`     | 拖拽物在画布上方时触发               |
| DRAG_LEAVE    | `canvas:dragleave`    | 拖拽物离开画布时触发                 |
| DROP          | `canvas:drop`         | 在画布上放置拖拽物时触发             |
| WHEEL         | `canvas:wheel`        | 在画布上滚动鼠标滚轮时触发           |

### 图表生命周期事件 (GraphEvent)

| 常量名                   | 事件名                   | 描述                               |
| ------------------------ | ------------------------ | ---------------------------------- |
| BEFORE_CANVAS_INIT       | `beforecanvasinit`       | 画布初始化之前触发                 |
| AFTER_CANVAS_INIT        | `aftercanvasinit`        | 画布初始化之后触发                 |
| BEFORE_SIZE_CHANGE       | `beforesizechange`       | 视口尺寸变更之前触发               |
| AFTER_SIZE_CHANGE        | `aftersizechange`        | 视口尺寸变更之后触发               |
| BEFORE_ELEMENT_CREATE    | `beforeelementcreate`    | 元素创建之前触发                   |
| AFTER_ELEMENT_CREATE     | `afterelementcreate`     | 元素创建之后触发                   |
| BEFORE_ELEMENT_UPDATE    | `beforeelementupdate`    | 元素更新之前触发                   |
| AFTER_ELEMENT_UPDATE     | `afterelementupdate`     | 元素更新之后触发                   |
| BEFORE_ELEMENT_DESTROY   | `beforeelementdestroy`   | 元素销毁之前触发                   |
| AFTER_ELEMENT_DESTROY    | `afterelementdestroy`    | 元素销毁之后触发                   |
| BEFORE_ELEMENT_TRANSLATE | `beforeelementtranslate` | 元素平移之前触发                   |
| AFTER_ELEMENT_TRANSLATE  | `afterelementtranslate`  | 元素平移之后触发                   |
| BEFORE_DRAW              | `beforedraw`             | 绘制开始之前触发                   |
| AFTER_DRAW               | `afterdraw`              | 绘制结束之后触发                   |
| BEFORE_RENDER            | `beforerender`           | 渲染开始之前触发                   |
| AFTER_RENDER             | `afterrender`            | 渲染完成之后触发                   |
| BEFORE_ANIMATE           | `beforeanimate`          | 动画开始之前触发                   |
| AFTER_ANIMATE            | `afteranimate`           | 动画结束之后触发                   |
| BEFORE_LAYOUT            | `beforelayout`           | 布局开始之前触发                   |
| AFTER_LAYOUT             | `afterlayout`            | 布局结束之后触发                   |
| BEFORE_STAGE_LAYOUT      | `beforestagelayout`      | 流水线布局过程中每个阶段开始前触发 |
| AFTER_STAGE_LAYOUT       | `afterstagelayout`       | 流水线布局过程中每个阶段结束后触发 |
| BEFORE_TRANSFORM         | `beforetransform`        | 可视区域变化之前触发               |
| AFTER_TRANSFORM          | `aftertransform`         | 可视区域变化之后触发               |
| BATCH_START              | `batchstart`             | 批处理操作开始时触发               |
| BATCH_END                | `batchend`               | 批处理操作结束时触发               |
| BEFORE_DESTROY           | `beforedestroy`          | 图表销毁前触发                     |
| AFTER_DESTROY            | `afterdestroy`           | 图表销毁后触发                     |
| BEFORE_RENDERER_CHANGE   | `beforerendererchange`   | 渲染器变更之前触发                 |
| AFTER_RENDERER_CHANGE    | `afterrendererchange`    | 渲染器变更之后触发                 |

### 容器事件 (ContainerEvent)

| 常量名   | 事件名    | 描述               |
| -------- | --------- | ------------------ |
| KEY_DOWN | `keydown` | 键盘按键按下时触发 |
| KEY_UP   | `keyup`   | 键盘按键抬起时触发 |

### 通用事件 (CommonEvent)

这些是不带前缀的事件，可用于监听全局事件：

| 常量名        | 事件名         | 描述                                     |
| ------------- | -------------- | ---------------------------------------- |
| CLICK         | `click`        | 点击任何元素时触发                       |
| DBLCLICK      | `dblclick`     | 双击任何元素时触发                       |
| POINTER_OVER  | `pointerover`  | 指针移入任何元素时触发                   |
| POINTER_LEAVE | `pointerleave` | 指针离开任何元素时触发                   |
| POINTER_ENTER | `pointerenter` | 指针进入任何元素或其子元素时触发(不冒泡) |
| POINTER_MOVE  | `pointermove`  | 指针在任何元素上移动时触发               |
| POINTER_OUT   | `pointerout`   | 指针离开任何元素时触发                   |
| POINTER_DOWN  | `pointerdown`  | 指针在任何元素上按下时触发               |
| POINTER_UP    | `pointerup`    | 指针在任何元素上抬起时触发               |
| CONTEXT_MENU  | `contextmenu`  | 任何元素上打开上下文菜单时触发           |
| DRAG_START    | `dragstart`    | 开始拖拽任何元素时触发                   |
| DRAG          | `drag`         | 拖拽任何元素过程中触发                   |
| DRAG_END      | `dragend`      | 拖拽任何元素结束时触发                   |
| DRAG_ENTER    | `dragenter`    | 拖拽物进入任何元素时触发                 |
| DRAG_OVER     | `dragover`     | 拖拽物在任何元素上方时触发               |
| DRAG_LEAVE    | `dragleave`    | 拖拽物离开任何元素时触发                 |
| DROP          | `drop`         | 在任何元素上放置拖拽物时触发             |
| KEY_DOWN      | `keydown`      | 键盘按键按下时触发                       |
| KEY_UP        | `keyup`        | 键盘按键抬起时触发                       |
| WHEEL         | `wheel`        | 滚动鼠标滚轮时触发                       |
| PINCH         | `pinch`        | 多点触控屏幕上双指捏合或张开时触发       |

## 使用技巧

### 链式调用

G6 的事件 API 支持链式调用，可以连续注册多个事件：

```typescript
import { NodeEvent, EdgeEvent, CanvasEvent } from '@antv/g6';

// 使用常量枚举+链式调用
graph.on(NodeEvent.CLICK, handleNodeClick).on(EdgeEvent.CLICK, handleEdgeClick).on(CanvasEvent.WHEEL, handleCanvasZoom);
```

### 事件代理

你可以利用事件冒泡机制，在父元素上监听所有子元素的事件：

```typescript
import { CommonEvent } from '@antv/g6';

// 统一处理所有元素的点击事件
graph.on(CommonEvent.CLICK, (evt) => {
  const { targetType, target } = evt;
  if (targetType === 'node') {
    console.log('点击了节点:', target.id);
  } else if (targetType === 'edge') {
    console.log('点击了边:', target.id);
  } else {
    console.log('点击了画布空白处');
  }
});
```

### 事件对象属性

大多数事件的回调函数会接收一个事件对象，包含以下常用属性：

- `target` - 触发事件的元素
- `targetType` - 触发事件的元素类型（node/edge/combo/canvas）
- `originalTarget` - 原始的触发事件的图形
- `currentTarget` - 当前触发事件的对象
- `originalEvent` - 原始的浏览器事件对象

通过这些属性，你可以精确地控制交互行为。
