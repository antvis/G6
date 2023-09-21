---
title: CollapseExpandComboOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / CollapseExpandComboOptions

[behaviors](../../modules/behaviors.en.md).CollapseExpandComboOptions

## 属性

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

[packages/g6/src/stdlib/behavior/collapse-expand-combo.ts:22](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/collapse-expand-combo.ts#L22)

---

### trigger

• **trigger**: `"click"` \| `"dblclick"`

多选触发的按键。 默认为 "dblclick"。 可选项为 “dblclick”, “click”。

#### 定义于

[packages/g6/src/stdlib/behavior/collapse-expand-combo.ts:18](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/collapse-expand-combo.ts#L18)
