---
title: Gradient Color for Objects in G6
order: 4
---

In G6, you can set **Linear Gradient** for stroke and **Circular Gradient** for filling color.

### Linear Gradient for Stroke
#### Demonstration
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lX-fSbaOrn0AAAAAAAAAAABkARQnAQ' width='750' />

> `l` is the flag for linear gradient, the text in green can be modified to satisfy your requirements.

#### Usage
Assign the `stroke` as below while [Configurating the Node or Edge](/en/docs/manual/tutorial/elements):

```
// Using the linear gradient for the stroke. The gradient angle is 0, and the begin color is #ffffff, the color of the midpoint is #7ec2f3, and the end color is #1890ff
stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
```

### Circular Gradient for Fill
#### Demonstration
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*U68WTpjAqscAAAAAAAAAAABkARQnAQ' width='750' />

> `r` is the flag for circular gradient, the text in green can be modified to satisfy your requirements. The `x` `y` and `r` are the relative values and range from 0 to 1.

#### Usage
Assign the `fill` as below while [Configurating the Node or Edge](/en/docs/manual/tutorial/elements):

```
// Using the radial gradient for filling color. The center of the circular gradient is the center of the filled shape's bbox(bounding box). The radius is equal to 0.1 multiples the length of the diagonal of the bbox. The begin color is #ffffff, the color of the midpoint is #7ec2f3, and the end color is #1890ff
fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff'
```
