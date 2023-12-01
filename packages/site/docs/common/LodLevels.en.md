### lodLevels

**Type**: `LodLevel[]`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    LodLevel
  </summary>

```ts
type LodLevel = {
  /** The zoom level range defined by this level, when the zoom level of the graph satisfies zoomRange[0] <= zoom < zoomRange[1], it means that it is under this level */
  zoomRange: [number, number];
  /** Is this the primary level */
  primary: boolean;
};
```

</details>

Specifies the zoom level divisions

- The primary level has an ordinal of 0
- `zoomRange` less than the current level, the ordinal decreases
- `zoomRange` greater than the current level, the ordinal increases

> The ordinal is the value corresponding to `lod` in the following graph configuration
