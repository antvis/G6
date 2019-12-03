---
title: Custom Behavior
order: 5
---

G6 provides abundant [Built-in Behavior](/zh/docs/manual/middle/states/defaultBehavior). Besides, you can custom your type of behaviors to satisfy the special requirements.

In G6, we mainly take three scenarii into consideration:

- Demonstrating the relational data;
- Modeling the visualization;
- Analyzing the graph.

It is necessary to incorporate the interactions when the information is too complex to be understand in one glance:

- Zooming a large graph;
- Utilizing the ttoltip to show the detail information of a node;
- Adding/removing/modifying/querying a graph item.

Due to the complex and the diversity of the interactions in different scenarii and bussiness, we did not build all the interactions into G6:

- Some systems require to add nodes by clicking a tool bar, some require toe add by dragging from a panel;
- Some scenarii add edges by dragging from an anchor point, some add by clicking the end nodes;
- Some edges are allowed to link to any node, some only can be linked to specific anchor points;
- Some users require to custom the process of activating and endding.
- ...

We found the interactions are sundry and versatile. And the conflicts and configurations will make the users and developers collapse. Thus, G6 designs a set of simple and flexible implemention of interaction.


## The Life Cycle of Behavior
为实现交互，首先需要了解交互的生命周期。交互起源于用户在系统上的所有事件，是否允许交互发生同事件密切相关。所以我们看到交互的生命周期，即操作事件的过程如下：

- 绑定事件；
- 触发事件；
- 持续事件；
- 结束事件；
- 移除事件。


## 自定义交互 registerBehavior
通过 `G6.registerBehavior` 自定义 Behavior。下面代码实现了名为 `'activate-node' `的交互行为，在终端用户点击节点时，置该节点的 `active` 状态为 `true`；再次点击或点击画布时，置该节点的 `active` 状态为 `false`。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;注意：</span>

- 下面代码仅设置了不同交互后节点的状态，没有指定这些状态下节点的样式。若需要根据节点状态变化它的样式，参见 [配置不同 State 样式](/zh/docs/manual/middle/states/state)。
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
    // this 上即可取到配置，如果不允许多个active，先取消其他节点的active状态
    if (!this.multiple) {
      this.removeNodesState();
    }
    // 置点击的节点状态为active
    graph.setItemState(item, 'active', true);
  },
  onCanvasClick(e) {
    // shouldUpdate可以由用户复写，返回 true 时取消所有节点的active状态
    if (this.shouldUpdate(e)) {
      removeNodesState();
    }
  },
  removeNodesState() {
    graph.findAllByState('active').forEach(node => {
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
   // 定义的 behavior 指定到这里，就可以支持Behavior中定义的交互
   default: ['activate-node']
  }
});

```

