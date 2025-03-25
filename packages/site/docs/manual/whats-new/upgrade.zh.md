---
title: 升级到 5.0
order: 6
---

本文档将引导你从 G6 `4.x` 版本升级到 `5.x` 版本。如果你使用的是 `3.x` 版本，请先升级到 `4.x` 版本。

## 升级前准备

1. 请确保当前 git 分支是干净的，没有未提交的代码。
2. 参考 [安装](/manual/getting-started/installation) 文档安装 `5.x` 版本，并移除 `4.x` 版本依赖。

## 开始升级

### 数据

新版本的数据格式有所变化，具体如下：

1. `nodes` `edges` `combos` 中所有样式属性都需要放在 `style` 中，`data` 中存放数据属性：

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
    // label 为非样式属性，放在 data 中，可在样式映射函数中访问
    // size 为样式属性，放在 style 中
    { id: 'node1', data: { label: 'node1' }, style: { size: 20 } },
    { id: 'node2', data: { label: 'node2' }, style: { size: 20 } },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
};
```

由于我们重新设计实现了元素，新的元素配置项请参考相应文档进行修改：

- [Node](/manual/element/node/overview)
- [Edge](/manual/element/edge/overview)
- [Combo](/manual/element/combo/overview)

2. 如果要在数据中指定元素类型，可以使用 `type` 属性：

```typescript
{
  nodes: [
    // 指定节点类型为 rect
    { id: 'node1', type: 'rect' },
  ];
}
```

### 配置项

<Badge type="warning">变更</Badge> **fitView / fitCenter / fitViewPadding**

- `fitView` 和 `fitCenter` 配置项已经合并为 `autoFit`
- 若要使用 `fitView`，可以配置为 `autoFit: 'view'`
- 若要使用 `fitCenter`，可以配置为 `autoFit: 'center'`
- 也可以传入对象进行完整配置：

```js
autoFit: {
  type: 'view',
  options: {
    // ...
  }
}
```

- `fitViewPadding` 已变更为 `padding`

<Badge type="error">移除</Badge> **linkCenter**

5.x 的边连接机制会按照如下顺序依次尝试连接到节点/Combo：

1. 连接桩
2. 轮廓
3. 中心

<Badge type="error">移除</Badge> **groupByTypes**

<Badge type="error">移除</Badge> **autoPaint**

请手动调用 `render` 或 `draw` 方法进行绘制。

<Badge type="warning">变更</Badge> **modes**

5.x 已经移除交互模式，你可以通过设置 `behaviors` 来切换当前启用的交互行为。

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

<Badge type="warning">变更</Badge> **defaultNode / defaultEdge / defaultCombo**

元素样式已移至 `[element].style` 中，如 `defaultNode` 变更为 `node.style`：

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

<Badge type="warning">变更</Badge> **nodeStateStyles / edgeStateStyles / comboStateStyle**

元素状态样式已移至 `[element].state` 中，如 `nodeStateStyles` 变更为 `node.stateStyles`：

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

<Badge type="warning">变更</Badge> **animate / animateCfg**

- `animate` 配置项已变更为 `animation`
- `animate` 和 `animateCfg` 已合并为 `animation`

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

<Badge type="warning">变更</Badge> **minZoom / maxZoom**

`minZoom` 和 `maxZoom` 已合并为 `zoomRange`

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

<Badge type="warning">变更</Badge> **renderer**

G6 5.x 支持多层画布，默认使用 `canvas` 渲染。

renderer 不再支持字符串类型，变更为回调函数：

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

<Badge type="error">移除</Badge> **enabledStack / maxStep**

5.x 已移除内置撤销重做功能，相关能力请使用插件实现。

### API

<Badge type="warning">变更</Badge> **data / save / read / changeData**

5.x 提供了全新的数据 API，详见 [数据 API](/api/data)。

- 4.x `data` `changeData` 方法使用 5.x `setData` 替代
- 4.x `save` 方法使用 5.x `getData` 替代
- 4.x `read` 方法使用 5.x `setData` + `render` 替代

<Badge type="warning">变更</Badge> **get / set**

若要访问 Graph options，请使用 `getOptions` 或者 `getXxx` API，例如 `getZoomRange` `getBehaviors` 等。 `set` 同理。

<Badge type="warning">变更</Badge> **getContainer**

暂不支持直接获取容器的 API，但可以通过 `graph.getCanvas().getContainer()` 获取。

> 绝大部分情况下，你都不需要直接操作容器。

<Badge type="error">移除</Badge> **getGroup**

<Badge type="warning">变更</Badge> **getMinZoom / getMaxZoom**

使用 `getZoomRange` 获取。

<Badge type="warning">变更</Badge> **setMinZoom / setMaxZoom**

使用 `setZoomRange` 方法设置。

<Badge type="warning">变更</Badge> **getWidth / getHeight**

使用 `getSize` 获取。

<Badge type="warning">变更</Badge> **changeSize**

使用 `setSize` 设置。

<Badge type="warning">变更</Badge> **zoom**

变更为 `zoomBy`。

<Badge type="warning">变更</Badge> **translate**

变更为 `translateBy`。

<Badge type="warning">变更</Badge> **moveTo**

变更为 `translateTo`。

<Badge type="warning">变更</Badge> **focusItem**

变更为 `focusElement`。

<Badge type="error">移除</Badge> **addItem / updateItem / removeItem**

通过 `addData` / `updateData` / `removeData` 方法操作数据来添加或删除元素。

<Badge type="error">移除</Badge> **refreshItem**

<Badge type="error">移除</Badge> **refreshPositions**

<Badge type="error">移除</Badge> **updateCombo**

<Badge type="error">移除</Badge> **updateCombos**

<Badge type="error">移除</Badge> **updateComboTree**

<Badge type="warning">变更</Badge> **node / edge / combo**

使用 `setNode` / `setEdge` / `setCombo` 方法替代。

<Badge type="warning">变更</Badge> **showItem / hideItem**

使用 `setElementVisibility` 方法替代。

<Badge type="error">移除</Badge> **getNodes / getEdges / getCombos / getComboChildren /getNeighbors /find /findById / findAll /findAllByState**

5.x 不支持直接获取元素实例。

- 若要获取元素数据，使用 `getData` `getNodeData` `getEdgeData` `getComboData` 方法，支持传入元素 id 进行查找。
- 获取子节点数据，使用 `getChildrenData` 方法。
- 获取邻居节点数据，使用 `getNeighborNodesData` 方法。
- 基于状态查找元素数据，使用 `getElementDataByState`。

<Badge type="warning">变更</Badge> **collapseCombo / expandCombo**

使用 `collapseElement` / `expandElement` 方法替代。

<Badge type="error">移除</Badge> **collapseExpandCombo**

<Badge type="error">移除</Badge> **createCombo**

通过 `addData` / `addComboData` 方法添加 Combo。

<Badge type="error">移除</Badge> **uncombo**

通过 `removeData` / `removeComboData` 方法移除 Combo。

<Badge type="warning">变更</Badge> **setItemState**

使用 `setElementState` 方法替代。

<Badge type="error">移除</Badge> **clearItemStates**

- 清除单个元素所有状态：`graph.setElementState(id, [])`
- 清除多个元素所有状态：`graph.setElementState({ id1: [], id2: [] })`

<Badge type="error">移除</Badge> **priorityState**

`setElementState` 时状态数组中靠后的状态优先级更高。

<Badge type="error">移除</Badge> **setMode**

使用 `setBehaviors` 来设置当前交互。

<Badge type="error">移除</Badge> **setCurrentMode**

<Badge type="warning">变更</Badge> **layout**

不支持参数，如需配置布局，请使用 `setLayout`。

<Badge type="warning">变更</Badge> **updateLayout**

变更为 `setLayout`。

<Badge type="error">移除</Badge> **destroyLayout**

<Badge type="warning">变更</Badge> **addBehaviors / removeBehaviors**

使用 `setBehaviors` 替代。

<Badge type="error">移除</Badge> **createHull / getHulls / removeHull / removeHulls**

- 多个 `Hull` 需在 `plugins` 中配置多个 `hull` 插件，如：

```typescript
{
  plugins: ['hull', 'hull'],
};
```

- `Hull` 的获取、更新、移除操作通过 `setPlugins`, `updatePlugin` 实现。

<Badge>暂未提供</Badge> **getNodeDegree**

<Badge>暂未提供</Badge> **getShortestPathMatrix**

<Badge>暂未提供</Badge> **getAdjMatrix**

<Badge type="error">移除</Badge> **pushStack / getUndoStack / getRedoStack / getStackData / clearStack**

所有撤销重做相关 API 请获取到对应插件后调用 API，例：

```typescript
// 'history' 为使用插件时配置的 key
const history = graph.getPluginInstance('history');

history.redo();
```

<Badge type="error">移除</Badge> **positionsAnimate / stopAnimate / isAnimating**

动画相关信息通过事件抛出：

- 动画开始事件：`beforeanimate`
- 动画结束事件：`afteranimate`
- 停止动画：

```typescript
graph.on('beforeanimate', (event) => {
  event.animation.stop();
});
```

<Badge type="warning">变更</Badge> **getPointByClient / getClientByPoint / getPointByCanvas / getCanvasByPoint / getGraphCenterPoint / getViewPortCenterPoint**

G6 5.x 采用了与 4.x 不同的坐标系，详见 [坐标系](/manual/further-reading/coordinate)。

<Badge type="error">移除</Badge> **setTextWaterMarker / setImageWaterMarker**

要使用水印功能，请参考 [水印](/manual/plugin/build-in/watermark)插件。

<Badge type="warning">变更</Badge> **toFullDataURL**

使用 `toDataURL` 替代，指定参数为：`mode: 'overall'`

```typescript
graph.toDataURL({ mode: 'overall' });
```

<Badge type="error">移除</Badge> **downloadFullImage / downloadImage**

仅提供导出为 `DataURL` 的能力，如需下载图片，请参考如下实例代码：

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

<Badge type="error">移除</Badge> **clear**

使用 `setData` + `draw` 清空数据和画布。

### 扩展注册

与 G6 4.x 不同，G6 5.x 使用的统一的扩展注册函数(register)，你可以参考 [注册扩展](/manual/graph/extension#注册扩展) 来注册 G6 扩展。

下列 G6 4.x 的注册函数已经废除：

- registerNode
- registerEdge
- registerCombo
- registerLayout
- registerBehavior

### 事件

与 G6 4.x 相比，G6 5.x 的事件但存下如下差异：

- 移除了 `mouse` 和 `touch` 事件，统一使用 `pointer` 事件
- 生命周期事件名命名格式通常为： `before/after` + `对象/属性` + `操作`，例如：`beforeelementcreate` 表示在创建元素前触发
- 下列事件已被移除：
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
- 下列元素变更事件被移除，但你仍可通过 `beforeelementupdate` 和 `afterelementupdate` 获取：
  - afteritemstatechange
  - afteritemstatesclear
  - afteritemvisibilitychange
  - beforeitemstatechange
  - beforeitemstatesclear
  - beforeitemvisibilitychange
- 下列事件有所变更：
  - graphstatechange 事件变更为 beforeelementstatechange / afterelementstatechange
  - viewportchange 事件变更为 beforetransform / aftertransform

完整的事件列表请参考 [事件](/api/event)。
