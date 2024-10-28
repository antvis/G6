---
title: Element - 元素
order: 2
---

## 概述

G6 中图元素包括**节点(Node)**、**边(Edge)**、**组合(Combo)**，它们是图的基本构成单元。

一个元素是由一个或多个原子图形组合而成，原子图形是 G6 中的最小图形单元，包括[矩形](https://g.antv.antgroup.com/api/basic/rect)、[圆形](https://g.antv.antgroup.com/api/basic/circle)、[文本](https://g.antv.antgroup.com/api/basic/text)、[路径](https://g.antv.antgroup.com/api/basic/path)等。

例如一个节点可以由一个矩形和一个文本组成，一个边可以由一条路径和一个文本组成。

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2ZewT4T1p_4AAAAAAAAAAAAADmJ7AQ/original" />

G6 内置了丰富的图元素类型，同时也支持用户自定义图元素，用户可以根据自己的需求定义新的图元素类型。

## 配置元素

与 G6 4.x 不同，G6 5.x 中单个图元素的全部配置是平铺在同一个对象下的，不会有嵌套的情况，对于节点中不同部分的配置采用前缀进行区分，例如设置节点的填充颜色和标签名：

```typescript
{
  node: {
    style: {
      fill: 'orange',
      labelText: 'node',
    },
  },
};
```

采用这种方式的好处是在开发过程中，能够更容易地找到对应的配置项，同时也能够更方便地进行配置的合并。如果你使用的 `VSCode` 编辑器，可以看到元素的全部可配置属性，并可基于关键字进行搜索：

<image width="800" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oY_uTK80sIoAAAAAAAAAAAAADmJ7AQ/original" />

## 节点

节点通常用来表示图中的实体或者抽象概念，例如一个人、一个地点、一个组织等，节点可以包含一些属性，例如节点的 ID、名称、类型等。

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TZt2S7Z0d-8AAAAAAAAAAAAADmJ7AQ/original" />

G6 提供了以下内置节点：

- `Circle` 圆形节点
- `Diamond` 菱形节点
- `Donut` 甜甜圈节点
- `Ellipse` 椭圆节点
- `Hexagon` 六边形节点
- `HTML` HTML 节点
- `Image` 图片节点
- `Rect` 矩形节点
- `Star` 星形节点
- `Triangle` 三角形节点

你可以直接通过配置 `type` 来使用：

```typescript
// 在数据中指定节点类型
const data = {
  nodes: [{ id: 'node-1', type: 'circle' }],
};

// 在节点配置中指定节点类型
{
  node: {
    type: 'circle',
  }
}
```

通常来说，大多数节点具有相同的样式属性，例如都使用 `size` 来指定节点的大小。你可以在[Element - 节点](/api/elements/nodes/base-node)中查看节点的具体样式属性。

某些特殊的节点可能会有自己的样式属性，例如 `HTML` 节点的 `innerHTML` 属性用于指定节点的 HTML 内容。具体的样式属性可以参考[节点样式](/api/elements/nodes/html)。

除此之外，G6 官方提供了一些额外的节点需要安装后使用：

`@antv/g6-extension-3d` 提供了 3D 节点：

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ShNXTp0u3vkAAAAAAAAAAAAADmJ7AQ/original" />

- `Capsule` 胶囊型节点
- `Cone` 圆锥型节点
- `Cube` 立方体节点
- `Cylinder` 圆柱型节点
- `Plane` 平面节点
- `Sphere` 球体节点
- `Torus` 圆环节点

`@antv/g6-extension-react` 提供了适用于 React 框架的节点：

<image width="350" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7jypQbkp00wAAAAAAAAAAAAADmJ7AQ/original" />

- `ReactNode` React 节点
- `GNode` 采用 JSX 写法的 `@antv/g` 节点

### 节点构成

G6 中提供的节点由以下几部分构成：

<image width="250" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ot4bSbBx97EAAAAAAAAAAAAADmJ7AQ/original" />

- `key` ：节点的主图形，表示节点的主要形状，例如矩形、圆形等；
- `label` ：文本标签，通常用于展示节点的名称或描述；
- `icon` ：图标图形，通常用于展示节点的图标，可以是图片或者文本图标；
- `badge` ：默认位于节点右上角的徽标；
- `halo` ：主图形周围展示的光晕效果的图形；
- `port` ：节点上的连接点，用于连接边。

### 注册节点

你可以直接使用内置节点，但是如果你想要使用其他节点或者自定义节点，你需要先进行注册：

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomNode } from 'package-name/or/path-to-your-custom-node';

register(ExtensionCategory.NODE, 'custom-node', CustomNode);
```

### 配置节点

你可以通过以下方式配置节点类型及其样式：

1. 在数据中配置：

```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "custom-node",
      "style": {
        // 节点样式
      }
    }
  ]
}
```

2. 在节点样式映射中配置：

```typescript
{
  node: {
    type: 'custom-node',
    style: {
      // 节点样式
    }
  }
}
```

### 自定义节点

如果内置节点元素无法满足需求，可以自定义节点元素，具体请参考[自定义节点](/manual/custom-extension/element#自定义节点)。

## 边

你可以在任意两个节点或者组合之间创建边，也可以在两个节点/组合之间创建多条边来表示不同的关系。

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YKN7TasqOh4AAAAAAAAAAAAADmJ7AQ/original" />

G6 提供了以下内置边：

- `Line` 直线边
- `Polyline` 折线边
- `Quadratic` 二次贝塞尔曲线边
- `Cubic` 三次贝塞尔曲线边
- `CubicVertical` 垂直三次贝塞尔曲线边
- `CubicHorizontal` 水平三次贝塞尔曲线边

边的配置和节点类似，你可以通过配置 `type` 来使用：

```typescript
// 在数据中指定边类型
const data = {
  edges: [{ source: 'node-1', target: 'node-2', type: 'line' }],
};

// 在边配置中指定边类型
{
  edge: {
    type: 'line',
  }
}
```

G6 中的边是有方向的，即从源节点指向目标节点，但可以隐藏箭头来表示无方向的边。

```typescript
{
  edge: {
    style: {
      startArrow: false,
      endArrow: false,
    },
  },
};
```

### 边构成

G6 中提供的边由以下几部分构成：

<image height="100" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cVHVQJKLOlgAAAAAAAAAAAAADmJ7AQ/original" />

- `key` ：边的主图形，表示边的主要形状，例如直线、折线等；
- `label` ：文本标签，通常用于展示边的名称或描述；
- `arrow` ：箭头，用于表示边的方向；
- `halo` ：主图形周围展示的光晕效果的图形。

### 注册边

边的注册方式和节点类似：

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomEdge } from 'package-name/or/path-to-your-custom-edge';

register(ExtensionCategory.EDGE, 'custom-edge', CustomEdge);
```

### 配置边

你可以通过以下方式配置边类型及其样式：

1. 在数据中配置：

```json
{
  "edges": [
    {
      "source": "node-1",
      "target": "node-2",
      "type": "custom-edge",
      "style": {
        // 边样式
      }
    }
  ]
}
```

2. 在边样式映射中配置：

```typescript
{
  edge: {
    type: 'custom-edge',
    style: {
      // 边样式
    }
  }
}
```

### 自定义边

如果内置边元素无法满足需求，可以自定义边元素，具体请参考[自定义边](/manual/custom-extension/element#自定义边)。

## 组合

组合(Combo) 全称为 Combination，是 G6 中的一种特殊的元素，它可以包含节点和子组合。它通常用于表示集合关系，例如一个部门包含多个员工，一个城市包含多个区域等。

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJhpRJCcFLAAAAAAAAAAAAAADmJ7AQ/original" />

:::warning{title=注意}
不建议在**树图**中使用组合，因为组合的布局方式和树图的布局方式不匹配，可能会导致样式混乱。
:::

G6 提供了以下内置组合：

- `Circle` 圆形组合
- `Rect` 矩形组合

你可以通过配置 `type` 来使用：

```typescript
// 在数据中指定组合类型
const data = {
  combos: [{ id: 'combo-1', type: 'circle' }],
};

// 在组合配置中指定组合类型
{
  combo: {
    type: 'circle',
  }
}
```

### 组合构成

G6 中提供的组合由以下几部分构成：

<image width="200" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z-OxR4MAdUwAAAAAAAAAAAAADmJ7AQ/original" />

- `key` ：组合的主图形，表示组合的主要形状；
- `halo` ：主图形周围展示的光晕效果的图形；
- `label` ：文本标签，通常用于展示组合的名称或描述；

### 注册组合

组合的注册方式和节点类似：

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomCombo } from 'package-name/or/path-to-your-custom-combo';

register(ExtensionCategory.COMBO, 'custom-combo', CustomCombo);
```

### 配置组合

你可以通过以下方式配置组合类型及其样式：

1. 在数据中配置：

```json
{
  "combos": [
    {
      "id": "combo-1",
      "type": "custom-combo",
      "style": {
        // 组合样式
      }
    }
  ]
}
```

2. 在组合样式映射中配置：

```typescript
{
  combo: {
    type: 'custom-combo',
    style: {
      // 组合样式
    }
  }
}
```

### 自定义组合

如果内置组合元素无法满足需求，可以自定义组合元素，具体请参考[自定义组合](/manual/custom-extension/element#自定义组合)。
