---
title: BrushSelectOptions
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / BrushSelectOptions

[behaviors](../../modules/behaviors.en.md).BrushSelectOptions

## 属性

### brushStyle

• **brushStyle**: `Object`

选择时画笔的形状样式。

#### 索引签名

▪ [key: `string`]: `unknown`

#### 类型声明

| 名称           | 类型     |
| :------------- | :------- |
| `fill?`        | `string` |
| `fillOpacity?` | `number` |
| `lineWidth?`   | `number` |
| `stroke?`      | `string` |

#### 定义于

[packages/g6/src/stdlib/behavior/brush-select.ts:46](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L46)

---

### eventName

• **eventName**: `string`

选择/取消选择一个项目时触发的事件名称。

#### 定义于

[packages/g6/src/stdlib/behavior/brush-select.ts:42](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L42)

---

### itemTypes

• **itemTypes**: (`"node"` \| `"edge"` \| `"combo"`)[]

可选项，默认为["nodes"]。
是一个包含 "node"、"edge" 或 "combo" 的数组。

#### 定义于

[packages/g6/src/stdlib/behavior/brush-select.ts:32](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L32)

---

### onDeselect

• **onDeselect**: (`selectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[] }, `deselectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[] }) => `void`

#### 类型声明

▸ (`selectedIds`, `deselectedIds`): `void`

取消选择后的回调函数。

##### 参数

| 名称                   | 类型     |
| :--------------------- | :------- |
| `selectedIds`          | `Object` |
| `selectedIds.combos`   | `ID`[]   |
| `selectedIds.edges`    | `ID`[]   |
| `selectedIds.nodes`    | `ID`[]   |
| `deselectedIds`        | `Object` |
| `deselectedIds.combos` | `ID`[]   |
| `deselectedIds.edges`  | `ID`[]   |
| `deselectedIds.nodes`  | `ID`[]   |

##### 返回值

`void`

#### 定义于

[packages/g6/src/stdlib/behavior/brush-select.ts:77](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L77)

---

### onSelect

• **onSelect**: (`selectedIds`: { `combos`: `ID`[] ; `edges`: `ID`[] ; `nodes`: `ID`[] }) => `void`

#### 类型声明

▸ (`selectedIds`): `void`

选择时的回调函数。

##### 参数

| 名称                 | 类型     |
| :------------------- | :------- |
| `selectedIds`        | `Object` |
| `selectedIds.combos` | `ID`[]   |
| `selectedIds.edges`  | `ID`[]   |
| `selectedIds.nodes`  | `ID`[]   |

##### 返回值

`void`

#### 定义于

[packages/g6/src/stdlib/behavior/brush-select.ts:73](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L73)

---

### selectSetMode

• **selectSetMode**: `"union"` \| `"intersect"` \| `"diff"` \| `"latest"`

框选的选择模式，可选项为 "union"、"intersect"、"diff"、"latest"`

#### 定义于

[packages/g6/src/stdlib/behavior/brush-select.ts:54](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L54)

---

### selectedState

• **selectedState**: `"selected"`

选择时的状态，默认为"selected"。
其他可选值为："active"、"highlighted" 等。

#### 定义于

[packages/g6/src/stdlib/behavior/brush-select.ts:38](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L38)

---

### shouldBegin

• **shouldBegin**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.en.md)) => `boolean`

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

[packages/g6/src/stdlib/behavior/brush-select.ts:58](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L58)

---

### shouldUpdate

• **shouldUpdate**: (`itemType`: `ITEM_TYPE`, `id`: `ID`, `action`: `"select"` \| `"deselect"`, `self`: `BrushSelect`) => `boolean`

#### 类型声明

▸ (`itemType`, `id`, `action`, `self`): `boolean`

是否更新状态。 如果返回 false，则可能需要监听 eventName 并手动管理状态或数据。

##### 参数

| 名称       | 类型                       |
| :--------- | :------------------------- |
| `itemType` | `ITEM_TYPE`                |
| `id`       | `ID`                       |
| `action`   | `"select"` \| `"deselect"` |
| `self`     | `BrushSelect`              |

##### 返回值

`boolean`

#### 定义于

[packages/g6/src/stdlib/behavior/brush-select.ts:64](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L64)

---

### trigger

• **trigger**: `"shift"` \| `"drag"` \| `"ctrl"` \| `"alt"` \| `"meta"`

按下鼠标点击以应用多选的键。 默认为 "shift"。 其他可选项为 “drag”, “shift”, “ctrl”, “alt”, 或 “meta”.

#### 定义于

[packages/g6/src/stdlib/behavior/brush-select.ts:26](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/stdlib/behavior/brush-select.ts#L26)
