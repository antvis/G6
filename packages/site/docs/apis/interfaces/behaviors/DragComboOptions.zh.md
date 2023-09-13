---
title: DragComboOptions
---

[Overview - v5.0.0-beta.5](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / DragComboOptions

[behaviors](../../modules/behaviors.en.md).DragComboOptions

## 属性

### delegateStyle

• `可选` **delegateStyle**: `Object`

节点被拖动时的绘制属性。 仅在 enableDelegate 为 true 时使用。

#### 索引签名

▪ [key: `string`]: `unknown`

#### 类型声明

| 名称             | 类型                 |
| :--------------- | :------------------- |
| `fill?`          | `string`             |
| `fillOpacity?`   | `number`             |
| `lineDash?`      | [`number`, `number`] |
| `lineWidth?`     | `number`             |
| `stroke?`        | `string`             |
| `strokeOpacity?` | `number`             |

#### 定义于

[packages/g6/src/stdlib/behavior/drag-combo.ts:27](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-combo.ts#L27)

---

### enableDelegate

• `可选` **enableDelegate**: `boolean`

是否使用随拖动鼠标移动的虚拟矩形代替节点， 默认为 false。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-combo.ts:22](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-combo.ts#L22)

---

### enableTransient

• `可选` **enableTransient**: `boolean`

是否在临时层中绘制拖动节点。 当 enableDelegate 为 true 时忽略， 默认为 true。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-combo.ts:17](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-combo.ts#L17)

---

### eventName

• `可选` **eventName**: `string`

拖动结束时触发的事件名称。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-combo.ts:55](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-combo.ts#L55)

---

### hideRelatedEdges

• `可选` **hideRelatedEdges**: `boolean`

是否隐藏相关边以避免拖动节点时进行计算。 当 enableTransient 或 enableDelegate 为 true 时忽略。 默认为 false。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-combo.ts:46](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-combo.ts#L46)

---

### selectedState

• `可选` **selectedState**: `string`

字段 selected 的状态，默认为 “selected”。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-combo.ts:51](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-combo.ts#L51)

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

[packages/g6/src/stdlib/behavior/drag-combo.ts:63](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-combo.ts#L63)

---

### throttle

• `可选` **throttle**: `number`

throttle 的间隔时间（以毫秒为单位），有助于避免频繁计算。 默认为 0。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-combo.ts:40](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-combo.ts#L40)

---

### updateComboStructure

• `可选` **updateComboStructure**: `boolean`

是否更改组合层次结构或仅更改大小。

#### 定义于

[packages/g6/src/stdlib/behavior/drag-combo.ts:59](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/drag-combo.ts#L59)
