---
title: 自定义色板
order: 4
---

## 概述

[色板](/manual/theme/palette) 中提到，G6 支持离散色板和连续色板，其中离散色板本质上是一个颜色数组，而连续色板是一个颜色插值器。

因此自定义色板也采用这两种方式，下面分别介绍如何自定义离散色板和连续色板。

## 实现色板

### 离散色板

直接定义一个包含颜色值的字符串数组即可，颜值值支持：RGB 色值、16 进制、颜色名，下面是一组离散色板示例：

```typescript
const hex = ['#FF0000', '#00FF00', '#0000FF'];

const color = ['red', 'green', 'blue'];

const rgb = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
```

### 连续色板

连续色板需要定义一个颜色插值器，插值器是一个函数，接受一个数值参数，返回一个颜色值，下面是一个连续色板示例：

```typescript
const color = (value: number) => `rgb(${value * 255}, 0, 0)`;
```

## 注册色板

通过 G6 提供的 register 方法注册即可，详见[注册色板](/manual/theme/palette#注册色板)

## 非注册方式使用

除此之外，你也可以在需要使用色板的位置跳过注册机制直接传入色板值，例如：

```typescript
{
  node: {
    palette: {
      type: 'group',
      field: 'category',
      color: ['#5B8FF9', '#61DDAA', '#F6BD16'], // 传入颜色数组
    }
  },
  edge: {
    palette: {
      type: 'value',
      field: 'value',
      color: (value) => `rgb(${value * 255}, 0, 0)`, // 传入插值器
    }
  }
}
```
