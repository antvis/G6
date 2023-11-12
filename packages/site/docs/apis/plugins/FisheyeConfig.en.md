---
title: Fisheye
order: 11
---

<img alt="fish eye" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Wc3aSqIp-4oAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

### d

**Type**: `number`

**Default**: `1.5`

**Required**: false

**Description**: The magnification of the fisheye

### maxD

**Type**: `number`

**Default**: `5`

**Required**: false

**Description**: The maximum value of the magnification of the fisheye

### minD

**Type**: `number`

**Default**: `1`

**Required**: false

**Description**: The minimum value of the magnification of the fisheye

### scaleDBy

**Type**: `'wheel'` | `'drag'` | `'unset'`

**Default**: `'drag'`

**Required**: false

**Description**: The way to scale the magnification of the fisheye

> In the fisheye, the magnification of the fisheye is scaled by mouse wheel or drag

### showDPercent

**Type**: `boolean`

**Default**: `true`

**Required**: false

**Description**: Whether to show the percentage of the magnification (`d`) of the fisheye

<embed src="../../common/Throttle.en.md"></embed>

<embed src="../../common/PluginLensBase.en.md"></embed>

## API

### updateParams

**Type**: `(cfg: FisheyeConfig) => void;`

**Description**: Update configuration

### clear

**Type**: `() => void;`

**Description**: Clear the fisheye

<embed src="../../common/PluginAPIDestroy.en.md"></embed>
