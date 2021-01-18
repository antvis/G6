---
title: Image
order: 7
---

## Image

G6 内置了 image 节点，其默认样式如下。标签文本位于图片下方。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aHqIQIXL0RMAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## 使用方法

如 [内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode) 一节所示，配置节点的方式有三种：实例化图时全局配置，在数据中动态配置，使用 `graph.node(nodeFn)` 函数配置。这几种配置方法可以同时使用，优先级：

使用 `graph.node(nodeFn)` 配置 > 数据中动态配置 > 实例化图时全局配置

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 除 `id`、`label` 应当配置到每个节点数据中外，其余的 [节点的通用属性](/zh/docs/manual/middle/elements/nodes/defaultNode#节点的通用属性) 以及各个节点类型的特有属性（见内置节点类型）均支持这三种配置方式。

### 1 实例化图时全局配置

用户在实例化 Graph 时候可以通过 `defaultNode` 指定 `type` 为 `'image'`，即可使用 `image` 节点。

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    type: 'image',
    label: 'AntV Team',
    // 其他配置
  },
});
```

### 2 在数据中动态配置

如果需要使不同节点有不同的配置，可以将配置写入到节点数据中。这种配置方式可以通过下面代码的形式直接写入数据，也可以通过遍历数据的方式写入。

```javascript
const data = {
  nodes: [{
    id: 'node0',
  	img: 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
    type: 'image',
    size: 200,
    label: 'AntV Team',
    labelCfg: {
      position: 'bottom'
    },
    // 裁剪图片配置
    clipCfg: {
      show: false,
      type: 'circle',
      r: 15
    }
  },
    ... // 其他节点
  ],
  edges: [
    ... // 边
  ]
}
```

## 配置项说明

image 节点支持 [节点通用配置](/zh/docs/manual/middle/elements/nodes/defaultNode#节点的通用属性)，下表对部分属性进行解释：

```javascript
img: 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
size: 200,
  labelCfg: {
    position: 'bottom'
  },
  // 裁剪图片配置
  clipCfg: {
    show: false,
    type: 'circle',
    // circle
    r: 15,
    // ellipse
    rx: 10,
    ry: 15,
    // rect
    width: 15,
    height: 15,
    // 坐标
    x: 0,
    y: 0
  }
```

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- | --- |
| **img** | **图片 URL 地址** | **String** | **image 节点特有** |
| size | 图片大小 | Number | Array | `size` 为单个值时，表示宽高相等 |
| label | 标签文本内容 | String |  |
| labelCfg | 标签文本配置项 | Object | 支持 [节点通用标签配置](/zh/docs/manual/middle/elements/nodes/defaultNode/#标签文本-label-及其配置-labelcfg)。 |
| **clipCfg** | **裁剪图片的配置项** | **Object** | **默认不裁剪，image 节点特有** |

### 剪裁

`clipCfg`

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| type | 裁剪的图片形状 | String | 支持 `'circle'`、`'rect'`、`'ellipse'` |
| x | 裁剪图形的 x 坐标 | Number | 默认为 0，类型为 `'circle'`、`'rect'`、`'ellipse'` 时生效 |
| y | 裁剪图形的 y 坐标 | Number | 默认为 0，类型为 `'circle'`、`'rect'`、`'ellipse'` 时生效 |
| show | 是否启用裁剪功能 | Boolean | 默认不裁剪，值为 `false` |
| r | 剪裁圆形的半径 | Number | 剪裁 type 为  `'circle'` 时生效 |
| width | 剪裁矩形的宽度 | Number | 剪裁 type 为 `'rect'` 时生效 |
| height | 剪裁矩形的长度 | Number | 剪裁 type 为 `'rect'` 时生效 |
| rx | 剪裁椭圆的长轴半径 | Number | 剪裁 type 为 `'ellipse'` 时生效 |
| ry | 剪裁椭圆的短轴半径 | Number | 剪裁 type 为 `'ellipse'` 时生效 |

所有的裁剪类型都提供了默认值。下面代码演示在实例化图时全局配置 `clipCfg` 的最简形式：

```javascript
const data = {
  nodes: [
    {
      x: 100,
      y: 100,
      type: 'image',
      label: 'image',
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  defaultNode: {
    // type: 'image',  // 在数据中已经指定 type，这里无需再次指定
    clipCfg: {
      show: true,
      type: 'circle',
    },
  },
});
graph.data(data);
graph.render();
```

#### 裁剪类型

##### 圆形剪裁

`circle` 当剪裁配置 `clipCfg` 中的裁剪类型 `type` 为 `'circle'` 时，如下配置可以得到下图效果：

```javascript
clipCfg: {
  show: true,
  type: 'circle',
  r: 100
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*w5uESbSe430AAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

##### 矩形剪裁

`rect`

当剪裁配置 `clipCfg` 中的裁剪类型 `type` 为 `'rect'` 时，如下配置可以得到下图效果：

```javascript
clipCfg: {
  show: true,
  type: 'rect',
  x: -50,
  y: -50,
  width: 100,
  height: 100
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mpPvTKdP7cIAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

##### 椭圆剪裁

`ellipse`

当剪裁配置 `clipCfg` 中的裁剪类型 `type` 为 `'ellipse'` 时，如下配置可以得到下图效果：

```javascript
clipCfg: {
  show: true,
  type: 'ellipse',
  rx: 100,
  ry: 60
}
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1kn1S4vaUrwAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>
