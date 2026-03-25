---
title: 从 5.0 升级到 5.1（布局）
order: 7
---

本文档聚焦 G6 `5.1` 中布局文档的写法调整。`5.1` 的布局页面会优先展示与 `@antv/layout` 对齐后的字段；`5.0` 中常见的布局写法统一收敛到本文档中，便于迁移时对照。

## 总体变化

- `5.1` 起，布局文档会优先展示 `@antv/layout` 的公共字段，例如 `width` `height` `center` `enableWorker` `node` `edge`
- 各布局页主要保留 `5.1` 推荐写法，`5.0` 中常见写法请以本文档为准
- 迁移时，建议先按旧项目中的字段定位，再映射到 `5.1` 文档里的推荐配置

## D3Force：center force 改为快捷字段

`5.0` 文档中，常见把中心力写在 `center` 中：

```typescript
{
  layout: {
    type: 'd3-force',
    center: {
      x: 250,
      y: 150,
      strength: 0.8,
    },
  },
}
```

`5.1` 文档中推荐写成更直接的快捷字段：

```typescript
{
  layout: {
    type: 'd3-force',
    centerX: 250,
    centerY: 150,
    centerStrength: 0.8,
  },
}
```

- `center.x` 对应 `centerX`
- `center.y` 对应 `centerY`
- `center.strength` 对应 `centerStrength`

如果你需要继续对照完整字段说明，可查看 [D3Force 布局](/manual/layout/d3-force-layout)。

## ComboCombined：innerLayout / outerLayout 收敛为 layout

`5.0` 文档中，常见分别配置 Combo 内部布局和最外层布局：

```typescript
import { ConcentricLayout, ForceLayout } from '@antv/layout';

{
  layout: {
    type: 'combo-combined',
    innerLayout: new ConcentricLayout({
      sortBy: 'id',
    }),
    outerLayout: new ForceLayout({
      gravity: 1,
    }),
  },
}
```

`5.1` 文档中推荐使用单个 `layout` 字段，根据 `comboId` 为不同层级返回布局配置：

```typescript
{
  layout: {
    type: 'combo-combined',
    layout: (comboId) =>
      comboId
        ? { type: 'concentric', sortBy: 'id' }
        : { type: 'force', gravity: 1 },
  },
}
```

- `comboId` 有值时，表示当前为 Combo 内部层级
- `comboId` 为空时，表示当前为最外层布局
- 多层布局选择统一收敛到 `layout` 入口

如果你需要查看 `5.1` 推荐写法，可查看 [ComboCombined 布局](/manual/layout/combo-combined-layout)。

## 迁移建议

1. 先按旧项目中的布局类型定位到本文档对应条目
2. 再把 `5.0` 字段映射成 `5.1` 文档里的推荐写法
3. 最后回到具体布局页，核对公共字段和默认值
