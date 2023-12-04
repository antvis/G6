---
title: WaterMarker
order: 9
---

- [Text WaterMarker](/en/examples/tool/watermarker/#textWaterMarker)
- [Image WaterMarker](/en/examples/tool/watermarker/#imgWaterMarker)

<img alt="water marker" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EihfS63JehkAAAAAAAAAAAAADmJ7AQ/original" height='300'/>

## Configurations

<embed src="../../common/IPluginBaseConfig.en.md"></embed>

### begin

**Type**: `[number, number]`

**Default**: `[0, 0]`

Watermark start position

### image

**Type**: `ImageWaterMarkerConfig`

**Default**: `undefined`

Image watermark configuration

### mode

**Type**: `'image' | 'text'`

**Default**: `'image'`

Watermark type

### position

**Type**: `'top' | 'middle' | 'bottom'

**Default**: `'middle'`

Watermark position

- `top`: Top layer canvas (above the graph)
- `middle`: Middle layer canvas
- `bottom`: Bottom layer canvas (below the graph)

### separation

**Type**: `[number, number]`

**Default**: `[100, 100]`

The distance between the watermark and the canvas

<embed src="../../common/PluginSize.en.md"></embed>

### text

**Type**: `TextWaterMarkerConfig`

**Default**: `undefined`

Text watermark configuration

## API

<embed src="../../common/PluginAPIDestroy.en.md"></embed>

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
