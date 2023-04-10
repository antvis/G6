import G6 from '../../../src/index';
import { container, data, height, width } from '../../datasets/const';

export default () => {
  return new G6.Graph({
    container,
    width,
    height,
    type: 'graph',
    data,
    layout: {
      type: 'circular',
      center: [250, 250],
      radius: 200,
    },
  });
};
