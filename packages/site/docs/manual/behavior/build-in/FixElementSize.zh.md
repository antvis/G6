---
title: FixElementSize 缩放画布时固定元素大小
---

## 配置项

### <Badge type="success">Required</Badge> type

> _`fix-element-size` \| string_

此插件已内置，你可以通过 `type: 'fix-element-size'` 来使用它。

### combo

> _[FixShapeConfig](#fixshapeconfig) \| FixShapeConfig[]_

Combo 配置项，用于定义哪些属性在视觉上保持固定大小。默认整个 Combo 将被固定

#### FixShapeConfig

| 参数   | 描述                                                                                                 | 类型                                                   | 默认值 | 必选 |
| ------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------ | ---- |
| shape  | 指定要固定大小的图形，可以是图形的类名字，或者是一个函数，该函数接收构成元素的所有图形并返回目标图形 | string \| ((shapes: DisplayObject[]) => DisplayObject) | -      | ✓    |
| fields | 指定要固定大小的图形属性字段。如果未指定，则默认固定整个图形的大小                                   | string[]                                               | -      | ✘    |

### comboFilter

> _(datum: [ComboData](/manual/data#组合数据combodata)) => boolean_ **Default:** `() = true`

Combo 过滤器，用于过滤哪些 Combo 在缩放过程中保持固定大小

### edge

> [FixShapeConfig](#fixshapeconfig) _\|_ [FixShapeConfig](#fixshapeconfig)_[]_ **Default:** `[ shape: 'key', fields: ['lineWidth'] ,  shape: 'halo', fields: ['lineWidth'] ,  shape: 'label' ]`

边配置项，用于定义哪些属性在视觉上保持固定大小。默认固定 lineWidth、labelFontSize 属性

### edgeFilter

> _(datum: [EdgeData](/manual/data#边数据edgedata)) => boolean_ **Default:** `() = true`

边过滤器，用于过滤哪些边在缩放过程中保持固定大小

### enable

> _boolean \| ((event: Event) => boolean)_ **Default:** `(event) = Boolean(event.data.scale  1)`

是否启用固定元素大小交互。默认在缩小画布时启用

默认在缩小画布时启用，设置 `enable: (event) => event.data.scale < 1`；如果希望在放大画布时启用，设置 `enable: (event) => event.data.scale > 1`；如果希望在放大缩小画布时都启用，设置 `enable: true`

### node

> [FixShapeConfig](#fixshapeconfig) _\|_ [FixShapeConfig](#fixshapeconfig)_[]_

节点配置项，用于定义哪些属性在视觉上保持固定大小。若未指定（即为 undefined），则整个节点将被固定

**示例**

如果在缩放过程中希望固定节点主图形的 lineWidth，可以这样配置：

If you want to fix the lineWidth of the key shape of the node during zooming, you can configure it like this:

```ts
{
  node: [{ shape: 'key', fields: ['lineWidth'] }];
}
```

如果在缩放过程中想保持元素标签大小不变，可以这样配置：

If you want to keep the label size of the element unchanged during zooming, you can configure it like this:

```ts
{
  shape: 'label';
}
```

### nodeFilter

> _(datum:_ [NodeData](/manual/data#节点数据nodedata)_) => boolean_ **Default:** `() = true`

节点过滤器，用于过滤哪些节点在缩放过程中保持固定大小

### reset

> _boolean_ **Default:** `false`

元素重绘时是否还原样式

### state

> _string_ **Default:** ``

指定要固定大小的元素状态

## API

### FixElementSize.destroy()

```typescript
destroy(): void;
```
