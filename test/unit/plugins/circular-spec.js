const expect = require('chai').expect;
const G6 = require('../../../src');
const Circular = require('../../../plugins/circular');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

function mathEqual(a, b) {
  return Math.abs(a - b) < 1;
}

describe('circular layout', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    defaultNode: { size: 10 }
  });
  it('circular layout with default configs', () => {
    const circularLayout = new Circular({ center: [ 250, 250 ] });
    circularLayout.initPlugin(graph);
    circularLayout.layout(data);
    const width = graph.get('width');
    const height = graph.get('height');
    const radius = height > width ? width / 2 : height / 2;
    expect(mathEqual(data.nodes[0].x, 250 + radius)).to.equal(true);
    expect(mathEqual(data.nodes[0].y, 250)).to.equal(true);
    expect(data.nodes[0].y === 250);
  });

  it('circular counterclockwise, and fixed radius, start angle, end angle', () => {
    const circularLayout = new Circular({
      center: [ 250, 250 ],
      radius: 200,
      startAngle: Math.PI / 4,
      endAngle: Math.PI
    });
    circularLayout.initPlugin(graph);
    circularLayout.layout(data);
    const pos = 200 * Math.sqrt(2) / 2;
    expect(mathEqual(data.nodes[0].x, 250 + pos)).to.equal(true);
    expect(mathEqual(data.nodes[0].y, 250 + pos)).to.equal(true);

  });
  it('circular update', () => {
    const data2 = {
      nodes: [
        { id: '0' }, { id: '1' }
      ],
      edges: [
        { source: '0', target: '1' }
      ]
    };
    const circularLayout = new Circular({
      center: [ 250, 250 ],
      radius: 200
    });
    circularLayout.initPlugin(graph);
    circularLayout.layout(data2);
    data2.nodes = [
      { id: '0' }, { id: '1' }, { id: '2' }
    ];
    data2.edges = [
      { source: '0', target: '1' },
      { source: '1', target: '2' },
      { source: '0', target: '2' }
    ];
    circularLayout.updateLayout({ center: [ 100, 150 ], data: data2, radius: null, startRadius: 10, endRadius: 100 });
    expect(mathEqual(data2.nodes[0].x, 110)).to.equal(true);
    expect(mathEqual(data2.nodes[0].y, 150)).to.equal(true);
    const n = data2.nodes.length;
    const vx = data2.nodes[n - 1].x - 100;
    const vy = data2.nodes[n - 1].y - 150;
    const distToFocus = Math.sqrt(vx * vx + vy * vy);
    expect(mathEqual(distToFocus, 100)).to.equal(true);
  });
});
