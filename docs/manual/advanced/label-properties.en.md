---
title: The Text Property
order: 4
---

## Property

| Name | Description | Remark |
| --- | --- | --- |
| fill | The color, gradient color, or the pattern for filling | Corresponds to the `fillStyle` of Canvas |
| stroke | The color, gradient color, or pattern for the stroke | Corresponds to the `strokeStyle` of Canvas |
| shadowColor | The color for shadow |  |
| shadowBlur | The blur level for shadow | Larger the value, more blur |
| shadowOffsetX | The horizontal offset of the shadow |  |
| shadowOffsetY | The vertical offset of the shadow  |  |
| opacity | The opacity (alpha value) of the shape | Corresponds to the `globalAlpha` of Canvas |
| font | The font |  |
| textAlign | The align way of the text. | Options: `'center'` / `'end'` / `'left'` / `'right'` / `'start'`. `'start'` by default. |
| textBaseline | The base line of the text. | Options: <br />`'top'` / `'middle'` / `'bottom'` / `'alphabetic'` / `'hanging'`. `'bottom'` by default. |
| fontStyle | The font style of the text. | The corresponding property in CSS is `font-style` |
| fontVariant | The font weight of the text. | The corresponding property in CSS is `font-weight` |
| fontWeight | 字体粗细 | 对应 font-weight |
| fontSize | The font size of the text. | The corresponding property in CSS is `font-size` |
| fontFamily | The font family of the text. | The corresponding property in CSS is `font-family` |
| autoRotate | Wheter rotate the text according to the edge automatically if it is a label of an edge. |  |

## Example
```javascript
const data = {
	nodes: [
  	{
      id: 'node1',
      x: 100,
      y: 100,
      shape: 'rect',
      label: 'rect'
    }
  ]
}

const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500
});
graph.data(data);
graph.render();

const node = graph.findById('node1')
graph.update(node, {
  style: {
    stroke: 'blue'
  },
  labelCfg: {
    style: {
      fill: 'red',
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowColor: 'blue',
      shadowBlur: 10
    }
  }
})
```

The code above modifies the label style of node and results in:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0xkLS5shGJUAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>