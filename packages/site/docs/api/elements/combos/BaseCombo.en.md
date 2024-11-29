---
title: BaseCombo
---

<embed src="@/common/api/elements/combos/base-combo.md"></embed>

### childrenData

> _NodeData \| ComboData_<!-- -->_[]_

The data of the children of combo

<en/> If the combo is collapsed, children may be empty, and the complete child element data can be obtained through childrenData

### childrenNode

> _string_<!-- -->_[]_

The children of combo, which can be nodes or combos

### collapsedMarker

> _boolean_

Whether to show the marker when the combo is collapsed

### collapsedSize

> _number \| [number, number] \| Float32Array \| [number, number, number]_

The default size of combo when collapsed

### padding

> _number \| number[]_

The padding of combo, only effective when expanded

### size

> _number \| [number, number] \| Float32Array \| [number, number, number]_

The default size of combo when expanded

## Collapsed Style

### collapsed{[BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#%E7%BB%98%E5%9B%BE%E5%B1%9E%E6%80%A7)}

<details><summary>An expression like icon{TextStyleProps} indicates that properties of the TextStyleProps type are prefixed with icon in camelCase format.</summary>

TextStyleProps includes the following properties:

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} means you need to use the following property names:

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>

## Collapsed Marker Style

### collapsedMarker{[BaseStyleProps](https://g.antv.antgroup.com/api/basic/display-object#%E7%BB%98%E5%9B%BE%E5%B1%9E%E6%80%A7)}

<details><summary>An expression like icon{TextStyleProps} indicates that properties of the TextStyleProps type are prefixed with icon in camelCase format.</summary>

TextStyleProps includes the following properties:

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} means you need to use the following property names:

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>

### collapsedMarker{[TextStyleProps](https://g.antv.antgroup.com/api/basic/text)}

<details><summary>An expression like icon{TextStyleProps} indicates that properties of the TextStyleProps type are prefixed with icon in camelCase format.</summary>

TextStyleProps includes the following properties:

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} means you need to use the following property names:

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>

### collapsedMarker{[ImageStyleProps](https://g.antv.antgroup.com/api/basic/image)}

> Excludes z

<details><summary>An expression like icon{TextStyleProps} indicates that properties of the TextStyleProps type are prefixed with icon in camelCase format.</summary>

TextStyleProps includes the following properties:

- fill
- fontSize
- fontWeight
- ...

icon{TextStyleProps} means you need to use the following property names:

- iconFill
- iconFontSize
- iconFontWeight
- ...

</details>

### collapsedMarkerType

> _'child-count' \| 'descendant-count' \| 'node-count' \| ((children:_ _NodeData \| ComboData_<!-- -->_[]) =&gt; string)_

The type of marker displayed when the combo is collapsed

- `'child-count'`<!-- -->: Number of child elements (including Nodes and Combos)

- `'descendant-count'`<!-- -->: Number of descendant elements (including Nodes and Combos)

- `'node-count'`<!-- -->: Number of descendant elements (only Nodes)

- `(children: NodeLikeData[]) => string`<!-- -->: Custom processing logic
