---
title: Watermark
---

## Overview

The Watermark plugin supports using text and images as watermarks. It works by adding a `background-image` property to the Graph container's div, allowing control of watermark position and style through CSS. For text watermarks, it converts text to images using a hidden canvas.

## Use Cases

The Watermark plugin is mainly used in the following scenarios:

- Add copyright or ownership identification to graphs
- Mark graph status during presentations or previews
- Add anti-leak markers to sensitive data

## Basic Usage

```js
const graph = new Graph({
  plugins: [
    {
      type: 'watermark',
      text: 'G6 Graph', // watermark text
      opacity: 0.2, // opacity
      rotate: Math.PI / 12, // rotation angle
    },
  ],
});
```

## Live Demo

<embed src="@/common/api/plugins/watermark.md"></embed>

## Options

| Property             | Description                                         | Type                                                                        | Default      | Required |
| -------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- | ------------ | -------- |
| type                 | Plugin type                                         | string                                                                      | `watermark`  | ✓        |
| width                | Width of single watermark                           | number                                                                      | 200          |          |
| height               | Height of single watermark                          | number                                                                      | 100          |          |
| opacity              | Opacity of watermark                                | number                                                                      | 0.2          |          |
| rotate               | Rotation angle of watermark                         | number                                                                      | Math.PI / 12 |          |
| imageURL             | Image URL for watermark, takes precedence over text | string                                                                      | -            |          |
| text                 | Watermark text content                              | string                                                                      | -            |          |
| textFill             | Color of text watermark                             | string                                                                      | `#000`       |          |
| textFontSize         | Font size of text watermark                         | number                                                                      | 16           |          |
| textFontFamily       | Font family of text watermark                       | string                                                                      | -            |          |
| textFontWeight       | Font weight of text watermark                       | string                                                                      | -            |          |
| textFontVariant      | Font variant of text watermark                      | string                                                                      | -            |          |
| textAlign            | Text alignment of watermark                         | `center` \| `end` \| `left` \| `right` \| `start`                           | `center`     |          |
| textBaseline         | Text baseline of watermark                          | `alphabetic` \| `bottom` \| `hanging` \| `ideographic` \| `middle` \| `top` | `middle`     |          |
| backgroundRepeat     | Repeat pattern of watermark                         | string                                                                      | `repeat`     |          |
| backgroundAttachment | Background attachment behavior                      | string                                                                      | -            |          |
| backgroundBlendMode  | Background blend mode                               | string                                                                      | -            |          |
| backgroundClip       | Background clip                                     | string                                                                      | -            |          |
| backgroundColor      | Background color                                    | string                                                                      | -            |          |
| backgroundImage      | Background image                                    | string                                                                      | -            |          |
| backgroundOrigin     | Background origin                                   | string                                                                      | -            |          |
| backgroundPosition   | Background position                                 | string                                                                      | -            |          |
| backgroundPositionX  | Horizontal background position                      | string                                                                      | -            |          |
| backgroundPositionY  | Vertical background position                        | string                                                                      | -            |          |
| backgroundSize       | Background size                                     | string                                                                      | -            |          |

## Code Examples

### Text Watermark

Simplest text watermark configuration:

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

Using an image as watermark:

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

### Custom Style

Customize watermark style and position:

```js
const graph = new Graph({
  plugins: [
    {
      type: 'watermark',
      text: 'G6 Graph',
      textFontSize: 20, // Set font size
      textFontFamily: 'Arial', // Set font family
      textFontWeight: 'bold', // Set font weight
      textFill: '#1890ff', // Set text color
      rotate: Math.PI / 6, // Set rotation angle
      opacity: 0.15, // Set opacity
      width: 180, // Set watermark width
      height: 100, // Set watermark height
      backgroundRepeat: 'space', // Set repeat pattern
      backgroundPosition: 'center', // Set position
      textAlign: 'center', // Set text alignment
      textBaseline: 'middle', // Set baseline alignment
    },
  ],
});
```

## Examples

- [Text Watermark](/en/examples/plugin/watermark/#text)
- [Image Watermark](/en/examples/plugin/watermark/#repeat)
