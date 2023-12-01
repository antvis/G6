### anchorShapes

**Type**: `AnchorShapes`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    AnchorShapes
  </summary>

```ts
type AnchorShapes = CircleStyleProps & {
  // Individual anchor shape configurations, with higher priority than the outer CircleStyleProps.
  [key: number]: CircleStyleProps & {
    // The position of the anchor shape, can be configured as a string or a number array representing the percentage position relative to the bounding box of the key shape (keyShape). For example, [0.5, 1] means it is located at the right center of the key shape.
    position?: 'top' | 'left' | 'bottom' | 'right' | [number, number];
  };
};
```

</details>

- [CircleStyleProps](/en/apis/shape/circle-style-props)

The shape of connecting ports
