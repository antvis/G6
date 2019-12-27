const expect = require('chai').expect;
const G6 = require('../../../src');
const data = {
  nodes: [
    { id: '0', name: '0' },
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
    { id: '6', name: '6' },
    { id: '7', name: '7' }
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '1', target: '2' },
    { source: '2', target: '3' },
    { source: '3', target: '4' },
    { source: '5', target: '6' },
    { source: '6', target: '7' }
  ]
};

const div = document.createElement('div');
div.id = 'grid-layout';
document.body.appendChild(div);

describe.only('grid layout', () => {
  it('grid layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'grid'
      },
      defaultNode: {
        size: [ 10, 10 ]
      },
      width: 500,
      height: 500
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x != null).to.equal(true);
    graph.destroy();
  });

  it('grid layout with fixed columns', () => {
    const graph = new G6.Graph({
      container: div,
      // 4 rows , 2 columns
      layout: {
        type: 'grid',
        cols: 2,
        sortBy: 'id'
      },
      defaultNode: {
        size: [ 10, 10 ]
      },
      width: 500,
      height: 500
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x != null && graph.getNodes()[0].getModel().y != null).to.equal(true);
    expect(graph.getNodes()[2].getModel().x != null && graph.getNodes()[2].getModel().y != null).to.equal(true);
    expect(graph.getNodes()[0].getModel().x === graph.getNodes()[2].getModel().x).to.equal(true);
    expect(graph.getNodes()[0].getModel().y > graph.getNodes()[2].getModel().y).to.equal(true);
    graph.destroy();
  });

  it('grid layout with fixed rows', () => {
    const graph = new G6.Graph({
      container: div,
      // 2 rows , 4 columns
      layout: {
        type: 'grid',
        rows: 2,
        sortBy: 'id'
      },
      defaultNode: {
        size: [ 10, 10 ]
      },
      width: 500,
      height: 500
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[3].getModel().x != null && graph.getNodes()[3].getModel().y != null).to.equal(true);
    expect(graph.getNodes()[7].getModel().x != null && graph.getNodes()[7].getModel().y != null).to.equal(true);
    expect(graph.getNodes()[3].getModel().x === graph.getNodes()[7].getModel().x).to.equal(true);
    expect(graph.getNodes()[3].getModel().y > graph.getNodes()[7].getModel().y).to.equal(true);
    graph.destroy();
  });
});
