import { Rect } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const nodeRect: StaticTestCase = async (context) => {
  const { canvas } = context;

  const c1 = new Rect({
    style: {
      // key
      x: 100,
      y: 100,
      fill: 'green',
      width: 80,
      height: 80,
    },
  });

  const c2 = new Rect({
    style: {
      // key
      x: 300,
      y: 100,
      fill: 'red',
      width: 80,
      height: 40,
      // label
      labelText: 'rect node',
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
        { position: [0, 0.5], r: 2, stroke: 'black', lineWidth: 1, zIndex: 2 },
        { position: [1, 0.5], r: 2, stroke: 'yellow', lineWidth: 2, zIndex: 2 },
        { position: [0.5, 0], r: 2, stroke: 'green', lineWidth: 1, zIndex: 2 },
        { position: [0.5, 1], r: 2, stroke: 'grey', lineWidth: 1, zIndex: 2 },
      ],
      // icon
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      iconWidth: 32,
      iconHeight: 32,
      // halo
      haloOpacity: 0.4,
      haloStroke: 'grey',
      haloLineWidth: 12,
    },
  });

  const c3 = new Rect({
    style: {
      // key
      x: 100,
      y: 300,
      fill: 'pink',
      width: 40,
      height: 80,
      // icon
      iconText: 'Y',
      iconFontSize: 32,
      iconFill: 'black',
    },
  });

  canvas.appendChild(c1);
  canvas.appendChild(c2);
  canvas.appendChild(c3);
};
