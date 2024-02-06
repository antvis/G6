import { Ellipse } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const nodeEllipse: StaticTestCase = async (context) => {
  const { canvas } = context;

  const ellipse_1 = new Ellipse({
    style: {
      // key
      x: 100,
      y: 100,
      fill: 'green',
      rx: '50',
      ry: '25',
    },
  });

  const ellipse_2 = new Ellipse({
    style: {
      // key
      x: 300,
      y: 100,
      fill: 'red',
      rx: 50,
      ry: 25,
      lineWidth: 5,
      stroke: 'black',
      // label
      labelText: 'ellipse node',
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
        { position: 'bottom', r: 2, stroke: 'blue', lineWidth: 2, zIndex: 2 },
      ],
      // icon
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      iconWidth: 32,
      iconHeight: 32,
      // halo
      halo: true,
      haloOpacity: 0.4,
      haloStroke: 'grey',
      haloLineWidth: 5,
      haloPointerEvents: 'none',
    },
  });

  const ellipse_3 = new Ellipse({
    style: {
      // key
      x: 300,
      y: 300,
      fill: 'pink',
      rx: 25,
      ry: 50,
      // icon
      iconText: 'Y',
      iconFontSize: 32,
      iconFill: 'black',
    },
  });

  canvas.appendChild(ellipse_1);
  canvas.appendChild(ellipse_2);
  canvas.appendChild(ellipse_3);
};
