import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'grid-spec';
document.body.appendChild(div);

describe('grid', () => {
  const grid = new G6.Grid();
  const graph = new G6.Graph({
    container: div,
    width: 800,
    height: 600,
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    },
    plugins: [grid],
  });

  graph.addItem('node', { x: 100, y: 100 });
  graph.addItem('node', { x: -100, y: -100 });

  it('grid', () => {
    const container = grid.getContainer();
    expect(container).not.toBe(undefined);
    expect(container.childNodes.length).toEqual(1);

    const style = container.style;
    expect(style.overflow).toEqual('hidden');
    expect(style.top).toEqual('0px');
    expect(style.left).toEqual('0px');

    const gridContainer: HTMLDivElement = container.childNodes[0] as HTMLDivElement;

    expect(gridContainer.style.width).toEqual('800px');
    expect(gridContainer.style.height).toEqual('600px');
    expect(gridContainer.style.left).toEqual('0px');
    expect(gridContainer.style.top).toEqual('0px');
    expect(gridContainer.style.backgroundImage).not.toEqual('');

    graph.translate(-100, -100);

    expect(gridContainer.style.transform).toEqual('matrix(1, 0, 0, 1, 0, 0)');
    expect(gridContainer.style.left).toEqual('0px');
    expect(gridContainer.style.top).toEqual('0px');

    graph.zoom(0.5);
    expect(gridContainer.style.transform).toEqual('matrix(0.5, 0, 0, 0.5, 0, 0)');
    expect(gridContainer.style.left).toEqual('0px');
    expect(gridContainer.style.top).toEqual('0px');

    graph.get('group').resetMatrix();

    graph.translate(100, 100);
    expect(gridContainer.style.transform).toEqual('matrix(1, 0, 0, 1, 0, 0)');
    expect(gridContainer.style.left).toEqual('0px');
    expect(gridContainer.style.top).toEqual('0px');

    graph.addItem('node', { x: -200, y: 200 });

    graph.translate(100, 100);
    expect(gridContainer.style.transform).toEqual('matrix(1, 0, 0, 1, 0, 0)');
    expect(gridContainer.style.left).toEqual('0px');
    expect(gridContainer.style.top).toEqual('0px');
  });
  it('grid destroy', () => {
    const container = graph.get('container');
    expect(container.childNodes.length).toEqual(2);

    graph.destroy();
    expect(container.childNodes.length).toEqual(0);
  });
});
