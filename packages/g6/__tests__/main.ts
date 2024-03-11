import type { Controller } from 'lil-gui';
import GUI from 'lil-gui';
import '../src/preset';
import * as demos from './demo';
import type { TestCase } from './demo/types';
import { createGraphCanvas } from './utils';

const CASES = demos as unknown as { [key: string]: Record<string, TestCase> };

type Options = {
  Type: string;
  Demo: string;
  Renderer: string;
  Theme: string;
  Animation: boolean;
  Timer: string;
  [keys: string]: any;
};

const options: Options = {
  Type: 'statics',
  Demo: Object.keys(demos['statics'])[0],
  Renderer: 'canvas',
  GridLine: true,
  Theme: 'light',
  Animation: true,
  interval: 0,
  Timer: '0ms',
  Reload: () => {},
  forms: [],
};

const params = ['Type', 'Demo', 'Renderer', 'GridLine', 'Theme', 'Animation'] as const;

syncParamsFromSearch();

const panels = initPanel();

function getDemos() {
  return Object.keys(CASES[options.Type]);
}

window.onload = render;

function initPanel() {
  const panel = new GUI({ container: document.getElementById('panel')!, autoPlace: true });
  const Type = panel.add(options, 'Type', Object.keys(CASES)).onChange(() => Demo.options(getDemos()));
  const Demo = panel.add(options, 'Demo', getDemos()).onChange(render);
  const Renderer = panel.add(options, 'Renderer', { Canvas: 'canvas', SVG: 'svg', WebGL: 'webgl' }).onChange(render);
  const Theme = panel.add(options, 'Theme', { Light: 'light', Dark: 'dark' }).onChange(render);
  const GridLine = panel.add(options, 'GridLine').onChange(() => {
    syncParamsToSearch();
    applyGridLine();
  });
  const Animation = panel.add(options, 'Animation').onChange(render);
  const Timer = panel.add(options, 'Timer').disable();
  const reload = panel.add(options, 'Reload').onChange(render);
  return { panel, Type, Demo, Renderer, GridLine, Theme, Animation, Timer, reload };
}

async function render() {
  syncParamsToSearch();
  applyTheme();
  destroyForm();
  panels.Timer.setValue('0ms');

  const $container = initContainer();

  applyGridLine();

  // render
  const { Renderer, Type, Demo, Animation, Theme } = options;
  const canvas = createGraphCanvas($container, 500, 500, Renderer);
  await canvas.init();
  const testCase = CASES[Type][Demo];
  if (!testCase) return;

  const result = await testCase({ container: canvas, animation: Animation, theme: Theme });

  renderForm(panels.panel, testCase.form);

  if (result?.totalDuration) {
    const formatCurrentTime = (time: number) => time.toFixed(2);
    const setTimer = (time: any) => panels.Timer.setValue(`${formatCurrentTime(time)}ms`);
    const onframe = result.onframe;
    result.onframe = function (frame) {
      onframe?.call(this, frame);
      setTimer(frame.currentTime);
    };
    result.finished.then(() => setTimer(result.currentTime));
  }
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
