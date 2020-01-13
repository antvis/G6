---
title: 自定义交互 Behavior
order: 5
---

G6 除了提供丰富的 [内置交互行为 Behavior](/zh/docs/manual/middle/states/defaultBehavior) 外，还提供了自定义交互行为的机制，方便用户开发更加定制化的交互行为。

在交互行为上， G6 主要考虑了三个场景：

- 展示关系数据；
- 可视化建模；
- 图分析。

在这些场景中只要用户可能无法一眼看清楚所有需要的信息，都需要进行交互，例如：

- 图太大，需要缩放；
- 单个节点上展示的信息太少，需要通过 tooltip 显示详情；
- 对节点进行增删改查。

我们无法将所有常用的交互全部内置到 G6 中。由于场景不一样，业务不一样，同样的目的需要的交互都不一样：

- 有些系统需要从工具栏上点击后添加节点，有些系统需要从面板栏上拖出出新的节点；
- 有的业务添加边需要从锚点上拖拽出来，而有些直接点击节点后就可以拖拽出边；
- 有些边可以连接到所有节点上，而有些边不能连接到具体某个节点的某个锚点上；
- 所有的交互的触发、持续、结束都要允许能够进行个性化的判定；
- ……

我们可以看到在图上的交互是繁杂多变的。各种冲突、各种配置项会让用户和开发者疲于应对。出于这些考虑，G6 提供了一套非常简单而灵活的机制来实现交互。


## Behavior 的生命周期
为实现交互，首先需要了解交互的生命周期。交互起源于用户在系统上的所有事件，是否允许交互发生同事件密切相关。所以我们看到交互的生命周期，即操作事件的过程如下：

- 绑定事件；
- 触发事件；
- 持续事件；
- 结束事件；
- 移除事件。


## 自定义交互 registerBehavior
通过 `G6.registerBehavior` 自定义 Behavior。下面代码实现了名为 `'activate-node'` 的交互行为，在终端用户点击节点时，置该节点的 `active` 状态为 `true`；再次点击或点击画布时，置该节点的 `active` 状态为 `false`。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️注意:</strong></span>

- 下面代码仅设置了不同交互后节点的状态，没有指定这些状态下节点的样式。若需要根据节点状态变化它的样式，参见 [配置不同 State 下的节点样式](/zh/docs/manual/middle/states/state)。
- 自定义 Behavior 时，可选的方法请参数 [Behavior API](/zh/docs/api/Behavior)；
- `getEvent` 返回该 Behavior 所需监听事件的对象，G6 中支持的所有事件，请参考 [Event API](/zh/docs/api/Event)。

```javascript
G6.registerBehavior('activate-node', {
  getDefaultCfg() {
    return {
      multiple: true
    };
  },
  getEvents() {
    return {
      'node:click': 'onNodeClick',
      'canvas:click': 'onCanvasClick'
    };
  }
  onNodeClick(e) {
    const graph = this.graph;
    const item = e.item;
    if (item.hasState('active')) {
      graph.setItemState(item, 'active', false);
      return;
    }
    // this 上即可取到配置，如果不允许多个 'active'，先取消其他节点的 'active' 状态
    if (!this.multiple) {
      this.removeNodesState();
    }
    // 置点击的节点状态 'active' 为 true
    graph.setItemState(item, 'active', true);
  },
  onCanvasClick(e) {
    // shouldUpdate 可以由用户复写，返回 true 时取消所有节点的 'active' 状态，即将 'active' 状态置为 false
    if (this.shouldUpdate(e)) {
      removeNodesState();
    }
  },
  removeNodesState() {
    graph.findAllByState('node', 'active').forEach(node => {
        graph.setItemState(node, 'active', false);
      });
  }  
});
```


## 使用自定义的 Behavior
有了上面代码定义的名为 `'activate-node'` 的 Behavior 以后，在实例化 Graph 时，在 `modes` 中将其配置到默认或其他[行为模式](/zh/docs/manual/middle/states/mode)中。下面代码将其配置到了默认行为模式中，在默认模式下，该行为将会生效。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 500,
  modes: {
   // 定义的 Behavior 指定到这里，就可以支持 Behavior 中定义的交互
   default: ['activate-node']
  }
});

```

