---
title: Custom Theme Extension
order: 5
---

G6 allows extension of existing themes.

- **Theme** is responsible for defining the visual style of the diagram.
- **Theme Processor (ThemeSolver)** is a functional component responsible for generating the final theme style specifications based on the provided configuration.

The following are examples of the two built-in topic processor types and their configuration options:

| Features                    | SpecThemeSolver (Specification Theme Processor)                                                          | SubjectThemeSolver (Subject Theme Processor)                                                         |
| --------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Customization level**     | Fine-grained, for specific components (such as nodes, edges)                                             | Coarse-grained, overall chart theme                                                                  |
| **Swatch Application**      | Dynamically apply color swatches and styles based on data type                                           | Apply basic colors and simplified swatch configurations                                              |
| **Style Definition**        | Define the visual style of each data type in detail                                                      | Unify the visual style of the overall theme                                                          |
| **Applicable scenarios**    | Data-driven style customization, suitable for complex and specific visual needs                          | Theme style consistency, suitable for simple visual needs                                            |
| **Difference**              | Provides detailed customization capabilities, with different visual displays for different data segments | Provides macro theme adjustment capabilities, focusing on the overall appearance rather than details |
| **Configuration item type** | `SpecThemeCfg`                                                                                           | `SubjectThemeCfg`                                                                                    |

<details>

<summary><span style="color: #873bf4; cursor: pointer">SpecThemeCfg</span></summary>

```typescript
type SpecThemeCfg = { type: 'spec' } & SpecThemeSolverOptions;

/**
 * The type of color palette can be a hexadecimal color string array or an object. The key is the data type name, and the value is the hexadecimal color value.
 */
type Palette = string[] | { [dataType: string]: string };
type ITEM_TYPE = 'node' | 'edge' | 'combo';
type SpecThemeSolverOptions = {
  /**
   * The built-in theme that the custom theme is based on, defaults to 'light'
   */
  base: 'light' | 'dark';
  specification: {
    [itemType: ITEM_TYPE]: {
      /**
       * The data type field of node/edge/combo. For example, if the node is classified according to the 'cluster' field, you can specify dataTypeField: 'cluster', and then the color will be selected from the color palette based on this classification.
       */
      dataTypeField: string;
      /**
       * Swatches
       */
      palette: Palette;
      /**
       * Customize the style of the graphics corresponding to the color palette
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
       * Configuration of the canvas background color. If not configured, it will follow the default color of base.
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
 * The type of color palette can be a hexadecimal color string array or an object. The key is the data type name, and the value is the hexadecimal color value.
 */
type Palette = string[] | { [dataType: string]: string };
type ITEM_TYPE = 'node' | 'edge' | 'combo';
type SubjectThemeSolverOptions = {
  /**
   * The built-in theme that the custom theme is based on, defaults to 'light'
   */
  base: 'light' | 'dark';
  baseColor: string;
  specification?: {
    [itemType: ITEM_TYPE]: {
      /**
       * The data type field of node/edge/combo. For example, if the node is classified according to the 'cluster' field, you can specify dataTypeField: 'cluster', and then the color will be selected from the color palette based on this classification.
       */
      dataTypeField: string;
      /**
       * Swatches
       */
      palette: Palette;
    };
    canvas?: {
      /**
       * Configuration of the canvas background color. If not configured, it will follow the default color of base.
       */
      backgroundColor: string;
      [cssName: string]: unknown;
    };
  };
};
```

</details>

## Example

Here we take the implementation of a simple theme as an example, and the theme tone is blue.

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
