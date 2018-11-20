const G6 = require('../../../src/index');
const expect = require('chai').expect;
const div = document.createElement('div');
document.body.appendChild(div);
div.setAttribute('data-test-spec', 'plugin/layout.archimeddeanSpiral-spec.js');
require('../../../plugins/util.randomData/');
require('../../../plugins/layout.archimeddeanSpiral/');

describe('plugin layout archimeddeanSpiral', () => {
  it('layout', () => {
    const Plugin = G6.Plugins['layout.archimeddeanSpiral'];
    const Util = G6.Util;
    const data = Util.createChainData(30);
    const graph = new G6.Graph({
      container: div,
      fitView: 'cc',
      width: 500,
      height: 500,
      plugins: [ new Plugin() ]
    });
    graph.node({
      size: 16
    });
    graph.read(data);
    expect(graph.find(0).getModel().x).eql(266);
    expect(graph.find(0).getModel().y).eql(250);
    graph.destroy();
  });
});
