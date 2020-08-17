---
title: 各图形样式属性
order: 6
---

图形是组成图上一个元素（节点/边）的基本单位。节点/边的 `style` 属性即对应了各自 keyShape（关键图形）的图形属性。节点或边上标签 `labelCfg` 中的 `style` 属性对应了 text 图形的图形属性。

G6 支持以下图形：

- [circle](#圆图形-circle)：圆；
- [rect](#矩形图形-rect)：矩形；
- [ellipse](#椭圆图形-ellipse)：椭圆；
- [polygon](#多边形图形-polygon)：多边形；
- [fan](#扇形图形-fan)：扇形；
- [image](#图片图形-image)：图片；
- [marker](#标记图形-marker)：标记；
- [path](#路径-path)：路径；
- [text](#文本-text)：文本；
- [dom(svg)](#dom-svg)：DOM（图渲染方式 `renderer` 为 `'svg'` 时可用）。

## 通用属性

| 属性名 | 类型 | 示例 | 含义 |
| --- | --- | --- | --- |
| fill | String | - 'rgb(18, 150, 231)' <br/> - '#c193af' <br/>- 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' <br/>- 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff' | 设置用于填充绘画的颜色(RGB 或 16 进制)、[渐变](/zh/docs/manual/FAQ/gradient#gatsby-focus-wrapper)或模式，对应 Canvas 属性 `fillStyle` |
| stroke | String | - 'rgb(18, 150, 231)' <br/> - '#c193af' <br/>- 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' <br/>- 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff' | 设置用于笔触的颜色(RGB 或 16 进制)、[渐变](/zh/docs/manual/FAQ/gradient#gatsby-focus-wrapper)或模式，对应 Canvas 属性 `strokeStyle` |
| lineWidth | Number | 2 | 描边宽度 |
| lineDash | Number/ Number[] | [5, 10] | 描边虚线，Number[] 类型代表实、虚长度 |
| shadowColor | String | 'rgb(18, 150, 231)' / '#c193a1' | 设置用于阴影的颜色 |
| shadowBlur | Number | 50 | 设置用于阴影的模糊级别，数值越大，越模糊 |
| shadowOffsetX | Number | 10 | 设置阴影距形状的水平距离 |
| shadowOffsetY | Number | 10 | 设置阴影距形状的垂直距离 |
| opacity | Number | 0.8 | 设置绘图的当前 alpha 或透明值，范围 [0, 1]，对应 Canvas 属性 `globalAlpha` |
| fillOpacity | Number | 0.8 | 设置填充的 alpha 或透明值，优先级高于 opacity，范围 [0, 1] |
| strokeOpacity | Number | 0.8 | 设置描边的 alpha 或透明值，优先级高于 opacity，范围 [0, 1] |
| cursor | String | 'pointer' | 鼠标在该节点上时的鼠标样式，[CSS 的 cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) 选项都支持 |

### 用法

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

## 各图形 Shape 的通用方法

### attr()

设置或获取实例的绘图属性。

### attr(name)

获取实例的属性值。

```
const width = shape.attr('width');
```

### attr(name, value)

更新实例的单个绘图属性。

### attr({...})

批量更新实例绘图属性。

```
rect.attr({
    fill: '#999',
    stroke: '#666'
});
```

### setClip(clipCfg)

设置并返回裁剪对象。

`clipCfg` 配置项

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| type | 裁剪的图片形状 | String | 支持 `'circle'`、`'rect'`、`'ellipse'` |
| x | 裁剪图形的 x 坐标 | Number | 默认为 0，类型为 `'circle'`、`'rect'`、`'ellipse'` 时生效 |
| y | 裁剪图形的 y 坐标 | Number | 默认为 0，类型为 `'circle'`、`'rect'`、`'ellipse'` 时生效 |
| show | 是否启用裁剪功能 | Boolean | 默认不裁剪，值为 `false` |
| r | 剪裁圆形的半径 | Number | 剪裁 type 为  `'circle'` 时生效 |
| width | 剪裁矩形的宽度 | Number | 剪裁 type 为 `'rect'` 时生效 |
| height | 剪裁矩形的长度 | Number | 剪裁 type 为 `'rect'` 时生效 |
| rx | 剪裁椭圆的长轴半径 | Number | 剪裁 type 为 `'ellipse'` 时生效 |
| ry | 剪裁椭圆的短轴半径 | Number | 剪裁 type 为 `'ellipse'` 时生效 |

用法

```javascript
shape.setClip({
  type: 'circle', // 支持 circle、rect、ellipse、Polygon 及自定义 path clip
  attrs: {
    r: 10,
    x: 0,
    y: 0,
  },
```

### getClip()

获取裁剪对象。

## 圆图形 Circle

### 特殊属性

| 属性名 | 类型   | 含义          |
| ------ | ------ | ------------- |
| x      | Number | 圆心的 x 坐标 |
| y      | Number | 圆心的 y 坐标 |
| r      | Number | 圆的半径      |

### 用法

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

## 椭圆图形 Ellipse

### 特殊属性

| 属性名 | 类型   | 含义          |
| ------ | ------ | ------------- |
| x      | Number | 圆心的 x 坐标 |
| y      | Number | 圆心的 y 坐标 |
| rx     | Number | 水平半径      |
| ry     | Number | 垂直半径      |

### 用法

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

## 图片图形 Image

### 特殊属性

| 属性名 | 类型 | 含义 |
| --- | --- | --- |
| x | Number | 图片左上角的 x 坐标 |
| y | Number | 图片左上角的 y 坐标 |
| width | Number | 图片宽度 |
| height | Number | 图片高度 |
| img | String | 图片源，G6 支持多种格式的图片：<br />- url<br />- ImageData<br />- Image<br />- canvas<br /> |

### 用法

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

## 标记图形 Marker

### 特殊属性

| 属性名 | 类型 | 含义 |
| --- | --- | --- |
| x | Number | 中心的 x 坐标 |
| y | Number | 中心的 y 坐标 |
| r | Number | 形状半径 |
| symbol | String / Function | 指定形状。我们已经内置了一些常用形状，如圆形 `'circle'`，矩形  `'square'`，菱形  `'diamond'`，三角形  `'triangle'`，倒三角形 `'triangle-down'`，这些内置形状只需要直接将响应 String 赋值给 symbol。也可以是自定义的 path 路径的函数。 |

### 用法

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

## 多边形图形 Polygon

### 特殊属性

| 属性名 | 类型  | 含义                 |
| ------ | ----- | -------------------- |
| points | Array | 多边形的所有端点坐标 |

### 用法

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

## 矩形图形 Rect

### 特殊属性

| 属性名 | 类型 | 含义 |
| --- | --- | --- |
| x | Number | 矩形左上角的 x 坐标 |
| y | Number | 矩形左上角的 y 坐标 |
| width | Number | 矩形的宽度 |
| height | Number | 矩形的高度 |
| radius | Number / Number[] | 定义圆角。支持整数或数组形式，分别对应左上、右上、右下、左下角的半径：<br />- radius 缩写为 1 或 [ 1 ] 相当于 [ 1, 1, 1, 1 ]<br />- radius 缩写为 [ 1, 2 ] 相当于 [ 1, 2, 1, 2 ]<br />- radius 缩写为 [ 1, 2, 3 ] 相当于 [ 1, 2, 3, 2 ]<br /> |

### 用法

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

## 线条 Path

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 当边太细交互不易命中时，请设置 **lineAppendWidth** 属性值。

### 特殊属性

| 属性名 | 类型 | 含义 |
| --- | --- | --- |
| path | String / Array | 线条路径，可以是 String 形式，也可以是线段的数组。格式参考：[SVG path](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths) |
| startArrow | Boolean / Object | 起始端的箭头，为 `true` 时为默认的箭头效果，也可以是一个自定义箭头 |
| endArrow | Boolean / Object | 末尾端的箭头，为 `true` 时为默认的箭头效果，也可以是一个自定义箭头 |
| lineAppendWidth | Number | 边的击中范围。提升边的击中范围，扩展响应范围，数值越大，响应范围越广 |
| lineCap | String | 设置线条的结束端点样式。可选：<br/> - `'bevel'`: 斜角 |

<br/> - `'round'`: 圆角 <br/> - `'miter'`: 尖角 (默认) | | lineJoin | String | 设置两条线相交时，所创建的拐角形状。可选：<br/> - `'bevel'`: 斜角 <br/> - `'round'`: 圆角 <br/> - `'miter'`: 尖角 (默认) | | lineWidth | Number | 设置当前的线条宽度 | | miterLimit | Number | 设置最大斜接长度 | | lineDash | Number[] | 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。可参考[setLineDash](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash) |

### 用法

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

## 文本 Text

### 特殊属性

| 属性名 | 类型 | 含义 |
| --- | --- | --- |
| fill | String | 设置用于填充绘画的颜色、渐变或模式。可以是 RGB 或 16 进制格式。对应 Canvas 属性 `fillStyle` |
| stroke | String | 设置用于笔触的颜色、渐变或模式。可以是 RGB 或 16 进制格式。对应 Canvas 属性 `strokeStyle` |
| shadowColor | String | 设置用于阴影的颜色 |
| shadowBlur | Number | 设置用于阴影的模糊级别。数值越大，越模糊 |
| shadowOffsetX | Number | 设置阴影距形状的水平距离 |
| shadowOffsetY | Number | 设置阴影距形状的垂直距离 |
| opacity | Number | 设置绘图的当前 alpha 或透明值，范围 [0, 1]。对应 Canvas 属性 `globalAlpha` |
| textAlign | String | 设置文本内容的当前对齐方式。支持的属性：`center` / `end` / `left` / `right` / `start`，默认值为 `start` |
| textBaseline | String | 设置在绘制文本时使用的当前文本基线。支持的属性:<br />`top` / `middle` / `bottom` / `alphabetic` / `hanging`。默认值为 `bottom` |
| fontStyle | String | 字体样式。对应 `font-style` |
| fontVariant | String | 设置为小型大写字母字体。对应 `font-variant` |
| fontWeight | Number | 字体粗细。对应 `font-weight` |
| fontSize | Number | 字体大小。对应 `font-size` |
| fontFamily | String | 字体系列。对应 `font-family` |
| lineHeight | Number | 行高。对应 `line-height` |

### 用法

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

## DOM (svg)

> 仅在 Graph 的 `renderer` 为 `'svg'` 时可以使用。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span>

- 只支持原生 HTML DOM，不支持各类 react、vue 组件；
- 使用 `'dom'` 进行自定义的节点或边，不支持 G6 的交互事件，请使用原生 DOM 的交互事件。

### 特殊属性

| 属性名 | 类型   | 含义           |
| ------ | ------ | -------------- |
| html   | String | DOM 的 HTML 值 |

### 用法

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
