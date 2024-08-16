import { Graph } from '@/src';
import { controllerViewport } from '@@/demos/controller-viewport';
import { viewportFit } from '@@/demos/viewport-fit';
import { createDemoGraph } from '@@/utils';
import { AABB } from '@antv/g';

describe('ViewportController', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(controllerViewport);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('viewport center', () => {
    expect(graph.getViewportCenter()).toBeCloseTo([250, 250, 0]);
  });

  it('canvas size', () => {
    // @ts-expect-error context is private.
    expect(graph.context.viewport.getCanvasSize()).toEqual([500, 500]);
  });

  it('viewport zoom', async () => {
    expect(graph.getZoom()).toBe(1);

    await graph.zoomBy(0.5);
    expect(graph.getZoom()).toBe(0.5);

    await expect(graph).toMatchSnapshot(__filename, 'zoom-0.5');

    await graph.zoomBy(4, { duration: 100 });
    expect(graph.getZoom()).toBe(2);

    await expect(graph).toMatchSnapshot(__filename, 'zoom-2');

    await graph.zoomTo(1);
    expect(graph.getZoom()).toBe(1);

    graph.setZoomRange([0.1, 10]);
    expect(graph.getZoomRange()).toEqual([0.1, 10]);
  });

  it('viewport translate', async () => {
    await graph.translateBy([100, 100]);

    expect(graph.getPosition()).toBeCloseTo([100, 100]);

    await graph.translateTo([200, 200]);

    expect(graph.getPosition()).toBeCloseTo([200, 200]);

    await expect(graph).toMatchSnapshot(__filename, 'translate');

    await graph.translateTo([0, 0], { duration: 100 });
  });

  it('viewport rotate', async () => {
    await graph.rotateBy(45);
    expect(graph.getRotation()).toBe(45);

    await graph.rotateBy(90);
    expect(graph.getRotation()).toBe(45 + 90);
    await expect(graph).toMatchSnapshot(__filename, 'rotate-135');

    await graph.rotateTo(90, { duration: 100 });
    expect(graph.getRotation()).toBe(90);

    await expect(graph).toMatchSnapshot(__filename, 'rotate-90');

    await graph.rotateTo(0);
  });

  it('coordinate transform', async () => {
    expect(graph.getPosition()).toBeCloseTo([0, 0]);
    expect(graph.getClientByCanvas([0, 0])).toBeCloseTo([0, 0, 0]);

    expect(graph.getCanvasCenter()).toBeCloseTo([250, 250, 0]);
    expect(graph.getViewportCenter()).toBeCloseTo([250, 250, 0]);
    expect(graph.getCanvasByViewport([0, 0])).toBeCloseTo([0, 0, 0]);
    expect(graph.getViewportByCanvas([0, 0])).toBeCloseTo([0, 0, 0]);

    // without animation
    await graph.translateTo([100, 100]);

    expect(graph.getPosition()).toBeCloseTo([100, 100]);
    expect(graph.getCanvasCenter()).toBeCloseTo([250, 250, 0]);
    expect(graph.getViewportCenter()).toBeCloseTo([250 - 100, 250 - 100, 0]);
    expect(graph.getCanvasByViewport([0, 0])).toBeCloseTo([-100, -100, 0]);
    expect(graph.getViewportByCanvas([0, 0])).toBeCloseTo([100, 100, 0]);
  });

  it('getViewportSize', async () => {
    await graph.zoomTo(0.5);
    const bbox = new AABB();
    bbox.setMinMax([0, 0, 0], [100, 100, 0]);

    // @ts-expect-error
    expect(graph.context.viewport.getBBoxInViewport(bbox).halfExtents).toBeCloseTo([25, 25, 0]);

    await graph.zoomTo(1);
    // @ts-expect-error
    expect(graph.context.viewport.getBBoxInViewport(bbox).halfExtents).toBeCloseTo([50, 50, 0]);

    await graph.zoomTo(2);
    // @ts-expect-error
    expect(graph.context.viewport.getBBoxInViewport(bbox).halfExtents).toBeCloseTo([100, 100, 0]);
  });

  it('isInViewport', async () => {
    await graph.translateTo([100, 100]);
    // @ts-expect-error
    expect(graph.context.viewport?.isInViewport([0, 0])).toBe(false);
    // @ts-expect-error
    expect(graph.context.viewport?.isInViewport([100, 100])).toBe(true);
    const bbox = new AABB();
    bbox.setMinMax([0, 0, 0], [100, 100, 0]);
    // @ts-expect-error
    expect(graph.context.viewport?.isInViewport(bbox)).toBe(true);
  });
});

describe('Viewport Fit without Animation', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(viewportFit);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'before-fit');
  });

  it('focusElement', async () => {
    await graph.focusElement('1');
    await expect(graph).toMatchSnapshot(__filename, 'focusElement');
  });

  it('fitCenter', async () => {
    await graph.fitCenter();
    await expect(graph).toMatchSnapshot(__filename, 'fitCenter');
  });

  it('fitView', async () => {
    await graph.fitView();
    await expect(graph).toMatchSnapshot(__filename, 'fitView');
  });

  it('re focusElement', async () => {
    await graph.focusElement('1');
    await expect(graph).toMatchSnapshot(__filename, 're-focusElement');
  });

  it('re fitCenter', async () => {
    await graph.fitCenter();
    await expect(graph).toMatchSnapshot(__filename, 're-fitCenter');
  });
});

describe('Viewport Fit with Animation', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(viewportFit, { animation: true });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'before-fit-animation');
  });

  it('focusElement', async () => {
    await graph.focusElement('1');
    await expect(graph).toMatchSnapshot(__filename, 'focusElement-animation');
  });

  it('fitCenter', async () => {
    await graph.fitCenter();
    await expect(graph).toMatchSnapshot(__filename, 'fitCenter-animation');
  });

  it('fitView', async () => {
    await graph.fitView();
    await expect(graph).toMatchSnapshot(__filename, 'fitView-animation');
  });

  it('re focusElement', async () => {
    await graph.focusElement('1');
    await expect(graph).toMatchSnapshot(__filename, 're-focusElement-animation');
  });

  it('re fitCenter', async () => {
    await graph.fitCenter();
    await expect(graph).toMatchSnapshot(__filename, 're-fitCenter-animation');
  });
});

describe('Viewport Fit with AutoFit and Padding without Animation', () => {
  let graph: Graph;
  beforeAll(async () => {
    graph = await createDemoGraph(viewportFit, {
      padding: [100, 0, 0, 100],
      autoFit: 'view',
    });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'auto-fit-with-padding');
  });
});

describe('Viewport Fit with AutoFit and Padding with Animation', () => {
  let graph: Graph;
  beforeAll(async () => {
    graph = await createDemoGraph(viewportFit, {
      padding: [100, 0, 0, 100],
      autoFit: 'view',
      animation: true,
    });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'auto-fit-with-padding-animation');
  });
});

describe('Viewport Fit with lineWidth', () => {
  let graph: Graph;
  beforeAll(async () => {
    graph = await createDemoGraph(viewportFit, { padding: 10 });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default', async () => {
    graph.setNode({
      ...graph.getOptions().node,
      style: {
        size: 50,
        lineWidth: 5,
        stroke: 'pink',
        fill: (d: any) => (d.id === '1' ? '#d4414c' : '#2f363d'),
      },
    });
    await graph.draw();
    await graph.fitView();
    await expect(graph).toMatchSnapshot(__filename, 'with-lineWidth');
  });
});
