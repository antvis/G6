---
title: 使用 Iconfont
order: 10
---

<!-- TODO 该教程未经过实际验证 -->

## 引入

参考[帮助文档](https://www.iconfont.cn/help/detail?helptype=code) 中 **unicode 引用** 一项将 Iconfont 引入项目。

## 使用

创建文本图形过程中，将 `fontFamily` 设置为 `'iconfont'` 即可。例如：

```ts
public drawLabelShape(
  model: NodeDisplayModel,
  shapeMap: NodeShapeMap,
): DisplayObject {
  return this.upsertShape(
    'text',
    'labelShape',
    {
      text: '&#....;', // 图标代码
      fontFamily: 'iconfont'
    },
    shapeMap,
    model,
  );
}
```
