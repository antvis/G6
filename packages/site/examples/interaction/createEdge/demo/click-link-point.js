import G6 from '@antv/g6';

// G6.Util.processParallelEdges processes the edges with same source node and target node,
// on this basis, processParallelEdgesOnAnchorPoint consider the end nodes and anchor points in the same time.
const processParallelEdgesOnAnchorPoint = (
  edges,
  offsetDiff = 15,
  multiEdgeType = 'quadratic',
  singleEdgeType = undefined,
  loopEdgeType = undefined
) => {
  const len = edges.length;
  const cod = offsetDiff * 2;
  const loopPosition = [
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
    'top-left',
  ];
  const edgeMap = {};
  const tags = [];
  const reverses = {};
  for (let i = 0; i < len; i++) {
    const edge = edges[i];
    const { source, target, sourceAnchor, targetAnchor } = edge;
    const sourceTarget = `${source}|${sourceAnchor}-${target}|${targetAnchor}`;

    if (tags[i]) continue;
    if (!edgeMap[sourceTarget]) {
      edgeMap[sourceTarget] = [];
    }
    tags[i] = true;
    edgeMap[sourceTarget].push(edge);
    for (let j = 0; j < len; j++) {
      if (i === j) continue;
      const sedge = edges[j];
      const { source: src, target: dst, sourceAnchor: srcAnchor, targetAnchor: dstAnchor } = sedge;

      // 两个节点之间共同的边
      // 第一条的source = 第二条的target
      // 第一条的target = 第二条的source
      if (!tags[j]) {
        if (source === dst && sourceAnchor === dstAnchor
            && target === src && targetAnchor === srcAnchor) {
          edgeMap[sourceTarget].push(sedge);
          tags[j] = true;
          reverses[`${src}|${srcAnchor}|${dst}|${dstAnchor}|${edgeMap[sourceTarget].length - 1}`] = true;
        } else if (source === src && sourceAnchor === srcAnchor
           && target === dst  && targetAnchor === dstAnchor) {
          edgeMap[sourceTarget].push(sedge);
          tags[j] = true;
        }
      }
    }
  }

  for (const key in edgeMap) {
    const arcEdges = edgeMap[key];
    const { length } = arcEdges;
    for (let k = 0; k < length; k++) {
      const current = arcEdges[k];
      if (current.source === current.target) {
        if (loopEdgeType) current.type = loopEdgeType;
        // 超过8条自环边，则需要重新处理
        current.loopCfg = {
          position: loopPosition[k % 8],
          dist: Math.floor(k / 8) * 20 + 50,
        };
        continue;
      }
      if (length === 1 && singleEdgeType && (current.source !== current.target || current.sourceAnchor !== current.targetAnchor)) {
        current.type = singleEdgeType;
        continue;
      }
      current.type = multiEdgeType;
      const sign =
        (k % 2 === 0 ? 1 : -1) * (reverses[`${current.source}|${current.sourceAnchor}|${current.target}|${current.targetAnchor}|${k}`] ? -1 : 1);
      if (length % 2 === 1) {
        current.curveOffset = sign * Math.ceil(k / 2) * cod;
      } else {
        current.curveOffset = sign * (Math.floor(k / 2) * cod + offsetDiff);
      }
    }
  }
  return edges;
};


const data = {
  nodes: [
    { id: 'node1', x: 350, y: 100 },
    { id: 'node2', x: 350, y: 250 },
  ],
};
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Hover the node and the anchor points will show up, click anchor points to create edges.';
const container = document.getElementById('container');
container.appendChild(descriptionDiv);

// custom a node with anchor-point shapes
G6.registerNode('rect-node', {
  // draw anchor-point circles according to the anchorPoints in afterDraw
  afterDraw(cfg, group) {
    const bbox = group.getBBox();
    const anchorPoints = this.getAnchorPoints(cfg)
    anchorPoints.forEach((anchorPos, i) => {
      group.addShape('circle', {
        attrs: {
          r: 5,
          x: bbox.x + bbox.width * anchorPos[0],
          y: bbox.y + bbox.height * anchorPos[1],
          fill: '#fff',
          stroke: '#5F95FF'
        },
        name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
        anchorPointIdx: i, // flag the idx of the anchor-point circle
        links: 0, // cache the number of edges connected to this shape
        visible: false, // invisible by default, shows up when links > 1 or the node is in showAnchors state
      })
    })
  },
  getAnchorPoints(cfg) {
    return cfg.anchorPoints || [[0, 0.5], [0.33, 0], [0.66, 0], [1, 0.5], [0.33, 1], [0.66, 1]];
  },
  // response the state changes and show/hide the link-point circles
  setState(name, value, item) {
    if (name === 'showAnchors') {
      const anchorPoints = item.getContainer().findAll(ele => ele.get('name') === 'anchor-point');
      anchorPoints.forEach(point => {
        if (value || point.get('links') > 0) point.show()
        else point.hide()
      })
    }
  }
}, 'rect')

let sourceAnchorIdx, targetAnchorIdx;

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: [
      'drag-node',
      // config the shouldBegin and shouldEnd to make sure the create-edge is began and ended at anchor-point circles
      {
      type: 'create-edge',
      shouldBegin: e => {
        // avoid beginning at other shapes on the node
        if (e.target && e.target.get('name') !== 'anchor-point') return false;
        sourceAnchorIdx = e.target.get('anchorPointIdx');
        e.target.set('links', e.target.get('links') + 1); // cache the number of edge connected to this anchor-point circle
        return true;
      },
      shouldEnd: e => {
        // avoid ending at other shapes on the node
        if (e.target && e.target.get('name') !== 'anchor-point') return false;
        if (e.target) {
          targetAnchorIdx = e.target.get('anchorPointIdx');
          e.target.set('links', e.target.get('links') + 1);  // cache the number of edge connected to this anchor-point circle
          return true;
        }
        targetAnchorIdx = undefined;
        return true;
      },
      // update the sourceAnchor
      // getEdgeConfig: () => {
      //   return {
      //     sourceAnchor: sourceAnchorIdx
      //   }
      // }
    }],
  },
  defaultNode: {
    type: 'rect-node',
    style: {
      fill: '#eee',
      stroke: '#ccc',
    }
  },
  defaultEdge: {
    type: 'quadratic',
    style: {
      stroke: '#F6BD16',
      lineWidth: 2,
    },
  },
});

graph.data(data);
graph.render();

graph.on('aftercreateedge', (e) => {
  // update the sourceAnchor and targetAnchor for the newly added edge
  graph.updateItem(e.edge, {
    sourceAnchor: sourceAnchorIdx,
    targetAnchor: targetAnchorIdx
  })

  // update the curveOffset for parallel edges
  const edges = graph.save().edges;
  processParallelEdgesOnAnchorPoint(edges);
  graph.getEdges().forEach((edge, i) => {
    graph.updateItem(edge, {
      curveOffset: edges[i].curveOffset,
      curvePosition: edges[i].curvePosition,
    });
  });
});

// if create-edge is canceled before ending, update the 'links' on the anchor-point circles
graph.on('afterremoveitem', e => {
  if (e.item && e.item.source && e.item.target) {
    const sourceNode = graph.findById(e.item.source);
    const targetNode = graph.findById(e.item.target);
    const { sourceAnchor, targetAnchor } = e.item;
    if (sourceNode && !isNaN(sourceAnchor)) {
      const sourceAnchorShape = sourceNode.getContainer().find(ele => (ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === sourceAnchor));
      sourceAnchorShape.set('links', sourceAnchorShape.get('links') - 1);
    }
    if (targetNode && !isNaN(targetAnchor)) {
      const targetAnchorShape = targetNode.getContainer().find(ele => (ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === targetAnchor));
      targetAnchorShape.set('links', targetAnchorShape.get('links') - 1);
    }
  }
})

// after clicking on the first node, the edge is created, update the sourceAnchor
graph.on('afteradditem', e => {
  if (e.item && e.item.getType() === 'edge') {
    graph.updateItem(e.item, {
      sourceAnchor: sourceAnchorIdx
    });
  }
})


// some listeners to control the state of nodes to show and hide anchor-point circles
graph.on('node:mouseenter', e => {
  graph.setItemState(e.item, 'showAnchors', true);
})
graph.on('node:mouseleave', e => {
  graph.setItemState(e.item, 'showAnchors', false);
})

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 20);
  };
