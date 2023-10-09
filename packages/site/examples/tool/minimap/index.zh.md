---
title: 小地图导航
order: 2
---

G6 中内置的 Minimap 组件，但未默认注册。需要将其引入到代码中，并使用 `extend` 方法注册后，方可在图实例上配置和使用。

## 使用指南

下面的代码演示展示了如何在图上使用 Minimap。如果需要定义 Minimap 的样式，需要定义类名为 `g6-minimap-container` 与 `g6-minimap-viewport` 的标签的 CSS 样式：

```css
.g6-minimap-container {
  border: 1px solid #e2e2e2;
}
.g6-minimap-viewport {
  border: 2px solid rgb(25, 128, 255);
}
```
