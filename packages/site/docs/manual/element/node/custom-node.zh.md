---
title: 自定义节点
order: 3
---

G6 提供了一系列 [内置节点](/manual/element/node/build-in/base-node)，包含 [circle（圆形节点）](/manual/element/node/build-in/circle)、[diamond（菱形节点）](/manual/element/node/build-in/diamond)、[donut（甜甜圈节点）](/manual/element/node/build-in/donut)、[ellipse（椭圆节点）](/manual/element/node/build-in/ellipse)、[hexagon（六边形节点）](/manual/element/node/build-in/hexagon)、[html（HTML节点）](/manual/element/node/build-in/html)、[image（图片节点）](/manual/element/node/build-in/image)、[rect（矩形节点）](/manual/element/node/build-in/rect)、[star（星形节点）](/manual/element/node/build-in/star) 和 [triangle（三角形节点）](/manual/element/node/build-in/triangle)。这些内置节点能够满足大部分基础场景需求。

但在实际项目中，你可能会遇到这些基础节点无法满足的需求。这时，你需要创建自定义节点。别担心，这比你想象的要简单！

## 开始之前：了解节点的基本构成

在 G6 中，一个完整的节点通常由多个部分组成，就像搭积木一样，这些部分组合在一起形成一个功能丰富的节点。

<img width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ot4bSbBx97EAAAAAAAAAAAAADmJ7AQ/original" />

主要组成部分：

- 主体形状 (key) - 节点的基本几何形状，比如矩形、圆形等
- 标签 (label) - 显示节点名称或描述的文本
- 图标 (icon) - 展示类型或状态的小图标
- 徽标 (badge) - 位于节点角落的小标记
- 光晕 (halo) - 围绕节点主体的发光效果
- 连接点 (port) - 边线可以连接的点

## 三步创建你的第一个自定义节点

### 第一步：编写自定义节点类

让我们从一个简单的例子开始 - 创建一个带标签的矩形节点：

```js
import { Rect, register, Graph, ExtensionCategory } from '@antv/g6';

// 创建自定义节点，继承自 Rect
class MyFirstNode extends Rect {
  get data() {
    return this.context.graph.getNodeData(this.id).data;
  }

  getCustomLabelStyle(attributes) {
    return {
      x: 0,
      y: 0,
      text: this.data.label, // 使用节点数据中的label字段
      fontSize: 14,
      fill: '#000',
      textAlign: 'center',
      textBaseline: 'middle',
    };
  }

  drawCustomLabelShape(attributes, container) {
    const customLabelStyle = this.getCustomLabelStyle(attributes);
    this.upsert('custom-label', 'text', customLabelStyle, container);
  }

  // 渲染方法是自定义节点的核心
  render(attributes = this.parsedAttributes, container) {
    // 1. 先调用父类渲染方法，绘制基础矩形
    super.render(attributes, container);

    // 2. 插入一个自定义的标签
    this.drawCustomLabelShape(attributes, container);
  }
}
```

### 第二步：注册自定义节点

注册节点类型，这样 G6 才能识别你的自定义节点：

```js
register(ExtensionCategory.NODE, 'my-first-node', MyFirstNode);
```

### 第三步：应用自定义节点

在图配置中使用自定义节点：

```js
const graph = new Graph({
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
        data: { label: '我的第一个自定义节点' },
      },
      // 其他节点...
    ],
  },
  node: {
    type: 'my-first-node', // 指定使用我们的自定义节点
    style: {
      fill: '#e8f7ff', // 矩形背景色
      lineWidth: 2, // 矩形边宽
      stroke: '#1890ff', // 矩形边框色
      radius: 5, // 圆角半径
      width: 120,
      height: 50,
    },
  },
  // 其他图配置...
});

graph.render();
```

🎉 恭喜！你已经创建了第一个自定义节点。它看起来很简单，但这个过程包含了自定义节点的核心思想：**继承一个基础节点类型**，然后 **重写 `render` 方法** 来添加自定义内容。

## 更进一步：理解节点绘制的原理

在 G6 中创建自定义节点，本质上是在 Canvas 上绘制各种图形。我们使用一系列 "原子图形" 作为基础构建块，就像乐高积木中的不同形状。

### 常用原子图形及其应用场景

在 G6 中，提供了多种原子图形供你使用：

| 图形   | 类型       | 描述                                                                                                                                                                          |
| ------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 圆形   | `circle`   | 可以参考 SVG 的 [\<circle\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/circle) 元素                                                                  |
| 椭圆   | `ellipse`  | 可以参考 SVG 的 [\<ellipse\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/ellipse) 元素                                                                |
| 图片   | `image`    | 可以参考 SVG 的 [\<image\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/image) 元素                                                                              |
| 直线   | `line`     | 可以参考 SVG 的 [\<line\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/line) 元素                                                                                |
| 路径   | `path`     | 使用 Path 可以定义直线、折线、圆弧、贝塞尔曲线等。路径中包含一组命令与参数，这些命令有不同的语义，[具体用法](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths) |
| 多边形 | `polygon`  | 可以参考 SVG 的 [\<polygon\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/polygon) 元素                                                                          |
| 折线   | `polyline` | 可以参考 SVG 的 [\<polyline\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/polyline) 元素                                                                        |
| 矩形   | `rect`     | 可以参考 SVG 的 [\<rect\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/rect) 元素                                                                                |
| 文本   | `text`     | 提供简单的单行/多行文本排版能力，单行支持水平对齐、字符间距；多行支持显式换行符以及自动换行，垂直对齐                                                                         |

> 更多原子图形和详细的属性请参考 [元素 - 图形（可选）](/manual/element/shape/overview)

### `upsert(name, Ctor, style, container, hooks)`

在创建自定义节点时，你会频繁用到 `upsert` 方法。它是 "update or insert" 的缩写，负责添加或更新节点中的图形元素：

```js
this.upsert(
  'element-key', // 元素的唯一标识
  'circle', // 图形类型，如 'rect', 'circle' 等
  { x: 100, y: 100, fill: '#a975f3' }, // 样式配置对象
  container, // 父容器
);
```

为什么要使用 `upsert` 而不直接通过 `container.appendChild()` 创建图形？因为：

1. **性能更好**：当节点状态变化或数据更新时，会智能地复用已有图形，而不是删除再重建，大大提高了渲染性能
2. **代码更简洁**：不需要手动判断元素是否存在 ⚠️ 区别于 v4
3. **便于管理**：所有通过 `upsert` 创建的图形都会被记录在节点的 `shapeMap` 中，你可以通过 `this.getShape(key)` 轻松获取

### `getShape(name)`

有时，你需要在创建后修改某个子图形的属性，或者让子图形之间有交互关联。这时，`getShape` 方法可以帮你获取之前通过 `upsert` 创建的任何图形：

**⚠️ 注意**：图形的顺序很重要，如果图形 B 依赖图形 A 的位置，必须确保 A 先创建

## 从简单到复杂：逐步构建功能丰富的节点

让我们通过实际例子，逐步增加节点的复杂度和功能。

### 带图标和标签的节点

```js
class IconNode extends Rect {
  getCustomIconStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    const { icon } = this.data;
    return {
      x: -width / 2 + 15, // 左侧15px处
      y: 0,
      width: 20,
      height: 20,
      img: icon || 'default-icon.png',
    };
  }

  drawCustomIconShape(attributes, container) {
    const iconStyle = this.getCustomIconStyle(attributes);
    this.upsert('custom-icon', 'image', iconStyle, container);
  }

  getCustomLabelStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    const { label } = this.data;
    return {
      x: -width / 2 + 45, // 图标右侧10px处
      y: 0,
      text: label || '',
      fontSize: 14,
      fill: '#333',
      textAlign: 'left',
      textBaseline: 'middle',
    };
  }

  drawCustomLabelShape(attributes, container) {
    const labelStyle = this.getCustomLabelStyle(attributes);
    this.upsert('custom-label', 'text', labelStyle, container);
  }

  render(attributes, container) {
    // 渲染基础矩形
    super.render(attributes, container);

    const [width, height] = this.getSize(attributes);
    const { icon, label } = this.data;

    // 添加图标
    this.drawCustomIconShape(attributes, container);

    // 添加标签(在图标右侧)
    this.drawCustomLabelShape(attributes, container);
  }
}

register(ExtensionCategory.NODE, 'icon-node', IconNode);
```

### 添加交互行为

```js
import { Rect, register, Graph, ExtensionCategory } from '@antv/g6';

class ClickableNode extends Rect {
  getButtonStyle(attributes) {
    return {
      x: 40,
      y: -10,
      width: 20,
      height: 20,
      radius: 10,
      fill: '#1890ff',
      cursor: 'pointer', // 鼠标指针变为手型
    };
  }

  drawButtonShape(attributes, container) {
    const btnStyle = this.getButtonStyle(attributes, container);
    const btn = this.upsert('button', 'rect', btnStyle, container);

    // 为按钮添加点击事件
    if (!btn.__clickBound) {
      btn.addEventListener('click', (e) => {
        // 阻止事件冒泡，避免触发节点的点击事件
        e.stopPropagation();

        // 执行业务逻辑
        console.log('Button clicked on node:', this.id);

        // 如果数据中有回调函数，则调用
        if (typeof attributes.onButtonClick === 'function') {
          attributes.onButtonClick(this.id, this.data);
        }
      });
      btn.__clickBound = true; // 标记已绑定事件，避免重复绑定
    }
  }

  render(attributes, container) {
    super.render(attributes, container);

    // 添加一个按钮
    this.drawButtonShape(attributes, container);
  }
}

register(ExtensionCategory.NODE, 'clickable-node', ClickableNode);

const graph = new Graph({
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
      },
      // 其他节点...
    ],
  },
  node: {
    type: 'clickable-node', // 指定使用我们的自定义节点
    style: {
      size: [60, 30],
      fill: '#e8f7ff', // 矩形背景色
      lineWidth: 2, // 矩形边宽
      stroke: '#1890ff', // 矩形边框色
      radius: 5, // 圆角半径
      onButtonClick: (id, data) => {},
    },
  },
  // 其他图配置...
});

graph.render();
```

### 调整状态样式

常见的交互都需要节点和边通过样式变化做出反馈，例如鼠标移动到节点上、点击选中节点/边、通过交互激活边上的交互等，都需要改变节点和边的样式，有两种方式来实现这种效果：

1. 在自定义节点类中处理状态变化；
2. 将交互状态同原始数据和绘制节点的逻辑分开，仅更新节点。

我们推荐用户使用第二种方式来实现节点的状态调整，可以通过以下方式来实现：

1. 实现自定义节点；
2. 在图配置项中配置节点状态样式；
3. 通过 `graph.setElementState()` 方法来设置节点状态。

基于 rect 扩展出一个 hole 图形，默认填充色为白色，当鼠标点击时变成红色，实现这一效果的示例代码如下：

```js
import { Rect, register, Graph, ExtensionCategory } from '@antv/g6';

// 1. 定义节点类
class SelectableNode extends Rect {
  getHoleStyle(attributes) {
    return {
      x: 20,
      y: -10,
      radius: 4,
      width: 20,
      height: 20,
      fill: attributes.holeFill,
    };
  }

  drawHoleShape(attributes, container) {
    const holeStyle = this.getHoleStyle(attributes, container);

    this.upsert('hole', 'rect', holeStyle, container);
  }

  render(attributes, container) {
    super.render(attributes, container);

    this.drawHoleShape(attributes, container);
  }
}

// 2. 注册节点
register(ExtensionCategory.NODE, 'selectable-node', SelectableNode, true);

// 3. 创建图实例
const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
  },
  node: {
    type: 'selectable-node',
    style: {
      size: [120, 60],
      radius: 6,
      holeFill: '#fff',
    },
    state: {
      // 鼠标选中状态
      selected: {
        holeFill: 'red',
      },
    },
  },
});

// 4. 添加节点交互
graph.on('node:click', (evt) => {
  const nodeId = evt.target.id;

  graph.setElementState(nodeId, ['selected']);
});

graph.render();
```
