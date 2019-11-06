---
title: 关键概念-图形 Shape 及其属性
order: 0
---

G6 中的元素（节点/边）是**由一个或多个小**[**图形 Shape**](https://www.yuque.com/antv/g6/shape-crycle)**组成**，主要通过自定义节点或自定义边时在 `draw` 方法中使用 `group.addShape` 添加，G6 中支持以下的图形 Shape：

- circle：圆；
- rect：矩形；
- ellipse：椭圆；
- image：图片；
- text：文本的属性请参考[这里](https://www.yuque.com/antv/g6/gs4gno)；
- fan：扇形；
- marker：标记；
- polygon：多边形；
- path：路径。

<a name="aNduI"></a>
<br />
# 各图形 Shape 的通用属性
<a name="9H2zR"></a>
## 属性
| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| fill | 设置用于填充绘画的颜色、渐变或模式 | 对应 canvas 属性 `fillStyle` |
| stroke | 设置用于笔触的颜色、渐变或模式 | 对应 canvas 属性 `strokeStyle` |
| shadowColor | 设置用于阴影的颜色 |  |
| shadowBlur | 设置用于阴影的模糊级别 | 数值越大，越模糊 |
| shadowOffsetX | 设置阴影距形状的水平距离 |  |
| shadowOffsetY | 设置阴影距形状的垂直距离 |  |
| opacity | 设置绘图的当前 alpha 或透明值 | 对应 canvas 属性 `globalAlpha` |

<a name="QxYqO"></a>
###
<a name="2ZUr3"></a>
## 用法
```javascript
group.addShape('rect', {
	attrs: {
  	fill: 'red',
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowColor: 'blue',
    shadowBlur: 10,
    opacity: 0.8
  }
})
```

<a name="gOIOG"></a>
<br/>
# 圆图形 Circle
<a name="CArMR"></a>
## 属性
| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 圆心的 x 坐标 |  |
| y | 圆心的 y 坐标 |  |
| r | 圆的半径 |  |


<a name="a0ke5"></a>
## 用法
```javascript
group.addShape('circle', {
	attrs: {
  	x: 100,
    y: 100,
    r: 50,
    fill: 'blue'
  }
})
```

<a name="NNRBP"></a>
<br/>
# 椭圆图形 Ellipse
<a name="32fAy"></a>
## 属性
| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 圆心的 x 坐标 |  |
| y | 圆心的 y 坐标 |  |
| rx | 水平半径 |  |
| ry | 垂直半径 |  |

 
<a name="l3U96"></a>
## 用法
```javascript
group.addShape('ellipse', {
	attrs: {
  	x: 100,
    y: 100,
    rx: 50,
    ry: 50,
    fill: 'blue'
  }
})
```

<a name="pSORg"></a>
<br/>
# 扇形图形 Fan
<a name="yWXt5"></a>
## 属性
| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 扇形圆心的 x 坐标 |  |
| y | 扇形圆心的 y 坐标 |  |
| rs | 水平半径 |  |
| re | 垂直半径 |  |
| startAngle | 起点弧度 | 弧度是弧度，即使用 Math.PI 表示 |
| endAngle |  终点弧度 |  |
| clockwise | 为 `true` 时顺时针渲染，为 `false` 时逆时针渲染 |  |


<a name="v1b7K"></a>
## 用法
```javascript
group.addShape('fan', {
  attrs: {
    x: 50,
    y: 50,
    re: 40,
    rs: 30,
    startAngle: 1/2 * Math.PI,
    endAngle: Math.PI,
    clockwise: false,
    fill: '#b7eb8f'
  }
})
```

<a name="rGYRc"></a>
<br/>
# 图片图形 Image
<a name="qwkAb"></a>
## 属性
| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 图片左上角的 x 坐标 |  |
| y |  图片左上角的 y 坐标 |  |
| width | 图片宽度 |  |
| height | 图片高度 |  |
| img | 图片源 | G6 支持多种格式的图片：url、ImageData、Image、canvas |


<a name="Ytf4O"></a>
## 用法
```javascript
group.addShape('image', {
  attrs: {
    x: 0,
    y: 0,
    img:'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png'
  }
})
```

<a name="YbiL0"></a>
<br/>
# 标记图形 Marker
<a name="fPYo8"></a>
## 属性
| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 中心的 x 坐标 |  |
| y | 中心的 y 坐标 |  |
| r | 形状半径 |  |
| symbol | 指定形状 | 内置了一些常用形状，如圆形 `circle` ， 矩形 `square` ， 菱形 `diamond` ，三角形 `triangle` ， 倒三角形 `triangle-down` ，也可以是自定义的 path 路径。 |


<a name="mtgWY"></a>
## 用法
```javascript
group.addShape('marker', {
  attrs: {
    x: 10,
    y: 10,
    r: 10,
    symbol: function(x, y, r) {
      return [
        [ 'M', x, y ],
        [ 'L', x + r, y + r ],
        [ 'L'，x + r * 2, y ],
        [ 'Z' ]
      ]
    }
  }
});
```

<a name="AECxZ"></a>
<br/>
# 多边形图形 Polygon
<a name="t8zCn"></a>
## 属性
| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| points | 多边形的所有端点坐标 | 数组形式 |


<a name="at6GJ"></a>
## 用法
```javascript
group.addShape('polygon', {
  attrs: {
    points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
    fill: 'red'
  }
});
```

<a name="3ZvJX"></a>
<br/>
# 矩形图形 Rect
<a name="TMkjH"></a>
## 属性
| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| x | 矩形左上角的 x 坐标 |  |
| y | 矩形左上角的 y 坐标 |  |
| width | 矩形的宽度 |  |
| height | 矩形的高度 |  |
| radius | 定义圆角 | 支持整数或数组形式， 分别对应左上、右上、右下、左下角的半径：<br />- radius 缩写为 1 或 [ 1 ] 相当于 [ 1, 1, 1, 1 ]<br />- radius 缩写为 [ 1, 2 ] 相当于 [ 1, 2, 1, 2 ]<br />- radius 缩写为 [ 1, 2, 3 ] 相当于 [ 1, 2, 3, 2 ]<br /> |

 
<a name="wd3km"></a>
## 用法
```javascript
group.addShape('rect', {
  attrs: {
    x: 150,
    y: 150,
    width: 150,
    height: 150,
    stroke: 'black',
    radius: [2, 4]
  }
});
```

<a name="zpxpV"></a>
<br/>
# 路径 Path
<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;注意：</span>
边太细时候点击不中，请设置 `lineAppendWidth` 属性值。
<a name="rqoTX"></a>
## 属性
| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| path |  线条路径 | 可以是 String 形式，也可以是线段的数组。 |
| startArrow | 起始端的箭头 | 为 `true` 时为默认的箭头效果，也可以是一个自定义箭头 |
| endArrow | 末尾端的箭头 | 为 `true` 时为默认的箭头效果，也可以是一个自定义箭头 |
| lineAppendWidth | 边的击中范围 | 提升边的击中范围，扩展响应范围，数值越大，响应范围越广 |
| lineCap | 设置线条的结束端点样式 |  |
| lineJoin | 设置两条线相交时，所创建的拐角形状 |  |
| lineWidth | 设置当前的线条宽度 |  |
| miterLimit | 设置最大斜接长度 |  |
| lineDash | 设置线的虚线样式，可以指定一个数组 | 一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。 |


<a name="ovB67"></a>
## 用法
```javascript
group.addShape('path', {
  attrs: {
    startArrow: {
      path: 'M 10,0 L -10,-10 L -10,10 Z',  // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
      d: 10
    },
    endArrow: {
      path: 'M 10,0 L -10,-10 L -10,10 Z',  // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
      d: 10
    },
    path: [
      [ 'M', 100, 100 ],
      [ 'L', 200, 200 ]
    ],
    stroke: '#000',
    lineWidth: 8,
    lineAppendWidth: 5
  }
});
```



