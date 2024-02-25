import { ViewportController } from '@/src/runtime/viewport';
import { Line } from '@antv/g';
import type { StaticTestCase } from '../types';

export const controllerViewport: StaticTestCase = async (context) => {
  const { canvas, expect } = context;

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
    model: {} as any,
  });
  expect?.(viewportController.getViewportCenter()).toBeCloseTo([250, 250]);
  // 起始中心坐标 [250, 250]

  viewportController.translate({ mode: 'absolute', value: [25, 25] }); // 当前坐标 [275, 275]
  expect?.(viewportController.getViewportCenter()).toBeCloseTo([275, 275]);

  viewportController.translate({ mode: 'relative', value: [25, 25] }); // 当前坐标 [300, 300]
  expect?.(viewportController.getViewportCenter()).toBeCloseTo([300, 300]);

  viewportController.rotate({ mode: 'absolute', value: 45, origin: [300, 300] }); // 沿 [300, 300] 旋转 45 度，当前坐标 [300, 300]

  viewportController.rotate({ mode: 'relative', value: 45 }); // 沿 [250, 250] 旋转 45 度，当前坐标 [250 + 50 * 2**0.5, 250]

  expect?.(viewportController.getViewportCenter()).toBeCloseTo([250 + 50 * 2 ** 0.5, 250]);

  // 以当前坐标系为基准，缩放比例为 1.2，缩放中心点为 [250 + 50 * 2**0.5, 250]
  viewportController.zoom({ mode: 'absolute', value: 1.2, origin: [250 + 50 * 2 ** 0.5, 250] });

  // 继续沿当前点缩放 1.2 倍
  viewportController.zoom({ mode: 'relative', value: 1.2, origin: [250 + 50 * 2 ** 0.5, 250] });

  // 此时边长度为：100 * 1.2 * 1.2 = 144，坐标为 [250 + 50 * 2**0.5, 250]
  expect?.(viewportController.getZoom()).toBeCloseTo(1.44);

  const effectTiming = { duration: 500 };

  await viewportController.zoom({ mode: 'absolute', value: 1, origin: [250 + 50 * 2 ** 0.5, 250] }, effectTiming);

  expect?.(viewportController.getZoom()).toBeCloseTo(1);

  await viewportController.rotate({ mode: 'absolute', value: 0, origin: [250 + 50 * 2 ** 0.5, 250] }, effectTiming);

  await viewportController.translate({ mode: 'absolute', value: [0, 0] }, effectTiming);
  expect?.(viewportController.getViewportCenter()).toBeCloseTo([250, 250]);
};
