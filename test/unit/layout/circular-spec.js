const expect = require('chai').expect;
const G6 = require('../../../src');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

function mathEqual(a, b) {
  return Math.abs(a - b) < 1;
}

describe.only('circular layout', () => {
  it('circular layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: { type: 'circular' },
      width: 500,
      height: 500,
      defaultNode: { size: 10 }
    });
    graph.data(data);
    graph.render();
    const width = graph.get('width');
    const height = graph.get('height');
    const radius = height > width ? width / 2 : height / 2;
    expect(mathEqual(data.nodes[0].x, 250 + radius)).to.equal(true);
    expect(mathEqual(data.nodes[0].y, 250)).to.equal(true);
    expect(data.nodes[0].y === 250);
    graph.destroy();
  });

  it('circular counterclockwise, and fixed radius, start angle, end angle', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        center: [ 250, 250 ],
        radius: 200,
        startAngle: Math.PI / 4,
        endAngle: Math.PI
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 }
    });
    graph.data(data);
    graph.render();
    const pos = 200 * Math.sqrt(2) / 2;
    expect(mathEqual(data.nodes[0].x, 250 + pos)).to.equal(true);
    expect(mathEqual(data.nodes[0].y, 250 + pos)).to.equal(true);
    graph.destroy();
  });
});
