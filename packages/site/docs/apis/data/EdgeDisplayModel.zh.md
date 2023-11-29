---
title: EdgeDisplayModel 渲染数据
order: 11
---

EdgeDisplayModel（边的渲染/展示数据） 由 EdgeModel（内部流转数据）通过您配置在图实例上 mapper（[specification.edge](../graph/Specification.zh.md#edge)）映射后的结果，仅用于内部渲染时消费，您在其他任何地方不会消费它。数据类型继承自内部流转的边数据类型 [EdgeModel](./EdgeModel.zh.md)，扩展后定义如下：

```typescript
interface EdgeDisplayModel {
  id: string | number;
  source: string | number;
  target: string | number;
  data: EdgeDisplayModelData; // 扩展了 EdgeModelData
}
```

## id <Badge type="error">必须</Badge>

边的唯一 ID，边创建后，ID 不可被修改。

**类型**：`string | number`

## source <Badge type="error">必须</Badge>

边起始节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

**类型**：`string | number`

## target <Badge type="error">必须</Badge>

边结束节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

**类型**：`string | number`

## data <Badge type="error">必须</Badge>

EdgeDisplayModelData 中的数据已经是 EdgeModel 通过 Graph 实例上配置的对应 mapper（[specification.edge](../graph/Specification.zh.md#edge)）映射后的结果，这里面应当存储所有 EdgeModel 的内容，再额外加上许多的图形样式配置。

<embed src="../../common/DataAttrTips.zh.md"></embed>

<embed src="../../common/LodLevels.zh.md"></embed>

### animates

出现、消失、显示、隐藏、更新时，各个图形动画配置。支持一次更新，多个动画的顺序执行（`order`）。[动画 DEMO](/zh/examples/scatter/changePosition/#itemAnimates)

**类型**：`IAnimates`

<embed src="../../common/IAnimates.zh.md"></embed>

### keyShape

边主图形的样式配置。边的主图形是边的整体路径图形。

**类型**：`ShapeStyle`，根据不同的主图形，图形样式配置项不同。例如 `'line-edge'` 的主图形是 `'line'` 参考 [LineStyleProps](/apis/shape/line-style-props)；`'cubic-edge'` 的主图形是 `'path'` 参考 [PathStyleProps](/apis/shape/path-style-props)

### iconShape

边的图标图形（内置边支持，继承这些内置边的自定义边在无复写相关内容的情况下同样支持），位于文本前方。可以是图片或文本，文本支持 iconfont。

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

在内置的边和主题中，`haloShape` 指的是边在 `active`（一般在鼠标 hover 时该状态被触发） 和 `selected`（一般在选中状态下该状态被触发） 状态下，主图形 (`keyShape`) 周围展示的光晕效果的图形。在内置边的逻辑中，`haloShape` 的图形类型、颜色跟随主图形 (`keyShape`)

**类型**：`ShapeStyle`，`haloShape` 的图形类型跟随主图形(`keyShape`)根据不同的主图形，图形样式配置项不同。例如 `'line-edge'` 的主图形是 `'line'` 参考 [LineStyleProps](/apis/shape/line-style-props)；`'cubic-edge'` 的主图形是 `'path'` 参考 [PathStyleProps](/apis/shape/path-style-props)

<embed src="../../common/LabelShape.zh.md"></embed>

### labelBackgroundShape

边的文本的背景图形，是一个矩形。若不设置则不显示。设置为 `{}` 将使用主题中默认的样式显示文本背景图形。

**类型**：

```typescript
ShapeStyle & {
  padding?: number | number[]; // 文本距离背景矩形四周的留白距离
};
```

其中，参考矩形样式类型 [RectStyleProps](/apis/shape/rect-style-props)

### badgeShape

边的徽标，包括了文本和背景图形。和节点支持多个徽标不同，内置边仅支持一个徽标，位于文本后方。

**类型**：

```typescript
  ShapeStyleProps & {
    /**
     * 徽标的背景颜色
     */
    color?: string;
    /**
     * 徽标上文本的颜色
     */
    textColor?: string;
  }
```

### otherShapes

上面所有的 xxShape(s) 均为 G6 定义的规范边中可能存在的图形。自定义边中的其他图形应当定义和配置在 `otherShapes` 中。

**类型**：

```typescript
{
  // key 为图形 id，规范格式为 xxShape
  // value 为图形样式配置（不同图形配置不同，见图形相关文档），以及图形的动画
  [shapeId: string]: ShapeStyleProps;
}
```

其中，不同的图形样式参考[图形样式](/apis/shape/overview)目录下对应的图形类型文档。
