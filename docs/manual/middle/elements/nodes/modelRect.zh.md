---
title: modelRect
order: 8
---

G6 内置了方形卡片 modelRect 节点，其默认样式如下。标签文本位于卡片下方。
<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XZiKQbvTSS0AAAAAAAAAAABkARQnAQ' width='223' height='102' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*tCcvRrNkAgUAAAAAAAAAAABkARQnAQ' width='223' height='98' />


<br />说明 数据中无 `description` 字段时，则不显示描述信息。


## 使用方法
如 [内置节点](../defaultNode) 一节所示，配置节点的方式有两种：实例化图时全局配置，在数据中动态配置。


### 1 实例化图时全局配置
用户在实例化 Graph 时候可以通过 `defaultNode` 指定 `shape` 为 `'modelRect'`，即可使用 `modelRect` 节点。
```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'modelRect',
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
    shape: 'modelRect',
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
modelRect 节点支持以下的配置项，对于 Object 类型的配置项将在后面有详细讲解：

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| size | 圆的直径 | Number | Array | `size` 为数组时，取第一个值 |
| style | circle 默认样式 | Object | Canvas 支持的属性 |
| labelCfg | 文件配置项 | Object |  |
| stateStyles | 各状态下的样式 | Object | 只对 keyShape 起作用 |
| linkPoints | 相关边的连入点 | Object | 默认不显示 |
| icon | 圆上 icon 配置 | Object | 默认不显示 icon |


```javascript
    // 节点中icon配置
    logoIcon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: true,
      x: 0,
      y: 0,
      // icon的地址，字符串类型
      img: 'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
      width: 16,
      height: 16,
      // 用于调整图标的左右位置
      offset: 0
    },
    // 节点中表示状态的icon配置
    stateIcon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: true,
      x: 0,
      y: 0,
      // icon的地址，字符串类型
      img: 'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
      width: 16,
      height: 16,
      // 用于调整图标的左右位置
      offset: -5
    }
```

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| size | modelRect的宽高 | Number | Array | `size` 为 Array 时：第一个值表示宽度，第二个表示高度；<br />`size` 为 Number 时：表示宽高相等 |
| style | modelRect默认样式 | Object | Canvas 支持的属性 |
| labelCfg | 文件配置项 | Object |  |
| stateStyles | 各状态下的样式 | Object | 只对 keyShape 起作用 |
| linkPoints | modelRect上的链接点 | Object | 默认不显示 |
| **preRect** | **左侧的小矩形** | **Object** | **modelRect 节点特有** |
| **logoIcon** | **左侧的logo图标** | **Object** | **modelRect 节点特有** |
| **stateIcon** | **右侧的状态图标** | **Object** | **modelRect 节点特有** |



### 样式属性 style
Object 类型。通过 `style` 配置来修改节点的填充色、描边等属性。下面代码演示在实例化图时全局配置方法中配置 `style`，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cJeKS59n4FAAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  nodes: [{
    x: 100,
    y: 100,
    shape: 'modelRect',
    label: 'modelRect'
 }]
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // shape: 'modelRect',  // 在数据中已经指定 shape，这里无需再次指定
    size: [200, 80],
    style: {
      fill: '#f0f5ff',
      stroke: '#adc6ff',
      lineWidth: 2
    }
  }
});
graph.data(data);
graph.render();
```


### 标签文本配置 labelCfg
Object 类型。通过 `labelCfg` 配置标签文本。基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `labelCfg` 配置项进行文本的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*x_XKQq4m3IkAAAAAAAAAAABkARQnAQ' width=150/>
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
      }
    }
  }
});
// ...
```


### 边的连入点 linkPoints
Object 类型。通过配置 `linkPoints` ，可以指定 modelRect 周围「上、下、左、右」四个方向上边的连入点。

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| top | 是否显示上部的连接点 | Boolean | 默认为 `false` |
| bottom | 是否显示底部的连接点 | Boolean | 默认为 `false` |
| left | 是否显示左侧的连接点 | Boolean | 默认为 `false` |
| right | 是否显示右侧的连接点 | Boolean | 默认为 `false` |
| size | 连接点的大小 | Number | 默认为 3 |
| fill | 连接点的填充色 | String | 默认为 `'#``72CC4A'` |
| stroke | 连接点的边框颜色 | String | 默认为 `'#``72CC4A'` |
| lineWidth | 连接点边框的宽度 | Number | 默认为 1 |


基于上面 [样式属性 style](#819eF) 中的代码，下面代码在 `defaultNode` 中增加了 `linkPoints` 配置项进行连入点的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Tp2WQ70bCGgAAAAAAAAAAABkARQnAQ' width=150/>
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


### 左侧矩形 preRect
通过 `preRect` 可以配置左侧的小矩形形状。

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| show | 是否显示左侧小矩形 | Boolean | 默认为 `true` |
| width | 左侧小矩形的宽度 | Number | 默认为 4 |
| fill | 左侧小矩形的填充色 | String | 默认为 `'#40a9ff'` |
| radius | 左侧小矩形的圆角弧度 | Number | 默认为 2 |


基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `preRect` 配置项进行左侧小矩形的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yh43Sa3LeVcAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他属性
  defaultNode: {
    // ... 节点其他属性
    preRect: {
      // 设置为false，则不显示
      show: true,
      fill: '#f759ab',
      width: 8
    },
  }
});
// ...
```


### 图标 logoIcon / stateIcon
通过 `logoIcon` 和 `stateIcon` 可以配置左侧的 logo 小图标和右边的状态小图标，这两个的配置项完全相同。

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| show | 是否显示图标 | Boolean | 默认为 `true` |
| img | 图标图片 | String | <br />- 左侧图标 `logoIcon` 的图片默认为 <img src='' width=150/><br />- 右侧图标 `stateIcon` 的图片默认为<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KpqSS4INnRUAAAAAAAAAAABkARQnAQ' width=150/><br /> |
| width | 图标的宽度 | Number | 默认为 16 |
| height | 图标的高度 | Number | 默认为 16 |
| offset | 图标的左右偏移量 | Number | <br />- 左侧图标 `logoIcon` 的 `offset` 默认为 0<br />- 右侧图标 `stateIcon` 的 `offset` 默认为 -5<br /> |


基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultNode` 中增加了 `logoIcon` 和 `stateIcon` 配置项进行左右图标的配置，使之达到如下图效果，左侧图标不显示，右侧图标更换图片。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rnW7QYNJvhcAAAAAAAAAAABkARQnAQ' width=150/>
```javascript
const data = {
  // ... data 内容
};
const graph = new G6.Graph({
  // ... 图的其他属性
  defaultNode: {
    // ... 节点其他属性
    logoIcon: {
      show: false
    },
    stateIcon: {
      show: true,
      img: 'https://gw.alipayobjects.com/zos/basement_prod/c781088a-c635-452a-940c-0173663456d4.svg'
    }
  }
});
// ...
```
