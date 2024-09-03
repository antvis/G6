import type { Graph } from '@/src';
import { CommonEvent } from '@/src';
import { ScrollCanvasOptions } from '@/src/behaviors';
import { behaviorScrollCanvas } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior scroll canvas', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorScrollCanvas, { animation: false });
  });

  function setBehavior(options?: Partial<ScrollCanvasOptions>) {
    graph.setBehaviors((behaviors) =>
      behaviors.map((behavior) => {
        if (typeof behavior === 'object' && behavior.type === 'scroll-canvas') {
          return { ...behavior, ...options };
        }
        return behavior;
      }),
    );
  }

  it('default status', () => {
    expect(graph.getBehaviors()).toEqual([
      {
        key: 'scroll-canvas',
        type: 'scroll-canvas',
      },
    ]);
  });

  function emitWheelEvent(options?: { deltaX: number; deltaY: number }) {
    const dom = graph.getCanvas().getContextService().getDomElement();
    dom?.dispatchEvent(new WheelEvent(CommonEvent.WHEEL, options));
  }

  it('scroll', async () => {
    const [x, y] = graph.getPosition();
    emitWheelEvent({ deltaX: -10, deltaY: -10 });
    expect(graph.getPosition()).toBeCloseTo([x + 10, y + 10]);

    await expect(graph).toMatchSnapshot(__filename);
  });

  it('direction', async () => {
    setBehavior({ direction: 'x' });
    let [x, y] = graph.getPosition();
    emitWheelEvent({ deltaX: -10, deltaY: -10 });
    expect(graph.getPosition()).toBeCloseTo([x + 10, y]);

    setBehavior({ direction: 'y' });
    [x, y] = graph.getPosition();
    emitWheelEvent({ deltaX: -10, deltaY: -10 });
    expect(graph.getPosition()).toBeCloseTo([x, y + 10]);

    setBehavior({ direction: undefined });
  });

  it('sensitivity', () => {
    const sensitivity = 5;
    setBehavior({ sensitivity });
    const [x, y] = graph.getPosition();
    const deltaX = -10,
      deltaY = -10;
    emitWheelEvent({ deltaX, deltaY });
    expect(graph.getPosition()).toBeCloseTo([x + Math.abs(deltaX * sensitivity), y + Math.abs(deltaY * sensitivity)]);
  });

  const shortcutScrollCanvasOptions: ScrollCanvasOptions = {
    key: 'shortcut-scroll-canvas',
    type: 'scroll-canvas',
    trigger: {
      up: ['ArrowUp'],
      down: ['ArrowDown'],
      right: ['ArrowRight'],
      left: ['ArrowLeft'],
    },
  };

  it('custom trigger', () => {
    graph.setBehaviors((behavior) => [...behavior, shortcutScrollCanvasOptions]);

    let [x, y] = graph.getPosition();
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowUp' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowUp' });
    expect(graph.getPosition()).toBeCloseTo([x, y - 10]);

    [x, y] = graph.getPosition();
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowDown' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowDown' });
    expect(graph.getPosition()).toBeCloseTo([x, y + 10]);

    [x, y] = graph.getPosition();
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowLeft' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowLeft' });
    expect(graph.getPosition()).toBeCloseTo([x - 10, y]);

    [x, y] = graph.getPosition();
    graph.emit(CommonEvent.KEY_DOWN, { key: 'ArrowRight' });
    graph.emit(CommonEvent.KEY_UP, { key: 'ArrowRight' });
    expect(graph.getPosition()).toBeCloseTo([x + 10, y]);
  });

  it('range', () => {
    graph.setBehaviors((behavior) => [...behavior, { ...shortcutScrollCanvasOptions, range: 0.5 }]);

    const emitArrow = (key: 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown', count: number) => {
      for (let i = 0; i < count; i++) {
        graph.emit(CommonEvent.KEY_DOWN, { key });
        graph.emit(CommonEvent.KEY_UP, { key });
      }
    };

    const [canvasWidth, canvasHeight] = graph.getCanvas().getSize();
    emitArrow('ArrowRight', 50);
    expect(graph.getPosition()[0]).toBeCloseTo(canvasWidth / 2);
    emitArrow('ArrowLeft', 50);
    expect(graph.getPosition()[0]).toBeCloseTo(-canvasWidth / 2);
    emitArrow('ArrowUp', 50);
    expect(graph.getPosition()[1]).toBeCloseTo(-canvasHeight / 2);
  });

  it('destroy', () => {
    graph.destroy();
  });
});
