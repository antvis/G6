const expect = require('chai').expect;
const G6 = require('../../../src');

const div = document.createElement('div');
div.id = 'drag-spec';
document.body.appendChild(div);

describe('drag-node', () => {
  it('drag node', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'drag-node' ]
      },
      pixelRatio: 2
    });
    const node = graph.add('node', { color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' } });
    graph.paint();
    graph.emit('node:dragstart', { clientX: 100, clientY: 100, target: node });
    graph.emit('node:drag', { clientX: 120, clientY: 120, target: node });
    const matrix = node.get('group').getMatrix();
    expect(matrix[0]).to.equal(1);
    expect(matrix[6]).to.equal(70);
    expect(matrix[7]).to.equal(70);
  });
  it('unbind', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'drag-node' ]
      },
      pixelRatio: 2
    });
    graph.removeBehaviors('drag-node', 'default');
    const node = graph.add('node', { color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' } });
    graph.emit('node:dragstart', { clientX: 100, clientY: 100, target: node });
    graph.emit('node:drag', { clientX: 120, clientY: 120, target: node });
    const matrix = node.get('group').getMatrix();
    expect(matrix[0]).to.equal(1);
    expect(matrix[6]).to.equal(50);
    expect(matrix[7]).to.equal(50);
  });
});
