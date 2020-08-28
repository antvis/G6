---
title: 箭头
order: 2
---

无论是内置边还是[自定义边](/zh/docs/manual/advanced/custom-edge)，都可以为其配置起始端箭头与结束端箭头。G6 中的箭头分为默认箭头、内置箭头、自定义箭头。

<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GkXiSbN9JJsAAAAAAAAAAABkARQnAQ' width=500 alt='img'/>

## 默认箭头

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fthFSoNbmeAAAAAAAAAAAABkARQnAQ' width=200 alt='img'/>

### 使用方法

在边的样式属性 `style` 中将 `endArrow` 或 `startArrow` 配置为 `true` 即可：

```javascript
style: {
  endArrow: true,
  startArrow: true
}
```

## 内置箭头

v3.5.8 后支持。

### 各箭头概览

| 名称 | 参数 | 使用方法 | 效果 |
| --- | --- | --- | --- |
| triangle | <div style="width: 150pt">依次为箭头宽度（默认 10）、长度（默认 15）、偏移量（默认为 0，与 `d` 对应）</div> | endArrow: {<br /> path: G6.Arrow.triangle(10, 20, 25),<br /> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*s8LxSZoxSEsAAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |
| vee | <div style="width: 150pt">依次为箭头宽度（默认 15）、长度（默认 20）、偏移量（默认为 0，与 `d` 对应）</div> | endArrow: {<br /> path: G6.Arrow.vee(10, 20, 25),<br /> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2DBOTJfZZS0AAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |
| circle | <div style="width: 150pt">依次为箭头半径（默认 5）、偏移量（默认为 0，与 `d` 对应）</div> | endArrow: {<br /> path: G6.Arrow.circle(10, 25),<br/> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*h2XSSJrdUHkAAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |
| diamond | <div style="width: 150pt">依次为箭头宽度（默认 15）、长度（默认 15）、偏移量（默认为 0，与 `d` 对应）</div> | endArrow: {<br /> path: G6.Arrow.diamond(10, 20, 25),<br /> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FIHORJpJov0AAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |
| rect | <div style="width: 150pt">依次为箭头宽度（默认 10）、长度（默认 10）、偏移量（默认为 0，与 `d` 对应）</div> | endArrow: {<br /> path: G6.Arrow.rect(10, 20, 25),<br /> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AkBLSoxXptUAAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |
| triangleRect | <div style="width: 150pt">依次为箭头三角形宽度（默认 15）、三角形长度（默认 15）、矩形宽度（默认 15）、矩形长度（默认 3）、三角形与矩形间距（默认为 5）、偏移量（默认为 0，与 `d` 对应）</div> | endArrow: {<br /> path: G6.Arrow.triangleRect(15, 15, 15, 3, 5, 25),<br /> d: 25<br />} | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rPPeT4kFVdwAAAAAAAAAAABkARQnAQ' width=200 alt='img'/> |

### 使用方法

调用 `G6.Arrow.arrowName` 配置边的样式属性 `style` 中 `endArrow` 或 `startArrow` 的 `path`：

```javascript
style: {
  endArrow: {
    path: G6.Arrow.triangle(10, 20, 25), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
    d: 25
  },
  startArrow: {
    path: G6.Arrow.vee(15, 20, 15), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
    d: 15
  },
}
```

## 自定义箭头

参见高级指引 [自定义箭头](/zh/docs/manual/advanced/custom-edge#4-自定义箭头)。

## 配置箭头样式

只有内置箭头和自定义箭头可以配置样式。

#### 配置项

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| fill | false | String | 填充颜色，默认无填充 |
| stroke | false | String | 描边颜色，默认与边颜色相同 |
| lineWidth | false | Number | 描边宽度，默认与边宽度相同 |
| opacity | false | Number | 透明度 |
| shadowColor | false | String | 阴影颜色 |
| shadowBlur | false | Number | 阴影模糊程度 |
| shadowOffsetX | false | Number | 阴影 x 方向偏移量 |
| shadowOffsetY | false | Number | 阴影 y 方向偏移量 |
| lineDash | false | Array | 描边的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。 |

#### 使用方法

```javascript
// 内置箭头
style: {
  endArrow: {
    path: G6.Arrow.triangle(10, 20, 25), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
    d: 25,
    fill: '#f00',
    stroke: '#0f0',
    opacity: 0.5,
    lineWidth: 3,
    // ...
  },
}


// 自定义箭头
style: {
  endArrow: {
    path: 'M 0,0 L 20,10 L 20,-10 Z',
    d: 5,
    fill: '#f00',
    stroke: '#0f0',
    opacity: 0.5,
    lineWidth: 3,
    // ...
  },
}
```
