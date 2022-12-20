---
title: Frequently asked questions
order: 0
---

- [Set the background of the label on node or edge](/en/docs/manual/middle/elements/advanced-style/set-label-bg)
- [Update Item's Style](/en/docs/manual/middle/elements/methods/updateElement)
- [Update Label](/en/docs/manual/middle/elements/advanced-style/updateText)
- [Gradient Color for Objects in G6](/en/docs/manual/middle/elements/advanced-style/gradient)
- [Fill with Texture in G6](/en/docs/manual/middle/elements/advanced-style/texture)
- [Render the Edge on the Top](/en/docs/manual/middle/elements/methods/elementIndex)
- [Multiple Edges between Two Nodes](/en/docs/manual/middle/elements/methods/multi-line)
- [G6 in React](/en/docs/manual/advanced/g6InReact)
- [How to auto zoom Tooltip、ContextMenu when zoom canvas](/en/docs/manual/middle/plugins/autoZoomTooltip)


### fitView Failed
> I configured `fitView: true` on the graph instance, but it is not taking effect

The reasons and solutions for it：

1. The value of `minZoom` is too big. If you have a graph with large range, e.g. positions of nodes range from 0 to 10000, the zoom ratio to propertly fit to the view requires a very small value of `minZoom`. So the zoom failed. The default value of `minZoom` is 0.02. To address it, you could assign a small value to `minZoom`, e.g. 0.0000001;

2. If you are using `type: force` layout, or other force family layouts e,g, force2、forceAtlas2 etc. and assigned `animate: true` for them. The animation looks like force simulation is the result of rendering the mid-result after each iteration during the layout calculation. If we do `fitView` every single time the graph renders, the view might flashes a lot. So the `fitView` will be called after the layout is totally done. And, when the force layout going to end, the displacements of the nodes might be micro. It looks like the animation is finished but the graph did not fit to view. It is also expected, since the `fitView` will only be called after the force layout is totally finished.

P.S. force does not support silence layout right now. But we add a new force family layout named `force2`, which supports config it by `animate`. If it is assigned to `false` and the graph instance is configured with `fitView: true`, the graph will not be rendered until the layout is done and fit to the view in the same time.

3. The `width` or `height` for the graph instance is not correct. Oversize comparing to the container, initial state at React, or some other reasons might lead to the problem. If you want to keep the graph fitting the the container, listen to the changes of `width` and `height` of the container, and call `graph.changeSize` and `graph.fitView`. e.g. call `graph.changeSize` after the user resize the browser:

```javascript
if (typeof window !== 'undefined') {
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
}
```

### Rendering Residuals

G6 4.x depends on the rendering engine @antv/g@4.x, which supports the local refresh. Local refresh definitely brings the performance improvements, but the residual problem in the same time. e.e. the label of the node leaves the residuals while dragging the node. Recently, @antv/g is in the process of upgrading to v5.x, it might not consider to fix the issue at v4.x. So when we encounter the problem, we could try the following steps to alleviate the problem:

1. Check the attributes of the shapes in the node/edge/combo who leaves the residuals to avoid the invalid values, e.g. `null`, `NaN`, etc.;

2. Use the round number for the number type attributes if it is possible, e.g. `r`, `width`, `height`, `fontSize`, etc.;

3. Assign `labelCfg.style.fontFamily` or `fontFamily` in the text shape who leaves residuals with the font of the broswer;

4. Add white stroke to the text, e.g.:

```javascript
// node/edge/combo config
labelCfg: {
  style: {
    stroke: '#fff',
    lineWidth: 4
  }
}
// for the text shape in custom node/edge/combo
group.addShape('text', {
  attrs: {
    // ... other attributes,
    stroke: '#fff',
    lineWidth: 4,
  }
  // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
  name: 'text-shape'
})
```

5. If the steps above did not solve your problem, disable local refresh by `graph.get('canvas').set('localRefresh', false)`, and this might slow down the rendering.


### Performance Improvement

The performance problem in G6 has two aspect: rendering and calculation(e.g. layout). We are trying our best to improve the built-in code in G6 to make the proformance better. But sometimes, we suggest users to implement graph app with better way to alleviate the probmen. Refre to [Performance Tips for G6 Apps](/en/docs/manual/faq/performance-opt) to see the tips for your app!