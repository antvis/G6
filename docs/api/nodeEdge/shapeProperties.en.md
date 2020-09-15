---
title: Shape Style Properties
order: 6
---

Shape is the basic element on an item (node/edge). The `style` of a node or an edge corresponds to the shape properties of its keyShape (key shape). The `style` in `labelCfg` of a label on a node or an edge corresponds to the properties of text shape.

G6 has these shapes:

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

### Common Property

| Name | Type | Example | Description |
| --- | --- | --- | --- |
| fill | String | - 'rgb(18, 150, 231)' <br/> - '#c193af' <br/>- 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' <br/>- 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff' | The color(RGB or Hex) or [gradient](/en/docs/manual/FAQ/gradient#gatsby-focus-wrapper) color for filling. The corresponding property in canvas is `fillStyle`. |
| stroke | String | - 'rgb(18, 150, 231)' <br/> - '#c193af' <br/>- 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' <br/>- 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff' | The color(RGB or Hex) or [gradient](/en/docs/manual/FAQ/gradient#gatsby-focus-wrapper) color for stroke. The corresponding property in canvas is `strokeStyle`. |
| lineWidth | Number | 2 | The width of the stroke. |
| lineDash | Number/ Number[] | [5, 10] | The lineDash of the stroke | Number[] are the lengths of the lineDash. |
| shadowColor | String | 'rgb(18, 150, 231)' / '#c193a1' | The color for shadow. |
| shadowBlur | Number | 50 | The blur level for shadow. Larger the value, more blur. |
| shadowOffsetX | Number | 10 | The horizontal offset of the shadow. |
| shadowOffsetY | Number | 10 | The vertical offset of the shadow. |
| opacity | Number | 0.8 | The opacity (alpha value) of the shape. The corresponding property in canvas is `globalAlpha`. |
| fillOpacity | Number | 0.8 | The filling opacity (alpha value) of the shape. The priority is higher than `opacity`. Range [0, 1]. |
| strokeOpacity | Number | 0.8 | The stroke opacity (alpha value) of the shape. The priority is higher than `opacity`. Range [0, 1]. |
| cursor | String | 'pointer' | The type of the mouse when hovering the node. The options are the same as [cursor in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) |

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

### setClip(clipCfg)

Sets and returns the clip object.

`clipCfg`

| Name | Description | Type | Remark |
| --- | --- | --- | --- |
| type | The type of shape of clipping | String | Options: `'circle'`, `'rect'`, `'ellipse'` |
| x | The x coordinate of the clipping shape | Number | 0 by default. Only takes effect when the `type` is `'circle'`, `'rect'`, or `'ellipse'` |
| y | The y coordinate of the clipping shape | Number | 0 by default. Only takes effect when the `type` is `'circle'`, `'rect'`, or `'ellipse' |
| show | Whether to clip the image | Boolean | Do not clip by default. |
| r | The radius of circle clipping | Number | Takes effect when the `type` is `'circle'` |
| width | The width of the clipping | Number | Takes effect when the `type` is `'rect'` |
| height | The height of the clipping | Number | Takes effect when the `type` is `'rect'` |
| rx | The major radius of the ellipse clipping | Number | Takes effect when the `type` is `'ellipse'` |
| ry | The minor radius of the ellipse clipping | Number | Takes effect when the `type` is `'ellipse'` |

```javascript
shape.setClip({
  type: 'circle', // circle, rect, ellipse, Polygon, path clip
  attrs: {
    r: 10,
    x: 0,
    y: 0,
  },
```

### getClip()

Get the clip object.

## Circle

### Special Property

| Name | Type   | Description                        |
| ---- | ------ | ---------------------------------- |
| x    | Number | The x of the center of the circle. |
| y    | Number | The y of the center of the circle. |
| r    | Number | The radius of the circle.          |

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

## Ellipse

### Special Property

| Name | Type   | Description                           |
| ---- | ------ | ------------------------------------- |
| x    | Number | The x of the center of the ellipse.   |
| y    | Number | The y of the center of the ellipse.   |
| rx   | Number | The horizontal raidus of the ellipse. |
| ry   | Number | The vertical raidus of the ellipse.   |

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

## Image

### Special Property

| Name | Type | Description |
| --- | --- | --- |
| x | Number | The x of the left top of the image. |
| y | Number | The y of the left top of the image. |
| width | Number | The width of the image. |
| height | Number | The height of the image. |
| img | String | The source of the image.G6 supports multiple image formats: <br />- url<br />- ImageData<br />- Image<br />- canvas<br /> |

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

### Special Property

| Name | Type | Description |
| --- | --- | --- |
| x | Number | The x of the center of the marker. |
| y | Number | The y of the center of the marker. |
| r | Number | The radius of the marker. |
| symbol | String / Function | The shape name.There are several built-in shapes: `'circle'`, `'square'`, `'diamond'`, `'triangle'`, `'triangle-down'`, you can use them with the String names. And user could customize a shape as marker. |

### Usage

```javascript
// use the built-in symbol
group.addShape('marker', {
  attrs: {
    x: 10,
    y: 10,
    r: 10,
    symbol: 'triangle-down',
  },
  // must be assigned in G6 3.3 and later versions. it can be any value you want
  name: 'marker-shape',
});

// custom the symbol with path
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

## Polygon

### Special Property

| Name   | Type  | Description                                   |
| ------ | ----- | --------------------------------------------- |
| points | Array | The coordinates of the points on the polygon. |

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

## Rect

### Special Property

| Name | Type | Description |
| --- | --- | --- |
| x | Number | The x of left top of the rect. |
| y | Number | The y of left top of the rect. |
| width | Number | The width of the rect. |
| height | Number | The height of the rect. |
| radius | Number / Number[] | The border radius. It can be an integer or an array, representing the border radii of lefttop, righttop, rightbottom, leftbotton respectively. <br />- `radius = 1` or `radius = [ 1 ]` is equal to `radius = [ 1, 1, 1, 1 ]`<br />- `radius = [ 1, 2 ]` is equal to `radius = [ 1, 2, 1, 2 ]`<br />- `radius: [ 1, 2, 3 ]` is equal to `radius: [ 1, 2, 3, 2 ]`<br /> |

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

## Path

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> When the edge is too thin to be hitted by mouse, set **lineAppendWidth** to enlarge the hitting area.

### Special Property

| Name | Type | Description |
| --- | --- | --- |
| path | String / Array | The path. Refer to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) |
| startArrow | Boolean / Object | The arrow on the start of the path. When `startArrow` is `true`, show a default arrow on the start of the path. User can custom an arrow by path. |
| endArrow | Boolean / Object | The arrow on the end of the path. When `startArrow` is `true`, show a default arrow on the end of the path. User can custom an arrow by path. |
| lineAppendWidth | Number | The hitting area of the path. Enlarge the hitting area by enlarging its value. |
| lineCap | String | The style of two ends of the path. Options: <br/> - `'bevel'` |

<br/> - `'round'` <br/> - `'miter'`(default) | | lineJoin | String | The style of the intersection of two path. Options: <br/> - `'bevel'` <br/> - `'round'` <br/> - `'miter'`(default) | | lineWidth | Number | The line width of the current path. | | miterLimit | Number | The maximum miter length. | | lineDash | Number / Number[] | The style of the dash line. It is an array that describes the length of gaps and line segments. If the number of the elements in the array is odd, the elements will be dulplicated. Such as [5, 15, 25] will be regarded as [5, 15, 25, 5, 15, 25]. |

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

| Name | Type | Description |
| --- | --- | --- |
| fill | String | The color or gradient color for filling. The corresponding property in Canvas is `fillStyle`. |
| stroke | String | The color, gradient color, or pattern for stroke. The corresponding property in Canvas is `strokeStyle`. |
| shadowColor | String | The color for shadow. |
| shadowBlur | Number | The blur level for shadow. Larger the value, more blur. |
| shadowOffsetX | Number | The horizontal offset of the shadow. |
| shadowOffsetY | Number | The vertical offset of the shadow. |
| opacity | Number | The opacity (alpha value) of the shape. The corresponding property in Canvas is `globalAlpha`. |
| textAlign | String | The align way of the text. Options: `'center'` / `'end'` / `'left'` / `'right'` / `'start'`. `'start'` by default. |
| textBaseline | String | The base line of the text. Options: <br />`'top'` / `'middle'` / `'bottom'` / `'alphabetic'` / `'hanging'`. `'bottom'` by default. |
| fontStyle | String | The font style of the text. The corresponding property in CSS is `font-style` |
| fontVariant | String | The font variant of the text. The corresponding property in CSS is `font-variant` |
| fontWeight | Number | The font weight of the text. The corresponding property in CSS is `font-weight` |
| fontSize | Number | The font size of the text. The corresponding property in CSS is `font-size` |
| fontFamily | String | The font family of the text. The corresponding property in CSS is `font-family` |
| lineHeight | Number | Line height of the text. The corresponding property in CSS is `line-height` |

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

| Name | Type   | Description                  |
| ---- | ------ | ---------------------------- |
| html | String | The HTML value for DOM shape |

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
