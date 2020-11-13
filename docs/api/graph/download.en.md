---
title: Export Image
order: 16
---

### graph.downloadFullImage(name, type, imageConfig)

Export the whole graph as an image, whatever (a part of) the graph is out of the screen.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| name | String | false | The name of the image. 'graph' by default. |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false | The type of the image. When the `renderer` of the graph is `'canvas'`(default), `type` takes effect. When the `renderer` is `'svg'`, `toFullDataURL` will export a svg file |
| imageConfig | Object | false | The configuration for the exported image, detials are shown below |

where the `imageConfig` is the configuration for exported image:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| backgroundColor | String | false | The background color of the image. If it is not assigned, the background will be transparent. |
| padding | Number / Number[] | false | The top, right, bottom, right paddings of the exported image. When its type is number, the paddings around the graph are the same |

**Usage**

```javascript
graph.downloadFullImage('tree-graph', {
  backgroundColor: '#ddd',
  padding: [30, 15, 15, 15],
});
```

### graph.downloadImage(name, type, backgroundColor)

Export the canvas as an image.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| name | String | false | The name of the image. 'graph' by default |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false | The type of the image. When the `renderer` of the graph is `'canvas'`(default), `type` takes effect. When the `renderer` is `'svg'`, `toFullDataURL` will export a svg file |
| backgroundColor | String | false | The background color of the image. If it is not assigned, the background will be transparent. |

**Usage**

```javascript
graph.downloadImage();
```

### graph.toDataURL(type, backgroundColor)

Generate url of the image of the graph inside the view port.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false | The type of the image. When the `renderer` of the graph is `'canvas'`(default), `type` takes effect. When the `renderer` is `'svg'`, `toFullDataURL` will export a svg file |
| backgroundColor | String | false | The background color of the image. If it is not assigned, the background will be transparent. |

**Return**

- Type of the return value: string;
- The return value is the image url.

**Usage**

```javascript
const dataURL = graph.toDataURL();
```

### graph.toFullDataURL(callback, type, backgroundColor)

Generate url of the image of the whole graph including the part out of the view port.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| callback | Function | true | The callback function after finish generating the dataUrl of the full graph |
| Asynchronously |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false | The type of the image. When the `renderer` of the graph is `'canvas'`(default), `type` takes effect. When the `renderer` is `'svg'`, `toFullDataURL` will export a svg file |
| imageConfig | Object | false | The configuration for the exported image, detials are shown below |

where the `imageConfig` is the configuration for exported image:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| backgroundColor | String | false | The background color of the image. If it is not assigned, the background will be transparent. |
| padding | Number / Number[] | false | The top, right, bottom, right paddings of the exported image. When its type is number, the paddings around the graph are the same |

No return value, you can process the result in the callback function as shown below:

**Usage**

```javascript
graph.toFullDataUrl(
  // The first parameter: callback, required
  (res) => {
    // ... something
    console.log(res); // e.g. print the result
  },
  // The second and third parameter is not required
  'image/jpeg',
  (imageConfig: {
    backgroundColor: '#fff',
    padding: 10,
  }),
);
```
