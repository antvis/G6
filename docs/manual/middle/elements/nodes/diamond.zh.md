---
title: Diamond
order: 4
---
## Diamond

G6 内置了菱形 Diamond 节点，其默认样式如下。标签文本位于菱形中央。<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xS0cQKTywjkAAAAAAAAAAABkARQnAQ' width=100/>


## 使用方法
如 [内置节点](../defaultNode) 一节所示，配置节点的方式有两种：实例化图时全局配置，在数据中动态配置。


### 1 实例化图时全局配置
用户在实例化 Graph 时候可以通过 `defaultNode` 指定 `shape` 为 `'diamond'`，即可使用 `diamond` 节点。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'diamond',
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
    shape: 'diamond',
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
Diamond 节点支持以下的配置项，对于 Object 类型的配置项将在后面有详细讲解：

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| size | 菱形的宽高 | Number / Array | size 为一个数值时，宽高相同 |
| style | diamond 默认样式 | Object | Canvas 支持的属性 |
| labelCfg | 标签文本配置项 | Object |  |
| stateStyles | 各状态下的样式 | Object | 只对 keyShape 起作用 |
| linkPoints | 菱形上的链接点 | Object | 默认不显示 |
| icon | 菱形上icon配置 | Object | 默认不显示 icon |



### 样式属性 style
Object 类型。通过 `style` 配置来修改节点的填充色、描边等属性。下面代码演示在实例化图时全局配置方法中配置 `style`，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*t7w7RpKZVGkAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  nodes: [{
    x: 100,
    y: 100,
    shape: 'diamond',
    label: 'diamond'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // shape: 'diamond', // 数据中已指定 shape，这里无需再次指定
    size: [200, 80],
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
Object 类型。通过 `labelCfg` 配置标签文本。基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `labelCfg` 配置项进行文本的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Pmb6QITup3wAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他属性
  defaultNode: {
    // ... 节点其他属性
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


### 边的连入点 linkPoints
Object 类型。通过配置 `linkPoints` ，可以指定菱形周围「上、下、左、右」四个方向上边的连入点。

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| top | 是否显示上部的连接点 | Boolean | 默认为 `false` |
| bottom | 是否显示底部的连接点 | Boolean | 默认为 `false` |
| left | 是否显示左侧的连接点 | Boolean | 默认为 `false` |
| right | 是否显示右侧的连接点 | Boolean | 默认为 `false` |
| size | 连接点的大小 | Number | 默认为 `3` |
| fill | 连接点的填充色 | String | 默认为 `#72CC4A` |
| stroke | 连接点的边框颜色 | String | 默认为 `#72CC4A` |
| lineWidth | 连接点边框的宽度 | Number | 默认为 `1` |


基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `linkPoints` 配置项进行连入点的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HoovQZW391AAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他属性
  defaultNode: {
    // ... 节点其他属性
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


### 图标 icon
Object 类型。通过配置 `icon`，可以在圆上显示小图标。

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| show | 是否显示icon | Boolean | 默认为 `false`，不显示 |
| width | icon 的宽度 | Number | 默认为 `16` |
| height | icon 的高度 | Number | 默认为 `16` |
| img | icon 的地址 | String |  |


下面代码演示在实例化图时全局配置方法中配置 `icon`。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rmsFSJd6kXUAAAAAAAAAAABkARQnAQ' width=100/>
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他属性
  defaultNode: {
    // ... 节点其他属性
    icon: {
      show: true,
      width: 25,
      height: 25
    }
  }
});
// ...
```
