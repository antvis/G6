import { CanvasEvent } from '@antv/g';
import { Canvas, ComboEvent, CommonEvent, EdgeEvent, NodeEvent } from '@antv/g6';
import type { Controller } from 'lil-gui';
import GUI from 'lil-gui';
import Stats from 'stats.js';
import '../src/preset';
import * as demos from './demos';
import { createGraphCanvas } from './utils';

// inject
Object.assign(window, { NodeEvent, EdgeEvent, ComboEvent, CommonEvent });

type Options = {
  Search: string;
  Demo: string;
  Renderer: string;
  Theme: string;
  Animation: boolean;
  MultiLayers: boolean;
  [keys: string]: any;
};

const options: Options = {
  Search: '',
  Demo: Object.keys(demos)[0],
  Renderer: 'canvas',
  GridLine: true,
  Theme: 'light',
  Animation: true,
  MultiLayers: true,
  interval: 0,
  Reload: () => {},
  forms: [],
};

const params = ['Type', 'Demo', 'Renderer', 'GridLine', 'Theme', 'Animation'] as const;

syncParamsFromSearch();

const panels = initPanel();
const stats = initStats();

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
  const MultiLayers = panel.add(options, 'MultiLayers').onChange(render);
  const reload = panel.add(options, 'Reload').onChange(render);

  const goTo = (diff: number) => {
    // @ts-expect-error private property
    const keys = Demo._values;
    const currentIndex = keys.indexOf(options.Demo);
    const nextIndex = (currentIndex + diff + keys.length) % keys.length;
    options.Demo = keys[nextIndex];
    Demo.updateDisplay();
    render();
  };

  globalThis.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
      goTo(1);
    } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
      goTo(-1);
    }
  });

  return { panel, Demo, Search, Renderer, GridLine, Theme, Animation, MultiLayers, reload };
}

function initStats() {
  const container = document.getElementById('panel')!;
  const stats = new Stats();
  stats.showPanel(0);
  const dom = stats.dom;
  Object.assign(dom.style, { position: 'relative', top: 'unset', right: 'unset' });
  container.appendChild(dom);
  return stats;
}

let canvas: Canvas | undefined;
const statsListener = () => stats.update();

async function render() {
  syncParamsToSearch();
  applyTheme();
  destroyForm();
  if (canvas) {
    canvas.getLayer().removeEventListener(CanvasEvent.AFTER_RENDER, statsListener);
  }

  const $container = initContainer();

  applyGridLine();

  // render
  const { Renderer, Demo, Animation, Theme, MultiLayers } = options;

  const canvasOptions = { enableMultiLayer: MultiLayers };

  canvas = createGraphCanvas($container, 500, 500, Renderer, canvasOptions);

  canvas.getLayer().addEventListener(CanvasEvent.AFTER_RENDER, statsListener);

  await canvas.ready;
  const testCase = demos[Demo as keyof typeof demos];
  if (!testCase) return;

  performance.clearMarks();
  performance.clearMeasures();
  performance.mark('demo-start');

  const graph = await testCase({
    container: canvas,
    animation: Animation,
    theme: Theme,
    canvas: canvasOptions,
  });

  performance.mark('demo-end');
  performance.measure('demo', 'demo-start', 'demo-end');
  console.log('Time:', performance.getEntriesByName('demo')[0].duration, 'ms');

  Object.assign(window, { graph, __g_instances__: Object.values(graph.getCanvas().getLayers()) });

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
