---
title: Watermark 水印
---

## 概述

水印插件支持使用文本和图片作为水印，实现原理是在 Graph 容器的 div 上加上 `background-image` 属性，然后通过 CSS 来控制水印的位置和样式。对于文本水印，会使用隐藏 canvas 将文本转换为图片的方式来实现。

## 使用场景

- 为图表添加版权或所有权标识
- 在演示或预览时标记图表的状态
- 为敏感数据添加防泄露标记

## 基本用法

```js
const graph = new Graph({
  plugins: [
    {
      type: 'watermark',
      text: 'G6 Graph', // 水印文本
      opacity: 0.2, // 透明度
      rotate: Math.PI / 12, // 旋转角度
    },
  ],
});
```

## 在线体验

<embed src="@/common/api/plugins/watermark.md"></embed>

## 配置项

| 属性                 | 描述                               | 类型                                                                        | 默认值       | 必选 |
| -------------------- | ---------------------------------- | --------------------------------------------------------------------------- | ------------ | ---- |
| type                 | 插件类型                           | string                                                                      | `watermark`  | ✓    |
| width                | 单个水印的宽度                     | number                                                                      | 200          |      |
| height               | 单个水印的高度                     | number                                                                      | 100          |      |
| opacity              | 水印的透明度                       | number                                                                      | 0.2          |      |
| rotate               | 水印的旋转角度                     | number                                                                      | Math.PI / 12 |      |
| imageURL             | 图片水印的地址，优先级高于文本水印 | string                                                                      | -            |      |
| text                 | 水印文本内容                       | string                                                                      | -            |      |
| textFill             | 文本水印的颜色                     | string                                                                      | `#000`       |      |
| textFontSize         | 文本水印的字体大小                 | number                                                                      | 16           |      |
| textFontFamily       | 文本水印的字体                     | string                                                                      | -            |      |
| textFontWeight       | 文本水印的字体粗细                 | string                                                                      | -            |      |
| textFontVariant      | 文本水印的字体变体                 | string                                                                      | -            |      |
| textAlign            | 文本水印的对齐方式                 | `center` \| `end` \| `left` \| `right` \| `start`                           | `center`     |      |
| textBaseline         | 文本水印的基线对齐方式             | `alphabetic` \| `bottom` \| `hanging` \| `ideographic` \| `middle` \| `top` | `middle`     |      |
| backgroundRepeat     | 水印的重复方式                     | string                                                                      | `repeat`     |      |
| backgroundAttachment | 水印的背景定位行为                 | string                                                                      | -            |      |
| backgroundBlendMode  | 水印的背景混合模式                 | string                                                                      | -            |      |
| backgroundClip       | 水印的背景裁剪                     | string                                                                      | -            |      |
| backgroundColor      | 水印的背景颜色                     | string                                                                      | -            |      |
| backgroundImage      | 水印的背景图片                     | string                                                                      | -            |      |
| backgroundOrigin     | 水印的背景原点                     | string                                                                      | -            |      |
| backgroundPosition   | 水印的背景位置                     | string                                                                      | -            |      |
| backgroundPositionX  | 水印的背景水平位置                 | string                                                                      | -            |      |
| backgroundPositionY  | 水印的背景垂直位置                 | string                                                                      | -            |      |
| backgroundSize       | 水印的背景大小                     | string                                                                      | -            |      |

## 代码示例

### 文本水印

最简单的文本水印配置：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'watermark',
      text: 'G6 Graph',
    },
  ],
});
```

<Playground path="/plugin/watermark/demo/text.js" rid="watermark-text"></Playground>

### 图片水印

使用图片作为水印：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'watermark',
      imageURL: 'https://example.com/logo.png',
      width: 100,
      height: 50,
      opacity: 0.1,
    },
  ],
});
```

<Playground path="/plugin/watermark/demo/repeat.js" rid="watermark-repeat"></Playground>

### 自定义样式

可以自定义水印的样式和位置：

```js
const graph = new Graph({
  plugins: [
    {
      type: 'watermark',
      text: 'G6 Graph',
      textFontSize: 20, // 设置字体大小
      textFontFamily: 'Arial', // 设置字体
      textFontWeight: 'bold', // 设置字体粗细
      textFill: '#1890ff', // 设置文字颜色
      rotate: Math.PI / 6, // 设置旋转角度
      opacity: 0.15, // 设置透明度
      width: 180, // 设置水印宽度
      height: 100, // 设置水印高度
      backgroundRepeat: 'space', // 设置重复方式
      backgroundPosition: 'center', // 设置位置
      textAlign: 'center', // 设置文本对齐
      textBaseline: 'middle', // 设置基线对齐
    },
  ],
});
```

## 实际案例

- [文本水印](/examples/plugin/watermark/#text)
- [图片水印](/examples/plugin/watermark/#repeat)
