---
title: Donut 甜甜圈
order: 3
---

本文展示 Donut 甜甜圈扩展配置项的详细说明。对于其它配置项，可以参考[通用配置](/apis/item/node/node-intro#通用属性)。[Donut 甜甜圈 DEMO](/zh/examples/item/defaultNodes/#donut)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*c5f5Q7XuOWoAAAAAAAAAAAAADmJ7AQ/original" width=150 />

```typescript
interface DonutNodeShapeStyles {
  keyShape: KeyShapeStyle;
  donutShapes: DonutShapesStyle; // 甜甜圈形状配置
  // ...通用配置
}
```

## KeyShapeStyle

相关的图形样式参考 [`CircleStyleProps`](../../shape/CircleStyleProps.zh.md), 扩展属性如下：

### KeyShapeStyle.r

甜甜圈的半径。

- **是否必须**：否
- **类型**：`number`
- **默认值**：`16`

## DonutShapesStyle

`DonutShapesStyle` 继承自 [`PathStyleProps`](../../shape/PathStyleProps.zh.md)

### DonutShapesStyle.innerSize

甜甜圈内径大小相对于整体半径的比例。此值决定了甜甜圈中心空白区域的大小观。比例值越大，甜甜圈中心的空白区域越大，环形部分相对越窄。值为 `0-1`。

- **是否必须**：否
- **类型**：`number`
- **默认值**：`0.6`

### DonutShapesStyle.attrs

定义甜甜圈节点的数据。每个字段对应甜甜圈的一个部分，字段的值为该部分的数值大小。这些数值将用于计算甜甜圈中每个部分所占的比例。

- **是否必须**：否
- **类型**：`DonutAttrs`

```typescript
type DonutAttrs = {
  [propKey: string]: number;
};
```

### DonutShapesStyle.colorMap

定义甜甜圈每个部分的颜色。颜色映射，字段名与 attrs 中的字段名对应。不指定则使用默认色板

- **是否必须**：否
- **类型**：`DonutColorMap`
- **默认值**：使用默认色板

```typescript
type DonutColorMap = {
  [propKey: string]: string;
};
```

### DonutShapesStyle.zIndex

定义甜甜圈形状的堆叠顺序（z 轴索引）。这个属性可以用来控制不同形状之间的覆盖关系。

- **是否必须**：否
- **类型**：`number`
- **默认值**：`1`
