# Event Props

Every Shape has a event to respond to it, which will not cause propagation.

```typescript
type ShapeEventListner = (
  event: IG6GraphEvent,
  node: INode | null,
  shape: IShape,
  graph: Graph,
) => void;
```

<API src="./Event.tsx" ></API>
