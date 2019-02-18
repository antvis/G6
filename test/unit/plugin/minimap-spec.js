// const expect = require('chai').expect;
const G6 = require('../../../src');
const Minimap = require('../../../src/plugins/minimap');
const div = document.createElement('div');
div.id = 'minimap';
document.body.appendChild(div);

describe.only('minimap', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    modes: {
      default: [{
        type: 'drag-node',
        delegate: false
      }]
    },
    pixelRatio: 2
  });
  graph.addItem('node', { id: 'node', label: 'text', x: 50, y: 50 });
  it('minimap with default settings', () => {
    new Minimap({ graph, size: [ 200, 200 ] });
  });
});
