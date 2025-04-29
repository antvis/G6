---
title: FixElementSize 缩放画布时固定元素大小
---

## 概述

FixElementSize 是 G6 提供的一种内置交互，用于在视图缩放过程中，**保持节点中某些元素的尺寸不随缩放变化。** 提升缩放过程中的视觉一致性与可操作性。
通过监听视口变化，自动对标记为“固定尺寸”的元素进行缩放补偿，确保它们在不同缩放级别下保持相对恒定的显示尺寸。支持全局启用，也支持按需控制具体元素或节点的适配行为。

## 使用场景

这一交互主要用于：

- 需要固定视觉大小的图形元素或嵌入式组件（按钮、标签等）

## 在线体验

<embed src="@/common/api/behaviors/fix-element-size.md"></embed>

## 基本用法

在图配置中添加这一交互

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['fix-element-size'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'fix-element-size',
      enable: true, // 开启该交互
      state: 'selected', // 要固定大小的元素状态
      reset: true, // 元素重绘时还原样式
    },
  ],
});
```

## 配置项

| 配置项            | 说明                                                                                                              | 类型                                                                         | 默认值                                                                                              | 必选 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---- | --- |
| type              | 交互类型名称                                                                                                      | string                                                                       | `fix-element-size`                                                                                  | √    |
| [enable](#enable) | 是否启用该交互                                                                                                    | boolean \| ((event:_ [Event](/api/event#事件对象属性)_) => boolean)          | true                                                                                                |      |
| reset             | 元素重绘时是否还原样式                                                                                            | boolean                                                                      | `false`                                                                                             |      |
| state             | 指定要固定大小的元素状态                                                                                          | string                                                                       | ""                                                                                                  |      |
| [node](#node)     | 节点配置项，用于定义哪些属性在视觉上保持固定大小。若未指定（即为 undefined），则整个节点将被固定                  | [FixShapeConfig](#fixshapeconfig) _\|_ [FixShapeConfig](#fixshapeconfig)_[]_ |                                                                                                     |      |
| nodeFilter        | 节点过滤器，用于过滤哪些节点在缩放过程中保持固定大小                                                              | _(datum:_ [NodeData](/manual/data#节点数据nodedata)_) => boolean_            | `() => true`                                                                                        |      |
| edge              | 边配置项，用于定义哪些属性在视觉上保持固定大小。默认固定 lineWidth、labelFontSize 属性，用法同[node配置项](#node) | [FixShapeConfig](#fixshapeconfig) _\|_ [FixShapeConfig](#fixshapeconfig)_[]_ | `[ shape: 'key', fields: ['lineWidth'] ,  shape: 'halo', fields: ['lineWidth'] ,  shape: 'label' ]` |      |
| edgeFilter        | 边过滤器，用于过滤哪些边在缩放过程中保持固定大小                                                                  | _(datum: [EdgeData](/manual/data#边数据edgedata)) => boolean_                | `() => true`                                                                                        |      |
| combo             | Combo 配置项，用于定义哪些属性在视觉上保持固定大小。默认整个 Combo 将被固定，用法同[node配置项](#node)            | _[FixShapeConfig](#fixshapeconfig) \| FixShapeConfig[]_                      |                                                                                                     |      |
| comboFilter       | Combo 过滤器，用于过滤哪些 Combo 在缩放过程中保持固定大小                                                         | _(datum: [ComboData](/manual/data#组合数据combodata)) => boolean_            | `() => true`                                                                                        |      |     |

### enable

> _boolean \| ((event: Event) => boolean)_ **Default:** `(event) = Boolean(event.data.scale  1)`

是否启用固定元素大小交互。默认在缩小画布时启用

默认在缩小画布时启用，设置 `enable: (event) => event.data.scale < 1`；如果希望在放大画布时启用，设置 `enable: (event) => event.data.scale > 1`；如果希望在放大缩小画布时都启用，设置 `enable: true`

### node

> [FixShapeConfig](#fixshapeconfig) _\|_ [FixShapeConfig](#fixshapeconfig)_[]_

节点配置项，用于定义哪些属性在视觉上保持固定大小。若未指定（即为 undefined），则整个节点将被固定

**示例**

如果在缩放过程中希望固定节点主图形的 lineWidth，可以这样配置：

```ts
{
  node: [{ shape: 'key', fields: ['lineWidth'] }];
}
```

如果在缩放过程中想保持元素标签大小不变，可以这样配置：

```ts
{
  shape: 'label';
}
```

### FixShapeConfig

| 参数   | 描述                                                                                                 | 类型                                                   | 默认值 | 必选 |
| ------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------ | ---- |
| shape  | 指定要固定大小的图形，可以是图形的类名字，或者是一个函数，该函数接收构成元素的所有图形并返回目标图形 | string \| ((shapes: DisplayObject[]) => DisplayObject) | -      | ✓    |
| fields | 指定要固定大小的图形属性字段。如果未指定，则默认固定整个图形的大小                                   | string[]                                               | -      | ✘    |

## 实际案例

<Playground path="behavior/fix-element-size/demo/fix-size.js" rid="default-fix-element-size"></Playground>
