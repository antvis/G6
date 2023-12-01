---
title: EdgeDisplayModel 渲染数据
order: 8
---

EdgeDisplayModel 为边的渲染数据，由 [EdgeModel](./EdgeModel.zh.md) 经过[数据映射](./DataIntro.zh.md#mappers-数据映射)后的结果，该数据仅能被 G6 访问。

<embed src="../../common/DataID.zh.md"></embed>

## source <Badge type="error">必须</Badge>

边起始节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

**类型**：`string | number`

## target <Badge type="error">必须</Badge>

边结束节点的 ID，应与 `nodes` 中的一项对应，否则该边数据不会被加入到图中。

**类型**：`string | number`

## data <Badge type="error">必须</Badge>

基于 [EdgeModel](./EdgeModel.zh.md) 的内容额外加上了图形样式配置。

<embed src="../../common/DataAttrTips.zh.md"></embed>

<embed src="../../common/LodLevels.zh.md"></embed>

<embed src="../../common/DataAnimates.zh.md"></embed>

### keyShape

**类型**：`ShapeStyle`

> `'line-edge'` 的主图形是 ['line'](/apis/shape/line-style-props)；`'cubic-edge'` 的主图形是 ['path'](/apis/shape/path-style-props)

边主图形的样式配置。边的主图形是边的路径图形

<embed src="../../common/DataIconShape.zh.md"></embed>

<embed src="../../common/DataHaloShape.zh.md"></embed>

<embed src="../../common/DataLabelShape.zh.md"></embed>

<embed src="../../common/DataLabelBackgroundShape.zh.md"></embed>

<embed src="../../common/DataOtherShapes.zh.md"></embed>

:::info{title=提示}
下列属性继承自 [EdgeModel](./EdgeModel.zh.md)
:::

<embed src="../../common/EdgeUserModel.zh.md"></embed>
