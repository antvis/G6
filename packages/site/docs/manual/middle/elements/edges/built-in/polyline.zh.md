---
title: Polyline
order: 3
---

G6 内置了折线 polyline  边，其默认样式如下。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aRHcQZStrPgAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## 使用方法

如 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge)  一节所示，配置边的方式有三种：实例化图时全局配置，在数据中动态配置，使用 `graph.edge(edgeFn)` 函数配置。这几种配置方法可以同时使用，优先级：

使用 graph.edge(edgeFn) 配置 > 数据中动态配置 > 实例化图时全局配置

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 除 `id`、`source`、`target`、`label` 应当配置到每条边数据中外，其余的 [边的通用属性](/zh/docs/manual/middle/elements/edges/defaultEdge#边的通用属性) 以及各个边类型的特有属性（见内置边类型）均支持三种配置方式。

### 1 实例化图时全局配置

用户在实例化 Graph 时候可以通过 `defaultEdge` 指定 `type` 为 `'polyline'`，即可使用 polyline  边。

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    type: 'polyline',
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
    type: 'polyline',
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

polyline 边支持 [边通用配置项](/zh/docs/manual/middle/elements/edges/defaultEdge/#边的通用属性)，以下表格对部分常用配置项进行说明：

```javascript
color: '#87e8de',
style: {
  offset: 20,  // 拐弯处距离节点最小距离
  radius: 10,  // 拐弯处的圆角弧度，若不设置则为直角
  lineWidth: 2,
  stroke: '#87e8de'
},
label: '边的标签文字',
labelCfg: {
  refX: 10,  // 文本在 x 方向偏移量
  refY: 10,  // 文本在 y 方向偏移量
  style: {
    fill: '#595959'
  }
}
```

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| color | 边的颜色 | String | 优先级低于 style 中的 stroke |
| style | 边的样式 | Object | Canvas 支持的属性 |
| **style.radius** | **拐弯处的圆角弧度** | **Number** | **若不设置则为直角，polyline 特有** |
| **style.offset** | **拐弯处距离节点最小距离** | **Number** | **默认为 5，polyline 特有** |
| controlPoints | 控制点数组 | Array | 不指定时根据 <a href='https://www.yuque.com/antv/blog/eyi70n' target='_blank'>A\* 算法</a>自动生成折线。若指定了，则按照 `controlPoints` 指定的位置进行弯折。示例：`[{ x: 10, y: 20 }, { x: 20, y: 25 }, ...]` |
| label | 标签文本文字 | String |  |
| labelCfg | 标签文本配置项 | Object |  |
| stateStyles | 各状态下的样式 | Object | 详见[配置状态样式](/zh/docs/manual/middle/states/state#配置-state-样式) |

### 样式属性 style

Object 类型。支持 [边通用样式属性](/zh/docs/manual/middle/elements/edges/defaultEdge/#样式属性-style)。与其他类型的边不同的是，polyline 的 `style`  含有两个特殊属性：

- `radius` ，弯折处的圆角半径，不设置则默认为直角；
- `offset` ，距离端点的最小距离，默认值为 5。

其它配置项与边的通用样式属性相同，见 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge)<br />下面代码演示在实例化图时全局配置方法中配置 `style`，以达到下图效果。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SzMGQ70SLwEAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

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
      y: 200,
      size: 20,
    },
  ],
  edges: [
    {
      source: 'node0',
      target: 'node1',
      type: 'polyline',
      label: 'polyline',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // type: 'polyline',  // 在数据中已经指定 type，这里无需再次指定
    style: {
      radius: 10,
      offset: 10,
      stroke: 'steelblue',
      lineWidth: 5,
    },
  },
});
graph.data(data);
graph.render();
```

### 标签文本配置  labelCfg

Object 类型。支持 [边通用标签配置](/zh/docs/manual/middle/elements/edges/defaultEdge/#标签文本-label-及其配置-labelcfg)。基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultEdge` 中增加了  `labelCfg`  配置项进行文本的配置，使之达到如下图效果。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HT4OTobglpoAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他配置
  defaultEdge: {
    // ... 其他配置
    labelCfg: {
      refY: -10,
      refX: 60,
    },
  },
});
// ...
```
