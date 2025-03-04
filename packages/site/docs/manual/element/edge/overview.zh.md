---
title: 边总览
order: 1
---

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

如果内置边元素无法满足需求，可以自定义边元素，具体请参考[自定义边](/manual/element/edge/custom-edge)。
