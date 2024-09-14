import { Graph } from '../graph';

export const G6Graph = () => {
  return (
    <Graph
      options={{
        data: {
          nodes: [
            { id: 'node-1', style: { x: 100, y: 100, labelText: 'Hello' } },
            { id: 'node-2', style: { x: 300, y: 100, labelText: 'World' } },
          ],
          edges: [{ source: 'node-1', target: 'node-2' }],
        },
        behaviors: ['drag-element'],
      }}
      onRender={() => {
        console.log('render');
      }}
      onDestroy={() => {
        console.log('destroy');
      }}
    />
  );
};
