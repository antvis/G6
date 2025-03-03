---
title: BubbleSets
---

BubbleSets was originally proposed by Christopher Collins in the 2009 paper "Bubble Sets: Revealing Set Relations with Isocontours over Existing Visualizations".

The principle is to represent sets by creating a shape similar to a bubble. Each set is represented by a unique "bubble", and the elements in the set are contained within this bubble. If two sets have an intersection, then the two bubbles will have an overlapping part, which represents the intersection of the two sets.

<embed src="@/common/api/plugins/bubble-sets.md"></embed>

## Options

### <Badge type="success">Required</Badge> type

> _`bubble-sets`_

Plugin type

### label

> _boolean_ **Default:** `true`

Whether to display the label

### avoidMembers

> _string[]_

Elements to avoid, these elements will not be included when drawing the contour, currently only nodes are supported

### <Badge type="success">Required</Badge> members

> _string[]_

Member elements, including nodes and edges

### label{[TextStyleProps](https://g.antv.antgroup.com/api/basic/text)}

<details><summary>An expression like icon{TextStyleProps} indicates that properties of the TextStyleProps type are prefixed with icon in camelCase format.</summary>

TextStyleProps includes the following properties:

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} means you need to use the following property names:

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>

### labelAutoRotate

> _boolean_ **Default:** `true`

Whether the label rotates with the contour. Only effective when closeToPath is true

### labelCloseToPath

> _boolean_ **Default:** `true`

Whether the label is close to the contour

### labelMaxWidth

> _number_

The maximum width of the text, which will be automatically ellipsis if exceeded

### labelOffsetX

> _number_ **Default:** `0`

Label x-axis offset

### labelOffsetY

> _number_ **Default:** `0`

Label y-axis offset

### labelPlacement

> _'left' \| 'right' \| 'top' \| 'bottom'_ _\| 'center'_ **Default:** `'bottom'`

Label position

### labelBackground

> _boolean_

Whether to show background

### labelPadding

> _number \| number[]_ **Default:** `0`

Label padding

## Label Background Style

### labelBackground{[RectStyleProps](https://g.antv.antgroup.com/api/basic/rect)}

<details><summary>An expression like icon{TextStyleProps} indicates that properties of the TextStyleProps type are prefixed with icon in camelCase format.</summary>

TextStyleProps includes the following properties:

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} means you need to use the following property names:

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>

## API

### BubbleSets.addAvoidMember(avoidMembers)

Add elements to avoid

```typescript
addAvoidMember(avoidMembers: ID | ID[]): void;
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

avoidMembers

</td><td>

string \| string[]

</td><td>

单个或多个

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### BubbleSets.addMember(members)

Add member elements

```typescript
addMember(members: ID | ID[]): void;
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

members

</td><td>

string \| string[]

</td><td>

单个或多个

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### BubbleSets.getAvoidMember()

Get elements to avoid

```typescript
getAvoidMember(): string[];
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** string[]

- **Description:** 成员元素数组

</details>

### BubbleSets.getMember()

Get member elements

```typescript
getMember(): string[];
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** string[]

- **Description:** 成员元素数组

</details>

### BubbleSets.removeAvoidMember(avoidMembers)

Remove elements to avoid

```typescript
removeAvoidMember(avoidMembers: ID | ID[]): void;
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

avoidMembers

</td><td>

string \| string[]

</td><td>

单个或多个

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### BubbleSets.removeMember(members)

Remove member elements

```typescript
removeMember(members: ID | ID[]): void;
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

members

</td><td>

string \| string[]

</td><td>

单个或多个

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### BubbleSets.updateAvoidMember(avoidMembers)

Update elements to avoid

```typescript
updateAvoidMember(avoidMembers: ID | ID[]): void;
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

avoidMembers

</td><td>

string \| string[]

</td><td>

单个或多个

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### BubbleSets.updateMember(members)

Update member elements

```typescript
updateMember(members: ID[] | ((prev: ID[]) => ID[])): void;
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

members

</td><td>

string[] \| ((prev: string[]) => string[])

</td><td>

值或者回调函数

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
