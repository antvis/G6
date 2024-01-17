---
title: 自定义主题
order: 5
---

G6 允许扩展已有的主题。

- **主题（Theme）** 负责定义图的视觉样式。
- **主题处理器（ThemeSolver）** 则是一个功能组件，负责根据提供的配置生成最终的主题样式规格。

以下是两种内置的主题处理器类型及其配置选项示例：

| 特征           | SpecThemeSolver（规范主题处理器）                      | SubjectThemeSolver（主题主题处理器）           |
| -------------- | ------------------------------------------------------ | ---------------------------------------------- |
| **定制层级**   | 细粒度，针对具体组件（如节点、边）                     | 粗粒度，整体图表主题                           |
| **色板应用**   | 根据数据类型动态应用色板和样式                         | 应用基础颜色及简化的色板配置                   |
| **样式定义**   | 详细定义每种数据类型的视觉样式                         | 统一定义整体主题的视觉样式                     |
| **适用场景**   | 数据驱动的样式定制，适合复杂和具体的视觉需求           | 主题风格一致性，适合简单的视觉需求             |
| **区别**       | 提供详尽的自定义能力，针对数据不同细分有不同的视觉展示 | 提供宏观的主题调整能力，着重于整体外观而非细节 |
| **配置项类型** | `SpecThemeCfg`                                         | `SubjectThemeCfg`                              |

<details>

<summary style="color: #873bf4; cursor: pointer">SpecThemeCfg</summary>

```typescript
type SpecThemeCfg = { type: 'spec' } & SpecThemeSolverOptions;

/**
 * 色板的类型，可以是十六进制颜色字符串数组，也可以是对象形式 key 为数据类型名，value 为十六进制颜色值
 */
type Palette = string[] | { [dataType: string]: string };
type ITEM_TYPE = 'node' | 'edge' | 'combo';
type SpecThemeSolverOptions = {
  /**
   * 自定义主题基于的内置主题，默认为 'light'
   */
  base: 'light' | 'dark';
  specification: {
    [itemType: ITEM_TYPE]: {
      /**
       * 节点/边/ combo 的数据类型字段，例如节点根据 'cluster' 字段分类，则可指定 dataTypeField: 'cluster'，后续将根据此分类从色板中取色
       */
      dataTypeField: string;
      /**
       * 色板
       */
      palette: Palette;
      /**
       * 自定义色板对应图形的样式
       */
      getStyleSets: (palette: Palette) => {
        default: {
          [shapeId: string]: ShapeStyle;
        };
        [stateName: string]: {
          [shapeId: string]: ShapeStyle;
        };
      };
    };
    canvas?: {
      /**
       *  画布背景色的配置，不配置则跟随 base 的默认色
       */
      backgroundColor: string;
      [cssName: string]: unknown;
    };
  };
};
```

</details>

<details>

<summary style="color: #873bf4; cursor: pointer">SubjectThemeCfg</summary>

```typescript
type SubjectThemeCfg = { type: 'subject' } & SubjectThemeSolverOptions;

/**
 * 色板的类型，可以是十六进制颜色字符串数组，也可以是对象形式 key 为数据类型名，value 为十六进制颜色值
 */
type Palette = string[] | { [dataType: string]: string };
type ITEM_TYPE = 'node' | 'edge' | 'combo';
type SubjectThemeSolverOptions = {
  /**
   * 自定义主题基于的内置主题，默认为 'light'
   */
  base: 'light' | 'dark';
  baseColor: string;
  specification?: {
    [itemType: ITEM_TYPE]: {
      /**
       * 节点/边/ combo 的数据类型字段，例如节点根据 'cluster' 字段分类，则可指定 dataTypeField: 'cluster'，后续将根据此分类从色板中取色
       */
      dataTypeField: string;
      /**
       * 色板
       */
      palette: Palette;
    };
    canvas?: {
      /**
       * 画布背景色的配置，不配置则跟随 base 的默认色
       */
      backgroundColor: string;
      [cssName: string]: unknown;
    };
  };
};
```

</details>

## 示例

这里以实现一个简单的主题为例，主题基调为蓝色。

```javascript
import { Graph } from '@antv/g6';

const graph = new Graph({
  theme: {
    type: 'spec',
    base: 'light',
    specification: {
      canvas: {
        backgroundColor: '#f3faff',
      },
      node: {
        dataTypeField: 'cluster',
        palette: ['#bae0ff', '#91caff', '#69b1ff', '#4096ff', '#1677ff', '#0958d9', '#003eb3', '#002c8c', '#001d66'],
      },
    },
  },
});
```
