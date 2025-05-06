---
title: Watermark
---

## Overview

The watermark plugin supports using text and images as watermarks. The principle is to add a `background-image` attribute to the div of the Graph container, and then control the position and style of the watermark through CSS. For text watermarks, a hidden canvas is used to convert the text into an image.

## Use Cases

- Add copyright or ownership marks to charts
- Mark the status of charts during presentations or previews
- Add anti-leakage marks to sensitive data

## Basic Usage

Below is a simple example of initializing the Watermark plugin:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'watermark',
      text: 'G6 Graph', // Watermark text
      opacity: 0.2, // Opacity
      rotate: Math.PI / 12, // Rotation angle
    },
  ],
});
```

## Online Experience

<embed src="@/common/api/plugins/watermark.md"></embed>

## Configuration Options

| Property             | Description                                              | Type                                                                        | Default Value | Required |
| -------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- | ------------- | -------- |
| type                 | Plugin type                                              | string                                                                      | `watermark`   | ✓        |
| width                | Width of a single watermark                              | number                                                                      | 200           |          |
| height               | Height of a single watermark                             | number                                                                      | 100           |          |
| opacity              | Opacity of the watermark                                 | number                                                                      | 0.2           |          |
| rotate               | Rotation angle of the watermark                          | number                                                                      | Math.PI / 12  |          |
| imageURL             | Image watermark URL, higher priority than text watermark | string                                                                      | -             |          |
| text                 | Watermark text content                                   | string                                                                      | -             |          |
| textFill             | Color of the text watermark                              | string                                                                      | `#000`        |          |
| textFontSize         | Font size of the text watermark                          | number                                                                      | 16            |          |
| textFontFamily       | Font of the text watermark                               | string                                                                      | -             |          |
| textFontWeight       | Font weight of the text watermark                        | string                                                                      | -             |          |
| textFontVariant      | Font variant of the text watermark                       | string                                                                      | -             |          |
| textAlign            | Text alignment of the watermark                          | `center` \| `end` \| `left` \| `right` \| `start`                           | `center`      |          |
| textBaseline         | Baseline alignment of the text watermark                 | `alphabetic` \| `bottom` \| `hanging` \| `ideographic` \| `middle` \| `top` | `middle`      |          |
| backgroundRepeat     | Repeat mode of the watermark                             | string                                                                      | `repeat`      |          |
| backgroundAttachment | Background attachment behavior of the watermark          | string                                                                      | -             |          |
| backgroundBlendMode  | Background blend mode of the watermark                   | string                                                                      | -             |          |
| backgroundClip       | Background clip of the watermark                         | string                                                                      | -             |          |
| backgroundColor      | Background color of the watermark                        | string                                                                      | -             |          |
| backgroundImage      | Background image of the watermark                        | string                                                                      | -             |          |
| backgroundOrigin     | Background origin of the watermark                       | string                                                                      | -             |          |
| backgroundPosition   | Background position of the watermark                     | string                                                                      | -             |          |
| backgroundPositionX  | Horizontal position of the watermark background          | string                                                                      | -             |          |
| backgroundPositionY  | Vertical position of the watermark background            | string                                                                      | -             |          |
| backgroundSize       | Background size of the watermark                         | string                                                                      | -             |          |

## Code Examples

### Text Watermark

The simplest text watermark configuration:

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

### Image Watermark

Use an image as a watermark:

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

### Custom Styles

You can customize the style and position of the watermark:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'watermark',
      text: 'G6 Graph',
      textFontSize: 20, // Set font size
      textFontFamily: 'Arial', // Set font
      textFontWeight: 'bold', // Set font weight
      textFill: '#1890ff', // Set text color
      rotate: Math.PI / 6, // Set rotation angle
      opacity: 0.15, // Set opacity
      width: 180, // Set watermark width
      height: 100, // Set watermark height
      backgroundRepeat: 'space', // Set repeat mode
      backgroundPosition: 'center', // Set position
      textAlign: 'center', // Set text alignment
      textBaseline: 'middle', // Set baseline alignment
    },
  ],
});
```

## Real Cases

- [Text Watermark](/examples/plugin/watermark/#text)
- [Image Watermark](/examples/plugin/watermark/#repeat)
