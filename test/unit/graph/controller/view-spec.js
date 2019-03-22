const expect = require('chai').expect;
const G6 = require('../../../../src/');

const div = document.createElement('div');
div.id = 'view-spec';
document.body.appendChild(div);

function numberEqual(a, b, gap) {
  return Math.abs(a - b) <= (gap || 0.001);
}

describe('view', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    fitView: true
  });
  it('default fit view', () => {
    const data = {
      nodes: [{
        id: 'node',
        x: 100,
        y: 100,
        size: [ 1500, 1000 ],
        shape: 'rect',
        color: '#333',
        style: {
          fill: '#666'
        }
      }]
    };
    graph.data(data);
    graph.render();
    let bbox = graph.get('canvas').getBBox();
    expect(bbox.x).to.equal(10);
    expect(bbox.maxX).to.equal(490);
    expect(numberEqual(bbox.y, 89, 1)).to.be.true;
    expect(bbox.width).to.equal(480);
    expect(numberEqual(bbox.height, 320, 1)).to.be.true;
    data.nodes[0].size = [ 400, 200 ];
    graph.changeData(data);
    graph.render();
    bbox = graph.get('canvas').getBBox();
    expect(numberEqual(bbox.x, 10)).to.be.true;
    expect(numberEqual(bbox.maxX, 490)).to.be.true;
    expect(numberEqual(bbox.y, 130, 1)).to.be.true;
    expect(numberEqual(bbox.height, 240, 1)).to.be.true;
  });
  it('modify padding', () => {
    const data = {
      nodes: [{
        id: 'node',
        x: 100,
        y: 100,
        size: [ 1000, 1500 ],
        shape: 'rect',
        color: '#333',
        style: {
          fill: '#666'
        }
      }]
    };
    graph.data(data);
    graph.render();
    graph.fitView([ 50, 50 ]);
    const bbox = graph.get('canvas').getBBox();
    expect(numberEqual(bbox.x, 116, 1)).to.be.true;
    expect(numberEqual(bbox.width, 266, 1)).to.be.true;
    expect(numberEqual(bbox.y, 50)).to.be.true;
    expect(numberEqual(bbox.height, 400, 1)).to.be.true;
  });
  it('focus item', () => {
    graph.clear();
    graph.zoom(2, { x: 250, y: 250 });
    const node = graph.addItem('node', { shape: 'circle', x: 50, y: 50, size: 60, color: '#666' });
    graph.focusItem(node);
    let centerPoint = graph.getPointByCanvas(250, 250);
    expect(centerPoint.x).to.equal(50);
    expect(centerPoint.y).to.equal(50);
    graph.zoom(0.1, { x: 50, y: 50 });
    centerPoint = graph.getPointByCanvas(250, 250);
    expect(centerPoint.x).not.to.equal(50);
    expect(centerPoint.y).not.to.equal(50);
    graph.focusItem(node);
    centerPoint = graph.getPointByCanvas(250, 250);
    expect(centerPoint.x - 50 < 0.1).to.be.true;
    expect(centerPoint.y - 50 < 0.1).to.be.true;
  });
});
