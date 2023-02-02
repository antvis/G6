import G6 from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById('container');
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      linkCenter: true,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.get('model');
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: 'cubic-vertical',
      },
      layout: {
        type: 'dendrogram',
        direction: 'TB', // H / V / LR / RL / TB / BT
        nodeSep: 40,
        rankSep: 100,
      },
    });

    graph.node(function (node) {
      let position = 'right';
      let rotate = 0;
      if (!node.children) {
        position = 'bottom';
        rotate = Math.PI / 2;
      }
      return {
        label: node.id,
        labelCfg: {
          position,
          offset: 5,
          style: {
            rotate,
            textAlign: 'start',
          },
        },
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  });
