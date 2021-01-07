---
title: 导出图片
order: 17
---

### graph.downloadFullImage(name, type, imageConfig)

将画布上的元素导出为图片。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| name | String | false | 图片的名称，不指定则为 'graph' |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false | 图片的类型。图的 `renderer` 为默认的 `'canvas'` 时生效，图的 `renderer` 为 `'svg'` 时将导出 svg 文件 |
| imageConfig | Object | false | 图片的配置项，可选，具体字段见下方 |

其中，imageConfig 为导出图片的配置参数：

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| backgroundColor | String | false | 图片的背景色，可选，不传值时将导出透明背景的图片 |
| padding | Number / Number[] | false | 导出图片的上左下右 padding 值。当 `padding` 为 number 类型时，四周 `padding` 相等 |

**用法**

```javascript
graph.downloadFullImage('tree-graph', {
  backgroundColor: '#ddd',
  padding: [30, 15, 15, 15],
});
```

### graph.downloadImage(name, type, backgroundColor)

将画布上的元素导出为图片。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| name | String | false | 图片的名称，不指定则为 'graph' |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false | 图片的类型。图的 `renderer` 为默认的 `'canvas'` 时生效，图的 `renderer` 为 `'svg'` 时将导出 svg 文件 |
| backgroundColor | String | false | 图片的背景色，可选，不传值时将导出透明背景的图片 |

**用法**

```javascript
graph.downloadImage();
```

### graph.toFullDataURL(callback, type, imageConfig)

将画布上元素生成为图片的 URL。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| callback | Function | true | 异步生成 dataUrl 完成后的回调函数，在这里处理生成的 dataUrl 字符串 |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false | 图片的类型。图的 `renderer` 为默认的 `'canvas'` 时生效，图的 `renderer` 为 `'svg'` 时将导出 svg 文件 |
| imageConfig | Object | false | 图片的配置项，可选，具体字段见下方 |

其中，imageConfig 为导出图片的配置参数：

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| backgroundColor | String | false | 图片的背景色，可选，不传值时将导出透明背景的图片 |
| padding | Number / Number[] | false | 导出图片的上左下右 padding 值。当 `padding` 为 number 类型时，四周 `padding` 相等 |

无返回值，生成的结果请在 callback 中处理。如下示例：

**用法**

```javascript
graph.toFullDataUrl(
  // 第一个参数为 callback，必须
  (res) => {
    // ... something
    console.log(res); // 打印出结果
  },
  // 后两个参数不是必须
  'image/jpeg',
  (imageConfig: {
    backgroundColor: '#fff',
    padding: 10,
  }),
);
```

### graph.toDataURL(type, backgroundColor)

将画布上元素生成为图片的 URL。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false | 图片的类型。图的 `renderer` 为默认的 `'canvas'` 时生效，图的 `renderer` 为 `'svg'` 时将导出 svg 文件 |
| backgroundColor | String | false | 图片的背景色，可选，不传值时将导出透明背景的图片 |

**返回值**

- 返回值类型：String；
- 返回值表示生成的图片的 URL。

**用法**

```javascript
const dataURL = graph.toDataURL();
```
