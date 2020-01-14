---
title: How to supports texture in G6
order: 8
---

G6 支持用特定的纹理填充图形。G6支持的纹理内容可以直接是**图片**或者 **Data URLs**。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cPgYSJ2ZfwYAAAAAAAAAAABkARQnAQ' width='750' />

> tips：p means use texture，绿色的字体为可变量，由用户自己填写。

• a: repeat in vertical and horizontal direction；
• x: repeat in horizontal direction；
• y: repeat in vertical direction；
• n: not repeat，show only once。

```
shape.attr('fill', 'p(a)https://gw.alipay.com/cube.png');
```
