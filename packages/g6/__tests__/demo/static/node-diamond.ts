import { Diamond } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const nodeDiamond: StaticTestCase = async (context) => {
  const { canvas } = context;

  const diamond_1 = new Diamond({
    style: {
      // key
      x: 100,
      y: 100,
      fill: 'green',
      width: 40,
      height: 40,
      label: false,
      labelText: 'not show',
    },
  });

  const diamond_2 = new Diamond({
    style: {
      // key
      x: 300,
      y: 100,
      fill: 'red',
      width: 100,
      height: 100,
      lineWidth: 1,
      stroke: 'blue',
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
      halo: true,
      haloOpacity: 0.4,
      haloStroke: 'grey',
      haloLineWidth: 10,
      haloPointerEvents: 'none',
    },
  });

  const diamond_3 = new Diamond({
    style: {
      // key
      x: 100,
      y: 300,
      fill: 'pink',
      width: 80,
      height: 40,
      // icon
      iconText: 'Haha',
      iconFontSize: 14,
      iconFill: 'black',
      // label
      labelText: 'this is a looooog label',
    },
  });

  canvas.appendChild(diamond_1);
  canvas.appendChild(diamond_2);
  canvas.appendChild(diamond_3);
};
