import { Line } from '../../../src/elements/edges';
import type { StaticTestCase } from '../types';

export const edgeLine: StaticTestCase = async (context) => {
  const { canvas } = context;

  const line1 = new Line({
    style: {
      x1: 100,
      y1: 50,
      x2: 300,
      y2: 50,
      stroke: '#1890FF',
      lineWidth: 2,
      cursor: 'pointer',
      showHalo: false,
      haloOpacity: 0.25,
      haloLineWidth: 12,
      haloPointerEvents: 'none',
      haloZIndex: -1,
      haloVisible: true,
      haloDroppable: false,
      showLabel: true,
      labelText: 'line-edge',
      labelFontSize: 12,
      labelFill: '#1890FF',
    },
  });

  const line2 = new Line({
    style: {
      x1: 100,
      y1: 150,
      x2: 300,
      y2: 200,
      lineWidth: 2,
      lineDash: [10, 10],
      stroke: '#F04864',
      cursor: 'pointer',
      showHalo: true,
      haloOpacity: 0.25,
      haloLineWidth: 12,
      haloPointerEvents: 'none',
      haloZIndex: -1,
      haloVisible: true,
      haloDroppable: false,
      showLabel: true,
      labelText: 'line-edge',
      labelFontSize: 12,
      labelFill: '#000',
      labelPadding: 0,
    },
  });

  const line3 = new Line({
    style: {
      x1: 300,
      y1: 300,
      x2: 100,
      y2: 250,
      lineWidth: 2,
      lineDash: [10, 10],
      stroke: '#F04864',
      cursor: 'pointer',
      showHalo: true,
      haloOpacity: 0.25,
      haloLineWidth: 12,
      haloPointerEvents: 'none',
      haloZIndex: -1,
      haloVisible: true,
      haloDroppable: false,
      showLabel: true,
      labelText: 'inverted-line-edge',
      labelFontSize: 12,
      labelFill: '#000',
      labelPadding: 0,
    },
  });

  await canvas.init();

  canvas.appendChild(line1);
  canvas.appendChild(line2);
  canvas.appendChild(line3);
};
