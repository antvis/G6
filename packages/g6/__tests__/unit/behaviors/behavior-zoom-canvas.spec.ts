import { createDemoGraph } from '@@/utils';
import type { Graph } from '../../../src';
import type { ZoomCanvasOptions } from '../../../src/behaviors/zoom-canvas';
import { behaviorZoomCanvas } from '../../demo/case';

describe('behavior zoom canvas', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorZoomCanvas, { animation: false });
  });

  it('default status', () => {
    expect(graph.getZoom()).toBe(1);
    expect(graph.getBehaviors()).toEqual([{ type: 'zoom-canvas' }]);
  });

  it('zoom in', async () => {
    graph.emit('wheel', { deltaY: -10 });

    expect(graph.getZoom()).toBe(2);

    await expect(graph.getCanvas()).toMatchSnapshot(__filename);
  });

  it('zoom out', () => {
    const currentZoom = graph.getZoom();

    graph.emit('wheel', { deltaY: 5 });

    expect(graph.getZoom()).toBe(currentZoom - 0.5);

    graph.emit('wheel', { deltaY: 5 });

    expect(graph.getZoom()).toBe(currentZoom - 1);
  });

  const shortcutZoomCanvasOptions: ZoomCanvasOptions = {
    key: 'shortcut-zoom-canvas',
    type: 'zoom-canvas',
    trigger: {
      zoomIn: ['Control', '='],
      zoomOut: ['Control', '-'],
      reset: ['Control', '0'],
    },
  };

  it('add second zoom canvas', () => {
    graph.setBehaviors((behavior) => [...behavior, shortcutZoomCanvasOptions]);

    expect(graph.getBehaviors()).toEqual([{ type: 'zoom-canvas' }, shortcutZoomCanvasOptions]);
  });

  it('zoom by shortcut', () => {
    const currentZoom = graph.getZoom();

    // zoom in
    graph.emit('keydown', { key: 'Control' });
    graph.emit('keydown', { key: '=' });

    expect(graph.getZoom()).toBe(currentZoom + 0.1);

    graph.emit('keyup', { key: 'Control' });
    graph.emit('keyup', { key: '=' });

    // reset
    graph.emit('keydown', { key: 'Control' });
    graph.emit('keydown', { key: '0' });

    expect(graph.getZoom()).toBe(currentZoom);

    graph.emit('keyup', { key: 'Control' });
    graph.emit('keyup', { key: '0' });

    // zoom out
    graph.emit('keydown', { key: 'Control' });
    graph.emit('keydown', { key: '-' });

    expect(graph.getZoom()).toBe(currentZoom - 0.1);

    graph.emit('keyup', { key: 'Control' });
    graph.emit('keyup', { key: '-' });
  });

  it('disable', () => {
    graph.setBehaviors((behaviors) =>
      behaviors.map((behavior) => {
        if (typeof behavior === 'object') {
          return { ...behavior, enable: false };
        }
        return behavior;
      }),
    );

    const currentZoom = graph.getZoom();

    graph.emit('keydown', { key: 'Control' });
    graph.emit('keydown', { key: '=' });
    graph.emit('keyup', { key: 'Control' });
    graph.emit('keyup', { key: '=' });
    expect(graph.getZoom()).toBe(currentZoom);
  });

  it('remove behavior', () => {
    graph.setBehaviors((behaviors) => behaviors.filter((_, index) => index === 1));
    expect(graph.getBehaviors()).toEqual([{ ...shortcutZoomCanvasOptions, enable: false }]);
  });

  it('condition enable', () => {
    graph.setBehaviors((behaviors) =>
      behaviors.map((behavior) => {
        if (typeof behavior === 'object') {
          return {
            ...behavior,
            enable: (event) => event.targetType === 'canvas',
          };
        }
        return behavior;
      }),
    );

    const currentZoom = graph.getZoom();

    graph.emit('keydown', { key: 'Control' });
    graph.emit('keydown', { key: '=', targetType: 'node' });
    graph.emit('keyup', { key: 'Control' });
    graph.emit('keyup', { key: '=' });

    expect(graph.getZoom()).toBe(currentZoom);

    graph.emit('keydown', { key: 'Control' });
    graph.emit('keydown', { key: '=', targetType: 'canvas' });
    graph.emit('keyup', { key: 'Control' });
    graph.emit('keyup', { key: '=' });

    expect(graph.getZoom()).toBe(currentZoom + 0.1);
  });

  it('preconditionKey', () => {
    graph.setBehaviors([{ type: 'zoom-canvas', trigger: ['Control'] }]);

    const currentZoom = graph.getZoom();

    graph.emit('wheel', { deltaY: -10 });
    expect(graph.getZoom()).toBe(currentZoom);

    graph.emit('keydown', { key: 'Control' });
    graph.emit('wheel', { deltaY: -10 });
    expect(graph.getZoom()).toBe(currentZoom + 1);
  });
});
