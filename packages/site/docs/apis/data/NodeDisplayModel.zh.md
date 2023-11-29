---
title: NodeDisplayModel 渲染数据
order: 10
---

NodeDisplayModel（节点的渲染数据） 由 NodeModel（内部流转数据）通过[数据映射](/apis/data/data-intro#mappers-数据映射)得到的结果，该数据仅能被 G6 访问。

## id <Badge type="error">必须</Badge>

节点的唯一 ID，节点创建后，ID 不可被修改。

**类型**：`string | number`

## data <Badge type="error">必须</Badge>

NodeDisplayModelData 数据在 [NodeModel](./NodeModel.zh.md) 基础上额外添加了图形样式配置。

<embed src="../../common/DataAttrTips.zh.md"></embed>

<embed src="../../common/LodLevels.zh.md"></embed>

### animates

出现、消失、显示、隐藏、更新时，各个图形动画配置。支持一次更新，多个动画的顺序执行（`order`）。[动画 DEMO](/zh/examples/scatter/changePosition/#itemAnimates)

**类型**：`IAnimates`

<embed src="../../common/IAnimates.zh.md"></embed>

### keyShape

节点主图形的样式配置。节点的主图形表达了节点的主要形状。还用于计算边的连入位置。

**类型**：`ShapeStyle`，根据不同的主图形，图形样式配置项不同。例如 `'circle-node'` 的主图形是 `'circle'` 参考 [CircleStyleProps](/apis/shape/circle-style-props)；`'image-node'` 的主图形是 `'image'` 参考 [ImageStyleProps](/apis/shape/image-style-props)

### iconShape

节点中心的图标图形（除 `'modelRect-node'` 以外的内置节点支持，继承这些内置节点的自定义节点在无复写相关内容的情况下同样支持），可以是图片或文本，文本支持 iconfont (设置 `fontFamily: 'iconfont'`)

**类型**：

```typescript
Partial<
  TextStyleProps &
    ImageStyleProps &
    ShapeStyle & {
      offsetX?: number;
      offsetY?: number;
      lod?: number;
    }
>;
```

- [TextStyleProps](/apis/shape/text-style-props)

- [ImageStyleProps](/apis/shape/image-style-props)

### haloShape

在内置的节点和主题中，`haloShape` 指的是节点在 `active`（一般在鼠标 hover 时该状态被触发） 和 `selected`（一般在选中状态下该状态被触发） 状态下，主图形 (`keyShape`) 周围展示的光晕效果的图形。在内置节点的逻辑中，`haloShape` 的图形类型、颜色跟随主图形 (`keyShape`)

**类型**：`ShapeStyle`，`haloShape` 的图形类型跟随主图形(`keyShape`)根据不同的主图形，图形样式配置项不同。

<embed src="../../common/LabelShape.zh.md"></embed>

### labelBackgroundShape

节点的文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。

**类型**：

```typescript
ShapeStyle & {
  padding?: number | number[]; // 文本距离背景矩形四周的留白距离
};
```

其中，参考矩形样式类型 [RectStyleProps](/apis/shape/rect-style-props)

<embed src="../../common/BadgeShapes.zh.md"></embed>

### anchorShapes

节点四周的边连入位置圆形图形（连接桩），anchorShapes 配置的是多个连接桩。[节点连接桩 DEMO](/zh/examples/item/defaultNodes/#circle)

**类型**：

```typescript
// 外层可配置对所有连接桩（圆形）的样式，优先级低于单独的连接桩配置
CircleStyleProps & {
  // 单独的连接桩图形配置，优先级高于外层的 CircleStyleProps
  [key: number]: CircleStyleProps & {
    // 该连接桩的位置，可配置字符串或数字数组表示相对于主图形 (keyShape) 包围盒的百分比位置，例如 [0.5, 1] 表示位于主图形的右侧中间
    position?: 'top' | 'left' | 'bottom' | 'right' | [number, number];
  };
};
```

- [CircleStyleProps](/apis/shape/circle-style-props)

### otherShapes

上面所有的 xxShape(s) 均为 G6 定义的规范节点中可能存在的图形。自定义节点中的其他图形应当定义和配置在 `otherShapes` 中。

**类型**：

```typescript
{
  // key 为图形 id，规范格式为 xxShape
  // value 为图形样式配置（不同图形配置不同，见图形相关文档），以及图形的动画
  [shapeId: string]: ShapeStyleProps;
}
```

其中，不同的图形样式参考[图形样式](/apis/shape/overview)目录下对应的图形类型文档。
