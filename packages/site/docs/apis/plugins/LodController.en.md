---
title: LodController
order: 0
---

LodController renders the text in the graph to a separate canvas, which has the following benefits:

- Improve rendering performance
- Keep the text size unchanged during canvas zooming
- Provide the ability to control the text density to avoid visual confusion caused by too dense text

> ⚠️ LodController is a `singleton` plugin, G6 will register this plugin by default, no need to register manually.

## Configuration

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

### debounce

**Type**: `'auto'` | `number`

**Default**: `'auto'`

**Required**: false

**Description**: Delay rendering time, in milliseconds

> When the main canvas is zoomed or panned, LodController will render the text again after a period of time to avoid frequent rendering

### disableLod

**Type**: `boolean`

**Default**: `false`

**Required**: false

**Description**: Whether to disable rendering text in different layers

### cellSize

**Type**: `number`

**Default**: `200`

**Required**: false

**Description**: Cell size, in pixels

### numberPerCell

**Type**: `number`

**Default**: `1`

**Required**: false

**Description**: The maximum number of texts rendered in each cell
