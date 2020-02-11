---
title: Transform a Shape in G6
order: 6
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
        lineWidth: 3
    },
    // must be assigned in G6 3.3 and later versions. it can be any value you want
    name: 'rect-shape'
});
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lkUoTp5xXmoAAAAAAAAAAABkARQnAQ' width='200' />

Now, we call the transform:

```javascript
rect.transform([
    ['t', 10, 10],        // translate 10 pixels alone x-axis, and 10 pixels alone y-axis
    ['s', 0.1, 1.2],      // scale 1.2 times
    ['r', Math.PI / 4]    // rotate 45 degree
])
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*jN3HQbHZ4dIAAAAAAAAAAABkARQnAQ' width='200' />

### translate(x, y)
实例的相对位移方法。

### move(x, y)
实例的相对位移方法。

### rotate(radian)
根据旋转弧度值对图形进行旋转。

### scale(sx, sy)
对图形进行缩放。

### resetMatrix()
清除图形实例的所有变换效果。

### getTotalMatrix()
获取应用到实例上的所有变换的矩阵。

### G6 3.3
在 G6 3.3 及以上版本中，废弃了 Group / Canvas 上只适用于三阶矩阵的变换函数:
- 🗑  平移函数 translate；
- 🗑  移动函数 move；
- 🗑  缩放函数 scale；
- 🗑  旋转函数 rotate；
- 🗑  以 (0, 0) 点为中心的旋转函数 rotateAtStart。

在 G6 3.3 版本中要应用矩阵变换的效果，需要手动设置矩阵的值:
• 设置矩阵 setMatrix(matrix)；
• 重置矩阵 resetMatrix()；
• 设置矩阵 attr('matrix', matrix)；


为了方面使用，我们提供了矩阵变换的工具方法:
```javascript
import { transform } from '@antv/matrix-util';
// 3*3 矩阵变换，用于二维渲染
trasform(m, [
  ['t', x, y], // translate
  ['r', Math.PI], // rotate
  ['s', 2, 2], // scale
]);
```
