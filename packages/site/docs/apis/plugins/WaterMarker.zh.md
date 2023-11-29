---
title: WaterMarker 水印
order: 9
---

- [文本水印](/examples/tool/watermarker/#textWaterMarker)
- [图片水印](/examples/tool/watermarker/#imgWaterMarker)

<img alt="water marker" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EihfS63JehkAAAAAAAAAAAAADmJ7AQ/original" height='300'/>

## 配置项

<embed src="../../common/IPluginBaseConfig.zh.md"></embed>

### begin

**类型**：`[number, number]`

**默认值**：`[0, 0]`

水印开始位置

### image

**类型**：`ImageWaterMarkerConfig`

**默认值**：`undefined`

图片水印配置项

### mode

**类型**：`'image' | 'text'`

**默认值**：`'image'`

水印类型

### position

**类型**：`'top' | 'middle' | 'bottom'

**默认值**：`'middle'`

水印位置

- `top`：顶层画布（位于图上层）
- `middle`：中间层画布
- `bottom`：底层画布（位于图下层）

<!-- TODO 这里存在拼写错误 -->

### seperation

**类型**：`[number, number]`

**默认值**：`[100, 100]`

水印间隔

<embed src="../../common/PluginSize.zh.md"></embed>

### text

**类型**：`TextWaterMarkerConfig`

**默认值**：`undefined`

文字水印配置项

## API

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>

---

```ts
type ImageWaterMarkerConfig = {
  imgURL: string;
  width: number;
  height: number;
  rotate: number;
};

interface TextWaterMarkerConfig extends TextStyleProps {
  /** Text or an array of texts to be used as the watermark content. */
  texts: string | string[];
  /** Rotation angle of the text watermark in degrees (0 to 360). */
  rotate: number;
}
```

- [TextStyleProps](/apis/shape/text-style-props)
