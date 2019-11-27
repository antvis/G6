---
title: Attributes of Text
order: 2
---

### Attributes
文本有以下可用的属性。

| Name | Description | Remark |
| --- | --- | --- |
| fill | The color or gradient color for filling. | The corresponding attribute in canvas is `fillStyle`. |
| stroke | The color, gradient color, or pattern for stroke. | The corresponding attribute in canvas is `strokeStyle`. |
| shadowColor | The color for shadow. |  |
| shadowBlur | The blur level for shadow. | Larger the value, more blur. |
| shadowOffsetX | The horizontal offset of the shadow. |  |
| shadowOffsetY | The vertical offset of the shadow. |  |
| opacity | The opacity (alpha value) of the shape. | The corresponding attribute in canvas is `globalAlpha`. |
| font | The font of the text. |  |
| textAlign | The align way of the text. | Options: `'center'` / `'end'` / `'left'` / `'right'` / `'start'`. `'start'` by default. |
| textBaseline | The base line of the text. | Options: <br />`'top'` / `'middle'` / `'bottom'` / `'alphabetic'` / `'hanging'`. `'bottom'` by default. |
| fontStyle | The font style of the text. | The corresponding attribute in css is `font-style` |
| fontVariant | The font variant of the text. | The corresponding attribute in css is `font-variant` |
| fontWeight | The font weight of the text. | The corresponding attribute in css is `font-weight` |
| fontSize | The font size of the text. | The corresponding attribute in css is `font-size` |
| fontFamily | The font family of the text. | The corresponding attribute in css is `font-family` |
| autoRotate | Wheter rotate according to the edge automatically. |  |


### Case
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

Modify the style of text of node as the code above, and we get the result:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*euH9SLcS2IoAAAAAAAAAAABkARQnAQ' width=350>

