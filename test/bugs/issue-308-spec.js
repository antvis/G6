const G6 = require('../../src/index');
const expect = require('chai').expect;
require('../../plugins/index');

describe('issue-308-spec', () => {
  const div = G6.Util.createDOM(`
  <div>
    <div id="mountNode"></div>
    <div id="minimap"></div>
  </div>
  `);
  document.body.appendChild(div);
  const plugin = new G6.Plugins['tool.minimap']({
    container: 'minimap',
    width: 180,
    height: 120
  });
  const data = {
    nodes: [{
      id: 'node0',
      x: -100,
      y: 200
    }, {
      id: 'node1',
      x: 100,
      y: 200
    }, {
      id: 'node2',
      x: 300,
      y: 200
    }, {
      id: 'node3',
      x: 600,
      y: 200
    }],
    edges: [{
      target: 'node0',
      source: 'node1'
    }, {
      target: 'node2',
      source: 'node1'
    }, {
      target: 'node2',
      source: 'node3'
    }]
  };
  const graph = new G6.Graph({
    container: 'mountNode',
    fitView: 'cc',
    height: window.innerHeight,
    plugins: [ plugin ]
  });
  graph.read(data);
  it('test minimap has been destroy when graph destroy', () => {
    graph.destroy();
    expect(document.getElementById('minimap').innerHTML).eql('');
  });
});
