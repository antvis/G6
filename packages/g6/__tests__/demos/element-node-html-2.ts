import { Graph } from '@antv/g6';

export const elementNodeHTML2: TestCase = async (context) => {
  const ICON_MAP = {
    error: '&#10060;',
    overload: '&#9889;',
    running: '&#9989;',
  };

  const COLOR_MAP = {
    error: '#f5222d',
    overload: '#faad14',
    running: '#52c41a',
  } as const;

  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', data: { location: 'East', status: 'error', ip: '192.168.1.2' } },
        { id: 'node-2', data: { location: 'West', status: 'overload', ip: '192.168.1.3' } },
        { id: 'node-3', data: { location: 'South', status: 'running', ip: '192.168.1.4' }, states: ['active'] },
      ],
    },
    node: {
      type: 'html',
      style: {
        size: [160, 60],
        dx: -80,
        dy: -30,
        innerHTML: (d: any) => {
          const {
            data: { location, status, ip },
          } = d;
          const color = COLOR_MAP[status as keyof typeof COLOR_MAP];
          return `
  <div 
    style="
      width:100%; 
      height: 100%; 
      background: ${color}bb; 
      border: 1px solid ${color};
      color: #fff;
      user-select: none;
      display: flex; 
      padding: 10px;
      "
  >
    <div style="display: flex;flex-direction: column;flex: 1;">
      <div style="font-weight: bold;">
        ${location} Node
      </div>
      <div>
        status: ${status} ${ICON_MAP[status as keyof typeof ICON_MAP]}
      </div>
    </div>
    <div>
      <span style="border: 1px solid white; padding: 2px;">
        ${ip}
      </span>
    </div>
  </div>`;
        },
      },
    },
    layout: {
      type: 'grid',
    },
    behaviors: ['drag-element', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
