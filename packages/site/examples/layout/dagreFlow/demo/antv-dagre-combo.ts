import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/dagre-combo.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      layout: {
        type: 'antv-dagre',
        ranksep: 50,
        nodesep: 5,
        sortByCombo: true,
      },
      node: {
        style: {
          type: 'rect',
          size: [60, 30],
          radius: 8,
          labelPlacement: 'center',
          labelText: (d) => d.id,
          ports: [{ placement: 'top' }, { placement: 'bottom' }],
          fill: (d) => {
            const styles = { A: '#F09056', B: '#D580FF', C: '#01C9C9' };
            return styles[d.style.parentId] || '#1883FF';
          },
        },
      },
      edge: {
        style: {
          type: 'cubic-vertical',
          endArrow: true,
          lineWidth: 2,
          stroke: '#C2C8D5',
        },
      },
      combo: {
        style: {
          type: 'rect',
          labelText: (d) => d.id,
          lineDash: 0,
          collapsedLineDash: [5, 5],
        },
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
    });
    graph.render();
  });
