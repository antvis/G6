---
title: Theme
order: 9
---

## Overview of Theme

G6 allows users to customize the appearance of graphs through themes. Themes can be used to define colors, shapes, and styles for nodes, edges, and other graph elements.

## API Reference

### Graph.getTheme()

Get the theme

```typescript
getTheme(): ThemeOptions;
```

<details><summary>Related Parameters</summary>

**Return Value**:

- **Type:** false \| 'light' \| 'dark' \| string

- **Description:** Current theme

</details>

### Graph.setTheme(theme)

Set the theme

```typescript
setTheme(theme: ThemeOptions | ((prev: ThemeOptions) => ThemeOptions)): void;
```

**Example**

```ts
graph.setTheme('dark');
```

<details><summary>Related Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

theme

</td><td>

false \| 'light' \| 'dark' \| string \| ((prev: false \| 'light' \| 'dark' \| string) => false \| 'light' \| 'dark' \| string)

</td><td>

Theme name

</td></tr>
</tbody></table>

**Return Value**:

- **Type:** void

</details>

## Type Definitions

### ThemeOptions

```typescript
type ThemeOptions = {
  // Colors used in the theme
  colors: string[];

  // Node style settings
  nodeStyle?: {
    fill: string;
    stroke: string;
  };

  // Edge style settings
  edgeStyle?: {
    stroke: string;
  };

  // Additional configuration options for the theme
  [configKey: string]: any;
};
```
