---
title: FAQ
order: 6
---

### What is the Difference Between Extension and Plugin?

`Extension` is a concept in G6 that collectively refers to all types of registrable content, including elements, behaviors, layouts, and plugins, among others.

`Plugin` represents a flexible extension mechanism provided by G6 and is a special type of `Extension`.

### Set Text Overflow Ellipsis

Taking `label` as an example, you can set `labelWordWrap` and `labelWordWrapWidth` to achieve text overflow ellipsis.

```typescript
{
  labelText: 'This is a long text',
  labelWordWrap: true,
  labelWordWrapWidth: 50,
}
```

### Key Press Not Working

Some plugins or behaviors support configuring key press triggers. Please use standard key names, such as `Control`, `Shift`, `Alt`, `Meta`, as well as letters, numbers, symbols, and so on.
