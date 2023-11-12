---
title: EdgeFilterLens 边滤镜
order: 10
---

过滤掉存在一端不在滤镜内的边

<img alt="edge filter lens" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*R9ryQrDrntIAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## 配置项

<embed src="../../common/IPluginBaseConfig.zh.md"></embed>

<embed src="../../common/PluginLensBase.zh.md"></embed>

### showType

**类型**：`'one'` | `'both'` | `'only-source'` | `'only-target'`

**默认值**：`'both`

**是否必须**：false

**说明**：显示的边类型

- `'one'`：显示至少有一端在滤镜内的边
- `'both'`：显示两端都在滤镜内的边
- `'only-source'`：只显示源节点在滤镜内的边
- `'only-target'`：只显示目标节点在滤镜内的边

### shouldShow

**类型**：`(edge: EdgeConfig) => boolean`

**默认值**：`undefined`

**是否必须**：false

**说明**：是否显示边的回调函数

## API

### updateParams

**类型**：`(cfg: EdgeFilterLensConfig) => void;`

**说明**：更新配置项

### clear

**类型**：`() => void;`

**说明**：清除滤镜

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>
