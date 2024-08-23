import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      node: {
        style: { size: 16 },
        palette: {
          field: (datum) => Math.floor(datum.style?.y / 60),
        },
      },
      edge: {
        style: {
          label: false,
          labelText: (d) => d.data.value?.toString(),
          stroke: '#ccc',
        },
      },
      plugins: [
        {
          key: 'edge-filter-lens',
          type: 'edge-filter-lens',
        },
      ],
    });
    graph.render();

    const config = {
      trigger: 'pointermove',
      scaleRBy: 'wheel',
      nodeType: 'both',
    };

    window.addPanel((gui) => {
      gui
        .add(config, 'trigger', ['pointermove', 'click', 'drag'])
        .name('Trigger')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'edge-filter-lens',
            trigger: value,
          });
        });
      gui
        .add(config, 'scaleRBy', ['wheel', 'unset'])
        .name('Scale R by')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'edge-filter-lens',
            scaleRBy: value,
          });
        });
      gui
        .add(config, 'nodeType', ['source', 'target', 'both', 'either'])
        .name('Node Type')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'edge-filter-lens',
            nodeType: value,
          });
        });
    });
  });
