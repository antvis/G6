import { Graph } from '@antv/g6';

const fetchData = async (type) => {
  if (type === 'large') {
    const data = await fetch('https://assets.antv.antgroup.com/g6/cluster.json').then((res) => res.json());
    return data;
  }
  return {
    nodes: [{ id: 'b0' }, { id: 'b1' }, { id: 'b2' }, { id: 'b3' }, { id: 'b4' }, { id: 'b5' }],
    edges: [
      { source: 'b0', target: 'b1' },
      { source: 'b0', target: 'b2' },
      { source: 'b0', target: 'b3' },
      { source: 'b0', target: 'b4' },
      { source: 'b0', target: 'b5' },
    ],
  };
};

fetchData('small').then((data) => {
  const graph = new Graph({
    container: 'container',
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    layout: {
      type: 'force',
      animated: true,
      linkDistance: 100,
      preventOverlap: true,
    },
    data,
  });

  graph.render();

  window.addPanel((gui) => {
    gui.add({ type: 'small' }, 'type', ['small', 'large']).onChange((type) => {
      fetchData(type).then((data) => {
        graph.setData(data);
        graph.render();
      });
    });
  });
});
