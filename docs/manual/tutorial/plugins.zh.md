---
title: 插件与工具
order: 5
---

为辅助用户在图上探索，G6 提供了一些辅助工具，其中一部分是插件工具，另一部分是交互工具。

本文将为 **Tutorial 案例** 添加缩略图插件、网格插件、节点提示框、边提示框。

## 插件

使用插件时，有三个步骤：<br />  Step 1: 引入插件；<br />  Step 2: 实例化插件；<br />  Step 3: 在实例化图时将插件的实例配置到图上。

### Minimap

缩略图 (Minimap) 是一种常见的用于快速预览和探索图的工具，可作为导航辅助用户探索大规模图。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*kGesRLgy1CsAAAAAAAAAAABkARQnAQ' width=520 alt='img' />

现在，我们为 **Tutorial 案例** 配置一个 Minimap：

**预期效果**

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SI8ZSpcqecgAAAAAAAAAAABkARQnAQ' width=350 alt='img' />

**使用方法**

Minimap 是 G6 的插件之一，引入 G6 后可以直接使用。实例化 Minimap 对象，并将其配置到图实例的插件列表里即可：

```javascript
// 实例化 minimap 插件
const minimap = new G6.Minimap({
  size: [100, 100],
  className: 'minimap',
  type: 'delegate',
});

// 实例化图
const graph = new G6.Graph({
  // ...                           // 其他配置项
  plugins: [minimap], // 将 minimap 实例配置到图上
});
```



### Image Minimap

由于 [Minimap](#minimap) 的原理是将主画布内容复制到 minimap 的画布上，在大数据量下可能会造成双倍的绘制效率成本。为缓解该问题，Image Minimap 采用另一种机制，根据提供的图片地址或 base64 字符串 `graphImg` 绘制 `<img />` 代替 minimap 上的 canvas。该方法可以大大减轻两倍 canvas 绘制的压力。但 `graphImg` 完全交由 G6 的用户控制，需要注意主画布更新时需要使用 `updateGraphImg` 方法替换 `graphImg`。

**预期效果**

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>


**使用方法**

实例化 Image Minimap 插件时，`graphImg` 是必要参数。建议在主画布更新时使用 `updateGraphImg(img)` 同步更新 minimap 图片，其中参数 `img` 是图片地址或 base64 文本。


```javascript
// 实例化 Image Minimap 插件
const imageMinimap = new G6.ImageMinimap({
  width: 200,
  graphImg: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ'
});
const graph = new G6.Graph({
  //... 其他配置项
  plugins: [imageMinimap], // 配置 imageMinimap 插件
});

graph.data(data);
graph.render()

... // 一些主画布更新操作
imageMinimap.updateGraphImg(img); // 使用新的图片（用户自己生成）替换 minimap 图片

```


### Grid 网格

网格可用于辅助用户在拖拽节点时对齐到网格。

**预期效果**

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*y8u6Rrc78uIAAAAAAAAAAABkARQnAQ' width=300 alt='img' />

**使用方法** 实例化插件和配置插件到图上：

```javascript
// const minimap = ...

// 实例化 grid 插件
const grid = new G6.Grid();

// 实例化图
const graph = new G6.Graph({
  // ...                        // 其他配置项
  plugins: [minimap, grid], // 将 grid 实例配置到图上
});
```

## 交互工具

交互工具是指配置到图上交互模式中的工具。使用交互工具时，有两个步骤：<br />  Step 1: 在实例化图时配置 `modes`；<br />  Step 2: 为交互工具定义样式。

### tooltip 节点提示框

节点提示框可以用在边的详细信息的展示。当鼠标滑过节点时，显示一个浮层告知节点的详细信息。更多配置参见 [内置交互 tooltip](/zh/docs/manual/middle/states/defaultBehavior#tooltip)。

**预期效果**

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 alt='img' />

**使用方法**

实例化图时配置 `'tooltip'` 到 `modes` 中：

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      // ...
      {
        type: 'tooltip', // 提示框
        formatText(model) {
          // 提示框文本内容
          const text = 'label: ' + model.label + '<br/> class: ' + model.class;
          return text;
        },
      },
    ],
  },
});
```

由于 tooltip 实际上是一个悬浮的 `<div>` 标签，因此可在 HTML 的 `<style>` 标签或 CSS 中设置样式。下面展示在 HTML 中设置样式：

```html
<head>
  <meta charset="UTF-8" />
  <title>Tutorial Demo</title>

  <style>
    /* 提示框的样式 */
    .g6-tooltip {
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      font-size: 12px;
      color: #545454;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px 8px;
      box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    }
  </style>
</head>
```

### edge-tooltip 边提示框

边提示框可以用在边的详细信息的展示。当鼠标滑过边时，显示一个浮层告知边的详细信息。更多配置参见 [内置交互 edge-tooltip](/zh/docs/manual/middle/states/defaultBehavior#edge-tooltip)。

**预期效果**

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Uk10SYFNNi8AAAAAAAAAAABkARQnAQ' width=300 alt='img' />

**使用方法**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      // ...
      {
        type: 'tooltip', // 节点提示框
        // ...
      },
      {
        type: 'edge-tooltip', // 边提示框
        formatText(model) {
          // 边提示框文本内容
          const text =
            'source: ' +
            model.source +
            '<br/> target: ' +
            model.target +
            '<br/> weight: ' +
            model.weight;
          return text;
        },
      },
    ],
  },
});
```

与 tooltip 相同，edge-tooltip 是一个悬浮的 `<div>` 标签，可以使用与 tooltip 相同的方法设置其悬浮框的样式。

## 完整代码

至此，**Tutorial 案例** 完成，完整代码见：<a href='https://codepen.io/Yanyan-Wang/pen/mdbYZvZ' target='_blank'>Tutorial 案例代码</a>。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span><br /> 若需更换数据，请替换  `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'`  为新的数据文件地址。
