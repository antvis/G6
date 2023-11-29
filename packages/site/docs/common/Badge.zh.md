<details>
  <summary style="color: #873bf4; cursor: pointer;">
    Badges
  </summary>

```ts
type Badge = {
  position: BadgePosition;
  type: 'text' | 'icon';
  img?: string; // type 为 'text' 时需要提供
  text?: string; // type 为 'icon' 时需要提供
};
```

<embed src="./BadgePosition.zh.md"></embed>

</details>