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

const graphDiv = document.getElementById('container');

const switchDiv = document.createElement('div');
switchDiv.innerHTML =
  `Press \'shift\' to select multiple nodes. Click Here to switch trigger to key \'alt\'
  <br /> 按住 'shift' 可多选节点。点击「这里」将 trigger 切换为 'alt'`;
graphDiv.appendChild(switchDiv);

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitCenter: true,
  modes: {
    default: ['click-select', 'drag-node'],
    altSelect: [{
      type: 'click-select',
      trigger: 'alt'
    }, 'drag-node']
  },
  /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable. you can extend or custom it by the following lines */
  /* 不同状态下节点和边的样式，G6 提供以下状态名的默认样式：active, inactive, selected, highlight, disable。可以通过如下方式修改或者扩展全局状态样式*/
  // nodeStateStyles: {
  //   selected: {
  //     stroke: '#f00',
  //     lineWidth: 3
  //   }
  // },
  // edgeStateStyles: {
  //   selected: {
  //     lineWidth: 3,
  //     stroke: '#f00'
  //   }
  // }
});

graph.on('node:mouseenter', e => {
  graph.setItemState(e.item, 'active', true);
});

graph.on('node:mouseleave', e => {
  graph.setItemState(e.item, 'active', false);
});

graph.on('nodeselectchange', e => {
  console.log(e.selectedItems, e.select);
});

switchDiv.addEventListener('click', e => {
  shift = !shift;
  if (shift) {
    graph.setMode('default');
    switchDiv.innerHTML =
      `Press \'shift\' to select multiple nodes. Click Here to switch trigger to key \'alt\'
      <br /> 按住 'shift' 可多选节点。点击「这里」将 trigger 切换为 'alt'`;
  } else {
    graph.setMode('altSelect')
    switchDiv.innerHTML =
      `Press \'alt\' to select multiple nodes. Click Here to switch trigger to key \'shift\'
      <br /> 按住 'alt' 可多选节点。点击「这里」将 trigger 切换为 'shift'`;
  }
});

graph.data(data);
graph.render();

window.onresize = () => {
  if (!graph || graph.get('destroyed')) return;
  if (!container || !container.scrollWidth || !container.scrollHeight) return;
  graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
};