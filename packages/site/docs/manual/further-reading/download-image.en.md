---
title: download-image
order: 3
---

G6 5.0 only provides an API for exporting the canvas as a Base64 image ([toDataURL](/en/api/graph/method#graphtodataurloptions)). If you need to download the image, you can use the following method:

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

:::warning{title=note}
The exported image may not contain the complete canvas content; the export range only includes the content within the Graph canvas. Some plugins use custom containers, canvases, etc., and this content will not appear in the exported image.
:::
