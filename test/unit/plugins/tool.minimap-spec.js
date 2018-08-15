const G6 = require('../../../src/index');
const Minimap = require('../../../plugins/tool.minimap/');
const expect = require('chai').expect;
const Util = G6.Util;

document.body.appendChild(Util.createDOM(`
<div>
  <div id='minimapMountNode'></div>
  <div id="minimap"></div>
</div>
`));

describe('minimap test', () => {
  const originInnerHTML = document.getElementById('minimap').innerHTML;
  const minimap = new Minimap({
    container: 'minimap',
    width: 100,
    height: 100
  });
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
    container: 'minimapMountNode',
    width: 500,
    height: 500,
    plugins: [ minimap ]
  });
  graph.read(data);
  graph.remove('node1');
  graph.remove('node2');
  it('minimap render', () => {
    expect(document.getElementById('minimap').innerHTML).not.eql(originInnerHTML);
  });
  it('minimap destroy', () => {
    graph.destroy();
    expect(document.getElementById('minimap').innerHTML).eql(originInnerHTML);
  });
});
