---
title: Fill with Texture in G6
order: 4
---

G6 support filling a shape with texture with **Image** or **Data URL**.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cPgYSJ2ZfwYAAAAAAAAAAABkARQnAQ' width='750' />

> `p` is the flag for using texture; the text in green can be modified to satisfy your requirements; `a` is a way of repeating of the texture, which can be changed into:

> • `a`: Repeat in horizontal and vertical;

> • `x`: Repeat only in horizontal;

> • `y`: Repeat only in vertical;

> • `n`: No repeat.


Assign the `fill` as below while [Configurating the Node or Edge](/en/docs/manual/tutorial/elements):

```
shape.attr('fill', 'p(a)https://gw.alipay.com/cube.png');
```
