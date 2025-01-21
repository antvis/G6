---
title: 元素
---

### Graph.collapseElement(id, options)

收起元素

```typescript
collapseElement(id: ID, options?: boolean | CollapseExpandNodeOptions): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

boolean \| [CollapseExpandNodeOptions](../api/reference/g6.collapseexpandnodeoptions.zh.md)

</td><td>

是否启用动画或者配置收起节点的配置项

</td></tr>
</tbody></table>

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.expandElement(id, options)

展开元素

```typescript
expandElement(id: ID, options?: boolean | CollapseExpandNodeOptions): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

boolean \| [CollapseExpandNodeOptions](../api/reference/g6.collapseexpandnodeoptions.zh.md)

</td><td>

</td></tr>
</tbody></table>

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.frontElement(id)

将元素置于最顶层

```typescript
frontElement(id: ID | ID[]): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string \| string[]

</td><td>

元素 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.getElementPosition(id)

获取元素位置

```typescript
getElementPosition(id: ID): Point;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** [number, number] \| [number, number, number] \| Float32Array

- **描述：** 元素位置

</details>

### Graph.getElementRenderBounds(id)

获取元素自身以及子节点在世界坐标系下的渲染包围盒

```typescript
getElementRenderBounds(id: ID): AABB;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** AABB

- **描述：** 渲染包围盒

</details>

### Graph.getElementRenderStyle(id)

获取元素渲染样式

```typescript
getElementRenderStyle(id: ID): Record<string, any>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** Record&lt;string, any&gt;

- **描述：** 元素渲染样式

</details>

### Graph.getElementState(id)

获取元素状态

```typescript
getElementState(id: ID): State[];
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** string[]

- **描述：** 元素状态

</details>

### Graph.getElementType(id)

获取元素类型

```typescript
getElementType(id: ID): ElementType;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** 'node' \| 'edge' \| 'combo'

- **描述：** 元素类型

</details>

### Graph.getElementVisibility(id)

获取元素可见性

```typescript
getElementVisibility(id: ID): BaseStyleProps['visibility'];
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** BaseStyleProps['visibility']

- **描述：** 元素可见性

</details>

### Graph.getElementZIndex(id)

获取元素层级

```typescript
getElementZIndex(id: ID): number;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

id

</td><td>

string

</td><td>

元素 ID

</td></tr>
</tbody></table>

**返回值**：

- **类型：** number

- **描述：** 元素层级

</details>

### Graph.hideElement(id, animation)

隐藏元素

```typescript
hideElement(id: ID | ID[], animation?: boolean): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.setCombo(combo)

设置组合样式映射

```typescript
setCombo(combo: ComboOptions): void;
```

即 `options.combo` 的值

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

combo

</td><td>

[ComboOptions](../api/reference/g6.combooptions.zh.md)

</td><td>

组合配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.setEdge(edge)

设置边样式映射

```typescript
setEdge(edge: EdgeOptions): void;
```

即 `options.edge` 的值

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

edge

</td><td>

[EdgeOptions](../api/reference/g6.edgeoptions.zh.md)

</td><td>

边配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.setElementState(id, state, animation)

设置元素状态

```typescript
setElementState(id: ID, state: State | State[], animation?: boolean): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### <Badge type="warning">Overload</Badge> Graph.setElementState(state, animation)

批量设置元素状态

```typescript
setElementState(state: Record<ID, State | State[]>, animation?: boolean): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.setElementVisibility(id, visibility, animation)

设置元素可见性

```typescript
setElementVisibility(id: ID, visibility: BaseStyleProps['visibility'], animation?: boolean): Promise<void>;
```

可见性配置包括 `visible` 和 `hidden` 两种状态

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### <Badge type="warning">Overload</Badge> Graph.setElementVisibility(visibility, animation)

批量设置元素可见性

```typescript
setElementVisibility(visibility: Record<ID, BaseStyleProps['visibility']>, animation?: boolean): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.setElementZIndex(id, zIndex)

设置元素层级

```typescript
setElementZIndex(id: ID, zIndex: number): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### <Badge type="warning">Overload</Badge> Graph.setElementZIndex(zIndex)

批量设置元素层级

```typescript
setElementZIndex(zIndex: Record<ID, number>): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

zIndex

</td><td>

Record&lt;string, number&gt;

</td><td>

层级配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.setNode(node)

设置节点样式映射

```typescript
setNode(node: NodeOptions): void;
```

即 `options.node` 的值

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

node

</td><td>

[NodeOptions](../api/reference/g6.nodeoptions.zh.md)

</td><td>

节点配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.showElement(id, animation)

显示元素

```typescript
showElement(id: ID | ID[], animation?: boolean): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.translateElementBy(id, offset, animation)

将元素平移指定距离 (相对平移)

```typescript
translateElementBy(id: ID, offset: Point, animation?: boolean): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### <Badge type="warning">Overload</Badge> Graph.translateElementBy(offsets, animation)

批量将元素平移指定距离 (相对平移)

```typescript
translateElementBy(offsets: Record<ID, Point>, animation?: boolean): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.translateElementTo(id, position, animation)

将元素平移至指定位置 (绝对平移)

```typescript
translateElementTo(id: ID, position: Point, animation?: boolean): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### <Badge type="warning">Overload</Badge> Graph.translateElementTo(positions, animation)

批量将元素平移至指定位置 (绝对平移)

```typescript
translateElementTo(positions: Record<ID, Point>, animation?: boolean): Promise<void>;
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.focusElement(id, animation)

聚焦元素

```typescript
focusElement(id: ID | ID[], animation?: ViewportAnimationEffectTiming): Promise<void>;
```

移动图，使得元素对齐到视口中心

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

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

[ViewportAnimationEffectTiming](../api/reference/g6.viewportanimationeffecttiming.zh.md)

</td><td>

动画配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>
