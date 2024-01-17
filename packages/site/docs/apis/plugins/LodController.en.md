---
title: LodController
order: 0
---

LodController renders the text in the graph to a separate canvas, which has the following benefits:

- Improve rendering performance
- Keep the text size unchanged during canvas zooming
- Provide the ability to control the text density to avoid visual confusion caused by too dense text

:::warning
LodController is a `singleton` plugin, G6 will register this plugin by default, no need to register manually.
:::

## Configuration

### debounce

**Type**: `'auto' | number`

**Default**: `'auto'`

Delay rendering time, in milliseconds

> When the main canvas is zoomed or panned, LodController will render the text again after a period of time to avoid frequent rendering

### disableLod

**Type**: `boolean`

**Default**: `false`

Whether to disable rendering text in different layers

### cellSize

**Type**: `number`

**Default**: `200`

Cell size, in pixels

### numberPerCell

**Type**: `number`

**Default**: `1`

The maximum number of texts rendered in each cell
