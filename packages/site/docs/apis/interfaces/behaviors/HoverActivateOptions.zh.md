---
title: HoverActivateOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / HoverActivateOptions

[behaviors](../../modules/behaviors.en.md).HoverActivateOptions

## 属性

### activateState

• `可选` **activateState**: `string`

selected 的状态，默认为 "selected"。

#### 定义于

[packages/g6/src/stdlib/behavior/hover-activate.ts:16](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/hover-activate.ts#L16)

---

### eventName

• `可选` **eventName**: `string`

拖动结束时触发的事件名称。

#### 定义于

[packages/g6/src/stdlib/behavior/hover-activate.ts:26](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/hover-activate.ts#L26)

---

### itemTypes

• **itemTypes**: (`"node"` \| `"edge"` \| `"combo"`)[]

要激活的 item 类型。
默认为 ["node", "edge"]。
应为 "node"、"edge" 或 "combo" 的数组。

#### 定义于

[packages/g6/src/stdlib/behavior/hover-activate.ts:22](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/hover-activate.ts#L22)

---

### shouldBegin

• `可选` **shouldBegin**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.en.md)) => `boolean`

#### 类型声明

▸ (`event`): `boolean`

是否允许在当前项上进行操作。

##### 参数

| 名称    | 类型                                   |
| :------ | :------------------------------------- |
| `event` | [`IG6GraphEvent`](IG6GraphEvent.en.md) |

##### 返回值

`boolean`

#### 定义于

[packages/g6/src/stdlib/behavior/hover-activate.ts:30](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/hover-activate.ts#L30)

---

### throttle

• `可选` **throttle**: `number`

throttle 的间隔时间（以毫秒为单位），有助于避免频繁计算。 默认为 0。

#### 定义于

[packages/g6/src/stdlib/behavior/hover-activate.ts:11](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/hover-activate.ts#L11)
