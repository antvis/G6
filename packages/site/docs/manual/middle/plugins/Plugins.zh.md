---
title: 使用组件
order: 0
---

G6 中支持插件提供了一些可插拔的组件，包括：

- [Legend](#legend) _v4.3.0 起支持_
- [SnapLine](#snapline) _v4.3.0 起支持_
- [Grid](#grid)
- [Minimap](#minimap)
- [ImageMinimap](#image-minimap)
- [Edge Bundling](#edge-bundling)
- [Menu](#menu)
- [ToolBar](#toolbar)
- [TimeBar](#timebar)
- [Tooltip](#tooltip)
- [Fisheye](#fisheye)
- [EdgeFilterLens](#edge-filter-lens)

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

## Legend

Legend 是 G6 内置的图例插件。用于说明图中不同类型的节点和边所代表的含义，并可以通过与图例的交互做简单的高亮和过滤。 _v4.3.0 起支持_。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UmXzQLG65vYAAAAAAAAAAAAAARQnAQ' alt="img" width='500px'>

### 配置项

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| data | GraphData | 图例的数据，与图数据格式相同。节点图例目前支持 `'circle'`，`'rect'`，和 `'ellipse'`，边图例目前支持 `'line'`、`'cubic'`、`'quadratic'`。通过指定每个数据项中的 `type` 字段以确定图例元素的类型，每个数据项中的 `order` 字段可用于同组图例的排序 |
| position | 'top' / 'top-left' / 'top-right' / 'right' / 'right-top' / 'right-bottom' / 'left' / 'left-top' / 'left-bottom' / 'bottom' / 'bottom-left' / 'bottom-right' | 图例在画布中的相对位置，默认为 `'top'`，代表在画布正上方 |
| padding | number / number[] | 图例区域内部内容到边框的距离，四位数组分别代表上、右、下、左边距 |
| margin | number / number[] | 图例区域与画布边界的距离，四位数组分别代表上、右、下、左边距。在 `position:'top'` 时只有上边距生效，其他情况类似 |
| offsetX | number | 图例区域离 `position` 对应的默认位置的 x 方向的偏移量，可被用于图例位置的微调 |
| offsetY | number | 图例区域离 `position` 对应的默认位置的 y 方向的偏移量，可被用于图例位置的微调 |
| containerStyle | ShapeStyle | 图例背景框的样式，格式与 [rect 图形的样式](/zh/docs/api/shape-properties#矩形图形-rect)相同 |
| horiSep | number | 图例之间的水平间距 |
| vertiSep | number | 图例之间的竖直间距 |
| layout | 'vertical' / 'horizontal' | 图例的布局方式。默认为 `'horizontal'` 横向布局 |
| align | 'center' / 'right' / 'left' | 图例的对齐方式，可以是居中、右对齐、左对齐。默认为 `'center'` 居中 |
| title | string | 图例的标题文本内容，样式通过 `titleConfig` 设置 |
| titleConfig | object | 图例标题的样式，具体配置项如下 |
| titleConfig.position | 'center' / 'right' / 'left' | 图例标题的对齐方式，可以是居中、右对齐、左对齐。默认为 `'center'` 居中 |
| titleConfig.offsetX | number | 图例标题的 x 方向偏移，用于微调标题位置 |
| titleConfig.offsetY | number | 图例标题的 y 方向偏移，用于微调标题位置 |
| titleConfig[key] | ShapeStyle | 其他对于文本本身的样式，支持的内容与 [text 图形的样式](/zh/docs/api/shape-properties#文本-text)相同 |
| filter | object | 通过图例的交互对主图元素进行过滤的配置项，具体配置如下 |
| filter.enable | boolean | 是否允许通过图例的交互对主图元素过滤，默认为 `false` |
| filter.multiple | boolean | 是否支持多种元素过滤，默认为 `false`，只有 `filter.trigger` 为 `'click'` 时方可多选图例 |
| filter.trigger | 'click' / 'mouseenter' | 触发主图元素过滤的图例交互方式，默认为 `click` |
| filter.legendStateStyles | { active?: ShapeStyle, inactive?: ShapeStyle | 在过滤时，图例本身的状态样式，包括 `filter.legendStateStyles.active` 和 `filter.legendStateStyles.inactive` 两种，每种的类型均为 ShapeStyle。类似图的 `nodeStateStyles` 配置 |
| filter.graphActiveState | string | 主图元素过滤时，被选中的主图元素的状态名，将寻找主图元素的对应的状态样式进行主图元素的更新。默认值为 `'active'` |
| filter.graphInactiveState | string | 主图元素过滤时，未被选中的主图元素的状态名，将寻找主图元素的对应的状态样式进行主图元素的更新。默认值为 `'inactive'` |
| filter.filterFunctions | { [key: string]: (d) => boolean; } | 由于图例的数据与主图解耦，因此需要配置每种图例对应的主图过滤函数，`key` 为图例数据的 `type`，值为函数，函数的参数为主图元素的数据，返回值为布尔型，代表是否被选中 |

## SnapLine

SnapLine 是 G6 内置的对齐线插件。 _v4.3.0 起支持_。

实例化时可以通过配置项调整 SnapLine 的样式和功能。

### 配置项

| 名称          | 类型                                          | 描述                      |
| ------------- | --------------------------------------------- | ------------------------- |
| line          | ShapeStyle                                    | 辅助线的样式              |
| itemAlignType | boolean、'horizontal' 、'vertical'、'center'; | 辅助线类型，true 表示全部 |

## Grid

Grid 插件在画布上绘制了网格。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*y8u6Rrc78uIAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

使用 [配置方法](#配置方法) 中代码实例化时可以通过配置项调整 Grid 的图片。

### 配置项

| 名称 | 类型   | 描述                         |
| ---- | ------ | ---------------------------- |
| img  | String | grid 图片，base64 格式字符串 |

## Minimap

Minimap 是用于快速预览和探索图的工具。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

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
| hideEdge | Boolean | false | **v4.7.16 起支持** 控制 Minimap 上边的显示与隐藏，设置为 `true` 可在大规模图上大幅提升性能 |

其中，delegateStyle 可以设置如下属性：

| 名称        | 类型   | 描述       |
| ----------- | ------ | ---------- |
| fill        | String | 填充颜色   |
| stroke      | String | 描边颜色   |
| lineWidth   | Number | 描边宽度   |
| opacity     | Number | 透明度     |
| fillOpacity | Number | 填充透明度 |

## Image Minimap

由于 [Minimap](#minimap) 的原理是将主画布内容复制到 minimap 的画布上，在大数据量下可能会造成双倍的绘制效率成本。为缓解该问题，Image Minimap 采用另一种机制，根据提供的图片地址或 base64 字符串 `graphImg` 绘制 `<img />` 代替 minimap 上的 canvas。该方法可以大大减轻两倍 canvas 绘制的压力。但 `graphImg` 完全交由 G6 的用户控制，需要注意主画布更新时需要使用 `updateGraphImg` 方法替换 `graphImg`。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*v1svQLkEPrUAAAAAAAAAAABkARQnAQ' width=300 alt='img'/>

实例化时可以通过配置项调整 Image inimap 的样式和功能。

### 配置项

| 名称 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| graphImg | String | true | minimap 的图片地址或 base64 文本 |
| width | Number | false | minimap 的宽度。Image Minimap 的长宽比一定等于主图长宽比。因此，若设置了 `width`，则按照主画布容器长宽比确定 `height`，也就是说，`width` 的优先级高于 `height`。 |
| height | Number | false | minimap 的高度。Image Minimap 的长宽比一定等于主图长宽比。若未设置了 `width`，但设置了 `height`，则按照主画布容器长宽比确定 `width`；若设置了 `width` 则以 `width` 为准 |
| container | Object | false | 放置 Minimap 的 DOM 容器。若不指定则自动生成 |
| className | String | false | 生成的 DOM 元素的 className |
| viewportClassName | String | false | Minimap 上视窗 DOM 元素的 className |
| delegateStyle | Object | false | 在 `type` 为 `'delegate'` 时生效，代表元素大致图形的样式 |

其中，`delegateStyle` 可以设置如下属性：

| 名称        | 类型   | 描述       |
| ----------- | ------ | ---------- |
| fill        | String | 填充颜色   |
| stroke      | String | 描边颜色   |
| lineWidth   | Number | 描边宽度   |
| opacity     | Number | 透明度     |
| fillOpacity | Number | 填充透明度 |

### API

#### updateGraphImg(img)

更新 minimap 图片。建议在主画布更新时使用该方法同步更新 minimap 图片。

参数：

| 名称 | 类型   | 是否必须 | 描述                             |
| ---- | ------ | -------- | -------------------------------- |
| img  | String | true     | minimap 的图片地址或 base64 文本 |

### 用法

实例化 Image Minimap 插件时，`graphImg` 是必要参数。

```javascript
// 实例化 Image Minimap 插件
const imageMinimap = new G6.ImageMinimap({
  width: 200,
  graphImg: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ'
});
const graph = new G6.Graph({
  //... 其他配置项
  plugins: [imageMinimap], // 配置 imageMinimap 插件
});

graph.data(data);
graph.render()

... // 一些主画布更新操作
imageMinimap.updateGraphImg(img); // 使用新的图片（用户自己生成）替换 minimap 图片

```

## Edge Bundling

在关系复杂、繁多的大规模图上，通过边绑定可以降低视觉复杂度。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

> 美国航线图边绑定。<a href='/zh/examples/case/graphDemos#edgeBundling' target='_blank'>Demo 链接</a>。该 <a href='/zh/docs/api/plugins#edge-bundling' target='_blank'>Demo 教程</a>。

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
| getContent | (evt?: IG6GraphEvent, graph?: IGraph) => HTMLDivElement / string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OtOkS4g-vrkAAAAAAAAAAABkARQnAQ' width=60 alt='img'/> | 菜单项内容，支持 DOM 元素或字符串 |
| handleMenuClick | (target: HTMLElement, item: Item, graph?: IGraph) => void | undefined | 点击菜单项的回调函数 |
| shouldBegin | (evt: G6Event) => boolean | undefined | 是否允许 menu 出现，可以根据 `evt.item`（当前鼠标事件中的元素） 或 `evt.target`（当前鼠标事件中的图形）的内容判断此时是否允许 menu 出现 |
| offsetX | number | 6 | menu 的 x 方向偏移值，需要考虑父级容器的 padding |
| offsetY | number | 6 | menu 的 y 方向偏移值，需要考虑父级容器的 padding |
| itemTypes | string[] | ['node', 'edge', 'combo'] | menu 作用在哪些类型的元素上，若只想在节点上显示，可将其设置为 ['node'] |
| trigger | 'click' / 'contextmenu' | 'contextmenu' | menu 出现的触发方式，默认为 `'contextmenu'`，即右击。`'click'` 代表左击。_v4.3.2 起支持 'click'_ |

### 用法

实例化 Menu 插件时，如果不传参数，则使用 G6 默认提供的值，只能展示默认的菜单项，不能进行任何操作。

```javascript
// 实例化 Menu 插件
const menu = new G6.Menu();
const graph = new G6.Graph({
  //... 其他配置项
  plugins: [menu], // 配置 Menu 插件
});
```

#### DOM Menu

```javascript
const menu = new G6.Menu({
  offsetX: 6,
  offsetX: 10,
  itemTypes: ['node'],
  getContent(e, graph) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `<ul>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
      </ul>`;
    return outDiv;
  },
  handleMenuClick(target, item, graph) {
    console.log(target, item, graph);
  },
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [menu], // 配置 Menu 插件
});
```

#### String Menu

```javascript
const menu = new G6.Menu({
  getContent(evt) {
    return `<ul>
      <li title='1'>测试02</li>
      <li title='2'>测试02</li>
      <li>测试02</li>
      <li>测试02</li>
      <li>测试02</li>
    </ul>`;
  },
  handleMenuClick(target, item) {
    console.log(target, item);
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
| --- | --- | --- | --- | --- |
| container | HTMLDivElement | null | ToolBar 容器，如果不设置，则默认使用 canvas 的 DOM 容器 |
| className | string | null | ToolBar 内容元素的 class 类名 |
| getContent | (graph?: IGraph) => HTMLDivElement | string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7QSRRJwAWxQAAAAAAAAAAABkARQnAQ' width=80 alt='img'/> | ToolBar 内容，支持 DOM 元素或字符串 |
| handleClick | (code: string, graph: IGraph) => void | undefined | 点击 ToolBar 中每个图标的回调函数 |
| position | Point | null | ToolBar 的位置坐标 |

### 用法

#### 默认用法

默认的 ToolBar 提供了撤销、重做、放大等功能。

```javascript
const toolbar = new G6.ToolBar();

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [toolbar], // 配置 ToolBar 插件
});
```

#### 使用 String 自定义 ToolBar 功能

```javascript
const tc = document.createElement('div');
tc.id = 'toolbarContainer';
document.body.appendChild(tc);

const toolbar = new G6.ToolBar({
  container: tc,
  getContent: () => {
    return `
      <ul>
        <li code='add'>增加节点</li>
        <li code='undo'>撤销</li>
      </ul>
    `;
  },
  handleClick: (code, graph) => {
    if (code === 'add') {
      graph.addItem('node', {
        id: 'node2',
        label: 'node2',
        x: 300,
        y: 150,
      });
    } else if (code === 'undo') {
      toolbar.undo();
    }
  },
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [toolbar], // 配置 ToolBar 插件
});
```

#### 使用 DOM 自定义 ToolBar 功能

```javascript
const toolbar = new G6.ToolBar({
  getContent: () => {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `<ul>
        <li>测试01</li>
        <li>测试02</li>
        <li>测试03</li>
        <li>测试04</li>
        <li>测试05</li>
      </ul>`;
    return outDiv;
  },
  handleClick: (code, graph) => {},
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [toolbar], // 配置 ToolBar 插件
});
```

## ToolTip

ToolTip 插件主要用于在节点和边上展示一些辅助信息，G6 4.0 以后，Tooltip 插件将会替换 Behavior 中的 tooltip。

### 配置项

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| className | string | null | tooltip 容器的 class 类名 |
| container | HTMLDivElement | null | Tooltip 容器，如果不设置，则默认使用 canvas 的 DOM 容器 |
| getContent | (evt?: IG6GraphEvent) => HTMLDivElement / string | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aPPuQquN5Q0AAAAAAAAAAABkARQnAQ' width=80 alt='img'/> | tooltip 内容，支持 DOM 元素或字符串 |
| shouldBegin | (evt: G6Event) => boolean | undefined | 是否允许 tooltip 出现，可以根据 `evt.item`（当前鼠标事件中的元素） 或 `evt.target`（当前鼠标事件中的图形）的内容判断此时是否允许 tooltip 出现 |
| offsetX | number | 6 | tooltip 的 x 方向偏移值，需要考虑父级容器的 padding |
| offsetY | number | 6 | tooltip 的 y 方向偏移值，需要考虑父级容器的 padding |
| itemTypes | string[] | ['node', 'edge', 'combo'] | tooltip 作用在哪些类型的元素上，若只想在节点上显示，可将其设置为 ['node'] |

### 用法

默认的 Tooltip 只展示元素类型和 ID，一般情况下都需要用户自己定义 Tooltip 上面展示的内容。

#### Dom Tooltip

```javascript
const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 20,
  getContent(e) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `
      <h4>自定义tooltip</h4>
      <ul>
        <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
      </ul>`;
    return outDiv;
  },
  itemTypes: ['node'],
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [tooltip], // 配置 Tooltip 插件
});
```

#### String Tooltip

```javascript
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
  plugins: [tooltip], // 配置 Tooltip 插件
});
```

## Fisheye

Fisheye 鱼眼放大镜是为 focus+context 的探索场景设计的，它能够保证在放大关注区域的同时，保证上下文以及上下文与关注中心的关系不丢失。

### 配置项

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| trigger | 'mousemove' / 'click' / 'drag' | 'mousemove' | 放大镜的触发事件 |
| d | Number | 1.5 | 放大系数，数值越大，放大程度越大 |
| r | Number | 300 | 放大区域的范围半径 |
| delegateStyle | Object | { stroke: '#000', strokeOpacity: 0.8, lineWidth: 2, fillOpacity: 0.1, fill: '#ccc' } | 放大镜蒙层样式 |
| showLabel | Boolean | false | 若 label 默认被隐藏，是否在关注区域内展示 label |
| maxR | Number | 图的高度 | 滚轮调整缩放范围的最大半径 |
| minR | Number | 0.05 \* 图的高度 | 滚轮调整缩放范围的最小半径 |
| maxD | Number | 5 | `trigger` 为 `'mousemove'` / `'click'` 时，可以在放大镜上左右拖拽调整缩放系数。maxD 指定了这种调整方式的最大缩放系数，建议取值范围 [0, 5]。若使用 `minimap.updateParam` 更新参数不受该系数限制 |
| minD | Number | 0 | `trigger` 为 `'mousemove'` / `'click'` 时，可以在放大镜上左右拖拽调整缩放系数。maxD 指定了这种调整方式的最小缩放系数，建议取值范围 [0, 5]。若使用 `minimap.updateParam` 更新参数不受该系数限制 |
| scaleRBy | 'wheel'/'drag'/'unset'/undefined | false | 'unset' | 终端用户调整放大镜范围大小的方式 |
| scaleDBy | 'wheel'/'drag'/'unset'/undefined | false | 'unset' | 终端用户调整放大镜缩放系数的方式 |
| showDPercent | Boolean | false | true | 是否在放大镜下方显示当前缩放系数的比例值（与 minD、maxD 相较） |

### 成员函数

#### updateParams(cfg)

用于更新该 FishEye 的部分配置项，包括 `trigger`，`d`，`r`，`maxR`，`minR`，`maxD`，`minD`，`scaleRBy`，`scaleDBy`。例如：

```javascript
const fisheye = new G6.Fisheye({
  trigger: 'mousemove'
});

... // 其他操作

fisheye.updateParams({
  d: 2,
  r: 500,
  // ...
})
```

### 用法

```javascript
const fisheye = new G6.Fisheye({
  trigger: 'mousemove',
  d: 1.5,
  r: 300,
  delegateStyle: clone(lensDelegateStyle),
  showLabel: false,
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [fisheye], // 配置 fisheye 插件
});
```

## Edge Filter Lens

EdgeFilterLens 边过滤镜可以将关注的边保留在过滤镜范围内，其他边将在该范围内不显示。

### 配置项

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| trigger | 'drag' / 'mousemove' / 'click' | 'mousemove' | 过滤镜的触发事件 |
| type | 'one' / 'both' / 'only-source' / 'only-target' | 'both' | 根据边两端点作为边过滤的简单条件。`'one'`：边至少有一个端点在过滤镜区域内，则在该区域内显示该边；`'both'`：两个端点都在过滤区域内，则在该区域显示该边；`'only-source'`：只有起始端在过滤镜区域内，则在该区域显示该边；`'only-target'`：只有结束端在过滤区域内，则在该区域显示该边。更复杂的条件可以使用 `shouldShow` 指定 |
| shouldShow | (d?: unknown) => boolean | undefined | 边过滤的自定义条件。参数 `d` 为边每条边的数据，用户可以根据边的参数返回布尔值。返回 `true` 代表该边需要在过滤镜区域内显示，`false` 反之。 |
| r | Number | 60 | 过滤镜的范围半径 |
| delegateStyle | Object | { stroke: '#000', strokeOpacity: 0.8, lineWidth: 2, fillOpacity: 0.1, fill: '#ccc' } | 过滤镜蒙层样式 |
| showLabel | 'edge' / 'node' / 'both' | 'edge' | 若 label 默认被隐藏，是否在关注区域内展示对应元素类型的 label。'both' 代表节点和边的 label 都在过滤镜区域显示 |
| maxR | Number | 图的高度 | 滚轮调整过滤镜的最大半径 |
| minR | Number | 0.05 \* 图的高度 | 滚轮调整过滤镜的最小半径 |
| scaleRBy | 'wheel' / undefined | 'wheel' | 终端用户调整过滤镜大小的方式，undefined 代表不允许终端用户调整 |

### 成员函数

#### updateParams(cfg)

用于更新该过滤镜的部分配置项，包括 `trigger`，`type`，`r`，`maxR`，`minR`，`scaleRBy`，`showLabel`，`shouldShow`。例如：

```javascript
const filterLens = new G6.EdgeFilterLens({
  trigger: 'drag'
});

... // 其他操作

filterLens.updateParams({
  r: 500,
  // ...
})
```

### 用法

```javascript
const filterLens = new G6.EdgeFilterLens({
  trigger: 'mousemove',
  r: 300,
  shouldShow: (d) => {
    return d.size > 10;
  },
});

const graph = new G6.Graph({
  //... 其他配置项
  plugins: [filterLens], // 配置 filterLens 插件
});
```

## TimeBar

[AntV G6](https://github.com/antvis/G6) 内置了三种形态的 TimeBar 组件：

- 带有趋势图的 TimeBar 组件；
- 简易版的 TimeBar 组件；
- 刻度 TimeBar 组件。

并且每种类型的 TimeBar 组件都可以配合播放、快进、后退等控制按钮组使用。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DOo6QpfFfMUAAAAAAAAAAAAAARQnAQ' width='500' />
<br />趋势图 TimeBar 组件<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bzGBQKkewZMAAAAAAAAAAAAAARQnAQ' width='500' />
<br />简易版 TimeBar 组件<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*kHRkQpnvBmwAAAAAAAAAAAAAARQnAQ' width='500' />
<br />刻度 TimeBar 组件<br />

<br />在趋势图 TimeBar 基础上，我们可以通过配置数据，实现更加复杂的趋势图 TimeBar 组件，如下图所示。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*17VoSoTm9o8AAAAAAAAAAAAAARQnAQ' width='500' />

<br />虽然 G6 提供了各种不同类型的 TimeBar 组件，但在使用的方式却非常简单，通过配置字段就可以进行区分。<br /> <br />关于 TimeBar 的使用案例，请参考[这里](https://g6-v4.antv.vision/examples/tool/timebar#timebar)。<br />

### 使用 TimeBar 组件

使用 G6 内置的 TimeBar 组件，和使用其他组件的方式完全相同。

```javascript
import G6 from '@antv/g6';

const timebar = new G6.TimeBar({
  width: 500,
  height: 150,
  padding: 10,
  type: 'trend',
  trend: {
    data: timeBarData,
  },
});

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  plugins: [timebar],
});
```

<br />通过上面的方式，我们就可以在图中使用 TimeBar 组件了，当实例化 TimeBar 时，type 参数值为 trend，表示我们实例化的是趋势图组件，效果如下图所示。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lfvIQJYbs7oAAAAAAAAAAAAAARQnAQ' width='600' />

<br />当设置 type 为 simple 时，就可以使用简易版的 TimeBar。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*g2zhQqP6ruYAAAAAAAAAAAAAARQnAQ' width='600' />

<br />当设置 type 为 tick 时，表示我们要使用刻度 TimeBar 组件，但此时要注意的是，**刻度时间轴的配置项是通过 tick 对象配置而不是 trend 对象**，这也是刻度时间轴和趋势即简易时间轴不同的地方。

```javascript
const timebar = new G6.TimeBar({
  width,
  height: 150,
  type: 'tick',
  tick: {
    data: timeBarData,
    width,
    height: 42,
    tickLabelFormatter: (d) => {
      const dateStr = `${d.date}`;
      if ((count - 1) % 10 === 0) {
        return `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`;
      }
      return false;
    },
    tooltipFomatter: (d) => {
      const dateStr = `${d}`;
      return `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`;
    },
  },
});
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*n6ECQ7Jn5pQAAAAAAAAAAAAAARQnAQ' width='600' />

### 事件监听

TimeBar 插件暴露除了几个时机事件，方便用户监听内部状态的变化。以下事件可通过 `graph.on('eventname', e => {})` 进行监听。

| 事件名称         | 描述                           |
| ---------------- | ------------------------------ |
| valuechange      | 时间轴的时间范围发生变化时触发 |
| timebarstartplay | 时间轴开始播放时触发           |
| timebarendplay   | 时间轴播放结束时触发           |

### 参数定义

#### 接口定义

完整的 TimeBar 的接口定义如下：

```javascript
interface TimeBarConfig extends IPluginBaseConfig {
  // position size
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly padding?: number;

  readonly type?: 'trend' | 'simple' | 'tick';
  // 趋势图配置项
  readonly trend?: TrendConfig;
  // 滑块、及前后背景的配置
  readonly slider?: SliderOption;

  // 当 type 是 tick 时，这是 tick 类型时间轴的配置项
  // 当 type 是 trend 或 simple 时，这是时间轴下方时间刻度文本的配置项
  readonly tick?: TimeBarSliceOption | TickCfg;

  // 控制按钮
  readonly controllerCfg?: ControllerCfg;

  // [v4.5.1 起支持] 容器的 CSS 样式
  readonly containerCSS?: Object;

  // [v4.5.1 起支持] 过滤的类型, ['node', 'edge'], 默认为 ['node']
  readonly filterItemTypes?: string[];

  // [v4.5.1 起废弃，由 filterItemTypes 代替] 是否过滤边，若为 true，则需要配合边数据上有 date 字段，过滤节点同时将不满足 date 在选中范围内的边也过滤出去；若为 false，则仅过滤节点以及两端节点都被过滤出去的边
  readonly filterEdge?: boolean;

  // [v4.5.1 起支持] 是否通过 graph.changeData 改变图上数据从而达到筛选目的。若为 false 则将使用 graph.hideItem 和 graph.showItem 以隐藏/展示图上元素从而达到筛选目的
  readonly changeData?: boolean;

  // TimeBar 时间范围变化时的回调函数，当不定义该函数时，时间范围变化时默认过滤图上的数据
  rangeChange?: (graph: IGraph, minValue: string, maxValue: string) => void;

  // [v4.5.1 起支持] 用户根据节点/边数据返回对应时间值的方法
  getDate?: (d: any) => number;

  // [v4.5.1 起支持] 用户根据节点/边数据返回对应 value 的方法。value 用于在 type 为 trend 的时间轴上显示趋势线
  getValue?: (d: any) => number;

  // [v4.5.1 起支持] 在过滤图元素时是否要忽略某些元素。返回 true，则忽略。否则按照正常过滤逻辑处理
  shouldIgnore?: (itemType: 'node' | 'edge', model: any, dateRage: { min: number, max: number }) => boolean;
}
```

#### 接口参数说明

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| container | HTMLDivElement | null | TimeBar 容器，如果不设置，则默认创建 className 为 g6-component-timebar 的 DOM 容器 |
| x | number | 0 | TimeBar 开始 x 坐标 |
| y | number | 0 | TimeBar 开始 y 坐标 |
| width | number |  | **必选**，TimeBar 容器宽度 |
| height | number |  | **必选**，TimeBar 高度 |
| padding | number/number[] | 10 | TimeBar 距离容器的间距值 |
| type | 'trend' / 'simple' / 'tick' | trend | 默认的 TimeBar 类型，默认为趋势图样式 |
| trend | TrendConfig | null | Timebar 中趋势图的配置项，当 type 为 trend 或 simple 时，该字段必选 |
| slider | SliderOption | null | TimeBar 组件背景及控制调节范围的滑块的配置项 |
| tick | TimeBarSliceOption / TickCfg | null | 当 type 是 tick 时，这是 tick 类型时间轴的配置项，该字段必须按；当 type 是 trend 或 simple 时，这是时间轴下方时间刻度文本的配置项 |
| controllerCfg | ControllerCfg | null | 控制按钮组配置项 |
| containerCSS | Object | null | [v4.5.1 起支持] 容器的 CSS 样式 |
| filterItemTypes | string[] | null | [v4.5.1 起支持] 过滤的类型, ['node', 'edge'], 默认为 ['node'] |
| filterEdge | boolean | false | [v4.5.1 起废弃，由 filterItemTypes 代替] 是否过滤边，若为 true，则需要配合边数据上有 date 字段，过滤节点同时将不满足 date 在选中范围内的边也过滤出去；若为 false，则仅过滤节点以及两端节点都被过滤出去的边 |
| changeData | boolean | null | [v4.5.1 起支持] 是否通过 graph.changeData 改变图上数据从而达到筛选目的。若为 false 则将使用 graph.hideItem 和 graph.showItem 以隐藏/展示图上元素从而达到筛选目的 |
| rangeChange | Function | null | TimeBar 时间范围变化时的回调函数，当不定义该函数时，时间范围变化时默认过滤图上的数据 |
| getDate | (d: any) => number | null | [v4.5.1 起支持] 用户根据节点/边数据返回对应时间值的方法 |
| getValue | (d: any) => number | null | [v4.5.1 起支持] 用户根据节点/边数据返回对应 value 的方法。value 用于在 type 为 trend 的时间轴上显示趋势线 |
| shouldIgnore | (itemType: 'node' | 'edge', model: any, dateRage: { min: number, max: number }) => boolean | null | [v4.5.1 起支持] 在过滤图元素时是否要忽略某些元素。返回 true，则忽略。否则按照正常过滤逻辑处理 |

#### TrendConfig 接口定义

> 暂不支持刻度文本的样式配置

```javascript
interface TrendConfig {
  // 数据
  readonly data: {
    date: string;
    value: string;
  }[];
  // 位置大小
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  // 样式
  readonly smooth?: boolean;
  readonly isArea?: boolean;
  readonly lineStyle?: ShapeStyle;
  readonly areaStyle?: ShapeStyle;
  readonly interval?: Interval;
}
```

#### TrendConfig 参数说明

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| x | number | 0 | 趋势图开始 x 坐标 |
| y | number | 0 | 趋势图开始 y 坐标 |
| width | number | TimeBar 容器宽度 | TimeBar 趋势图宽度，不建议自己设定，如果设定时需要同步设置 slider 中的 width 值 |
| height | number | type=trend：默认为 28<br />type=simple：默认为 8 | TimeBar 趋势图高度，不建议自己设定，如果设定时需要同步设置 slider 中的 height 值 |
| smooth | boolean | false | 是否是平滑的曲线 |
| isArea | boolean | false | 是否显示面积图 |
| lineStyle | ShapeStyle | null | 折线的样式配置 |
| areaStyle | ShapeStyle | null | 面积的样式配置项，只有当 isArea 为 true 时生效 |
| interval | Interval | null | 柱状图配置项，当配置了该项后，趋势图上会展现为混合图样式。`Interval = { data: number[], style: ShapeStyle }`，`style` 除 `ShapeStyle` 类型中图形的样式外，还可配置 `barWidth` 配置柱状图柱子的宽度。 |

#### SliderOption 接口定义

```javascript
export type SliderOption = Partial<{
  readonly width?: number;
  readonly height?: number;
  readonly backgroundStyle?: ShapeStyle;
  readonly foregroundStyle?: ShapeStyle;
  // 滑块样式
  readonly handlerStyle?: {
    width?: number;
    height?: number;
    style?: ShapeStyle;
  };
  readonly textStyle?: ShapeStyle;
  // 初始位置
  readonly start: number;
  readonly end: number;
  // 滑块文本
  readonly minText: string;
  readonly maxText: string;
}>;
```

#### SliderOption 参数说明

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| width | number | TimeBar 容器宽度 - 2 \* padding | 趋势图背景框宽度，不建议自己设定，如果设定时要同步修改 trend 中 width 值 |
| height | number | 趋势图默认为 28<br />简易版默认为 8 | TimeBar 趋势图高度，不建议自己设定，如果设定时需要同步设置 trend 中的 height 值 |
| backgroundStyle | ShapeStyle | null | 背景样式配置项 |
| foregroundStyle | ShapeStyle | null | 前景色样式配置，即选中范围的样式配置项 |
| handlerStyle | ShapeStyle | null | 滑块的样式配置项 |
| textStyle | ShapeStyle | null | 滑块上文本的样式配置项 |
| start | number | 0.1 | 开始位置 |
| end | number | 0.9 | 结束位置 |
| minText | string | min | 最小值文本 |
| maxText | string | max | 最大值文本 |

#### TimeBarSliceOption

```javascript
export interface TimeBarSliceOption {
  // position size
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly padding?: number;

  // styles
  readonly selectedTickStyle?: TickStyle;
  readonly unselectedTickStyle?: TickStyle
  readonly tooltipBackgroundColor?: string;

  readonly start?: number;
  readonly end?: number;

  // 数据
  readonly data: {
    date: string;
    value: string;
  }[];

  // 自定义标签格式化函数
  readonly tickLabelFormatter?: (d: any) => string | boolean;
  // 自定义 tooltip 内容格式化函数
  readonly tooltipFomatter?: (d: any) => string;
}
```

#### TimeBarSliceOption 参数说明

| 名称                   | 类型              | 默认值 | 描述                           |
| ---------------------- | ----------------- | ------ | ------------------------------ |
| x                      | number            | 0      | 刻度 TimeBar 开始 x 坐标       |
| y                      | number            | 0      | 刻度 TimeBar 开始 y 坐标       |
| width                  | number            |        | 必选，刻度 TimeBar 宽度        |
| height                 | number            |        | 必选，刻度 TimeBar 高度        |
| padding                | number / number[] | 0      | 刻度 TimeBar 距离边界的间距    |
| selectedTickStyle      | ShapeStyle        | null   | 选中刻度的样式配置项           |
| unselectedTickStyle    | ShapeStyle        | null   | 未选中刻度的样式配置项         |
| tooltipBackgroundColor | ShapeStyle        | null   | tooltip 背景框配置项           |
| start                  | number            | 0.1    | 开始位置                       |
| end                    | number            | 0.9    | 结束位置                       |
| data                   | any[]             | []     | 必选，刻度时间轴的刻度数据     |
| tickLabelFormatter     | Function          | null   | 刻度的格式化回调函数           |
| tooltipFomatter        | Function          | null   | tooltip 上内容格式化的回调函数 |

#### TickCfg 接口定义

```javascript
export interface TickCfg {
  // 时间轴下方文本的格式化函数
  readonly tickLabelFormatter?: (d: any) => string | undefined;
  // 时间轴下方文本的图形样式。[v4.5.1 起支持] 可配置 tickLabelStyle.rotate 以控制时间轴下方每个文本的旋转角度，可避免文本相互重叠
  readonly tickLabelStyle?: ShapeStyle;
  // 时间轴下方文本上的竖线图形样式
  readonly tickLineStyle?: ShapeStyle;
}
```

#### TickCfg 参数说明

| Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| tickLabelFormatter | Function | null | 时间轴下方文本的格式化函数 |
| tickLabelStyle | ShapeStyle | {} | 时间轴下方文本的图形样式。[v4.5.1 起支持] 可配置 tickLabelStyle.rotate 以控制时间轴下方每个文本的旋转角度，可避免文本相互重叠 |
| tickLineStyle | ShapeStyle | {} | 时间轴下方文本上方的竖线的图形样式 |

#### ControllerCfg 接口定义

> 暂不支持

> 控制按钮暂不支持配置样式

> 不支持循环播放

```javascript
type ControllerCfg = Partial<{

  /** 控制栏的起始位置以及宽高，width height 将不缩放内部子控制器，仅影响它们的位置分布。需要缩放请使用 scale */
  readonly x?: number;
  readonly y?: number;
  readonly width: number;
  readonly height: number;
  /** 控制栏缩放比例 */
  readonly scale?: number;
  /** 控制器背景的颜色和描边色 */
  readonly fill?: string;
  readonly stroke?: string;
  /** 整个控制栏的字体样式，优先级低于各个子控制器的 text 内的 fontFamily */
  readonly fontFamily?: string;

  /** 播放速度，1 个 tick 花费时间 */
  readonly speed?: number;
  /** 是否循环播放 */
  readonly loop?: boolean;
  /** 是否隐藏右下角的 ’播放时间类型切换器‘ */
  readonly hideTimeTypeController: boolean;

  /** ‘上一帧’按钮的样式，同时可以为其配置 scale、offsetX、offsetY 单独控制该控制器的缩放以及平移 */
  readonly preBtnStyle?: ShapeStyle;

  /** ‘下一帧’按钮的样式，同时可以为其配置 scale、offsetX、offsetY 单独控制该控制器的缩放以及平移 */
  readonly nextBtnStyle?: ShapeStyle;

  /** ‘播放’ 与 ‘暂停’ 按钮的样式，同时可以为其配置 scale、offsetX、offsetY 单独控制该控制器的缩放以及平移 */
  readonly playBtnStyle?: ShapeStyle;

  /** ‘速度控制器’ 的样式，包括速度的指针、速度指示滚轮（横线）、文本的样式，同时可以为 speedControllerStyle 及其子图形样式配置 scale、offsetX、offsetY 单独控制该控制器及其子图形的缩放以及平移） */
  readonly speedControllerStyle?: {
    offsetX?: number,
    offsetY?: number;
    scale?: number
    pointer?: ShapeStyle,
    scroller?: ShapeStyle,
    text?: ShapeStyle
  };

  /** ‘播放时间类型切换器’ 的样式，包括 checkbox 的框、checkbox 的选中勾、文本的样式，同时可以为 timeTypeControllerStyle 及其子图形样式配置 scale、offsetX、offsetY 单独控制该控制器及其子图形的缩放以及平移  */
  readonly timeTypeControllerStyle?: {
    offsetX?: number,
    offsetY?: number;
    scale?: number
    check?: ShapeStyle,
    box?: ShapeStyle,
    text?: ShapeStyle
  };
  /** [v4.5.1 起支持] 控制栏背景方框的样式 */
  readonly containerStyle?: ExtendedShapeStyle;
  /** ‘播放时间类型切换器’单一文本时的文本，默认为‘单一时间’ */
  readonly timePointControllerText?: string;
  /** ‘播放时间类型切换器’单一文本时的文本，默认为‘时间范围’ */
  readonly timeRangeControllerText?: string;
}>
```

#### ControllerCfg 参数说明

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| x | number | 0 | 控制栏开始 x 坐标 |
| y | number | 0 | 控制栏开始 y 坐标 |
| width | number | TimeBar 宽度 | 控制栏宽度，将不缩放内部子控制器，仅影响它们的位置分布 |
| height | number | 40 | 控制栏高度，将不缩放内部子控制器，仅影响它们的位置分布 |
| scale | number | 1 | 控制栏缩放比例 |
| speed | number | 1 | 播放速度 |
| loop | boolean | false | 暂不支持，是否循环播放 |
| hideTimeTypeController | boolean | true | 是否隐藏时间类型切换 |
| fill | string |  | 控制栏背景框填充色 |
| stroke | string |  | 整个控制栏的字体样式，优先级低于各个子控制器的 text 内的 fontFamily |
| preBtnStyle | string | null | 控制栏背景框边框色 |
| preBtnStyle | ShapeStyle | null | ‘上一帧’按钮的样式，同时可以为其配置 `scale`、`offsetX`、`offsetY` 单独控制该控制器的缩放以及平移 |
| nextBtnStyle | ShapeStyle | null | ‘下一帧’按钮的样式，同时可以为其配置 `scale`、`offsetX`、`offsetY` 单独控制该控制器的缩放以及平移 |
| playBtnStyle | ShapeStyle | null | ‘播放’ 与 ‘暂停’ 按钮的样式，同时可以为其配置 `scale`、`offsetX`、`offsetY` 单独控制该控制器的缩放以及平移 |
| speedControllerStyle | { offsetX?: number, offsetY?: number, scale?: number, pointer?: ShapeStyle, text?: ShapeStyle, scroller?: ShapeStyle} | null | ‘速度控制器’ 的样式，包括速度的指针、速度指示滚轮（横线）、文本的样式，同时可以为 `speedControllerStyle` 及其子图形样式配置 `scale`、`offsetX`、`offsetY` 单独控制该控制器及其子图形的缩放以及平移 |
| timeTypeControllerStyle | { offsetX?: number, offsetY?: number, scale?: number, box?: ShapeStyle, check?: ShapeStyle, text?: ShapeStyle } | null | ‘播放时间类型切换器’ 的样式，包括 checkbox 的框、checkbox 的选中勾、文本的样式，同时可以为 `timeTypeControllerStyle` 及其子图形样式配置 `scale`、`offsetX`、`offsetY` 单独控制该控制器及其子图形的缩放以及平移 |
| containerStyle ｜ ShapeStyle | {} | 控制栏背景方框的样式 |
| timePointControllerText | string | "单一时间" | 右下角“单一时间”文本，默认为”单一时间“ |
| timePointControllerText | string | "时间范围" | 右下角“单一时间”文本，默认为”时间范围时间“ |
