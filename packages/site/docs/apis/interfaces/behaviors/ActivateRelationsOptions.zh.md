---
title: ActivateRelationsOptions
---

[Overview - v5.0.0-beta.10](../../README.zh.md) / [Modules](../../modules.zh.md) / [behaviors](../../modules/behaviors.zh.md) / ActivateRelationsOptions

[behaviors](../../modules/behaviors.zh.md).ActivateRelationsOptions

## 属性

### activeState

• `可选` **activeState**: `"selected"`

默认值为 `"selected"`

#### 定义于

[packages/g6/src/stdlib/behavior/activate-relations.ts:37](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/activate-relations.ts#L37)

---

### multiple

• `可选` **multiple**: `boolean`

是否允许多选，默认为 true。
如果设置为 false，则 trigger 选项将被忽略。

#### 定义于

[packages/g6/src/stdlib/behavior/activate-relations.ts:24](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/activate-relations.ts#L24)

---

### shouldBegin

• `可选` **shouldBegin**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.en.md)) => `boolean`

#### 类型声明

▸ (`event`): `boolean`

是否允许在当前项上发生此行为。

##### 参数

| 名称    | 类型                                   |
| :------ | :------------------------------------- |
| `event` | [`IG6GraphEvent`](IG6GraphEvent.en.md) |

##### 返回值

`boolean`

#### 定义于

[packages/g6/src/stdlib/behavior/activate-relations.ts:42](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/activate-relations.ts#L42)

---

### shouldUpdate

• `可选` **shouldUpdate**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.en.md)) => `boolean`

#### 类型声明

▸ (`event`): `boolean`

Whether to update item state.
If it returns false, you may probably listen to `eventName` and
manage states or data manually

##### 参数

| 名称    | 类型                                   |
| :------ | :------------------------------------- |
| `event` | [`IG6GraphEvent`](IG6GraphEvent.en.md) |

##### Returns

`boolean`

#### 定义于

[packages/g6/src/stdlib/behavior/activate-relations.ts:48](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/activate-relations.ts#L48)

---

### trigger

• `可选` **trigger**: `"click"` \| `"mouseenter"`

用鼠标点击时按下的键来应用多选，默认为 "click" 。
可以是"click"或"mouseenter"。

#### 定义于

[packages/g6/src/stdlib/behavior/activate-relations.ts:30](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/activate-relations.ts#L30)
