---
title: Snapline
---

## Overview

The Snapline plugin provides intelligent alignment guidelines for the canvas, automatically displaying guide lines when moving nodes and supporting automatic snapping. It helps users achieve precise alignment and is an important tool for improving efficiency and accuracy in graphic editing.

## Use Cases

The Snapline plugin is mainly suitable for the following scenarios:

- When precise alignment of multiple nodes is needed
- When creating standardized graphic layouts
- When quick horizontal or vertical alignment of nodes is required
- When improved layout efficiency through automatic snapping is desired

## Basic Usage

```js
const graph = new Graph({
  plugins: [
    {
      type: 'snapline',
      key: 'my-snapline', // Specify unique identifier
      tolerance: 5, // Alignment snap threshold
      offset: 20, // Guide line extension distance
      autoSnap: true, // Enable automatic snapping
    },
  ],
});
```

## Live Demo

<embed src="@/common/api/plugins/snapline.md"></embed>

## Options

| Property            | Description                                                                                                                                                                                            | Type                                      | Default                 | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ----------------------- | -------- |
| type                | Plugin type                                                                                                                                                                                            | string                                    | `'snapline'`            | ✓        |
| key                 | Plugin unique identifier                                                                                                                                                                               | string                                    | -                       |          |
| tolerance           | The alignment accuracy, that is, when the distance between the moved node and the target position is less than tolerance, the alignment line is displayed                                              | number                                    | 5                       |          |
| offset              | The extension distance of the snapline                                                                                                                                                                 | number                                    | 20                      |          |
| autoSnap            | Whether to enable automatic snapping                                                                                                                                                                   | boolean                                   | true                    |          |
| shape               | Specifies which shape on the element to use as the reference shape:<br/>- `'key'`: uses the key shape of the element as the reference shape<br/>- `Function`: receives the element and returns a shape | string \| ((node: Node) => DisplayObject) | `'key'`                 |          |
| verticalLineStyle   | Vertical snapline style                                                                                                                                                                                | BaseStyleProps                            | `{ stroke: '#1783FF' }` |          |
| horizontalLineStyle | Horizontal snapline style                                                                                                                                                                              | BaseStyleProps                            | `{ stroke: '#1783FF' }` |          |
| filter              | Filter nodes that do not need to participate in alignment                                                                                                                                              | (node: Node) => boolean                   | `() => true`            |          |

### shape

The `shape` property specifies the reference shape for elements and supports the following configurations:

```js
// Use the key shape as reference
{
  type: 'snapline',
  shape: 'key'
}

// Use custom function to return reference shape
{
  type: 'snapline',
  shape: (node) => {
    return node.getShape('custom-shape');
  }
}
```

### Snapline Styles

You can customize the styles for both horizontal and vertical alignment lines:

```js
{
  type: 'snapline',
  horizontalLineStyle: {
    stroke: '#1890ff',
    lineWidth: 1,
  },
  verticalLineStyle: {
    stroke: '#1890ff',
    lineWidth: 1,
  }
}
```

## Code Examples

### Basic Snapline

The simplest usage:

```js
const graph = new Graph({
  plugins: ['snapline'],
});
```

### Custom Configuration

You can customize the snapline behavior according to your needs:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'snapline',
      tolerance: 8, // Larger snap range
      offset: 30, // Longer extension lines
      horizontalLineStyle: {
        stroke: '#1890ff',
        lineWidth: 2,
      },
      filter: (node) => node.id !== 'node-0', // Filter nodes by id, exclude from alignment
    },
  ],
});
```

## Live Example

<Playground path="plugin/snapline/demo/basic.js" rid="snapline-basic"></Playground>
