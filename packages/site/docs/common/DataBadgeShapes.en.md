### badgeShapes

**Type**: `BadgeShapes`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    BadgeShapes
  </summary>

```ts
type BadgeShapes = {
  /** The background color of the badge */
  color?: string;
  /** The background color of the badge, which takes effect when color is not set */
  palette?: string[];
  /** The text color of the badge */
  textColor?: string;
  /** The style configuration of a single badge, which has a higher priority than the above configuration */
  [key: number]: ShapeStyle & {
    /** The position of this badge */
    position?: IBadgePosition;
    /** The background color of this badge */
    color?: string;
    /** The text color of this badge */
    textColor?: string;
  };
};
```

<embed src="./DataBadgePosition.en.md"></embed>

</details>

The badges in the four corners, the badgeShapes configuration is multiple badges.
