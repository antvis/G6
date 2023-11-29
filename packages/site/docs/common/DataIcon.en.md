### icon

**Type**: `Icon`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    Icon
  </summary>

```ts
type Icon = {
  type: 'text' | 'icon';
  img?: string; // Required when type is 'text'
  text?: string; // Required when type is 'icon'
};
```

</details>

The configuration of the icon

> More style configurations should be configured in the Combo mapper of the graph instance, including the shape style of the iconShape
