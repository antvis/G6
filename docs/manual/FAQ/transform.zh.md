---
title: 如何在 G6 中实现变换
order: 5
---

### G6 3.2
G6 3.2 及以下版本中，实现变换可通过以下方式。

#### transform(ts)
实例变换方法。参数以数组形式提供，按顺序执行。

例如画布上有以下的一个矩形实例。
```
const rect = group.addShape('rect', {
    attrs: {
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        fill: '#9EC9FF',
        stroke: '#5B8FF9',
        lineWidth: 3
    }
});
```

得到的结果如下图所示：
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lkUoTp5xXmoAAAAAAAAAAABkARQnAQ' width='200' />

对其进行如下操作：
```
rect.transform([
    ['t', 10, 10],        // x 方向平移 10, y 方向平移 10
    ['s', 1.2],           // 缩放 1.2 倍
    ['r', Math.PI / 4]    // 旋转 45 度
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
```
import { transform } from '@antv/matrix-util';
// 3*3 矩阵变换，用于二维渲染
trasform(m, [
  ['t', x, y], // translate
  ['r', Math.PI], // rotate
  ['s', 2, 2], // scale
]);
```
