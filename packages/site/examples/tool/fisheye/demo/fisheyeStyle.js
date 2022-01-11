import G6 from '@antv/g6';

let fisheye = new G6.Fisheye({
  r: 200,
  showLabel: true,
  delegateStyle: {
    fill: '#f00',
    lineDash: [5, 5],
    stroke: '#666',
  },
});
const colors = [
  '#8FE9FF',
  '#87EAEF',
  '#FFC9E3',
  '#A7C2FF',
  '#FFA1E3',
  '#FFE269',
  '#BFCFEE',
  '#FFA0C5',
  '#D5FF86',
];

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
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  plugins: [fisheye],
});

clearButton.addEventListener('click', (e) => {
  fisheye.clear();
});
switchButton.addEventListener('click', (e) => {
  if (switchButton.value === 'Disable') {
    switchButton.value = 'Enable';
    graph.removePlugin(fisheye);
  } else {
    switchButton.value = 'Disable';
    fisheye = new G6.Fisheye({
      r: 200,
      showLabel: true,
    });
    graph.addPlugin(fisheye);
  }
});

fetch('https://gw.alipayobjects.com/os/bmw-prod/afe8b2a6-f691-4070-aa73-46fc07fd1171.json')
  .then((res) => res.json())
  .then((data) => {
    data.nodes.forEach((node) => {
      node.label = node.id;
      node.size = Math.random() * 30 + 10;
      node.style = {
        fill: colors[Math.floor(Math.random() * 9)],
        lineWidth: 0,
      };
    });
    graph.data(data);
    graph.render();
    graph.getNodes().forEach((node) => {
      node
        .getContainer()
        .getChildren()
        .forEach((shape) => {
          if (shape.get('type') === 'text') shape.hide();
        });
    });
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
