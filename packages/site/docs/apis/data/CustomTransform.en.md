---
title: Custom Data Processor
order: 12
---

> Before proceeding with a custom data processor, please ensure you are familiar with the G6 data flow and structure. Related content can be found in the [Data Introduction Document](./DataIntro.en.md).

Custom data processing involves three main steps: definition, registration, and usage. [Custom Data Processor DEMO](/en/examples/feature/features/#themeSwitch).

## Definition

A custom data processor is essentially a function that is responsible for converting user data into a format that can be understood and processed by G6 (inner data).

**Type**: `CustomDataTransformFn`

```typescript
type CustomDataTransformFn = (
  data: GraphDataChanges,
  options: Record<string, any>,
  graphCore?: GraphCore,
) => GraphDataChanges;
```

`GraphDataChanges` is defined as follows:

G6 automatically divides data changes into three parts based on the operation type: data to be added (`dataAdded`), updated (`dataUpdated`), and removed (`dataRemoved`).

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

Input data types refer to [NodeUserModel](./NodeUserModel.en.md), [EdgeUserModel](./EdgeUserModel.en.md) and [ComboUserModel](./ComboUserModel.en.md).

Ensure that the data returned by your processor strictly adheres to the `GraphDataChanges` type definition to ensure seamless integration into the G6 data processing flow.

## Registration

In G6, you need to register your custom data processor to an extension point.

```typescript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

//  Register to use in instance creation or subsequent API calls
const ExtGraph = extend(BaseGraph, {
  transforms: {
    'my-custom-data-transform': myCustomDataTransformFn,
  },
});
```

## Usage

After registration, you can use the custom data processor in graph instantiation or API calls.

**Type**: `TransformsConfig`

```typescript
// Data lifecycle stages
type DataLifecycleType = 'read' | 'changeData' | 'updateData' | 'addData' | 'removeData';
type TransformsConfig =
  | string[]
  | {
      type: string;
      /**
       * Determines the timing of the transform function's effectiveness, defaulting to only initialization
       * `'all'` indicates activation at all data lifecycle stages, or you can specify one or more stages
       */
      activeLifecycle: 'all' | DataLifecycleType | DataLifecycleType[];
      [param: string]: unknown;
    }[]
  | TransformerFn[];
```

## Complete Example

```typescript
const myCustomDataTransformFn: CustomDataTransformFn = (
  dataAUR: GraphDataChanges,
  options: Record<string, any>,
  graphCore?: GraphCor,
) => {
  const { dataAdded, dataUpdated, dataRemoved } = dataAUR;

  const processHandler = (data: GraphData, options: Record<string, any>, graphCore?: GraphCore) => {
    // ... processing logic
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
  // ... other configurations
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
