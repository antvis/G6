import { Graph } from '../../../src';
import '../../../src';

const div = document.createElement('div');
div.id = 'edge-shape';
document.body.appendChild(div);

describe('vertical horizontal cubic edge', () => {
  it('vertical horizontal cubic edge with curveOffset', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas', 'collapse-expand-combo'],
      },
      fitCenter: true,
      defaultCombo: {
        type: 'rect',
      },
      groupByTypes: false
    });
    const data = {
      nodes: [
        {
          id: '1',
          label: '1',
          x: 100,
          y: 300,
        },
        {
          id: '2',
          label: '2',
          x: 150,
          y: 0,
          comboId: 'c1',
        },
        {
          id: '3',
          label: '3',
          x: 100,
          y: 0,
          comboId: 'c1',
        },
      ],
      edges: [
        {
          source: '1',
          target: '2',
        },
        {
          source: '1',
          target: '3',
        },
      ],
      combos: [
        {
          id: 'c1',
          fixSize: 100,
          fixCollapseSize: 50,
        },
      ],
    };
    graph.data(data);
    graph.render();

    graph.on('canvas:click' e => {
      graph.updateCombos()
    })

    // graph.destroy();
  });
});
