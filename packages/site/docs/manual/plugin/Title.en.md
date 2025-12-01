---
title: Title
order: 15
---

## Overview

Title indicates the name of the image and conveys the brief content of the image.

## Basic Usage

The following is a simple example of initializing the Title plugin:

```js
const graph = new Graph({
  plugins: [
    {
      key: 'title',
      type: 'title',
      title: 'This is a title',
      subTitle: 'This is a subtitle',
    },
  ],
});
```

## Configuration Options

| Option    | Description                                                   | Type                          | Default      | Required |
| --------- | ------------------------------------------------------------- | ----------------------------- | ------------ | -------- |
| type      | Plugin type                                                   | string                        | `title`      | ✓        |
| key       | Unique identifier for the plugin, used for subsequent updates | string                        | -            |          |
| title     | title content [style config](#title)                          | `TitleStyle`                  | -            | ✓        |
| subtitle  | subtitle content [style config](#subtitle)                    | `SubTitleStyle`               | -            |          |
| spacing   | Vertical spacing between main title and subtitle              | number                        | 8            |          |
| className | Class name of the title canvas                                | string                        | -            |          |
| align     | Graph title alignment                                         | `left` \| `center` \| `right` | `left`       |          |
| size      | Height of the title plugin                                    | number                        | 44           |          |
| padding   | Padding                                                       | number \| number[]            | [16,24,0,24] |          |

### size

<description> _number_ **optional** </description>

Used to configure the space height of the title plugin. Default is `44`。

### align

<description> _string_ **optional** </description>

Used to configure the horizontal alignment of the title plugin. Default is `left`. You can choose `left`, `center`, or `right`, representing left-aligned, center-aligned, and right-aligned respectively.

```js | ob { pin: false }
createGraph(
  {
    data: { nodes: Array.from({ length: 12 }).map((_, i) => ({ id: `node${i}` })) },
    node: {
      palette: 'spectral',
      style: { labelText: 'Ciallo' },
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    plugins: [
      {
        key: 'title',
        type: 'title',
        title: 'This is a title This is a title',
        subtitle: 'This is a sub-',
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

Used to configure the spacing between the chart main title and subtitle. Default is `8`. Appropriate spacing can make the chart look more harmonious overall.

### title

The title, specifically the main title, can be customized with the following configurations for various title styles.

| Attr               | Desc                                               | Type       | Default               |
| ------------------ | -------------------------------------------------- | ---------- | --------------------- |
| title              | Title text content                                 | `string`   | -                     |
| titleFontSize      | Title text size                                    | `number`   | 16                    |
| titleFontFamily    | Title text font                                    | `string`   | system-ui, sans-serif |
| titleFontWeight    | Title font weight                                  | `number`   | bold                  |
| titleLineHeight    | Title text line height                             | `number`   | 16                    |
| titleTextAlign     | Horizontal alignment of content in title text line | `string`   | left                  |
| titleTextBaseline  | Vertical baseline of title text                    | `string`   | top                   |
| titleFill          | Fill color of title text                           | `string`   | #1D2129               |
| titleFillOpacity   | Fill transparency of title text                    | `number`   | 0.9                   |
| titleStroke        | Stroke color of title text                         | `string`   | transparent           |
| titleStrokeOpacity | Stroke transparency of title text                  | `number`   | 1                     |
| titleLineWidth     | Stroke width of title text                         | `number`   | 0                     |
| titleLineDash      | Dash style of title text                           | `number[]` | []                    |
| titleOpacity       | Overall transparency of title text                 | `number`   | 1                     |
| titleShadowColor   | Shadow color of title text                         | `string`   | transparent           |
| titleShadowBlur    | Gaussian blur coefficient of title text shadow     | `number`   | 0                     |
| titleShadowOffsetX | Horizontal offset of title text shadow             | `number`   | 0                     |
| titleShadowOffsetY | Vertical offset of title text shadow               | `number`   | 0                     |
| titleCursor        | Mouse style of title text                          | `string`   | default               |
| titleDx            | Horizontal offset of title text                    | `number`   | 0                     |
| titleDy            | Vertical offset of title text                      | `number`   | 0                     |

### subtitle

The subtitle, which can be customized with the following configurations for various subtitle styles.

| Attr                  | Desc                                            | Type       | Default               |
| --------------------- | ----------------------------------------------- | ---------- | --------------------- |
| subtitle              | Subtitle text content                           | `string`   | -                     |
| subtitleFontSize      | Subtitle text size                              | `number`   | 12                    |
| subtitleFontFamily    | Subtitle text font                              | `string`   | system-ui, sans-serif |
| subtitleFontWeight    | Subtitle font weight                            | `number`   | normal                |
| subtitleLineHeight    | Subtitle text line height                       | `number`   | 12                    |
| subtitleTextAlign     | Subtitle text line content horizontal alignment | `string`   | left                  |
| subtitleTextBaseline  | Subtitle text vertical baseline                 | `string`   | top                   |
| subtitleFill          | Subtitle text fill color                        | `string`   | #1D2129               |
| subtitleFillOpacity   | Subtitle text fill transparency                 | `number`   | 0.65                  |
| subtitleStroke        | Subtitle text stroke color                      | `string`   | transparent           |
| subtitleStrokeOpacity | Subtitle text stroke transparency               | `number`   | 1                     |
| subtitleLineWidth     | Subtitle text stroke width                      | `number`   | 0                     |
| subtitleLineDash      | Subtitle text dashed line style                 | `number[]` | []                    |
| subtitleOpacity       | Subtitle text overall transparency              | `number`   | 1                     |
| subtitleShadowColor   | Subtitle text shadow color                      | `string`   | transparent           |
| subtitleShadowBlur    | Subtitle text shadow Gaussian blur coefficient  | `number`   | 0                     |
| subtitleShadowOffsetX | Subtitle text shadow horizontal offset          | `number`   | 0                     |
| subtitleShadowOffsetY | Subtitle text shadow vertical offset            | `number`   | 0                     |
| subtitleCursor        | Subtitle text mouse style                       | `string`   | default               |
| subtitleDx            | Subtitle text horizontal offset                 | `number`   | 0                     |
| subtitleDy            | Subtitle text vertical offset                   | `number`   | 0                     |

## Try it

Feel free to modify this example and try different configurations

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

      align: 'center', // Alignment of title
      spacing: 4, // Spacing between main title and subtitle
      size: 60, // Height of title, default is 44

      // title
      title: 'This is a title This is a title', // Title text
      titleFontSize: 28, // Main title font size
      titleFontFamily: 'sans-serif', // Main title font
      titleFontWeight: 600, // Main title font weight
      titleFill: '#fff', // Main title text color
      titleFillOpacity: 1, // Main title text transparency
      titleStroke: '#000', // Main title text stroke color
      titleLineWidth: 2, // Main title text stroke line width
      titleStrokeOpacity: 1, // Main title text stroke transparency

      // subtitle
      subtitle: 'This is a sub-', // Subtitle text
      subtitleFontSize: 16, // Subtitle font size
      subtitleFontFamily: 'Arial', // Subtitle font
      subtitleFontWeight: 300, // Subtitle font weight
      subtitleFill: '#2989FF', // Subtitle text color
      subtitleFillOpacity: 1, // Subtitle text transparency
      subtitleStroke: '#000', // Subtitle text stroke color
      subtitleLineWidth: 1, // Subtitle text stroke line width
      subtitleStrokeOpacity: 0.5, // Subtitle text stroke transparency
    },
  ],
  node: {
    palette: 'spectral',
    style: { labelText: 'Ciallo' },
  },
  layout: {
    type: 'circular',
  },
  autoFit: 'view',
});

graph.render();
```
