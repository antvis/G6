---
title: Custom Palette
order: 5
---

## Overview

[Core Concepts - Palette](/en/manual/core-concept/palette) mentions that G6 supports discrete palettes and continuous palettes. A discrete palette is essentially an array of colors, while a continuous palette is a color interpolator.

Therefore, customizing a palette also adopts these two methods, and the following sections will introduce how to customize discrete and continuous palettes, respectively.

## Implement Palette

### Discrete Palette

You can simply define a string array that contains color values. Supported color values include: RGB color values, hexadecimal color values, and color names. Below is an example of a discrete palette:

```typescript
const hex = ['#FF0000', '#00FF00', '#0000FF'];

const color = ['red', 'green', 'blue'];

const rgb = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
```

### Continuous Palette

A continuous palette requires the definition of a color interpolator. The interpolator is a function that accepts a numerical value as a parameter and returns a color value. Below is an example of a continuous palette:

```typescript
const color = (value: number) => `rgb(${value * 255}, 0, 0)`;
```

## Register Palette

You can register a palette using the `register` method provided by G6. For more details, please refer to [Register Palette](/en/manual/core-concept/palette#register-palette)

## Use Without Registration

In addition to registration, you can also bypass the registration mechanism and directly pass the palette value at the location where the palette is needed, for example:

```typescript
{
  node: {
    palette: {
      type: 'group',
      field: 'category',
      color: ['#5B8FF9', '#61DDAA', '#F6BD16'], // Pass in a color array.
    }
  },
  edge: {
    palette: {
      type: 'value',
      field: 'value',
      color: (value) => `rgb(${value * 255}, 0, 0)`, // Pass in an interpolator
    }
  }
}
```
