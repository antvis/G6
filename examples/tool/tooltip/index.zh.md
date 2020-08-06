---
title: 提示框
order: 0
---

G6 提供了两种 Tooltip，分别插件和 behavior。Tooltip behavior 即将在 v4.0 中废除，推荐使用插件 Tooltip。

## 使用指南

下面的第一个示例是插件 Tooltip。将实例化的 Tooltip 配置到图的 `plugins` 中即可。需要注意的是 `offsetX` 与 `offsetY` 用于调整 tooltip 的偏移，需要考虑父容器的 `padding` 值。如在本例中，画布上层容器有 `24px 16px` 的 padding，则设置 tooltip 的 `offsetX` 与 `offsetY` 分别为 `16 + 10` 与 `24 + 10`。若需要定义 tooltip 的样式，需要定义类名为 `g6-component-tooltip` 的标签的 CSS 样式，见下方。使用方法详见 [Tooltip 插件 API](/zh/docs/api/Plugins#tooltip)。


下面第二～第四个示例展示了 tooltip behavior。若需要定义 tooltip 的样式，需要定义类名为 `g6-tooltip` 的标签的 CSS 样式，见下方。使用方法详见 [Tooltip Behavior](/zh/docs/manual/middle/states/defaultBehavior#tooltip)。


```
// 使用 Tooltip 插件，请将 'g6-tooltip' 替换为 'g6-component-tooltip'
.g6-tooltip { 
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
```
