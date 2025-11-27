---
title: Indented Tree
order: 16
---

# Indented Tree Layout

## Overview

Indented tree layout represents the hierarchy of tree nodes through indentation in the horizontal direction. Each element occupies a row or column, commonly used in file directory structures, organizational charts, and other scenarios. This layout provides a clear structure for displaying hierarchical relationships.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NBUzRonaOYMAAAAAAAAAAABkARQnAQ' width=175 alt='Indented Tree Layout'/>

## Use Cases

- File directory structure visualization
- Organizational charts
- Classification system display
- Tree-like data where hierarchical relationships need to be emphasized

## Configuration Items

> IndentedLayout supports common layout configuration items and specific configuration items, as shown below.

| Property               | Description                                                         | Type                            | Default    | Required |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------- | ---------- | -------- |
| type                   | Layout type, must be 'indented'                                     | 'indented'                      | -          | ✓        |
| direction              | Layout direction, see details below                                 | 'LR' \| 'RL' \| 'H'             | 'LR'       |          |
| indent                 | Column spacing, fixed value or function                             | number \| (d?: Node) => number  | 20         |          |
| getWidth               | Get each node's width, effective when direction='H'                 | (d?: Node) => number            | -          |          |
| getHeight              | Get each node's height                                              | (d?: Node) => number            | -          |          |
| getSide                | Node placement on left/right side of root, overrides direction='H'  | (d?: Node) => 'left' \| 'right' | -          |          |
| dropCap                | Whether the first child of each node starts on the next line        | boolean                         | true       |          |
| isLayoutInvisibleNodes | Whether invisible nodes participate in layout (when preLayout=true) | boolean                         | false      |          |
| nodeFilter             | Nodes participating in this layout                                  | (node: NodeData) => boolean     | () => true |          |
| preLayout              | Use pre-layout, calculate layout before initializing elements       | boolean                         | false      |          |
| enableWorker           | Whether to run layout in WebWorker                                  | boolean                         | -          |          |
| iterations             | Number of iterations for iterative layout                           | number                          | -          |          |

### Complex Type Explanations

- **direction**

  - `'LR'`: Root node on the left, layout to the right
    <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mq6YSIKrAt0AAAAAAAAAAABkARQnAQ' width=110 alt='LR'/>
  - `'RL'`: Root node on the right, layout to the left
    <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VGEnRbpvxlUAAAAAAAAAAABkARQnAQ' width=90 alt='RL'/>
  - `'H'`: Root node in the middle, horizontal symmetric layout
    <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vek6RqtUXNcAAAAAAAAAAABkARQnAQ' width=160 alt='H'/>

- **indent**

  - Fixed value: Consistent indentation for all levels
  - Function: (d?: Node) => number, customize indentation based on node
  - Example:
    ```js
    (d) => {
      if (d.parent?.id === 'testId') return d.parent.x + 50;
      return 100;
    };
    ```

- **getWidth/getHeight**

  - Used to customize each node's width/height, often for content adaptation
  - Example:
    ```js
    (d) => (d.id === 'testId' ? 50 : 100);
    ```

- **getSide**
  - Specifies which side of the root node a node should be placed, only effective when direction='H'
  - Example:
    ```js
    (d) => (d.id === 'testId' ? 'left' : 'right');
    ```

## Example Code

> For more examples, see [Online Demo](https://g6.antv.antgroup.com/en/examples/layout/indented)

### Automatic Child Node Distribution

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Kc63QoxgLNYAAAAAAAAAAAAADmJ7AQ/original" width="300" />

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data),
      autoFit: 'view',
      layout: {
        type: 'indented',
        direction: 'H',
        indent: 80,
        getHeight: () => 16,
        getWidth: () => 32,
      },
    });
    graph.render();
  });
```

### Right Side Child Node Distribution

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3PioQ4TAMx8AAAAAAAAAAAAADmJ7AQ/original" width="300" />

```js
// ... code as above, layout.direction: 'LR'
```

### Left Side Child Node Distribution

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*o6uzQ5nmXJkAAAAAAAAAAAAADmJ7AQ/original" width="300" />

```js
// ... code as above, layout.direction: 'RL'
```

### Custom Child Node Distribution

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Kc63QoxgLNYAAAAAAAAAAAAADmJ7AQ/original" width="300" />

```js
layout: {
  type: 'indented',
  direction: 'H',
  indent: 80,
  getHeight: () => 16,
  getWidth: () => 32,
  getSide: (d) => {
    if (d.id === 'Regression' || d.id === 'Classification') return 'left';
    return 'right';
  },
}
```

### No Line Break for First Child Node

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bC-pRrO7srwAAAAAAAAAAAAADmJ7AQ/original" width="300" />

```js
layout: {
  type: 'indented',
  direction: 'LR',
  indent: 80,
  getHeight: () => 16,
  getWidth: () => 32,
  dropCap: false,
}
```
