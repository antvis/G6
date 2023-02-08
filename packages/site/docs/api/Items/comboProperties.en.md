---
title: Combo Model Properties
order: 8
---

Except for the common properties, there are special configurations for each type of built-in Combos. The `style`s of them depend on their keyShape. The common properties for built-in Combos can be refered to:

### id

<description> _String_ **required** </description>

The id of the Combo, **Must be a unique string**.

### parentId

<description> _String_ **optional** </description>

The ID of the parent Combo

### size

<description> _Number | Array_ **optional** </description>

The minimum size of the combo. The default value for 'circle' type Combo is 20, [20, 5] for 'rect' type.

### padding

<description> _Number | Number[]_ **optional** </description>

The padding of the Combo. The default value for 'circle' type Combo is 25, [25, 20, 15, 20] for 'rect'.

### style

<description> _Object_ **optional** </description>

The Combo style. `style` is an object to configure the filling color, stroke color, shadow, and so on. The complete configurations are listed in [Overview of Combos -- style](/en/docs/manual/middle/elements/combos/default-combo#style)。

### label

<description> _String_ **optional** </description>

The label text of the combo.

### labelCfg

<description> _Object_ **optional** </description>

The configurations of the combo. Please refer to [Overview of Combos -- label and label configure](/en/docs/manual/middle/elements/combos/default-combo#label-and-labelcfg) for detailed configurations.

### type

<description> _Object_ **optional** </description>

The shape type of the Combo. It can be the type of built-in Combo, or the custom Combo. 'circle' by default. The table below shows the built-in Combos and their special properties:

| Name | Description | Default |
| --- | --- | --- |
| circle | Circle Combo: <br />- `size` is a number representing the diameter<br />- The circle is centered at the combo position<br />- `color` takes effect on the stroke<br />- The label is placed on the top of the circle by default<br />- More properties are described in [circle](/en/docs/manual/middle/elements/combos/built-in/circle)<br />- <a href='/en/examples/item/defaultCombos#circle' target='_blank'>Demo</a> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ijeuQoiH0JUAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |
| rect | Rect Combo: <br />- `size` is an array, e.g. [100, 50]<br />- The rect in centered at the combo position<br />- `color` takes effect on the stroke<br />- The label is placed on the left top of the circle by default<br />- More properties are described in [rect](/en/docs/manual/middle/elements/combos/built-in/rect)<br />- <a href='/en/examples/item/defaultCombos#rect' target='_blank'>Demo</a> | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Khp4QpxXVlQAAAAAAAAAAABkARQnAQ' width=150 alt='img'/> |

## Properties for Specific Built-in Combos

The special properties for each built-in Combos can be found in the subdocuments of [Built-in Combos](/en/docs/manual/middle/elements/combos/default-combo).
