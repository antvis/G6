import { extend, Graph, Extensions } from '../../../src/index';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const ExtGraph = extend(Graph, {
    layouts: {
      dagre: Extensions.DagreLayout,
    },
    edges: {
      'cubic-edge': Extensions.CubicEdge,
      'quadratic-edge': Extensions.QuadraticEdge,
      'polyline-edge': Extensions.PolylineEdge,
    },
  });

  const data = {
    nodes: [
      {
        id: '0',
        data: {
          label: '0',
        },
      },
      {
        id: '1',
        data: {
          label: '1',
        },
      },
    ],
    edges: [
      {
        id: 'edge-395',
        source: '0',
        target: '1',
        data: {},
      },
    ],
  };

  const layoutConfigs = {
    Default: {
      type: 'dagre',
      nodesep: 100,
      ranksep: 70,
      controlPoints: true,
    },
    // TODO: 换个数据
    LR: {
      type: 'dagre',
      rankdir: 'LR',
      align: 'DL',
      nodesep: 50,
      ranksep: 70,
      controlPoints: true,
    },
    'LR&UL': {
      type: 'dagre',
      rankdir: 'LR',
      align: 'UL',
      controlPoints: true,
      nodesep: 50,
      ranksep: 70,
    },
  };

  const container = context.container;
  const graph = new ExtGraph({
    ...context,
    layout: layoutConfigs.Default,
    node: (node) => {
      return {
        id: node.id,
        data: {
          ...node.data,
          type: 'rect-node',
          lodLevels: {},
          keyShape: {
            width: 60,
            height: 30,
            radius: 8,
          },
          labelShape: {
            position: 'center',
            maxWidth: '80%',
            text: `node-${node.data.label}`,
          },
          // animates: {
          //   update: [
          //     {
          //       fields: ['x', 'y'],
          //     },
          //   ],
          // },
        },
      };
    },
    edge: {
      type: 'polyline-edge',
      keyShape: {
        // radius: 20,
        // offset: 45,
        // endArrow: true,
        // lineWidth: 2,
        // stroke: '#C2C8D5',
        // routeCfg: {
        //   enableObstacleAvoidance: true,
        // },
      },
    },
    modes: {
      default: ['drag-node', 'drag-canvas', 'zoom-canvas', 'click-select'],
    },
    autoFit: 'view',
    data,
  });

  graph.on('edge:click', (e) => {
    console.log('clickedge', e.itemId, graph.canvas, graph);
  });

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.destroyed) return;
      if (!container || !container.scrollWidth || !container.scrollHeight)
        return;
      graph.setSize([container.scrollWidth, container.scrollHeight]);
    };

  const btnContainer = document.createElement('div');
  btnContainer.style.position = 'absolute';
  container.appendChild(btnContainer);
  const tip = document.createElement('span');
  tip.innerHTML = '👉 Change configs:';
  btnContainer.appendChild(tip);

  Object.keys(layoutConfigs).forEach((name, i) => {
    const btn = document.createElement('a');
    btn.innerHTML = name;
    btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    btn.style.padding = '4px';
    btn.style.marginLeft = i > 0 ? '24px' : '8px';
    btnContainer.appendChild(btn);
    btn.addEventListener('click', () => {
      graph.layout(layoutConfigs[name]);
    });
  });
  return graph;
};
