import G6 from '@antv/g6';

/**
 *  Custom a JSX node
 *  by Dominic Ming
 *
 */

G6.registerNode(
  'rect-jsx',
  (cfg) => `
    <group>
      <rect>
        <rect style={{
          width: 150,
          height: 20,
          fill: ${cfg.color},
          radius: [6, 6, 0, 0],
          cursor: 'move'，
          stroke: ${cfg.color}
        }} draggable="true">
          <text style={{ 
            marginTop: 2, 
            marginLeft: 75, 
            textAlign: 'center', 
            fontWeight: 'bold', 
            fill: '#fff' }}>{{label}}</text>
        </rect>
        <rect style={{
          width: 150,
          height: 55,
          stroke: ${cfg.color},
          fill: #ffffff,
          radius: [0, 0, 6, 6],
        }}>
          <text style={{ marginTop: 5, marginLeft: 3, fill: '#333', marginLeft: 4 }}>描述: {{description}}</text>
          <text style={{ marginTop: 10, marginLeft: 3, fill: '#333', marginLeft: 4 }}>创建者: {{meta.creatorName}}</text>
        </rect>
      </rect>
      <circle style={{
        stroke: ${cfg.color},
        r: 10,
        fill: '#fff',
        marginLeft: 75,
        cursor: 'pointer'
      }} name="circle">
        <image style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 12, height: 12,  marginLeft: 70,  marginTop: -5 }} />
      </circle>
    </group>`,
);

const data = {
  nodes: [
    {
      x: 150,
      y: 150,
      description: 'ant_type_name_...',
      label: 'Type / ReferType',
      color: '#2196f3',
      meta: {
        creatorName: 'a_creator',
      },
      id: 'node1',
      type: 'rect-jsx',
    },
    {
      x: 350,
      y: 150,
      description: 'node2_name...',
      label: 'JSX Node',
      color: '#2196f3',
      meta: {
        creatorName: 'a_creator',
      },
      id: 'node2',
      type: 'rect-jsx',
    },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  modes: {
    default: ['drag-node', 'zoom-canvas'],
  },
});

graph.data(data);
graph.render();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
