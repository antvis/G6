---
title: Arrow
order: 2
---

No matter built-in edges or [custom edges](/en/docs/manual/advanced/custom-edge), arrows can be assigned to the end or begin position of an edge. There are three kinds of arrows in G6: default arrow, built-in arrow, and custom arrow.

<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GkXiSbN9JJsAAAAAAAAAAABkARQnAQ' width=500 alt='img'/>

## Default Arrow

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fthFSoNbmeAAAAAAAAAAAABkARQnAQ' width=200 alt='img'/>

### Usage

Configure the `endArrow` or `startArrow` to `true` in the `style` of an edge:

```javascript
style: {
  endArrow: true,
  startArrow: true
}
```

## Built-in Arrow

Supported by v3.5.8 and later versions.

### Overview

| Name | Parameters | Usage | Result |
| --- | --- | --- | --- |
| triangle | <div style="width: 150pt">The paramters are arrow's width (10 by default), length (15 by default), and offset (0 by default, corresponds to `d`), respectively.</div> | endArrow: {<br /> path: G6.Arrow.triangle(10, 20, 25),<br /> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*s8LxSZoxSEsAAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |
| vee | <div style="width: 150pt">The paramters are arrow's width (15 by default), length (20 by default), and offset (0 by default, corresponds to `d`), respectively. </div> | endArrow: {<br /> path: G6.Arrow.vee(10, 20, 25),<br /> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2DBOTJfZZS0AAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |
| circle | <div style="width: 150pt">The paramters are arrow's radius (5 by default) and offset (0 by default, corresponds to `d`) respectively. </div> | endArrow: {<br /> path: G6.Arrow.circle(10, 25),<br/> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*h2XSSJrdUHkAAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |
| diamond | <div style="width: 150pt">The paramters are arrow's width (15 by default), length (15 by default), and offset (0 by default, corresponds to `d`), respectively. </div> | endArrow: {<br /> path: G6.Arrow.diamond(10, 20, 25),<br /> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FIHORJpJov0AAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |
| rect | <div style="width: 150pt">The paramters are arrow's width (10 by default), length (10 by default), and offset (0 by default, corresponds to `d`), respectively. </div> | endArrow: {<br /> path: G6.Arrow.rect(10, 20, 25),<br /> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AkBLSoxXptUAAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |
| triangleRect | <div style="width: 150pt">The paramters are triangle's width (15 by default), triangle's length (20 by default), rect's width (15 by default), rect's length (3 by default), gap between the triangle and the rect (3 by default), and offset (0 by default, corresponds to `d`), respectively. </div> | endArrow: {<br /> path: G6.Arrow.triangleRect(15, 15, 15, 3, 5, 25),<br /> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rPPeT4kFVdwAAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |

### Usage

Call `G6.Arrow.arrowName` for the `path` in `style`'s `endArrow` or `startArrow`:

```javascript
style: {
  endArrow: {
    path: G6.Arrow.triangle(10, 20, 25), // Using the built-in edges for the path, parameters are the width, length, offset (0 by default, corresponds to d), respectively
    d: 25
  },
  startArrow: {
    path: G6.Arrow.vee(15, 20, 15), // Using the built-in edges for the path, parameters are the width, length, offset (0 by default, corresponds to d), respectively
    d: 15
  },
}
```

## Custom Arrow

Please follow the [Custom Arrow](/en/docs/manual/advanced/custom-edge) in the Advanced Doc.

## Configure the Arrow Style

Only built-in edges and custom edges can be configured.

#### Configurations

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| fill | false | String | Filling color. No fill by default |
| stroke | false | String | The stroke color. Same as the edge by default |
| lineWidth | false | Number | The line width. Same as the edge by default |
| opacity | false | Number | Opacity |
| strokeOpacity | false | Number | The stroke opacity |
| shadowColor | false | String | The color of the shadow |
| shadowBlur | false | Number | The blur degree of the shadow |
| shadowOffsetX | false | Number | The x offset of the shadow |
| shadowOffsetY | false | Number | The y offset of the shadow |
| lineDash | false | Array | The style of the dash line. It is an array that describes the length of gaps and line segments. If the number of the elements in the array is odd, the elements will be dulplicated. Such as [5, 15, 25] will be regarded as [5, 15, 25, 5, 15, 25] |

#### Usage

```javascript
// Built-in Arrow
style: {
  endArrow: {
    path: G6.Arrow.triangle(10, 20, 25),
    d: 25,
    fill: '#f00',
    stroke: '#0f0',
    opacity: 0.5,
    lineWidth: 3,
    // ...
  },
}


// Custom Arrow
style: {
  endArrow: {
    path: 'M 0,0 L 20,10 L 20,-10 Z',
    d: 5,
    fill: '#f00',
    stroke: '#0f0',
    opacity: 0.5,
    lineWidth: 3,
    // ...
  },
}
```
