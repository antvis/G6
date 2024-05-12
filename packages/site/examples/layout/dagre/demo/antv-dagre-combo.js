import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/dagre-combo.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      animation: true,
      data,
      node: {
        type: 'rect',
        style: {
          size: [60, 30],
          radius: 8,
          labelText: (d) => d.id,
          labelPlacement: 'center',
          ports: [{ placement: 'top' }, { placement: 'bottom' }],
        },
        palette: {
          field: (d) => d.combo,
        },
      },
      edge: {
        type: 'cubic-vertical',
        style: {
          endArrow: true,
        },
      },
      combo: {
        type: 'rect',
        style: {
          radius: 8,
          labelText: (d) => d.id,
          lineDash: 0,
          collapsedLineDash: [5, 5],
        },
      },
      layout: {
        type: 'antv-dagre',
        ranksep: 50,
        nodesep: 5,
        sortByCombo: true,
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
