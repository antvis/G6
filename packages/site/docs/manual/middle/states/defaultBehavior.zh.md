---
title: 内置的 Behavior
order: 1
---

## 什么是 Behavior

Behavior 是 G6 提供的定义图上交互事件的机制。它与[交互模式 Mode](/zh/docs/manual/middle/states/mode) 搭配使用，如何将下文所述各种 Behavior 配置到图上，见 [交互模式](/zh/docs/manual/middle/states/mode)。

## 内置 Behavior

理论上， G6 上的所有基础图形、Item（节点/边）都能通过事件来进行操作。考虑到通用性，G6 目前共提供了以下 14 个内置的 Behavior。此外，用户可以注册 [自定义 Behavior](/zh/docs/manual/middle/states/custom-behavior)。

### drag-combo

V3.5 以上版本支持。

- 含义：拖动 Combo；
- 配置项：
  - `type: 'drag-combo'`；
  - `enableDelegate`：拖动 Combo 时候是否开启图形代理 delegate，即拖动 Combo 时候 Combo 不会实时跟随变动，拖动过程中有临时生成一个 delegate 图形，拖动结束后才更新 Combo 位置，默认为 false，不开启；
  - `delegateStyle`：delegate 的样式；
  - `onlyChangeComboSize`：拖动嵌套的 Combo 时，只改变父 Combo 的大小，不改变层级关系，默认为 false；
  - `activeState`：当拖动 Combo 时，父 Combo 或进入到的 Combo 的状态值，需要用户在实例化 Graph 时在 `comboStateStyles` 里面配置，默认为空；
  - `selectedState`：选中 Combo 的状态，默认为 selected，需要在 `comboStateStyles` 里面配置；
  - `shouldUpdate(e)`：是否允许当前被操作的 combo 被拖拽，参见下面示例。

**使用默认配置**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['drag-combo'],
  },
});
```

用户可根据实际需求，为 `activeState` 或 `selectedState` 配置样式：

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'drag-combo',
        enableDelegate: true,
        activeState: 'actived',
        shouldUpdate: (e) => {
          // 不允许 id 为 'combo1' 的 combo 被拖拽
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

V3.5 以上版本支持。

- 含义：收起和展开 Combo。若图配置有布局，则该 behavior 被触发后会触发图的重新布局。若希望避免重新布局，可以通过监听 combo 点击事件和 [graph.collapseExpandCombo API](/zh/docs/api/Graph#collapseexpandcombocombo) 控制收缩展开逻辑；
- 配置项：
  - `type: 'collapse-expand-combo'`；
  - `trigger`：触发方式，默认为双击收起或展示，可配置 `'click'` 和 `'dblclick'`；
  - `relayout`：收缩或展开后是否触发重新布局，默认为 `true`。

**使用默认配置**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['collapse-expand-combo'],
  },
});
```

用户可以配置成单击展示或收起：

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'collapse-expand-combo',
        trigger: 'click',
        relayout: false, // 收缩展开后，不重新布局
      },
    ],
  },
});
```

### drag-canvas

- 含义：拖拽画布；
- 配置项：

  - `type: 'drag-canvas'`；
  - `direction`：允许拖拽方向，支持`'x'`，`'y'`，`'both'`，默认方向为 `'both'`；
  - `enableOptimize`：是否开启优化，开启后拖动画布过程中隐藏所有的边及节点上非 keyShape 部分，默认关闭；
  - `shouldBegin(e)`：是否允许触发该操作；
  - `allowDragOnItem`：是否允许用户在节点/边/ combo 上拖拽时响应，默认为 false；
  - `scalableRange`：拖动 canvas 可扩展的范围，默认为 0，值为 -1 ～ 1 代表可超出视口的范围的比例值（相对于视口大小）。值小于 -1 或大于 1 时，为正和负数时的效果如下图所示。

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ' width='650' />

- 相关时机事件：
  - `canvas:dragstart`：画布拖拽开始时触发，使用 `graph.on('canvas:dragstart', e => {...})` 监听；
  - `canvas:drag`：画布拖拽中触发，使用 `graph.on('canvas:drag', e => {...})` 监听；
  - `canvas:dragend`：画布拖拽结束后触发，使用 `graph.on('canvas:drag', e => {...})` 监听。

**使用默认配置**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['drag-canvas'],
  },
});
```

默认配置下，可以在 x 和 y 两个方向上拖动画布。

**使用自定义参数**

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

此时只能在 x 方向上面拖动，y 方向上不允许拖动。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*54yxRrW1A7sAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>


### scroll-canvas

- 含义：滚轮滚动画布，*v4.2.6 起支持*；
- 配置项：

  - `type: 'scroll-canvas'`；
  - `direction`：允许拖拽方向，支持`'x'`，`'y'`，`'both'`，默认方向为 `'both'`；
  - `enableOptimize`：是否开启优化，开启后拖动画布过程中隐藏所有的边及节点上非 keyShape 部分，默认关闭；
  - `zoomKey`：切换为滚动缩放的键盘按钮，按住该键并滚动滚轮，则切换为滚轮缩放画布，可选项为：`'shift'`，`'ctrl'`，`'alt'`，`'control'`；
  - `scalableRange`：拖动 canvas 可扩展的范围，默认为 0，值为 -1 ～ 1 代表可超出视口的范围的比例值（相对于视口大小）。值小于 -1 或大于 1 时，为正和负数时的效果如下图所示。

  <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ' width='650' alt="" />

- 相关时机事件：
  - `onWheel`：滚轮滚动时触发，使用 `graph.on('onWheel', e => {...})` 监听。

**使用默认配置**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['scroll-canvas'],
  },
});
```

默认配置下，可以在 x 和 y 两个方向上滚动画布。

**使用自定义参数**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'scroll-canvas',
        direction: 'x',
      },
    ],
  },
});
```

此时只能在 x 方向上面滚动，y 方向上不允许滚动。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*54yxRrW1A7sAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>


### zoom-canvas

- 含义：缩放画布；
- `type: 'zoom-canvas'`；
- 配置项：
  - `sensitivity`：缩放灵敏度，支持 1-10 的数值，默认灵敏度为 5；
  - `minZoom`：最小缩放比例；
  - `maxZoom`：最大缩放比例；
  - `enableOptimize`：是否开启性能优化，默认为 false，设置为 true 开启，开启后缩放比例小于 optimizeZoom 时自动隐藏非 keyShape；
  - `optimizeZoom`：当 enableOptimize 为 true 时起作用，默认值为 0.7，表示当缩放到哪个比例时开始隐藏非 keyShape；
  - `shouldUpdate(e)`：是否允许发生缩放；
  - `fixSelectedItems`：在缩小画布时是否固定选定元素的描边粗细、文本大小、整体大小等，`fixSelectedItems` 是一个对象，有以下变量：
    - `fixSelectedItems.fixState`：将被固定的元素状态，被设置为该状态的节点将会在画布缩小时参与固定大小的计算，默认为 `'selected'`；
    - `fixSelectedItems.fixAll`：固定元素的整体大小，优先级高于 `fixSelectedItems.fixLineWidth` 和 `fixSelectedItems.fixLabel`；
    - `fixSelectedItems.fixLineWidth`：固定元素的 keyShape 的描边粗细；
    - `fixSelectedItems.fixLabel`：固定元素的文本大小。
- 相关时机事件：
  - `wheelzoom(e)`：当缩放发生变化时被触发。使用 `graph.on('wheelzoom', e => {...})` 监听该时机事件。

**提示：若要限定缩放尺寸，请在 graph 上设置  `minZoom`  和  `maxZoom`。**

### drag-node

**说明：** V3.5 以上版本才支持拖动 Combo 中的节点。

- 含义：拖拽节点，或拖动 Combo 中的节点；
- 配置项：
  - `type: 'drag-node'`；
  - `delegateStyle`：节点拖拽时的绘图属性，默认为 `{ strokeOpacity: 0.6, fillOpacity: 0.6 }`；
  - `updateEdge`：是否在拖拽节点时更新所有与之相连的边，默认为 `true` 。
  - `enableDelegate`：拖动节点过程中是否启用 `delegate`，即在拖动过程中是否使用方框代替元素的直接移动，效果区别见下面两个动图。默认值为  `false`；
  - `onlyChangeComboSize`：V3.5 及以上版本支持，拖动节点过程中只改变 Combo 大小，不改变 Combo 结构，即不将节点从 Combo 中拖出或将节点拖入到 Combo 中，默认为 false；
  - `enableDebounce`：是否在拖动节点时使用 debounce 来避免频繁的更新计算。这个 boolean 类型的配置项可以为折线边的更新提高性能，减少折线边的频繁重新寻径。默认值为 `false`；
  - `enableOptimize`：是否在拖拽节点时隐藏相关边，拖拽结束后再显示。这个 boolean 类型的配置项可以完全避免拖拽过程中相关折线边的重新寻径，默认值为 `false`；
  - `comboActiveState`：V3.5 及以上版本支持，拖动节点过程中，如果存在 Combo，节点所在 Combo 或节点进入的 Combo 的状态，需要在实例化 Graph 时候通过 `comboStateStyles` 进行配置，默认为空；
  - `selectedState`：V3.5 及以上版本支持，选中 Combo 的样式，需要在实例化 Graph 时候通过 `comboStateStyles` 进行配置,默认为 selected；
  - `shouldBegin(e)`：是否允许当前被操作的节点被拖动；
  - `shouldUpdate(e)`：是否允许当前被操作的节点在拖动过程中更新自身/ delegate 位置；
  - `shouldEnd(e)`：是否允许当前被操作的节点在拖拽结束时更新位置。

**使用默认配置**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['drag-node'],
  },
});
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hre9Qa7yCfQAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

**启用** `delegate`

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'drag-node',
        enableDelegate: true,
        shouldBegin: (e) => {
          // 不允许拖拽 id 为 'node1' 的节点
          if (e.item && e.item.getModel().id === 'node1') return false;
        },
      },
    ],
  },
});
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*BN83QJQpU40AAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

### click-select

- 含义：点击选中节点，再次点击节点或点击 Canvas 取消选中状态；
- 配置项：
  - `type: 'click-select'`；
  - `multiple`：是否允许多选，默认为 `true`，当设置为 `false`，表示不允许多选，此时 `trigger` 参数无效；
  - `trigger`：指定按住哪个键进行多选，默认为 shift，按住 Shift 键多选，用户可配置 shift、ctrl、alt；
  - `shouldBegin(e)`：是否允许该 behavior 发生，参考下面示例；
  - `shouldUpdate(e)`：是否允许对该 behavior 发生状态响应，参考下面示例。
- 相关时机事件：
  - `'nodeselectchange'`：当选中的元素集合发生变化时将会触发该时机事件。使用 `graph.on('nodeselectchange', e => {...})` 监听。其参数 `e` 有以下字段：
    - `e.target`：当前操作的 item；
    - `e.selectedItems`：当前操作后，所有被选中的 items 集合；
    - `e.select`：当前操作是选中(true)还是取消选中(false)。

**使用默认配置**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['click-select'],
  },
});

// 当 click-select 选中的元素集合发生变化时将会触发下面时机事件，e 中包含相关信息
graph.on('nodeselectchange', (e) => {
  // 当前操作的 item
  console.log(e.target);
  // 当前操作后，所有被选中的 items 集合
  console.log(e.selectedItems);
  // 当前操作时选中(true)还是取消选中(false)
  console.log(e.select);
});
```

按住 **`Shift`** 键可多选。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mOiIQqBof8sAAAAAAAAAAABkARQnAQ' width=400/>

**使用自定义参数**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'click-select',
        trigger: 'ctrl',
        // 是否允许该 behavior 发生。若返回 false，被操作的 item 不会被选中，也不会触发 'nodeselectchange' 时机事件
        shouldBegin: (e) => {
          // 当点击的图形名为 'text-shape' 时，不允许该 behavior 发生
          if (e.target.get('name') === 'text-shape') return false;
          // 当点击的节点/边/ combo 的 id 为 'id1' 时，不允许该 behavior 发生
          if (e.item.getModel().id === 'id1') return false;
          return true;
        },
        // 是否允许对该 behavior 发生状态响应。若返回 false，被操作的对象的状态及相关状态样式不会被更新，但是仍然会触发 'nodeselectchange' 时机事件
        shouldUpdate: (e) => {
          // 当点击的节点/边/ combo 的 id 为 'id2' 时，该 item 不会发生状态的改变
          if (e.item.getModel().id === 'id2') return false;
          return true;
        },
      },
    ],
  },
});

// 当 click-select 选中的元素集合发生变化时将会触发下面时机事件，evt 中包含相关信息
graph.on('nodeselectchange', (e) => {
  // 当前操作的 item
  console.log(e.target);
  // 当前操作后，所有被选中的 items 集合
  console.log(e.selectedItems);
  // 当前操作时选中(true)还是取消选中(false)
  console.log(e.select);
});
```

以上配置中，用户可按住 **Ctrl** 键进行多选，也可以配置 **Alt** 键。当配置了  `multiple` 参数为 `false`，则表示不允许多选，此时 `trigger` 参数无效。

### tooltip

- 含义：节点文本提示；
- 配置项：
  - `type: 'tooltip'`；
  - `formatText(model)`：格式化函数，可以返回文本或者 HTML；
  - `offset`：tooltip 距离鼠标的偏移量；
  - `shouldBegin(e)`：是否允许 toolip 出现；
  - `shouldUpdate(e)`：是否允许 toolip 内容更新。
- 相关时机事件：
  - `tooltipchange`：当 tooltip 发生变化时被触发。使用 `graph.on('tooltipchange', e => {...})` 监听。

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

**提示：由于 G6 没有内置任何 tooltip 的样式，用户需要自己定义样式，例如：**

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

使用方式基本与 tooltip 相同，但是移到边时触发。主要是为了将两个交互区分开，以满足用户边与节点的提示样式或 HTML 结构不同，以及不需要在事件中去区分是节点事件还是边事件等。

- 含义：边文本提示；
- 配置项：
  - `type: 'edge-tooltip'`；
  - `formatText(model)`：格式化函数，可以返回文本或者 HTML；
  - `offset`：tooltip 距离鼠标的偏移量；
  - `shouldBegin(e)`：是否允许 toolip 出现；
  - `shouldUpdate(e)`：是否允许 toolip 内容更新。
- 相关时机事件：
  - `tooltipchange`：当 tooltip 发生变化时被触发。使用 `graph.on('tooltipchange', e => {...})` 监听。

### activate-relations

- 含义：当鼠标移到某节点时，突出显示该节点以及与其直接关联的节点和连线；
- `type: 'activate-relations'`；
- 参数：
  - `trigger: 'mouseenter'`。可以是  `mousenter`，表示鼠标移入时触发；也可以是  `click`，鼠标点击时触发；
  - `activeState: 'active'`。活跃节点状态。当行为被触发，需要被突出显示的节点和边都会附带此状态，默认值为  `active`；可以与 graph 实例的  `nodeStyle`  和  `edgeStyle`  结合实现丰富的视觉效果。
  - `inactiveState: 'inactive'`。非活跃节点状态。不需要被突出显示的节点和边都会附带此状态。默认值为  `inactive`。可以与 graph 实例的  `nodeStyle`  和  `edgeStyle`  结合实现丰富的视觉效果；
  - `resetSelected`：高亮相连节点时是否重置已经选中的节点，默认为 `false`，即选中的节点状态不会被 `activate-relations` 覆盖；
  - `shouldUpdate(e)`：是否允许该 behavior 发生。
- 相关时机事件：
  - `'afteractivaterelations'`：当高亮发生改变时触发该时机事件。使用 `graph.on('afteractivaterelations', evt => {...})` 监听。其参数 `e` 有以下字段：
    - `e.item`：当前操作的节点 item；
    - `e.action`：当前操作是选中(`'activate'`)还是取消选中(`'deactivate'`)。

<br />**使用默认配置**<br />

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['activate-relations'],
  },
});

graph.on('afteractivaterelations', (e) => {
  // 当前操作的节点 item
  console.log(e.item);
  // 当前操作是选中(`'activate'`)还是取消选中(`'deactivate'`)
  console.log(e.action);
});
```

默认情况下，选中的节点状态，在操作完以后仍然会保持选中状态。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bG31RqbM4JMAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

**使用自定义参数**

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
  // 当前操作的节点 item
  console.log(e.item);
  // 当前操作是选中(`'activate'`)还是取消选中(`'deactivate'`)
  console.log(e.action);
});
```

配置 `resetSelected` 参数为 `true` 后，交互后会重置节点的选择状态。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VQDrT5Qpq_sAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

### brush-select

- 含义：拖动框选节点；
- 配置项：
  - `type: 'brush-select'`；
  - `brushStyle`：拖动框选框的样式，包括 `fill`、`fillOpacity`、`stroke` 和 `lineWidth` 四个属性;
  - `onSelect(nodes)`：选中节点时的回调，参数 `nodes` 表示选中的节点；
  - `onDeselect(nodes)`：取消选中节点时的回调，参数 `nodes` 表示取消选中的节点；
  - `selectedState`：选中的状态，默认值为 `'selected'`；
  - `includeEdges`：框选过程中是否选中边，默认为 `true`，用户配置为 `false` 时，则不选中边；
  - `trigger`：触发框选的动作，默认为 `'shift'`，即用户按住 Shift 键拖动就可以进行框选操作，可配置的的选项为: `'shift'`、`'ctrl' / 'control'`、`'alt'` 和 `'drag'` ，不区分大小写：
    - `'shift'`：按住 Shift 键进行拖动框选；
    - `'ctrl' / 'control'`：按住 Ctrl 键进行拖动框选；
    - `'alt'`：按住 Alt 键进行拖动框选；
    - 风险  `'drag'`：不需要按任何键，进行拖动框选，如果同时配置了 `drag-canvas`，则会与该选项冲突。
  - `shouldUpdate(e)`：是否允许对该 behavior 发生，参考下面示例。
- 相关时机事件：
  - `'nodeselectchange'`：当选中的元素集合发生变化时将会触发该时机事件。使用 `graph.on('nodeselectchange', e => {...})` 监听。其参数 `e` 有以下字段：
    - `e.selectedItems`：当前操作后，所有被选中的 items 集合；
    - `e.select`：当前操作是选中(true)还是取消选中(false)。

**使用默认配置**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['brush-select'],
  },
});

// 当 click-select 选中的元素集合发生变化时将会触发下面时机事件，e 中包含相关信息
graph.on('nodeselectchange', (e) => {
  // 当前操作后，所有被选中的 items 集合
  console.log(e.selectedItems);
  // 当前操作时选中(true)还是取消选中(false)
  console.log(e.select);
});
```

默认情况下，按住 Shift 键进行框选，选中节点的同时，也会选中边。 <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IJizQonX75wAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

**使用自定义参数**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      {
        type: 'brush-select',
        trigger: 'ctrl',
        includeEdges: false,
        // 是否允许对该 behavior 发生。若返回 false，被操作的 item 不会被选中，不触发 'nodeselectchange' 时机事件
        shouldUpdate: (e) => {
          // 当点击的节点/边/ combo 的 id 为 'id2' 时，该 item 不会被选中
          if (e.item.getModel().id === 'id2') return false;
          return true;
        },
      },
    ],
  },
});

// 当 click-select 选中的元素集合发生变化时将会触发下面时机事件，e 中包含相关信息
graph.on('nodeselectchange', (e) => {
  // 当前操作后，所有被选中的 items 集合
  console.log(e.selectedItems);
  // 当前操作时选中(true)还是取消选中(false)
  console.log(e.select);
});
```

上面的配置，按住 Ctrl 键，进行框选，框选过程中不会选中边。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1xNZT7mPFK4AAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

**冲突的配置：**

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

当用户配置 `brush-select` 的 `trigger` 为 `drag`，同时又配置了 `drag-canvas` 时，在交互上面会出现冲突的情况。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*umffRa8rHtUAAAAAAAAAAABkARQnAQ' width=400 alt='img'/>

可以看到，在拖动过程中也出现了框选的情况，这种情况很显然不是我们期望的效果，除过使用 `brush-select` 的 `trigger` 参数避免这种冲突外，我们还可以通过下面的方式来实现：

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

上面这种方式是使用不同的 mode 来区分，mode 可以达到使用相同交互动作而产生不同的效果。默认模式中，使用的是拖拽操作由 `drag-canvas` 响应。当用户通过通过 `graph.setMode('brush')` 切换到 brush 模式后，此时同样的拖拽操作由 `brush-select` 响应。更多关于 mode 的内容请参考 [Mode](/zh/docs/manual/middle/states/mode) 教程。

### lasso-select

- 含义：自由圈选；
- 配置项：
  - `type: 'lasso-select'`；
  - `delegateStyle`：拖动框选框的样式，包括 `fill`、`fillOpacity`、`stroke` 和 `lineWidth` 四个属性;
  - `onSelect(nodes, edges)`：选中节点时的回调，参数 `nodes` 表示选中的节点，`edges` 表示选中的边；
  - `onDeselect(nodes, edges)`：取消选中节点时的回调，参数 `nodes` 表示取消选中的节点，`edges` 表示取消选中的边；
  - `selectedState`：选中的状态，默认值为 `'selected'`；
  - `includeEdges`：框选过程中是否选中边，默认为 `true`，用户配置为 `false` 时，则不选中边；
  - `trigger`：触发框选的动作，默认为 `'shift'`，即用户按住 Shift 键拖动就可以进行框选操作，可配置的的选项为: `'shift'`、`'ctrl' / 'control'`、`'alt'` 和 `'drag'` ，不区分大小写：
    - `'shift'`：按住 Shift 键进行拖动框选；
    - `'ctrl' / 'control'`：按住 Ctrl 键进行拖动框选；
    - `'alt'`：按住 Alt 键进行拖动框选；
    - 风险  `'drag'`：不需要按任何键，进行拖动框选，如果同时配置了 `drag-canvas`，则会与该选项冲突。
  - `shouldUpdate(e)`：是否允许对该 behavior 发生，参考下面示例。
- 相关时机事件：
  - `'nodeselectchange'`：当选中的元素集合发生变化时将会触发该时机事件。使用 `graph.on('nodeselectchange', e => {...})` 监听。其参数 `e` 有以下字段：
    - `e.selectedItems`：当前操作后，所有被选中的 items 集合；
    - `e.select`：当前操作是选中(true)还是取消选中(false)。

`lasso-select` 的配置和使用方法和 `brush-select` 一致。

### collapse-expand

- 含义：只适用于树图，展开或收起子树；
- 注意：若希望在首次布局时有默认收起的子树，则可以在数据中设置子树根节点的属性 `collapsed` 为 `true`。若希望使用代码控制子树的展开/收起，同样可以在数据中设置子树根节点的 `collapsed` 属性，并调用 `treeGraph.layout()` 使之生效；
- 配置项：
  - `type: 'collapse-expand'`；
  - `trigger`：收起和展开树图的方式，支持 `'click'` 和 `'dblclick'` 两种方式。默认为 `'click'`，即单击；
  - `onChange`：收起或展开的回调函数。警告：V3.1.2 版本中将移除；
  - `shouldBegin(e)`：是否允许该 behavior 在当前操作的 item 上发生。
- 相关时机事件：
  - `itemcollapsed`：当 collapse-expand 发生时被触发。使用 `graph.on('itemcollapsed', e => {...})` 监听，参数 `e` 有以下字段：
    - `e.item`：当前被操作的节点 item；
    - `e.collapsed`：当前操作是收起（`true`）还是展开（`false`）。

**用法**

```javascript
const graph = new G6.TreeGraph({
  modes: {
    default: [
      {
        type: 'collapse-expand',
        trigger: 'click',
        onChange: (item, collapsed) => {
          const data = item.get('model').data;
          data.collapsed = collapsed;
          return true;
        },
        shouldBegin: (e) => {
          // 若当前操作的节点 id 为 'node1'，则不发生 collapse-expand
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
  // 当前被操作的节点 item
  console.log(e.item);
  // 当前操作是收起（`true`）还是展开（`false`）
  console.log(e.collapsed);
});
```

### create-edge

- 含义：通过交互创建边；
- 配置项：
  - `type：'create-edge'`；
  - `trigger`：该交互的触发条件，可选 `'click'`，`'drag'`。默认为 `'click'`，即分别点击两个节点为这两个节点创建边。`'drag'` 代表从一个节点“拖拽”出一条边，在另一个节点上松开鼠标完成创建。注意，`trigger: 'drag'` 不能创建一个自环边；
  - `key`：键盘按键作为该交互的辅助触发，若不设置或设置为 undefined 则代表只根据 `trigger` 决定该交互的触发条件。可选值：`'shift'`，`'ctrl'`, 'control'，`'alt'`，`'meta'`，`undefined`；
  - `edgeConfig`: 有该交互创建出的边的配置项，可以配置边的类型、样式等，其类型参考[边的配置](/zh/docs/manual/middle/elements/edges/defaultEdge)。如果需要为不同的被添加边赋予不同样式，请监听 `'aftercreateedge'` 并更新相对应的边；
  - `shouldBegin(e)`：是否允许当前被操作的条件下开始创建边；
  - `shouldEnd(e)`：是否允许当前被操作的条件下结束创建边；
- 相关时机事件：
  - `'aftercreateedge'`：当边创建完成时将会触发该时机事件。使用 `graph.on('aftercreateedge', e => {...})` 监听。其参数 `e` 中的 `edge` 字段即为刚刚创建的边。

**使用默认配置**

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

**使用自定义参数**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      // 只有当 'shift' 键被按下，才能够通过从一个节点拖拽到另一个节点来创建一条边
      {
        type: 'create-edge',
        trigger: 'drag',
        key: 'shift',
        edgeConfig: {
          type: 'cubic',
          style: {
            stroke: '#f00',
            lineWidth: 2,
            // ... // 其它边样式配置
          },
          // ... // 其它边配置
        },
      },
    ],
  },
});
```

### shortcuts-call

- 含义：允许终端用户使用键盘组合键调用 Graph 的函数，例如按下键盘上的 control 与 1，对图进行适应画布。注意：终端用户使用该功能时焦点必须在画布上才能够正确触发；
- 配置项：
  - `type：'shortcuts-call'`；
  - `trigger`：触发该交互的主键，可选 `'shift'`，`'alt'`，`'ctrl'`，`'control'`。默认为 `'control'`。设置时需要注意可能与其他正在别使用的 Behavior 的 trigger 产生冲突；
  - `combinedKey`：触发该交互的副按键，在按住主键 `trigger` 后，按下该副按键，将会调用 `functionName` 指定的函数。若不设置或设置为 undefined 则代表只根据 `trigger` 触发；
  - `functionName`: 被调用的 Graph 的一个函数名，若传入一个错误的函数名，将会不产生任何效果；
  - `functionParams`: 被调用的函数的参数，请根据各函数的文档传入正确的参数，错误的参数可能导致报错。

**使用默认配置**

```javascript
const graph = new G6.Graph({
  modes: {
    default: ['shortcuts-call'],
  },
});
```

**使用自定义参数**

```javascript
const graph = new G6.Graph({
  modes: {
    default: [
      // 当按住 'alt' 键，并按下 'm' 键，将调用 graph.moveTo(10, 10)
      {
        type: 'shortcuts-call',
        // 主健
        trigger: 'alt',
        // 副键
        combinedKey: 'm',
        // 将图内容的左上角移动到 10,10
        functionName: 'moveTo',
        functionParams: [10, 10],
      },
    ],
  },
});
```
