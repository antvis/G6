import G6 from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', x: 150, y: 250 },
    { id: 'node2', x: 350, y: 250 },
  ],
  edges: [{
    source: 'node1', target: 'node2'
  }]
};

let shift = true;

const switchDiv = document.createElement('div');
switchDiv.innerHTML =
  `Press down the 'shift' on keyboard and drag to begin select.  Click「HERE」to switch trigger to \'drag\', and custom lasso style, and disable drag-canvas
  <br /> 按住 'shift' 可开始拉索选择。点击「这里」切换 trigger 为 'drag'，同时修改拉索样式和关闭画布拖拽`;
const container = document.getElementById('container');
container.appendChild(switchDiv);

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitCenter: true,
  modes: {
    default: ['lasso-select', 'drag-node', 'drag-canvas'],
    dragLasso: [{
      type: 'lasso-select',
      delegateStyle: {
        fill: '#f00',
        fillOpacity: 0.05,
        stroke: '#f00',
        lineWidth: 1
      },
      onSelect: (nodes, edges) => {
        console.log('onSelect', nodes, edges)
      },
      trigger: 'drag'
    }, 'drag-node'],
  },
  nodeStateStyles: {
    selected: {
      stroke: '#f00',
      lineWidth: 3
    }
  },
  edgeStateStyles: {
    selected: {
      lineWidth: 3,
      stroke: '#f00'
    }
  }
});

graph.data(data);
graph.render();

graph.on('nodeselectchange', e => {
  console.log(e.selectedItems, e.select);
})

switchDiv.addEventListener('click', e => {
  shift = !shift;
  if (shift) {
    graph.setMode('default');
    switchDiv.innerHTML =
      `Press down the 'shift' on keyboard and drag to begin select. Click「HERE」to switch trigger to \'drag\', and custom lasso style, and disable drag-canvas
    <br /> 按住 'shift' 可开始拉索选择。点击「这里」切换 trigger 为 'drag'，同时修改拉索样式和关闭画布拖拽`;
  } else {
    graph.setMode('dragLasso')
    switchDiv.innerHTML =
      `Drag on the canvas to begin lasso select. Click「HERE」to switch trigger to \'shift\', and enable drag-canvas
    <br /> 拖拽画布即可进行拉索选择。点击「这里」切换 trigger 为 'drag'，同时开启画布拖拽`;
  }
});

if (window && typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
  };