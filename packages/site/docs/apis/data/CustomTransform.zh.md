---
title: 自定义数据处理器
order: 12
---

> 在进行自定义数据处理器之前，请确保您已经熟悉了 G6 数据流和数据结构。相关内容可以参考[数据介绍文档](./DataIntro.zh.md)

自定义数据处理器涉及以下三个主要步骤：定义、注册和使用。[自定义数据处理器 DEMO](/zh/examples/feature/features/#themeSwitch)

## 定义

自定义数据处理器本质上是一个函数，它负责将用户数据 (user data) 转换为 G6 内部可以理解和处理的格式 (inner data)

**类型**：`CustomDataTransformFn`

```typescript
type CustomDataTransformFn = (
  data: GraphDataChanges,
  options: Record<string, any>,
  graphCore?: GraphCore,
) => GraphDataChanges;
```

其中 `GraphDataChanges` 定义如下：

G6 会根据操作类型，将数据变更自动划分为三个部分：待添加（`dataAdded`）、更新（`dataUpdated`）和删除（`dataRemoved`）数据。

```typescript
type GraphData = {
  nodes?: NodeUserModel[];
  edges?: EdgeUserModel[];
  combos?: ComboUserModel[];
};

type GraphDataChanges = {
  dataAdded: GraphData;
  dataUpdated: GraphData;
  dataRemoved: GraphData;
};
```

其中，输入数据类型参考 [NodeUserModel 输入数据](./NodeUserModel.zh.md)，[EdgeUserModel 输入数据](./EdgeUserModel.zh.md) 和 [ComboUserModel 输入数据](./ComboUserModel.zh.md)

请确保您的处理器返回的数据严格遵守 `GraphDataChanges` 类型定义，以保证处理器能顺利嵌入 G6 的数据处理流程中。

## 注册

在 G6 中，您需要将自定义的数据处理器注册到扩展点。

```typescript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

// 注册后方可在实例化或后续 API 调用中使用
const ExtGraph = extend(BaseGraph, {
  transforms: {
    'my-custom-data-transform': myCustomDataTransformFn,
  },
});
```

## 使用

注册完成后，您可以在图形实例化或 API 调用中使用自定义数据处理器。

**类型**：`TransformsConfig`

```typescript
// 数据生命周期阶段
type DataLifecycleType = 'read' | 'changeData' | 'updateData' | 'addData' | 'removeData';
type TransformsConfig =
  | string[]
  | {
      type: string;
      /**
       * 决定 transform 函数生效时机，默认只在初始化数据时生效
       * `'all'` 表示在所有数据生命周期阶段激活，也可以指定在一个或多个生命周期阶段
       */
      activeLifecycle: 'all' | DataLifecycleType | DataLifecycleType[];
      [param: string]: unknown;
    }[]
  | TransformerFn[];
```

## 完整示例

```typescript
const myCustomDataTransformFn: CustomDataTransformFn = (
  dataAUR: GraphDataChanges,
  options: Record<string, any>,
  graphCore?: GraphCor,
) => {
  const { dataAdded, dataUpdated, dataRemoved } = dataAUR;

  const processHandler = (data: GraphData, options: Record<string, any>, graphCore?: GraphCore) => {
    // ... 处理逻辑
  };

  return {
    dataAdded: processHandler(dataAdded, options, graphCore),
    dataUpdated: processHandler(dataUpdated, options, graphCore),
    dataRemoved: processHandler(dataRemoved, options, graphCore),
  };
};

const ExtGraph = extend(Graph, {
  transforms: {
    'map-node-size': Extensions.MapNodeSize,
    'my-custom-data-transform': myCustomDataTransformFn,
  },
});

const graph = new ExtGraph({
  // ...其他配置
  transforms: [
    'map-node-size',
    {
      type: 'my-custom-data-transform',
      activeLifecycle: ['read', 'changeData'],
      //  ...options
    },
  ],
});
```
