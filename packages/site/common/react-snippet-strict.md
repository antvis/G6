```tsx
import { ExtensionCategory, Graph as G6Graph, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { useEffect, useRef } from 'react';

register(ExtensionCategory.NODE, 'react-node', ReactNode);

const SelectableNode = (props: { id: string; selected: boolean; graph: G6Graph }) => {
  const { id, selected, graph } = props;

  const handleClick = () => {
    graph.updateNodeData([{ id, data: { selected: !selected } }]);
    graph.draw();
  };

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
      onClick={handleClick}
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
          component: (data) => <SelectableNode id={data.id} selected={Boolean(data.data?.selected)} graph={graph} />,
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
