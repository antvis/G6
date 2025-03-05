---
title: 自定义元素
order: 6
---

## 概述

当 G6 的内置元素无法满足需求时，可以通过自定义元素来扩展 G6 的元素库。自定义元素是 G6 的一个重要特性，它允许用户基于现有元素进行二次继承封装，也可以基于 [G 图形](https://g.antv.antgroup.com/api/basic/display-object)进行全新的元素开发。

## 元素基类

开始自定义元素之前，你需要了解 G6 元素基类中的一些重要属性和方法：

### 属性

#### shapeMap

> Record<string, DisplayObject>

当前元素下所有图形的映射表

#### animateMap

> Record<string, IAnimation>

当前元素下所有动画的映射表

### 方法

#### upsert(key, Ctor, style, container)

创建或更新图形，并在元素销毁时自动销毁该图形

```typescript
upsert(key: string, Ctor: { new (...args: any[]): DisplayObject }, style: Record<string, any>, container: DisplayObject);
```

| 参数      | 类型                                    | 描述                                                                                                                                                                                                                                   |
| --------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key       | string                                  | 图形的 key，即 `shapeMap` 中对应的 key。内置的 key 包括 `'key'` `'label'` `'halo'` `'icon'` `'port'` `'badge'`<br/> key 不应使用特殊符号，会基于该值转化为驼峰形式调用 `getXxxStyle` 和 `drawXxxShape` 方法（见[元素约定](#元素约定)） |
| Ctor      | { new (...args: any[]): DisplayObject } | 图形类                                                                                                                                                                                                                                 |
| style     | Record<string, any>                     | 图形样式                                                                                                                                                                                                                               |
| container | DisplayObject                           | 挂载图形的容器                                                                                                                                                                                                                         |

#### render(style, container)

绘制元素内容

```typescript
render(style: Record<string, any>, container: Group): void;
```

| 参数      | 类型                | 描述     |
| --------- | ------------------- | -------- |
| style     | Record<string, any> | 元素样式 |
| container | Group               | 容器     |

### Hook

元素提供以下钩子函数，可以按需进行重写：

- `onCreate` 当元素创建后并完成入场动画时触发
- `onUpdate` 当元素更新后并完成更新动画时触发
- `onDestroy` 当元素完成退场动画并销毁后触发

### 元素约定

- **使用约定属性**

目前约定的元素属性包括：

- 通过 `this.getSize()` 获取元素的尺寸

- **采用 `getXxxStyle` 和 `drawXxxShape` 配对的方式进行图形绘制**

`getXxxStyle` 用于获取图形样式，`drawXxxShape` 用于绘制图形。通过该方式创建的图形支持自动执行动画。

> 其中 `Xxx` 是调用 [upsert](#方法) 方法时传入的 key 的驼峰形式。

- **可通过 `this.context` 访问 Graph 上下文**
