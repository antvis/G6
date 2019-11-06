---
title: 内置的边
order: 3
---

G6 提供了 9 种内置边：

- line：直线，不支持控制点；
- polyline：折线，支持多个控制点；
- arc：圆弧线；
- quadratic：二阶贝塞尔曲线；
- cubic：三阶贝塞尔曲线；
- cubic-vertical：垂直方向的三阶贝塞尔曲线，不考虑用户从外部传入的控制点；
- cubic-horizontal；水平方向的三阶贝塞尔曲线，不考虑用户从外部传入的控制点；
- loop：自环。

这些内置边的默认样式分别如下图所示。<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1570858853371-d9c7fea4-5e7b-42e1-a2f4-559a70298149.png#align=left&display=inline&height=135&name=image.png&originHeight=270&originWidth=1768&search=&size=74956&status=done&width=884' width='750' height='200' />

## 内置边类型说明
下面表格中显示了内置的各类边，同时对一些特殊的字段进行了说明：

| 名称 | 描述 |  |
| --- | --- | --- |
| line | 连接两个节点的直线：<br />- controlPoints 不生效<br />- 更多配置详见 line 边的配置<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570858805015-2171552a-56fc-44f9-a8d0-608de6aeb3f8.png#align=left&display=inline&height=36&name=image.png&originHeight=72&originWidth=210&search=&size=6061&status=done&width=105) |
| polyline | 多段线段构成的折线，连接两个端点：<br />- controlPoints 表示所有线段的拐点，不指定时根据 [A* 算法](https://yuque.alibaba-inc.com/antv/blog/polyline-edges-with-border-radius)自动生成折线<br />- 更多配置详见 polyline 边的配置<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570858897304-9b5e3045-4b8c-4e84-8373-7fda9ca2193a.png#align=left&display=inline&height=105&name=image.png&originHeight=210&originWidth=222&search=&size=12334&status=done&width=111) |
| arc | 连接两个节点的一段圆弧：<br />- controlPoints 不生效<br />- 使用 curveOffset 指定弧的弯曲程度，其正负影响弧弯曲的方向<br />- 更多配置详见 arc 边的配置<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570858921616-3dc5034d-ede0-425f-874b-620af6fe2dc9.png#align=left&display=inline&height=49&name=image.png&originHeight=98&originWidth=218&search=&size=8131&status=done&width=109) |
| quadratic | 只有一个控制点的曲线：<br />- controlPoints 不指定时，会默认线的一半处弯曲<br />- 更多配置详见 quadratic 边的配置<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570858940562-cea717dc-c0be-4bd1-af07-0f71e22f9243.png#align=left&display=inline&height=48&name=image.png&originHeight=96&originWidth=214&search=&size=8780&status=done&width=107) |
| cubic | 有两个控制点的曲线：<br />- controlPoints 不指定时，会默认线的 1/3, 2/3 处弯曲<br />- 更多配置详见 cubic 边的配置<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570858972322-2ba56d44-bd65-4fbb-9de2-a0c4bbbc8e8d.png#align=left&display=inline&height=36&name=image.png&originHeight=72&originWidth=216&search=&size=8066&status=done&width=108) |
| cubic-vertical | 垂直方向的三阶贝塞尔曲线，不考虑用户从外部传入的控制点 | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570858985655-b18e4465-0534-4dbf-a097-460a967d1100.png#align=left&display=inline&height=109&name=image.png&originHeight=218&originWidth=222&search=&size=15336&status=done&width=111) |
| cubic-horizontal | 水平方向的三阶贝塞尔曲线，不考虑用户从外部传入的控制点 | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570858999282-e9e4d9c1-f2da-4804-975f-d4abed62933f.png#align=left&display=inline&height=114&name=image.png&originHeight=228&originWidth=206&search=&size=16769&status=done&width=103) |
| loop | 自环。更多配置详见 arc 边的配置 | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570859007824-5b9c3023-9851-4bda-917b-3216811d2e45.png#align=left&display=inline&height=56&name=image.png&originHeight=112&originWidth=76&search=&size=6558&status=done&width=38) |

## 边的通用属性
所有内置的边支持的通用属性：

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| id | false | String | 边编号 |
| source | true | String | Number | 起始点 id |
| target | true | String | 结束点 id |
| shape | false | String | 边图形，默认为 'line' |
| sourceAnchor | false | Number | 边的起始节点上的锚点的索引值 |
| targetAnchor | false | Number | 边的终止节点上的锚点的索引值 |
| style | false | Object | 边的样式属性 |
| label | false | String | 文本文字，如果没有则不会显示 |
| labelCfg | false | Object | 文本配置项 |


#### 样式属性 style
Object 类型。通过 `style` 配置来修改边的颜色、线宽等属性。下表是 `style` 对象中常用的配置项：

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| stroke | false | String | 边的颜色 |
| lineWidth | false | Number | 边宽度 |
| lineAppendWidth | false | Number | 边响应鼠标事件时的检测宽度，当 `lineWidth` 太小而不易选中时，可以通过该参数提升击中范围 |
| endArrow | false | Boolean | 边的结束端是否有箭头 |
| strokeOpacity | false | Number | 边透明度 |
| shadowColor | false | String | 阴影颜色 |
| shadowBlur | false | Number | 阴影范围 |
| shadowOffsetX | false | Number | 阴影 x 方向偏移量 |
| shadowOffsetX | false | Number | 阴影 y 方向偏移量 |
| ... |  |  |  |


下面代码演示在实例化图时全局配置方法中配置 `style`：
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // ... 其他属性
    style: {
      stroke: '#eaff8f',
      lineWidth: 5,
      // ... 其他属性
    }
  }
})
```

#### 标签文本 label 及其配置 labelCfg
`label` String 类型。标签文本的文字内容。<br />`labelCfg` Object 类型。配置标签文本。下面是 `labelCfg` 对象中的常用配置项：

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| refX | false | Number | 标签在 x 方向的偏移量 |
| refY | false | Number | 标签在 y 方向的偏移量 |
| position | false | String | 文本相对于边的位置，目前支持的位置有: `start`，`middle`, `end`。默认为`middle`。 |
| autoRotate | false | Boolean | 标签文字是否跟随边旋转，默认 `false` |
| style | false | Object | 标签的样式属性 |


上表中的标签的样式属性 `style` 的常用配置项如下： 

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| fill | false | String | 文本颜色 |
| stroke | false | String | 文本描边颜色 |
| lineWidth | false | Number | 文本描边粗细 |
| opacity | false | Number | 文本透明度 |
| font | false | String | 文本内容的当前字体属性 |
| fontSize | false | Number | 文本字体大小 |
| ... |  |  |  |


下面代码演示在实例化图时全局配置方法中配置 `label` 和 `labelCfg`。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultEdge: {
    // ... 其他属性
    label: 'edge-label',
    labelCfg: {
    	refY: -10,
      refX: 60
    }
  }
})
```

## 边的配置方法
配置边的方式有三种：实例化图时全局配置，在数据中动态配置，使用 `graph.edge(edgeFn)` 函数配置。这几种配置方法可以同时使用，优先级：

使用 graph.edge(edgeFn) 配置 > 数据中动态配置 > 实例化图时全局配置

即有相同的配置项时，优先级高的方式将会覆盖优先级低的。

### 实例化图时全局配置
用户在实例化 Graph 时候可以通过 `defaultEdge` 配置边，这里的配置是全局的配置，将会在所有边上生效。
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

### 在数据中动态配置
如果需要使不同边有不同的配置，可以将配置写入到边数据中。这种配置方式可以通过下面代码的形式直接写入数据，也可以通过遍历数据的方式写入。
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
  },{
    source: 'node1',
    target: 'node2'
    shape: 'cubic',
    ... // 其他配置
    style: {
      ...  // 样式属性，每种边的详细样式属性参见各边文档
    }
  },
    ... // 其他边
  ]
}
```

### 使用 graph.edge(edgeFn) 配置
该方法可以为不同边进行不同的配置。<br />提示：

- 该方法必须**在 render 之前调用**，否则不起作用；
- 由于该方法优先级最高，将覆盖其他地方对边的配置，这可能将造成一些其他配置不生效的疑惑；
- 该方法在增加元素、更新元素时会被调用，如果数据量大、每条边上需要更新的内容多时，可能会有性能问题。
```javascript
// const data = ...
// const graph = ...
graph.edge((edge) => {
  return {
    id: edge.id,
    shape: 'polyline',
    style: {
      fill: 'steelblue'
    }
  }
});

graph.data(data);
graph.render();
```

## 实例演示
```javascript
const data = {
  nodes: [
    {id: '1', x: 50, y: 50, size: 20},
    {id: '2', x: 150, y: 50, size: 20},
    {id: '3', x: 200, y: 50, size: 20},
    {id: '4', x: 300, y: 130, size: 20},
    {id: '5', x: 350, y: 50, size: 20},
    {id: '6', x: 450, y: 50, size: 20},
    {id: '7', x: 500, y: 50, size: 20},
    {id: '8', x: 600, y: 50, size: 20},
    {id: '9', x: 650, y: 50, size: 20},
    {id: '10', x: 750, y: 50, size: 20},
    {id: '11', x: 800, y: 50, size: 20},
    {id: '12', x: 900, y: 150, size: 20},
    {id: '13', x: 950, y: 50, size: 20},
    {id: '14', x: 1050, y: 150, size: 20},
    {id: '15', x: 1100, y: 50, size: 20},
  ],
  edges: [
    {source: '1', target: '2', shape: 'line', label: 'line'},
    {source: '3', target: '4', shape: 'polyline', label: 'polyline'},
    {source: '5', target: '6', shape: 'arc', label: 'arc'},
    {source: '7', target: '8', shape: 'quadratic', label: 'quadratic'},
    {source: '9', target: '10', shape: 'cubic', label: 'cubic'},
    {source: '11', target: '12', shape: 'cubic-vertical', label: 'cubic-vertical'},
    {source: '13', target: '14', shape: 'cubic-horizontal', label: 'cubic-horizontal'},
    {source: '15', target: '15', shape: 'loop', label: 'loop'}
  ]
}

const graph = new G6.Graph({
	container: 'mountNode',
  width: 1500,
  height: 300,
  linkCenter: true      // 使边连入节点的中心
});
graph.data(data);
graph.render();
```

显示结果：<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1570858853371-d9c7fea4-5e7b-42e1-a2f4-559a70298149.png#align=left&display=inline&height=135&name=image.png&originHeight=270&originWidth=1768&search=&size=74956&status=done&width=884' width='750' height='200' />

### 调整边的样式
可以在边上添加文本，修改边的样式。下面演示将配置写入数据的方式配置边。使用下面代码替换上面代码中的 9-10、11-12 两条边数据，修改这两条边的样式和其文本。
```javascript
// 使 9-10 的 cubic 边文本下移 15 像素
{
  source: '9', 
  target: '10', 
  shape: 'cubic',
  label: 'cubic',
  labelCfg: {
    refY: -15 // refY 默认是顺时针方向向下，所以需要设置负值
  }
},
// 设置 11-12 的 cubic-vertical 边的颜色、虚线、粗细，并设置文本样式、随边旋转
{
  source: '11', 
  target: '12',
  shape: 'cubic-vertical',
  color: '#722ed1',     // 边颜色
  size: 5,              // 边粗细
  style: {
  	lineDash: [2, 2]    // 虚线边
  },
  label: 'cubic-vertical',
  labelCfg: {
  	position: 'center', // 其实默认就是 center，这里写出来便于理解
    autoRotate: true,   // 使文本随边旋转
    style: {
      stroke: 'white',  // 给文本添加白边和白色背景
    	lineWidth: 5,     // 文本白边粗细
      fill: '#722ed1',  // 文本颜色
    }
  }
}
```

<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1570859444095-76fc5c73-0444-4636-b2a2-57eb1786987c.png#align=left&display=inline&height=138&name=image.png&originHeight=276&originWidth=1782&search=&size=81146&status=done&width=891' width='750' height='200' />

## 相关阅读

- [边的状态样式](https://www.yuque.com/antv/g6/fqnn9w) —— 交互过程中的样式变化。
