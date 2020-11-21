import G6 from '@antv/g6';

/**
 *  Custom a xml node
 *  by Dominic Ming
 *
 */

G6.registerNode('rect-xml', {
  jsx: (cfg) => `
    <group>
      <rect style={{
        width: 200,
        height: 75,
      }}>
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
        <image name="img" style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 12, height: 12,  marginLeft: 69,  marginTop: -5 }} />
      </circle>
    </group>
  `,
  afterDraw: (cfg, group) => {
    console.log(group)
    const img = group.findAllByName('img');
    if (img[0]) {
      img[0].animate((ratio) => {
        return {
          opacity: Math.abs(0.5 - ratio),
        };
      }, {
        duration: 3000,
        repeat: true,
      });
    }
  }
})

const data = {
  nodes: [{
    x: 150,
    y: 150,
    "description": "ant_type_name_...",
    "label": "Type / ReferType",
    "color": '#2196f3',
    "meta": {
      "creatorName": "a_creator"
    },
    "id": "test",
    type: 'rect-xml'
  }],
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
});

graph.data(data);
graph.render();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };