import G6 from '@antv/g6';

const nodes = [];
const edges = [];

// 中心节点
const centerNode = {
  id: 'center',
  x: 500,
  y: 300,
  shape: 'center-node',
  size: 20
};
nodes.push(centerNode);
// 左侧添加 4 个节点
for (let i = 0; i < 4; i++) {
  const id = 'left' + i;
  nodes.push({
    id,
    x: 250,
    y: (i + 1) * 100 + 50,
    shape: 'leaf-node'
  });
  edges.push({ source: id, target: 'center', shape: 'can-running' });
}
// 右侧添加 6 个节点
for (let i = 0; i < 6; i++) {
  const id = 'right' + i;
  nodes.push({
    id,
    x: 750,
    y: i * 100 + 50,
    shape: 'leaf-node'
  });
  edges.push({ source: 'center', target: id, shape: 'can-running' });
}

G6.registerNode('leaf-node', {
  afterDraw(cfg, group) {
    group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: 5,
        fill: cfg.color || '#5B8FF9'
      }
    });
  },
  getAnchorPoints() {
    return [
      [ 0, 0.5 ],
      [ 1, 0.5 ]
    ];
  }
}, 'circle');

G6.registerNode('center-node', {
  afterDraw(cfg, group) {
    const r = cfg.size / 2;
    group.addShape('circle', {
      zIndex: -3,
      attrs: {
        x: 0,
        y: 0,
        r: r + 10,
        fill: 'gray',
        opacity: 0.4
      }
    });
    group.addShape('circle', {
      zIndex: -2,
      attrs: {
        x: 0,
        y: 0,
        r: r + 20,
        fill: 'gray',
        opacity: 0.2
      }
    });
    group.sort();
  },
  getAnchorPoints() {
    return [
      [ 0, 0.5 ],
      [ 1, 0.5 ]
    ];
  }
}, 'circle');

// lineDash 的差值，可以在后面提供 util 方法自动计算
const dashArray = [
  [ 0, 1 ],
  [ 0, 2 ],
  [ 1, 2 ],
  [ 0, 1, 1, 2 ],
  [ 0, 2, 1, 2 ],
  [ 1, 2, 1, 2 ],
  [ 2, 2, 1, 2 ],
  [ 3, 2, 1, 2 ],
  [ 4, 2, 1, 2 ]
];
const lineDash = [ 4, 2, 1, 2 ];
const interval = 9;

G6.registerEdge('can-running', {
  setState(name, value, item) {
    const shape = item.get('keyShape');
    if (name === 'running') {
      if (value) {
        const length = shape.getTotalLength(); // 后续 G 增加 totalLength 的接口
        let totalArray = [];
        for (let i = 0; i < length; i += interval) {
          totalArray = totalArray.concat(lineDash);
        }
        let index = 0;
        shape.animate({
          onFrame() {
            const cfg = {
              lineDash: dashArray[index].concat(totalArray)
            };
            index = (index + 1) % interval;
            return cfg;
          },
          repeat: true
        }, 3000);
      } else {
        shape.stopAnimate();
        shape.attr('lineDash', null);
      }
    }
  }
}, 'cubic-horizontal');

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    style: {
      stroke: '#b5b5b5'
    }
  }
});
graph.data({ nodes, edges });
graph.render();
graph.fitView();

// 响应 hover 状态
graph.on('node:mouseenter', ev => {
  const node = ev.item;
  const edges = node.getEdges();
  edges.forEach(edge => graph.setItemState(edge, 'running', true));
});
graph.on('node:mouseleave', ev => {
  const node = ev.item;
  const edges = node.getEdges();
  edges.forEach(edge => graph.setItemState(edge, 'running', false));
});
