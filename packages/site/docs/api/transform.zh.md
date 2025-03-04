---
title: 数据处理
order: 10
---

## 数据处理概述

[数据处理](/manual/transform/overview)（Transform）是 G6 中一项强大的功能，允许在图渲染过程中对数据进行处理和转换。通过数据处理器，您可以实现各种数据处理需求，比如：

- 数据过滤：根据条件筛选需要显示的节点和边
- 数据计算：基于原始数据生成新的属性，如根据节点连接数计算节点大小，但不污染原始数据
- 数据聚合：将大量节点聚合为少量节点，提高大规模图表的性能

数据处理发生在渲染流程的特定阶段，可以灵活地改变最终呈现的结果，而无需修改原始数据源。

## API 参考

### Graph.getTransforms()

获取当前图表中所有已配置的数据处理器。

```typescript
getTransforms(): TransformOptions;
```

**返回值**

- **类型**: [TransformOptions](#transformoptions)
- **描述**: 当前图表中已配置的所有数据处理器

**示例**

```typescript
// 获取当前所有数据处理器
const transforms = graph.getTransforms();
console.log('当前图表的数据处理器:', transforms);
```

### Graph.setTransforms(transforms)

设置图表的数据处理器，将替换所有现有的数据处理器。

```typescript
setTransforms(transforms: TransformOptions | ((prev: TransformOptions) => TransformOptions)): void;
```

**参数**

| 参数       | 描述                                                   | 类型                                                                                  | 默认值 | 必选 |
| ---------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------ | ---- |
| transforms | 新的数据处理器配置，或一个基于当前配置返回新配置的函数 | [TransformOptions](#transformoptions) \| (prev: TransformOptions) => TransformOptions | -      | ✓    |

**说明**

数据处理器能够在图渲染过程的不同阶段对数据进行处理。设置的数据处理会全量替换原有的数据处理，如果需要在现有数据处理基础上添加新的数据处理，可以使用函数式更新方式。

**示例 1**: 设置基本数据处理

```typescript
graph.setTransforms(['process-parallel-edges', 'map-node-size']);
```

**示例 2**: 设置带配置的数据处理

```typescript
graph.setTransforms([
  // 字符串形式（使用默认配置）
  'process-parallel-edges',

  // 对象形式（自定义配置）
  {
    type: 'process-parallel-edges',
    key: 'my-process-parallel-edges',
    distance: 20, // 平行边之间的距离
  },
]);
```

**示例 3**: 使用函数式更新

```typescript
// 添加新的数据处理到现有配置
graph.setTransforms((currentTransforms) => [
  ...currentTransforms,
  {
    type: 'map-node-size',
    key: 'my-map-node-size',
    maxSize: 100,
    minSize: 20,
  },
]);
```

### Graph.updateTransform(transform)

更新指定的数据处理器配置，需要通过 `key` 标识要更新的数据处理。

```typescript
updateTransform(transform: UpdateTransformOption): void;
```

**参数**

| 参数      | 描述               | 类型                                            | 默认值 | 必选 |
| --------- | ------------------ | ----------------------------------------------- | ------ | ---- |
| transform | 更新的数据处理配置 | [UpdateTransformOption](#updatetransformoption) | -      | ✓    |

**说明**

如果要更新一个数据处理器，必须在原始数据处理配置中指定 `key` 字段，以便能够准确找到并更新该数据处理。

**示例**: 更新数据处理配置

```typescript
// 初始设置数据处理时指定 key
graph.setTransforms([
  {
    type: 'process-parallel-edges',
    key: 'my-process-parallel-edges',
    distance: 20,
  },
]);

// 更新平行边距离
graph.updateTransform({
  key: 'my-process-parallel-edges',
  distance: 30,
});
```

## 类型定义

### TransformOptions

数据处理器配置类型，表示一组数据处理配置的数组。

```typescript
type TransformOptions = (CustomTransformOption | ((this: Graph) => CustomTransformOption))[];
```

### CustomTransformOption

自定义数据处理配置接口，用于配置数据处理参数。

```typescript
type CustomTransformOption = {
  // 数据处理类型
  type: string;

  // 数据处理唯一标识
  key?: string;

  // 针对不同类型的数据处理，还可能有其他配置项
  [configKey: string]: any;
};
```

### UpdateTransformOption

更新数据处理的配置接口，用于动态修改数据处理参数。

```typescript
type UpdateTransformOption = {
  // 要更新的数据处理的唯一标识
  key: string;

  // 其他要更新的配置项
  [configKey: string]: unknown;
};
```
