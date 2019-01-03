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
        default: [{
          type: 'drag-node',
          delegate: false
        }]
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
    graph.destroy();
  });
  it('delegate drag node with edge', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      modes: {
        default: [{
          type: 'drag-node',
          delegateStyle: {
            fillOpacity: 0.8
          }
        }]
      },
      pixelRatio: 2
    });
    const src = graph.add('node', { id: 'source', color: '#666', x: 50, y: 50, size: 20, style: { lineWidth: 2, fill: '#666' } });
    const target = graph.add('node', { id: 'target', color: '#666', x: 300, y: 300, size: 20, shape: 'rect', style: { lineWidth: 2, fill: '#666' } });
    const edge = graph.add('edge', { source: src, target });
    graph.paint();
    let path = edge.get('group').get('children')[0].attr('path');
    expect(path[0][1]).to.equal(57.77817459305202);
    expect(path[0][2]).to.equal(57.77817459305202);
    expect(path[1][1]).to.equal(289);
    expect(path[1][2]).to.equal(289);
    graph.emit('node:dragstart', { clientX: 100, clientY: 100, target: src });
    graph.emit('node:drag', { clientX: 120, clientY: 120, target: src });
    path = edge.get('group').get('children')[0].attr('path');
    expect(path[0][1]).to.equal(57.77817459305202);
    expect(path[0][2]).to.equal(57.77817459305202);
    expect(path[1][1]).to.equal(289);
    expect(path[1][2]).to.equal(289);
    graph.emit('node:dragend', { clientX: 140, clientY: 140, target: src });
    path = edge.get('group').get('children')[0].attr('path');
    expect(path[0][1]).to.equal(97.77817459305203);
    expect(path[0][2]).to.equal(97.77817459305203);
    expect(path[1][1]).to.equal(289);
    expect(path[1][2]).to.equal(289);
    graph.destroy();
  });
  it('prevent default', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'drag-node',
          delegate: false,
          shouldUpdate: e => { expect(e).not.to.be.undefined; return false; }
        }]
      },
      pixelRatio: 2
    });
    const node = graph.add('node', { color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' } });
    graph.paint();
    graph.emit('node:dragstart', { clientX: 100, clientY: 100, target: node });
    graph.emit('node:drag', { clientX: 120, clientY: 120, target: node });
    const matrix = node.get('group').getMatrix();
    expect(matrix[0]).to.equal(1);
    expect(matrix[6]).to.equal(50);
    expect(matrix[7]).to.equal(50);
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
