import { Triangle } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const nodeTriangle: StaticTestCase = async (context) => {
  const { canvas } = context;

  const t1 = new Triangle({
    style: {
      r: 48,
      direction: 'up',
      x: 100,
      y: 100,
      fill: 'green',
    },
  });

  const s2 = new Triangle({
    style: {
      // key
      x: 300,
      y: 100,
      fill: 'red',
      r: 48,
      direction: 'up',
      // label
      labelText: 'triangle node',
      labelFontSize: 14,
      labelFill: 'pink',
      labelPosition: 'bottom',
      // badge
      badgeOptions: [
        { text: 'A', position: 'right-top', backgroundFill: 'grey', fill: 'white', fontSize: 10, padding: [1, 4] },
        { text: 'Important', position: 'right', backgroundFill: 'blue', fill: 'white', fontSize: 10 },
        { text: 'Notice', position: 'left-bottom', backgroundFill: 'red', fill: 'white', fontSize: 10 },
      ],
      // anchor
      anchorOptions: [
        { position: 'left', r: 2, stroke: 'black', lineWidth: 1, zIndex: 2 },
        { position: 'right', r: 2, stroke: 'yellow', lineWidth: 2, zIndex: 2 },
        { position: 'top', r: 2, stroke: 'green', lineWidth: 1, zIndex: 2 },
      ],
      // icon
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      iconWidth: 30,
      iconHeight: 30,
      // halo
      haloOpacity: 0.4,
      haloStroke: 'grey',
      haloLineWidth: 12,
      haloPointerEvents: 'none',
    },
  });

  const s3 = new Triangle({
    style: {
      // key
      x: 300,
      y: 300,
      fill: 'pink',
      r: 48,
      direction: 'up',
      // icon
      iconText: 'Y',
      iconFontSize: 30,
      iconFill: 'black',
    },
  });

  canvas.appendChild(t1);
  canvas.appendChild(s2);
  canvas.appendChild(s3);
};
