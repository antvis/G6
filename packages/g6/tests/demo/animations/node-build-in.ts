import G6 from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const { width, height } = context;
  return new G6.Graph({
    ...context,
    type: 'graph',
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'circular',
      center: [width! / 2, height! / 2],
      radius: 200,
    },
    node: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          animates: {
            buildIn: [
              {
                fields: ['opacity'],
                duration: 2000,
                fill: 'both',
                delay: 0,
              },
            ],
          },
        },
      };
    },
  });
};
