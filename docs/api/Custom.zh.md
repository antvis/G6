---
title: 自定义机制
order: 10
---

本文介绍 G6 的自定义机制，包括自定义节点、自定义边、自定义交互行为、自定义布局的相关方法。它们都被挂载在 G6 全局上，通过 `G6.registerXXX` 进行调用。

## G6.registerNode(nodeName, options, extendNodeName)

当内置节点不满足需求时，可以通过 `G6.registerNode(nodeName, options, extendNodeName)` 方法自定义节点。

### 参数

| 名称           | 类型   | 是否必选 | 描述                                                                                                                                                               |
| -------------- | ------ | -------- | ---------------------------------------- |
| nodeName       | String | true     | 自定义节点名称，需保持唯一性。                                                                                                                                     |
| options        | Object | true     | 自定义节点时的配置项，配置项中包括完整的生命周期方法，具体请参考：[Shape API](/zh/docs/api/Shape)。                                          |
| extendNodeName | String | false    | 自定义节点时可基于内置节点进行定义，该字段表示内置节点名称，所有内置节点请参考：[内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode) 教程。 |

### 用法

```javascript
G6.registerNode(
  'nodeName',
  {
    /**
     * 绘制节点，包含文本
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 节点的容器
     * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
     */
    draw(cfg, group) {},
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 节点的容器
     */
    afterDraw(cfg, group) {},
    /**
     * 更新节点，包含文本
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    update(cfg, node) {},
    /**
     * 更新节点后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    afterUpdate(cfg, node) {},
    /**
     * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Node} node 节点
     */
    setState(name, value, node) {},
    /**
     * 获取锚点（相关边的连入点）
     * @param  {Object} cfg 节点的配置项
     * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有锚点
     */
    getAnchorPoints(cfg) {},
  },
  'extendNodeName'
);
```

## G6.registerEdge(edgeName, options, extendEdgeName)

当内置的边不能满足需求时，可以通过 `registerEdge(edgeName, options, extendEdgeName)` 方法注册自定义的边。

### 参数

| 名称           | 类型   | 是否必选 | 描述                                                                                                                                   |
| -------------- | ------ | -------- | -------------------------------------------------- |
| edgeName       | String | true     | 自定义边的名称                                                                                                                         |
| options        | Object | true     | 自定义边时的配置项，配置项中包括完整的生命周期方法，具体请参考：[Shape API](/zh/docs/api/Shape)。                |
| extendEdgeName | String | false    | 自定义边时可基于内置边进行定义，该字段表示内置边的名称，所有内置边请参考：[内置边](/zh/docs/manual/middle/elements/edges/defaultEdge) 教程。 |

### 用法

```javascript
G6.registerEdge(
  'edgeName',
  {
    /**
     * 绘制边，包含文本
     * @param  {Object} cfg 边的配置项
     * @param  {G.Group} group 边的容器
     * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
     */
    draw(cfg, group) {},
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 边的配置项
     * @param  {G.Group} group 边的容器
     */
    afterDraw(cfg, group) {},
    /**
     * 更新边，包含文本
     * @override
     * @param  {Object} cfg 边的配置项
     * @param  {Edge} edge 边
     */
    update(cfg, edge) {},
    /**
     * 更新边后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 边的配置项
     * @param  {Edge} edge 边
     */
    afterUpdate(cfg, edge) {},
    /**
     * 设置边的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的边仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Edge} edge 边
     */
    setState(name, value, edge) {},
  },
  'extendEdgeName'
);
```

## G6.registerBehavior(behaviorName, behavior)

当内置的 Behavior 不能满足需求时，使用 `registerBehavior(behaviorName, behavior)` 方法注册自定义的交互行为。

### 参数

| 名称         | 类型   | 是否必选 | 描述                                                                                                                          |
| ------------ | ------ | -------- | ----------------------------------------------------------------- |
| behaviorName | String | true     | 自定义 Behavior 的名称。                                                                                                        |
| behavior     | Object | true     | 自定义 behavior 时的配置项，配置项中包括的方法及作用具体请参考：[Behavior API](/zh/docs/api/Behavior)。 |

### 用法

```javascript
// 注册自定义 Behavior
G6.registerBehavior('behaviorName', {
  // 设置事件及处理事件的回调之间的对应关系
  getEvents() {
    return {
      'node:click': 'onClick',
      mousemove: 'onMousemove',
      'edge:click': 'onEdgeClick',
    };
  },
  /**
   * 处理 node:click 事件的回调
   * @override
   * @param  {Object} evt 事件句柄
   */
  onClick(evt) {
    const node = evt.item;
    const graph = this.graph;
    const point = { x: evt.x, y: evt.y };
    const model = node.getModel();
    // TODO
  },
  /**
   * 处理 mousemove 事件的回调
   * @override
   * @param  {Object} evt 事件句柄
   */
  onMousemove(evt) {
    // TODO
  },
  /**
   * 处理 :click 事件的回调
   * @override
   * @param  {Object} evt 事件句柄
   */
  onEdgeClick(evt) {
    // TODO
  },
});
```

## G6.registerLayout(layoutName, layout)

当内置布局不满足需求时，可以通过 `G6.registerLayout(layoutName, layout)` 方法自定义布局。

### 参数

| 名称       | 类型   | 是否必选 | 描述                                                                                                          |
| ---------- | ------ | -------- | --------------------------------------- |
| layoutName | String | true     | 自定义布局名称。                                                                                                |
| layout     | Object | true     | 自定义布局的配置项，配置项中包括的方法及作用具体请参考：[Layout API](/zh/docs/manual/middle/layout)。 |

### 用法

```javascript
G6.registerLayout('layoutName', {
  /**
   * 定义自定义行为的默认参数，会与用户传入的参数进行合并
   */
  getDefaultCfg() {
    return {};
  },
  /**
   * 初始化
   * @param {Object} data 数据
   */
  init(data) {
    const self = this;
    self.nodes = data.nodes;
    self.edges = data.edges;
  },
  /**
   * 执行布局
   */
  execute() {
    // TODO
  },
  /**
   * 根据传入的数据进行布局
   * @param {Object} data 数据
   */
  layout(data) {
    const self = this;
    self.init(data);
    self.execute();
  },
  /**
   * 更新布局配置，但不执行布局
   * @param {Object} cfg 需要更新的配置项
   */
  updateCfg(cfg) {
    const self = this;
    Util.mix(self, cfg);
  },
  /**
   * 销毁
   */
  destroy() {
    const self = this;
    self.positions = null;
    self.nodes = null;
    self.edges = null;
    self.destroyed = true;
  },
});
```
