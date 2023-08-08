import G6 from '../../../src/index';
import { container, data, height, width } from '../../datasets/const';

export default () => {
  return new G6.Graph({
    container,
    width,
    height,
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'd3force',
      animated: true,
      center: [250, 250],
      preventOverlap: true,
      nodeSize: 20,
    },
  });
};
