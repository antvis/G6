import type { Controller } from 'lil-gui';
import GUI from 'lil-gui';
import '../src/preset';
import * as demos from './demos';
import { createGraphCanvas } from './utils';

type Options = {
  Search: string;
  Demo: string;
  Renderer: string;
  Theme: string;
  Animation: boolean;
  [keys: string]: any;
};

const options: Options = {
  Search: '',
  Demo: Object.keys(demos)[0],
  Renderer: 'canvas',
  GridLine: true,
  Theme: 'light',
  Animation: true,
  interval: 0,
  Reload: () => {},
  forms: [],
};

const params = ['Type', 'Demo', 'Renderer', 'GridLine', 'Theme', 'Animation'] as const;

syncParamsFromSearch();

const panels = initPanel();

window.onload = render;

function initPanel() {
  const panel = new GUI({ container: document.getElementById('panel')!, autoPlace: true });
  const Demo = panel.add(options, 'Demo', Object.keys(demos)).onChange(render);
  const Search = panel.add(options, 'Search').onChange((keyword: string) => {
    const keys = Object.keys(demos);
    const filtered = keys.filter((key) => key.toLowerCase().includes(keyword.toLowerCase()));
    Demo.options(filtered);
  });
  const Renderer = panel.add(options, 'Renderer', { Canvas: 'canvas', SVG: 'svg', WebGL: 'webgl' }).onChange(render);
  const Theme = panel.add(options, 'Theme', { Light: 'light', Dark: 'dark' }).onChange(render);
  const GridLine = panel.add(options, 'GridLine').onChange(() => {
    syncParamsToSearch();
    applyGridLine();
  });
  const Animation = panel.add(options, 'Animation').onChange(render);
  const reload = panel.add(options, 'Reload').onChange(render);
  return { panel, Demo, Search, Renderer, GridLine, Theme, Animation, reload };
}

async function render() {
  syncParamsToSearch();
  applyTheme();
  destroyForm();

  const $container = initContainer();

  applyGridLine();

  // render
  const { Renderer, Demo, Animation, Theme } = options;
  const canvas = createGraphCanvas($container, 500, 500, Renderer);
  await canvas.ready;
  const testCase = demos[Demo as keyof typeof demos];
  if (!testCase) return;

  const result = await testCase({ container: canvas, animation: Animation, theme: Theme });

  Object.assign(window, { graph: result });

  renderForm(panels.panel, testCase.form);
}

function renderForm(panel: GUI, form: TestCase['form']) {
  if (form) options.forms.push(...form(panel));
}

function destroyForm() {
  const { forms } = options;
  forms.forEach((controller: Controller) => controller.destroy());
  forms.length = 0;
}

function syncParamsFromSearch() {
  const searchParams = new URLSearchParams(window.location.search);
  params.forEach((key) => {
    const value = searchParams.get(key);
    if (!value) return;
    if (key === 'Animation' || key === 'GridLine') options[key] = value === 'true';
    else options[key] = value;
  });
}

function syncParamsToSearch() {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(options).forEach(([key, value]) => {
    if (params.includes(key as (typeof params)[number])) searchParams.set(key, value.toString());
  });
  window.history.replaceState(null, '', `?${searchParams.toString()}`);
}

function initContainer() {
  document.getElementById('container')?.remove();
  const $container = document.createElement('div');
  $container.id = 'container';
  document.getElementById('app')?.appendChild($container);
  return $container;
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', options.Theme);
}

function applyGridLine() {
  const show = options.GridLine;

  const element = document.getElementById('container');
  if (!element) return;
  syncParamsToSearch();
  if (show) {
    document.body.style.backgroundSize = '25px 25px';
    element.style.border = '1px solid #e8e8e8';
  } else {
    document.body.style.backgroundSize = '0';
    element.style.border = 'none';
  }
}
