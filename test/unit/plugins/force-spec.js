const expect = require('chai').expect;
// const G6 = require('../../../src');
const Force = require('../../../plugins/force');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe('force layout', () => {
  /* const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    defaultNode: { size: 10 }
  });*/
  it('force layout with default configs', done => {
    const node = data.nodes[0];
    const edge = data.edges[0];
    let x,
      y,
      count = 0;
    const force = new Force({
      center: [ 250, 250 ],
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
    });
    force.layout(data);
    setTimeout(() => {
      expect(count > 30);
      done();
    }, 500);
  });

  it('force with fixed link length', done => {
    const node = data.nodes[0];
    const edge = data.edges[0];
    let x,
      y,
      count = 0;
    const force = new Force({
      center: [ 250, 250 ],
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
    });
    force.layout(data);
    setTimeout(() => {
      force.layout(data);
      expect(count > 30);
      done();
    }, 500);
  });
  it('force collide & update', done => {
    const node = data.nodes[0];
    const edge = data.edges[0];
    let x,
      y,
      count = 0;
    const force = new Force({
      center: [ 250, 250 ],
      preventOverlap: true,
      nodeRadius(d) {
        d.size = Math.random() * 100 + 10;
        return d.size / 2;
      },
      nodeStrength: 10,
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
    });
    force.layout({ nodes: data.nodes });
    setTimeout(() => {
      force.updateLayout({
        preventOverlap: false
      });
      expect(force.get('preventOverlap')).to.be.false;
      expect(count > 30);
      done();
    }, 500);
  });
});
