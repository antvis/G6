---
title: Triangle
order: 5
---
## Triangle

G6 内置了三角形 Triangle 节点，其默认样式如下。标签文本位于三角形下方。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FY1XQZHEc6YAAAAAAAAAAABkARQnAQ' width=100/>


## 使用方法
如 [内置节点](../defaultNode) 一节所示，配置节点的方式有两种：实例化图时全局配置，在数据中动态配置。


### 1 实例化图时全局配置
用户在实例化 Graph 时候可以通过 `defaultNode` 指定 `shape` 为 `'triangle'`，即可使用 `triangle` 节点。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'triangle',
    // 其他配置
  }
})
```


### 2 在数据中动态配置
如果需要使不同节点有不同的配置，可以将配置写入到节点数据中。这种配置方式可以通过下面代码的形式直接写入数据，也可以通过遍历数据的方式写入。
```javascript
const data = {
  nodes: [{
	  id: 'node0',
    shape: 'triangle',
    ... // 其他配置
    },
    ... // 其他节点
  ],
  edges: [
    ... // 边
  ]
}
```


## 配置项说明
triangle 节点支持以下的配置项：

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| size | 三角形的边长 | Number | Array | size为数组时取第一个值 |
| **direction** | **三角形的方向** | **String** | **可取值：`'up'`，`'down'`，`'left'`，`'right'`。默认为 `'up'`** |
| style | 三角形默认样式 | Object | Canvas 支持的属性 |
| labelCfg | 标签文本配置项 | Object |  |
| stateStyles | 各状态下的样式 | Object | 只对 keyShape 起作用 |
| linkPoints | 三角形上的链接点 | Object | 默认不显示 |
| icon | 三角形上 icon 配置 | Object | 默认不显示 icon |



### 三角形方向 direction
String 类型。可取值有：`'``up'`、`'down'`、`'left'`、`'right'`。默认为 `'``up'`。通过设置 `direction`，可以修改三角形的方向。下面代码演示在实例化图时全局配置方法中配置 `direction`。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'triangle',
    direction: 'down'
  }
})
```
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HuGHTrWfGYsAAAAAAAAAAABkARQnAQ' width=100/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hsOBSo1sFFAAAAAAAAAAAABkARQnAQ' width=100/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*irgPRrU3JdEAAAAAAAAAAABkARQnAQ' width=100/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yxEXQK-P4nsAAAAAAAAAAABkARQnAQ' width=100/>

> 上图分别是将 `direction` 配置为 `'up'`，`'down'`，`'left'`，`'right'` 的结果



### 样式属性 style
Object 类型。通过 `style` 配置来修改节点的填充色、描边等属性。下面代码演示在实例化图时全局配置方法中配置 `style`，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6-qaTJkpsKYAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  nodes: [{
    x: 100,
    y: 100,
    shape: 'triangle',
    label: 'triangle'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // shape: 'triangle', // 在数据中已经指定 shape，这里无需再次指定
    direction: 'up',
    size: 100,
    style: {
      fill: '#bae637',
      stroke: '#eaff8f',
      lineWidth: 5
    }
  }
});
graph.data(data);
graph.render();
```


### 标签文本配置 labelCfg
Object 类型。通过 `labelCfg` 配置标签文本。基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `labelCfg` 配置项进行文本的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5KkKRaDXqXgAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他属性
  defaultNode: {
    // ... 节点其他属性
    labelCfg: {
      position: 'center',
      style: {
        fill: '#9254de',
        fontSize: 18
      }
    }
  }
});
// ...
```


### 边的连入点 linkPoints
Object 类型。通过配置 `linkPoints` ，可以指定节点上「上、下、左、右」四个方向上边的连入点。

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| top | 是否显示上部的连接点 | Boolean | 默认为 `false` |
| bottom | 是否显示底部的连接点 | Boolean | 默认为 `false` |
| left | 是否显示左侧的连接点 | Boolean | 默认为 `false` |
| right | 是否显示右侧的连接点 | Boolean | 默认为 `false` |
| size | 连接点的大小 | Number | 默认为 `3` |
| fill | 连接点的填充色 | String | 默认为 `'#72CC4A'` |
| stroke | 连接点的边框颜色 | String | 默认为 `'#72CC4A'` |
| lineWidth | 连接点边框的宽度 | Number | 默认为 `1` |


基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `linkPoints` 配置项进行连入点的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aB-PT4nzU_oAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
	// ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他属性
  defaultNode: {
    // ... 其他属性
    linkPoints: {
      top: true,
      bottom: true,
      left: true,
      right: true,
      fill: '#fff',
      size: 5
    }
  }
});
// ...
```


### 图标 icon
Object 类型。通过配置 `icon`，可以在圆上显示小图标。

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| show | 是否显示 icon | Boolean | 默认为 false，不显示 |
| width | icon 的宽度 | Number | 默认为 16 |
| height | icon 的高度 | Number | 默认为 16 |
| img | icon 的图片地址 | String | 默认有一个如下图中的图片 |
| **offset** | **icon 的偏移量** | **Number** | **默认为 0，triangle 节点的 icon 特有的配置** |


基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `icon` 配置项进行图标的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2w62R5ZYtVAAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
	// ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他属性
  defaultNode: {
    // ... 其他属性
    icon: {
      show: true,
      width: 30,
      height: 30,
      offset: 20
    }
  }
});
// ...
```
