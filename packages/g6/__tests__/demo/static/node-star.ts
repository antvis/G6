import { Star } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const nodeStar: StaticTestCase = async (context) => {
  const { canvas } = context;

  const s1 = new Star({
    style: {
      // key
      x: 100,
      y: 100,
      fill: 'green',
      outerR: 48,
      innerR: 24,
    },
  });

  const s2 = new Star({
    style: {
      // key
      x: 300,
      y: 100,
      fill: 'red',
      outerR: 64,
      innerR: 32,
      // label
      labelText: 'circle node',
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
        { position: 'left-bottom', r: 2, stroke: 'grey', lineWidth: 4, zIndex: 2 },
        { position: 'right-bottom', r: 2, stroke: 'grey', lineWidth: 2, zIndex: 2 },
      ],
      // icon
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      iconWidth: 32,
      iconHeight: 32,
      // halo
      haloOpacity: 0.4,
      haloStroke: 'grey',
      haloLineWidth: 12,
      haloPointerEvents: 'none',
    },
  });

  const s3 = new Star({
    style: {
      // key
      x: 300,
      y: 300,
      fill: 'pink',
      outerR: 64,
      innerR: (64 * 3) / 8,
      // icon
      iconText: 'Y',
      iconFontSize: 32,
      iconFill: 'black',
    },
  });

  await canvas.init();

  canvas.appendChild(s1);
  canvas.appendChild(s2);
  canvas.appendChild(s3);
};
