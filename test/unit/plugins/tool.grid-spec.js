const G6 = require('../../../src/index');
const chai = require('chai');
const expect = chai.expect;
const Util = G6.Util;
document.body.appendChild(Util.createDOM(`
  <div id='mountNode'></div>
`));
require('../../../plugins/util.randomData/');
require('../../../plugins/tool.grid/');

describe('tool grid', () => {
  it('init default', () => {
    const Plugin = G6.Plugins['tool.grid'];
    const plugin = new Plugin();
    const graph = new G6.Graph({
      container: 'mountNode',
      fitView: 'cc',
      width: 500,
      height: 500,
      plugins: [ plugin ]
    });
    graph.node({
      size: 16
    });
    graph.read({});
    plugin.hide();
    plugin.show();
    expect(plugin.gridEl).not.eql(undefined);
    graph.destroy();
    expect(plugin.gridEl.get('destroyed')).eql(true);
  });
  it('init default', () => {
    const Plugin = G6.Plugins['tool.grid'];
    const plugin = new Plugin({
      type: 'line'
    });
    const graph = new G6.Graph({
      container: 'mountNode',
      fitView: 'cc',
      width: 500,
      height: 500,
      plugins: [ plugin ]
    });
    graph.node({
      size: 16
    });
    graph.read({});
    expect(plugin.gridEl).not.eql(undefined);
    graph.destroy();
    expect(plugin.gridEl.get('destroyed')).eql(true);
  });
});
