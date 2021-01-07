---
title: Water Marker
order: 16
---

### graph.setTextWaterMarker(texts, config)

Add text water marker for the canvas. Note that, images downloaded by `downloadImage` or `downloadFullImage` will not contains the water markers.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| texts | String[] | true | The text array for the water marker, the each item in the array with take one line |
| config | Object | false | The configurations for the text water marker, the properties are listed below |

`config` is the configurations for the text water marker with:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| width | Number | false | The width of a single marker, which controls the horizontal space between two single markers, `150` by default |
| height | Number | false | The height of a single marker, which controls the vertical space between two single markers, `100` by default |
| compatible | Boolean | false | Whether compatible with the browsers which does not support `pointer-events`, `false` by default |
| text | Object | false | The style sttributes for the text shapes, the default value is: `{ x: 0, y: 60, lineHeight: 20, rotate: 20, fontSize: 14, fontFamily: 'Microsoft YaHei', fill: 'rgba(0, 0, 0, 0.1)', baseline: 'Middle', }` |

**Usage**

```javascript
graph.setTextWaterMarker(['AntV', 'G6']);
```

### graph.setImageWaterMarker(imgURL, config)

Add image water markers for the graph. Note that, images downloaded by `downloadImage` or `downloadFullImage` will not contains the water markers.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| imgURL | String[] | true | The url of the image for the water marker, the default value is `'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg'` |
| config | Object | false | The configurations for the image watermarker, the properties are listed below |

`config` is the configurations for the image water marker with:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| width | Number | false | The width of a single marker, which controls the horizontal space between two single markers, `150` by default |
| height | Number | false | The height of a single marker, which controls the vertical space between two single markers, `130` by default |
| compatible | Boolean | false | Whether compatible with the browsers which does not support `pointer-events`, `false` by default |
| image | Object | false | The style sttributes for the image shapes, the default value is: `{ x: 0, y: 0, width: 30, height: 20, rotate: 0 }` |

**Usage**

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
