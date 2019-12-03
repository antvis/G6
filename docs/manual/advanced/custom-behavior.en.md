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

We found the interactions are sundry and versatile. And the conflicts and configurations will make the users and developers collapse. Thus, G6 designs a set of simple and flexible implemention of interaction behavior.


## The Life Cycle of Behavior
To custom an Behavior, it is important to comprehend the life cycle of Behavior. Interaction Behaviors are related to the events from users, including the processes:

- Bind the event;
- Activate the event;
- Keep the event;
- End the event;
- Remove the event.


## registerBehavior
You can custom a Behavior by `G6.registerBehavior`. The following code implements a custom Behavior named `'activate-node'`, which changes the state `active` of the clicked node to be `true`, and restores the state `active` to be `false` when the user clicking the node again or clicking the canvas.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;⚠️**Attension:** </span>

- The following code set the states for different behaviors, but does not assign the state styles for manipulated nodes. To change the styles when the states changed, refer to [State Styles](/en/docs/manual/middle/states/state)。
- The configurations of customizing Behavior are introduced in [Behavior API](/en/docs/api/Behavior)；
- `getEvent` returns the events which are listened by the Behavior. The events in G6 are introduced in [Event API](/en/docs/api/Event)。

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

