---
title: 导出图片
order: 12
---

## 图片导出概述

G6 提供了将图导出为图片的功能，可以将当前画布内容导出为 DataURL 格式，方便保存、分享或进一步处理。导出的图片会保留画布上的所有可见元素，包括节点、边、组合以及其他自定义图形。

## API 参考

### Graph.toDataURL(options)

将当前画布导出为 DataURL 格式的图片。

```typescript
toDataURL(options?: Partial<DataURLOptions>): Promise<string>;
```

**参数**

| 参数    | 描述         | 类型                      | 默认值 | 必选 |
| ------- | ------------ | ------------------------- | ------ | ---- |
| options | 导出图片配置 | Partial\<DataURLOptions\> | -      |      |

**返回值**

返回一个 Promise，解析为表示图片的 DataURL 字符串。

**DataURLOptions 类型定义**

| 参数           | 类型                                        | 必选 | 描述                                                                                             |
| -------------- | ------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------ |
| mode           | 'viewport' \| 'overall'                     | 否   | 导出模式 <br/> - viewport: 导出视口内容 <br/> - overall: 导出整个画布                            |
| type           | 'image/png' \| 'image/jpeg' \| 'image/webp' | 否   | 图片类型 <br/> - image/png: PNG 格式 <br/> - image/jpeg: JPEG 格式 <br/> - image/webp: WebP 格式 |
| encoderOptions | number                                      | 否   | 图片质量，仅对 image/jpeg 和 image/webp 有效，取值范围 0 ~ 1                                     |

## 下载图片

G6 5.0 仅提供导出画布为 Base64 图片的 API([toDataURL](#graphtodataurloptions))，如果需要下载图片，可以使用以下方法：

```typescript
async function downloadImage() {
  const dataURL = await graph.toDataURL();
  const [head, content] = dataURL.split(',');
  const contentType = head.match(/:(.*?);/)![1];

  const bstr = atob(content);
  let length = bstr.length;
  const u8arr = new Uint8Array(length);

  while (length--) {
    u8arr[length] = bstr.charCodeAt(length);
  }

  const blob = new Blob([u8arr], { type: contentType });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'graph.png';
  a.click();
}
```

<br />

:::warning{title=注意}
导出的图片内容可能不会包含完整的画布内容，导出范围仅包含 Graph 画布中的内容。部分插件使用了自定义的容器、画布等，这部分内容不会出现在导出的图片中。
:::
