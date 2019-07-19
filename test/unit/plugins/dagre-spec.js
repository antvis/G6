const expect = require('chai').expect;
// const G6 = require('../../../src');
const Dagre = require('../../../plugins/dagre');
const data = require('./data');

const div = document.createElement('div');
div.id = 'dagre';
document.body.appendChild(div);

function mathEqual(a, b) {
  return Math.abs(a - b) < 1;
}

describe('dagre layout', () => {
  /* const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    fitView: true,
  });*/
  it('layout with default configs', () => {
    const dagre = new Dagre();
    dagre.layout(data);
    const node = data.nodes[0];
    const edge = data.edges[0];
    expect(mathEqual(node.x, 215));
    expect(mathEqual(node.y, 196));
    expect(mathEqual(edge.startPoint.x, 522));
    expect(mathEqual(edge.startPoint.y, 440));
    expect(mathEqual(edge.endPoint.x, 765));
    expect(mathEqual(edge.endPoint.y, 498));

  });
  it('modify configs', () => {
    data.edges.forEach(edge => {
      delete edge.startPoint;
      delete edge.endPoint;
      delete edge.controlPoints;
    });
    const dagre = new Dagre({
      rankdir: 'LR',
      marginx: 100,
      marginy: 100,
      controlPoints: false
    });
    dagre.layout(data);
    const node = data.nodes[0];
    const edge = data.edges[0];
    expect(mathEqual(node.x, 600));
    expect(mathEqual(node.y, 1075));
    expect(mathEqual(edge.startPoint.x, 531));
    expect(mathEqual(edge.startPoint.y, 594));
    expect(mathEqual(edge.endPoint.x, 597));
    expect(mathEqual(edge.endPoint.y, 854));
    expect(edge.controlPoints).to.be.undefined;
    dagre.updateLayout({ controlPoints: true });
    expect(dagre.get('controlPoints'));
    dagre.layout(data);
    expect(edge.controlPoints).not.to.be.undefined;
  });
});
