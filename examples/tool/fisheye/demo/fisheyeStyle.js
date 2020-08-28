import G6 from '@antv/g6';

const fisheye = new G6.Fisheye({
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
const swithButton = document.createElement('input');
swithButton.type = 'button';
swithButton.value = 'Disable';
swithButton.style.height = '25px';
swithButton.style.width = '100px';
swithButton.style.marginLeft = '10px';
buttonContainer.appendChild(swithButton);

graphDiv.parentNode.appendChild(buttonContainer);

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  plugins: [fisheye],
  layout: {
    type: 'force',
    preventOverlap: true,
  },
  modes: {
    default: ['drag-canvas', 'zoom-canvas'],
  },
});

clearButton.addEventListener('click', (e) => {
  fisheye.clear();
});
swithButton.addEventListener('click', (e) => {
  if (swithButton.value === 'Disable') {
    swithButton.value = 'Enable';
    graph.removePlugin(fisheye);
  } else {
    swithButton.value = 'Disable';
    fisheye = new G6.Fisheye({
      r: 200,
      showLabel: true,
    });
    graph.addPlugin(fisheye);
  }
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
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
