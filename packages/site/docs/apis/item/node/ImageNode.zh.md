---
title: Image 图片
order: 4
---

本文展示所有 Image 图片配置项。[Image 图片 DEMO](/zh/examples/item/defaultNodes/#image)。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NPG3SL_n-CYAAAAAAAAAAAAADmJ7AQ/original" width=500 />

## keyShape

- **类型**：

```typescript
StyleProps & {
  /**
   * 图片的源地址。可以是 URL 或图像数据的 base64 编码
   */
  src?: string;
  /**
   * 图片的宽度
   */
  width?: number;
  /**
   * 图片的高度
   */
  height?: number;
  /**
   * 裁剪图片的配置
   */
  clipCfg?: ClipCfg;
};
```

其中，相关的图形样式参考 [Image 图形样式](../shape/ImageStyleProps.zh.md)。

`ClipCfg` 定义如下：

```typescript
type SHAPE_TYPE = 'rect' | 'circle' | 'ellipse';

type ClipCfg = {
  type: SHAPE_TYPE;
  show: boolean;
} & CircleStyleProps &
  RectStyleProps &
  EllipseStyleProps;
```

可以指定裁剪图形的类型及其样式。根据不同的目标裁剪图形类型，样式配置项不同。例如 `type` 是 `'circle'` 参考 [Circle 图形样式](../shape/CircleStyleProps.zh.md)；`'rect'` 参考 [Rect 图形样式](../shape/RectStyleProps.zh.md)。

- **默认值**：

```json
{
  "width": "32",
  "height": "32
}
```

- **是否必须**：否

<embed src="../../../common/NodeShapeStyles.zh.md"></embed>
