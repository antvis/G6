---
title: Behavior - 交互
order: 5
---

## 概述

<image width="200px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sa3jRqp83K4AAAAAAAAAAAAADmJ7AQ/original" />

交互(Behavior)是指用户与画布、元素之间的一些列行为操作，例如拖拽、缩放、平移、选中等，通过交互可以帮助用户更直观的从图中获取信息。

:::warning{title=注意}
G6 5.x 已经移除了“交互模式”(Mode)这一概念，用户只需要管理当前启用的交互行为即可。
:::

G6 提供了丰富的交互功能，用户可以根据自己的需求选择合适的交互行为，包括：

- [Brush Select](/api/behaviors/brush-select)：框选
- [Click Element](/api/behaviors/click-select)：单击选中
- [Collapse Expand](/api/behaviors/collapse-expand)：展开收起
- [Create Edge](/api/behaviors/create-edge)：创建边
- [Drag Canvas](/api/behaviors/drag-canvas)：拖拽画布
- [Drag Element](/api/behaviors/drag-element)：拖拽元素
- [Focus Element](/api/behaviors/focus-element)：聚焦元素
- [Hover Element](/api/behaviors/hover-activate)：悬停元素
- [Lasso Select](/api/behaviors/lasso-select)：套索选择
- [Zoom Canvas](/api/behaviors/zoom-canvas)：缩放画布

## 注册交互

你可以直接使用内置交互，如果想要使用其他交互，需要先进行注册：

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomBehavior } from 'package-name/or/path-to-your-custom-behavior';

register(ExtensionCategory.BEHAVIOR, 'custom-behavior', CustomBehavior);
```

## 配置交互

可以直接在 `behaviors` 中配置交互类型名称，例如：

```typescript
{
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select'],
}
```

同时支持以 `object` 的形式传入配置参数，例如：

```typescript
{
  behaviors: [
    {
      type: 'zoom-canvas',
      sensitivity: 2,
    },
  ],
}
```

> 不同的交互行为支持的配置参数不同，具体请参考[交互行为](/api/behaviors/brush-select)。

### 更新交互

如果要在初始化后更新交互行为，例如临时禁用某个交互行为，可以通过 [updateBehavior](/api/graph/method#graphupdatebehaviorbehavior) 方法：

```typescript
// 禁用 zoom-canvas 交互
graph.updateBehavior({
  key: 'zoom-canvas',
  enable: false,
});
```

:::warning{title=注意}
要使用 `updateBehavior` 方法，需要在初始化时将交互配置为 `object` 的形式，并传入 `key` 值
:::

还可以通过 [setBehaviors](/api/graph/method#graphsetbehaviorsbehaviors) 方法在任意时刻增加、更新、删除当前的交互行为：

```typescript
// 添加 lasso-select 交互
graph.setBehaviors((behaviors) => [...behaviors, 'lasso-select']);

// 更新 zoom-canvas 交互(需要在初始化时将交互配置为 object 的形式并传入 key)
graph.setBehaviors((behaviors) =>
  behaviors.map((behavior) => {
    if (behavior.key === 'zoom-canvas') {
      return { ...behavior, sensitivity: 2 };
    }
    return behavior;
  }),
);

// 移除 click-select 交互
graph.setBehaviors((behaviors) => behaviors.filter((behavior) => behavior !== 'click-select'));
```

## 自定义交互

如果内置交互无法满足需求，可以自定义交互行为，具体请参考[自定义交互](/manual/custom-extension/behavior)。
