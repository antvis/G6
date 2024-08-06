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

### Canvas Not Updating After Data Update

Ensure that you call `graph.draw()` or `graph.render()` to update the canvas after updating the data.

> G6 merges differences and updates the canvas uniformly after `draw` or `render` for multiple data updates to improve performance.

### How to Resolve Interaction Conflicts

When multiple interactions conflict with each other, you can set the enable timing of interactions to avoid multiple interactions being triggered simultaneously.

Taking `drag-canvas` and `brush-select` as an example, if you directly configure these two interactions, dragging on the canvas will cause interaction exceptions. You can disable the `drag-canvas` interaction when the `shift` key is pressed.

```typescript
behaviors: [
  {
    type: 'drag-canvas',
    enable: (event) => event.shiftKey === false,
  },
  {
    type: 'brush-select',
  },
];
```

At this point, when the `shift` key is pressed, the `drag-canvas` interaction will be disabled, and the `brush-select` interaction will not be affected.

### Difference Between `draw` and `render`

Both `draw` and `render` execute drawing operations, but `render` additionally performs **layout** and **auto fit** operations based on `draw`.

You can simply understand it as: `render` = `draw` + `layout` + `fitView`/`fitCenter`.
