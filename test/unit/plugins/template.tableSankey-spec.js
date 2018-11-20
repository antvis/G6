const G6 = require('../../../src/index');
const container = document.createElement('div');
const table = require('../../../demos/assets/data/atm-investment.json');
container.setAttribute('data-test-spec', 'plugin/template.tableSankey-spec.js');
document.body.appendChild(container);
require('../../../plugins/template.tableSankey/');
describe('tableSankey test', () => {
  const sankeyPlugin = new G6.Plugins['template.tableSankey']({
    table
  });
  const graph = new G6.Graph({
    container,
    height: 600,
    fitView: 'cc',
    animate: true,
    plugins: [ sankeyPlugin ]
  });
  it('destroy', () => {
    graph.destroy();
  });
});
