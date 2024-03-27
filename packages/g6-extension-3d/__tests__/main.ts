import GUI from 'lil-gui';
import * as demos from './demos';

const demoNames = Object.keys(demos);

const options = {
  demo: '',
};

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
  .onChange((name) => {
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
  return { container };
}

function render(name: string) {
  const context = initContext();
  const demo = demos[name];
  demo(context);
}
