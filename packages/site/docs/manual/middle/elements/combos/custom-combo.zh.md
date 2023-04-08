---
title: 自定义 Combo
order: 2
---

G6 提供了一系列[内置 Combo](/zh/docs/manual/middle/elements/combos/default-combo)，包括 [circle](/zh/docs/manual/middle/elements/combos/built-in/circle)、[rect](/zh/docs/manual/middle/elements/combos/built-in/rect)。若内置 Combo 无法满足需求，用户还可以通过 `G6.registerCombo ('comboName', options, expendedComboName)` 进行**自定义扩展内置的 Combo**，方便用户开发更加定制化的 Combo，包括含有复杂图形的 Combo、复杂交互的 Combo、带有动画的 Combo 等。

在本章中，我们通过两个案例，讲解通过自定义扩展现有 Combo。

## Combo 接口

通过 [图形 Shape](/zh/docs/manual/middle/elements/shape/shape-keyshape) 章节的学习，我们应该已经知道了自定义 Combo 时需要满足以下两点：

- 控制 Combo 的生命周期；
- 解析用户输入的数据，在图形上展示。

在自定义扩展内置 'circle' 或 'rect' Combo 时，API 中可以复写的方法如下：

```javascript
G6.registerCombo(
  'comboName',
  {
    /**
     * 绘制 Combo 中的图形。不需要为默认的 label 增加图形，父类方法会自动增加 label
     * @param  {Object} cfg Combo 的配置项
     * @param  {G.Group} group 图形分组，Combo 中的图形对象的容器
     * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 combo.get('keyShape') 可以获取。
     * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
     */
    drawShape(cfg, group) {},
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg Combo 的配置项
     * @param  {G.Group} group 图形分组，Combo 中的图形对象的容器
     */
    afterDraw(cfg, group) {},
    /**
     * 更新节点后的操作，新增的图形需要在这里控制其更新逻辑
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Combo} combo 节点
     */
    afterUpdate(cfg, combo) {},
    /**
     * 响应 Combo 的状态变化。
     * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Combo} combo 节点
     */
    setState(name, value, combo) {},
  },
  // 被继承的 Combo 类型名，可选：'circle' 或 'rect'
  extendedComboName,
);
```

## 注意事项(必读)

因 Combo 更新逻辑的特殊性（需要根据其子元素信息自动更新自身位置和大小），自定义 Combo 时，与自定义节点/边有所不同：

1. 不建议“从无到有”地自定义 Combo，**推荐使用继承的方式**扩展内置的 'circle' 或 'rect' Combo；
2. 在 `drawShape` 方法中不需要为 label 增加图形，父类方法将会自动增加默认的 label，可以通过配置的方式指定 label 的位置和样式；
3. 与自定义节点/边不同，这里**不建议复写 `update` 和 `draw` 方法**，否则会使 Combo 根据子元素更新的逻辑异常；
4. 复写的 `drawShape` 方法返回值与推荐继承内置的 'circle'、'rect' 的 keyShape 一致。即继承 'circle' 时，`drawShape` 方法应该返回一个 circle 图形；继承 'rect' 时，`drawShape` 方法应该返回一个 rect 图形；
5. 除 keyShape 外，自定义新增的图形需要**在 `afterUpdate` 中定义其位置更新逻辑**；
6. `setState` 只有在需要使用动画来响应状态变化时需要被复写，一般的样式响应状态变化可以通过 [配置状态样式](/zh/docs/manual/middle/states/state#配置-state-样式) 实现。

## 1. 自定义扩展内置 Rect Combo

<a href='/zh/examples/item/customCombo#cRect' target='_blank'>Demo</a>。

### 内置 Rect Combo 位置逻辑详解

首先，我们需要了解内置的 rect 类型的 Combo 内部的位置逻辑：

- 下图灰色虚线框内部是子元素的分布范围，其宽高分别为 innerWidth 和 innerHeight；
- 灰色虚线框上下左右可以配置 `padding` 值，该 Combo 的 keyShape 真实绘制大小 width 与 height 是 innerWidth 和 innerHeight 加上了 padding 后的值；
- 一个 Combo 内部的图形以自身坐标系为参考，原点 (0, 0) 在灰色虚线框正中心；
- padding 值的上与下、左与右可能不相等，这就导致了该矩形的左上角坐标不是简单的 (-width / 2, -height / 2)，而是通过如图标注的计算获得；
- rect 类型 Combo 的 label 默认位于矩形内部左上角，上边距为 refY，左边距为 refX。label 的位置（`position`）、`refX`、`refY` 可以在使用该类型 Combo 时配置。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hNHlQ7647uYAAAAAAAAAAABkARQnAQ' width='500' alt='img'/>

> Rect Combo 位置说明图

### 绘制图形

现在，我们自己实现一个如下图所示的 Combo 类型（下图展示空 Combo）：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2-SWQKDHFygAAAAAAAAAAABkARQnAQ' width='120' alt='img'/>

根据上述 [内置 Rect Combo 位置逻辑详解](#内置-rect-combo-位置逻辑详解)，在扩展 rect 类型 Combo 时需要注意复写方法中 `x`、`y`、`width`、`height` 的设置

```javascript
G6.registerCombo(
  'cRect',
  {
    drawShape: function drawShape(cfg, group) {
      const self = this;
      // 获取配置中的 Combo 内边距
      cfg.padding = cfg.padding || [50, 20, 20, 20];
      // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
      const style = self.getShapeStyle(cfg);
      // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
      const rect = group.addShape('rect', {
        attrs: {
          ...style,
          x: -style.height / 2 - padding[0],
          y:  -style.width / 2 - padding[3],
          width: style.width,
          height: style.height,
        },
        draggable: true,
        name: 'combo-keyShape', // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
      });
      // 增加右侧圆
      group.addShape('circle', {
        attrs: {
          ...style,
          fill: '#fff',
          opacity: 1,
          // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
          x: cfg.style.width / 2 + cfg.padding[1],
          y: (cfg.padding[2] - cfg.padding[0]) / 2,
          r: 5,
        },
        draggable: true,
        name: 'combo-circle-shape', // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
      });
      return rect;
    },
    // 定义新增的右侧圆的位置更新逻辑
    afterUpdate: function afterUpdate(cfg, combo) {
      const group = combo.get('group');
      // 在该 Combo 的图形分组根据 name 找到右侧圆图形
      const circle = group.find((ele) => ele.get('name') === 'combo-circle-shape');
      // 更新右侧圆位置
      circle.attr({
        // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
        x: cfg.style.width / 2 + cfg.padding[1],
        y: (cfg.padding[2] - cfg.padding[0]) / 2,
      });
    },
  },
  'rect',
);
```

值得注意的是，G6 3.3 需要用户为自定义节点中的图形设置 `name` 和 `draggable`。**其中，`name` 的值必须在同一元素类型内唯一**。`draggable` 为 `true` 是表示允许该图形响应鼠标的拖拽事件，只有 `draggable: true` 时，图上的交互行为 `'drag-combo'` 才能在该图形上生效。若上面代码仅在 keyShape 上设置了 `draggable: true`，而右侧圆图形上没有设置，则鼠标拖拽只能在 keyShape 上响应。

### 使用自定义 Combo

现在，我们使用下面的代码使用 `'cRect'` 类型的 Combo：

```javascript
const data = {
  nodes: [
    { id: 'node1', x: 250, y: 100, comboId: 'combo1' },
    { id: 'node2', x: 300, y: 100, comboId: 'combo1' },
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3' },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 800,
  // 全局 Combo 配置
  defaultCombo: {
    // 指定 Combo 类型，也可以将 type 写到 combo 数据中
    type: 'cRect',
    // ... 此处可配置默认 Combo 的其他样式
  },
});
graph.data(data);
graph.render();
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HEtYR5OUgLcAAAAAAAAAAABkARQnAQ' width='400' alt='img'/>

## 2. 自定义扩展内置 Circle Combo

<a href='/zh/examples/item/customCombo#cCircle' target='_blank'>Demo</a>。

### 内置 Circle Combo 位置逻辑详解

如下面 Circle Combo 位置说明图所示，circle 类型的 Combo 内部的位置逻辑比 rect 类型简单，其 (x, y) 为圆心，`padding` 为一个数值：

- 下图灰色虚线圈内部是子元素的分布范围，其半径为 innerR；
- 与 rect 不同的是，灰色虚线圈的 `padding` 是一个数值，即灰色虚线圈外围的 padding 是均匀的，该 Combo 的 keyShape 真实绘制半径 R = innerR + padding；
- 一个 Combo 内部的图形以自身坐标系为参考，原点 (0, 0) 在灰色虚线框正中心（由于 padding 是均匀的，所以原点也在 keyShape 正中心）；
- circle 图形的 x 与 y 为其圆心 (0, 0)；
- circle 类型 Combo 的 label 默认位于圆形外部正上方，距离圆形上边缘 refY。label 的位置（`position`）、`refX`、`refY` 可以在使用该类型 Combo 时配置。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NjJxRLYvCykAAAAAAAAAAABkARQnAQ' alt='img' width='300'/>

> Circle Combo 位置说明图

### 绘制图形

现在，我们自己实现一个如下图所示的 Combo 类型（下图展示空 Combo）：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rMknSIUfjnkAAAAAAAAAAABkARQnAQ' width='120' alt='img'/>

```javascript
// 定义下面需要使用的 symbol
const collapseIcon = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
  ];
};
const expandIcon = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};

G6.registerCombo(
  'cCircle',
  {
    drawShape: function draw(cfg, group) {
      const self = this;
      // 获取样式配置，style.r 是加上了 padding 的半径
      // 对应 Circle Combo 位置说明图中的 R
      const style = self.getShapeStyle(cfg);
      // 绘制一个 circle 作为 keyShape，与 'circle' Combo 的 keyShape 一致
      const circle = group.addShape('circle', {
        attrs: {
          ...style,
          x: 0,
          y: 0,
          r: style.r,
        },
        draggable: true,
        name: 'combo-keyShape', // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
      });
      // 增加下方 marker
      const marker = group.addShape('marker', {
        attrs: {
          ...style,
          fill: '#fff',
          opacity: 1,
          x: 0,
          y: style.r,
          r: 10,
          symbol: collapseIcon,
        },
        draggable: true,
        name: 'combo-marker-shape',// 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
      });

      return circle;
    },
    // 定义新增的下方 marker 的位置更新逻辑
    afterUpdate: function afterUpdate(cfg, combo) {
      const self = this;
      // 获取样式配置，style.r 是加上了 padding 的半径
      // 对应 Circle Combo 位置说明图中的 R    const style = self.getShapeStyle(cfg);
      const group = combo.get('group');
      // 在该 Combo 的图形分组根据 name 找到下方 marker
      const marker = group.find((ele) => ele.get('name') === 'combo-marker-shape');
      // 更新 marker
      marker.attr({
        x: 0,
        y: style.r,
        // 数据中的 collapsed 代表该 Combo 是否是收缩状态，根据该字段更新 symbol
        symbol: cfg.collapsed ? expandIcon : collapseIcon,
      });
    },
  },
  'circle',
);
```

值得注意的是，G6 3.3 需要用户为自定义节点中的图形设置 `name` 和 `draggable`。**其中，`name` 的值必须在同一元素类型内唯一**。`draggable` 为 `true` 是表示允许该图形响应鼠标的拖拽事件，只有 `draggable: true` 时，图上的交互行为 `'drag-combo'` 才能在该图形上生效。若上面代码仅在 keyShape 上设置了 `draggable: true`，而右侧圆图形上没有设置，则鼠标拖拽只能在 keyShape 上响应。

### 使用自定义 Combo

现在，我们使用下面的代码使用 `'cCircle'` 类型的 Combo：

```javascript
const data = {
  nodes: [
    { id: 'node1', x: 250, y: 100, comboId: 'combo1' },
    { id: 'node2', x: 300, y: 100, comboId: 'combo1' },
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3' },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 800,
  // 全局 Combo 配置
  defaultCombo: {
    // 指定 Combo 类型，也可以将 type 写到 combo 数据中
    type: 'cCircle',
    labelCfg: {
      refY: 2,
    },
    // ... 此处可配置默认 Combo 的其他样式
  },
  modes: {
    default: [
      // 配置展开/收缩 Combo 交互，双击 Combo 可以触发
      // 将会修改响应 Combo 数据中的 collapsed 字段，从而标识该 Combo 是否处于收缩状态
      'collapse-expand-combo',
    ],
  },
});
graph.data(data);
graph.render();
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1LelSq5TP9EAAAAAAAAAAABkARQnAQ' alt='img' width='400'/>

### 自定义交互

在上面代码中，实例化图时为图配置了 `'collapse-expand-combo'` 交互，即双击 Combo 可以展开和收起。若我们希望在单击 Combo 下方的 marker 时，展开/收起 Combo，则可以去掉 `'collapse-expand-combo'` 配置，并添加如下监听代码：

```javascript
// collapse/expand when click the marker
graph.on('combo:click', (e) => {
  if (e.target.get('name') === 'combo-marker-shape') {
    // Collapse or expand the combo
    graph.collapseExpandCombo(e.item);

    if (graph.get('layout')) graph.layout();
    // If there is a layout configured on the graph, relayout
    else graph.refreshPositions(); // Refresh positions for items otherwise
  }
});
```
