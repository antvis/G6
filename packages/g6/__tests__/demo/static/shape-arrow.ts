import { Circle, Image } from '@antv/g';
import { Arrow } from '../../../src/elements/shapes';
import type { StaticTestCase } from '../types';

export const shapeArrow: StaticTestCase = async (context) => {
  const { canvas } = context;

  await canvas.init();

  const arrowTypes = ['triangle', 'circle', 'diamond', 'vee', 'rect', 'triangleRect', 'simple'];

  arrowTypes.forEach((arrowType, index) => {
    canvas.appendChild(
      new Arrow({
        style: {
          x: 100 + 50 * index,
          y: 100,
          width: 25,
          height: 25,
          type: arrowType,
        },
      }),
    );
  });

  canvas.appendChild(
    new Arrow({
      style: {
        x: 100,
        y: 200,
        width: 25,
        height: 25,
      },
    }),
  );

  canvas.appendChild(
    new Arrow({
      style: {
        x: 100,
        y: 300,
        type: 'custom',
        custom: new Image({
          style: {
            width: 50,
            height: 50,
            src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
            anchor: '0.5 0.5',
            transformOrigin: 'center',
            transform: 'rotate(90deg)',
          },
        }),
      },
    }),
  );

  canvas.appendChild(
    new Arrow({
      style: {
        x: 200,
        y: 300,
        type: 'custom',
        custom: new Circle({
          style: {
            r: 25,
            anchor: '0.5 0.5',
            transformOrigin: 'center',
            stroke: '#1890FF',
            lineWidth: 2,
          },
        }),
      },
    }),
  );
};
