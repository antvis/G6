---
title: Export Image
order: 12
---

## Overview of Image Export

G6 provides the functionality to export the graph as an image, allowing you to export the current canvas content as a DataURL format. This is convenient for saving, sharing, or further processing. The exported image will retain all visible elements on the canvas, including nodes, edges, combos, and other custom graphics.

## API Reference

### Graph.toDataURL(options)

Export the current canvas as an image in DataURL format.

```typescript
toDataURL(options?: Partial<DataURLOptions>): Promise<string>;
```

**Parameters**

| Parameter | Description                | Type                      | Default | Required |
| --------- | -------------------------- | ------------------------- | ------- | -------- |
| options   | Export image configuration | Partial\<DataURLOptions\> | -       |          |

**Return Value**

Returns a Promise that resolves to a DataURL string representing the image.

**DataURLOptions Type Definition**

| Parameter      | Type                                        | Required | Description                                                                                              |
| -------------- | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| mode           | 'viewport' \| 'overall'                     | No       | Export mode <br/> - viewport: Export viewport content <br/> - overall: Export entire canvas              |
| type           | 'image/png' \| 'image/jpeg' \| 'image/webp' | No       | Image type <br/> - image/png: PNG format <br/> - image/jpeg: JPEG format <br/> - image/webp: WebP format |
| encoderOptions | number                                      | No       | Image quality, only effective for image/jpeg and image/webp, range 0 ~ 1                                 |

## Download Image

G6 5.0 only provides an API to export the canvas as a Base64 image ([toDataURL](#graphtodataurloptions)). If you need to download the image, you can use the following method:

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

:::warning{title=Note}
The exported image content may not include the complete canvas content. The export range only includes the content within the Graph canvas. Some plugins use custom containers, canvases, etc., which will not appear in the exported image.
:::
