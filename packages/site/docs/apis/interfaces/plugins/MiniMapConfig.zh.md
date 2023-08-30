---
title: MiniMapConfig
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../../modules/plugins.zh.md) / MiniMapConfig

[插件](../../modules/plugins.zh.md).MiniMapConfig

## 层次结构

- `IPluginBaseConfig`

  ↳ **`MiniMapConfig`**

## 属性

### className

• 可选 **className**：字符串

minimap 的类名

#### 覆盖

IPluginBaseConfig.className

#### 定义在

[packages/g6/src/stdlib/plugin/minimap/index.ts:21](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/minimap/index.ts#L21)

---

### container

• 可选 **container**：HTMLDivElement

minimap 的容器

#### 覆盖

IPluginBaseConfig.container

#### 定义在

[packages/g6/src/stdlib/plugin/minimap/index.ts:35](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/minimap/index.ts#L35)

---

### delegateStyle

• 可选 **delegateStyle**：部分<圆形样式属性 & 矩形样式属性 & 椭圆样式属性 & 多边形样式属性 & 线条样式属性 & 折线样式属性 & 文本样式属性 & 图像样式属性 & 路径样式属性 & 球体几何属性 & 立方体几何属性 & 平面几何属性 & {动画？: IAnimates; lod？: 数字; 可见？: 布尔}\>

代理形状的样式。

#### 定义在

[packages/g6/src/stdlib/plugin/minimap/index.ts:27](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/minimap/index.ts#L27)

---

### graph

• 可选 **graph**：[`IGraph`](../graph/IGraph.zh.md)<行为注册表, 主题注册表\>

#### 继承自

IPluginBaseConfig.graph

#### 定义在

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/types/plugin.ts#L7)

---

### hideEdge

• 可选 **hideEdge**：布尔值

是否在 minimap 上隐藏边缘以提高性能。

#### 定义在

[packages/g6/src/stdlib/plugin/minimap/index.ts:33](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/minimap/index.ts#L33)

---

### mode

• 可选 **mode**：`"keyShape"` | `"default"` | `"delegate"`

minimap 的模式。

#### 定义在

[packages/g6/src/stdlib/plugin/minimap/index.ts:23](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/minimap/index.ts#L23)

---

### padding

• 可选 **padding**：数字

minimap 的填充。

#### 定义在

[packages/g6/src/stdlib/plugin/minimap/index.ts:31](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/minimap/index.ts#L31)

---

### refresh

• 可选 **refresh**：布尔值

是否刷新 minimap。

#### 定义在

[packages/g6/src/stdlib/plugin/minimap/index.ts:29](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/minimap/index.ts#L29)

---

### size

• 可选 **size**：数字[]

minimap 的大小。

#### 定义在

[packages/g6/src/stdlib/plugin/minimap/index.ts:25](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/minimap/index.ts#L25)

---

### viewportClassName

• 可选 **viewportClassName**：字符串

视口的类名。

#### 定义在

[packages/g6/src/stdlib/plugin/minimap/index.ts:19](https://github.com/antvis/G6/blob/a69acd5592/packages/g6/src/stdlib/plugin/minimap/index.ts#L19)
