---
title: 使用 iconfont
order: 4
---

## 概述

为什么使用 iconfont？ 兼容性好、种类多、多色等。在此不做过多介绍，请直接移步 [阿里巴巴-iconfont 平台](https://www.iconfont.cn)。

![iconfont](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rJ3lQa0HR-wAAAAAAAAAAABkARQnAQ)

## 使用

### 下载字体图标

首先，你需要从 [iconfont](https://www.iconfont.cn) 网站下载所需的图标字体。创建一个项目并选择所需的图标，然后下载生成的图标文件。

### 添加字体图标

下载完成后，将包含图标字体文件的目录（通常包括 `.eot`、`.woff`、`.ttf` 和 `.svg` 文件，以及 `iconfont.css` 样式文件）放入你的项目中。

引入方式可自行选择，下面为在 HTML 中引入的例子：

```html
<head>
  <style>
    @import 'path-to-iconfont/iconfont.css';
  </style>
</head>
```

### 使用字体

```js
{
  node: {
    style: {
      iconFontFamily: 'iconfont', // 对应 iconfont.css 中的 `font-family` 属性值
      iconText: '\ue7f1', // 对应 iconfont.css 中的 `content` 属性值，注意加 `u`
      iconFill: '#7863FF'
    }
  }
}
```

### 工具函数 `getIcon()`

为了更方便地获取图标，可以创建一个工具函数 `getIcon`。该函数会从图标文件 `iconfont.json` 中读取图标信息并返回相应的 Unicode 字符。这里注意，手动拼接 unicode 是不行的（`\\u${icon.unicode}`）。详细参考 [MDN String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)。

首先，确保你有一个 `iconfont.json` 文件，包含图标的详细信息。

```js
import fonts from 'path-to-iconfont/iconfont.json';

const icons = fonts.glyphs.map((icon) => {
  return {
    name: icon.font_class,
    unicode: String.fromCodePoint(icon.unicode_decimal), // `\\u${icon.unicode}`,
  };
});

const getIcon = (type: string) => {
  const matchIcon = icons.find((icon) => {
    return icon.name === type;
  }) || { unicode: '', name: 'default' };
  return matchIcon.unicode;
};
```

在项目中使用：

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
