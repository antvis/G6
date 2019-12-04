---
title: Graphics Shape Properties
order: 0
---

An item (node/edge) in G6 **Consists of One or More**[**Graphics Shape**](/en/docs/manual/middle/keyConcept). You can add shapes to a custom item by `group.addShape` in the `draw` function of registering item. The shapes in G6:

- circle;
- rect;
- ellipse;
- image;
- text: [Text Properties](/en/docs/manual/advanced/label-properties)；
- fan;
- marker;
- polygon;
- path.

## The Common Properties of Shapes


| Name | Description | Remark |
| --- | --- | --- |
| fill | The color, gradient color, or the pattern for filling | Corresponds to the `fillStyle` of Canvas |
| stroke | The color, gradient color, or pattern for the stroke | Corresponds to the `strokeStyle` of Canvas |
| shadowColor | The color for shadow |  |
| shadowBlur | The blur level for shadow | Larger the value, more blur |
| shadowOffsetX | The horizontal offset of the shadow |  |
| shadowOffsetY | The vertical offset of the shadow  |  |
| opacity | The opacity (alpha value) of the shape | Corresponds to the `globalAlpha` of Canvas |

### Usage
```javascript
group.addShape('rect', {
	attrs: {
  	fill: 'red',
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowColor: 'blue',
    shadowBlur: 10,
    opacity: 0.8
  }
})
```

## Circle
### Property
| Name | Description | Remark |
| --- | --- | --- |
| x | The x coordinate of the center |  |
| y | The y coordinate of the center |  |
| r | The radius |  |


### Usage
```javascript
group.addShape('circle', {
	attrs: {
  	x: 100,
    y: 100,
    r: 50,
    fill: 'blue'
  }
})
```

## Ellipse
### Property
| Name | Description | Remark |
| --- | --- | --- |
| x | The x coordinate of the center |  |
| y | The y coordinate of the center |  |
| rx | The horizontal radius of the ellipse |  |
| ry | The vertical radius of the ellipse |  |

 
### Usage
```javascript
group.addShape('ellipse', {
	attrs: {
  	x: 100,
    y: 100,
    rx: 50,
    ry: 50,
    fill: 'blue'
  }
})
```

## Fan
### Property
| Name | Description | Remark |
| --- | --- | --- |
| x | The x coordinate of the center |  |
| y | The y coordinate of the center |  |
| rs | The horizontal radius of the fan |  |
| re | The vertical radius of the fan |  |
| startAngle | The start angle | Radian system represented by Math.PI |
| endAngle |  The end angle | Radian system represented by Math.PI |
| clockwise | It will be rendered clockwisely if it is `true`, counterclockwisely if it is `false` |  |


### Usage
```javascript
group.addShape('fan', {
  attrs: {
    x: 50,
    y: 50,
    re: 40,
    rs: 30,
    startAngle: 1/2 * Math.PI,
    endAngle: Math.PI,
    clockwise: false,
    fill: '#b7eb8f'
  }
})
```

## Image
### Property
| Name | Description | Remark |
| --- | --- | --- |
| x | The x coordinate of the left top of the image |  |
| y | The y coordinate of the left top of the image |  |
| width | The width of the image |  |
| height | The height of the image |  |
| img | The source of the image | Supports: url, ImageData, Image, and canvas |


### Usage
```javascript
group.addShape('image', {
  attrs: {
    x: 0,
    y: 0,
    img:'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png'
  }
})
```

## Marker
### Property
| Name | Description | Remark |
| --- | --- | --- |
| x | The x coordinate of the center |  |
| y | The y coordinate of the center |  |
| r | The radius of the marker |  |
| symbol | The shape | We built in some commonly used shapes for it: `circle`, `square`, `diamond`, `triangle`, and `triangle-down`. You can custom it by path |


### Usage
```javascript
group.addShape('marker', {
  attrs: {
    x: 10,
    y: 10,
    r: 10,
    symbol: function(x, y, r) {
      return [
        [ 'M', x, y ],
        [ 'L', x + r, y + r ],
        [ 'L', x + r * 2, y ],
        [ 'Z' ]
      ]
    }
  }
});
```

## Polygon
### Property
| Name | Description | Remark |
| --- | --- | --- |
| points | 多边形的所有端点坐标 | 数组形式 |


### Usage
```javascript
group.addShape('polygon', {
  attrs: {
    points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
    fill: 'red'
  }
});
```

## 矩形图形 Rect
### Property
| Name | Description | Remark |
| --- | --- | --- |
| x | 矩形左上角的 x 坐标 |  |
| y | 矩形左上角的 y 坐标 |  |
| width | 矩形的宽度 |  |
| height | 矩形的高度 |  |
| radius | 定义圆角 | 支持整数或数组形式， 分别对应左上、右上、右下、左下角的半径：<br />- radius 缩写为 1 或 [ 1 ] 相当于 [ 1, 1, 1, 1 ]<br />- radius 缩写为 [ 1, 2 ] 相当于 [ 1, 2, 1, 2 ]<br />- radius 缩写为 [ 1, 2, 3 ] 相当于 [ 1, 2, 3, 2 ]<br /> |

 
### Usage
```javascript
group.addShape('rect', {
  attrs: {
    x: 150,
    y: 150,
    width: 150,
    height: 150,
    stroke: 'black',
    radius: [2, 4]
  }
});
```

## 路径 Path
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;注意：</span>
边太细时候点击不中，请设置 `lineAppendWidth` 属性值。
### Property
| Name | Description | Remark |
| --- | --- | --- |
| path |  线条路径 | 可以是 String 形式，也可以是线段的数组。 |
| startArrow | 起始端的箭头 | 为 `true` 时为默认的箭头效果，也可以是一个自定义箭头 |
| endArrow | 末尾端的箭头 | 为 `true` 时为默认的箭头效果，也可以是一个自定义箭头 |
| lineAppendWidth | 边的击中范围 | 提升边的击中范围，扩展响应范围，数值越大，响应范围越广 |
| lineCap | 设置线条的结束端点样式 |  |
| lineJoin | 设置两条线相交时，所创建的拐角形状 |  |
| lineWidth | 设置当前的线条宽度 |  |
| miterLimit | 设置最大斜接长度 |  |
| lineDash | 设置线的虚线样式，可以指定一个数组 | 一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。 |


### Usage
```javascript
group.addShape('path', {
  attrs: {
    startArrow: {
      path: 'M 10,0 L -10,-10 L -10,10 Z',  // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
      d: 10
    },
    endArrow: {
      path: 'M 10,0 L -10,-10 L -10,10 Z',  // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
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



