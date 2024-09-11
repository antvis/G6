import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/flare.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: {
          size: 20,
          labelText: (d) => d.id,
          labelBackground: true,
        },
        state: {
          active: {
            fill: '#00C9C9',
          },
        },
      },
      edge: {
        type: 'cubic-radial',
        state: {
          active: {
            lineWidth: 3,
            stroke: '#009999',
          },
        },
      },
      layout: [
        {
          type: 'dendrogram',
          radial: true,
          nodeSep: 30,
          rankSep: 200,
        },
      ],
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        'drag-element',
        {
          key: 'hover-activate',
          type: 'hover-activate',
          degree: 5,
          direction: 'in',
          inactiveState: 'inactive',
        },
      ],
      transforms: ['place-radial-labels'],
    });

    graph.render();
  });
