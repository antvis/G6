---
title: Fisheye
---

Fisheye is designed for focus+context exploration, it keeps the context and the relationships between context and the focus while magnifying the focus area.

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### d

> _number_ **Default:** `1.5`

Distortion factor

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4ITFR7GOl8UAAAAAAAAAAAAADmJ7AQ/original" width="200" />

### maxD

> _number_ **Default:** `5`

The maximum distortion factor that the fisheye lens can be adjusted, used with `scaleDBy`

### maxR

> _number_ **Default:** `画布宽高的最小值的一半`

The maximum radius that the fisheye lens can be adjusted, used with `scaleRBy`

### minD

> _number_ **Default:** `0`

The minimum distortion factor that the fisheye lens can be adjusted, used with `scaleDBy`

### minR

> _number_ **Default:** `0`

The minimum radius that the fisheye lens can be adjusted, used with `scaleRBy`

### nodeStyle

> _NodeStyle_ _\| ((datum:_ [NodeData](/api/graph/option#nodedata)_) =>_ _NodeStyle\_\_)_

Node style in the fisheye lens

### preventDefault

> _boolean_ **Default:** `true`

Whether to prevent the default event

### r

> _number_ **Default:** `120`

The radius of the fisheye lens

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*unAvQqAb_NMAAAAAAAAAAAAADmJ7AQ/original" width="200" />

### scaleDBy

> _'wheel' \| 'drag'_

The way to adjust the distortion factor of the fisheye lens

- `'wheel'`: adjust by wheel

- `'drag'`: adjust by drag

### scaleRBy

> _'wheel' \| 'drag'_

The way to adjust the range radius of the fisheye lens

- `'wheel'`: adjust by wheel

- `'drag'`: adjust by drag

If `trigger`, `scaleRBy`, and `scaleDBy` are set to `'drag'` at the same time, the priority order is `trigger` > `scaleRBy` > `scaleDBy`, and only the configuration item with the highest priority will be bound to the drag event. Similarly, if `scaleRBy` and `scaleDBy` are set to `'wheel'` at the same time, only `scaleRBy` will be bound to the wheel event

### showDPercent

> _boolean_ **Default:** `true`

Whether to display the value of the distortion factor in the fisheye lens

### style

> _CircleStyleProps_

Fisheye Lens Style

### trigger

> _'pointermove' \| 'drag' \| 'click'_ **Default:** ``

The way to move the fisheye lens

- `'pointermove'`: always follow the mouse movement

- `'click'`: move when the mouse is clicked

- `'drag'`: move by dragging

## API

### Fisheye.destroy()

```typescript
destroy(): void;
```

### Fisheye.update(options)

```typescript
update(options: Partial<FisheyeOptions>): void;
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

Partial&lt;[FisheyeOptions](#options)>

</td><td>

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
