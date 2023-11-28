---
title: EdgeFilterLens
order: 10
---

Filter out edges that do not exist on one side of the filter

- [Edge Filter Lens](/en/examples/tool/edgeFilterLens/#default)

<img alt="edge filter lens" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*R9ryQrDrntIAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

<embed src="../../common/PluginLensBase.en.md"></embed>

### showType

**Type**: `'one' | 'both' | 'only-source' | 'only-target'`

**Default**: `'both`

The type of edge to display

- `'one'`: Display edges that are at least one side in the filter
- `'both'`: Display edges that are both ends in the filter
- `'only-source'`: Only show edges with source nodes in the filter
- `'only-target'`: Only show edges with target nodes in the filter

### shouldShow

**Type**: `(edge: EdgeConfig) => boolean`

**Default**: `undefined`

Whether to display the edge callback function

## API

### updateParams

**Type**: `(cfg: EdgeFilterLensConfig) => void;`

**Description**: Update configuration

### clear

**Type**: `() => void;`

**Description**: Clear the filter

<embed src="../../common/PluginAPIDestroy.en.md"></embed>
