import G6 from '../../../src';
import data from './data';

const div = document.createElement('div');
div.id = 'mds-layout';
document.body.appendChild(div);

describe('mds', () => {
  it('mds layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'mds',
      },
      width: 500,
      height: 500,
      defaultNode: {
        size: 10
      }
    });
    graph.data(data);
    graph.render();
    expect(data.nodes[0].x != null).toEqual(true);
    graph.destroy();
  });

  it('mds with fixed link length', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'mds',
        center: [250, 250],
        linkDistance: 120,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(data.nodes[0].x != null).toEqual(true);
    graph.destroy();
  });


  it('mds layout with no node', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'mds',
      },
      width: 500,
      height: 500,
    });
    graph.data({
      nodes: []
    });
    graph.render();
    graph.destroy();
  });

  it('mds layout with one node', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'mds',
      },
      width: 500,
      height: 500,
    });
    graph.data({
      nodes: [{
        id: 'node'
      }]
    });
    graph.render();
    const nodeModel = graph.getNodes()[0].getModel();
    expect(nodeModel.x).toEqual(250);
    expect(nodeModel.y).toEqual(250);
    graph.destroy();
  });
  it('mds layout with unconnected graph', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'mds',
      },
      width: 500,
      height: 500,
      defaultNode: {
        size: 10
      }
    });
    graph.data({
      nodes: [{
        id: 'node0'
      }, {
        id: 'node1'
      }, {
        id: 'node2'
      }],
      edges: [{
        source: 'node0',
        target: 'node1'
      }]
    });
    graph.render();
    // const nodeModel = graph.getNodes()[0].getModel();
    // expect(nodeModel.x).toEqual(250);
    // expect(nodeModel.y).toEqual(250);
    // graph.destroy();
  });
});
