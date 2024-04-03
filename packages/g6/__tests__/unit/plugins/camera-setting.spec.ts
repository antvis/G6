import { pluginCameraSetting } from '@@/demos';
import { createDemoGraph } from '@@/utils';
import { CameraProjectionMode } from '@antv/g';

describe('plugin camera-setting', () => {
  it('camera-setting orthographic', async () => {
    const graph = await createDemoGraph(pluginCameraSetting);
    const camera = graph.getCanvas().getCamera();
    expect(camera.getProjectionMode()).toBe(CameraProjectionMode.ORTHOGRAPHIC);
    expect([...camera.getPosition()]).toBeCloseTo([250, 250, 500]);
    // 视点位置 / Focal point
    expect([...camera.getFocalPoint()]).toBeCloseTo([250, 250, 0]);
    expect(camera.getDistance()).toBe(500);
    expect(camera.getNear()).toBe(0.1);
    expect(camera.getFar()).toBe(1000);
    expect(camera.getZoom()).toBe(1);
    graph.destroy();
  });

  it('camera-setting perspective', async () => {
    const graph = await createDemoGraph(pluginCameraSetting);
    graph.updatePlugin({
      key: 'camera-setting',
      type: 'camera-setting',
      projectionMode: 'perspective',
      near: 0.01,
      far: 50000,
      fov: 75,
      aspect: 'auto',
      distance: 1000,
    });

    const camera = graph.getCanvas().getCamera();
    expect(camera.getProjectionMode()).toBe(CameraProjectionMode.PERSPECTIVE);
    expect([...camera.getPosition()]).toBeCloseTo([250, 250, 1000]);
    // 视点位置 / Focal point
    expect([...camera.getFocalPoint()]).toBeCloseTo([250, 250, 0]);
    expect(camera.getDistance()).toBe(1000);
    expect(camera.getNear()).toBe(0.01);
    expect(camera.getFar()).toBe(50000);
    expect(camera.getZoom()).toBe(1);
    graph.destroy();
  });

  it.only('camera-setting perspective orbiting azimuth', async () => {
    const graph = await createDemoGraph(pluginCameraSetting);
    graph.updatePlugin({
      key: 'camera-setting',
      type: 'camera-setting',
      cameraType: 'orbiting',
      projectionMode: 'perspective',
      roll: 0,
      elevation: 45,
      azimuth: 0,
    });

    const camera = graph.getCanvas().getCamera();
    expect(camera.getProjectionMode()).toBe(CameraProjectionMode.PERSPECTIVE);

    // 相机以视点为中心，沿 y 轴顺时针旋转 45 度
    // The camera rotates 45 degrees clockwise along the positive y-axis with the focal point as the center
    const delta = 500 / Math.sqrt(2);
    expect([...camera.getPosition()]).toBeCloseTo([250, 250 + delta, delta]);
    // 视点位置 / Focal point
    expect([...camera.getFocalPoint()]).toBeCloseTo([250, 250, 0]);

    graph.updatePlugin({
      key: 'camera-setting',
      type: 'camera-setting',
      roll: 0,
      elevation: 0,
      azimuth: 45,
    });
    // 相机以视点为中心，沿 z 轴逆时针旋转 45 度
    // The camera rotates 45 degrees counterclockwise along the positive z-axis with the focal point as the center
    expect([...camera.getPosition()]).toBeCloseTo([250 - delta, 250, delta]);

    graph.updatePlugin({
      key: 'camera-setting',
      type: 'camera-setting',
      roll: 180,
      elevation: 45,
      azimuth: 0,
    });
    expect([...camera.getPosition()]).toBeCloseTo([250, 250 + delta, delta]);

    expect(camera.getDistance()).toBeCloseTo(500);
    expect(camera.getNear()).toBe(0.1);
    expect(camera.getFar()).toBe(1000);
    expect(camera.getZoom()).toBe(1);
    graph.destroy();
  });
});
