const expect = require('chai').expect;
const G6 = require('../../../src');
const Grid = require('../../../plugins/grid');

const div = document.createElement('div');
div.id = 'grid-spec';
document.body.appendChild(div);

describe('grid', () => {
  const grid = new Grid();
  const graph = new G6.Graph({
    container: div,
    width: 800,
    height: 600,
    modes: {
      default: [ 'drag-canvas', 'zoom-canvas' ]
    },
    plugins: [ grid ]
  });
  graph.addItem('node', { x: 100, y: 100 });
  graph.addItem('node', { x: -100, y: -100 });
  it('grid', () => {
    const container = grid.getContainer();
    expect(container).not.to.be.undefined;
    expect(container.childNodes.length).to.equal(1);
    const style = container.style;
    expect(style.overflow).to.equal('hidden');
    expect(style.top).to.equal('0px');
    expect(style.left).to.equal('0px');
    const gridContainer = container.childNodes[0];
    expect(gridContainer.style.width).to.equal('4000px');
    expect(gridContainer.style.height).to.equal('3000px');
    expect(gridContainer.style.left).to.equal('-2000px');
    expect(gridContainer.style.top).to.equal('-1500px');
    expect(gridContainer.style.backgroundImage).not.to.equal('');
    graph.translate(-100, -100);
    expect(gridContainer.style.transform).to.equal('matrix(1, 0, 0, 1, -100, -100)');
    expect(gridContainer.style.left).to.equal('-140.5px');
    expect(gridContainer.style.top).to.equal('-140.5px');
    graph.zoom(0.5);
    expect(gridContainer.style.transform).to.equal('matrix(0.5, 0, 0, 0.5, -50, -50)');
    expect(gridContainer.style.left).to.equal('-140.5px');
    expect(gridContainer.style.top).to.equal('-140.5px');
    graph.get('group').resetMatrix();
    graph.translate(100, 100);
    expect(gridContainer.style.transform).to.equal('matrix(1, 0, 0, 1, 100, 100)');
    expect(gridContainer.style.left).to.equal('-140.5px');
    expect(gridContainer.style.top).to.equal('-140.5px');
    graph.addItem('node', { x: -200, y: 200 });
    graph.translate(100, 100);
    expect(gridContainer.style.transform).to.equal('matrix(1, 0, 0, 1, 200, 200)');
    expect(gridContainer.style.left).to.equal('-240.5px');
    expect(gridContainer.style.top).to.equal('-140.5px');
  });
  it('grid destroy', () => {
    const container = graph.get('container');
    expect(container.childNodes.length).to.equal(2);
    graph.destroy();
    expect(container.childNodes.length).to.equal(0);
  });
});

