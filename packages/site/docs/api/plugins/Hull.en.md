---
title: Hull
---

Hull is used to process and represent the convex polygon bounding box of a set of points. Hull has two forms: convex hull and concave hull.

Convex Hull: This is a convex polygon that contains all points and has no concave. You can think of it as the smallest bounding box of a set of points, with no points outside the polygon.

Concave Hull: This is a concave polygon that also contains all points, but may have concave. The concavity of the concave hull is controlled by the concavity parameter. The larger the concavity, the smaller the concave. When concavity is Infinity, the concave hull becomes a convex hull.

<embed src="@/common/api/plugins/hull.md"></embed>

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### label

> _boolean_ **Default:** `true`

Whether to display the label

### concavity

> _number_ **Default:** `Infinity`

Concavity. Default is Infinity, which means Convex Hull

### corner

> _'rounded' \| 'smooth' \| 'sharp'_ **Default:** `'rounded'`

Corner type

### members

> _string\_\_[]_

Elements in Hull

### padding

> _number_ **Default:** `10`

Padding

## Label Style

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

### Hull.addMember(members)

Add Hull member

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

元素 Ids

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Hull.getMember()

Get Hull member

```typescript
getMember(): string[];
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** string[]

- **Description:** 元素 Ids

</details>

### Hull.removeMember(members)

Remove Hull member

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

元素 Ids

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Hull.updateMember(members)

Update Hull member

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

元素 Ids

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
