---
title: Behavior
order: 8
---

## Overview of Behavior

Behavior is a core building block of G6, precisely defining the interaction between users and the graph. Each Behavior plugin is a highly encapsulated functional unit, integrating event listening, state management, and response handling logic for specific scenarios.

G6's built-in Behaviors cover most common interaction needs and provide a flexible extension mechanism, allowing developers to create customized interaction experiences based on business scenarios. For a complete list of behavior types, configuration options, and development examples, please refer to the [Behavior Overview](/en/manual/behavior/overview) section.

## API Reference

### Graph.getBehaviors()

Get all configured behaviors in the current graph.

```typescript
getBehaviors(): BehaviorOptions;
```

**Return Value**

- **Type**: [BehaviorOptions](#behavioroptions)
- **Description**: All configured behaviors in the current graph

**Example**

```typescript
// Get all current behaviors
const behaviors = graph.getBehaviors();
console.log('Current graph behaviors:', behaviors);
```

### Graph.setBehaviors(behaviors)

Set the behaviors of the graph, replacing all existing behaviors.

```typescript
setBehaviors(behaviors: BehaviorOptions | ((prev: BehaviorOptions) => BehaviorOptions)): void;
```

**Parameters**

| Parameter | Description                                                                                    | Type                                                                              | Default | Required |
| --------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------- | -------- |
| behaviors | New behavior configuration, or a function returning new configuration based on the current one | [BehaviorOptions](#behavioroptions) \| (prev: BehaviorOptions) => BehaviorOptions | -       | ✓        |

**Note**

The set behaviors will completely replace the original ones. To add new behaviors, you can use functional updates:

```typescript
graph.setBehaviors((behaviors) => [...behaviors, { type: 'zoom-canvas' }]);
```

**Example 1**: Set basic behaviors

```typescript
// Set basic behaviors
graph.setBehaviors([
  'drag-canvas', // Drag canvas
  'zoom-canvas', // Zoom canvas
  'drag-element', // Drag element
]);
```

**Example 2**: Set behaviors with configuration

```typescript
graph.setBehaviors([
  // String form (using default configuration)
  'drag-canvas',

  // Object form (custom configuration)
  {
    type: 'zoom-canvas',
    key: 'my-zoom', // Specify a unique identifier for subsequent updates
    sensitivity: 1.5, // Zoom sensitivity
  },

  // Enable drag only on nodes
  {
    type: 'drag-element',
    key: 'drag-node-only',
    enable: (event) => event.targetType === 'node', // Enable drag only on nodes
  },
]);
```

**Example 3**: Use functional updates

```typescript
// Add new behavior
graph.setBehaviors((currentBehaviors) => [
  ...currentBehaviors,
  {
    type: 'brush-select',
    key: 'selection-brush',
  },
]);

// Replace specific behavior
graph.setBehaviors((currentBehaviors) => {
  // Filter out existing zoom behaviors
  const filteredBehaviors = currentBehaviors.filter((behavior) => {
    if (typeof behavior === 'string') return behavior !== 'zoom-canvas';
    return behavior.type !== 'zoom-canvas';
  });

  // Add new zoom behavior configuration
  return [
    ...filteredBehaviors,
    {
      type: 'zoom-canvas',
      key: 'new-zoom',
      enableOptimize: true,
    },
  ];
});
```

### Graph.updateBehavior(behavior)

Update the configuration of a specific behavior, identified by the `key`.

```typescript
updateBehavior(behavior: UpdateBehaviorOption): void;
```

**Parameters**

| Parameter | Description                             | Type                                          | Default | Required |
| --------- | --------------------------------------- | --------------------------------------------- | ------- | -------- |
| behavior  | Configuration of the behavior to update | [UpdateBehaviorOption](#updatebehavioroption) | -       | ✓        |

**Note**

To update a behavior, the original behavior configuration must specify the `key` field to accurately locate and update the behavior.

**Example 1**: Update behavior configuration

```typescript
// Specify key when initially setting behaviors
graph.setBehaviors([
  {
    type: 'zoom-canvas',
    key: 'my-zoom-canvas',
    sensitivity: 1.0,
  },
]);

// Update behavior configuration
graph.updateBehavior({
  key: 'my-zoom-canvas', // Specify the behavior to update
  sensitivity: 2.0, // New zoom sensitivity
  enableOptimize: true, // Add new configuration
});
```

**Example 2**: Disable/Enable behavior

```typescript
// Set behaviors with keys
graph.setBehaviors([
  {
    type: 'drag-canvas',
    key: 'main-drag',
  },
  {
    type: 'zoom-canvas',
    key: 'main-zoom',
  },
]);

// Disable drag functionality
graph.updateBehavior({
  key: 'main-drag',
  enable: false,
});

// Re-enable later
setTimeout(() => {
  graph.updateBehavior({
    key: 'main-drag',
    enable: true,
  });
}, 5000);
```

## Type Definitions

### BehaviorOptions

```typescript
type BehaviorOptions = (string | CustomBehaviorOption | ((this: Graph) => CustomBehaviorOption))[];

type CustomBehaviorOption = {
  // Interaction type
  type: string;

  // Interaction key, a unique identifier for identifying and further operating this interaction
  key?: string;

  // There may be other configuration items for different types of interactions
  [configKey: string]: any;
};
```

### UpdateBehaviorOption

```typescript
type UpdateBehaviorOption = {
  // Unique identifier of the behavior to update
  key: string;

  // Other configuration items to update
  [configKey: string]: unknown;
};
```
