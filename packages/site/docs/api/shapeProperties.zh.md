---
title: 图形样式属性 Shape Attr
order: 8
---

图形是组成图上一个元素（节点/边）的基本单位。节点/边的 `style` 属性即对应了各自 keyShape（关键图形）的图形属性。节点或边上标签 `labelCfg` 中的 `style` 属性对应了 text 图形的图形属性。除一些[通用属性](#通用属性)外，不同图形有各自的特殊属性。

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

G6 支持以下图形：

- [circle](#圆图形-circle)：圆；
- [rect](#矩形图形-rect)：矩形；
- [ellipse](#椭圆图形-ellipse)：椭圆；
- [polygon](#多边形图形-polygon)：多边形；
- [image](#图片图形-image)：图片；
- [marker](#标记图形-marker)：标记；
- [path](#路径-path)：路径；
- [text](#文本-text)：文本；
- [dom(svg)](#dom-svg)：DOM（图渲染方式 `renderer` 为 `'svg'` 时可用）。

## 通用属性

### name

<description> _String_ **required** </description>

图形名称标识，G6 3.3 版本以上必须配置。

### fill

<description> _String_ **optional** </description>

设置用于填充绘画的颜色(RGB 或 16 进制)、[渐变](/zh/docs/manual/middle/elements/advanced-style/gradient)或模式，对应 Canvas 属性 `fillStyle` 。取值示例：`rgb(18, 150, 231)`，`#c193af`，`l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff`， `r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff`。

### stroke

<description> _String_ **optional** </description>

设置用于笔触的颜色(RGB 或 16 进制)、[渐变](/zh/docs/manual/middle/elements/advanced-style/gradient)或模式，对应 Canvas 属性 `strokeStyle`。取值示例：`rgb(18, 150, 231)`，`#c193af`，`l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff`， `r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff`。

### lineWidth

<description> _Number_ **optional** </description>

描边宽度。

### lineDash

<description> _Number | Number[]_ **optional** </description>

描边虚线，Number[] 类型中数组元素分别代表实、虚长度。

### shadowColor

<description> _String_ **optional** </description>

设置用于阴影的颜色。

### shadowBlur

<description> _Number_ **optional** </description>

设置用于阴影的模糊级别，数值越大，越模糊。

### shadowOffsetX

<description> _Number_ **optional** </description>

设置阴影距形状的水平距离。

### shadowOffsetY

<description> _Number_ **optional** </description>

设置阴影距形状的垂直距离。

### opacity

<description> _Number_ **optional** </description>

设置绘图的当前 alpha 或透明值，范围 [0, 1]，对应 Canvas 属性 `globalAlpha`。

### fillOpacity

<description> _Number_ **optional** </description>

设置填充的 alpha 或透明值，优先级高于 opacity，范围 [0, 1]。

### strokeOpacity

<description> _Number_ **optional** </description>

设置描边的 alpha 或透明值，优先级高于 opacity，范围 [0, 1]。

### cursor

<description> _String_ **optional** </description>

鼠标在该节点上时的鼠标样式，[CSS 的 cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) 选项都支持。

## 圆图形 Circle

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

圆心的 x 坐标。

### y

<description> _Number_ **optional** </description>

圆心的 y 坐标。

### r

<description> _Number_ **optional** </description>

圆的半径。

## 椭圆图形 Ellipse

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

圆心的 x 坐标。

### y

<description> _Number_ **optional** </description>

圆心的 y 坐标。

### rx

<description> _Number_ **optional** </description>

水平半径。

### ry

<description> _Number_ **optional** </description>

垂直半径。

## 图片图形 Image

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

图片左上角的 x 坐标。

### y

<description> _Number_ **optional** </description>

图片左上角的 y 坐标。

### width

<description> _Number_ **optional** </description>

图片宽度。

### height

<description> _Number_ **optional** </description>

图片高度。

### img

<description> _String_ **optional** </description>

图片源，G6 支持多种格式的图片：url，ImageData，Image，canvas。

## 标记图形 Marker

```javascript
// 使用内置 symbol
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

// 使用路径自定义 symbol
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

标记图形左上角的 x 坐标。

### y

<description> _Number_ **optional** </description>

标记图形左上角的 y 坐标。

### r

<description> _Number_ **optional** </description>

形状半径。

### symbol

<description> _String | Function_ **optional** </description>

指定形状。我们已经内置了一些常用形状，如圆形 `'circle'`，矩形  `'square'`，菱形  `'diamond'`，三角形  `'triangle'`，倒三角形 `'triangle-down'`，这些内置形状只需要直接将响应 String 赋值给 symbol。也可以是自定义的 path 路径的函数。

## 多边形图形 Polygon

### points

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

多边形的所有端点坐标。

## 矩形图形 Rect

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

矩形左上角的 x 坐标。

### y

<description> _Number_ **optional** </description>

矩形左上角的 y 坐标。

### width

<description> _Number_ **optional** </description>

矩形的宽度。

### height

<description> _Number_ **optional** </description>

矩形的高度。

### radius

<description> _Number | Number[]_ **optional** </description>

定义圆角。支持整数或数组形式，分别对应左上、右上、右下、左下角的半径：<br />- radius 缩写为 1 或 [ 1 ] 相当于 [ 1, 1, 1, 1 ]<br />- radius 缩写为 [ 1, 2 ] 相当于 [ 1, 2, 1, 2 ]<br />- radius 缩写为 [ 1, 2, 3 ] 相当于 [ 1, 2, 3, 2 ]<br />。

## 线条 Path

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 当边太细交互不易命中时，请设置 **lineAppendWidth** 属性值。

```javascript
group.addShape('path', {
  attrs: {
    startArrow: {
      // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
      path: 'M 0,0 L 20,10 L 20,-10 Z',
      // 箭头的偏移量，负值代表向 x 轴正方向移动
      // d: -10,
    },
    endArrow: {
      // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
      path: 'M 0,0 L 20,10 L 20,-10 Z',
      // 箭头的偏移量，负值代表向 x 轴正方向移动
      // d: -10,
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

线条路径，可以是 String 形式，也可以是线段的数组。格式参考：[SVG path](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths)。

### startArrow

<description> _Boolean | Object_ **optional** </description>

起始端的箭头，为 `true` 时为默认的箭头效果，也可以是一个自定义箭头。

### endArrow

<description> _Boolean | Object_ **optional** </description>

末尾端的箭头，为 `true` 时为默认的箭头效果，也可以是一个自定义箭头。

### lineAppendWidth

<description> _Number_ **optional** </description>

边的击中范围。提升边的击中范围，扩展响应范围，数值越大，响应范围越广。

### lineCap

<description> _String_ **optional** </description>

设置线条的结束端点样式。可选：<br/> - `'bevel'`: 斜角 <br/> - `'round'`: 圆角 <br/> - `'miter'`: 尖角 (默认)。

### lineJoin

<description> _String_ **optional** </description>

设置两条线相交时，所创建的拐角形状。可选：<br/> - `'bevel'`: 斜角 <br/> - `'round'`: 圆角 <br/> - `'miter'`: 尖角 (默认)。

### lineWidth

<description> _Number_ **optional** </description>

设置当前的线条宽度。

### miterLimit

<description> _Number_ **optional** </description>

设置最大斜接长度。

### lineDash

<description> _Number | Number[]_ **optional** </description>

设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。可参考[setLineDash](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash)。

## 文本 Text

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
  // must be assigned in G6 3.3 and later versions. it can be any value you wantPath
  name: 'text-shape',
});
```

### textAlign

<description> _String_ **optional** </description>

设置文本内容的当前对齐方式。支持的属性：`center` / `end` / `left` / `right` / `start`，默认值为 `start`。

### textBaseline

<description> _String_ **optional** </description>

设置在绘制文本时使用的当前文本基线。支持的属性:<br />`top` / `middle` / `bottom` / `alphabetic` / `hanging`。默认值为 `bottom`。

### fontStyle

<description> _String_ **optional** </description>

字体样式。对应 `font-style`。

### fontVariant

<description> _String_ **optional** </description>

设置为小型大写字母字体。对应 `font-variant`。

### fontWeight

<description> _Number_ **optional** </description>

字体粗细。对应 `font-weight`。

### fontSize

<description> _Number_ **optional** </description>

字体大小。对应 `font-size`。

### fontFamily

<description> _String_ **optional** </description>

字体系列。对应 `font-family`。

### lineHeight

<description> _Number_ **optional** </description>

行高。对应 `line-height`。

## DOM (svg)

> 仅在 Graph 的 `renderer` 为 `'svg'` 时可以使用。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span>

- 只支持原生 HTML DOM，不支持各类 react、vue 组件；
- 使用 `'dom'` 进行自定义的节点或边，不支持 G6 的交互事件，请使用原生 DOM 的交互事件。

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

### html

<description> _String_ **optional** </description>

DOM 的 HTML 值。
