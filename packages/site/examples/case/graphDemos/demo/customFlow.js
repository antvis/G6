import G6 from '@antv/g6';
/**
 * by Zhihui Hu
 * https://www.zhihu.com/people/wisdommm
 */

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;

/** ====== data preparation ======= */
// the first layer nodes
const baseData = {
  nodes: [
    { id: "intention1", time: "2022/03/20", title: "User Intend", expandRange: [0, 2], show: false, startPosition: 0, endPosition: 0 },
    { id: "intention2", time: "2022/03/20", title: "User Intend", expandRange: [1, 3], show: false, startPosition: 0, endPosition: 0 },
    { id: "intention3", time: "2022/03/20", title: "User Intend", expandRange: [3, 5], show: false, startPosition: 0, endPosition: 0 },
  ],
  edges: [
    { id: "edge1", source: "intention1", target: "intention2" },
    { id: "edge2", source: "intention2", target: "intention3" },
  ]
};
baseData.nodes.forEach(node => {
  node.type = 'customNode';
});
// layout for the first layer nodes
const gridLayout = new G6.Layout['grid']({
  rows: 1,
  width,
  sortBy: 'id'
});
gridLayout.init(baseData);
gridLayout.execute()

// the second layer nodes
const rangeData = {
  nodes: [
    { id: "0", label: "Like" },
    { id: "1", label: "Follow" },
    { id: "2", label: "Collect" },
    { id: "3", label: "Shop" },
    { id: "4", label: "Pay" },
    { id: "5", label: "Comment" }
  ],
};
rangeData.nodes.forEach(node => node.visible = false);


const graphData = {
  nodes: baseData.nodes.concat(rangeData.nodes),
  edges: baseData.edges
}

/** ====== custom a node type ======= */
G6.registerNode('customNode',
  {
    draw(cfg, group) {
      group.shapeMap = {};
      const rect = group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: 50,
          lineWidth: 1,
          fillOpacity: 1,
          radius: 12,
          stroke: 'rgba(0,0,0,0.2)',
          lineWidth: 1,
          fill: '#fff',
        },
        name: 'rect-intention',
      });
      // title
      group.addShape('text', {
        attrs: {
          x: 0,
          y: -10,
          text: cfg.title,
          fontSize: 14,
          fill: '#000',
          fontWeight: 'bold',
          textAlign: 'center'
        },
        name: 'rect-title',
      });
      // time
      group.addShape('text', {
        attrs: {
          x: 0,
          y: 20,
          text: cfg.time,
          fontSize: 14,
          fill: '#999',
          textAlign: 'center'
        },
        name: 'rect-time',
      });
      if (cfg.expandRange) {
        // expand button
        group.addShape('rect', {
          attrs: {
            x: -32.5,
            y: 35,
            width: 65,
            height: 20,
            radius: 8,
            stroke: '#FF6107',
            lineWidth: 1,
            fill: '#FFF',
          },
          name: 'rectBtn',
        });
        // button text
        group.addShape('text', {
          attrs: {
            x: 0,
            y: 51,
            text: cfg.show ? '- collapse' : '+ expand',
            fill: '#FF6107',
            fontSize: 12,
            textAlign: 'center'
          },
          capture: false,
          name: 'rectBtn-text',
        });
        group.shapeMap['rectBtn-text'] = expandShape;
      }

      const expandShape = group.addShape('polygon', {
        attrs: {
          points: [
            [30, 60],
            [-30, 60],
            [cfg.startPosition, 200],
            [cfg.endPosition, 200],
          ],
          fill: 'l(90) 0:rgba(255,97,7,0.18)  1:rgba(255,97,7,0)',
          opacity: 0.5
        },
        visible: false,
        name: 'polygon-shape',
      });
      expandShape.toBack();
      group.shapeMap['polygon-shape'] = expandShape;

      return rect;
    },
    update: (cfg, item) => {
      const group = item.getContainer();
      const expandText = group.shapeMap?.['rectBtn-text'] || group.find(e => e.get('name') === 'rectBtn-text');
      expandText.attr({
        text: cfg.show ? '- collapse' : '+ expand'
      });
      const expandShape = group.shapeMap?.['polygon-shape'] || group.find(e => e.get('name') === 'polygon-shape');
      if (cfg.show) {
        expandShape.set('visible', true);
        expandShape.attr({
          points: [
            [30, 60],
            [-30, 60],
            [cfg.startPosition, 200],
            [cfg.endPosition, 200],
          ],
          opacity: 0,
        });
        expandShape.animate({ opacity: 1 }, { duration: 300, repeat: false });
      } else {
        expandShape.set('visible', false);
        expandShape.animate({ opacity: 0 }, { duration: 300, repeat: false });
      }
    }
  },
  'single-node'
);


/** ====== init the graph ======= */
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['drag-canvas']
  },
  defaultNode: {
    type: 'circle',
    style: {
      r: 30,
      fill: '#fff',
      stroke: '#ccc',
      lineWidth: 1,
    },
  },
  defaultEdge: {
    style: {
      color: "#fff",
      stroke: "#FF6107",
      lineWidth: 12,
      opacity: 0.6
    }
  }
});
graph.read(graphData);


/** ====== bind listener ======= */
graph.on('rectBtn:click', (e) => {
  const model = e.item.getModel();
  const { expandRange } = model;
  if (expandRange) {
    showRoute(model);
  }
});
const showRoute = (nodeData) => {
  nodeData.show = !nodeData.show;

  let { nodes, edges } = graphData;
  const routeNodes = [];
  const routeEdges = [];
  const routeNodesMap = {};

  // the nodes will be shown in the second layer
  let showRangeIds = new Set();
  baseData.nodes.forEach(node => {
    if (!node.show) return;
    const { expandRange } = node;
    for (let i = +expandRange[0]; i < +expandRange[1] + 1; i++) {
      showRangeIds.add(i);
    }
  });
  showRangeIds = Array.from(showRangeIds);
  showRangeIds.sort((a, b) => a - b);

  const rangeLayoutNodes = [];
  rangeData.nodes.forEach(node => {
    const showIdx = showRangeIds.indexOf(+node.id);
    if (showIdx > -1) {
      graph.showItem(node.id);
      rangeLayoutNodes.push(node);
    }
    else graph.hideItem(node.id);
  });

  // layout for the second row nodes
  const rangeGridLayout = new G6.Layout['grid']({
    rows: 1,
    width: 1000,
    begin: [0, 200]
  });
  rangeGridLayout.init({ nodes: rangeLayoutNodes, edges: [] });
  rangeGridLayout.execute();
  rangeLayoutNodes.forEach(node => graph.update(node.id, { x: node.x, y: node.y }))

  // update the 'show', 'startPosition', and 'endPosition' for first layer node
  baseData.nodes.forEach((node) => {
    const { id: nodeId, expandRange, x } = node;
    if (!node.show) {
      graph.updateItem(nodeId, { show: false });
      return;
    }
    const [start, end] = expandRange;
    graph.updateItem(nodeId, {
      show: true,
      // the position for the bottom vertexes of the range polygon
      startPosition: graph.findById(`${start}`).getModel().x - 30 - x,
      endPosition: graph.findById(`${end}`).getModel().x + 30 - x,
    });
  });

  // remove the blue range edges
  graph.getEdges().forEach(edge => {
    if (edge.getModel().tag === 'range') graph.removeItem(edge);
  });

  // add new blue range edges
  showRangeIds.forEach((id, i) => {
    if (i === 0) return;
    graph.addItem('edge', {
      id: `edge-${Math.random()}`,
      source: `${showRangeIds[i - 1]}`,
      target: `${id}`,
      tag: 'range',
      style: {
        lineWidth: 2,
        stroke: '#8CC2FC'
      }
    })
  })
}

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };