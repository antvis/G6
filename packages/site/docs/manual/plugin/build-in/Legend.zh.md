---
title: Legend 图例
---

图例插件用于展示图中元素的分类信息，支持节点、边、组合的分类信息展示。

<embed src="@/common/api/plugins/legend.md"></embed>

**参考示例**：

- [默认图例](/examples/plugin/legend/#basic)
- [点击图例](/examples/plugin/legend/#click)
- [图例项样式](/examples/plugin/legend/#style)

## 配置项

### <Badge type="success">Required</Badge> type

> _`legend` \| string_

此插件已内置，你可以通过 `type: 'legend'` 来使用它。

### className

> _string_

图例画布类名，传入外置容器时不生效

### comboField

> _string \| ((item: NodeData \| EdgeData \| ComboData) => string)_

组合分类标识

### container

> _HTMLElement_ _\| string_

图例挂载的容器，无则挂载到 Graph 所在容器

### containerStyle

> _CSSStyleDeclaration_

图例的容器样式，传入外置容器时不生效

### edgeField

> _string \| ((item: NodeData \| EdgeData \| ComboData) => string)_

边分类标识

### nodeField

> _string \| ((item: NodeData \| EdgeData \| ComboData) => string)_

节点分类标识

### position

> _'left' \| 'right' \| 'top' \| 'bottom'_ **Default:** `'bottom'`

图例在画布中的相对位置，默认为 'bottom'，代表在画布正下方

### trigger

> _'hover' \| 'click'_ **Default:** `'hover'`

图例触发行为

- `'hover'`：鼠标移入图例项时触发
- `'click'`：鼠标点击图例项时触发

## API

### Legend.updateElement()

刷新图例元素状态

```typescript
updateElement(): void;
```
