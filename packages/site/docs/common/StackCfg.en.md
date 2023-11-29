<details>
  <summary style="color: #873bf4; cursor: pointer;">
    StackCfg
  </summary>

```ts
type StackCfg = {
  /** The maximum number of steps allowed in the history stack. */
  stackSize?: number;
  /** Whether to allow pushing actions to the history stack by default. */
  stackActive?: boolean;
  /** API names to be excluded from being pushed to the history stack. This configuration takes the highest priority. */
  excludes?: string[];
  /** API names to be included in the history stack. This configuration takes the highest priority. */
  includes?: string[];
  /** Whether to ignore all add data operations. */
  ignoreAdd?: boolean;
  /** Whether to ignore all remove data operations. */
  ignoreRemove?: boolean;
  /** Whether to ignore all update data operations. */
  ignoreUpdate?: boolean;
  /** Whether to ignore all element state change operations. */
  ignoreStateChange?: boolean;
  /** Whether to ignore all layer change operations. */
  ignoreLayerChange?: boolean;
  /** Whether to ignore all display change operations. */
  ignoreDisplayChange?: boolean;
};
```

</details>
