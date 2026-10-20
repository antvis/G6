---
title: Upgrade To 5.0
order: 6
---

This document will guide you through the process of upgrading from G6 version `4.x` to `5.x`. If you are using version `3.x`, please upgrade to version `4.x` first.

## Preparation Before Upgrade

1. Please ensure that your current git branch is clean and there is no uncommitted code.
2. Refer to the [Installation](/en/manual/getting-started/installation/) document to install version `5.x` and remove the dependencies for version `4.x`.

## Start Upgrade

### Data

The data format in the new version has changed as follows:

1. All style attributes in `nodes`, `edges`, and `combos` need to be placed within `style`, and data attributes should be stored in `data`:

```typescript
// 4.x
const data = {
  nodes: [
    { id: 'node1', label: 'node1', size: 20 },
    { id: 'node2', label: 'node2', size: 20 },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
};

// 5.x
const data = {
  nodes: [
    // The label is a non-stylistic attribute, placed in the data, and can be accessed in the style mapping function
    // The `size` is a stylistic attribute, placed within the `style`
    { id: 'node1', data: { label: 'node1' }, style: { size: 20 } },
    { id: 'node2', data: { label: 'node2' }, style: { size: 20 } },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
};
```

Since we have redesigned and implemented the elements, please refer to the corresponding documentation to modify the new element options:

- [Node](/en/manual/element/node/BaseNode/)
- [Edge](/en/manual/element/edge/BaseEdge/)
- [Combo](/en/manual/element/combo/BaseCombo/)

2. If you need to specify the element type in the data, you can use the `type` attribute:

```typescript
{
  nodes: [
    // Specify the node type as rect
    { id: 'node1', type: 'rect' },
  ];
}
```

### Options

**Change** **fitView / fitCenter / fitViewPadding**

- The `fitView` and `fitCenter` options have been merged into `autoFit`.
- To use `fitView`, you can configure it as `autoFit: 'view'`
- To use `fitCenter`, you can configure it as `autoFit: 'center'`
- You can also pass an object for full configuration:

```js
autoFit: {
  type: 'view',
  options: {
    // ...
  }
}
```

- The `fitViewPadding` has been changed to `padding`.

**Removed** **linkCenter**

In version 5.x, the edge connection mechanism will attempt to connect to nodes/Combos in the following order:

1. Connect Port
2. Outline
3. Center

**Removed** **groupByTypes**

**Removed** **autoPaint**

Please manually call the `render` or `draw` method to perform rendering.

**Changed** **modes**

In version 5.x, interaction modes have been removed. You can switch the currently enabled behaviors by setting `behaviors`.

```typescript
// 4.x
{
  modes: {
    default: ['drag-canvas', 'zoom-canvas'],
    preview: ['drag-canvas'],
  },
}

graph.setMode('preview');
```

```typescript

// 5.x
{
  behaviors: ['drag-canvas', 'zoom-canvas'],
}

graph.setBehaviors(['drag-canvas']);

```

**Change** **defaultNode / defaultEdge / defaultCombo**

The element styles have been moved to `[element].style`, for example, `defaultNode` has been changed to `node.style`:

```typescript
// 4.x
{
  defaultNode: {
    size: 20,
    fill: 'red',
  }
}

// 5.x
{
  node: {
    style: {
      size: 20,
      fill: 'red',
    }
  }
}
```

**Change** **nodeStateStyles / edgeStateStyles / comboStateStyle**

Element state styles have been moved to `[element].state`, for example, `nodeStateStyles` has been changed to `node.stateStyles`:

```typescript
// 4.x
{
  nodeStateStyles: {
    selected: {
      fill: 'red',
    }
  }
}

// 5.x
{
  node: {
    state: {
      selected: {
        fill: 'red',
      }
    }
  }
}
```

**Change** **animate / animateCfg**

- The `animate` options has been changed to `animation`
- `animate` and `animateCfg` have been merged into `animation`

```typescript
// 4.x
{
  animate: true,
}

// 5.x
{
  animation: true,
}
{
  animation: {
    duration: 500,
    easing: 'easeLinear',
  }
}
```

**Change** **minZoom / maxZoom**

- The `minZoom` and `maxZoom` options have been merged into `zoomRange`

```typescript
// 4.x
{
  minZoom: 0.5,
  maxZoom: 2,
}

// 5.x
{
  zoomRange: [0.5, 2],
}
```

**Change** **renderer**

G6 5.x supports multi-layer canvases and defaults to using the `canvas` renderer.

The `renderer` no longer supports the string type and has been changed to a callback function:

```typescript
// 4.x
var options = {
  renderer: 'svg',
};

// 5.x
import { Renderer } from '@antv/g-svg';

{
  renderer: () => new Renderer(),
}
```

**Removed** **enabledStack / maxStep**

The built-in undo and redo functionality has been removed in version 5.x. For related capabilities, please use a plugin to implement.

### API

**Change** **data / save / read / changeData**

Version 5.x offers a completely new data API. For details, see [Data API](/en/api/data/).

- The `data` and `changeData` methods from 4.x are replaced by `setData` in 5.x.
- The `save` method from 4.x is replaced by `getData` in 5.x.
- The `read` method from 4.x is replaced by `setData` + `render` in 5.x.

**Change** **get / set**

To access Graph options, please use `getOptions` or the `getXxx` API, such as `getZoomRange`, `getBehaviors`, etc. The `set` method is analogous.

**Change** **getContainer**

Direct API to obtain the container is not currently supported, but you can obtain it through `graph.getCanvas().getContainer()`.

> In most cases, you do not need to directly manipulate the container.

**Removed** **getGroup**

**Change** **getMinZoom / getMaxZoom**

Use `getZoomRange` to obtain the values.

**Change** **setMinZoom / setMaxZoom**

Use the `setZoomRange` method to set the values.

**Change** **getWidth / getHeight**

Use `getSize` to get the dimensions.

**Change** **changeSize**

Use `setSize` to set the dimensions.

**Change** **zoom**

Changed to `zoomBy`.

**Change** **translate**

Changed to `translateBy`.

**Change** **moveTo**

Changed to `translateTo`.

**Change** **focusItem**

Changed to `focusElement`.

**Removed** **addItem / updateItem / removeItem**

To add or remove elements, use the methods `addData` / `updateData` / `removeData` to manipulate data.

**Removed** **refreshItem**

**Removed** **refreshPositions**

**Removed** **updateCombo**

**Removed** **updateCombos**

**Removed** **updateComboTree**

**Change** **node / edge / combo**

Use the `setNode` / `setEdge` / `setCombo` methods as alternatives.

**Change** **showItem / hideItem**

Use the `setElementVisibility` method as an alternative.

**Removed** **getNodes / getEdges / getCombos / getComboChildren / getNeighbors / find / findById / findAll / findAllByState**

In version 5.x, direct retrieval of element instances is not supported.

- To obtain element data, use the methods `getData`, `getNodeData`, `getEdgeData`, `getComboData`, which support searching by element ID.
- To obtain child node data, use the `getChildrenData` method.
- To obtain neighbor node data, use the `getNeighborNodesData` method.
- To find element data based on state, use the `getElementDataByState` method.

**Change** **collapseCombo / expandCombo**

Use the `collapseElement` / `expandElement` methods as alternatives.

**Removed** **collapseExpandCombo**

**Removed** **createCombo**

Combos can now be added using the `addData` / `addComboData` methods.

**Removed** **uncombo**

Combos can now be removed using the `removeData` / `removeComboData` methods.

**Change** **setItemState**

Use the `setElementState` method as an alternative.

**Removed** **clearItemStates**

- To clear all states of a single element: `graph.setElementState(id, [])`
- To clear all states of multiple elements: `graph.setElementState({ id1: [], id2: [] })`

**Removed** **priorityState**

When using `setElementState`, the state that appears later in the array has a higher priority.

**Removed** **setMode**

Use `setBehaviors` to set the current behaviors.

**Removed** **setCurrentMode**

**Change** **layout**

Does not support parameters. To configure the layout, please use `setLayout`.

**Change** **updateLayout**

Changed to `setLayout`.

**Removed** **destroyLayout**

**Change** **addBehaviors / removeBehaviors**

Replaced with `setBehaviors`.

**Removed** **createHull / getHulls / removeHull / removeHulls**

- For multiple `Hull` instances, you need to configure multiple `hull` plugins in `plugins`, such as:

```typescript
{
  plugins: ['hull', 'hull'],
};
```

- Operations to retrieve, update, and remove `Hull` are implemented through `setPlugins`, `updatePlugin`.

**Not yet available** **getNodeDegree**

**Not yet available** **getShortestPathMatrix**

**Not yet available** **getAdjMatrix**

**Removed** **pushStack / getUndoStack / getRedoStack / getStackData / clearStack**

All undo and redo related APIs should be called after obtaining the corresponding plugin, for example:

```typescript
// 'history' is the key configured for use with the plugin
const history = graph.getPluginInstance('history');

history.redo();
```

**Removed** **positionsAnimate / stopAnimate / isAnimating**

Animation-related information is now emitted through events:

- Animation start event: `beforeanimate`
- Animation end event: `afteranimate`
- To stop an animation:

```typescript
graph.on('beforeanimate', (event) => {
  event.animation.stop();
});
```

**Change** **getPointByClient / getClientByPoint / getPointByCanvas / getCanvasByPoint / getGraphCenterPoint / getViewPortCenterPoint**

G6 5.x uses a different coordinate system than 4.x. For details, see [Coordinate](/en/manual/further-reading/coordinate/).

**Removed** **setTextWaterMarker / setImageWaterMarker**

For watermark functionality, please refer to the [Watermark](/en/manual/plugin/Watermark/)plugin.

**Change** **toFullDataURL**

Replaced with `toDataURL`, specify the parameter as: `mode: 'overall'`

```typescript
graph.toDataURL({ mode: 'overall' });
```

**Removed** **downloadFullImage / downloadImage**

Only the capability to export as a `DataURL` is provided. If you need to download an image, please refer to the following example code:

```typescript
async function downloadImage() {
  const dataURL = await graph.toDataURL();
  const [head, content] = dataURL.split(',');
  const contentType = head.match(/:(.*?);/)![1];

  const bstr = atob(content);
  let length = bstr.length;
  const u8arr = new Uint8Array(length);

  while (length--) {
    u8arr[length] = bstr.charCodeAt(length);
  }

  const blob = new Blob([u8arr], { type: contentType });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'graph.png';
  a.click();
}
```

**Removed** **clear**

Use `setData` + `draw` to clear data and the canvas.

### Extension Registration

Unlike G6 4.x, G6 5.x uses a unified extension registration function (register). You can refer to the [Extension Register](/en/manual/graph/extension/#register-extension) to register G6 extensions.

The following G6 4.x registration functions have been deprecated:

- registerNode
- registerEdge
- registerCombo
- registerLayout
- registerBehavior

### Events

Compared to G6 4.x, G6 5.x has the following differences in events:

- The `mouse` and `touch` events have been removed and are unified under the `pointer` event.
- The naming convention for lifecycle events is usually in the format of: `before/after` + `object/property` + `action`, for example: `beforeelementcreate` is triggered before an element is created.
- The following events have been removed:
  - afteractivaterelations
  - afteradditem
  - aftercreateedge
  - aftergraphrefresh
  - aftergraphrefreshposition
  - afteritemrefresh
  - aftermodechange
  - afterremoveitem
  - afterupdateitem
  - beforeadditem
  - beforecreateedge
  - beforegraphrefresh
  - beforegraphrefreshposition
  - beforeitemrefresh
  - beforemodechange
  - beforeremoveitem
  - beforeupdateitem
  - dragnodeend
  - nodeselectchange
  - stackchange
  - tooltipchange
- The following element change events have been removed, but you can still access them through `beforeelementupdate` and `afterelementupdate`:
  - afteritemstatechange
  - afteritemstatesclear
  - afteritemvisibilitychange
  - beforeitemstatechange
  - beforeitemstatesclear
  - beforeitemvisibilitychange
- The following events have been changed:
  - The `graphstatechange` event has been changed to `beforeelementstatechange` / `afterelementstatechange`.
  - The `viewportchange` event has been changed to `beforetransform` / `aftertransform`.

For a complete list of events, please refer to [Event](/en/api/graph/#event).
