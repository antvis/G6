---
title: Transform a Shape or a Graphics Group
order: 3
---

### G6 3.2

In G6 3.2 and previous versions, you can transform a shape as below:

#### transform(ts)

Transform a shape with multiple operations. `ts` is the array of the operations, which will be executed in order.

For example, there is a rect shape:

```javascript
const rect = group.addShape('rect', {
  attrs: {
    width: 100,
    height: 100,
    x: 100,
    y: 100,
    fill: '#9EC9FF',
    stroke: '#5B8FF9',
    lineWidth: 3,
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'rect-shape',
});
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lkUoTp5xXmoAAAAAAAAAAABkARQnAQ' width='200' alt='img'/>

Now, we call the transform:

```javascript
rect.transform([
  ['t', 10, 10], // translate 10 pixels alone x-axis, and 10 pixels alone y-axis
  ['s', 0.1, 1.2], // scale 1.2 times
  ['r', Math.PI / 4], // rotate 45 degree
]);
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*jN3HQbHZ4dIAAAAAAAAAAABkARQnAQ' width='200' alt='img'/>

#### translate(x, y)

Translate the shape or group with vector (x, y).

#### move(x, y)

Translate the shape or group with vector (x, y).

#### rotate(radian)

Rotate the shape or group with `radian`.

#### scale(sx, sy)

Scale the shape or group to sx times on x-axis and sy times on y-axis.

#### resetMatrix()

Clear the matrix to reset all the transformantions on the shape or group.

#### getTotalMatrix()

Get all the transformations of the shape or group.

### G6 3.3

After G6 3.3, the following transform methods are discarded:

- 🗑 translate;
- 🗑 move;
- 🗑 scale;
- 🗑 rotate;
- 🗑 rotateAtStart: rotate the shape or group with center (0, 0)。

To achive some transformation in G6 3.3, you should set the matrix value manually:

- Get the current matrix of a shape or a group: getMatrix();
- Set the matrix to a shape or a group: setMatrix(matrix) or attr('matrix', matrix);
- Reset the matrix: resetMatrix().

We provide the function for transformantion:

```javascript
import { ext } from '@antv/matrix-util';

const transform = ext.transform;

// transform a 3*3 matrix
transform(m, [
  ['t', x, y], // translate with vector (x, y)
  ['r', Math.PI], // rotate
  ['s', 2, 2], // scale at x-axis and y-axis
]);
```

#### Example

The following code registers a custom node with a transfromed rect with: translation with vector `(100, 50)`, rotating with angle `Math.PI / 4`, magnifying 2 times on x-axis and 0.5 times on y-axis:

```javascript
import { ext } from '@antv/matrix-util';

const transform = ext.transform;

G6.registerNode('example', {
  drawShape: (cfg, group) => {
    const rect = group.addShape('rect', {
      attrs: {
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        fill: '#9EC9FF',
        stroke: '#5B8FF9',
        lineWidth: 3,
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'rect-shape',
    });
    let matrix = rect.getMatrix();

    // the init matrix for a shape or a group is null, initiate it with unit matrix
    if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    // transform a 3*3 matrix
    const newMatrix = transform(matrix, [
      ['t', 100, 50], // translate
      ['r', Math.PI / 4], // rotate
      ['s', 2, 0.5], // scale
    ]);

    rect.setMatrix(newMatrix);
  },
});
```
