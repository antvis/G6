import { Graph } from '../../../src';
import '../../../src';

const div = document.createElement('div');
div.id = 'edge-shape';
document.body.appendChild(div);

describe('polyline edge', () => {
  xit('polyline edge', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      // linkCenter: true,
      modes: {
        default: [
          {
            type: 'drag-node',
            // enableDebounce: true,
            enableOptimize: true,
          },
          'zoom-canvas',
          'drag-canvas',
        ],
      },
      defaultEdge: {
        type: 'polyline',
      },
      defaultNode: {
        type: 'rect',
        size: [10, 10],
      },
      fitCenter: true,
    });
    const data = {
      nodes: [
        {
          id: 'root',
          x: 50,
          y: 250,
        },
      ],
      edges: [],
    };
    for (let i = 0; i < 20; i++) {
      data.nodes.push({
        id: `${i}`,
        x: 200,
        y: 10 + i * 10,
      });
      data.edges.push({
        source: 'root',
        target: `${i}`,
      });
    }
    graph.data(data);
    graph.render();
  });
  it('polyline edge', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      // linkCenter: true,
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      defaultEdge: {
        type: 'polyline',
      },
      defaultNode: {
        type: 'rect',
        size: [10, 10],
      },
      fitCenter: true,
    });
    const data = {
      nodes: [
        {
          id: '1',
          x: -100,
          y: -300,
        },
        {
          id: '2',
          x: -200,
          y: -200,
        },
      ],
      edges: [
        {
          source: '1',
          target: '2',
        },
      ],
    };
    graph.data(data);
    graph.render();
    const edge = graph.getEdges()[0];
    const keyShape = edge.getKeyShape();
    const path = keyShape.attr('path');
    // expect(path[0][1]).toBe(100);
    // expect(path[0][2]).toBe(300);
    // expect(path[2][1]).toBe(100);
    // expect(path[2][2]).toBe(200);
    // expect(path[4][1]).toBe(200);
    // expect(path[4][2]).toBe(200);

    // graph.destroy();
  });
});
