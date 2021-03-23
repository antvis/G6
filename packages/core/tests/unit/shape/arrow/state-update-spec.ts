import G6 from '../../../../src';
import Graph from '../../implement-graph';
import { GraphData } from '../../../../src';

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
        opacity: 0.3,
      },
    },
  };
  const graph = new Graph(cfg);
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
        size: 50,
        type: 'circle',
      },
    ],
    edges: [
      {
        source: '1',
        target: '2',
        style: {
          endArrow: true
        }
      },
    ],
  };
  graph.data(data);
  graph.render();

  const edge = graph.getEdges()[0];
  it('triangle arrow ', () => {
    graph.updateItem(edge, {
      style: {
        endArrow: false
      },
    });

    const keyShape = graph.getEdges()[0].getKeyShape();

    graph.setItemState(edge, 'selected', true)
    expect(keyShape.attr('endArrow').path).toBe('');

    graph.setItemState(edge, 'selected', false)
    expect(keyShape.attr('endArrow').path).toBe('');
  });
});
