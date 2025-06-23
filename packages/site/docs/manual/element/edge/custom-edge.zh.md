---
title: 自定义边
order: 10
---

G6 提供了多种[内置边](/manual/element/edge/build-in/base-edge)类型，例如直线边、折线边、贝塞尔曲线边等。但在实际项目中，你可能需要创建具有特定样式或交互效果的自定义边。

## 开始之前：了解边的基本构成

在 G6 中，一条完整的边通常由以下几个部分组成：

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YKN7TasqOh4AAAAAAAAAAAAADmJ7AQ/original" />

- `key` ：边的主图形，表示边的主要形状，例如直线、折线等；
- `label` ：文本标签，通常用于展示边的名称或描述；
- `arrow` ：箭头，用于表示边的方向；
- `halo` ：主图形周围展示的光晕效果的图形。

## 自定义边的方式 <Badge type="warning">选择合适的方式</Badge>

创建自定义边的方式与自定义节点类似，主要有两种途径：

### 1. 继承现有边类型 <Badge type="success">推荐</Badge>

这是最常用的方式，你可以选择继承以下类型之一：

- [`BaseEdge`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/base-edge.ts) - 最基础的边类，提供边的核心功能
- [`Line`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/line.ts) - 直线边
- [`Polyline`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/polyline.ts) - 折线边
- [`Quadratic`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/quadratic.ts) - 二次贝塞尔曲线边
- [`Cubic`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/cubic.ts) - 三次贝塞尔曲线边
- [`CubicVertical`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/cubic-vertical.ts) - 垂直三次贝塞尔曲线边
- [`CubicHorizontal`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/cubic-horizontal.ts) - 水平三次贝塞尔曲线边

**为什么选择这种方式？**

- 📌 **代码量少**：复用现有节点的属性和方法，只需专注于新增功能
- 📌 **开发迅速**：适合大多数项目需求，快速实现业务目标
- 📌 **易于维护**：代码结构清晰，继承关系明确

### 2. 基于 G 图形系统从零开发 <Badge>高级用法</Badge>

如果现有边类型都不满足需求，你可以基于 G 的底层图形系统从零创建边。

**为什么选择这种方式？**

- 📌 **最大自由度**：完全控制边的每个细节，实现任意复杂效果
- 📌 **特殊需求**：现有边类型无法满足的高度定制场景
- 📌 **性能优化**：针对特定场景的性能优化

:::warning{title=注意事项}
从零开发的自定义边需要自行处理所有细节，包括图形绘制、事件响应、状态变化等，开发难度较大。这里可以直接参考 [源码](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/edges/base-edge.ts) 进行实现。
:::

## 三步创建你的第一个自定义边

让我们从最基础的 `BaseEdge` 开始，实现一个自定义直线边：

```js | ob { pin:false, inject: true }
import { Graph, register, BaseEdge, ExtensionCategory } from '@antv/g6';

class MyLineEdge extends BaseEdge {
  getKeyStyle(attributes) {
    return { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#A4D3EE' };
  }

  getKeyPath(attributes) {
    const { sourceNode, targetNode } = this;
    const [x1, y1] = sourceNode.getPosition();
    const [x2, y2] = targetNode.getPosition();

    return [
      ['M', x1, y1],
      ['L', x2, y2],
    ];
  }
}

register(ExtensionCategory.EDGE, 'my-line-edge', MyLineEdge);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 50 } },
      { id: 'node2', style: { x: 300, y: 120 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
    },
  },
  edge: {
    type: 'my-line-edge',
    style: {
      zIndex: 3,
    },
  },
});

graph.render();
```

### 第一步：编写自定义边类

```typescript
import { BaseEdge } from '@antv/g6';
import type { BaseEdgeStyleProps } from '@antv/g6';

class MyLineEdge extends BaseEdge {
  // 定义边的样式，可以添加或覆盖默认样式
  protected getKeyStyle(attributes: Required<BaseEdgeStyleProps>) {
    // 调用父类方法获取基础样式，然后添加自定义样式
    return { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#A4D3EE' };
  }

  // 实现抽象方法：定义边的路径
  // 这是 BaseEdge 的抽象方法，所有子类必须实现
  protected getKeyPath(attributes) {
    // 获取源节点和目标节点
    const { sourceNode, targetNode } = this;

    // 获取节点的位置坐标
    const [x1, y1] = sourceNode.getPosition();
    const [x2, y2] = targetNode.getPosition();

    // 返回SVG路径数组，定义从起点到终点的直线
    return [
      ['M', x1, y1],
      ['L', x2, y2],
    ];
  }
}
```

:::success{title=关键方法解析}

- `getKeyStyle`: 定义边的基本样式，如线宽、颜色等
- `getKeyPath`: 是 `BaseEdge` 中的抽象方法，**必须实现**，它定义了边的路径形状
  :::

### 第二步：注册自定义边

使用 `register` 方法注册边类型，这样 G6 才能识别你的自定义边：

```js
import { ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.EDGE, 'my-line-edge', MyLineEdge);
```

`register` 方法需要三个参数：

- 扩展类别：`ExtensionCategory.EDGE` 表示这是一个边类型
- 类型名称：`my-line-edge` 是我们给这个自定义边起的名字，后续会在配置中使用
- 类定义：`MyLineEdge` 是我们刚刚创建的边类

### 第三步：应用自定义边

在图的配置中，通过设置 `edge.type` 来使用我们的自定义边：

```js
const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 100 } },
      { id: 'node2', style: { x: 300, y: 150 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    style: {
      fill: '#7FFFD4',
      stroke: '#5CACEE',
      lineWidth: 2,
    },
  },
  edge: {
    type: 'my-line-edge',
    style: {
      zIndex: 3,
    },
  },
});

graph.render();
```

🎉 恭喜！你已经创建了第一个自定义边。

## 更进一步：理解边绘制的原理

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

1. **性能更好**：当状态变化或数据更新时，会智能地复用已有图形，而不是删除再重建，大大提高了渲染性能
2. **代码更简洁**：不需要手动判断元素是否存在
3. **便于管理**：所有通过 `upsert` 创建的图形都会被记录在节点的 `shapeMap` 中，你可以通过 `this.getShape(key)` 轻松获取

#### `render(attributes, container)`: 渲染边的主入口

每个自定义边类都必须实现 `render(attributes, container)` 方法，它定义了该边如何被“绘制”出来。你可以在这里使用各种原子图形，组合出你想要的结构。

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
- 通过 `const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false)` 获取边的起点和终点（简单模式 - 不考虑节点形状，直接返回节点中心点或最近连接桩中心˝位置）
- 通过 `const [sourcePoint, targetPoint] = this.getEndpoints(attributes)` 获取边的起点和终点（优化模式 - 默认为 true，考虑节点形状，返回节点边界上的连接点）

- **采用 `getXxxStyle` 和 `drawXxxShape` 配对的方式进行图形绘制**

`getXxxStyle` 用于获取图形样式，`drawXxxShape` 用于绘制图形。通过该方式创建的图形支持自动执行动画。

> 其中 `Xxx` 是调用 [upsert](#方法) 方法时传入的 key 的驼峰形式。

- **可通过 `this.context` 访问 Graph 上下文**

### 生命周期钩子

提供了以下生命周期钩子函数，你可以在自定义边中重写这些方法，在关键时刻执行特定逻辑：

| 钩子函数    | 触发时机                 | 典型用途                                   |
| ----------- | ------------------------ | ------------------------------------------ |
| `onCreate`  | 当边创建后完成入场动画时 | 绑定交互事件、初始化边状态、添加外部监听器 |
| `onUpdate`  | 当边更新后完成更新动画时 | 更新依赖数据、调整相关元素、触发联动效果   |
| `onDestroy` | 当边完成退场动画并销毁后 | 清理资源、移除外部监听器、执行销毁通知     |

### 状态响应

G6 元素设计中最强大的一点，是可以将 **“状态响应”** 与 **“绘制逻辑”** 分离。

你可以在边配置中定义每种状态下的样式：

```js
edge: {
  type: 'custom-edge',
  style: { stroke: '#eee' },
  state: {
    selected: {
      stroke: '#f00',
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
graph.setElementState(edgeId, ['selected']);
```

这个状态会传入到 `render()` 方法的 `attributes` 中，由内部系统合并后的结果自动应用在图形上。

也可以根据状态自定义渲染逻辑：

```typescript
protected getKeyStyle(attributes: Required<BaseEdgeStyleProps>) {
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

## 从简单到复杂

### 自定义路径的折线边

```js | ob { inject: true }
import { Graph, register, BaseEdge, ExtensionCategory } from '@antv/g6';

class MyPolylineEdge extends BaseEdge {
  getKeyPath(attributes) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);

    return [
      ['M', sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], targetPoint[1]],
      ['L', targetPoint[0], targetPoint[1]],
    ];
  }
}

register(ExtensionCategory.EDGE, 'my-polyline-edge', MyPolylineEdge);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      { id: 'node-0', style: { x: 100, y: 50, ports: [{ key: 'right', placement: [1, 0.5] }] } },
      { id: 'node-1', style: { x: 250, y: 150, ports: [{ key: 'left', placement: [0, 0.5] }] } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'my-polyline-edge',
    style: {
      startArrow: true,
      endArrow: true,
      stroke: '#F6BD16',
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```

### 额外标签

```js | ob { inject: true }
import { Graph, Line, register, BaseEdge, ExtensionCategory, subStyleProps } from '@antv/g6';

class LabelEdge extends Line {
  render(attributes, container) {
    super.render(attributes);
    this.drawEndLabel(attributes, container, 'start');
    this.drawEndLabel(attributes, container, 'end');
  }

  drawEndLabel(attributes, container, type) {
    const key = type === 'start' ? 'startLabel' : 'endLabel';
    const [x, y] = this.getEndpoints(attributes)[type === 'start' ? 0 : 1];

    const fontStyle = {
      x,
      y,
      dx: type === 'start' ? 15 : -15,
      fontSize: 16,
      fill: 'gray',
      textBaseline: 'middle',
      textAlign: type,
    };
    const style = subStyleProps(attributes, key);
    const text = style.text;
    this.upsert(`label-${type}`, 'text', text ? { ...fontStyle, ...style } : false, container);
  }
}

register(ExtensionCategory.EDGE, 'extra-label-edge', LabelEdge);

const graph = new Graph({
  container: 'container',
  height: 200,
  data: {
    nodes: [
      { id: 'node-0', style: { x: 100, y: 100 } },
      { id: 'node-1', style: { x: 300, y: 100 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'extra-label-edge',
    style: {
      startArrow: true,
      endArrow: true,
      stroke: '#F6BD16',
      startLabelText: 'start',
      endLabelText: 'end',
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```
