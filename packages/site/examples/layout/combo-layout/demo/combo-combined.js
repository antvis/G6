import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/combo.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'combo-combined',
        comboPadding: 2,
      },
      node: {
        style: {
          size: 20,
          labelText: (d) => d.id,
        },
        palette: {
          type: 'group',
          field: (d) => d.combo,
        },
      },
      edge: {
        style: (model) => {
          const { size, color } = model.data;
          return {
            stroke: color || '#99ADD1',
            lineWidth: size || 1,
          };
        },
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
      autoFit: 'view',
    });

    graph.render();
  });
