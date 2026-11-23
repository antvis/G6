---
title: 在 React 中使用
order: 0
---

:::info{title=建议}
如果你需要更完善的 React 与 G6 集成解决方案，可以使用 AntV 官方封装库 [`@antv/graphin`](https://github.com/antvis/graphin)。
:::

## 非严格模式

参考下面的示例，你可以在 React 中使用 G6，也可以查看 [在线示例](https://stackblitz.com/edit/g6-in-react?file=src/App.tsx) 。

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

## 严格模式

在严格模式下，React 会在开发环境中有意执行挂载、卸载、再挂载。请把 Graph 实例放在 effect 里创建，用 ref 保存，并在清理函数中销毁，这样第一次开发态挂载不会留下旧实例。下面的完整示例同时演示了如何注册和渲染 React 节点。

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
