import { Canvas } from '@antv/g';
import G6 from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { RendererName } from '../../../src/types/render';

export default ({
  container,
  renderer,
  canvas,
  transientCanvas,
  backgroundCanvas,
  width,
  height,
}: Partial<{
  container: HTMLElement;
  renderer: RendererName;
  canvas: Canvas;
  transientCanvas: Canvas;
  backgroundCanvas: Canvas;
  width: number;
  height: number;
}>) => {
  return new G6.Graph({
    container,
    renderer,
    canvas,
    transientCanvas,
    backgroundCanvas,
    width,
    height,
    type: 'graph',
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
