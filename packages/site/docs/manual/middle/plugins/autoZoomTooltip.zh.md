---
title: 缩放画布时 tooltip 和 ContextMenu 自动缩放
order: 1
---

当缩放画布的时候，有时候我们希望 Tooltip、ContextMenu 等组件也自动跟随画布缩放，在实际业务需求中，也遇到了这样的诉求：[https://github.com/antvis/G6/issues/2111](https://github.com/antvis/G6/issues/2111)。<br />

### Tooltip 自动缩放

G6 里面缩放画布是通过 zoom-canvas Behavior 实现的，缩放过程中会触发 wheelzoom 事件，因此，我们只需要监听该事件，就可以让 Tooltip 自动缩放。

```javascript
graph.on('wheelzoom', (e) => {
  e.stopPropagation();
  // 这里的 className 根据实际情况而定，默认是 g6-component-tooltip
  const tooltips = Array.from(document.getElementsByClassName('g6-component-tooltip'));
  tooltips.forEach((tooltip) => {
    if (tooltip && tooltip.style) {
      tooltip.style.transform = `scale(${graph.getZoom()})`;
    }
  });
});
```

也可以根据我们的实际需要，控制 Tooltip 缩放的最大和最小比例。<br /> <br />完整的示例请参考[这里](https://codesandbox.io/s/test-tootip-zoom-zc5yn?file=/index.js)。<br />

### ContextMenu 自动缩放

当画布缩放时，ContextMenu 的自动缩放实现方式和 Tooltip 的完全一样，只需要将 Tooltip 容器的 className 名称修改为 ContextMenu 容器的 className 名即可。
