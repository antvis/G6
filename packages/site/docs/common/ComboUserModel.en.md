### type

**Type**: `string`

The rendering type of the combo, which can be a combo type registered on the graph class. The built-in and default registered types are `'circle-combo'` and `'rect-combo'`. The default is `'circle-combo'`.

### visible

**Type**: `boolean`

Whether the combo is displayed by default.

### color

**Type**: `string`

The theme color of the key shape (`keyShape`) of the combo, with a value in hexadecimal string format. Provided for simple configuration. More style configurations should be configured in the Combo mapper of the graph instance, including keyShape and various shape styles.

### label

**Type**: `string`

The text content of the `labelShape` of the combo. More style configurations should be configured in the Combo mapper of the graph instance, including the `text` value of `labelShape` or other shape styles.

<embed src="./DataIcon.en.md"></embed>

### parentId

**Type**: `string | number`

The ID of the parent combo to which the combo belongs. `undefined` means it is a root.
