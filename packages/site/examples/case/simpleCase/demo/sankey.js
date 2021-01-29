import G6 from '@antv/g6';

const colorArr = [
  "#5B8FF9",
  "#5AD8A6",
  "#5D7092",
  "#F6BD16",
  "#6F5EF9",
  "#6DC8EC",
  "#D3EEF9",
  "#DECFEA",
  "#FFE0C7",
  "#1E9493",
  "#BBDEDE",
  "#FF99C3",
  "#FFE0ED",
  "#CDDDFD",
  "#CDF3E4",
  "#CED4DE",
  "#FCEBB9",
  "#D3CEFD",
  "#945FB9",
  "#FF9845"
];

const rawData = [{
    "label": "A",
    "id": "A",
    "to": [{
      "target": "C",
      "value": 200
    }]
  }, {
    "label": "B",
    "id": "B",
    "to": [{
      "target": "C",
      "value": 400
    }]
  }, {
    "label": "C",
    "id": "C",
    "to": [{
      "target": "D",
      "value": 300
    }, {
      "target": "E",
      "value": 300
    }]
  }, {
    "label": "D",
    "id": "D",
    "to": [{
      "target": "F",
      "value": 100
    }, {
      "target": "G",
      "value": 200
    }]
  }, {
    "label": "E",
    "id": "E",
    "to": [{
      "target": "F",
      "value": 200
    }, {
      "target": "G",
      "value": 100
    }]
  }, {
    "label": "F",
    "id": "F"
  },
  {
    "label": "G",
    "id": "G"
  }
]

G6.registerNode('dice-sankey-node', {
  jsx: (cfg) => `
    <group>
      <rect style={{ width: ${cfg.size[0]}, height: ${cfg.size[1]}, fill: ${cfg.color} }} />
      <text style={{ marginLeft: 6, marginTop: 24,  fill: #333, stroke: ${cfg.color}, lineWidth: 2, fontSize: 24 }}>${cfg.label} ${cfg.size[1]}</text>
    </group>
  `,
  getAnchorPoints() {
    return [
      [0, 0]
    ]
  }
}, 'single-node');

G6.registerEdge('dice-sankey-edge', {
  draw(cfg, group) {
    const {
      startPoint,
      endPoint,
      color
    } = cfg;
    const deltaY1 = Number(cfg.sourceIndex);
    const deltaY2 = Number(cfg.sourceIndex) + Number(cfg.value);
    const deltaY3 = Number(cfg.targetIndex);
    const deltaY4 = Number(cfg.targetIndex) + Number(cfg.value);
    const quaterX = Math.abs(endPoint.x - startPoint.x) / 5 * 3
    return group.addShape('path', {
      attrs: {
        fill: color,
        opacity: 0.6,
        path: [
          ['M', startPoint.x, startPoint.y + deltaY1],
          ['C', endPoint.x - quaterX, startPoint.y + deltaY1, startPoint.x + quaterX, endPoint.y + deltaY3, endPoint.x, endPoint.y + deltaY3],
          ['L', endPoint.x, endPoint.y + deltaY4],
          ['C', startPoint.x + quaterX, endPoint.y + deltaY4, endPoint.x - quaterX, startPoint.y + deltaY2, startPoint.x, startPoint.y + deltaY2],
          ['L', startPoint.x, startPoint.y + deltaY1],
          ['Z']
        ]
      }
    })
  }
})

const dataTransform = (data) => {
  const nodes = [];
  const edges = [];
  const nodeRecvMap = {};

  data.forEach((node, i) => {
    const {
      id,
      label,
      color = colorArr[(i % colorArr.length)],
      to = []
    } = node;

    let index = 0;
    to.forEach(rel => {
      edges.push({
        source: id,
        target: rel.target,
        value: rel.value,
        color,
        sourceIndex: index,
        targetIndex: (nodeRecvMap[rel.target] || 0)
      });
      index += rel.value || 0;
      if (rel.value) {
        nodeRecvMap[rel.target] = (nodeRecvMap[rel.target] || 0) + rel.value;
      }
    })
    nodes.push({
      id,
      label,
      color,
      outSize: index
    });
  })

  nodes.forEach(
    node => {
      node.inSize = nodeRecvMap[node.id] || 0;
      node.size = [4, Math.max(4, node.inSize, node.outSize)]
    }
  )

  return {
    nodes,
    edges
  }
}

const container = document.getElementById('container');

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    type: 'dice-sankey-node'
  },
  defaultEdge: {
    type: 'dice-sankey-edge'
  },
  fitView: true,
  layout: {
    type: 'dagre',
    rankdir: 'LR',
    nodesep: 10,
    ranksep: 200,
    align: 'ul'
  }
})

graph.data(dataTransform(rawData));

graph.render();
