---
title: 前言
order: 0
---

## 什么是 G6

G6 是一个图可视化引擎。它提供了图的绘制、布局、分析、交互、动画等基础的图可视化能力。旨在让关系变得透明，简单。让用户获得关系数据的 Insight。

## 入门教程简介

我们在本入门教程中将会完成一个如下图所示简单的图可视化，我们将在后文中称其为 **Tutorial 案例**，<a href='https://codepen.io/Yanyan-Wang/pen/mdbYZvZ' target='_blank'>完整代码</a>。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YlTVS54xV3EAAAAAAAAAAABkARQnAQ'  width=500 alt='img' />

<div style="text-align: center;"><b>Tutorial 案例</b> 效果图</div>

## 前言

我们将会通过本入门教程完成包含图的创建、渲染、元素的配置、布局、交互、动画、工具的最终的  **Tutorial 案例**。在这部分教学中，读者将会学习到 G6 中基础和核心的功能。掌握该入门教程内容后，可以帮助读者初步理解 G6 并为深度理解 G6 打好基础。

该入门教程将会划分为以下几个章节：

- 快速上手
- 创建图
- 元素及其配置
- 使用图布局 Layout
- 图的交互 Behavior
- 插件 & 工具
- \*动画（选读）

`提示` <br />该入门教程是为希望“边学边做”的读者设计的。如果您更希望从底层概念开始学习 G6，您可以参见：[核心概念](/zh/docs/manual/middle/graph)。

## 基础知识

本教程展示如何使用 G6 创建一个完整的图可视化应用。在学习之前，我们假设读者对 HTML 和 JavaScript 有所了解，但并不要求对 G6 有任何的基础。如果读者对 G6 的基本内容已经熟知，可以适当跳过部分内容，有针对性地阅读重要的知识点。

## 环境准备

建议使用新版的 Chrome 浏览器作为运行环境，用任意的代码编辑器进行代码的编写即可。本教程默认采用 CDN 的方式直接引入 G6 类库，引入的版本是 3.7.1，此版本很多特性会大大简化我们的代码。如果希望在其他环境尝试本教程的学习，读者可以参考 [快速上手](/zh/docs/manual/getting-started) 中的安装配置部分。

新建 index.html 文件，并添加如下代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Demo</title>
  </head>
  <body>
    <!-- 引入 G6 -->
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.1/dist/g6.min.js"></script>
    <!-- 4.x and later versions -->
    <!-- <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script> -->

    <script>
      console.log(G6.Global.version);
    </script>
  </body>
</html>
```

使用浏览器打开 index.html 文件，打开控制台，可以看到 G6 的版本号，说明 G6 已成功引入。
