---
title: Upgrade To 5.0
order: 6
---

This document will guide you through the process of upgrading from G6 version `4.x` to `5.x`. If you are using version `3.x`, please upgrade to version `4.x` first.

## Preparation Before Upgrade

1. Please ensure that your current git branch is clean and there is no uncommitted code.
2. Refer to the [Installation](./getting-started/installation) document to install version `5.x` and remove the dependencies for version `4.x`.

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

- [Node](/en/api/elements/nodes/base-node)
- [Edge](/en/api/elements/edges/base-edge)
- [Combo](/en/api/elements/combos/base-combo)

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

<Badge type="warning">Change</Badge> **fitView / fitCenter / fitViewPadding**

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

<Badge type="error">Removed</Badge> **linkCenter**

In version 5.x, the edge connection mechanism will attempt to connect to nodes/Combos in the following order:

1. Connect Port
2. Outline
3. Center

<Badge type="error">Removed</Badge> **groupByTypes**

<Badge type="error">Removed</Badge> **autoPaint**

Please manually call the `render` or `draw` method to perform rendering.

<Badge type="warning">Changed</Badge> **modes**

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

<Badge type="warning">Change</Badge> **defaultNode / defaultEdge / defaultCombo**

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

<Badge type="warning">Change</Badge> **nodeStateStyles / edgeStateStyles / comboStateStyle**

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

<Badge type="warning">Change</Badge> **animate / animateCfg**

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

<Badge type="warning">Change</Badge> **minZoom / maxZoom**

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

<Badge type="warning">Change</Badge> **renderer**

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

<Badge type="error">Removed</Badge> **enabledStack / maxStep**

The built-in undo and redo functionality has been removed in version 5.x. For related capabilities, please use a plugin to implement.

### API

<Badge type="warning">Change</Badge> **data / save / read / changeData**

Version 5.x offers a completely new data API. For details, see [Data API](/en/api/graph/method#data).

- The `data` and `changeData` methods from 4.x are replaced by `setData` in 5.x.
- The `save` method from 4.x is replaced by `getData` in 5.x.
- The `read` method from 4.x is replaced by `setData` + `render` in 5.x.

<Badge type="warning">Change</Badge> **get / set**

To access Graph options, please use `getOptions` or the `getXxx` API, such as `getZoomRange`, `getBehaviors`, etc. The `set` method is analogous.

<Badge type="warning">Change</Badge> **getContainer**

Direct API to obtain the container is not currently supported, but you can obtain it through `graph.getCanvas().getContainer()`.

> In most cases, you do not need to directly manipulate the container.

<Badge type="error">Removed</Badge> **getGroup**

<Badge type="warning">Change</Badge> **getMinZoom / getMaxZoom**

Use `getZoomRange` to obtain the values.

<Badge type="warning">Change</Badge> **setMinZoom / setMaxZoom**

Use the `setZoomRange` method to set the values.

<Badge type="warning">Change</Badge> **getWidth / getHeight**

Use `getSize` to get the dimensions.

<Badge type="warning">Change</Badge> **changeSize**

Use `setSize` to set the dimensions.

<Badge type="warning">Change</Badge> **zoom**

Changed to `zoomBy`.

<Badge type="warning">Change</Badge> **translate**

Changed to `translateBy`.

<Badge type="warning">Change</Badge> **moveTo**

Changed to `translateTo`.

<Badge type="warning">Change</Badge> **focusItem**

Changed to `focusElement`.

<Badge type="error">Removed</Badge> **addItem / updateItem / removeItem**

To add or remove elements, use the methods `addData` / `updateData` / `removeData` to manipulate data.

<Badge type="error">Removed</Badge> **refreshItem**

<Badge type="error">Removed</Badge> **refreshPositions**

<Badge type="error">Removed</Badge> **updateCombo**

<Badge type="error">Removed</Badge> **updateCombos**

<Badge type="error">Removed</Badge> **updateComboTree**

<Badge type="warning">Change</Badge> **node / edge / combo**

Use the `setNode` / `setEdge` / `setCombo` methods as alternatives.

<Badge type="warning">Change</Badge> **showItem / hideItem**

Use the `setElementVisibility` method as an alternative.

<Badge type="error">Removed</Badge> **getNodes / getEdges / getCombos / getComboChildren / getNeighbors / find / findById / findAll / findAllByState**

In version 5.x, direct retrieval of element instances is not supported.

- To obtain element data, use the methods `getData`, `getNodeData`, `getEdgeData`, `getComboData`, which support searching by element ID.
- To obtain child node data, use the `getChildrenData` method.
- To obtain neighbor node data, use the `getNeighborNodesData` method.
- To find element data based on state, use the `getElementDataByState` method.

<Badge type="warning">Change</Badge> **collapseCombo / expandCombo**

Use the `collapseElement` / `expandElement` methods as alternatives.

<Badge type="error">Removed</Badge> **collapseExpandCombo**

<Badge type="error">Removed</Badge> **createCombo**

Combos can now be added using the `addData` / `addComboData` methods.

<Badge type="error">Removed</Badge> **uncombo**

Combos can now be removed using the `removeData` / `removeComboData` methods.

<Badge type="warning">Change</Badge> **setItemState**

Use the `setElementState` method as an alternative.

<Badge type="error">Removed</Badge> **clearItemStates**

- To clear all states of a single element: `graph.setElementState(id, [])`
- To clear all states of multiple elements: `graph.setElementState({ id1: [], id2: [] })`

<Badge type="error">Removed</Badge> **priorityState**

When using `setElementState`, the state that appears later in the array has a higher priority.

<Badge type="error">Removed</Badge> **setMode**

Use `setBehaviors` to set the current behaviors.

<Badge type="error">Removed</Badge> **setCurrentMode**

<Badge type="warning">Change</Badge> **layout**

Does not support parameters. To configure the layout, please use `setLayout`.

<Badge type="warning">Change</Badge> **updateLayout**

Changed to `setLayout`.

<Badge type="error">Removed</Badge> **destroyLayout**

<Badge type="warning">Change</Badge> **addBehaviors / removeBehaviors**

Replaced with `setBehaviors`.

<Badge type="error">Removed</Badge> **createHull / getHulls / removeHull / removeHulls**

- For multiple `Hull` instances, you need to configure multiple `hull` plugins in `plugins`, such as:

```typescript
{
  plugins: ['hull', 'hull'],
};
```

- Operations to retrieve, update, and remove `Hull` are implemented through `setPlugins`, `updatePlugin`.

<Badge>Not yet available</Badge> **getNodeDegree**

<Badge>Not yet available</Badge> **getShortestPathMatrix**

<Badge>Not yet available</Badge> **getAdjMatrix**

<Badge type="error">Removed</Badge> **pushStack / getUndoStack / getRedoStack / getStackData / clearStack**

All undo and redo related APIs should be called after obtaining the corresponding plugin, for example:

```typescript
// 'history' is the key configured for use with the plugin
const history = graph.getPluginInstance('history');

history.redo();
```

<Badge type="error">Removed</Badge> **positionsAnimate / stopAnimate / isAnimating**

Animation-related information is now emitted through events:

- Animation start event: `beforeanimate`
- Animation end event: `afteranimate`
- To stop an animation:

```typescript
graph.on('beforeanimate', (event) => {
  event.animation.stop();
});
```

<Badge type="warning">Change</Badge> **getPointByClient / getClientByPoint / getPointByCanvas / getCanvasByPoint / getGraphCenterPoint / getViewPortCenterPoint**

G6 5.x uses a different coordinate system than 4.x. For details, see [Coordinate](/en/manual/further-reading/coordinate).

<Badge type="error">Removed</Badge> **setTextWaterMarker / setImageWaterMarker**

For watermark functionality, please refer to the [Watermark](/en/api/plugins/watermark)plugin.

<Badge type="warning">Change</Badge> **toFullDataURL**

Replaced with `toDataURL`, specify the parameter as: `mode: 'overall'`

```typescript
graph.toDataURL({ mode: 'overall' });
```

<Badge type="error">Removed</Badge> **downloadFullImage / downloadImage**

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

<Badge type="error">Removed</Badge> **clear**

Use `setData` + `draw` to clear data and the canvas.

### Extension Registration

Unlike G6 4.x, G6 5.x uses a unified extension registration function (register). You can refer to the [Extension Register](/en/manual/core-concept/extension#register-extension) to register G6 extensions.

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

For a complete list of events, please refer to [Event](/en/api/reference/g6#event).
