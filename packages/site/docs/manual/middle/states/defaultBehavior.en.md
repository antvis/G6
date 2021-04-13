---
title: Built-in Behavior
order: 1
---

## What is Behavior

Behavior is the interaction mechanism in G6. It is used with [Interaction Mode](/en/docs/manual/middle/states/mode). This document introduces the Built-in behaviors in G6. Besides, you can register a type of [Custom Behavior](/zh/docs/manual/middle/states/custom-behavior). The document [Interaction Mode](/en/docs/manual/middle/states/mode) introduces how to configure the Behaviors onto the graph.

## Built-in Behavior

All the basic graphics Shapes, Items(nodes/edges) can be interacted by events. To achieve it with versatility, there are 14 built-in Behaviors in G6.

### drag-combo

Supported by V3.5 or later versions.

- Description: Allows users to drag combo;
- Configurations:
  - `type: 'drag-combo'`;
  - `enableDelegate`: Whether activate `delegate` when dragging combos, which means whether to use a virtual rect moved with the dragging mouse instead of the combo. The effect is shown in the figures below. `false` by default;
  - `delegateStyle`: The style of the `delegate` when dragging the combo with delegate;
  - `onlyChangeComboSize`: Supported by V3.5 or later vertions. Only Change the size of the prarent combo whose child combo to be dragged, which means do not change the hierarchy structures of combos and nodes. `false` by default;
  - `activeState`: The state's name(string) of the entered combo to be dragged over, coordinating with the configuration in `comboStateStyles` to define the state styles when instantiating a graph. It is empty by default;
  - `selectedState`: The state's name(string) when combo is selected, `'selected'` by default;
  - `shouldUpdate(e)`: Whether allow the behavior happens on the current item (e.item), see the example below for detail.

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['drag-combo'],
  },
});
```

Configure the styles for enableDelegate or activeState:

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'drag-combo',
        enableDelegate: true,
        activeState: 'actived',
        shouldUpdate: (e) => {
          // Do not allow the combo with id 'combo1' be dragged
          if (e.item && e.item.getModel().id === 'combo1') return false;
          return true;
        },
      },
    ],
  },
  comboStateStyles: {
    actived: {
      stroke: 'red',
      lineWidth: 3,
    },
  },
});
```

### collapse-expand-combo

Supported by V3.5 or later.

- Description: collapse or expand Combo. If the graph has layout configuration, this behavior will trigger re-layout. If you do not want re-layout the graph after collapsing or expanding a combo, use combo's click listener and [graph.collapseExpandCombo API](/en/docs/api/Graph#collapseexpandcombocombo) instead;
- Configurations:
  - `type: 'collapse-expand-combo'`;
  - `trigger`: Specify the trigger for collapsing and expanding a combo. `dblclick` by default. Options: `'click'`, `'dblclick'`;
  - `relayout`: Whether relayout the graph after collapsing or expanding, `true` by default.

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['collapse-expand-combo'],
  },
});
```

Configure the trigger to be 'click':

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'collapse-expand-combo',
        trigger: 'click',
        relayout: false, // do not relayout after collapsing or expanding
      },
    ],
  },
});
```

### drag-canvas

- Description: Allows users drag canvas;
- Configurations:
  - `type: 'drag-canvas'`;
  - `direction`: The direction of dragging that is allowed. Options: `'x'`, `'y'`, `'both'`. `'both'` by default;
  - `enableOptimize`: whether enable optimization, `false` by default. `enableOptimize: true` means hiding all edges and the shapes beside keyShapes of nodes while dragging canvas;
  - `shouldBegin(e)`: Whether allow the behavior happen on the current item (e.item);
  - `scalableRange`: scalable range when drag canvas, `zero` by default. -1 to 1 means the scalable percentage of the viewport; the image bellow illustrate the situation when it is smaller than -1 or bigger than 1: 

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ' width='650' alt="" />

  - `allowDragOnItem`: whether response when the users drag on items(node/edge/combo), `false` by default;
- Related timing events:
  - `canvas:dragstart`: Triggered when drag start. Listened by `graph.on('canvas:dragstart', e => {...})`;
  - `canvas:drag`: Triggered when dragging. Listened by `graph.on('canvas:drag', e => {...})`;
  - `canvas:dragend`: Triggered when drag end. Listened by `graph.on('canvas:drag', e => {...})`.

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['drag-canvas'],
  },
});
```

By default, the x and y directions are both allowed.

**Using Customized Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'drag-canvas',
        direction: 'x',
      },
    ],
  },
});
```

The canvas can be dragged along x direction only.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*54yxRrW1A7sAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>


### scroll-canvas

- Description: Scroll the canvas by wheeling, *supported after v4.2.6*;
- Configurations:
  - `type: 'scroll-canvas'`;
  - `direction`: The direction of dragging that is allowed. Options: `'x'`, `'y'`, `'both'`. `'both'` by default;
  - `enableOptimize`: whether enable optimization, `false` by default. `enableOptimize: true` means hiding all edges and the shapes beside keyShapes of nodes while dragging canvas;
  - `zoomKey`: switch to zooming while pressing the key and wheeling. Options: `'shift'`, `'ctrl'`, `'alt'`, `'control'`;
  - `scalableRange`: scalable range when drag canvas, `zero` by default. -1 to 1 means the scalable percentage of the viewport; the image bellow illustrate the situation when it is smaller than -1 or bigger than 1: 

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ' width='650' alt="" />

- Related timing events:
  - `wheel`: Triggered when wheeling. Listened by `graph.on('wheel', e => {...})`.

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['drag-canvas'],
  },
});
```

By default, the x and y directions are both allowed.

**Using Customized Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'drag-canvas',
        direction: 'x',
      },
    ],
  },
});
```

The canvas can be dragged along x direction only.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*54yxRrW1A7sAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

### zoom-canvas

- Description: Zoom the canvas;
- Configurations:
  - `type: 'zoom-canvas'`;
  - `sensitivity`: The sensitivity of the zooming, range from 1 to 10. `5` by default;
  - `minZoom`: minimum zoom ratio;
  - `maxZoom`: maximum zoom ratio;
  - `enableOptimize`: whether enable the optimization, false by default. If it is assigned to true, the shapes except keyShape will be hide when the ratio is smaller thant `optimizeZoom`;
  - `optimizeZoom`: Takes effect when `enableOptimize` is `true`. `0.7` by default. See `enableOptimize` upon.
  - `shouldUpdate(e)`: Whether allow the behavior happen.
  - `fixSelectedItems`: Fix the line width, fontSize, or overall size of some items while zooming out the canvas. `fixSelectedItems` is an object with:
    - `fixSelectedItems.fixState`: The state of the items to be fixed. Set the item state to be the value to make it fix while zooming out. `'selected'` by default;
    - `fixSelectedItems.fixAll`: Fix the overall size of the selected items. `fixAll` has higher priority than `fixSelectedItems.fixLineWidth` and `fixSelectedItems.fixLabel`;
    - `fixSelectedItems.fixLineWidth`: Fix the lineWidth of the keyShape of the fix item;
    - `fixSelectedItems.fixLabel`: Fix the fontSize of the item.
- Related timing events:
  - `wheelzoom(e)`: Triggered when user zoom the graph. Listened by `graph.on('wheelzoom', e => {...})`.

**Tips: Assign values for `minZoom` and  `maxZoom` on the graph to limit the zooming ratio.**


### drag-node

- Description: Allows users drag nodes;
- Configurations:
  - `type: 'drag-node'`;
  - `delegateStyle`: The drawing properties when the nodes are dragged. `{ strokeOpacity: 0.6, fillOpacity: 0.6 }` by default;
  - `updateEdge`: Whether to update all connected edges when dragging nodes. `true` by default.
  - `enableDelegate`: Whether activate `delegate` when dragging nodes, which means whether to use a virtual rect moved with the dragging mouse instead of the node. The effect is shown in the figures below. `false` by default;
  - `enableDebounce`: Whether enable updating with debounce while dragging to avoid the frequent calculation. It is a boolean and will be useful for graph with polyline edges. `false` by default;
  - `enableOptimize`: Whether to hide the related edges to avoid calculation while dragging nodes. It is a boolean and will be useful for graph with polyline edges. `false` by default;
  - `onlyChangeComboSize`:Supported by V3.5 or later vertions. Only Change the size of the prarent combo whose child node to be dragged, which means do not change the hierarchy structures of combos and nodes. `false` by default;
  - `comboActiveState`: Supported by V3.5 or later vertions. The state's name(string) of the entered combo to be dragged over, coordinating with the configuration in `comboStateStyles` to define the state styles when instantiating a graph. It is empty by default;
  - `selectedState`: Supported by V3.5 or later vertions. The state's name(string) when combo is selected, `'selected'` by default;
  - `shouldBegin(e)`: Whether allow the behavior happen;
  - `shouldUpdate(e)`: Whether allow update the node/ delegate's position while dragging;
  - `shouldEnd(e)`: Whether allow update the node/ delegate's position after drag end.

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['drag-node'],
  },
});
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hre9Qa7yCfQAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

**Activate** `delegate`

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'drag-node',
        enableDelegate: true,
        shouldBegin: (e) => {
          // Do not allow the node with id 'node1' to be dragged
          if (e.item && e.item.getModel().id === 'node1') return false;
        },
      },
    ],
  },
});
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*BN83QJQpU40AAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

### click-select

- Description: Select a node by clicking. Cancel the selected state by clicking the node agian or clicking the canvas;
- Configurations:
  - `type: 'click-select'`;
  - `multiple`: Whether to allow multiple selection. `true` by default. `false` means multiple selection is not allowed, and the `trigger` will not take effect.
  - `trigger`: Specify which trigger for multiple selection. `shift` by default, which means multiple selection is activated when the shift button is pressed. Options: `'shift'`, `'ctrl'`, `'alt'`, and so on;
  - `shouldBegin(e)`: Whether allow the behavior happen on the current item (e.item), see the example below;
  - `shouldUpdate(e)`: Whether allow the behavior changes the state and state style of the on the current item (e.item), see the example below.
- Related timing events:
  - `'nodeselectchange'`: Triggered when the set of selected items changed. Listened by `graph.on('nodeselectchange', e => {...})`. The fields of the parameter `e` are:
    - `e.target`: The current manipulated item;
    - `e.selectedItems`: The set of selected items after this operation;
    - `e.select`: A boolean tag to distinguish if the current operation is select(`true`) or deselect (`false`).

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['click-select'],
  },
});

// Triggered when the set of selected items changed
graph.on('nodeselectchange', (e) => {
  // The current manipulated item
  console.log(e.target);
  // The set of selected items after this operation
  console.log(e.selectedItems);
  // A boolean tag to distinguish if the current operation is select(`true`) or deselect (`false`)
  console.log(e.select);
});
```

Press **`Shift`** button to select more items.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mOiIQqBof8sAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

**Using Customized Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'click-select',
        trigger: 'ctrl',
      },
      // Whether allow the behavior happen on the item. If it returns false, the current manipulated item will not be selected and the timing event 'nodeselectchange' will not be triggered as well
      shouldBegin: e => {
        // Do not allow the behavior happen when the clicked shape has name 'text-shape'
        if (e.target.get('name') === 'text-shape') return false;
        // Do not allow the behavior happen when the clicked item has id 'text-shape'
        if (e.item.getModel().id === 'id1') return false;
        return true;
      },
      // Whehter allow the behavior change the state or state styles of the current manipulated item. If it returns false, the state and state styles of the current item will not be changed. But the timing event 'nodeselectchange' will still be triggered
      shouldUpdate: e => {
        // The item's state and state style will not be changed if its id is 'id2'
        if (e.item.getModel().id === 'id2') return false;
        return true;
      }
    ],
  },
});

// Triggered when the set of selected items changed
graph.on('nodeselectchange', e => {
  // The current manipulated item
  console.log(e.target);
  // The set of selected items after this operation
  console.log(e.selectedItems);
  // A boolean tag to distinguish if the current operation is select(`true`) or deselect (`false`)
  console.log(e.select);
});
```

With the configuration above, users are allowed to select more than one nodes when pressing **Ctrl**. You can also assign **Alt** for it. But the multiple selection is turned off when `multiple` is `false`, and the `trigger` will not take effect any more.

### tooltip

- Description: The tooltip for node;
- Configurations:
  - `type: 'tooltip'`;
  - `formatText(model)`: Format function, returns a text string or an HTML element;
  - `offset`: the offset of the tooltip to the mouse.
  - `shouldBegin(e)`: Whether allow the tooltip the show up;
  - `shouldUpdate(e)`: Whether allow the tooltip to be updated.
- Related timing events:
  - `tooltipchange`: Triggered when the tooltip is changed. Listened by `graph.on('tooltipchange', e => {...})`.

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  modes: {
    default: [
      {
        type: 'tooltip',
        formatText(model) {
          return model.xxx;
        },
        offset: 10,
      },
    ],
  },
});
```

**Tips: Since there are no styles for tooltip in G6, you need to define the styles for it as:**

```css
.g6-tooltip {
  padding: 10px 6px;
  color: #444;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
```

### edge-tooltip

The usage of edge-tooltip is similar to tooltip. It will be activated when the user hover the mouse onto an edge.

- Description: The tooltip for edge;
- Configurations:
  - `type: 'edge-tooltip'`;
  - `formatText(model)`: Format function, returns a text string or an HTML element;
  - `offset`: the offset of the tooltip to the mouse;
  - `shouldBegin(e)`: Whether allow the tooltip the show up;
  - `shouldUpdate(e)`: Whether allow the tooltip to be updated.
- Related timing events:
  - `tooltipchange`: Triggered when the tooltip is changed. Listened by `graph.on('tooltipchange', e => {...})`.

### activate-relations

- Description: Highlight the node and its related nodes and edges when the mouse enter the node;
- Configurations:
  - `type: 'activate-relations'`;
  - `trigger: 'mouseenter'`. `mousenter` means acitvating when the mouse enter a node; `click` means activating when the mouse click a node;
  - `activeState: 'active'`. The state name when the node is activated. When `activate-relations` is activated, the related nodes and edges will have this state. `active` by default. It can be combined with `nodeStyle` and `edgeStyle` of graph to enrich the visual effect;
  - `inactiveState: 'inactive'`. The state name when of the node is inactivated. All the nodes and edges which are not activated by `activate-relations` will have this state. `inactive` by default. It can be combined with `nodeStyle` and `edgeStyle` of graph to enrich the visual effect;
  - `resetSelected`: Whether to reset the selected nodes when highlight the related nodes. `false` by default, which means the selected state will not be covered by `activate-relations`;
  - `shouldUpdate(e)`: Whether allow the behavior happen.
- Related timing event:
  - `'afteractivaterelations'`: Triggered when the activated items changed. Listened by `graph.on('afteractivaterelations', evt => {...})`. The fields of the parameter `e`:
    - `e.item`: The current manipulated item;
    - `e.action`: A string tag to distinguish whether the current action is `'activate'` or `'deactivate'`.

<br />**Using Default Configuration**<br />

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['activate-relations'],
  },
});

graph.on('afteractivaterelations', (e) => {
  // The current manipulated item
  console.log(e.item);
  // A string tag to distinguish whether the current action is `'activate'` or `'deactivate'`
  console.log(e.action);
});
```

The selected state of the selected node will be maintained after the `activate-relations` operation by default.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bG31RqbM4JMAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

**Using Customized Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'activate-relations',
        resetSelected: true,
      },
    ],
  },
});

graph.on('afteractivaterelations', (e) => {
  // The current manipulated item
  console.log(e.item);
  // A string tag to distinguish whether the current action is `'activate'` or `'deactivate'`
  console.log(e.action);
});
```

Assign `true` to `resetSelected` to reset the selected states for nodes after the `activate-relations` operation.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VQDrT5Qpq_sAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

### brush-select

- Description: Allows uers to select nodes by brushing;
- Configurations:
  - `type: 'brush-select'`;
  - `brushStyle`: The styles of the marquee. It contains four configurations: `fill`、`fillOpacity`、`stroke` and `lineWidth`;
  - `onSelect(nodes)`: The callback function when selecting a node. `nodes` is the selected ndoes;
  - `onDeselect(nodes)`: The callback function when canceling selections. `nodes` is the selected ndoes;
  - `selectedState`: The state of the selected nodes. `'selected'` by default;
  - `includeEdges`: Whether to select the edges when selecting by brushing. `true` by default. `false` means do not select the edges.
  - `trigger`: The trigger button for this operation. `'shift'` by default, which means the select by brushing operation will be activated by pressing Shift button. Options: `'shift'`, `'ctrl' / 'control'`, `'alt'` and `'drag'`, not case sensitive:
    - `'shift'`: Select by brushing when Shift is pressed;
    - `'ctrl' / 'control'`: Select by brushing when Ctrl is pressed;
    - `'alt'`: Select by brushing when Alt is pressed;
    - `'drag'`: Select by brushing without any pressed buttons. Note that it will conflict with the `drag-canvas`;
  - `shouldUpdate(e)`: Whether allow the behavior happen on the current manipulated item (e.item). See the example below.
- Related timing events:
  - `'nodeselectchange'`: Triggered when the set of selected items changed. Listened by `graph.on('nodeselectchange', e => {...})`. The fields of the parameter `e`:
    - `e.selectedItems`: The set of selected items after the operation;
    - `e.select`: A boolean tag to distinguish whether the current operation is select(`true`) or deselect(`false`).

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['brush-select'],
  },
});

// Triggered when the set of selected items changed
graph.on('nodeselectchange', (e) => {
  // The set of selected items after the operation
  console.log(e.selectedItems);
  // A boolean tag to distinguish whether the current operation is select(`true`) or deselect(`false`)
  console.log(e.select);
});
```

Select by brushing when the Shift button is pressed by default. And the edges are selectable as well.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IJizQonX75wAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

**Using Customized Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'brush-select',
        trigger: 'ctrl',
        includeEdges: false,
      },
      // Whether allow the behavior happen on the current manipulated item (e.item). If it returns false, the item will not be selected and the timing event 'nodeselectchange' will not be triggered
      shouldUpdate: e => {
        // Do not allow the behavior happen on the node/edge/combo with id 'id2'
        if (e.item.getModel().id === 'id2') return false;
        return true;
      }
    ],
  },
});

// Triggered when the set of selected items changed
graph.on('nodeselectchange', e => {
  // The set of selected items after the operation
  console.log(e.selectedItems);
  // A boolean tag to distinguish whether the current operation is select(`true`) or deselect(`false`)
  console.log(e.select);
});
```

By the configurations above, the operation is activated when the Ctrl button is pressed, and the edges will not be selected during the process.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1xNZT7mPFK4AAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

**Conflict Configuration: **

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      'drag-canvas',
      {
        type: 'brush-select',
        trigger: 'drag',
      },
    ],
  },
});
```

When the `trigger` in `brush-select` is assigned to `drag`, an the `drag-canvas` exists in this mode, their operation will conflict.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*umffRa8rHtUAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

It is obvious that the selecting by brushing is activated while dragging the canvas. To avoid this situation, we can assign other values for `trigger` in `brush-select`. Besides, the following solution also works:

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['drag-canvas'],
    brush: [
      {
        type: 'brush-select',
        trigger: 'drag',
      },
    ],
  },
});
```

It is a solution to put these two conflicting events into two mdoes. They will be activated on different graph modes. Dragging operation corresponds to `drag-canvas` in the default mode. When user switch the state to brush mode by `graph.setModel('brush')`, the dragging operation will be responsed by `brush-select` instead. Refer to [Mode](/en/docs/manual/middle/states/mode) for more information.

### lasso-select

- Description: Allows uers to select nodes by drawing a line over or around objects.
- Configurations:
  - `type: 'lasso-select'`;
  - `delegateStyle`: The styles of the marquee. It contains four configurations: `fill`、`fillOpacity`、`stroke` and `lineWidth`;
  - `onSelect(nodes, edges)`: The callback function when selecting a node. `nodes` is the selected ndoes, `edges` is the selected edges;
  - `onDeselect(nodes, edges)`: The callback function when canceling selections. `nodes` is the deselected ndoes, `edges` is the deselected edges;
  - `selectedState`: The state of the selected nodes. `'selected'` by default;
  - `includeEdges`: Whether to select the edges when selecting by brushing. `true` by default. `false` means do not select the edges.
  - `trigger`: The trigger button for this operation. `'shift'` by default, which means the select by brushing operation will be activated by pressing Shift button. Options: `'shift'`, `'ctrl' / 'control'`, `'alt'` and `'drag'`, not case sensitive:
    - `'shift'`: Select by brushing when Shift is pressed;
    - `'ctrl' / 'control'`: Select by brushing when Ctrl is pressed;
    - `'alt'`: Select by brushing when Alt is pressed;
    - `'drag'`: Select by brushing without any pressed buttons. Note that it will conflict with the `drag-canvas`;
  - `shouldUpdate(e)`: Whether allow the behavior happen on the current manipulated item (e.item). See the example below.
- Related timing events:
  - `'nodeselectchange'`: Triggered when the set of selected items changed. Listened by `graph.on('nodeselectchange', e => {...})`. The fields of the parameter `e`:
    - `e.selectedItems`: The set of selected items after the operation, include `nodes` and `edges`;
    - `e.select`: A boolean tag to distinguish whether the current operation is select(`true`) or deselect(`false`).

The configuration of `lasso-select` behavior is the same as that of `brush-select` behavior.

### collapse-expand

- Description: Collapse or expand a subtree on a treeGraph;
- Attension: If you want to collapse a subtree by default when render the Graph in the first time, you can assign `collapsed: true` to the root of the subtree in its data. If you want to control the subtree to collapse/expand by code, you can also assign the `collapsed` for the root of the subtree and call `treeGraph.layout()` to make it take effect;
- Configurations:
  - `type: 'collapse-expand'`;
  - `trigger`: The operation for collapsing and expanding. Options: `click` and `dblclick`. `click` by default;
  - `onChange`: The callback function after collapsing or expanding. **Warining**: it will be removed from V3.1.2;
  - `shouldBegin(e)`: Whether allow this behavior happen on the current item (e.item).
- Related timing event:
  - `itemcollapsed`: Triggered when collapse-expand happens. Listened by `graph.on('itemcollapsed', e => {...})`. The fields of the parameter `e`:
    - `e.item`: The current manipulated item;
    - `e.collapsed`: A boolean flag to distinguish whether the current operaition is collapsing(`true`) or expanding(`false`).

**Usage**

```javascript
const graph = new G6.TreeGraph({
  modes: {
    default: [
      {
        type: 'collapse-expand',
        trigger: 'click',
        onChange(item, collapsed) {
          const data = item.get('model').data;
          data.collapsed = collapsed;
          return true;
        },
        shouldBegin: (e) => {
          // Nothing happens when the current item has id 'node1'
          if (e.item && e.item.getModel().id === 'node1') return false;
          return true;
        },
      },
      'drag-canvas',
      'zoom-canvas',
    ],
  },
});

graph.on('itemcollapsed', (e) => {
  // The current manipulated item
  console.log(e.item);
  // A boolean flag to distinguish whether the current operaition is collapsing(`true`) or expanding(`false`)
  console.log(e.collapsed);
});
```

### collapse-expand-group

- Description: Collapse or expand a node group;
- Configurations:
  - `type: 'collapse-expand-group'`
  - `trigger`: The operation for collapsing and expanding. Options: `click` and `dblclick`. `dblclick` by default, which means double click.

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['collapse-expand-group'],
  },
});
```

**Using Customized Configuration**<br />Assign `trigger` to **`click`**, the collapsing or expanding a node group will be triggered by click.

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'collapse-expand-group',
        trigger: 'click',
      },
    ],
  },
});
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*znCaS48_BpgAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

### drag-group

- Description: Allows users drag node group;
- Configurations:
  - `type: 'drag-group'`;
  - `delegateStyle`: The style of the `delegate` when dragging the group.

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['drag-group'],
  },
});
```

### drag-node-with-group

- Description: Allow users to drag the nodes in the group;
- Configurations:
  - `type: 'drag-node-with-group'`;
  - `delegateStyle`: The style of the `delegate` when dragging the node.
  - `maxMultiple`;
  - `minMultiple`;
  - `shouldBegin(e)`: Whether allow the current node (e.item) to be dragged.

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['drag-node-with-group'],
  },
});
```

### create-edge

- Description: create edge by interaction;
- Configurations:
  - `type: 'create-edge'`;
  - `trigger`: Specify the trigger for creating an edge, options: `'click'`, `'drag'`. The default value is `'click'`, which means the user is allowed to creat an edge by clicking two end nodes as source and target node respectively. `'drag'` means the user is allowed to create an edge by 'dragging' from a source node to a target ndoe. Note that `trigger: 'drag'` cannot create a self-loop edge;
  - `key`: The assistant trigger key from the keyboard. If it is undefined or unset, only `trigger` decides the triggering interaction from user. Otherwise, this behavior will be triggered by `trigger` only when `key` is pressed. Options: `'shift'`, `'ctrl'`, 'control', `'alt'`, `'meta'`, `undefined`;
  - `edgeConfig`: The edge configurations for the edges created by this behavior, the configurations are the same as the edge, ref to [Edge Configurations](/en/docs/manual/middle/elements/edges/defaultEdge). To modify the configurations for different added edges, listener to `'aftercreateedge'` and update the edge.
  - `shouldBegin(e)`: Whether allow the behavior begins with the condition `e`;
  - `shouldEnd(e)`: Whether allow the behavior ends under the condition `e`;
- Related timing event:
  - `'aftercreateedge'`: Triggered after the creating process is finished. Listen to it by `graph.on('aftercreateedge', e => {...})`, where the parameter `e` has a property `edge` which is the created edge.

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['create-edge'],
  },
});
graph.on('aftercreateedge', (e) => {
  console.log(e.edge);
});
```

**Using Customized Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      // takes effect when the 'shift' is been pressing and drag from a node to another
      {
        type: 'create-edge',
        trigger: 'drag',
        key: 'shift',
        edgeConfig: {
          type: 'cubic',
          style: {
            stroke: '#f00',
            lineWidth: 2,
            // ... // other edge style configurations
          },
          // ... // other edge configurations
        },
      },
    ],
  },
});
```

### shortcuts-call

- Description: allow the end-user to call a function of Graph with shortcuts keys. e.g. press down 'control' and '1' on keyboard to make the graph fit the canvas. Attention: make sure the focus is on the canvas when the end-user is pressing keys to call the function;
- Configurations:
  - `type: 'shortcuts-call'`;
  - `trigger`: the subject key to trigger the behavior, options: `'shift'`, `'alt'`, `'ctrl'`, `'control'`;
  - `combinedKey`: the vice key for combination with `trigger` to trigger the behavior. When the `trigger` is pressed down, press the `combinedKey` will call the graph function with name `functionName`. If `combinedKey` is not specified or assigned with `undefined`, pressing the `trigger` down will call the function;
  - `functionName`: the name of the Graph function to be called. If the name is wrong or it is not a function of the Graph, the keydown events will not be triggered.
  - `functionParams`: the parameters or the called function. Make sure the parameters are correct for the function to be called according to corresponding docs, errors might occur otherwise.

**Using Default Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['shortcuts-call'],
  },
});
```

**Using Customized Configuration**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      // Press 'alt' and 'm' to call graph.moveTo(10, 10). Be sure that the fucos is on the canvas when press the keys
      {
        type: 'shortcuts-call',
        // subject key
        trigger: 'alt',
        // vice key
        combinedKey: 'm',
        // move the graph to 10,10
        functionName: 'moveTo',
        functionParams: [10, 10],
      },
    ],
  },
});
```
