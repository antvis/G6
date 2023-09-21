---
title: Preface
order: 0
---

## What is G6

G6 is a graph visualization engine. It provides basic graph visualization capabilities such as drawing, layout, analysis, interaction, animation, etc. It aims to make relationships transparent and simple, allowing users to gain insights into relationship data.

## Introduction to the Tutorial

In this tutorial, we will create a simple graph visualization as shown in the following image, which we will refer to as the **Tutorial Example**, <a href='https://codesandbox.io/s/g6-v5-tutorial-j67vnm?file=/index.js' target='_blank'>Full Code</a>.

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9VQjTp0Ipi8AAAAAAAAAAAAADmJ7AQ/original' style="text-align: center;" width=500 alt='img' />

<div style="text-align: center;"><b>Tutorial Example</b></div>

## Introduction

In this tutorial, we will complete the creation, rendering, element configuration, layout, interaction, animation, and tooling of a graph in the Tutorial Example. In this tutorial, readers will learn the basic and core functionalities of G6. After mastering the content of this tutorial, readers will have a preliminary understanding of G6 and lay a foundation for a deeper understanding.

This tutorial will be divided into the following sections:

- Quick Start
- Creating a Graph
- Elements and their Configuration
- Using Graph Layouts
- Graph Interaction Behavior
- Plugins and Tools
- Animation

`Note`
<br />
This tutorial is designed for readers who want to learn while doing. More tutorials for G6 5.0 are under development. For now, readers can refer to the [API Doc](https://g6-next.antv.antgroup.com/en/apis).

## Prerequisites

This tutorial demonstrates how to use G6 to create a complete graph visualization application. Before learning, we assume that readers have some knowledge of HTML and JavaScript, but no prior knowledge of G6 is required. If readers are already familiar with the basics of G6, they can skip some content and focus on important points.

## Environment Setup

It is recommended to use the latest version of the Chrome browser as the runtime environment and any code editor for code writing. This tutorial assumes that G6 is directly imported via CDN. The version used is 3.7.1, which simplifies many features in our code. If readers want to try this tutorial in a different environment, they can refer to the installation and configuration section in the [Quick Start](https://g6-next.antv.antgroup.com/en/manual/getting-started) for guidance.

Create a new index.html file and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Demo</title>
  </head>
  <body>
    <!-- Import G6 5.0 beta -->
    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/5.0.0-beta.10/dist/g6.min.js"></script>

    <script>
      console.log(G6);
    </script>
  </body>
</html>
```

Open the index.html file in a browser, open the console, and you should see G6 printed, indicating successful import.
