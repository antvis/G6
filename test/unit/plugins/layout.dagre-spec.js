const G6 = require('../../../src/index');
const expect = require('chai').expect;
const div = document.createElement('div');
document.body.appendChild(div);
div.setAttribute('data-test-spec', 'plugin/layout.dagre-spec.js');
require('../../../plugins/util.randomData/');
require('../../../plugins/layout.dagre/');

describe('plugin layout dagre', () => {
  it('layout', () => {
    const Plugin = G6.Plugins['layout.dagre'];
    const Util = G6.Util;
    const data = Util.createChainData(10);
    const graph = new G6.Graph({
      container: div,
      fitView: 'cc',
      width: 500,
      height: 500,
      plugins: [ new Plugin({
        nodesep() {
          return 10;
        }
      }) ]
    });
    graph.node({
      size: 16
    });
    graph.read(data);
    expect(graph.find(0).getModel().x).eql(8.5);
    expect(graph.find(0).getModel().y).eql(8.5);
    graph.destroy();
  });
});
