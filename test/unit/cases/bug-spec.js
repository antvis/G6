const Graph = require('../../../src/graph');
const G6 = require('../../../src/index');
const Util = require('../../../src/util/');
const div = document.createElement('div');
const data = require('../../fixtures/sample-graph-data.json');
div.id = 'graph';
document.body.appendChild(div);
div.setAttribute('data-test-spec', 'cases/bug-spec.js');
data.nodes.forEach(node => {
  node.label = node.id;
});
G6.registerNode('custom', {
  draw(item) {
    const group = item.getGraphicGroup();
    return group.addShape('circle', {
      attrs: {
        x: 10,
        y: 10,
        r: 10,
        fill: 'red'
      }
    });
  }
});
const graph = new Graph({
  container: div,
  width: 500,
  height: 500
});
graph.source(Util.clone(data));
graph.render();
graph.update('node3', {
  shape: 'custom'
});
graph.destroy();
