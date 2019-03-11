const expect = require('chai').expect;
const G6 = require('../../../../src/');

const div = document.createElement('div');
div.id = 'animate-spec';
document.body.appendChild(div);

describe('graph animate', () => {
  it('override animateCfg', done => {
    let called = false;
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      animate: true,
      animateCfg: {
        duration: 100,
        callback() { called = true; }
      }
    });
    const animateCfg = graph.get('animateCfg');
    expect(animateCfg.duration).to.equal(100);
    expect(typeof animateCfg.callback).to.equal('function');
    expect(animateCfg.easing).to.equal('easeLinear');
    graph.refresh();
    setTimeout(() => {
      expect(called).to.be.true;
      graph.destroy();
      done();
    }, 300);
  });
  it('changeData animate', done => {
    const data = {
      nodes: [{
        id: 'a',
        shape: 'circle',
        color: '#333',
        x: 30,
        y: 30,
        size: 20,
        label: 'a'
      }, {
        id: 'b',
        shape: 'ellipse',
        color: '#666',
        x: 50,
        y: 60,
        size: [ 30, 40 ],
        label: 'b'
      }, {
        id: 'c',
        shape: 'rect',
        color: '#999',
        x: 100,
        y: 70,
        size: 20,
        label: 'c'
      }],
      edges: [{
        source: 'a',
        target: 'b',
        id: 'd'
      }, {
        source: 'a',
        target: 'c',
        id: 'e'
      }]
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      animate: true,
      animateCfg: { duration: 100 }
    });
    graph.data(data);
    graph.render();
    const pathX = graph.findById('d').getKeyShape().attr('path')[0][1];
    const pathY = graph.findById('d').getKeyShape().attr('path')[0][2];
    graph.get('animateCfg').callback = () => {
      expect(graph.findById('a').get('model').x).not.to.equal(30);
      expect(graph.findById('a').get('model').y).not.to.equal(30);
      expect(graph.findById('d').getKeyShape().attr('path')[0][1]).not.to.equal(pathX);
      expect(graph.findById('d').getKeyShape().attr('path')[0][2]).not.to.equal(pathY);
      graph.destroy();
      done();
    };
    expect(graph.findById('a').get('model').x).to.equal(30);
    expect(graph.findById('a').get('model').y).to.equal(30);
    data.nodes.forEach(node => {
      node.x += Math.random() * 100 - 50;
      node.y += Math.random() * 100 - 50;
    });
    graph.changeData(data);
  });
  it('refreshPositions', done => {
    const data = {
      nodes: [{
        id: 'a',
        shape: 'circle',
        color: '#333',
        x: 30,
        y: 30,
        size: 20,
        label: 'a'
      }, {
        id: 'b',
        shape: 'ellipse',
        color: '#666',
        x: 50,
        y: 60,
        size: [ 30, 40 ],
        label: 'b'
      }, {
        id: 'c',
        shape: 'rect',
        color: '#999',
        x: 100,
        y: 70,
        size: 20,
        label: 'c'
      }],
      edges: [{
        source: 'a',
        target: 'b',
        id: 'd'
      }, {
        source: 'a',
        target: 'c',
        id: 'e'
      }]
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      animate: true,
      animateCfg: {
        duration: 100
      }
    });
    graph.data(data);
    graph.render();
    let matrix = graph.findById('a').getContainer().getMatrix();
    expect(matrix[6]).to.equal(30);
    expect(matrix[7]).to.equal(30);
    const pathX = graph.findById('d').getKeyShape().attr('path')[0][1];
    const pathY = graph.findById('d').getKeyShape().attr('path')[0][2];
    graph.get('animateCfg').callback = () => {
      matrix = graph.findById('a').getContainer().getMatrix();
      expect(graph.findById('a').get('model').x).to.equal(50);
      expect(graph.findById('a').get('model').y).to.equal(50);
      expect(matrix[6]).to.equal(50);
      expect(matrix[7]).to.equal(50);
      expect(graph.findById('d').getKeyShape().attr('path')[0][1]).not.to.equal(pathX);
      expect(graph.findById('d').getKeyShape().attr('path')[0][2]).not.to.equal(pathY);
      graph.destroy();
      done();
    };
    graph.getNodes().forEach(node => {
      const model = node.get('model');
      model.x += 20;
      model.y += 20;
    });
    graph.refresh();
  });
  it('onFrame', done => {
    const r = 25;
    const radius = Math.PI;
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      animate: true,
      animateCfg: {
        duration: 300,
        onFrame(node, ratio, toAttrs, fromAttrs) {
          if (node.get('id') === 'node1') {
            expect(toAttrs.x).to.equal(150);
            expect(toAttrs.y).to.equal(100);
            expect(fromAttrs.x).to.equal(100);
            expect(fromAttrs.y).to.equal(100);
          } else {
            expect(toAttrs.x).to.equal(100);
            expect(toAttrs.y).to.equal(100);
            expect(fromAttrs.x).to.equal(150);
            expect(fromAttrs.y).to.equal(100);
          }
          const current = radius * ratio;
          let x = fromAttrs.x;
          let y = fromAttrs.y;
          if (fromAttrs.x > toAttrs.x) {
            y += r * Math.sin(current);
            if (current > Math.PI / 2) {
              x = x - r + r * Math.cos(current);
            } else {
              x += r * Math.cos(current);
            }
          } else {
            y -= r * Math.sin(current);
            if (current > Math.PI / 2) {
              x = x + r - r * Math.cos(current);
            } else {
              x -= r * Math.cos(current);
            }
          }
          return { x, y };
        }
      }
    });
    graph.clear();
    const node1 = graph.addItem('node', { id: 'node1', x: 100, y: 100, shape: 'circle', style: { fill: 'red' } });
    const node2 = graph.addItem('node', { id: 'node2', x: 150, y: 100, shape: 'circle', style: { fill: 'blue' } });
    graph.get('animateCfg').callback = () => {
      expect(node1.get('model').x).to.equal(150);
      expect(node1.get('model').y).to.equal(100);
      expect(node2.get('model').x).to.equal(100);
      expect(node2.get('model').y).to.equal(100);
      done();
    };
    node1.get('model').x = 150;
    node1.get('model').y = 100;
    node2.get('model').x = 100;
    node2.get('model').y = 100;
    expect(graph.refresh()).not.to.throw;
  });
});
