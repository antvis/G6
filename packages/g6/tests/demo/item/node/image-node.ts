// import { Circle } from '@antv/g';
import { Graph } from '../../../../src/index';
import { TestCaseContext } from '../../interface';
import { data } from '../../../datasets/dataset1';

export default (context: TestCaseContext<HTMLImageElement>) => {
  const { width, height, extendedParams } = context;

  const cloned = JSON.parse(JSON.stringify(data));
  cloned.nodes.forEach((node) => {
    node.data.type = 'image-node';
  });

  const graph = new Graph({
    ...context,
    type: 'graph',
    data: cloned,
    layout: {
      type: 'circular',
      center: [width! / 2, height! / 2],
      radius: 200,
    },
    node: (innerModel) => {
      const { x, y } = innerModel.data;

      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          keyShape: {
            src:
              extendedParams ??
              'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
            // clipPath: new Circle({
            //   style: {
            //     cx: x,
            //     cy: y,
            //     r: 10,
            //   },
            // }),
          },
          labelShape: {
            text: innerModel.id,
          },
          // haloShape: {},
        },
      };
    },
  });
  return graph;
};
