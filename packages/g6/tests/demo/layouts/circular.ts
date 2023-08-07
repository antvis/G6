import { Canvas } from '@antv/g';
import G6 from '../../../src/index';
import { RendererName } from '../../../src/types/render';
import { data } from '../../datasets/dataset1';

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
      type: 'circular',
      center: [250, 250],
      radius: 200,
    },
  });
};
