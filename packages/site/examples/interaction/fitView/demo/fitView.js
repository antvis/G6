import G6 from '@antv/g6';

const container = document.getElementById('container');

const tipDiv = document.createElement('div');
tipDiv.innerHTML = `Press both the keys 'control' and '1' to call graph.fitView. The keys and the called function can be configured.【ATTENTION】: make sure the focus is on the canvas when you pressing keys
  <br /> 按住 'control' 并按下 '1' 键，将会调用 graph.fitView。组合按键及被调用的函数及其参数均可被配置。【注意】：使用组合件调用函数时，请保证当前焦点在画布上`;
container.appendChild(tipDiv);

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 100;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitCenter: true,
  modes: {
    default: ['shortcuts-call'],
  },
});
fetch('https://gw.alipayobjects.com/os/bmw-prod/b0ca4b15-bd0c-43ec-ae41-c810374a1d55.json')
  .then((res) => res.json())
  .then((data) => {
    graph.data(data);
    graph.render();
    graph.zoom(2);
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 100);
  };
