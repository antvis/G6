import { createGraph } from '@@/utils';
import { CanvasEvent, CommonEvent, NodeEvent } from '@antv/g6';

describe('bug: element-custom-state-switch', () => {
  it('single select', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1', states: ['important'], style: { x: 100, y: 100 } }],
      },
      node: {
        style: {
          fill: 'red',
        },
        state: {
          important: {
            fill: 'green',
          },
        },
      },
      behaviors: [
        {
          type: 'click-select',
        },
      ],
    });

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'single');

    expect(graph.getElementState('node-1')).toEqual(['important']);

    // click
    graph.emit(NodeEvent.CLICK, { target: { id: 'node-1' }, targetType: 'node' });

    expect(graph.getElementState('node-1')).toEqual(['important', 'selected']);

    await expect(graph).toMatchSnapshot(__filename, 'single-select');

    // click again
    graph.emit(NodeEvent.CLICK, { target: { id: 'node-1' }, targetType: 'node' });

    expect(graph.getElementState('node-1')).toEqual(['important']);

    await expect(graph).toMatchSnapshot(__filename, 'single');
  });

  it('multiple select', async () => {
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', states: ['important'], style: { x: 100, y: 100 } },
          { id: 'node-2', style: { x: 150, y: 100 } },
        ],
      },
      node: {
        style: {
          fill: 'red',
        },
        state: {
          important: {
            fill: 'green',
          },
        },
      },
      behaviors: [
        {
          type: 'click-select',
          multiple: true,
        },
      ],
    });

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'multiple');

    graph.emit(NodeEvent.CLICK, { target: { id: 'node-2' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_DOWN, { key: 'shift' });
    graph.emit(NodeEvent.CLICK, { target: { id: 'node-1' }, targetType: 'node' });
    // graph.emit(CommonEvent.KEY_UP, { key: 'shift' });

    expect(graph.getElementState('node-1')).toEqual(['important', 'selected']);
    expect(graph.getElementState('node-2')).toEqual(['selected']);

    await expect(graph).toMatchSnapshot(__filename, 'multiple-select');

    // unselect
    graph.emit(NodeEvent.CLICK, { target: { id: 'node-1' }, targetType: 'node' });
    expect(graph.getElementState('node-1')).toEqual(['important']);
    graph.emit(NodeEvent.CLICK, { target: { id: 'node-2' }, targetType: 'node' });
    expect(graph.getElementState('node-2')).toEqual([]);

    await expect(graph).toMatchSnapshot(__filename, 'multiple');

    // reselect
    graph.emit(NodeEvent.CLICK, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(NodeEvent.CLICK, { target: { id: 'node-2' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_UP, { key: 'shift' });

    // click canvas
    graph.emit(CanvasEvent.CLICK);
    expect(graph.getElementState('node-1')).toEqual(['important']);
    expect(graph.getElementState('node-2')).toEqual([]);

    await expect(graph).toMatchSnapshot(__filename, 'multiple-unselect');
  });
});
