---
title: Shape Style Properties
order: 8
---

Shape is the basic element on an item (node/edge). The `style` of a node or an edge corresponds to the shape properties of its keyShape (key shape). The `style` in `labelCfg` of a label on a node or an edge corresponds to the properties of text shape.

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

G6 has these shapes:

- [circle](#circle);
- [rect](#rect);
- [ellipse](#ellipse);
- [polygon](#polygon);
- [image](#image);
- [marker](#marker);
- [path](#path);
- [text](#text);
- [dom(svg)](#dom-svg): DOM (available only when the `renderer` of Graph instance is `'svg'`).

## Common Property

### name

<description> _String_ **required** </description>

Must be assigned in G6 3.3 and later versions. It can be any value you want

### fill

<description> _String_ **optional** </description>

The color(RGB or Hex) or [gradient](/en/docs/manual/middle/elements/advanced-style/gradient) color for filling. The corresponding property in canvas is `fillStyle`. Examples: `rgb(18, 150, 231)`,`#c193af`,`l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff`, `r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff`.

### stroke

<description> _String_ **optional** </description>

The color(RGB or Hex) or [gradient](/en/docs/manual/middle/elements/advanced-style/gradient) color for stroke. The corresponding property in canvas is `strokeStyle`. Examples: `rgb(18, 150, 231)`,`#c193af`,`l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff`, `r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff`.

### lineWidth

<description> _Number_ **optional** </description>

The width of the stroke.

### lineDash

<description> _Number | Number[]_ **optional** </description>

The lineDash of the stroke. If its type is `Number[]`, the elements in the array are the lengths of the lineDash.

### shadowColor

<description> _String_ **optional** </description>

The color of the shadow.

### shadowBlur

<description> _Number_ **optional** </description>

The blur level for shadow. Larger the value, more blur.

### shadowOffsetX

<description> _Number_ **optional** </description>

The horizontal offset of the shadow.

### shadowOffsetY

<description> _Number_ **optional** </description>

The vertical offset of the shadow.

### opacity

<description> _Number_ **optional** </description>

The opacity (alpha value) of the shape. The corresponding property in canvas is `globalAlpha`.

### fillOpacity

<description> _Number_ **optional** </description>

The filling opacity (alpha value) of the shape. The priority is higher than `opacity`. Range [0, 1].

### strokeOpacity

<description> _Number_ **optional** </description>

The stroke opacity (alpha value) of the shape. The priority is higher than `opacity`. Range [0, 1].

### cursor

<description> _String_ **optional** </description>

The type of the mouse when hovering the node. The options are the same as [cursor in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor).

## Circle

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

### x

<description> _Number_ **optional** </description>

The x of the center of the circle.

### y

<description> _Number_ **optional** </description>

The y of the center of the circle.

### r

<description> _Number_ **optional** </description>

The radius of the circle.

## Ellipse

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

### x

<description> _Number_ **optional** </description>

The x of the center of the ellipse.

### y

<description> _Number_ **optional** </description>

The y of the center of the ellipse.

### rx

<description> _Number_ **optional** </description>

The horizontal raidus of the ellipse.

### ry

<description> _Number_ **optional** </description>

The vertical raidus of the ellipse.

## Image

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

### x

<description> _Number_ **optional** </description>

The x of the left top of the image.

### y

<description> _Number_ **optional** </description>

The y of the left top of the image.

### width

<description> _Number_ **optional** </description>

The width of the image.

### height

<description> _Number_ **optional** </description>

The height of the image.

### img

<description> _String_ **optional** </description>

The source of the image.G6 supports multiple image formats: <br />- url<br />- ImageData<br />- Image<br />- canvas<br />.

## Marker

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

### x

<description> _Number_ **optional** </description>

The x of the center of the marker.

### y

<description> _Number_ **optional** </description>

The y of the center of the marker.

### r

<description> _Number_ **optional** </description>

The radius of the marker.

### symbol

<description> _String | Function_ **optional** </description>

The shape name.There are several built-in shapes: `'circle'`, `'square'`, `'diamond'`, `'triangle'`, `'triangle-down'`, you can use them with the String names. And user could customize a shape as marker.

## Polygon

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

### points

<description> _Array_ **optional** </description>

The coordinates of the points on the polygon.

## Rect

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

### x

<description> _Number_ **optional** </description>

The x of left top of the rect.

### y

<description> _Number_ **optional** </description>

The y of left top of the rect.

### width

<description> _Number_ **optional** </description>

The width of the rect.

### height

<description> _Number_ **optional** </description>

The height of the rect.

### radius

<description> _Number | Number[]_ **optional** </description>

The border radius. It can be an integer or an array, representing the border radii of lefttop, righttop, rightbottom, leftbotton respectively. <br />- `radius = 1` or `radius = [ 1 ]` is equal to `radius = [ 1, 1, 1, 1 ]`<br />- `radius = [ 1, 2 ]` is equal to `radius = [ 1, 2, 1, 2 ]`<br />- `radius: [ 1, 2, 3 ]` is equal to `radius: [ 1, 2, 3, 2 ]`<br />

## Path

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> When the edge is too thin to be hitted by mouse, set **lineAppendWidth** to enlarge the hitting area.

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

### path

<description> _String | Array_ **optional** </description>

The path. Refer to [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

### startArrow

<description> _Boolean | Object_ **optional** </description>

The arrow on the start of the path. When `startArrow` is `true`, show a default arrow on the start of the path. User can custom an arrow by path.

### endArrow

<description> _Boolean | Object_ **optional** </description>

The arrow on the end of the path. When `startArrow` is `true`, show a default arrow on the end of the path. User can custom an arrow by path.

### lineAppendWidth

<description> _Number_ **optional** </description>

The hitting area of the path. Enlarge the hitting area by enlarging its value.

### lineCap

<description> _String_ **optional** _default:_ `'miter'`</description>

The style of two ends of the path. Options: <br/> - `'bevel'` <br/> - `'round'` <br/> - `'miter'`(default)

### lineJoin

<description> _String_ **optional** _default:_ `'miter'`</description>

The style of the intersection of two path. Options: <br/> - `'bevel'` <br/> - `'round'` <br/> - `'miter'`(default)

### lineWidth

<description> _Number_ **optional** </description>

The line width of the current path.

### miterLimit

<description> _Number_ **optional** </description>

The maximum miter length.

### lineDash

<description> _Number | Number[]_ **optional** </description>

The style of the dash line. It is an array that describes the length of gaps and line segments. If the number of the elements in the array is odd, the elements will be dulplicated. Such as [5, 15, 25] will be regarded as [5, 15, 25, 5, 15, 25].

## Text

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

### textAlign

<description> _String_ **optional** </description>

The align way of the text. Options: `'center'` / `'end'` / `'left'` / `'right'` / `'start'`. `'start'` by default.

### textBaseline

<description> _String_ **optional** </description>

The base line of the text. Options: <br />`'top'` / `'middle'` / `'bottom'` / `'alphabetic'` / `'hanging'`. `'bottom'` by default.

### fontStyle

<description> _String_ **optional** </description>

The font style of the text. The corresponding property in CSS is `font-style`.

### fontVariant

<description> _String_ **optional** </description>

The font variant of the text. The corresponding property in CSS is `font-variant`.

### fontWeight

<description> _Number_ **optional** </description>

The font weight of the text. The corresponding property in CSS is `font-weight`.

### fontSize

<description> _Number_ **optional** </description>

The font size of the text. The corresponding property in CSS is `font-size`.

### fontFamily

<description> _String_ **optional** </description>

The font family of the text. The corresponding property in CSS is `font-family`.

### lineHeight

<description> _Number_ **optional** </description>

Line height of the text. The corresponding property in CSS is `line-height`.

## DOM (svg)

> This shape is available only when the `renderer` is assgined to `'svg'` for graph instance.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span>

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

- Only support native HTML DOM, but not react or other components;
- If you custom a Node type or an Edge type with dom shape, please use the original DOM events instead of events of G6.

### html

<description> _String_ **optional** </description>

The HTML value for DOM shape.
