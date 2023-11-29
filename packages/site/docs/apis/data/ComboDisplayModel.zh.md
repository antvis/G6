---
title: ComboDisplayModel 渲染数据
order: 12
---

ComboDisplayModel（Combo 的渲染/展示数据） 由 ComboModel（内部流转数据）通过您配置在图实例上 mapper（[specification.combo](../graph/Specification.zh.md#combo)）映射后的结果，仅用于内部渲染时消费，您在其他任何地方不会消费它。数据类型继承自内部流转的 Combo 数据类型 [ComboModel](./ComboModel.zh.md)，扩展后定义如下：

```typescript
interface ComboDisplayModel {
  id: string | number;
  data: ComboDisplayModelData; // 扩展了 ComboModelData
}
```

## id <Badge type="error">必须</Badge>

**类型**：`string | number`

Combo 的唯一 ID，Combo 创建后，ID 不可被修改。

## data <Badge type="error">必须</Badge>

ComboDisplayModelData 中的数据已经是 ComboModel 通过 Graph 实例上配置的对应 mapper（[specification.combo](../graph/Specification.zh.md#combo)）映射后的结果，这里面应当存储所有 ComboModel 的内容，再额外加上许多的图形样式配置。

<embed src="../../common/DataAttrTips.zh.md"></embed>

<embed src="../../common/LodLevels.zh.md"></embed>

### animates

**类型**：`IAnimates`

出现、消失、显示、隐藏、更新时，各个图形动画配置。支持一次更新，多个动画的顺序执行（`order`）。[动画 DEMO](/zh/examples/scatter/changePosition/#itemAnimates)

<embed src="../../common/IAnimates.zh.md"></embed>

### keyShape

**类型**：`ShapeStyle`，根据不同的主图形，图形样式配置项不同。例如

Combo 主图形的样式配置。Combo 的主图形表达了 Combo 的主要形状。还用于计算边的连入位置。 `'circle-combo'` 的主图形是 `'circle'` 参考 [CircleStyleProps](/apis/shape/circle-style-props)；`'rect-combo'` 的主图形是 `'rect'` 参考 [RectStyleProps](/apis/shape/rect-style-props)

### haloShape

**类型**：`ShapeStyle`，`haloShape`

在内置的 Combo 和主题中，`haloShape` 指的是 Combo 在 `active`（一般在鼠标 hover 时该状态被触发） 和 `selected`（一般在选中状态下该状态被触发） 状态下，主图形 (`keyShape`) 周围展示的光晕效果的图形。在内置 Combo 的逻辑中，`haloShape` 的图形类型、颜色跟随主图形 (`keyShape`) 的图形类型跟随主图形(`keyShape`)根据不同的主图形，图形样式配置项不同。例如 `'circle-combo'` 的主图形是 `'circle'` 参考 [CircleStyleProps](/apis/shape/circle-style-props)；`'rect-combo'` 的主图形是 `'rect'` 参考 [RectStyleProps](/apis/shape/rect-style-props)

<embed src="../../common/LabelShape.zh.md"></embed>

### labelBackgroundShape

**类型**：

```typescript
ShapeStyle & {
  padding?: number | number[]; // 文本距离背景矩形四周的留白距离
};
```

> 其中，参考矩形样式类型 [RectStyleProps](/apis/shape/rect-style-props)

Combo 的文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。

<embed src="../../common/BadgeShapes.zh.md"></embed>

### anchorShapes

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

Combo 四周的边连入位置圆形图形（连接桩），anchorShapes 配置的是多个连接桩。

### otherShapes

**类型**：

```typescript
{
  // key 为图形 id，规范格式为 xxShape
  // value 为图形样式配置（不同图形配置不同，见图形相关文档），以及图形的动画
  [shapeId: string]: ShapeStyleProps;
}
```

> 其中，不同的图形样式参考[图形样式](/apis/shape/overview)目录下对应的图形类型文档。

上面所有的 xxShape(s) 均为 G6 定义的规范 Combo 中可能存在的图形。自定义 Combo 中的其他图形应当定义和配置在 `otherShapes` 中。
