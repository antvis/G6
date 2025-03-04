---
title: BubbleSets 气泡集
---

BubbleSets 最初由 Christopher Collins 在 2009 年的论文 "Bubble Sets: Revealing Set Relations with Isocontours over Existing Visualizations" 中提出。

实现原理是通过创建一种类似于气泡的形状来表示集合。每个集合都被表示为一个独特的 "气泡"，集合中的元素被包含在这个气泡内部。如果两个集合有交集，那么这两个气泡会有重叠的部分，这个重叠的部分就表示这两个集合的交集。

<embed src="@/common/api/plugins/bubble-sets.md"></embed>

**参考示例**：

- [用气泡集包裹节点集](/examples/plugin/bubble-sets/#basic)

## 配置项

### <Badge type="success">Required</Badge> type

> _`bubble-sets` \| string_

此插件已内置，你可以通过 `type: 'bubble-sets'` 来使用它。

### label

> _boolean_ **Default:** `true`

是否显示标签

### avoidMembers

> _string[]_

需要避开的元素，在绘制轮廓时不会包含这些元素。目前支持设置节点

### <Badge type="success">Required</Badge> members

> _string[]_

成员元素，包括节点和边

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

### BubbleSets.addAvoidMember(avoidMembers)

添加需要避开的元素

```typescript
addAvoidMember(avoidMembers: ID | ID[]): void;
```

| 参数         | 描述    | 类型       | 默认值 | 必选 |
| ------------ | ------- | ---------- | ------ | ---- |
| avoidMembers | 元素 ID | ID \| ID[] | -      | ✓    |

### BubbleSets.addMember(members)

添加成员元素

```typescript
addMember(members: ID | ID[]): void;
```

| 参数    | 描述    | 类型       | 默认值 | 必选 |
| ------- | ------- | ---------- | ------ | ---- |
| members | 元素 ID | ID \| ID[] | -      | ✓    |

### BubbleSets.getAvoidMember()

获取需要避开的元素

```typescript
getAvoidMember(): string[];
```

**返回值**：

- **类型：**string[]
- **描述：**成员元素数组

### BubbleSets.getMember()

获取成员元素

```typescript
getMember(): string[];
```

**返回值**：

- **类型：**string[]
- **描述：**成员元素数组

### BubbleSets.removeAvoidMember(avoidMembers)

移除需要避开的元素

```typescript
removeAvoidMember(avoidMembers: ID | ID[]): void;
```

| 参数         | 描述    | 类型       | 默认值 | 必选 |
| ------------ | ------- | ---------- | ------ | ---- |
| avoidMembers | 元素 ID | ID \| ID[] | -      | ✓    |

### BubbleSets.removeMember(members)

移除成员元素

```typescript
removeMember(members: ID | ID[]): void;
```

| 参数    | 描述    | 类型       | 默认值 | 必选 |
| ------- | ------- | ---------- | ------ | ---- |
| members | 元素 ID | ID \| ID[] | -      | ✓    |

### BubbleSets.updateAvoidMember(avoidMembers)

更新需要避开的元素

```typescript
updateAvoidMember(avoidMembers: ID | ID[]): void;
```

| 参数         | 描述    | 类型       | 默认值 | 必选 |
| ------------ | ------- | ---------- | ------ | ---- |
| avoidMembers | 元素 ID | ID \| ID[] | -      | ✓    |

### BubbleSets.updateMember(members)

更新成员元素

```typescript
updateMember(members: ID[] | ((prev: ID[]) => ID[])): void;
```

| 参数    | 描述    | 类型                           | 默认值 | 必选 |
| ------- | ------- | ------------------------------ | ------ | ---- |
| members | 元素 ID | ID[] \| ((prev: ID[]) => ID[]) | -      | ✓    |
