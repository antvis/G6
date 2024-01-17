---
title: Circle Combo
order: 1
---

This article demonstrates the configuration options for Circle Combo. [Circle Combo DEMO](/en/examples/item/defaultCombos/#circle).

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Kbk1S5pzSY0AAAAAAAAAAAAADmJ7AQ/original" width=300 />

## keyShape

**Type**: `KeyShapeStyle`

<details>

<summary style="color: #873bf4; cursor: pointer">KeyShapeStyle</summary>

```typescript
type KeyShapeStyle = StyleProps & {
  /** Radius of the circle */
  r: number;
};
```

The related circle style can be referred to in [`CircleStyleProps`](../shape/CircleStyleProps.en.md).

</details>

**Default**:`object`

<details>

<summary style="color: #873bf4; cursor: pointer">object</summary>

```json
{
  "r": 16
}
```

</details>

<embed src="../../../common/ComboShapeStyles.en.md"></embed>
