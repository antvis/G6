import { Graph } from '../../src';
import { createContext, sleep } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/auto-resize`;

describe('Auto Resize', () => {
  it('autoResize trigger by window.resize', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = new Graph({
      width: 500,
      height: 500,
      autoResize: true,
      container,
      backgroundCanvas,
      canvas,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
      layout: {
        type: 'grid',
      },
      data: {
        nodes: [
          { id: 'node1', data: {} },
          { id: 'node2', data: {} },
          { id: 'node3', data: {} },
          { id: 'node4', data: {} },
        ],
        edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
      },
    });

    graph.on('afterlayout', async () => {
      container.style.display = 'block';
      container.style.width = '400px';
      container.style.height = '400px';

      window.dispatchEvent(new Event('resize'));

      await sleep(500); // auto resize debounce is 300ms.
      await expect(canvas).toMatchSVGSnapshot(dir, 'auto-resize');

      graph.destroy();
      done();
    });
  });
});
