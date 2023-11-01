import { Graph as BaseGraph, extend, Extensions } from '@antv/g6';

const { CubicEdge } = Extensions;
class CustomEdge extends CubicEdge {
  afterDraw(model, shapeMap, shapesChanged) {
    const { keyShape } = shapeMap;
    console.log('model.data', model.data);
    const { visible, ...otherStyles } = model.data?.otherShapes?.buShape || {};
    if (visible) {
      return {
        buShape: this.upsertShape(
          'circle',
          'buShape',
          {
            r: 4,
            x: 0,
            y: 0,
            fill: '#1890ff',
            offsetPath: keyShape,
            zIndex: 1,
            ...otherStyles, // merged style from mappers and states
          },
          shapeMap,
          model,
        ),
      };
    } else {
      return {};
    }
  }
}

const Graph = extend(BaseGraph, {
  edges: {
    'custom-edge': CustomEdge,
  },
});

const data = {
  nodes: [
    {
      id: 'a',
      data: {
        cluster: '1',
      },
    },
    {
      id: 'b',
      data: {
        cluster: '2',
      },
    },
    {
      id: 'c',
      data: {
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
let graph = new Graph({
  container: 'container',
  width,
  height,
  modes: { default: [] },
  layout: {
    type: 'grid',
    rows: 2,
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
    type: 'custom-edge',
    animates: {
      update: [
        {
          fields: ['lineDash'],
          shapeId: 'keyShape',
          states: ['growing', 'running'],
          iterations: Infinity,
          duration: 2000,
        },
        {
          fields: ['offsetDistance'],
          shapeId: 'buShape',
          states: ['circleRunning'],
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
        lineDash: ['100%', 0],
      },
    },
    running: {
      keyShape: {
        lineWidth: 2,
        lineDash: [2, 2],
        //  TODO: lineDashOffset
      },
    },
    circleRunning: {
      otherShapes: {
        buShape: {
          visible: true,
          offsetDistance: 1,
        },
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
          graph.setItemState(edge.id, 'circleRunning', false);
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
          graph.setItemState(edge.id, 'circleRunning', false);
          graph.setItemState(edge.id, 'growing', false);
          graph.setItemState(edge.id, 'running', true);
        }
      });
    },
    CircleRunning: () => {
      graph.getAllEdgesData().forEach((edge) => {
        if (graph.getItemState(edge.id, 'circleRunning')) {
          graph.setItemState(edge.id, 'circleRunning', false);
        } else {
          graph.setItemState(edge.id, 'running', false);
          graph.setItemState(edge.id, 'growing', false);
          graph.setItemState(edge.id, 'circleRunning', true);
        }
      });
    },
  },
};

const controllerContainer = document.createElement('div');
controllerContainer.style.position = 'absolute';
container.appendChild(controllerContainer);

Object.keys(actions).forEach((groupName, i) => {
  const btnContainer = document.createElement('div');
  controllerContainer.appendChild(btnContainer);
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
