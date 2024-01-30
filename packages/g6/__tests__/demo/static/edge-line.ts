import { Circle, Image } from '@antv/g';
import { Line } from '../../../src/elements/edges';
import type { StaticTestCase } from '../types';

export const edgeLine: StaticTestCase = async (context) => {
  const { canvas } = context;

  const line1 = new Line({
    style: {
      sourcePoint: { x: 100, y: 50 },
      targetPoint: { x: 300, y: 50 },
      stroke: '#1890FF',
      lineWidth: 2,
      cursor: 'pointer',
      halo: false,
      haloOpacity: 0.25,
      haloLineWidth: 12,
      haloPointerEvents: 'none',
      haloZIndex: -1,
      haloDroppable: false,
      label: true,
      labelText: 'line-edge',
      labelFontSize: 12,
      labelFill: '#1890FF',
      startArrow: false,
      endArrow: true,
    },
  });

  const line2 = new Line({
    style: {
      sourcePoint: { x: 100, y: 150 },
      targetPoint: { x: 300, y: 200 },
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

  const line3 = new Line({
    style: {
      sourcePoint: { x: 300, y: 300 },
      targetPoint: { x: 100, y: 250 },
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
      labelText: 'inverted-line-edge',
      labelFontSize: 12,
      labelFill: '#000',
      labelPadding: 0,
      startArrow: true,
      startArrowCtor: Image,
      startArrowWidth: 50,
      startArrowHeight: 50,
      startArrowSrc: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      startArrowAnchor: '0.5 0.5',
      startArrowTransformOrigin: 'center',
      startArrowTransform: 'rotate(90deg)',
      endArrow: true,
      endArrowCtor: Circle,
      endArrowR: 25,
      endArrowAnchor: '0.5 0.5',
      endArrowTransformOrigin: 'center',
      endArrowStroke: '#1890FF',
      endArrowLineWidth: 2,
    },
  });

  await canvas.init();

  canvas.appendChild(line1);
  canvas.appendChild(line2);
  canvas.appendChild(line3);
};
