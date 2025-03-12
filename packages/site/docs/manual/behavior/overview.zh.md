---
title: 交互总览
order: 1
---

## 什么是交互

<image width="200px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sa3jRqp83K4AAAAAAAAAAAAADmJ7AQ/original" />

交互(Behavior)是指用户与图表元素之间的互动操作，如拖拽画布、选择节点、缩放视图等。良好的交互设计能让用户更直观地探索和理解图数据。**合理配置交互是构建高效可用图表的关键环节**。

### G6 5.0 交互系统变化

G6 5.0 移除了 "交互模式"(Mode) 概念，直接在 `behaviors` 中列出需要的交互行为，简化了配置方式。这使得交互配置更加直观，上手更加简单。

```javascript {4}
import { Graph } from '@antv/g6';

const graph = new Graph({
  behaviors: ['drag-canvas', 'zoom-canvas', 'click-select'],
});
```

## 内置交互

G6 提供了多种开箱即用的内置交互，**无需注册，直接配置即可使用**：

| 分类     | 交互名称                                                              | 注册类型                      | 功能描述                   |
| -------- | --------------------------------------------------------------------- | ----------------------------- | -------------------------- |
| 导航     |                                                                       |                               |                            |
|          | [拖拽画布](/manual/behavior/build-in/drag-canvas)                     | `drag-canvas`                 | 拖动整个画布视图           |
|          | [缩放画布](/manual/behavior/build-in/zoom-canvas)                     | `zoom-canvas`                 | 缩放画布视图               |
|          | [滚动画布](/manual/behavior/build-in/scroll-canvas)                   | `scroll-canvas`               | 使用滚轮滚动画布           |
|          | [优化视口变换](/manual/behavior/build-in/optimize-viewport-transform) | `optimize-viewport-transform` | 优化视图变换性能           |
| 选择     |                                                                       |                               |                            |
|          | [点击选择](/manual/behavior/build-in/click-select)                    | `click-select`                | 点击选择图元素             |
|          | [框选](/manual/behavior/build-in/brush-select)                        | `brush-select`                | 通过拖拽矩形区域选择元素   |
|          | [套索选择](/manual/behavior/build-in/lasso-select)                    | `lasso-select`                | 自由绘制区域选择元素       |
| 编辑     |                                                                       |                               |                            |
|          | [创建边](/manual/behavior/build-in/create-edge)                       | `create-edge`                 | 交互式创建新的边           |
|          | [拖拽元素](/manual/behavior/build-in/drag-element)                    | `drag-element`                | 拖动节点或组合             |
|          | [力导向拖拽](/manual/behavior/build-in/drag-element-force)            | `drag-element-force`          | 力导向布局中拖动节点       |
| 数据探索 |                                                                       |                               |                            |
|          | [折叠/展开](/manual/behavior/build-in/collapse-expand)                | `collapse-expand`             | 展开或收起子树节点         |
|          | [聚焦元素](/manual/behavior/build-in/focus-element)                   | `focus-element`               | 聚焦特定元素，自动调整视图 |
|          | [悬停激活](/manual/behavior/build-in/hover-activate)                  | `hover-activate`              | 鼠标悬停时高亮元素         |
| 视觉优化 |                                                                       |                               |                            |
|          | [固定元素大小](/manual/behavior/build-in/fix-element-size)            | `fix-element-size`            | 将元素大小固定为指定值     |
|          | [自适应标签](/manual/behavior/build-in/auto-adapt-label)              | `auto-adapt-label`            | 自动调整标签位置           |

各交互的详细配置可参考 [内置交互文档](/manual/behavior/build-in/drag-canvas)。

:::warning{title=交互兼容性}
某些交互在触发机制上可能存在重叠，如 `brush-select` 和 `drag-canvas` 都使用鼠标拖拽。这种情况下可以通过修改触发按键（如按住 `Shift` 拖拽选择）来避免冲突。
:::

## 自定义交互

当内置交互无法满足需求时，G6 提供了强大的自定义能力：

- 继承内置交互进行扩展
- 创建全新的交互行为

与内置交互不同，**自定义交互需要先注册后使用**。详细教程请参考 [自定义交互](/manual/behavior/custom-behavior) 文档。

## 配置和使用

### 基本配置

最简单的方式是在图实例初始化时，通过 `behaviors` 数组直接指定需要的交互：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['drag-canvas', 'zoom-canvas', 'click-select'],
});
```

### 配置交互参数

对于需要自定义参数的交互，可以使用 `object` 的形式配置属性：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    'drag-canvas',
    {
      type: 'zoom-canvas',
      sensitivity: 1.5, // 配置灵敏度
      key: 'zoom-behavior', // 为交互指定key，便于后续更新
    },
  ],
});
```

### 动态更新交互

G6 支持在图实例运行期间动态管理交互行为，满足复杂交互需求：

可以通过 [setBehaviors](/api/behavior#graphsetbehaviorsbehaviors) 方法调整交互：

```javascript
// 添加新交互
graph.setBehaviors((behaviors) => [...behaviors, 'lasso-select']);

// 移除交互
graph.setBehaviors((behaviors) => behaviors.filter((b) => b !== 'click-select'));
```

可以使用 [updateBehavior](/api/behavior#graphupdatebehaviorbehavior) 方法更新交互的配置：

```javascript
// 更新单个交互
graph.updateBehavior({
  key: 'zoom-behavior',
  sensitivity: 2,
  enable: false, // 禁用该交互
});
```

:::warning{title=注意}
使用`updateBehavior`方法时，需要在初始化时为交互指定唯一的`key`。
:::

### 卸载交互

使用 [setBehaviors](/api/behavior#graphsetbehaviorsbehaviors) 方法同样可以卸载交互，将交互配置列表置为空即可：

```javascript
graph.setBehaviors([]);
```

更多与交互相关的 API 请参考 [交互 API 文档](/api/behavior)。

## 交互与事件

交互本质上是通过事件监听和响应来实现的。虽然内置交互已经封装了常见的交互行为，但你也可以通过事件 API 直接实现自定义交互逻辑。

### 事件监听示例

```javascript
// 使用事件常量（推荐）
import { NodeEvent, EdgeEvent } from '@antv/g6';

// 监听节点点击
graph.on(NodeEvent.CLICK, (evt) => {
  const { target } = evt;
  graph.setElementState(target.id, 'selected');
});

// 监听边悬停
graph.on(EdgeEvent.POINTER_OVER, (evt) => {
  const { target } = evt;
  graph.setElementState(target.id, 'highlight');
});
```

事件系统是实现交互的基础，掌握事件 API 对于理解和扩展交互行为至关重要。更多事件相关信息，请参考 [事件文档](/api/event)。
