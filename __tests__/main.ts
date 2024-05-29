import type { Controller } from 'lil-gui';
import GUI from 'lil-gui';
import '../packages/g6/src/preset';
import * as demos from './demos';
import { createGraphCanvas } from './utils';

const Demos = demos as Record<string, Record<string, TestCase>>;

type Options = {
  Lib: string;
  Search: string;
  Demo: string;
  Renderer: string;
  Theme: string;
  Animation: boolean;
  [keys: string]: any;
};

const DefaultLib = Object.keys(Demos)[0];

const options: Options = {
  Search: '',
  Lib: DefaultLib,
  Demo: Object.keys(Demos[DefaultLib])[0],
  Renderer: 'default',
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
  const Lib = panel.add(options, 'Lib', Object.keys(Demos)).onChange((lib: string) => {
    syncParamsToSearch();
    Demo.options(Object.keys(Demos[lib]));
  });
  const Demo = panel.add(options, 'Demo', Object.keys(Demos[options.Lib])).onChange(render);
  const Search = panel.add(options, 'Search').onChange((keyword: string) => {
    const keys = Object.keys(Demos[options.Lib]);
    const filtered = keys.filter((key) => key.toLowerCase().includes(keyword.toLowerCase()));
    Demo.options(filtered);
  });
  const Renderer = panel
    .add(options, 'Renderer', { Canvas: 'canvas', SVG: 'svg', WebGL: 'webgl', Default: 'default' })
    .onChange(render);
  const Theme = panel.add(options, 'Theme', { Light: 'light', Dark: 'dark' }).onChange(render);
  const GridLine = panel.add(options, 'GridLine').onChange(() => {
    syncParamsToSearch();
    applyGridLine();
  });
  const Animation = panel.add(options, 'Animation').onChange(render);
  const reload = panel.add(options, 'Reload').onChange(render);
  return { panel, Lib, Demo, Search, Renderer, GridLine, Theme, Animation, reload };
}

async function render() {
  syncParamsToSearch();
  applyTheme();
  destroyForm();

  const $container = initContainer();

  applyGridLine();

  // render
  const { Renderer, Lib, Demo, Animation, Theme } = options;

  let container: any = 'container';
  if (Renderer !== 'default') {
    const canvas = createGraphCanvas($container, 500, 500, Renderer);
    await canvas.init();
    container = canvas;
  }

  const testCase = Demos[Lib][Demo as keyof typeof Demos];
  if (!testCase) return;

  const result = await testCase({ container, animation: Animation, theme: Theme });

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
