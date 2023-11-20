### delegateStyle

**Type**: `ShapeStyle`

**Default**:

```json
{
  "stroke": "#000",
  "strokeOpacity": 0.8,
  "lineWidth": 2,
  "fillOpacity": 0.1,
  "fill": "#ccc"
}
```

**Required**: false

**Description**: The style of the lens area

### maxR

**Type**: `number`

**Default**: `100`

The maximum value of the radius of the lens

### minR

**Type**: `number`

**Default**: `50`

The minimum value of the radius of the lens

### r

**Type**: `number`

**Default**: `300`

The radius of the lens

### scaleRBy

**Type**: `'wheel' | 'drag' | 'unset'`

**Default**: `'drag'`

The way to scale the radius of the lens

> In the lens, the radius of the lens is scaled by mouse wheel or drag

### showLabel

**Type**: `boolean`

**Default**: `true`

Whether to show the label of items in the lens

### trigger

**Type**: `'mousemove' | 'click' | 'drag'`

**Default**: `'mousemove'`

The way to trigger the interaction
