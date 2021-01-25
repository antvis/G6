---
title: 增加水印
order: 16
---

### graph.setTextWaterMarker(texts, config)

为画布添加文字水印。注意，使用 `downloadImage` 或 `downloadFullImage` 下载图片将不会带有水印。

**参数**

| 名称   | 类型     | 是否必选 | 描述                                     |
| ------ | -------- | -------- | ---------------------------------------- |
| texts  | String[] | true     | 水印文字内容数组，数组中的不同项将会换行 |
| config | Object   | false    | 文字水印配置项，可选，具体字段见下方     |

其中，config 为文字水印配置项，具体字段：

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| width | Number | false | 单个水印的宽，可控制单个水印之间的水平间距，默认 `150` |
| height | Number | false | 单个水印的高，可控制单个水印之间的竖直间距，默认 `100` |
| compatible | Boolean | false | 是否需要兼容不支持 `pointer-events` 属性的浏览器，默认为 `false` |
| text | Object | false | 文本图形的样式属性，默认为：`{ x: 0, y: 60, lineHeight: 20, rotate: 20, fontSize: 14, fontFamily: 'Microsoft YaHei', fill: 'rgba(0, 0, 0, 0.1)', baseline: 'Middle', }` |

**用法**

```javascript
graph.setTextWaterMarker(['AntV', 'G6']);
```

### graph.setImageWaterMarker(imgURL, config)

为画布添加图片水印。注意，使用 `downloadImage` 或 `downloadFullImage` 下载图片将不会带有水印。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| imgURL | String[] | true | 水印图片，默认为 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg' |
| config | Object | false | 图片水印配置项，可选，具体字段见下方 |

其中，config 为图片水印配置项，具体字段：

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| width | Number | false | 单个水印的宽，可控制单个水印之间的水平间距，默认 `150` |
| height | Number | false | 单个水印的高，可控制单个水印之间的竖直间距，默认 `130` |
| compatible | Boolean | false | 是否需要兼容不支持 `pointer-events` 属性的浏览器，默认为 `false` |
| image | Object | false | 图片图形的样式属性，默认为：`{ x: 0, y: 0, width: 30, height: 20, rotate: 0 }` |

**用法**

```javascript
graph.setImageWaterMarker(
  'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
  {
    width: 300,
    height: 200,
    image: { rotate: Math.PI / 3 },
  },
);
```
