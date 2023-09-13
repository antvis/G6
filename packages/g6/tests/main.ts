import { DataURLType } from '@antv/g';
import * as graphs from './demo/index';

let graph: any;
let imageType: DataURLType = "image/png"

// Select for renderers.
const $rendererSelect = document.getElementById(
  'renderer-select',
) as HTMLSelectElement;
$rendererSelect.onchange = async () => {
  graph = await render();
};
const $imageSelect = document.getElementById(
  'image-select',
) as HTMLSelectElement;
const $imageSelectDownloadButton = document.getElementById(
  'image-download-button',
) as HTMLSelectElement;
const $fullImageSelectDownloadButton = document.getElementById(
  'full-image-download-button',
) as HTMLSelectElement;
$rendererSelect.onchange = async () => {
  graph = await render();
};
$imageSelect.onchange = () => {
  imageType = $imageSelect.value as DataURLType
};
$imageSelectDownloadButton.onclick = ()=>{
  if(graph){
    graph.downloadImage($demoSelect.value, imageType);
  }
}
$fullImageSelectDownloadButton.onclick = ()=>{
  if(graph){
    graph.downloadFullImage($demoSelect.value, imageType, {padding: 10});
  }
}

const render = async () => {
  if (graph) {
    graph.destroy();
    graph = null;
  }

  const $container = document.getElementById('container');
  $container?.replaceChildren('');

  return await graphs[$demoSelect.value]({
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
$demoSelect.onchange = async (e) => {
  const { value } = e.target as HTMLOptionElement;
  history.pushState({ value }, '', `?name=${value}`);
  graph = await render();
};

// 初始化
const params = new URL(location.href).searchParams;
const initialExampleName = params.get('name');
$demoSelect.value = initialExampleName || $options[0].value;
graph = await render();
