---
title: Legend
---

The legend plugin is used to display the classification information of elements in the graph, and supports the display of classification information of nodes, edges, and combos.

<embed src="@/common/api/plugins/legend.md"></embed>

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### className

> _string_

The class name of the legend canvas, which does not take effect when an external container is passed in

### comboField

> _string \| ((item:_ _NodeData \| EdgeData \| ComboData\_\_) => string)_

Combo Classification Identifier

### container

> _HTMLElement_ _\| string_

The container where the legend is mounted, if not, it will be mounted to the container where the Graph is located

### containerStyle

> _Partial**&lt;**CSSStyleDeclaration\_\_>_

The style of the legend container, which does not take effect when an external container is passed in

### edgeField

> _string \| ((item:_ _NodeData \| EdgeData \| ComboData\_\_) => string)_

Edge Classification Identifier

### nodeField

> _string \| ((item:_ _NodeData \| EdgeData \| ComboData\_\_) => string)_

Node Classification Identifier

### position

> _'left' \| 'right' \| 'top' \| 'bottom'_ **Default:** `'bottom'`

Relative position of the legend in the canvas, defaults to 'bottom', representing the bottom of the canvas

### trigger

> _'hover' \| 'click'_ **Default:** `'hover'`

Legend trigger behavior

- `'hover'`：mouseover the legend item

- `'click'`：click the legend item

## API

### Legend.updateElement()

Refresh the status of the legend element

```typescript
updateElement(): void;
```
