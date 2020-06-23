import Graph from '../../../../src/graph/graph';
import G6 from '../../../../src';
import { GraphData } from '../../../../src/types';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('arrow test', () => {
  const cfg = {
    container: div,
    width: 500,
    height: 500,
    defaultNode: {
      type: 'circle',
      style: {
        opacity: 0.1
      }
    },
  };
  const graph = new Graph(cfg);

  it('triangle arrow ', () => {
    const data: GraphData = {
      nodes: [
        {
          id: '1',
          x: 100,
          y: 100,
        },
        {
          id: '2',
          x: 200,
          y: 200,
        },
      ],
      edges: [{
        source: '1',
        target: '2',
        style: {
          endArrow: {
            path: G6.Arrow.triangle(10, 20)
          }
        }
      }]
    };
    graph.data(data);
    graph.render();
  });
});
