---
title: 插件 Plugins
order: 12
---

G6 中支持插件提供了一些可插拔的组件，包括：

- [Grid](#grid)
- [Minimap](#minimap)
- [Edge Bundling](#edge-bundling)
- [Menu](#menu)
- [ToolBar](#toolbar)
- [Tooltip](#tooltip)

## 配置方法

引入 G6 后，首先实例化需要使用的某插件对象。然后，在实例化图时将其配置到 `plugins` 中：

```javascript
// 实例化 Grid 插件
const grid = new G6.Grid();
const minimap = new G6.Minimap();
const graph = new G6.Graph({
  //... 其他配置项
  plugins: [grid, minimap], // 配置 Grid 插件和 Minimap 插件
});
```

## Grid

Grid 插件在画布上绘制了网格。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*y8u6Rrc78uIAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

使用 [配置方法](#配置方法) 中代码实例化时可以通过配置项调整 Grid 的图片。

### 配置项

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| img | String | grid 图片，base64 格式字符串 |

## Minimap

Minimap 是用于快速预览和探索图的工具。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

实例化时可以通过配置项调整 Minimap 的样式和功能。

### 配置项

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| container | Object | 放置 Minimap 的 DOM 容器。若不指定则自动生成 |
| className | String | 生成的 DOM 元素的 className |
| viewportClassName | String | Minimap 上视窗 DOM 元素的 className |
| type | String | 选项：`'default'`：渲染图上所有图形；`'keyShape'`：只渲染图上元素的 keyShape，以减少渲染成本；`'delegate'`：只渲染图上元素的大致图形，以降低渲染成本。渲染成本 `'default'` > `'keyShape'` > `'delegate'`。默认为 `'default'` |
| size | Array | Minimap 的大小 |
| delegateStyle | Object | 在 `type` 为 `'delegate'` 时生效，代表元素大致图形的样式 |

其中，delegateStyle 可以设置如下属性：

| 名称        | 类型   | 描述       |
| ----------- | ------ | ---------- |
| fill        | String | 填充颜色   |
| stroke      | String | 描边颜色   |
| lineWidth   | Number | 描边宽度   |
| opacity     | Number | 透明度     |
| fillOpacity | Number | 填充透明度 |

## Edge Bundling

在关系复杂、繁多的大规模图上，通过边绑定可以降低视觉复杂度。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

> 美国航线图边绑定。<a href='http://antv-2018.alipay.com/zh-cn/g6/3.x/demo/case/american-migration-bundling.html' target='_blank'>Demo 链接</a>。该 <a href='https://g6.antv.vision/zh/docs/manual/cases/edgeBundling' target='_blank'>Demo 教程</a>。

实例化时可以通过配置项调整边绑定的功能。

### 配置项

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| K | Number | 0.1 | 边绑定的强度 |
| lambda | Number | 0.1 | 算法的初始步长 |
| divisions | Number | 1 | 初始的切割点数，即每条边将会被切割成的份数。每次迭代将会被乘以 `divRate` |
| divRate | Number | 2 | 切割增长率，每次迭代都会乘以该数字。数字越大，绑定越平滑，但计算量将增大 |
| cycles | Number | 6 | 迭代次数 |
| iterations | Number | 90 | 初始的内迭代次数，每次外迭代中将会被乘以 `iterRate` |
| iterRate | Number | 0.6666667 | 迭代下降率 |
| bundleThreshold | Number | 0.6 | 判定边是否应该绑定在一起的相似容忍度，数值越大，被绑在一起的边相似度越低，数量越多 |

## Menu

Menu 用于配置节点上的右键菜单。

### 配置项

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| className | string | null | menu 容器的 class 类名 |
| getContent | (graph?: IGraph) => HTMLDivElement / string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ' width=60 alt='img'/> | 菜单项内容，支持 DOM 元素或字符串 |
| handleMenuClick | (target: HTMLElement, item: Item) => void | undefined | 点击菜单项的回调函数 |

### 用法

实例化 Menu 插件时，如果不传参数，则使用 G6 默认提供的值，只能展示默认的菜单项，不能进行任何操作。

```
// 实例化 Menu 插件
const menu = new G6.Menu();
const graph = new G6.Graph({
  //... 其他配置项
  plugins: [menu], // 配置 Menu 插件
});
```

#### DOM Menu

```
const menu = new G6.Menu({
  getContent(e) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `<ul>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
      </ul>`
    return outDiv
  },
  handleMenuClick(target, item) {
    console.log(target, item)
  },
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [menu], // 配置 Menu 插件
});
```

#### String Menu

```
const menu = new G6.Menu({
  getContent(graph) {
    return `<ul>
      <li title='1'>测试02</li>
      <li title='2'>测试02</li>
      <li>测试02</li>
      <li>测试02</li>
      <li>测试02</li>
    </ul>`;
  },
  handleMenuClick(target, item) {
    console.log(target, item)
  },
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [menu], // 配置 Menu 插件
});
```

## ToolBar

ToolBar 集成了以下常见的操作：
- 重做；
- 撤销；
- 放大；
- 缩小；
- 适应屏幕；
- 实际大小。

### 配置项

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| container | HTMLDivElement | null | null | ToolBar 容器，如果不设置，则默认使用 canvas 的 DOM 容器 |
| className | string | null | ToolBar 内容元素的 class 类名 |
| getContent | (graph?: IGraph) => HTMLDivElement | string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ' width=60 alt='img'/> | ToolBar 内容，支持 DOM 元素或字符串 |
| handleClick | (code: string, graph: IGraph) => void | undefined | 点击 ToolBar 中每个图标的回调函数 |
| position | Point | null | null | ToolBar 的位置坐标 |

### 用法

#### 默认用法
默认的 ToolBar 提供了撤销、重做、放大等功能。

```
const toolbar = new G6.ToolBar();

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [toolbar], // 配置 Menu 插件
});
```

#### String ToolBar

```
const tc = document.createElement('div');
tc.id = 'toolbarContainer';
document.body.appendChild(tc);

const toolbar = new G6.ToolBar({
  container: tc,
  getContent: () => {
    return `
      <ul>
        <li code='add'>测试</li>
        <li code='undo'>撤销</li>
      </ul>
    `
  },
  handleClick: (code, graph) => {
    if (code === 'add') {
      graph.addItem('node', {
        id: 'node2',
        label: 'node2',
        x: 300,
        y: 150
      })
    } else if (code === 'undo') {
      toolbar.undo()
    }
  }
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [toolbar], // 配置 Menu 插件
});
```

#### DOM ToolBar

```
const toolbar = new G6.ToolBar({
  getContent: () => {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `<ul>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
      </ul>`
    return outDiv
  },
  handleClick: (code, graph) => {
    
  }
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [toolbar], // 配置 Menu 插件
});
```

## ToolTip

ToolTip 插件主要用于在节点和边上展示一些辅助信息，G6 4.0 以后，Tooltip 插件将会替换 Behavior 中的 tooltip。

### 配置项

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| className | string | null | tooltip 容器的 class 类名 |
| container | HTMLDivElement | null | null | Tooltip 容器，如果不设置，则默认使用 canvas 的 DOM 容器 |
| getContent | (graph?: IGraph) => HTMLDivElement | string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ' width=60 alt='img'/> | Tooltip 内容，支持 DOM 元素或字符串 |
| offset | number | 6 | tooltip 的偏移值，作用于 x y 两个方向上 |

### 用法

默认的 Tooltip 只展示元素类型和 ID，一般情况下都需要用户自己定义 Tooltip 上面展示的内容。

#### Dom Tooltip
```
const tooltip = new G6.Tooltip({
  offset: 10,
  getContent(e) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `
      <h4>自定义tooltip</h4>
      <ul>
        <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
      </ul>`
    return outDiv
  },
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [tooltip], // 配置 Menu 插件
});
```

#### String Tooltip
```
const tooltip = new G6.Tooltip({
  getContent(e) {
    return `<div style='width: 180px;'>
      <ul id='menu'>
        <li title='1'>测试02</li>
        <li title='2'>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
      </ul>
    </div>`;
  },
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [tooltip], // 配置 Menu 插件
});
```

