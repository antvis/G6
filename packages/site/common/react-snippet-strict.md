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
