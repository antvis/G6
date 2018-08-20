const G6 = require('../../../src/index');
const FreezeSize = require('../../../plugins/tool.freezeSize/');
const expect = require('chai').expect;

describe('freezeSize test', () => {
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200
    }, {
      id: 'node2',
      x: 300,
      y: 200
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }]
  };
  const graph = new G6.Graph({
    container: 'mountNode',
    width: 500,
    height: 500,
    minZoom: 0,
    plugins: [ new FreezeSize() ]
  });
  graph.read(data);
  it('freeze size', () => {
    const node1 = graph.find('node1');
    node1.getKeyShape().set('freezePoint', {
      x: 100,
      y: 100
    });
    graph.update('node1', {
      x: 101
    });
    graph.zoom(0.01);
    expect(node1.getKeyShape().getMatrix()[0]).eql(100);
  });
});

