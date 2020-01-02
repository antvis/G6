---
title: Built-in Behavior
order: 4
---

## What is Behavior
Behavior is the interaction mechanism in G6. It is used with [Interaction Mode](/en/docs/manual/middle/states/mode). This document introduces the Built-in behaviors in G6. Besides, you can register a type of [Custom Behavior](/zh/docs/manual/advanced/custom-behavior). The document [Interaction Mode](/en/docs/manual/middle/states/mode) introduces how to configure the Behaviors onto the graph.

## Built-in Behavior
All the basic graphics Shapes, Items(nodes/edges) can be interacted by events. To achieve it with versatility, there are 9 built-in Behaviors in G6.

### drag-canvas

- Description: Allows users drag canvas;
- `type: 'drag-canvas'`;
- `direction`: The direction of dragging that is allowed. Options: `'x'`, `'y'`, `'both'`. `'both'` by default.

**Default Configuration**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-canvas' ]
  }
})
```

By default, the x and y directions are both allowed.

**Configuration**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [
      {
      	type: 'drag-canvas',
        direction: 'x'
      }
    ]
  }
})
```

The canvas can be dragged along x direction only.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*54yxRrW1A7sAAAAAAAAAAABkARQnAQ' width=400/>

### zoom-canvas

- Description: Zoom the canvas;
- `type: 'zoom-canvas'`;
- `sensitivity`: The sensitivity of the zooming, range from 1 to 10. `5` by default.

**Tips: Assign values for `minZoom` and  `maxZoom` on the graph to limit the zooming ratio.** 

### drag-node

- Description: Allows users drag nodes;
- `type: 'drag-node'`;
- `delegateStyle`: The drawing properties when the nodes are dragged.  `{ strokeOpacity: 0.6, fillOpacity: 0.6 }` by default;
- `updateEdge`: Whether to update all connected edges when dragging nodes. `true` by default.
- `enableDelegate`: Whether activate `delegate` when dragging nodes, which means whether to use a virtual rect moved with the dragging mouse instead of the node. The effect is shown in the figures below. `false` by default.

**Default Configuration**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-node' ]
  }
})
```
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hre9Qa7yCfQAAAAAAAAAAABkARQnAQ' width=400/>

**Activate** `delegate`
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 
      {
      	type: 'drag-node',
        enableDelegate: true
      }
    ]
  }
})
```
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*BN83QJQpU40AAAAAAAAAAABkARQnAQ' width=400/>

### click-select

- Description: Select a node by clicking. Cancel the selected state by clicking the node agian or clicking the canvas;
- `type: 'click-select'`;
- `multiple`: Whether to allow multiple selection. `true` by default. `false` means multiple selection is not allowed, and the `trigger` will not take effect.
- `trigger`: Specify which key to hold for multiple selection. `shift` by default, which means multiple selection is activated when the shift button is pressed. Options: `'shift'`, `'ctrl'`, `'alt'`, and so on;

**Default Configuration**

```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'click-select' ]
  }
})
```

Press **`Shift`** button to select more items.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mOiIQqBof8sAAAAAAAAAAABkARQnAQ' width=400/>

**Configuration**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 
      {
      	type: 'click-select',
        trigger: 'ctrl'
      }
    ]
  }
})
```

With the configuration above, users are allowed to select more than one nodes when pressing **Ctrl**. You can also assign **Alt** for it. But the multiple selection is turned off when `multiple` is `false`, and the `trigger` will not take effect any more.

### tooltip

- Description: The tooltip for node;
- `type: 'tooltip'`;
- `formatText(model)`: Format function, returns a text string or an HTML element.

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
	modes: {
  	default: [{
       type: 'tooltip',
       formatText(model) {
       	 return model.xxx;
       }
     }],
  }
});
```

**Tips: Since there are no styles for tooltip in G6, you need to define the styles for it as:**

```css
.g6-tooltip {
  padding: 10px 6px;
  color: #444;
  background-color: rgba(255,255,255,0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
}
```

### edge-tooltip
The usage of edge-tooltip is similar to tooltip. It will be activated when the user hover the mouse onto an edge.

- Description: The tooltip for edge;
- `type: 'edge-tooltip'`;
- `formatText(model)`: Format function, returns a text string or an HTML element.

### activate-relations

- Description: Highlight the node and its related nodes and edges when the mouse enter the node;
- `type: 'activate-relations'`;
- Configurations: 
  - `trigger: 'mouseenter'`. `mousenter` means acitvating when the mouse enter a node; `click` means activating when the mouse click a node;
  - `activeState: 'active'`. The state name when the node is activated. When `activate-relations` is activated, the related nodes and edges will have this state. `active` by default. It can be combined with `nodeStyle` and `edgeStyle` of graph to enrich the visual effect;
  - `inactiveState: 'inactive'`. The state name when of the node is inactivated. All the nodes and edges which are not activated by `activate-relations` will have this state. `inactive` by default. It can be combined with `nodeStyle` and `edgeStyle` of graph to enrich the visual effect;
  - `resetSelected`: Whether to reset the selected nodes when highlight the related nodes. `false` by default, which means the selected state will not be covered by `activate-relations`.


<br />**Default Configuration**<br />

```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'activate-relations' ]
  }
})
```
The selected state of the selected node will be maintained after the `activate-relations` operation by default.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bG31RqbM4JMAAAAAAAAAAABkARQnAQ' width=400/>

**Configuration**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 
      {
      	type: 'activate-relations',
        resetSelected: true
      }
    ]
  }
})
```

Assign `true` to `resetSelected` to reset the selected states for nodes after the `activate-relations` operation.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VQDrT5Qpq_sAAAAAAAAAAABkARQnAQ' width=400/>


### brush-select

- Description: Allows uers to select nodes by brushing;
- `type: 'brush-select'`;
- Configurations: 
  - `brushStyle`: The styles of the marquee. It contains four configurations: `fill`、`fillOpacity`、`stroke` and `lineWidth`;
  - `onSelect(nodes)`: The callback function when selecting a node. `nodes` is the selected ndoes;
  - `onDeselect(nodes)`: The callback function when canceling selections. `nodes` is the selected ndoes;
  - `selectedState`: The state of the selected nodes. `'selected'` by default;
  - `includeEdges`: Whether to select the edges when selecting by brushing. `true` by default. `false` means do not select the edges.
  - `trigger`: The trigger button for this operation. `'shift'` by default, which means the select by brushing operation will be activated by pressing Shift button. Options: `'shift'`, `'ctrl' / 'control'`, `'alt'` and `'drag'`, not case sensitive:
    - `'shift'`: Select by brushing when Shift is pressed;
    - `'ctrl' / 'control'`: Select by brushing when Ctrl is pressed;
    - `'alt'`: Select by brushing when Alt is pressed;
    - `'drag'`: Select by brushing without any pressed buttons. Note that it will conflict with the `drag-canvas`.

**Default Configuration**

```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'brush-select' ]
  }
})
```
Select by brushing when the Shift button is pressed by default. And the edges are selectable as well.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IJizQonX75wAAAAAAAAAAABkARQnAQ' width=400/>

**Configuration**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 
      {
      	type: 'brush-select',
        trigger: 'ctrl',
        includeEdges: false
      }
    ]
  }
})
```

By the configurations above, the operation is activated when the Ctrl button is pressed, and the edges will not be selected during the process.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1xNZT7mPFK4AAAAAAAAAAABkARQnAQ' width=400/>

**Conflict Configuration：**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-canvas',
      {
      	type: 'brush-select',
        trigger: 'drag'
      }
    ]
  }
})
```

When the `trigger` in `brush-select` is assigned to `drag`, an the `drag-canvas` exists in this mode, their operation will conflict.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*umffRa8rHtUAAAAAAAAAAABkARQnAQ' width=400/>

It is obvious that the selecting by brushing is activated while dragging the canvas. To avoid this situation, we can assign other values for `trigger` in `brush-select`. Besides, the following solution also works:

```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-canvas' ],
    brush: [
    	{
      	type: 'brush-select',
        trigger: 'drag'
      }
    ]
  }
})
```

It is a solution to put these two conflicting events into two mdoes. They will be activated on different graph modes. Dragging operation corresponds to `drag-canvas` in the default mode. When user switch the state to brush mode by `graph.setModel('brush')`, the dragging operation will be responsed by `brush-select` instead.
Refer to [Mode](/en/docs/manual/middle/states/mode) for more information.

### collapse-expand

- Description: Collapse or expand a subtree on a treeGraph
- `type: 'collapse-expand'`;
- Configuration: 
  - `trigger`: The operation for collapsing and expanding. Options: `click` and `dblclick`. `click` by default;
  - `onChange`: The callback function after collapsing or expanding. **Warining**: it will be removed from V3.1.2.


**Usage**

```javascript
const graph = new G6.TreeGraph({
  modes: {
    default: [{
      type: 'collapse-expand',
      trigger: 'click',
      onChange(item, collapsed) {
        const data = item.get('model').data;
        data.collapsed = collapsed;
        return true;
      }
    }, 'drag-canvas', 'zoom-canvas']
  }
});
```

### collapse-expand-group

- Description: Collapse or expand a node group;
- `type: 'collapse-expand-group'`
- Configurations: 
  - trigger: The operation for collapsing and expanding. Options: `click` and `dblclick`. `dblclick` by default, which means double click.

**Default Configuration**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'collapse-expand-group' ]
  }
})
```

**Configuration**<br />Assign `trigger` to **`click`**, the collapsing or expanding a node group will be triggered by click.

```javascript
const graph = new G6.Graph({
	modes: {
    default: [
      {
      	type: 'collapse-expand-group',
        trigger: 'click'
      }
    ]
  }
})
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*znCaS48_BpgAAAAAAAAAAABkARQnAQ' width=400/>

### drag-group

- Description: Allows users drag node group;
- `type: 'drag-group'`;
- Configuration: 
  - `delegateStyle`: The style of the `delegate` when dragging the group.

**Default Configuration**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-group' ]
  }
})
```

### drag-node-with-group

- Description: Allow users to drag the nodes in the group;
- `type: 'drag-node-with-group'`;
- Configuration: 
  - `delegateStyle`: The style of the `delegate` when dragging the node.
  - `maxMultiple`;
  - `minMultiple`.

**Default Configuration**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-node-with-group' ]
  }
})
```
