import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '1',
      data: {
        label: '公司1',
        group: 1,
      },
    },
    {
      id: '2',
      data: {
        label: '公司2',
        group: 1,
      },
    },
    {
      id: '3',
      data: {
        label: '公司3',
        group: 1,
      },
    },
    {
      id: '4',
      data: {
        label: '公司4',
      },
    },
    {
      id: '5',
      data: {
        label: '公司5',
        group: 1,
      },
    },
    {
      id: '6',
      data: {
        label: '公司6',
        group: 2,
      },
    },
    {
      id: '7',
      data: {
        label: '公司7',
        group: 2,
      },
    },
    {
      id: '8',
      data: {
        label: '公司8',
        group: 1,
      },
    },
    {
      id: '9',
      data: {
        label: '公司9',
        group: 2,
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: '1',
      target: '1',
      data: { type: 'loop-edge' },
    },
    {
      id: 'edge2',
      source: '2',
      target: '2',
      data: {
        type: 'loop-edge',
      },
    },
    {
      id: 'edge3',
      source: '1',
      target: '2',
      data: {
        dataType: 'A',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge4',
      source: '1',
      target: '3',
      data: {
        dataType: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge5',
      source: '2',
      target: '5',
      data: {
        dataType: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge6',
      source: '5',
      target: '6',
      data: {
        dataType: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge7',
      source: '3',
      target: '4',
      data: {
        dataType: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge8',
      source: '4',
      target: '7',
      data: {
        dataType: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge9',
      source: '1',
      target: '8',
      data: {
        dataType: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      id: 'edge10',
      source: '1',
      target: '9',
      data: {
        dataType: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.data.label,
    },
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  layout: {
    type: 'grid',
  },
});

graph.setPlugins([
  {
    key: 'hull-1',
    type: 'hull',
    members: graph
      .getNodeData()
      .filter((node) => node.data.group === 1)
      .map((node) => node.id),
    corner: 'smooth',
    labelText: 'Group1',
    labelPlacement: 'left',
    labelBackground: true,
    labelBackgroundFill: 'lightblue',
  },
  {
    key: 'hull-2',
    type: 'hull',
    members: graph
      .getNodeData()
      .filter((node) => node.data.group === 2)
      .map((node) => node.id),
    corner: 'rounded',
    fill: 'pink',
    stroke: 'red',
    labelText: 'Group2',
    labelPlacement: 'left',
    labelBackground: true,
    labelBackgroundFill: 'pink',
    padding: 15,
  },
]);

graph.render().then(async () => {
  let memberAdded = false;

  const hull1 = graph.getPluginInstance('hull-1');

  const updateActions = [
    {
      name: 'Add/Delete Member',
      action: () => {
        if (!memberAdded) {
          hull1.addMember(['4']);
        } else {
          hull1.removeMember(['4']);
        }
        memberAdded = !memberAdded;
      },
    },
    {
      name: 'Update Config',
      action: () => {
        hull1.updateOptions((prev) => ({
          ...prev,
          fill: 'yellow',
          corner: 'sharp',
          labelText: 'Updated Group1',
          labelPlacement: 'top',
          labelCloseToPath: false,
          labelBackgroundFill: 'orange',
        }));
      },
    },
  ];

  const btnContainer = document.createElement('div');
  btnContainer.style.position = 'absolute';
  const container = document.getElementById('container')!;
  container.appendChild(btnContainer);
  const tip = document.createElement('span');
  tip.innerHTML = `👉 update:`;
  btnContainer.appendChild(tip);
  updateActions.forEach((item, i) => {
    const btn = document.createElement('a');
    btn.innerHTML = item.name;
    btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    btn.style.padding = '4px';
    btn.style.marginLeft = i > 0 ? '24px' : '8px';
    btnContainer.appendChild(btn);
    btn.addEventListener('click', () => {
      item.action();
    });
  });
});
