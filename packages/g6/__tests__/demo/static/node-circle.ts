import { Circle } from '../../../src/elements/nodes';
import type { StaticTestCase } from '../types';

export const nodeCircle: StaticTestCase = async (context) => {
  const { canvas } = context;

  const c1 = new Circle({
    // @ts-ignore
    style: {
      // key
      cx: 100,
      cy: 100,
      fill: 'red',
      r: 40,
      // label
      labelText: 'circle node',
      labelFontSize: 14,
      labelFill: 'pink',
      labelPosition: 'bottom',
      // badge
      badgeOptions: [],
      // anchor
      anchorOptions: [],
      // icon
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      iconWidth: 32,
      iconHeight: 32,
      // halo
      haloOpacity: 0.4,
    },
  });

  await canvas.init();

  canvas.appendChild(c1);
};
