---
title: 自定义主题
order: 5
---

G6 的主题机制提供了一套完整的解决方案来定制图的主题。

- **主题（Theme）** 负责定义图的视觉样式。
- **主题处理器（ThemeSolver）** 则是一个功能组件，负责根据提供的配置生成最终的主题样式规格。

## 自定义主题配置

G6 允许扩展已有的主题或创建全新的主题配置。以下是两种内置的主题处理器类型及其配置选项示例：

```javascript
const graph = new G6.Graph({
  theme: {
    type: 'spec', // 指定主题处理器类型
    base: 'light', // 使用 `light` 主题作为基础
  },
  // ... 其他配置
});
```

- **类型**：`SpecThemeCfg | SubjectThemeCfg`

<details>

<summary><span style="color: #873bf4; cursor: pointer">SpecThemeCfg</span></summary>

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

<summary><span style="color: #873bf4; cursor: pointer">SubjectThemeCfg</span></summary>

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

- **默认值**：`object`

<details>

<summary><span style="color: #873bf4; cursor: pointer">object</span></summary>

```json
{
  "type": "spec",
  "base": "light"
}
```

</details>

## 自定义主题处理器

当内置的主题处理器不足以满足需求时，您可以创建自定义的主题处理器。

### 创建自定义主题处理器

继承抽象基类 `BaseThemeSolver`并实现自定义逻辑：

```javascript
class CustomThemeSolver extends BaseThemeSolver {
  public solver(
    options: ThemeSolverOptions,
    themes: ThemeSpecificationMap,
  ): ThemeSpecification {
      // 自定义解析逻辑...
  }
}
```

### 注册并应用

注册您的自定义主题处理器，并在图实例中使用它：

```javascript
const CustomGraph = extend(Graph, {
  themeSolvers: {
    custom: CustomThemeSolver, // 注册自定义处理器
  },
});

const graph = new CustomGraph({
  container: 'mountNode',
  theme: {
    type: 'custom', // 使用自定义处理器
    // 自定义主题配置...
  },
});
```

- **类型**：`{ type: 'custom' } & ThemeSolverOptions`

## 动态更新主题

如果在图表初始化后需要更改主题，G6 提供了 `updateTheme` API 来动态更新主题。

```typescript
graph.updateTheme({
  type: 'spec',
  base: 'dark', // 切换到 dark 主题
});
```
