import '../src/preset';
import * as animations from './demo/animation';
import * as statics from './demo/static';
import type { TestCase } from './demo/types';
import { createGraphCanvas } from './mock';

const CASES = {
  statics,
  animations,
} as unknown as { [key: string]: Record<string, TestCase> };

window.onload = () => {
  const casesSelect = document.getElementById('demo-select') as HTMLSelectElement;
  const rendererSelect = document.getElementById('renderer-select') as HTMLSelectElement;
  const animationCheckbox = document.getElementById('animation-checkbox') as HTMLInputElement;
  const reload = document.getElementById('reload-button') as HTMLButtonElement;

  function handleChange() {
    unmountCustomPanel();
    initialize();
    const [type, testCase] = casesSelect.value.split('-');
    const renderer = rendererSelect.value;
    const animation = animationCheckbox.checked;
    setParamsToSearch({ type, case: testCase, renderer, animation });
    const caseFn = CASES[type][testCase];
    onchange(caseFn, renderer, animation).then(() => {
      mountCustomPanel(caseFn.form);
    });
  }

  casesSelect.onchange = handleChange;
  rendererSelect.onchange = handleChange;
  animationCheckbox.onchange = handleChange;
  reload.onclick = handleChange;
  loadCasesList(casesSelect);
  syncParamsFromSearch();
  handleChange();
};

function loadCasesList(select: HTMLSelectElement) {
  console.log(1111, CASES);
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

function onchange(testCase: TestCase, renderer: string, animation: boolean) {
  const canvas = createGraphCanvas(document.getElementById('container'), 500, 500, renderer);

  return canvas.init().then(async () => {
    await testCase({ canvas, animation, env: 'dev' });
  });
}

function initialize() {
  document.getElementById('container')?.remove();
  const container = document.createElement('div');
  container.id = 'container';
  document.getElementById('app')?.appendChild(container);
}

function syncParamsFromSearch() {
  const searchParams = new URLSearchParams(window.location.search);
  const type = searchParams.get('type') || 'statics';
  const testCase = searchParams.get('case') || Object.keys(statics)[0];
  const rendererName = searchParams.get('renderer') || 'canvas';
  const animation = searchParams.get('animation') || 'true';

  const casesSelect = document.getElementById('demo-select') as HTMLSelectElement;
  const rendererSelect = document.getElementById('renderer-select') as HTMLSelectElement;
  const animationCheckbox = document.getElementById('animation-checkbox') as HTMLInputElement;

  casesSelect.value = `${type}-${testCase}`;
  rendererSelect.value = rendererName;
  animationCheckbox.checked = animation === 'true';
}

function setParamsToSearch(options: { type: string; case: string; renderer: string; animation: boolean }) {
  const { type, case: testCase, renderer, animation } = options;
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('type', type);
  searchParams.set('case', testCase);
  searchParams.set('renderer', renderer);
  searchParams.set('animation', animation.toString());
  window.history.replaceState(null, '', `?${searchParams.toString()}`);
}

function mountCustomPanel(form: TestCase['form'] = []) {
  const customPanel = document.getElementById('custom-panel')!;

  form.forEach(({ label, type, options = {}, onload }) => {
    if (label) {
      const labelEl = document.createElement('label');
      labelEl.textContent = label;
      customPanel.appendChild(labelEl);
    }

    const element = document.createElement(type);
    Object.assign(element, options);
    customPanel.appendChild(element);

    onload?.(element);
  });
}

function unmountCustomPanel() {
  const customPanel = document.getElementById('custom-panel')!;
  customPanel.innerHTML = '';
}
