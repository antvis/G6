---
title: Edge Properties
order: 1
---

## Common Property

| Name | Description | Remark |
| --- | --- | --- |
| fill | The color or gradient color for filling | The corresponding property in canvas is `fillStyle` |
| stroke | The color, gradient color, or pattern for stroke | The corresponding property in canvas is `strokeStyle` |
| shadowColor | The color for shadow |  |
| shadowBlur | The blur level for shadow | Larger the value, more blur |
| shadowOffsetX | The horizontal offset of the shadow |  |
| shadowOffsetY | The vertical offset of the shadow |  |
| opacity | The opacity (alpha value) of the shape | The corresponding property in canvas is  `globalAlpha` |



## Path
⚠️**Attention:** When the edge is too thin to be hitted by mouse, set **lineAppendWidth** to enlarge the hitting area.

**Property**

| Name | Description | Remark |
| --- | --- | --- |
| path | The path. | It can be a String, or an Array of path. |
| startArrow | The arrow on the start of the path. | When `startArrow` is `true`, show a default arrow on the start of the path. User can custom an arrow by path. |
| endArrow | The arrow on the end of the path. | When `startArrow` is `true`, show a default arrow on the end of the path. User can custom an arrow by path. |
| lineAppendWidth | The hitting area of the path. | Enlarge the hitting area by enlarging its value. |
| lineCap | The style of two ends of the path. |  |
| lineJoin | The style of the intersection of two path. |  |
| lineWidth | The line width of the current path. |  |
| miterLimit | The maximum miter length. |  |
| lineDash | The style of the dash line. | It is an array that describes the length of gaps and line segments. If the number of the elements in the array is odd, the elements will be dulplicated. Such as [5, 15, 25] will be regarded as [5, 15, 25, 5, 15, 25]. |


**Usage**
```javascript
group.addShape('path', {
  attrs: {
    startArrow: {
      // The custom arrow is a path centered at (0, 0), and points to the positive direction of x-axis
      path: 'M 10,0 L -10,-10 L -10,10 Z',
      d: 10
    },
    endArrow: {
      // The custom arrow is a path centered at (0, 0), and points to the positive direction of x-axis
      path: 'M 10,0 L -10,-10 L -10,10 Z',
      d: 10
    },
    path: [
      [ 'M', 100, 100 ],
      [ 'L', 200, 200 ]
    ],
    stroke: '#000',
    lineWidth: 8,
    lineAppendWidth: 5
  }
});
```
