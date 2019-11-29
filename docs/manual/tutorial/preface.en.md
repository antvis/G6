---
title: Preface
order: 0
---

## What is G6
[G6](https://github.com/antvis/g6) is a graph visualization engine, which provides a set of basic mechanisms, including rendering, layout, analysis, interaction, animation, and other auxiliary tools. G6 aims to simplify the complex relationships, and help people to obtain the insight of relational data.

## Introduction to The Tutorial
In this tutorial, we will complete a simple graph visualization as shown below step by step. We will call this demo **Tutorial demo** in the following tutorial. [Complete Code](https://codepen.io/Yanyan-Wang/pen/mdbYZvZ)。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YlTVS54xV3EAAAAAAAAAAABkARQnAQ'  width=500 />

<div style="text-align: center;"><b>Tutorial demo</b> result</div>


## Preface
This tutorial introduces how to combine creating and rendering a graph, configuring items, layout, interaction, animation, and other tools to complete the final **tutorial demo**. The readers will learn the basic and key concepts of G6 in this tutorial.

There are 6 chapters in this tutorial:

- 快速上手
- 创建图
- 元素及其配置
- 使用图布局 Layout
- 图的交互 Behavior
- 插件 & 工具
- *动画（选读）

`提示` <br />该入门教程是为希望“边学边做”的读者设计的。如果您更希望从底层概念开始学习 G6，您可以参见：[核心概念](../middle/keyConcept)。

## 基础知识
本教程会从教你使用 G6 去创建一个完整的图可视化应用。在学习之前，我们假设读者对 HTML 和 JavaScript 有所了解，但并不要求对 G6 有任何的基础。如果读者对 G6 的基本内容已经熟知，可以适当跳过部分内容，有针对性地阅读重要的知识点。

## 环境准备
建议使用新版的 Chrome 浏览器作为运行环境，用任意的代码编辑器进行代码的编写即可。本教程默认采用 CDN 的方式直接引入 G6 类库，引入的版本是 3.1.1，此版本很多特性会大大简化我们的代码。如果希望在其他环境尝试本教程的学习，读者可以参考 [快速上手](../getting-started) 中的安装配置部分。

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
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.1/build/g6.js"></script>

    <script>
      console.log(G6.Global.version);
    </script>
  </body>
</html>

```

使用浏览器打开 index.html 文件，打开控制台，可以看到 G6 的版本号，说明 G6 已成功引入。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5Ex2RJekVbcAAAAAAAAAAABkARQnAQ' width=200 />
