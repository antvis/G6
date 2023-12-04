---
title: Plane
order: 11
---

Plane geometry, default lying on the XZ plane

<img alt="plane" src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*jN9zQp3RflAAAAAAAAAAAAAAARQnAQ" height='200'/>

## width

**Type**: `number`

**Default**: `100`

width

## depth

**Type**: `number`

**Default**: `100`

depth

## widthSegments

**Type**: `number`

**Default**: `5`

width segments

## depthSegments

**Type**: `number`

**Default**: `5`

depth segments

## materialType

**Type**：`'basic' | 'phong' | 'lambert'`

**Default**：`basic`

material type

## materialProps material-related parameters

### wireframe

**Type**：`boolean`

**Default**：`false`

Enable wireframe，Commonly used to visually display triangular surfaces

### wireframeColor

**Type**：`string`

**Default**：`black`

After enabling wireframe, you can specify a color, which defaults to 'black'

### wireframeLineWidth

**Type**：`number`

**Default**：`1`

After enabling wireframe, you can specify the line width, which defaults to 1

### cullMode

**Type**：`number`

**Default**：`0`

Turn on face removal, default to 0, which means no removal. 1 is front removal, 2 is back removal, and 3 is front and back removal
