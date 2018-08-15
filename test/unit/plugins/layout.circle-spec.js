const G6 = require('../../../src/index');
const expect = require('chai').expect;
const Util = G6.Util;
document.body.appendChild(Util.createDOM(`
  <div id='mountNode'></div>
`));
require('../../../plugins/util.randomData/');
require('../../../plugins/layout.circle/');

describe('plugin layout circle', () => {
  it('layout', () => {
    const Plugin = G6.Plugins['layout.circle'];
    const Util = G6.Util;
    const data = Util.createChainData(30);
    const graph = new G6.Graph({
      container: 'mountNode',
      fitView: 'cc',
      width: 500,
      height: 500,
      plugins: [ new Plugin() ]
    });
    graph.node({
      size: 16
    });
    graph.read(data);
    expect(graph.find(0).getModel().x).eql(249.99999999999994);
    expect(graph.find(0).getModel().y).eql(17);
    graph.destroy();
  });
});

describe('plugin layout circle avoidOverlap is true', () => {
  it('layout', () => {
    const Plugin = G6.Plugins['layout.circle'];
    const Util = G6.Util;
    const data = Util.createChainData(30);
    const graph = new G6.Graph({
      container: 'mountNode',
      fitView: 'cc',
      width: 500,
      height: 500,
      plugins: [ new Plugin({
        avoidOverlap: true
      }) ]
    });
    graph.node({
      size: 16
    });
    graph.read(data);
    expect(graph.find(0).getModel().x).eql(249.99999999999994);
    expect(graph.find(0).getModel().y).eql(17);
    graph.destroy();
  });
});

describe('plugin layout circle radius is number', () => {
  it('layout', () => {
    const Plugin = G6.Plugins['layout.circle'];
    const Util = G6.Util;
    const data = Util.createChainData(30);
    const graph = new G6.Graph({
      container: 'mountNode',
      fitView: 'cc',
      width: 500,
      height: 500,
      plugins: [ new Plugin({
        radius: 100
      }) ]
    });
    graph.node({
      size: 16
    });
    graph.read(data);
    expect(graph.find(0).getModel().x).eql(249.99999999999994);
    expect(graph.find(0).getModel().y).eql(17);
    graph.destroy();
  });
});
