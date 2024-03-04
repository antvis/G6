import { parsePoint } from '@/src/utils/point';
import { createGraphCanvas } from '@@/utils';

describe('Canvas', () => {
  const svg = createGraphCanvas(null, 500, 500, 'svg');
  beforeAll(async () => {
    await svg.init();
  });

  it('getRendererType', () => {
    expect(svg.getRendererType()).toBe('svg');
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
    expect(parsePoint(svg.viewport2Client({ x: 0, y: 0 }))).toBeCloseTo([0, 0]);
    expect(parsePoint(svg.viewport2Canvas({ x: 0, y: 0 }))).toBeCloseTo([0, 0]);

    expect(parsePoint(svg.client2Viewport({ x: 0, y: 0 }))).toBeCloseTo([0, 0]);
    expect(parsePoint(svg.canvas2Viewport({ x: 0, y: 0 }))).toBeCloseTo([0, 0]);

    const camera = svg.getCamera();
    camera.pan(100, 100);
    expect([...camera.getPosition()]).toBeCloseTo([350, 350, 500]);
    expect([...camera.getFocalPoint()]).toBeCloseTo([250, 250, 0]);
    expect(parsePoint(svg.viewport2Canvas({ x: 0, y: 0 }))).toBeCloseTo([100, 100]);
    expect(parsePoint(svg.canvas2Viewport({ x: 0, y: 0 }))).toBeCloseTo([-100, -100]);

    // camera pan 采用相对移动
    camera.pan(-200, -200);
    // focal point wont change
    // expect([...camera.getFocalPoint()]).toBeCloseTo([250, 250, 0]);
    expect([...camera.getPosition()]).toBeCloseTo([150, 150, 500]);
    expect(parsePoint(svg.viewport2Canvas({ x: 0, y: 0 }))).toBeCloseTo([-100, -100]);
    expect(parsePoint(svg.canvas2Viewport({ x: 0, y: 0 }))).toBeCloseTo([100, 100]);

    // move to origin
    camera.pan(100, 100);

    camera.pan(-100, -100);
    expect(parsePoint(svg.viewport2Canvas({ x: 0, y: 0 }))).toBeCloseTo([-100, -100]);

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

    expect(parsePoint(svg.viewport2Canvas({ x: 0, y: 0 }))).toBeCloseTo([100, 100]);
    expect(parsePoint(svg.canvas2Viewport({ x: 0, y: 0 }))).toBeCloseTo([-100, -100]);

    const landmark2 = camera.createLandmark('landmark2', {
      // 视点坐标 / viewport coordinates
      focalPoint: [fx - 100, fy - 100, fz],
      // 相机坐标 / camera coordinates
      position: [px - 100, py - 100, pz],
    });

    await new Promise<void>((resolve) => {
      camera.gotoLandmark(landmark2, { onfinish: resolve });
    });

    expect(parsePoint(svg.viewport2Canvas({ x: 0, y: 0 }))).toBeCloseTo([-100, -100]);
    expect(parsePoint(svg.canvas2Viewport({ x: 0, y: 0 }))).toBeCloseTo([100, 100]);

    expect([...camera.getFocalPoint()]).toBeCloseTo([150, 150, 0]);
    expect([...camera.getPosition()]).toBeCloseTo([150, 150, 500]);
  });
});
