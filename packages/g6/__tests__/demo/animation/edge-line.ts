import { Line } from '../../../src/elements/edges';
import type { AnimationTestCase } from '../types';

export const edgeLine: AnimationTestCase = async (context) => {
  const { canvas } = context;

  const line = new Line({
    style: {
      sourcePoint: [100, 150],
      targetPoint: [300, 200],
      lineWidth: 2,
      lineDash: [10, 10],
      stroke: '#1890FF',
      cursor: 'pointer',
      halo: true,
      haloOpacity: 0.25,
      haloLineWidth: 12,
      haloPointerEvents: 'none',
      haloZIndex: -1,
      haloDroppable: false,
      label: true,
      labelText: 'line-edge',
      labelFontSize: 12,
      labelFill: '#000',
      labelPadding: 0,
      startArrow: true,
      startArrowType: 'circle',
      endArrow: true,
      endArrowFill: 'red',
    },
  });

  await canvas.init();

  canvas.appendChild(line);

  const result = line.animate(
    [
      { sourcePoint: [100, 150], targetPoint: [300, 200], haloOpacity: 0 },
      { sourcePoint: [100, 150], targetPoint: [450, 350], haloOpacity: 0.25 },
    ],
    { duration: 1000, fill: 'both' },
  );

  return result;
};

edgeLine.times = [0, 1000];
