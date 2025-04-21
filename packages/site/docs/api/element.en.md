---
title: Element Operations
order: 1
---

## Overview of Element Operations

The [Element](/en/manual/element/overview) operation API in G6 allows you to control the behavior and attributes of elements such as nodes, edges, and Combos in the graph. These APIs can be used for:

1. **Element State Management**: Set, update, or remove the state of elements
2. **Element Display Control**: Control the z-index and visibility of elements
3. **Element Collapse/Expand**: Operate the collapse/expand state of collapsible elements
4. **Element Position Operations**: Move and align element positions
5. **Element Focus**: Focus the viewport on specific elements

Through these operations, you can achieve rich interactive effects and visual presentations.

## API Reference

### Graph.getElementPosition(id)

Get the position of an element.

```typescript
getElementPosition(id: ID): Point;
```

**Parameters**:

| Parameter | Description | Type   | Default | Required |
| --------- | ----------- | ------ | ------- | -------- |
| id        | Element ID  | string | -       | ✓        |

**Return Value**:

- **Type**: [number, number] \| [number, number, number]
- **Description**: Returns the coordinates of the element

**Example**:

```typescript
graph.getElementPosition('node1');
```

### Graph.getElementRenderBounds(id)

Get the rendering bounding box of the element itself and its child nodes in the world coordinate system.

```typescript
getElementRenderBounds(id: ID): AABB;
```

**Parameters**:

| Parameter | Description | Type   | Default | Required |
| --------- | ----------- | ------ | ------- | -------- |
| id        | Element ID  | string | -       | ✓        |

**Return Value**:

- **Type**: [AABB](#aabb)
- **Description**: Returns the rendering bounding box of the element

### Graph.getElementRenderStyle(id)

Get the rendering style of an element.

```typescript
getElementRenderStyle(id: ID): Record<string, any>;
```

**Parameters**:

| Parameter | Description | Type   | Default | Required |
| --------- | ----------- | ------ | ------- | -------- |
| id        | Element ID  | string | -       | ✓        |

**Return Value**:

- **Type**: Record<string, any>
- **Description**: Returns the rendering style of the element

### Graph.getElementState(id)

Get the state of an element.

```typescript
getElementState(id: ID): State[];
```

**Parameters**:

| Parameter | Description | Type   | Default | Required |
| --------- | ----------- | ------ | ------- | -------- |
| id        | Element ID  | string | -       | ✓        |

**Return Value**:

- **Type**: [State](#state)[]
- **Description**: Returns the state of the element

### Graph.getElementType(id)

Get the type of an element.

```typescript
getElementType(id: ID): string;
```

**Parameters**:

| Parameter | Description | Type   | Default | Required |
| --------- | ----------- | ------ | ------- | -------- |
| id        | Element ID  | string | -       | ✓        |

**Return Value**:

- **Type**: string
- **Description**: Returns the type of the element

### Graph.getElementVisibility(id)

Get the visibility of an element.

```typescript
getElementVisibility(id: ID): 'visible' | 'hidden';
```

**Parameters**:

| Parameter | Description | Type   | Default | Required |
| --------- | ----------- | ------ | ------- | -------- |
| id        | Element ID  | string | -       | ✓        |

**Return Value**:

- **Type**: 'visible' | 'hidden'
- **Description**: Returns the visibility of the element

### Graph.getElementZIndex(id)

Get the z-index of an element.

```typescript
getElementZIndex(id: ID): number;
```

**Parameters**:

| Parameter | Description | Type   | Default | Required |
| --------- | ----------- | ------ | ------- | -------- |
| id        | Element ID  | string | -       | ✓        |

**Return Value**:

- **Type**: number
- **Description**: Returns the z-index of the element

### Graph.setElementState(id, state, options)

Set the state of an element, supporting two calling methods:

```typescript
// Set the state of a single element
setElementState(id: ID, state: State | State[], animation?: boolean): Promise<void>;

// Set the state of multiple elements
setElementState(state: Record<ID, State | State[]>, animation?: boolean): Promise<void>;
```

**Parameters**:

**Single Element State Setting**

| Parameter | Description       | Type            | Default | Required |
| --------- | ----------------- | --------------- | ------- | -------- | --- |
| id        | Element ID to set | string          | -       | ✓        |
| state     | State to set      | [State](#state) | State[] | -        | ✓   |
| animation | Enable animation  | boolean         | -       |          |

**Batch Element State Setting**

| Parameter | Description                    | Type                       | Default  | Required |
| --------- | ------------------------------ | -------------------------- | -------- | -------- | --- |
| state     | Mapping of element ID to state | Record<ID, [State](#state) | State[]> | -        | ✓   |
| animation | Enable animation               | boolean                    | -        |          |

**Return Value**:

- **Type**: Promise<void>
- **Description**: Returns a Promise that resolves when the state setting operation is complete

**Example**:

```typescript
// Set the state of a single element
await graph.setElementState('node1', 'selected');

// Set the state of multiple elements
await graph.setElementState({
  node1: 'selected',
  node2: 'hover',
  node3: ['selected', 'hover'],
});
```

### Graph.setElementVisibility(id, visibility, animation)

Set the visibility of an element, supporting two calling methods:

```typescript
// Set the visibility of a single element
setElementVisibility(id: ID, visibility: 'visible' | 'hidden', animation?: boolean): Promise<void>;

// Set the visibility of multiple elements
setElementVisibility(visibility: Record<ID, 'visible' | 'hidden'>, animation?: boolean): Promise<void>;
```

**Parameters**:

**Single Element Visibility Setting**

| Parameter  | Description       | Type      | Default  | Required |
| ---------- | ----------------- | --------- | -------- | -------- | --- |
| id         | Element ID to set | string    | -        | ✓        |
| visibility | Visibility to set | 'visible' | 'hidden' | -        | ✓   |
| animation  | Enable animation  | boolean   | -        |          |

**Batch Element Visibility Setting**

| Parameter  | Description                         | Type                 | Default   | Required |
| ---------- | ----------------------------------- | -------------------- | --------- | -------- | --- |
| visibility | Mapping of element ID to visibility | Record<ID, 'visible' | 'hidden'> | -        | ✓   |
| animation  | Enable animation                    | boolean              | -         |          |

**Return Value**:

- **Type**: Promise<void>
- **Description**: Returns a Promise that resolves when the visibility setting operation is complete

**Example**:

```typescript
// Set the visibility of a single element
await graph.setElementVisibility('node1', 'hidden');

// Set the visibility of multiple elements
await graph.setElementVisibility({
  node1: 'hidden',
  node2: 'visibility',
});
```

### Graph.setElementZIndex(id, zIndex)

Set the z-index of an element, supporting two calling methods:

```typescript
// Set the z-index of a single element
setElementZIndex(id: ID, zIndex: number): Promise<void>;

// Set the z-index of multiple elements
setElementZIndex(zIndex: Record<ID, number>): Promise<void>;
```

**Parameters**:

**Single Element Z-Index Setting**

| Parameter | Description | Type   | Default | Required |
| --------- | ----------- | ------ | ------- | -------- |
| id        | Element ID  | string | -       | ✓        |
| zIndex    | Z-Index     | number | -       | ✓        |

**Batch Element Z-Index Setting**

| Parameter | Description                      | Type               | Default | Required |
| --------- | -------------------------------- | ------------------ | ------- | -------- |
| zIndex    | Mapping of element ID to z-index | Record<ID, number> | -       | ✓        |

**Return Value**:

- **Type**: Promise<void>
- **Description**: Returns a Promise that resolves when the z-index setting operation is complete

**Example**:

```typescript
// Set the z-index of a single element
await graph.setElementZIndex('node1', 10);

// Set the z-index of multiple elements
await graph.setElementZIndex({
  node1: 10,
  node2: 20,
  node3: 30,
});
```

### Graph.setNode(node)

Set the node style mapping, i.e., the value of `options.node`.

```typescript
setNode(node: NodeOptions): void;
```

**Parameters**:

| Parameter | Description        | Type                                            | Default | Required |
| --------- | ------------------ | ----------------------------------------------- | ------- | -------- |
| node      | Node configuration | [NodeOptions](/en/manual/element/node/overview) | -       | ✓        |

**Example**:

```typescript
// Set the fill color of all nodes to red
graph.setNode({
  style: {
    fill: 'red',
  },
});
```

### Graph.setEdge(edge)

Set the edge style mapping, i.e., the value of `options.edge`.

```typescript
setEdge(edge: EdgeOptions): void;
```

**Parameters**:

| Parameter | Description        | Type                                            | Default | Required |
| --------- | ------------------ | ----------------------------------------------- | ------- | -------- |
| edge      | Edge configuration | [EdgeOptions](/en/manual/element/edge/overview) | -       | ✓        |

### Graph.setCombo(combo)

Set the combo style mapping, i.e., the value of `options.combo`.

```typescript
setCombo(combo: ComboOptions): void;
```

**Parameters**:

| Parameter | Description         | Type                                              | Default | Required |
| --------- | ------------------- | ------------------------------------------------- | ------- | -------- |
| combo     | Combo configuration | [ComboOptions](/en/manual/element/combo/overview) | -       | ✓        |

### Graph.collapseElement(id, options)

Collapse the specified element, usually used to collapse Combos or nodes with child elements.

```typescript
collapseElement(id: ID, options?: boolean | CollapseExpandNodeOptions): Promise<void>;
```

**Parameters**:

| Parameter | Description                                                     | Type    | Default                                                 | Required |
| --------- | --------------------------------------------------------------- | ------- | ------------------------------------------------------- | -------- | --- |
| id        | Element ID to collapse                                          | string  | -                                                       | ✓        |
| options   | Enable animation or detailed configuration for collapsing nodes | boolean | [CollapseExpandNodeOptions](#collapseexpandnodeoptions) | -        |     |

**Return Value**:

- **Type**: Promise<void>
- **Description**: Returns a Promise that resolves when the collapse operation is complete

**Example**:

```typescript
// Simple collapse with default configuration
await graph.collapseElement('combo1');

// Collapse with animation
graph.collapseElement('combo1', true);

// Collapse while ensuring the position of expanded/collapsed nodes remains unchanged
await graph.collapseElement('combo1', {
  align: true,
});
```

### Graph.expandElement(id, options)

Expand the specified element, usually used to expand previously collapsed Combos or nodes.

```typescript
expandElement(id: ID, options?: boolean | CollapseExpandNodeOptions): Promise<void>;
```

**Parameters**:

| Parameter | Description                                                    | Type    | Default                                                 | Required |
| --------- | -------------------------------------------------------------- | ------- | ------------------------------------------------------- | -------- | --- |
| id        | Element ID to expand                                           | string  | -                                                       | ✓        |
| options   | Enable animation or detailed configuration for expanding nodes | boolean | [CollapseExpandNodeOptions](#collapseexpandnodeoptions) | -        |     |

**Return Value**:

- **Type**: Promise<void>
- **Description**: Returns a Promise that resolves when the expand operation is complete

**Example**:

```typescript
// Simple expand with default configuration
await graph.expandElement('combo1');

// Expand with animation
await graph.expandElement('combo1', true);

// Expand while ensuring the position of expanded/collapsed nodes remains unchanged
await graph.expandElement('combo1', {
  align: true,
});
```

### Graph.frontElement(id)

Bring the specified element to the front, making it appear above other overlapping elements.

```typescript
frontElement(id: ID | ID[]): void;
```

**Parameters**:

| Parameter | Description | Type   | Default  | Required |
| --------- | ----------- | ------ | -------- | -------- | --- |
| id        | Element ID  | string | string[] | -        | ✓   |

**Return Value**:

- **Type**: void

**Example**:

```typescript
// Bring a node to the front
graph.frontElement('node1');

// Bring multiple selected nodes to the front
graph.frontElement(['node1', 'node2', 'node3']);
```

### Graph.showElement(id, animation)

Show the specified element.

```typescript
showElement(id: ID | ID[], animation?: boolean): Promise<void>;
```

**Parameters**:

| Parameter | Description      | Type    | Default  | Required |
| --------- | ---------------- | ------- | -------- | -------- | --- |
| id        | Element ID       | string  | string[] | -        | ✓   |
| animation | Enable animation | boolean | -        |          |

**Return Value**:

- **Type**: Promise<void>
- **Description**: Returns a Promise that resolves when the show operation is complete

**Example**:

```typescript
// Show a single element
await graph.showElement('node1');

// Show an element with animation
await graph.showElement('node1', true);

// Show multiple elements
await graph.showElement(['node1', 'node2', 'node3']);
```

### Graph.hideElement(id, animation)

Hide the specified element.

```typescript
hideElement(id: ID | ID[], animation?: boolean): Promise<void>;
```

**Parameters**:

| Parameter | Description      | Type    | Default  | Required |
| --------- | ---------------- | ------- | -------- | -------- | --- |
| id        | Element ID       | string  | string[] | -        | ✓   |
| animation | Enable animation | boolean | -        |          |

**Return Value**:

- **Type**: Promise<void>
- **Description**: Returns a Promise that resolves when the hide operation is complete

**Example**:

```typescript
// Hide an element without animation
await graph.hideElement('node1');

// Hide an element with animation
await graph.hideElement('node1', true);

// Hide multiple elements
await graph.hideElement(['node1', 'node2', 'node3'], true);
```

### Graph.translateElementBy(id, offset, animation)

Translate an element by a specified distance, supporting two calling methods:

```typescript
// Translate an element by a specified distance (relative translation)
translateElement(id: ID, offset: Point, animation?: boolean): Promise<void>;

// Translate multiple elements by a specified distance (relative translation)
translateElement(offsets: Record<ID, Point>, animation?: boolean): Promise<void>;
```

**Parameters**:

**Single Element Translation**

| Parameter | Description                            | Type             | Default | Required |
| --------- | -------------------------------------- | ---------------- | ------- | -------- |
| id        | Element ID                             | string           | -       | ✓        |
| offset    | Relative translation distance [dx, dy] | [number, number] | -       | ✓        |
| animation | Enable animation                       | boolean          | -       |          |

**Batch Element Translation**

| Parameter | Description                                   | Type                         | Default | Required |
| --------- | --------------------------------------------- | ---------------------------- | ------- | -------- |
| offsets   | Mapping of element ID to translation distance | Record<ID, [number, number]> | -       | ✓        |
| animation | Enable animation                              | boolean                      | -       |          |

**Return Value**:

- **Type**: Promise<void>
- **Description**: Returns a Promise that resolves when the translation operation is complete

**Example**:

```typescript
// Translate right by 100 pixels and down by 50 pixels
await graph.translateElementBy('node1', [100, 50]);

// Translate with animation
await graph.translateElementBy('node1', [100, 50], true);

// Apply the same translation to multiple nodes
await graph.translateElementBy(
  {
    node1: [50, 50],
    node2: [100, 100],
    node3: [150, 150],
  },
  true,
);
```

### Graph.translateElementTo(id, position, animation)

Move an element to a specified position, supporting two calling methods:

```typescript
// Move an element to a specified position (absolute position)
translateElementTo(id: ID, position: Point, animation?: boolean): Promise<void>;

// Move multiple elements to specified positions (absolute position)
translateElementTo(positions: Record<ID, Point>, animation?: boolean): Promise<void>;
```

**Parameters**:

**Single Element Movement**

| Parameter | Description                     | Type             | Default | Required |
| --------- | ------------------------------- | ---------------- | ------- | -------- |
| id        | Element ID                      | string           | -       | ✓        |
| position  | Target absolute position [x, y] | [number, number] | -       | ✓        |
| animation | Enable animation                | boolean          | -       |          |

**Batch Element Movement**

| Parameter | Description                              | Type                             | Default | Required |
| --------- | ---------------------------------------- | -------------------------------- | ------- | -------- |
| positions | Mapping of element ID to target position | Record<string, [number, number]> | -       | ✓        |
| animation | Enable animation                         | boolean                          | -       |          |

**Return Value**:

- **Type**: Promise<void>
- **Description**: Returns a Promise that resolves when the movement operation is complete

**Example**:

```typescript
// Move a node to position (200, 300) on the canvas
await graph.translateElementTo('node1', [200, 300]);

// Move with animation
await graph.translateElementTo('node1', [200, 300], true);

// Arrange a group of nodes neatly
await graph.translateElementTo(
  {
    node1: [100, 100],
    node2: [200, 200],
    node3: [300, 100],
  },
  true,
);
```

### Graph.focusElement(id, animation)

Focus on the specified element, centering it in the viewport.

```typescript
focusElement(id: ID | ID[], animation?: ViewportAnimationEffectTiming): Promise<void>;
```

**Parameters**:

| Parameter | Description                         | Type                                                            | Default  | Required |
| --------- | ----------------------------------- | --------------------------------------------------------------- | -------- | -------- | --- |
| id        | One or more element IDs to focus on | string                                                          | string[] | -        | ✓   |
| animation | Viewport animation configuration    | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -        |          |

**Return Value**:

- **Type**: Promise<void>
- **Description**: Returns a Promise that resolves when the focus operation is complete

**Example**:

```typescript
// Focus on a single node
await graph.focusElement('node1');

// Use custom animation configuration
await graph.focusElement('node1', {
  duration: 800,
  easing: 'ease-in-out',
});

// Focus on multiple nodes
await graph.focusElement(['node1', 'node2', 'node3']);
```

## Type Definitions

### CollapseExpandNodeOptions

Configuration options for collapsing or expanding elements.

```typescript
interface CollapseExpandNodeOptions {
  /**
   * Enable animation
   */
  animation?: boolean;
  /**
   * Ensure the position of expanded/collapsed nodes remains unchanged
   */
  align?: boolean;
}
```

### ViewportAnimationEffectTiming

Viewport animation configuration type.

```typescript
type ViewportAnimationEffectTiming =
  | boolean // Enable animation
  | {
      easing?: string; // Easing function
      duration?: number; // Animation duration (ms)
    };
```

### AABB

AABB (Axis-Aligned Bounding Box) is a fundamental concept in computer graphics.

```typescript
interface AABB {
  x: number; // x-coordinate of the top-left corner of the rectangle
  y: number; // y-coordinate of the top-left corner of the rectangle
  width: number; // Width of the rectangle
  height: number; // Height of the rectangle
}
```

### State

Element state type.

```typescript
type State = 'selected' | 'hover' | 'active' | 'inactive' | 'disabled' | string;
```
