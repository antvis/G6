// import { Canvas } from '@antv/g';
// import { Renderer as CanvasRenderer } from '@antv/g-canvas';
// import { Renderer as SVGRenderer } from '@antv/g-svg';
// import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import * as graphs from './demo/index';

// /**
//  * The renderers provided by G.
//  */
// const renderers = {
//   canvas: CanvasRenderer,
//   svg: SVGRenderer,
//   webgl: WebGLRenderer,
// };

let graph: any;

// Select for renderers.
const $rendererSelect = document.getElementById(
  'renderer-select',
) as HTMLSelectElement;
$rendererSelect.onchange = () => {
  graph = render();
};

const render = () => {
  if (graph) {
    graph.destroy();
    graph = null;
  }

  // const $backgroundCanvas = document.createElement('canvas');
  // $backgroundCanvas.style.position = 'absolute';
  // const $canvas = document.createElement('canvas');
  // $canvas.style.position = 'absolute';
  // const $transientCanvas = document.createElement('canvas');
  // $transientCanvas.style.position = 'absolute';

  const $container = document.getElementById('container');
  $container?.replaceChildren('');
  // container?.appendChild($backgroundCanvas);
  // container?.appendChild($canvas);
  // container?.appendChild($transientCanvas);

  // const backgroundCanvas = new Canvas({
  //   canvas: $backgroundCanvas,
  //   width: 500,
  //   height: 500,
  //   renderer: new renderers[$rendererSelect.value](),
  // });
  // const canvas = new Canvas({
  //   canvas: $canvas,
  //   width: 500,
  //   height: 500,
  //   renderer: new renderers[$rendererSelect.value](),
  // });
  // const transientCanvas = new Canvas({
  //   canvas: $transientCanvas,
  //   width: 500,
  //   height: 500,
  //   renderer: new renderers[$rendererSelect.value](),
  // });

  return graphs[$demoSelect.value]({
    container: $container,
    renderer: $rendererSelect.value,
    backgroundCanvas: null,
    canvas: null,
    transientCanvas: null,
    width: 500,
    height: 500,
  });
};

// Select for DEMO
const $demoSelect = document.getElementById('demo-select') as HTMLSelectElement;
const $options = Object.keys(graphs).map((key) => {
  const $option = document.createElement('option');
  $option.value = key;
  $option.textContent = key;
  return $option;
});
$demoSelect.replaceChildren(...$options);
$demoSelect.onchange = (e) => {
  const { value } = e.target as HTMLOptionElement;
  history.pushState({ value }, '', `?name=${value}`);
  graph = render();
};

// 初始化
const params = new URL(location.href).searchParams;
const initialExampleName = params.get('name');
$demoSelect.value = initialExampleName || $options[0].value;
graph = render();
