import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'a',
      data: {
        x: 200,
        y: 100,
        cluster: '1',
      },
    },
    {
      id: 'b',
      data: {
        x: 100,
        y: 200,
        cluster: '2',
      },
    },
    {
      id: 'c',
      data: {
        x: 300,
        y: 200,
        cluster: '3',
      },
    },
  ],
  edges: [
    {
      id: 'a2b',
      source: 'a',
      target: 'b',
    },
    {
      id: 'a2c',
      source: 'a',
      target: 'c',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
let graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: { default: [] },
  layout: {
    type: 'grid',
  },
  theme: {
    type: 'spec',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  node: (model) => {
    let type = 'circle-node';
    if (model.id === 'b') type = 'rect-node';
    return {
      id: model.id,
      data: {
        ...model.data,
        type,
        labelShape: {
          text: model.id,
        },
        labelBackgroundShape: {},
        animates: {
          update: [
            {
              fields: ['opacity'],
              shapeId: 'haloShape',
              states: ['breathing'],
              iterations: Infinity,
              direction: 'alternate',
              duration: 500,
            },
            {
              fields: ['lineWidth'],
              shapeId: 'keyShape',
              states: ['breathing'],
              iterations: Infinity,
              direction: 'alternate',
              duration: 500,
            },
            {
              fields: type === 'circle-node' ? ['r'] : ['width', 'height'],
              shapeId: 'keyShape',
              states: ['scaling'],
              iterations: Infinity,
              direction: 'alternate',
              duration: 500,
            },
          ],
        },
      },
    };
  },
  edge: {
    keyShape: {
      lineDash: [0, '100%'],
    },
    animates: {
      update: [
        {
          fields: ['lineDash'],
          shapeId: 'keyShape',
          states: ['growing', 'running'],
          iterations: Infinity,
          duration: 2000,
        },
      ],
    },
  },
  nodeState: {
    breathing: {
      haloShape: {
        opacity: 0.25,
        lineWidth: 20,
        visible: true,
      },
      keyShape: {
        stroke: '#000',
        lineWidth: 4,
      },
    },
    scaling: {
      keyShape: {
        r: 24,
        width: 48,
        height: 48,
      },
    },
  },
  edgeState: {
    growing: {
      keyShape: {
        lineWidth: 2,
        lineDash: ['100%', 10000],
      },
    },
    running: {
      keyShape: {
        lineWidth: 2,
        lineDash: [2, 2],
        //  TODO: lineDashOffset
      },
    },
  },
  data,
});

const actions = {
  'Enable/Disable Node States': {
    Breathing: () => {
      graph.getAllNodesData().forEach((node) => {
        if (graph.getItemState(node.id, 'breathing')) {
          graph.setItemState(node.id, 'breathing', false);
        } else {
          graph.setItemState(node.id, 'scaling', false);
          graph.setItemState(node.id, 'breathing', true);
        }
      });
    },
    Scaling: () => {
      graph.getAllNodesData().forEach((node) => {
        if (graph.getItemState(node.id, 'scaling')) {
          graph.setItemState(node.id, 'scaling', false);
        } else {
          graph.setItemState(node.id, 'breathing', false);
          graph.setItemState(node.id, 'scaling', true);
        }
      });
    },
  },
  'Enable/Disable Edge States': {
    Growing: () => {
      graph.getAllEdgesData().forEach((edge) => {
        if (graph.getItemState(edge.id, 'growing')) {
          graph.setItemState(edge.id, 'growing', false);
        } else {
          graph.setItemState(edge.id, 'running', false);
          graph.setItemState(edge.id, 'growing', true);
        }
      });
    },
    Running: () => {
      graph.getAllEdgesData().forEach((edge) => {
        if (graph.getItemState(edge.id, 'running')) {
          graph.setItemState(edge.id, 'running', false);
        } else {
          graph.setItemState(edge.id, 'growing', false);
          graph.setItemState(edge.id, 'running', true);
        }
      });
    },
  },
};

Object.keys(actions).forEach((groupName, i) => {
  const btnContainer = document.createElement('div');
  btnContainer.style.position = 'absolute';
  btnContainer.style.top = `${i * 30}px`;
  container.appendChild(btnContainer);
  const tip = document.createElement('span');
  tip.innerHTML = `👉 ${groupName}: `;
  btnContainer.appendChild(tip);
  Object.keys(actions[groupName]).forEach((name, i) => {
    const btn = document.createElement('a');
    btn.innerHTML = name;
    btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    btn.style.padding = '4px';
    btn.style.marginLeft = i > 0 ? '24px' : '8px';
    btnContainer.appendChild(btn);
    btn.addEventListener('click', () => {
      actions[groupName][name]();
    });
  });
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
