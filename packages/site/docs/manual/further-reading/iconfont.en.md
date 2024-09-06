---
title: Using Iconfont
order: 4
---

## Overview

Why use iconfont? It offers great compatibility, a wide variety of icons, and multicolor options. For more details, please visit the [Alibaba Iconfont Platform](https://www.iconfont.cn).

![iconfont](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rJ3lQa0HR-wAAAAAAAAAAABkARQnAQ)

## Usage

### Download Font Icons

First, you need to download the desired font icons from the [iconfont](https://www.iconfont.cn) website. Create a project, select the required icons, and then download the generated icon files.

### Add Font Icons

After downloading, place the directory containing the icon font files (typically including `.eot`, `.woff`, `.ttf`, and `.svg` files, as well as the `iconfont.css` stylesheet) into your project.

You can choose how to include them. Below is an example of how to include them in HTML:

```html
<head>
  <style>
    @import 'path-to-iconfont/iconfont.css';
  </style>
</head>
```

### Using the Font

```js
{
  node: {
    style: {
      iconFontFamily: 'iconfont', // Corresponds to the `font-family` value in iconfont.css
      iconText: '\ue7f1', // Corresponds to the `content` value in iconfont.css, make sure to add `u`
      iconFill: '#7863FF'
    }
  }
}
```

### Utility Function `getIcon()`

To make it easier to retrieve icons, you can create a utility function `getIcon`. This function reads the icon information from the `iconfont.json` file and returns the corresponding Unicode character. Note that manually concatenating Unicode (`\\u${icon.unicode}`) won't work. Refer to [MDN String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) for details.

First, ensure you have an `iconfont.json` file containing the detailed icon information.

```js
import fonts from 'path-to-iconfont/iconfont.json';

const icons = fonts.glyphs.map((icon) => {
  return {
    name: icon.font_class,
    unicode: String.fromCodePoint(icon.unicode_decimal), // `\\u${icon.unicode}`,
  };
});

const getIcon = (type) => {
  const matchIcon = icons.find((icon) => {
    return icon.name === type;
  }) || { unicode: '', name: 'default' };
  return matchIcon.unicode;
};
```

Use it in your project:

```js
{
  node: {
    style: {
      iconFontFamily: "iconfont",
      iconText: getIcon('logo')
    }
  }
}
```
