import type { Graph } from '@/src';
import { CommonEvent, ContainerEvent } from '@/src';
import type { ZoomCanvasOptions } from '@/src/behaviors/zoom-canvas';
import { behaviorZoomCanvas } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior zoom canvas', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorZoomCanvas, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', () => {
    expect(graph.getZoom()).toBe(1);
    expect(graph.getBehaviors()).toEqual([{ type: 'zoom-canvas' }]);
  });

  it('zoom in', async () => {
    graph.emit(CommonEvent.WHEEL, { deltaY: -10 });

    expect(graph.getZoom()).toBe(1.1);

    await expect(graph).toMatchSnapshot(__filename);
  });

  it('zoom out', () => {
    const currentZoom = graph.getZoom();

    graph.emit(CommonEvent.WHEEL, { deltaY: 5 });

    expect(graph.getZoom()).toBe(currentZoom * 0.95);

    graph.emit(CommonEvent.WHEEL, { deltaY: 5 });

    expect(graph.getZoom()).toBeCloseTo(currentZoom * 0.95 ** 2);
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
    graph.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    graph.emit(CommonEvent.KEY_DOWN, { key: '=' });

    expect(graph.getZoom()).toBe(currentZoom * 1.1);

    graph.emit(CommonEvent.KEY_UP, { key: 'Control' });
    graph.emit(CommonEvent.KEY_UP, { key: '=' });

    // reset
    graph.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    graph.emit(CommonEvent.KEY_DOWN, { key: '0' });

    expect(graph.getZoom()).toBe(1);

    graph.emit(CommonEvent.KEY_UP, { key: 'Control' });
    graph.emit(CommonEvent.KEY_UP, { key: '0' });

    // zoom out
    graph.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    graph.emit(CommonEvent.KEY_DOWN, { key: '-' });

    expect(graph.getZoom()).toBe(0.9);

    graph.emit(CommonEvent.KEY_UP, { key: 'Control' });
    graph.emit(CommonEvent.KEY_UP, { key: '-' });
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

    graph.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    graph.emit(CommonEvent.KEY_DOWN, { key: '=' });
    graph.emit(CommonEvent.KEY_UP, { key: 'Control' });
    graph.emit(CommonEvent.KEY_UP, { key: '=' });
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
            enable: (event: any) => event.targetType === 'canvas',
          };
        }
        return behavior;
      }),
    );

    const currentZoom = graph.getZoom();

    graph.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    graph.emit(CommonEvent.KEY_DOWN, { key: '=', targetType: 'node' });
    graph.emit(CommonEvent.KEY_UP, { key: 'Control' });
    graph.emit(CommonEvent.KEY_UP, { key: '=' });

    expect(graph.getZoom()).toBe(currentZoom);

    graph.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    graph.emit(CommonEvent.KEY_DOWN, { key: '=', targetType: 'canvas' });
    graph.emit(CommonEvent.KEY_UP, { key: 'Control' });
    graph.emit(CommonEvent.KEY_UP, { key: '=' });

    expect(graph.getZoom()).toBe(currentZoom * 1.1);
  });

  it('preconditionKey', () => {
    graph.setBehaviors([{ type: 'zoom-canvas', trigger: ['Control'] }]);

    const currentZoom = graph.getZoom();

    graph.emit(CommonEvent.WHEEL, { deltaY: -10 });
    expect(graph.getZoom()).toBe(currentZoom);

    graph.emit(CommonEvent.KEY_DOWN, { key: 'Control' });
    graph.emit(CommonEvent.WHEEL, { deltaY: -10 });
    expect(graph.getZoom()).toBe(currentZoom * 1.1);
  });

  it('canvas event', () => {
    const canvas = graph.getCanvas();

    const pointermoveListener = jest.fn();
    const clickListener = jest.fn();
    const wheelListener = jest.fn();
    const dblclickListener = jest.fn();
    const contextmenuListener = jest.fn().mockImplementation((e) => e.preventDefault());

    // pointerenter / pointerleave
    graph.once('canvas:pointermove', pointermoveListener);
    canvas.document.emit(CommonEvent.POINTER_MOVE, {});
    expect(pointermoveListener).toHaveBeenCalledTimes(1);

    // common event
    graph.once('canvas:click', clickListener);
    graph.once('canvas:wheel', wheelListener);
    canvas.document.emit(CommonEvent.CLICK, {});
    canvas.document.emit(CommonEvent.WHEEL, {});
    expect(clickListener).toHaveBeenCalledTimes(1);
    expect(wheelListener).toHaveBeenCalledTimes(1);

    // double click
    graph.once('canvas:dblclick', dblclickListener);
    canvas.document.emit(CommonEvent.CLICK, { detail: 2 });
    expect(dblclickListener).toHaveBeenCalledTimes(1);

    // contextmenu
    graph.once('canvas:contextmenu', contextmenuListener);
    canvas.document.emit(CommonEvent.POINTER_DOWN, { button: 2 });
    expect(contextmenuListener).toHaveBeenCalledTimes(1);
  });

  it('container event', () => {
    const container = graph.getCanvas().getContainer();

    const keydownListener = jest.fn();
    graph.once(ContainerEvent.KEY_DOWN, keydownListener);
    container?.dispatchEvent(new Event(ContainerEvent.KEY_DOWN));
    expect(keydownListener).toHaveBeenCalledTimes(1);
  });
});
