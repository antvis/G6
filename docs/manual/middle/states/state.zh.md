---
title: 状态 State
order: 6
---

## 什么是 state

G6 中的 **state**，指的是节点或边的状态，包括**交互状态**和**业务状态**两种。

在 G6 中，配置交互状态和业务状态的方式是相同的。对于部分只使用 G6 来完成某个需求的开发，而不想深入理解 G6 的用户，其实不用区分交互状态和业务状态的区别，使用相同的方式定义状态，完全没有理解成本。

### 交互状态

交互状态是与具体的交互动作密切相关的，如用户使用鼠标选中某个节点则该节点被选中，hover 到某条边则该边被高亮等。

G6 中默认处理的是交互状态。

### 业务状态

指根据用户业务需求自定义的状态。业务状态是与交互动作无关的，与具体业务逻辑强相关的，也可理解为是强数据驱动的。如某个任务的执行状态、某条申请的审批状态等，不同的数据值代表不同的业务状态。业务状态与用户交互动作无关，但在 G6 中的处理方式同交互状态一致。

## 何时使用 state

判断是否该使用 state 的原则很简单，从交互和业务两个层面来看：

- 某个交互动作要改变节点或边的样式及属性；
- 呈现给用户的内容会根据数据改变（如 1 代表成功，0 代表失败）。

满足上述条件其一，则应该使用 state。

## 设置 state

**使用 `graph.setItemState(item, stateName, stateValue)`  来使定义的状态生效**。

### 状态的类型

状态可以是二值的，也可以是多值的（G6 3.4 后支持）。

#### 二值状态

通过 `graph.setItemState(item, stateName, stateValue)` 设置状态的值。

| 参数名     | 类型     | 描述                                            |
| ---------- | -------- | ----------------------------------------------- |
| item       | Number   | 需要被设置状态的节点/边实例                     |
| stateName  | String   | 状态名称，可以是任意字符串                      |
| stateValue | Booelean | true 代表该状态是被激活，false 代表该状态被灭活 |

示例：

```javascript
graph.setItemState(item, 'stateName', true);
```

#### 多值状态

多值状态在 G6 3.4 后支持。通过 `graph.setItemState(item, stateName, stateValue)` 设置状态的值。

| 参数名     | 类型   | 描述                        |
| ---------- | ------ | --------------------------- |
| item       | Number | 需要被设置状态的节点/边实例 |
| stateName  | String | 状态名称，可以是任意字符串  |
| stateValue | String | 状态的值，可以是任意字符串  |

示例：

```javascript
graph.setItemState(item, 'stateName', 'stateValue');
```

### 调用的时机

该函数可以在监听函数 `graph.on` 中被调用，也可以在自定义 Behavior 中调用，或在其他任意地方用于响应交互/业务的变化。

#### graph.on

在回调函数中使定义的交互状态 hover 生效。

```javascript
graph.on('node:mouseenter', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'hover', true);
});

graph.on('node:mouseleave', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'hover', false);
});
```

#### Behavior

在自定义 Behavior 中使定义的交互状态 selected 生效。

```javascript
G6.registerBehavior('nodeClick', {
  getEvents() {
    return {
      'node:click': 'onClick',
    };
  },
  onClick(e) {
    e.preventDefault();
    if (!this.shouldUpdate.call(this, e)) {
      return;
    }
    const { item } = e;
    const graph = this.graph;
    graph.setItemState(item, 'selected', true);
  },
});
```

## 配置 state 样式

上小节使用 `graph.setItemState` 使某些状态在图元素（节点/边）上被激活/灭活，仅仅是为该元素做了某些状态的标识。为了将这些状态反应到终端用户所见的视觉空间中，我们需要为不同的状态设置不同的图元素样式，以响应该图元素状态的变化。

在 G6 中，有两种方式配置不同状态的样式：

- 在实例化 Graph 时，通过 `nodeStateStyles` 和 `edgeStateStyles` 对象定义；
- 在节点/边数据中，在 `stateStyles` 对象中定义状态；
- 在自定义节点/边时，在 options 配置项的 `stateStyles` 对象中定义状态。

可为二值/多值状态设置 keyShape 样式以及其他子图形的样式。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意: </strong></span> 多值状态和除 keyShape 以外的子图形状态样式设置在 V3.4 后支持。

`nodeStateStyles` 、 `edgeStateStyles` 、 `stateStyles` 对象的格式如下：

```javascript
{
  // 二值状态 hover 为 true 时的样式
  hover: {
    fill: '#d3adf7',
    // name 为 shape-name1 的子图形在该状态值下的样式
    'node-label': {
      fontSize: 15
    },
  },
  // 二值状态 running 为 true 时的样式
  running: {
    stroke: 'steelblue',
  },
  // 多值状态与子图形样式的设置在 G6 3.4 后支持
  // 多值状态 bodyState 为 health 时的样式
  'bodyState:health': {
    // keyShape 该状态值下的样式
    fill: 'green',
    // ... 其他样式
    // name 为 shape-name1 的子图形在该状态值下的样式
    'shape-name1': {
      stroke: '#ccc'
      // ... 其他样式
    },
    // name 为 shape-name2 的子图形在该状态值下的样式
    'shape-name2': {
      fill: 'red'
      // ... 其他样式
    }
  },
  // 多值状态 bodyState 为 suspect 时的样式
  'bodyState:suspect': {
    // ...
  },
  // 多值状态 bodyState 为 ill 时的样式
  'bodyState:ill': {
    // ...
  }
  // ... 其他状态
}
```

### 实例化 Graph 时定义 state 样式

使用这种方式可以为图上的所有节点/边配置全局统一的 state 样式。

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    type: 'diamond',
    style: {
      // 默认状态样式
      fill: 'blue',
      // ... 其他样式
    },
  },
  nodeStateStyles: {
    // ...见上方例子
  },
  defaultEdge: {
    // ...
  },
  edgeStateStyles: {
    // ...
  },
});
```

上面的实例代码中，我们在实例化 Graph 时候，通过 `nodeStateStyles` 定义了交互状态 `hover` 和业务状态 `running` 的样式。当某个任务状态变为正在执行时，二值状态 `running` 被设置为 `true` 后，节点的描边色将变为 `'steelblue'`。当二值状态 `hover` 被设置为 `true` 时，节点 `keyShape` 的填充色会变为 `'#d3adf7'`；（V3.4 后支持）且该节点中 `name` 为 `'node-label'` 的子图形也会发生改变，这里的 `'node-label'` 即节点上的文本图形，它的 `fontSize` 将会发生改变。 <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Beu6QY_ETOgAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

（V3.4 后支持）上面实例还指定了名为 `'bodyState'` 的多值状态各值下的样式。当一个节点的 `'bodyState'` 的值被设置为 `'health'` 时，该节点的 keyShape 样式以及 `name` 为 `'shape-name1'` 和 `'shape-name1'` 的子图形样式都会发生变化。

同理，`defaultEdge` 中的 `style` 属性定义了默认状态下边的样式，使用 `edgeStateStyles`  可以定义不同状态下边的样式。

### 在节点/边数据中定义 state 样式

使用这种方式可以为不同的节点/边分别配置不同的 state 样式。

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      styles: {
        // 默认样式
      },
      stateStyles: {
        //... 见上方例子
      },
      // ...
    },
    {
      id: 'node2',
      styles: {
        // 默认样式
      },
      stateStyles: {
        //... 见上方例子
      },
      // ...其他配置
    },
    // ...
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      styles: {
        // 默认样式
      },
      stateStyles: {
        //... 见上方例子
      },
      // ...其他配置
    },
    //...
  ],
};
```

### 自定义节点和边时定义 state 样式

使用这种方式可以为自定义的节点/边类型配置 state 样式。

```javascript
G6.registerNode('customShape', {
  // 自定义节点时的配置
  options: {
    size: 60,
    style: {
      lineWidth: 1
    },
    stateStyles: {
      // ... 见上方例子
    }
  }
}
```

## 更新状态样式配置

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意: </strong></span> 更新状态样式配置在 V3.4 后支持。

更新状态样式配置是指更改在 [配置 state 样式](#配置-state-样式) 中设置的某状态下的样式配置。如下代码可以修改节点/边实例的默认样式以及各状态下的样式配置。同样，您也可以使用 [配置 state 样式](#配置-state-样式) 中的样式格式修改多值状态的样式配置。

```javascript
graph.updateItem(item, {
  // 修改默认样式
  style: {
    stroke: 'green',
    // 修改 name 为 'node-label' 的子图形的默认样式
    'node-label': {
      stroke: 'yellow',
    },
  },
  stateStyles: {
    // 修改 hover 状态下的样式
    hover: {
      opacity: 0.1,
      // 修改 name 为 'node-label' 的子图形 hover 状态下的样式
      'node-text': {
        stroke: 'blue',
      },
    },
  },
});
```

使用 `graph.updateItem` 更新某状态的样式配置时，可能存在两种情况：

- item 的该状态为激活状态，即 `item.hasState('hover') === true`：此时该状态值对应的修改后的样式配置会立即在 item 上生效；
- item 的该状态为灭活状态或不存在该状态，即 `item.hasState('hover') === false`：在用户执行 `graph.setItemState(item, 'hover', true)` 后，更新后的配置在 item 上的样式。

## 取消状态

建议使用 `graph.clearItemStates` 来取消 `graph.setItemState` 设置的状态。`graph.clearItemStates` 支持一次取消单个或多个状态。

```javascript
graph.setItemState(item, 'bodyState', 'health');
graph.setItemState(item, 'selected', true);
graph.setItemState(item, 'active', true);
// 取消单个状态
graph.clearItemStates(item, 'selected');
graph.clearItemStates(item, ['selected']);
// 取消多个状态
graph.clearItemStates(item, ['bodyState:health', 'selected', 'active']);
```

## 状态优先级

有时候，各个状态的样式之间可能有冲突，需要控制哪一状态的样式优先显示。G6 不提供显式设置状态优先级的方法，所有状态遵循：后设置的状态（通过 `graph.setItemState`）优先级高于前者。用户可以通过 `hasState` 方法判断元素的某种状态是否是激活态，从而判断是否应该激活另一个状态。这一逻辑完全由业务用户控制，实现这种控制也非常简单。例如，一般情况下，鼠标 hover 到某个节点后，该节点会高亮，但希望当该节点处于 active 状态时，鼠标 hover 上去后也不要覆盖 active 的状态，即 active 优先级高于 hover。

```javascript
// 设置节点处于 active 状态
graph.setItemState(item, 'active', true);
// 鼠标 hover
const hasActived = item.hasState('active');
// 当节点没有 active 时才设置 hover 状态
if (!hasActived) {
  graph.setItemState(item, 'hover', true);
}
```

## 小结

G6 底层提供了状态管理的能力，通过使用 state，简化了状态管理，降低了用户的认知成本。更多关于 G6 中状态的内容请参考  <a href='https://www.yuque.com/antv/g6/xiux28' target='_blank'>G6 状态量思考</a>。
