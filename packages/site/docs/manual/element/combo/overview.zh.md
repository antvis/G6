---
title: 组合总览
order: 1
---

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
