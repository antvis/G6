### icon

**类型**：`Icon`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    Icon
  </summary>

```ts
type Icon = {
  type: 'text' | 'icon';
  img?: string; // type 为 'text' 时需要提供
  text?: string; // type 为 'icon' 时需要提供
};
```

</details>

图标配置

> 更多的样式配置应当在 Graph 实例的 mapper 中配置 iconShape 的图形样式。
