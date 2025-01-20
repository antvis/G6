---
title: Transform
order: 10
---

### Graph.getTransforms()

Get data transforms options

```typescript
getTransforms(): TransformOptions;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** TransformOptions

- **Description:** 数据转换配置

</details>

### Graph.setTransforms(transforms)

Set data transforms

```typescript
setTransforms(transforms: TransformOptions | ((prev: TransformOptions) => TransformOptions)): void;
```

Data transforms can perform data transformation during the rendering process of the graph. Currently, it supports transforming the drawing data before rendering.

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

transforms

</td><td>

TransformOptions \| ((prev: TransformOptions) =&gt; TransformOptions)

</td><td>

数据转换配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.updateTransform(transform)

Update data transform

```typescript
updateTransform(transform: UpdateTransformOption): void;
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

transform

</td><td>

UpdateTransformOption

</td><td>

数据转换器配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
