---
title: Theme
order: 9
---

### Graph.getTheme()

Get theme

```typescript
getTheme(): ThemeOptions;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** false \| 'light' \| 'dark' \| string

- **Description:** 当前主题

</details>

### Graph.setTheme(theme)

Set theme

```typescript
setTheme(theme: ThemeOptions | ((prev: ThemeOptions) => ThemeOptions)): void;
```

**Example**

```ts
graph.setTheme('dark');
```

<details><summary>View Parameters</summary>

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

false \| 'light' \| 'dark' \| string \| ((prev: false \| 'light' \| 'dark' \| string) =&gt; false \| 'light' \| 'dark' \| string)

</td><td>

主题名

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
