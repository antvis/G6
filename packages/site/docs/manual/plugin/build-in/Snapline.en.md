---
title: Snapline
---

## Overview

The Snapline plugin provides intelligent alignment guidelines for the canvas, automatically displaying guide lines when moving nodes and supporting automatic snapping. It helps users achieve precise alignment and is an important tool for improving efficiency and accuracy in graphic editing.

## Use Cases

The Snapline plugin is mainly suitable for the following scenarios:

- When manually adjusting node positions and precise alignment with other nodes is needed
- When dragging multiple nodes while maintaining their alignment relationships
- When creating standardized graphic layouts to ensure consistency in node spacing and positioning
- When improving node layout efficiency through automatic snapping functionality

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

### Snapline Style Configuration

| Property       | Description             | Type                                     | Default     |
| -------------- | ----------------------- | ---------------------------------------- | ----------- |
| stroke         | Line color              | string \| Pattern \| null                | `'#1783FF'` |
| opacity        | Overall opacity         | number \| string                         | 1           |
| strokeOpacity  | Stroke opacity          | number \| string                         | 1           |
| lineWidth      | Line width              | number \| string                         | 1           |
| lineCap        | Line end style          | `'butt'` \| `'round'` \| `'square'`      | `'butt'`    |
| lineJoin       | Line join style         | `'miter'` \| `'round'` \| `'bevel'`      | `'miter'`   |
| lineDash       | Dash line configuration | number \| string \| (string \| number)[] | -           |
| lineDashOffset | Dash line offset        | number                                   | 0           |
| shadowBlur     | Shadow blur             | number                                   | 0           |
| shadowColor    | Shadow color            | string                                   | -           |
| shadowOffsetX  | Shadow X offset         | number                                   | 0           |
| shadowOffsetY  | Shadow Y offset         | number                                   | 0           |
| cursor         | Mouse cursor style      | string                                   | `'default'` |
| zIndex         | Rendering level         | number                                   | 0           |

Example configuration:

```js
{
  type: 'snapline',
  horizontalLineStyle: {
    stroke: '#F08F56',
    strokeOpacity: 0.8,
    lineWidth: 2,
    lineDash: [4, 4],
    lineDashOffset: 0,
    opacity: 1,
    cursor: 'move',
  },
  verticalLineStyle: {
    stroke: '#17C76F',
    strokeOpacity: 0.8,
    lineWidth: 2,
    lineDash: [4, 4],
    lineDashOffset: 0,
    opacity: 1,
    cursor: 'move',
  },
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
