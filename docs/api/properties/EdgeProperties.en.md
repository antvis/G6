---
title: Attributes of Edge
order: 1
---

## Common Attribute

| Name | Description | Remark |
| --- | --- | --- |
| fill | The color or gradient color for filling. | The corresponding attribute in canvas is `fillStyle`. |
| stroke | The color, gradient color, or pattern for stroke. | The corresponding attribute in canvas is `strokeStyle`. |
| shadowColor | The color for shadow. |  |
| shadowBlur | The blur level for shadow. | Larger the value, more blur. |
| shadowOffsetX | The horizontal offset of the shadow. |  |
| shadowOffsetY | The vertical offset of the shadow. |  |
| opacity | The opacity (alpha value) of the shape. | The corresponding attribute in canvas is  `globalAlpha`. |



## Path
Attention: when the edge is too thin to be hitted, set **lineAppendWidth** to enlarge the hitting area.

**Attribute**

| Name | Description | Remark |
| --- | --- | --- |
| path | The path. | It can be a String, or an array of path. |
| startArrow | The arrow on the start of the path. | When `startArrow` is `true`, show a default arrow on the start of the path. User can custom an arrow by path. |
| endArrow | The arrow on the end of the path. | When `startArrow` is `true`, show a default arrow on the end of the path. User can custom an arrow by path. |
| lineAppendWidth | The hitting area of the path. | Enlarge the hitting area by enlarge its value. |
| lineCap | The style of two ends of the path. |  |
| lineJoin | The style of the intersect of two path. |  |
| lineWidth | The line width of current path. |  |
| miterLimit | The maximum miter length. |  |
| lineDash | The style of dash line. | It is an array that describes the length of gaps and line segments. If the number of the elements in the array is odd, the elements will be dulplicated. Such as [5, 15, 25] will be regarded as [5, 15, 25, 5, 15, 25]. |


**Usage**
```javascript
group.addShape('path', {
  attrs: {
    startArrow: {
      path: 'M 10,0 L -10,-10 L -10,10 Z',  // The custom arrow is a path centered at (0, 0), and points to the positive direction of x-axis
      d: 10
    },
    endArrow: {
      path: 'M 10,0 L -10,-10 L -10,10 Z',  // The custom arrow is a path centered at (0, 0), and points to the positive direction of x-axis
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
