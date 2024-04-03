import type { Controller } from 'lil-gui';
import GUI from 'lil-gui';
import * as demos from './demos';

const demoNames = Object.keys(demos);

const options = {
  demo: '',
};

const customForm: Controller[] = [];

const panel = new GUI({ autoPlace: true });
const __STORAGE__ = '__G6_EXTENSION_3D_DEMO__';
const load = () => {
  const data = localStorage.getItem(__STORAGE__);
  if (data) panel.load(JSON.parse(data));
};
const save = () => {
  localStorage.setItem(__STORAGE__, JSON.stringify(panel.save()));
};
panel
  .add(options, 'demo', demoNames)
  .name('Demo')
  .onChange((name: string) => {
    render(name);
    save();
  });
load();

function initContainer() {
  const container = document.getElementById('container')!;
  container.innerHTML = '';
  return container;
}

function initContext() {
  const container = initContainer();
  return { container, width: 500, height: 500 };
}

async function render(name: string) {
  destroyForm();
  const context = initContext();
  const demo = demos[name as keyof typeof demos];
  const graph = await demo(context);
  customForm.push(...(demo?.form?.(panel) || []));
  Object.assign(window, { graph });
}

function destroyForm() {
  customForm.forEach((controller) => controller.destroy());
  customForm.length = 0;
}
