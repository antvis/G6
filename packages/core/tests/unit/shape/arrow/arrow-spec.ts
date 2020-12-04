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
    linkCenter: true,
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
      },
    ],
  };
  graph.data(data);
  graph.render();

  const edge = graph.getEdges()[0];
  it('triangle arrow ', () => {
    graph.updateItem(edge, {
      style: {
        endArrow: {
          path: G6.Arrow.triangle(10, 20, 25),
          d: 25,
        },
      },
    });
  });
  it('vee arrow ', () => {
    graph.updateItem(edge, {
      style: {
        endArrow: {
          path: G6.Arrow.vee(15, 20, 25),
          d: 25,
        },
      },
    });
  });
  it('circle arrow ', () => {
    graph.updateItem(edge, {
      style: {
        endArrow: {
          path: G6.Arrow.circle(5, 25),
          d: 25,
        },
      },
    });
  });
  it('diamond arrow ', () => {
    graph.updateItem(edge, {
      style: {
        endArrow: {
          path: G6.Arrow.diamond(15, 15, 25),
          d: 25,
        },
      },
    });
  });
  it('rect arrow ', () => {
    graph.updateItem(edge, {
      style: {
        endArrow: {
          path: G6.Arrow.rect(15, 15, 25),
          d: 25,
        },
      },
    });
  });
  it('triangle rect arrow ', () => {
    graph.updateItem(edge, {
      style: {
        endArrow: {
          path: G6.Arrow.triangleRect(15, 15, 15, 3, 5, 25),
          d: 25,
        },
      },
    });
  });
});
