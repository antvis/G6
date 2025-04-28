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

- `key` ：节点的主图形，如矩形、圆形等基本形状
- `label` ：文本标签，通常用于展示节点的名称或描述
- `icon` ：图标，展示节点的类型或状态
- `badge` ：徽标，位于节点角落的小标记
- `halo` ：节点主图形周围展示的光晕效果
- `port` ：连接桩，边线可以连接的点

## 自定义节点的方式 <Badge type="warning">选择合适的方式</Badge>

创建自定义节点的方式主要有两种途径：

### 1. 继承现有节点类型 <Badge type="success">推荐</Badge>

这是最常用的方式，你可以选择继承以下类型之一：

- [`BaseNode`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/base-node.ts) - 最基础的节点类，提供节点的核心功能
- [`Circle`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/circle.ts) - 圆形节点
- [`Rect`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/rect.ts) - 矩形节点
- [`Ellipse`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/ellipse.ts) - 椭圆节点
- [`Diamond`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/diamond.ts) - 菱形节点
- [`Triangle`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/triangle.ts) - 三角形节点
- [`Star`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/star.ts) - 星形节点
- [`Image`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/image.ts) - 图片节点
- [`Donut`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/donut.ts) - 甜甜圈节点
- [`Hexagon`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/hexagon.ts) - 六边形节点

**为什么选择这种方式？**

- 📌 **代码量少**：复用现有节点的属性和方法，只需专注于新增功能
- 📌 **开发迅速**：适合大多数项目需求，快速实现业务目标
- 📌 **易于维护**：代码结构清晰，继承关系明确

### 2. 基于 G 图形系统从零开发 <Badge>高级用法</Badge>

如果现有节点类型都不满足需求，你可以基于 G 的底层图形系统从零创建节点。

**为什么选择这种方式？**

- 📌 **最大自由度**：完全控制节点的每个细节，实现任意复杂效果
- 📌 **特殊需求**：现有节点类型无法满足的高度定制场景
- 📌 **性能优化**：针对特定场景的性能优化

:::warning{title=注意事项}
从零开发的自定义节点需要自行处理所有细节，包括图形绘制、事件响应、状态变化等，开发难度较大。这里可以直接参考 [源码](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/nodes/base-node.ts) 进行实现。
:::

## 三步创建你的第一个自定义节点

让我们从一个简单的例子开始 - 创建一个 **带有主副标题的矩形节点**：

```js | ob {pin:false}
(() => {
  const { Graph, register, Rect, ExtensionCategory } = g6;

  // 第一步：创建自定义节点类
  class DualLabelNode extends Rect {
    // 副标题样式
    getSubtitleStyle(attributes) {
      return {
        x: 0,
        y: 45, // 放在主标题下方
        text: attributes.subtitle || '',
        fontSize: 12,
        fill: '#666',
        textAlign: 'center',
        textBaseline: 'middle',
      };
    }

    // 绘制副标题
    drawSubtitleShape(attributes, container) {
      const subtitleStyle = this.getSubtitleStyle(attributes);
      this.upsert('subtitle', 'text', subtitleStyle, container);
    }

    // 渲染方法
    render(attributes = this.parsedAttributes, container) {
      // 1. 渲染基础矩形和主标题
      super.render(attributes, container);

      // 2. 添加副标题
      this.drawSubtitleShape(attributes, container);
    }
  }

  // 第二步：注册自定义节点
  register(ExtensionCategory.NODE, 'dual-label-node', DualLabelNode);

  // 第三步：使用自定义节点
  const container = createContainer({ height: 200 });

  const graph = new Graph({
    container,
    data: {
      nodes: [
        {
          id: 'node1',
          style: { x: 100, y: 100 },
          data: {
            title: '节点 A', // 主标题
            subtitle: '你的第一个自定义节点', // 副标题
          },
        },
      ],
    },
    node: {
      type: 'dual-label-node',
      style: {
        fill: '#7FFFD4',
        stroke: '#5CACEE',
        lineWidth: 2,
        radius: 5,
        // 主标题样式
        labelText: (d) => d.data.title,
        labelFill: '#222',
        labelFontSize: 14,
        labelFontWeight: 500,
        // 副标题
        subtitle: (d) => d.data.subtitle,
      },
    },
  });

  graph.render();

  return container;
})();
```

### 第一步：编写自定义节点类

继承 G6 的 `Rect`（矩形节点），并添加一个副标题：

```js
import { Rect, register, Graph, ExtensionCategory } from '@antv/g6';

// 创建自定义节点，继承自 Rect
class DualLabelNode extends Rect {
  // 副标题样式
  getSubtitleStyle(attributes) {
    return {
      x: 0,
      y: 45, // 放在主标题下方
      text: attributes.subtitle || '',
      fontSize: 12,
      fill: '#666',
      textAlign: 'center',
      textBaseline: 'middle',
    };
  }

  // 绘制副标题
  drawSubtitleShape(attributes, container) {
    const subtitleStyle = this.getSubtitleStyle(attributes);
    this.upsert('subtitle', 'text', subtitleStyle, container);
  }

  // 渲染方法
  render(attributes = this.parsedAttributes, container) {
    // 1. 渲染基础矩形和主标题
    super.render(attributes, container);

    // 2. 添加副标题
    this.drawSubtitleShape(attributes, container);
  }
}
```

### 第二步：注册自定义节点

使用 `register` 方法注册节点类型，这样 G6 才能识别你的自定义节点：

```js
register(ExtensionCategory.NODE, 'dual-label-node', DualLabelNode);
```

`register` 方法需要三个参数：

- 扩展类别：`ExtensionCategory.NODE` 表示这是一个节点类型
- 类型名称：`dual-label-node` 是我们给这个自定义节点起的名字，后续会在配置中使用
- 类定义：`DualLabelNode` 是我们刚刚创建的节点类

### 第三步：应用自定义节点

在图配置中使用自定义节点：

```js
const graph = new Graph({
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
        data: {
          title: '节点 A', // 主标题
          subtitle: '你的第一个自定义节点', // 副标题
        },
      },
    ],
  },
  node: {
    type: 'dual-label-node',
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
      radius: 8,
      // 主标题样式
      labelText: (d) => d.data.title,
      labelFill: '#222',
      labelFontSize: 14,
      labelFontWeight: 500,
      // 副标题
      subtitle: (d) => d.data.subtitle,
    },
  },
});

graph.render();
```

🎉 恭喜！你已经创建了第一个自定义节点。它看起来很简单，但这个过程包含了自定义节点的核心思想：**继承一个基础节点类型**，然后 **重写 `render` 方法** 来添加自定义内容。

## 更进一步：理解节点绘制的原理

在 G6 中创建自定义节点，本质上是在 Canvas 上绘制各种图形。我们使用一系列 "原子图形" 作为基础构建块，就像乐高积木中的不同形状。

### 原子图形

G6 的节点是由 [G 图形系统](https://g.antv.antgroup.com/) 提供的图形原子单元绘制而成。以下是常见图形元素及其用途：

| 图形元素 | 类型       | 描述                                                                                                                                                                        |
| -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 圆形     | `circle`   | 适合表示状态、头像、圆形按钮等。可以参考 SVG 的 [\<circle\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/circle) 元素                                |
| 椭圆     | `ellipse`  | 与 circle 类似，但支持横纵轴不同的场景。可以参考 SVG 的 [\<ellipse\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/ellipse) 元素                      |
| 图片     | `image`    | 用于展示图标、用户头像、LOGO 等。可以参考 SVG 的 [\<image\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/image) 元素                                           |
| 直线     | `line`     | 用于装饰、辅助连接等。可以参考 SVG 的 [\<line\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/line) 元素                                                        |
| 路径     | `path`     | 支持复杂图形，如箭头、圆弧、曲线、贝塞尔路径等。路径中包含一组命令与参数，这些命令有不同的语义，[具体用法](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths) |
| 多边形   | `polygon`  | 支持自定义图形，如五角星、箭头。可以参考 SVG 的 [\<polygon\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/polygon) 元素                                        |
| 折线     | `polyline` | 多点折线，适合复杂的连线结构。可以参考 SVG 的 [\<polyline\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/polyline) 元素                                        |
| 矩形     | `rect`     | 最常用图形，适合作为容器、卡片、按钮等基础结构。可以参考 SVG 的 [\<rect\>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/rect) 元素                              |
| 文本     | `text`     | 显示名称、描述、标签等内容。提供简单的单行/多行文本排版能力，单行支持水平对齐、字符间距；多行支持显式换行符以及自动换行，垂直对齐                                           |

> 更多原子图形和详细的属性请参考 [元素 - 图形（可选）](/manual/element/shape/overview)

所有这些图形都可通过 `upsert()` 动态创建或更新，并自动管理图形状态和生命周期。

### 元素基类

开始自定义元素之前，你需要了解 G6 元素基类中的一些重要属性和方法：

#### 属性

| 属性       | 类型                          | 描述                       |
| ---------- | ----------------------------- | -------------------------- |
| shapeMap   | Record<string, DisplayObject> | 当前元素下所有图形的映射表 |
| animateMap | Record<string, IAnimation>    | 当前元素下所有动画的映射表 |

#### 方法

#### `upsert(name, Ctor, style, container, hooks)`: 图形创建/更新

在创建自定义元素时，你会频繁用到 `upsert` 方法。它是 "update or insert" 的缩写，负责添加或更新元素中的图形：

```typescript
upsert(key: string, Ctor: { new (...args: any[]): DisplayObject }, style: Record<string, any>, container: DisplayObject);
```

| 参数      | 类型                                    | 描述                                                                                                                                                                                                                                   |
| --------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key       | string                                  | 图形的 key，即 `shapeMap` 中对应的 key。内置的 key 包括 `'key'` `'label'` `'halo'` `'icon'` `'port'` `'badge'`<br/> key 不应使用特殊符号，会基于该值转化为驼峰形式调用 `getXxxStyle` 和 `drawXxxShape` 方法（见[元素约定](#元素约定)） |
| Ctor      | { new (...args: any[]): DisplayObject } | 图形类                                                                                                                                                                                                                                 |
| style     | Record<string, any>                     | 图形样式                                                                                                                                                                                                                               |
| container | DisplayObject                           | 挂载图形的容器                                                                                                                                                                                                                         |

例如，插入一个固定位置的紫色圆形：

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
2. **代码更简洁**：不需要手动判断元素是否存在
3. **便于管理**：所有通过 `upsert` 创建的图形都会被记录在节点的 `shapeMap` 中，你可以通过 `this.getShape(key)` 轻松获取

#### `render(attributes, container)`: 渲染节点的主入口

每个自定义节点类都必须实现 `render(attributes, container)` 方法，它定义了该节点如何被“绘制”出来。你可以在这里使用各种原子图形，组合出你想要的结构。

```typescript
render(style: Record<string, any>, container: Group): void;
```

| 参数      | 类型                | 描述     |
| --------- | ------------------- | -------- |
| style     | Record<string, any> | 元素样式 |
| container | Group               | 容器     |

#### `getShape(name)`: 获取已创建的图形

有时，你需要在创建后修改某个子图形的属性，或者让子图形之间有交互关联。这时，`getShape` 方法可以帮你获取之前通过 `upsert` 创建的任何图形：

**⚠️ 注意**：图形的顺序很重要，如果图形 B 依赖图形 A 的位置，必须确保 A 先创建

### 元素约定

- **使用约定属性**

目前约定的元素属性包括：

- 通过 `this.getSize()` 获取元素的尺寸

- **采用 `getXxxStyle` 和 `drawXxxShape` 配对的方式进行图形绘制**

`getXxxStyle` 用于获取图形样式，`drawXxxShape` 用于绘制图形。通过该方式创建的图形支持自动执行动画。

> 其中 `Xxx` 是调用 [upsert](#方法) 方法时传入的 key 的驼峰形式。

- **可通过 `this.context` 访问 Graph 上下文**

### 生命周期钩子

提供了以下生命周期钩子函数，你可以在自定义节点中重写这些方法，在关键时刻执行特定逻辑：

| 钩子函数    | 触发时机                   | 典型用途                                     |
| ----------- | -------------------------- | -------------------------------------------- |
| `onCreate`  | 当节点创建后完成入场动画时 | 绑定交互事件、初始化节点状态、添加外部监听器 |
| `onUpdate`  | 当节点更新后完成更新动画时 | 更新依赖数据、调整相关元素、触发联动效果     |
| `onDestroy` | 当节点完成退场动画并销毁后 | 清理资源、移除外部监听器、执行销毁通知       |

### 状态响应

G6 元素设计中最强大的一点，是可以将 **“状态响应”** 与 **“绘制逻辑”** 分离。

你可以在节点配置中定义每种状态下的样式：

```js
node: {
  type: 'custom-node',
  style: { fill: '#fff' },
  state: {
    selected: {
      fill: '#f00',
    },
    hover: {
      lineWidth: 3,
      stroke: '#1890ff',
    },
  },
}
```

切换状态的方法:

```js
graph.setElementState(nodeId, ['selected']);
```

这个状态会传入到 `render()` 方法的 `attributes` 中，由内部系统合并后的结果自动应用在图形上。

也可以根据状态自定义渲染逻辑：

```typescript
protected getKeyStyle(attributes: Required<BaseNodeStyleProps>) {
  const style = super.getKeyStyle(attributes);

  // 根据状态调整样式
  if (attributes.states?.includes('selected')) {
    return {
      ...style,
      stroke: '#1890ff',
      lineWidth: 2,
      shadowColor: 'rgba(24,144,255,0.2)',
      shadowBlur: 15,
    };
  }

  return style;
}
```

## 从简单到复杂：逐步构建功能丰富的节点

让我们通过实际例子，逐步增加节点的复杂度和功能。

### 带图标和标签的节点

在节点左上角放一个图标和标签文字。

> 👇 步骤说明：
>
> 1. 继承 Rect 节点
> 2. 添加图标（image）
> 3. 添加标签（text）

```js | ob
(() => {
  const { Graph, register, Rect, ExtensionCategory } = g6;

  class IconNode extends Rect {
    get data() {
      return this.context.graph.getNodeData(this.id).data;
    }

    getCustomIconStyle(attributes) {
      const [width, height] = this.getSize(attributes);
      const { icon } = this.data;
      return {
        x: -width / 2 + 4, // 左侧15px处
        y: -height / 2 + 4,
        width: 20,
        height: 20,
        src: icon,
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
        x: -width / 2 + 26, // 图标右侧10px处
        y: -height / 2 + 14,
        text: label || '',
        fontSize: 10,
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

      // 添加图标
      this.drawCustomIconShape(attributes, container);

      // 添加标签(在图标右侧)
      this.drawCustomLabelShape(attributes, container);
    }
  }

  register(ExtensionCategory.NODE, 'custom-icon-node', IconNode);

  const container = createContainer({ height: 200 });

  const graph = new Graph({
    container,
    data: {
      nodes: [
        {
          id: 'node1',
          style: { x: 100, y: 100 },
          data: {
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
            label: 'AntV',
          },
        },
      ],
    },
    node: {
      type: 'custom-icon-node',
      style: {
        size: [120, 60],
        fill: '#fff',
        stroke: '#873bf4',
        lineWidth: 2,
        radius: 2,
        labelText: 'G6',
        labelPlacement: 'middle',
        labelFontSize: 16,
        labelOffsetY: 6,
      },
    },
  });

  graph.render();

  return container;
})();
```

### 可点击按钮的节点

给节点加一个蓝色按钮，点击后触发事件（打印日志或执行回调）。

```js | ob
(() => {
  const { Graph, register, Rect, ExtensionCategory } = g6;

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

  const container = createContainer({ height: 200 });

  const graph = new Graph({
    container,
    data: {
      nodes: [
        {
          id: 'node1',
          style: { x: 100, y: 100 },
        },
      ],
    },
    node: {
      type: 'clickable-node', // 指定使用我们的自定义节点
      style: {
        size: [60, 30],
        fill: '#7FFFD4',
        stroke: '#5CACEE',
        lineWidth: 2,
        radius: 5,
        onButtonClick: (id, data) => {},
      },
    },
  });

  graph.render();

  return container;
})();
```

### 响应状态变化的节点（点击变色）

常见的交互都需要节点和边通过样式变化做出反馈，例如鼠标移动到节点上、点击选中节点/边、通过交互激活边上的交互等，都需要改变节点和边的样式，有两种方式来实现这种效果：

1. 从 `data.states` 获取当前状态，在自定义节点类中处理状态变化；
2. 将交互状态同原始数据和绘制节点的逻辑分开，仅更新节点。

我们推荐用户使用第二种方式来实现节点的状态调整，可以通过以下方式来实现：

1. 实现自定义节点；
2. 在图配置项中配置节点状态样式；
3. 通过 `graph.setElementState()` 方法来设置节点状态。

基于 rect 扩展出一个 hole 图形，默认填充色为白色，当鼠标点击时变成橙色，实现这一效果的示例代码如下：

```js | ob
(() => {
  const { Rect, register, Graph, ExtensionCategory } = g6;

  // 1. 定义节点类
  class SelectableNode extends Rect {
    getHoleStyle(attributes) {
      return {
        x: 20,
        y: -10,
        radius: 10,
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
  const container = createContainer({ height: 200 });

  const graph = new Graph({
    container,
    data: {
      nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
    },
    node: {
      type: 'selectable-node',
      style: {
        size: [120, 60],
        radius: 6,
        fill: '#7FFFD4',
        stroke: '#5CACEE',
        lineWidth: 2,
        holeFill: '#fff',
      },
      state: {
        // 鼠标选中状态
        selected: {
          holeFill: 'orange',
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

  return container;
})();
```
