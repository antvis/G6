---
title: Graphics Shape Properties
order: 1
---

An item (node/edge) in G6 **Consists of One or More** [**Graphics Shape**](/en/docs/manual/middle/elements/shape-keyshape). You can add shapes to a custom item by `group.addShape` in the `draw` function of registering item. The shapes in G6:

- [circle](#circle);
- [rect](#rect);
- [ellipse](#ellipse);
- [polygon](#polygon);
- [fan](#fan);
- [image](#image);
- [marker](#marker);
- [path](#path);
- [text](#text);
- [dom(svg)](#dom-svg): DOM (available only when the `renderer` of Graph instance is `'svg'`).

## The Common Properties of Shapes

| Name | Description | Remark |
| --- | --- | --- |
| fill | The color or gradient color for filling. | The corresponding property in canvas is `fillStyle`. |
| stroke | The color, gradient color, or pattern for stroke. | The corresponding property in canvas is `strokeStyle`. |
| lineWidth | The width of the stroke |  |
| lineDash | The lineDash of the stroke | Number[] are the lengths of the lineDash |
| shadowColor | The color for shadow. |  |
| shadowBlur | The blur level for shadow. | Larger the value, more blur. |
| shadowOffsetX | The horizontal offset of the shadow. |  |
| shadowOffsetY | The vertical offset of the shadow. |  |
| opacity | The opacity (alpha value) of the shape. | The corresponding property in canvas is `globalAlpha`. |
| cursor | The type of the mouse when hovering the node. The options are the same as [cursor in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) |  |

### Usage

```javascript
group.addShape('rect', {
  attrs: {
    fill: 'red',
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowColor: 'blue',
    shadowBlur: 10,
    opacity: 0.8,
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'rect-shape',
});
```

## The Common Functions of Shapes

### attr()

Get or set the shape's attributes.

### attr(name)

Get the shape's attribute named `name`.

```javascript
const width = shape.attr('width');
```

### attr(name, value)

Update the shape's attribute named `name` with `value`.

### attr({...})

Update the shape's multiple attributes.

```javascript
rect.attr({
  fill: '#999',
  stroke: '#666',
});
```

## Circle

### Property

| Name | Description                    |
| ---- | ------------------------------ |
| x    | The x coordinate of the center |
| y    | The y coordinate of the center |
| r    | The radius                     |

### Usage

```javascript
group.addShape('circle', {
  attrs: {
    x: 100,
    y: 100,
    r: 50,
    fill: 'blue',
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'circle-shape',
});
```

## Rect

### Property

| Name | Description | Remark |
| --- | --- | --- |
| x | The x coordinate of the left top |  |
| y | The y coordinate of the left top |  |
| width | The width of the rect |  |
| height | The height of the rect |  |
| radius | The border radius. | It can be an integer or an array, representing the border radii of lefttop, righttop, rightbottom, leftbotton respectively. <br />- `radius: 1` or `radius: [ 1 ]` is equal to `radius: [ 1, 1, 1, 1 ]`<br />- `radius: [ 1, 2 ]` is equal to `radius: [ 1, 2, 1, 2 ]`<br />- `radius: [ 1, 2, 3 ]` is equal to `radius: [ 1, 2, 3, 2 ]`<br /> |

### Usage

```javascript
group.addShape('rect', {
  attrs: {
    x: 150,
    y: 150,
    width: 150,
    height: 150,
    stroke: 'black',
    radius: [2, 4],
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'rect-shape',
});
```

## Ellipse

### Property

| Name | Description                          |
| ---- | ------------------------------------ |
| x    | The x coordinate of the center       |
| y    | The y coordinate of the center       |
| rx   | The horizontal radius of the ellipse |
| ry   | The vertical radius of the ellipse   |

### Usage

```javascript
group.addShape('ellipse', {
  attrs: {
    x: 100,
    y: 100,
    rx: 50,
    ry: 50,
    fill: 'blue',
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'ellipse-shape',
});
```

## Polygon

### Property

| Name   | Description                                   | Remark         |
| ------ | --------------------------------------------- | -------------- |
| points | A set of vertexes' coordinates of the polygon | It is an array |

### Usage

```javascript
group.addShape('polygon', {
  attrs: {
    points: [
      [30, 30],
      [40, 20],
      [30, 50],
      [60, 100],
    ],
    fill: 'red',
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'polygon-shape',
});
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
    img: 'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png',
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'image-shape',
});
```

## Marker

### Property

| Name | Description | Remark |
| --- | --- | --- |
| x | The x coordinate of the center |  |
| y | The y coordinate of the center |  |
| r | The radius of the marker |  |
| symbol | The shape | We built in some commonly used shapes for it: `circle`, `square`, `diamond`, `triangle`, and `triangle-down`. You can customize it by path |

### Usage

```javascript
group.addShape('marker', {
  attrs: {
    x: 10,
    y: 10,
    r: 10,
    symbol: function (x, y, r) {
      return [['M', x, y], ['L', x + r, y + r], ['L', x + r * 2, y], ['Z']];
    },
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'marker-shape',
});
```

## Path

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️Attention:</strong> </span> When the edge is too thin to be hitted by mouse, set **lineAppendWidth** to enlarge the hitting area.

### Property

| Name | Description | Remark |
| --- | --- | --- |
| path | The path. | It can be a String, or an Array of path |
| startArrow | The arrow on the start of the path | When `startArrow` is `true`, show a default arrow on the start of the path. User can customize an arrow by path |
| endArrow | The arrow on the end of the path | When `startArrow` is `true`, show a default arrow on the end of the path. User can customize an arrow by path |
| lineAppendWidth | The hitting area of the path | Enlarge the hitting area by enlarging its value |
| lineCap | The style of two ends of the path |  |
| lineJoin | The style of the intersection of two path |  |
| lineWidth | The line width of the current path |  |
| miterLimit | The maximum miter length |  |
| lineDash | The style of the dash line | It is an array that describes the length of gaps and line segments. If the number of the elements in the array is odd, the elements will be dulplicated. Such as [5, 15, 25] will be regarded as [5, 15, 25, 5, 15, 25] |

### Usage

```javascript
group.addShape('path', {
  attrs: {
    startArrow: {
      // The custom arrow is a path points at (0, 0), and its tail points to the positive direction of x-axis
      path: 'M 0,0 L 20,10 L 20,-10 Z',
      // the offset of the arrow, nagtive value means the arrow is moved alone the positive direction of x-axis
      // d: -10
    },
    endArrow: {
      // The custom arrow is a path points at (0, 0), and its tail points to the positive direction of x-axis
      path: 'M 0,0 L 20,10 L 20,-10 Z',
      // the offset of the arrow, nagtive value means the arrow is moved alone the positive direction of x-axis
      // d: -10
    },
    path: [
      ['M', 100, 100],
      ['L', 200, 200],
    ],
    stroke: '#000',
    lineWidth: 8,
    lineAppendWidth: 5,
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'path-shape',
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
| textAlign | The align way of the text. | Options: `'center'` / `'end'` / `'left'` / `'right'` / `'start'`. `'start'` by default. |
| textBaseline | The base line of the text. | Options: <br />`'top'` / `'middle'` / `'bottom'` / `'alphabetic'` / `'hanging'`. `'bottom'` by default. |
| fontStyle | The font style of the text. | The corresponding property in CSS is `font-style` |
| fontVariant | The font variant of the text. | The corresponding property in CSS is `font-variant` |
| fontWeight | The font weight of the text. | The corresponding property in CSS is `font-weight` |
| fontSize | The font size of the text. | The corresponding property in CSS is `font-size` |
| fontFamily | The font family of the text. | The corresponding property in CSS is `font-family` |
| lineHeight | Line height of the text | The corresponding property in CSS is `line-height` |

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
    shadowBlur: 10,
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'text-shape',
});
```

## DOM (svg)

> This shape is available only when the `renderer` is assgined to `'svg'` for graph instance.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span>

- Only support native HTML DOM, but not react or other components;
- If you custom a Node type or an Edge type with dom shape, please use the original DOM events instead of events of G6.

### Properties

| Name | Description                  | Remark |
| ---- | ---------------------------- | ------ |
| html | The html value for DOM shape |        |

### Usage

```javascript
group.addShape('dom', {
  attrs: {
    width: cfg.size[0],
    height: cfg.size[1],
    // DOM's html
    html: `
    <div style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${
      cfg.size[0] - 5
    }px; height: ${cfg.size[1] - 5}px; display: flex;">
      <div style="height: 100%; width: 33%; background-color: #CDDDFD">
        <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
      </div>
      <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
    </div>
      `,
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'dom-shape',
  draggable: true,
});
```
