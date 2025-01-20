---
title: Element
---

### Graph.collapseElement(id, options)

Collapse element

```typescript
collapseElement(id: ID, options?: boolean | CollapseExpandNodeOptions): Promise<void>;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
<tr><td>

options

</td><td>

boolean \| [CollapseExpandNodeOptions](../api/reference/g6.collapseexpandnodeoptions.en.md)

</td><td>

是否启用动画或者配置收起节点的配置项

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.expandElement(id, options)

Expand Element

```typescript
expandElement(id: ID, options?: boolean | CollapseExpandNodeOptions): Promise<void>;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
<tr><td>

options

</td><td>

boolean \| [CollapseExpandNodeOptions](../api/reference/g6.collapseexpandnodeoptions.en.md)

</td><td>

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.frontElement(id)

Bring the element to the front

```typescript
frontElement(id: ID | ID[]): Promise<void>;
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

id

</td><td>

string \| string[]

</td><td>

元素 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.getElementPosition(id)

Get element position

```typescript
getElementPosition(id: ID): Point;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** [number, number] \| [number, number, number] \| Float32Array

- **Description:** 元素位置

</details>

### Graph.getElementRenderBounds(id)

Get the rendering bounding box of the element itself and its child nodes in the world coordinate system

```typescript
getElementRenderBounds(id: ID): AABB;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** AABB

- **Description:** 渲染包围盒

</details>

### Graph.getElementRenderStyle(id)

Get element rendering style

```typescript
getElementRenderStyle(id: ID): Record<string, any>;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Record&lt;string, any&gt;

- **Description:** 元素渲染样式

</details>

### Graph.getElementState(id)

Get element state

```typescript
getElementState(id: ID): State[];
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** string[]

- **Description:** 元素状态

</details>

### Graph.getElementType(id)

Get element type

```typescript
getElementType(id: ID): ElementType;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** 'node' \| 'edge' \| 'combo'

- **Description:** 元素类型

</details>

### Graph.getElementVisibility(id)

Get element visibility

```typescript
getElementVisibility(id: ID): BaseStyleProps['visibility'];
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** BaseStyleProps['visibility']

- **Description:** 元素可见性

</details>

### Graph.getElementZIndex(id)

Get element z-index

```typescript
getElementZIndex(id: ID): number;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**Returns**:

- **Type:** number

- **Description:** 元素层级

</details>

### Graph.hideElement(id, animation)

Hide element

```typescript
hideElement(id: ID | ID[], animation?: boolean): Promise<void>;
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

id

</td><td>

string \| string[]

</td><td>

元素 ID

</td></tr>
<tr><td>

animation

</td><td>

boolean

</td><td>

是否启用动画

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.setCombo(combo)

Set combo mapper

```typescript
setCombo(combo: ComboOptions): void;
```

The value of `options.combo`

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

combo

</td><td>

[ComboOptions](../api/reference/g6.combooptions.en.md)

</td><td>

组合配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.setEdge(edge)

Set edge mapper

```typescript
setEdge(edge: EdgeOptions): void;
```

The value of `options.edge`

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

edge

</td><td>

[EdgeOptions](../api/reference/g6.edgeoptions.en.md)

</td><td>

边配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.setElementState(id, state, animation)

Set element state

```typescript
setElementState(id: ID, state: State | State[], animation?: boolean): Promise<void>;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
<tr><td>

state

</td><td>

string \| string[]

</td><td>

状态

</td></tr>
<tr><td>

animation

</td><td>

boolean

</td><td>

动画配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### <Badge type="warning">Overload</Badge> Graph.setElementState(state, animation)

Batch set element state

```typescript
setElementState(state: Record<ID, State | State[]>, animation?: boolean): Promise<void>;
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

state

</td><td>

Record&lt;string, string \| string[]&gt;

</td><td>

状态配置

</td></tr>
<tr><td>

animation

</td><td>

boolean

</td><td>

动画配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.setElementVisibility(id, visibility, animation)

Set element visibility

```typescript
setElementVisibility(id: ID, visibility: BaseStyleProps['visibility'], animation?: boolean): Promise<void>;
```

Visibility configuration includes two states: `visible` and `hidden`

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
<tr><td>

visibility

</td><td>

BaseStyleProps['visibility']

</td><td>

可见性

</td></tr>
<tr><td>

animation

</td><td>

boolean

</td><td>

动画配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### <Badge type="warning">Overload</Badge> Graph.setElementVisibility(visibility, animation)

Batch set element visibility

```typescript
setElementVisibility(visibility: Record<ID, BaseStyleProps['visibility']>, animation?: boolean): Promise<void>;
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

visibility

</td><td>

Record&lt;string, BaseStyleProps['visibility']&gt;

</td><td>

可见性配置

</td></tr>
<tr><td>

animation

</td><td>

boolean

</td><td>

动画配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.setElementZIndex(id, zIndex)

Set element z-index

```typescript
setElementZIndex(id: ID, zIndex: number): Promise<void>;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
<tr><td>

zIndex

</td><td>

number

</td><td>

层级

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### <Badge type="warning">Overload</Badge> Graph.setElementZIndex(zIndex)

Batch set element z-index

```typescript
setElementZIndex(zIndex: Record<ID, number>): Promise<void>;
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

zIndex

</td><td>

Record&lt;string, number&gt;

</td><td>

层级配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.setNode(node)

Set node mapper

```typescript
setNode(node: NodeOptions): void;
```

The value of `options.node`

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

node

</td><td>

[NodeOptions](../api/reference/g6.nodeoptions.en.md)

</td><td>

节点配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.showElement(id, animation)

Show element

```typescript
showElement(id: ID | ID[], animation?: boolean): Promise<void>;
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

id

</td><td>

string \| string[]

</td><td>

元素 ID

</td></tr>
<tr><td>

animation

</td><td>

boolean

</td><td>

是否启用动画

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.translateElementBy(id, offset, animation)

Translate the element by the specified distance (relative translation)

```typescript
translateElementBy(id: ID, offset: Point, animation?: boolean): Promise<void>;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
<tr><td>

offset

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

偏移量

</td></tr>
<tr><td>

animation

</td><td>

boolean

</td><td>

是否启用动画

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### <Badge type="warning">Overload</Badge> Graph.translateElementBy(offsets, animation)

Batch translate elements by the specified distance (relative translation)

```typescript
translateElementBy(offsets: Record<ID, Point>, animation?: boolean): Promise<void>;
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

offsets

</td><td>

Record&lt;string, [number, number] \| [number, number, number] \| Float32Array&gt;

</td><td>

偏移量配置

</td></tr>
<tr><td>

animation

</td><td>

boolean

</td><td>

是否启用动画

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.translateElementTo(id, position, animation)

Translate the element to the specified position (absolute translation)

```typescript
translateElementTo(id: ID, position: Point, animation?: boolean): Promise<void>;
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

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
<tr><td>

position

</td><td>

[number, number] \| [number, number, number] \| Float32Array

</td><td>

指定位置

</td></tr>
<tr><td>

animation

</td><td>

boolean

</td><td>

是否启用动画

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### <Badge type="warning">Overload</Badge> Graph.translateElementTo(positions, animation)

Batch translate elements to the specified position (absolute translation)

```typescript
translateElementTo(positions: Record<ID, Point>, animation?: boolean): Promise<void>;
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

positions

</td><td>

Record&lt;string, [number, number] \| [number, number, number] \| Float32Array&gt;

</td><td>

位置配置

</td></tr>
<tr><td>

animation

</td><td>

boolean

</td><td>

是否启用动画

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.focusElement(id, animation)

Focus on element

```typescript
focusElement(id: ID | ID[], animation?: ViewportAnimationEffectTiming): Promise<void>;
```

Move the graph so that the element is aligned to the center of the viewport

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string \| string[]

</td><td>

元素 ID

</td></tr>
<tr><td>

animation

</td><td>

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.en.md)

</td><td>

动画配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>
