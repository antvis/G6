---
title: 自定义 Combo
order: 3
---

G6 提供了两种 [内置组合](/manual/element/combo/build-in/base-combo) 类型：圆形组合和矩形 Combo 。但在复杂的业务场景中，你可能需要创建具有特定样式、交互效果或行为逻辑的自定义 Combo 。

## 开始之前：了解 Combo 的基本构成

在 G6 中，一个完整的 Combo 通常由以下几个部分组成：

<image width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z-OxR4MAdUwAAAAAAAAAAAAADmJ7AQ/original" />

- `key` ： Combo 的主图形，表示 Combo 的主要形状，如圆形、矩形等；
- `label` ：文本标签，通常用于展示 Combo 的名称或描述；
- `halo` ：主图形周围展示的光晕效果的图形；

### Combo 的特殊性

Combo 不同于普通节点，它具有以下特性：

1. **包含性**： Combo 可以包含节点和其他 Combo ，形成层级结构
2. **两种状态**：展开(Expanded)和收起(Collapsed)状态
3. **自适应大小**：根据内部元素动态调整大小
4. **拖拽行为**：支持整体拖拽及内部元素拖入/拖出

## 自定义 Combo 的方式 <Badge type="warning">选择合适的方式</Badge>

创建自定义 Combo 的方式有两种途径：

### 1. 继承现有 Combo 类型 <Badge type="success">推荐</Badge>

这是最常用的方式，你可以选择继承以下类型之一：

- [`BaseCombo`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/combos/base-combo.ts) - 最基础的 Combo 类，提供 Combo 的核心功能
- [`Circle`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/combos/circle.ts) - 圆形 Combo
- [`Rect`](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/combos/rect.ts) - 矩形 Combo

**为什么选择这种方式？**

- 📌 **代码量少**：复用现有 Combo 的属性和方法，只需专注于新增功能
- 📌 **开发迅速**：适合大多数项目需求，快速实现业务目标
- 📌 **易于维护**：代码结构清晰，继承关系明确

### 2. 基于 G 图形系统从零开发 <Badge>高级用法</Badge>

如果现有 Combo 类型都不满足需求，你可以基于 G 的底层图形系统从零创建 Combo。

**为什么选择这种方式？**

- 📌 **最大自由度**：完全控制 Combo 的每个细节，实现任意复杂效果
- 📌 **特殊需求**：现有 Combo 类型无法满足的高度定制场景
- 📌 **性能优化**：针对特定场景的性能优化

:::warning{title=注意事项}
从零开发的自定义 Combo 需要自行处理所有细节，包括图形绘制、事件响应、状态变化、展开/收起逻辑等，开发难度较大。这里可以直接参考 [源码](https://github.com/antvis/G6/blob/v5/packages/g6/src/elements/combos/base-combo.ts) 进行实现。
:::

## 三步创建你的第一个自定义 Combo

让我们从继承 `BaseCombo` 开始，实现一个自定义六边形 Combo ：

```js | ob {pin:false}
(() => {
  const { Graph, register, BaseCombo, ExtensionCategory } = g6;

  // 定义收起状态的按钮路径
  const collapse = (x, y, r) => {
    return [
      ['M', x - r, y],
      ['a', r, r, 0, 1, 0, r * 2, 0],
      ['a', r, r, 0, 1, 0, -r * 2, 0],
      ['M', x - r + 4, y],
      ['L', x + r - 4, y],
    ];
  };

  // 定义展开状态的按钮路径
  const expand = (x, y, r) => {
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

  class HexagonCombo extends BaseCombo {
    // 获取六边形的路径
    getKeyPath(attributes) {
      const [width, height] = this.getKeySize(attributes);
      const padding = 10;
      const size = Math.min(width, height) + padding;

      // 计算六边形的顶点
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = (size / 2) * Math.cos(angle);
        const y = (size / 2) * Math.sin(angle);
        points.push([x, y]);
      }

      // 构建SVG路径
      const path = [['M', points[0][0], points[0][1]]];
      for (let i = 1; i < 6; i++) {
        path.push(['L', points[i][0], points[i][1]]);
      }
      path.push(['Z']);

      return path;
    }

    // 获取主图形样式
    getKeyStyle(attributes) {
      const style = super.getKeyStyle(attributes);

      return {
        ...style,
        d: this.getKeyPath(attributes),
        fill: attributes.collapsed ? '#FF9900' : '#F04864',
        fillOpacity: attributes.collapsed ? 0.5 : 0.2,
        stroke: '#54BECC',
        lineWidth: 2,
      };
    }

    // 绘制主图形
    drawKeyShape(attributes, container) {
      return this.upsert('key', 'path', this.getKeyStyle(attributes), container);
    }

    // 绘制展开/收起按钮，使用路径实现更精细的控制
    drawCollapseButton(attributes) {
      const { collapsed } = attributes;
      const [width] = this.getKeySize(attributes);
      const btnR = 8;
      const x = width / 2 + btnR;
      const d = collapsed ? expand(x, 0, btnR) : collapse(x, 0, btnR);

      // 创建点击区域和按钮图形
      const hitArea = this.upsert('hit-area', 'circle', { cx: x, r: 8, fill: '#fff', cursor: 'pointer' }, this);
      this.upsert('button', 'path', { stroke: '#54BECC', d, cursor: 'pointer', lineWidth: 1.4 }, hitArea);
    }

    // 重写render方法，添加更多自定义图形
    render(attributes, container) {
      super.render(attributes, container);
      this.drawCollapseButton(attributes, container);
    }

    // 使用生命周期钩子添加事件监听
    onCreate() {
      this.shapeMap['hit-area'].addEventListener('click', () => {
        const id = this.id;
        const collapsed = !this.attributes.collapsed;
        const { graph } = this.context;
        if (collapsed) graph.collapseElement(id);
        else graph.expandElement(id);
      });
    }
  }

  // 注册自定义 Combo
  register(ExtensionCategory.COMBO, 'hexagon-combo', HexagonCombo);

  // 创建图实例并使用自定义 Combo
  const container = createContainer({ height: 250 });

  const graph = new Graph({
    container,
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1', style: { x: 100, y: 100 } },
        { id: 'node2', combo: 'combo1', style: { x: 150, y: 150 } },
        { id: 'node3', combo: 'combo2', style: { x: 300, y: 100 } },
        { id: 'node4', combo: 'combo2', style: { x: 350, y: 150 } },
      ],
      combos: [
        { id: 'combo1', data: { label: 'Hexagon 1' } },
        { id: 'combo2', data: { label: 'Hexagon 2' }, style: { collapsed: true } },
      ],
    },
    node: {
      style: {
        fill: '#91d5ff',
        stroke: '#1890ff',
        lineWidth: 1,
      },
    },
    combo: {
      type: 'hexagon-combo',
      style: {
        padding: 20,
        showCollapseButton: true,
        labelText: (d) => d.data?.label,
        labelPlacement: 'top',
      },
    },
    behaviors: ['drag-element'],
  });

  graph.render();

  return container;
})();
```

### 第一步：编写自定义 Combo 类

```typescript
import { BaseCombo } from '@antv/g6';
import type { BaseComboStyleProps } from '@antv/g6';

// 定义按钮路径生成函数
const collapse = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x + r - 4, y],
  ];
};

const expand = (x, y, r) => {
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

class HexagonCombo extends BaseCombo {
  // 获取六边形的路径
  protected getKeyPath(attributes: Required<BaseComboStyleProps>) {
    const [width, height] = this.getKeySize(attributes);
    const padding = 10;
    const size = Math.min(width, height) + padding;

    // 计算六边形的顶点
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = (size / 2) * Math.cos(angle);
      const y = (size / 2) * Math.sin(angle);
      points.push([x, y]);
    }

    // 构建 SVG 路径
    const path = [['M', points[0][0], points[0][1]]];
    for (let i = 1; i < 6; i++) {
      path.push(['L', points[i][0], points[i][1]]);
    }
    path.push(['Z']);

    return path;
  }

  // 获取主图形样式，直接使用路径数据
  protected getKeyStyle(attributes: Required<BaseComboStyleProps>) {
    const style = super.getKeyStyle(attributes);

    return {
      ...style,
      d: this.getKeyPath(attributes),
      fill: attributes.collapsed ? '#FF9900' : '#F04864',
      fillOpacity: attributes.collapsed ? 0.5 : 0.2,
      stroke: '#54BECC',
      lineWidth: 2,
    };
  }

  // 绘制主图形，使用 path 类型直接传入样式对象
  protected drawKeyShape(attributes: Required<BaseComboStyleProps>, container: Group) {
    return this.upsert('key', 'path', this.getKeyStyle(attributes), container);
  }

  // 绘制收起/展开按钮，使用 SVG 路径实现更精细的控制
  protected drawCollapseButton(attributes: Required<BaseComboStyleProps>) {
    const { collapsed } = attributes;
    const [width] = this.getKeySize(attributes);
    const btnR = 8;
    const x = width / 2 + btnR;
    const d = collapsed ? expand(x, 0, btnR) : collapse(x, 0, btnR);

    // 创建点击区域和按钮图形
    const hitArea = this.upsert('hit-area', 'circle', { cx: x, r: 8, fill: '#fff', cursor: 'pointer' }, this);
    this.upsert('button', 'path', { stroke: '#54BECC', d, cursor: 'pointer', lineWidth: 1.4 }, hitArea);
  }

  // 使用生命周期钩子方法绑定事件
  onCreate() {
    this.shapeMap['hit-area'].addEventListener('click', () => {
      const id = this.id;
      const collapsed = !this.attributes.collapsed;
      const { graph } = this.context;
      if (collapsed) graph.collapseElement(id);
      else graph.expandElement(id);
    });
  }
}
```

### 第二步：注册自定义 Combo

```js
import { ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.COMBO, 'hexagon-combo', HexagonCombo);
```

### 第三步：应用自定义 Combo

```js
const graph = new Graph({
  // ...其他配置
  combo: {
    type: 'hexagon-combo', // 使用注册时的名称
    style: {
      padding: 20,
      showCollapseButton: true,
      labelText: (d) => d.data?.label,
      labelPlacement: 'top',
    },
  },
  // 由于我们自己实现了折叠展开功能，这里只需要拖拽行为
  behaviors: ['drag-element'],
});
```

🎉 恭喜！你已经创建了第一个自定义 Combo 。

## 更进一步：理解 Combo 绘制的原理

### Combo 与节点的区别

虽然 Combo 继承自 `BaseNode`，但有一些关键区别：

1. **自适应大小**： Combo 会根据内部元素自动计算合适的大小
2. **展开/收起状态**： Combo 有两种显示状态，并需要处理状态切换
3. **层级结构**： Combo 可以嵌套，形成层级关系
4. **内部元素管理**： Combo 需要管理其包含的节点和子 Combo

### 原子图形

G6 的 Combo 是由 [G 图形系统](https://g.antv.antgroup.com/) 提供的图形原子单元绘制而成。原子图形的介绍请参考 [元素 - 图形（可选）](/manual/element/shape/overview) 文档。

所有这些图形都可通过 `upsert()` 动态创建或更新，并自动管理图形状态和生命周期。

### 元素基类

开始自定义 Combo 之前，你需要了解 G6 元素基类中的一些重要属性和方法：

#### 属性

| 属性       | 类型                          | 描述                       |
| ---------- | ----------------------------- | -------------------------- |
| shapeMap   | Record<string, DisplayObject> | 当前元素下所有图形的映射表 |
| animateMap | Record<string, IAnimation>    | 当前元素下所有动画的映射表 |

#### 方法

#### `upsert(name, Ctor, style, container, hooks)`: 图形创建/更新

在创建自定义 Combo 时，你会频繁用到 `upsert` 方法。它是 "update or insert" 的缩写，负责添加或更新元素中的图形：

```typescript
upsert(key: string, Ctor: { new (...args: any[]): DisplayObject }, style: Record<string, any>, container: DisplayObject);
```

| 参数      | 类型                                    | 描述                                                                                                                                                                                                                                    |
| --------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key       | string                                  | 图形的 key，即 `shapeMap` 中对应的 key。内置的 key 包括 `'key'` `'label'` `'halo'` `'icon'` `'port'` `'badge'`<br/> key 不应使用特殊符号，会基于该值转化为驼峰形式调用 `getXxxStyle` 和 `drawXxxShape` 方法（见 [元素约定](#元素约定)） |
| Ctor      | { new (...args: any[]): DisplayObject } | 图形类                                                                                                                                                                                                                                  |
| style     | Record<string, any>                     | 图形样式                                                                                                                                                                                                                                |
| container | DisplayObject                           | 挂载图形的容器                                                                                                                                                                                                                          |

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

#### `render(attributes, container)`: 渲染组合的主入口

每个自定义 Combo 类都必须实现 `render(attributes, container)` 方法，它定义了该组合如何被"绘制"出来。你可以在这里使用各种原子图形，组合出你想要的结构。

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

组合中约定的元素属性包括：

- 通过 `this.getKeySize(attributes)` 获取组合的尺寸，考虑折叠状态和子元素
- 通过 `this.getContentBBox(attributes)` 获取内容区域的边界盒
- 通过 `this.getComboPosition(attributes)` 获取组合的当前位置，基于状态和子元素

- **采用 `getXxxStyle` 和 `drawXxxShape` 配对的方式进行图形绘制**

`getXxxStyle` 用于获取图形样式，`drawXxxShape` 用于绘制图形。通过该方式创建的图形支持自动执行动画。

> 其中 `Xxx` 是调用 [upsert](#方法) 方法时传入的 key 的驼峰形式。

- **可通过 `this.context` 访问 Graph 上下文**

### 生命周期钩子

提供了以下生命周期钩子函数，你可以在自定义 Combo 中重写这些方法，在关键时刻执行特定逻辑：

| 钩子函数    | 触发时机                   | 典型用途                                     |
| ----------- | -------------------------- | -------------------------------------------- |
| `onCreate`  | 当组合创建后完成入场动画时 | 绑定交互事件、初始化组合状态、添加外部监听器 |
| `onUpdate`  | 当组合更新后完成更新动画时 | 更新依赖数据、调整相关元素、触发联动效果     |
| `onDestroy` | 当组合完成退场动画并销毁后 | 清理资源、移除外部监听器、执行销毁通知       |

### 状态响应

G6 元素设计中最强大的一点，是可以将 **"状态响应"** 与 **"绘制逻辑"** 分离。

你可以在组合配置中定义每种状态下的样式：

```js
combo: {
  type: 'custom-combo',
  style: {
    fill: '#f0f2f5',
    stroke: '#d9d9d9'
  },
  state: {
    selected: {
      stroke: '#1890ff',
      lineWidth: 2,
      shadowColor: 'rgba(24,144,255,0.2)',
      shadowBlur: 15,
    },
    hover: {
      fill: '#e6f7ff',
    },
  },
}
```

切换状态的方法:

```js
graph.setElementState(comboId, ['selected']);
```

这个状态会传入到 `render()` 方法的 `attributes` 中，由内部系统合并后的结果自动应用在图形上。

也可以根据状态自定义渲染逻辑：

```typescript
protected getKeyStyle(attributes: Required<BaseComboStyleProps>) {
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
