---
title: 常见使用问题汇总
order: 0
---

- [如何设置节点或边的背景](/zh/docs/manual/middle/elements/advanced-style/set-label-bg)
- [如何更新节点或边的样式](/zh/docs/manual/middle/elements/methods/updateElement)
- [如何更新文本样式](/zh/docs/manual/middle/elements/advanced-style/updateText)
- [如何给元素设置渐变色](/zh/docs/manual/middle/elements/advanced-style/gradient)
- [如何给元素设置纹理](/zh/docs/manual/middle/elements/advanced-style/texture)
- [如何设置 Edge 前置](/zh/docs/manual/middle/elements/methods/elementIndex)
- [两点之间存在多条边](/zh/docs/manual/middle/elements/methods/multi-line)
- [React 中使用 G6](/zh/docs/manual/advanced/g6InReact)
- [缩放画布时如何让 Tooltip、ContextMenu 自动缩放](/zh/docs/manual/middle/plugins/autoZoomTooltip)

### fitView 失败
> 为什么明明在图实例上配置了 `fitView: true`，但却不生效？

fitView 不生效的原因可能是：

1. `minZoom` 值不够小。如果你的图范围很大，要缩放到小于 `minZoom` 的值才能完成适配，这种情况下缩放就会失败。图默认的 `minZoom` 是 0.02。解决方案是在实例化图的时候将 `minZoom` 设置一个很小的值；

2. 如果使用的是 `type: force` 布局，布局过程是实时渲染计算结果的，所以会出现模拟力相互作用的动画效果。这种情况下如果每一次渲染都进行 fitView，那么图可能就忽大忽小的，因此若配置了 fitView 那么 G6 会在布局结束的时候，进行一次图的适配。即动画结束时进行大小适配。而 force 在迭代的尾声接近收敛，节点移动的幅度很小，有时候看起来好像动画已经结束了却还没有适配，需要等它完全稳定下来才意味着布局结束，从而进行大小适配；

P.S. force 不支持无动画的布局，近期新增的 `force2` 支持配置 `animate` 来控制是否一边计算布局一边渲染，设置为 `false`，且图实例配置了 `fitView: true`，那么将布局完成后直接绘制出适配容器大小的图。

3. 给到 graph 的 `width` 或 `height` 在图实例化时不准确，导致创建的画布大小不对。这很有可能出现在 React 初始化时，图的容器还没有渲染。如果需要图始终适配容器大小，可以监听容器的 `width`、`height` 变化，进行 `graph.changeSize` 和必要的 `graph.fitView`。例如在用户拖拽浏览器改变大小时，使用 `graph.changeSize`:

```javascript
if (typeof window !== 'undefined') {
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
}
```

### 渲染残影问题

G6 4.x 依赖的渲染引擎 @antv/g@4.x 版本支持了局部渲染，带了性能提升的同时，也带来了图形更新时可能存在渲染残影的问题。比如拖拽节点时，节点的文本会留下轨迹。由于目前 @antv/g 正在进行大版本的升级（到 5.x），可能不考虑在 4.x 彻底修复这个问题。当我们遇到这个问题的时候，考虑通过下面几种方法解决：

1. 检查节点中的图形，包括文本图形，样式配置中是否存在非法值，例如 `null`、`NaN` 等；

2. 尽量使用整数作为数值型的样式值，例如 `r`、`width`、`height`、`fontSize` 等；

3. 使用浏览器字体作为 `labelCfg.style.fontFamily` 或留下残影的文本图形的 `fontFamily` 属性；

4. 给文本增加白色描边，如：

```javascript
// 节点/边/ combo 的文本配置
labelCfg: {
  style: {
    stroke: '#fff',
    lineWidth: 4
  }
}
// 自定义节点/边/ combo 中的文字图形
group.addShape('text', {
  attrs: {
    // ... other attributes,
    stroke: '#fff',
    lineWidth: 4,
  }
})
```

5. 以上方法都不奏效，关闭局部渲染 `graph.get('canvas').set('localRefresh', false)`。这个方法可能导致性能有所降低。


### 卡顿 / 性能差

G6 的性能主要存在两个瓶颈：渲染、计算（例如布局计算）。G6 内部的代码在持续迭代性能优化，尽可能保持内置代码性能最优。有时候，可能是大家在使用 G6 实现自己的应用时，由于不熟悉或 G6 文档不够全面等问题，使得功能设计、写法问题、或 API 使用不太合理导致的表现出卡顿现象。请看专文[《从卡掉渣到满帧率需要几步？》](/docs/manual/faq/performance-opt)，介绍了一些 tips 来帮助你优化实现方式导致的性能问题。