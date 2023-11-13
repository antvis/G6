---
title: Image 图片
order: 4
---

本文展示 Image 图片 `keyShape` 配置项的详细说明。对于其它配置项，可以参考[通用配置](/apis/item/node/node-intro#通用属性)。[Image 图片 DEMO](/zh/examples/item/defaultNodes/#image)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NPG3SL_n-CYAAAAAAAAAAAAADmJ7AQ/original" width=600 />

## KeyShapeStyle

相关的图形样式参考 [`ImageStyleProps`](../../shape/ImageStyleProps.zh.md), 扩展属性如下：

### KeyShapeStyle.src

图片的源地址。可以是 URL 或图像数据的 base64 编码。

- **是否必须**：否
- **类型**：`string`

### KeyShapeStyle.width

图片的宽度。

- **是否必须**：否
- **类型**：`number`
- **默认值**：`32`

### KeyShapeStyle.height

图片的高度。

- **是否必须**：否
- **类型**：`number`
- **默认值**：`32`

### keyShapeStyle.clipCfg

裁剪图片的配置。可以指定裁剪图形的类型及其样式。根据不同的目标裁剪图形类型，样式配置项不同。例如 `type` 是 `'circle'` 参考 [Circle 图形样式](../shape/CircleStyleProps.zh.md)；`'rect'` 参考 [Rect 图形样式](../shape/RectStyleProps.zh.md)。

- **是否必须**：否
- **类型**：`ClipCfg`

```typescript
type SHAPE_TYPE = 'rect' | 'circle' | 'ellipse';

type ClipCfg = {
  type: SHAPE_TYPE;
  show: boolean;
} & CircleStyleProps &
  RectStyleProps &
  EllipseStyleProps;
```
