---
title: line
order: 0
---

G6 内置了直线 line 边，其默认样式如下。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570874016768-fc9f40c9-e9ef-4d6e-b4b1-80a9ec90ae4c.png#align=left&display=inline&height=45&name=image.png&originHeight=90&originWidth=230&search=&size=6120&status=done&width=115)


## 使用方法
如 [内置边](../defaultEdge) 一节所示，配置边的方式有两种：实例化图时全局配置，在数据中动态配置。


### 1 实例化图时全局配置
用户在实例化 Graph 时候可以通过 `defaultEdge` 指定 `shape` 为 `'line'`，即可使用 line 边。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    shape: 'line',
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
    shape: 'line',
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
line 边支持以下的配置项，对于 Object 类型的配置项将在后面有详细讲解：

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| color | 直线的颜色 | String | 优先级低于 style 中的 stroke |
| style | 直线的样式 | Object | Canvas支持的属性 |
| label | 标签文本文字 | String |  |
| labelCfg | 文件配置项 | Object |  |



### 样式属性 style
Object 类型。配置项与边的通用样式属性相同，见 [内置边](https://www.yuque.com/antv/g6/internal-edge)。下面代码演示在实例化图时全局配置方法中配置 `style`，以达到下图效果。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570874074477-21e58af7-9826-4b32-af13-3d2f2db9dc01.png#align=left&display=inline&height=37&name=image.png&originHeight=74&originWidth=238&search=&size=7753&status=done&width=119)
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
    y: 100,
    size: 20
 }],
 edges: [{
   source: 'node0',
   target: 'node1',
   shape: 'line',
   label: 'line'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // shape: 'line',  // 在数据中已经指定 shape，这里无需再次指定
    style: {
      stroke: 'steelblue',
      lineWidth: 5
    },
    labelCfg: {
      position: 'end',
      refY: -10
    }
  }
})
graph.data(data);
graph.render();
```


### 标签文本配置 labelCfg
Object 类型。其配置与边的通用文本配置相同，见 [内置边](https://www.yuque.com/antv/g6/internal-edge)。<br />基于上面 [样式属性 style](#XQFb2) 中的代码，下面代码在 `defaultNode` 中增加了 `labelCfg` 配置项进行文本的配置，使之达到如下图效果。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570874163028-2c7df083-af06-4718-acf6-ea4db47d664e.png#align=left&display=inline&height=41&name=image.png&originHeight=82&originWidth=218&search=&size=6531&status=done&width=109)
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
    	refY: -10
    }
  }
});
// ...
```
