import { Graph } from '@/src';
import { controllerViewport } from '@@/demo/static/controller-viewport';
import { createDemoGraph } from '@@/utils';

describe('ViewportController', () => {
  let graph: Graph;
  beforeAll(async () => {
    graph = await createDemoGraph(controllerViewport);
  });

  it('viewport center', () => {
    expect(graph.getViewportCenter()).toEqual(graph.getPosition());
    const [x, y] = graph.getViewportCenter();
    expect(x).toBeCloseTo(250);
    expect(y).toBeCloseTo(250);
  });

  it('canvas size', () => {
    // @ts-expect-error context is private.
    expect(graph.context.viewport.getCanvasSize()).toEqual([500, 500]);
  });

  it('viewport zoom', async () => {
    expect(graph.getZoom()).toBe(1);

    await graph.zoomBy(0.5);
    expect(graph.getZoom()).toBe(0.5);

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__zoom-0.5');

    await graph.zoomBy(4, { duration: 100 });
    expect(graph.getZoom()).toBe(2);

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__zoom-2');

    await graph.zoomTo(1);
    expect(graph.getZoom()).toBe(1);

    graph.setZoomRange([0.1, 10]);
    expect(graph.getZoomRange()).toEqual([0.1, 10]);
  });

  it('viewport translate', async () => {
    await graph.translateBy([100, 100]);
    let [x, y] = graph.getPosition();
    expect(x).toBeCloseTo(350);
    expect(y).toBeCloseTo(350);

    await graph.translateTo([200, 200]);

    [x, y] = graph.getPosition();
    expect(x).toBeCloseTo(450);
    expect(y).toBeCloseTo(450);

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__translate');

    await graph.translateTo([0, 0], { duration: 100 });
  });

  it('viewport rotate', async () => {
    await graph.rotateBy(45);
    expect(graph.getRotation()).toBe(45);

    await graph.rotateBy(90);
    expect(graph.getRotation()).toBe(45 + 90);
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__rotate-135');

    await graph.rotateTo(90, { duration: 100 });
    expect(graph.getRotation()).toBe(90);

    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__rotate-90');
  });

  afterAll(() => {
    graph.destroy();
  });
});
