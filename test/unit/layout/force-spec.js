const expect = require('chai').expect;
const G6 = require('../../../src');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe.only('force layout', () => {
  it('force layout with default configs', done => {
    const node = data.nodes[0];
    const edge = data.edges[0];
    let x,
      y,
      count = 0;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        tick() {
          count++;
          expect(node.x !== x);
          expect(node.y !== y);
          expect(edge.x).to.be.undefined;
          expect(edge.y).to.be.undefined;
          x = node.x;
          y = node.y;
        },
        onLayoutEnd() {
          expect(node.x);
          expect(node.y);
          expect(edge.x).to.be.undefined;
          expect(edge.y).to.be.undefined;
        }
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 }
    });
    graph.data(data);
    graph.render();
    setTimeout(() => {
      expect(count > 30);
      graph.destroy();
      done();
    }, 500);
  });

  it('force with fixed link length', done => {
    const node = data.nodes[0];
    const edge = data.edges[0];
    let x,
      y,
      count = 0;

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        distance: 40,
        edgeStrength: 0.5,
        tick() {
          count++;
          expect(node.x !== x);
          expect(node.y !== y);
          expect(edge.x).to.be.undefined;
          expect(edge.y).to.be.undefined;
          x = node.x;
          y = node.y;
        },
        onLayoutEnd() {
          expect(node.x);
          expect(node.y);
          expect(edge.x).to.be.undefined;
          expect(edge.y).to.be.undefined;
        }
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 }
    });
    graph.data(data);
    graph.render();

    setTimeout(() => {
      expect(count > 30);
      done();
      graph.destroy();
    }, 500);
  });
});
