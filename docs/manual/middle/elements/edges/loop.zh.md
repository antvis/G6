---
title: loop
order: 5
---

G6 内置了折线 loop 边，其默认样式如下。<br />
![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570875933229-5bd7e62a-b4f5-487c-9ee9-3a7df1d6e220.png#align=left&display=inline&height=60&name=image.png&originHeight=120&originWidth=114&search=&size=6588&status=done&width=57)

 注意 <br />loop 边适用于自环边，即起始点与结束点为相同节点的边，在不同端点的边上适用 loop 边将会出现异常效果。
<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1570777918386-5b4789f6-4287-4e33-bb59-a671d5cb008d.png#align=left&display=inline&height=176&name=image.png&originHeight=602&originWidth=256&search=&size=37135&status=done&width=75' width='75' height='176' />

## 使用方法
如 [内置边](../defaultEdge) 一节所示，配置边的方式有两种：实例化图时全局配置，在数据中动态配置。


### 1 实例化图时全局配置
用户在实例化 Graph 时候可以通过 `defaultEdge` 指定 `shape` 为 `'loop'`，即可使用 `loop` 边。需要注意的是，如果图上存在非自环边，loop 将会表现异常。因此不建议在存在非自环边的图上使用此全局配置方法。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    shape: 'loop',
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
    target: 'node0'
    shape: 'loop',
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
自环是指连接单个节点自身的边，是一种边的特殊情况，因此，在通用属性基础上，支持了特殊的配置 `loopCfg`。

loop 边支持以下的配置项，对于 Object 类型的配置项将在后面有详细讲解：

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| color | 边的颜色 | String | 优先级低于 style 中的 stroke |
| style | 边的样式 | Object | Canvas支持的属性 |
| style.endArrow | 边结束端是否有箭头 | Boolean | 默认为 false |
| label | 标签文本文字 | String |  |
| labelCfg | 文件配置项 | Object |  |
| **loopCfg** | **自环特殊配置** | **Object** |  |



### 样式属性 style
Object 类型。配置项与边的通用样式属性相同，见 [内置边](https://www.yuque.com/antv/g6/internal-edge)。下面代码演示在实例化图时全局配置方法中配置 `style`，以达到下图效果。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570875958411-aa33e3e9-1eee-4061-873e-a677b7dd495a.png#align=left&display=inline&height=57&name=image.png&originHeight=114&originWidth=88&search=&size=8617&status=done&width=44)
```javascript
const data = {
  nodes: [{
    id: 'node0',
    x: 100,
    y: 100,
    size: 20
 }],
 edges: [{
   source: 'node0',
   target: 'node0',
   shape: 'loop',
   label: 'loop'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // shape: 'loop',  // 在数据中已经指定 shape，这里无需再次指定
    style: {
      endArrow: true,
      stroke: '#088',
      lineWidth: 3
    }
  }
})
graph.data(data);
graph.render();

```


### 标签文本配置 labelCfg
Object 类型。其配置与边的通用文本配置相同，见 [内置边](https://www.yuque.com/antv/g6/internal-edge)。基于上面 [样式属性 style](#XQFb2) 中的代码，下面代码在 `defaultNode` 中增加了 `labelCfg` 配置项进行文本的配置，使之达到如下图效果。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570878002730-b0e471d7-1273-425b-8cc3-0b6ba3f91b06.png#align=left&display=inline&height=51&name=image.png&originHeight=102&originWidth=120&search=&size=9700&status=done&width=60)
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他配置
  defaultEdge: {
    // ... 其他配置
    labelCfg: {
      refY: -5,
      refX: 30
    }
  }
});
// ...
```


### 自环特殊配置 loopCfg
Object 类型。通过 `loopCfg` 配置自环的方位、高度、顺逆时针。

- `position`: 指定自环与节点的相对位置。默认为：`top`。支持的值有：`top`, `top-right`, `right`,`bottom-right`, `bottom`, `bottom-left`, `left`, `top-left`
- `dist`: 从节点 keyShape 的边缘到自环最顶端的位置，用于指定自环的曲度，默认为节点的高度。
- `clockwise`: 指定是否顺时针画环，默认为 `true`。

基于上面 [样式属性 style](#XQFb2) 中的代码，下面代码在 `defaultNode` 中增加了 `loopCfg` 配置项进行文本的配置，使之达到如下图效果。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570878028299-38f92dba-d79a-4071-8b28-4da7ff3f07fe.png#align=left&display=inline&height=56&name=image.png&originHeight=112&originWidth=204&search=&size=15251&status=done&width=102)
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他配置
  defaultEdge: {
    // ... 其他配置
    loopCfg: {
      position: 'left',
      dist: 100,
      clockwise: false
    }
  }
});
// ...
```
