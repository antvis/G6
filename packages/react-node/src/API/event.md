# 事件（Event）属性

每一个形状都会有单独的事件响应，他们之间不存在冒泡触发逻辑；

```typescript
type ShapeEventListner = (
  event: IG6GraphEvent,
  node: INode | null,
  shape: IShape,
  graph: Graph,
) => void;
```

<API src="./Event.tsx" ></API>
