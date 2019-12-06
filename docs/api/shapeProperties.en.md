---
title: Shape Properties
order: 4
---

Shape is the basic element on an item (node/edge). The `style` of a node or an edge corresponds to the shape properties of its keyShap (key shape). The `style` in `labelCfg` of a label on a node or an edge corresponds to the properties of text shape.

G6 has these shapes:
- [circle](#circle);
- [rect](#rect);
- [ellipse](#ellipse);
- [polygon](#polygon);
- [fan](#fan);
- [image](#image);
- [marker](#marker);
- [path](#path);
- [text](#text).

### Common Property

| Name | Description | Remark |
| --- | --- | --- |
| fill | The color or gradient color for filling. | The corresponding property in canvas is `fillStyle`. |
| stroke | The color, gradient color, or pattern for stroke. | The corresponding property in canvas is `strokeStyle`. |
| shadowColor | The color for shadow. |  |
| shadowBlur | The blur level for shadow. | Larger the value, more blur. |
| shadowOffsetX | The horizontal offset of the shadow. |  |
| shadowOffsetY | The vertical offset of the shadow. |  |
| opacity | The opacity (alpha value) of the shape. | The corresponding property in canvas is  `globalAlpha`. |

## Usage
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

### Special Property

| Name | Description |
| --- | --- |
| x | The x of the center of the circle. |
| y | The y of the center of the circle. |
| r | The radius of the circle. |


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

### Ellipse

### Special Property

| Name | Description |
| --- | --- |
| x | The x of the center of the ellipse. |
| y | The y of the center of the ellipse. |
| rx | The horizontal raidus of the ellipse. |
| ry | The vertical raidus of the ellipse. |

 

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


### Fan

### Special Property

| Name | Description | Remark |
| --- | --- | --- |
| x | The x of the center of the fan. |  |
| y | The y of the center of the fan. |  |
| rs | The horizontal raidus of the fan. |  |
| re | The vertical raidus of the fan. |  |
| startAngle | The start angle. | Radian system represented by Math.PI. |
| endAngle |  The end angle. | Radian system represented by Math.PI. |
| clockwise | It will be rendered clockwisely if it is `true`, counterclockwisely if it is `false`. |  |



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


### Image

### Special Property

| Name | Description | Remark |
| --- | --- | --- |
| x | The x of the left top of the image. |  |
| y | The y of the left top of the image. |  |
| width | The width of the image. |  |
| height | The height of the image. |  |
| img | The source of the image. | G6 supports multiple image formats: <br />- url<br />- ImageData<br />- Image<br />- canvas<br /> |



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


### Marker

### Special Property

| Name | Description | Remark |
| --- | --- | --- |
| x | The x of the center of the marker. |  |
| y | The y of the center of the marker. |  |
| r | The radius of the marker. |  |
| symbol | The shape name. | There are several built-in shapes: `circle`, `square`, `diamond`, `triangle`, `triangle-down`. And user could customize a shape as marker. |



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
        [ 'L'，x + r * 2, y ],
        [ 'Z' ]
      ]
    }
  }
});
```


### Polygon

### Special Property

| Name | Description | Remark |
| --- | --- | --- |
| points | The coordinates of the points on the polygon. | It is an array. |



### Usage
```javascript
group.addShape('polygon', {
  attrs: {
    points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
    fill: 'red'
  }
});
```


### Rect

### Special Property

| Name | Description | Remark |
| --- | --- | --- |
| x | The x of left top of the rect. |  |
| y | The y of left top of the rect. |  |
| width | The width of the rect. |  |
| height | The height of the rect. |  |
| radius | The border radius. | It can be an integer or an array, representing the border radii of lefttop, righttop, rightbottom, leftbotton respectively. <br />- `radius = 1` or `radius = [ 1 ]` is equal to `radius = [ 1, 1, 1, 1 ]`<br />- `radius = [ 1, 2 ]` is equal to `radius = [ 1, 2, 1, 2 ]`<br />- `radius: [ 1, 2, 3 ]` is equal to `radius: [ 1, 2, 3, 2 ]`<br /> |

 

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

## Path
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> When the edge is too thin to be hitted by mouse, set **lineAppendWidth** to enlarge the hitting area.

### Special Property

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


### Usage
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


## Text
### Properties

| Name | Description | Remark |
| --- | --- | --- |
| fill | The color or gradient color for filling. | The corresponding property in Canvas is `fillStyle`. |
| stroke | The color, gradient color, or pattern for stroke. | The corresponding property in Canvas is `strokeStyle`. |
| shadowColor | The color for shadow. |  |
| shadowBlur | The blur level for shadow. | Larger the value, more blur. |
| shadowOffsetX | The horizontal offset of the shadow. |  |
| shadowOffsetY | The vertical offset of the shadow. |  |
| opacity | The opacity (alpha value) of the shape. | The corresponding property in Canvas is `globalAlpha`. |
| font | The font of the text. |  |
| textAlign | The align way of the text. | Options: `'center'` / `'end'` / `'left'` / `'right'` / `'start'`. `'start'` by default. |
| textBaseline | The base line of the text. | Options: <br />`'top'` / `'middle'` / `'bottom'` / `'alphabetic'` / `'hanging'`. `'bottom'` by default. |
| fontStyle | The font style of the text. | The corresponding property in CSS is `font-style` |
| fontVariant | The font variant of the text. | The corresponding property in CSS is `font-variant` |
| fontWeight | The font weight of the text. | The corresponding property in CSS is `font-weight` |
| fontSize | The font size of the text. | The corresponding property in CSS is `font-size` |
| fontFamily | The font family of the text. | The corresponding property in CSS is `font-family` |
| autoRotate | Wheter rotate the text according to the edge automatically if it is a label of an edge. |  |


### Usage

```javascript
group.addShape('text', {
  attrs: {
    text: 'test text',
    fill: 'red',
    fontWeight: 400,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowColor: 'blue',
    shadowBlur: 10
  }
});
```
