---
title: 原子 Shape 以及其属性
order: 2
---

G6 中的元素（节点/边）是由**一个或多个 [图形 Shape](/manual/element/shape/overview)** 组成，主要通过自定义节点或自定义边时在 `render` 方法中使用 `upsert` 添加，G6 中支持以下的图形 Shape：

1. [Circle - 圆形](#circlestyleprops)
2. [Ellipse - 椭圆](#ellipsestyleprops)
3. [Rect - 矩形](#rectstyleprops)
4. [HTML - HTML元素](#htmlstyleprops)
5. [Image - 图片](#imagestyleprops)
6. [Line - 线](#linestyleprops)
7. [Path - 路径](#pathstyleprops)
8. [Polygon - 多边形](#polygonstyleprops)
9. [Polyline - 折线](#polylinestyleprops)
10. [Text - 文本](#textstyleprops)

## 各图形 Shape 的通用属性

### BaseShapeStyle

| 属性           | 描述                                                                                          | 类型                                     | 必选 |
| -------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------- | ---- |
| x              | x 坐标                                                                                        | number                                   | ✓    |
| y              | y 坐标                                                                                        | number                                   | ✓    |
| width          | 宽度                                                                                          | number                                   | ✓    |
| height         | 高度                                                                                          | number                                   | ✓    |
| fill           | 填充颜色                                                                                      | string \| Pattern \| null                |      |
| stroke         | 描边颜色                                                                                      | string \| Pattern \| null                |      |
| opacity        | 整体透明度                                                                                    | number \| string                         |      |
| fillOpacity    | 填充透明度                                                                                    | number \| string                         |      |
| strokeOpacity  | 描边透明度                                                                                    | number \| string                         |      |
| lineWidth      | 线宽度                                                                                        | number \| string                         |      |
| lineCap        | 线段端点样式                                                                                  | `butt` \| `round` \| `square`            |      |
| lineJoin       | 线段连接处样式                                                                                | `miter` \| `round` \| `bevel`            |      |
| lineDash       | 虚线配置                                                                                      | number \| string \| (string \| number)[] |      |
| lineDashOffset | 虚线偏移量                                                                                    | number                                   |      |
| shadowBlur     | 阴影模糊程度                                                                                  | number                                   |      |
| shadowColor    | 阴影颜色                                                                                      | string                                   |      |
| shadowOffsetX  | 阴影 X 方向偏移                                                                               | number                                   |      |
| shadowOffsetY  | 阴影 Y 方向偏移                                                                               | number                                   |      |
| cursor         | 鼠标样式，[CSS 的 cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) 选项都支持 | string                                   |      |
| zIndex         | 渲染层级                                                                                      | number                                   |      |
| visibility     | 可见性                                                                                        | `visible` \| `hidden`                    |      |

**示例：**

```js
const shape = BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'circle',
  {
    cx: 100,
    cy: 100,
    r: 50,
    fill: 'blue',
  },
  container,
);
```

## 各图形 Shape 的通用方法

### attr()

设置或获取实例的绘图属性。

### attr(name)

获取实例的属性值。

```js
const width = shape.attr('width');
```

### attr(name, value)

更新实例的单个绘图属性。

### attr({...})

批量更新实例绘图属性。

```js
shape.attr({
  fill: '#999',
  stroke: '#666',
});
```

## 圆图形 Circle

### CircleStyleProps

| 属性              | 描述                               | 类型             | 必选 |
| ----------------- | ---------------------------------- | ---------------- | ---- |
| cx                | 圆心 x 坐标                        | number \| string | ✓    |
| cy                | 圆心 y 坐标                        | number \| string | ✓    |
| cz                | 圆心 z 坐标                        | number \| string |      |
| r                 | 圆的半径                           | number \| string | ✓    |
| isBillboard       | 是否启用公告牌模式（始终面向相机） | boolean          |      |
| isSizeAttenuation | 是否启用大小衰减（随视距变化大小） | boolean          |      |

**示例：**

```js
BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'circle',
  {
    cx: 100,
    cy: 100,
    r: 50,
    fill: 'blue',
  },
  container,
);
```

## 矩形图形 Rect

### RectStyleProps

| 属性              | 描述               | 类型                         | 必选 |
| ----------------- | ------------------ | ---------------------------- | ---- |
| x                 | 矩形 x 坐标        | number \| string             |      |
| y                 | 矩形 y 坐标        | number \| string             |      |
| z                 | 矩形 z 坐标        | number                       |      |
| width             | 矩形宽度           | number \| string             | ✓    |
| height            | 矩形高度           | number \| string             | ✓    |
| isBillboard       | 是否启用公告牌模式 | boolean                      |      |
| isSizeAttenuation | 是否启用大小衰减   | boolean                      |      |
| radius            | 矩形圆角半径       | number \| string \| number[] |      |

**示例：**

```js
BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'rect',
  {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    radius: 8,
    fill: 'blue',
  },
  container,
);
```

## 椭圆图形 Ellipse

### EllipseStyleProps

| 属性              | 描述               | 类型             | 必选 |
| ----------------- | ------------------ | ---------------- | ---- |
| cx                | 椭圆中心 x 坐标    | number \| string | ✓    |
| cy                | 椭圆中心 y 坐标    | number \| string | ✓    |
| cz                | 椭圆中心 z 坐标    | number \| string |      |
| rx                | 椭圆 x 轴半径      | number \| string | ✓    |
| ry                | 椭圆 y 轴半径      | number \| string | ✓    |
| isBillboard       | 是否启用公告牌模式 | boolean          |      |
| isSizeAttenuation | 是否启用大小衰减   | boolean          |      |

**示例：**

```js
BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'ellipse',
  {
    cx: 100,
    cy: 100,
    rx: 50,
    ry: 80,
    fill: 'blue',
  },
  container,
);
```

## HTML DOM

### HTMLStyleProps

| 属性      | 描述             | 类型                  | 必选 |
| --------- | ---------------- | --------------------- | ---- |
| x         | HTML 元素 x 坐标 | number \| string      |      |
| y         | HTML 元素 y 坐标 | number \| string      |      |
| innerHTML | HTML 内容        | string \| HTMLElement | ✓    |
| width     | HTML 元素宽度    | number \| string      |      |
| height    | HTML 元素高度    | number \| string      |      |

**示例：**

```js
BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'html',
  {
    x: 100,
    y: 100,
    innerHTML: <div>content</div>,
  },
  container,
);
```

## 图片图形 Image

### ImageStyleProps

| 属性              | 描述                         | 类型                       | 必选 |
| ----------------- | ---------------------------- | -------------------------- | ---- |
| x                 | 图片 x 坐标                  | number \| string           |      |
| y                 | 图片 y 坐标                  | number \| string           |      |
| z                 | 图片 z 坐标                  | number                     |      |
| src               | 图片资源路径或 HTML 图片元素 | string \| HTMLImageElement | ✓    |
| width             | 图片宽度                     | number \| string           |      |
| height            | 图片高度                     | number \| string           |      |
| isBillboard       | 是否启用公告牌模式           | boolean                    |      |
| isSizeAttenuation | 是否启用大小衰减             | boolean                    |      |
| billboardRotation | 公告牌模式下的旋转角度       | number                     |      |
| keepAspectRatio   | 是否保持图片原有宽高比       | boolean                    |      |

**示例：**

```js
BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'image',
  {
    x: 100,
    y: 100,
    src: 'http://',
  },
  container,
);
```

## 直线 Line

### LineStyleProps

| 属性              | 描述               | 类型                  | 必选 |
| ----------------- | ------------------ | --------------------- | ---- |
| x1                | 线段起点 x 坐标    | number                | ✓    |
| y1                | 线段起点 y 坐标    | number                | ✓    |
| x2                | 线段终点 x 坐标    | number                | ✓    |
| y2                | 线段终点 y 坐标    | number                | ✓    |
| z1                | 线段起点 z 坐标    | number                |      |
| z2                | 线段终点 z 坐标    | number                |      |
| isBillboard       | 是否启用公告牌模式 | boolean               |      |
| isSizeAttenuation | 是否启用大小衰减   | boolean               |      |
| markerStart       | 线段起点的标记     | DisplayObject \| null |      |
| markerEnd         | 线段终点的标记     | DisplayObject \| null |      |
| markerStartOffset | 起点标记的偏移量   | number                |      |
| markerEndOffset   | 终点标记的偏移量   | number                |      |

**示例：**

```js
BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'line',
  {
    x1: 100,
    y1: 100,
    x2: 150,
    y2: 150,
    stroke: 'blue',
  },
  container,
);
```

## 路径 Path

### PathStyleProps

| 属性              | 描述                 | 类型                   | 必选 |
| ----------------- | -------------------- | ---------------------- | ---- |
| d                 | 路径定义字符串或数组 | string \| PathArray    | ✓    |
| markerStart       | 路径起点的标记       | DisplayObject \| null  |      |
| markerEnd         | 路径终点的标记       | DisplayObject \| null  |      |
| markerMid         | 路径中间点的标记     | DisplayObject \| null  |      |
| markerStartOffset | 起点标记的偏移量     | number                 |      |
| markerEndOffset   | 终点标记的偏移量     | number                 |      |
| isBillboard       | 是否启用公告牌模式   | boolean                |      |
| isSizeAttenuation | 是否启用大小衰减     | boolean                |      |
| fillRule          | 填充规则             | `nonzero` \| `evenodd` |      |

**示例：**

```js
BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'path',
  {
    d: 'M 0,0 L 20,10 L 20,-10 Z',
    stroke: 'blue',
  },
  container,
);
```

## 多边形图形 Polygon

### PolygonStyleProps

| 属性              | 描述               | 类型                                             | 必选 |
| ----------------- | ------------------ | ------------------------------------------------ | ---- |
| points            | 多边形的顶点数组   | ([number, number] \| [number, number, number])[] | ✓    |
| markerStart       | 多边形起点的标记   | DisplayObject \| null                            |      |
| markerEnd         | 多边形终点的标记   | DisplayObject \| null                            |      |
| markerMid         | 多边形中间点的标记 | DisplayObject \| null                            |      |
| markerStartOffset | 起点标记的偏移量   | number                                           |      |
| markerEndOffset   | 终点标记的偏移量   | number                                           |      |
| isClosed          | 是否闭合多边形     | boolean                                          |      |
| isBillboard       | 是否启用公告牌模式 | boolean                                          |      |
| isSizeAttenuation | 是否启用大小衰减   | boolean                                          |      |

**示例：**

```js
BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'polygon',
  {
    points: [
      [30, 30],
      [40, 20],
      [30, 50],
      [60, 100],
    ],
    fill: 'red',
  },
  container,
);
```

## 折线 Polyline

### PolylineStyleProps

| 属性              | 描述               | 类型                                             | 必选 |
| ----------------- | ------------------ | ------------------------------------------------ | ---- |
| points            | 折线的顶点数组     | ([number, number] \| [number, number, number])[] | ✓    |
| markerStart       | 折线起点的标记     | DisplayObject \| null                            |      |
| markerEnd         | 折线终点的标记     | DisplayObject \| null                            |      |
| markerMid         | 折线中间点的标记   | DisplayObject \| null                            |      |
| markerStartOffset | 起点标记的偏移量   | number                                           |      |
| markerEndOffset   | 终点标记的偏移量   | number                                           |      |
| isBillboard       | 是否启用公告牌模式 | boolean                                          |      |
| isSizeAttenuation | 是否启用大小衰减   | boolean                                          |      |

**示例：**

```js
BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'polyline',
  {
    points: [
      [30, 30],
      [40, 20],
      [30, 50],
      [60, 100],
    ],
    fill: 'red',
  },
  container,
);
```

## 文字 Text

### TextStyleProps

| 属性                | 描述               | 类型                                                                        | 必选 |
| ------------------- | ------------------ | --------------------------------------------------------------------------- | ---- |
| x                   | 文本 x 坐标        | number \| string                                                            |      |
| y                   | 文本 y 坐标        | number \| string                                                            |      |
| z                   | 文本 z 坐标        | number \| string                                                            |      |
| text                | 文本内容           | number \| string                                                            | ✓    |
| fontSize            | 字体大小           | number \| string                                                            |      |
| fontFamily          | 字体族             | string                                                                      |      |
| fontStyle           | 字体样式           | `normal` \| `italic` \| `oblique`                                           |      |
| fontWeight          | 字体粗细           | `normal` \| `bold` \| `bolder` \| `lighter` \| number                       |      |
| fontVariant         | 字体变种           | `normal` \| `small-caps` \| string                                          |      |
| textAlign           | 文本水平对齐方式   | `start` \| `center` \| `middle` \| `end` \| `left` \| `right`               |      |
| textBaseline        | 文本基线           | `top` \| `hanging` \| `middle` \| `alphabetic` \| `ideographic` \| `bottom' |      |
| textOverflow        | 文本溢出处理方式   | `clip` \| `ellipsis` \| string                                              |      |
| lineHeight          | 行高               | number \| string                                                            |      |
| letterSpacing       | 字间距             | number \| string                                                            |      |
| maxLines            | 最大行数           | number                                                                      |      |
| textPath            | 文本路径           | Path                                                                        |      |
| textPathSide        | 文本路径侧边       | `left` \| `right`                                                           |      |
| textPathStartOffset | 文本路径起始偏移   | number \| string                                                            |      |
| textDecorationLine  | 文本装饰线         | string                                                                      |      |
| textDecorationColor | 文本装饰线颜色     | string                                                                      |      |
| textDecorationStyle | 文本装饰线样式     | `solid` \| `double` \| `dotted` \| `dashed` \| `wavy`                       |      |
| isBillboard         | 是否启用公告牌模式 | boolean                                                                     |      |
| billboardRotation   | 公告牌旋转角度     | number                                                                      |      |
| isSizeAttenuation   | 是否启用大小衰减   | boolean                                                                     |      |
| wordWrap            | 是否自动换行       | boolean                                                                     |      |
| wordWrapWidth       | 自动换行宽度       | number                                                                      |      |
| dx                  | X 方向偏移         | number \| string                                                            |      |
| dy                  | Y 方向偏移         | number \| string                                                            |      |

**示例：**

```js
BaseShape.upsert(
  // 指定图形 key，需要保证在同一个自定义元素类型中保持唯一性
  'shape',
  'text',
  {
    x: 100,
    y: 100,
    text: 'text',
  },
  container,
);
```

多行文字显示：

```js
{
  wordWrap: true,
  wordWrapWidth: 100,
  maxLines: 4,
  textOverflow: 'ellipsis',
}
```
