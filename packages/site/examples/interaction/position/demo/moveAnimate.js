import G6 from '@antv/g6';
/**
 * Focus a node with Animation
 * by Changzhe
 */
const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
    },
    {
      id: 'node2',
      x: 200,
      y: 150,
      label: 'node2',
    },
    {
      id: 'node3',
      x: 100,
      y: 150,
      label: 'node3',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node1',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitView: false,
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    style: {
      stroke: '#b5b5b5',
    },
  },
  // The global configuration for graph animation also takes effect on the focusItem
  // animate: true,
  // animateCfg: {
  //   easing: 'easeCubic',
  //   duration: 500
  // }
});
graph.data(data);
graph.render();

function handleNodeClick(event) {
  const item = event.item;
  // animately move the graph to focus on the item.
  // the second parameter controlls whether move with animation, the third parameter is the animate configuration
  graph.focusItem(item, true, {
    easing: 'easeCubic',
    duration: 500,
  });
}

// listen to the node click event
graph.on('node:click', handleNodeClick);

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
