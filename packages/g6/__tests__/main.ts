import '../src/preset';
import * as demos from './demo';
import type { TestCase } from './demo/types';
import { createGraphCanvas } from './utils';

const CASES = demos as unknown as { [key: string]: Record<string, TestCase> };

const casesSelect = document.getElementById('demo-select') as HTMLSelectElement;
const rendererSelect = document.getElementById('renderer-select') as HTMLSelectElement;
const animationCheckbox = document.getElementById('animation-checkbox') as HTMLInputElement;
const reload = document.getElementById('reload-button') as HTMLButtonElement;
const themeButton = document.getElementById('theme-button') as HTMLButtonElement;

window.onload = () => {
  function togglePanelTheme() {
    const theme = document.documentElement.getAttribute('data-theme') as string;
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  function handleChange() {
    unmountCustomPanel();
    initialize();
    const [type, testCase] = casesSelect.value.split('-');
    const renderer = rendererSelect.value;
    const animation = animationCheckbox.checked;
    setParamsToSearch({ type, case: testCase, renderer, animation });
    const caseFn = CASES[type][testCase];
    const theme = document.documentElement.getAttribute('data-theme') as string;
    onchange(caseFn, renderer, animation, theme).then(() => {
      mountCustomPanel(caseFn.form);
    });
  }

  casesSelect.onchange = handleChange;
  rendererSelect.onchange = handleChange;
  animationCheckbox.onchange = handleChange;
  themeButton.onclick = () => {
    togglePanelTheme();
    handleChange();
  };
  reload.onclick = handleChange;
  loadCasesList(casesSelect);
  syncParamsFromSearch();
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

function onchange(testCase: TestCase, renderer: string, animation: boolean, theme: string) {
  const canvas = createGraphCanvas(document.getElementById('container'), 500, 500, renderer);

  return canvas.init().then(async () => {
    const result = await testCase({ canvas, animation, theme, env: 'dev' });
    if (result?.totalDuration) setTimer(result.totalDuration);
    else clearTimer();
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
  const testCase = searchParams.get('case') || Object.keys(CASES.statics)[0];
  const rendererName = searchParams.get('renderer') || 'canvas';
  const animation = searchParams.get('animation') || 'true';

  casesSelect.value = `${type}-${testCase}`;
  rendererSelect.value = rendererName;
  animationCheckbox.checked = animation === 'true';
}

function setParamsToSearch(options: { type: string; case: string; renderer: string; animation: boolean }) {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(options).forEach(([key, value]) => {
    searchParams.set(key, value.toString());
  });
  window.history.replaceState(null, '', `?${searchParams.toString()}`);
}

function mountCustomPanel(form: TestCase['form'] = []) {
  const customPanel = document.getElementById('custom-panel')!;

  form.forEach(({ label, type, options = {}, onload }) => {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    customPanel.appendChild(item);

    if (label) {
      const labelEl = document.createElement('label');
      labelEl.textContent = label;
      item.appendChild(labelEl);
    }

    const element = document.createElement(type);
    if (type === 'button') element.style.width = '100%';
    Object.assign(element, options);
    item.appendChild(element);

    onload?.(element);
  });
}

function unmountCustomPanel() {
  const customPanel = document.getElementById('custom-panel')!;
  customPanel.innerHTML = '';
}

const timerElement = document.getElementById('timer')!;
const timerTimeElement = document.getElementById('timer-time')!;
let timer: number;
function setTimer(maximum: number) {
  timerElement.style.display = 'flex';

  const now = performance.now();
  timer = window.setInterval(() => {
    if (performance.now() - now > maximum) {
      clearInterval(timer);
    }
    const elapsed = performance.now() - now;
    timerTimeElement.textContent = `${elapsed.toFixed(2)}ms`;
  }, 32);
}

function clearTimer() {
  timerElement.style.display = 'none';
  clearInterval(timer);
  timerTimeElement.textContent = '0ms';
}
