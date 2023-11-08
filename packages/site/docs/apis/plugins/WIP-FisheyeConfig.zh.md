---
title: FisheyeConfig
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../../modules/plugins.zh.md) / FisheyeConfig

[插件](../../modules/plugins.zh.md).FisheyeConfig

这是一个名为`FisheyeConfig`的接口，它扩展了`IPluginBaseConfig`接口。它包含以下属性：

- `trigger`：触发方法，可以是`'mousemove'`、`'click'`或`'drag'`。
- `d`：表示鱼眼放大倍数的数字。
- `r`：表示鱼眼半径的数字。
- `delegateStyle`：形状样式。
- `showLabel`：一个布尔值，表示是否显示标签。
- `scaleRBy`：可以是`'wheel'`、`'drag'`、`'unset'`或`undefined`，表示鱼眼半径的缩放方法。
- `scaleDBy`：可以是`'wheel'`、`'drag'`、`'unset'`或`undefined`，表示鱼眼放大倍数的缩放方法。
- `maxR`：表示鱼眼半径最大值的数字。
- `minR`：表示鱼眼半径最小值的数字。
- `maxD`：表示鱼眼放大倍数最大值的数字。
- `minD`：表示鱼眼放大倍数最小值的数字。
- `throttle`：表示节流时间（以毫秒为单位）的数字。
- `showDPerczht`: 一个布尔值，表示是否显示鱼眼放大倍数的百分比。

## 层次结构

- `IPluginBaseConfig`

  ↳ **FisheyeConfig**

## 属性

### className

• 可选 **className**：字符串

#### 继承自

IPluginBaseConfig.className

#### 定义在

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L6)

---

### container

• 可选 **container**：字符串 | HTMLDivElemzht

#### 继承自

IPluginBaseConfig.container

#### 定义在

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L5)

---

### d

• 可选 **d**：数字

表示鱼眼放大倍数的数字。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:30](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L30)

---

### delegateStyle

• 可选 **delegateStyle**：部分<圆形样式属性 & 矩形样式属性 & 椭圆样式属性 & 多边形样式属性 & 线条样式属性 & 折线样式属性 & 文本样式属性 & 图像样式属性 & 路径样式属性 & 球体几何属性 & 立方体几何属性 & 平面几何属性 & {动画？: IAnimates; lod？: 数字; 可见？: 布尔}\>

形状样式。

**默认**

`{
 stroke: '#000',
   strokeOpacity: 0.8,
   lineWidth: 2,
   fillOpacity: 0.1,
   fill: '#ccc'
 }`

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:47](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L47)

---

### graph

• 可选 **graph**：[`IGraph`](../graph/IGraph.zh.md)<行为注册表, 主题注册表\>

#### 继承自

IPluginBaseConfig.graph

#### 定义在

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L7)

---

### maxD

• 可选 **maxD**：数字

表示鱼眼放大倍数最大值的数字。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:59](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L59)

---

### maxR

• 可选 **maxR**：数字

表示鱼眼半径最大值的数字。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:55](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L55)

---

### minD

• 可选 **minD**：数字

表示鱼眼放大倍数最小值的数字。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:61](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L61)

---

### minR

• 可选 **minR**：数字

表示鱼眼半径最小值的数字。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:57](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L57)

---

### r

• 可选 **r**：数字

表示鱼眼半径的数字。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:32](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L32)

---

### scaleDBy

• 可选 **scaleDBy**：`'drag'` \| `'unset'` \| `'wheel'` \| `undefined`

可以是`'wheel'`、`'drag'`、`'unset'`或`undefined`，表示鱼眼放大倍数的缩放方法。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:43](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L43)

---

### scaleRBy

• 可选 **scaleRBy**：`'drag'` \| `'unset'` \| `'wheel'` \| `undefined`

可以是`'wheel'`、`'drag'`、`'unset'`或`undefined`，表示鱼眼半径的缩放方法。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:39](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L39)

---

### showDPerczht

• 可选 **showDPerczht**：布尔值

一个布尔值，表示是否显示鱼眼放大倍数的百分比。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:63](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L63)

---

### showLabel

• 可选 **showLabel**：布尔值

一个布尔值，表示是否显示标签。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:35](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L35)

---

### throttle

• 可选 **throttle**：数字

表示节流时间（以毫秒为单位）的数字。

#### 定义在

[packages/g6/src/stdlib/plugin/fisheye/index.ts:65](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/fisheye/index.ts#L65)

---

### trigger

• 可选 **trigger**：`'click'` \| `'drag'` \| `'mousemove'`

触发方法，可以是`'mousemove'`
