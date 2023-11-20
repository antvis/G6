---
title: Custom Theme Extension
order: 5
---

G6's theme mechanism provides a complete solution for customizing the theme of a graph.

- **Theme** is responsible for defining the visual style of the graph.
- **ThemeSolver** is a functional component that generates the final theme style specification based on the provided configuration.

## Custom Theme Configuration

G6 allows for extending existing themes or creating entirely new theme configurations. Below are examples of two types of built-in theme solvers and their configuration options:

```javascript
const graph = new G6.Graph({
  theme: {
    type: 'spec', // Specify the theme solver type
    base: 'light', // Use `light` theme as the base
  },
  // ... other configurations
});
```

- **Types**: `SpecThemeCfg | SubjectThemeCfg`

<details>

<summary><span style="color: #873bf4; cursor: pointer">SpecThemeCfg</span></summary>

```typescript
type SpecThemeCfg = { type: 'spec' } & SpecThemeSolverOptions;

/**
 * The type of color palette, which can be an array of hexadecimal color strings or an object with keys as data type names and values as hexadecimal color values.
 */
type Palette = string[] | { [dataType: string]: string };
type ITEM_TYPE = 'node' | 'edge' | 'combo';
type SpecThemeSolverOptions = {
  /**
   * The built-in theme that the custom theme is based on, default is 'light'
   */
  base: 'light' | 'dark';
  specification: {
    [itemType: ITEM_TYPE]: {
      /**
       * The data type field for nodes/edges/combos, for example, if nodes are classified according to the 'cluster' field, you can specify dataTypeField: 'cluster', and subsequently colors will be taken from the palette based on this classification.
       */
      dataTypeField: string;
      /**
       * Color palette
       */
      palette: Palette;
      /**
       * Custom styles for the shapes corresponding to the color palette
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
       * Configuration for canvas background color, if not configured, it will follow the default color of the base.
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
 * The type of color palette, which can be an array of hexadecimal color strings or an object with keys as data type names and values as hexadecimal color values.
 */
type Palette = string[] | { [dataType: string]: string };
type ITEM_TYPE = 'node' | 'edge' | 'combo';
type SubjectThemeSolverOptions = {
  /**
   * The built-in theme that the custom theme is based on, default is 'light'
   */
  base: 'light' | 'dark';
  baseColor: string;
  specification?: {
    [itemType: ITEM_TYPE]: {
      /**
       * The data type field for nodes/edges/combos, for example, if nodes are classified according to the 'cluster' field, you can specify dataTypeField: 'cluster', and subsequently colors will be taken from the palette based on this classification.
       */
      dataTypeField: string;
      /**
       * Color palette
       */
      palette: Palette;
    };
    canvas?: {
      /**
       * Configuration for canvas background color, if not configured, it will follow the default color of the base.
       */
      backgroundColor: string;
      [cssName: string]: unknown;
    };
  };
};
```

</details>

- **Default value**: `object`

<details>

<summary><span style="color: #873bf4; cursor: pointer">object</span></summary>

```json
{
  "type": "spec",
  "base": "light"
}
```

</details>

## Custom Theme Solver

When the built-in theme solvers are not enough to meet your needs, you can create a custom theme solver.

### Creating a Custom Theme Solver

Inherit the abstract base class `BaseThemeSolver` and implement custom logic:

```javascript
class CustomThemeSolver extends BaseThemeSolver {
  public solver(
    options: ThemeSolverOptions,
    themes: ThemeSpecificationMap,
  ): ThemeSpecification {
      // Custom parsing logic...
  }
}
```

### Register and Apply

Register your custom theme solver and use it in your graph instance:

```javascript
const CustomGraph = extend(Graph, {
  themeSolvers: {
    custom: CustomThemeSolver, // Register custom solver
  },
});

const graph = new CustomGraph({
  container: 'mountNode',
  theme: {
    type: 'custom', // Use the custom solver
    // Custom theme configuration...
  },
});
```

- **Type**: `{ type: 'custom' } & ThemeSolverOptions`

## Dynamically Updating Theme

If you need to change the theme after the graph has been initialized, G6 provides the `updateTheme` API to dynamically update the theme.

```typescript
graph.updateTheme({
  type: 'spec',
  base: 'dark', // Switch to dark theme
});
```
