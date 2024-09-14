<iframe src="https://codesandbox.io/embed/gpcc43?view=split&module=%2Fsrc%2FApp.tsx&hidenavigation=1&theme=light"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="G6 React"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
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
