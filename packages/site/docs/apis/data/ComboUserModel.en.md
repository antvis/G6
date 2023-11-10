---
title: ComboUserModel
order: 5
---

Data Type Definitions for Each Combo model is:

```typescript
interface ComboUserModel {
  id: string | number;
  data: NodeUserModelData;
}
```

## id

- **Required**: True;
- **Type**: `string|number`;

The unique ID of the combo. Once the combo is created, the ID cannot be changed.

## data

- **Required**: True;
- **Type**: [`ComboUserModelData`](#combousermodeldatatype);

The data of the combo, excluding the ID. It is recommended to store business data. If data conversion is needed, it can be done through the transform function configured in the Graph instance, see [Specification.transforms](../graph/Specification.en.md#transforms). The converted data becomes the internal data that circulates within the graph. All subsequent accesses will be based on this internal data. For rendering-related data, it can be mapped using the combo mapper of the Graph instance, see [Specification.combo](../graph/Specification.en.md#combo). The input of this mapper is the internal data, and the generated display data is only consumed by the renderer. Users will not obtain it anywhere.

### ComboUserModelData.type

- Required: False;
- Type: `string`;

Type: string The rendering type of the Combo, which can be a Combo type that has been registered with the graph class. Built-in and default registered types include `'circle-combo'`, `'rect-combo'`.

### ComboUserModelData.visible

- Required: False;
- Type: `boolean`;

Whether the Combo is displayed by default.

### ComboUserModelData.color

- Required: Fal se;
- Type: `string`;

The theme color of the main graphic (keyShape) of the Combo, represented as a hexadecimal string. This is provided for simple configuration convenience. More style configurations should be made in the Combo mapper of the Graph instance, where keyShape and various graphics styles can be configured.

### ComboUserModelData.label

- Required: False;
- Type: `string`;

The text content of the Combo labelShape. This is provided for simple configuration convenience. More style configurations should be made in the Combo mapper of the Graph instance, where the text value or other graphic styles of the labelShape can be configured.

### ComboUserModelData.icon

- Required: False;
- Type:

```typescript
{
  type: 'text' | 'icon',
  img?: string, // Required when type is 'text'
  text?: string, // Required when type is 'icon'
}
```

The icon configuration on the Combo. Built-in Combo icons are drawn after the text. This is provided for simple configuration convenience. More style configurations should be made in the iconShape graphic style of the Combo mapper of the Graph instance.

### ComboUserModelData.parentId

- Required: False;
- Type: `string | number`;

Represents the id of the parent Combo that the Combo belongs to on a graph with Combos.
