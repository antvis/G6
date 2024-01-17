import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import G6 from '../../../src/index';
import { RendererName } from '../../../src/types/render';
import { data } from '../../datasets/dataset1';

export default ({
  container,
  renderer,
  width,
  height,
}: {
  container: HTMLElement;
  renderer: RendererName;
  canvas: Canvas;
  transientCanvas: Canvas;
  backgroundCanvas: Canvas;
  width: number;
  height: number;
}) => {
  const $backgroundCanvas = document.createElement('canvas');
  const $canvas = document.createElement('canvas');
  const $transientCanvas = document.createElement('canvas');
  container?.appendChild($backgroundCanvas);
  container?.appendChild($canvas);
  container?.appendChild($transientCanvas);

  [$backgroundCanvas, $canvas, $transientCanvas].forEach(($domElement, i) => {
    $domElement.width = 2 * 500;
    $domElement.height = 2 * 500;
    $domElement.style.width = '500px';
    $domElement.style.height = '500px';
    $domElement.style.position = 'fixed';
    $domElement.style.outline = 'none';
    $domElement.tabIndex = 1; // Enable keyboard events
    // Transient canvas should let interactive events go through.
    if (i === 2) {
      $domElement.style.pointerEvents = 'none';
    }
  });

  const backgroundCanvas = new Canvas({
    canvas: $backgroundCanvas,
    width: 500,
    height: 500,
    renderer: new Renderer(),
  });
  const canvas = new Canvas({
    canvas: $canvas,
    width: 500,
    height: 500,
    renderer: new Renderer(),
  });
  const transientCanvas = new Canvas({
    canvas: $transientCanvas,
    width: 500,
    height: 500,
    renderer: new Renderer(),
  });

  return new G6.Graph({
    canvas,
    transientCanvas,
    backgroundCanvas,
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
