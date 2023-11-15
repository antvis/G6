---
title: Donut 甜甜圈
order: 3
---

本文展示所有 Donut 甜甜圈配置项。[Donut 甜甜圈 DEMO](/zh/examples/item/defaultNodes/#donut)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*c5f5Q7XuOWoAAAAAAAAAAAAADmJ7AQ/original" width=150 />

## keyShape

- **类型**：`KeyShapeStyle`

```typescript
type KeyShapeStyle = StyleProps & {
  /**
   * 甜甜圈的半径
   */
  r?: number;
};
```

其中，相关的图形样式参考 [Circle 图形样式](../shape/CircleStyleProps.zh.md)。

- **默认值**：

```json
{
  "r": 16
}
```

- **是否必须**：否

## donutShapes

- **类型**：

```typescript
PathStyleProps & {
  /**
   * 甜甜圈内径大小相对于整体半径的比例。此值决定了甜甜圈中心空白区域的大小观。比例值越大，甜甜圈中心的空白区域越大，环形部分相对越窄。值为 `0-1`
   */
  innerSize?: number;
  /**
   * 定义甜甜圈节点的数据。每个字段对应甜甜圈的一个部分，字段的值为该部分的数值大小。这些数值将用于计算甜甜圈中每个部分所占的比例
   */
  attrs?: PropObject;
  /**
   * 定义甜甜圈每个部分的颜色。颜色映射，字段名与 attrs 中的字段名对应。不指定则使用默认色板
   */
  colorMap?: PropObject;
  /**
   * 定义甜甜圈形状的堆叠顺序（z 轴索引）。这个属性可以用来控制不同形状之间的覆盖关系
   */
  zIndex?: number;
};
```

`PropObject` 定义如下：

```typescript
type PropObject = {
  [propKey: string]: number;
};
```

- **默认值**：

```json
{
  "innerSize": 0.6,
  "zIndex": 1
}
```

- **是否必须**：是

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
