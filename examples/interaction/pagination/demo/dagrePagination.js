import G6 from '@antv/g6';

// the max number of nodes for each level
const MAX_NUM_EACH_LEVEL = 3;
let nodeMap = {};
let curNewNodeIds = [];

const data = {
  nodes: [
    {
      id: '1',
      label: 'level 1',
    },
    {
      id: '2-1',
      label: 'level 2-1',
    },
    {
      id: '2-2',
      label: 'level 2-2',
    },
    {
      id: '2-3',
      label: 'level 2-3',
    },
    {
      id: '2-4',
      label: 'level 2-4',
    },
    {
      id: '2-5',
      label: 'level 2-5',
    },
    {
      id: '2-6',
      label: 'level 2-6',
    },
    {
      id: '3',
      label: 'level 3',
    },
    {
      id: '4',
      label: 'level 4',
    },
    {
      id: '5-1',
      label: 'level 5-1',
    },
    {
      id: '5-2',
      label: 'level 5-2',
    },
    {
      id: '5-3',
      label: 'level 5-3',
    },
    {
      id: '5-4',
      label: 'level 5-4',
    },
    {
      id: '5-5',
      label: 'level 5-5',
    },
    {
      id: '5-6',
      label: 'level 5-6',
    },
    {
      id: '5-7',
      label: 'level 5-7',
    },
    {
      id: '5-8',
      label: 'level 5-8',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2-1',
    },
    {
      source: '1',
      target: '2-2',
    },
    {
      source: '1',
      target: '2-3',
    },
    {
      source: '1',
      target: '2-4',
    },
    {
      source: '1',
      target: '2-5',
    },
    {
      source: '1',
      target: '2-6',
    },
    {
      source: '2-1',
      target: '3',
    },
    {
      source: '2-2',
      target: '3',
    },
    {
      source: '2-3',
      target: '3',
    },
    {
      source: '2-4',
      target: '3',
    },
    {
      source: '2-5',
      target: '3',
    },
    {
      source: '2-6',
      target: '3',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '5-1',
    },
    {
      source: '4',
      target: '5-2',
    },
    {
      source: '4',
      target: '5-3',
    },
    {
      source: '4',
      target: '5-4',
    },
    {
      source: '4',
      target: '5-5',
    },
    {
      source: '4',
      target: '5-6',
    },
    {
      source: '4',
      target: '5-7',
    },
    {
      source: '4',
      target: '5-8',
    },
  ],
};

const compare = (property) => {
  return (obj1, obj2) => {
    return obj1[property] - obj2[property];
  }
}

const curNodesToNewData = (levels, initPos) => {
  const resData = { nodes: [], edges: [] };
  curNewNodeIds = [];
  let newNodeMap = {};
  levels.forEach(level => {
    if (level.curNodes) {
      for (let i = 0; i < level.nodes.length; i++) {
        const node = level.nodes[i];
        if (i >= level.curBeginIdx && i < level.curEndIdx) {
          if (!node.x || !node.y) {
            node.x = initPos[0];
            node.y = initPos[1];
          }
        } else {
          node.x = undefined;
          node.y = undefined;
        }
      }
      resData.nodes = resData.nodes.concat(level.curNodes);
    } else {
      resData.nodes = resData.nodes.concat(level.nodes);
    }
  });
  resData.nodes.forEach(node => {
    newNodeMap[node.id] = node;
    if (Object.keys(nodeMap).length !== 0 && !nodeMap[node.id]) {
      curNewNodeIds.push(node.id);
    }
  });

  data.edges.forEach(edge => {
    if (newNodeMap[edge.source] && newNodeMap[edge.target]) {
      resData.edges.push(edge);
    }
  });
  nodeMap = newNodeMap;
  return resData;
}

const graphDiv = document.getElementById('container');
const tipDiv = document.createElement('div');
tipDiv.id = 'tip';
tipDiv.innerHTML = `<div>Hover the nodes of level 2 and leve 5, and click the triangle icons to switch the nodes patination.</div>
<div>将鼠标移动到 level 2 和 level 5 的节点上后，点击左右小三角按钮以切换该层级的节点，达到分页效果</div>`;
graphDiv.appendChild(tipDiv);

const width = graphDiv.scrollWidth;
const height = (graphDiv.scrollHeight || 500) - 50;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  layout: {
    type: 'dagre',
    nodesepFunc: (d) => {
      return 20;
    },
    ranksep: 30,
    controlPoints: true,
  },
  defaultNode: {
    type: 'rect',
    size: [70, 30],
    style: {
      radius: 10
    }
  },
  defaultEdge: {
    type: 'cubic-vertical',
    style: {
      radius: 20,
      offset: 45,
      endArrow: true,
      lineWidth: 2,
      stroke: '#C2C8D5',
    },
  },
  nodeStateStyles: {
    selected: {
      stroke: '#d9d9d9',
      fill: '#5394ef',
    },
  },
  modes: {
    default: [
      'drag-canvas',
      'zoom-canvas',
      'click-select',
    ],
  }
});
graph.data(data);
graph.render();


// stash origin data
const levelsMap = {};
// group the nodes according to their y, which indicates the level
data.nodes.forEach(node => {
  if (!levelsMap[node.y]) {
    levelsMap[node.y] = {
      y: node.y,
      nodes: []
    };
  }
  levelsMap[node.y].nodes.push(node);
});
const unsortedlevels = [];
Object.keys(levelsMap).forEach(key => {
  unsortedlevels.push(levelsMap[key]);
});
// sort the levels according to the y.
// and slice the nodes for each level if the num of nodes is over MAX_NUM_EACH_LEVEL
const levels = unsortedlevels.sort(compare('y'));
levels.forEach((level, k) => {
  if (level.nodes.length > MAX_NUM_EACH_LEVEL) {
    level.curBeginIdx = 0;
    level.curEndIdx = MAX_NUM_EACH_LEVEL;
    level.curNodes = [];
    level.nodes.forEach((levelNode, i) => {
      levelNode.overflow = true;
      levelNode.levelIdx = k;
      if (i < MAX_NUM_EACH_LEVEL && i >= 0) {
        level.curNodes.push(levelNode);
      }
    });
  } else {
    level.nodes.forEach(levelNode => {
      levelNode.levelIdx = k;
    })
  }
});

graph.changeData(curNodesToNewData(levels));
graph.fitView();
graph.set('animate', true)

const iconMap = {};

// draw the icons on the root graphics group of the graph
const drawIcons = (nodeId) => {
  const node = graph.findById(nodeId);
  const model = node.getModel();
  delayDestroyIcons(nodeId, 2000);
  if (model.overflow) {
    const levelIdx = model.levelIdx;
    const y = model.y;
    if (iconMap[levelIdx] && !iconMap[levelIdx].destroyed) return;
    const level = levels[levelIdx];
    const graphicsGroup = graph.getGroup();
    const prePos = [level.curNodes[0].x - (level.curNodes[0].size[0] / 2 || 20) - 10, y];
    const nextPos = [level.curNodes[2].x + (level.curNodes[0].size[0] / 2 || 20) + 10, y];
    const preIcon = graphicsGroup.addShape('marker', {
      attrs: {
        symbol: 'triangle',
        x: prePos[0],
        y: prePos[1],
        r: 5,
        fill: '#333',
        opacity: 0,
        cursor: 'pointer'
      },
      name: `pre-icon`,
      levelIdx
    });
    const nextIcon = graphicsGroup.addShape('marker', {
      attrs: {
        symbol: 'triangle-down',
        x: nextPos[0],
        y: nextPos[1],
        r: 5,
        fill: '#333',
        opacity: 0,
        cursor: 'pointer'
      },
      name: `next-icon`,
      levelIdx
    });

    if (level.curBeginIdx > 0) {
      preIcon.animate({
        opacity: 1
      }, {
        duration: 150,
        repeat: false
      })
    }
    if (level.curEndIdx < level.nodes.length) {
      nextIcon.animate({
        opacity: 1
      }, {
        duration: 150,
        repeat: false
      })
    }

    iconMap[levelIdx] = {
      preIcon,
      nextIcon,
      destroyed: false
    };
    return true;
  }
  return false;
}

// update the icons
const updateIcons = (levelIdx) => {
  if (!levelIdx || !iconMap[levelIdx]) return;
  const preIcon = iconMap[levelIdx].preIcon;
  const nextIcon = iconMap[levelIdx].nextIcon;
  const level = levels[levelIdx];

  const curNodes = level.curNodes;
  if (!curNodes) return;
  const prePos = [curNodes[0].x - (curNodes[0].size[0] / 2 || 20) - 10, curNodes[0].y];
  const nextPos = [curNodes[2].x + (curNodes[0].size[0] / 2 || 20) + 10, curNodes[2].y];
  preIcon.attr({
    opacity: level.curBeginIdx <= 0 ? 0 : 1,
    x: prePos[0],
    y: prePos[1]
  });
  nextIcon.attr({
    opacity: level.curEndIdx >= level.nodes.length ? 0 : 1,
    x: nextPos[0],
    y: nextPos[1]
  });
}

// destroy the icons
const destroyIcons = (levelIdx) => {
  if (!iconMap[levelIdx]) return;
  const preIcon = iconMap[levelIdx].preIcon;
  const nextIcon = iconMap[levelIdx].nextIcon;
  if (preIcon && !preIcon.destroyed) {
    preIcon.animate({
      opacity: 0
    }, {
      duration: 150,
      repeat: false
    })
    setTimeout(() => {
      preIcon.remove();
      preIcon.destroy();
    }, 150);
  }
  if (nextIcon && !nextIcon.destroyed) {
    nextIcon.animate({
      opacity: 0
    }, {
      duration: 150,
      repeat: false
    })
    setTimeout(() => {
      nextIcon.remove();
      nextIcon.destroy();
    }, 150);
  }
  iconMap[levelIdx].destroyed = true;
}

// destroy the icons with delay
const delayDestroyIcons = (levelIdx, delay = 2000) => {
  if (!iconMap[levelIdx]) return;
  if (iconMap[levelIdx].timeouter) {
    window.clearTimeout(iconMap[levelIdx].timeouter);
  }
  iconMap[levelIdx].timeouter = window.setTimeout(() => {
    destroyIcons(levelIdx);
  }, delay);
}


// mouseenter the node to show the previous/next icons
graph.on('node:mouseenter', e => {
  drawIcons(e.item.getID());
});

// mouseleave the node to destroy the icons
graph.on('node:mouseleave', e => {
  const levelIdx = e.item.getModel().levelIdx;
  delayDestroyIcons(levelIdx, 2000);
});


// click the icon to changeData
graph.on('click', e => {
  if (e.name === 'click') return;
  const marker = e.target;
  const targetName = marker.get('name');
  if (targetName !== 'pre-icon' && targetName !== 'next-icon') return;
  const levelIdx = marker.get('levelIdx');
  const level = levels[levelIdx];
  const oriNodes = level.nodes;
  if (targetName === 'pre-icon') {
    if (level.curBeginIdx <= 0) return; // touch the top
    level.curBeginIdx--;
    level.curEndIdx--;
  } else {
    if (level.curEndIdx >= oriNodes.length) return; // touch the bottom
    level.curBeginIdx++;
    level.curEndIdx++;
  }
  level.curNodes = oriNodes.slice(level.curBeginIdx, level.curEndIdx);

  const initPos = [marker.attr('x'), level.y];

  graph.changeData(curNodesToNewData(levels, initPos));
  curNewNodeIds.forEach(newId => {
    const newNode = graph.findById(newId);
    const nodeGroup = newNode.getContainer();
    nodeGroup.attr('opacity', 0);
    nodeGroup.animate({
      opacity: 1
    }, 150);
  })
});

// update the icon after changeData
graph.on('afterlayout', e => {
  Object.keys(iconMap).forEach(levelIdx => {
    if (!iconMap[levelIdx] || iconMap[levelIdx].destroyed) return;
    updateIcons(levelIdx);
  });
});