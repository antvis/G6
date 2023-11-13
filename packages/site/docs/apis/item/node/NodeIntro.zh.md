---
title: 节点总览
order: 0
---

## 节点的注册和使用

本目录列举了 G6 内置的所有节点。G6 5.0 为了减少包体积，仅默认注册了 `circle-node` 和 `rect-node`。**因此，在使用这些内置节点之前，您也需要将其注册到 G6 中**。同样的，自定义节点也应当如下注册：

```javascript
import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  nodes: {
    'ellipse-node': Extensions.EllipseNode,
    'diamond-node': Extensions.DiamondNode,
  },
});

// 注册后方可在实例化或后续 API 调用中使用
const graph = new Graph({
  // ...其他配置项
  node: {
    type: 'ellipse-node', // type 与注册时命名的 key 一致
    // ... 节点的其他配置项
  },
});
graph.updateMapper('node', (model) => {
  const { id, data } = model;
  return {
    id,
    data: {
      type: 'diamond-node', // type 与注册时命名的 key 一致
      // ... 节点的其他配置项
    },
  };
});
```

## 导航

- [Circle Node](./CircleNode.zh.md)：圆形节点，通常用于简单且直观的数据表示。
- [Rect Node](./RectNode.zh.md)：矩形节点，适用于展示结构化数据或作为基本的布局元素。
- [Donut Node](./DonutNode.zh.md)：甜甜圈节点，常用于展示占比或分布类的数据。
- [Image Node](./ImageNode.zh.md)：图片节点，适用于需要展示图片或图标的场景。
- [Diamond Node](./DiamondNode.zh.md)：菱形节点，可用于表示连接点或特殊数据。
- [Hexagon Node](./HexagonNode.zh.md)：六边形节点，适合用于构建蜂窝状的数据布局。
- [Triangle Node](./TriangleNode.zh.md)：三角形节点，适用于表示方向性或层级的数据。
- [Star Node](./StarNode.zh.md)：星形节点，常用于表示评级或突出重点的数据。
- [ModelRect Node](./ModelRectNode.zh.md)：模态矩形节点。
  特殊类型的矩形节点，可能包含额外的模态或交互特性。
- [Ellipse Node](./EllipseNode.zh.md)：椭圆节点，适用于表示范围或流程的数据。
- [Cube Node](./CubeNode.zh.md)：立方体节点，用于三维数据展示或特殊视觉效果。
- [Sphere Node](./SphereNode.zh.md)：球体节点，适合于表示全局性或三维空间的数据。

当然，也可以自定义节点

- [Custom Node](./CustomNode.zh.md)：自定义节点
- [Custom 3D Node](./Custom3DNode.zh.md)：自定义 3D 节点

<br />
<br />

## 通用属性

| 配置项  | 类型               | 默认值 | 描述 |
| ------- | ------------------ | ------ | ---- |
| lod     | `number \| 'auto'` | 预设值 |      |
| visible | `boolean`          | `true` |      |

### keyShape

### haloShape

### labelShape

节点的文本图形，内置节点或继承内置节点（未复写相关内容）的自定义节点均支持。

- **是否必须**：否
- **类型**：`LabelShapeStyle`

`LabelShapeStyle` 文本标签样式基于 [`TextStyleProps` 文本图形样式](../../shape/TextStyleProps.zh.md)。扩展配置项如下：

| 配置项   | 类型                                                 | 默认值     | 描述                                           |
| -------- | ---------------------------------------------------- | ---------- | ---------------------------------------------- |
| position | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'center'` | 文本在节点上的位置                             |
| offsetX  | `number`                                             | `0`        | 文本相对于当前位置的 x 轴偏移量                |
| offsetY  | `number`                                             | `0`        | 文本相对于当前位置的 y 轴偏移量                |
| offsetZ  | `number`                                             | `0`        | 文本相对于当前位置的 z 轴偏移量                |
| maxWidth | `string \| number`                                   | `'200%'`   | 文本的最大宽度，字符串表示百分比，数字表示像素 |
| angle    | `number`                                             | `-`        | 文本的顺时针旋转角度，以弧度为单位             |

### labelBackgroundShape

节点的文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。

- **是否必须**：否
- **类型**：`LabelBackgroundShapeStyle`

`LabelBackgroundShapeStyle` 文本背景样式基于 [`RectStyleProps` 矩形图形样式](../../shape/RectStyleProps.zh.md)。扩展配置项如下：

| 配置项  | 类型                 | 默认值 | 描述               |
| ------- | -------------------- | ------ | ------------------ |
| padding | `number \| number[]` | `/`    | 文本在节点上的位置 |

### badgeShapes

节点四周的徽标，单个徽标包括了文本和背景图形，`badgeShapes` 配置的是多个徽标。[节点徽标 DEMO](/zh/examples/item/defaultNodes/#circle)。

- **是否必须**：否
- **类型**：`BadgeShapesStyle`

`BadgeShapesStyle` 徽标样式基于 [`RectStyleProps` 矩形图形样式](../../shape/RectStyleProps.zh.md)。扩展配置项如下：

```typescript
type IBadgePosition =
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'leftBottom'
  | 'left'
  | 'leftTop'
  | 'topLeft'
  | 'top'
  | 'topRight';

type BadgeShapeStyle = {
  /** 该徽标的位置 */
  position?: IBadgePosition;
  /** 该徽标的背景色 */
  color?: string;
  /** 该徽标的文本色*/
  textColor?: string;
};

type BadgeShapesStyle =
  | (RectStyleProps & {
      /**
       * 徽标的背景颜色（对所有徽标生效，优先级低于下面单个徽标的 color 设置）
       */
      color?: string;
      /**
       * 徽标背景颜色的色板，意味着下面各个徽标将自动取用该色板中的颜色。
       * 优先级低于下面单个徽标的 color 设置
       */
      palette?: string[];
      /**
       * 徽标上文本的颜色（对所有徽标生效，优先级低于下面单个徽标的 textColor 设置）
       */
      textColor?: string;
    })
  | BadgeShapeStyle[];
```

### iconShape

其中，相关的图形样式参考 [`CircleStyleProps` 圆形图形样式](../../shape/CircleStyleProps.zh.md)。

text or image

### anchorShapes

其中，相关的图形样式参考 [`TextStyleProps` 文本图形样式](../../shape/TextStyleProps.zh.md)。

### otherShapes

其中，不同的图形样式参考图形样式目录下对应的图形类型文档。
