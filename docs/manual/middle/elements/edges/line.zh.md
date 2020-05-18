---
title: Line
order: 1
---

G6 内置了直线 line  边，其默认样式如下。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*prQjRbZtUUkAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## 使用方法

如 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge)  一节所示，配置边的方式有两种：实例化图时全局配置，在数据中动态配置。

### 1 实例化图时全局配置

用户在实例化 Graph 时候可以通过 `defaultEdge` 指定 `type` 为 `'line'`，即可使用 line  边。

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    type: 'line',
    // 其他配置
  },
});
```

### 2 在数据中动态配置

如果需要使不同节点有不同的配置，可以将配置写入到节点数据中。这种配置方式可以通过下面代码的形式直接写入数据，也可以通过遍历数据的方式写入。

```javascript
const data = {
  nodes: [
    ... // 节点
  ],
  edges: [{
    source: 'node0',
    target: 'node1'
    type: 'line',
    ... // 其他配置
    style: {
      ...  // 样式属性，每种边的详细样式属性参见各边文档
    }
  },
    ... // 其他边
  ]
}
```

## 配置项说明

line 边支持 [边通用配置项](zh/docs/manual/middle/elements/edges/defaultEdge/#边的通用属性)，以下表格对部分常用配置项进行说明。对于 Object 类型的配置项将在后面有详细讲解：

| 名称     | 含义           | 类型   | 备注                             |
| -------- | -------------- | ------ | -------------------------------- |
| color    | 直线的颜色     | String | 优先级低于 `style` 中的 `stroke` |
| style    | 直线的样式     | Object | Canvas 支持的属性                |
| label    | 标签文本文字   | String |                                  |
| labelCfg | 标签文本配置项 | Object |                                  |
| stateStyles | 各状态下的样式 | Object | 详见[配置状态样式](/zh/docs/manual/middle/states/state#配置-state-样式) |

### 样式属性 style

Object 类型。配置项与 [边通用样式属性](/zh/docs/manual/middle/elements/edges/defaultEdge/#样式属性-style) 相同。下面代码演示在实例化图时全局配置方法中配置 `style`，以达到下图效果。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cQprQJVY3c4AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

```javascript
const data = {
  nodes: [
    {
      id: 'node0',
      x: 100,
      y: 100,
      size: 20,
    },
    {
      id: 'node1',
      x: 200,
      y: 100,
      size: 20,
    },
  ],
  edges: [
    {
      source: 'node0',
      target: 'node1',
      type: 'line',
      label: 'line',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // type: 'line',  // 在数据中已经指定 type，这里无需再次指定
    style: {
      stroke: 'steelblue',
      lineWidth: 5,
    },
    labelCfg: {
      position: 'end',
      refY: -10,
    },
  },
});
graph.data(data);
graph.render();
```

### 标签文本配置 labelCfg

Object 类型。支持 [边通用标签配置](/zh/docs/manual/middle/elements/edges/defaultEdge/#标签文本-label-及其配置-labelcfg)。<br />基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultEdge` 中增加了  `labelCfg`  配置项进行文本的配置，使之达到如下图效果。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*myWoSa1ngjgAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他配置
  defaultEdge: {
    // ... 其他配置
    labelCfg: {
      position: 'end',
      refY: -10,
    },
  },
});
// ...
```
