---
title: Graph
order: 1
redirect_from:
  - /zh/docs/api
---

Graph 是 G6 图表的载体，所有的 G6 节点实例操作以及事件，行为监听都在 Graph 实例上进行。

Graph 的生命周期为：初始化—>加载数据—>渲染—>更新—>销毁。

## 初始化

### G6.Graph

**参数**

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| container | string | HTMLElement | 图的  DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象。 |
| width | Number | undefined | 指定画布宽度，单位为 'px'。 |
| height | Number | undefined | 指定画布高度，单位为 'px'。 |
| fitView | Boolean | false | 是否开启画布自适应。开启后图自动适配画布大小。 |
| fitViewPadding | Array | Number | `fitView` 为 `true` 时生效。图适应画布时，指定四周的留白。<br />- 可以是一个值, 例如：`fitViewPadding: 20`<br />- 也可以是一个数组，例如：`fitViewPadding: [ 20, 40, 50, 20 ]`<br />当指定一个值时，四边的边距都相等，当指定数组时，数组内数值依次对应 上，右，下，左四边的边距。 |
| fitCenter | Boolean | false | *v3.5.1 后支持。*开启后，图将会被平移，图的中心将对齐到画布中心，但不缩放。优先级低于 fitView |
| groupByTypes | Boolean | true | 各种元素是否在一个分组内，决定节点和边的层级问题，默认情况下所有的节点在一个分组中，所有的边在一个分组中，当这个参数为 false 时，节点和边的层级根据生成的顺序确定。当使用 Combo 时，**必须**将其设置为 `false` |
| autoPaint | Boolean | true | 当图中元素更新，或视口变换时，是否自动重绘。建议在批量操作节点时关闭，以提高性能，完成批量操作后再打开，参见后面的 setAutoPaint() 方法。 |
| modes | Object |  | 设置画布的模式。详情可见  [交互模式 Mode](/zh/docs/manual/middle/states/mode)  文档。 |
| nodeStateStyles | Object | {} | 各个状态下节点的样式，例如 `hover`、`selected`，3.1 版本新增。 |
| edgeStateStyles | Object | {} | 各个状态下边的样式，例如 `hover`、`selected`，3.1 版本新增。 |
| comboStateStyles | Object | {} | 各个状态下 Combo 的样式，例如 `hover`、`selected`，3.5 版本新增。 |
| defaultNode | Object | {} | 默认状态下节点的配置，比如 `type`, `size`, `color`。会被写入的 data 覆盖。 |
| defaultEdge | Object | {} | 默认状态下边的配置，比如 `type`, `size`, `color`。会被写入的 data 覆盖。  |
| defaultCombo | Object | {} | 默认状态下 Combo 的配置，比如 `type`, `color`。会被写入的 data 覆盖。3.5 版本新增。 |
| plugins | Array | [] | 向 graph 注册插件。插件机制请见：[插件](/zh/docs/manual/tutorial/plugins#插件) |
| animate | Boolean | false | 是否启用全局动画。 |
| animateCfg | Object |  | 动画配置项，仅在 `animate` 为 `true` 时有效。关于 `animateCfg` 的更多配置项参见[基础动画教程](/zh/docs/manual/advanced/animation#animatecfg)。 |
| animateCfg.<br />onFrame | Function | null | 回调函数，用于自定义节点运动路径，为空时线性运动。 |
| animateCfg.<br />duration | Number | 500 | 动画时长，单位为毫秒。 |
| animateCfg.<br />easing | string | easeLinear | 动画动效，可参见 d3 ease。 |
| minZoom | Number | 0.2 | 最小缩放比例 |
| maxZoom | Number | 10 | 最大缩放比例 |
| groupType | string | circle | 节点分组类型，支持 circle 和 rect |
| groupStyle | Object |  | groupStyle 用于指定分组的样式，详情参看 [节点分组 Group](/zh/docs/manual/middle/nodeGroup) 教程 |
| layout | Object |  | 布局配置项，使用 type 字段指定使用的布局方式，type 可取以下值：random, radial, mds, circular, fruchterman, force, dagre，各布局详细的配置请参考  [Layout API 文档](/zh/docs/api/layout/Layout) |
| renderer | string | 'canvas' / 'svg' | 渲染方式，该配置项除 V3.3.x 外其他版本均支持。 |
| enabledStack | boolean | false | 是否启用 stack，即是否开启 redo & undo 功能，该配置项 V3.6 及以上版本支持。 |
| maxStep | number | 10 | redo & undo 最大步数, 只有当 enabledStack 为 true 时才起作用，该配置项 V3.6 及以上版本支持。 |

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> G6 3.1 版本中实例化 Graph 时，新增了 `nodeStateStyles` 及  `edgeStateStyles` 两个配置项，删除了 `nodeStyle` 和 `edgeStyle` ，使用 3.1 以下版本的同学，只需要将  `nodeStyle` 改成 `nodeStateStyles` ，将  `edgeStyle` 改成  `edgeStateStyles` ，配置内容保持不变。

**用法**

Graph 的初始化通过 new 进行实例化，实例化时需要传入需要的参数。

```javascript
const graph = new G6.Graph({
  container: '',
  width: 500,
  height: 500,
  modes: {
    default: ['drag-canvas'],
  },
  layout: {
    type: 'radial',
    unitRadius: 50,
    center: [500, 300],
  },
});
```

## 加载

### data(data)

设置图初始化数据。

**参数**

| 名称 | 类型   | 是否必选 | 描述                                                     |
| ---- | ------ | -------- | -------------------------------------------------------- |
| data | Object | true     | 初始化的图数据，是一个包括 nodes 数组和 edges 数组的对象 |

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
    },
    {
      id: 'node2',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// graph 是 Graph 的实例
graph.data(data);
```

## 渲染

### render()

根据提供的数据渲染视图。

**用法**

```javascript
graph.render();
```

### renderCustomGroup(data, groupType)

根据提供的数据渲染组群。

**参数**

| 名称      | 类型   | 是否必选 | 描述                                  |
| --------- | ------ | -------- | ------------------------------------- |
| data      | Object | true     | 渲染图的数据                          |
| groupType | string | true     | group 类型，支持 `'circle'`、`'rect'` |

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      groupId: 'group1',
      label: 'node1',
    },
    {
      id: 'node2',
      groupId: 'group1',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
  groups: [
    {
      id: 'group1',
      title: {
        text: 'Group 1',
        stroke: '#444',
        offsetX: -20,
        offsetY: 30,
      },
    },
  ],
};

// graph 是 Graph 的实例
graph.renderCustomGroup(data, 'circle');
```

### read(data)

接收数据，并进行渲染，read 方法的功能相当于 data 和 render 方法的结合。

**参数**

| 名称 | 类型   | 是否必选 | 描述                                             |
| ---- | ------ | -------- | ------------------------------------------------ |
| data | Object | true     | 初始化的图数据，是一个包括 nodes 和 edges 的对象 |

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
    },
    {
      id: 'node2',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// graph是Graph的实例
graph.read(data);
```

### changeData(data, stack)

更新数据源，根据新的数据重新渲染视图。

**参数**

| 名称 | 类型   | 是否必选 | 描述                                     |
| ---- | ------ | -------- | ---------------------------------------- |
| data | Object | false     | 图数据，是一个包括 nodes 和 edges 的对象。若不指定该参数，则使用当前数据重新渲染 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
    },
    {
      id: 'node2',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

// graph是Graph的实例
graph.changeData(data);
// 若不指定该参数，则使用当前图上的数据重新渲染
graph.changeData();
```

### collapseCombo(combo)
收起指定的 Combo。

**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| combo | string / ICombo | true     | combo ID 或 combo 实例 |

**用法**
```
graph.collapseCombo('combo1')
```

### expandCombo(combo)
展开指定的 Combo。

**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| combo | string / ICombo | true     | combo ID 或 combo 实例 |

**用法**
```
graph.expandCombo('combo1')
```

### collapseExpandCombo(combo)
展开或收缩指定的 Combo。

**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| combo | string / ICombo | true     | combo ID 或 combo 实例 |

**用法**
```
graph.collapseExpandCombo('combo1')
```


### createCombo(combo, elements)
根据已经存在的节点或 combo 创建新的 combo。

**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| combo | string / ComboConfig | true    | combo ID 或 Combo 配置 |
| elements | string[] | true    | 添加到 Combo 中的元素 ID，包括节点和 combo |

**用法**

```
// 第一个参数为 combo ID
graph.createCombo('combo1', ['node1', 'node2', 'combo2'])

// 第一个参数为 combo 配置
graph.createCombo({
  id: 'combo1',
  style: {
    fill: '#f00'
  }
}, ['node1', 'node2', 'combo2'])
```

### uncombo(combo)
拆解 Combo，即拆分组/解组。调用后，combo 本身将被删除，而该分组内部的子元素将会成为该分组父分组（若存在）的子元素。

**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| combo | string / ICombo | true    | 需要被拆解的 Combo item 或 id |

**用法**

```
graph.uncombo('combo1')
```



### collapseGroup(groupId)

收起分组，收起分组后，隐藏分组中的所有节点和边，分组外部与分组内节点有连线的则临时连接到分组上面。

**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| groupId | string | true     | 分组 ID |

**用法**

```javascript
graph.collapseGroup('groupId');
```

### expandGroup(groupId)

展开分组，显示分组中的所有节点和边，恢复收起前的连接情况。

**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| groupId | string | true     | 分组 ID |

**用法**

```javascript
graph.expandGroup('groupId');
```


## 更新

### addItem(type, model, stack)

新增元素（节点，边，或节点分组）。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意: </strong></span>将会直接使用 `model` 对象作为新增元素的数据模型，G6 内部可能会对其增加或修改一些必要的字段。若不希望原始参数被修改，建议在使用深拷贝后的 `model`。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| type | string | true | 元素类型，可选值为 `'node'`、`'edge'` 和 `'group'` |
| model | Object | true | 元素的数据模型，具体内容参见[元素配置项](/zh/docs/api/nodeEdge/itemProperties)。`type: 'group'` 时，参看 [手动创建节点分组文档](/zh/docs/manual/advanced/create-node-group) |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
const model = {
  id: 'node',
  label: 'node',
  address: 'cq',
  x: 200,
  y: 150,
  style: {
    fill: 'blue',
  },
};

graph.addItem('node', model);

// 当 type 为 'group' 时候，model 的数据结构如下：
const model = {
  groupId: 'xxx000999',
  nodes: ['123', '23'],
  type: 'rect',
  zIndex: 0,
  title: {
    text: '名称',
  },
};

graph.addItem('group', model);
```

### add(type, model, stack)

同 addItem(type, model, stack)。

### updateItem(item, model, stack)

更新元素，包括更新数据、样式等。
若图上有 combo，使用该函数更新一个节点位置后，需要调用 [updateCombo(combo)](/zh/docs/api/Graph#updatecombocombo) 以更新相关 combo 的位置。

**参数**

| 名称 | 类型            | 是否必选 | 描述               |
| ---- | --------------- | -------- | ------------------ |
| item | string / Object | true     | 元素 ID 或元素实例 |
| cfg  | Object          | false    | 需要更新的数据模型，具体内容参见[元素配置项](/zh/docs/api/nodeEdge/itemProperties)  |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
const model = {
  id: 'node',
  label: 'node',
  address: 'cq',
  x: 200,
  y: 150,
  style: {
    fill: 'blue',
  },
};

// 通过 ID 查询节点实例
const item = graph.findById('node');
graph.updateItem(item, model);
```

### update(item, model, stack)

同 updateItem(item, model, stack)。


### updateCombos()
根据子元素（子节点与子 combo）的 bbox 更新所有 combos 的绘制，包括 combos 的位置和范围。

**用法**

```javascript
// 更新所有 combos
graph.updateCombos();
```


### updateCombo(combo)
仅更新 combo 及其所有祖先 combo。建议在使用 graph.updateItem 来更新节点位置时，调用该方法以更新节点的祖先 combos。

**参数**

| 名称 | 类型            | 是否必选 | 描述               |
| ---- | --------------- | -------- | ----------------------------------- |
| combo | string / ICombo | true    | Combo ID 或 Combo 实例 |

**用法**

```javascript

// 更新了某个节点的位置
const node1 = graph.findById('node1');
graph.updateItem(node1, {
  x: 100,
  y: 100
});
const comboId = node1.getModel().comboId;

// 更新 node1 所属的 combo 及其所有祖先 combo 的大小和位置
graph.updateCombo(comboId);
```


### updateComboTree(item, parentId)
更新 Combo 结构，例如移动子树等。

**参数**

| 名称 | 类型    | 是否必选 | 描述         |
| ---- | ------- | -------- | ------------ |
| item | string / INode / ICombo  | true    | 需要被更新的 Combo 或 节点 ID |
| parentId | string / undefined | false  | 新的父 combo ID，undefined 代表没有父 combo |

**用法**

```
// 将 combo1 从父 combo 中移出，完成后同原父 combo 平级
graph.updateComboTree('combo1')

// 将 combo1 移动到 Combo2 下面，作为 Combo2 的子元素
graph.updateComboTree('combo1', 'combo2')
```



### removeItem(item, stack)

删除元素，当 item 为 group ID 时候，则删除分组。

**参数**

| 名称 | 类型            | 是否必选 | 描述               |
| ---- | --------------- | -------- | ------------------ |
| item | string / Object | true     | 元素 ID 或元素实例 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('node');
graph.removeItem(item);

// 该操作不会进入到 undo & redo 栈，即 redo & undo 操作会忽略该操作
graph.removeItem(item, false)
```

### remove(item, stack)

同 removeItem(item, stack)。

### refresh()

当源数据中**现有**节点/边/ Combo 的数据项发生配置的变更时，根据新数据刷新视图。

注意：节点/边/ Combo 数据的增删需要使用 [graph.addItem](./Graph#additemtype-model) / [graph.removeItem](./Graph#removeitemitem) 或 [graph.changeData](./Graph#changedatadata)。

该方法无参数。

**用法**

```javascript
graph.refresh();
```

### refreshItem(item)

刷新指定元素。

**参数**

| 名称 | 类型            | 是否必选 | 描述               |
| ---- | --------------- | -------- | ------------------ |
| item | string / Object | true     | 元素 ID 或元素实例 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('node');
graph.refreshItem(item);
```

### refreshPositions()

当节点位置发生变化时，刷新所有节点位置，并重计算边的位置。

该方法无参数。

**用法**

```javascript
graph.refreshPositions();
```

### paint()

仅重新绘制画布。当设置了元素样式或状态后，通过调用 `paint()` 方法，让修改生效。

该方法无参数。

**用法**

```javascript
const item = e.item;
const graph = this.graph;

const autoPaint = graph.get('autoPaint');
graph.setAutoPaint(false);

graph.setItemState(item, 'selected', true);

graph.paint();
graph.setAutoPaint(autoPaint);
```

### setAutoPaint(auto)

设置是否在更新/删除后自动重绘，一般搭配 `paint()` 方法使用。

**参数**

| 名称 | 类型    | 是否必选 | 描述         |
| ---- | ------- | -------- | ------------ |
| auto | Boolean | true     | 是否自动重绘 |

**用法**

```javascript
const item = e.item;
const graph = this.graph;

const autoPaint = graph.get('autoPaint');
graph.setAutoPaint(false);

graph.setItemState(item, 'selected', true);

graph.paint();
graph.setAutoPaint(autoPaint);
```

## 布局

G6 3.1 内置了丰富的布局。关于如何使用 G6 中内置的布局，请参考  [Layout API](/zh/docs/api/layout/Layout)。

### layout()

重新以当前配置的属性进行一次布局。

**用法**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'force',
  },
  modes: {
    default: ['drag-node'],
  },
});

graph.data({
  nodes: data.nodes,
  edges: data.edges.map((edge, i) => {
    edge.id = 'edge' + i;
    return Object.assign({}, edge);
  }),
});

graph.render();

function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

graph.on('node:dragstart', e => {
  // 拖动节点时重新布局
  graph.layout();
  refreshDragedNodePosition(e);
});

graph.on('node:drag', e => {
  refreshDragedNodePosition(e);
});

graph.on('node:dragend', e => {
  e.item.get('model').fx = null;
  e.item.get('model').fy = null;
});
```

### updateLayout(cfg)

更新布局配置项。

1. 如果参数 `cfg` 中含有 `type` 字段，`type` 字段类型为 String，且与现有布局方法不同，则更换布局；
1. 如果参数 `cfg` 中不包含 `type` 字段，则保持原有布局，仅更新布局配置项。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| cfg  | Object | true     | 新布局配置项 |

**用法**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'circular',
    center: [500, 300],
  },
  animate: true,
});
graph.data(data);
graph.render();

// 实例化时通过 layout 指定布局，在合适的时候通过 updateLayout 更新布局配置
graph.updateLayout({
  radius: 200,
  startAngle: Math.PI / 4,
  endAngle: Math.PI,
  divisions: 5,
  ordering: 'degree',
});
```

## 销毁

### clear()

清除画布元素。该方法一般用于清空数据源，重新设置数据源，重新 render 的场景，此时所有的图形都会被清除。

该方法无参数。

**用法**

```javascript
graph.clear();
```

### destroy()

销毁画布。

该方法无参数。

**用法**

```javascript
graph.destroy();
```

## 状态

### showItem(item, stack)

显示指定的元素。若 item 为节点，则相关边也会随之显示。而 [item.show()](/zh/docs/api/nodeEdge/Item#show) 则将只显示自身。

**参数**

| 名称 | 类型            | 是否必选 | 描述               |
| ---- | --------------- | -------- | ------------------ |
| item | string / Object | true     | 元素 ID 或元素实例 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('nodeId');
graph.showItem(item);

// 等价于
graph.showItem('nodeId');
```

### hideItem(item, stack)

隐藏指定元素。若 item 为节点，则相关边也会随之隐藏。而 [item.hide()](/zh/docs/api/nodeEdge/Item#hide) 则将只隐藏自身。

**参数**

| 名称 | 类型            | 是否必选 | 描述               |
| ---- | --------------- | -------- | ------------------ |
| item | string / Object | true     | 元素 ID 或元素实例 |
| stack | boolean | false | 操作是否入 undo & redo 栈，当实例化 Graph 时设置 enableStack 为 true 时，默认情况下会自动入栈，入栈以后，就支持 undo & redo 操作，如果不需要，则设置该参数为 false 即可 |

**用法**

```javascript
// 通过 ID 查询节点实例
const item = graph.findById('nodeId');
graph.hideItem(item);

// 等价于
graph.hideItem('nodeId');
```

### setItemState(item, state, value)

设置元素状态。
支持单个状态多值的情况，详情参考 [G6 状态管理最佳实践](/zh/docs/manual/middle/states/state-new)。

该方法在执行过程中会触发 `beforitemstatechange`，`afteritemstatechange` 事件。

**参数**

| 名称    | 类型            | 是否必选 | 描述                                                 |
| ------- | --------------- | -------- | ----------- |
| item    | string / Item | true     | 元素 ID 或元素实例 |
| state   | string          | true     | 状态值，支持自定义，如 selected、hover、actived 等。 |
| value | Boolean / string   | true     | 是否启用状态 |

**用法**

```javascript
// 布尔状态 'selected'
graph.setItemState('node1', 'selected', true);

// 多值状态 'body'
graph.setItemState('node1', 'body', 'health');
graph.setItemState('node2', 'body', 'ill');
```

### clearItemStates(item, states)

清除元素状态，可以一次性清除多个状态。

**参数**

| 名称   | 类型            | 是否必选 | 描述               |
| ------ | --------------- | -------- | ------------------ |
| item   | string / Object | true     | 元素 ID 或元素实例 |
| states | string / Array / null  |   false   | 取值可以是单个状态值，也可以是状态值数组 |

**用法**

```javascript
// 清除单个状态
graph.clearItemStates(node, 'a');

// 清除多个状态
graph.clearItemStates(node, ['a', 'b']);

// 清除所有
graph.clearItemStates(node);
```

### node(nodeFn)

设置各个节点样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>提示:</strong></span> 该方法必须**在 render 之前调用**，否则不起作用。

**参数**

| 名称   | 类型     | 是否必选 | 描述             |
| ------ | -------- | -------- | ---------------- |
| nodeFn | Function | true     | 返回每个节点的配置 |

**用法**

```javascript
graph.node(node => {
  return {
    id: node.id,
    type: 'rect',
    style: {
      fill: 'blue',
    },
  };
});

graph.data(data);
graph.render();
```

### edge(edgeFn)

设置各个边样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>提示:</strong></span> 该方法必须**在 render 之前调用**，否则不起作用。

**参数**

| 名称   | 类型     | 是否必选 | 描述             |
| ------ | -------- | -------- | ---------------- |
| edgeFn | Function | true     | 返回每条边的配置 |

**用法**

```javascript
graph.edge(edge => {
  return {
    id: edge.id,
    type: 'cubic-horizontal',
    style: {
      stroke: 'green',
    },
  };
});

graph.data(data);
graph.render();
```

### combo(comboFn)

设置各个 combo 样式及其他配置，以及在各个状态下节点的 KeyShape 的样式。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>提示:</strong></span> 该方法必须**在 render 之前调用**，否则不起作用。

**参数**

| 名称   | 类型     | 是否必选 | 描述             |
| ------ | -------- | -------- | ---------------- |
| comboFn | Function | true     | 返回每个 combo 的配置 |

**用法**

```javascript
graph.combo(combo => {
  return {
    id: combo.id,
    type: 'rect',
    style: {
      stroke: 'green',
    },
  };
});

graph.data(data);
graph.render();
```

## 交互

### addBehaviors(behaviors, modes)

新增行为，将单个或多个行为添加到单个或多个模式中。

**参数**

| 名称      | 类型           | 是否必选 | 描述             |
| --------- | -------------- | -------- | ---------------- |
| behaviors | string / Array | true     | 添加的行为的名称 |
| modes     | string / Array | true     | 模式的名称       |

**用法**

```javascript
// 将单个 Behavior 添加到单个模式（默认的 default 模式）中
graph.addBehaviors('click-select', 'default');

// 将多个 Behavior 添加到单个模式（默认的 default 模式）中
graph.addBehaviors(['brush-select', 'click-select'], 'default');

// 将单个 Behavior 添加到多个模式中
graph.addBehaviors('brush-select', ['default', 'select']);

// 将多个 Behavior 添加到多个模式中
graph.addBehaviors(['brush-select', 'click-select'], ['default', 'select']);
```

### removeBehaviors(behaviors, modes)

移除行为，将单个或多个行为从单个或多个模式中去除。

**参数**

| 名称      | 类型           | 是否必选 | 描述             |
| --------- | -------------- | -------- | ---------------- |
| behaviors | string / Array | true     | 删除的行为的名称 |
| modes     | string / Array | true     | 模式的名称       |

**用法**

```javascript
// 从单个模式中移除单个 Behavior
graph.removeBehaviors('click-select', 'default');

// 从单个模式中移除多个 Behavior
graph.removeBehaviors(['brush-select', 'click-select'], 'default');

// 从多个模式中移除单个 Behavior
graph.removeBehaviors('brush-select', ['default', 'select']);

// 从多个模式中移除多个 Behavior
graph.removeBehaviors(['brush-select', 'click-select'], ['default', 'select']);
```

### setMode(mode)

切换图行为模式。主要用于不同模式下的行为切换，如从编辑模式下切换到只读模式。

**参数**

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| mode | string | true     | 模式的名称 |

**用法**

```javascript
const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    modes: {
      default: [...],
      custom: [...]
    }
})

graph.setMode('custom')
```

### getCurrentMode()

获取当前的行为模式。

该方法无参数。

**返回值**

- 返回值类型：String；
- 返回值表示当前的行为模式。

**用法**

```javascript
// 返回值 mode 表示当前的行为模式
const mode = graph.getCurrentMode();
```


### on(eventName, handler)

为图绑定事件监听。

**参数**

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| eventName | string | true     | 事件名，可选事件名参见 [Event](/zh/docs/api/Event) |
| handler | Function | true     | 监听函数 |

这里对 `handler` 的参数 `evt` 中 `item` 和 `target` 参数进行解释：

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| item | string | true     | 被操作的 item |
| target | Function | true     | 被操作的具体[图形](/zh/docs/manual/middle/elements/shape-keyshape) |



**用法**

```javascript
// 为图上的所有节点绑定点击监听
graph.on('node:click', evt => {
  const item = evt.item; // 被操作的节点 item
  const target = evt.target; // 被操作的具体图形
  // ...
});

// 为画布绑定点击监听
graph.on('click', evt => {
  // ...
});
```



### off(eventName, handler)

为图解除指定的事件监听。

**参数**

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| eventName | string | true     | 事件名，可选事件名参见 [Event](/zh/docs/api/Event) |
| handler | Function | true     | 监听函数 |

这里对 `handler` 的参数 `evt` 中 `item` 和 `target` 同 [`graph.on(eventName, handler)`](#oneventname-handler)。该 `handler` 必须与绑定该事件的 `handler` 是同一对象。



**用法**

```javascript

// 监听函数
const fn = evt => {
  const item = evt.item; // 被操作的节点 item
  const target = evt.target; // 被操作的具体图形
  // ...
}
// 为图上的所有节点绑定点击监听
graph.on('node:click', fn);

// 解除上面的点击监听事件，注意 fn 必须是同一个对象
graph.off('node:click', fn);
```



### off(eventName)

为图解除某事件的所有监听。

**参数**

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| eventName | string | true     | 事件名，可选事件名参见 [Event](/zh/docs/api/Event) |



**用法**

```javascript

// 监听函数
const fn1 = evt => {
  const item = evt.item; // 被操作的节点 item
  const target = evt.target; // 被操作的具体图形
  // ...
}
const fn2 = evt => {
  // ...
}
// 为图上的所有节点绑定点击监听
graph.on('node:click', fn1);
graph.on('node:click', fn2);

// 解除上面的所有节点点击监听事件
graph.off('node:click');
```


### off()

为图解除所有监听。该函数无参数。


**用法**

```javascript

// 监听函数
const fn1 = evt => {
  // ...
}
const fn2 = evt => {
  // ...
}
// 为图上的所有节点绑定点击监听
graph.on('node:mouseenter', fn1);
graph.on('afteranimate', fn2);

// 解除图上所有监听事件
graph.off();
```


### getZoom()

获取当前视口的缩放比例。

该方法无参数。

**返回值**

- 返回值类型：Number；
- 返回值表示当前视口的缩放比例， 默认值为 `1`。

**用法**

```javascript
// 返回值zoom表示当前视口的缩放比例
const zoom = graph.getZoom();
```

### zoom(ratio, center)

改变视口的缩放比例，在当前画布比例下缩放，是相对比例。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| ratio | Number | true | 缩放比例 |
| center | Object | false | 以 `center` 的 `x`、`y` 坐标为中心缩放，如果省略了 `center` 参数，则以元素当前位置为中心缩放 |

**用法**

```javascript
// 以 (100, 100) 为中心点，放大3倍
graph.zoom(3, { x: 100, y: 100 });

// 以当前元素位置为中心，缩小到 0.5
graph.zoom(0.5);
```

### zoomTo(toRatio, center)

缩放视窗窗口到一个固定比例。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| toRatio | Number | true | 固定比例值 |
| center | Object | false | 以 `center` 的 `x`、`y` 坐标为中心缩放，如果省略了 `center` 参数，则以元素当前位置为中心缩放 |

**用法**

```javascript
// 以 (100, 100) 为中心点，放大3倍
graph.zoomTo(3, { x: 100, y: 100 });

// 以当前元素位置为中心，缩小到 0.5
graph.zoomTo(0.5);
```

### focusItem(item, animate, animateCfg)

移动图，使得 item 对齐到视口中心，该方法可用于做搜索后的缓动动画。

**参数**

| 名称 | 类型            | 是否必选 | 描述               |
| ---- | --------------- | -------- | ------------------ |
| item | string / Object | true     | 元素 ID 或元素实例 |
| animate | boolean | false     | 是否带有动画。若未配置，则跟随 graph 的 `animate` 参数 |
| animateCfg | Object | false     | 若带有动画，可配置动画，参见[基础动画教程](/zh/docs/manual/advanced/animation#animatecfg)。若未配置，则跟随 graph 的 `animateCfg` 参数 |

**用法**

```javascript
graph.focusItem(item);

// 动画地移动
graph.focusItem(item, true);

// 动画地移动，并配置动画
graph.focusItem(item, true, {
  easing: 'easeCubic',
  duration: 400
});
```

### changeSize(width, height)

改变画布大小。

**参数**

| 名称   | 类型   | 是否必选 | 描述     |
| ------ | ------ | -------- | -------- |
| width  | Number | true     | 画布宽度 |
| height | Number | true     | 画布高度 |

**用法**

```javascript
graph.changeSize(600, 350);
```

### translate(dx, dy)

采用**相对位移**来平移画布。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| dx   | Number | true     | 水平方向位移 |
| dy   | Number | true     | 垂直方向位移 |

**用法**

```javascript
graph.translate(100, 100);
```

### moveTo(x, y)

采用**绝对位移**将画布移动到指定坐标。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| x    | Number | true     | 水平方向坐标 |
| y    | Number | true     | 垂直方向坐标 |

**用法**

```javascript
graph.moveTo(200, 300);
```

### fitView(padding)

让画布内容适应视口。

**参数**

| 名称    | 类型           | 是否必选 | 描述                                          |
| ------- | -------------- | -------- | --------------------------------------------- |
| padding | Number / Array | false    | [top, right, bottom, left] 四个方向上的间距值 |

**用法**

```javascript
// padding 只设置为一个值，则表示 top = right = bottom = left = 20
graph.fitView(20);

// 等价于 graph.fitView(20)
graph.fitView([20]);

// padding 设置为数组，只传 2 个值，则 top = bottom = 20, right = left = 10
graph.fitView([20, 10]);

// padding 设置为数组，四个方向值都指定
graph.fitView([20, 10, 20, 15]);
```

### fitCenter()

*v3.5.1 后支持。*平移图到中心将对齐到画布中心，但不缩放。优先级低于 fitView。

**用法**

```javascript
// 在渲染和动画完成后调用
graph.fitCenter();
```


## 查找

### find(type, fn)

根据具体规则查找单个元素。

**参数**

| 名称 | 类型     | 是否必选 | 描述                                  |
| ---- | -------- | -------- | ------------------------------------- |
| type | string   | true     | 元素类型，可选值为 `'node'`、`'edge'` |
| fn   | Function | true     | 查找的规则                            |

**返回值**

- 返回值类型：Object；
- 如果有符合规则的元素实例，则返回第一个匹配的元素实例，否则返回 `undefined` 。

**用法**

```javascript
const findNode = graph.find('node', node => {
  return node.get('model').x === 100;
});
```

### findById(id)

根据 ID，查询对应的元素实例。

**参数**

| 名称 | 类型   | 是否必选 | 描述    |
| ---- | ------ | -------- | ------- |
| id   | string | true     | 元素 ID |

**返回值**

- 返回值类型：Object；
- 如果有符合规则的元素实例，则返回该元素实例，否则返回 `undefined`。

**用法**

```javascript
const node = graph.findById('node');
```

### findAll(type, fn)

查询所有满足规则的元素。

**参数**

| 名称 | 类型     | 是否必选 | 描述                                  |
| ---- | -------- | -------- | ------------------------------------- |
| type | string   | true     | 元素类型，可选值为 `'node'`、`'edge'` |
| fn   | Function | true     | 查找的规则                            |

**返回值**

- 返回值类型：Array；
- 如果有符合规则的元素实例，则返回所有元素实例，否则返回 `undefined`。

**用法**

```javascript
const nodes = graph.findAll('node', node => {
  return node.get('model').x;
});
```

### findAllByState(type, state)

查找所有处于指定状态的元素。

**参数**

| 名称  | 类型   | 是否必选 | 描述                                  |
| ----- | ------ | -------- | ------------------------------------- |
| type  | string | true     | 元素类型，可选值为 `'node'`、`'edge'` |
| state | string | true     | 状态名称                              |

**返回值**

- 返回值类型：Array；
- 返回所有指定状态的元素实例。

**用法**

```javascript
// 查询所有选中的元素
const nodes = graph.findAllByState('node', 'selected');
```

## 数据

### save()

获取图数据。

该方法无参数。

**返回值**

- 返回值类型：Object；
- 返回值包括所有节点和边，数据结构如下下所示：

```javascript
{
	nodes: [],
  edges: [],
  groups: [],
}
```

**用法**

```javascript
graph.save();
```

### getNodes()

获取图中所有节点的实例。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 这里返回的是节点的实例，而不是节点的数据项。

**返回值**

- 返回值类型：Array；
- 返回值表示图中所有节点的实例。

**用法**

```javascript
const nodes = graph.getNodes();
```

### getEdges()

获取图中所有边的实例。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 这里返回的是边的实例，而不是边的数据项。

**返回值**

- 返回值类型：Array；
- 返回值表示图中所有边的实例。

**用法**

```javascript
const edges = graph.getEdges();
```

### getCombos()
获取当前图中所有 combo 的实例。

**返回值**

- 返回值类型：Array；
- 返回值表示图中所有 combo 的实例。

**用法**

```javascript
const combos = graph.getCombos();
```


### getComboChildren(combo)
获取指定 combo 中所有的子节点及子 combo。

**参数**

| 名称    | 类型   | 是否必选 | 描述        |
| ------- | ------ | -------- | ----------- |
| combo | string / ICombo | true    | Combo ID 或 combo 实例 |

**返回值**

- 返回值类型：Object，格式如下
```javascript
{
    nodes: INode[],
    edges: ICombo[]
}
```
- 返回指定 combo 中的子元素（子节点及子 combo）。

**用法**

```
const elements: { 
  nodes: INode[], 
  combos: ICombo[] 
} = graph.getComboChildren('combo1')
```

## 坐标转换

这部分主要是说明视口坐标、Canvas 坐标和页面坐标之前的相互转换。其中视口坐标和 Canvas 坐标的示意图如下所示。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*loahSq940hMAAAAAAAAAAABkARQnAQ' width=565 alt='img'/>

### getPointByClient(clientX, clientY)

将屏幕/页面坐标转换为视口坐标。

**参数**

| 名称    | 类型   | 是否必选 | 描述        |
| ------- | ------ | -------- | ----------- |
| clientX | Number | true     | 屏幕 x 坐标 |
| clientY | Number | true     | 屏幕 y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示视口的 x 、y 坐标。

**用法**

```javascript
const point = graph.getPointByClient(e.clientX, e.clientY);
console.log('视口 x/y 坐标分别为:', point.x, point.y);
```

### getClientByPoint(x, y)

将视口坐标转换为屏幕/页面坐标。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| x    | Number | true     | 视口 x 坐标  |
| y    | Number | true     | 视口  y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：`x` 和 `y` 属性，分别表示屏幕/页面的 x、y 坐标。

**用法**

```javascript
const point = graph.getClientByPoint(100, 200);
console.log('屏幕/页面x/y坐标分别为:', point.x, point.y);
```

### getPointByCanvas(canvasX, canvasY)

将 Canvas 画布坐标转换为视口坐标。

**参数**

| 名称    | 类型   | 是否必选 | 描述        |
| ------- | ------ | -------- | ----------- |
| canvasX | Number | true     | 画布 x 坐标 |
| canvasY | Number | true     | 画布 y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示视口的 x、y 坐标。

**用法**

```javascript
const point = graph.getPointByCanvas(100, 200);
console.log('视口x/y坐标分别为:', point.x, point.y);
```

### getCanvasByPoint(x, y)

将视口坐标转换为 Canvas 画布坐标。

**参数**

| 名称 | 类型   | 是否必选 | 描述         |
| ---- | ------ | -------- | ------------ |
| x    | Number | true     | 视口 x 坐标  |
| y    | Number | true     | 视口  y 坐标 |

**返回值**

- 返回值类型：Object；
- 包含的属性：x 和 y 属性，分别表示 Canvas 画布的 x、y 坐标。

**用法**

```javascript
const point = graph.getCanvasByPoint(100, 200);
console.log('Canvas画布的x/y坐标分别为:', point.x, point.y);
```

## 动画

### positionsAnimate()

根据当前数据中的节点位置，动画更新节点位置。将会使用 graph 上的 `animateCfg` 配置项作为动画行为的依据。

### stopAnimate()

停止画布上的所有动画。

**用法**

```javascript
graph.stopAnimate();
```

### isAnimating()

判断当前是否有正在执行的动画。


## 计算

### getNodeDegree(node, degreeType)

获取节点的出度、入度、总度数，或同时获得以上三种。

**参数**

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| node | string / INode  | true     | 节点 ID 或实例 |
| degreeType | `'in'` \ `'out'` \ `'total'` \ `'all'` | false     | 获取度数的类型。设置为 `'in'` 将返回入度；`'out'` 将返回出度；`'total'` 将返回总度数；`'all'` 将返回一个含有三种度数的对象：`{ inDegree, outDegree, degree}`；若不指定，将返回总度数 |


**用法**

```javascript
graph.getNodeDegree('node1', 'in');
```


## 导出

### downloadFullImage(name, type, imageConfig)

将画布上的元素导出为图片。

**参数**

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| name | String | false     | 图片的名称，不指定则为 'graph' |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false     | 图片的类型。图的 `renderer` 为默认的 `'canvas'` 时生效，图的 `renderer` 为 `'svg'` 时将导出 svg 文件 |
| imageConfig | Object | false     | 图片的配置项，可选，具体字段见下方 |

其中，imageConfig 为导出图片的配置参数：

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| backgroundColor | String | false     | 图片的背景色，可选，不传值时将导出透明背景的图片 |
| padding | Number / Number[] | false     | 导出图片的上左下右 padding 值。当 `padding` 为 number 类型时，四周 `padding` 相等 |

**用法**

```javascript
graph.downloadFullImage('tree-graph', {
  backgroundColor: '#ddd',
  padding: [30, 15, 15, 15]
});
```


### downloadImage(name, type, backgroundColor)

将画布上的元素导出为图片。

**参数**

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| name | String | false     | 图片的名称，不指定则为 'graph' |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false     | 图片的类型。图的 `renderer` 为默认的 `'canvas'` 时生效，图的 `renderer` 为 `'svg'` 时将导出 svg 文件 |
| backgroundColor | String | false     | 图片的背景色，可选，不传值时将导出透明背景的图片 |

**用法**

```javascript
graph.downloadImage();
```

### toFullDataURL(callback, type, imageConfig)

将画布上元素生成为图片的 URL。

**参数**

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| callback | Function | true | 异步生成 dataUrl 完成后的回调函数，在这里处理生成的 dataUrl 字符串 |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false     | 图片的类型。图的 `renderer` 为默认的 `'canvas'` 时生效，图的 `renderer` 为 `'svg'` 时将导出 svg 文件 |
| imageConfig | Object | false     | 图片的配置项，可选，具体字段见下方 |


其中，imageConfig 为导出图片的配置参数：

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| backgroundColor | String | false     | 图片的背景色，可选，不传值时将导出透明背景的图片 |
| padding | Number / Number[] | false     | 导出图片的上左下右 padding 值。当 `padding` 为 number 类型时，四周 `padding` 相等 |


无返回值，生成的结果请在 callback 中处理。如下示例：


**用法**

```javascript
graph.toFullDataUrl(
  // 第一个参数为 callback，必须
  (res) => {
    // ... something
    console.log(res); // 打印出结果
  },
  // 后两个参数不是必须
  'image/jpeg',
  imageConfig: {
    backgroundColor: '#fff',
    padding: 10
  }

)
```


### toDataURL(type, backgroundColor)

将画布上元素生成为图片的 URL。

**参数**

| 名称 | 类型   | 是否必选 | 描述       |
| ---- | ------ | -------- | ---------- |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false     | 图片的类型。图的 `renderer` 为默认的 `'canvas'` 时生效，图的 `renderer` 为 `'svg'` 时将导出 svg 文件 |
| backgroundColor | String | false     | 图片的背景色，可选，不传值时将导出透明背景的图片 |

**返回值**

- 返回值类型：String；
- 返回值表示生成的图片的 URL。

**用法**

```javascript
const dataURL = graph.toDataURL();
```


## 其他

### addPlugin(plugin)

添加指定的插件。

**参数**

| 名称   | 类型   | 是否必选 | 描述     |
| ------ | ------ | -------- | -------- |
| plugin | Object | true     | 插件实例 |

**用法**

```javascript
import { Minimap } from '@antv/g6';
const miniMap = new Minimap({
  size: [200, 100],
  className: 'minimap'
})

graph.addPlugin(miniMap);
```

### removePlugin(plugin)

移除指定的插件。

**参数**

| 名称   | 类型   | 是否必选 | 描述     |
| ------ | ------ | -------- | -------- |
| plugin | Object | true     | 插件实例 |

**用法**

```javascript
// 使用 removePlugin 删除通过 addPlugin 添加的实例
graph.removePlugin(miniMap);
```

### get(key)

根据 key 获取属性值。

**参数**

| 名称 | 类型   | 是否必选 | 描述     |
| ---- | ------ | -------- | -------- |
| key  | string | true     | 属性的键 |

**用法**

```javascript
// 获取 group
const group = graph.get('group');

// 获取 canvas 实例
const canvas = graph.get('canvas');

// 获取 autoPaint 值
const autoPaint = graph.get('autoPaint');
```

### set(key, val)

设置属性值。

**参数**

| 名称 | 类型                    | 是否必选 | 描述     |
| ---- | ----------------------- | -------- | -------- |
| key  | string                  | true     | 属性的键 |
| val  | string / Object / Array | true     | 属性的值 |

**用法**

```javascript
// 设置 capture 值为 false
graph.set('capture', false);

// 设置 customGroup 值为 group
graph.set('customGroup', group);

// 设置 nodeIdList 值为数组
graph.set('nodeIdList', [1, 3, 5]);
```


### getContainer()

获取 Graph 的 DOM 容器。

**参数**

无参数

**用法**

```javascript
graph.getContainer()
```


### getGroup()

获取 Graph 根[图形分组](/zh/docs/manual/advanced/keyconcept/graphics-group)。

**参数**

无参数

**用法**

```javascript
graph.getGroup()
```


### getMinZoom()

获取 graph 当前允许的最小缩放比例。

**参数**

无参数

**用法**

```javascript
graph.getMinZoom()
```


### setMinZoom(ratio)

设置 graph 当前允许的最小缩放比例。

**参数**

| 名称 | 类型                    | 是否必选 | 描述     |
| ---- | ----------------------- | -------- | -------- |
| ratio  | number                  | true     | 最小缩放比例值 |


**用法**

```javascript
graph.setMinZoom(0.001)
```



### getMaxZoom()

获取 graph 当前允许的最大缩放比例。

**参数**

无参数

**用法**

```javascript
graph.getMaxZoom()
```


### setMaxZoom(ratio)

设置 graph 当前允许的最大缩放比例。

**参数**

| 名称 | 类型                    | 是否必选 | 描述     |
| ---- | ----------------------- | -------- | -------- |
| ratio  | number                  | true     | 最大缩放比例值 |


**用法**

```javascript
graph.setMaxZoom(1000)
```


### getWidth()

获取 graph 当前的宽度。

**参数**

无参数

**用法**

```javascript
graph.getWidth()
```



### getHeight()

获取 graph 当前的高度。

**参数**

无参数

**用法**

```javascript
graph.getHeight()
```
