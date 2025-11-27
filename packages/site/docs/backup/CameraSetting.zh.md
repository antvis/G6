---
title: CameraSetting 相机设置
---

## 配置项

### <Badge type="success">Required</Badge> type

> _`camera-setting` \| string_

⚠️ **注意**：

- 相机设置插件必须在 3D 场景下使用
- 此插件在使用前需要自行注册：

```javascript
import { register, CameraSetting, ExtensionCategory } from '@antv/g6';

register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting); // type: 'camera-setting'
```

### aspect

> _number \| `'auto'`_

相机视口宽高比，仅在透视相机下有效

- number : 具体的宽高比

- `'auto'` : 自动设置为画布的宽高比

### azimuth

> _number_

方位角

### cameraType

> _'orbiting' \| 'exploring' \| 'tracking'_

相机类型

- `'orbiting'`: 固定视点，改变相机位置
- `'exploring'`: 类似 orbiting，但允许相机在北极和南极之间旋转
- `'tracking'`: 固定相机位置，改变视点

### distance

> _number_ **Default:** `500`

相机距离目标的距离

### elevation

> _number_

仰角

### far

> _number_

远平面位置

### fov

> _number_

相机视角，仅在透视相机下有效

### maxDistance

> _number_

最大视距

### minDistance

> _number_

最小视距

### near

> _number_

近平面位置

### projectionMode

> _'perspective' \| 'orthographic'_

投影模式，透视投影仅在 3D 场景下有效

- `'perspective'` : 透视投影
- `'orthographic'` : 正交投影

### roll

> _number_

滚转角

## API
