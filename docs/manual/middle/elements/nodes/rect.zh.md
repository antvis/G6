---
title: Rect
order: 2
---

G6 内置了 rect 节点，其默认样式如下。标签文本位于矩形中央。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*k2nBTozK6XsAAAAAAAAAAABkARQnAQ' width=100/>


## 使用方法
如 [内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode) 一节所示，配置节点的方式有两种：实例化图时全局配置，在数据中动态配置。


### 1 实例化图时全局配置
用户在实例化 Graph 时候可以通过 `defaultNode` 指定 `shape` 为 `'rect'`，即可使用 `rect` 节点。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'rect',
    // 其他配置
  }
});
```


### 2 在数据中动态配置
如果需要使不同节点有不同的配置，可以将配置写入到节点数据中。这种配置方式可以通过下面代码的形式直接写入数据，也可以通过遍历数据的方式写入。
```javascript
const data = {
  nodes: [{
	  id: 'node0',
    shape: 'rect',
    ... // 其他配置
    },
    ... // 其他节点
  ],
  edges: [
    ... // 边
  ]
};
```


## 配置项说明
rect 节点支持 [节点通用配置](/zh/docs/manual/middle/elements/nodes/defaultNode#节点的通用属性)，下表对部分属性进行解释。对于 Object 类型的配置项将在后面有详细讲解：

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| size | rect 的宽高 | Number | Array | `size` 为数组时：第一个值表示宽度，第二个表示高度；<br />`size` 为一个数值时：表示宽高相等 |
| style | rect 默认样式 | Object | Canvas 支持的属性 |
| label | 标签文本内容 | String |  |
| labelCfg | 标签配置项 | Object |  |
| stateStyles | 各状态下的样式 | Object | 只对 `keyShape` 起作用 |
| linkPoints | **视觉上的**四个锚点 | Object | 默认不显示，应与 [anchorPoints](/zh/docs/manual/middle/elements/nodes/defaultNode/#节点的通用属性) 配合使用。二者区别请看 [linkPoints](#linkpoints) |



### 样式属性 style
Object 类型。支持 [节点通用样式](/zh/docs/manual/middle/elements/nodes/defaultNode#样式属性-style)。通过 `style` 配置来修改 `rect` 的填充色、边框颜色、阴影等属性。

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| radius | 圆角半径 | Number | 默认为直角矩形 |
| stroke | 描边颜色 | String |  |
| lineWidth | 描边粗细 | Number | 默认为 `1` |
| fill | 填充色 | String |  |
| fillOpacity | 透明度 | Number | 默认为 `1` |


下面代码演示在实例化图时全局配置方法中配置 `style`，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EFtLTp134y8AAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  nodes: [{
    x: 100,
    y: 100,
    shape: 'rect',
    label: 'rect'
 }]
};

const graph = new G6.Graph({
	container: 'mountNode',
  width: 500,
  height: 300,
  defaultNode: {
    // shape: 'rect', // 在数据中已经指定了 shape，这里无需再次指定
    style: {
    	fill: '#bae637',
      stroke: '#eaff8f',
      lineWidth: 5,
      radius: 10
    }
  },
});
graph.data(data);
graph.render();
```


### 标签文本配置 labelCfg
Object 类型。通过 `labelCfg` 配置标签文本。支持 [节点通用标签配置](/zh/docs/manual/middle/elements/nodes/defaultNode/#标签文本-label-及其配置-labelcfg)。基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `labelCfg` 配置项进行文本的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bAjNR7yF1uIAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他配置
  defaultNode: {
    // ... 其他配置
    labelCfg: {
      style: {
      	fill: '#9254de',
        fontSize: 18
      },
    	position: 'bottom'
    }
  }
});
// ...
```


### linkPoints
Object 类型。通过配置 `linkPoints` ，可以指定矩形周围「上、下、左、右」四个小圆点。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️注意:</strong></span>区分于 `anchorPoints`：
`anchorPoints` 是真正用于指定该节点相关边的连入位置的「**数组**」，见 [anchorPoints](/zh/docs/manual/middle/keyconcept/anchorpoint)；
而 `linkPoints` 仅是指定是否「**绘制**」出四个圆点，不起实际的连接相关边的作用。二者常常配合使用。

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| top | 是否显示上部的圆点 | Boolean | 默认为 `false` |
| bottom | 是否显示底部的圆点 | Boolean | 默认为 `false` |
| left | 是否显示左侧的圆点 | Boolean | 默认为 `false` |
| right | 是否显示右侧的圆点 | Boolean | 默认为 `false` |
| size | 圆点的大小 | Number | 默认为 `3` |
| fill | 圆点的填充色 | String | 默认为 `'#72CC4A'` |
| stroke | 圆点的边框颜色 | String | 默认为 `'#72CC4A'` |
| lineWidth | 圆点边框的宽度 | Number | 默认为 `1` |


基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `linkPoints` 配置项进行连入点的配置。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vsLASZHBX88AAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他配置
  defaultNode: {
    // 其他配置
    linkPoints: {
      top: true,
      bottom: true,
      left: true,
      right: true,
      size: 5,
      fill: '#fff'
    }
  }
});
// ...
```
