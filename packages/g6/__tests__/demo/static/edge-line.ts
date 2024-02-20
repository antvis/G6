import { Line } from '../../../src/elements/edges';
import type { StaticTestCase } from '../types';

export const edgeLine: StaticTestCase = async (context) => {
  const { canvas } = context;

  const line1 = new Line({
    style: {
      // key shape
      sourcePoint: [100, 50],
      targetPoint: [300, 50],
      stroke: '#1890FF',
      lineWidth: 2,
      cursor: 'pointer',
      // halo
      halo: false,
      haloOpacity: 0.25,
      haloLineWidth: 12,
      // label
      label: true,
      labelText: 'line-edge',
      labelFontSize: 12,
      // start arrow
      startArrow: true,
      startArrowType: 'diamond',
      // end arrow
      endArrow: false,
    },
  });

  const line2 = new Line({
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
      label: true,
      labelText: 'line-edge',
      labelFontSize: 12,
      labelFill: '#000',
      labelPadding: 0,
      startArrow: true,
      startArrowType: 'circle',
    },
  });

  canvas.appendChild(line1);
  canvas.appendChild(line2);
  // canvas.appendChild(line3);
};
