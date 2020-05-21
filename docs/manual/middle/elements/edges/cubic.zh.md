---
title: Cubic
order: 4
---

G6 内置了  cubic  边，其默认样式如下。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rcLiTa6Ih3AAAAAAAAAAAABkARQnAQ' width=150/>

## 使用方法

如 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge)  一节所示，配置边的方式有两种：实例化图时全局配置，在数据中动态配置。

### 1 实例化图时全局配置

用户在实例化 Graph 时候可以通过 `defaultEdge` 指定 `type` 为 `'cubic'`，即可使用 cubic  边。

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    type: 'cubic',
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
    type: 'cubic',
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

cubic 边支持 [边通用配置项](zh/docs/manual/middle/elements/edges/defaultEdge/#边的通用属性)，以下表格对部分常用配置项进行说明。对于 Object 类型的配置项将在后面有详细讲解：

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| color | 边的颜色 | String | 优先级低于 `style` 中的 `stroke` |
| style | 边的样式 | Object | Canvas 支持的属性 |
| label | 标签文本文字 | String |  |
| labelCfg | 标签文本配置项 | Object |  |
| controlPoints | 控制点数组 | Array | 不指定时将会使用默认的控制点：曲线 1/3 和 2/3 处。示例：`[{ x: 10, y: 20 }, { x: 15, y: 30 }]` |
| curveOffset | 两个控制点距离两端点连线的距离，可理解为控制边的弯曲程度。为 Number 类型时两个控制点分别在连线两侧且与连线距离相等 | Number / Number[] | cubic、horizontal、cubic-vertical、cubic-horizontal 等贝塞尔曲线特有 |
| curvePosition | 两个控制点在两端点连线上的相对位置，范围 0～1 | Number / Number[] | cubic、horizontal、cubic-vertical、cubic-horizontal 等贝塞尔曲线特有 |
| stateStyles | 各状态下的样式 | Object | 详见[配置状态样式](/zh/docs/manual/middle/states/state#配置-state-样式) |

### 样式属性 style

Object 类型。配置项与 [边通用样式属性](/zh/docs/manual/middle/elements/edges/defaultEdge/#样式属性-style) 相同。下面代码演示在实例化图时全局配置方法中配置 `style`，以达到下图效果。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Do6IQouIA9AAAAAAAAAAAABkARQnAQ' width=150/>

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
      type: 'cubic',
      label: 'cubic',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // type: 'cubic',  // 在数据中已经指定 type，这里无需再次指定
    style: {
      endArrow: true,
      stroke: '#088',
      lineWidth: 3,
    },
  },
});
graph.data(data);
graph.render();
```

### 标签文本配置 labelCfg

Object 类型。支持 [边通用标签配置](/zh/docs/manual/middle/elements/edges/defaultEdge/#标签文本-label-及其配置-labelcfg)。基于上面 [样式属性 style](/zh/docs/manual/middle/elements/edges/defaultEdge/#样式属性-style) 中的代码，下面代码在 `defaultEdge` 中增加了  `labelCfg`  配置项进行文本的配置，使之达到如下图效果。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ySTVQ7MrMtgAAAAAAAAAAABkARQnAQ' width=150/>

```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他配置
  defaultEdge: {
    // ... 其他配置
    labelCfg: {
      autoRotate: true,
      refY: 10,
      refX: 40,
    },
  },
});
// ...
```
