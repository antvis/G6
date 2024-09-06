---
title: 下载图片
order: 3
---

G6 5.0 仅提供导出画布为 Base64 图片的 API([toDataURL](/api/graph/method#graphtodataurloptions))，如果需要下载图片，可以使用以下方法：

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

:::warning{title=注意}
导出的图片内容可能不会包含完整的画布内容，导出范围仅包含 Graph 画布中的内容。部分插件使用了自定义的容器、画布等，这部分内容不会出现在导出的图片中。
:::
