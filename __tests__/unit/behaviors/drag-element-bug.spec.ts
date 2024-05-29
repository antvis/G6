import { createGraphCanvas } from '@@/utils';
import { Graph } from '@antv/g6';
import { positionOf } from '@g6/utils/position';

describe('behavior drag element bug', () => {
  it('drag on non-default zoom', async () => {
    const graph = new Graph({
      animation: false,
      container: createGraphCanvas(document.getElementById('container')),
      data: {
        nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
      },
      behaviors: ['drag-element'],
    });

    await graph.draw();

    expect(graph.getZoom()).toBe(1);
    expect(positionOf(graph.getNodeData('node-1'))).toEqual([100, 100, 0]);

    graph.emit('node:dragstart', { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit('node:drag', { dx: 20, dy: 20 });
    graph.emit('node:dragend');
    expect(positionOf(graph.getNodeData('node-1'))).toEqual([120, 120, 0]);

    graph.zoomTo(2);
    graph.emit('node:dragstart', { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit('node:drag', { dx: 20, dy: 20 });
    graph.emit('node:dragend');
    expect(positionOf(graph.getNodeData('node-1'))).toEqual([130, 130, 0]);

    graph.zoomTo(0.5);
    graph.emit('node:dragstart', { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit('node:drag', { dx: 20, dy: 20 });
    graph.emit('node:dragend');
    expect(positionOf(graph.getNodeData('node-1'))).toEqual([170, 170, 0]);

    graph.destroy();
  });
});
