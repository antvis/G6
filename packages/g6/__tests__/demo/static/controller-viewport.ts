import { Line } from '@antv/g';
import { ViewportController } from '../../../src/runtime/viewport';
import type { StaticTestCase } from '../types';
import { assert } from '../utils';

export const controllerViewport: StaticTestCase = async (context) => {
  const { canvas } = context;

  await canvas.init();

  canvas.appendChild(
    new Line({
      style: {
        x1: 250 - 50,
        y1: 250,
        x2: 250 + 50,
        y2: 250,
        lineWidth: 2,
        stroke: 'red',
      },
    }),
  );

  canvas.appendChild(
    new Line({
      style: {
        x1: 250,
        y1: 250 - 50,
        x2: 250,
        y2: 250 + 50,
        lineWidth: 2,
        stroke: 'green',
      },
    }),
  );

  const viewportController = new ViewportController({
    canvas,
    graph: { emit: () => {} } as any,
    options: {},
    dataController: {} as any,
  });
  assert(viewportController.getViewportCenter()).toCloseTo([250, 250]);
  // 起始中心坐标 [250, 250]

  const effectTiming = undefined; // { duration: 500 };

  await viewportController.translate({ mode: 'absolute', value: [25, 25] }, effectTiming); // 当前坐标 [275, 275]
  assert(viewportController.getViewportCenter()).toCloseTo([275, 275]);

  await viewportController.translate({ mode: 'relative', value: [25, 25] }, effectTiming); // 当前坐标 [300, 300]
  assert(viewportController.getViewportCenter()).toCloseTo([300, 300]);

  await viewportController.rotate({ mode: 'absolute', value: 45, origin: [300, 300] }, effectTiming); // 沿 [300, 300] 旋转 45 度，当前坐标 [300, 300]

  await viewportController.rotate({ mode: 'relative', value: 45 }, effectTiming); // 沿 [250, 250] 旋转 45 度，当前坐标 [250 + 50 * 2**0.5, 250]

  assert(viewportController.getViewportCenter()).toCloseTo([250 + 50 * 2 ** 0.5, 250]);

  // 以当前坐标系为基准，缩放比例为 1.2，缩放中心点为 [250 + 50 * 2**0.5, 250]
  await viewportController.zoom({ mode: 'absolute', value: 1.2, origin: [250 + 50 * 2 ** 0.5, 250] }, effectTiming);

  // 继续沿当前点缩放 1.2 倍
  await viewportController.zoom({ mode: 'relative', value: 1.2, origin: [250 + 50 * 2 ** 0.5, 250] }, effectTiming);

  // 此时边长度为：100 * 1.2 * 1.2 = 144，坐标为 [250 + 50 * 2**0.5, 250]
  assert(viewportController.getZoom()).toBe(1.44);
};
