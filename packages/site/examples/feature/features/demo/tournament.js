import { extend, Extensions, Graph } from '@antv/g6';

const STATE = {
  INIT: 0,
  PLAYING: 1,
  WIN: 2,
  LOST: 3,
};

class TournamentNode extends Extensions.RectNode {
  afterDraw(model, shapeMap, diffData, diffState) {
    const { data: cfg, id } = model;
    const afterShapes = {};
    const drawShape = (shapeType, shapeId, shapeCfg) => {
      afterShapes[shapeId] = this.upsertShape(shapeType, shapeId, shapeCfg, { model, shapeMap, diffData, diffState });
      return afterShapes[shapeId];
    };
    // 奖杯
    if (id === 'winner') {
      drawShape('text', 'winner-shape', {
        text: '🏆',
        x: 0,
        y: -50,
        fontSize: 50,
        textAlign: 'center',
        textBaseline: 'middle',
      });
    }
    // 名称
    if (cfg.name) {
      drawShape('text', 'name-text-shape', {
        text: cfg.name,
        x: 0,
        y: 0,
        fontSize: 12,
        textAlign: id === 'winner' ? 'center' : 'right',
        textBaseline: 'middle',
        fill: 'white',
      });
    }
    // 得分
    if (cfg.score) {
      drawShape('text', 'score-text-shape', {
        text: `${cfg.score}`,
        x: 40,
        y: 0,
        fontSize: 12,
        textAlign: 'right',
        textBaseline: 'middle',
        fill: 'black',
      });
    }
    // lost tag
    if (cfg.state === STATE.LOST) {
      const lostShape = drawShape('text', 'lost-text-shape', {
        text: 'LOST',
        x: 50,
        y: 0,
        fontSize: 14,
        fontWeight: 700,
        textAlign: 'right',
        textBaseline: 'middle',
        fill: 'white',
      });
      lostShape.rotate(-45);
      // 输方的shape设置灰度
      Object.keys(shapeMap).forEach((key) => {
        const shape = shapeMap[key];
        shape.style.filter = 'grayscale(1)';
      });
      Object.keys(afterShapes).forEach((key) => {
        const shape = afterShapes[key];
        shape.style.filter = 'grayscale(1)';
      });
    }
    // win tag
    if (cfg.state === STATE.WIN) {
      const winShape = drawShape('text', 'win-text-shape', {
        text: 'WIN',
        x: 50,
        y: 0,
        fontSize: 14,
        fontWeight: 700,
        textAlign: 'right',
        textBaseline: 'middle',
        fill: 'yellow',
      });
      winShape.rotate(-45);
    }
    return afterShapes;
  }
}

class TournamentEdge extends Extensions.PolylineEdge {
  drawKeyShape(model, sourcePoint, targetPoint, shapeMap, diffData, diffState) {
    const shape = super.drawKeyShape(model, sourcePoint, targetPoint, shapeMap, diffData, diffState);
    const mid = shape.getPoint(0.6);
    shape.style.path = [
      ['M', targetPoint.x, targetPoint.y],
      ['L', mid.x, targetPoint.y],
      ['L', mid.x, sourcePoint.y],
      ['L', sourcePoint.x, sourcePoint.y],
    ];
    return shape;
  }

  getPath(model, points) {
    return [
      ['M', points[1].x, points[1].y],
      ['L', points[0].x, points[0].y],
    ];
  }

  afterDraw(model, shapeMap) {
    const { data: cfg } = model;
    const keyShape = shapeMap.keyShape;
    const afterShape = {};
    // 虚线流动动画
    if (cfg.state === STATE.PLAYING) {
      keyShape.style.lineDash = [10, 10];
      keyShape.animate([{ lineDashOffset: 20 }, { lineDashOffset: 0 }], {
        duration: 500,
        iterations: Infinity,
      });
    } else if (cfg.state === STATE.WIN) {
      keyShape.style.stroke = '#53cdd5';
      keyShape.style.lineWidth = 3;
    }
    return afterShape;
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'tournament-node': TournamentNode,
  },
  edges: {
    'tournament-edge': TournamentEdge,
  },
});
const data = {
  id: 'winner',
  data: { layer: 4 },
  children: [
    {
      id: 'layer3-1',
      data: { layer: 3 },
      children: [
        {
          id: 'layer2-1',
          data: { layer: 2 },
          children: [
            { id: 'layer1-1', data: { layer: 1 } },
            { id: 'layer1-2', data: { layer: 1 } },
          ],
        },
        {
          id: 'layer2-2',
          data: { layer: 2 },
          children: [
            { id: 'layer1-3', data: { layer: 1 } },
            { id: 'layer1-4', data: { layer: 1 } },
          ],
        },
      ],
    },
    {
      id: 'layer3-2',
      data: { layer: 3 },
      children: [
        {
          id: 'layer2-3',
          data: { layer: 2 },
          children: [
            { id: 'layer1-5', data: { layer: 1 } },
            { id: 'layer1-6', data: { layer: 1 } },
          ],
        },
        {
          id: 'layer2-4',
          data: { layer: 2 },
          children: [
            { id: 'layer1-7', data: { layer: 1 } },
            { id: 'layer1-8', data: { layer: 1 } },
          ],
        },
      ],
    },
  ],
};

const container = document.getElementById('container');
const width = container.offsetWidth;
const height = container.offsetHeight;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['drag-canvas', 'zoom-canvas'],
  },
  theme: {
    type: 'spec',
    base: 'dark',
  },
  node: {
    type: 'tournament-node',
    width: 200,
    keyShape: {
      width: 100,
      radius: 10,
      fill: '#5c9eb9',
    },
    anchorPoints: [
      [0.5, 0.5],
      [1, 0.5],
    ],
  },
  edge: {
    type: 'tournament-edge',
    controlPoints: true,
    sourceAnchor: 0,
    targetAnchor: 1,
  },
  layout: {
    type: 'compactBox',
    direction: 'RL',
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 16;
    },
    getVGap: function getVGap() {
      return 30;
    },
    getHGap: function getHGap() {
      return 100;
    },
    getWidth: function getWidth(d) {
      return d.id.length + 20;
    },
  },
  autoFit: 'center',
  data: {
    type: 'treeData',
    value: data,
  },
});

let timer = null;
let layerIndex = 0;
graph.on('afterrender', () => {
  const allEdges = graph.getAllEdgesData();
  const allNodes = graph.getAllNodesData();

  const layer1 = allNodes.filter((node) => node.data.layer === 1);
  const layer2 = allNodes.filter((node) => node.data.layer === 2);
  const layer3 = allNodes.filter((node) => node.data.layer === 3);
  const layer = [layer1, layer2, layer3, [data]];

  const updateItemData = (itemType, id, data) => graph.updateData(itemType, { id, data });
  const setScore = () => parseFloat((Math.random() * 10).toFixed(2)) || 1;
  // 参赛选手
  const playerInfo = Array.from({ length: layer1.length }).map((_, index) => ({
    id: `layer1-${index + 1}`,
    name: `player${index + 1}`,
    state: STATE.INIT,
  }));
  // 选手初登场
  playerInfo.forEach((info) => {
    updateItemData('node', info.id, {
      name: info.name,
      state: STATE.PLAYING,
      score: 0,
    });
  });
  // 更新选手分数
  const updateScore = () => {
    const currentLayer = layer[layerIndex];
    currentLayer.forEach((info) => {
      const edge = allEdges.find((edge) => edge.target === info.id);
      updateItemData('edge', edge.id, { state: STATE.PLAYING });
    });
    let index = 0;
    timer = setInterval(() => {
      index++;
      currentLayer.forEach((info) => {
        const score = setScore();
        const prevScore = graph.getNodeData(info.id).data.score || 0;
        const totalScore = parseFloat((score + prevScore).toFixed(2));
        updateItemData('node', info.id, { score: totalScore });
      });
      if (index >= 20) {
        layerIndex += 1;
        clearInterval(timer);
        timer = null;
        setNextLayer();
      }
    }, 100);
  };
  // 布局下一场景
  const setNextLayer = () => {
    const currentLayer = layer[layerIndex];
    if (!currentLayer) {
      return;
    }
    Array.from({ length: currentLayer.length }).forEach((_, index) => {
      let nextLayerId = `layer${layerIndex + 1}-${index + 1}`;
      if (layerIndex === layer.length - 1) {
        nextLayerId = 'winner';
      }
      const nextLayer = graph.getNodeData(nextLayerId);
      const childrenIds = nextLayer.data.childrenIds;
      const player1 = graph.getNodeData(childrenIds[0]);
      const player2 = graph.getNodeData(childrenIds[1]);

      const winNode = player1.data.score > player2.data.score ? player1 : player2;
      const lostNode = player1.id === winNode.id ? player2 : player1;
      // 更新当场比赛的赢方
      updateItemData('node', winNode.id, { state: STATE.WIN });
      // 更新当场比赛的输方
      updateItemData('node', lostNode.id, { state: STATE.LOST });
      // 更新下场进入比赛的赢方选手
      updateItemData('node', nextLayerId, {
        name: winNode.data.name,
        state: nextLayerId === 'winner' ? STATE.WIN : STATE.INIT,
      });

      const winEdge = allEdges.find(({ source, target }) => source === nextLayerId && target === winNode.id);
      const lostEdge = allEdges.find(({ source, target }) => source === nextLayerId && target === lostNode.id);
      // 更新赢方的边高亮
      updateItemData('edge', winEdge.id, { state: STATE.WIN });
      // 更新输方的边
      updateItemData('edge', lostEdge.id, { state: STATE.LOST });
      // 将赢方的边层级放到最前
      graph.frontItem(winEdge.id);
    });
    if (layerIndex < layer.length - 1) {
      updateScore();
    }
  };
  updateScore();
  window.graph = graph;
});
