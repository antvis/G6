import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      data: {
        label: '0',
        cluster: '0',
      },
    },
    {
      id: '1',
      data: {
        label: '1',
        cluster: '0',
      },
    },
    {
      id: '2',
      data: {
        label: '2',
        cluster: '0',
      },
    },
    {
      id: '3',
      data: {
        label: '3',
        cluster: '0',
      },
    },
    {
      id: '4',
      data: {
        label: '4',
        cluster: '0',
      },
    },
    {
      id: '5',
      data: {
        label: '5',
        cluster: '3',
      },
    },
    {
      id: '6',
      data: {
        label: '6',
        cluster: '0',
      },
    },
    {
      id: '7',
      data: {
        label: '7',
        cluster: '0',
      },
    },
    {
      id: '8',
      data: {
        label: '8',
        cluster: '0',
      },
    },
    {
      id: '9',
      data: {
        label: '9',
        cluster: '3',
      },
    },
    {
      id: '10',
      data: {
        label: '10',
        cluster: '3',
      },
    },
    {
      id: '11',
      data: {
        label: '11',
        cluster: '2',
      },
    },
    {
      id: '12',
      data: {
        label: '12',
        cluster: '2',
      },
    },
    {
      id: '13',
      data: {
        label: '13',
        cluster: '4',
      },
    },
    {
      id: '14',
      data: {
        label: '14',
        cluster: '2',
      },
    },
    {
      id: '15',
      data: {
        label: '15',
        cluster: '2',
      },
    },
    {
      id: '16',
      data: {
        label: '16',
        cluster: '2',
      },
    },
    {
      id: '17',
      data: {
        label: '17',
        cluster: '1',
      },
    },
    {
      id: '18',
      data: {
        label: '18',
        cluster: '4',
      },
    },
    {
      id: '19',
      data: {
        label: '19',
        cluster: '4',
      },
    },
    {
      id: '20',
      data: {
        label: '20',
        cluster: '4',
      },
    },
    {
      id: '21',
      data: {
        label: '21',
        cluster: '0',
      },
    },
    {
      id: '22',
      data: {
        label: '22',
        cluster: '2',
      },
    },
    {
      id: '23',
      data: {
        label: '23',
        cluster: '2',
      },
    },
    {
      id: '24',
      data: {
        label: '24',
        cluster: '2',
      },
    },
    {
      id: '25',
      data: {
        label: '25',
        cluster: '3',
      },
    },
    {
      id: '26',
      data: {
        label: '26',
        cluster: '4',
      },
    },
    {
      id: '27',
      data: {
        label: '27',
        cluster: '4',
      },
    },
    {
      id: '28',
      data: {
        label: '28',
        cluster: '1',
      },
    },
    {
      id: '29',
      data: {
        label: '29',
        cluster: '1',
      },
    },
    {
      id: '30',
      data: {
        label: '30',
        cluster: '4',
      },
    },
    {
      id: '31',
      data: {
        label: '31',
        cluster: '4',
      },
    },
    {
      id: '32',
      data: {
        label: '32',
        cluster: '1',
      },
    },
    {
      id: '33',
      data: {
        label: '33',
        cluster: '2',
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
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select', 'brush-select'],
  },
  layout: {
    type: 'grid',
    begin: [20, 20],
    width: width - 20,
    height: height - 20,
  },
  theme: {
    type: 'spec',
    base: 'light',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  node: (model) => {
    return {
      id: model.id,
      data: {
        ...model.data,
        labelShape: {
          text: model.data.label,
        },
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
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };

const configs = {
  Default: {
    type: 'grid',
    begin: [20, 20],
    width: width - 20,
    height: height - 20,
    sortBy: 'data',
  },
  Clustering: {
    type: 'grid',
    begin: [20, 20],
    width: width - 20,
    height: height - 20,
    sortBy: 'cluster',
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
