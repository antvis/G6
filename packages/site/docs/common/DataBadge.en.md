<details>
  <summary style="color: #873bf4; cursor: pointer;">
    Badges
  </summary>

```ts
type Badge = {
  position: BadgePosition;
  type: 'text' | 'icon';
  img?: string; // required when type is 'text'
  text?: string; // required when type is 'icon'
};
```

<embed src="./DataBadgePosition.zh.md"></embed>

</details>
