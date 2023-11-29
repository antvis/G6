---
title: 缩放过程根据密度自动显示和隐藏文本
order: 13
---

G6 5.0 新增能力：在缩放过程中根据图形的密度，自动显示和展示图形。同时隐藏视窗以外的部分图形，以提升渲染性能。

## 使用指南

为图实例的 `plugins` 配置 `lod-controller` 并调整其参数。需要配合 `xxShape` 的配置 `lod: 'auto'`（其中，`labelShape` 和 `labelBackgroundShape` 默认 `lod` 即为 `'auto'`），LodController(信息分层控制器)将按照当前图形的密度自动筛选可显示的图形。同时，在放大的过程中，文本也有了更大的空间展示更完整的内容，并自动调整。这一插件是内置且默认配置到图上的，默认参数如下。您也可以关闭信息分层（`disableLod: true`）或调整其他参数。

```javascript
{
  type: 'lod-controller',
  disableLod: false, // 表示开启信息分层
  cellSize: 200, // 每个格子的大小（相对于视窗的 DOM 容器坐标系）
  numberPerCell: 1, // 每个格子允许出现的配置 lod 为 'auto' 的图形数量
}
```

如果你希望根据数据的重要程度，在不同的缩放等级下显示不同的图形，可以为 `xxShape` 配置数值 `lod`，代表其与 `lodLevels` 配置的缩放等级对应，`lodLevels` 的类型如下：

```typescript
interface LodLevel {
  zoomRange: [number, number];
  primary?: boolean;
}
```

即缩放等级达到 `lod` 数值时显示。例如下面定义了节点的 `lodLevels`，并为 `iconShape` 的 `lod` 配置为 `0`，则代表在缩放等级大于等于 `0` (缩放系数在 1 ~ 1.2) 的情况下显示：

```javascript
node: {
  lodLevels: [
    { zoomRange: [0, 1] }, // -1
    { zoomRange: [1, 1.2], primary: true }, // primary 层为第 0 层
    { zoomRange: [1.2, 1.3] }, // 1
    { zoomRange: [1.3, 1.5] }, // 2
    { zoomRange: [1.5, Infinity] }, // 3
  ],
  iconShape: {
    // ... 其他配置
    lod: 0
  },
  // ... 其他配置
}
```

如果你不希望进行信息分层，即配置的所有图形永远都显示，那么可以关闭 LodController 的信息分层功能，配置如下：

```javascript
plugins: [
  {
    type: 'lod-controller',
    disableLod: true,
  },
];
```
