<iframe src="https://stackblitz.com/edit/g6-in-react?embed=1&file=src/App.tsx&theme=light"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
   ></iframe>

```jsx
import { Graph } from '@antv/g6';
import { useEffect, useRef } from 'react';

export default () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph = new Graph({
      container: containerRef.current!,
      width: 500,
      height: 500,
      data: {
        nodes: [
          {
            id: 'node-1',
            style: { x: 50, y: 100 },
          },
          {
            id: 'node-2',
            style: { x: 150, y: 100 },
          },
        ],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
    });

    graph.render();
  }, []);

  return <div ref={containerRef} />;
};
```
