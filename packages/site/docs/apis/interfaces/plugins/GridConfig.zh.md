---
title: GridConfig
---

[概述 - v5.0.0-alpha.9](../../README.zh.md) / [模块](../../modules.zh.md) / [插件](../../modules/plugins.zh.md) / GridConfig

[插件](../../modules/plugins.zh.md).GridConfig

这是一个名为`GridConfig`的接口，它扩展了`IPluginBaseConfig`接口。它包含以下属性：

- `img`：表示网格背景图像的字符串。
- `follow`：一个布尔值，表示网格是否跟随视图移动。

## 层次结构

- `IPluginBaseConfig`

  ↳ **`GridConfig`**

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

### follow

• 可选 **follow**：布尔值

#### 定义在

[packages/g6/src/stdlib/plugin/grid/index.ts:19](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/grid/index.ts#L19)

---

### graph

• 可选 **graph**：[`IGraph`](../graph/IGraph.zh.md)<行为注册表, 主题注册表\>

#### 继承自

IPluginBaseConfig.graph

#### 定义在

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/types/plugin.ts#L7)

---

### img

• 可选 **img**：字符串

#### 定义在

[packages/g6/src/stdlib/plugin/grid/index.ts:18](https://github.com/antvis/G6/blob/ef7751dae9/packages/g6/src/stdlib/plugin/grid/index.ts#L18)
