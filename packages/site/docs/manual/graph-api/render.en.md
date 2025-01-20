---
title: Render
order: 3
---

### Graph.draw()

Draw elements

```typescript
draw(): Promise<void>;
```

Only execute element drawing, no re-layout

⚠️ draw is an asynchronous method. If you need to perform some operations after draw, you can use `await graph.draw()` or listen to the GraphEvent.AFTER_DRAW event

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** Promise&lt;void&gt;

- **Description:** 渲染结果

</details>

### Graph.render()

Render

```typescript
render(): Promise<void>;
```

This process will execute data update, element rendering, and layout execution

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>
