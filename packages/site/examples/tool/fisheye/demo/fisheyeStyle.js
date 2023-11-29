import { Graph as BaseGraph, Extensions, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  plugins: {
    fisheye: Extensions.Fisheye,
  },
});

let fisheye = new Extensions.Fisheye({
  r: 200,
  showLabel: true,
  delegateStyle: {
    fill: '#f00',
    lineDash: [5, 5],
    stroke: '#666',
  },
});
const colors = ['#8FE9FF', '#87EAEF', '#FFC9E3', '#A7C2FF', '#FFA1E3', '#FFE269', '#BFCFEE', '#FFA0C5', '#D5FF86'];

const graphDiv = document.getElementById('container');

const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'inline-block';
buttonContainer.style.height = '35px';
buttonContainer.style.width = '220px';

// clear the fisheye effect button
const clearButton = document.createElement('input');
clearButton.type = 'button';
clearButton.value = 'Clear';
clearButton.style.height = '25px';
clearButton.style.width = '100px';
buttonContainer.appendChild(clearButton);

// enable/disable the fisheye lens button
const switchButton = document.createElement('input');
switchButton.type = 'button';
switchButton.value = 'Disable';
switchButton.style.height = '25px';
switchButton.style.width = '100px';
switchButton.style.marginLeft = '10px';
buttonContainer.appendChild(switchButton);

graphDiv.parentNode.appendChild(buttonContainer);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new Graph({
  container: 'container',
  width,
  height,
  transforms: [
    {
      type: 'transform-v4-data',
      activeLifecycle: ['read'],
    },
  ],
  plugins: [fisheye],
  node: (model) => {
    return {
      id: model.id,
      data: {
        ...model.data,
        keyShape: {
          fill: colors[Math.floor(Math.random() * 9)],
          r: Math.random() * 30 + 10,
        },
        labelShape: {
          visibility: 'hidden',
          text: model.id,
        },
      },
    };
  },
});

clearButton.addEventListener('click', (e) => {
  fisheye.clear();
});
switchButton.addEventListener('click', (e) => {
  if (switchButton.value === 'Disable') {
    switchButton.value = 'Enable';
    graph.removePlugins(fisheye);
  } else {
    switchButton.value = 'Disable';
    fisheye = new Extensions.Fisheye({
      r: 200,
      showLabel: true,
    });
    graph.addPlugins(fisheye);
  }
});

fetch('https://gw.alipayobjects.com/os/bmw-prod/afe8b2a6-f691-4070-aa73-46fc07fd1171.json')
  .then((res) => res.json())
  .then((data) => {
    graph.read(data);
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
