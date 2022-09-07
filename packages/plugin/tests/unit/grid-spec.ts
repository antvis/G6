import G6 from '@antv/g6';
import Grid from '../../src/grid';

const div = document.createElement('div');
div.id = 'grid-spec';
document.body.appendChild(div);

// const bloc = document.createElement('div');
// bloc.style.backgroundColor = '#f00';
// bloc.style.width = '100px';
// bloc.style.height = '100px';
// div.style.display = 'inline-flex'
// div.appendChild(bloc);

describe('grid', () => {
  const grid = new Grid();
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
    expect(style.left).toEqual('');
    // expect(style.top).toEqual('60px'); // it changes with the specs ran before this one

    const gridContainer: HTMLDivElement = container.childNodes[0] as HTMLDivElement;

    const minZoom = graph.get('minZoom');
    const width = (800 * 80) / minZoom; // 3200000
    const height = (600 * 80) / minZoom; // 2400000
    expect(gridContainer.style.width).toBe('3.2e+06px'); // width
    expect(gridContainer.style.height).toBe('2.4e+06px'); // height
    expect(gridContainer.style.left).toEqual('-1.6e+06px'); // -width . 2
    expect(gridContainer.style.top).toEqual('-1.2e+06px'); // -height / 2
    expect(gridContainer.style.backgroundImage).not.toEqual('');

    graph.translate(-100, -100);

    expect(gridContainer.style.transform).toEqual('matrix(1, 0, 0, 1, -100, -100)');
    expect(gridContainer.style.left).toEqual('-1.6e+06px'); // -width . 2
    expect(gridContainer.style.top).toEqual('-1.2e+06px'); // -height / 2

    graph.zoom(0.5);
    expect(gridContainer.style.transform).toEqual('matrix(0.5, 0, 0, 0.5, -50, -50)');
    expect(gridContainer.style.left).toEqual('-1.6e+06px'); // -width . 2
    expect(gridContainer.style.top).toEqual('-1.2e+06px'); // -height / 2

    graph.get('group').resetMatrix();

    graph.translate(100, 100);
    expect(gridContainer.style.transform).toEqual('matrix(1, 0, 0, 1, 100, 100)');
    expect(gridContainer.style.left).toEqual('-1.6e+06px'); // -width . 2
    expect(gridContainer.style.top).toEqual('-1.2e+06px'); // -height / 2

    graph.addItem('node', { x: -200, y: 200 });

    graph.translate(100, 100);
    expect(gridContainer.style.transform).toEqual('matrix(1, 0, 0, 1, 200, 200)');
    expect(gridContainer.style.left).toEqual('-1.6e+06px'); // -width . 2
    expect(gridContainer.style.top).toEqual('-1.2e+06px'); // -height / 2
  });
  it('grid destroy', () => {
    const container = graph.get('container');
    expect(container.childNodes.length).toEqual(2);

    graph.destroy();
    expect(container.childNodes.length).toEqual(0);
  });
});
