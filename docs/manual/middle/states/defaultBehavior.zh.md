---
title: 内置的 Behavior
order: 4
---

## 什么是 Behavior
Behavior 是 G6 提供的定义图上交互事件的机制。它与[交互模式 Mode](/zh/docs/manual/middle/states/mode) 搭配使用，如何将下文所述各种 Behavior 配置到图上，见 [交互模式](/zh/docs/manual/middle/states/mode)。

## 内置 Behavior
理论上， G6 上的所有基础图形、Item（节点/边）都能通过事件来进行操作。考虑到通用性，G6 目前共提供了以下 9 个内置的 Behavior。此外，用户可以注册 [自定义 Behavior](/zh/docs/manual/advanced/custom-behavior)。

### drag-canvas

- 含义：拖拽画布；
- `type: 'drag-canvas'`；
- `direction`：允许拖拽方向，支持`'x'`，`'y'`，`'both'`，默认方向为 `'both'`。

**默认配置**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-canvas' ]
  }
})
```

默认配置下，可以在 x 和 y 两个方向上拖动画布。

**配置参数**
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

此时只能在 x 方向上面拖动，y 方向上不允许拖动。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*54yxRrW1A7sAAAAAAAAAAABkARQnAQ' width=400/>

### zoom-canvas

- 含义：缩放画布；
- `type: 'zoom-canvas'`；
- `sensitivity`：缩放灵敏度，支持 1-10 的数值，默认灵敏度为 5。

**提示：若要限定缩放尺寸，请在 graph 上设置 `minZoom` 和 `maxZoom`。**

### drag-node

- 含义：拖拽节点；
- `type: 'drag-node'`；
- `delegateStyle`：节点拖拽时的绘图属性，默认为 `{ strokeOpacity: 0.6, fillOpacity: 0.6 }`；
- `updateEdge`：是否在拖拽节点时更新所有与之相连的边，默认为 `true` 。
- `enableDelegate`：拖动节点过程中是否启用 `delegate`，即在拖动过程中是否使用方框代替元素的直接移动，效果区别见下面两个动图。默认值为 `false`。

**默认配置**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-node' ]
  }
})
```
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hre9Qa7yCfQAAAAAAAAAAABkARQnAQ' width=400/>

**启用** `delegate`
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

- 含义：点击选中节点，再次点击节点或点击 Canvas 取消选中状态；
- `type: 'click-select'`；
- `multiple`：是否允许多选，默认为 `true`，当设置为 `false`，表示不允许多选，此时 `trigger` 参数无效。
- `trigger`：指定按住哪个键进行多选，默认为 shift，按住 Shift 键多选，用户可配置 shift、ctrl、alt；

**默认配置**

```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'click-select' ]
  }
})
```

按住 **`Shift`** 键可多选。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mOiIQqBof8sAAAAAAAAAAABkARQnAQ' width=400/>

**配置参数**
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

以上配置中，用户可按住 **Ctrl** 键进行多选，也可以配置 **Alt** 键。当配置了 `multiple` 参数为 `false`，则表示不允许多选，此时 `trigger` 参数无效。

### tooltip

- 含义：节点文本提示；
- `type: 'tooltip'`；
- `formatText(model)`：格式化函数，可以返回文本或者 HTML；

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

**提示：由于 G6 没有内置任何 tooltip 的样式，用户需要自己定义样式，例如：**
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
使用方式基本与 tooltip 相同，但是移到边时触发。主要是为了将两个交互区分开，以满足用户边与节点的提示样式或 HTML 结构不同，以及不需要在事件中去区分是节点事件还是边事件等。

- 含义：边文本提示；
- `type: 'edge-tooltip'`；
- `formatText(model)`：格式化函数，可以返回文本或者 HTML。

### activate-relations

- 含义：当鼠标移到某节点时，突出显示该节点以及与其直接关联的节点和连线；
- `type: 'activate-relations'`；
- 参数：
  - `trigger: 'mouseenter'`。可以是 `mousenter`，表示鼠标移入时触发；也可以是 `click`，鼠标点击时触发；
  - `activeState: 'active'`。活跃节点状态。当行为被触发，需要被突出显示的节点和边都会附带此状态，默认值为 `active`；可以与 graph 实例的 `nodeStyle` 和 `edgeStyle` 结合实现丰富的视觉效果。
  - `inactiveState: 'inactive'`。非活跃节点状态。不需要被突出显示的节点和边都会附带此状态。默认值为 `inactive`。可以与 graph 实例的 `nodeStyle` 和 `edgeStyle` 结合实现丰富的视觉效果；
  - `resetSelected`：高亮相连节点时是否重置已经选中的节点，默认为 `false`，即选中的节点状态不会被 `activate-relations` 覆盖。


<br />**默认配置**<br />

```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'activate-relations' ]
  }
})
```
默认情况下，选中的节点状态，在操作完以后仍然会保持选中状态。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bG31RqbM4JMAAAAAAAAAAABkARQnAQ' width=400/>


**配置参数**
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

配置 `resetSelected` 参数为 `true` 后，交互后会重置节点的选择状态。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VQDrT5Qpq_sAAAAAAAAAAABkARQnAQ' width=400/>


### brush-select

- 含义：拖动框选节点；
- `type: 'brush-select'`；
- 参数：
  - `brushStyle`：拖动框选框的样式，包括 `fill`、`fillOpacity`、`stroke` 和 `lineWidth` 四个属性;
  - `onSelect(nodes)`：选中节点时的回调，参数 `nodes` 表示选中的节点；
  - `onDeselect(nodes)`：取消选中节点时的回调，参数 `nodes` 表示取消选中的节点；
  - `selectedState`：选中的状态，默认值为 `'selected'`；
  - `includeEdges`：框选过程中是否选中边，默认为 `true`，用户配置为 `false` 时，则不选中边；
  - `trigger`：触发框选的动作，默认为 `'shift'`，即用户按住 Shift 键拖动就可以进行框选操作，可配置的的选项为: `'shift'`、`'ctrl' / 'control'`、`'alt'` 和 `'drag'` ，不区分大小写：
    - `'shift'`：按住 Shift 键进行拖动框选；
    - `'ctrl' / 'control'`：按住 Ctrl 键进行拖动框选；
    - `'alt'`：按住 Alt 键进行拖动框选；
    - 风险 `'drag'`：不需要按任何键，进行拖动框选，如果同时配置了 `drag-canvas`，则会与该选项冲突。

**默认配置**

```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'brush-select' ]
  }
})
```
默认情况下，按住 Shift 键进行框选，选中节点的同时，也会选中边。
<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IJizQonX75wAAAAAAAAAAABkARQnAQ' width=400/>


**配置参数**
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

上面的配置，按住 Ctrl 键，进行框选，框选过程中不会选中边。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1xNZT7mPFK4AAAAAAAAAAABkARQnAQ' width=400/>

**冲突的配置：**
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

当用户配置 `brush-select` 的 `trigger` 为 `drag`，同时又配置了 `drag-canvas` 时，在交互上面会出现冲突的情况。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*umffRa8rHtUAAAAAAAAAAABkARQnAQ' width=400/>

可以看到，在拖动过程中也出现了框选的情况，这种情况很显然不是我们期望的效果，除过使用 `brush-select` 的 `trigger` 参数避免这种冲突外，我们还可以通过下面的方式来实现：

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

上面这种方式是使用不同的 mode 来区分，mode 可以达到使用相同交互动作而产生不同的效果。默认模式中，使用的是拖拽操作由 `drag-canvas` 响应。当用户通过通过 `graph.setMode('brush')` 切换到 brush 模式后，此时同样的拖拽操作由 `brush-select` 响应。更多关于 mode 的内容请参考 [Mode](/zh/docs/manual/middle/states/mode) 教程。

### collapse-expand

- 含义：只适用于树图，展开或收起节点；
- `type: 'collapse-expand'`；
- 参数：
  - `trigger`：收起和展开树图的方式，支持 `'click'` 和 `'dblclick'` 两种方式。默认为 `'click'`，即单击；
  - `onChange`：收起或展开的回调函数。警告：V3.1.2 版本中将移除。


**用法**

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

- 含义：收起和展开群组；
- `type：'collapse-expand-group'`
- 参数：
  - trigger：收起和展开节点分组的方式。支持 `'click'` 和 `'dblclick'` 两种方式。默认为 `'dblclick'`，即双击。

**默认配置**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'collapse-expand-group' ]
  }
})
```

**配置参数**<br />配置 `trigger` 参数为 **`click`** 后，单击节点分组即可收起或展开分组。

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

- 含义：拖动节点分组；
- `type: 'drag-group'`；
- 参数：
  - `delegateStyle`：拖动节点分组时 `delegate` 的样式。

**默认配置**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-group' ]
  }
})
```

### drag-node-with-group

- 含义：拖动节点分组中的节点；
- `type：'drag-node-with-group'`；
- 参数：
  - `delegateStyle`：拖动节点时 `delegate` 的样式；
  - `maxMultiple`；
  - `minMultiple`。

**默认配置**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-node-with-group' ]
  }
})
```
