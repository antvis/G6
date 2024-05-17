import type { Controller } from 'lil-gui';
import GUI from 'lil-gui';
import _ from 'lodash';
import * as demos from './demos';

const { toUpper, snakeCase } = _;
const demoNames = Object.keys(demos);

const options = {
  demo: '',
};

const customForm: Controller[] = [];

const panel = new GUI({ autoPlace: true });
const __STORAGE__ = `__` + toUpper(snakeCase('{{projectName}}')) + `_DEMO__`;
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
