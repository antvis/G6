---
title: Preface
order: 0
---

## What is G6

[G6](https://github.com/antvis/g6) is a graph visualization engine, which provides a set of basic mechanisms, including rendering, layout, analysis, interaction, animation, and other auxiliary tools. G6 aims to simplify the complex relationships, and help people to obtain the insight of relational data.

## Introduction to The Tutorial

We will build a simple graph visualization during this tutorial. We call this demo **Tutorial Demo** in the following Tutorial. <a href='https://codepen.io/Yanyan-Wang/pen/mdbYZvZ' target='_blank'>Complete Code</a>.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YlTVS54xV3EAAAAAAAAAAABkARQnAQ'  width=500 alt='img' />

<div style="text-align: center;"><b>Tutorial Demo</b> result</div>

## Preface

This tutorial introduces how to combine creating and rendering a graph, configuring items, layout, interaction, animation, and other tools to complete the final **Tutorial Demo**. The readers will learn the basic and key concepts of G6 in this tutorial.

There are 6 chapters in this tutorial:

- Create & Render a Graph
- Items & Their Configurations
- Utilize Layout
- Interaction Behaviors
- Plugins & Tools
- \*Animation (not Required)

**Tips:** <br />This tutorial is designed for people who prefer to learn by doing. If you prefer learning concepts from the ground up, check out our [Key Concepts](/en/docs/manual/middle/graph). You might find this tutorial and the guide complementary to each other.

## Prerequisites

It doesn't matter if you're not familiar with G6. But we’ll assume that you have some familiarity with HTML and JavaScript, but you should be able to follow along even if you’re coming from a different programming language. You might be tempted to skip if you already know the basics of G6.

## Setup

Any code editor works for this Tutorial. We recommend to run this demo in Chrome. In this tutorial, we import G6 V3.7.1 by CDN. We simplified the code to make it easy. For other environments, please refer to the installation guide in [Getting Started](/en/docs/manual/getting-started).

New an index.html file, and add the code below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Demo</title>
  </head>
  <body>
    <!-- import G6 by CDN -->
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.7.1/dist/g6.min.js"></script>
    <!-- 4.x and later versions -->
    <!-- <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script> -->

    <script>
      console.log(G6.Global.version);
    </script>
  </body>
</html>
```

Open index.html with your browser. It is success if there is the version number of G6 printed in the console.
