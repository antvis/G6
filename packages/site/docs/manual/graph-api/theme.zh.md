---
title: 主题
order: 9
---

## API 参考

### Graph.getTheme()

获取主题

```typescript
getTheme(): ThemeOptions;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** false \| 'light' \| 'dark' \| string

- **描述：** 当前主题

</details>

### Graph.setTheme(theme)

设置主题

```typescript
setTheme(theme: ThemeOptions | ((prev: ThemeOptions) => ThemeOptions)): void;
```

**示例**

```ts
graph.setTheme('dark');
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

theme

</td><td>

false \| 'light' \| 'dark' \| string \| ((prev: false \| 'light' \| 'dark' \| string) =&gt; false \| 'light' \| 'dark' \| string)

</td><td>

主题名

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>
