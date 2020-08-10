---
title: The Common Functions of Shapes
order: 7
---

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
