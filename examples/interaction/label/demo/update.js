import G6 from '@antv/g6';
/**
   * 本示例演示以下功能：
   * 鼠标 hover 节点更新节点样式及其标签文本
   * 鼠标 hover 边更新边样式及其标签文本
   * by 十吾
   */

const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 100,
    label: 'hover 前的\n节点文本 node1'
  }, {
    id: 'node2',
    x: 400,
    y: 100,
    label: 'hover 前的\n节点文本 node2'
  }],
  edges: [{
    source: 'node1',
    target: 'node2',
    label: 'hover 前的边文本',
    labelCfg: {
      refY: 10
    }
  }]
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultEdge: {
    color: '#e2e2e2',
    lineAppendWidth: 3
  },
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  nodeStateStyles: {
    hover: {
      lineWidth: 5,
      fillOpacity: 1
    }
  },
  edgeStateStyles: {
    hover: {
      lineWidth: 3
    }
  }
});
graph.data(data);
graph.render();

graph.on('node:mouseenter', function(evt) {
  const node = evt.item;
  const model = node.getModel();
  model.oriLabel = model.label;
  graph.setItemState(node, 'hover', true);
  graph.updateItem(node, {
    label: 'hover 后 ' + model.id,
    labelCfg: {
      style: {
        fill: '#003a8c'
      }
    }
  });
});

graph.on('node:mouseleave', function(evt) {
  const node = evt.item;
  const model = node.getModel();
  graph.setItemState(node, 'hover', false);
  graph.updateItem(node, {
    label: model.oriLabel,
    labelCfg: {
      style: {
        fill: '#555'
      }
    }
  });
});

graph.on('edge:mouseenter', function(evt) {
  const edge = evt.item;
  const model = edge.getModel();
  model.oriLabel = model.label;
  graph.setItemState(edge, 'hover', true);
  graph.updateItem(edge, {
    label: 'hover 后',
    labelCfg: {
      style: {
        fill: '#003a8c'
      }
    }
  });
});

graph.on('edge:mouseleave', function(evt) {
  const edge = evt.item;
  graph.setItemState(edge, 'hover', false);
  graph.updateItem(edge, {
    label: 'hover 前的边文本',
    labelCfg: {
      style: {
        fill: '#555'
      }
    }
  });
});
