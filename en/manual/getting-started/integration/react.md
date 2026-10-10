---
title: "react"
description: "react"
language: "en"
canonical: "https://g6.antv.antgroup.com/en/manual/getting-started/integration/react/"
version: "5.1.1"
---

## Non-Strict Mode

Refer to the example below, you can use G6 in React, and you can also view the [Live Example](https://stackblitz.com/edit/g6-in-react?file=src/App.tsx) 。

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

## Strict Mode

In strict mode, React intentionally mounts, unmounts, and remounts components in development. Create the Graph instance inside an effect, keep it in a ref, and destroy it in the cleanup callback so the first development-only mount does not leave a stale graph behind. The following complete example also shows how to register and render a React node.

```tsx
import { ExtensionCategory, Graph as G6Graph, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { useEffect, useRef } from 'react';

register(ExtensionCategory.NODE, 'react-node', ReactNode);

const SelectableNode = (props: { selected: boolean; onToggle: () => void }) => {
  const { selected, onToggle } = props;

  return (
    <button
      style={{
        width: 160,
        padding: 12,
        border: `2px solid ${selected ? '#fa8c16' : '#d9d9d9'}`,
        borderRadius: 8,
        background: '#fff',
        cursor: 'pointer',
      }}
      onClick={onToggle}
    >
      {selected ? 'Selected' : 'Click to select'}
    </button>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<G6Graph | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleToggle = (id: string, selected: boolean) => {
      const graph = graphRef.current;
      if (!graph) return;

      graph.updateNodeData([{ id, data: { selected: !selected } }]);
      graph.draw();
    };

    const graph = new G6Graph({
      container: containerRef.current,
      width: 500,
      height: 300,
      data: {
        nodes: [{ id: 'node-1', style: { x: 250, y: 150 }, data: { selected: false } }],
      },
      node: {
        type: 'react-node',
        style: {
          size: [160, 50],
          component: (data) => (
            <SelectableNode
              selected={Boolean(data.data?.selected)}
              onToggle={() => handleToggle(data.id, Boolean(data.data?.selected))}
            />
          ),
        },
      },
    });

    graphRef.current = graph;
    graph.render();

    return () => {
      graph.destroy();
      graphRef.current = null;
    };
  }, []);

  return <div ref={containerRef} />;
}
```
