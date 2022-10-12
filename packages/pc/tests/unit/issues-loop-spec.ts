import G6, { Graph } from '../../src';
import { Arrow } from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const nodes = [
  {
    id: '1',
    type: 'rect',
    color: '#333',
    x: 100,
    y: 200,
    size: [80, 80],
    label: 'rect',
  },
  {
    id: '2',
    type: 'rect',
    color: '#333',
    x: 100,
    y: 400,
    size: [400, 80],
    label: 'rect',
  },
  {
    id: '3',
    type: 'circle',
    color: '#666',
    x: 100,
    y: 700,
    size: [200, 40],
    label: 'circle',
  },
];

const directions = [
  'top-left',
  'top',
  'top-right',
  'right',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left',
];

const edges = [];
nodes.forEach((node) => {
  const perNodeEdge = directions.map((currentDirection) => ({
    source: node.id,
    target: node.id,
    type: 'loop',
    loopCfg: {
      position: currentDirection,
      dist: 20,
      pointPadding: 15,
      clockwise: true,
    },
  }));
  edges.push(...perNodeEdge);
});

const data = {
  nodes,
  edges,
};

describe('issues', () => {
  it('test loop edge endpoint and startPoint', () => {
    const graph = new G6.Graph({
      container: div,
      width: 800,
      height: 800,
      fitCenter: true,
      defaultNode: {
        type: 'rect',
      },
    });

    graph.data(data);
    graph.render();
  });
});
