---
title: Automatically Displays Shapes based on Density
order: 13
---

New feature in G6 5.0: During the scaling process, graphics are automatically displayed and showcased based on their density. At the same time, portions of graphics outside the viewport are hidden to enhance rendering performance.

## Usage

Configure the `lod-controller` plugin for the graph instance and adjust its parameters. It needs to be accompanied by the configuration of `lod: 'auto'` for the `xxShape` (where the `labelShape` and `labelBackgroundShape` have the default `lod` set to `'auto'` as well). The LodController automatically filters the graphics that can be displayed based on the current density of the graph. Additionally, during the zoom-in process, the text has more space to display complete content and is adjusted automatically. This plugin is built-in and configured by default on the graph, with the following default parameters. You can also disable the level-of-detail control (`disableLod: true`) or adjust other parameters.

```javascript
{
  type: 'lod-controller',
  disableLod: false, // Enable level-of-detail control.
  cellSize: 200, // The size of each grid (relative to the viewport's DOM container coordinate system).
  numberPerCell: 1, // The number of graphics allowed to appear in each grid with the configuration of 'auto' for the level of detail (lod).
}
```

If you want to display different graphics based on the importance of the data at different zoom levels, you can configure a numerical value for `lod` in `xxShape`, which represents its corresponding zoom level in the lodLevels configuration. The `lodLevels` configuration can be of the following types:

```typescript
interface LodLevel {
  zoomRange: [number, number];
  primary?: boolean;
}
```

That means the graphic will be displayed when the zoom level reaches the specified lod value. For example, if we define the `lodLevels` for nodes and configure the lod of `iconShape` as `0`, it signifies that the graphic will be displayed when the zoom level is greater than or equal to `0` (zoom factor between 1 and 1.2).

```javascript
node: {
  lodLevels: [
    { zoomRange: [0, 1] }, // -1
    { zoomRange: [1, 1.2], primary: true }, // The primary layer is the 0th layer.
    { zoomRange: [1.2, 1.3] }, // 1
    { zoomRange: [1.3, 1.5] }, // 2
    { zoomRange: [1.5, Infinity] }, // 3
  ],
  iconShape: {
    // ... Other configurations
    lod: 0
  },
  // ... Other configurations
}
```

If you do not want to perform level-of-detail control and want all configured graphics to be always displayed, you can disable the level-of-detail functionality of the `LodController` with the following configuration:

```javascript
plugins: [
  {
    type: 'lod-controller',
    disableLod: true,
  },
];
```
