---
title: 内置的 Behavior
order: 4
---

## 什么是 Behavior
Behavior 是 G6 提供的定义图上交互事件的机制。它与[交互模式 Mode](https://www.yuque.com/antv/g6/g6-mode) 搭配使用，如何将下文所述各种 Behavior 配置到图上，见 [交互模式](https://www.yuque.com/antv/g6/g6-mode)。

## 内置 Behavior
理论上说 G6 上的所有基础图形、Item（节点/边）都能通过事件来进行操作，考虑到通用性， G6目前共提供了以下9个内置的 Behavior。

### drag-canvas

- 含义：拖拽画布；
- `type: 'drag-canvas'`；
- `direction`: 允许拖拽方向，支持`'x'`， `'y'`，`'both'`，默认方向为 `'both'`。

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

此时只能在 x 方向上面拖动，y 方向上不允许拖动。<br />![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570778658995-88e2bf4e-e201-43a0-9ffd-15ceadc8334e.gif#align=left&display=inline&height=333&name=3.gif&originHeight=517&originWidth=783&search=&size=669012&status=done&width=504)

### zoom-canvas

- 含义：缩放画布；
- `type: 'zoom-canvas'`；
- `sensitivity`: 缩放灵敏度，支持 1-10 的数值，默认灵敏度为 5。

**提示：若要限定缩放尺寸，请在 graph 上设置 **`**minZoom**`** 和 **`**maxZoom**`**。**

### drag-node

- 含义：拖拽节点；
- `type: 'drag-node'`；
- `delegateStyle`: 节点拖拽时的绘图属性，默认为 `{ strokeOpacity: 0.6, fillOpacity: 0.6 }`；
- `updateEdge`: 是否在拖拽节点时更新所有与之相连的边，默认为 `true` 。
- 3.1.2 `enableDelegate`：拖动节点过程中是否启用 `delegate`，即在拖动过程中是否使用方框代替元素的直接移动，效果区别见下面两个动图。默认值为 `false`。

**默认配置**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-node' ]
  }
})
```
![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570777651736-e68e2d92-eabe-4b58-bc39-66a6cfbd6cf5.gif#align=left&display=inline&height=374&name=3.gif&originHeight=517&originWidth=783&search=&size=149678&status=done&width=567)

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
![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570778113574-f65eeb6b-4df4-4db4-a4d3-5cf2141607f3.gif#align=left&display=inline&height=279&name=3.gif&originHeight=517&originWidth=783&search=&size=219983&status=done&width=422)

### click-select

- 含义：点击选中节点，再次点击节点或点击 Canvas 取消选中状态；
- `type: 'click-select'`；
- `multiple`: 是否允许多选，默认为 `true`，当设置为 `false`，表示不允许多选，此时 `trigger` 参数无效。
- 3.1.2 `trigger`: 指定按住哪个键进行多选，默认为 shift，按住 Shift 键多选，用户可配置 shift、ctrl、alt；

**默认配置**<br />**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'click-select' ]
  }
})
```

按住 **`Shift`** 键可多选。<br />![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570778352084-ca8b1694-0e10-4dfa-b69e-2fc35130b9a9.gif#align=left&display=inline&height=517&name=3.gif&originHeight=517&originWidth=783&search=&size=48383&status=done&width=783)

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

以上配置中，用户可按住 **Ctrl** 键进行多选，也可以配置 **Alt** 键。当配置了 `multiple` 参数为 `false`，则表示不允许多谢，此时 `trigger` 参数无效。

### tooltip

- 含义：节点文本提示；
- `type: 'tooltip'`；
- `formatText(model)` 格式化函数，可以返回文本或者 HTML；
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
- `formatText(model)` 格式化函数，可以返回文本或者 HTML。

### activate-relations

- 含义：当鼠标移到某节点时，突出显示该节点以及与其直接关联的节点和连线；
- `type: 'activate-relations'`；
- 参数：
  - `trigger: 'mouseenter'`, 可以是 `mousenter` , 鼠标移入时触发；也可以是 `click` ，鼠标点击时触发；
  - `activeState: 'active'`, 活跃节点状态；当行为被触发，需要被突出显示的节点和边都会附带此状态，默认值为 `active`；可以与 graph 实例的 `nodeStyle` 和 `edgeStyle` 结合实现丰富的视觉效果。
  - `inactiveState: 'inactive'`，非活跃节点状态，不需要被突出显示的节点和边都会附带此状态，默认值为 `inactive`；可以与 graph 实例的 `nodeStyle` 和 `edgeStyle` 结合实现丰富的视觉效果；
  - 3.1.2 `resetSelected`：高亮相连节点时是否重置已经选中的节点，默认为false，即选中的节点状态不会被 `activate-relations` 覆盖。


<br />**默认配置**<br />

```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'activate-relations' ]
  }
})
```
默认情况下，选中的节点状态，在操作完以后仍然会保持选中状态。<br />![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570783971145-6588e49f-79d7-40b4-aa66-3308f060f2b4.gif#align=left&display=inline&height=542&name=3.gif&originHeight=542&originWidth=610&search=&size=358920&status=done&width=610)

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

![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570784093933-beb50a11-eef7-4076-a05c-5723be7e7e1d.gif#align=left&display=inline&height=542&name=3.gif&originHeight=542&originWidth=610&search=&size=142174&status=done&width=610)


### brush-select

- 含义：拖动框选节点；
- `type: 'brush-select'`；
- 参数：
  - `brushStyle`：拖动框选框的样式；
  - `onSelect(nodes)`：选中节点时的回调，参数 `nodes` 表示选中的节点；
  - `onDeselect(nodes)`：取消选中节点时的回调，参数 `nodes` 表示取消选中的节点；
  - `brushStyle`：框选时样式的配置项，包括 `fill`、`fillOpacity`、`stroke` 和 `lineWidth` 四个属性；
  - `selectedState`：选中的状态，默认值为 `'selected'`；
  - `includeEdges`：框选过程中是否选中边，默认为 `true`，用户配置为 `false` 时，则不选中边；
  - 3.1.2 `trigger`：触发框选的动作，默认为 `'shift'`，即用户按住 Shift 键拖动就可以进行框选操作，可配置的的选项为: `'shift'`、`'ctrl' / 'control'`、`'alt'` 和 `'drag'` ，不区分大小写：
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
默认情况下，按住 Shift 键进行框选，选中节点的同时，也会选中边。<br />![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570779252901-1efaccf6-a268-47a6-8db9-f63c82d355fe.gif#align=left&display=inline&height=542&name=3.gif&originHeight=542&originWidth=610&search=&size=188323&status=done&width=610)

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

上面的配置，按住 Ctrl 键，进行框选，框选过程中不会选中边。<br />![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570779434063-6bf4fe39-88c8-44c2-a25d-6b8980db4a39.gif#align=left&display=inline&height=370&name=3.gif&originHeight=542&originWidth=610&search=&size=115882&status=done&width=416)

**配置冲突**
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

当用户配置 `brush-select` 的 `trigger` 为 `drag`，同时又配置了 `drag-canvas` 时，在交互上面会出现冲突的情况。<br />![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570779665370-63bb8a65-f4e3-4a05-8c42-21b2e79b6b76.gif#align=left&display=inline&height=412&name=3.gif&originHeight=542&originWidth=610&search=&size=559913&status=done&width=464)

可以看到，在拖动过程中也出现了框选的情况，这种情况很显然不是我们期望的效果，除过使用 `brush-select `的 `trigger` 参数避免这种冲突外，我们还可以通过下面的方式来实现：

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

上面这种方式是使用不同的 mode 来区分，mode 可以达到使用相同交互动作而产生不同的效果，更多关于 mode 的内容请参数 [G6 中的 Mode 文档](./mode)。

使用 mode 区分，默认情况下使用的是 `drag-canvas`，但用户需要切换到框选时，通过 `graph.setModel('brush')` 即可实现，此时同样的交互产生的就是框选的效果。

### collapse-expand

- 含义：只适用于树图，展开或收起节点；
- `type: 'collapse-expand'`；
- 参数：
  - `trigger`：收起和展开树图的方式，支持`click`和`dblclick`两种方式，默认为`click`；
  - `onChange`：收起或展开的回调函数，警告 `3.1.2 `版本中将移除。


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
  - 3.1.2 trigger：收起和展开节点分组的方式，支持`click`和`dblclick`两种方式，默认为`dblclick`

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

![3.gif](https://cdn.nlark.com/yuque/0/2019/gif/244306/1570785874686-a7333f95-e8d3-45a7-873e-8ee56c3b4b21.gif#align=left&display=inline&height=542&name=3.gif&originHeight=542&originWidth=610&search=&size=57719&status=done&width=610)

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
  - `delegateStyle`：拖动节点分组时 `delegate` 的样式；
  - `maxMultiple`：
  - `minMultiple`。

**默认配置**
```javascript
const graph = new G6.Graph({
	modes: {
    default: [ 'drag-node-with-group' ]
  }
})
```
