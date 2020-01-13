---
title: Polyline
order: 2
---

G6 内置了折线 polyline 边，其默认样式如下。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aRHcQZStrPgAAAAAAAAAAABkARQnAQ' width=150/>


## 使用方法
如 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge) 一节所示，配置边的方式有两种：实例化图时全局配置，在数据中动态配置。


### 1 实例化图时全局配置
用户在实例化 Graph 时候可以通过 `defaultEdge` 指定 `shape` 为 `'polyline'`，即可使用 polyline 边。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    shape: 'polyline',
    // 其他配置
  }
})
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
    shape: 'polyline',
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
polyline 边支持 [边通用配置项](zh/docs/manual/middle/elements/edges/defaultEdge/#边的通用属性)，以下表格对部分常用配置项进行说明：
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
| style | 边的样式 | Object | Canvas支持的属性 |
| **style.radius** | **拐弯处的圆角弧度** | **Number** | **若不设置则为直角，polyline 特有** |
| **style.offset** | **拐弯处距离节点最小距离** | **Number** | **默认为 5，polyline 特有** |
| controlPoints | 控制点数组 | Array | 不指定时根据 <a href='https://yuque.alibaba-inc.com/antv/blog/polyline-edges-with-border-radius' target='_blank'>A* 算法</a>自动生成折线。若指定了，则按照 `controlPoints` 指定的位置进行弯折。示例：`[{ x: 10, y: 20 }, { x: 20, y: 25 }, ...]` |
| label | 标签文本文字 | String |  |
| labelCfg | 标签文本配置项 | Object |  |



### 样式属性 style
Object 类型。支持 [边通用样式属性](/zh/docs/manual/middle/elements/edges/defaultEdge/#样式属性-style)。与其他类型的边不同的是，polyline 的 `style` 含有两个特殊属性：

-  `radius` ，弯折处的圆角半径，不设置则默认为直角；
-  `offset` ，距离端点的最小距离，默认值为 5。

其它配置项与边的通用样式属性相同，见 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge)<br />下面代码演示在实例化图时全局配置方法中配置 `style`，以达到下图效果。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SzMGQ70SLwEAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  nodes: [{
    id: 'node0',
    x: 100,
    y: 100,
    size: 20
 },{
    id: 'node1',
    x: 200,
    y: 200,
    size: 20
 }],
 edges: [{
   source: 'node0',
   target: 'node1',
   shape: 'polyline',
   label: 'polyline'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // shape: 'polyline',  // 在数据中已经指定 shape，这里无需再次指定
    style: {
      radius: 10,
      offset: 10,
      stroke: 'steelblue',
      lineWidth: 5
    }
  }
})
graph.data(data);
graph.render();
```


### 标签文本配置 labelCfg
Object 类型。支持 [边通用标签配置](/zh/docs/manual/middle/elements/edges/defaultEdge/#标签文本-label-及其配置-labelcfg)。基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultEdge` 中增加了 `labelCfg` 配置项进行文本的配置，使之达到如下图效果。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HT4OTobglpoAAAAAAAAAAABkARQnAQ' width=150/>
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
      refX: 60
    }
  }
});
// ...
```
