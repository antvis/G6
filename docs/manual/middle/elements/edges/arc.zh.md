---
title: Arc
order: 5
---

G6 内置了圆弧 arc 边，其默认样式如下。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9JBjS6bdrHMAAAAAAAAAAABkARQnAQ' width=150/>


## 使用方法
如 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge) 一节所示，配置边的方式有两种：实例化图时全局配置，在数据中动态配置。


### 1 实例化图时全局配置
用户在实例化 Graph 时候可以通过 `defaultEdge` 指定 `shape` 为 `'arc'`，即可使用 arc 边。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    shape: 'arc',
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
    shape: 'arc',
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
arc 边支持 [边通用配置项](zh/docs/manual/middle/elements/edges/defaultEdge/#边的通用属性)，以下表格对部分常用配置项进行说明。其中 `curveOffset` 属性是 `arc` 特有的属性，它控制了圆弧的大小以及弯曲的方向。
```javascript
color: '#87e8de',
curveOffset: 20,  // 圆弧顶端距离两线中心位置的距离
style: {
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
| color | 边的颜色 | String | 优先级低于 `style` 中的 `stroke` |
| **curveOffset** | **圆弧顶端距离两线中心位置的距离** | **Number** | **数值绝对值大小控制圆弧的大小，正负控制圆弧弯曲的方向，默认为 `20`。arc 边特有** |
| style | 边的样式 | Object | Canvas 支持的属性 |
| label | 标签文本文字 | String |  |
| labelCfg | 标签文本配置项 | Object |  |



### 特殊属性：弧度 curveOffset
`curveOffset` 属性是 `arc` 特有的属性，它控制了圆弧的大小以及弯曲的方向。下面代码演示在实例化图时全局配置方法中配置 `curveOffset`。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*63NxRppr3tUAAAAAAAAAAABkARQnAQ' width=150/>

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
   shape: 'arc',
   label: 'arc'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  linkCenter: true,
  defaultEdge: {
    // shape: 'arc',  // 在数据中已经指定 shape，这里无需再次指定
    curveOffset: -80
  }
})
graph.data(data);
graph.render();
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️注意:</strong></span><br />上面代码使用了 graph 的配置项 `linkCenter: true` 以设置 arc 边连入节点的中心，保证美观性。


### 样式属性 style
Object 类型。配置项与 [边通用样式属性](/zh/docs/manual/middle/elements/edges/defaultEdge/#样式属性-style) 相同。基于上面 [特殊属性：弧度 curveOffset](#特殊属性：弧度-curveoffset) 中的代码，下面代码在 `defaultEdge` 中增加了 `style` 配置项进行边的样式的配置，使之达到如下图效果。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*LH4lT64i304AAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他配置
  defaultEdge: {
    // ... 其他配置
    style: {
      stroke: '#088',
      lineWidth: 3
    }
  }
});
// ...
```


### 标签文本配置 labelCfg
Object 类型。支持 [边通用标签配置](/zh/docs/manual/middle/elements/edges/defaultEdge/#标签文本-label-及其配置-labelcfg)。基于上面 [弧度 curveOffset](/zh/docs/manual/middle/elements/edges/arc/#特殊属性：弧度-curveoffset) 中的代码，下面代码在 `defaultEdge` 中增加了 `labelCfg` 配置项进行文本的配置，使之达到如下图效果。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xu0FSKNxQNUAAAAAAAAAAABkARQnAQ' width=150/>
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
      refY: -30,
      refX: 30
    }
  }
});
// ...
```
