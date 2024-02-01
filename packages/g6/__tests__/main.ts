import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import '../src/preset';
import { Canvas } from '../src/runtime/canvas';
import * as animations from './demo/animation';
import * as statics from './demo/static';

type TestCase = (...args: unknown[]) => void;

const CASES = {
  statics,
  animations,
} as unknown as { [key: string]: Record<string, TestCase> };

window.onload = () => {
  const casesSelect = document.getElementById('demo-select') as HTMLSelectElement;
  const rendererSelect = document.getElementById('renderer-select') as HTMLSelectElement;

  function handleChange() {
    initialize();
    const [type, testCase] = casesSelect.value.split('-');
    const renderer = rendererSelect.value;
    setParamsToSearch({ type, case: testCase, renderer });
    onchange(CASES[type][testCase], renderer);
  }

  casesSelect.onchange = handleChange;
  rendererSelect.onchange = handleChange;
  loadCasesList(casesSelect);
  getParamsFromSearch();
  handleChange();
};

function loadCasesList(select: HTMLSelectElement) {
  Object.entries(CASES).forEach(([type, cases]) => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = type;
    select.appendChild(optgroup);
    Object.keys(cases).forEach((key) => {
      const option = document.createElement('option');
      option.value = `${type}-${key}`;
      option.text = key;
      optgroup.appendChild(option);
    });
  });
}

function onchange(testCase: TestCase, rendererName: string) {
  const renderer = getRenderer(rendererName);
  testCase({
    canvas: new Canvas({
      width: 500,
      height: 500,
      container: document.getElementById('container')!,
      renderer,
    }),
  });
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
  document.getElementById('app')?.appendChild(container);
}

function getParamsFromSearch() {
  const searchParams = new URLSearchParams(window.location.search);
  const type = searchParams.get('type') || 'statics';
  const testCase = searchParams.get('case') || Object.keys(statics)[0];
  const rendererName = searchParams.get('renderer') || 'canvas';

  const casesSelect = document.getElementById('demo-select') as HTMLSelectElement;
  const rendererSelect = document.getElementById('renderer-select') as HTMLSelectElement;

  casesSelect.value = `${type}-${testCase}`;
  rendererSelect.value = rendererName;
}

function setParamsToSearch(options: { type: string; case: string; renderer: string }) {
  const { type, case: testCase, renderer } = options;
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('type', type);
  searchParams.set('case', testCase);
  searchParams.set('renderer', renderer);
  window.history.replaceState(null, '', `?${searchParams.toString()}`);
}
