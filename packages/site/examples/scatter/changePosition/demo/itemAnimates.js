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
  modes: { default: ['click-select'] },
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
  node: {
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
    labelBackgroundShape: {},
    animates: {
      buildIn: [
        {
          fields: ['size', 'opacity'],
          shapeId: 'group',
          duration: 500,
        },
      ],
      buildOut: [
        {
          fields: ['opacity'],
          duration: 200,
        },
      ],
      update: [
        {
          fields: ['x', 'y'],
        },
        {
          fields: ['opacity'],
          shapeId: 'haloShape',
          states: ['selected'],
        },
        {
          fields: ['lineWidth', 'fill'],
          shapeId: 'keyShape',
          states: ['selected'],
        },
      ],
      show: [
        {
          fields: ['opacity'],
          shapeId: 'keyShape',
          duration: 300,
        },
      ],
      hide: [
        {
          fields: ['opacity'],
          shapeId: 'keyShape',
          duration: 300,
        },
        {
          fields: ['opacity'],
          shapeId: 'labelShape',
          duration: 300,
        },
      ],
    },
  },
  edge: {
    animates: {
      buildIn: [
        {
          fields: ['opacity'],
          shapeId: 'keyShape',
          duration: 500,
        },
      ],
      buildOut: [
        {
          fields: ['opacity'],
          shapeId: 'keyShape',
          duration: 200,
        },
      ],
      update: [
        {
          fields: ['opacity'],
          shapeId: 'haloShape',
          states: ['selected'],
        },
        {
          fields: ['lineWidth'],
          shapeId: 'keyShape',
          states: ['selected'],
        },
      ],
      show: [
        {
          fields: ['opacity'],
          shapeId: 'keyShape',
          duration: 300,
        },
      ],
      hide: [
        {
          fields: ['opacity'],
          shapeId: 'keyShape',
          duration: 300,
        },
      ],
    },
  },
  data,
});

const newNodes = [];
const buildInOutActions = {
  'Add Node(buildin)': () => {
    const node = graph.addData('node', {
      id: `node-${Math.random()}`,
      data: {
        cluster: Math.random(),
      },
    });
    graph.updateNodePosition([
      {
        id: node.id,
        data: {
          x: Math.random() * 500,
          y: Math.random() * 500,
        },
      },
    ]);
    newNodes.push(node);
  },
  'Remo Node(buildout)': () => {
    if (!newNodes.length) return;
    graph.removeData('node', newNodes[0].id);
    newNodes.shift();
  },
};
const updateActions = {
  'Update Position(update)': () => {
    const positions = [];
    data.nodes.forEach((node) => {
      const { x, y } = node.data;
      positions.push({
        id: node.id,
        data: {
          x: x + Math.random() * 50 - 25,
          y: y + Math.random() * 50 - 25,
        },
      });
      node.x += Math.random() * 50 - 25;
      node.y += Math.random() * 50 - 25;
    });
    graph.updateNodePosition(positions);
  },
  'Update Node Color(update)': () => {
    graph.updateData(
      'node',
      graph.getAllNodesData().map((node) => ({
        id: node.id,
        data: {
          cluster: Math.random(),
        },
      })),
    );
  },
  'Select/Deselect Node(update)': () => {
    if (graph.getItemState('a', 'selected')) {
      graph.setItemState('a', 'selected', false);
    } else {
      graph.setItemState('a', 'selected', true);
    }
  },
  'Select/Deselect Edge(update)': () => {
    if (graph.getItemState('a2b', 'selected')) {
      graph.setItemState('a2b', 'selected', false);
    } else {
      graph.setItemState('a2b', 'selected', true);
    }
  },
};
const showHideActions = {
  'Hide/Show Node(show/hide)': () => {
    if (graph.getItemVisible('a')) {
      graph.hideItem('a');
    } else {
      graph.showItem('a');
      graph.showItem('a2b');
      graph.showItem('a2c');
    }
  },
};

const actions = {
  'animate.buildIn & animate.buildOut': buildInOutActions,
  'animate.show & animate.hide': showHideActions,
  'animate.update': updateActions,
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
