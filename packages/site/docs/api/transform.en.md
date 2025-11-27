---
title: Data Transformation
order: 10
---

## Overview of Data Transformation

[Data Transformation](/en/manual/transform/overview) is a powerful feature in G6 that allows for processing and transforming data during the graph rendering process. With data transformers, you can achieve various data processing needs, such as:

- Data Filtering: Filter nodes and edges to be displayed based on conditions
- Data Calculation: Generate new attributes based on original data, such as calculating node size based on the number of connections, without polluting the original data
- Data Aggregation: Aggregate a large number of nodes into fewer nodes to improve the performance of large-scale graphs

Data transformation occurs at specific stages of the rendering process, allowing flexible changes to the final presentation without modifying the original data source.

## API Reference

### Graph.getTransforms()

Retrieve all configured data transformers in the current graph.

```typescript
getTransforms(): TransformOptions;
```

**Return Value**

- **Type**: [TransformOptions](#transformoptions)
- **Description**: All configured data transformers in the current graph

**Example**

```typescript
// Retrieve all data transformers
const transforms = graph.getTransforms();
console.log('Data transformers in the current graph:', transforms);
```

### Graph.setTransforms(transforms)

Set the data transformers for the graph, replacing all existing transformers.

```typescript
setTransforms(transforms: TransformOptions | ((prev: TransformOptions) => TransformOptions)): void;
```

**Parameters**

| Parameter  | Description                                                                                               | Type                                                                                  | Default | Required |
| ---------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------- | -------- |
| transforms | New data transformer configurations, or a function returning new configurations based on the current ones | [TransformOptions](#transformoptions) \| (prev: TransformOptions) => TransformOptions | -       | ✓        |

**Note**

Data transformers can process data at different stages of the graph rendering process. The set data transformations will completely replace the original ones. To add new data transformations based on existing ones, you can use functional updates.

**Example 1**: Set basic data transformations

```typescript
graph.setTransforms(['process-parallel-edges', 'map-node-size']);
```

**Example 2**: Set data transformations with configurations

```typescript
graph.setTransforms([
  // String form (using default configuration)
  'process-parallel-edges',

  // Object form (custom configuration)
  {
    type: 'process-parallel-edges',
    key: 'my-process-parallel-edges',
    distance: 20, // Distance between parallel edges
  },
]);
```

**Example 3**: Use functional updates

```typescript
// Add new data transformations to existing configurations
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

Update the configuration of a specified data transformer, identified by the `key` of the transformer to be updated.

```typescript
updateTransform(transform: UpdateTransformOption): void;
```

**Parameters**

| Parameter | Description                                         | Type                                            | Default | Required |
| --------- | --------------------------------------------------- | ----------------------------------------------- | ------- | -------- |
| transform | Configuration of the data transformer to be updated | [UpdateTransformOption](#updatetransformoption) | -       | ✓        |

**Note**

To update a data transformer, the `key` field must be specified in the original data transformer configuration to accurately locate and update the transformer.

**Example**: Update data transformer configuration

```typescript
// Specify key when initially setting data transformers
graph.setTransforms([
  {
    type: 'process-parallel-edges',
    key: 'my-process-parallel-edges',
    distance: 20,
  },
]);

// Update distance between parallel edges
graph.updateTransform({
  key: 'my-process-parallel-edges',
  distance: 30,
});
```

## Type Definitions

### TransformOptions

Data transformer configuration type, representing an array of data transformer configurations.

```typescript
type TransformOptions = (CustomTransformOption | ((this: Graph) => CustomTransformOption))[];
```

### CustomTransformOption

Custom data transformer configuration interface, used to configure data processing parameters.

```typescript
type CustomTransformOption = {
  // Data processing type
  type: string;

  // Unique identifier for the data transformer
  key?: string;

  // Other configuration items for different types of data processing
  [configKey: string]: any;
};
```

### UpdateTransformOption

Configuration interface for updating data transformers, used to dynamically modify data processing parameters.

```typescript
type UpdateTransformOption = {
  // Unique identifier of the data transformer to be updated
  key: string;

  // Other configuration items to be updated
  [configKey: string]: unknown;
};
```
