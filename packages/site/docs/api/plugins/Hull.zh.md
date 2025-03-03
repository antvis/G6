---
title: Hull 轮廓包围
---

> 如需深入了解插件的使用，请参阅 [API 文档 - 图配置项 - plugins](/api/graph/option#plugins) 章节。此章节将介绍完整的配置参数、类型定义以及应用示例。

轮廓包围（Hull）用于处理和表示一组点的凸多边形包围盒。轮廓包围分为两种形态：凸包和凹包。

凸包（Convex Hull）：这是一个凸多边形，它包含所有的点，并且没有任何凹陷。你可以将其想象为一组点的最小包围盒，没有任何点在这个多边形的外部。

凹包（Concave Hull）：这是一个凹多边形，它同样包含所有的点，但是可能会有凹陷。凹包的凹陷程度由 concavity 参数控制。concavity 越大，凹陷越小。当 concavity 为 Infinity 时，凹包就变成了凸包。

<embed src="@/common/api/plugins/hull.md"></embed>

**参考示例**：

- [用轮廓包裹节点集合](/examples/plugin/hull/#basic)

## 配置项

### <Badge type="success">Required</Badge> type

> _`hull` \| string_

此插件已内置，你可以通过 `type: 'hull'` 来使用它。

### label

> _boolean_ **Default:** `true`

是否显示标签

### concavity

> _number_ **Default:** `Infinity`

凹度，数值越大凹度越小；默认为 Infinity 代表为 Convex Hull

### corner

> _'rounded' \| 'smooth' \| 'sharp'_ **Default:** `'rounded'`

拐角类型

### members

> _string\_\_[]_

Hull 内的元素

### padding

> _number_ **Default:** `10`

内边距

## Label 样式

### label{[TextStyleProps](https://g.antv.antgroup.com/api/basic/text)}

<details><summary>形如 icon{TextStyleProps} 的表达式表示在 TextStyleProps 属性名前以小驼峰形式加上 icon 前缀</summary>

TextStyleProps 包含以下属性：

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} 表示你需要使用以下属性名：

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>

### labelAutoRotate

> _boolean_ **Default:** `true`

标签是否跟随轮廓旋转，仅在 closeToPath 为 true 时生效

### labelCloseToPath

> _boolean_ **Default:** `true`

标签是否贴合轮廓

### labelMaxWidth

> _number_

文本的最大宽度，超出会自动省略

### labelOffsetX

> _number_ **Default:** `0`

x 轴偏移量

### labelOffsetY

> _number_ **Default:** `0`

y 轴偏移量

### labelPlacement

> _'left' \| 'right' \| 'top' \| 'bottom'_ _\| 'center'_ **Default:** `'bottom'`

标签位置

### labelBackground

> _boolean_

是否显示背景

### labelPadding

> _number \| number[]_ **Default:** `0`

标签内边距

## Label Background 样式

### labelBackground{[RectStyleProps](https://g.antv.antgroup.com/api/basic/rect)}

<details><summary>形如 icon{TextStyleProps} 的表达式表示在 TextStyleProps 属性名前以小驼峰形式加上 icon 前缀</summary>

TextStyleProps 包含以下属性：

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} 表示你需要使用以下属性名：

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>

## API

### Hull.addMember(members)

添加 Hull 成员

```typescript
addMember(members: ID | ID[]): void;
```

| 参数    | 类型       | 描述 | 默认值 | 必选 |
| ------- | ---------- | ---- | ------ | ---- |
| members | ID \| ID[] | 成员 | -      | ✓    |

### Hull.getMember()

获取 Hull 成员

```typescript
getMember(): string[];
```

**返回值**：

- **类型：**string[]
- **描述：**元素 Ids

### Hull.removeMember(members)

移除 Hull 成员

```typescript
removeMember(members: ID | ID[]): void;
```

| 参数    | 类型       | 描述 | 默认值 | 必选 |
| ------- | ---------- | ---- | ------ | ---- |
| members | ID \| ID[] | 成员 | -      | ✓    |

### Hull.updateMember(members)

更新 Hull 成员

```typescript
updateMember(members: ID[] | ((prev: ID[]) => ID[])): void;
```

| 参数    | 类型                           | 描述 | 默认值 | 必选 |
| ------- | ------------------------------ | ---- | ------ | ---- |
| members | ID[] \| ((prev: ID[]) => ID[]) | 成员 | -      | ✓    |
