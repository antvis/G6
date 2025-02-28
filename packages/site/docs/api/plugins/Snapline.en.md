---
title: Snapline
---

## Options

### <Badge type="success">Required</Badge> type

> _string_

Plugin type

### autoSnap

> _boolean_ **Default:** `true`

Whether to enable automatic adsorption

### filter

> _(node: Node) => boolean_ **Default:** ``

Filter, used to filter nodes that do not need to be used as references

### horizontalLineStyle

> _BaseStyleProps_ **Default:** ``

Horizontal snapline style

### offset

> _number_ **Default:** `20`

The extension distance of the snapline. The value range is [0, Infinity]

### shape

> _string \| ((node: Node) => DisplayObject)_ **Default:** ``

Specifies which shape on the element to use as the reference shape

- `'key'` uses the key shape of the element as the reference shape - You can also pass in a function that receives the element and returns a shape

### tolerance

> _number_ **Default:** `5`

The alignment accuracy, that is, when the distance between the moved node and the target position is less than tolerance, the alignment line is displayed

### verticalLineStyle

> _BaseStyleProps_ **Default:** ``

Vertical snapline style

## API

### Snapline.destroy()

```typescript
destroy(): void;
```
