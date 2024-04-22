import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: { size: 30 },
        state: {
          highlight: {
            color: '#D580FF',
            halo: true,
            lineWidth: 0,
          },
          unhighlight: {
            color: '#99ADD1',
          },
        },
      },
      edge: {
        state: {
          highlight: {
            color: '#D580FF',
          },
        },
      },
      behaviors: [
        {
          type: 'hover-element',
          enable: (event) => event.targetType === 'node',
          degree: 1, // 👈🏻 Activate relations.
          activeState: 'highlight',
          inactiveState: 'unhighlight',
          onHover: (event) => {
            event.view.setCursor('pointer');
          },
          onHoverEnd: (event) => {
            event.view.setCursor('default');
          },
        },
      ],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 24,
      },
      animation: false,
    });

    graph.render();
  });
