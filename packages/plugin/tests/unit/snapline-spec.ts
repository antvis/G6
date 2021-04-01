import G6, { IGraph } from '@antv/g6';
import SnapLine from '../../src/snapline';

const div = document.createElement('div');
div.id = 'snapline-spec';
document.body.appendChild(div);

describe('snapline', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        label: 'node1',
      },
      {
        id: 'node2',
        label: 'node2',
      },
      {
        id: 'node3',
        label: 'node3',
      },
      {
        id: 'node4',
        label: 'node4',
      },
      {
        id: 'node5',
        label: 'node5',
      },
    ],
  };

  it('default snapLine', () => {
    const snapline = new SnapLine({
      line: {
        stroke: 'red',
        lineWidth: 3,
      },
      itemAlignType: true,
    });
    const graph = new G6.Graph({
      container: div,
      width: 400,
      height: 300,
      defaultNode: {
        size: 40,
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
      },
      plugins: [snapline],
    });

    graph.data(data);
    graph.render();
  });
  // it('grid destroy', () => {
  //   const container = graph.get('container');
  //   expect(container.childNodes.length).toEqual(2);

  //   graph.destroy();
  //   expect(container.childNodes.length).toEqual(0);
  // });
});
