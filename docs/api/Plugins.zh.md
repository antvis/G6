---
title: 插件 Plugins
order: 9
---

G6 中支持插件提供了一些可插拔的组件，可自用使用在 G6 或其他应用当中。这些插件包括：
- [Grid](#grid)
- [Minimap](#minimap)
- [Edge Bundling](#edge-bundling)

## 配置方法
G6 的插件是独立的包，需要单独引入，以 Grid 和 Minimap 插件为例：
```html
<body>
  <!-- 通过 CDN 引入 Grid -->
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.1/build/grid.js"></script>
  <!-- 通过 CDN 引入 Minimap -->
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.1/build/minimap.js"></script>
</body>
```

引入后，首先实例化需要使用的某插件对象。然后，在实例化图时将其配置到 `plugins` 中：

```javascript
// 实例化 Grid 插件
const grid = new Grid();
const minimap = new Minimap();
const graph = new G6.Graph({
  //... 其他配置项
  plugins: [ grid, minimap ] // 配置 Grid 插件和 Minimap 插件
});
```


## Grid
Grid 插件在画布上绘制了网格。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*y8u6Rrc78uIAAAAAAAAAAABkARQnAQ' width=300 />

Grid 没有配置项。使用 [配置方法](#配置方法) 中代码实例化即可。


## Minimap
Minimap 是用于快速预览和探索图的工具。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 />

实例化时可以通过配置项调整 Minimap 的样式和功能。

### 配置项

| 名称 | 类型 | 描述 |
| --- | --- | --- | --- |
| container | Object | 放置 Minimap 的 DOM 容器。若不指定则自动生成 |
| className | String | 生成的 DOM 元素的 className |
| viewportClassName | String | Minimap 上视窗 DOM 元素的 className |
| type | String | 选项：`'default'`：渲染图上所有图形；`'keyShape'`：只渲染图上元素的 keyShape，以减少渲染成本；`'delegate'`：只渲染图上元素的大致图形，以降低渲染成本。渲染成本 `'default'` > `'keyShape'` > `'delegate'`。默认为 `'default'` |
| size | Array | Minimap 的大小 |
| delegateStyle | Object | 在 `type` 为 `'delegate'` 时生效，代表元素大致图形的样式 |


其中，delegateStyle 可以设置如下属性：

| 名称 | 类型 | 描述 |
| --- | --- | --- | --- |
| fill | String | 填充颜色 |
| stroke | String | 描边颜色 |
| lineWidth | Number | 描边宽度 |
| opacity | Number | 透明度 |
| fillOpacity | Number | 填充透明度 |


## Edge Bundling
在关系复杂、繁多的大规模图上，通过边绑定可以降低视觉复杂度。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ' width=600 />

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
