---
title: 使用 SVG 渲染
order: 10
---

使用 SVG 渲染 G6 的图，仅需要在实例化图是配置 `renderer` 为 `'svg'` 即可。如下示例：

```javascript
const graph = new G6.Graph({
  // ... other configurations
  // renderer for the graph
  renderer: 'svg',
});
```

G6 的 SVG 渲染支持 Canvas 的所有功能。需要注意的是，我们都知道 SVG 的性能较差，在大规模数据或图元的情况下请谨慎选择。

SVG 除支持内置的所有节点/边类型以及自定义节点/边时使用与 Canvas 相同的图形外，还支持在自定义节点/边时使用 `'dom'` 图形，详见 [使用 DOM 自定义节点](/zh/docs/manual/advanced/custom-node/#5-使用-dom-自定义节点)。
