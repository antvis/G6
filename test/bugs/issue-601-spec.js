const expect = require('chai').expect;
const G6 = require('../../src/');

const div = document.createElement('div');
div.id = 'issue-601';
document.body.appendChild(div);

const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200,
    shape: 'hsf'
  }, {
    id: 'node2',
    x: 300,
    y: 200,
    label: '萧庆',
    labelCfg: {
      position: 'bottom'
    },
    shape: 'image',
    img: 'https://img2.bosszhipin.com/boss/avatar/avatar_13.png'
  }, {
    id: 'node3',
    x: 400,
    y: 100,
    shape: 'image',
    label: '语雀',
    labelCfg: {
      position: 'bottom'
    },
    img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg'
  }, {
    id: 'node4',
    x: 400,
    y: 400,
    shape: 'image',
    img: '//img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png'
  }],
  edges: [{
    id: 'edge1',
    target: 'node2',
    source: 'node1',
    style: {
      endArrow: true
    },
    label: '你好,我好',
    labelCfg: {
      style: {
        stroke: 'white',
        lineWidth: 5
      } // 加白边框
    }
  }, {
    source: 'node2',
    target: 'node3',
    style: {
      endArrow: true
    },
    shape: 'quadratic',
    label: '过去的线',
    labelCfg: {
      refY: -10,
      refX: 0,
      autoRotate: true,
      style: {
        fill: 'red'
      }
    }
  }, {
    source: 'node3',
    target: 'node2',
    style: {
      endArrow: true,
      stroke: 'red'
    },
    size: 2,
    shape: 'quadratic',
    label: '回来的线',
    labelCfg: {
      refY: -10,
      refX: 0,
      autoRotate: true,
      style: {
        fill: 'red'
      }
    }
  }, {
    source: 'node3',
    target: 'node4',
    style: {
      endArrow: true,
      stroke: 'blue',
      lineDash: [ 2, 2 ]
    },
    shape: 'my-edge',
    label: '随便连连\n换行',
    curveLevel: 4,
    labelCfg: {
      refY: -20,
      refX: 0,
      autoRotate: true,
      style: {
        fill: 'red'
      }
    }
  }]
};

G6.registerNode('hsf', {
  draw(cfg, group) {
    const shape = group.addShape('circle', {
      attrs: {
        x: 36,
        y: 40,
        r: 55,
        stroke: '#71cd00',
        lineWidth: 5
      }
    });
    group.addShape('image', {
      attrs: {
        x: 0 - 15,
        y: 0 - 22,
        width: 100,
        height: 100,
        img: 'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/APP.png'
      }
    });
    group.addShape('text', {
      attrs: {
        x: 15,
        y: 85,
        text: 'HSF',
        fontSize: 15,
        stroke: 'black'
      }
    });
    group.addShape('text', {
      attrs: {
        x: 35,
        y: 100,
        text: cfg.id,
        fontSize: 13,
        stroke: 'black',
        textAlign: 'center',
        textBaseline: 'top'
      }
    });
    return shape;
  }
});


describe('#601', () => {
  const graph = new G6.Graph({
    container: 'issue-601',
    width: 500,
    height: 500,
    modes: {
      default: [ 'drag-node' ]
    }
  });

  it('drag test', () => {
    graph.data(data);
    graph.render();
    const node = graph.findById('node1');
    const shape = node.get('keyShape');
		// 更新节点的位置 shape 不销毁
    graph.update(node, { x: 10, y: 20 });
    expect(shape.get('destroyed')).not.eql(true);
		// drag 之类事件的 target 还没改好，等改好了，触发 drag 事件
  });

  it('clear', () => {
    graph.destroy();
    expect(graph.destroyed).eql(true);
  });
});
