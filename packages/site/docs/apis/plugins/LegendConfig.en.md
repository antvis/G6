---
title: Legend
order: 3
---

- [Filtering legend by clicking and hovering](/en/examples/tool/legend/#legend)
- [Customize legend marker style](/en/examples/tool/legend/#legendCustomMarker)
- [Render legend with SVG](/en/examples/tool/legend/#legendSVG)

<img alt="legend" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5rwLT4o1Rd4AAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

### activeState

**Type**: `string`

**Default**: `'active'`

**Required**: false

**Description**: Switch to this state after legend is activated

### edge

**Type**: `ItemLegendConfig`

**Default**: `undefined`

**Required**: false

**Description**: Edge legend configuration

### inactiveState

**Type**: `string`

**Default**: `''`

**Required**: false

**Description**: Switch to this state after legend is deactivated

### node

**Type**: `ItemLegendConfig`

**Default**: `undefined`

**Required**: false

**Description**: Node legend configuration

### orientation

**Type**: `'horizontal'` | `'vertical'`

**Default**: `'horizontal'`

**Description**: The layout direction of the legend

### selectedState

**Type**: `string`

**Default**: `'selected'`

**Required**: false

**Description**: Switch to this state after legend is selected

### size

**Type**: `'fit-content'` | `[number | string, number | string]`

**Default**: `'fit-content'`

**Description**: The size of the legend, which can be a number or a string, or an array representing the width and height respectively. If it is a string, it can be `'fit-content'`, which means that the size of the legend adapts to the content.

## API

<embed src="../../common/PluginAPIDestroy.en.md"></embed>

---

```ts
type ItemLegendConfig = {
  /** Number of legend columns */
  cols?: number;
  /** Legend column padding */
  colPadding?: number;
  /** Whether to enable the legend */
  enable?: boolean;
  /** Legend text format function */
  labelFormatter?: (value: string) => string;
  /** Legend text style */
  labelStyle?: Style;
  /** Legend marker style */
  markerStyle?: markerStyle;
  /** Legend padding */
  padding?: number | number[];
  /** Number of legend rows */
  rows?: number;
  /** Legend row spacing */
  rowPadding?: number;
  /** Field name of item Type */
  typeField?: string;
};
```
