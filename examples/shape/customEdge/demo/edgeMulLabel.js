import G6 from '@antv/g6';

/**
 * 自定义边示例
 * 演示自定义边上绘制多个label
 * by 长哲
 */

// 注册自定义边
G6.registerEdge('multipleLabelsEdge', {
  options: {
    style: {
      stroke: '#000'
    }
  },
  labelAutoRotate: true,
  draw(cfg, group) {
    const startPoint = cfg.startPoint,
      endPoint = cfg.endPoint;
    const stroke = cfg.style && cfg.style.stroke || this.options.style.stroke;

    const shape = group.addShape('path', {
      attrs: {
        stroke,
        path: [
          [ 'M', startPoint.x, startPoint.y ],
          [ 'L', endPoint.x, endPoint.y ]]
      }
    });
    if (cfg.label && cfg.label.length) {
      // 绘制左边的label
      group.addShape('text', {
        attrs: {
          text: cfg.label[0],
          fill: '#595959',
          textAlign: 'start',
          textBaseline: 'middle',
          x: startPoint.x,
          y: startPoint.y - 10
        }
      });
      if (cfg.label.length > 1) {
        // 绘制右边的label
        group.addShape('text', {
          attrs: {
            text: cfg.label[1],
            fill: '#595959',
            textAlign: 'end',
            textBaseline: 'middle',
            x: endPoint.x,
            y: endPoint.y - 10
          }
        });
      }
    }
    // 返回边的keyShape
    return shape;
  }
});

const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 100,
    label: 'node1'
  }, {
    id: 'node2',
    x: 300,
    y: 100,
    label: 'node2'
  }],
  edges: [{
    source: 'node1',
    target: 'node2',
    // 定义边左侧和右侧的label
    label: [ 'hello', 'world' ]
  }]
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: [{
      type: 'drag-node',
      delegate: false
    }, 'drag-canvas', {
      type: 'zoom-canvas',
      sensitivity: 0.5
    }]
  },
  defaultNode: {
    type: 'circle',
    size: [ 50 ],
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    },
    linkPoints: {
      left: true,
      right: true,
      fill: '#fff',
      stroke: '#1890FF',
      size: 3
    }
  },
  defaultEdge: {
    type: 'multipleLabelsEdge',
    style: {
      stroke: '#F6BD16'
    }
  }
});
graph.data(data);
graph.render();
