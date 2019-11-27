---
title: Attributes of Node
order: 0
---

### Common Attribute

**Attribute**

| Name | Description | Remark |
| --- | --- | --- |
| fill | The color or gradient color for filling. | The corresponding attribute in canvas is `fillStyle`. |
| stroke | The color, gradient color, or pattern for stroke. | The corresponding attribute in canvas is `strokeStyle`. |
| shadowColor | The color for shadow. |  |
| shadowBlur | The blur level for shadow. | Larger the value, more blur. |
| shadowOffsetX | The horizontal offset of the shadow. |  |
| shadowOffsetY | The vertical offset of the shadow. |  |
| opacity | The opacity (alpha value) of the shape. | The corresponding attribute in canvas is  `globalAlpha`. |

**Usage**
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

### Circle

**Attribute**

| Name | Description | Remark |
| --- | --- | --- |
| x | The x of the center of the circle. |  |
| y | The y of the center of the circle. |  |
| r | The radius of the circle. |  |


**Usage**
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

### Ellipse

**Attribute**

| Name | Description | Remark |
| --- | --- | --- |
| x | The x of the center of the ellipse. |  |
| y | The y of the center of the ellipse. |  |
| rx | The horizontal raidus of the ellipse. |  |
| ry | The vertical raidus of the ellipse. |  |

 

**Usage**
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


### Fan

**Attribute**

| Name | Description | Remark |
| --- | --- | --- |
| x | The x of the center of the fan. |  |
| y | The y of the center of the fan. |  |
| rs | The horizontal raidus of the fan. |  |
| re | The vertical raidus of the fan. |  |
| startAngle | The start angle. | Radian system represented by Math.PI. |
| endAngle |  The end angle. |  |
| clockwise | It will be rendered clockwisely if it is `true`, counterclockwisely if it is `false`. |  |



**Usage**
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


### Image

**Attribute**

| Name | Description | Remark |
| --- | --- | --- |
| x | The x of the left top of the image. |  |
| y | The y of the left top of the image. |  |
| width | The width of the image. |  |
| height | The height of the image. |  |
| img | The source of the image. | G6 supports multiple image formats: <br />- url<br />- ImageData<br />- Image<br />- canvas<br /> |



**Usage**
```javascript
group.addShape('image', {
  attrs: {
    x: 0,
    y: 0,
    img:'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png'
  }
})
```


### Marker

**Attribute**

| Name | Description | Remark |
| --- | --- | --- |
| x | The x of the center of the marker. |  |
| y | The y of the center of the marker. |  |
| r | The radius of the marker. |  |
| symbol | The shape name. | There are several built-in shapes: `circle`, `square`, `diamond`, `triangle`, `triangle-down`. And user could custom a shape as marker. |



**Usage**
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
        [ 'L'，x + r * 2, y ],
        [ 'Z' ]
      ]
    }
  }
});
```


### Polygon

**Attribute**

| Name | Description | Remark |
| --- | --- | --- |
| points | The coordinates of the points on the polygon. | It is an array. |



**Usage**
```javascript
group.addShape('polygon', {
  attrs: {
    points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
    fill: 'red'
  }
});
```


### Rect

**Attribute**

| Name | Description | Remark |
| --- | --- | --- |
| x | The x of left top of the rect. |  |
| y | The y of left top of the rect. |  |
| width | The width of the rect. |  |
| height | The height of the rect. |  |
| radius | The border radius. | It can be an integer or an array, representing the border radii of lefttop, righttop, rightbottom, leftbotton respectively. <br />- `radius = 1` or `radius = [ 1 ]` is equal to `radius = [ 1, 1, 1, 1 ]`<br />- `radius = [ 1, 2 ]` is equal to `radius = [ 1, 2, 1, 2 ]`<br />- `radius: [ 1, 2, 3 ]` is equal to `radius: [ 1, 2, 3, 2 ]`<br /> |

 

**Usage**
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
