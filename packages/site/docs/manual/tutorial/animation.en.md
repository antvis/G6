---
title: Animation*
order: 6
---

[Animation Configuration DEMO](https://g6-next.antv.antgroup.com/examples/scatter/changePosition/#itemAnimates)

G6 5.0 provides a standardized way to describe animations. You can configure animations for different elements in different scenarios when instantiating the graph. You can specify the `animates` field in the `node` / `edge` / `combo` field of the graph configuration mentioned above:

```typescript
const graph = new Graph({
  node: {
    animates: {
      buildIn: [...],
      buildOut: [...],
      update: [...],
      show: [...],
      hide: [...],
    }
  }
})
```

Or use the functional mapping method for `node` / `edge` / `combo`:

```typescript
const graph = new Graph({
  node: model => {
    const { id, data } = model
    return {
      id,
      data: {
        ...data,
        // ...Other style configurations
        animates: {
          buildIn: [...],
          buildOut: [...],
          update: [...],
          show: [...],
          hide: [...],
        }
      }
    }
  }
})
```

We have standardized the animation into five scenarios that occur at different times for different shapes: buildIn, buildOut, update (data/state update), show (appearance, relative to hide), and hide (hide). For each scenario, you can specify different animations for different shapes and fields, and you can also specify the animation configuration and execution order. For example, the following code specifies various animations for different shapes during updates:

```typescript
update: [
  {
    // Animate the entire node (shapeId: 'group') when x and y change
    fields: ['x', 'y'],
    shapeId: 'group',
    duration: 500,
  },
  {
    // Animate the opacity of haloShape when the selected or active state changes
    fields: ['opacity'],
    shapeId: 'haloShape',
    states: ['selected', 'active'],
    duration: 500,
  },
  // Animate the fill and r of the keyShape in the order specified by the 'order' field, achieving sequential animation effects
  {
    fields: ['fill'],
    shapeId: 'keyShape',
    order: 0,
  },
  {
    fields: ['r'],
    shapeId: 'keyShape',
    order: 1,
  },
];
```
