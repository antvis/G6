---
title: 标题 Title
order: 15
---

## 概述

Title（标题）表明了这张图的名称，传达图的简略内容

## 基本用法

以下是一个简单的 Title 插件初始化示例：

```js
const graph = new Graph({
  plugins: [
    {
      key: 'title',
      type: 'title',
      title: '这是一个标题',
      subTitle: '这是一个副标题',
    },
  ],
});
```

## 配置项

| 属性      | 描述                             | 类型                          | 默认值       | 必选 |
| --------- | -------------------------------- | ----------------------------- | ------------ | ---- |
| type      | 插件类型                         | string                        | `title`      | ✓    |
| key       | 插件唯一标识符，用于后续更新     | string                        | -            |      |
| title     | 标题内容 [样式配置](#title)      | `TitleStyle`                  | -            | ✓    |
| subtitle  | 副标题内容 [样式配置](#subtitle) | `SubTitleStyle`               | -            |      |
| spacing   | 主标题、副标题之间的上下间距     | number                        | 8            |      |
| className | 标题画布类名                     | string                        | -            |      |
| align     | 标题相对于画布的位置             | `left` \| `center` \| `right` | `left`       |      |
| size      | 整个标题插件的高度               | number                        | 44           |      |
| padding   | 内边距                           | number \| number[]            | [16,24,0,24] |      |

### size

<description> _number_ **optional** </description>

用于配置标题的空间高度大小，默认为 `44`。

### align

<description> _string_ **optional** </description>

用于配置标题的的左右对齐方式，默认为 `left`，可以选择使用 `left`，`center`，`right`，分别代表着居左对齐、居中对齐、居右对齐。

```js | ob { pin: false }
createGraph(
  {
    data: { nodes: Array.from({ length: 12 }).map((_, i) => ({ id: `node${i}` })) },
    node: {
      palette: 'spectral',
      style: { labelText: '你好' },
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    plugins: [
      {
        key: 'title',
        type: 'title',
        title: '这是一个标题这是一个标题',
        subtitle: '这是一个副标',
      },
    ],
    layout: { type: 'circular' },
    autoFit: 'view',
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = { align: 'left' };
    const optionFolder = gui.addFolder('Align Options');
    optionFolder.add(options, 'align', ['left', 'center', 'right']);
    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'title',
        [property]: value,
      });
      graph.render();
    });
  },
);
```

### spacing

<description> _number_ **optional** </description>

用于配置主标题和副标题之间的间距，默认为 `8`，合适的间距，可以让看起来整体更协调。

### title

的标题，具体来说是主标题，可以用以下的配置来定制标题的各种样式。

| 属性               | 描述                           | 类型       | 默认值                |
| ------------------ | ------------------------------ | ---------- | --------------------- |
| title              | 标题文字内容                   | `string`   | -                     |
| titleFontSize      | 标题文字大小                   | `number`   | 16                    |
| titleFontFamily    | 标题文字字体                   | `string`   | system-ui, sans-serif |
| titleFontWeight    | 标题字体粗细                   | `number`   | bold                  |
| titleLineHeight    | 标题文字的行高                 | `number`   | 16                    |
| titleTextAlign     | 标题文字行内内容的水平对齐方式 | `string`   | left                  |
| titleTextBaseline  | 标题文字垂直方向的基线         | `string`   | top                   |
| titleFill          | 标题文字的填充色               | `string`   | #1D2129               |
| titleFillOpacity   | 标题文字的填充透明度           | `number`   | 0.9                   |
| titleStroke        | 标题文字的描边颜色             | `string`   | transparent           |
| titleStrokeOpacity | 标题文字的描边透明度           | `number`   | 1                     |
| titleLineWidth     | 标题文字描边宽度               | `number`   | 0                     |
| titleLineDash      | 标题文字虚线样式               | `number[]` | []                    |
| titleOpacity       | 标题文字整体透明度             | `number`   | 1                     |
| titleShadowColor   | 标题文字阴影颜色               | `string`   | transparent           |
| titleShadowBlur    | 标题文字阴影的高斯模糊系数     | `number`   | 0                     |
| titleShadowOffsetX | 标题文字阴影水平偏移量         | `number`   | 0                     |
| titleShadowOffsetY | 标题文字阴影垂直偏移量         | `number`   | 0                     |
| titleCursor        | 标题文字鼠标样式               | `string`   | default               |
| titleDx            | 标题文字在水平方向的偏移量     | `number`   | 0                     |
| titleDy            | 标题文字在垂直方向的偏移量     | `number`   | 0                     |

### subtitle

的副标题，可以用以下的配置来定制副标题的各种样式。

| 属性                  | 描述                             | 类型       | 默认值                |
| --------------------- | -------------------------------- | ---------- | --------------------- |
| subtitle              | 副标题文字内容                   | `string`   | -                     |
| subtitleFontSize      | 副标题文字大小                   | `number`   | 12                    |
| subtitleFontFamily    | 副标题文字字体                   | `string`   | system-ui, sans-serif |
| subtitleFontWeight    | 副标题字体粗细                   | `number`   | normal                |
| subtitleLineHeight    | 副标题文字的行高                 | `number`   | 12                    |
| subtitleTextAlign     | 副标题文字行内内容的水平对齐方式 | `string`   | left                  |
| subtitleTextBaseline  | 副标题文字垂直方向的基线         | `string`   | top                   |
| subtitleFill          | 副标题文字的填充色               | `string`   | #1D2129               |
| subtitleFillOpacity   | 副标题文字的填充透明度           | `number`   | 0.65                  |
| subtitleStroke        | 副标题文字的描边颜色             | `string`   | transparent           |
| subtitleStrokeOpacity | 副标题文字的描边透明度           | `number`   | 1                     |
| subtitleLineWidth     | 副标题文字描边宽度               | `number`   | 0                     |
| subtitleLineDash      | 副标题文字虚线样式               | `number[]` | []                    |
| subtitleOpacity       | 副标题文字整体透明度             | `number`   | 1                     |
| subtitleShadowColor   | 副标题文字阴影颜色               | `string`   | transparent           |
| subtitleShadowBlur    | 副标题文字阴影的高斯模糊系数     | `number`   | 0                     |
| subtitleShadowOffsetX | 副标题文字阴影水平偏移量         | `number`   | 0                     |
| subtitleShadowOffsetY | 副标题文字阴影垂直偏移量         | `number`   | 0                     |
| subtitleCursor        | 副标题文字鼠标样式               | `string`   | default               |
| subtitleDx            | 副标题文字在水平方向的偏移量     | `number`   | 0                     |
| subtitleDy            | 副标题文字在垂直方向的偏移量     | `number`   | 0                     |

## 尝试一下

你可以在这个例子里随意修改并尝试不同的配置

```js | ob { pin: true, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: { nodes: Array.from({ length: 12 }).map((_, i) => ({ id: `node${i}` })) },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  plugins: [
    {
      key: 'title',
      type: 'title',

      align: 'center', // 标题的对齐方式
      spacing: 4, // 主标题和副标题之间的间距
      size: 60, // 标题的高度，默认为 44

      // 标题
      title: '这是一个标题这是一个标题', // 标题的文本
      titleFontSize: 28, // 主标题的字体大小
      titleFontFamily: 'sans-serif', // 主标题的字体
      titleFontWeight: 600, // 主标题的字体粗细
      titleFill: '#fff', // 主标题的文字颜色
      titleFillOpacity: 1, // 主标题的文字透明度
      titleStroke: '#000', // 主标题的文字描边颜色
      titleLineWidth: 2, // 主标题的文字描边线宽
      titleStrokeOpacity: 1, // 主标题的文字描边透明度

      // 副标题
      subtitle: '这是一个副标', // 副标题的文本
      subtitleFontSize: 16, // 副标题的字体大小
      subtitleFontFamily: 'Arial', // 副标题的字体
      subtitleFontWeight: 300, // 副标题的字体粗细
      subtitleFill: '#2989FF', // 副标题的文字颜色
      subtitleFillOpacity: 1, // 副标题的文字透明度
      subtitleStroke: '#000', // 副标题的文字描边颜色
      subtitleLineWidth: 1, // 副标题的文字描边线宽
      subtitleStrokeOpacity: 0.5, // 副标题的文字描边透明度
    },
  ],
  node: {
    palette: 'spectral',
    style: { labelText: '你好' },
  },
  layout: {
    type: 'circular',
  },
  autoFit: 'view',
});

graph.render();
```
