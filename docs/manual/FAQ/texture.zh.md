---
title: 如何在 G6 中给元素设置纹理
order: 4
---

G6 支持用特定的纹理填充图形。G6 支持的纹理内容可以直接是**图片**或者 **Data URL**。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cPgYSJ2ZfwYAAAAAAAAAAABkARQnAQ' width='750' />

> 说明：`p` 表示使用纹理；绿色的字体为可变量，您可以修改它们以满足您的需求；`a` 表示纹理的重复方式，可选值如下：

> • `a`: 该模式在水平和垂直方向重复；

> • `x`: 该模式只在水平方向重复；

> • `y`: 该模式只在垂直方向重复；

> • `n`: 该模式只显示一次（不重复）。


在[配置节点或边](/zh/docs/manual/tutorial/elements)的样式时，指定 `fill` 属性如下：

```
shape.attr('fill', 'p(a)https://gw.alipay.com/cube.png');
```
