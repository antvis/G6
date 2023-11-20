---
title: MiniMap
order: 6
---

When there is too much content on the canvas, you can use the MiniMap to view the overall content of the canvas, and you can use the MiniMap to move the canvas.

- [Minimap](/en/examples/tool/minimap/#minimap)
- [Minimap API](/en/examples/tool/minimap/#minimap-api)

<img alt="minimap" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*XojSQY_-5iIAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

### delegateStyle

**Type**: `ShapeStyle`

**Default**:

```json
{
  "fill": "#40a9ff",
  "stroke": "#096dd9"
}
```

**Required**: false

**Description**: The style of the node in the MiniMap when the mode is `'delegate'`

### hideEdge

**Type**: `boolean`

**Default**: `false`

Whether to hide the edge in the MiniMap to improve performance

### mode

**Type**: `'default' | 'keyShape' | 'delegate'`

**Default**: `'default'`

The mode of the MiniMap

- `'default'`: The default mode, the MiniMap will display all the content of the canvas
- `'keyShape'`: Only the keyShape of all nodes in the canvas is displayed
- `'delegate'`: Only the delegate of all nodes in the canvas is displayed

### padding

**Type**: `number`

**Default**: `10`

The padding of the MiniMap

### refresh

**Type**: `boolean`

**Default**: `true`

Whether to refresh the MiniMap when the canvas is updated

### size

**Type**: `[number, number]`

**Default**: `[200, 120]`

The size of the MiniMap

## API

<embed src="../../common/PluginAPIDestroy.en.md"></embed>
