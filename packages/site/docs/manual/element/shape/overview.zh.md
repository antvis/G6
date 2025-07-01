---
title: 图形 Shape 与 KeyShape
order: 1
---

## 图形 Shape

Shape 指 G6 中的图形、形状，可以是圆形、矩形、路径等。它一般与 G6 中的节点、边、Combo 相关。**💡 G6 中的每一种节点/边/Combo 都是由一个或多个 Shape 组合而成。节点、边、Combo 的样式配置都会被体现到对应的图形上。**

例如下图（左）的节点包含了一个圆形图形；下图（中）的节点含有一个圆形和一个文本图形；下图（右）的节点中含有 5 个圆形（蓝绿色的圆和上下左右四个锚点）、一个文本图形。但每种节点/边/Combo 都会有自己的唯一关键图形 keyShape，下图中三个节点的 keyShape 都是蓝绿色的圆，keyShape 主要用于交互检测、样式随 [元素状态](/manual/element/state) 自动更新等，见 [keyShape](#keyshape)。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OcaaTIIu_4cAAAAAAAAAAABkARQnAQ' width=50 alt='img'/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r5M0Sowd1R8AAAAAAAAAAABkARQnAQ' width=50 alt='img'/><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pHoETad75CIAAAAAAAAAAABkARQnAQ' width=50 alt='img'/>

> （左）只含有一个圆形图形的节点，keyShape 是该圆形。（中）含有圆形和文本图形的节点，keyShape 是圆形。（右）含有主要圆形、文本、上下左右四个小圆形的节点，keyShape 是圆形。

G6 使用不同的 shape 组合，设计了多种内置的节点/边/ Combo 。G6 内置节点的有 'circle'， 'rect'，'ellipse'，...（详见 [内置节点](/manual/element/node/base-node)）；内置边的有 'line'，'polyline'，'cubic'，...（详见 [内置边](/manual/element/edge/base-edge)）；内置 Combo 有 'circle'，'rect'，（详见 [内置 Combo](/manual/element/combo/base-combo)）。

除了使用内置的节点/边/ Combo 外，G6 还允许用户通过自己搭配和组合 shape 进行节点/边/ Combo 的自定义，详见 [自定义节点](/manual/element/node/custom-node)，[自定义边](/manual/element/edge/custom-edge)，[自定义 Combo](/manual/element/combo/custom-combo)。

## KeyShape

在 G6 中，每个节点、边、Combo 都由一个或多个 Shape 组成，但其中有一个 Shape 被称为 keyShape，它是该元素的“关键图形”：

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TZt2S7Z0d-8AAAAAAAAAAAAADmJ7AQ/original" />

> 节点的关键图形就是上图的颜色区域

### 包围盒确定

**确定节点 / Combo 的包围盒（Bounding Box）** ，从而计算相关边的连入点（与相关边的交点）。若 keyShape 不同，节点与边的交点计算结果不同。

#### 示例  

本例中的一个节点由一个 rect 图形和一个带灰色描边、填充透明的 circle 图形构成。

- 当节点的 keyShape 为 circle 时：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CY7cSaMs4U0AAAAAAAAAAABkARQnAQ' width=220 alt='img'/>

- 当节点的 keyShape 为 rect 时：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*upWTQLTvxGEAAAAAAAAAAABkARQnAQ' width=250 alt='img'/>

## Shape 的生命周期

> 当用户需要 [自定义节点](/manual/element/node/custom-node)、[自定义边](/manual/element/edge/custom-edge)、[自定义 Combo](/manual/element/combo/custom-combo) 时，需要了解 Shape 的生命周期。使用内置节点/边/Combo 则可以跳过这一部分内容。

从整体来看，Shape 的生命周期分为：

- **初始化渲染**：首次根据数据和样式配置绘制出 Shape。
- **更新**：当数据或样式发生变化时，自动更新 Shape 的表现。
- **操作**：响应交互状态（如 selected、active、hover 等），动态调整样式。
- **销毁**：Shape 被移除时的清理（通常由 Graph 自动管理，用户无需关心）。

在自定义 Shape 时，最常见的需求就是“如何高效地管理 Shape 的创建、更新和销毁”。G6 为此在 BaseShape 中设计了一个非常实用的方法：

### upsert 的原理与优势

upsert 是“update” 和 “insert” 的合成词，意思是“有则更新，无则创建”。它的作用可以简单理解为：

- **自动判断**：你只需描述希望 Shape 呈现的样子，`upsert` 会自动判断当前 Shape 是否已存在。如果不存在则创建，如果已存在则更新，如果需要删除则自动移除。
- **简化逻辑**：开发者无需手动管理 Shape 的增删改查，避免了重复代码和状态混乱。
- **提升健壮性**：无论是初次渲染、数据变更还是状态切换，upsert 都能保证 Shape 始终与数据和配置保持同步。

**类型定义：**

```js
/**
 * 创建、更新或删除图形
 * @param className 图形名称
 * @param Ctor 图形类型
 * @param style 图形样式。若要删除图形，传入 false
 * @param container 容器
 * @param hooks 钩子函数
 * @returns 图形实例
 */
upsert<T extends DisplayObject>(
  className: string,
  Ctor: string | { new (...args: any[]): T },
  style: T['attributes'] | false,
  container: DisplayObject,
  hooks?: UpsertHooks,
): T | undefined {}
```

你只需要描述“我现在想要什么样的图形”，不用关心它是新建、更新还是删除，upsert 都会帮你处理好。这让自定义和管理复杂的复合 Shape 变得非常简单和安全。
