---
title: DragCanvasOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / DragCanvasOptions

[behaviors](../../modules/behaviors.en.md).DragCanvasOptions

## 属性

### direction

• `可选` **direction**: `"x"` \| `"y"` \| `"both"`

拖动画布的方向，默认为'both'。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-canvas.ts:22](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L22)

---

### dragOnItems

• `可选` **dragOnItems**: `boolean`

是否允许在节点、边、聚类上开始拖动时触发此行为。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-canvas.ts:14](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L14)

---

### enableOptimize

• `可选` **enableOptimize**: `boolean`

是否启用优化策略，该策略在拖动时隐藏除节点关键形状之外的所有形状。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-canvas.ts:10](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L10)

---

### eventName

• `可选` **eventName**: `string`

拖动结束时触发的事件名称。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-canvas.ts:48](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L48)

---

### scalableRange

• `可选` **scalableRange**: `string` \| `number`

限制拖动的画布范围，0 为默认值，表示图形不能完全拖出视口范围。 如果 scalableRange 是数字或不带 ‘px’ 的字符串，则表示它是图形内容的比例。 如果 scalableRange 是带有 ‘px’ 的字符串，则被视为像素。 如果 scalableRange = 0，则没有限制； 如果 scalableRange > 0，则图形可以拖出视口范围； 如果 scalableRange < 0，则范围小于视口。参考 https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ

#### 定义于

[packages/g6/src/stdlib/behavior/drag-canvas.ts:44](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L44)

---

### secondaryKey

• `可选` **secondaryKey**: `string`

键盘上的辅助次要键。如果未分配，则在触发时触发行为。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-canvas.ts:26](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L26)

---

### secondaryKeyToDisable

• `可选` **secondaryKeyToDisable**: `string`

键盘上用于防止触发行为的辅助次要键。默认为 ‘shift’。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-canvas.ts:30](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L30)

---

### shouldBegin

• `可选` **shouldBegin**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.en.md)) => `boolean`

#### 类型声明

▸ (`event`): `boolean`

是否允许当前项上发生行为。

##### 参数

| 名称    | 类型                                   |
| :------ | :------------------------------------- |
| `event` | [`IG6GraphEvent`](IG6GraphEvent.en.md) |

##### 返回值

`boolean`

#### 定义于

[packages/g6/src/stdlib/behavior/drag-canvas.ts:52](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L52)

---

### speedUpKey

• `可选` **speedUpKey**: `string`

按下并通过方向键拖动画布时加速平移的键盘上的键。此选项的触发器应为 ‘directionKeys’。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-canvas.ts:34](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L34)

---

### trigger

• `可选` **trigger**: `"drag"` \| `"directionKeys"`

行为的触发器，默认为 ‘drag’。‘directionKeys’ 表示通过键盘上的上、下、左、右键触发此行为。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-canvas.ts:18](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-canvas.ts#L18)
