---
title: FixElementSize
---

## Overview

FixElementSize is a built-in interaction provided by G6, used to **maintain the size of certain elements within nodes unchanged during the zooming process.** It enhances visual consistency and operability during zooming.
By listening to viewport changes, it automatically scales elements marked as "fixed size" to ensure they maintain a relatively constant display size at different zoom levels. It supports global enablement and also allows control over specific elements or nodes as needed.

## Use Cases

This interaction is mainly used for:

- Graphical elements or embedded components (buttons, labels, etc.) that need to maintain a fixed visual size

## Online Experience

<embed src="@/common/api/behaviors/fix-element-size.md"></embed>

## Basic Usage

Add this interaction in the graph configuration

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['fix-element-size'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'fix-element-size',
      enable: true, // Enable this interaction
      state: 'selected', // State of elements to fix size
      reset: true, // Restore style when elements are redrawn
    },
  ],
});
```

## Configuration Options

| Option      | Description                                                                                                                                                                                                    | Type                                                                         | Default                                                                                             | Required |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------- | --- |
| type        | Interaction type name                                                                                                                                                                                          | string                                                                       | `fix-element-size`                                                                                  | ✓        |
| enable      | Whether to enable this interaction, [example](#enable)                                                                                                                                                         | boolean \| ((event: [Event](/api/event#event-object-properties)) => boolean) | true                                                                                                |          |
| reset       | Whether to restore style when elements are redrawn                                                                                                                                                             | boolean                                                                      | `false`                                                                                             |          |
| state       | Specify the state of elements to fix size                                                                                                                                                                      | string                                                                       | ""                                                                                                  |          |
| node        | Node configuration item, used to define which attributes maintain a fixed visual size. If not specified (i.e., undefined), the entire node will be fixed, [example](#node)                                     | [FixShapeConfig](#fixshapeconfig) \| FixShapeConfig[]                        |                                                                                                     |          |
| nodeFilter  | Node filter, used to filter which nodes maintain a fixed size during zooming                                                                                                                                   | (datum: [NodeData](/manual/data#nodedata)) => boolean                        | `() => true`                                                                                        |          |
| edge        | Edge configuration item, used to define which attributes maintain a fixed visual size. By default, the lineWidth and labelFontSize attributes are fixed, usage is the same as [node configuration item](#node) | [FixShapeConfig](#fixshapeconfig) \| FixShapeConfig[]                        | `[ shape: 'key', fields: ['lineWidth'] ,  shape: 'halo', fields: ['lineWidth'] ,  shape: 'label' ]` |          |
| edgeFilter  | Edge filter, used to filter which edges maintain a fixed size during zooming                                                                                                                                   | (datum: [EdgeData](/manual/data#edgedata)) => boolean                        | `() => true`                                                                                        |          |
| combo       | Combo configuration item, used to define which attributes maintain a fixed visual size. By default, the entire Combo will be fixed, usage is the same as [node configuration item](#node)                      | [FixShapeConfig](#fixshapeconfig) \| FixShapeConfig[]                        |                                                                                                     |          |
| comboFilter | Combo filter, used to filter which Combos maintain a fixed size during zooming                                                                                                                                 | (datum: [ComboData](/manual/data#combodata)) => boolean                      | `() => true`                                                                                        |          |     |

### enable

Whether to enable the fixed element size interaction. By default, it is enabled when zooming out the canvas

By default, it is enabled when zooming out the canvas, set `enable: (event) => event.data.scale < 1`; if you want to enable it when zooming in, set `enable: (event) => event.data.scale > 1`; if you want to enable it when both zooming in and out, set `enable: true`

### node

Node configuration item, used to define which attributes maintain a fixed visual size. If not specified (i.e., undefined), the entire node will be fixed

**Example**

If you want to fix the lineWidth of the main shape of the node during zooming, you can configure it like this:

```ts
{
  node: [{ shape: 'key', fields: ['lineWidth'] }];
}
```

If you want to keep the size of the element label unchanged during zooming, you can configure it like this:

```ts
{
  shape: 'label';
}
```

### FixShapeConfig

| Parameter | Description                                                                                                                                                        | Type                                                   | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------- | -------- |
| shape     | Specify the shape to fix size, it can be the class name of the shape, or a function that receives all shapes constituting the element and returns the target shape | string \| ((shapes: DisplayObject[]) => DisplayObject) | -       | ✓        |
| fields    | Specify the fields of the shape to fix size. If not specified, the entire shape size is fixed by default                                                           | string[]                                               | -       | ✘        |

## Practical Example

<Playground path="behavior/fix-element-size/demo/fix-size.js" rid="default-fix-element-size"></Playground>
