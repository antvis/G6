---
title: 内置的节点
order: 2
---

G6 默认提供的节点是一个基础图形加一个文本图形的实现。可选的内置节点包括 circle，rect，ellipse，diamond，triangle，star，image，modelRect，这些内置节点的默认样式分别如下图所示。<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1570852701188-ea33cdb0-71c4-4d53-8827-01912934e7de.png#align=left&display=inline&height=103&name=image.png&originHeight=206&originWidth=1528&search=&size=135825&status=done&width=764' width='750' height='100'>

## 内置节点类型说明
下面表格中显示了内置的各类节点，同时对一些特殊的字段进行了说明：

| 名称 | 描述 | 默认示例 |
| --- | --- | --- |
| circle | 圆形：<br />- `size` 是单个数字，表示直径<br />- 圆心位置对应节点的位置<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在节点中央<br />- 更多字段见 [circle 节点的配置]()<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570852503218-902e8221-e7e7-49c5-911f-ec3cabe7e04f.png#align=left&display=inline&height=56&name=image.png&originHeight=112&originWidth=110&search=&size=13270&status=done&width=55) |
| rect | 矩形：<br />- `size` 是数组，例如：[100, 50]<br />- 矩形的中心位置是节点的位置，而不是左上角<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在节点中央<br />- 更多字段见 [rect 节点的配置](https://www.yuque.com/antv/g6/vdqpdt#qWf35)<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570852565858-345455f4-2ddb-4c40-9c8a-67e337a9e746.png#align=left&display=inline&height=38&name=image.png&originHeight=76&originWidth=178&search=&size=5514&status=done&width=89) |
| ellipse | 椭圆：<br />- `size` 是数组，表示椭圆的长和宽<br />- 椭圆的圆心是节点的位置<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在节点中央<br />- 更多字段见 [ellipse 节点的配置](https://www.yuque.com/antv/g6/pxt157#qWf35)<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570852588313-3dcaee5b-b2aa-45d6-99be-6f4c56d494f1.png#align=left&display=inline&height=63&name=image.png&originHeight=126&originWidth=216&search=&size=19099&status=done&width=108) |
| diamond | 菱形：<br />- `size` 是数组，表示菱形的长和宽<br />- 菱形的中心位置是节点的位置<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在节点中央<br />- 更多字段见 [diamond 节点的配置](https://www.yuque.com/antv/g6/ilnhgt#qWf35)<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570852597814-e4e4585a-fbe0-41a4-af92-a2de2f837220.png#align=left&display=inline&height=92&name=image.png&originHeight=184&originWidth=178&search=&size=20859&status=done&width=89) |
| triangle | 三角形：<br />- `size` 是数组，表示三角形的长和高<br />- 三角形的中心位置是节点的位置<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在节点下方<br />- 更多字段见 [triangle 节点的配置](https://www.yuque.com/antv/g6/sfcm38#qWf35)<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570852606815-2f8526a8-1349-452e-a9f7-dccb37be57f9.png#align=left&display=inline&height=78&name=image.png&originHeight=156&originWidth=126&search=&size=11213&status=done&width=63) |
| star | 星形：<br />- `size` 是单个数字，表示星形的大小<br />- 星星的中心位置是节点的位置<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在节点中央<br />- 更多字段见 [star 节点的配置](https://www.yuque.com/antv/g6/gwn2mq#qWf35)<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570852618082-bfe59c69-08ce-4538-be49-ee72984c4830.png#align=left&display=inline&height=99&name=image.png&originHeight=198&originWidth=194&search=&size=24192&status=done&width=97) |
| image | 图片：<br />- `size` 是数组，表示图片的长和宽<br />- 图片的中心位置是节点位置<br />- `img` 图片的路径，也可以在 `style` 里面设置<br />- `color` 字段不生效<br />- 标签文本默认在节点下方<br />- 更多字段见 [image 节点的配置](https://www.yuque.com/antv/g6/ng8a0q#qWf35)<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570852649476-7c6c4aeb-8172-4a69-a6a3-b6cd24d7ea46.png#align=left&display=inline&height=67&name=image.png&originHeight=134&originWidth=112&search=&size=16354&status=done&width=56) |
| modelRect | 菱形：<br />- `size` 是数组，表示菱形的长和宽<br />- 菱形的中心位置是节点的位置<br />- `color` 字段默认在描边上生效<br />- 标签文本默认在节点中央<br />- 若有 `description` 字段则显示在标签文本下方显示 `description` 内容<br />- 更多字段见 [modelRect 节点的配置](https://www.yuque.com/antv/g6/sdfcpq#qWf35)<br /> | ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570852629046-62c03494-82ac-4e76-b3b4-9ca242d9459a.png#align=left&display=inline&height=74&name=image.png&originHeight=148&originWidth=324&search=&size=15378&status=done&width=162)<br /> ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570852931313-42f193db-c9f0-4098-af7f-6c5eaf32923a.png#align=left&display=inline&height=69&name=image.png&originHeight=138&originWidth=316&search=&size=17261&status=done&width=158) |


## 节点的通用属性
所有内置的节点支持的通用属性：

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| id | true | String | 节点编号 |
| x | false | Number | x 坐标 |
| y | false | Number |  y 坐标 |
| shape | false | String | 节点图形，默认为 `'circle'` |
| size | false | Number | Array | 节点的大小 |
| anchorPoints | false | Array | 指定边连如节点的连接点的位置（相对于该节点而言），可以为空。例如: `[0, 0]`，代表节点左上角的锚点，`[1, 1]`,代表节点右下角的锚点。 |
| style | false | Object | 节点的样式属性 |
| label | false | String | 文本文字 |
| labelCfg | false | Object | 文本配置项 |


#### 样式属性 style
Object 类型。通过 `style` 配置来修改节点的填充色、边框颜色、阴影等属性。下表是 `style` 对象中常用的配置项：

| 名称 | 是否必须 | 类型 | 备注 |
| --- | --- | --- | --- |
| fill | false | String | 节点填充色 |
| stroke | false | String | 节点的描边颜色 |
| lineWidth | false | Number | 描边宽度 |
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
  defaultNode: {
    // ... 其他属性
    style: {
      fill: '#steelblue',
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
| position | false | String | 文本相对于节点的位置，目前支持的位置有:  `'center'`，`'top'`，`'left'`，`'right'`，`'bottom'`。默认为 `'center'`。 |
| offset | false | Number | Array | 文本的偏移，在 `'top'`，`'left'`，`'right'`，`'bottom'` 位置上的偏移量 |
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
  defaultNode: {
    // ... 其他属性
    label: 'node-label',
    labelCfg: {
    	position: 'bottom',
      offset: [10, 10, 10, 10],
      style: {
      	fill: '#666'
      }
    }
  }
})
```

## 节点的配置方法
配置节点的方式有三种：实例化图时全局配置，在数据中动态配置，使用 `graph.node(nodeFn)` 函数配置。这几种配置方法可以同时使用，优先级：

使用 graph.node(nodeFn) 配置 > 数据中动态配置 > 实例化图时全局配置

即有相同的配置项时，优先级高的方式将会覆盖优先级低的。


### 实例化图时全局配置
用户在实例化 Graph 时候可以通过 `defaultNode` 配置节点，这里的配置是全局的配置，将会在所有节点上生效。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'circle',
    // 其他配置
  }
})
```

### 在数据中动态配置
如果需要为不同节点进行不同的配置，可以将配置写入到节点数据中。这种配置方式可以通过下面代码的形式直接写入数据，也可以通过遍历数据的方式写入。
```
const data = {
  nodes: [{
    id: 'node0',
    size: 100,
    shape: 'rect',
    ...    // 其他属性
    style: {
      ...  // 样式属性，每种节点的详细样式属性参见各节点文档
    }
  },{
    id: 'node1',
    size: [50, 100],
    shape: 'ellipse',
    ...    // 其他属性
    style: {
      ...  // 样式属性，每种节点的详细样式属性参见各节点文档
    }
  },
    ... // 其他节点
  ],
  edges: [
    ... // 边
  ]
}
```

### 使用 graph.node(nodeFn) 配置
该方法可以为不同节点进行不同的配置。<br />提示：

- 该方法必须**在 render 之前调用**，否则不起作用；
- 由于该方法优先级最高，将覆盖其他地方对节点的配置，这可能将造成一些其他配置不生效的疑惑；
- 该方法在增加元素、更新元素时会被调用，如果数据量大、每个节点上需要更新的内容多时，可能会有性能问题。

```
// const data = ...
// const graph = ...
graph.node((node) => {
  return {
    id: node.id,
    shape: 'rect',
    style: {
      fill: 'blue'
    }
  }
});

graph.data(data);
graph.render();
```

## 实例演练

```
const data = {
  nodes: [{
    x: 100,
    y: 100,
    shape: 'circle',
    label: 'circle',
 },{
    x: 200,
    y: 100,
    shape: 'rect',
   	label: 'rect',
 },{
    id: 'node-ellipse',
    x: 330,
    y: 100,
    shape: 'ellipse',
   	label: 'ellipse'
 },{
    id: 'node-diamond',
    x: 460,
    y: 100,
    shape: 'diamond',
   	label: 'diamond'
 },{
    id: 'node-triangle',
    x: 560,
    y: 100,
    //size: 80,
    shape: 'triangle',
   	label: 'triangle'
 },{
    id: 'node-star',
    x: 660,
    y: 100,
    //size: [60, 30],
    shape: 'star',
   	label: 'star'
 },{
    x: 760,
    y: 100,
    size: 50,
    shape: 'image',
    img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
   	label: 'image',
 },{
    id: 'node-modelRect',
    x: 900,
    y: 100,
    shape: 'modelRect',
   	label: 'modelRect'
 }]
};

const graph = new G6.Graph({
	container: 'mountNode',
  width: 1500,
  height: 300
});
graph.data(data);
graph.render();
```


显示结果：
<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1570866064078-162301ab-e5c6-41c0-8009-030aba5ac216.png#align=left&display=inline&height=98&name=image.png&originHeight=196&originWidth=1530&search=&size=123948&status=done&width=765' width='750' height='100'>

- triangle 节点和 image 节点的标签文本默认位置为：`position:'bottom'` ，其他节点文本的默认位置都为：`position: 'center'`；

### 调整节点配置

下面演示通过将配置写入数据的方式，调整 `id` 为 `'node-ellipse'` 的椭圆节点的文本位置，颜色和样式。将下面代码替换上面代码中 `id` 为 `'node-ellipse'` 的节点数据即可生效。

```
{
  id: 'node-ellipse',
  x: 330,
  y: 100,
  shape: 'ellipse',	
  size: [60, 30],
  label: 'ellipse',
  labelCfg: {
    position: 'bottom',
    offset: 5
  },
  style: {
    fill: '#fa8c16',
    stroke: '#000',
    lineWidth: 2
  }
}
```

<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1570866208293-efddc382-b519-421a-a50c-20a5b6651995.png#align=left&display=inline&height=110&name=image.png&originHeight=220&originWidth=1556&search=&size=126345&status=done&width=778' width='750' height='100'>

再为 `id` 为 `'node-modelRect'` 的 modelRect 节点添加描述文字，使用下面代码替换 `id` 为 `'node-modelRect'` 的节点数据即可得到带有内容为 '描述文本xxxxxxxxxxx' 的 modelRect 节点。
```
{
  id: 'node-modelRect',
  x: 900,
  y: 100,
  description: '描述文本xxxxxxxxxxx',
  shape: 'modelRect',
  label: 'modelRect'
}
```

<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1570866381579-8296a2bb-9f23-45a5-b229-fe82b55a7a5b.png#align=left&display=inline&height=110&name=image.png&originHeight=220&originWidth=1524&search=&size=135905&status=done&width=762' width='750' height='100'>

## 相关阅读

- [节点的状态样式](https://www.yuque.com/antv/g6/fqnn9w) —— 交互过程中的样式变化。
