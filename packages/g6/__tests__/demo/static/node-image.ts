import { Image } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const nodeImage: StaticTestCase = async (context) => {
  const { canvas } = context;

  const i1 = new Image({
    style: {
      // key
      x: 100,
      y: 100,
      fill: 'green',
      width: 80,
      height: 80,
      // image
      src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
    },
  });

  const i2 = new Image({
    style: {
      // key
      x: 300,
      y: 100,
      fill: 'red',
      width: 80,
      height: 80,
      // image
      src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      // label
      labelText: 'image node',
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
      // halo
      haloOpacity: 0.4,
      haloStroke: 'grey',
      haloLineWidth: 12,
      haloPointerEvents: 'none',
    },
  });

  const i3 = new Image({
    style: {
      // key
      x: 100,
      y: 300,
      fill: 'pink',
      width: 80,
      height: 80,
      // image
      src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      // icon
      iconText: 'Y',
      iconFontSize: 32,
      iconFill: 'black',
    },
  });

  canvas.appendChild(i1);
  canvas.appendChild(i2);
  canvas.appendChild(i3);
};
