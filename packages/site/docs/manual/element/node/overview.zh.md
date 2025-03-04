---
title: 节点总览
order: 1
---

## 概述

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

通常来说，大多数节点具有相同的样式属性，例如都使用 `size` 来指定节点的大小。你可以在[Element - 节点](/manual/element/node/build-in/base-node)中查看节点的具体样式属性。

某些特殊的节点可能会有自己的样式属性，例如 `HTML` 节点的 `innerHTML` 属性用于指定节点的 HTML 内容。具体的样式属性可以参考[节点样式](/manual/element/node/build-in/html-node)。

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

如果内置节点元素无法满足需求，可以自定义节点元素，具体请参考[自定义节点](/manual/element/node/custom-node)。
