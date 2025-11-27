---
title: 主题总览
order: 1
---

## 概述

G6 中的主题是 Graph Options 的子集，它包含了关于画布和元素样式的配置。多主题可以帮助你快速地切换不同的图样式。

<image width="350" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gASzQbsbAaIAAAAAAAAAAAAADmJ7AQ/original"></image>

## 主题结构

一个主题由以下四个部分组成：

1. **画布背景色 (background)**

   - 控制整个画布的背景颜色

2. **节点配置 (node)**

   - 基础样式：填充色、描边、标签等静态视觉属性
   - [调色板](/manual/theme/palette)：用于节点分组的颜色配置
   - 状态样式：不同状态下的样式配置（选中、激活、禁用等）
   - 动画配置：节点的动画效果配置

3. **边配置 (edge)**

   - 基础样式：线条样式、箭头、标签等静态视觉属性
   - [调色板](/manual/theme/palette)：用于边分组的颜色配置
   - 状态样式：不同状态下的样式配置
   - 动画配置：边的动画效果配置

4. **Combo 配置 (combo)**
   - 基础样式：填充、描边、折叠按钮等静态视觉属性
   - 状态样式：不同状态下的样式配置
   - 动画配置：Combo 的动画效果配置

> 注意：主题中的样式配置仅支持静态值，不支持回调函数形式的动态配置。如需动态样式，请使用图的配置项。

## 内置主题

G6 默认提供两种内置主题：

### 亮色主题（默认）

<img width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*SPCES62UzzAAAAAAAAAAAAAAemJ7AQ/original" alt="亮色主题" />

<details><summary>查看亮色主题完整配置项</summary>

```js
const lightTheme = {
  background: '#ffffff',
  node: {
    palette: {
      type: 'group',
      color: [
        '#1783FF',
        '#00C9C9',
        '#F08F56',
        '#D580FF',
        '#7863FF',
        '#DB9D0D',
        '#60C42D',
        '#FF80CA',
        '#2491B3',
        '#17C76F',
      ],
    },
    style: {
      donutOpacity: 1,
      badgeBackgroundOpacity: 1,
      badgeFill: '#fff',
      badgeFontSize: 8,
      badgePadding: [0, 4],
      badgePalette: ['#7E92B5', '#F4664A', '#FFBE3A'],
      fill: '#1783ff',
      fillOpacity: 1,
      halo: false,
      iconFill: '#fff',
      iconOpacity: 1,
      labelBackground: false,
      labelBackgroundFill: '#ffffff',
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.75,
      labelFill: '#000000',
      labelFillOpacity: 0.85,
      labelLineHeight: 16,
      labelPadding: [0, 2],
      labelFontSize: 12,
      labelFontWeight: 400,
      labelOpacity: 1,
      labelOffsetY: 2,
      lineWidth: 0,
      portFill: '#1783ff',
      portLineWidth: 1,
      portStroke: '#000000',
      portStrokeOpacity: 0.65,
      size: 32,
      stroke: '#000000',
      strokeOpacity: 1,
      zIndex: 2,
    },
    state: {
      selected: {
        halo: true,
        haloLineWidth: 24,
        haloStrokeOpacity: 0.25,
        labelFontSize: 12,
        labelFontWeight: 'bold',
        lineWidth: 4,
        stroke: '#000000',
      },
      active: {
        halo: true,
        haloLineWidth: 12,
        haloStrokeOpacity: 0.15,
      },
      highlight: {
        labelFontWeight: 'bold',
        lineWidth: 4,
        stroke: '#000000',
        strokeOpacity: 0.85,
      },
      inactive: {
        badgeBackgroundOpacity: 0.25,
        donutOpacity: 0.25,
        fillOpacity: 0.25,
        iconOpacity: 0.85,
        labelFill: '#000000',
        labelFillOpacity: 0.25,
        strokeOpacity: 0.25,
      },
      disabled: {
        badgeBackgroundOpacity: 0.25,
        donutOpacity: 0.06,
        fill: '#1B324F',
        fillOpacity: 0.06,
        iconFill: '#1B324F',
        iconOpacity: 0.25,
        labelFill: '#000000',
        labelFillOpacity: 0.25,
        strokeOpacity: 0.06,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
      show: 'fade',
      hide: 'fade',
      expand: 'node-expand',
      collapse: 'node-collapse',
      update: [{ fields: ['x', 'y', 'fill', 'stroke'] }],
      translate: [{ fields: ['x', 'y'] }],
    },
  },
  edge: {
    palette: {
      type: 'group',
      color: [
        '#99ADD1',
        '#1783FF',
        '#00C9C9',
        '#F08F56',
        '#D580FF',
        '#7863FF',
        '#DB9D0D',
        '#60C42D',
        '#FF80CA',
        '#2491B3',
        '#17C76F',
      ],
    },
    style: {
      badgeBackgroundFill: '#99ADD1',
      badgeFill: '#fff',
      badgeFontSize: 8,
      badgeOffsetX: 10,
      fillOpacity: 1,
      halo: false,
      haloLineWidth: 12,
      haloStrokeOpacity: 1,
      increasedLineWidthForHitTesting: 2,
      labelBackground: false,
      labelBackgroundFill: '#ffffff',
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.75,
      labelBackgroundPadding: [4, 4, 4, 4],
      labelFill: '#000000',
      labelFontSize: 12,
      labelFontWeight: 400,
      labelOpacity: 1,
      labelPlacement: 'center',
      labelTextBaseline: 'middle',
      lineWidth: 1,
      stroke: '#99ADD1',
      strokeOpacity: 1,
      zIndex: 1,
    },
    state: {
      selected: {
        halo: true,
        haloStrokeOpacity: 0.25,
        labelFontSize: 14,
        labelFontWeight: 'bold',
        lineWidth: 3,
      },
      active: {
        halo: true,
        haloStrokeOpacity: 0.15,
      },
      highlight: {
        labelFontWeight: 'bold',
        lineWidth: 3,
      },
      inactive: {
        stroke: '#1B324F',
        fillOpacity: 0.08,
        labelOpacity: 0.25,
        strokeOpacity: 0.08,
        badgeBackgroundOpacity: 0.25,
      },
      disabled: {
        stroke: '#d9d9d9',
        fillOpacity: 0.45,
        strokeOpacity: 0.45,
        labelOpacity: 0.25,
        badgeBackgroundOpacity: 0.45,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
      expand: 'path-in',
      collapse: 'path-out',
      show: 'fade',
      hide: 'fade',
      update: [{ fields: ['sourceNode', 'targetNode'] }, { fields: ['stroke'], shape: 'key' }],
      translate: [{ fields: ['sourceNode', 'targetNode'] }],
    },
  },
  combo: {
    style: {
      collapsedMarkerFill: '#ffffff',
      collapsedMarkerFontSize: 12,
      collapsedMarkerFillOpacity: 1,
      collapsedSize: 32,
      collapsedFillOpacity: 1,
      fill: '#99ADD1',
      halo: false,
      haloLineWidth: 12,
      haloStroke: '#99ADD1',
      haloStrokeOpacity: 0.25,
      labelBackground: false,
      labelBackgroundFill: '#ffffff',
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.75,
      labelBackgroundPadding: [2, 4, 2, 4],
      labelFill: '#000000',
      labelFontSize: 12,
      labelFontWeight: 400,
      labelOpacity: 1,
      lineDash: 0,
      lineWidth: 1,
      fillOpacity: 0.04,
      strokeOpacity: 1,
      padding: 10,
      stroke: '#99ADD1',
    },
    state: {
      selected: {
        halo: true,
        labelFontSize: 14,
        labelFontWeight: 700,
        lineWidth: 4,
      },
      active: {
        halo: true,
      },
      highlight: {
        labelFontWeight: 700,
        lineWidth: 4,
      },
      inactive: {
        fillOpacity: 0.65,
        labelOpacity: 0.25,
        strokeOpacity: 0.65,
      },
      disabled: {
        fill: '#d9d9d9',
        fillOpacity: 0.25,
        labelOpacity: 0.25,
        stroke: '#d9d9d9',
        strokeOpacity: 0.25,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
      show: 'fade',
      hide: 'fade',
      expand: 'combo-expand',
      collapse: 'combo-collapse',
      update: [{ fields: ['x', 'y'] }, { fields: ['fill', 'stroke', 'lineWidth'], shape: 'key' }],
      translate: [{ fields: ['x', 'y'] }],
    },
  },
};
```

</details>

### 暗色主题

<img width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qTlLSoAbaXYAAAAAAAAAAAAAemJ7AQ/original" alt="暗色主题" />

<details><summary>查看暗色主题完整配置项</summary>

```js
const darkTheme = {
  background: '#000000',
  node: {
    palette: {
      type: 'group',
      color: [
        '#1783FF',
        '#00C9C9',
        '#F08F56',
        '#D580FF',
        '#7863FF',
        '#DB9D0D',
        '#60C42D',
        '#FF80CA',
        '#2491B3',
        '#17C76F',
      ],
    },
    style: {
      donutOpacity: 1,
      badgeBackgroundOpacity: 1,
      badgeFill: '#fff',
      badgeFontSize: 8,
      badgePadding: [0, 4],
      badgePalette: ['#7E92B5', '#F4664A', '#FFBE3A'],
      fill: '#1783ff',
      fillOpacity: 1,
      halo: false,
      iconFill: '#fff',
      iconOpacity: 1,
      labelBackground: false,
      labelBackgroundFill: '#000000',
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.75,
      labelFill: '#ffffff',
      labelFillOpacity: 0.85,
      labelLineHeight: 16,
      labelPadding: [0, 2],
      labelFontSize: 12,
      labelFontWeight: 400,
      labelOpacity: 1,
      labelOffsetY: 2,
      lineWidth: 0,
      portFill: '#1783ff',
      portLineWidth: 1,
      portStroke: '#d0e4ff',
      portStrokeOpacity: 0.65,
      size: 32,
      stroke: '#d0e4ff',
      strokeOpacity: 1,
      zIndex: 2,
    },
    state: {
      selected: {
        halo: true,
        haloLineWidth: 24,
        haloStrokeOpacity: 0.45,
        labelFontSize: 12,
        labelFontWeight: 'bold',
        lineWidth: 4,
        stroke: '#d0e4ff',
      },
      active: {
        halo: true,
        haloLineWidth: 12,
        haloStrokeOpacity: 0.25,
      },
      highlight: {
        labelFontWeight: 'bold',
        lineWidth: 4,
        stroke: '#d0e4ff',
        strokeOpacity: 0.85,
      },
      inactive: {
        badgeBackgroundOpacity: 0.45,
        donutOpacity: 0.45,
        fillOpacity: 0.45,
        iconOpacity: 0.45,
        labelFill: '#ffffff',
        labelFillOpacity: 0.45,
        strokeOpacity: 0.45,
      },
      disabled: {
        badgeBackgroundOpacity: 0.25,
        donutOpacity: 0.25,
        fill: '#D0E4FF',
        fillOpacity: 0.25,
        iconFill: '#D0E4FF',
        iconOpacity: 0.25,
        labelFill: '#ffffff',
        labelFillOpacity: 0.25,
        strokeOpacity: 0.25,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
      show: 'fade',
      hide: 'fade',
      expand: 'node-expand',
      collapse: 'node-collapse',
      update: [{ fields: ['x', 'y', 'fill', 'stroke'] }],
      translate: [{ fields: ['x', 'y'] }],
    },
  },
  edge: {
    palette: {
      type: 'group',
      color: [
        '#637088',
        '#0F55A6',
        '#008383',
        '#9C5D38',
        '#8B53A6',
        '#4E40A6',
        '#8F6608',
        '#3E801D',
        '#A65383',
        '#175E75',
        '#0F8248',
      ],
    },
    style: {
      badgeBackgroundFill: '#637088',
      badgeFill: '#fff',
      badgeFontSize: 8,
      badgeOffsetX: 10,
      fillOpacity: 1,
      halo: false,
      haloLineWidth: 12,
      haloStrokeOpacity: 1,
      increasedLineWidthForHitTesting: 2,
      labelBackground: false,
      labelBackgroundFill: '#000000',
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.75,
      labelBackgroundPadding: [4, 4, 4, 4],
      labelFill: '#ffffff',
      labelFontSize: 12,
      labelFontWeight: 400,
      labelOpacity: 1,
      labelPlacement: 'center',
      labelTextBaseline: 'middle',
      lineWidth: 1,
      stroke: '#637088',
      strokeOpacity: 1,
      zIndex: 1,
    },
    state: {
      selected: {
        halo: true,
        haloStrokeOpacity: 0.25,
        labelFontSize: 14,
        labelFontWeight: 'bold',
        lineWidth: 3,
      },
      active: {
        halo: true,
        haloStrokeOpacity: 0.15,
      },
      highlight: {
        labelFontWeight: 'bold',
        lineWidth: 3,
      },
      inactive: {
        stroke: '#D0E4FF',
        fillOpacity: 0.08,
        labelOpacity: 0.25,
        strokeOpacity: 0.08,
        badgeBackgroundOpacity: 0.25,
      },
      disabled: {
        stroke: '#637088',
        fillOpacity: 0.45,
        strokeOpacity: 0.45,
        labelOpacity: 0.25,
        badgeBackgroundOpacity: 0.45,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
      expand: 'path-in',
      collapse: 'path-out',
      show: 'fade',
      hide: 'fade',
      update: [{ fields: ['sourceNode', 'targetNode'] }, { fields: ['stroke'], shape: 'key' }],
      translate: [{ fields: ['sourceNode', 'targetNode'] }],
    },
  },
  combo: {
    style: {
      collapsedMarkerFill: '#000000',
      collapsedMarkerFontSize: 12,
      collapsedMarkerFillOpacity: 1,
      collapsedSize: 32,
      collapsedFillOpacity: 1,
      fill: '#fdfdfd',
      halo: false,
      haloLineWidth: 12,
      haloStroke: '#99add1',
      haloStrokeOpacity: 0.25,
      labelBackground: false,
      labelBackgroundFill: '#000000',
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.75,
      labelBackgroundPadding: [2, 4, 2, 4],
      labelFill: '#ffffff',
      labelFontSize: 12,
      labelFontWeight: 400,
      labelOpacity: 1,
      lineDash: 0,
      lineWidth: 1,
      fillOpacity: 0.04,
      strokeOpacity: 1,
      padding: 10,
      stroke: '#99add1',
    },
    state: {
      selected: {
        halo: true,
        labelFontSize: 14,
        labelFontWeight: 700,
        lineWidth: 4,
      },
      active: {
        halo: true,
      },
      highlight: {
        labelFontWeight: 700,
        lineWidth: 4,
      },
      inactive: {
        fillOpacity: 0.65,
        labelOpacity: 0.25,
        strokeOpacity: 0.65,
      },
      disabled: {
        fill: '#d0e4ff',
        fillOpacity: 0.25,
        labelOpacity: 0.25,
        stroke: '#969696',
        strokeOpacity: 0.25,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
      show: 'fade',
      hide: 'fade',
      expand: 'combo-expand',
      collapse: 'combo-collapse',
      update: [{ fields: ['x', 'y'] }, { fields: ['fill', 'stroke', 'lineWidth'], shape: 'key' }],
      translate: [{ fields: ['x', 'y'] }],
    },
  },
};
```

</details>

## 使用主题

### 配置主题

在创建图时通过 `theme` 选项指定要使用的主题：

```javascript
const graph = new Graph({
  theme: 'light', // 或 'dark'
  // ... 其他配置
});
```

### 切换主题

创建图后，可以通过 `setTheme` 方法动态切换主题：

```javascript
// 切换到暗色主题
graph.setTheme('dark');

// 获取当前主题
const currentTheme = graph.getTheme(); // 'dark'
```

## 样式优先级

在 G6 中，元素的最终样式由多个层级的样式合并而成，按优先级从低到高排序：

**⭐️ 主题默认样式** < 调色板样式 < 数据样式 < 图的默认样式 < **⭐️ 主题状态样式** < 图的状态样式

详细说明：

1. **主题默认样式**：主题系统提供的基础样式
2. **调色板样式**：基于主题调色板配置的自动着色样式
3. **数据样式**：在数据中定义的样式
4. **图的默认样式**：通过图的配置项设置的样式
5. **主题状态样式**：主题中定义的状态样式
6. **图的状态样式**：通过图的配置项设置的状态样式

更多关于自定义主题的内容，请参考[自定义主题](/manual/theme/custom-theme)。
