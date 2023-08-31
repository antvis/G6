import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  behaviors: {
    'brush-select': Extensions.BrushSelect,
  },
});

const data = {
  nodes: [
    {
      id: '0',
      data: {
        labelShape: {
          text: '0',
        },
      },
    },
    {
      id: '1',
      data: {
        labelShape: {
          text: '1',
        },
      },
    },
    {
      id: '2',
      data: {
        labelShape: {
          text: '2',
        },
      },
    },
    {
      id: '3',
      data: {
        labelShape: {
          text: '3',
        },
      },
    },
    {
      id: '4',
      data: {
        labelShape: {
          text: '4',
        },
      },
    },
    {
      id: '5',
      data: {
        labelShape: {
          text: '5',
        },
      },
    },
    {
      id: '6',
      data: {
        labelShape: {
          text: '6',
        },
      },
    },
    {
      id: '7',
      data: {
        labelShape: {
          text: '7',
        },
      },
    },
    {
      id: '8',
      data: {
        labelShape: {
          text: '8',
        },
      },
    },
    {
      id: '9',
      data: {
        labelShape: {
          text: '9',
        },
      },
    },
    {
      id: '10',
      data: {
        labelShape: {
          text: '10',
        },
      },
    },
    {
      id: '11',
      data: {
        labelShape: {
          text: '11',
        },
      },
    },
    {
      id: '12',
      data: {
        labelShape: {
          text: '12',
        },
      },
    },
    {
      id: '13',
      data: {
        labelShape: {
          text: '13',
        },
      },
    },
    {
      id: '14',
      data: {
        labelShape: {
          text: '14',
        },
      },
    },
    {
      id: '15',
      data: {
        labelShape: {
          text: '15',
        },
      },
    },
    {
      id: '16',
      data: {
        labelShape: {
          text: '16',
        },
      },
    },
    {
      id: '17',
      data: {
        labelShape: {
          text: '17',
        },
      },
    },
    {
      id: '18',
      data: {
        labelShape: {
          text: '18',
        },
      },
    },
    {
      id: '19',
      data: {
        labelShape: {
          text: '19',
        },
      },
    },
    {
      id: '20',
      data: {
        labelShape: {
          text: '20',
        },
      },
    },
    {
      id: '21',
      data: {
        labelShape: {
          text: '21',
        },
      },
    },
    {
      id: '22',
      data: {
        labelShape: {
          text: '22',
        },
      },
    },
    {
      id: '23',
      data: {
        labelShape: {
          text: '23',
        },
      },
    },
    {
      id: '24',
      data: {
        labelShape: {
          text: '24',
        },
      },
    },
    {
      id: '25',
      data: {
        labelShape: {
          text: '25',
        },
      },
    },
    {
      id: '26',
      data: {
        labelShape: {
          text: '26',
        },
      },
    },
    {
      id: '27',
      data: {
        labelShape: {
          text: '27',
        },
      },
    },
    {
      id: '28',
      data: {
        labelShape: {
          text: '28',
        },
      },
    },
    {
      id: '29',
      data: {
        labelShape: {
          text: '29',
        },
      },
    },
    {
      id: '30',
      data: {
        labelShape: {
          text: '30',
        },
      },
    },
    {
      id: '31',
      data: {
        labelShape: {
          text: '31',
        },
      },
    },
    {
      id: '32',
      data: {
        labelShape: {
          text: '32',
        },
      },
    },
    {
      id: '33',
      data: {
        labelShape: {
          text: '33',
        },
      },
    },
  ],
  edges: [
    {
      id: 'edge-0',
      source: '0',
      target: '1',
      data: {},
    },
    {
      id: 'edge-1',
      source: '0',
      target: '2',
      data: {},
    },
    {
      id: 'edge-2',
      source: '0',
      target: '3',
      data: {},
    },
    {
      id: 'edge-3',
      source: '0',
      target: '4',
      data: {},
    },
    {
      id: 'edge-4',
      source: '0',
      target: '5',
      data: {},
    },
    {
      id: 'edge-5',
      source: '0',
      target: '7',
      data: {},
    },
    {
      id: 'edge-6',
      source: '0',
      target: '8',
      data: {},
    },
    {
      id: 'edge-7',
      source: '0',
      target: '9',
      data: {},
    },
    {
      id: 'edge-8',
      source: '0',
      target: '10',
      data: {},
    },
    {
      id: 'edge-9',
      source: '0',
      target: '11',
      data: {},
    },
    {
      id: 'edge-10',
      source: '0',
      target: '13',
      data: {},
    },
    {
      id: 'edge-11',
      source: '0',
      target: '14',
      data: {},
    },
    {
      id: 'edge-12',
      source: '0',
      target: '15',
      data: {},
    },
    {
      id: 'edge-13',
      source: '0',
      target: '16',
      data: {},
    },
    {
      id: 'edge-14',
      source: '2',
      target: '3',
      data: {},
    },
    {
      id: 'edge-15',
      source: '4',
      target: '5',
      data: {},
    },
    {
      id: 'edge-16',
      source: '4',
      target: '6',
      data: {},
    },
    {
      id: 'edge-17',
      source: '5',
      target: '6',
      data: {},
    },
    {
      id: 'edge-18',
      source: '7',
      target: '13',
      data: {},
    },
    {
      id: 'edge-19',
      source: '8',
      target: '14',
      data: {},
    },
    {
      id: 'edge-20',
      source: '9',
      target: '10',
      data: {},
    },
    {
      id: 'edge-21',
      source: '10',
      target: '22',
      data: {},
    },
    {
      id: 'edge-22',
      source: '10',
      target: '14',
      data: {},
    },
    {
      id: 'edge-23',
      source: '10',
      target: '12',
      data: {},
    },
    {
      id: 'edge-24',
      source: '10',
      target: '24',
      data: {},
    },
    {
      id: 'edge-25',
      source: '10',
      target: '21',
      data: {},
    },
    {
      id: 'edge-26',
      source: '10',
      target: '20',
      data: {},
    },
    {
      id: 'edge-27',
      source: '11',
      target: '24',
      data: {},
    },
    {
      id: 'edge-28',
      source: '11',
      target: '22',
      data: {},
    },
    {
      id: 'edge-29',
      source: '11',
      target: '14',
      data: {},
    },
    {
      id: 'edge-30',
      source: '12',
      target: '13',
      data: {},
    },
    {
      id: 'edge-31',
      source: '16',
      target: '17',
      data: {},
    },
    {
      id: 'edge-32',
      source: '16',
      target: '18',
      data: {},
    },
    {
      id: 'edge-33',
      source: '16',
      target: '21',
      data: {},
    },
    {
      id: 'edge-34',
      source: '16',
      target: '22',
      data: {},
    },
    {
      id: 'edge-35',
      source: '17',
      target: '18',
      data: {},
    },
    {
      id: 'edge-36',
      source: '17',
      target: '20',
      data: {},
    },
    {
      id: 'edge-37',
      source: '18',
      target: '19',
      data: {},
    },
    {
      id: 'edge-38',
      source: '19',
      target: '20',
      data: {},
    },
    {
      id: 'edge-39',
      source: '19',
      target: '33',
      data: {},
    },
    {
      id: 'edge-40',
      source: '19',
      target: '22',
      data: {},
    },
    {
      id: 'edge-41',
      source: '19',
      target: '23',
      data: {},
    },
    {
      id: 'edge-42',
      source: '20',
      target: '21',
      data: {},
    },
    {
      id: 'edge-43',
      source: '21',
      target: '22',
      data: {},
    },
    {
      id: 'edge-44',
      source: '22',
      target: '24',
      data: {},
    },
    {
      id: 'edge-45',
      source: '22',
      target: '25',
      data: {},
    },
    {
      id: 'edge-46',
      source: '22',
      target: '26',
      data: {},
    },
    {
      id: 'edge-47',
      source: '22',
      target: '23',
      data: {},
    },
    {
      id: 'edge-48',
      source: '22',
      target: '28',
      data: {},
    },
    {
      id: 'edge-49',
      source: '22',
      target: '30',
      data: {},
    },
    {
      id: 'edge-50',
      source: '22',
      target: '31',
      data: {},
    },
    {
      id: 'edge-51',
      source: '22',
      target: '32',
      data: {},
    },
    {
      id: 'edge-52',
      source: '22',
      target: '33',
      data: {},
    },
    {
      id: 'edge-53',
      source: '23',
      target: '28',
      data: {},
    },
    {
      id: 'edge-54',
      source: '23',
      target: '27',
      data: {},
    },
    {
      id: 'edge-55',
      source: '23',
      target: '29',
      data: {},
    },
    {
      id: 'edge-56',
      source: '23',
      target: '30',
      data: {},
    },
    {
      id: 'edge-57',
      source: '23',
      target: '31',
      data: {},
    },
    {
      id: 'edge-58',
      source: '23',
      target: '33',
      data: {},
    },
    {
      id: 'edge-59',
      source: '32',
      target: '33',
      data: {},
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['drag-canvas', 'drag-node', 'click-select', 'brush-select'],
  },
  layout: {
    type: 'circular',
  },
  node: (model) => {
    return {
      id: model.id,
      data: {
        ...model.data,
        labelBackgroundShape: {},
        animates: {
          update: [
            {
              fields: ['x', 'y'],
              duration: 500,
            },
            {
              fields: ['opacity'],
              shapeId: 'haloShape',
            },
            {
              fields: ['lineWidth'],
              shapeId: 'keyShape',
            },
          ],
        },
      },
    };
  },
  edge: {
    keyShape: {
      endArrow: {
        type: 'vee',
      },
    },
  },
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize(container.scrollWidth, container.scrollHeight);
  };

const configs = {
  Default: {
    type: 'circular',
    radius: undefined,
    divisions: undefined,
    startAngle: undefined,
    endAngle: undefined,
    startRadius: undefined,
    endRadius: undefined,
    ordering: undefined,
  },
  'Order by degree': { type: 'circular', ordering: 'degree' },
  Division: { type: 'circular', divisions: 5, radius: 200, startAngle: Math.PI / 4, endAngle: Math.PI },
  Spiral: {
    type: 'circular',
    startRadius: 10,
    endRadius: 300,
  },
};

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML = '👉 Change configs:';
btnContainer.appendChild(tip);

Object.keys(configs).forEach((name, i) => {
  const btn = document.createElement('a');
  btn.innerHTML = name;
  btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  btn.style.padding = '4px';
  btn.style.marginLeft = i > 0 ? '24px' : '8px';
  btnContainer.appendChild(btn);
  btn.addEventListener('click', () => {
    graph.layout(configs[name]);
  });
});
