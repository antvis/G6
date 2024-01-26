import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import * as cases from './demo';
import type { TestCase } from './demo/types';

window.onload = () => {
  const casesSelect = document.getElementById('demo-select') as HTMLSelectElement;
  const rendererSelect = document.getElementById('renderer-select') as HTMLSelectElement;

  const handleChange = () => {
    initialize();
    const testCase = cases[casesSelect.value];
    const rendererName = rendererSelect.value;
    onchange(testCase, rendererName);
  };

  casesSelect.onchange = handleChange;
  rendererSelect.onchange = handleChange;

  loadCasesList(casesSelect);

  handleChange();
};

function loadCasesList(select: HTMLSelectElement) {
  Object.keys(cases).forEach((key) => {
    const option = document.createElement('option');
    option.value = key;
    option.text = key;
    select.appendChild(option);
  });
}

function onchange(testCase: TestCase, rendererName: string) {
  const renderer = getRenderer(rendererName);
  testCase({ renderer, width: 500, height: 500, container: document.getElementById('container')! });
}

function getRenderer(rendererName: string) {
  switch (rendererName) {
    case 'webgl':
      return () => new WebGLRenderer();
    case 'svg':
      return () => new SVGRenderer();
    case 'canvas':
      return () => new CanvasRenderer();
    default:
      return undefined;
  }
}

function initialize() {
  document.getElementById('container')?.remove();
  const container = document.createElement('div');
  container.id = 'container';
  container.style.width = '500px';
  container.style.height = '500px';
  document.getElementById('app')?.appendChild(container);
}
