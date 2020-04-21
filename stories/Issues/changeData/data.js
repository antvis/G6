export const data = {
  nodes: [
    {
      id: 'node1',
      label: 'Mysql连接1',
    },
    {
      id: 'node2',
      label: 'ETL数据流1',
    },
    {
      id: 'node3',
      label: 'ETL数据流2',
    },
    {
      id: 'node4',
      label: '报告',
    },
    {
      id: 'node5',
      label: 'Mysql数据源2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node1',
      target: 'node3',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node2',
      target: 'node4',
    },
    {
      source: 'node4',
      target: 'node5',
    },
  ],
};
