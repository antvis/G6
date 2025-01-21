---
title: 数据转换
order: 10
---

### Graph.getTransforms()

获取数据转换器配置

```typescript
getTransforms(): TransformOptions;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** TransformOptions

- **描述：** 数据转换配置

</details>

### Graph.setTransforms(transforms)

设置数据转换器

```typescript
setTransforms(transforms: TransformOptions | ((prev: TransformOptions) => TransformOptions)): void;
```

数据转换器能够在图渲染过程中执行数据转换，目前支持在渲染前对绘制数据进行转化。

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

transforms

</td><td>

TransformOptions \| ((prev: TransformOptions) =&gt; TransformOptions)

</td><td>

数据转换配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.updateTransform(transform)

更新数据转换器

```typescript
updateTransform(transform: UpdateTransformOption): void;
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

transform

</td><td>

UpdateTransformOption

</td><td>

数据转换器配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>
