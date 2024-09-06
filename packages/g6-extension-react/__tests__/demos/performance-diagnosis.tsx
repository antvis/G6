import { Renderer } from '@antv/g-svg';
import type { NodeData } from '@antv/g6';
import { Graph } from '../../src/graph';

const Node = ({ data }: { data: NodeData }) => {
  console.log('data', data);

  return <div style={{ width: '100%', height: '100%', background: 'red' }}></div>;
};

export const PerformanceDiagnosis = () => {
  const data = {
    nodes: [
      { id: '0' },
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
      { id: '6' },
      { id: '7' },
      { id: '8' },
      { id: '9' },
    ],
    edges: [
      { source: '0', target: '1' },
      { source: '0', target: '2' },
      { source: '1', target: '4' },
      { source: '0', target: '3' },
      { source: '3', target: '4' },
      { source: '4', target: '5' },
      { source: '4', target: '6' },
      { source: '5', target: '7' },
      { source: '5', target: '8' },
      { source: '8', target: '9' },
      { source: '2', target: '9' },
      { source: '3', target: '9' },
    ],
  };

  return (
    <div>
      <Graph
        options={{
          data,
          renderer: () => new Renderer(),
          animation: false,
          x: 10,
          y: 10,
          width: 500,
          height: 500,
          background: '#fcf9f1',
          autoFit: 'view',
          node: {
            type: 'html',
            style: {
              size: [60, 20],
              component: (data: NodeData) => <Node data={data} />,
              ports: [{ placement: 'top' }, { placement: 'bottom' }],
            },
          },
          edge: {
            type: 'polyline',
            style: {
              endArrow: true,
              endArrowSize: 4,
              radius: 8,
              router: {
                type: 'orth',
              },
            },
          },
          layout: {
            type: 'antv-dagre',
            nodeSize: [60, 20],
            nodesep: 50,
            ranksep: 20,
          },
          behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
        }}
      />
    </div>
  );
};
