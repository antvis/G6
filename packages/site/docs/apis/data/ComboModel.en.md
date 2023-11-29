---
title: ComboModel
order: 8
---

ComboModel is the combo data that is internally circulated, which is calculated from `ComboUserModel` through transformations on the graph instance. The data you consume anywhere later is based on this data. Each item in Combo inherits from [ComboUserModel](./ComboUserModel.en.md) and is defined as follows after extension:

```typescript
interface ComboModel {
  id: string | number;
  data: ComboModelData; // = ComboModelData
}
```

## id <Badge type="error">Required</Badge>

The unique ID of the combo. After the combo is created, the ID cannot be modified.

**Type**: `string | number`

## data <Badge type="error">Required</Badge>

The data in InnerModelData has been generated from UserModelData through a series of transform functions on the graph instance. The business data may have been transformed, filtered, and merged.

<embed src="../../common/DataAttrTips.en.md"></embed>

### type

The rendering type of the combo, which can be a combo type registered on the graph class. The built-in and default registered types are `'circle-combo'` and `'rect-combo'`. The default is `'circle-combo'`.

**Type**: `string`

### visible

Whether the combo is displayed by default.

**Type**: `boolean`

### color

The theme color of the key shape (`keyShape`) of the combo, with a value in hexadecimal string format. Provided for simple configuration. More style configurations should be configured in the Combo mapper of the graph instance, including keyShape and various shape styles.

**Type**: `string`

### label

The text content of the `labelShape` of the combo. Provided for simple configuration. More style configurations should be configured in the Combo mapper of the graph instance, including the `text` value of `labelShape` or other shape styles.

**Type**: `string`

<embed src="../../common/DataIcon.en.md"></embed>

### parentId

The ID of the parent combo to which the combo belongs. `undefined` means it is a root.

**Type**: `string | number`
