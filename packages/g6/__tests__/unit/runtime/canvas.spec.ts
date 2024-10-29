import { createGraph, createGraphCanvas } from '@@/utils';

describe('Canvas', () => {
  const svg = createGraphCanvas(null, 500, 500, 'svg');
  beforeAll(async () => {
    await svg.ready;
  });

  it('context', () => {
    expect(svg.context).toBeDefined();
  });

  it('getDevice', async () => {
    // getDevice only exists on webgl
    // webgl canvas cannot init in test env
    // expect(webgl.getDevice()).toBeDefined();
  });

  it('coordinate transform', () => {
    // TODO g canvas client 坐标转换疑似异常
    expect(svg.getClientByCanvas([0, 0])).toBeCloseTo([0, 0, 0]);
    expect(svg.getCanvasByViewport([0, 0])).toBeCloseTo([0, 0, 0]);

    expect(svg.getViewportByClient([0, 0])).toBeCloseTo([0, 0, 0]);
    expect(svg.getViewportByCanvas([0, 0])).toBeCloseTo([0, 0, 0]);

    const camera = svg.getCamera();
    camera.pan(100, 100);
    expect([...camera.getPosition()]).toBeCloseTo([350, 350, 500]);
    expect([...camera.getFocalPoint()]).toBeCloseTo([250, 250, 0]);
    expect(svg.getCanvasByViewport([0, 0])).toBeCloseTo([100, 100, 0]);
    expect(svg.getViewportByCanvas([0, 0])).toBeCloseTo([-100, -100, 0]);

    // camera pan 采用相对移动
    camera.pan(-200, -200);
    // focal point wont change
    // expect([...camera.getFocalPoint()]).toBeCloseTo([250, 250, 0]);
    expect([...camera.getPosition()]).toBeCloseTo([150, 150, 500]);
    expect(svg.getCanvasByViewport([0, 0])).toBeCloseTo([-100, -100, 0]);
    expect(svg.getViewportByCanvas([0, 0])).toBeCloseTo([100, 100, 0]);

    // move to origin
    camera.pan(100, 100);

    camera.pan(-100, -100);
    expect(svg.getCanvasByViewport([0, 0])).toBeCloseTo([-100, -100, 0]);

    camera.pan(100, 100);
  });

  it('coordinate transform with landmark', async () => {
    const camera = svg.getCamera();

    const [px, py, pz] = camera.getPosition();
    const [fx, fy, fz] = camera.getFocalPoint();

    // expect([fx, fy, fz]).toEqual([250, 250, 0]);
    expect([px, py, pz]).toEqual([250, 250, 500]);

    const landmark1 = camera.createLandmark('landmark1', {
      // 视点坐标 / viewport coordinates
      focalPoint: [fx + 100, fy + 100, fz],
      // 相机坐标 / camera coordinates
      position: [px + 100, py + 100, pz],
    });

    await new Promise<void>((resolve) => {
      camera.gotoLandmark(landmark1, { onfinish: resolve });
    });

    expect(svg.getCanvasByViewport([0, 0])).toBeCloseTo([100, 100, 0]);
    expect(svg.getViewportByCanvas([0, 0])).toBeCloseTo([-100, -100, 0]);

    const landmark2 = camera.createLandmark('landmark2', {
      // 视点坐标 / viewport coordinates
      focalPoint: [fx - 100, fy - 100, fz],
      // 相机坐标 / camera coordinates
      position: [px - 100, py - 100, pz],
    });

    await new Promise<void>((resolve) => {
      camera.gotoLandmark(landmark2, { onfinish: resolve });
    });

    expect(svg.getCanvasByViewport([0, 0])).toBeCloseTo([-100, -100, 0]);
    expect(svg.getViewportByCanvas([0, 0])).toBeCloseTo([100, 100, 0]);

    expect([...camera.getFocalPoint()]).toBeCloseTo([150, 150, 0]);
    expect([...camera.getPosition()]).toBeCloseTo([150, 150, 500]);
  });

  it('cursor', async () => {
    const graph = createGraph({
      cursor: 'progress',
    });

    await graph.draw();

    expect(graph.getCanvas().getConfig().cursor).toEqual('progress');
  });

  it('layers', () => {
    const singleLayerCanvas = createGraphCanvas(document.getElementById('container'), 500, 500, 'svg', {
      enableMultiLayer: false,
    });
    expect(Object.keys(singleLayerCanvas.getLayers())).toEqual(['main']);

    const multiLayerCanvas = createGraphCanvas(document.getElementById('container'), 500, 500, 'svg');
    expect(Object.keys(multiLayerCanvas.getLayers())).toEqual(['background', 'main', 'label', 'transient']);
  });
});
