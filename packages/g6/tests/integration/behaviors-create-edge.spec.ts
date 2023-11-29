import createEdge from '../demo/behaviors/create-edge';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/behaviors`;

describe('Create edge behavior', () => {
  it('trigger click should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = createEdge(
      {
        backgroundCanvas,
        canvas,
        container,
        labelCanvas,
        transientCanvas,
        transientLabelCanvas,
        width: 500,
        height: 500,
      },
      {
        trigger: 'click',
        edgeConfig: { keyShape: { stroke: '#f00' } },
        createVirtualEventName: 'begincreate',
        cancelCreateEventName: 'cancelcreate',
      },
    );

    graph.on('afterlayout', async () => {
      graph.emit('node:click', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      graph.emit('pointermove', { canvas: { x: 100, y: 100 } });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-click-begin',
      );

      graph.emit('node:click', {
        itemId: 'node2',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-click-finish',
      );

      graph.emit('node:click', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      graph.emit('node:click', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-click-loop',
      );

      graph.destroy();
      done();
    });
  });

  it('trigger drag should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = createEdge(
      {
        backgroundCanvas,
        canvas,
        container,
        labelCanvas,
        transientCanvas,
        transientLabelCanvas,
        width: 500,
        height: 500,
      },
      {
        trigger: 'drag',
        edgeConfig: { keyShape: { stroke: '#f00' } },
      },
    );

    graph.on('afterlayout', async () => {
      graph.emit('node:dragstart', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      graph.emit('drag', { canvas: { x: 100, y: 100 } });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-drag-begin',
      );

      const nodeModel = graph.getNodeData('node2');
      graph.emit('drop', {
        itemId: 'node2',
        itemType: 'node',
        canvas: { x: nodeModel?.data.x, y: nodeModel?.data.y },
      });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-drag-finish',
      );

      graph.emit('node:dragstart', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: 100, y: 100 },
      });
      graph.emit('drag', { canvas: { x: 100, y: 100 } });
      const node5Model = graph.getNodeData('node5');
      graph.emit('drop', {
        itemId: 'node5',
        itemType: 'node',
        canvas: { x: node5Model?.data.x, y: node5Model?.data.y },
      });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
        dir,
        'behaviors-create-edge-drag-loop',
      );

      graph.destroy();
      done();
    });
  });
});
