---
title: Fisheye 鱼眼放大镜
---

放大透镜中的对象

<img alt="fish eye" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Wc3aSqIp-4oAAAAAAAAAAAAADmJ7AQ/original" height='400'/>

## 配置项

<embed src="../../common/IPluginBaseConfig.zh.md"></embed>

### d

**类型**：`number`

**默认值**：`1.5`

**是否必须**：false

**说明**：鱼眼放大倍率

### maxD

**类型**：`number`

**默认值**：`5`

**是否必须**：false

**说明**：鱼眼放大倍数的最大值

### minD

**类型**：`number`

**默认值**：`1`

**是否必须**：false

**说明**：鱼眼放大倍数的最小值

### scaleDBy

**类型**：`'wheel'` | `'drag'` | `'unset'`

**默认值**：`'drag'`

**是否必须**：false

**说明**：鱼眼放大倍数的缩放方式

> 即在鱼眼中通过鼠标滚轮或者拖拽来缩放鱼眼放大倍数

### showDPercent

**类型**：`boolean`

**默认值**：`true`

**是否必须**：false

**说明**：是否展示鱼眼区域内对象的放大倍率(`d`)

<embed src="../../common/Throttle.zh.md"></embed>

<embed src="../../common/PluginLensBase.zh.md"></embed>

## API

### updateParams

**类型**：`(cfg: FisheyeConfig) => void;`

**说明**：更新配置项

### clear

**类型**：`() => void;`

**说明**：清除鱼眼放大镜

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>
