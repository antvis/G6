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
  Theme: 'light',
  Animation: true,
  interval: 0,
  Timer: '0ms',
  Reload: () => {},
  forms: [],
};

const params = ['Type', 'Demo', 'Renderer', 'Theme', 'Animation'];

const panels = initPanel();

function getDemos() {
  return Object.keys(CASES[options.Type]);
}

window.onload = () => {
  syncParamsFromSearch();
  render();
};

function initPanel() {
  const panel = new GUI({ container: document.getElementById('panel')!, autoPlace: true });
  const type = panel.add(options, 'Type', Object.keys(CASES)).onChange(() => demo.options(getDemos()));
  const demo = panel.add(options, 'Demo', getDemos()).onChange(render);
  const renderer = panel.add(options, 'Renderer', { Canvas: 'canvas', SVG: 'svg', WebGL: 'webgl' }).onChange(render);
  const theme = panel.add(options, 'Theme', { Light: 'light', Dark: 'dark' }).onChange(render);
  const animation = panel.add(options, 'Animation').onChange(render);
  const timer = panel.add(options, 'Timer').disable();
  const reload = panel.add(options, 'Reload').onChange(render);
  return { panel, type, demo, renderer, theme, animation, timer, reload };
}

async function render() {
  setParamsToSearch(options);
  document.documentElement.setAttribute('data-theme', options.Theme);
  destroyForm();
  panels.timer.setValue('0ms');

  // container
  document.getElementById('container')?.remove();
  const container = document.createElement('div');
  container.id = 'container';
  document.getElementById('app')?.appendChild(container);

  // render
  const { Renderer, Type, Demo, Animation, Theme } = options;
  const canvas = createGraphCanvas(document.getElementById('container'), 500, 500, Renderer);
  await canvas.init();
  const testCase = CASES[Type][Demo];
  if (!testCase) return;

  const result = await testCase({ container: canvas, animation: Animation, theme: Theme });

  renderForm(panels.panel, testCase.form);

  if (result?.totalDuration) {
    const formatCurrentTime = (time: number) => time.toFixed(2);
    const setTimer = (time: any) => panels.timer.setValue(`${formatCurrentTime(time)}ms`);
    result.onframe = (frame) => {
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
    if (key === 'Animation') options[key] = value === 'true';
    else options[key] = value;
  });
}

function setParamsToSearch(options: Options) {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(options).forEach(([key, value]) => {
    if (params.includes(key)) searchParams.set(key, value.toString());
  });
  window.history.replaceState(null, '', `?${searchParams.toString()}`);
}
