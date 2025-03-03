---
title: Minimap
---

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### className

> _string_

The class name of the minimap canvas, which does not take effect when an external container is passed in

### container

> _HTMLElement_ _\| string_

The container where the minimap is mounted, if not, it will be mounted to the container where the Graph is located

### containerStyle

> _Partial**&lt;**CSSStyleDeclaration\_\_>_

The style of the minimap container, which does not take effect when an external container is passed in

### delay

> _number_ **Default:** `128`

Delay update time(ms), used for performance optimization

### filter

> _(id: string, elementType:_ _'node' \| 'edge' \| 'combo'\_\_) => boolean_

Filter, used to filter elements that do not need to be displayed

### maskStyle

> _Partial**&lt;**CSSStyleDeclaration\_\_>_

The style of the mask

### padding

> _number \| number[]_ **Default:** `10`

Padding

### position

> _[number, number] \| 'left' \| 'right' \| 'top' \| 'bottom' \| 'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'center'_ **Default:** `'right-bottom'`

The position of the minimap relative to the canvas

### renderer

> _IRenderer_

Renderer, default to use Canvas renderer

### shape

> _'key' \| ((id: string, elementType:_ _'node' \| 'edge' \| 'combo'\_\_) =>_ _DisplayObject\_\_)_ **Default:** `'key'`

The method of generating the thumbnail of the element

- 'key' uses the key shape of the element as the thumbnail shape - You can also pass in a function that receives the id and type of the element and returns a shape

### size

> _[number, number]_ **Default:** `[240, 160]`

Width and height

## API

### Minimap.destroy()

```typescript
destroy(): void;
```

### Minimap.update(options)

```typescript
update(options: Partial<MinimapOptions>): void;
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Partial&lt;[MinimapOptions](#options)>

</td><td>

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
