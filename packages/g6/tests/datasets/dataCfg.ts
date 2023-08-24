export const graphDataCfg = {
  type: 'graphData',
  value: {
    nodes: [
      { id: 'node1', data: { isRoot: true } }, // , collapsed: true
      { id: 'cnode2', data: {} },
      { id: 'cnode1', data: {} },
      { id: 'dynamicNode', data: {} },
      { id: 'node5', data: {} },
      { id: 'node2', data: {} },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'cnode2', data: {} },
      { id: 'edge2', source: 'node1', target: 'cnode1', data: {} },
      { id: 'edge4', source: 'cnode2', target: 'cnode1', data: {} },
      { id: 'edge5', source: 'cnode1', target: 'dynamicNode', data: {} },
      { id: 'edge6', source: 'dynamicNode', target: 'node5', data: {} },
      { id: 'edge7', source: 'cnode2', target: 'node2', data: {} },
    ],
  },
};

export const treeDataCfg = {
  type: 'treeData',
  value: [
    {
      id: 'node1',
      data: {
        // collapsed: true,
      },
      children: [
        {
          id: 'cnode1',
          data: {},
          children: [
            {
              id: 'dynamicNode',
              data: {},
            },
          ],
        },
        {
          id: 'c2',
          data: {},
        },
      ],
    },
    {
      id: 'cnode2',
      data: {},
      children: [
        {
          id: 'node2',
          data: {},
          children: [
            {
              id: 't2c1-c1',
              data: {},
            },
          ],
        },
        {
          id: 't2c2',
          data: {},
        },
      ],
    },
  ],
};
